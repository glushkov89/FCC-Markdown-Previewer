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
		},
		clearEditor: function() {
			$(ids.editor).val("");
			$(ids.preview).text("");
		},
		attachEventHandlers: function() {
			$(ids.clear).click(this.clearEditor);
			$(ids.editor).on("input", this.convertText);
		}
	};
})();

$(document).ready(() => {
	appMod.convertText();
	appMod.attachEventHandlers();
});
