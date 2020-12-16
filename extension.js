// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
//import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

var my_context = null
function activate(context) {
	my_context = context
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscee" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscee.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		console.log("corey2", Date.now())
		vscode.window.showInformationMessage('Corey says Hello World from vscee!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

setInterval(corey_callback, 2000)

counter = 0
function corey_callback() {
	counter++
	console.log("corey callback", Date.now(), counter);
	// if (counter == 1) {
	// 	create_my_webview_panel()
	// }

	if (counter == 1) {
		my_show_input_box()
	}

}

async function my_show_input_box() {
	const result = await vscode.window.showInputBox({
		value: 'abcdef',
		valueSelection: [2, 4],
		placeHolder: 'For example: fedcba. But not: 123',
		validateInput: text => {
			//vscode.window.showInformationMessage(`Validating: ${text}`);
			return text === '123' ? 'Not 123!' : null;
		}
	});
	vscode.window.showInformationMessage(`Got: ${result}`, "my action one", "my action two");


}
panel = null
function create_my_webview_panel() {
	console.log("webview 1")
	panel = vscode.window.createWebviewPanel(
		"corey view type",
		'corey title',
		{
			viewColumn: vscode.ViewColumn.One,
			preserveFocus: true
		},
		{
			enableScripts: true,
			localResourceRoots: [vscode.Uri.file(path.join(my_context.extensionPath, 'webview'))]
		}
		// column || vscode.ViewColumn.One,
		// {
		// 	// Enable javascript in the webview
		// 	//enableScripts: true,

		// 	// And restrict the webview to only loading content from our extension's `media` directory.
		//localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
		// }
	);

	console.log("webview 2")
	console.log("path", my_context.extensionPath)
	vscode.workspace.openTextDocument(vscode.Uri.file(my_context.extensionPath + "/webview/my_webview.html"))
		.then(doc => {
			console.log("opening doc worked!!!!!!!!!!!!!")
			panel.webview.html = doc.getText()
		})

	//	openTextDocument(uri: Uri): Thenable<TextDocument>
	//panel.webview.html = getWebviewContent();

}

function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
	  <script>
	  function on_load() {
		  console.log("corey is logging from on load")
	  }
	  function foo() {
		  document.getElementById("hidden_div").style.display = "block"
		  console.log("corey click")
	  }
	</script>
  </head>
  <body onload="on_load()">
	  <div style="border: 3px color red; background-color:yellow;">Corey is here!</div>
	  <form>
			number? <input type=number/>

			<br>
			color?
		  <select>
		  <option>red</option>
		  <option>green</option>
		  <option>blue</option>
		  </select>
	  </form>
	  <br>
	  <button onclick="foo()">click me</button>
	  <div id="hidden_div" style="display:none">You can see me now</div>

  </body>
  </html>`;
}