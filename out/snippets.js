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
exports.allSnippets = void 0;
const vscode = __importStar(require("vscode"));
exports.allSnippets = [];
function addSnippet(text, code, doc) {
    const Snippet = new vscode.CompletionItem(text, vscode.CompletionItemKind.Snippet);
    Snippet.insertText = new vscode.SnippetString(code);
    Snippet.detail = 'Snippet';
    Snippet.documentation = new vscode.MarkdownString(doc);
    exports.allSnippets.push(Snippet);
}
addSnippet('ON END', 'ON END\n\t$1', 'Inserts an ON END event block');
addSnippet('ON START', 'ON START\n\t$1', 'Inserts an ON START event block');
addSnippet('ON EACH_LINE', 'ON EACH_LINE\n\t$1', 'Inserts an ON EACH_LINE event block');
addSnippet('ON EVEN_LINES', 'ON EVEN_LINES\n\t$1', 'Inserts an ON EVEN_LINES event block');
addSnippet('ON ODD_LINES', 'ON ODD_LINES\n\t$1', 'Inserts an ON ODD_LINES event block');
addSnippet('ON CONTENT_LINES', 'ON CONTENT_LINES\n\t$1', 'Inserts an ON CONTENT_LINES event block');
addSnippet('ON EMPTY_LINES', 'ON EMPTY_LINES\n\t$1', 'Inserts an ON EMPTY_LINES event block');
addSnippet('ON GLOBAL', 'ON GLOBAL\n\t$1', 'Inserts a GLOBAL event block');
addSnippet('TRY CATCH', 'TRY\n\t$1\nCATCH\n\t$2', 'Inserts a TRY block with a CATCH block');
addSnippet('WHEN ELSE', 'WHEN $1\n\t$2\nELSE\n\t$3', 'Inserts a WHEN block with an ELSE block');
addSnippet('DEFINE', 'DEFINE ${1:FUNCTION_NAME}\n\t$2', 'Inserts a command definition');
addSnippet('DEFINE PARAMS', 'DEFINE ${1:FUNCTION_NAME}\n\tPARAMS [$2]\n\t$3', 'Inserts a command definition with parameters.');
addSnippet('$$', 'SET \$${1:var} AS ${2:""}', 'Inserts a variable declaration');
addSnippet('LOREM IPSUM', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae est et nisi feugiat auctor.', 'Inserts a Lorem Ipsum placeholder text');
//# sourceMappingURL=snippets.js.map