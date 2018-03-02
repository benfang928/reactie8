/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "a32b822eaf0b7674fe1f"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	__webpack_require__(124);
	module.exports = __webpack_require__(53);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * IE6+，有问题请加QQ 370262116 by 司徒正美 Copyright 2018-02-06
	 */

	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.React = factory());
	}(this, (function () {

	var hasSymbol = typeof Symbol === "function" && Symbol["for"];
	var innerHTML = "dangerouslySetInnerHTML";
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol["for"]("react.element") : 0xeac7;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol["for"]("react.fragment") : 0xeacb;



	var emptyArray = [];
	var emptyObject = {};
	function deprecatedWarn(methodName) {
	    if (!deprecatedWarn[methodName]) {
	        //eslint-disable-next-line
	        console.warn(methodName + " is deprecated");
	        deprecatedWarn[methodName] = 1;
	    }
	}
	/**
	 * 复制一个对象的属性到另一个对象
	 *
	 * @param {any} obj
	 * @param {any} props
	 * @returns
	 */
	function extend(obj, props) {
	    for (var i in props) {
	        if (hasOwnProperty.call(props, i)) {
	            obj[i] = props[i];
	        }
	    }
	    return obj;
	}
	function returnFalse() {
	    return false;
	}
	function returnTrue() {
	    return true;
	}
	var __type = Object.prototype.toString;

	/**
	 * 一个空函数
	 *
	 * @export
	 */
	function noop() {}

	/**
	 * 类继承
	 *
	 * @export
	 * @param {any} SubClass
	 * @param {any} SupClass
	 */
	function inherit(SubClass, SupClass) {
	    function Bridge() {}
	    var orig = SubClass.prototype;
	    Bridge.prototype = SupClass.prototype;
	    var fn = SubClass.prototype = new Bridge();

	    // 避免原型链拉长导致方法查找的性能开销
	    extend(fn, orig);
	    fn.constructor = SubClass;
	    return fn;
	}

	var lowerCache = {};
	function toLowerCase(s) {
	    return lowerCache[s] || (lowerCache[s] = s.toLowerCase());
	}

	function clearArray(a) {
	    return a.splice(0, a.length);
	}

	function isFn(obj) {
	    return __type.call(obj) === "[object Function]";
	}

	var rword = /[^, ]+/g;

	function oneObject(array, val) {
	    if (array + "" === array) {
	        //利用字符串的特征进行优化，字符串加上一个空字符串等于自身
	        array = array.match(rword) || [];
	    }
	    var result = {},

	    //eslint-disable-next-line
	    value = val !== void 666 ? val : 1;
	    for (var i = 0, n = array.length; i < n; i++) {
	        result[array[i]] = value;
	    }
	    return result;
	}

	var rcamelize = /[-_][^-_]/g;
	function camelize(target) {
	    //提前判断，提高getStyle等的效率
	    if (!target || target.indexOf("-") < 0 && target.indexOf("_") < 0) {
	        return target;
	    }
	    //转换为驼峰风格
	    var str = target.replace(rcamelize, function (match) {
	        return match.charAt(1).toUpperCase();
	    });
	    return firstLetterLower(str);
	}

	function firstLetterLower(str) {
	    return str.charAt(0).toLowerCase() + str.slice(1);
	}

	var options = oneObject(["beforeProps", "afterCreate", "beforeInsert", "beforeDelete", "beforeUpdate", "afterUpdate", "beforePatch", "afterPatch", "beforeUnmount", "afterMount"], noop);

	var numberMap = {
	    //null undefined IE6-8这里会返回[object Object]
	    "[object Boolean]": 2,
	    "[object Number]": 3,
	    "[object String]": 4,
	    "[object Function]": 5,
	    "[object Symbol]": 6,
	    "[object Array]": 7
	};
	// undefined: 0, null: 1, boolean:2, number: 3, string: 4, function: 5, symbol:6, array: 7, object:8
	function typeNumber(data) {
	    if (data === null) {
	        return 1;
	    }
	    if (data === void 666) {
	        return 0;
	    }
	    var a = numberMap[__type.call(data)];
	    return a || 8;
	}

	var toArray = Array.from || function (a) {
	    var ret = [];
	    for (var i = 0, n = a.length; i < n; i++) {
	        ret[i] = a[i];
	    }
	    return ret;
	};

	//fix 0.14对此方法的改动，之前refs里面保存的是虚拟DOM
	function getDOMNode() {
	    return this;
	}
	var pendingRefs = [];
	window.pendingRefs = pendingRefs;
	var Refs = {
	    mountOrder: 1,
	    currentOwner: null,
	    controlledCbs: [],
	    // errorHook: string,//发生错误的生命周期钩子
	    // errorInfo: [],    //已经构建好的错误信息
	    // doctors: null     //医生节点
	    // error: null       //第一个捕捉到的错误
	    fireRef: function fireRef(vnode, dom) {
	        if (vnode._disposed || vnode.stateNode.__isStateless) {
	            dom = null;
	        }
	        var ref = vnode.ref;
	        if (typeof ref === "function") {
	            return ref(dom);
	        }
	        var owner = vnode._owner;
	        if (!ref) {
	            return;
	        }
	        if (!owner) {
	            throw "Element ref was specified as a string (" + ref + ") but no owner was set";
	        }
	        if (dom) {
	            if (dom.nodeType) {
	                dom.getDOMNode = getDOMNode;
	            }
	            owner.refs[ref] = dom;
	        } else {
	            delete owner.refs[ref];
	        }
	    }
	};

	var mapVtype = {
	    0: 6,
	    4: 1,
	    2: 2,
	    1: 5
	};
	function Vnode(type, vtype, props, key, ref) {
	    this.type = type;
	    this.vtype = vtype;
	    this.tag = mapVtype[vtype];
	    if (vtype) {
	        this.props = props;
	        this._owner = Refs.currentOwner;

	        if (key) {
	            this.key = key;
	        }

	        var refType = typeNumber(ref);
	        if (refType === 3 || refType === 4 || refType === 5) {
	            //number, string, function
	            this._hasRef = true;
	            this.ref = ref;
	        }
	    }
	    /*
	      this.stateNode = null
	    */

	    options.afterCreate(this);
	}

	Vnode.prototype = {
	    getDOMNode: function getDOMNode() {
	        return this.stateNode || null;
	    },


	    $$typeof: REACT_ELEMENT_TYPE
	};

	function Fragment(props) {
	    return props.children;
	}
	/**
	 * 虚拟DOM工厂
	 *
	 * @param {string|function|Component} type
	 * @param {object} props
	 * @param {array} ...children
	 * @returns
	 */

	function createElement(type, config) {
	    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        children[_key - 2] = arguments[_key];
	    }

	    var props = {},
	        vtype = 1,
	        key = null,
	        ref = null,
	        argsLen = children.length;
	    if (type && type.call) {
	        vtype = type.prototype && type.prototype.render ? 2 : 4;
	    } else if (type === REACT_FRAGMENT_TYPE) {
	        type = Fragment, vtype = 4;
	    } else if (type + "" !== type) {
	        throw "React.createElement第一个参数只能是函数或字符串";
	    }
	    if (config != null) {
	        for (var i in config) {
	            var val = config[i];
	            if (i === "key") {
	                if (val !== void 0) {
	                    key = val + "";
	                }
	            } else if (i === "ref") {
	                if (val !== void 0) {
	                    ref = val;
	                }
	            } else {
	                props[i] = val;
	            }
	        }
	    }

	    if (argsLen === 1) {
	        props.children = children[0];
	    } else if (argsLen > 1) {
	        props.children = children;
	    }

	    var defaultProps = type.defaultProps;
	    if (defaultProps) {
	        for (var propName in defaultProps) {
	            if (props[propName] === void 666) {
	                props[propName] = defaultProps[propName];
	            }
	        }
	    }
	    return new Vnode(type, vtype, props, key, ref);
	}

	function createVText(type, text) {
	    var vnode = new Vnode(type, 0);
	    vnode.text = text;
	    return vnode;
	}

	// 用于辅助XML元素的生成（svg, math),
	// 它们需要根据父节点的tagName与namespaceURI,知道自己是存在什么文档中
	function createVnode(node) {
	    var type = node.nodeName,
	        vnode;
	    if (node.nodeType === 1) {
	        vnode = new Vnode(type, 1);
	        var ns = node.namespaceURI;
	        if (!ns || ns.indexOf("html") >= 22) {
	            vnode.type = type.toLowerCase(); //HTML的虚拟DOM的type需要小写化
	        } else {
	            //非HTML需要加上命名空间
	            vnode.namespaceURI = ns;
	        }
	        vnode.props = getProps(node);
	    } else {
	        vnode = createVText(type, node.nodeValue);
	    }
	    vnode.stateNode = node;
	    return vnode;
	}

	function getProps(node) {
	    var attrs = node.attributes,
	        props = {};
	    for (var i = 0, attr; attr = attrs[i++];) {
	        if (attr.specified) {
	            var name = attr.name;
	            if (name === "class") {
	                name = "className";
	            }
	            props[name] = attr.value;
	        }
	    }
	    return props;
	}

	var lastText;
	var flattenIndex;
	var flattenObject;
	var flattenPrev;
	var flattenArray;
	function flattenCb(child, index, vnode) {
	    var childType = typeNumber(child);
	    if (childType < 3) {
	        //在React16中undefined, null, boolean不会产生节点
	        lastText = null;
	        return;
	    } else if (childType < 5) {
	        //number string
	        if (lastText) {
	            //合并相邻的文本节点
	            lastText.text += child;
	            return;
	        }
	        lastText = child = createVText("#text", child + "");
	    } else {
	        lastText = null;
	    }
	    var key = child.key;
	    if (key && !flattenObject[".$" + key]) {
	        flattenObject[".$" + key] = child;
	    } else {
	        if (index === ".") {
	            index = "." + flattenIndex;
	        }
	        flattenObject[index] = child;
	    }
	    child.index = flattenIndex;
	    child["return"] = vnode;
	    if (flattenPrev) {
	        flattenPrev.sibling = child;
	    }
	    flattenPrev = child;
	    flattenIndex++;
	    flattenArray.push(child);
	}

	function fiberizeChildren(c, updater) {
	    flattenObject = {};
	    flattenPrev = null;
	    flattenArray = [];
	    var vnode = updater._reactInternalFiber;
	    if (c !== void 666) {
	        lastText = null;
	        flattenIndex = 0;
	        operateChildren(c, "", flattenCb, vnode);
	        var child = flattenArray[0];
	        if (child) {
	            vnode.child = child;
	        }
	        if (flattenPrev) {
	            delete flattenPrev.sibling;
	        }
	    }
	    return updater.children = flattenObject;
	}

	function operateChildren(children, prefix, callback, parent) {
	    var iteratorFn;
	    if (children) {
	        if (children.forEach) {
	            children.forEach(function (el, i) {
	                operateChildren(el, prefix ? prefix + ":" + i : "." + i, callback, parent);
	            });
	            return;
	        } else if (iteratorFn = getIteractor(children)) {
	            var iterator = iteratorFn.call(children),
	                ii = 0,
	                step;
	            while (!(step = iterator.next()).done) {
	                operateChildren(step.value, prefix ? prefix + ":" + ii : "." + ii, callback, parent);
	                ii++;
	            }
	            return;
	        }
	    }
	    if (Object(children) === children && !children.call && !children.type) {
	        throw "children中存在非法的对象";
	    }
	    callback(children, prefix || ".", parent);
	}
	var REAL_SYMBOL = hasSymbol && Symbol.iterator;
	var FAKE_SYMBOL = "@@iterator";
	function getIteractor(a) {
	    if (typeNumber(a) > 7) {
	        var iteratorFn = REAL_SYMBOL && a[REAL_SYMBOL] || a[FAKE_SYMBOL];
	        if (iteratorFn && iteratorFn.call) {
	            return iteratorFn;
	        }
	    }
	}

	function cloneElement(vnode, props) {
	    if (!vnode.vtype) {
	        var clone = extend({}, vnode);
	        delete clone._disposed;
	        return clone;
	    }
	    var owner = vnode._owner,
	        lastOwn = Refs.currentOwner,
	        old = vnode.props,
	        configs = {};
	    if (props) {
	        extend(extend(configs, old), props);
	        configs.key = props.key !== void 666 ? props.key : vnode.key;
	        if (props.ref !== void 666) {
	            configs.ref = props.ref;
	            owner = lastOwn;
	        } else if (vnode._hasRef) {
	            configs.ref = vnode.ref;
	        }
	    } else {
	        configs = old;
	    }
	    for (var i in configs) {
	        if (i !== "children" && configs[i] && configs[i].$$typeof) {
	            configs[i] = cloneElement(configs[i]);
	        }
	    }
	    Refs.currentOwner = owner;

	    var args = [].slice.call(arguments, 0),
	        argsLength = args.length;
	    args[0] = vnode.type;
	    args[1] = configs;
	    if (argsLength === 2 && configs.children) {
	        delete configs.children._disposed;
	        args.push(configs.children);
	    }
	    var ret = createElement.apply(null, args);
	    Refs.currentOwner = lastOwn;
	    return ret;
	}

	var mapStack = [];
	function mapWrapperCb(old, prefix) {
	    if (old === void 0 || old === false || old === true) {
	        old = null;
	    }
	    var cur = mapStack[0];
	    var el = cur.callback.call(cur.context, old, cur.index);
	    var index = cur.index;
	    cur.index++;
	    if (cur.isEach || el == null) {
	        return;
	    }
	    if (el.vtype) {
	        //如果返回的el等于old,还需要使用原来的key, _prefix
	        var key = computeKey(old, el, prefix, index);
	        cur.arr.push(cloneElement(el, { key: key }));
	    } else if (el.type) {
	        cur.arr.push(extend({}, el));
	    } else {
	        cur.arr.push(el);
	    }
	}
	function K(el) {
	    return el;
	}
	var Children = {
	    only: function only(children) {
	        //only方法接受的参数只能是一个对象，不能是多个对象（数组）。
	        if (children && children.vtype) {
	            return children;
	        }
	        throw new Error("expect only one child");
	    },
	    count: function count(children) {
	        if (children == null) {
	            return 0;
	        }
	        var index = 0;
	        operateChildren(children, "", function () {
	            index++;
	        });
	        return index;
	    },
	    map: function map(children, callback, context, isEach) {
	        if (children == null) {
	            return children;
	        }
	        mapStack.unshift({
	            index: 0,
	            callback: callback,
	            context: context,
	            isEach: isEach,
	            arr: []
	        });
	        operateChildren(children, "", mapWrapperCb);
	        var top = mapStack.shift();
	        return top.arr;
	    },
	    forEach: function forEach(children, callback, context) {
	        Children.map(children, callback, context, true);
	    },

	    toArray: function toArray$$1(children) {
	        if (children == null) {
	            return [];
	        }
	        return Children.map(children, K);
	    }
	};
	var rthimNumer = /\d+\$/;
	function computeKey(old, el, prefix, index) {
	    var curKey = el && el.key != null ? escapeKey(el.key) : null;
	    var oldKey = old && old.key != null ? escapeKey(old.key) : null;
	    var key = void 0;
	    if (oldKey && curKey) {
	        key = prefix + "$" + oldKey;
	        if (oldKey !== curKey) {
	            key = curKey + "/" + key;
	        }
	    } else {
	        key = curKey || oldKey;
	        if (key) {
	            key = prefix + "$" + key;
	        } else {
	            key = prefix === "." ? prefix + index : prefix;
	        }
	    }
	    return key.replace(rthimNumer, "$");
	}

	function escapeKey(key) {
	    return String(key).replace(/[=:]/g, escaperFn);
	}

	var escaperLookup = {
	    "=": "=0",
	    ":": "=2"
	};

	function escaperFn(match) {
	    return escaperLookup[match];
	}

	//用于后端的元素节点
	function DOMElement(type) {
	    this.nodeName = type;
	    this.style = {};
	    this.children = [];
	}

	var NAMESPACE = {
	    svg: "http://www.w3.org/2000/svg",
	    xmlns: "http://www.w3.org/2000/xmlns/",
	    xlink: "http://www.w3.org/1999/xlink",
	    math: "http://www.w3.org/1998/Math/MathML"
	};

	var fn = DOMElement.prototype = {
	    contains: Boolean
	};
	String("replaceChild,appendChild,removeAttributeNS,setAttributeNS,removeAttribute,setAttribute" + ",getAttribute,insertBefore,removeChild,addEventListener,removeEventListener,attachEvent" + ",detachEvent").replace(/\w+/g, function (name) {
	    fn[name] = function () {
	        console.log("fire " + name); // eslint-disable-line
	    };
	});

	//用于后端的document
	var fakeDoc = new DOMElement();
	fakeDoc.createElement = fakeDoc.createElementNS = fakeDoc.createDocumentFragment = function (type) {
	    return new DOMElement(type);
	};
	fakeDoc.createTextNode = fakeDoc.createComment = Boolean;
	fakeDoc.documentElement = new DOMElement("html");
	fakeDoc.body = new DOMElement("body");
	fakeDoc.nodeName = "#document";
	fakeDoc.textContent = "";
	try {
	    var w = window;
	    var b = !!w.alert;
	} catch (e) {
	    b = false;
	    w = {
	        document: fakeDoc
	    };
	}


	var win = w;

	var document = w.document || fakeDoc;

	var duplexMap = {
	    color: 1,
	    date: 1,
	    datetime: 1,
	    "datetime-local": 1,
	    email: 1,
	    month: 1,
	    number: 1,
	    password: 1,
	    range: 1,
	    search: 1,
	    tel: 1,
	    text: 1,
	    time: 1,
	    url: 1,
	    week: 1,
	    textarea: 1,
	    checkbox: 2,
	    radio: 2,
	    "select-one": 3,
	    "select-multiple": 3
	};
	var isStandard = "textContent" in document;
	var fragment = document.createDocumentFragment();
	function emptyElement(node) {
	    var child;
	    while (child = node.firstChild) {
	        emptyElement(child);
	        if (child === Refs.focusNode) {
	            Refs.focusNode = false;
	        }
	        node.removeChild(child);
	    }
	}

	var recyclables = {
	    "#text": []
	};
	function removeElement(node) {
	    if (!node) {
	        return;
	    }
	    if (node.nodeType === 1) {
	        if (isStandard) {
	            node.textContent = "";
	        } else {
	            emptyElement(node);
	        }
	        node.__events = null;
	    } else if (node.nodeType === 3) {
	        //只回收文本节点
	        if (recyclables["#text"].length < 100) {
	            recyclables["#text"].push(node);
	        }
	    }
	    if (node === Refs.focusNode) {
	        Refs.focusNode = false;
	    }
	    fragment.appendChild(node);
	    fragment.removeChild(node);
	}

	var versions = {
	    88: 7, //IE7-8 objectobject
	    80: 6, //IE6 objectundefined
	    "00": NaN, // other modern browsers
	    "08": NaN
	};
	/* istanbul ignore next  */
	var msie = document.documentMode || versions[typeNumber(document.all) + "" + typeNumber(win.XMLHttpRequest)];

	var modern = /NaN|undefined/.test(msie) || msie > 8;

	function createElement$1(vnode, p) {
	    var type = vnode.type,
	        ns;
	    switch (type) {
	        case "#text":
	            //只重复利用文本节点
	            var node = recyclables[type].pop();
	            if (node) {
	                node.nodeValue = vnode.text;
	                return node;
	            }
	            return document.createTextNode(vnode.text);
	        case "#comment":
	            return document.createComment(vnode.text);
	        case "svg":
	            ns = NAMESPACE.svg;
	            break;
	        case "math":
	            ns = NAMESPACE.math;
	            break;
	        case "div":
	        case "span":
	        case "p":
	        case "tr":
	        case "td":
	        case "li":
	            ns = "";
	            break;
	        default:
	            ns = vnode.namespaceURI;
	            if (!ns) {
	                do {
	                    if (p.vtype === 1) {
	                        ns = p.namespaceURI;
	                        if (p.type === "foreignObject") {
	                            ns = "";
	                        }
	                        break;
	                    }
	                } while (p = p["return"]);
	            }
	            break;
	    }
	    try {
	        if (ns) {
	            vnode.namespaceURI = ns;
	            return document.createElementNS(ns, type);
	        }
	        //eslint-disable-next-line
	    } catch (e) {}
	    var elem = document.createElement(type);
	    var inputType = vnode.props && vnode.props.type; //IE6-8下立即设置type属性
	    if (inputType) {
	        elem.type = inputType;
	    }
	    return elem;
	}
	function contains(a, b) {
	    if (b) {
	        while (b = b.parentNode) {
	            if (b === a) {
	                return true;
	            }
	        }
	    }
	    return false;
	}
	function insertElement(vnode, insertPoint) {
	    if (vnode._disposed) {
	        return;
	    }
	    //找到可用的父节点
	    var p = vnode["return"],
	        parentNode;
	    while (p) {
	        if (p.vtype === 1) {
	            parentNode = p.stateNode;
	            break;
	        }
	        p = p.superReturn || p["return"];
	    }

	    var dom = vnode.stateNode,

	    //如果没有插入点，则插入到当前父节点的第一个节点之前
	    after = insertPoint ? insertPoint.nextSibling : parentNode.firstChild;
	    if (after === dom) {
	        return;
	    }
	    if (after === null && dom === parentNode.lastChild) {
	        return;
	    }
	    var isElement = vnode.vtype;

	    var prevFocus = isElement && document.activeElement;
	    parentNode.insertBefore(dom, after);
	    if (isElement && prevFocus !== document.activeElement && contains(document.body, prevFocus)) {
	        try {
	            Refs.focusNode = prevFocus;
	            prevFocus.__inner__ = true;
	            prevFocus.focus();
	        } catch (e) {
	            prevFocus.__inner__ = false;
	        }
	    }
	}

	var topVnodes = [];
	var topNodes = [];

	function disposeVnode(vnode, updateQueue, silent) {
	    if (vnode && !vnode._disposed) {
	        options.beforeDelete(vnode);
	        if (vnode.isTop) {
	            var i = topVnodes.indexOf(vnode);
	            if (i !== -1) {
	                topVnodes.splice(i, 1);
	                topNodes.splice(i, 1);
	            }
	        }

	        if (vnode.superReturn) {
	            var dom = vnode.superReturn.stateNode;
	            delete dom.__events;
	        }
	        if (vnode.vtype > 1) {
	            disposeComponent(vnode, updateQueue, silent);
	        } else {
	            if (vnode.vtype === 1) {
	                disposeElement(vnode, updateQueue, silent);
	            }
	            updateQueue.push({
	                node: vnode.stateNode,
	                vnode: vnode,
	                transition: remove
	            });
	        }
	    }
	}
	function remove() {
	    this.vnode._disposed = true;
	    delete this.vnode.stateNode;
	    removeElement(this.node);
	}
	function disposeElement(vnode, updateQueue, silent) {
	    var updater = vnode.updater;

	    if (!silent) {
	        updater.addState("dispose");
	        updateQueue.push(updater);
	    } else {
	        if (updater.isMounted()) {
	            updater._states = ["dispose"];
	            updateQueue.push(updater);
	        }
	    }
	    disposeChildren(updater.children, updateQueue, silent);
	}

	function disposeComponent(vnode, updateQueue, silent) {
	    var instance = vnode.stateNode;
	    if (!instance) {
	        //没有实例化
	        return;
	    }
	    var updater = instance.updater;
	    if (instance.isPortal) {
	        updater.updateQueue = updateQueue;
	    }
	    if (!silent) {
	        updater.addState("dispose");
	        updateQueue.push(updater);
	    } else if (updater.isMounted()) {
	        if (silent === 1) {
	            updater._states.length = 0;
	        }
	        updater.addState("dispose");
	        updateQueue.push(updater);
	    }

	    updater.insertQueue = updater.insertPoint = NaN; //用null/undefined会碰到 xxx[0]抛错的问题
	    disposeChildren(updater.children, updateQueue, silent);
	}

	function disposeChildren(children, updateQueue, silent) {
	    for (var i in children) {
	        disposeVnode(children[i], updateQueue, silent);
	    }
	}

	var dirtyComponents = [];
	function mountSorter(u1, u2) {
	    //按文档顺序执行
	    u1._dirty = false;
	    return u1._mountOrder - u2._mountOrder;
	}
	function flushUpdaters() {
	    if (dirtyComponents.length) {
	        var currentQueue = clearArray(dirtyComponents).sort(mountSorter);
	        currentQueue.forEach(function (el) {
	            delete el._dirty;
	        });
	        drainQueue(currentQueue);
	    }
	}

	function enqueueUpdater(updater) {
	    if (!updater._dirty) {
	        updater.addState("hydrate");
	        updater._dirty = true;
	        dirtyComponents.push(updater);
	    }
	}
	var placehoder = {
	    transition: noop
	};
	function drainQueue(queue) {
	    options.beforePatch();
	    var updater = void 0;
	    while (updater = queue.shift()) {
	        //console.log(updater.name, "执行" + updater._states + " 状态");
	        if (updater._disposed) {
	            continue;
	        }
	        var hook = Refs.errorHook;
	        if (hook) {
	            //如果存在医生节点
	            var doctors = Refs.doctors,
	                doctor = doctors[0],
	                gotoCreateRejectQueue,
	                addDoctor,
	                silent; //2时添加disposed，1直接变成disposed
	            switch (hook) {
	                case "componentDidMount":
	                case "componentDidUpdate":
	                case "componentWillUnmount":
	                    //render之后出错，拖动最后才构建错误列队
	                    gotoCreateRejectQueue = queue.length === 0;
	                    silent = 2;
	                    break;
	                case "render": //render出错，说明还没有执行render
	                case "constructor":
	                case "componentWillMount":
	                case "componentWillUpdate":
	                case "componentWillReceiveProps":
	                    //render之前出错，会立即构建错误列队，然后加上医生节点之上的列队
	                    gotoCreateRejectQueue = true;
	                    queue = queue.filter(function (el) {
	                        return el._mountOrder < doctor._mountOrder;
	                    });
	                    silent = 1;
	                    addDoctor = true;
	                    break;
	            }
	            if (gotoCreateRejectQueue) {
	                delete Refs.error;
	                delete Refs.doctors;
	                delete Refs.errorHook;
	                var rejectedQueue = [];
	                //收集要销毁的组件（要求必须resolved）

	                // 错误列队的钩子如果发生错误，如果还没有到达医生节点，它的出错会被忽略掉，
	                // 详见CompositeUpdater#catch()与ErrorBoundary#captureError()中的Refs.ignoreError开关
	                doctors.forEach(function (doctor, j) {
	                    for (var i in doctor.children) {
	                        var child = doctor.children[i];
	                        disposeVnode(child, rejectedQueue, silent);
	                    }
	                    doctor.children = {};
	                });
	                // rejectedQueue = Array.from(new Set(rejectedQueue));
	                doctors.forEach(function (doctor) {
	                    if (addDoctor) {
	                        rejectedQueue.push(doctor);
	                        updater = placehoder;
	                    }
	                    doctor.addState("catch");
	                    rejectedQueue.push(doctor);
	                });

	                queue = rejectedQueue.concat(queue);
	            }
	        }
	        updater.transition(queue);
	    }

	    options.afterPatch();
	    var error = Refs.error;
	    if (error) {
	        delete Refs.error;
	        throw error;
	    }
	}

	var globalEvents = {};
	var eventPropHooks = {}; //用于在事件回调里对事件对象进行
	var eventHooks = {}; //用于在元素上绑定特定的事件
	//根据onXXX得到其全小写的事件名, onClick --> click, onClickCapture --> click,
	// onMouseMove --> mousemove

	var eventLowerCache = {
	    onClick: "click",
	    onChange: "change",
	    onWheel: "wheel"
	};
	/**
	 * 判定否为与事件相关
	 *
	 * @param {any} name
	 * @returns
	 */
	function isEventName(name) {
	    return (/^on[A-Z]/.test(name)
	    );
	}

	var isTouch = "ontouchstart" in document;

	function dispatchEvent(e, type, end) {
	    //__type__ 在injectTapEventPlugin里用到
	    e = new SyntheticEvent(e);
	    if (type) {
	        e.type = type;
	    }
	    var bubble = e.type;
	    //var dom = e.target;
	    var hook = eventPropHooks[bubble];
	    if (hook && false === hook(e)) {
	        return;
	    }
	    var paths = collectPaths(e.target, end || document);
	    var captured = bubble + "capture";
	    document.__async = true;

	    triggerEventFlow(paths, captured, e);

	    if (!e._stopPropagation) {
	        triggerEventFlow(paths.reverse(), bubble, e);
	    }
	    document.__async = false;

	    flushUpdaters();
	    Refs.controlledCbs.forEach(function (el) {
	        if (el.stateNode) {
	            el.controlledCb({
	                target: el.stateNode
	            });
	        }
	    });
	    Refs.controlledCbs.length = 0;
	}

	function collectPaths(from, end) {
	    var paths = [];
	    var node = from;
	    while (node && !node.__events) {
	        node = node.parentNode;
	        if (end === from) {
	            return paths;
	        }
	    }
	    if (!node || node.nodeType > 1) {
	        //如果跑到document上
	        return paths;
	    }
	    var mid = node.__events;
	    var vnode = mid.child || mid.vnode;
	    do {
	        if (vnode.vtype === 1) {
	            var dom = vnode.stateNode;
	            if (dom === end) {
	                break;
	            }
	            if (!dom) {
	                break;
	            }
	            if (dom.__events) {
	                paths.push({ dom: dom, events: dom.__events });
	            }
	        }
	    } while (vnode = vnode["return"]); // eslint-disable-line
	    return paths;
	}

	function triggerEventFlow(paths, prop, e) {
	    for (var i = paths.length; i--;) {
	        var path = paths[i];
	        var fn = path.events[prop];
	        if (isFn(fn)) {
	            e.currentTarget = path.dom;
	            fn.call(void 666, e);
	            if (e._stopPropagation) {
	                break;
	            }
	        }
	    }
	}

	function addGlobalEvent(name, capture) {
	    if (!globalEvents[name]) {
	        globalEvents[name] = true;
	        addEvent(document, name, dispatchEvent, capture);
	    }
	}

	function addEvent(el, type, fn, bool) {
	    if (el.addEventListener) {
	        el.addEventListener(type, fn, bool || false);
	    } else if (el.attachEvent) {
	        el.attachEvent("on" + type, fn);
	    }
	}

	var rcapture = /Capture$/;
	function getBrowserName(onStr) {
	    var lower = eventLowerCache[onStr];
	    if (lower) {
	        return lower;
	    }
	    var camel = onStr.slice(2).replace(rcapture, "");
	    lower = camel.toLowerCase();
	    eventLowerCache[onStr] = lower;
	    return lower;
	}

	/**
	DOM通过event对象的relatedTarget属性提供了相关元素的信息。这个属性只对于mouseover和mouseout事件才包含值；
	对于其他事件，这个属性的值是null。IE不支持realtedTarget属性，但提供了保存着同样信息的不同属性。
	在mouseover事件触发时，IE的fromElement属性中保存了相关元素；
	在mouseout事件出发时，IE的toElement属性中保存着相关元素。
	但fromElement与toElement可能同时都有值
	 */
	function getRelatedTarget(e) {
	    if (!e.timeStamp) {
	        e.relatedTarget = e.type === "mouseover" ? e.fromElement : e.toElement;
	    }
	    return e.relatedTarget;
	}

	String("mouseenter,mouseleave").replace(/\w+/g, function (name) {
	    eventHooks[name] = function (dom, type) {
	        var mark = "__" + type;
	        if (!dom[mark]) {
	            dom[mark] = true;
	            var mask = type === "mouseenter" ? "mouseover" : "mouseout";
	            addEvent(dom, mask, function (e) {
	                var t = getRelatedTarget(e);
	                if (!t || t !== dom && !contains(dom, t)) {
	                    var common = getLowestCommonAncestor(dom, t);
	                    //由于不冒泡，因此paths长度为1
	                    dispatchEvent(e, type, common);
	                }
	            });
	        }
	    };
	});

	function getLowestCommonAncestor(instA, instB) {
	    var depthA = 0;
	    for (var tempA = instA; tempA; tempA = tempA.parentNode) {
	        depthA++;
	    }
	    var depthB = 0;
	    for (var tempB = instB; tempB; tempB = tempB.parentNode) {
	        depthB++;
	    }

	    // If A is deeper, crawl up.
	    while (depthA - depthB > 0) {
	        instA = instA.parentNode;
	        depthA--;
	    }

	    // If B is deeper, crawl up.
	    while (depthB - depthA > 0) {
	        instB = instB.parentNode;
	        depthB--;
	    }

	    // Walk in lockstep until we find a match.
	    var depth = depthA;
	    while (depth--) {
	        if (instA === instB) {
	            return instA;
	        }
	        instA = instA.parentNode;
	        instB = instB.parentNode;
	    }
	    return null;
	}

	var specialHandles = {};
	function createHandle(name, fn) {
	    return specialHandles[name] = function (e) {
	        if (fn && fn(e) === false) {
	            return;
	        }
	        dispatchEvent(e, name);
	    };
	}

	createHandle("change");
	createHandle("doubleclick");
	createHandle("scroll");
	createHandle("wheel");
	globalEvents.wheel = true;
	globalEvents.scroll = true;
	globalEvents.doubleclick = true;

	if (isTouch) {
	    eventHooks.click = eventHooks.clickcapture = function (dom) {
	        dom.onclick = dom.onclick || noop;
	    };
	}

	eventPropHooks.click = function (e) {
	    return !e.target.disabled;
	};

	var fixWheelType = document.onwheel !== void 666 ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
	eventHooks.wheel = function (dom) {
	    addEvent(dom, fixWheelType, specialHandles.wheel);
	};

	eventPropHooks.wheel = function (event) {
	    event.deltaX = "deltaX" in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
	    "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
	    event.deltaY = "deltaY" in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
	    "wheelDeltaY" in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
	    "wheelDelta" in event ? -event.wheelDelta : 0;
	};

	//react将text,textarea,password元素中的onChange事件当成onInput事件
	eventHooks.changecapture = eventHooks.change = function (dom) {
	    if (/text|password/.test(dom.type)) {
	        addEvent(document, "input", specialHandles.change);
	    }
	};
	var focusMap = {
	    "focus": "focus",
	    "blur": "blur"
	};

	function blurFocus(e) {
	    var dom = e.target || e.srcElement;
	    var type = focusMap[e.type];
	    var isFocus = type === "focus";
	    if (isFocus && dom.__inner__) {
	        dom.__inner__ = false;
	        return;
	    }

	    if (!isFocus && Refs.focusNode === dom) {
	        Refs.focusNode = null;
	    }
	    do {
	        if (dom.nodeType === 1) {
	            if (dom.__events && dom.__events[type]) {
	                dispatchEvent(e, type);
	                break;
	            }
	        } else {
	            break;
	        }
	    } while (dom = dom.parentNode);
	}

	"blur,focus".replace(/\w+/g, function (type) {
	    globalEvents[type] = true;
	    /* if(modern){
	        var mark = "__" + type;
	        if(!document[mark]){ 
	            document[mark] = true;
	            addEvent(document, type, blurFocus,true);
	        }
	    }else{*/
	    eventHooks[type] = function (dom, name) {
	        addEvent(dom, focusMap[name], blurFocus);
	    };
	    /* } */
	});

	eventHooks.scroll = function (dom, name) {
	    addEvent(dom, name, specialHandles[name]);
	};

	eventHooks.doubleclick = function (dom, name) {
	    addEvent(document, "dblclick", specialHandles[name]);
	};

	function SyntheticEvent(event) {
	    if (event.nativeEvent) {
	        return event;
	    }
	    for (var i in event) {
	        if (!eventProto[i]) {
	            this[i] = event[i];
	        }
	    }
	    if (!this.target) {
	        this.target = event.srcElement;
	    }
	    this.fixEvent();
	    this.timeStamp = new Date() - 0;
	    this.nativeEvent = event;
	}

	var eventProto = SyntheticEvent.prototype = {
	    fixEvent: noop, //留给以后扩展用
	    fixHooks: noop,
	    persist: noop,
	    preventDefault: function preventDefault() {
	        var e = this.nativeEvent || {};
	        e.returnValue = this.returnValue = false;
	        if (e.preventDefault) {
	            e.preventDefault();
	        }
	    },
	    stopPropagation: function stopPropagation() {
	        var e = this.nativeEvent || {};
	        e.cancelBubble = this._stopPropagation = true;
	        if (e.stopPropagation) {
	            e.stopPropagation();
	        }
	    },
	    stopImmediatePropagation: function stopImmediatePropagation() {
	        this.stopPropagation();
	        this.stopImmediate = true;
	    },
	    toString: function toString() {
	        return "[object Event]";
	    }
	};
	/* istanbul ignore next  */


	var eventSystem = extend({
		eventPropHooks: eventPropHooks,
		eventHooks: eventHooks,
		eventLowerCache: eventLowerCache,
		isEventName: isEventName,
		isTouch: isTouch,
		dispatchEvent: dispatchEvent,
		addGlobalEvent: addGlobalEvent,
		addEvent: addEvent,
		getBrowserName: getBrowserName,
		createHandle: createHandle,
		focusMap: focusMap,
		SyntheticEvent: SyntheticEvent
	});

	var check = function check() {
	    return check;
	};
	check.isRequired = check;
	var PropTypes = {
	    array: check,
	    bool: check,
	    func: check,
	    number: check,
	    object: check,
	    string: check,
	    any: check,
	    arrayOf: check,
	    element: check,
	    instanceOf: check,
	    node: check,
	    objectOf: check,
	    oneOf: check,
	    oneOfType: check,
	    shape: check
	};

	/**
	 *组件的基类
	 *
	 * @param {any} props
	 * @param {any} context
	 */
	function Component(props, context) {
	    //防止用户在构造器生成JSX
	    Refs.currentOwner = this;
	    this.context = context;
	    this.props = props;
	    this.refs = {};
	    this.state = null;
	}
	var fakeObject = {
	    enqueueSetState: returnFalse,
	    isMounted: returnFalse
	};

	Component.prototype = {
	    constructor: Component, //必须重写constructor,防止别人在子类中使用Object.getPrototypeOf时找不到正确的基类
	    replaceState: function replaceState() {
	        deprecatedWarn("replaceState");
	    },

	    isReactComponent: returnTrue,
	    isMounted: function isMounted() {
	        deprecatedWarn("isMounted");
	        return (this.updater || fakeObject).isMounted();
	    },
	    setState: function setState(state, cb) {
	        (this.updater || fakeObject).enqueueSetState(state, cb);
	    },
	    forceUpdate: function forceUpdate(cb) {
	        (this.updater || fakeObject).enqueueSetState(true, cb);
	    },
	    render: function render() {}
	};

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * 为了兼容0.13之前的版本
	 */
	var NOBIND = {
	    render: 1,
	    shouldComponentUpdate: 1,
	    componentWillReceiveProps: 1,
	    componentWillUpdate: 1,
	    componentDidUpdate: 1,
	    componentWillMount: 1,
	    componentDidMount: 1,
	    componentWillUnmount: 1,
	    componentDidUnmount: 1
	};

	function collectMixins(mixins) {
	    var keyed = {};

	    for (var i = 0; i < mixins.length; i++) {
	        var mixin = mixins[i];
	        if (mixin.mixins) {
	            applyMixins(mixin, collectMixins(mixin.mixins));
	        }

	        for (var key in mixin) {
	            if (mixin.hasOwnProperty(key) && key !== "mixins") {
	                (keyed[key] || (keyed[key] = [])).push(mixin[key]);
	            }
	        }
	    }

	    return keyed;
	}
	var MANY_MERGED = {
	    getInitialState: 1,
	    getDefaultProps: 1,
	    getChildContext: 1
	};

	function flattenHooks(key, hooks) {
	    var hookType = _typeof(hooks[0]);
	    if (hookType === "object") {
	        // Merge objects
	        var ret = {};
	        for (var i = 0; i < hooks.length; i++) {
	            extend(ret, hooks[i]);
	        }
	        return ret;
	    } else if (hookType === "function" && hooks.length > 1) {
	        return function () {
	            var ret = {},
	                r = void 0,
	                hasReturn = MANY_MERGED[key];
	            for (var _i = 0; _i < hooks.length; _i++) {
	                r = hooks[_i].apply(this, arguments);
	                if (hasReturn && r) {
	                    extend(ret, r);
	                }
	            }
	            if (hasReturn) {
	                return ret;
	            }
	            return r;
	        };
	    } else {
	        return hooks[0];
	    }
	}

	function applyMixins(proto, mixins) {
	    for (var key in mixins) {
	        if (mixins.hasOwnProperty(key)) {
	            proto[key] = flattenHooks(key, mixins[key].concat(proto[key] || []));
	        }
	    }
	}

	//创建一个构造器
	function newCtor(className, spec) {
	    var curry = Function("ReactComponent", "blacklist", "spec", "return function " + className + "(props, context) {\n      ReactComponent.call(this, props, context);\n\n     for (var methodName in this) {\n        var method = this[methodName];\n        if (typeof method  === \"function\"&& !blacklist[methodName]) {\n          this[methodName] = method.bind(this);\n        }\n      }\n\n      if (spec.getInitialState) {\n        var test = this.state = spec.getInitialState.call(this);\n        if(!(test === null || ({}).toString.call(test) == \"[object Object]\")){\n          throw \"getInitialState\u53EA\u80FD\u8FD4\u56DE\u7EAFJS\u5BF9\u8C61\u6216\u8005null\"\n        }\n      }\n\n  };");
	    return curry(Component, NOBIND, spec);
	}

	function createClass(spec) {
	    deprecatedWarn("createClass");
	    if (!isFn(spec.render)) {
	        throw "请实现render方法";
	    }
	    var Constructor = newCtor(spec.displayName || "Component", spec);
	    var proto = inherit(Constructor, Component);
	    //如果mixins里面非常复杂，可能mixin还包含其他mixin
	    if (spec.mixins) {
	        applyMixins(spec, collectMixins(spec.mixins));
	    }

	    extend(proto, spec);

	    if (spec.statics) {
	        extend(Constructor, spec.statics);
	    }
	    "propTypes,contextTypes,childContextTypes,displayName".replace(/\w+/g, function (name) {
	        if (spec[name]) {
	            var props = Constructor[name] = spec[name];
	            if (name !== "displayName") {
	                for (var i in props) {
	                    if (!isFn(props[i])) {
	                        console.error(i + " in " + name + " must be a function"); // eslint-disable-line
	                    }
	                }
	            }
	        }
	    });

	    if (isFn(spec.getDefaultProps)) {
	        Constructor.defaultProps = spec.getDefaultProps();
	    }

	    return Constructor;
	}

	function shallowEqual(objA, objB) {
	    if (Object.is(objA, objB)) {
	        return true;
	    }
	    //确保objA, objB都是对象
	    if (typeNumber(objA) < 7 || typeNumber(objB) < 7) {
	        return false;
	    }
	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);
	    if (keysA.length !== keysB.length) {
	        return false;
	    }

	    // Test for A's keys different from B.
	    for (var i = 0; i < keysA.length; i++) {
	        if (!hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
	            return false;
	        }
	    }

	    return true;
	}

	function PureComponent(props, context) {
	    Component.call(this, props, context);
	}

	var fn$1 = inherit(PureComponent, Component);

	fn$1.shouldComponentUpdate = function shallowCompare(nextProps, nextState) {
	    var a = shallowEqual(this.props, nextProps);
	    var b = shallowEqual(this.state, nextState);
	    return !a || !b;
	};
	fn$1.isPureComponent = true;

	/**
	通过事件绑定实现受控组件
	 */
	var formElements = {
	    select: 1,
	    textarea: 1,
	    input: 1,
	    option: 1
	};
	var duplexData = {
	    1: ["value", {
	        onChange: 1,
	        onInput: 1,
	        readOnly: 1,
	        disabled: 1
	    }, function (a) {
	        return a == null ? null : a + "";
	    }, function (dom, value, vnode) {
	        if (value == null) {
	            return;
	        }

	        if (vnode.type === "input") {
	            dom.__anuSetValue = true; //抑制onpropertychange
	            dom.setAttribute("value", value);
	            dom.__anuSetValue = false;
	            if (dom.type === "number") {
	                var valueAsNumber = parseFloat(dom.value) || 0;
	                if (
	                // eslint-disable-next-line
	                value != valueAsNumber ||
	                // eslint-disable-next-line
	                value == valueAsNumber && dom.value != value) {
	                    // Cast `value` to a string to ensure the value is set correctly. While
	                    // browsers typically do this as necessary, jsdom doesn't.
	                    value += "";
	                } else {
	                    return;
	                }
	            }
	        }
	        if (dom._persistValue !== value) {
	            dom.__anuSetValue = true; //抑制onpropertychange
	            dom._persistValue = dom.value = value;
	            dom.__anuSetValue = false;
	        }
	    }, keepPersistValue, "change", "input"],
	    2: ["checked", {
	        onChange: 1,
	        onClick: 1,
	        readOnly: 1,
	        disabled: 1
	    }, function (a) {
	        return !!a;
	    }, function (dom, value, vnode) {
	        if (vnode.props.value != null) {
	            dom.value = vnode.props.value;
	        }
	        if (dom._persistValue !== value) {
	            dom._persistValue = dom.checked = value;
	        }
	    }, keepPersistValue, "change", "click"],
	    3: ["value", {
	        onChange: 1,
	        disabled: 1
	    }, function (a) {
	        return a;
	    }, function (dom, value, vnode, isUncontrolled) {
	        //只有在单选的情况，用户会乱修改select.value
	        if (isUncontrolled) {
	            if (!dom.multiple && dom.value !== dom._persistValue) {
	                dom._persistValue = dom.value;
	                dom._setValue = false;
	            }
	        } else {
	            //props中必须有value
	            if ("value" in vnode.props) {
	                dom._persistValue = value;
	            }
	        }

	        syncOptions({
	            target: dom
	        });
	    }, syncOptions, "change"]
	};

	function inputControll(vnode, dom, props) {
	    var domType = dom.type;
	    var duplexType = duplexMap[domType];
	    var isUncontrolled = dom._uncontrolled;
	    if (duplexType) {
	        var data = duplexData[duplexType];
	        var duplexProp = data[0];
	        var keys = data[1];
	        var converter = data[2];
	        var sideEffect = data[3];

	        var value = converter(isUncontrolled ? dom._persistValue : props[duplexProp]);
	        sideEffect(dom, value, vnode, isUncontrolled);
	        if (isUncontrolled) {
	            return;
	        }

	        var handle = data[4];
	        var event1 = data[5];
	        var event2 = data[6];
	        if (!hasOtherControllProperty(props, keys)) {
	            // eslint-disable-next-line
	            console.warn("\u4F60\u4E3A" + vnode.type + "[type=" + domType + "]\u5143\u7D20\u6307\u5B9A\u4E86**\u53D7\u63A7\u5C5E\u6027**" + duplexProp + "\uFF0C\n\u4F46\u662F\u6CA1\u6709\u63D0\u4F9B\u53E6\u5916\u7684" + Object.keys(keys) + "\n\u6765\u64CD\u4F5C" + duplexProp + "\u7684\u503C\uFF0C\b\u6846\u67B6\u5C06\u4E0D\u5141\u8BB8\u4F60\u901A\u8FC7\u8F93\u5165\u6539\u53D8\u8BE5\u503C");
	            dom["on" + event1] = handle;
	            dom["on" + event2] = handle;
	        } else {
	            vnode.controlledCb = handle;
	            Refs.controlledCbs.push(vnode);
	        }
	    } else {
	        //处理option标签
	        var arr = dom.children || [];
	        for (var i = 0, el; el = arr[i]; i++) {
	            dom.removeChild(el);
	            i--;
	        }
	        if ("value" in props) {
	            dom.duplexValue = dom.value = props.value;
	        } else {
	            dom.duplexValue = dom.text;
	        }
	    }
	}

	function hasOtherControllProperty(props, keys) {
	    for (var key in keys) {
	        if (props[key]) {
	            return true;
	        }
	    }
	}

	function keepPersistValue(e) {
	    var dom = e.target;
	    var name = e.type === "textarea" ? "innerHTML" : /check|radio/.test(dom.type) ? "checked" : "value";
	    var v = dom._persistValue;
	    var noNull = v != null;
	    var noEqual = dom[name] !== v; //2.0 , 2

	    if (noNull && noEqual) {

	        dom[name] = v;
	    }
	}

	function syncOptions(e) {
	    var target = e.target,
	        value = target._persistValue,
	        options = target.options;
	    if (target.multiple) {
	        updateOptionsMore(options, options.length, value);
	    } else {
	        updateOptionsOne(options, options.length, value);
	    }
	    target._setSelected = true;
	}

	function updateOptionsOne(options, n, propValue) {
	    var stringValues = {},
	        noDisableds = [];
	    for (var i = 0; i < n; i++) {
	        var option = options[i];
	        var value = option.duplexValue;
	        if (!option.disabled) {
	            noDisableds.push(option);
	        }
	        if (value === propValue) {
	            //精确匹配
	            return setOptionSelected(option, true);
	        }
	        stringValues[value] = option;
	    }
	    var match = stringValues[propValue];
	    if (match) {
	        //字符串模糊匹配
	        return setOptionSelected(match, true);
	    }
	    if (n && noDisableds[0]) {
	        //选中第一个没有变disable的元素
	        setOptionSelected(noDisableds[0], true);
	    }
	}

	function updateOptionsMore(options, n, propValue) {
	    var selectedValue = {};
	    try {
	        for (var i = 0; i < propValue.length; i++) {
	            selectedValue["&" + propValue[i]] = true;
	        }
	    } catch (e) {
	        /* istanbul ignore next */
	        console.warn('<select multiple="true"> 的value应该对应一个字符串数组'); // eslint-disable-line
	    }
	    for (var _i = 0; _i < n; _i++) {
	        var option = options[_i];
	        var value = option.duplexValue;
	        var selected = selectedValue.hasOwnProperty("&" + value);
	        setOptionSelected(option, selected);
	    }
	}

	function setOptionSelected(dom, selected) {
	    dom.selected = selected;
	}

	var rnumber = /^-?\d+(\.\d+)?$/;
	/**
	     * 为元素样子设置样式
	     * 
	     * @export
	     * @param {any} dom 
	     * @param {any} lastStyle 
	     * @param {any} nextStyle 
	     */
	function patchStyle(dom, lastStyle, nextStyle) {
	    if (lastStyle === nextStyle) {
	        return;
	    }

	    for (var name in nextStyle) {
	        var val = nextStyle[name];
	        if (lastStyle[name] !== val) {
	            name = cssName(name, dom);
	            if (val !== 0 && !val) {
	                val = ""; //清除样式
	            } else if (rnumber.test(val) && !cssNumber[name]) {
	                val = val + "px"; //添加单位
	            }
	            try {
	                //node.style.width = NaN;node.style.width = 'xxxxxxx';
	                //node.style.width = undefine 在旧式IE下会抛异常
	                dom.style[name] = val; //应用样式
	            } catch (e) {
	                console.log("dom.style[" + name + "] = " + val + "throw error"); // eslint-disable-line
	            }
	        }
	    }
	    // 如果旧样式存在，但新样式已经去掉
	    for (var _name in lastStyle) {
	        if (!(_name in nextStyle)) {
	            _name = cssName(_name, dom);
	            dom.style[_name] = ""; //清除样式
	        }
	    }
	}

	var cssNumber = oneObject("animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom");

	//var testStyle = document.documentElement.style
	var prefixes = ["", "-webkit-", "-o-", "-moz-", "-ms-"];
	var cssMap = oneObject("float", "cssFloat");

	/**
	 * 转换成当前浏览器可用的样式名
	 * 
	 * @param {any} name 
	 * @returns 
	 */
	function cssName(name, dom) {
	    if (cssMap[name]) {
	        return cssMap[name];
	    }
	    var host = dom && dom.style || {};
	    for (var i = 0, n = prefixes.length; i < n; i++) {
	        var camelCase = camelize(prefixes[i] + name);
	        if (camelCase in host) {
	            return cssMap[name] = camelCase;
	        }
	    }
	    return null;
	}

	/**
	通过对象监控实现非受控组件
	 */
	var inputMonitor = {};
	var rcheck = /checked|radio/;
	var describe = {
	    set: function set(value) {
	        var controllProp = rcheck.test(this.type) ? "checked" : "value";
	        if (this.type === "textarea") {
	            this.innerHTML = value;
	        }
	        if (!this._observing) {
	            if (!this._setValue) {
	                //defaultXXX只会同步一次_persistValue
	                var parsedValue = this[controllProp] = value;
	                this._persistValue = Array.isArray(value) ? value : parsedValue;
	                this._setValue = true;
	            }
	        } else {
	            //如果用户私下改变defaultValue，那么_setValue会被抺掉
	            this._setValue = value == null ? false : true;
	        }
	        this._defaultValue = value;
	    },
	    get: function get() {
	        return this._defaultValue;
	    },
	    configurable: true
	};

	inputMonitor.observe = function (dom, name) {
	    try {
	        if ("_persistValue" in dom) {
	            dom._setValue = true;
	        }
	        Object.defineProperty(dom, name, describe);
	    } catch (e) {}
	};

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	//布尔属性的值末必为true,false
	//https://github.com/facebook/react/issues/10589
	var controlled = {
	    value: 1,
	    checked: 1
	};

	var isSpecialAttr = {
	    style: 1,
	    autoFocus: 1,
	    defaultValue: 1,
	    defaultChecked: 1,
	    children: 1,
	    innerHTML: 1,
	    dangerouslySetInnerHTML: 1
	};

	var svgCache = {};
	var strategyCache = {};
	/**
	 * 仅匹配 svg 属性名中的第一个驼峰处，如 viewBox 中的 wB，
	 * 数字表示该特征在属性列表中重复的次数
	 * -1 表示用 ":" 隔开的属性 (xlink:href, xlink:title 等)
	 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
	 */
	var svgCamelCase = {
	    w: { r: 1, b: 1, t: 1 },
	    e: { n: 1, t: 1, f: 1, p: 1, c: 1, m: 1, a: 2, u: 1, s: 1, v: 1 },
	    o: { r: 1 },
	    c: { m: 1 },
	    p: { p: 1 },
	    t: { s: 2, t: 1, u: 1, c: 1, d: 1, o: 1, x: 1, y: 1, l: 1 },
	    l: { r: 1, m: 1, u: 1, b: -1, l: -1, s: -1 },
	    r: { r: 1, u: 2, h: 1, w: 1, c: 1, e: 1 },
	    h: { r: 1, a: 1, l: 1, t: 1 },
	    y: { p: 1, s: 1, t: 1, c: 1 },
	    g: { c: 1 },
	    k: { a: -1, h: -1, r: -1, s: -1, t: -1, c: 1, u: 1 },
	    m: { o: 1, l: 1, a: 1 },
	    n: { c: 1, t: 1, u: 1 },
	    s: { a: 3 },
	    f: { x: 1, y: 1 },
	    d: { e: 1, f: 1, m: 1, d: 1 },
	    x: { c: 1 }
	};

	// SVG 属性列表中驼峰命名和短横线分隔命名特征值有重复
	// 列出了重复特征中的短横线命名的属性名
	var specialSVGPropertyName = {
	    "overline-thickness": 2,
	    "underline-thickness": 2,
	    "overline-position": 2,
	    "underline-position": 2,
	    "stroke-miterlimit": 2,
	    "baseline-shift": 2,
	    "clip-path": 2,
	    "font-size": 2,
	    "font-size-adjust": 2,
	    "font-stretch": 2,
	    "font-style": 2,
	    "text-decoration": 2,
	    "vert-origin-x": 2,
	    "vert-origin-y": 2,
	    "paint-order": 2,
	    "fill-rule": 2,
	    "color-rendering": 2,
	    "marker-end": 2,
	    "pointer-events": 2,
	    "units-per-em": 2,
	    "strikethrough-thickness": 2,
	    "lighting-color": 2
	};

	// 重复属性名的特征值列表
	var repeatedKey = ["et", "ep", "em", "es", "pp", "ts", "td", "to", "lr", "rr", "re", "ht", "gc"];

	function createRepaceFn(split) {
	    return function (match) {
	        return match.slice(0, 1) + split + match.slice(1).toLowerCase();
	    };
	}

	var rhump = /[a-z][A-Z]/;
	var toHyphen = createRepaceFn("-");
	var toColon = createRepaceFn(":");

	function getSVGAttributeName(name) {
	    if (svgCache[name]) {
	        return svgCache[name];
	    }
	    var key = name.match(rhump);
	    if (!key) {
	        return svgCache[name] = name;
	    }

	    var _ref = [].concat(_toConsumableArray(key[0].toLowerCase())),
	        prefix = _ref[0],
	        postfix = _ref[1];

	    var orig = name;
	    if (svgCamelCase[prefix] && svgCamelCase[prefix][postfix]) {
	        var count = svgCamelCase[prefix][postfix];

	        if (count === -1) {
	            return svgCache[orig] = {
	                name: name.replace(rhump, toColon),
	                ifSpecial: true
	            };
	        }

	        if (~repeatedKey.indexOf(prefix + postfix)) {
	            var dashName = name.replace(rhump, toHyphen);
	            if (specialSVGPropertyName[dashName]) {
	                name = dashName;
	            }
	        }
	    } else {
	        name = name.replace(rhump, toHyphen);
	    }

	    return svgCache[orig] = name;
	}

	function diffProps(dom, lastProps, nextProps, vnode) {
	    options.beforeProps(vnode);
	    var isSVG = vnode.namespaceURI === NAMESPACE.svg;
	    var tag = vnode.type;
	    //eslint-disable-next-line
	    for (var name in nextProps) {
	        var val = nextProps[name];
	        if (val !== lastProps[name]) {
	            var which = tag + isSVG + name;
	            var action = strategyCache[which];
	            if (!action) {
	                action = strategyCache[which] = getPropAction(dom, name, isSVG);
	            }
	            actionStrategy[action](dom, name, val, lastProps, vnode);
	        }
	    }
	    //如果旧属性在新属性对象不存在，那么移除DOM eslint-disable-next-line
	    for (var _name in lastProps) {
	        if (!nextProps.hasOwnProperty(_name)) {
	            var _which = tag + isSVG + _name;
	            var _action = strategyCache[_which];
	            if (!_action) {
	                continue;
	            }
	            actionStrategy[_action](dom, _name, false, lastProps, vnode);
	        }
	    }
	}

	function isBooleanAttr(dom, name) {
	    var val = dom[name];
	    return val === true || val === false;
	}
	/**
	 * 根据一个属性所在的元素或元素的文档类型，就可以永久决定该使用什么策略操作它
	 *
	 * @param {any} dom 元素节点
	 * @param {any} name 属性名
	 * @param {any} isSVG
	 * @returns
	 */
	function getPropAction(dom, name, isSVG) {
	    if (isSVG && name === "className") {
	        return "svgClass";
	    }
	    if (isSpecialAttr[name]) {
	        return name;
	    }
	    if (isEventName(name)) {
	        return "event";
	    }
	    if (isSVG) {
	        return "svgAttr";
	    }
	    if (isBooleanAttr(dom, name)) {
	        return "booleanAttr";
	    }

	    return name.indexOf("data-") === 0 || dom[name] === void 666 ? "attribute" : "property";
	}
	var builtinStringProps = {
	    className: 1,
	    title: 1,
	    name: 1,
	    type: 1,
	    alt: 1,
	    lang: 1
	};

	var rform = /textarea|input|select/i;
	function uncontrolled(dom, name, val, lastProps, vnode) {
	    if (rform.test(dom.nodeName)) {
	        if (!dom._uncontrolled) {
	            dom._uncontrolled = true;
	            inputMonitor.observe(dom, name); //重写defaultXXX的setter/getter
	        }
	        dom._observing = false;
	        if (vnode.type === "select" && dom._setValue && !lastProps.multiple !== !vnode.props.multiple) {
	            //当select的multiple发生变化，需要重置selectedIndex，让底下的selected生效
	            dom.selectedIndex = dom.selectedIndex;
	            dom._setValue = false;
	        }
	        dom[name] = val;
	        dom._observing = true;
	    } else {
	        dom.setAttribute(name, val);
	    }
	}

	var actionStrategy = {
	    innerHTML: noop,
	    defaultValue: uncontrolled,
	    defaultChecked: uncontrolled,
	    children: noop,
	    style: function style(dom, _, val, lastProps) {
	        patchStyle(dom, lastProps.style || emptyObject, val || emptyObject);
	    },
	    autoFocus: function autoFocus(dom) {
	        if (duplexMap[dom.type] < 3 || dom.contentEditable === "true") {
	            dom.focus();
	        }
	    },
	    svgClass: function svgClass(dom, name, val) {
	        if (!val) {
	            dom.removeAttribute("class");
	        } else {
	            dom.setAttribute("class", val);
	        }
	    },
	    svgAttr: function svgAttr(dom, name, val) {
	        // http://www.w3school.com.cn/xlink/xlink_reference.asp
	        // https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#notable-enh
	        // a ncements xlinkActuate, xlinkArcrole, xlinkHref, xlinkRole, xlinkShow,
	        // xlinkTitle, xlinkType eslint-disable-next-line
	        var method = typeNumber(val) < 3 && !val ? "removeAttribute" : "setAttribute";
	        var nameRes = getSVGAttributeName(name);
	        if (nameRes.ifSpecial) {
	            var prefix = nameRes.name.split(":")[0];
	            // 将xlinkHref 转换为 xlink:href
	            dom[method + "NS"](NAMESPACE[prefix], nameRes.name, val || "");
	        } else {
	            dom[method](nameRes, val || "");
	        }
	    },
	    booleanAttr: function booleanAttr(dom, name, val) {
	        // 布尔属性必须使用el.xxx = true|false方式设值 如果为false, IE全系列下相当于setAttribute(xxx,""),
	        // 会影响到样式,需要进一步处理 eslint-disable-next-line
	        dom[name] = !!val;
	        if (dom[name] === false) {
	            dom.removeAttribute(name);
	        } else if (dom[name] === "false") {
	            //字符串属性会将它转换为false
	            dom[name] = "";
	        }
	    },
	    attribute: function attribute(dom, name, val) {
	        if (val == null || val === false) {
	            return dom.removeAttribute(name);
	        }
	        try {
	            dom.setAttribute(name, val);
	        } catch (e) {
	            console.warn("setAttribute error", name, val); // eslint-disable-line
	        }
	    },
	    property: function property(dom, name, val) {
	        // if (dom[name] !== val) {
	        // 尝试直接赋值，部分情况下会失败，如给 input 元素的 size 属性赋值 0 或字符串
	        // 这时如果用 setAttribute 则会静默失败
	        if (controlled[name]) {
	            return;
	        }
	        try {
	            if (!val && val !== 0) {
	                //如果它是字符串属性，并且不等于""，清空
	                if (builtinStringProps[name]) {
	                    dom[name] = "";
	                }
	                dom.removeAttribute(name);
	            } else {
	                dom[name] = val;
	            }
	        } catch (e) {
	            try {
	                //修改type会引发多次报错
	                dom.setAttribute(name, val);
	            } catch (e) {/*ignore*/}
	        }
	    },
	    event: function event(dom, name, val, lastProps, vnode) {
	        var events = dom.__events || (dom.__events = {});
	        events.vnode = vnode;
	        var refName = toLowerCase(name.slice(2));
	        if (val === false) {
	            delete events[refName];
	        } else {
	            if (!lastProps[name]) {
	                //添加全局监听事件
	                var eventName = getBrowserName(name);
	                var hook = eventHooks[eventName];
	                addGlobalEvent(eventName);
	                if (hook) {
	                    hook(dom, eventName);
	                }
	            }
	            //onClick --> click, onClickCapture --> clickcapture
	            events[refName] = val;
	        }
	    },
	    dangerouslySetInnerHTML: function dangerouslySetInnerHTML(dom, name, val, lastProps) {
	        var oldhtml = lastProps[name] && lastProps[name].__html;
	        var html = val && val.__html;
	        if (html !== oldhtml) {
	            dom.innerHTML = html;
	        }
	    }
	};

	function DOMUpdater(vnode) {
	    this.name = vnode.type;
	    this._states = ["resolve"];
	    this._reactInternalFiber = vnode;
	    vnode.updater = this;
	    this._mountOrder = Refs.mountOrder++;
	}

	DOMUpdater.prototype = {
	    addState: function addState(state) {
	        var states = this._states;
	        if (states[states.length - 1] !== state) {
	            states.push(state);
	        }
	    },
	    transition: function transition(updateQueue) {
	        var state = this._states.shift();
	        if (state) {
	            this[state](updateQueue);
	        }
	    },
	    init: function init(updateQueue) {
	        updateQueue.push(this);
	    },

	    isMounted: returnFalse,
	    props: function props() {
	        var vnode = this._reactInternalFiber;
	        var dom = vnode.stateNode;
	        var type = vnode.type,
	            props = vnode.props,
	            lastProps = vnode.lastProps;

	        diffProps(dom, lastProps || {}, props, vnode);
	        if (formElements[type]) {
	            inputControll(vnode, dom, props);
	        }
	    },
	    resolve: function resolve() {
	        var vnode = this._reactInternalFiber;
	        var dom = vnode.stateNode;
	        this.isMounted = returnTrue;
	        Refs.fireRef(vnode, dom);
	    },
	    dispose: function dispose() {
	        var vnode = this._reactInternalFiber;
	        Refs.fireRef(vnode, null);
	    }
	};

	function AnuPortal(props) {
	    return props.children;
	}

	function createPortal(children, node) {
	    var vnode,
	        events = node.__events;
	    if (events) {
	        vnode = node.__events.vnode;
	    } else {
	        events = node.__events = {};
	        vnode = createVnode(node);
	        events.vnode = vnode;
	        new DOMUpdater(vnode);
	    }

	    var child = createElement(AnuPortal, { children: children });
	    events.child = child;
	    child.superReturn = vnode;
	    return child;
	}

	function pushError(instance, hook, error) {
	    var names = [];
	    var catchUpdater = findCatchComponent(instance, names);
	    instance.updater._hasError = true;
	    var stack = describeError(names, hook);
	    if (catchUpdater) {
	        disableHook(instance.updater); //禁止患者节点执行钩子
	        catchUpdater.errorInfo = catchUpdater.errorInfo || [error, { componentStack: stack }, instance];
	        if (!Refs.errorHook) {
	            Refs.errorHook = hook;
	            Refs.doctors = [catchUpdater];
	        } else {
	            if (Refs.doctors.indexOf(catchUpdater) === -1) {
	                Refs.doctors.push(catchUpdater);
	            }
	        }

	        var vnode = catchUpdater._reactInternalFiber;
	        delete vnode.child;
	        delete catchUpdater.pendingVnode;
	    } else {
	        console.warn(stack); // eslint-disable-line
	        //如果同时发生多个错误，那么只收集第一个错误，并延迟到afterPatch后执行
	        if (!Refs.error) {
	            Refs.error = error;
	        }
	    }
	}
	function captureError(instance, hook, args) {
	    try {
	        var fn = instance[hook];
	        if (fn) {
	            return fn.apply(instance, args);
	        }
	        return true;
	    } catch (error) {
	        if (hook === "componentWillUnmount") {
	            instance[hook] = noop;
	        }

	        pushError(instance, hook, error);
	    }
	}
	function describeError(names, hook) {
	    var segments = ["**" + hook + "** method occur error "];
	    names.forEach(function (name, i) {
	        if (names[i + 1]) {
	            segments.push("in " + name + " (created By " + names[i + 1] + ")");
	        }
	    });
	    return segments.join("\n").trim();
	}
	//让该组件不要再触发钩子
	function disableHook(u) {
	    u.hydrate = u.render = u.resolve = noop;
	}
	/**
	 * 此方法遍历医生节点中所有updater，收集沿途的标签名与组件名
	 */
	function findCatchComponent(target, names) {
	    var vnode = target.updater._reactInternalFiber,
	        instance,
	        updater,
	        type,
	        name,
	        catchIt;
	    do {
	        type = vnode.type;
	        if (vnode.isTop) {
	            if (catchIt) {
	                return catchIt;
	            }
	            disposeVnode(vnode, [], true);
	            break;
	        } else if (vnode.vtype > 1) {
	            name = type.displayName || type.name;
	            names.push(name);
	            instance = vnode.stateNode;
	            if (instance.componentDidCatch) {
	                updater = instance.updater;
	                if (updater._isDoctor) {
	                    disableHook(updater);
	                } else if (!catchIt && target !== instance) {
	                    catchIt = updater;
	                }
	            }
	        } else if (vnode.vtype === 1) {
	            names.push(type);
	        }
	    } while (vnode = vnode["return"]);
	}

	function alwaysNull() {
	    return null;
	}
	var support16 = true;
	var errorType = {
	    0: "undefined",
	    2: "boolean",
	    3: "number",
	    4: "string",
	    7: "array"
	};
	/**
	 * 为了防止污染用户的实例，需要将操作组件虚拟DOM与生命周期钩子的逻辑全部抽象到这个类中
	 *
	 * @export
	 * @param {any} instance
	 * @param {any} vnode
	 */
	function CompositeUpdater(vnode, parentContext) {
	    var type = vnode.type,
	        props = vnode.props;

	    if (!type) {
	        throw vnode;
	    }
	    this.name = type.displayName || type.name;
	    this.props = props;
	    this._reactInternalFiber = vnode;
	    this.context = getContextByTypes(parentContext, type.contextTypes);
	    this.parentContext = parentContext;
	    this._pendingCallbacks = [];
	    this._pendingStates = [];
	    this._states = ["resolve"];
	    this._mountOrder = Refs.mountOrder++;
	    if (vnode.superReturn) {
	        this.isPortal = true;
	    }
	    // update总是保存最新的数据，如state, props, context, parentContext, parentVnode
	    //  this._hydrating = true 表示组件会调用render方法及componentDidMount/Update钩子
	    //  this._nextCallbacks = [] 表示组件需要在下一周期重新渲染
	    //  this._forceUpdate = true 表示会无视shouldComponentUpdate的结果
	}

	CompositeUpdater.prototype = {
	    addState: function addState(state) {
	        var states = this._states;
	        if (states[states.length - 1] !== state) {
	            states.push(state);
	        }
	    },
	    transition: function transition(updateQueue) {
	        var state = this._states.shift();
	        if (state) {
	            this[state](updateQueue);
	        }
	    },
	    enqueueSetState: function enqueueSetState(state, cb) {
	        if (state === true) {
	            //forceUpdate
	            this._forceUpdate = true;
	        } else {
	            //setState
	            this._pendingStates.push(state);
	        }
	        if (this._hydrating) {
	            //组件在更新过程（_hydrating = true），其setState/forceUpdate被调用
	            //那么会延期到下一个渲染过程调用
	            if (!this._nextCallbacks) {
	                this._nextCallbacks = [cb];
	            } else {
	                this._nextCallbacks.push(cb);
	            }
	            return;
	        } else {
	            if (isFn(cb)) {
	                this._pendingCallbacks.push(cb);
	            }
	        }
	        if (document.__async) {
	            //在事件句柄中执行setState会进行合并
	            enqueueUpdater(this);
	            return;
	        }
	        if (this.isMounted === returnTrue) {
	            if (this._receiving) {
	                //componentWillReceiveProps中的setState/forceUpdate应该被忽略
	                return;
	            }
	            this.addState("hydrate");
	            drainQueue([this]);
	        }
	    },
	    mergeStates: function mergeStates() {
	        var instance = this.instance,
	            pendings = this._pendingStates,
	            n = pendings.length,
	            state = instance.state;
	        if (n === 0) {
	            return state;
	        }
	        var nextState = extend({}, state); //每次都返回新的state
	        for (var i = 0; i < n; i++) {
	            var pending = pendings[i];
	            if (pending && pending.call) {
	                pending = pending.call(instance, nextState, this.props);
	            }
	            extend(nextState, pending);
	        }
	        pendings.length = 0;
	        return nextState;
	    },


	    isMounted: returnFalse,
	    init: function init(updateQueue, insertCarrier) {
	        var props = this.props,
	            context = this.context,
	            vnode = this._reactInternalFiber;

	        var type = vnode.type,
	            isStateless = vnode.vtype === 4,
	            instance = void 0,
	            mixin = void 0;
	        //实例化组件
	        try {
	            var lastOwn = Refs.currentOwner;
	            if (isStateless) {
	                instance = {
	                    refs: {},
	                    __proto__: type.prototype,
	                    render: function render() {
	                        return type(this.props, this.context);
	                    }
	                };
	                Refs.currentOwner = instance;
	                mixin = type(props, context);
	            } else {
	                instance = new type(props, context);
	                Refs.currentOwner = instance;
	            }
	        } catch (e) {
	            //失败时，则创建一个假的instance
	            instance = {
	                updater: this
	            };
	            vnode.stateNode = instance;
	            this.instance = instance;
	            return pushError(instance, "constructor", e);
	        } finally {
	            Refs.currentOwner = lastOwn;
	        }
	        //如果是无状态组件需要再加工
	        if (isStateless) {
	            if (mixin && mixin.render) {
	                //带生命周期的
	                extend(instance, mixin);
	            } else {
	                //不带生命周期的
	                vnode.child = mixin;
	                instance.__isStateless = true;
	                this.mergeStates = alwaysNull;
	                this.willReceive = false;
	            }
	        }

	        vnode.stateNode = this.instance = instance;
	        getDerivedStateFromProps(this, type, props, instance.state);
	        //如果没有调用constructor super，需要加上这三行
	        instance.props = props;
	        instance.context = context;
	        instance.updater = this;
	        var queue = this.insertCarrier = this.isPortal ? {} : insertCarrier;

	        this.insertPoint = queue.dom;
	        this.updateQueue = updateQueue;
	        if (instance.componentWillMount) {
	            captureError(instance, "componentWillMount", []);
	        }
	        instance.state = this.mergeStates();
	        //让顶层的元素updater进行收集
	        this.render(updateQueue);
	        updateQueue.push(this);
	    },
	    hydrate: function hydrate(updateQueue, inner) {
	        var instance = this.instance,
	            context = this.context,
	            props = this.props,
	            vnode = this._reactInternalFiber,
	            pendingVnode = this.pendingVnode;

	        if (this._states[0] === "hydrate") {
	            this._states.shift(); // ReactCompositeComponentNestedState-state
	        }
	        var state = this.mergeStates();
	        var shouldUpdate = true;
	        if (!this._forceUpdate && !captureError(instance, "shouldComponentUpdate", [props, state, context])) {
	            shouldUpdate = false;
	            if (pendingVnode) {
	                var child = this._reactInternalFiber.child;
	                this._reactInternalFiber = pendingVnode;
	                pendingVnode.child = child;
	                delete this.pendingVnode;
	            }
	            var nodes = collectComponentNodes(this.children);
	            var queue = this.insertCarrier;
	            nodes.forEach(function (el) {
	                insertElement(el, queue.dom);
	                queue.dom = el.stateNode;
	                // queue.unshift(el.stateNode);
	            });
	        } else {
	            captureError(instance, "componentWillUpdate", [props, state, context]);
	            var lastProps = instance.props,
	                lastState = instance.state;

	            this._hookArgs = [lastProps, lastState];
	        }
	        if (this._hasError) {
	            return;
	        }
	        vnode.stateNode = instance;
	        delete this._forceUpdate;
	        //既然setState了，无论shouldComponentUpdate结果如何，用户传给的state对象都会作用到组件上
	        instance.props = props;
	        instance.state = state;
	        instance.context = context;
	        if (!inner) {
	            this.insertCarrier.dom = this.insertPoint;
	        }
	        if (shouldUpdate) {
	            this.render(updateQueue);
	        }
	        this.addState("resolve");
	        updateQueue.push(this);
	    },
	    render: function render(updateQueue) {
	        var vnode = this._reactInternalFiber,
	            pendingVnode = this.pendingVnode,
	            instance = this.instance,
	            parentContext = this.parentContext,
	            nextChildren = emptyObject,
	            lastChildren = emptyObject,
	            childContext = parentContext,
	            rendered = void 0,
	            number = void 0;


	        if (pendingVnode) {
	            vnode = this._reactInternalFiber = pendingVnode;
	            delete this.pendingVnode;
	        }
	        this._hydrating = true;

	        if (this.willReceive === false) {
	            rendered = vnode.child;
	            delete this.willReceive;
	        } else {
	            var lastOwn = Refs.currentOwner;
	            Refs.currentOwner = instance;
	            rendered = captureError(instance, "render", []);
	            if (this._hasError) {
	                rendered = true;
	            }
	            Refs.currentOwner = lastOwn;
	        }
	        number = typeNumber(rendered);
	        var hasMounted = this.isMounted();
	        if (hasMounted) {
	            lastChildren = this.children;
	        }
	        if (number > 2) {
	            if (number > 5) {
	                //array, object
	                childContext = getChildContext(instance, parentContext);
	            }
	            nextChildren = fiberizeChildren(rendered, this);
	        } else {
	            //undefinded, null, boolean
	            this.children = nextChildren; //emptyObject
	            delete this.child;
	        }
	        var noSupport = !support16 && errorType[number];
	        if (noSupport) {
	            pushError(instance, "render", new Error("React15 fail to render " + noSupport));
	        }
	        Refs.diffChildren(lastChildren, nextChildren, vnode, childContext, updateQueue, this.insertCarrier);
	    },

	    // ComponentDidMount/update钩子，React Chrome DevTools的钩子， 组件ref, 及错误边界
	    resolve: function resolve(updateQueue) {
	        var instance = this.instance,
	            vnode = this._reactInternalFiber;

	        var hasMounted = this.isMounted();
	        if (!hasMounted) {
	            this.isMounted = returnTrue;
	        }
	        if (this._hydrating) {
	            var hookName = hasMounted ? "componentDidUpdate" : "componentDidMount";
	            captureError(instance, hookName, this._hookArgs || []);
	            //执行React Chrome DevTools的钩子
	            if (hasMounted) {
	                options.afterUpdate(instance);
	            } else {
	                options.afterMount(instance);
	            }
	            delete this._hookArgs;
	            delete this._hydrating;
	        }

	        if (this._hasError) {
	            return;
	        } else {
	            //执行组件ref（发生错误时不执行）
	            if (vnode._hasRef) {
	                Refs.fireRef(vnode, instance);
	                vnode._hasRef = false;
	            }
	            clearArray(this._pendingCallbacks).forEach(function (fn) {
	                fn.call(instance);
	            });
	        }
	        transfer.call(this, updateQueue);
	    },
	    "catch": function _catch(queue) {
	        var instance = this.instance;
	        // delete Refs.ignoreError; 

	        this._states.length = 0;
	        this.children = {};
	        this._isDoctor = this._hydrating = true;
	        instance.componentDidCatch.apply(instance, this.errorInfo);
	        delete this.errorInfo;
	        this._hydrating = false;
	        transfer.call(this, queue);
	    },
	    dispose: function dispose() {
	        var vnode = this._reactInternalFiber,
	            instance = this.instance;

	        options.beforeUnmount(instance);
	        instance.setState = instance.forceUpdate = returnFalse;

	        Refs.fireRef(vnode, null);
	        captureError(instance, "componentWillUnmount", []);
	        //在执行componentWillUnmount后才将关联的元素节点解绑，防止用户在钩子里调用 findDOMNode方法
	        this.isMounted = returnFalse;
	        vnode._disposed = this._disposed = true;
	    }
	};
	function transfer(queue) {
	    var cbs = this._nextCallbacks,
	        cb;
	    if (cbs && cbs.length) {
	        //如果在componentDidMount/Update钩子里执行了setState，那么再次渲染此组件
	        do {
	            cb = cbs.shift();
	            if (isFn(cb)) {
	                this._pendingCallbacks.push(cb);
	            }
	        } while (cbs.length);
	        delete this._nextCallbacks;
	        this.addState("hydrate");
	        queue.push(this);
	    }
	}
	function getDerivedStateFromProps(updater, type, props, state) {
	    if (isFn(type.getDerivedStateFromProps)) {
	        var state = type.getDerivedStateFromProps.call(null, props, state);
	        if (state != null) {
	            updater._pendingStates.push(state);
	        }
	    }
	}

	function getChildContext(instance, parentContext) {
	    if (instance.getChildContext) {
	        var context = instance.getChildContext();
	        if (context) {
	            parentContext = extend(extend({}, parentContext), context);
	        }
	    }
	    return parentContext;
	}

	function getContextByTypes(curContext, contextTypes) {
	    var context = {};
	    if (!contextTypes || !curContext) {
	        return context;
	    }
	    for (var key in contextTypes) {
	        if (contextTypes.hasOwnProperty(key)) {
	            context[key] = curContext[key];
	        }
	    }
	    return context;
	}

	function collectComponentNodes(children) {
	    var ret = [];
	    for (var i in children) {
	        var child = children[i];
	        var inner = child.stateNode;
	        if (child._disposed) {
	            continue;
	        }
	        if (child.vtype < 2) {
	            ret.push(child);
	        } else {
	            var updater = inner.updater;
	            if (child.child) {
	                var args = collectComponentNodes(updater.children);
	                ret.push.apply(ret, args);
	            }
	        }
	    }
	    return ret;
	}

	//[Top API] React.isValidElement
	function isValidElement(vnode) {
	    return vnode && vnode.vtype;
	}

	//[Top API] ReactDOM.render
	function render(vnode, container, callback) {
	    return renderByAnu(vnode, container, callback);
	}
	//[Top API] ReactDOM.unstable_renderSubtreeIntoContainer
	function unstable_renderSubtreeIntoContainer(lastVnode, nextVnode, container, callback) {
	    deprecatedWarn("unstable_renderSubtreeIntoContainer");
	    var updater = lastVnode && lastVnode.updater;
	    var parentContext = updater ? updater.parentContext : {};
	    return renderByAnu(nextVnode, container, callback, parentContext);
	}
	//[Top API] ReactDOM.unmountComponentAtNode
	function unmountComponentAtNode(container) {
	    var nodeIndex = topNodes.indexOf(container);
	    if (nodeIndex > -1) {
	        var lastVnode = topVnodes[nodeIndex];
	        var queue = [];
	        disposeVnode(lastVnode, queue);
	        drainQueue(queue);
	        emptyElement(container);
	        container.__component = null;
	        return true;
	    }
	    return false;
	}
	//[Top API] ReactDOM.findDOMNode
	function findDOMNode(componentOrElement) {
	    if (componentOrElement == null) {
	        //如果是null
	        return null;
	    }
	    if (componentOrElement.nodeType) {
	        //如果本身是元素节点
	        return componentOrElement;
	    }
	    //实例必然拥有updater与render
	    if (componentOrElement.render) {
	        var vnode = componentOrElement.updater._reactInternalFiber;
	        var c = vnode.child;
	        if (c) {
	            return findDOMNode(c.stateNode);
	        } else {
	            return null;
	        }
	    }
	}

	var AnuWrapper = function AnuWrapper() {
	    Component.call(this);
	};
	var fn$2 = inherit(AnuWrapper, Component);

	fn$2.render = function () {
	    return this.props.child;
	};

	// ReactDOM.render的内部实现 Host
	function renderByAnu(vnode, container, callback) {
	    var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	    if (!(container && container.appendChild)) {
	        throw "ReactDOM.render\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u9519\u8BEF"; // eslint-disable-line
	    }
	    //__component用来标识这个真实DOM是ReactDOM.render的容器，通过它可以取得上一次的虚拟DOM
	    // 但是在IE6－8中，文本/注释节点不能通过添加自定义属性来引用虚拟DOM，这时我们额外引进topVnode,
	    //topNode来寻找它们。

	    var nodeIndex = topNodes.indexOf(container),
	        lastWrapper = void 0,
	        top = void 0,
	        wrapper = void 0,
	        updateQueue = [],
	        insertCarrier = {};
	    //updaterQueue是用来装载updater， insertCarrier是用来装载插入DOM树的真实DOM
	    if (nodeIndex !== -1) {
	        lastWrapper = topVnodes[nodeIndex];
	        wrapper = lastWrapper.stateNode.updater;
	        if (wrapper._hydrating) {
	            //如果是在componentDidMount/Update中使用了ReactDOM.render，那么将延迟到此组件的resolve阶段执行
	            wrapper._pendingCallbacks.push(renderByAnu.bind(null, vnode, container, callback, context));
	            return lastWrapper.child.stateNode;
	        }
	    } else {
	        topNodes.push(container);
	        nodeIndex = topNodes.length - 1;
	    }
	    Refs.currentOwner = null; //防止干扰
	    var nextWrapper = createElement(AnuWrapper, { child: vnode });
	    // top(contaner) > nextWrapper > vnode
	    nextWrapper.isTop = true;
	    topVnodes[nodeIndex] = nextWrapper;
	    if (lastWrapper) {
	        top = nextWrapper["return"] = lastWrapper["return"];
	        top.child = nextWrapper;
	        receiveVnode(lastWrapper, nextWrapper, context, updateQueue, insertCarrier);
	    } else {
	        top = nextWrapper["return"] = createVnode(container);
	        var topUpdater = new DOMUpdater(top);
	        top.child = nextWrapper;
	        topUpdater.children = {
	            ".0": nextWrapper
	        };
	        nextWrapper.child = vnode;
	        genVnodes(nextWrapper, context, updateQueue, insertCarrier); // 这里会从下到上添加updater
	    }
	    top.updater.init(updateQueue); // 添加最顶层的updater

	    container.__component = nextWrapper; //兼容旧的
	    wrapper = nextWrapper.stateNode.updater;

	    if (callback) {
	        wrapper._pendingCallbacks.push(callback.bind(vnode.stateNode));
	    }
	    drainQueue(updateQueue);
	    //组件返回组件实例，而普通虚拟DOM 返回元素节点
	    return vnode.stateNode;
	}

	function genVnodes(vnode, context, updateQueue, insertCarrier) {
	    var parentNode = vnode["return"].stateNode;
	    var nodes = toArray(parentNode.childNodes || emptyArray);
	    var lastVnode = null;
	    for (var i = 0, dom; dom = nodes[i++];) {
	        if (toLowerCase(dom.nodeName) === vnode.type) {
	            lastVnode = createVnode(dom);
	        } else {
	            parentNode.removeChild(dom);
	        }
	    }
	    if (lastVnode) {
	        receiveVnode(lastVnode, vnode, context, updateQueue, insertCarrier);
	    } else {
	        mountVnode(vnode, context, updateQueue, insertCarrier);
	    }
	}

	//mountVnode只是转换虚拟DOM为真实DOM，不做插入DOM树操作
	function mountVnode(vnode, context, updateQueue, insertCarrier) {
	    options.beforeInsert(vnode);
	    if (vnode.vtype === 0 || vnode.vtype === 1) {
	        vnode.stateNode = createElement$1(vnode, vnode["return"]);
	        var beforeDOM = insertCarrier.dom;
	        insertCarrier.dom = vnode.stateNode;
	        if (vnode.vtype === 1) {
	            var _updater = new DOMUpdater(vnode);
	            var children = fiberizeChildren(vnode.props.children, _updater);
	            mountChildren(vnode, children, context, updateQueue, {});
	            _updater.init(updateQueue);
	        }
	        insertElement(vnode, beforeDOM);
	        if (vnode.updater) {
	            vnode.updater.props();
	        }
	    } else {
	        var updater = new CompositeUpdater(vnode, context);
	        updater.init(updateQueue, insertCarrier);
	    }
	}

	function mountChildren(vnode, children, context, updateQueue, insertCarrier) {
	    for (var i in children) {
	        var child = children[i];
	        mountVnode(child, context, updateQueue, insertCarrier);
	        if (Refs.errorHook) {
	            break;
	        }
	    }
	}

	function updateVnode(lastVnode, nextVnode, context, updateQueue, insertCarrier) {
	    var dom = nextVnode.stateNode = lastVnode.stateNode;
	    options.beforeUpdate(nextVnode);
	    if (lastVnode.vtype < 2) {
	        insertElement(nextVnode, insertCarrier.dom);
	        insertCarrier.dom = dom;
	        if (lastVnode.vtype === 0) {
	            if (nextVnode.text !== lastVnode.text) {
	                dom.nodeValue = nextVnode.text;
	            }
	        } else {
	            if (lastVnode.namespaceURI) {
	                nextVnode.namespaceURI = lastVnode.namespaceURI;
	            }
	            var updater = nextVnode.updater = lastVnode.updater;
	            updater._reactInternalFiber = nextVnode;
	            nextVnode.lastProps = lastVnode.props;
	            var lastChildren = updater.children;
	            var props = nextVnode.props;

	            if (props[innerHTML]) {
	                disposeChildren(lastChildren, updateQueue);
	            } else {
	                var nextChildren = fiberizeChildren(props.children, updater);
	                diffChildren(lastChildren, nextChildren, nextVnode, context, updateQueue, {});
	            }
	            updater.props();
	            updater.addState("resolve");
	            updateQueue.push(updater);
	        }
	    } else {
	        receiveComponent(lastVnode, nextVnode, context, updateQueue, insertCarrier);
	    }
	}

	function receiveComponent(lastVnode, nextVnode, parentContext, updateQueue, insertCarrier) {
	    // todo:减少数据的接收次数
	    var type = lastVnode.type,
	        stateNode = lastVnode.stateNode,
	        updater = stateNode.updater,
	        nextProps = nextVnode.props,
	        willReceive = lastVnode !== nextVnode,
	        nextContext = void 0;

	    if (!type.contextTypes) {
	        nextContext = stateNode.context;
	    } else {
	        nextContext = getContextByTypes(parentContext, type.contextTypes);
	        willReceive = true;
	    }

	    updater.props = nextProps;
	    if (updater.isPortal) {
	        updater.insertCarrier = {};
	    } else {
	        updater.insertCarrier = insertCarrier;
	    }
	    updater.parentContext = parentContext;
	    updater.pendingVnode = nextVnode;
	    updater.context = nextContext;
	    updater.willReceive = willReceive;
	    nextVnode.stateNode = stateNode;
	    if (!updater._dirty) {
	        updater._receiving = true;
	        updater.updateQueue = updateQueue;
	        if (willReceive) {
	            captureError(stateNode, "componentWillReceiveProps", [nextProps, nextContext]);
	        }
	        if (lastVnode.props !== nextProps) {
	            getDerivedStateFromProps(updater, type, nextProps, stateNode.state);
	        }
	        if (updater._hasError) {
	            return;
	        }
	        delete updater._receiving;
	        if (lastVnode.ref !== nextVnode.ref) {
	            Refs.fireRef(lastVnode, null);
	        }
	        updater.hydrate(updateQueue, true);
	    }
	}

	function isSameNode(a, b) {
	    if (a.type === b.type && a.key === b.key) {
	        return true;
	    }
	}

	function receiveVnode(lastVnode, nextVnode, context, updateQueue, insertCarrier) {
	    if (isSameNode(lastVnode, nextVnode)) {
	        //组件虚拟DOM已经在diffChildren生成并插入DOM树
	        updateVnode(lastVnode, nextVnode, context, updateQueue, insertCarrier);
	    } else {
	        disposeVnode(lastVnode, updateQueue);
	        mountVnode(nextVnode, context, updateQueue, insertCarrier);
	    }
	}
	// https://github.com/onmyway133/DeepDiff
	function diffChildren(lastChildren, nextChildren, parentVnode, parentContext, updateQueue, insertCarrier) {
	    //这里都是走新的任务列队
	    var lastChild = void 0,
	        nextChild = void 0,
	        isEmpty = true,
	        child = void 0,
	        firstChild = void 0;
	    if (parentVnode.vtype === 1) {
	        firstChild = parentVnode.stateNode.firstChild;
	    }
	    for (var i in lastChildren) {
	        isEmpty = false;
	        child = lastChildren[i];
	        //向下找到其第一个元素节点子孙
	        if (firstChild) {
	            do {
	                if (child.superReturn) {
	                    break;
	                }
	                if (child.vtype < 2) {
	                    child.stateNode = firstChild;
	                    break;
	                }
	            } while (child = child.child);
	        }
	        break;
	    }

	    //优化： 只添加
	    if (isEmpty) {
	        mountChildren(parentVnode, nextChildren, parentContext, updateQueue, insertCarrier);
	    } else {
	        var matchNodes = {},
	            matchRefs = [];
	        for (var _i in lastChildren) {
	            nextChild = nextChildren[_i];
	            lastChild = lastChildren[_i];
	            if (nextChild && nextChild.type === lastChild.type) {
	                matchNodes[_i] = lastChild;
	                if (lastChild.vtype < 2 && lastChild.ref !== nextChild.ref) {
	                    lastChild.order = nextChild.index;
	                    matchRefs.push(lastChild);
	                }
	                continue;
	            }
	            disposeVnode(lastChild, updateQueue);
	        }
	        //step2: 更新或新增节点
	        matchRefs.sort(function (a, b) {
	            return a.order - b.order;
	        }).forEach(function (el) {
	            updateQueue.push({
	                transition: Refs.fireRef.bind(null, el, null),
	                isMounted: noop
	            });
	        });
	        for (var _i2 in nextChildren) {
	            nextChild = nextChildren[_i2];
	            lastChild = matchNodes[_i2];
	            if (lastChild) {
	                receiveVnode(lastChild, nextChild, parentContext, updateQueue, insertCarrier);
	            } else {
	                mountVnode(nextChild, parentContext, updateQueue, insertCarrier);
	            }

	            if (Refs.errorHook) {
	                return;
	            }
	        }
	    }
	}

	Refs.diffChildren = diffChildren;

	//IE8中select.value不会在onchange事件中随用户的选中而改变其value值，也不让用户直接修改value 只能通过这个hack改变
	var noCheck = false;
	function setSelectValue(e) {
	    if (e.propertyName === "value" && !noCheck) {
	        syncValueByOptionValue(e.srcElement);
	    }
	}

	function syncValueByOptionValue(dom) {
	    var idx = dom.selectedIndex,
	        option = void 0,
	        attr = void 0;
	    if (idx > -1) {
	        //IE 下select.value不会改变
	        option = dom.options[idx];
	        attr = option.attributes.value;
	        dom.value = attr && attr.specified ? option.value : option.text;
	    }
	}

	var fixIEChangeHandle = createHandle("change", function (e) {
	    var dom = e.srcElement;
	    switch (e.type) {
	        case "change":
	            if (dom.type === "select-one") {
	                if (!dom.__bindFixValueFn) {
	                    addEvent(dom, "propertychange", setSelectValue);
	                    dom.__bindFixValueFn = true;
	                }
	                noCheck = true;
	                syncValueByOptionValue(dom);
	                noCheck = false;
	            }
	            return true;
	        case "click":
	            return true;
	        case "propertychange":
	            if (e.propertyName === "value") {
	                if (dom.__anuSetValue) {
	                    return false;
	                }
	            } else {
	                return false;
	            }
	    }
	});

	var fixIEInputHandle = createHandle("input", function (e) {
	    return e.propertyName === "value";
	});

	var IEHandleFix = {
	    input: function input(dom) {
	        addEvent(dom, "propertychange", fixIEInputHandle);
	    },
	    change: function change(dom) {
	        //IE6-8, radio, checkbox的点击事件必须在失去焦点时才触发 select则需要做更多补丁工件
	        var mask = /radio|check/.test(dom.type) ? "click" : /text|password/.test(dom.type) ? "propertychange" : "change";
	        addEvent(dom, mask, fixIEChangeHandle);
	    },
	    submit: function submit(dom) {
	        if (dom.nodeName === "FORM") {
	            addEvent(dom, "submit", dispatchEvent);
	        }
	    }
	};

	if (msie < 9) {
	    actionStrategy[innerHTML] = function (dom, name, val, lastProps) {
	        var oldhtml = lastProps[name] && lastProps[name].__html;
	        var html = val && val.__html;
	        if (html !== oldhtml) {
	            //IE8-会吃掉最前面的空白
	            dom.innerHTML = String.fromCharCode(0xfeff) + html;
	            var textNode = dom.firstChild;
	            if (textNode.data.length === 1) {
	                dom.removeChild(textNode);
	            } else {
	                textNode.deleteData(0, 1);
	            }
	        }
	    };
	    if (msie < 8) {
	        inputMonitor.observe = noop;
	    }
	    focusMap.focus = "focusin";
	    focusMap.blur = "focusout";
	    focusMap.focusin = "focus";
	    focusMap.focusout = "blur";
	    extend(eventPropHooks, oneObject("mousemove, mouseout,mouseenter, mouseleave, mouseout,mousewheel, mousewheel, whe" + "el, click", function (event) {
	        if (!("pageX" in event)) {
	            var doc = event.target.ownerDocument || document;
	            var box = doc.compatMode === "BackCompat" ? doc.body : doc.documentElement;
	            event.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0);
	            event.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0);
	        }
	    }));

	    extend(eventPropHooks, oneObject("keyup, keydown, keypress", function (event) {
	        /* istanbul ignore next  */
	        if (event.which == null && event.type.indexOf("key") === 0) {
	            /* istanbul ignore next  */
	            event.which = event.charCode != null ? event.charCode : event.keyCode;
	        }
	    }));

	    for (var i in IEHandleFix) {
	        eventHooks[i] = eventHooks[i + "capture"] = IEHandleFix[i];
	    }
	}

	function needFix(fn) {
	    return !/native code/.test(fn);
	}
	function keysPolyfill() {
	    //解决IE下Object.keys的性能问题
	    if (needFix(Object.keys)) {
	        Object.keys = function keys(obj) {
	            var a = [];
	            for (var k in obj) {
	                if (hasOwnProperty.call(obj, k)) {
	                    a.push(k);
	                }
	            }
	            return a;
	        };
	    }
	}
	keysPolyfill();
	setTimeout(keysPolyfill, 0);
	setTimeout(keysPolyfill, 100);

	var React;
	if (win.React && win.React.options) {
	    React = win.React;
	} else {
	    React = win.React = win.ReactDOM = {
	        version: "1.2.9",
	        render: render,
	        hydrate: render,
	        Fragment: REACT_FRAGMENT_TYPE,
	        options: options,
	        PropTypes: PropTypes,
	        Children: Children,
	        Component: Component,
	        eventSystem: eventSystem,
	        findDOMNode: findDOMNode,
	        createClass: createClass,
	        createPortal: createPortal,
	        createElement: createElement,
	        cloneElement: cloneElement,
	        PureComponent: PureComponent,
	        isValidElement: isValidElement,
	        unmountComponentAtNode: unmountComponentAtNode,
	        unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,

	        createFactory: function createFactory(type) {
	            console.warn("createFactory is deprecated"); // eslint-disable-line
	            var factory = createElement.bind(null, type);
	            factory.type = type;
	            return factory;
	        }
	    };
	}
	var React$1 = React;

	return React$1;

	})));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = routerWarning;
	exports._resetWarned = _resetWarned;

	var _warning = __webpack_require__(119);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var warned = {};

	function routerWarning(falseToWarn, message) {
	  // Only issue deprecation warnings once.
	  if (message.indexOf('deprecated') !== -1) {
	    if (warned[message]) {
	      return;
	    }

	    warned[message] = true;
	  }

	  message = '[react-router] ' + message;

	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  _warning2["default"].apply(undefined, [falseToWarn, message].concat(args));
	}

	function _resetWarned() {
	  warned = {};
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function isValidChild(object) {
	  return object == null || _react2["default"].isValidElement(object);
	}

	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}

	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}

	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);

	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);

	    if (childRoutes.length) route.childRoutes = childRoutes;

	    delete route.children;
	  }

	  return route;
	}

	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router'
	 *
	 *   const routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   )
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */
	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];

	  _react2["default"].Children.forEach(children, function (element) {
	    if (_react2["default"].isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);

	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });

	  return routes;
	}

	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */
	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (routes && !Array.isArray(routes)) {
	    routes = [routes];
	  }

	  return routes;
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.extractPath = extractPath;
	exports.parsePath = parsePath;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);

	  if (match == null) return string;

	  return string.substring(match[0].length);
	}

	function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';

	  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }

	  if (pathname === '') pathname = '/';

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.routes = exports.route = exports.components = exports.component = exports.history = undefined;
	exports.falsy = falsy;

	var _react = __webpack_require__(2);

	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}

	var history = exports.history = shape({
	  listen: func.isRequired,
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired
	});

	var component = exports.component = oneOfType([func, string]);
	var components = exports.components = oneOfType([component, object]);
	var route = exports.route = oneOfType([object, element]);
	var routes = exports.routes = oneOfType([route, arrayOf(route)]);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';

	exports.__esModule = true;
	var PUSH = 'PUSH';

	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';

	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';

	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];

	  var match = void 0,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index));
	    }

	    if (match[1]) {
	      regexpSource += '([^/]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '**') {
	      regexpSource += '(.*)';
	      paramNames.push('splat');
	    } else if (match[0] === '*') {
	      regexpSource += '(.*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }

	    tokens.push(match[0]);

	    lastIndex = matcher.lastIndex;
	  }

	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length));
	  }

	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}

	var CompiledPatternsCache = Object.create(null);

	function compilePattern(pattern) {
	  if (!CompiledPatternsCache[pattern]) CompiledPatternsCache[pattern] = _compilePattern(pattern);

	  return CompiledPatternsCache[pattern];
	}

	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 * - **             Consumes (greedy) all characters up to the next character
	 *                  in the pattern, or to the end of the URL if there is none
	 *
	 *  The function calls callback(error, matched) when finished.
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */
	function matchPattern(pattern, pathname) {
	  // Ensure pattern starts with leading slash for consistency with pathname.
	  if (pattern.charAt(0) !== '/') {
	    pattern = '/' + pattern;
	  }

	  var _compilePattern2 = compilePattern(pattern);

	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;


	  if (pattern.charAt(pattern.length - 1) !== '/') {
	    regexpSource += '/?'; // Allow optional path separator at end.
	  }

	  // Special-case patterns like '*' for catch-all routes.
	  if (tokens[tokens.length - 1] === '*') {
	    regexpSource += '$';
	  }

	  var match = pathname.match(new RegExp('^' + regexpSource, 'i'));
	  if (match == null) {
	    return null;
	  }

	  var matchedPath = match[0];
	  var remainingPathname = pathname.substr(matchedPath.length);

	  if (remainingPathname) {
	    // Require that the match ends at a path separator, if we didn't match
	    // the full path, so any remaining pathname is a new path segment.
	    if (matchedPath.charAt(matchedPath.length - 1) !== '/') {
	      return null;
	    }

	    // If there is a remaining pathname, treat the path separator as part of
	    // the remaining pathname for properly continuing the match.
	    remainingPathname = '/' + remainingPathname;
	  }

	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: match.slice(1).map(function (v) {
	      return v && decodeURIComponent(v);
	    })
	  };
	}

	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}

	function getParams(pattern, pathname) {
	  var match = matchPattern(pattern, pathname);
	  if (!match) {
	    return null;
	  }

	  var paramNames = match.paramNames;
	  var paramValues = match.paramValues;

	  var params = {};

	  paramNames.forEach(function (paramName, index) {
	    params[paramName] = paramValues[index];
	  });

	  return params;
	}

	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */
	function formatPattern(pattern, params) {
	  params = params || {};

	  var _compilePattern3 = compilePattern(pattern);

	  var tokens = _compilePattern3.tokens;

	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;

	  var token = void 0,
	      paramName = void 0,
	      paramValue = void 0;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];

	    if (token === '*' || token === '**') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;

	      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : (0, _invariant2["default"])(false) : void 0;

	      if (paramValue != null) pathname += encodeURI(paramValue);
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];

	      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : (0, _invariant2["default"])(false) : void 0;

	      if (paramValue != null) pathname += encodeURIComponent(paramValue);
	    } else {
	      pathname += token;
	    }
	  }

	  return pathname.replace(/\/+/g, '/');
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _queryString = __webpack_require__(83);

	var _runTransitionHook = __webpack_require__(20);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _PathUtils = __webpack_require__(7);

	var _deprecate = __webpack_require__(19);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var SEARCH_BASE_KEY = '$searchBase';

	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}

	var defaultParseQueryString = _queryString.parse;

	function isNestedObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);

	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;

	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;

	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }

	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.

	      return location;
	    }

	    function appendQuery(location, query) {
	      var _extends2;

	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var queryString = query ? stringifyQuery(query) : '';
	      if (!searchBaseSpec && !queryString) {
	        return location;
	      }

	      process.env.NODE_ENV !== 'production' ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;

	      if (typeof location === 'string') location = _PathUtils.parsePath(location);

	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }

	      var search = searchBase;
	      if (queryString) {
	        search += (search ? '&' : '?') + queryString;
	      }

	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }

	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }

	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }

	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }

	    function createPath(location, query) {
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](!query, 'the query argument to createPath is deprecated; use a location descriptor instead') : undefined;

	      return history.createPath(appendQuery(location, query || location.query));
	    }

	    function createHref(location, query) {
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](!query, 'the query argument to createHref is deprecated; use a location descriptor instead') : undefined;

	      return history.createHref(appendQuery(location, query || location.query));
	    }

	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var fullLocation = history.createLocation.apply(history, [appendQuery(location, location.query)].concat(args));
	      if (location.query) {
	        fullLocation.query = location.query;
	      }
	      return addQuery(fullLocation);
	    }

	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      push(_extends({ state: state }, path, { query: query }));
	    }

	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      replace(_extends({ state: state }, path, { query: query }));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useQueries;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _deprecateObjectProperties = __webpack_require__(14);

	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

	var _getRouteParams = __webpack_require__(102);

	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);

	var _RouteUtils = __webpack_require__(6);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _React$PropTypes = _react2["default"].PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;

	/**
	 * A <RouterContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */

	var RouterContext = _react2["default"].createClass({
	  displayName: 'RouterContext',


	  propTypes: {
	    history: object,
	    router: object.isRequired,
	    location: object.isRequired,
	    routes: array.isRequired,
	    params: object.isRequired,
	    components: array.isRequired,
	    createElement: func.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      createElement: _react2["default"].createElement
	    };
	  },


	  childContextTypes: {
	    history: object,
	    location: object.isRequired,
	    router: object.isRequired
	  },

	  getChildContext: function getChildContext() {
	    var _props = this.props;
	    var router = _props.router;
	    var history = _props.history;
	    var location = _props.location;

	    if (!router) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, '`<RouterContext>` expects a `router` rather than a `history`') : void 0;

	      router = _extends({}, history, {
	        setRouteLeaveHook: history.listenBeforeLeavingRoute
	      });
	      delete router.listenBeforeLeavingRoute;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      location = (0, _deprecateObjectProperties2["default"])(location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation');
	    }

	    return { history: history, location: location, router: router };
	  },
	  createElement: function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  },
	  render: function render() {
	    var _this = this;

	    var _props2 = this.props;
	    var history = _props2.history;
	    var location = _props2.location;
	    var routes = _props2.routes;
	    var params = _props2.params;
	    var components = _props2.components;

	    var element = null;

	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.

	        var route = routes[index];
	        var routeParams = (0, _getRouteParams2["default"])(route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };

	        if ((0, _RouteUtils.isReactChildren)(element)) {
	          props.children = element;
	        } else if (element) {
	          for (var prop in element) {
	            if (Object.prototype.hasOwnProperty.call(element, prop)) props[prop] = element[prop];
	          }
	        }

	        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
	          var elements = {};

	          for (var key in components) {
	            if (Object.prototype.hasOwnProperty.call(components, key)) {
	              // Pass through the key as a prop to createElement to allow
	              // custom createElement functions to know which named component
	              // they're rendering, for e.g. matching up to fetched data.
	              elements[key] = _this.createElement(components[key], _extends({
	                key: key }, props));
	            }
	          }

	          return elements;
	        }

	        return _this.createElement(components, props);
	      }, element);
	    }

	    !(element === null || element === false || _react2["default"].isValidElement(element)) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, 'The root route must render a single element') : (0, _invariant2["default"])(false) : void 0;

	    return element;
	  }
	});

	exports["default"] = RouterContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.canUseMembrane = undefined;

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var canUseMembrane = exports.canUseMembrane = false;

	// No-op by default.
	var deprecateObjectProperties = function deprecateObjectProperties(object) {
	  return object;
	};

	if (process.env.NODE_ENV !== 'production') {
	  try {
	    if (Object.defineProperty({}, 'x', {
	      get: function get() {
	        return true;
	      }
	    }).x) {
	      exports.canUseMembrane = canUseMembrane = true;
	    }
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */

	  if (canUseMembrane) {
	    deprecateObjectProperties = function deprecateObjectProperties(object, message) {
	      // Wrap the deprecated object in a membrane to warn on property access.
	      var membrane = {};

	      var _loop = function _loop(prop) {
	        if (!Object.prototype.hasOwnProperty.call(object, prop)) {
	          return 'continue';
	        }

	        if (typeof object[prop] === 'function') {
	          // Can't use fat arrow here because of use of arguments below.
	          membrane[prop] = function () {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, message) : void 0;
	            return object[prop].apply(object, arguments);
	          };
	          return 'continue';
	        }

	        // These properties are non-enumerable to prevent React dev tools from
	        // seeing them and causing spurious warnings when accessing them. In
	        // principle this could be done with a proxy, but support for the
	        // ownKeys trap on proxies is not universal, even among browsers that
	        // otherwise support proxies.
	        Object.defineProperty(membrane, prop, {
	          get: function get() {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, message) : void 0;
	            return object[prop];
	          }
	        });
	      };

	      for (var prop in object) {
	        var _ret = _loop(prop);

	        if (_ret === 'continue') continue;
	      }

	      return membrane;
	    };
	  }
	}

	exports["default"] = deprecateObjectProperties;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(61)(false);
	// imports


	// module
	exports.push([module.id, "html,\r\nbody {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nul,\r\nli {\r\n    list-style: none;\r\n}\r\n\r\n.clearfix:after {\r\n    content: \"\";\r\n    display: block;\r\n    height: 0;\r\n    visibility: hidden;\r\n    clear: both;\r\n}\r\n\r\n#example {\r\n    height: 100%;\r\n}\r\n\r\n.container{\r\n    float: left;\r\n}\r\n\r\n.main{\r\n    overflow: hidden;\r\n}\r\n", ""]);

	// exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}

	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}

	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}

	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}

	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}

	function go(n) {
	  if (n) window.history.go(n);
	}

	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */

	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */

	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	function deprecate(fn, message) {
	  return function () {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] ' + message) : undefined;
	    return fn.apply(this, arguments);
	  };
	}

	exports['default'] = deprecate;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);

	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}

	exports['default'] = runTransitionHook;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(71),
	    getPrototype = __webpack_require__(73),
	    isObjectLike = __webpack_require__(78);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = void 0;

	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(Array.prototype.slice.call(arguments));
	      return;
	    }

	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) {
	      return;
	    }

	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }

	    sync = true;

	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }

	    sync = false;

	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }

	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }

	  next();
	}

	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];

	  if (length === 0) return callback(null, values);

	  var isDone = false,
	      doneCount = 0;

	  function done(index, error, value) {
	    if (isDone) return;

	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;

	      isDone = ++doneCount === length;

	      if (isDone) callback(null, values);
	    }
	  }

	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.router = exports.routes = exports.route = exports.components = exports.component = exports.location = exports.history = exports.falsy = exports.locationShape = exports.routerShape = undefined;

	var _react = __webpack_require__(2);

	var _deprecateObjectProperties = __webpack_require__(14);

	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

	var _InternalPropTypes = __webpack_require__(8);

	var InternalPropTypes = _interopRequireWildcard(_InternalPropTypes);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	var routerShape = exports.routerShape = shape({
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired,
	  setRouteLeaveHook: func.isRequired,
	  isActive: func.isRequired
	});

	var locationShape = exports.locationShape = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});

	// Deprecated stuff below:

	var falsy = exports.falsy = InternalPropTypes.falsy;
	var history = exports.history = InternalPropTypes.history;
	var location = exports.location = locationShape;
	var component = exports.component = InternalPropTypes.component;
	var components = exports.components = InternalPropTypes.components;
	var route = exports.route = InternalPropTypes.route;
	var routes = exports.routes = InternalPropTypes.routes;
	var router = exports.router = routerShape;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var deprecatePropType = function deprecatePropType(propType, message) {
	      return function () {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, message) : void 0;
	        return propType.apply(undefined, arguments);
	      };
	    };

	    var deprecateInternalPropType = function deprecateInternalPropType(propType) {
	      return deprecatePropType(propType, 'This prop type is not intended for external use, and was previously exported by mistake. These internal prop types are deprecated for external use, and will be removed in a later version.');
	    };

	    var deprecateRenamedPropType = function deprecateRenamedPropType(propType, name) {
	      return deprecatePropType(propType, 'The `' + name + '` prop type is now exported as `' + name + 'Shape` to avoid name conflicts. This export is deprecated and will be removed in a later version.');
	    };

	    exports.falsy = falsy = deprecateInternalPropType(falsy);
	    exports.history = history = deprecateInternalPropType(history);
	    exports.component = component = deprecateInternalPropType(component);
	    exports.components = components = deprecateInternalPropType(components);
	    exports.route = route = deprecateInternalPropType(route);
	    exports.routes = routes = deprecateInternalPropType(routes);

	    exports.location = location = deprecateRenamedPropType(location, 'location');
	    exports.router = router = deprecateRenamedPropType(router, 'router');
	  })();
	}

	var defaultExport = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route,
	  // For some reason, routes was never here.
	  router: router
	};

	if (process.env.NODE_ENV !== 'production') {
	  defaultExport = (0, _deprecateObjectProperties2["default"])(defaultExport, 'The default export from `react-router/lib/PropTypes` is deprecated. Please use the named exports instead.');
	}

	exports["default"] = defaultExport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = createTransitionManager;

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _computeChangedRoutes2 = __webpack_require__(100);

	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);

	var _TransitionUtils = __webpack_require__(97);

	var _isActive2 = __webpack_require__(104);

	var _isActive3 = _interopRequireDefault(_isActive2);

	var _getComponents = __webpack_require__(101);

	var _getComponents2 = _interopRequireDefault(_getComponents);

	var _matchRoutes = __webpack_require__(106);

	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function hasAnyProperties(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return true;
	  }return false;
	}

	function createTransitionManager(history, routes) {
	  var state = {};

	  // Signature should be (location, indexOnly), but needs to support (path,
	  // query, indexOnly)
	  function isActive(location) {
	    var indexOnlyOrDeprecatedQuery = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    var deprecatedIndexOnly = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	    var indexOnly = void 0;
	    if (indexOnlyOrDeprecatedQuery && indexOnlyOrDeprecatedQuery !== true || deprecatedIndexOnly !== null) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, '`isActive(pathname, query, indexOnly) is deprecated; use `isActive(location, indexOnly)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      location = { pathname: location, query: indexOnlyOrDeprecatedQuery };
	      indexOnly = deprecatedIndexOnly || false;
	    } else {
	      location = history.createLocation(location);
	      indexOnly = indexOnlyOrDeprecatedQuery;
	    }

	    return (0, _isActive3["default"])(location, indexOnly, state.location, state.routes, state.params);
	  }

	  var partialNextState = void 0;

	  function match(location, callback) {
	    if (partialNextState && partialNextState.location === location) {
	      // Continue from where we left off.
	      finishMatch(partialNextState, callback);
	    } else {
	      (0, _matchRoutes2["default"])(routes, location, function (error, nextState) {
	        if (error) {
	          callback(error);
	        } else if (nextState) {
	          finishMatch(_extends({}, nextState, { location: location }), callback);
	        } else {
	          callback();
	        }
	      });
	    }
	  }

	  function finishMatch(nextState, callback) {
	    var _computeChangedRoutes = (0, _computeChangedRoutes3["default"])(state, nextState);

	    var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	    var changeRoutes = _computeChangedRoutes.changeRoutes;
	    var enterRoutes = _computeChangedRoutes.enterRoutes;


	    (0, _TransitionUtils.runLeaveHooks)(leaveRoutes, state);

	    // Tear down confirmation hooks for left routes
	    leaveRoutes.filter(function (route) {
	      return enterRoutes.indexOf(route) === -1;
	    }).forEach(removeListenBeforeHooksForRoute);

	    // change and enter hooks are run in series
	    (0, _TransitionUtils.runChangeHooks)(changeRoutes, state, nextState, function (error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

	      (0, _TransitionUtils.runEnterHooks)(enterRoutes, nextState, finishEnterHooks);
	    });

	    function finishEnterHooks(error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

	      // TODO: Fetch components after state is updated.
	      (0, _getComponents2["default"])(nextState, function (error, components) {
	        if (error) {
	          callback(error);
	        } else {
	          // TODO: Make match a pure function and have some other API
	          // for "match and update state".
	          callback(null, null, state = _extends({}, nextState, { components: components }));
	        }
	      });
	    }

	    function handleErrorOrRedirect(error, redirectInfo) {
	      if (error) callback(error);else callback(null, redirectInfo);
	    }
	  }

	  var RouteGuid = 1;

	  function getRouteID(route) {
	    var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    return route.__id__ || create && (route.__id__ = RouteGuid++);
	  }

	  var RouteHooks = Object.create(null);

	  function getRouteHooksForRoutes(routes) {
	    return routes.reduce(function (hooks, route) {
	      hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	      return hooks;
	    }, []);
	  }

	  function transitionHook(location, callback) {
	    (0, _matchRoutes2["default"])(routes, location, function (error, nextState) {
	      if (nextState == null) {
	        // TODO: We didn't actually match anything, but hang
	        // onto error/nextState so we don't have to matchRoutes
	        // again in the listen callback.
	        callback();
	        return;
	      }

	      // Cache some state here so we don't have to
	      // matchRoutes() again in the listen callback.
	      partialNextState = _extends({}, nextState, { location: location });

	      var hooks = getRouteHooksForRoutes((0, _computeChangedRoutes3["default"])(state, partialNextState).leaveRoutes);

	      var result = void 0;
	      for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	        // Passing the location arg here indicates to
	        // the user that this is a transition hook.
	        result = hooks[i](location);
	      }

	      callback(result);
	    });
	  }

	  /* istanbul ignore next: untestable with Karma */
	  function beforeUnloadHook() {
	    // Synchronously check to see if any route hooks want
	    // to prevent the current window/tab from closing.
	    if (state.routes) {
	      var hooks = getRouteHooksForRoutes(state.routes);

	      var message = void 0;
	      for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	        // Passing no args indicates to the user that this is a
	        // beforeunload hook. We don't know the next location.
	        message = hooks[i]();
	      }

	      return message;
	    }
	  }

	  var unlistenBefore = void 0,
	      unlistenBeforeUnload = void 0;

	  function removeListenBeforeHooksForRoute(route) {
	    var routeID = getRouteID(route, false);
	    if (!routeID) {
	      return;
	    }

	    delete RouteHooks[routeID];

	    if (!hasAnyProperties(RouteHooks)) {
	      // teardown transition & beforeunload hooks
	      if (unlistenBefore) {
	        unlistenBefore();
	        unlistenBefore = null;
	      }

	      if (unlistenBeforeUnload) {
	        unlistenBeforeUnload();
	        unlistenBeforeUnload = null;
	      }
	    }
	  }

	  /**
	   * Registers the given hook function to run before leaving the given route.
	   *
	   * During a normal transition, the hook function receives the next location
	   * as its only argument and can return either a prompt message (string) to show the user,
	   * to make sure they want to leave the page; or `false`, to prevent the transition.
	   * Any other return value will have no effect.
	   *
	   * During the beforeunload event (in browsers) the hook receives no arguments.
	   * In this case it must return a prompt message to prevent the transition.
	   *
	   * Returns a function that may be used to unbind the listener.
	   */
	  function listenBeforeLeavingRoute(route, hook) {
	    // TODO: Warn if they register for a route that isn't currently
	    // active. They're probably doing something wrong, like re-creating
	    // route objects on every location change.
	    var routeID = getRouteID(route);
	    var hooks = RouteHooks[routeID];

	    if (!hooks) {
	      var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);

	      RouteHooks[routeID] = [hook];

	      if (thereWereNoRouteHooks) {
	        // setup transition & beforeunload hooks
	        unlistenBefore = history.listenBefore(transitionHook);

	        if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
	      }
	    } else {
	      if (hooks.indexOf(hook) === -1) {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, 'adding multiple leave hooks for the same route is deprecated; manage multiple confirmations in your own code instead') : void 0;

	        hooks.push(hook);
	      }
	    }

	    return function () {
	      var hooks = RouteHooks[routeID];

	      if (hooks) {
	        var newHooks = hooks.filter(function (item) {
	          return item !== hook;
	        });

	        if (newHooks.length === 0) {
	          removeListenBeforeHooksForRoute(route);
	        } else {
	          RouteHooks[routeID] = newHooks;
	        }
	      }
	    };
	  }

	  /**
	   * This is the API for stateful environments. As the location
	   * changes, we update state and call the listener. We can also
	   * gracefully handle errors and redirects.
	   */
	  function listen(listener) {
	    // TODO: Only use a single history listener. Otherwise we'll
	    // end up with multiple concurrent calls to match.
	    return history.listen(function (location) {
	      if (state.location === location) {
	        listener(null, state);
	      } else {
	        match(location, function (error, redirectLocation, nextState) {
	          if (error) {
	            listener(error);
	          } else if (redirectLocation) {
	            history.replace(redirectLocation);
	          } else if (nextState) {
	            listener(null, nextState);
	          } else {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : void 0;
	          }
	        });
	      }
	    });
	  }

	  return {
	    isActive: isActive,
	    match: match,
	    listenBeforeLeavingRoute: listenBeforeLeavingRoute,
	    listen: listen
	  };
	}

	//export default useRoutes

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.createMemoryHistory = exports.hashHistory = exports.browserHistory = exports.applyRouterMiddleware = exports.formatPattern = exports.useRouterHistory = exports.match = exports.routerShape = exports.locationShape = exports.PropTypes = exports.RoutingContext = exports.RouterContext = exports.createRoutes = exports.useRoutes = exports.RouteContext = exports.Lifecycle = exports.History = exports.Route = exports.Redirect = exports.IndexRoute = exports.IndexRedirect = exports.withRouter = exports.IndexLink = exports.Link = exports.Router = undefined;

	var _RouteUtils = __webpack_require__(6);

	Object.defineProperty(exports, 'createRoutes', {
	  enumerable: true,
	  get: function get() {
	    return _RouteUtils.createRoutes;
	  }
	});

	var _PropTypes2 = __webpack_require__(24);

	Object.defineProperty(exports, 'locationShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.locationShape;
	  }
	});
	Object.defineProperty(exports, 'routerShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.routerShape;
	  }
	});

	var _PatternUtils = __webpack_require__(10);

	Object.defineProperty(exports, 'formatPattern', {
	  enumerable: true,
	  get: function get() {
	    return _PatternUtils.formatPattern;
	  }
	});

	var _Router2 = __webpack_require__(95);

	var _Router3 = _interopRequireDefault(_Router2);

	var _Link2 = __webpack_require__(40);

	var _Link3 = _interopRequireDefault(_Link2);

	var _IndexLink2 = __webpack_require__(89);

	var _IndexLink3 = _interopRequireDefault(_IndexLink2);

	var _withRouter2 = __webpack_require__(108);

	var _withRouter3 = _interopRequireDefault(_withRouter2);

	var _IndexRedirect2 = __webpack_require__(90);

	var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);

	var _IndexRoute2 = __webpack_require__(91);

	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);

	var _Redirect2 = __webpack_require__(41);

	var _Redirect3 = _interopRequireDefault(_Redirect2);

	var _Route2 = __webpack_require__(93);

	var _Route3 = _interopRequireDefault(_Route2);

	var _History2 = __webpack_require__(88);

	var _History3 = _interopRequireDefault(_History2);

	var _Lifecycle2 = __webpack_require__(92);

	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);

	var _RouteContext2 = __webpack_require__(94);

	var _RouteContext3 = _interopRequireDefault(_RouteContext2);

	var _useRoutes2 = __webpack_require__(107);

	var _useRoutes3 = _interopRequireDefault(_useRoutes2);

	var _RouterContext2 = __webpack_require__(13);

	var _RouterContext3 = _interopRequireDefault(_RouterContext2);

	var _RoutingContext2 = __webpack_require__(96);

	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);

	var _PropTypes3 = _interopRequireDefault(_PropTypes2);

	var _match2 = __webpack_require__(105);

	var _match3 = _interopRequireDefault(_match2);

	var _useRouterHistory2 = __webpack_require__(46);

	var _useRouterHistory3 = _interopRequireDefault(_useRouterHistory2);

	var _applyRouterMiddleware2 = __webpack_require__(98);

	var _applyRouterMiddleware3 = _interopRequireDefault(_applyRouterMiddleware2);

	var _browserHistory2 = __webpack_require__(99);

	var _browserHistory3 = _interopRequireDefault(_browserHistory2);

	var _hashHistory2 = __webpack_require__(103);

	var _hashHistory3 = _interopRequireDefault(_hashHistory2);

	var _createMemoryHistory2 = __webpack_require__(43);

	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports.Router = _Router3["default"]; /* components */

	exports.Link = _Link3["default"];
	exports.IndexLink = _IndexLink3["default"];
	exports.withRouter = _withRouter3["default"];

	/* components (configuration) */

	exports.IndexRedirect = _IndexRedirect3["default"];
	exports.IndexRoute = _IndexRoute3["default"];
	exports.Redirect = _Redirect3["default"];
	exports.Route = _Route3["default"];

	/* mixins */

	exports.History = _History3["default"];
	exports.Lifecycle = _Lifecycle3["default"];
	exports.RouteContext = _RouteContext3["default"];

	/* utils */

	exports.useRoutes = _useRoutes3["default"];
	exports.RouterContext = _RouterContext3["default"];
	exports.RoutingContext = _RoutingContext3["default"];
	exports.PropTypes = _PropTypes3["default"];
	exports.match = _match3["default"];
	exports.useRouterHistory = _useRouterHistory3["default"];
	exports.applyRouterMiddleware = _applyRouterMiddleware3["default"];

	/* histories */

	exports.browserHistory = _browserHistory3["default"];
	exports.hashHistory = _hashHistory3["default"];
	exports.createMemoryHistory = _createMemoryHistory3["default"];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(48);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(112);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(111);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(110);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(47);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(49);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _combineReducers2['default'];
	exports.bindActionCreators = _bindActionCreators2['default'];
	exports.applyMiddleware = _applyMiddleware2['default'];
	exports.compose = _compose2['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(16);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*eslint-disable no-empty */
	'use strict';

	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var KeyPrefix = '@@History/';
	var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR'];

	var SecurityError = 'SecurityError';

	function createKey(key) {
	  return KeyPrefix + key;
	}

	function saveState(key, state) {
	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

	      return;
	    }

	    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

	      return;
	    }

	    throw error;
	  }
	}

	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

	      return null;
	    }
	  }

	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }

	  return null;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(11);

	var _DOMUtils = __webpack_require__(18);

	var _createHistory = __webpack_require__(32);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));

	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

	    return history.listen(listener);
	  }

	  return _extends({}, history, {
	    listen: listen
	  });
	}

	exports['default'] = createDOMHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(9);

	var _PathUtils = __webpack_require__(7);

	var _ExecutionEnvironment = __webpack_require__(11);

	var _DOMUtils = __webpack_require__(18);

	var _DOMStateStorage = __webpack_require__(29);

	var _createDOMHistory = __webpack_require__(30);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}

	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();

	  if (isAbsolutePath(path)) return true;

	  _DOMUtils.replaceHashPath('/' + path);

	  return false;
	}

	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}

	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}

	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}

	var DefaultQueryKey = '_k';

	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;

	  var queryKey = options.queryKey;

	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;

	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();

	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);

	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }

	    var location = _PathUtils.parsePath(path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.

	      transitionTo(getCurrentLocation());
	    }

	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    var path = (basename || '') + pathname + search;

	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }

	    var currentHash = _DOMUtils.getHashPath();

	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopHashChangeListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function push(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.push(location);
	  }

	  function replace(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replace(location);
	  }

	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();

	  function go(n) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;

	    history.go(n);
	  }

	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopHashChangeListener();
	  }

	  // deprecated
	  function pushState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.pushState(state, path);
	  }

	  // deprecated
	  function replaceState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replaceState(state, path);
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,

	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}

	exports['default'] = createHashHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _deepEqual = __webpack_require__(62);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _PathUtils = __webpack_require__(7);

	var _AsyncUtils = __webpack_require__(67);

	var _Actions = __webpack_require__(9);

	var _createLocation2 = __webpack_require__(69);

	var _createLocation3 = _interopRequireDefault(_createLocation2);

	var _runTransitionHook = __webpack_require__(20);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _deprecate = __webpack_require__(19);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}

	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}

	var DefaultKeyLength = 6;

	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var getUserConfirmation = options.getUserConfirmation;
	  var keyLength = options.keyLength;

	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

	  var transitionHooks = [];

	  function listenBefore(hook) {
	    transitionHooks.push(hook);

	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }

	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;

	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }

	  function updateLocation(newLocation) {
	    var current = getCurrent();

	    location = newLocation;

	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }

	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }

	  function listen(listener) {
	    changeListeners.push(listener);

	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }

	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }

	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }

	  var pendingLocation = undefined;

	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

	    pendingLocation = nextLocation;

	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);

	          if (nextPath === prevPath && _deepEqual2['default'](location.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }

	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);

	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }

	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }

	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }

	  function goBack() {
	    go(-1);
	  }

	  function goForward() {
	    go(1);
	  }

	  function createKey() {
	    return createRandomKey(keyLength);
	  }

	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;

	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;

	    var result = pathname;

	    if (search) result += search;

	    if (hash) result += hash;

	    return result;
	  }

	  function createHref(location) {
	    return createPath(location);
	  }

	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

	    if (typeof action === 'object') {
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'The state (2nd) argument to history.createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;

	      if (typeof location === 'string') location = _PathUtils.parsePath(location);

	      location = _extends({}, location, { state: action });

	      action = key;
	      key = arguments[3] || createKey();
	    }

	    return _createLocation3['default'](location, action, key);
	  }

	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }

	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }

	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);

	    push(_extends({ state: state }, path));
	  }

	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);

	    replace(_extends({ state: state }, path));
	  }

	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,

	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}

	exports['default'] = createHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _ExecutionEnvironment = __webpack_require__(11);

	var _PathUtils = __webpack_require__(7);

	var _runTransitionHook = __webpack_require__(20);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _deprecate = __webpack_require__(19);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);

	    var basename = options.basename;

	    var checkedBaseHref = false;

	    function checkBaseHref() {
	      if (checkedBaseHref) {
	        return;
	      }

	      // Automatically use the value of <base href> in HTML
	      // documents as basename if it's not explicitly given.
	      if (basename == null && _ExecutionEnvironment.canUseDOM) {
	        var base = document.getElementsByTagName('base')[0];
	        var baseHref = base && base.getAttribute('href');

	        if (baseHref != null) {
	          basename = baseHref;

	          process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Automatically setting basename using <base href> is deprecated and will ' + 'be removed in the next major release. The semantics of <base href> are ' + 'subtly different from basename. Please pass the basename explicitly in ' + 'the options to createHistory') : undefined;
	        }
	      }

	      checkedBaseHref = true;
	    }

	    function addBasename(location) {
	      checkBaseHref();

	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;

	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }

	      return location;
	    }

	    function prependBasename(location) {
	      checkBaseHref();

	      if (!basename) return location;

	      if (typeof location === 'string') location = _PathUtils.parsePath(location);

	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;

	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }

	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }

	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }

	    function replace(location) {
	      history.replace(prependBasename(location));
	    }

	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }

	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }

	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    }

	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      push(_extends({ state: state }, path));
	    }

	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      replace(_extends({ state: state }, path));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useBasename;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(77);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol["for"] &&
	    Symbol["for"]('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(82)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(81)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.connect = exports.Provider = undefined;

	var _Provider = __webpack_require__(84);

	var _Provider2 = _interopRequireDefault(_Provider);

	var _connect = __webpack_require__(85);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports.Provider = _Provider2["default"];
	exports.connect = _connect2["default"];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _propTypes = __webpack_require__(36);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports["default"] = _propTypes2["default"].shape({
	  subscribe: _propTypes2["default"].func.isRequired,
	  dispatch: _propTypes2["default"].func.isRequired,
	  getState: _propTypes2["default"].func.isRequired
	});

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _PropTypes = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _React$PropTypes = _react2["default"].PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	var oneOfType = _React$PropTypes.oneOfType;


	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	// TODO: De-duplicate against hasAnyProperties in createTransitionManager.
	function isEmptyObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return false;
	  }return true;
	}

	function createLocationDescriptor(to, _ref) {
	  var query = _ref.query;
	  var hash = _ref.hash;
	  var state = _ref.state;

	  if (query || hash || state) {
	    return { pathname: to, query: query, hash: hash, state: state };
	  }

	  return to;
	}

	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets the value of its
	 * activeClassName prop.
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */
	var Link = _react2["default"].createClass({
	  displayName: 'Link',


	  contextTypes: {
	    router: _PropTypes.routerShape
	  },

	  propTypes: {
	    to: oneOfType([string, object]),
	    query: object,
	    hash: string,
	    state: object,
	    activeStyle: object,
	    activeClassName: string,
	    onlyActiveOnIndex: bool.isRequired,
	    onClick: func,
	    target: string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onlyActiveOnIndex: false,
	      style: {}
	    };
	  },
	  handleClick: function handleClick(event) {
	    if (this.props.onClick) this.props.onClick(event);

	    if (event.defaultPrevented) return;

	    !this.context.router ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, '<Link>s rendered outside of a router context cannot navigate.') : (0, _invariant2["default"])(false) : void 0;

	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

	    // If target prop is set (e.g. to "_blank"), let browser handle link.
	    /* istanbul ignore if: untestable with Karma */
	    if (this.props.target) return;

	    event.preventDefault();

	    var _props = this.props;
	    var to = _props.to;
	    var query = _props.query;
	    var hash = _props.hash;
	    var state = _props.state;

	    var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });

	    this.context.router.push(location);
	  },
	  render: function render() {
	    var _props2 = this.props;
	    var to = _props2.to;
	    var query = _props2.query;
	    var hash = _props2.hash;
	    var state = _props2.state;
	    var activeClassName = _props2.activeClassName;
	    var activeStyle = _props2.activeStyle;
	    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;

	    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(!(query || hash || state), 'the `query`, `hash`, and `state` props on `<Link>` are deprecated, use `<Link to={{ pathname, query, hash, state }}/>. http://tiny.cc/router-isActivedeprecated') : void 0;

	    // Ignore if rendered outside the context of router, simplifies unit testing.
	    var router = this.context.router;


	    if (router) {
	      // If user does not specify a `to` prop, return an empty anchor tag.
	      if (to == null) {
	        return _react2["default"].createElement('a', props);
	      }

	      var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
	      props.href = router.createHref(location);

	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (router.isActive(location, onlyActiveOnIndex)) {
	          if (activeClassName) {
	            if (props.className) {
	              props.className += ' ' + activeClassName;
	            } else {
	              props.className = activeClassName;
	            }
	          }

	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }

	    return _react2["default"].createElement('a', _extends({}, props, { onClick: this.handleClick }));
	  }
	});

	exports["default"] = Link;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(6);

	var _PatternUtils = __webpack_require__(10);

	var _InternalPropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _React$PropTypes = _react2["default"].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;

	/**
	 * A <Redirect> is used to declare another URL path a client should
	 * be sent to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration
	 * and are traversed in the same manner.
	 */

	var Redirect = _react2["default"].createClass({
	  displayName: 'Redirect',


	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element) {
	      var route = (0, _RouteUtils.createRouteFromReactElement)(element);

	      if (route.from) route.path = route.from;

	      route.onEnter = function (nextState, replace) {
	        var location = nextState.location;
	        var params = nextState.params;


	        var pathname = void 0;
	        if (route.to.charAt(0) === '/') {
	          pathname = (0, _PatternUtils.formatPattern)(route.to, params);
	        } else if (!route.to) {
	          pathname = location.pathname;
	        } else {
	          var routeIndex = nextState.routes.indexOf(route);
	          var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
	          var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
	          pathname = (0, _PatternUtils.formatPattern)(pattern, params);
	        }

	        replace({
	          pathname: pathname,
	          query: route.query || location.query,
	          state: route.state || location.state
	        });
	      };

	      return route;
	    },
	    getRoutePattern: function getRoutePattern(routes, routeIndex) {
	      var parentPattern = '';

	      for (var i = routeIndex; i >= 0; i--) {
	        var route = routes[i];
	        var pattern = route.path || '';

	        parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

	        if (pattern.indexOf('/') === 0) break;
	      }

	      return '/' + parentPattern;
	    }
	  },

	  propTypes: {
	    path: string,
	    from: string, // Alias for path
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, '<Redirect> elements are for router configuration only and should not be rendered') : (0, _invariant2["default"])(false) : void 0;
	  }
	});

	exports["default"] = Redirect;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.createRouterObject = createRouterObject;
	exports.createRoutingHistory = createRoutingHistory;

	var _deprecateObjectProperties = __webpack_require__(14);

	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function createRouterObject(history, transitionManager) {
	  return _extends({}, history, {
	    setRouteLeaveHook: transitionManager.listenBeforeLeavingRoute,
	    isActive: transitionManager.isActive
	  });
	}

	// deprecated
	function createRoutingHistory(history, transitionManager) {
	  history = _extends({}, history, transitionManager);

	  if (process.env.NODE_ENV !== 'production') {
	    history = (0, _deprecateObjectProperties2["default"])(history, '`props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges');
	  }

	  return history;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = createMemoryHistory;

	var _useQueries = __webpack_require__(12);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _useBasename = __webpack_require__(33);

	var _useBasename2 = _interopRequireDefault(_useBasename);

	var _createMemoryHistory = __webpack_require__(70);

	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function createMemoryHistory(options) {
	  // signatures and type checking differ between `useRoutes` and
	  // `createMemoryHistory`, have to create `memoryHistory` first because
	  // `useQueries` doesn't understand the signature
	  var memoryHistory = (0, _createMemoryHistory2["default"])(options);
	  var createHistory = function createHistory() {
	    return memoryHistory;
	  };
	  var history = (0, _useQueries2["default"])((0, _useBasename2["default"])(createHistory))(options);
	  history.__v2_compatible__ = true;
	  return history;
	}
	module.exports = exports['default'];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	exports["default"] = function (createHistory) {
	  var history = void 0;
	  if (canUseDOM) history = (0, _useRouterHistory2["default"])(createHistory)();
	  return history;
	};

	var _useRouterHistory = __webpack_require__(46);

	var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	module.exports = exports['default'];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = makeStateWithLocation;

	var _deprecateObjectProperties = __webpack_require__(14);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function makeStateWithLocation(state, location) {
	  if (process.env.NODE_ENV !== 'production' && _deprecateObjectProperties.canUseMembrane) {
	    var stateWithLocation = _extends({}, state);

	    // I don't use deprecateObjectProperties here because I want to keep the
	    // same code path between development and production, in that we just
	    // assign extra properties to the copy of the state object in both cases.

	    var _loop = function _loop(prop) {
	      if (!Object.prototype.hasOwnProperty.call(location, prop)) {
	        return 'continue';
	      }

	      Object.defineProperty(stateWithLocation, prop, {
	        get: function get() {
	          process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, 'Accessing location properties directly from the first argument to `getComponent`, `getComponents`, `getChildRoutes`, and `getIndexRoute` is deprecated. That argument is now the router state (`nextState` or `partialNextState`) rather than the location. To access the location, use `nextState.location` or `partialNextState.location`.') : void 0;
	          return location[prop];
	        }
	      });
	    };

	    for (var prop in location) {
	      var _ret = _loop(prop);

	      if (_ret === 'continue') continue;
	    }

	    return stateWithLocation;
	  }

	  return _extends({}, state, location);
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = useRouterHistory;

	var _useQueries = __webpack_require__(12);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _useBasename = __webpack_require__(33);

	var _useBasename2 = _interopRequireDefault(_useBasename);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function useRouterHistory(createHistory) {
	  return function (options) {
	    var history = (0, _useQueries2["default"])((0, _useBasename2["default"])(createHistory))(options);
	    history.__v2_compatible__ = true;
	    return history;
	  };
	}
	module.exports = exports['default'];

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  return funcs.reduce(function (a, b) {
	    return function () {
	      return a(b.apply(undefined, arguments));
	    };
	  });
	}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports['default'] = createStore;

	var _isPlainObject = __webpack_require__(21);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(117);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'

	  /**
	   * Creates a Redux store that holds the state tree.
	   * The only way to change the data in the store is to call `dispatch()` on it.
	   *
	   * There should only be a single store in your app. To specify how different
	   * parts of the state tree respond to actions you may combine several reducers
	   * into a single reducer function by using `combineReducers`.
	   *
	   * @param {Function} reducer A function that returns the next state tree given
	   * the current state tree and the action to handle.
	   *
	   * @param {any} [preloadedState] The initial state. You may optionally specify it
	   * to hydrate the state from the server in universal apps or to restore a
	   * previously serialized user session.
	   * If you use `combineReducers` to produce the root reducer function this must be
	   * an object with the same shape as `combineReducers` keys.
	   *
	   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
	   * to enhance the store with third-party capabilities such as middleware
	   * time travel persistence etc. The only store enhancer that ships with Redux
	   * is `applyMiddleware()`.
	   *
	   * @returns {Store} A Redux store that lets you read the state dispatch actions
	   * and subscribe to changes.
	   */
	};function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2['default'])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      var listener = listeners[i];
	      listener();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/tc39/proposal-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2['default']] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
	}

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	'use strict';
	module.exports = function () {
		return /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/g;
	};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var clickTest = exports.clickTest = function clickTest(num) {
	  return function (dispatch) {
	    setTimeout(function () {
	      dispatch({
	        type: 'TEST',
	        num: ++num
	      });
	    }, 1000);
	  };
	};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var ReactRouter = __webpack_require__(26);

	var Link = ReactRouter.Link;


	var SubmenuItem = function SubmenuItem(props) {
	    return React.createElement(
	        'li',
	        { style: styles.submenuItem },
	        React.createElement(
	            Link,
	            { style: styles.submenuItemLink, to: props.to },
	            props.title
	        )
	    );
	};

	var Submenu = function Submenu(props) {
	    var sub = props.data;

	    return React.createElement(
	        'ul',
	        null,
	        sub.map(function (el) {
	            return React.createElement(SubmenuItem, { to: el.to, title: el.title });
	        })
	    );
	};

	var MenuItem = function MenuItem(props) {

	    return React.createElement(
	        'li',
	        null,
	        React.createElement(
	            'header',
	            null,
	            props.title
	        ),
	        props.children
	    );
	};

	var Menu = function (_React$Component) {
	    _inherits(Menu, _React$Component);

	    function Menu(props) {
	        _classCallCheck(this, Menu);

	        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));
	    }

	    _createClass(Menu, [{
	        key: 'render',
	        value: function render() {
	            var data = this.props.data;

	            return React.createElement(
	                'ul',
	                { style: styles.menu },
	                data.map(function (el) {
	                    return React.createElement(
	                        MenuItem,
	                        { title: el.title },
	                        React.createElement(Submenu, { data: el.sub })
	                    );
	                })
	            );
	        }
	    }]);

	    return Menu;
	}(React.Component);

	var styles = {
	    menu: {
	        height: '100%',
	        width: 200,
	        "float": 'left'
	    },
	    submenuItem: {
	        paddingLeft: 40
	    },
	    submenuItemLink: {
	        color: '#666'
	    }
	};

	module.exports = Menu;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _reactRedux = __webpack_require__(37);

	var _store = __webpack_require__(56);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var styles = __webpack_require__(123);
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(2);
	var ReactRouter = __webpack_require__(26);

	var Menu = __webpack_require__(52);

	var Page101 = __webpack_require__(57);
	var Page102 = __webpack_require__(58);
	var Page201 = __webpack_require__(59);
	var Page202 = __webpack_require__(60);

	var menus = [{
	  id: 1,
	  title: '模块一',
	  sub: [{
	    id: 101,
	    title: '菜单1',
	    to: '/'
	  }, {
	    id: 102,
	    title: '菜单2',
	    to: 'page102'
	  }]
	}, {
	  id: 2,
	  title: '模块一',
	  sub: [{
	    id: 201,
	    title: '菜单1',
	    to: 'page201'
	  }, {
	    id: 202,
	    title: '菜单2',
	    to: 'page202'
	  }]
	}];

	var Router = ReactRouter.Router,
	    Route = ReactRouter.Route,
	    IndexRoute = ReactRouter.IndexRoute,
	    hashHistory = ReactRouter.hashHistory,
	    browserHistory = ReactRouter.browserHistory;

	var createComponent = function createComponent(Component, props) {
	  return React.createElement(Component, props);
	};

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { style: innerStyles.container, 'class': 'clearfix' },
	        React.createElement(Menu, { data: menus }),
	        React.createElement(
	          'div',
	          { style: innerStyles.main },
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return App;
	}(React.Component);

	window.onload = function () {
	  window.s = ReactDOM.render(React.createElement(
	    _reactRedux.Provider,
	    { store: _store2["default"] },
	    React.createElement(
	      Router,
	      { history: browserHistory, createElement: createComponent },
	      React.createElement(
	        Route,
	        { component: App, path: '/' },
	        React.createElement(IndexRoute, { component: Page101 }),
	        React.createElement(Route, { component: Page102, path: 'page102' }),
	        React.createElement(Route, { component: Page201, path: 'page201' }),
	        React.createElement(Route, { component: Page202, path: 'page202' })
	      )
	    )
	  ), document.getElementById('example'));
	};

	var innerStyles = {
	  container: {
	    height: '100%'
	  },
	  main: {
	    height: '100%',
	    overflow: 'hidden'
	  }
	};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var reducer = exports.reducer = function reducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];

	  return {
	    num: action.num
	  };
	};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(27);

	var _reducerNum = __webpack_require__(54);

	exports["default"] = (0, _redux.combineReducers)({ num: _reducerNum.reducer });

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(27);

	var _reduxThunk = __webpack_require__(109);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reducer = __webpack_require__(55);

	var _reducer2 = _interopRequireDefault(_reducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	// 中间件
	var middlewares = [_reduxThunk2["default"]];

	// 增强器
	var storeEnhancers = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middlewares));

	// 参数：函数，初始值，增强器
	exports["default"] = (0, _redux.createStore)(_reducer2["default"], {}, storeEnhancers);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(37);

	var _action = __webpack_require__(51);

	var _reactRouter = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Page101 = function (_React$Component) {
	  _inherits(Page101, _React$Component);

	  function Page101(props) {
	    _classCallCheck(this, Page101);

	    return _possibleConstructorReturn(this, (Page101.__proto__ || Object.getPrototypeOf(Page101)).call(this, props));
	  }

	  _createClass(Page101, [{
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        null,
	        _react2["default"].createElement(
	          'h3',
	          null,
	          this.props.num || 0
	        ),
	        _react2["default"].createElement(
	          'button',
	          { onClick: this.viewclick },
	          '\u6DFB\u52A0'
	        )
	      );
	    }
	  }]);

	  return Page101;
	}(_react2["default"].Component);

	exports["default"] = Page101;

	var mapResourceState = function mapResourceState(state) {
	  var num = state.num.num;

	  return {
	    num: num
	  };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    viewclick: function viewclick(num) {
	      dispatch((0, _action.clickTest)(num));
	    }
	  };
	};
	module.exports = (0, _reactRedux.connect)(mapResourceState, mapDispatchToProps)(Page101);

	// const Home = React.createClass({
	//   getInitialState: function() {
	//     return {};
	//   },
	//   click: function() {
	//     this.props.click(this.props.num || 0);
	//   },
	//   render() {
	//     return (
	//       <div>
	//         <Link to="/">home</Link>
	//         <h3>{this.props.num || 0}</h3>
	//         <button onClick={this.click}>添加</button>
	//       </div>
	//     );
	//   }
	// });


	// export default connect(mapResourceState, mapDispatchToProps)(Page101);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(2);

	var styles = {
	    page: {
	        height: '100%',
	        background: '#2ef'
	    }
	};

	module.exports = function () {
	    return React.createElement(
	        'article',
	        { style: styles.page },
	        React.createElement(
	            'h3',
	            null,
	            'this is page102'
	        ),
	        React.createElement(
	            'p',
	            null,
	            '2222222222222222'
	        )
	    );
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(2);

	var styles = {
	    page: {
	        height: '100%',
	        background: '#ca3'
	    }
	};

	module.exports = function () {
	    return React.createElement(
	        'article',
	        { style: styles.page },
	        React.createElement(
	            'h3',
	            null,
	            'this is page201'
	        ),
	        React.createElement(
	            'p',
	            null,
	            '3333333333333333333'
	        )
	    );
	};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(2);

	var styles = {
	    page: {
	        height: '100%',
	        background: '#e56'
	    }
	};

	module.exports = function () {
	    return React.createElement(
	        'article',
	        { style: styles.page },
	        React.createElement(
	            'h3',
	            null,
	            'this is page202'
	        ),
	        React.createElement(
	            'p',
	            null,
	            '444444444444444444'
	        )
	    );
	};

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function(useSourceMap) {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if(item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

	function cssWithMappingToString(item, useSourceMap) {
		var content = item[1] || '';
		var cssMapping = item[3];
		if (!cssMapping) {
			return content;
		}

		if (useSourceMap && typeof btoa === 'function') {
			var sourceMapping = toComment(cssMapping);
			var sourceURLs = cssMapping.sources.map(function (source) {
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
			});

			return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
		}

		return [content].join('\n');
	}

	// Adapted from convert-source-map (MIT)
	function toComment(sourceMap) {
		// eslint-disable-next-line no-undef
		var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
		var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

		return '/*# ' + data + ' */';
	}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(64);
	var isArguments = __webpack_require__(63);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ }),
/* 63 */
/***/ (function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	   * CommonJS module that exports EventSource polyfill version 0.9.6
	   * This module is intended for browser side use
	   * =====================================================================
	   * THIS IS A POLYFILL MODULE, SO IT HAS SIDE EFFECTS
	   * IT AUTOMATICALLY CHECKS IF window OBJECT DEFINES EventSource
	   * AND ADD THE EXPORTED ONE IN CASE IT IS UNDEFINED
	   * =====================================================================
	   * Supported by sc AmvTek srl
	   * :email: devel@amvtek.com
	 */


	var PolyfillEventSource = __webpack_require__(66).EventSource;
	module.exports = PolyfillEventSource;

	// Add EventSource to window if it is missing...
	if (window && !window.EventSource){
	    window.EventSource = PolyfillEventSource;
	    if (console){
		console.log("polyfill-eventsource added missing EventSource to window");
	    }
	}


/***/ }),
/* 66 */
/***/ (function(module, exports) {

	/*
	   * EventSource polyfill version 0.9.6
	   * Supported by sc AmvTek srl
	   * :email: devel@amvtek.com
	 */
	;(function (global) {

	    if (global.EventSource && !global._eventSourceImportPrefix){
	        return;
	    }

	    var evsImportName = (global._eventSourceImportPrefix||'')+"EventSource";

	    var EventSource = function (url, options) {

	        if (!url || typeof url != 'string') {
	            throw new SyntaxError('Not enough arguments');
	        }

	        this.URL = url;
	        this.setOptions(options);
	        var evs = this;
	        setTimeout(function(){evs.poll()}, 0);
	    };

	    EventSource.prototype = {

	        CONNECTING: 0,

	        OPEN: 1,

	        CLOSED: 2,

	        defaultOptions: {

	            loggingEnabled: false,

	            loggingPrefix: "eventsource",

	            interval: 500, // milliseconds

	            bufferSizeLimit: 256*1024, // bytes

	            silentTimeout: 300000, // milliseconds

	            getArgs:{
	                'evs_buffer_size_limit': 256*1024
	            },

	            xhrHeaders:{
	                'Accept': 'text/event-stream',
	                'Cache-Control': 'no-cache',
	                'X-Requested-With': 'XMLHttpRequest'
	            }
	        },

	        setOptions: function(options){

	            var defaults = this.defaultOptions;
	            var option;

	            // set all default options...
	            for (option in defaults){

	                if ( defaults.hasOwnProperty(option) ){
	                    this[option] = defaults[option];
	                }
	            }

	            // override with what is in options
	            for (option in options){

	                if (option in defaults && options.hasOwnProperty(option)){
	                    this[option] = options[option];
	                }
	            }

	            // if getArgs option is enabled
	            // ensure evs_buffer_size_limit corresponds to bufferSizeLimit
	            if (this.getArgs && this.bufferSizeLimit) {

	                this.getArgs['evs_buffer_size_limit'] = this.bufferSizeLimit;
	            }

	            // if console is not available, force loggingEnabled to false
	            if (typeof console === "undefined" || typeof console.log === "undefined") {

	                this.loggingEnabled = false;
	            }
	        },

	        log: function(message) {

	            if (this.loggingEnabled) {

	                console.log("[" + this.loggingPrefix +"]:" + message)
	            }
	        },

	        poll: function() {

	            try {

	                if (this.readyState == this.CLOSED) {
	                    return;
	                }

	                this.cleanup();
	                this.readyState = this.CONNECTING;
	                this.cursor = 0;
	                this.cache = '';
	                this._xhr = new this.XHR(this);
	                this.resetNoActivityTimer();

	            }
	            catch (e) {

	                // in an attempt to silence the errors
	                this.log('There were errors inside the pool try-catch');
	                this.dispatchEvent('error', { type: 'error', data: e.message });
	            }
	        },

	        pollAgain: function (interval) {

	            // schedule poll to be called after interval milliseconds
	            var evs = this;
	            evs.readyState = evs.CONNECTING;
	            evs.dispatchEvent('error', {
	                type: 'error',
	                data: "Reconnecting "
	            });
	            this._pollTimer = setTimeout(function(){evs.poll()}, interval||0);
	        },


	        cleanup: function() {

	            this.log('evs cleaning up')

	            if (this._pollTimer){
	                clearInterval(this._pollTimer);
	                this._pollTimer = null;
	            }

	            if (this._noActivityTimer){
	                clearInterval(this._noActivityTimer);
	                this._noActivityTimer = null;
	            }

	            if (this._xhr){
	                this._xhr.abort();
	                this._xhr = null;
	            }
	        },

	        resetNoActivityTimer: function(){

	            if (this.silentTimeout){

	                if (this._noActivityTimer){
	                    clearInterval(this._noActivityTimer);
	                }
	                var evs = this;
	                this._noActivityTimer = setTimeout(
	                        function(){ evs.log('Timeout! silentTImeout:'+evs.silentTimeout); evs.pollAgain(); },
	                        this.silentTimeout
	                        );
	            }
	        },

	        close: function () {

	            this.readyState = this.CLOSED;
	            this.log('Closing connection. readyState: '+this.readyState);
	            this.cleanup();
	        },

	        ondata: function() {

	            var request = this._xhr;

	            if (request.isReady() && !request.hasError() ) {
	                // reset the timer, as we have activity
	                this.resetNoActivityTimer();

	                // move this EventSource to OPEN state...
	                if (this.readyState == this.CONNECTING) {
	                    this.readyState = this.OPEN;
	                    this.dispatchEvent('open', { type: 'open' });
	                }

	                var buffer = request.getBuffer();

	                if (buffer.length > this.bufferSizeLimit) {
	                    this.log('buffer.length > this.bufferSizeLimit');
	                    this.pollAgain();
	                }

	                if (this.cursor == 0 && buffer.length > 0){

	                    // skip byte order mark \uFEFF character if it starts the stream
	                    if (buffer.substring(0,1) == '\uFEFF'){
	                        this.cursor = 1;
	                    }
	                }

	                var lastMessageIndex = this.lastMessageIndex(buffer);
	                if (lastMessageIndex[0] >= this.cursor){

	                    var newcursor = lastMessageIndex[1];
	                    var toparse = buffer.substring(this.cursor, newcursor);
	                    this.parseStream(toparse);
	                    this.cursor = newcursor;
	                }

	                // if request is finished, reopen the connection
	                if (request.isDone()) {
	                    this.log('request.isDone(). reopening the connection');
	                    this.pollAgain(this.interval);
	                }
	            }
	            else if (this.readyState !== this.CLOSED) {

	                this.log('this.readyState !== this.CLOSED');
	                this.pollAgain(this.interval);

	                //MV: Unsure why an error was previously dispatched
	            }
	        },

	        parseStream: function(chunk) {

	            // normalize line separators (\r\n,\r,\n) to \n
	            // remove white spaces that may precede \n
	            chunk = this.cache + this.normalizeToLF(chunk);

	            var events = chunk.split('\n\n');

	            var i, j, eventType, datas, line, retry;

	            for (i=0; i < (events.length - 1); i++) {

	                eventType = 'message';
	                datas = [];
	                parts = events[i].split('\n');

	                for (j=0; j < parts.length; j++) {

	                    line = this.trimWhiteSpace(parts[j]);

	                    if (line.indexOf('event') == 0) {

	                        eventType = line.replace(/event:?\s*/, '');
	                    }
	                    else if (line.indexOf('retry') == 0) {

	                        retry = parseInt(line.replace(/retry:?\s*/, ''));
	                        if(!isNaN(retry)) {
	                            this.interval = retry;
	                        }
	                    }
	                    else if (line.indexOf('data') == 0) {

	                        datas.push(line.replace(/data:?\s*/, ''));
	                    }
	                    else if (line.indexOf('id:') == 0) {

	                        this.lastEventId = line.replace(/id:?\s*/, '');
	                    }
	                    else if (line.indexOf('id') == 0) { // this resets the id

	                        this.lastEventId = null;
	                    }
	                }

	                if (datas.length) {
	                    // dispatch a new event
	                    var event = new MessageEvent(eventType, datas.join('\n'), window.location.origin, this.lastEventId);
	                    this.dispatchEvent(eventType, event);
	                }
	            }

	            this.cache = events[events.length - 1];
	        },

	        dispatchEvent: function (type, event) {
	            var handlers = this['_' + type + 'Handlers'];

	            if (handlers) {

	                for (var i = 0; i < handlers.length; i++) {
	                    handlers[i].call(this, event);
	                }
	            }

	            if (this['on' + type]) {
	                this['on' + type].call(this, event);
	            }

	        },

	        addEventListener: function (type, handler) {
	            if (!this['_' + type + 'Handlers']) {
	                this['_' + type + 'Handlers'] = [];
	            }

	            this['_' + type + 'Handlers'].push(handler);
	        },

	        removeEventListener: function (type, handler) {
	            var handlers = this['_' + type + 'Handlers'];
	            if (!handlers) {
	                return;
	            }
	            for (var i = handlers.length - 1; i >= 0; --i) {
	                if (handlers[i] === handler) {
	                    handlers.splice(i, 1);
	                    break;
	                }
	            }
	        },

	        _pollTimer: null,

	        _noactivityTimer: null,

	        _xhr: null,

	        lastEventId: null,

	        cache: '',

	        cursor: 0,

	        onerror: null,

	        onmessage: null,

	        onopen: null,

	        readyState: 0,

	        // ===================================================================
	        // helpers functions
	        // those are attached to prototype to ease reuse and testing...

	        urlWithParams: function (baseURL, params) {

	            var encodedArgs = [];

	            if (params){

	                var key, urlarg;
	                var urlize = encodeURIComponent;

	                for (key in params){
	                    if (params.hasOwnProperty(key)) {
	                        urlarg = urlize(key)+'='+urlize(params[key]);
	                        encodedArgs.push(urlarg);
	                    }
	                }
	            }

	            if (encodedArgs.length > 0){

	                if (baseURL.indexOf('?') == -1)
	                    return baseURL + '?' + encodedArgs.join('&');
	                return baseURL + '&' + encodedArgs.join('&');
	            }
	            return baseURL;
	        },

	        lastMessageIndex: function(text) {

	            var ln2 =text.lastIndexOf('\n\n');
	            var lr2 = text.lastIndexOf('\r\r');
	            var lrln2 = text.lastIndexOf('\r\n\r\n');

	            if (lrln2 > Math.max(ln2, lr2)) {
	                return [lrln2, lrln2+4];
	            }
	            return [Math.max(ln2, lr2), Math.max(ln2, lr2) + 2]
	        },

	        trimWhiteSpace: function(str) {
	            // to remove whitespaces left and right of string

	            var reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
	            return str.replace(reTrim, '');
	        },

	        normalizeToLF: function(str) {

	            // replace \r and \r\n with \n
	            return str.replace(/\r\n|\r/g, '\n');
	        }

	    };

	    if (!isOldIE()){

	        EventSource.isPolyfill = "XHR";

	        // EventSource will send request using XMLHttpRequest
	        EventSource.prototype.XHR = function(evs) {

	            request = new XMLHttpRequest();
	            this._request = request;
	            evs._xhr = this;

	            // set handlers
	            request.onreadystatechange = function(){
	                if (request.readyState > 1 && evs.readyState != evs.CLOSED) {
	                    if (request.status == 200 || (request.status>=300 && request.status<400)){
	                        evs.ondata();
	                    }
	                    else {
	                        request._failed = true;
	                        evs.readyState = evs.CLOSED;
	                        evs.dispatchEvent('error', {
	                            type: 'error',
	                            data: "The server responded with "+request.status
	                        });
	                        evs.close();
	                    }
	                }
	            };

	            request.onprogress = function () {
	            };

	            request.open('GET', evs.urlWithParams(evs.URL, evs.getArgs), true);

	            var headers = evs.xhrHeaders; // maybe null
	            for (var header in headers) {
	                if (headers.hasOwnProperty(header)){
	                    request.setRequestHeader(header, headers[header]);
	                }
	            }
	            if (evs.lastEventId) {
	                request.setRequestHeader('Last-Event-Id', evs.lastEventId);
	            }

	            request.send();
	        };

	        EventSource.prototype.XHR.prototype = {

	            useXDomainRequest: false,

	            _request: null,

	            _failed: false, // true if we have had errors...

	            isReady: function() {


	                return this._request.readyState >= 2;
	            },

	            isDone: function() {

	                return (this._request.readyState == 4);
	            },

	            hasError: function() {

	                return (this._failed || (this._request.status >= 400));
	            },

	            getBuffer: function() {

	                var rv = '';
	                try {
	                    rv = this._request.responseText || '';
	                }
	                catch (e){}
	                return rv;
	            },

	            abort: function() {

	                if ( this._request ) {
	                    this._request.abort();
	                }
	            }
	        };
	    }
	    else {

		EventSource.isPolyfill = "IE_8-9";

	        // patch EventSource defaultOptions
	        var defaults = EventSource.prototype.defaultOptions;
	        defaults.xhrHeaders = null; // no headers will be sent
	        defaults.getArgs['evs_preamble'] = 2048 + 8;

	        // EventSource will send request using Internet Explorer XDomainRequest
	        EventSource.prototype.XHR = function(evs) {

	            request = new XDomainRequest();
	            this._request = request;

	            // set handlers
	            request.onprogress = function(){
	                request._ready = true;
	                evs.ondata();
	            };

	            request.onload = function(){
	                this._loaded = true;
	                evs.ondata();
	            };

	            request.onerror = function(){
	                this._failed = true;
	                evs.readyState = evs.CLOSED;
	                evs.dispatchEvent('error', {
	                    type: 'error',
	                    data: "XDomainRequest error"
	                });
	            };

	            request.ontimeout = function(){
	                this._failed = true;
	                evs.readyState = evs.CLOSED;
	                evs.dispatchEvent('error', {
	                    type: 'error',
	                    data: "XDomainRequest timed out"
	                });
	            };

	            // XDomainRequest does not allow setting custom headers
	            // If EventSource has enabled the use of GET arguments
	            // we add parameters to URL so that server can adapt the stream...
	            var reqGetArgs = {};
	            if (evs.getArgs) {

	                // copy evs.getArgs in reqGetArgs
	                var defaultArgs = evs.getArgs;
	                    for (var key in defaultArgs) {
	                        if (defaultArgs.hasOwnProperty(key)){
	                            reqGetArgs[key] = defaultArgs[key];
	                        }
	                    }
	                if (evs.lastEventId){
	                    reqGetArgs['evs_last_event_id'] = evs.lastEventId;
	                }
	            }
	            // send the request

	            request.open('GET', evs.urlWithParams(evs.URL,reqGetArgs));
	            request.send();
	        };

	        EventSource.prototype.XHR.prototype = {

	            useXDomainRequest: true,

	            _request: null,

	            _ready: false, // true when progress events are dispatched

	            _loaded: false, // true when request has been loaded

	            _failed: false, // true if when request is in error

	            isReady: function() {

	                return this._request._ready;
	            },

	            isDone: function() {

	                return this._request._loaded;
	            },

	            hasError: function() {

	                return this._request._failed;
	            },

	            getBuffer: function() {

	                var rv = '';
	                try {
	                    rv = this._request.responseText || '';
	                }
	                catch (e){}
	                return rv;
	            },

	            abort: function() {

	                if ( this._request){
	                    this._request.abort();
	                }
	            }
	        };
	    }

	    function MessageEvent(type, data, origin, lastEventId) {

	        this.bubbles = false;
	        this.cancelBubble = false;
	        this.cancelable = false;
	        this.data = data || null;
	        this.origin = origin || '';
	        this.lastEventId = lastEventId || '';
	        this.type = type || 'message';
	    }

	    function isOldIE () {

	        //return true if we are in IE8 or IE9
	        return (window.XDomainRequest && (window.XMLHttpRequest && new XMLHttpRequest().responseType === undefined)) ? true : false;
	    }

	    global[evsImportName] = EventSource;
	})(this);


/***/ }),
/* 67 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var _slice = Array.prototype.slice;
	exports.loopAsync = loopAsync;

	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = undefined;

	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(_slice.call(arguments));
	      return;
	    }

	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) {
	      return;
	    }

	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }

	    sync = true;

	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }

	    sync = false;

	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }

	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }

	  next();
	}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(9);

	var _PathUtils = __webpack_require__(7);

	var _ExecutionEnvironment = __webpack_require__(11);

	var _DOMUtils = __webpack_require__(18);

	var _DOMStateStorage = __webpack_require__(29);

	var _createDOMHistory = __webpack_require__(30);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

	  var forceRefresh = options.forceRefresh;

	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;

	  function getCurrentLocation(historyState) {
	    try {
	      historyState = historyState || window.history.state || {};
	    } catch (e) {
	      historyState = {};
	    }

	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;

	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();

	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null);
	    }

	    var location = _PathUtils.parsePath(path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

	      transitionTo(getCurrentLocation(event.state));
	    }

	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    _DOMStateStorage.saveState(key, state);

	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };

	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopPopStateListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopPopStateListener();
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}

	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _Actions = __webpack_require__(9);

	var _PathUtils = __webpack_require__(7);

	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	  if (typeof location === 'string') location = _PathUtils.parsePath(location);

	  if (typeof action === 'object') {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'The state (2nd) argument to createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;

	    location = _extends({}, location, { state: action });

	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }

	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}

	exports['default'] = createLocation;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(5);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _PathUtils = __webpack_require__(7);

	var _Actions = __webpack_require__(9);

	var _createHistory = __webpack_require__(32);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}

	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }

	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));

	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;

	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }

	  entries = entries.map(function (entry) {
	    var key = history.createKey();

	    if (typeof entry === 'string') return { pathname: entry, key: key };

	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });

	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });

	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }

	  var storage = createStateStorage(entries);

	  function saveState(key, state) {
	    storage[key] = state;
	  }

	  function readState(key) {
	    return storage[key];
	  }

	  function getCurrentLocation() {
	    var entry = entries[current];
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;

	    var path = (basename || '') + pathname + (search || '');

	    var key = undefined,
	        state = undefined;
	    if (entry.key) {
	      key = entry.key;
	      state = readState(key);
	    } else {
	      key = history.createKey();
	      state = null;
	      entry.key = key;
	    }

	    var location = _PathUtils.parsePath(path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }

	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }

	      current += n;

	      var currentLocation = getCurrentLocation();

	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }

	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;

	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);

	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }

	  return history;
	}

	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(35),
	    getRawTag = __webpack_require__(74),
	    objectToString = __webpack_require__(75);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ }),
/* 72 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(76);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(35);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ }),
/* 76 */
/***/ (function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(72);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ }),
/* 78 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ }),
/* 79 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(17);
	  var warning = __webpack_require__(28);
	  var ReactPropTypesSecret = __webpack_require__(22);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(16);
	var invariant = __webpack_require__(17);
	var ReactPropTypesSecret = __webpack_require__(22);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(16);
	var invariant = __webpack_require__(17);
	var warning = __webpack_require__(28);
	var assign = __webpack_require__(79);

	var ReactPropTypesSecret = __webpack_require__(22);
	var checkPropTypes = __webpack_require__(80);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(113);

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return {};
		}

		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}

			return ret;
		}, {});
	};

	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return key;
			}

			if (Array.isArray(val)) {
				return val.slice().sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}

			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports["default"] = undefined;

	var _react = __webpack_require__(2);

	var _propTypes = __webpack_require__(36);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _storeShape = __webpack_require__(38);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	var _warning = __webpack_require__(39);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }
	  didWarnAboutReceivingStore = true;

	  (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}

	var Provider = function (_Component) {
	  _inherits(Provider, _Component);

	  Provider.prototype.getChildContext = function getChildContext() {
	    return { store: this.store };
	  };

	  function Provider(props, context) {
	    _classCallCheck(this, Provider);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	    _this.store = props.store;
	    return _this;
	  }

	  Provider.prototype.render = function render() {
	    return _react.Children.only(this.props.children);
	  };

	  return Provider;
	}(_react.Component);

	exports["default"] = Provider;


	if (process.env.NODE_ENV !== 'production') {
	  Provider.prototype.componentWillReceiveProps = function (nextProps) {
	    var store = this.store;
	    var nextStore = nextProps.store;


	    if (store !== nextStore) {
	      warnAboutReceivingStore();
	    }
	  };
	}

	Provider.propTypes = {
	  store: _storeShape2["default"].isRequired,
	  children: _propTypes2["default"].element.isRequired
	};
	Provider.childContextTypes = {
	  store: _storeShape2["default"].isRequired
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = connect;

	var _react = __webpack_require__(2);

	var _storeShape = __webpack_require__(38);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	var _shallowEqual = __webpack_require__(86);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _wrapActionCreators = __webpack_require__(87);

	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

	var _warning = __webpack_require__(39);

	var _warning2 = _interopRequireDefault(_warning);

	var _isPlainObject = __webpack_require__(21);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _hoistNonReactStatics = __webpack_require__(34);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultMapStateToProps = function defaultMapStateToProps(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};

	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	var errorObject = { value: null };
	function tryCatch(fn, ctx) {
	  try {
	    return fn.apply(ctx);
	  } catch (e) {
	    errorObject.value = e;
	    return errorObject;
	  }
	}

	// Helps track hot reloading.
	var nextVersion = 0;

	function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	  var shouldSubscribe = Boolean(mapStateToProps);
	  var mapState = mapStateToProps || defaultMapStateToProps;

	  var mapDispatch = void 0;
	  if (typeof mapDispatchToProps === 'function') {
	    mapDispatch = mapDispatchToProps;
	  } else if (!mapDispatchToProps) {
	    mapDispatch = defaultMapDispatchToProps;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
	  }

	  var finalMergeProps = mergeProps || defaultMergeProps;
	  var _options$pure = options.pure,
	      pure = _options$pure === undefined ? true : _options$pure,
	      _options$withRef = options.withRef,
	      withRef = _options$withRef === undefined ? false : _options$withRef;

	  var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;

	  // Helps track hot reloading.
	  var version = nextVersion++;

	  return function wrapWithConnect(WrappedComponent) {
	    var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';

	    function checkStateShape(props, methodName) {
	      if (!(0, _isPlainObject2["default"])(props)) {
	        (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
	      }
	    }

	    function computeMergedProps(stateProps, dispatchProps, parentProps) {
	      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	      if (process.env.NODE_ENV !== 'production') {
	        checkStateShape(mergedProps, 'mergeProps');
	      }
	      return mergedProps;
	    }

	    var Connect = function (_Component) {
	      _inherits(Connect, _Component);

	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
	      };

	      function Connect(props, context) {
	        _classCallCheck(this, Connect);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	        _this.version = version;
	        _this.store = props.store || context.store;

	        (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));

	        var storeState = _this.store.getState();
	        _this.state = { storeState: storeState };
	        _this.clearCache();
	        return _this;
	      }

	      Connect.prototype.computeStateProps = function computeStateProps(store, props) {
	        if (!this.finalMapStateToProps) {
	          return this.configureFinalMapState(store, props);
	        }

	        var state = store.getState();
	        var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);

	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(stateProps, 'mapStateToProps');
	        }
	        return stateProps;
	      };

	      Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
	        var mappedState = mapState(store.getState(), props);
	        var isFactory = typeof mappedState === 'function';

	        this.finalMapStateToProps = isFactory ? mappedState : mapState;
	        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

	        if (isFactory) {
	          return this.computeStateProps(store, props);
	        }

	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(mappedState, 'mapStateToProps');
	        }
	        return mappedState;
	      };

	      Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
	        if (!this.finalMapDispatchToProps) {
	          return this.configureFinalMapDispatch(store, props);
	        }

	        var dispatch = store.dispatch;

	        var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);

	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(dispatchProps, 'mapDispatchToProps');
	        }
	        return dispatchProps;
	      };

	      Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
	        var mappedDispatch = mapDispatch(store.dispatch, props);
	        var isFactory = typeof mappedDispatch === 'function';

	        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
	        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

	        if (isFactory) {
	          return this.computeDispatchProps(store, props);
	        }

	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(mappedDispatch, 'mapDispatchToProps');
	        }
	        return mappedDispatch;
	      };

	      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
	        var nextStateProps = this.computeStateProps(this.store, this.props);
	        if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
	          return false;
	        }

	        this.stateProps = nextStateProps;
	        return true;
	      };

	      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
	        var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
	        if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
	          return false;
	        }

	        this.dispatchProps = nextDispatchProps;
	        return true;
	      };

	      Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
	        var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
	        if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
	          return false;
	        }

	        this.mergedProps = nextMergedProps;
	        return true;
	      };

	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return typeof this.unsubscribe === 'function';
	      };

	      Connect.prototype.trySubscribe = function trySubscribe() {
	        if (shouldSubscribe && !this.unsubscribe) {
	          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
	          this.handleChange();
	        }
	      };

	      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
	        if (this.unsubscribe) {
	          this.unsubscribe();
	          this.unsubscribe = null;
	        }
	      };

	      Connect.prototype.componentDidMount = function componentDidMount() {
	        this.trySubscribe();
	      };

	      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
	          this.haveOwnPropsChanged = true;
	        }
	      };

	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.tryUnsubscribe();
	        this.clearCache();
	      };

	      Connect.prototype.clearCache = function clearCache() {
	        this.dispatchProps = null;
	        this.stateProps = null;
	        this.mergedProps = null;
	        this.haveOwnPropsChanged = true;
	        this.hasStoreStateChanged = true;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;
	        this.renderedElement = null;
	        this.finalMapDispatchToProps = null;
	        this.finalMapStateToProps = null;
	      };

	      Connect.prototype.handleChange = function handleChange() {
	        if (!this.unsubscribe) {
	          return;
	        }

	        var storeState = this.store.getState();
	        var prevStoreState = this.state.storeState;
	        if (pure && prevStoreState === storeState) {
	          return;
	        }

	        if (pure && !this.doStatePropsDependOnOwnProps) {
	          var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
	          if (!haveStatePropsChanged) {
	            return;
	          }
	          if (haveStatePropsChanged === errorObject) {
	            this.statePropsPrecalculationError = errorObject.value;
	          }
	          this.haveStatePropsBeenPrecalculated = true;
	        }

	        this.hasStoreStateChanged = true;
	        this.setState({ storeState: storeState });
	      };

	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

	        return this.refs.wrappedInstance;
	      };

	      Connect.prototype.render = function render() {
	        var haveOwnPropsChanged = this.haveOwnPropsChanged,
	            hasStoreStateChanged = this.hasStoreStateChanged,
	            haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated,
	            statePropsPrecalculationError = this.statePropsPrecalculationError,
	            renderedElement = this.renderedElement;


	        this.haveOwnPropsChanged = false;
	        this.hasStoreStateChanged = false;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;

	        if (statePropsPrecalculationError) {
	          throw statePropsPrecalculationError;
	        }

	        var shouldUpdateStateProps = true;
	        var shouldUpdateDispatchProps = true;
	        if (pure && renderedElement) {
	          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
	          shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
	        }

	        var haveStatePropsChanged = false;
	        var haveDispatchPropsChanged = false;
	        if (haveStatePropsBeenPrecalculated) {
	          haveStatePropsChanged = true;
	        } else if (shouldUpdateStateProps) {
	          haveStatePropsChanged = this.updateStatePropsIfNeeded();
	        }
	        if (shouldUpdateDispatchProps) {
	          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
	        }

	        var haveMergedPropsChanged = true;
	        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
	          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
	        } else {
	          haveMergedPropsChanged = false;
	        }

	        if (!haveMergedPropsChanged && renderedElement) {
	          return renderedElement;
	        }

	        if (withRef) {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
	            ref: 'wrappedInstance'
	          }));
	        } else {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
	        }

	        return this.renderedElement;
	      };

	      return Connect;
	    }(_react.Component);

	    Connect.displayName = connectDisplayName;
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      store: _storeShape2["default"]
	    };
	    Connect.propTypes = {
	      store: _storeShape2["default"]
	    };

	    if (process.env.NODE_ENV !== 'production') {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        if (this.version === version) {
	          return;
	        }

	        // We are hot reloading!
	        this.version = version;
	        this.trySubscribe();
	        this.clearCache();
	      };
	    }

	    return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 86 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = shallowEqual;
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = wrapActionCreators;

	var _redux = __webpack_require__(27);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _InternalPropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * A mixin that adds the "history" instance variable to components.
	 */
	var History = {

	  contextTypes: {
	    history: _InternalPropTypes.history
	  },

	  componentWillMount: function componentWillMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : void 0;
	    this.history = this.context.history;
	  }
	};

	exports["default"] = History;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Link = __webpack_require__(40);

	var _Link2 = _interopRequireDefault(_Link);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * An <IndexLink> is used to link to an <IndexRoute>.
	 */
	var IndexLink = _react2["default"].createClass({
	  displayName: 'IndexLink',
	  render: function render() {
	    return _react2["default"].createElement(_Link2["default"], _extends({}, this.props, { onlyActiveOnIndex: true }));
	  }
	});

	exports["default"] = IndexLink;
	module.exports = exports['default'];

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Redirect = __webpack_require__(41);

	var _Redirect2 = _interopRequireDefault(_Redirect);

	var _InternalPropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _React$PropTypes = _react2["default"].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;

	/**
	 * An <IndexRedirect> is used to redirect from an indexRoute.
	 */

	var IndexRedirect = _react2["default"].createClass({
	  displayName: 'IndexRedirect',


	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = _Redirect2["default"].createRouteFromReactElement(element);
	      } else {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },

	  propTypes: {
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : (0, _invariant2["default"])(false) : void 0;
	  }
	});

	exports["default"] = IndexRedirect;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(6);

	var _InternalPropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var func = _react2["default"].PropTypes.func;

	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */

	var IndexRoute = _react2["default"].createClass({
	  displayName: 'IndexRoute',


	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = (0, _RouteUtils.createRouteFromReactElement)(element);
	      } else {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },

	  propTypes: {
	    path: _InternalPropTypes.falsy,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : (0, _invariant2["default"])(false) : void 0;
	  }
	});

	exports["default"] = IndexRoute;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var object = _react2["default"].PropTypes.object;

	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
	 * component that may be used to cancel a transition or prompt the user
	 * for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * During the beforeunload event (assuming you're using the useBeforeUnload
	 * history enhancer), routerWillLeave does not receive a location object
	 * because it isn't possible for us to know the location we're transitioning
	 * to. In this case routerWillLeave must return a prompt message to prevent
	 * the user from closing the window/tab.
	 */

	var Lifecycle = {

	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },

	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },

	  componentDidMount: function componentDidMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, 'the `Lifecycle` mixin is deprecated, please use `context.router.setRouteLeaveHook(route, hook)`. http://tiny.cc/router-lifecyclemixin') : void 0;
	    !this.routerWillLeave ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : (0, _invariant2["default"])(false) : void 0;

	    var route = this.props.route || this.context.route;

	    !route ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : (0, _invariant2["default"])(false) : void 0;

	    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
	  }
	};

	exports["default"] = Lifecycle;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(6);

	var _InternalPropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _React$PropTypes = _react2["default"].PropTypes;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;

	/**
	 * A <Route> is used to declare which components are rendered to the
	 * page when the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is
	 * requested, the tree is searched depth-first to find a route whose
	 * path matches the URL.  When one is found, all routes in the tree
	 * that lead to it are considered "active" and their components are
	 * rendered into the DOM, nested in the same order as in the tree.
	 */

	var Route = _react2["default"].createClass({
	  displayName: 'Route',


	  statics: {
	    createRouteFromReactElement: _RouteUtils.createRouteFromReactElement
	  },

	  propTypes: {
	    path: string,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, '<Route> elements are for router configuration only and should not be rendered') : (0, _invariant2["default"])(false) : void 0;
	  }
	});

	exports["default"] = Route;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var object = _react2["default"].PropTypes.object;

	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */

	var RouteContext = {

	  propTypes: {
	    route: object.isRequired
	  },

	  childContextTypes: {
	    route: object.isRequired
	  },

	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, 'The `RouteContext` mixin is deprecated. You can provide `this.props.route` on context with your own `contextTypes`. http://tiny.cc/router-routecontextmixin') : void 0;
	  }
	};

	exports["default"] = RouteContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createHashHistory = __webpack_require__(31);

	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

	var _useQueries = __webpack_require__(12);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _createTransitionManager = __webpack_require__(25);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _InternalPropTypes = __webpack_require__(8);

	var _RouterContext = __webpack_require__(13);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	var _RouteUtils = __webpack_require__(6);

	var _RouterUtils = __webpack_require__(42);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function isDeprecatedHistory(history) {
	  return !history || !history.__v2_compatible__;
	}

	/* istanbul ignore next: sanity check */
	function isUnsupportedHistory(history) {
	  // v3 histories expose getCurrentLocation, but aren't currently supported.
	  return history && history.getCurrentLocation;
	}

	var _React$PropTypes = _react2["default"].PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;

	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RouterContext> with all the props
	 * it needs each time the URL changes.
	 */

	var Router = _react2["default"].createClass({
	  displayName: 'Router',


	  propTypes: {
	    history: object,
	    children: _InternalPropTypes.routes,
	    routes: _InternalPropTypes.routes, // alias for children
	    render: func,
	    createElement: func,
	    onError: func,
	    onUpdate: func,

	    // Deprecated:
	    parseQueryString: func,
	    stringifyQuery: func,

	    // PRIVATE: For client-side rehydration of server match.
	    matchContext: object
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      render: function render(props) {
	        return _react2["default"].createElement(_RouterContext2["default"], props);
	      }
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  },
	  handleError: function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    var _props = this.props;
	    var parseQueryString = _props.parseQueryString;
	    var stringifyQuery = _props.stringifyQuery;

	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : void 0;

	    var _createRouterObjects = this.createRouterObjects();

	    var history = _createRouterObjects.history;
	    var transitionManager = _createRouterObjects.transitionManager;
	    var router = _createRouterObjects.router;


	    this._unlisten = transitionManager.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });

	    this.history = history;
	    this.router = router;
	  },
	  createRouterObjects: function createRouterObjects() {
	    var matchContext = this.props.matchContext;

	    if (matchContext) {
	      return matchContext;
	    }

	    var history = this.props.history;
	    var _props2 = this.props;
	    var routes = _props2.routes;
	    var children = _props2.children;


	    !!isUnsupportedHistory(history) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, 'You have provided a history object created with history v3.x. ' + 'This version of React Router is not compatible with v3 history ' + 'objects. Please use history v2.x instead.') : (0, _invariant2["default"])(false) : void 0;

	    if (isDeprecatedHistory(history)) {
	      history = this.wrapDeprecatedHistory(history);
	    }

	    var transitionManager = (0, _createTransitionManager2["default"])(history, (0, _RouteUtils.createRoutes)(routes || children));
	    var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	    var routingHistory = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);

	    return { history: routingHistory, transitionManager: transitionManager, router: router };
	  },
	  wrapDeprecatedHistory: function wrapDeprecatedHistory(history) {
	    var _props3 = this.props;
	    var parseQueryString = _props3.parseQueryString;
	    var stringifyQuery = _props3.stringifyQuery;


	    var createHistory = void 0;
	    if (history) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a custom history please create it with `useRouterHistory`, see http://tiny.cc/router-usinghistory for details.') : void 0;
	      createHistory = function createHistory() {
	        return history;
	      };
	    } else {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : void 0;
	      createHistory = _createHashHistory2["default"];
	    }

	    return (0, _useQueries2["default"])(createHistory)({ parseQueryString: parseQueryString, stringifyQuery: stringifyQuery });
	  },


	  /* istanbul ignore next: sanity check */
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : void 0;

	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : void 0;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  },
	  render: function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var _props4 = this.props;
	    var createElement = _props4.createElement;
	    var render = _props4.render;

	    var props = _objectWithoutProperties(_props4, ['createElement', 'render']);

	    if (location == null) return null; // Async match

	    // Only forward non-Router-specific props to routing context, as those are
	    // the only ones that might be custom routing context props.
	    Object.keys(Router.propTypes).forEach(function (propType) {
	      return delete props[propType];
	    });

	    return render(_extends({}, props, {
	      history: this.history,
	      router: this.router,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components,
	      createElement: createElement
	    }));
	  }
	});

	exports["default"] = Router;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _RouterContext = __webpack_require__(13);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var RoutingContext = _react2["default"].createClass({
	  displayName: 'RoutingContext',
	  componentWillMount: function componentWillMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : void 0;
	  },
	  render: function render() {
	    return _react2["default"].createElement(_RouterContext2["default"], this.props);
	  }
	});

	exports["default"] = RoutingContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runChangeHooks = runChangeHooks;
	exports.runLeaveHooks = runLeaveHooks;

	var _AsyncUtils = __webpack_require__(23);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function createTransitionHook(hook, route, asyncArity) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    hook.apply(route, args);

	    if (hook.length < asyncArity) {
	      var callback = args[args.length - 1];
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}

	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createTransitionHook(route.onEnter, route, 3));

	    return hooks;
	  }, []);
	}

	function getChangeHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onChange) hooks.push(createTransitionHook(route.onChange, route, 4));
	    return hooks;
	  }, []);
	}

	function runTransitionHooks(length, iter, callback) {
	  if (!length) {
	    callback();
	    return;
	  }

	  var redirectInfo = void 0;
	  function replace(location, deprecatedPathname, deprecatedQuery) {
	    if (deprecatedPathname) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, '`replaceState(state, pathname, query) is deprecated; use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      redirectInfo = {
	        pathname: deprecatedPathname,
	        query: deprecatedQuery,
	        state: location
	      };

	      return;
	    }

	    redirectInfo = location;
	  }

	  (0, _AsyncUtils.loopAsync)(length, function (index, next, done) {
	    iter(index, replace, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}

	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](nextState, replace, next);
	  }, callback);
	}

	/**
	 * Runs all onChange hooks in the given array of routes in order
	 * with onChange(prevState, nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runChangeHooks(routes, state, nextState, callback) {
	  var hooks = getChangeHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](state, nextState, replace, next);
	  }, callback);
	}

	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */
	function runLeaveHooks(routes, prevState) {
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    if (routes[i].onLeave) routes[i].onLeave.call(routes[i], prevState);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _RouterContext = __webpack_require__(13);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports["default"] = function () {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    middlewares.forEach(function (middleware, index) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(middleware.renderRouterContext || middleware.renderRouteComponent, 'The middleware specified at index ' + index + ' does not appear to be ' + 'a valid React Router middleware.') : void 0;
	    });
	  }

	  var withContext = middlewares.map(function (middleware) {
	    return middleware.renderRouterContext;
	  }).filter(Boolean);
	  var withComponent = middlewares.map(function (middleware) {
	    return middleware.renderRouteComponent;
	  }).filter(Boolean);

	  var makeCreateElement = function makeCreateElement() {
	    var baseCreateElement = arguments.length <= 0 || arguments[0] === undefined ? _react.createElement : arguments[0];
	    return function (Component, props) {
	      return withComponent.reduceRight(function (previous, renderRouteComponent) {
	        return renderRouteComponent(previous, props);
	      }, baseCreateElement(Component, props));
	    };
	  };

	  return function (renderProps) {
	    return withContext.reduceRight(function (previous, renderRouterContext) {
	      return renderRouterContext(previous, renderProps);
	    }, _react2["default"].createElement(_RouterContext2["default"], _extends({}, renderProps, {
	      createElement: makeCreateElement(renderProps.createElement)
	    })));
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createBrowserHistory = __webpack_require__(68);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	var _createRouterHistory = __webpack_require__(44);

	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports["default"] = (0, _createRouterHistory2["default"])(_createBrowserHistory2["default"]);
	module.exports = exports['default'];

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(10);

	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;

	  var paramNames = (0, _PatternUtils.getParamNames)(route.path);

	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}

	/**
	 * Returns an object of { leaveRoutes, changeRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 *
	 * changeRoutes are any routes that didn't leave or enter during
	 * the transition.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;

	  var leaveRoutes = void 0,
	      changeRoutes = void 0,
	      enterRoutes = void 0;
	  if (prevRoutes) {
	    (function () {
	      var parentIsLeaving = false;
	      leaveRoutes = prevRoutes.filter(function (route) {
	        if (parentIsLeaving) {
	          return true;
	        } else {
	          var isLeaving = nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	          if (isLeaving) parentIsLeaving = true;
	          return isLeaving;
	        }
	      });

	      // onLeave hooks start at the leaf route.
	      leaveRoutes.reverse();

	      enterRoutes = [];
	      changeRoutes = [];

	      nextRoutes.forEach(function (route) {
	        var isNew = prevRoutes.indexOf(route) === -1;
	        var paramsChanged = leaveRoutes.indexOf(route) !== -1;

	        if (isNew || paramsChanged) enterRoutes.push(route);else changeRoutes.push(route);
	      });
	    })();
	  } else {
	    leaveRoutes = [];
	    changeRoutes = [];
	    enterRoutes = nextRoutes;
	  }

	  return {
	    leaveRoutes: leaveRoutes,
	    changeRoutes: changeRoutes,
	    enterRoutes: enterRoutes
	  };
	}

	exports["default"] = computeChangedRoutes;
	module.exports = exports['default'];

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _AsyncUtils = __webpack_require__(23);

	var _makeStateWithLocation = __webpack_require__(45);

	var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getComponentsForRoute(nextState, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	    return;
	  }

	  var getComponent = route.getComponent || route.getComponents;
	  if (!getComponent) {
	    callback();
	    return;
	  }

	  var location = nextState.location;

	  var nextStateWithLocation = (0, _makeStateWithLocation2["default"])(nextState, location);

	  getComponent.call(route, nextStateWithLocation, callback);
	}

	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  (0, _AsyncUtils.mapAsync)(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState, route, callback);
	  }, callback);
	}

	exports["default"] = getComponents;
	module.exports = exports['default'];

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(10);

	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};

	  if (!route.path) return routeParams;

	  (0, _PatternUtils.getParamNames)(route.path).forEach(function (p) {
	    if (Object.prototype.hasOwnProperty.call(params, p)) {
	      routeParams[p] = params[p];
	    }
	  });

	  return routeParams;
	}

	exports["default"] = getRouteParams;
	module.exports = exports['default'];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createHashHistory = __webpack_require__(31);

	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

	var _createRouterHistory = __webpack_require__(44);

	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports["default"] = (0, _createRouterHistory2["default"])(_createHashHistory2["default"]);
	module.exports = exports['default'];

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports["default"] = isActive;

	var _PatternUtils = __webpack_require__(10);

	function deepEqual(a, b) {
	  if (a == b) return true;

	  if (a == null || b == null) return false;

	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }

	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
	    for (var p in a) {
	      if (!Object.prototype.hasOwnProperty.call(a, p)) {
	        continue;
	      }

	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }

	    return true;
	  }

	  return String(a) === String(b);
	}

	/**
	 * Returns true if the current pathname matches the supplied one, net of
	 * leading and trailing slash normalization. This is sufficient for an
	 * indexOnly route match.
	 */
	function pathIsActive(pathname, currentPathname) {
	  // Normalize leading slash for consistency. Leading slash on pathname has
	  // already been normalized in isActive. See caveat there.
	  if (currentPathname.charAt(0) !== '/') {
	    currentPathname = '/' + currentPathname;
	  }

	  // Normalize the end of both path names too. Maybe `/foo/` shouldn't show
	  // `/foo` as active, but in this case, we would already have failed the
	  // match.
	  if (pathname.charAt(pathname.length - 1) !== '/') {
	    pathname += '/';
	  }
	  if (currentPathname.charAt(currentPathname.length - 1) !== '/') {
	    currentPathname += '/';
	  }

	  return currentPathname === pathname;
	}

	/**
	 * Returns true if the given pathname matches the active routes and params.
	 */
	function routeIsActive(pathname, routes, params) {
	  var remainingPathname = pathname,
	      paramNames = [],
	      paramValues = [];

	  // for...of would work here but it's probably slower post-transpilation.
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    var route = routes[i];
	    var pattern = route.path || '';

	    if (pattern.charAt(0) === '/') {
	      remainingPathname = pathname;
	      paramNames = [];
	      paramValues = [];
	    }

	    if (remainingPathname !== null && pattern) {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }

	      if (remainingPathname === '') {
	        // We have an exact match on the route. Just check that all the params
	        // match.
	        // FIXME: This doesn't work on repeated params.
	        return paramNames.every(function (paramName, index) {
	          return String(paramValues[index]) === String(params[paramName]);
	        });
	      }
	    }
	  }

	  return false;
	}

	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;

	  if (query == null) return true;

	  return deepEqual(query, activeQuery);
	}

	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	function isActive(_ref, indexOnly, currentLocation, routes, params) {
	  var pathname = _ref.pathname;
	  var query = _ref.query;

	  if (currentLocation == null) return false;

	  // TODO: This is a bit ugly. It keeps around support for treating pathnames
	  // without preceding slashes as absolute paths, but possibly also works
	  // around the same quirks with basenames as in matchRoutes.
	  if (pathname.charAt(0) !== '/') {
	    pathname = '/' + pathname;
	  }

	  if (!pathIsActive(pathname, currentLocation.pathname)) {
	    // The path check is necessary and sufficient for indexOnly, but otherwise
	    // we still need to check the routes.
	    if (indexOnly || !routeIsActive(pathname, routes, params)) {
	      return false;
	    }
	  }

	  return queryIsActive(query, currentLocation.query);
	}
	module.exports = exports['default'];

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Actions = __webpack_require__(9);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _createMemoryHistory = __webpack_require__(43);

	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

	var _createTransitionManager = __webpack_require__(25);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _RouteUtils = __webpack_require__(6);

	var _RouterUtils = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	/**
	 * A high-level API to be used for server-side rendering.
	 *
	 * This function matches a location to a set of routes and calls
	 * callback(error, redirectLocation, renderProps) when finished.
	 *
	 * Note: You probably don't want to use this in a browser unless you're using
	 * server-side rendering with async routes.
	 */
	function match(_ref, callback) {
	  var history = _ref.history;
	  var routes = _ref.routes;
	  var location = _ref.location;

	  var options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);

	  !(history || location) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, 'match needs a history or a location') : (0, _invariant2["default"])(false) : void 0;

	  history = history ? history : (0, _createMemoryHistory2["default"])(options);
	  var transitionManager = (0, _createTransitionManager2["default"])(history, (0, _RouteUtils.createRoutes)(routes));

	  var unlisten = void 0;

	  if (location) {
	    // Allow match({ location: '/the/path', ... })
	    location = history.createLocation(location);
	  } else {
	    // Pick up the location from the history via synchronous history.listen
	    // call if needed.
	    unlisten = history.listen(function (historyLocation) {
	      location = historyLocation;
	    });
	  }

	  var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	  history = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);

	  transitionManager.match(location, function (error, redirectLocation, nextState) {
	    callback(error, redirectLocation && router.createLocation(redirectLocation, _Actions.REPLACE), nextState && _extends({}, nextState, {
	      history: history,
	      router: router,
	      matchContext: { history: history, transitionManager: transitionManager, router: router }
	    }));

	    // Defer removing the listener to here to prevent DOM histories from having
	    // to unwind DOM event listeners unnecessarily, in case callback renders a
	    // <Router> and attaches another history listener.
	    if (unlisten) {
	      unlisten();
	    }
	  });
	}

	exports["default"] = match;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports["default"] = matchRoutes;

	var _AsyncUtils = __webpack_require__(23);

	var _makeStateWithLocation = __webpack_require__(45);

	var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);

	var _PatternUtils = __webpack_require__(10);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _RouteUtils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getChildRoutes(route, location, paramNames, paramValues, callback) {
	  if (route.childRoutes) {
	    return [null, route.childRoutes];
	  }
	  if (!route.getChildRoutes) {
	    return [];
	  }

	  var sync = true,
	      result = void 0;

	  var partialNextState = {
	    location: location,
	    params: createParams(paramNames, paramValues)
	  };

	  var partialNextStateWithLocation = (0, _makeStateWithLocation2["default"])(partialNextState, location);

	  route.getChildRoutes(partialNextStateWithLocation, function (error, childRoutes) {
	    childRoutes = !error && (0, _RouteUtils.createRoutes)(childRoutes);
	    if (sync) {
	      result = [error, childRoutes];
	      return;
	    }

	    callback(error, childRoutes);
	  });

	  sync = false;
	  return result; // Might be undefined.
	}

	function getIndexRoute(route, location, paramNames, paramValues, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    var partialNextState = {
	      location: location,
	      params: createParams(paramNames, paramValues)
	    };

	    var partialNextStateWithLocation = (0, _makeStateWithLocation2["default"])(partialNextState, location);

	    route.getIndexRoute(partialNextStateWithLocation, function (error, indexRoute) {
	      callback(error, !error && (0, _RouteUtils.createRoutes)(indexRoute)[0]);
	    });
	  } else if (route.childRoutes) {
	    (function () {
	      var pathless = route.childRoutes.filter(function (childRoute) {
	        return !childRoute.path;
	      });

	      (0, _AsyncUtils.loopAsync)(pathless.length, function (index, next, done) {
	        getIndexRoute(pathless[index], location, paramNames, paramValues, function (error, indexRoute) {
	          if (error || indexRoute) {
	            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
	            done(error, routes);
	          } else {
	            next();
	          }
	        });
	      }, function (err, routes) {
	        callback(null, routes);
	      });
	    })();
	  } else {
	    callback();
	  }
	}

	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduce(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];

	    if (Array.isArray(params[paramName])) {
	      params[paramName].push(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [params[paramName], paramValue];
	    } else {
	      params[paramName] = paramValue;
	    }

	    return params;
	  }, params);
	}

	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}

	function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
	  var pattern = route.path || '';

	  if (pattern.charAt(0) === '/') {
	    remainingPathname = location.pathname;
	    paramNames = [];
	    paramValues = [];
	  }

	  // Only try to match the path if the route actually has a pattern, and if
	  // we're not just searching for potential nested absolute paths.
	  if (remainingPathname !== null && pattern) {
	    try {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }
	    } catch (error) {
	      callback(error);
	    }

	    // By assumption, pattern is non-empty here, which is the prerequisite for
	    // actually terminating a match.
	    if (remainingPathname === '') {
	      var _ret2 = function () {
	        var match = {
	          routes: [route],
	          params: createParams(paramNames, paramValues)
	        };

	        getIndexRoute(route, location, paramNames, paramValues, function (error, indexRoute) {
	          if (error) {
	            callback(error);
	          } else {
	            if (Array.isArray(indexRoute)) {
	              var _match$routes;

	              process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(indexRoute.every(function (route) {
	                return !route.path;
	              }), 'Index routes should not have paths') : void 0;
	              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
	            } else if (indexRoute) {
	              process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(!indexRoute.path, 'Index routes should not have paths') : void 0;
	              match.routes.push(indexRoute);
	            }

	            callback(null, match);
	          }
	        });

	        return {
	          v: void 0
	        };
	      }();

	      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	    }
	  }

	  if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    var onChildRoutes = function onChildRoutes(error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, remainingPathname, paramNames, paramValues);
	      } else {
	        callback();
	      }
	    };

	    var result = getChildRoutes(route, location, paramNames, paramValues, onChildRoutes);
	    if (result) {
	      onChildRoutes.apply(undefined, result);
	    }
	  } else {
	    callback();
	  }
	}

	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback, remainingPathname) {
	  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];

	  if (remainingPathname === undefined) {
	    // TODO: This is a little bit ugly, but it works around a quirk in history
	    // that strips the leading slash from pathnames when using basenames with
	    // trailing slashes.
	    if (location.pathname.charAt(0) !== '/') {
	      location = _extends({}, location, {
	        pathname: '/' + location.pathname
	      });
	    }
	    remainingPathname = location.pathname;
	  }

	  (0, _AsyncUtils.loopAsync)(routes.length, function (index, next, done) {
	    matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
	      if (error || match) {
	        done(error, match);
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _useQueries = __webpack_require__(12);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _createTransitionManager = __webpack_require__(25);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _routerWarning = __webpack_require__(3);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * Enhances history objects with the following methods:
	 *
	 * - listen((error, nextState) => {})
	 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
	 * - match(location, (error, redirectLocation, nextState) => {})
	 * - isActive(pathname, query, indexOnly=false)
	 */
	function useRoutes(createHistory) {
	  process.env.NODE_ENV !== 'production' ? (0, _routerWarning2["default"])(false, '`useRoutes` is deprecated. Please use `createTransitionManager` instead.') : void 0;

	  return function () {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var routes = _ref.routes;

	    var options = _objectWithoutProperties(_ref, ['routes']);

	    var history = (0, _useQueries2["default"])(createHistory)(options);
	    var transitionManager = (0, _createTransitionManager2["default"])(history, routes);
	    return _extends({}, history, transitionManager);
	  };
	}

	exports["default"] = useRoutes;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = withRouter;

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _hoistNonReactStatics = __webpack_require__(34);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _PropTypes = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	function withRouter(WrappedComponent, options) {
	  var withRef = options && options.withRef;

	  var WithRouter = _react2["default"].createClass({
	    displayName: 'WithRouter',

	    contextTypes: { router: _PropTypes.routerShape },
	    propTypes: { router: _PropTypes.routerShape },

	    getWrappedInstance: function getWrappedInstance() {
	      !withRef ? process.env.NODE_ENV !== 'production' ? (0, _invariant2["default"])(false, 'To access the wrapped instance, you need to specify ' + '`{ withRef: true }` as the second argument of the withRouter() call.') : (0, _invariant2["default"])(false) : void 0;

	      return this.wrappedInstance;
	    },
	    render: function render() {
	      var _this = this;

	      var router = this.props.router || this.context.router;
	      var props = _extends({}, this.props, { router: router });

	      if (withRef) {
	        props.ref = function (c) {
	          _this.wrappedInstance = c;
	        };
	      }

	      return _react2["default"].createElement(WrappedComponent, props);
	    }
	  });

	  WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
	  WithRouter.WrappedComponent = WrappedComponent;

	  return (0, _hoistNonReactStatics2["default"])(WithRouter, WrappedComponent);
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 109 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	function createThunkMiddleware(extraArgument) {
	  return function (_ref) {
	    var dispatch = _ref.dispatch,
	        getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        if (typeof action === 'function') {
	          return action(dispatch, getState, extraArgument);
	        }

	        return next(action);
	      };
	    };
	  };
	}

	var thunk = createThunkMiddleware();
	thunk.withExtraArgument = createThunkMiddleware;

	exports['default'] = thunk;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	var _compose = __webpack_require__(47);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, preloadedState, enhancer) {
	      var store = createStore(reducer, preloadedState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ }),
/* 111 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	var _createStore = __webpack_require__(48);

	var _isPlainObject = __webpack_require__(21);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(49);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2['default'])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	  });

	  unexpectedKeys.forEach(function (key) {
	    unexpectedKeyCache[key] = true;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerShape(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];

	    if (process.env.NODE_ENV !== 'production') {
	      if (typeof reducers[key] === 'undefined') {
	        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
	      }
	    }

	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  var unexpectedKeyCache = void 0;
	  if (process.env.NODE_ENV !== 'production') {
	    unexpectedKeyCache = {};
	  }

	  var shapeAssertionError = void 0;
	  try {
	    assertReducerShape(finalReducers);
	  } catch (e) {
	    shapeAssertionError = e;
	  }

	  return function combination() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];

	    if (shapeAssertionError) {
	      throw shapeAssertionError;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
	      if (warningMessage) {
	        (0, _warning2['default'])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
	      var _key = finalReducerKeys[_i];
	      var reducer = finalReducers[_key];
	      var previousStateForKey = state[_key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(_key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[_key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 113 */
/***/ (function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(50)();

	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [],
		fixUrls = __webpack_require__(116);

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		options.attrs = typeof options.attrs === "object" ? options.attrs : {};

		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	};

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		options.attrs.type = "text/css";

		attachTagAttrs(styleElement, options.attrs);
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";

		attachTagAttrs(linkElement, options.attrs);
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function attachTagAttrs(element, attrs) {
		Object.keys(attrs).forEach(function (key) {
			element.setAttribute(key, attrs[key]);
		});
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement, options);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
		*/
		var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

		if (options.convertToAbsoluteUrls || autoFixUrls){
			css = fixUrls(css);
		}

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 116 */
/***/ (function(module, exports) {

	
	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */

	module.exports = function (css) {
	  // get current location
	  var location = typeof window !== "undefined" && window.location;

	  if (!location) {
	    throw new Error("fixUrls requires window.location");
	  }

		// blank or null?
		if (!css || typeof css !== "string") {
		  return css;
	  }

	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

		// convert each url(...)
		var fixedCss = css.replace(/url *\( *(.+?) *\)/g, function(fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl
				.replace(/^"(.*)"$/, function(o, $1){ return $1; })
				.replace(/^'(.*)'$/, function(o, $1){ return $1; });

			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			  return fullMatch;
			}

			// convert the url to a full url
			var newUrl;

			if (unquotedOrigUrl.indexOf("//") === 0) {
			  	//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}

			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});

		// send back the fixed css
		return fixedCss;
	};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ponyfill = __webpack_require__(118);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var root; /* global window */


	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (true) {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(122)(module)))

/***/ }),
/* 118 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 120 */
/***/ (function(module, exports) {

	/*eslint-env browser*/

	var clientOverlay = document.createElement('div');
	clientOverlay.style.display = 'none';
	clientOverlay.style.background = '#fdd';
	clientOverlay.style.color = '#000';
	clientOverlay.style.position = 'fixed';
	clientOverlay.style.zIndex = 9999;
	clientOverlay.style.left = 0;
	clientOverlay.style.right = 0;
	clientOverlay.style.top = 0;
	clientOverlay.style.bottom = 0;
	clientOverlay.style.overflow = 'auto';

	if (document.body) {
	  document.body.appendChild(clientOverlay);
	}

	exports.showProblems =
	function showProblems(lines) {
	  clientOverlay.innerHTML = '';
	  clientOverlay.style.display = 'block';
	  lines.forEach(function(msg) {
	    console.warn("[HMR] " + msg);
	    var pre = document.createElement('pre');
	    pre.textContent = msg;
	    clientOverlay.appendChild(pre);
	  });
	};

	exports.clear =
	function clear() {
	  clientOverlay.innerHTML = '';
	  clientOverlay.style.display = 'none';
	};



/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Based heavily on https://github.com/webpack/webpack/blob/
	 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
	 * Original copyright Tobias Koppers @sokra (MIT license)
	 */

	/* global window __webpack_hash__ */

	if (false) {
	  throw new Error("[HMR] Hot Module Replacement is disabled.");
	}

	var lastHash;
	var failureStatuses = { abort: 1, fail: 1 };
	var applyOptions = { ignoreUnaccepted: true };

	function upToDate(hash) {
	  if (hash) lastHash = hash;
	  return lastHash == __webpack_require__.h();
	}

	module.exports = function(hash, moduleMap, reload) {
	  if (!upToDate(hash) && module.hot.status() == "idle") {
	    console.log("[HMR] Checking for updates on the server...");
	    check();
	  }

	  function check() {
	    module.hot.check(function(err, updatedModules) {
	      if (err) return handleError(err);

	      if(!updatedModules) {
	        console.warn("[HMR] Cannot find update (Full reload needed)");
	        console.warn("[HMR] (Probably because of restarting the server)");
	        performReload();
	        return null;
	      }

	      module.hot.apply(applyOptions, function(applyErr, renewedModules) {
	        if (applyErr) return handleError(applyErr);

	        if (!upToDate()) check();

	        logUpdates(updatedModules, renewedModules);
	      });
	    });
	  }

	  function logUpdates(updatedModules, renewedModules) {
	    var unacceptedModules = updatedModules.filter(function(moduleId) {
	      return renewedModules && renewedModules.indexOf(moduleId) < 0;
	    });

	    if(unacceptedModules.length > 0) {
	      console.warn(
	        "[HMR] The following modules couldn't be hot updated: " +
	        "(Full reload needed)"
	      );
	      unacceptedModules.forEach(function(moduleId) {
	        console.warn("[HMR]  - " + moduleMap[moduleId]);
	      });
	      performReload();
	      return;
	    }

	    if(!renewedModules || renewedModules.length === 0) {
	      console.log("[HMR] Nothing hot updated.");
	    } else {
	      console.log("[HMR] Updated modules:");
	      renewedModules.forEach(function(moduleId) {
	        console.log("[HMR]  - " + moduleMap[moduleId]);
	      });
	    }

	    if (upToDate()) {
	      console.log("[HMR] App is up to date.");
	    }
	  }

	  function handleError(err) {
	    if (module.hot.status() in failureStatuses) {
	      console.warn("[HMR] Cannot check for update (Full reload needed)");
	      console.warn("[HMR] " + err.stack || err.message);
	      performReload();
	      return;
	    }
	    console.warn("[HMR] Update check failed: " + err.stack || err.message);
	  }

	  function performReload() {
	    console.warn("[HMR] Reloading page");
	    if (reload) window.location.reload();
	  }
	};


/***/ }),
/* 122 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(115)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(15, function() {
				var newContent = __webpack_require__(15);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*eslint-env browser*/
	/*global __resourceQuery*/

	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false
	};
	if (true) {
	  var pathMatch = /path=(.*?)(\&|$)/.exec(__resourceQuery);
	  if (pathMatch) {
	    options.path = pathMatch[1];
	  }
	  var timeoutMatch = /timeout=(.*?)(\&|$)/.exec(__resourceQuery);
	  if (timeoutMatch) {
	    options.timeout = parseFloat(timeoutMatch[1]);
	  }
	  var overlayMatch = /overlay=(.*?)(\&|$)/.exec(__resourceQuery);
	  if (overlayMatch) {
	    options.overlay = overlayMatch[1] !== 'false';
	  }
	  var reloadMatch = /reload=(.*?)(\&|$)/.exec(__resourceQuery);
	  if (reloadMatch) {
	    options.reload = reloadMatch[1] !== 'false';
	  }
	}

	connect();

	function connect() {
	  var source = new window.EventSource(options.path);
	  var lastActivity = new Date();

	  source.onopen = handleOnline;
	  source.onmessage = handleMessage;
	  source.onerror = handleDisconnect;

	  var timer = setInterval(function() {
	    if ((new Date() - lastActivity) > options.timeout) {
	      handleDisconnect();
	    }
	  }, options.timeout / 2);

	  function handleOnline() {
	    console.log("[HMR] connected");
	    lastActivity = new Date();
	  }

	  function handleMessage(event) {
	    lastActivity = new Date();
	    if (event.data == "\uD83D\uDC93") {
	      return;
	    }
	    try {
	      processMessage(JSON.parse(event.data));
	    } catch (ex) {
	      console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	    }
	  }

	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(connect, options.timeout);
	  }

	}

	var strip = __webpack_require__(114);

	var overlay;
	if (options.overlay) {
	  overlay = __webpack_require__(120);
	}

	function problems(type, obj) {
	  console.warn("[HMR] bundle has " + type + ":");
	  var list = [];
	  obj[type].forEach(function(msg) {
	    var clean = strip(msg);
	    console.warn("[HMR] " + clean);
	    list.push(clean);
	  });
	  if (overlay && type !== 'warnings') overlay.showProblems(list);
	}

	function success() {
	  if (overlay) overlay.clear();
	}

	var processUpdate = __webpack_require__(121);

	function processMessage(obj) {
	  if (obj.action == "building") {
	    console.log("[HMR] bundle rebuilding");
	  } else if (obj.action == "built") {
	    console.log("[HMR] bundle rebuilt in " + obj.time + "ms");
	    if (obj.errors.length > 0) {
	      problems('errors', obj);
	    } else {
	      if (obj.warnings.length > 0) {
	        problems('warnings', obj);
	      } else {
	        success();
	      }
	      
	      processUpdate(obj.hash, obj.modules, options.reload);
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, "?reload=true"))

/***/ })
/******/ ]);