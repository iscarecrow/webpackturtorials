webpackJsonp([4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(5);
	var CommonsChunkPlugin = __webpack_require__(7);
	// var webpack = require("webapck/lib/webpack");

	module.exports = {
		entry: {
			pageA: "./pageA",
			pageB: "./pageB",
			pageC: "./pageC",
			adminPageA: "./adminPageA",
			adminPageB: "./adminPageB",
			adminPageC: "./adminPageC",
			testA: "./testA",
			base: ["jquery","underscore"],
		},
		output: {
			path: path.join(__dirname, "js"),
			filename: "[name].js",
			// chunkFilename: "[id].js"
		},
		plugins: [
	    new CommonsChunkPlugin(/* chunkName= */"base", /* filename= */"base.bundle.js"),
		 	// new webpack.NewWatchingPlugin(),
			// new CommonsChunkPlugin("base.js", ["jquery", "underscore"]),
			// new CommonsChunkPlugin("commons.js", ["pageA", "pageB", "admin-commons.js"], 2),
			// new CommonsChunkPlugin("ab.js", ["main",'testA']),
			// new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]),
			// new webpack.optimize.CommonsChunkPlugin('main', 'main.js'),
		]
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	function CommonsChunkPlugin(options, filenameTemplate, selectedChunks, minChunks) {
		if(options && typeof options === "object" && !Array.isArray(options)) {
			this.chunkNames = options.name || options.names;
			this.filenameTemplate = options.filename;
			this.minChunks = options.minChunks;
			this.selectedChunks = options.chunks;
			if(options.children) this.selectedChunks = false;
			this.async = options.async;
			this.minSize = options.minSize;
		} else {
			var chunkNames = options;
			if(typeof filenameTemplate !== "string" && filenameTemplate !== null) {
				minChunks = selectedChunks;
				selectedChunks = filenameTemplate;
				filenameTemplate = chunkNames;
			}
			if(!Array.isArray(selectedChunks) && typeof selectedChunks !== "boolean" && selectedChunks !== null) {
				minChunks = selectedChunks;
				selectedChunks = undefined;
			}
			this.chunkNames = chunkNames;
			this.filenameTemplate = filenameTemplate;
			this.minChunks = minChunks;
			this.selectedChunks = selectedChunks;
		}
	}
	module.exports = CommonsChunkPlugin;
	CommonsChunkPlugin.prototype.apply = function(compiler) {
		var chunkNames = this.chunkNames;
		var filenameTemplate = this.filenameTemplate;
		var minChunks = this.minChunks;
		var selectedChunks = this.selectedChunks;
		var async = this.async;
		var minSize = this.minSize;
		compiler.plugin("this-compilation", function(compilation) {
			compilation.plugin(["optimize-chunks", "optimize-extracted-chunks"], function(chunks) {
				var commonChunks;
				if(!chunkNames && (selectedChunks === false || async)) {
					commonChunks = chunks;
				} else if(Array.isArray(chunkNames)) {
					commonChunks = chunkNames.map(function(chunkName) {
						return chunks.filter(function(chunk) {
							return chunk.name === chunkName;
						})[0];
					});
				} else {
					commonChunks = chunks.filter(function(chunk) {
						return chunk.name === chunkNames;
					});
				}
				if(commonChunks.length === 0) {
					var chunk = this.addChunk(chunkNames);
					chunk.initial = chunk.entry = true;
					commonChunks = [chunk];
				}
				commonChunks.forEach(function processCommonChunk(commonChunk, idx) {
					var commonModulesCount = [];
					var commonModules = [];
					var usedChunks;
					if(Array.isArray(selectedChunks)) {
						usedChunks = chunks.filter(function(chunk) {
							if(chunk === commonChunk) return false;
							return selectedChunks.indexOf(chunk.name) >= 0;
						});
					} else if(selectedChunks === false || async) {
						usedChunks = (commonChunk.chunks || []).filter(function(chunk) {
							// we can only move modules from this chunk if the "commonChunk" is the only parent
							return async || chunk.parents.length === 1;
						});
					} else {
						if(!commonChunk.entry) {
							compilation.errors.push(new Error("CommonsChunkPlugin: While running in normal mode it's not allowed to use a non-entry chunk (" + commonChunk.name + ")"));
							return;
						}
						usedChunks = chunks.filter(function(chunk) {
							var found = commonChunks.indexOf(chunk);
							if(found >= idx) return false;
							return chunk.entry;
						});
					}
					if(async) {
						var asyncChunk = this.addChunk(typeof async === "string" ? async : undefined);
						asyncChunk.chunkReason = "async commons chunk";
						asyncChunk.extraAsync = true;
						asyncChunk.addParent(commonChunk);
						commonChunk.addChunk(asyncChunk);
						commonChunk = asyncChunk;
					}
					usedChunks.forEach(function(chunk) {
						chunk.modules.forEach(function(module) {
							var idx = commonModules.indexOf(module);
							if(idx < 0) {
								commonModules.push(module);
								commonModulesCount.push(1);
							} else {
								commonModulesCount[idx]++;
							}
						});
					});
					var reallyUsedChunks = [];
					var reallyUsedModules = [];
					commonModulesCount.forEach(function(count, idx) {
						var module = commonModules[idx];
						if(typeof minChunks === "function") {
							if(!minChunks(module, count))
								return;
						} else if(count < (minChunks || Math.max(2, usedChunks.length))) {
							return;
						}
						reallyUsedModules.push(module);
					});
					if(minSize) {
						var size = reallyUsedModules.reduce(function(a, b) {
							return a + b.size();
						}, 0);
						if(size < minSize)
							return;
					}
					reallyUsedModules.forEach(function(module) {
						usedChunks.forEach(function(chunk) {
							if(module.removeChunk(chunk)) {
								if(reallyUsedChunks.indexOf(chunk) < 0)
									reallyUsedChunks.push(chunk);
							}
						});
						commonChunk.addModule(module);
						module.addChunk(commonChunk);
					});
					if(async) {
						reallyUsedChunks.forEach(function(chunk) {
							if(chunk.initial || chunk.entry)
								return;
							chunk.blocks.forEach(function(block) {
								block.chunks.unshift(commonChunk);
								commonChunk.addBlock(block);
							});
						});
						asyncChunk.origins = reallyUsedChunks.map(function(chunk) {
							return chunk.origins.map(function(origin) {
								var newOrigin = Object.create(origin);
								newOrigin.reasons = (origin.reasons || []).slice();
								newOrigin.reasons.push("async commons");
								return newOrigin;
							});
						}).reduce(function(arr, a) {
							arr.push.apply(arr, a);
							return arr;
						}, []);
					} else {
						usedChunks.forEach(function(chunk) {
							chunk.parents = [commonChunk];
							commonChunk.chunks.push(chunk);
							if(chunk.initial)
								commonChunk.initial = true;
							if(chunk.entry) {
								commonChunk.entry = true;
								chunk.entry = false;
							}
						});
					}
					if(filenameTemplate)
						commonChunk.filenameTemplate = filenameTemplate;
				}, this);
			});
		});
	};


/***/ }
]);