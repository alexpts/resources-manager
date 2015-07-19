var ResourcesManager = function (loader, injectors, options) {
	var STATUS_READY = 1;
	var STATUS_PENDING = 0;
	var STATUS_ERROR = -1;

	options = options || {};
	options.moduleDir = options.moduleDir || '/modules';
	options.declarations = options.declarations || {};

	var pool = {};

	var _getExt = function (url) {
		return url.replace(/.*\.(\w+)$/, '$1').toLowerCase();
	};

	var _getUrl = function (name, params) {
		if (params.url) {
			return params.url;
		}

		if (params.relUrl) {
			return params.relUrl;
		}

		if (options.declarations[name]) {
			return _getUrl(name, options.declarations[name]);
		}

		return (/\/\//.test(name)) ? name : options.moduleDir + '/' + name;
	};

	var _isLoad = function (name, url) {
		if (_getStatus(name) === STATUS_READY) {
			if (url && pool[name].url != url) {
				console.log("Script " + name + " (" + url + ") was load, but use other url " + pool[name].url);
			}
			return true;
		}

		return false;
	};

	var _getStatus = function (name) {
		return pool[name] ? pool[name].status : false;
	};

	var _load = function (name, callback, params) {
		if (typeof callback === 'object') {
			params = callback;
			callback = function () {};
		}
		params = params || {};
		callback = callback || function () {};

		var ext = _getExt(name);
		var url = _getUrl(name, params);

		if (_isLoad(name, url) || _getStatus === STATUS_PENDING) {
			return;
		}

		pool[name] = {
			url: url,
			status: STATUS_PENDING
		};

		loader.load(url).then(function (textResource) {
			injectors[ext](textResource);
			pool[name].status = STATUS_READY;
			callback();
		}).catch(function (error) {
			console.log('Loader manager error: ' + error);
			pool[name].status = STATUS_ERROR;
		});
	};

	var _fillFromPage = function () {
		var resources = document.querySelectorAll("link[href*='\.css'], script[src*='\.js']");
		resources = Array.prototype.slice.call(resources);

		resources.forEach(function (node) {
			var url = node.getAttribute('src') || node.getAttribute('href');
			var name = node.getAttribute('data0name') || url;
			pool[name] = {
				url: url,
				status: STATUS_READY
			};
		});
	};

	return {
		loader: loader,
		pool: pool,
		load: _load,
		isLoad: _isLoad,
		fillFromPage: _fillFromPage,
		loads: function () {} // загрузить пачку компонентов и в итоге выполнить колбек
	};
};