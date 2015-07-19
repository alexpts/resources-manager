var Injector = function () {};

Injector.prototype.injectCss = function (code) {
	var script = document.createElement("style");
	script.innerText = code;
	script.type = 'text/css'
	document.head.appendChild(script);
};

Injector.prototype.injectJs = function (code) {
	var script = document.createElement("script");
	script.text = code;
	document.head.appendChild(script).parentNode.removeChild(script);
};