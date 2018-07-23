const appMod = (function() {
	const ids = {
		preview: "#preview",
		editor: "#editor",
		clear: "#clear-editor"
	};

	var myMarked = require("marked");
	var newRenderer = new myMarked.Renderer();
	newRenderer.link = function(href, title, text) {
		return `<a title=${title} href="${href}" target="_blank">${text}</a>`;
	};

	const myMarkedSettings = {
		gfm: true,
		breaks: true,
		renderer: newRenderer
	};
	return {
		convertText: function() {
			$(ids.preview).html(myMarked($(ids.editor).val(), myMarkedSettings));
			console.log("Converted");
		},
		clearEditor: function() {
			$(ids.editor).val("");
			$(ids.preview).text("");
			console.log("Clear");
		},
		attachEventHandlers: function() {
			$(ids.clear).click(this.clearEditor);
			$(ids.editor).on("input", this.convertText);
		}
	};
})();

$(document).ready(() => {
	console.log("Document ready");
	appMod.convertText();
	appMod.attachEventHandlers();

	// $("#clear-editor").click(appMod.clearEditor);
	// $("#editor").on("input", appMod.convertText);
	// const ids = appMod.getIds();
	// $(ids.clear).click(appMod.clearEditor);
	// appMod.convertText();

	// console.log("Mrkdwn finished");
});
