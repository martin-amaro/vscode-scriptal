// extension.ts
import * as vscode from 'vscode';
import { keywords, events, connectors, envars } from './language';
import { functions } from './functions';
import { allSnippets } from './snippets';
import { provideDiagnostics } from './diagnosticsProvider';


const variablePattern = /[\$][_a-zA-Z][_a-zA-Z0-9]*(?:\.[_a-zA-Z0-9]+)*/g;
const customCommandPattern  = /DEFINE\s+([_a-zA-Z][_a-zA-Z0-9]*)/gm;
const langID = 'scriptal';


const diagnosticCollection = vscode.languages.createDiagnosticCollection(langID);

const customCommands: { [key: string]: string } = {};

function updateCustomCommands(document: vscode.TextDocument) {
    const text = document.getText();
    let match;

    while ((match = customCommandPattern.exec(text)) !== null) {
        const commandName = match[1];
        customCommands[commandName] = `Custom command defined as '${commandName}'`; 
    }
}

export function activate(context: vscode.ExtensionContext) {

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
            const envar = envars[word];
            if (envar) {
                const markdown = new vscode.MarkdownString();
                markdown.appendCodeblock(`${word} (envar)`, langID);
                markdown.appendMarkdown(`${envar}`);
                return new vscode.Hover(markdown);
            }

            // Commands
            const func = functions[word];
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
            const keywordDescription = keywords[word];
            if (keywordDescription) {
                const markdown = new vscode.MarkdownString();
                markdown.appendCodeblock(`${word} (keyword)`, langID);
                markdown.appendMarkdown(`${keywordDescription}`);
                return new vscode.Hover(markdown);
            }

            // Connectors
            if (connectors.includes(word)) {
                const hoverMessage = new vscode.MarkdownString();
                hoverMessage.appendCodeblock(`${word} (connector)`, langID);
                return new vscode.Hover(hoverMessage);
            }

            // Events
            const eventDescription = events[word];
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
            const completionItems: vscode.CompletionItem[] = [];

            const text = document.getText();
            const variables = new Set<string>();
            let match: RegExpExecArray | null;

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
            for (const envar in envars) {
                const completionItem = new vscode.CompletionItem(envar, vscode.CompletionItemKind.Variable);
                completionItem.detail = "Envar";
                completionItem.documentation = new vscode.MarkdownString(envars[envar]);
                completionItems.push(completionItem);
            }
            
            // Keywords
            for (const keyword in keywords) {
                const completionItem = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
                completionItem.detail = "Keyword";
                completionItem.documentation = new vscode.MarkdownString(keywords[keyword]);
                completionItems.push(completionItem);
            }

            // Connectors
            for (const connector of connectors) {
                const completionItem = new vscode.CompletionItem(connector, vscode.CompletionItemKind.Keyword);
                completionItem.detail = "Connector";
                completionItems.push(completionItem);
            }


            // Events
            for (const event in events) {
                const completionItem = new vscode.CompletionItem(event, vscode.CompletionItemKind.Keyword);
                completionItem.detail = "Event";
                completionItem.documentation = new vscode.MarkdownString(events[event]);
                completionItems.push(completionItem);
            }
            
            // Autocompletado para comandos
            for (const key in functions) {
                const func = functions[key];
                const completionItem = new vscode.CompletionItem(key, vscode.CompletionItemKind.Function);
                completionItem.detail = "Command";
                
                const documentation = new vscode.MarkdownString();
                documentation.appendMarkdown('_Usage:_\n')
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
            const customCommands = new Set<string>();
            while ((match = customCommandPattern.exec(text)) !== null) {
                customCommands.add(match[1]);
            }

            customCommands.forEach(command => {
                const completionItem = new vscode.CompletionItem(command, vscode.CompletionItemKind.Function);
                completionItem.detail = "Custom Command";

                completionItems.push(completionItem);
            });

            // Snippets
            completionItems.push(...allSnippets);

            return completionItems;
        }
    });

    // DiagnosticProvider
    vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.languageId === langID) {
            const diagnostics = provideDiagnostics(event.document);
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

export function deactivate() {
    diagnosticCollection.dispose();
}
