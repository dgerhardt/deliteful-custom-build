require([
	"delite/register",
	"delite/theme!delite/themes/defaultapp.css",
	"delite/theme!delite/themes/{{theme}}/global.css",
	"delite/css!app/css/app.css",
	"deliteful/ViewStack",
	"deliteful/SidePane",
	"deliteful/LinearLayout",
	"deliteful/Button",
	"deliteful/StarRating",
	"deliteful/ProgressBar",
	"deliteful/ProgressIndicator",
	"deliteful/list/List",
	"requirejs-domready/domReady!"
], function(register) {
	register.parse();
	document.body.style.display = "";
	list.selectedItem = list.store.get("first");
});
