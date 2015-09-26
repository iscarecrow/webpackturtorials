var path = require("path");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
// var webpack = require("webapck/lib/webpack");

module.exports = {
	entry: {
		pageA: "./pageA",
		pageB: "./pageB",
		pageC: "./pageC",
		adminPageA: "./adminPageA",
		adminPageB: "./adminPageB",
		adminPageC: "./adminPageC",
		main: "./main",
		testA: "./testA",
		common: "./common"
	},
	output: {
		path: path.join(__dirname, "js"),
		filename: "[name].js",
		// chunkFilename: "[id].js"
	},
	plugins: [
	 	// new webpack.NewWatchingPlugin(),
		new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
		// new CommonsChunkPlugin("commons.js", ["pageA", "pageB", "admin-commons.js"], 2),
		new CommonsChunkPlugin("ab.js", ["main",'testA']),
		new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]),
		// new webpack.optimize.CommonsChunkPlugin('main', 'main.js'),
	]
};