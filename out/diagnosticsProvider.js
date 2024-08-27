"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideDiagnostics = void 0;
const vscode = __importStar(require("vscode"));
// Patterns
const regCMDName = new RegExp('^[a-zA-Z_][a-zA-Z0-9_]*$');
// Language
const COMPOUND_COMMANDS = ['WHEN', 'ELSE', 'ITERATE', 'DEFINE', 'ON', 'ORWHEN', 'TRY', 'CATCH'];
const EVENTS = ['START', 'END', 'GLOBAL', 'EACH_LINE', 'EVEN_LINES', 'ODD_LINES', 'CONTENT_LINES', 'EMPTY_LINES'];
function fill(match) {
    const newlineCount = match.split('\n').length - 1;
    return '\n'.repeat(newlineCount);
}
function provideDiagnostics(document) {
    const diagnostics = [];
    const rawText = document.getText();
    const text = rawText
        .replace(/###[\s\S]*?###/g, fill)
        .replace(/#.*$/gm, fill);
    function errorLine(msg, lineIndex, start, length) {
        const diagnostic = new vscode.Diagnostic(new vscode.Range(lineIndex, start, lineIndex, start + length), msg, vscode.DiagnosticSeverity.Warning);
        diagnostics.push(diagnostic);
    }
    let mustBeIndented = false;
    let commandsStack = [];
    let commandGroups = {};
    const lines = text.split('\n');
    const rawLines = rawText.split('\n');
    let foundContentInBlock = false;
    lines.forEach((line, index) => {
        const match = line.match(/^(\s*)/);
        let trimmedLine = line.trim();
        const rawLine = rawLines[index];
        const indentation = match ? match[1].length : 0;
        if (match && trimmedLine) {
            const parts = trimmedLine.split(" ");
            const cmd = parts[0];
            let params = parts.slice(1).join(" ");
            // Validate command (First word in the line)
            if (!regCMDName.test(cmd)) {
                let x = rawLine.indexOf(cmd);
                errorLine("Invalid character in command", index, x, cmd.length);
            }
            if (cmd === 'IMPORT' && indentation > 1) {
                errorLine('"IMPORT" command cannot be indented', index, 0, rawLine.length);
            }
            // ON indented, without event or with invalid event
            if (cmd === 'ON') {
                if (indentation > 1) {
                    errorLine('"ON" command cannot be indented', index, 0, rawLine.length);
                }
                else if (params.trim() === '') {
                    errorLine('Missing event.', index, 0, rawLine.length);
                }
                else if (!EVENTS.includes(params)) {
                    errorLine('Invalid event.', index, 0, rawLine.length);
                }
            }
            // DEFINE without name or with invalid name
            if (cmd === 'DEFINE') {
                if (params.trim() === '') {
                    errorLine('Expected function name after "DEFINE"', index, 0, rawLine.length);
                }
                else if (!regCMDName.test(params)) {
                    let x = rawLine.indexOf(params);
                    errorLine('Invalid character in identifier', index, x, rawLine.length - x);
                }
            }
            // WHEN or ORWHEN without expression
            if (cmd === 'WHEN' || cmd === 'ORWHEN') {
                if (params.trim() === '') {
                    errorLine('Expected expression', index, 0, rawLine.length);
                }
            }
            // Check Indent of 4
            if (rawLine != "" && indentation % 4 !== 0) {
                errorLine('Indentation should be a multiple of 4 spaces', index, 0, rawLine.length);
            }
            if (mustBeIndented) {
                if (indentation <= commandsStack[commandsStack.length - 1].indent) {
                    if (!foundContentInBlock) {
                        errorLine('Expected indented block', index, 0, rawLine.length);
                        mustBeIndented = false;
                    }
                    else {
                        mustBeIndented = false;
                    }
                }
            }
            if (!commandGroups.hasOwnProperty(indentation)) {
                commandGroups[indentation] = [];
            }
            commandGroups[indentation].push(cmd) ? commandGroups[indentation] != undefined : [];
            // Checks if cmd is a Compound command
            if (COMPOUND_COMMANDS.includes(cmd)) {
                if (['ORWHEN', 'ELSE', 'CATCH'].includes(cmd)) {
                    let base = commandGroups[indentation];
                    let lastSibling = base.length > 1 ? base[base.length - 2] : '';
                    if ((cmd === 'ELSE' || cmd === 'ORWHEN') && !['WHEN', 'ORWHEN'].includes(lastSibling)) {
                        errorLine(`"${cmd}" used without preceding "WHEN" or "ORWHEN" statement`, index, rawLine.indexOf(cmd), cmd.length);
                    }
                    if (cmd === 'CATCH' && lastSibling != 'TRY') {
                        errorLine(`"${cmd}" used without preceding "TRY" statement`, index, rawLine.indexOf(cmd), cmd.length);
                    }
                }
                commandsStack.push({ command: cmd, indent: indentation });
                mustBeIndented = true;
                foundContentInBlock = false;
            }
            else if (mustBeIndented) {
                foundContentInBlock = true;
            }
        }
        else if (trimmedLine === '' && mustBeIndented) {
            // If a blank line is found while expecting indentation, ensure at least one non-blank line follows
            let nextNonEmptyLineIndex = index + 1;
            while (nextNonEmptyLineIndex < lines.length && lines[nextNonEmptyLineIndex].trim() === '') {
                nextNonEmptyLineIndex++;
            }
            if (nextNonEmptyLineIndex === lines.length || !lines[nextNonEmptyLineIndex].trim()) {
                if (!foundContentInBlock) {
                    errorLine('Expected indented block', index, 0, line.length);
                }
                mustBeIndented = false;
            }
        }
        // Check for missing content in the last opened command block
        if (index === lines.length - 1 && mustBeIndented && !foundContentInBlock) {
            errorLine('Expected indented block', index, 0, lines[index].length);
        }
    });
    return diagnostics;
}
exports.provideDiagnostics = provideDiagnostics;
//# sourceMappingURL=diagnosticsProvider.js.map