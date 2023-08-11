const vscode = require("vscode");

const ColorProvider = require("./colorProvider");
const WikiProvider = require("./wikiProvider");

class LAUX {
	constructor(extension) {
		console.time("vscode-luax")
		console.log("vscode-luax loading...");

		this.extension = extension;
		this.tmpFiles = {};

		new ColorProvider(this);
		new WikiProvider(this);

		console.log("vscode-luax activated");
		console.timeEnd("vscode-luax");

		this.registerEvents(this);
	}

	registerEvents(LAUX) {
		vscode.workspace.onDidCloseTextDocument((textDocument) => LAUX.onDidCloseTextDocument(textDocument));
	}

	onDidCloseTextDocument(textDocument) {
		if (textDocument.uri.fsPath in this.tmpFiles) {
			this.tmpFiles[textDocument.uri.fsPath].dispose();
		}
	}
}

let LAUXInstance;
module.exports = {
	activate: (extension) => LAUXInstance = new LAUX(extension),
	deactivate: () => {
		if (LAUXInstance && LAUXInstance.downloadingMsg) {
			LAUXInstance.downloadingMsg.dispose();
		}
	}
};