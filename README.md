# resources-manager
```javascript
var loader = new Loader();
var inhectors = new Injector();
injectors = {
	css: inhectors.injectCss,
	js: inhectors.injectJs
};

var rm = new ResourcesManager(loader, injectors);

var showResourcesPollToLog = function () {
	console.log('log pool resources:', rm.pool);
};

showResourcesPollToLog();
console.log('Fill resources from page...');
rm.fillFromPage();
showResourcesPollToLog();

setTimeout(function () {
	console.log('Start load resoures...');

	rm.load('//yastatic.net/jquery/2.1.4/jquery.min.js');

	rm.load('//yastatic.net/dojo/1.9.1/dojo/dojo.js', showResourcesPollToLog);

	rm.load('modernizr.js', {
		url: '//yastatic.net/modernizr/2.7.1/modernizr.min.js'
	});
}, 2000);
```
