import * as vscode from 'vscode';
import { parse } from 'jest-editor-support';

async function addConsoleLog() {
  let lineNumStr = await vscode.window.showInputBox({
    prompt: 'Line Number',
  });

  let lineNum = +(lineNumStr || 0);

  let insertionLocation = new vscode.Range(lineNum - 1, 0, lineNum - 1, 0);
  let snippet = new vscode.SnippetString('console.log($1);\n');

  vscode.window.activeTextEditor!.insertSnippet(snippet, insertionLocation);
}

export function activate(context: vscode.ExtensionContext) {
  let commandDisposable = vscode.commands.registerCommand(
    'extension.addConsoleLog',
    addConsoleLog
  );

  context.subscriptions.push(commandDisposable);

  let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
    {
      // pattern: '**/*.tsx',
      language: 'javascript',
      scheme: 'file',
    },
    new MyCodeLensProvider()
  );

  context.subscriptions.push(codeLensProviderDisposable);
}

class MyCodeLensProvider implements vscode.CodeLensProvider {
  async provideCodeLenses(
    document: vscode.TextDocument
  ): Promise<vscode.CodeLens[]> {
		debugger;
    // const p = document.getText();
    // const parsed = parse(p);

    let topOfDocument = new vscode.Range(0, 0, 0, 0);

    let c: vscode.Command = {
      command: 'extension.addConsoleLog',
      title: 'Insert console.log',
    };

    let codeLens = new vscode.CodeLens(topOfDocument, c);

    return [codeLens];
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
