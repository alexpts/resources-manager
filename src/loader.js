var Loader = function () {};

Loader.prototype.load = function (url) {
	return fetch(url).then(function (response) {
		if (response.status === 200) {
			return response.text();
		}
	});
};