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
exports.ScriptalSemanticTokensProvider = void 0;
const vscode = __importStar(require("vscode"));
class ScriptalSemanticTokensProvider {
    // Array de tokens a generar: cada elemento tiene { startLine, startChar, endLine, endChar, tokenType }
    static TOKENS = [
        { startLine: 0, startChar: 0, endLine: 0, endChar: 10, tokenType: 'support.function.builtin.scriptal' },
        { startLine: 1, startChar: 5, endLine: 1, endChar: 15, tokenType: 'keyword.control.scriptal' }
        // Añade más tokens aquí según sea necesario
    ];
    provideDocumentSemanticTokens(document) {
        const tokensBuilder = new vscode.SemanticTokensBuilder();
        for (const { startLine, startChar, endLine, endChar, tokenType } of ScriptalSemanticTokensProvider.TOKENS) {
            const startPos = new vscode.Position(startLine, startChar);
            const endPos = new vscode.Position(endLine, endChar);
            tokensBuilder.push(new vscode.Range(startPos, endPos), tokenType);
        }
        return tokensBuilder.build();
    }
}
exports.ScriptalSemanticTokensProvider = ScriptalSemanticTokensProvider;
//# sourceMappingURL=semanticTokensProvider.js.map