var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: {
		pageA: "./pageA",
		pageB: "./pageB",
		pageC: "./pageC",
		adminPageA: "./adminPageA",
		adminPageB: "./adminPageB",
		adminPageC: "./adminPageC",
		testA: "./testA",
		// base: ["jquery","underscore"],
		base: "./base"
	},
	output: {
		path: path.join(__dirname, "js"),
		filename: "[name].js",
		// chunkFilename: "[id].js"
	},
	plugins: [
	 	// new webpack.NewWatchingPlugin(),
		// new CommonsChunkPlugin("base.js", ["jquery", "underscore"]),
		// new CommonsChunkPlugin("commons.js", ["pageA", "pageB", "admin-commons.js"], 2),
		// new CommonsChunkPlugin("ab.js", ["main",'testA']),
		// new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]),
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"base", /* filename= */"base.bundle.js"),
	]
};