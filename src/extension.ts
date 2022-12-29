// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { apiBaseUrl } from './constants';
import { HelloWorldPanel } from './HelloWorldPanel';
import { SidebarProvider } from './SidebarProvider';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// sidebar provide
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"vsscrum-sidebar",
		sidebarProvider
		)
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-scrum-extension.authenticate', () => {
			// The code you place here will be executed every time your command is executed
			vscode.commands.executeCommand(
				"vscode.open", vscode.Uri.parse(`${apiBaseUrl}customers/customers`)				
			);
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-scrum-extension.developers', () => {
			// The code you place here will be executed every time your command is executed
			vscode.commands.executeCommand(
				"vscode.open", vscode.Uri.parse(`${apiBaseUrl}developers/developers`)				
			);
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-scrum-extension.scrummasters', () => {
			// The code you place here will be executed every time your command is executed
			vscode.commands.executeCommand(
				"vscode.open", vscode.Uri.parse(`${apiBaseUrl}scrummasters/scrummasters`)				
			);
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-scrum-extension.services', () => {
			// The code you place here will be executed every time your command is executed
			vscode.commands.executeCommand(
				"vscode.open", vscode.Uri.parse(`${apiBaseUrl}services/services`)				
			);
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-scrum-extension.refresh', async () => {
			// The code you place here will be executed every time your command is executed
			// HelloWorldPanel.kill();
			// HelloWorldPanel.createOrShow(context.extensionUri);
			await vscode.commands.executeCommand(
				"workbench.action.closeSidebar"
			);
			await vscode.commands.executeCommand(
				"workbench.view.extension.vsscrum-sidebar-view"
			);
			
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
