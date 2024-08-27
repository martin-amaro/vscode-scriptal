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
exports.deactivate = exports.activate = void 0;
// extension.ts
const vscode = __importStar(require("vscode"));
const language_1 = require("./language");
const functions_1 = require("./functions");
const snippets_1 = require("./snippets");
const diagnosticsProvider_1 = require("./diagnosticsProvider");
const variablePattern = /[\$][_a-zA-Z][_a-zA-Z0-9]*(?:\.[_a-zA-Z0-9]+)*/g;
const customCommandPattern = /DEFINE\s+([_a-zA-Z][_a-zA-Z0-9]*)/gm;
const langID = 'scriptal';
const diagnosticCollection = vscode.languages.createDiagnosticCollection(langID);
const customCommands = {};
function updateCustomCommands(document) {
    const text = document.getText();
    let match;
    while ((match = customCommandPattern.exec(text)) !== null) {
        const commandName = match[1];
        customCommands[commandName] = `Custom command defined as '${commandName}'`;
    }
}
function activate(context) {
    const hoverProvider = vscode.languages.registerHoverProvider(langID, {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            if (!range) {
                return null;
            }
            const word = document.getText(range);
            // Variables
            if (word.startsWith('$')) {
                const markdown = new vscode.MarkdownString();
                markdown.appendCodeblock(`${word} (variable)`, langID);
                return new vscode.Hover(markdown);
            }
            // Envars
            const envar = language_1.envars[word];
            if (envar) {
                const markdown = new vscode.MarkdownString();
                markdown.appendCodeblock(`${word} (envar)`, langID);
                markdown.appendMarkdown(`${envar}`);
                return new vscode.Hover(markdown);
            }
            // Commands
            const func = functions_1.functions[word];
            if (func) {
                const markdown = new vscode.MarkdownString();
                markdown.appendCodeblock(func.syntax, langID);
                markdown.appendMarkdown(`\n\n${func.description}`);
                func.parameters.forEach(param => {
                    markdown.appendMarkdown(`\n- \`${param.name}\`: ${param.description}`);
                });
                markdown.appendMarkdown(`\n\n_Returns:_`);
                markdown.appendCodeblock(`${func.returns}`, langID);
                // Example
                if (func.example != null) {
                    markdown.appendMarkdown(`\n\n---\n\n`);
                    markdown.appendMarkdown(`*Example:*\n\`\`\`scriptal\n${func.example}\n\`\`\``);
                }
                return new vscode.Hover(markdown);
            }
            // Custom Commands
            if (customCommands[word]) {
                const markdown = new vscode.MarkdownString();
                markdown.appendMarkdown(`_Custom Command:_ \`${word}\``);
                return new vscode.Hover(markdown);
            }
            // Keywords
            const keywordDescription = language_1.keywords[word];
            if (keywordDescription) {
                const markdown = new vscode.MarkdownString();
                markdown.appendCodeblock(`${word} (keyword)`, langID);
                markdown.appendMarkdown(`${keywordDescription}`);
                return new vscode.Hover(markdown);
            }
            // Connectors
            if (language_1.connectors.includes(word)) {
                const hoverMessage = new vscode.MarkdownString();
                hoverMessage.appendCodeblock(`${word} (connector)`, langID);
                return new vscode.Hover(hoverMessage);
            }
            // Events
            const eventDescription = language_1.events[word];
            if (eventDescription) {
                const markdown = new vscode.MarkdownString();
                markdown.appendCodeblock(`${word} (event)`, langID);
                markdown.appendMarkdown(`${eventDescription}`);
                return new vscode.Hover(markdown);
            }
            return null;
        }
    });
    const completionProvider = vscode.languages.registerCompletionItemProvider(langID, {
        provideCompletionItems(document, position, token, context) {
            const completionItems = [];
            const text = document.getText();
            const variables = new Set();
            let match;
            // Find all variables
            while ((match = variablePattern.exec(text)) !== null) {
                if (match[0].startsWith('$')) {
                    variables.add(match[0]);
                }
            }
            // Create autocomplete items for found variables
            variables.forEach(variable => {
                const completionItem = new vscode.CompletionItem(variable, vscode.CompletionItemKind.Variable);
                completionItem.detail = "Variable";
                completionItems.push(completionItem);
            });
            // Envars
            for (const envar in language_1.envars) {
                const completionItem = new vscode.CompletionItem(envar, vscode.CompletionItemKind.Variable);
                completionItem.detail = "Envar";
                completionItem.documentation = new vscode.MarkdownString(language_1.envars[envar]);
                completionItems.push(completionItem);
            }
            // Keywords
            for (const keyword in language_1.keywords) {
                const completionItem = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
                completionItem.detail = "Keyword";
                completionItem.documentation = new vscode.MarkdownString(language_1.keywords[keyword]);
                completionItems.push(completionItem);
            }
            // Connectors
            for (const connector of language_1.connectors) {
                const completionItem = new vscode.CompletionItem(connector, vscode.CompletionItemKind.Keyword);
                completionItem.detail = "Connector";
                completionItems.push(completionItem);
            }
            // Events
            for (const event in language_1.events) {
                const completionItem = new vscode.CompletionItem(event, vscode.CompletionItemKind.Keyword);
                completionItem.detail = "Event";
                completionItem.documentation = new vscode.MarkdownString(language_1.events[event]);
                completionItems.push(completionItem);
            }
            // Autocompletado para comandos
            for (const key in functions_1.functions) {
                const func = functions_1.functions[key];
                const completionItem = new vscode.CompletionItem(key, vscode.CompletionItemKind.Function);
                completionItem.detail = "Command";
                const documentation = new vscode.MarkdownString();
                documentation.appendMarkdown('_Usage:_\n');
                documentation.appendCodeblock(func.syntax, langID);
                documentation.appendMarkdown(`\n\n${func.description}`);
                // Parameters
                func.parameters.forEach(param => {
                    documentation.appendMarkdown(`\n- \`${param.name}\`: ${param.description}`);
                });
                documentation.appendCodeblock(`Returns: ${func.returns}`);
                // Example
                if (func.example != null) {
                    documentation.appendMarkdown(`\n\n---\n\n`);
                    documentation.appendMarkdown(`*Example:*\n\`\`\`scriptal\n${func.example}\n\`\`\``);
                }
                completionItem.documentation = documentation;
                completionItems.push(completionItem);
            }
            // Detect custom commands
            const customCommands = new Set();
            while ((match = customCommandPattern.exec(text)) !== null) {
                customCommands.add(match[1]);
            }
            customCommands.forEach(command => {
                const completionItem = new vscode.CompletionItem(command, vscode.CompletionItemKind.Function);
                completionItem.detail = "Custom Command";
                completionItems.push(completionItem);
            });
            // Snippets
            completionItems.push(...snippets_1.allSnippets);
            return completionItems;
        }
    });
    // DiagnosticProvider
    vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.languageId === langID) {
            const diagnostics = (0, diagnosticsProvider_1.provideDiagnostics)(event.document);
            diagnosticCollection.set(event.document.uri, diagnostics);
            updateCustomCommands(event.document);
        }
    });
    vscode.workspace.onDidOpenTextDocument(doc => {
        if (doc.languageId === langID) {
            updateCustomCommands(doc);
        }
    });
    // Initialize command definitions in open documents
    vscode.workspace.textDocuments.forEach(doc => {
        if (doc.languageId === langID) {
            updateCustomCommands(doc);
        }
    });
    context.subscriptions.push(hoverProvider);
    context.subscriptions.push(completionProvider);
    context.subscriptions.push(diagnosticCollection);
}
exports.activate = activate;
function deactivate() {
    diagnosticCollection.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map