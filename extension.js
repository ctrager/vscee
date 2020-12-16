// Links related to user input
// https://stackoverflow.com/questions/36705126/vscode-extension-how-to-display-a-form
// https://github.com/microsoft/vscode-extension-samples/blob/master/quickinput-sample/src/multiStepInput.ts
// https://code.visualstudio.com/api/extension-guides/webview



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
		vscode.window.showInformationMessage('Corey says Hello World from vscee!');
	});

	context.subscriptions.push(disposable);

	// Corey says...pretend something happens
	// setTimeout(something_happened, 500)
	setTimeout(create_webview_panel, 500);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

// showInformationMessage
async function something_happened() {

	console.log("something_happened");

	await vscode.window.showInformationMessage("Chose one or two",
		"show input box",
		"don't show").then(choice => {

			console.log("after info")
			vscode.window.showInformationMessage(`you chose ${choice}`)

			if (choice == "show input box") {
				show_input_box()
			}
		})
}

// showInputBox
async function show_input_box() {

	console.log("show_input_box")

	await vscode.window.showInputBox({
		value: "red",
		placeHolder: "Enter your favorite color - try 'cat'",
		validateInput: text => {
			return text === "cat" ? "cat is not a color!" : null
		}
	}).then(text => {

		console.log("after input")
		vscode.window.showInformationMessage(text)
		show_quick_pick()
	});

}


// showQuickPick
async function show_quick_pick() {

	console.log("show_quick_pick")

	var items = ["corey", "misayo", "abi", "isaac"]
	var options = {canPickMany: true, placeHolder: "who do you love?"}
	await vscode.window.showQuickPick(items, options).then(selection => {

		console.log("after quick pick")
		vscode.window.showInformationMessage(JSON.stringify(selection))
		create_webview_panel()
	});

}

// createWebViewPanel

// To see console.log from my_webview.html:
// ctrl-p in vscode, then "Developer: Open WebView Developer Tools"
var panel = null

function create_webview_panel() {
	console.log("create_webview_panel")

	var show_options = {
		viewColumn: vscode.ViewColumn.One,
		preserveFocus: false
	}

	var options = {
		enableScripts: true,
		localResourceRoots: [vscode.Uri.file(path.join(my_context.extensionPath, 'webview'))]
	}

	panel = vscode.window.createWebviewPanel(
		"corey view type",
		'corey title',
		show_options,
		options);

	console.log("after create webview panel")

	vscode.workspace.openTextDocument(vscode.Uri.file(my_context.extensionPath + "/webview/my_webview.html"))
		.then(doc => {
			console.log("after open text document")
			panel.webview.html = doc.getText()
		})

	setInterval(post_message_to_webview, 4000)

	panel.webview.onDidReceiveMessage(message => {
		console.log(message)
	})
}

function post_message_to_webview() {
	console.log("posting...")
	panel.webview.postMessage({foo: "bar", time: new Date().toTimeString()})
}