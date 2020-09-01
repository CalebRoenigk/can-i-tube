// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"g5IB":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
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
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
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

  while (len) {
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
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
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

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"HlZQ":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
var define;
/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.5.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( _i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.5
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2020-03-14
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
					dataPriv.get( this, "events" ) || Object.create( null )
				)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px";
				tr.style.height = "1px";
				trChild.style.height = "9px";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = parseInt( trStyle.height ) > 3;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = (
					dataPriv.get( cur, "events" ) || Object.create( null )
				)[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script
			if ( !isSuccess && jQuery.inArray( "script", s.dataTypes ) > -1 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			if ( typeof props.top === "number" ) {
				props.top += "px";
			}
			if ( typeof props.left === "number" ) {
				props.left += "px";
			}
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{"process":"g5IB"}],"iROh":[function(require,module,exports) {
var define;
var global = arguments[3];
//! moment.js
//! version : 2.27.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return (
            input instanceof Array ||
            Object.prototype.toString.call(input) === '[object Array]'
        );
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return (
            input != null &&
            Object.prototype.toString.call(input) === '[object Object]'
        );
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
        } else {
            var k;
            for (k in obj) {
                if (hasOwnProp(obj, k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return (
            typeof input === 'number' ||
            Object.prototype.toString.call(input) === '[object Number]'
        );
    }

    function isDate(input) {
        return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === '[object Date]'
        );
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false,
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this),
                len = t.length >>> 0,
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m),
                parsedParts = some.call(flags.parsedDateParts, function (i) {
                    return i != null;
                }),
                isNowValid =
                    !isNaN(m._d.getTime()) &&
                    flags.overflow < 0 &&
                    !flags.empty &&
                    !flags.invalidEra &&
                    !flags.invalidMonth &&
                    !flags.invalidWeekday &&
                    !flags.weekdayMismatch &&
                    !flags.nullInput &&
                    !flags.invalidFormat &&
                    !flags.userInvalidated &&
                    (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid =
                    isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = (hooks.momentProperties = []),
        updateInProgress = false;

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return (
            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
        );
    }

    function warn(msg) {
        if (
            hooks.suppressDeprecationWarnings === false &&
            typeof console !== 'undefined' &&
            console.warn
        ) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [],
                    arg,
                    i,
                    key;
                for (i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (key in arguments[0]) {
                            if (hasOwnProp(arguments[0], key)) {
                                arg += key + ': ' + arguments[0][key] + ', ';
                            }
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(
                    msg +
                        '\nArguments: ' +
                        Array.prototype.slice.call(args).join('') +
                        '\n' +
                        new Error().stack
                );
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return (
            (typeof Function !== 'undefined' && input instanceof Function) ||
            Object.prototype.toString.call(input) === '[object Function]'
        );
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            if (hasOwnProp(config, i)) {
                prop = config[i];
                if (isFunction(prop)) {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' +
                /\d{1,2}/.source
        );
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (
                hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])
            ) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (
            (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
            absNumber
        );
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        formatFunctions = {},
        formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(
                    func.apply(this, arguments),
                    token
                );
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i])
                    ? array[i].call(mom, format)
                    : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] =
            formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(
                localFormattingTokens,
                replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper
            .match(formattingTokens)
            .map(function (tok) {
                if (
                    tok === 'MMMM' ||
                    tok === 'MM' ||
                    tok === 'DD' ||
                    tok === 'dddd'
                ) {
                    return tok.slice(1);
                }
                return tok;
            })
            .join('');

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d',
        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        w: 'a week',
        ww: '%d weeks',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output)
            ? output(number, withoutSuffix, string, isFuture)
            : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string'
            ? aliases[units] || aliases[units.toLowerCase()]
            : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [],
            u;
        for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
                units.push({ unit: u, priority: priorities[u] });
            }
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid()
            ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
            : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (
                unit === 'FullYear' &&
                isLeapYear(mom.year()) &&
                mom.month() === 1 &&
                mom.date() === 29
            ) {
                value = toInt(value);
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                    value,
                    mom.month(),
                    daysInMonth(value, mom.month())
                );
            } else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units),
                i;
            for (i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    var match1 = /\d/, //       0 - 9
        match2 = /\d\d/, //      00 - 99
        match3 = /\d{3}/, //     000 - 999
        match4 = /\d{4}/, //    0000 - 9999
        match6 = /[+-]?\d{6}/, // -999999 - 999999
        match1to2 = /\d\d?/, //       0 - 99
        match3to4 = /\d\d\d\d?/, //     999 - 9999
        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
        match1to3 = /\d{1,3}/, //       0 - 999
        match1to4 = /\d{1,4}/, //       0 - 9999
        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
        matchUnsigned = /\d+/, //       0 - inf
        matchSigned = /[+-]?\d+/, //    -inf - inf
        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        // any word (or two) characters or numbers including two/three word month in arabic.
        // includes scottish gaelic two word and hyphenated months
        matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        regexes;

    regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex)
            ? regex
            : function (isStrict, localeData) {
                  return isStrict && strictRegex ? strictRegex : regex;
              };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(
            s
                .replace('\\', '')
                .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                    matched,
                    p1,
                    p2,
                    p3,
                    p4
                ) {
                    return p1 || p2 || p3 || p4;
                })
        );
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        WEEK = 7,
        WEEKDAY = 8;

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1
            ? isLeapYear(year)
                ? 29
                : 28
            : 31 - ((modMonth % 7) % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
        ),
        defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
            '_'
        ),
        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        defaultMonthsShortRegex = matchWord,
        defaultMonthsRegex = matchWord;

    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months)
                ? this._months
                : this._months['standalone'];
        }
        return isArray(this._months)
            ? this._months[m.month()]
            : this._months[
                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                      ? 'format'
                      : 'standalone'
              ][m.month()];
    }

    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort)
            ? this._monthsShort[m.month()]
            : this._monthsShort[
                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
              ][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp(
                    '^' + this.months(mom, '').replace('.', '') + '$',
                    'i'
                );
                this._shortMonthsParse[i] = new RegExp(
                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                    'i'
                );
            }
            if (!strict && !this._monthsParse[i]) {
                regex =
                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'MMMM' &&
                this._longMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'MMM' &&
                this._shortMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
        }
    }

    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._monthsShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] =
            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear,
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear,
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
            '_'
        ),
        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        defaultWeekdaysRegex = matchWord,
        defaultWeekdaysShortRegex = matchWord,
        defaultWeekdaysMinRegex = matchWord;

    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays)
            ? this._weekdays
            : this._weekdays[
                  m && m !== true && this._weekdays.isFormat.test(format)
                      ? 'format'
                      : 'standalone'
              ];
        return m === true
            ? shiftWeekdays(weekdays, this._week.dow)
            : m
            ? weekdays[m.day()]
            : weekdays;
    }

    function localeWeekdaysShort(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort[m.day()]
            : this._weekdaysShort;
    }

    function localeWeekdaysMin(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin[m.day()]
            : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._shortWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._minWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
            }
            if (!this._weekdaysParse[i]) {
                regex =
                    '^' +
                    this.weekdays(mom, '') +
                    '|^' +
                    this.weekdaysShort(mom, '') +
                    '|^' +
                    this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'dddd' &&
                this._fullWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'ddd' &&
                this._shortWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'dd' &&
                this._minWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
        }
    }

    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
        }
    }

    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ''));
            shortp = regexEscape(this.weekdaysShort(mom, ''));
            longp = regexEscape(this.weekdays(mom, ''));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._weekdaysShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
        this._weekdaysMinStrictRegex = new RegExp(
            '^(' + minPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return (
            '' +
            hFormat.apply(this) +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return (
            '' +
            this.hours() +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                lowercase
            );
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
        // Setting the hour should keep the time, because the user explicitly
        // specified which hour they want. So trying to maintain the same hour (in
        // a new timezone) makes sense. Adding/subtracting hours does not follow
        // this rule.
        getSetHour = makeGetSet('Hours', true);

    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse,
    };

    // internal storage for locale config files
    var locales = {},
        localeFamilies = {},
        globalLocale;

    function commonPrefix(arr1, arr2) {
        var i,
            minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return i;
            }
        }
        return minl;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (
                    next &&
                    next.length >= j &&
                    commonPrefix(split, next) >= j - 1
                ) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null,
            aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (
            locales[name] === undefined &&
            typeof module !== 'undefined' &&
            module &&
            module.exports
        ) {
            try {
                oldLocale = globalLocale._abbr;
                aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {
                // mark as not found to avoid repeating expensive file require call causing high CPU
                // when trying to find en-US, en_US, en-us for every format call
                locales[name] = null; // null means not found
            }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            } else {
                if (typeof console !== 'undefined' && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn(
                        'Locale ' + key + ' not found. Did you forget to load it?'
                    );
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var locale,
                parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple(
                    'defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                );
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config,
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                tmpLocale,
                parentConfig = baseConfig;

            if (locales[name] != null && locales[name].parentLocale != null) {
                // Update existing child locale in-place to avoid memory-leaks
                locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) {
                    parentConfig = tmpLocale._config;
                }
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) {
                    // updateLocale is called for creating a new locale
                    // Set abbr so it will have a name (getters return
                    // undefined otherwise).
                    config.abbr = name;
                }
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                    if (name === getSetGlobalLocale()) {
                        getSetGlobalLocale(name);
                    }
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow,
            a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH] < 0 || a[MONTH] > 11
                    ? MONTH
                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                    ? DATE
                    : a[HOUR] < 0 ||
                      a[HOUR] > 24 ||
                      (a[HOUR] === 24 &&
                          (a[MINUTE] !== 0 ||
                              a[SECOND] !== 0 ||
                              a[MILLISECOND] !== 0))
                    ? HOUR
                    : a[MINUTE] < 0 || a[MINUTE] > 59
                    ? MINUTE
                    : a[SECOND] < 0 || a[SECOND] > 59
                    ? SECOND
                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                    ? MILLISECOND
                    : -1;

            if (
                getParsingFlags(m)._overflowDayOfYear &&
                (overflow < YEAR || overflow > DATE)
            ) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
            ['YYYY-DDD', /\d{4}-\d{3}/],
            ['YYYY-MM', /\d{4}-\d\d/, false],
            ['YYYYYYMMDD', /[+-]\d{10}/],
            ['YYYYMMDD', /\d{8}/],
            ['GGGG[W]WWE', /\d{4}W\d{3}/],
            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
            ['YYYYDDD', /\d{7}/],
            ['YYYYMM', /\d{6}/, false],
            ['YYYY', /\d{4}/, false],
        ],
        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
            ['HH:mm', /\d\d:\d\d/],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
            ['HHmmss', /\d\d\d\d\d\d/],
            ['HHmm', /\d\d\d\d/],
            ['HH', /\d\d/],
        ],
        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
        rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
        };

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    function extractFromRFC2822Strings(
        yearStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr
    ) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10),
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s
            .replace(/\([^)]*\)|[\n\t]/g, ' ')
            .replace(/(\s\s+)/g, ' ')
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(
                    parsedInput[0],
                    parsedInput[1],
                    parsedInput[2]
                ).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10),
                m = hm % 100,
                h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)),
            parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(
                match[4],
                match[3],
                match[2],
                match[5],
                match[6],
                match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        if (config._strict) {
            config._isValid = false;
        } else {
            // Final attempt, use Input Fallback
            hooks.createFromInputFallback(config);
        }
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
            'discouraged and will be removed in an upcoming major release. Please refer to ' +
            'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [
                nowValue.getUTCFullYear(),
                nowValue.getUTCMonth(),
                nowValue.getUTCDate(),
            ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            expectedWeekday,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (
                config._dayOfYear > daysInYear(yearToUse) ||
                config._dayOfYear === 0
            ) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] =
                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (
            config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0
        ) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
        );
        expectedWeekday = config._useUTC
            ? config._d.getUTCDay()
            : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (
            config._w &&
            typeof config._w.d !== 'undefined' &&
            config._w.d !== expectedWeekday
        ) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(
                w.GG,
                config._a[YEAR],
                weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0,
            era;

        tokens =
            expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(
                    string.indexOf(parsedInput) + parsedInput.length
                );
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver =
            stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (
            config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0
        ) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
        );

        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,
            scoreToBeat,
            i,
            currentScore,
            validFormatFound,
            bestFormatIsValid = false;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (isValid(tempConfig)) {
                validFormatFound = true;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (!bestFormatIsValid) {
                if (
                    scoreToBeat == null ||
                    currentScore < scoreToBeat ||
                    validFormatFound
                ) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) {
                        bestFormatIsValid = true;
                    }
                }
            } else {
                if (currentScore < scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                }
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i),
            dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function (obj) {
                return obj && parseInt(obj, 10);
            }
        );

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (
            (isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)
        ) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other < this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        ),
        prototypeMax = deprecate(
            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other > this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];

    function isDurationValid(m) {
        var key,
            unitHasDecimal = false,
            i;
        for (key in m) {
            if (
                hasOwnProp(m, key) &&
                !(
                    indexOf.call(ordering, key) !== -1 &&
                    (m[key] == null || !isNaN(m[key]))
                )
            ) {
                return false;
            }
        }

        for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds =
            +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (
                (dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
            ) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(),
                sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return (
                sign +
                zeroFill(~~(offset / 60), 2) +
                separator +
                zeroFill(~~offset % 60, 2)
            );
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher),
            chunk,
            parts,
            minutes;

        if (matches === null) {
            return null;
        }

        chunk = matches[matches.length - 1] || [];
        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff =
                (isMoment(input) || isDate(input)
                    ? input.valueOf()
                    : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(
                        this,
                        createDuration(input - offset, 'm'),
                        1,
                        false
                    );
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {},
            other;

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted =
                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        // and further modified to allow for strings containing both week and day
        isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months,
            };
        } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
                duration[key] = +input;
            } else {
                duration.milliseconds = +input;
            }
        } else if ((match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
            };
        } else if ((match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign),
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (
            typeof duration === 'object' &&
            ('from' in duration || 'to' in duration)
        ) {
            diffRes = momentsDifference(
                createLocal(duration.from),
                createLocal(duration.to)
            );

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
            ret._isValid = input._isValid;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months =
            other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(
                    name,
                    'moment().' +
                        name +
                        '(period, number) is deprecated. Please use moment().' +
                        name +
                        '(number, period). ' +
                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                );
                tmp = val;
                val = period;
                period = tmp;
            }

            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add'),
        subtract = createAdder(-1, 'subtract');

    function isString(input) {
        return typeof input === 'string' || input instanceof String;
    }

    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return (
            isMoment(input) ||
            isDate(input) ||
            isString(input) ||
            isNumber(input) ||
            isNumberOrStringArray(input) ||
            isMomentInputObject(input) ||
            input === null ||
            input === undefined
        );
    }

    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'years',
                'year',
                'y',
                'months',
                'month',
                'M',
                'days',
                'day',
                'd',
                'dates',
                'date',
                'D',
                'hours',
                'hour',
                'h',
                'minutes',
                'minute',
                'm',
                'seconds',
                'second',
                's',
                'milliseconds',
                'millisecond',
                'ms',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input),
            dataTypeTest = false;
        if (arrayTest) {
            dataTypeTest =
                input.filter(function (item) {
                    return !isNumber(item) && isString(input);
                }).length === 0;
        }
        return arrayTest && dataTypeTest;
    }

    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'sameDay',
                'nextDay',
                'lastDay',
                'nextWeek',
                'lastWeek',
                'sameElse',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6
            ? 'sameElse'
            : diff < -1
            ? 'lastWeek'
            : diff < 0
            ? 'lastDay'
            : diff < 1
            ? 'sameDay'
            : diff < 2
            ? 'nextDay'
            : diff < 7
            ? 'nextWeek'
            : 'sameElse';
    }

    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse',
            output =
                formats &&
                (isFunction(formats[format])
                    ? formats[format].call(this, now)
                    : formats[format]);

        return this.format(
            output || this.localeData().calendar(format, this, createLocal(now))
        );
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (
            (inclusivity[0] === '('
                ? this.isAfter(localFrom, units)
                : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')'
                ? this.isBefore(localTo, units)
                : !this.isAfter(localTo, units))
        );
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return (
                this.clone().startOf(units).valueOf() <= inputMs &&
                inputMs <= this.clone().endOf(units).valueOf()
            );
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1e3;
                break; // 1000
            case 'minute':
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        if (a.date() < b.date()) {
            // end-of-month calculations work correct when the start month has more
            // days than the end month.
            return -monthDiff(b, a);
        }
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true,
            m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
                m,
                utc
                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                    .toISOString()
                    .replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(
            m,
            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
        );
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment',
            zone = '',
            prefix,
            year,
            datetime,
            suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        prefix = '[' + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        datetime = '-MM-DD[T]HH:mm:ss.SSS';
        suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ to: this, from: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ from: this, to: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData() {
        return this._locale;
    }

    var MS_PER_SECOND = 1000,
        MS_PER_MINUTE = 60 * MS_PER_SECOND,
        MS_PER_HOUR = 60 * MS_PER_MINUTE,
        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return ((dividend % divisor) + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(
                    this.year(),
                    this.month() - (this.month() % 3),
                    1
                );
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday()
                );
                break;
            case 'isoWeek':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1)
                );
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(
                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                    MS_PER_HOUR
                );
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time =
                    startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3) + 3,
                        1
                    ) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday() + 7
                    ) - 1;
                break;
            case 'isoWeek':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1) + 7
                    ) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time +=
                    MS_PER_HOUR -
                    mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    ) -
                    1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(),
        ];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds(),
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
        };
    }

    addFormatToken('N', 0, 0, 'eraAbbr');
    addFormatToken('NN', 0, 0, 'eraAbbr');
    addFormatToken('NNN', 0, 0, 'eraAbbr');
    addFormatToken('NNNN', 0, 0, 'eraName');
    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
    addFormatToken('y', ['yy', 2], 0, 'eraYear');
    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

    addRegexToken('N', matchEraAbbr);
    addRegexToken('NN', matchEraAbbr);
    addRegexToken('NNN', matchEraAbbr);
    addRegexToken('NNNN', matchEraName);
    addRegexToken('NNNNN', matchEraNarrow);

    addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
        input,
        array,
        config,
        token
    ) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) {
            getParsingFlags(config).era = era;
        } else {
            getParsingFlags(config).invalidEra = input;
        }
    });

    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);

    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
    addParseToken(['yo'], function (input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
        }

        if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
            array[YEAR] = parseInt(input, 10);
        }
    });

    function localeEras(m, format) {
        var i,
            l,
            date,
            eras = this._eras || getLocale('en')._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }

            switch (typeof eras[i].until) {
                case 'undefined':
                    eras[i].until = +Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }

    function localeErasParse(eraName, format, strict) {
        var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
        eraName = eraName.toUpperCase();

        for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();

            if (strict) {
                switch (format) {
                    case 'N':
                    case 'NN':
                    case 'NNN':
                        if (abbr === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNN':
                        if (name === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNNN':
                        if (narrow === eraName) {
                            return eras[i];
                        }
                        break;
                }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
            }
        }
    }

    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? +1 : -1;
        if (year === undefined) {
            return hooks(era.since).year();
        } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
        }
    }

    function getEraName() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
            }
        }

        return '';
    }

    function getEraNarrow() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
            }
        }

        return '';
    }

    function getEraAbbr() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
            }
        }

        return '';
    }

    function getEraYear() {
        var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;

            // truncate time
            val = this.startOf('day').valueOf();

            if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
            ) {
                return (
                    (this.year() - hooks(eras[i].since).year()) * dir +
                    eras[i].offset
                );
            }
        }

        return this.year();
    }

    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }

    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }

    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }

    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }

    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }

    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }

    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }

    function computeErasParse() {
        var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();

        for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));

            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }

        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp(
            '^(' + narrowPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
        );
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
        );
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear =
            Math.round(
                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
            ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token, getSetMillisecond;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }

    getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
            return 'Moment<' + this.format() + '>';
        };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
        'dates accessor is deprecated. Use date instead.',
        getSetDayOfMonth
    );
    proto.months = deprecate(
        'months accessor is deprecated. Use month instead',
        getSetMonth
    );
    proto.years = deprecate(
        'years accessor is deprecated. Use year instead',
        getSetYear
    );
    proto.zone = deprecate(
        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
        getSetZone
    );
    proto.isDSTShifted = deprecate(
        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
        isDaylightSavingTimeShifted
    );

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;

    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale(),
            utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i,
            out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: +Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
            },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    toInt((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                        ? 'st'
                        : b === 2
                        ? 'nd'
                        : b === 3
                        ? 'rd'
                        : 'th';
            return number + output;
        },
    });

    // Side effect imports

    hooks.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        getSetGlobalLocale
    );
    hooks.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        getLocale
    );

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (
            !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
            )
        ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return (days * 4800) / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return (months * 146097) / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days,
            months,
            milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms'),
        asSeconds = makeAs('s'),
        asMinutes = makeAs('m'),
        asHours = makeAs('h'),
        asDays = makeAs('d'),
        asWeeks = makeAs('w'),
        asMonths = makeAs('M'),
        asQuarters = makeAs('Q'),
        asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds'),
        seconds = makeGetter('seconds'),
        minutes = makeGetter('minutes'),
        hours = makeGetter('hours'),
        days = makeGetter('days'),
        months = makeGetter('months'),
        years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round,
        thresholds = {
            ss: 44, // a few seconds to seconds
            s: 45, // seconds to minute
            m: 45, // minutes to hour
            h: 22, // hours to day
            d: 26, // days to month/week
            w: null, // weeks to month
            M: 11, // months to year
        };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            weeks = round(duration.as('w')),
            years = round(duration.as('y')),
            a =
                (seconds <= thresholds.ss && ['s', seconds]) ||
                (seconds < thresholds.s && ['ss', seconds]) ||
                (minutes <= 1 && ['m']) ||
                (minutes < thresholds.m && ['mm', minutes]) ||
                (hours <= 1 && ['h']) ||
                (hours < thresholds.h && ['hh', hours]) ||
                (days <= 1 && ['d']) ||
                (days < thresholds.d && ['dd', days]);

        if (thresholds.w != null) {
            a =
                a ||
                (weeks <= 1 && ['w']) ||
                (weeks < thresholds.w && ['ww', weeks]);
        }
        a = a ||
            (months <= 1 && ['M']) ||
            (months < thresholds.M && ['MM', months]) ||
            (years <= 1 && ['y']) || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var withSuffix = false,
            th = thresholds,
            locale,
            output;

        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') {
            withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === 'object') {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
            }
        }

        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

        totalSign = total < 0 ? '-' : '';
        ymSign = sign(this._months) !== sign(total) ? '-' : '';
        daysSign = sign(this._days) !== sign(total) ? '-' : '';
        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return (
            totalSign +
            'P' +
            (years ? ymSign + years + 'Y' : '') +
            (months ? ymSign + months + 'M' : '') +
            (days ? daysSign + days + 'D' : '') +
            (hours || minutes || seconds ? 'T' : '') +
            (hours ? hmsSign + hours + 'H' : '') +
            (minutes ? hmsSign + minutes + 'M' : '') +
            (seconds ? hmsSign + s + 'S' : '')
        );
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    proto$2.toIsoString = deprecate(
        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
        toISOString$1
    );
    proto$2.lang = lang;

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    //! moment.js

    hooks.version = '2.27.0';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD', // <input type="date" />
        TIME: 'HH:mm', // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW', // <input type="week" />
        MONTH: 'YYYY-MM', // <input type="month" />
    };

    return hooks;

})));

},{}],"FCJt":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

module.exports = objectTypes;

},{}],"e1kN":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = require('lodash._objecttypes');

/**
 * Checks if `value` is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

module.exports = isObject;

},{"lodash._objecttypes":"FCJt"}],"xFRP":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);

module.exports = reNative;

},{}],"KOa5":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = require('lodash._objecttypes');

/** Used for native method references */
var objectProto = Object.prototype;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which produces an array of the
 * given object's own enumerable property names.
 *
 * @private
 * @type Function
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 */
var shimKeys = function(object) {
  var index, iterable = object, result = [];
  if (!iterable) return result;
  if (!(objectTypes[typeof object])) return result;
    for (index in iterable) {
      if (hasOwnProperty.call(iterable, index)) {
        result.push(index);
      }
    }
  return result
};

module.exports = shimKeys;

},{"lodash._objecttypes":"FCJt"}],"LvIh":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isObject = require('lodash.isobject'),
    reNative = require('lodash._renative'),
    shimKeys = require('lodash._shimkeys');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array composed of the own enumerable property names of an object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 * @example
 *
 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (!isObject(object)) {
    return [];
  }
  return nativeKeys(object);
};

module.exports = keys;

},{"lodash.isobject":"e1kN","lodash._renative":"xFRP","lodash._shimkeys":"KOa5"}],"Ae5J":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A no-operation function.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.noop(object) === undefined;
 * // => true
 */
function noop() {
  // no operation performed
}

module.exports = noop;

},{}],"g5yM":[function(require,module,exports) {
var global = arguments[3];
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isObject = require('lodash.isobject'),
    noop = require('lodash.noop'),
    reNative = require('lodash._renative');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeCreate = reNative.test(nativeCreate = Object.create) && nativeCreate;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(prototype, properties) {
  return isObject(prototype) ? nativeCreate(prototype) : {};
}
// fallback for browsers without `Object.create`
if (!nativeCreate) {
  baseCreate = (function() {
    function Object() {}
    return function(prototype) {
      if (isObject(prototype)) {
        Object.prototype = prototype;
        var result = new Object;
        Object.prototype = null;
      }
      return result || global.Object();
    };
  }());
}

module.exports = baseCreate;

},{"lodash.isobject":"e1kN","lodash.noop":"Ae5J","lodash._renative":"xFRP"}],"aPlf":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var noop = require('lodash.noop'),
    reNative = require('lodash._renative');

/** Used as the property descriptor for `__bindData__` */
var descriptor = {
  'configurable': false,
  'enumerable': false,
  'value': null,
  'writable': false
};

/** Used to set meta data on functions */
var defineProperty = (function() {
  // IE 8 only accepts DOM elements
  try {
    var o = {},
        func = reNative.test(func = Object.defineProperty) && func,
        result = func(o, o, o) && func;
  } catch(e) { }
  return result;
}());

/**
 * Sets `this` binding data on a given function.
 *
 * @private
 * @param {Function} func The function to set data on.
 * @param {Array} value The data array to set.
 */
var setBindData = !defineProperty ? noop : function(func, value) {
  descriptor.value = value;
  defineProperty(func, '__bindData__', descriptor);
};

module.exports = setBindData;

},{"lodash.noop":"Ae5J","lodash._renative":"xFRP"}],"HCZV":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = require('lodash._basecreate'),
    isObject = require('lodash.isobject'),
    setBindData = require('lodash._setbinddata');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * The base implementation of `_.bind` that creates the bound function and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new bound function.
 */
function baseBind(bindData) {
  var func = bindData[0],
      partialArgs = bindData[2],
      thisArg = bindData[4];

  function bound() {
    // `Function#bind` spec
    // http://es5.github.io/#x15.3.4.5
    if (partialArgs) {
      var args = partialArgs.slice();
      push.apply(args, arguments);
    }
    // mimic the constructor's `return` behavior
    // http://es5.github.io/#x13.2.2
    if (this instanceof bound) {
      // ensure `new bound` is an instance of `func`
      var thisBinding = baseCreate(func.prototype),
          result = func.apply(thisBinding, args || arguments);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisArg, args || arguments);
  }
  setBindData(bound, bindData);
  return bound;
}

module.exports = baseBind;

},{"lodash._basecreate":"g5yM","lodash.isobject":"e1kN","lodash._setbinddata":"aPlf"}],"kl0L":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Slices the `collection` from the `start` index up to, but not including,
 * the `end` index.
 *
 * Note: This function is used instead of `Array#slice` to support node lists
 * in IE < 9 and to ensure dense arrays are returned.
 *
 * @private
 * @param {Array|Object|string} collection The collection to slice.
 * @param {number} start The start index.
 * @param {number} end The end index.
 * @returns {Array} Returns the new array.
 */
function slice(array, start, end) {
  start || (start = 0);
  if (typeof end == 'undefined') {
    end = array ? array.length : 0;
  }
  var index = -1,
      length = end - start || 0,
      result = Array(length < 0 ? 0 : length);

  while (++index < length) {
    result[index] = array[start + index];
  }
  return result;
}

module.exports = slice;

},{}],"dgEA":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = require('lodash._basecreate'),
    isObject = require('lodash.isobject'),
    setBindData = require('lodash._setbinddata'),
    slice = require('lodash._slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * The base implementation of `createWrapper` that creates the wrapper and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new function.
 */
function baseCreateWrapper(bindData) {
  var func = bindData[0],
      bitmask = bindData[1],
      partialArgs = bindData[2],
      partialRightArgs = bindData[3],
      thisArg = bindData[4],
      arity = bindData[5];

  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      key = func;

  function bound() {
    var thisBinding = isBind ? thisArg : this;
    if (partialArgs) {
      var args = partialArgs.slice();
      push.apply(args, arguments);
    }
    if (partialRightArgs || isCurry) {
      args || (args = slice(arguments));
      if (partialRightArgs) {
        push.apply(args, partialRightArgs);
      }
      if (isCurry && args.length < arity) {
        bitmask |= 16 & ~32;
        return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
      }
    }
    args || (args = arguments);
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (this instanceof bound) {
      thisBinding = baseCreate(func.prototype);
      var result = func.apply(thisBinding, args);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisBinding, args);
  }
  setBindData(bound, bindData);
  return bound;
}

module.exports = baseCreateWrapper;

},{"lodash._basecreate":"g5yM","lodash.isobject":"e1kN","lodash._setbinddata":"aPlf","lodash._slice":"kl0L"}],"YDGf":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is a function.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 */
function isFunction(value) {
  return typeof value == 'function';
}

module.exports = isFunction;

},{}],"kFkX":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseBind = require('lodash._basebind'),
    baseCreateWrapper = require('lodash._basecreatewrapper'),
    isFunction = require('lodash.isfunction');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * Creates a function that, when called, either curries or invokes `func`
 * with an optional `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of method flags to compose.
 *  The bitmask may be composed of the following flags:
 *  1 - `_.bind`
 *  2 - `_.bindKey`
 *  4 - `_.curry`
 *  8 - `_.curry` (bound)
 *  16 - `_.partial`
 *  32 - `_.partialRight`
 * @param {Array} [partialArgs] An array of arguments to prepend to those
 *  provided to the new function.
 * @param {Array} [partialRightArgs] An array of arguments to append to those
 *  provided to the new function.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new function.
 */
function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      isPartial = bitmask & 16,
      isPartialRight = bitmask & 32;

  if (!isBindKey && !isFunction(func)) {
    throw new TypeError;
  }
  if (isPartial && !partialArgs.length) {
    bitmask &= ~16;
    isPartial = partialArgs = false;
  }
  if (isPartialRight && !partialRightArgs.length) {
    bitmask &= ~32;
    isPartialRight = partialRightArgs = false;
  }
  var bindData = func && func.__bindData__;
  if (bindData && bindData !== true) {
    bindData = bindData.slice();

    // set `thisBinding` is not previously bound
    if (isBind && !(bindData[1] & 1)) {
      bindData[4] = thisArg;
    }
    // set if previously bound but not currently (subsequent curried functions)
    if (!isBind && bindData[1] & 1) {
      bitmask |= 8;
    }
    // set curried arity if not yet set
    if (isCurry && !(bindData[1] & 4)) {
      bindData[5] = arity;
    }
    // append partial left arguments
    if (isPartial) {
      push.apply(bindData[2] || (bindData[2] = []), partialArgs);
    }
    // append partial right arguments
    if (isPartialRight) {
      push.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
    }
    // merge flags
    bindData[1] |= bitmask;
    return createWrapper.apply(null, bindData);
  }
  // fast path for `_.bind`
  var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
  return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
}

module.exports = createWrapper;

},{"lodash._basebind":"HCZV","lodash._basecreatewrapper":"dgEA","lodash.isfunction":"YDGf"}],"TxJR":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = require('lodash._createwrapper'),
    reNative = require('lodash._renative'),
    slice = require('lodash._slice');

/**
 * Creates a function that, when called, invokes `func` with the `this`
 * binding of `thisArg` and prepends any additional `bind` arguments to those
 * provided to the bound function.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {...*} [arg] Arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var func = function(greeting) {
 *   return greeting + ' ' + this.name;
 * };
 *
 * func = _.bind(func, { 'name': 'fred' }, 'hi');
 * func();
 * // => 'hi fred'
 */
function bind(func, thisArg) {
  return arguments.length > 2
    ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
    : createWrapper(func, 1, null, null, thisArg);
}

module.exports = bind;

},{"lodash._createwrapper":"kFkX","lodash._renative":"xFRP","lodash._slice":"kl0L"}],"JB8l":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],"PKq7":[function(require,module,exports) {
var global = arguments[3];
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var reNative = require('lodash._renative');

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/**
 * An object used to flag environments features.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

/**
 * Detect if functions can be decompiled by `Function#toString`
 * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
 *
 * @memberOf _.support
 * @type boolean
 */
support.funcDecomp = !reNative.test(global.WinRTError) && reThis.test(function() { return this; });

/**
 * Detect if `Function#name` is supported (all but IE).
 *
 * @memberOf _.support
 * @type boolean
 */
support.funcNames = typeof Function.name == 'string';

module.exports = support;

},{"lodash._renative":"xFRP"}],"r2yT":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var bind = require('lodash.bind'),
    identity = require('lodash.identity'),
    setBindData = require('lodash._setbinddata'),
    support = require('lodash.support');

/** Used to detected named functions */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/** Native method shortcuts */
var fnToString = Function.prototype.toString;

/**
 * The base implementation of `_.createCallback` without support for creating
 * "_.pluck" or "_.where" style callbacks.
 *
 * @private
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns a callback function.
 */
function baseCreateCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  // exit early for no `thisArg` or already bound by `Function#bind`
  if (typeof thisArg == 'undefined' || !('prototype' in func)) {
    return func;
  }
  var bindData = func.__bindData__;
  if (typeof bindData == 'undefined') {
    if (support.funcNames) {
      bindData = !func.name;
    }
    bindData = bindData || !support.funcDecomp;
    if (!bindData) {
      var source = fnToString.call(func);
      if (!support.funcNames) {
        bindData = !reFuncName.test(source);
      }
      if (!bindData) {
        // checks if `func` references the `this` keyword and stores the result
        bindData = reThis.test(source);
        setBindData(func, bindData);
      }
    }
  }
  // exit early if there are no `this` references or `func` is bound
  if (bindData === false || (bindData !== true && bindData[1] & 1)) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 2: return function(a, b) {
      return func.call(thisArg, a, b);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
  }
  return bind(func, thisArg);
}

module.exports = baseCreateCallback;

},{"lodash.bind":"TxJR","lodash.identity":"JB8l","lodash._setbinddata":"aPlf","lodash.support":"PKq7"}],"TKRq":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('lodash._basecreatecallback'),
    keys = require('lodash.keys'),
    objectTypes = require('lodash._objecttypes');

/**
 * Iterates over own enumerable properties of an object, executing the callback
 * for each property. The callback is bound to `thisArg` and invoked with three
 * arguments; (value, key, object). Callbacks may exit iteration early by
 * explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The object to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
 *   console.log(key);
 * });
 * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
 */
var forOwn = function(collection, callback, thisArg) {
  var index, iterable = collection, result = iterable;
  if (!iterable) return result;
  if (!objectTypes[typeof iterable]) return result;
  callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
    var ownIndex = -1,
        ownProps = objectTypes[typeof iterable] && keys(iterable),
        length = ownProps ? ownProps.length : 0;

    while (++ownIndex < length) {
      index = ownProps[ownIndex];
      if (callback(iterable[index], index, collection) === false) return result;
    }
  return result
};

module.exports = forOwn;

},{"lodash._basecreatecallback":"r2yT","lodash.keys":"LvIh","lodash._objecttypes":"FCJt"}],"KHBi":[function(require,module,exports) {
/**
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('lodash._basecreatecallback'),
    forOwn = require('lodash.forown');

/**
 * Iterates over elements of a collection, executing the callback for each
 * element. The callback is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection). Callbacks may exit iteration early by
 * explicitly returning `false`.
 *
 * Note: As with other "Collections" methods, objects with a `length` property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collections
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
 * // => logs each number and returns '1,2,3'
 *
 * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
 * // => logs each number and returns the object (property order is not guaranteed across environments)
 */
function forEach(collection, callback, thisArg) {
  var index = -1,
      length = collection ? collection.length : 0;

  callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
  if (typeof length == 'number') {
    while (++index < length) {
      if (callback(collection[index], index, collection) === false) {
        break;
      }
    }
  } else {
    forOwn(collection, callback);
  }
  return collection;
}

module.exports = forEach;

},{"lodash._basecreatecallback":"r2yT","lodash.forown":"TKRq"}],"pd3d":[function(require,module,exports) {
var metric,
imperial;

metric = {
  mm: {
    name: {
      singular: 'Millimeter',
      plural: 'Millimeters'
    },
    to_anchor: 1/1000
  },
  cm: {
    name: {
      singular: 'Centimeter',
      plural: 'Centimeters'
    },
    to_anchor: 1/100
  },
  m: {
    name: {
      singular: 'Meter',
      plural: 'Meters'
    },
    to_anchor: 1
  },
  km: {
    name: {
      singular: 'Kilometer',
      plural: 'Kilometers'
    },
    to_anchor: 1000
  }
};

imperial = {
  'in': {
    name: {
      singular: 'Inch',
      plural: 'Inches'
    },
    to_anchor: 1/12
  },
  yd: {
    name: {
      singular: 'Yard',
      plural: 'Yards'
    },
    to_anchor: 3
  },
  'ft-us': {
    name: {
      singular: 'US Survey Foot',
      plural: 'US Survey Feet'
    },
    to_anchor: 1.000002
  },
  ft: {
    name: {
      singular: 'Foot',
      plural: 'Feet'
    },
    to_anchor: 1
  },
  mi: {
    name: {
      singular: 'Mile',
      plural: 'Miles'
    },
    to_anchor: 5280
  }
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: 'm',
      ratio: 3.28084
    },
    imperial: {
      unit: 'ft',
      ratio: 1/3.28084
    }
  }
};

},{}],"HOEa":[function(require,module,exports) {
var metric
  , imperial;

metric = {
  mm2: {
    name: {
      singular: 'Square Millimeter'
    , plural: 'Square Millimeters'
    }
  , to_anchor: 1/1000000
  }
, cm2: {
    name: {
      singular: 'Centimeter'
    , plural: 'Centimeters'
    }
  , to_anchor: 1/10000
  }
, m2: {
    name: {
      singular: 'Square Meter'
    , plural: 'Square Meters'
    }
  , to_anchor: 1
  }
, ha: {
    name: {
      singular: 'Hectare'
    , plural: 'Hectares'
    }
  , to_anchor: 10000
  }
, km2: {
    name: {
      singular: 'Square Kilometer'
    , plural: 'Square Kilometers'
    }
  , to_anchor: 1000000
  }
};

imperial = {
  'in2': {
    name: {
      singular: 'Square Inch'
    , plural: 'Square Inches'
    }
  , to_anchor: 1/144
  }
, yd2: {
    name: {
      singular: 'Square Yard'
    , plural: 'Square Yards'  
    }
  , to_anchor: 9
  }
, ft2: {
    name: {
      singular: 'Square Foot'
    , plural: 'Square Feet'
    }
  , to_anchor: 1
  }
, ac: {
    name: {
      singular: 'Acre'
    , plural: 'Acres'
    }
  , to_anchor: 43560
  }
, mi2: {
    name: {
      singular: 'Square Mile'
    , plural: 'Square Miles'
    }
  , to_anchor: 27878400
  }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'm2'
    , ratio: 10.7639
    }
  , imperial: {
      unit: 'ft2'
    , ratio: 1/10.7639
    }
  }
};

},{}],"PLJ8":[function(require,module,exports) {
var metric
  , imperial;

metric = {
  mcg: {
    name: {
      singular: 'Microgram'
    , plural: 'Micrograms'
    }
  , to_anchor: 1/1000000
  }
, mg: {
    name: {
      singular: 'Milligram'
    , plural: 'Milligrams'
    }
  , to_anchor: 1/1000
  }
, g: {
    name: {
      singular: 'Gram'
    , plural: 'Grams'
    }
  , to_anchor: 1
  }
, kg: {
    name: {
      singular: 'Kilogram'
    , plural: 'Kilograms'
    }
  , to_anchor: 1000
}
, mt: {
    name: {
      singular: 'Metric Tonne'
    , plural: 'Metric Tonnes'
    }
  , to_anchor: 1000000
  }
};

imperial = {
  oz: {
    name: {
      singular: 'Ounce'
    , plural: 'Ounces'
    }
  , to_anchor: 1/16
  }
, lb: {
    name: {
      singular: 'Pound'
    , plural: 'Pounds'
    }
  , to_anchor: 1
}, t: {
  name: {
    singular: 'Ton',
    plural: 'Tons',
  },
    to_anchor: 2000,
  },
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'g'
    , ratio: 1/453.592
    }
  , imperial: {
      unit: 'lb'
    , ratio: 453.592
    }
  }
};

},{}],"smp0":[function(require,module,exports) {
var metric
  , imperial;

metric = {
  mm3: {
      name: {
        singular: 'Cubic Millimeter'
      , plural: 'Cubic Millimeters'
      }
    , to_anchor: 1/1000000
  }
, cm3: {
    name: {
      singular: 'Cubic Centimeter'
    , plural: 'Cubic Centimeters'
    }
  , to_anchor: 1/1000
  }
, ml: {
    name: {
      singular: 'Millilitre'
    , plural: 'Millilitres'
    }
  , to_anchor: 1/1000
  }
, cl: {
    name: {
      singular: 'Centilitre'
    , plural: 'Centilitres'
    }
  , to_anchor: 1/100
  }
, dl: {
    name: {
      singular: 'Decilitre'
    , plural: 'Decilitres'
    }
  , to_anchor: 1/10
  }
, l: {
    name: {
      singular: 'Litre'
    , plural: 'Litres'
    }
  , to_anchor: 1
  }
, kl: {
    name: {
      singular: 'Kilolitre'
    , plural: 'Kilolitres'
    }
  , to_anchor: 1000
  }
, m3: {
    name: {
      singular: 'Cubic meter'
    , plural: 'Cubic meters'
    }
  , to_anchor: 1000
  }
, km3: {
    name: {
      singular: 'Cubic kilometer'
    , plural: 'Cubic kilometers'
    }
  , to_anchor: 1000000000000
  }

// Swedish units
, krm: {
  name: {
    singular: 'Matsked'
    , plural: 'Matskedar'
  }
  , to_anchor: 1/1000
}
, tsk: {
    name: {
      singular: 'Tesked'
    , plural: 'Teskedar'
    }
  , to_anchor: 5/1000
  }
, msk: {
    name: {
      singular: 'Matsked'
      , plural: 'Matskedar'
    }
    , to_anchor: 15/1000
  }
, kkp: {
    name: {
      singular: 'Kaffekopp'
      , plural: 'Kaffekoppar'
    }
    , to_anchor: 150/1000
  }
, glas: {
    name: {
      singular: 'Glas'
      , plural: 'Glas'
    }
    , to_anchor: 200/1000
  }
, kanna: {
    name: {
      singular: 'Kanna'
    , plural: 'Kannor'
    }
  , to_anchor: 2.617
  }
};

imperial = {
  tsp: {
    name: {
      singular: 'Teaspoon'
    , plural: 'Teaspoons'
    }
  , to_anchor: 1/6
  }
, Tbs: {
    name: {
      singular: 'Tablespoon'
    , plural: 'Tablespoons'
    }
  , to_anchor: 1/2
  }
, in3: {
    name: {
      singular: 'Cubic inch'
    , plural: 'Cubic inches'
    }
  , to_anchor: 0.55411
  }
, 'fl-oz': {
    name: {
      singular: 'Fluid Ounce'
    , plural: 'Fluid Ounces'
    }
  , to_anchor: 1
  }
, cup: {
    name: {
      singular: 'Cup'
    , plural: 'Cups'
    }
  , to_anchor: 8
  }
, pnt: {
    name: {
      singular: 'Pint'
    , plural: 'Pints'
    }
  , to_anchor: 16
  }
, qt: {
    name: {
      singular: 'Quart'
    , plural: 'Quarts'
    }
  , to_anchor: 32
  }
, gal: {
    name: {
      singular: 'Gallon'
    , plural: 'Gallons'
    }
  , to_anchor: 128
  }
, ft3: {
    name: {
      singular: 'Cubic foot'
    , plural: 'Cubic feet'
    }
  , to_anchor: 957.506
  }
, yd3: {
    name: {
      singular: 'Cubic yard'
    , plural: 'Cubic yards'
    }
  , to_anchor: 25852.7
  }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'l'
    , ratio: 33.8140226
    }
  , imperial: {
      unit: 'fl-oz'
    , ratio: 1/33.8140226
    }
  }
};

},{}],"wQDr":[function(require,module,exports) {
var metric
  , imperial;

metric = {
  ea: {
    name: {
      singular: 'Each'
    , plural: 'Each'
    }
  , to_anchor: 1
  },
  dz: {
    name: {
      singular: 'Dozen'
    , plural: 'Dozens'
    }
  , to_anchor: 12
  }
};

module.exports = {
  metric: metric
, imperial: {}
, _anchors: {
    metric: {
      unit: 'ea'
    , ratio: 1
    }
  }
};

},{}],"ESHn":[function(require,module,exports) {
var metric
  , imperial;

metric = {
  C: {
    name: {
      singular: 'degree Celsius'
    , plural: 'degrees Celsius'
    }
  , to_anchor: 1
  , anchor_shift: 0
  },
  K: {
    name: {
      singular: 'degree Kelvin'
    , plural: 'degrees Kelvin'
    }
  , to_anchor: 1
  , anchor_shift: 273.15
  }
};

imperial = {
  F: {
    name: {
      singular: 'degree Fahrenheit'
    , plural: 'degrees Fahrenheit'
    }
  , to_anchor: 1
  },
  R: {
    name: {
      singular: 'degree Rankine'
    , plural: 'degrees Rankine'
    }
  , to_anchor: 1
  , anchor_shift: 459.67
  }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'C'
    , transform: function (C) { return C / (5/9) + 32 }
    }
  , imperial: {
      unit: 'F'
    , transform: function (F) { return (F - 32) * (5/9) }
    }
  }
};


},{}],"SGR5":[function(require,module,exports) {
var time;
var daysInYear = 365.25;

time = {
  ns: {
    name: {
      singular: 'Nanosecond'
    , plural: 'Nanoseconds'
    }
  , to_anchor: 1/1000000000
  }
, mu: {
    name: {
      singular: 'Microsecond'
    , plural: 'Microseconds'
    }
  , to_anchor: 1/1000000
  }
, ms: {
    name: {
      singular: 'Millisecond'
    , plural: 'Milliseconds'
    }
  , to_anchor: 1/1000
  }
, s: {
    name: {
      singular: 'Second'
    , plural: 'Seconds'
    }
  , to_anchor: 1
  }
, min: {
    name: {
      singular: 'Minute'
    , plural: 'Minutes'
    }
  , to_anchor: 60
  }
, h: {
    name: {
      singular: 'Hour'
    , plural: 'Hours'
    }
  , to_anchor: 60 * 60 
  }
, d: {
    name: {
      singular: 'Day'
    , plural: 'Days'
    }
  , to_anchor: 60 * 60 * 24
  }
, week: {
    name: {
      singular: 'Week'
    , plural: 'Weeks'
    }
  , to_anchor: 60 * 60 * 24 * 7
  }
, month: {
    name: {
      singular: 'Month'
    , plural: 'Months'
    }
  , to_anchor: 60 * 60 * 24 * daysInYear / 12
  }
, year: {
    name: {
      singular: 'Year'
    , plural: 'Years'
    }
  , to_anchor: 60 * 60 * 24 * daysInYear
  }
};


module.exports = {
  metric: time 
, _anchors: {
    metric: {
      unit: 's'
    , ratio: 1
    }
  }
};

},{}],"bxlf":[function(require,module,exports) {
var bits
  , bytes;

bits = {
  b: {
    name: {
      singular: 'Bit'
    , plural: 'Bits'
    }
  , to_anchor: 1
  }
, Kb: {
    name: {
      singular: 'Kilobit'
    , plural: 'Kilobits'
    }
  , to_anchor: 1024
  }
, Mb: {
    name: {
      singular: 'Megabit'
    , plural: 'Megabits'
    }
  , to_anchor: 1048576
  }
, Gb: {
    name: {
      singular: 'Gigabit'
    , plural: 'Gigabits'
    }
  , to_anchor: 1073741824
  }
, Tb: {
    name: {
      singular: 'Terabit'
    , plural: 'Terabits'
    }
  , to_anchor: 1099511627776
  }
};

bytes = {
  B: {
    name: {
      singular: 'Byte'
    , plural: 'Bytes'
    }
  , to_anchor: 1
  }
, KB: {
    name: {
      singular: 'Kilobyte'
    , plural: 'Kilobytes'
    }
  , to_anchor: 1024
  }
, MB: {
    name: {
      singular: 'Megabyte'
    , plural: 'Megabytes'
    }
  , to_anchor: 1048576
  }
, GB: {
    name: {
      singular: 'Gigabyte'
    , plural: 'Gigabytes'
    }
  , to_anchor: 1073741824
  }
, TB: {
    name: {
      singular: 'Terabyte'
    , plural: 'Terabytes'
    }
  , to_anchor: 1099511627776
  }
};

module.exports = {
  bits: bits
, bytes: bytes
, _anchors: {
    bits: {
      unit: 'b'
    , ratio: 1/8
    }
  , bytes: {
      unit: 'B'
    , ratio: 8
    }
  }
};

},{}],"yVy1":[function(require,module,exports) {
var metric
  , imperial;

metric = {
  ppm: {
    name: {
      singular: 'Part-per Million'
      , plural: 'Parts-per Million'
    }
    , to_anchor: 1
  }
  , ppb: {
    name: {
      singular: 'Part-per Billion'
      , plural: 'Parts-per Billion'
    }
    , to_anchor: .001
  }
  , ppt: {
    name: {
      singular: 'Part-per Trillion'
      , plural: 'Parts-per Trillion'
    }
    , to_anchor: .000001
  }
  , ppq: {
    name: {
      singular: 'Part-per Quadrillion'
      , plural: 'Parts-per Quadrillion'
    }
    , to_anchor: .000000001
  }
};

module.exports = {
  metric: metric
  , imperial: {}
  , _anchors: {
    metric: {
      unit: 'ppm'
      , ratio: .000001
    }
  }
};

},{}],"JPpx":[function(require,module,exports) {
var metric
  , imperial;

metric = {
  'm/s': {
    name: {
      singular: 'Metre per second'
    , plural: 'Metres per second'
    }
  , to_anchor: 3.6
  }
, 'km/h': {
    name: {
      singular: 'Kilometre per hour'
    , plural: 'Kilometres per hour'
    }
  , to_anchor: 1
  }
}

  imperial = {
    'm/h': {
      name: {
        singular: 'Mile per hour'
      , plural: 'Miles per hour'
      }
    , to_anchor: 1
    }
  , knot: {
      name: {
        singular: 'Knot'
      , plural: 'Knots'
      }
    , to_anchor: 1.150779
    }
  , 'ft/s': {
      name: {
        singular: 'Foot per second'
      , plural: 'Feet per second'
      }
    , to_anchor: 0.681818
      }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'km/h'
    , ratio: 1/1.609344
    }
  , imperial: {
      unit: 'm/h'
    , ratio: 1.609344
    }
  }
};

},{}],"VhYO":[function(require,module,exports) {
var metric
  , imperial;

metric = {
  'min/km': {
    name: {
      singular: 'Minute per kilometre'
    , plural: 'Minutes per kilometre'
    }
  , to_anchor: 0.06
  }
  ,'s/m': {
    name: {
      singular: 'Second per metre'
    , plural: 'Seconds per metre'
    }
  , to_anchor: 1
  }
}

imperial = {
    'min/mi': {
      name: {
        singular: 'Minute per mile'
      , plural: 'Minutes per mile'
      }
    , to_anchor: 0.0113636
   }
   , 's/ft': {
      name: {
        singular: 'Second per foot'
      , plural: 'Seconds per foot'
      }
    , to_anchor: 1
   }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 's/m'
    , ratio: 0.3048
    }
  , imperial: {
      unit: 's/ft'
    , ratio: 1/0.3048
    }
  }
};

},{}],"dzZ2":[function(require,module,exports) {
var metric
  , imperial;

metric = {
  Pa: {
    name: {
      singular: 'pascal'
    , plural: 'pascals'
    }
  , to_anchor: 1/1000
  }
, kPa: {
    name: {
      singular: 'kilopascal'
    , plural: 'kilopascals'
    }
  , to_anchor: 1
  }
, MPa: {
    name: {
      singular: 'megapascal'
    , plural: 'megapascals'
    }
  , to_anchor: 1000
  }
, hPa: {
    name: {
      singular: 'hectopascal'
    , plural: 'hectopascals'
    }
  , to_anchor: 1/10
  }
, bar: {
    name: {
      singular: 'bar'
    , plural: 'bar'
    }
  , to_anchor: 100
  }
, torr: {
    name: {
      singular: 'torr'
    , plural: 'torr'
    }
  , to_anchor: 101325/760000
  }
};

imperial = {
  psi: {
    name: {
      singular: 'pound per square inch'
    , plural: 'pounds per square inch'
    }
  , to_anchor: 1/1000
  }
, ksi: {
    name: {
      singular: 'kilopound per square inch'
    , plural: 'kilopound per square inch'
    }
  , to_anchor: 1
  }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'kPa'
    , ratio: 0.00014503768078
    }
  , imperial: {
      unit: 'psi'
    , ratio: 1/0.00014503768078
    }
  }
};

},{}],"yIye":[function(require,module,exports) {
var current;

current = {
  A: {
    name: {
      singular: 'Ampere'
    , plural: 'Amperes'
    }
  , to_anchor: 1
  }
, mA: {
    name: {
      singular: 'Milliampere'
      , plural: 'Milliamperes'
    }
    , to_anchor: .001
  }
, kA: {
    name: {
      singular: 'Kiloampere'
    , plural: 'Kiloamperes'
    }
  , to_anchor: 1000
  }
};

module.exports = {
  metric: current
, _anchors: {
    metric: {
      unit: 'A'
    , ratio: 1
    }
  }
};

},{}],"Ycrg":[function(require,module,exports) {
var voltage;

voltage = {
  V: {
    name: {
      singular: 'Volt'
    , plural: 'Volts'
    }
  , to_anchor: 1
  }
, mV: {
    name: {
      singular: 'Millivolt'
      , plural: 'Millivolts'
    }
    , to_anchor: .001
  }
, kV: {
    name: {
      singular: 'Kilovolt'
    , plural: 'Kilovolts'
    }
  , to_anchor: 1000
  }
};

module.exports = {
  metric: voltage
, _anchors: {
    metric: {
      unit: 'V'
    , ratio: 1
    }
  }
};

},{}],"nElb":[function(require,module,exports) {
var power;

power = {
  W: {
    name: {
      singular: 'Watt'
    , plural: 'Watts'
    }
  , to_anchor: 1
  }
, mW: {
    name: {
      singular: 'Milliwatt'
      , plural: 'Milliwatts'
    }
    , to_anchor: .001
  }
, kW: {
    name: {
      singular: 'Kilowatt'
    , plural: 'Kilowatts'
    }
  , to_anchor: 1000
  }
, MW: {
    name: {
      singular: 'Megawatt'
    , plural: 'Megawatts'
    }
  , to_anchor: 1000000
  }
, GW: {
    name: {
      singular: 'Gigawatt'
    , plural: 'Gigawatts'
    }
  , to_anchor: 1000000000
  }
};

module.exports = {
  metric: power
, _anchors: {
    metric: {
      unit: 'W'
    , ratio: 1
    }
  }
};

},{}],"jcfx":[function(require,module,exports) {
var reactivePower;

reactivePower = {
  VAR: {
    name: {
      singular: 'Volt-Ampere Reactive'
    , plural: 'Volt-Amperes Reactive'
    }
  , to_anchor: 1
  }
, mVAR: {
    name: {
      singular: 'Millivolt-Ampere Reactive'
      , plural: 'Millivolt-Amperes Reactive'
    }
    , to_anchor: .001
  }
, kVAR: {
    name: {
      singular: 'Kilovolt-Ampere Reactive'
    , plural: 'Kilovolt-Amperes Reactive'
    }
  , to_anchor: 1000
  }
, MVAR: {
    name: {
      singular: 'Megavolt-Ampere Reactive'
    , plural: 'Megavolt-Amperes Reactive'
    }
  , to_anchor: 1000000
  }
, GVAR: {
    name: {
      singular: 'Gigavolt-Ampere Reactive'
    , plural: 'Gigavolt-Amperes Reactive'
    }
  , to_anchor: 1000000000
  }
};

module.exports = {
  metric: reactivePower
, _anchors: {
    metric: {
      unit: 'VAR'
    , ratio: 1
    }
  }
};

},{}],"zmOF":[function(require,module,exports) {
var apparentPower;

apparentPower = {
  VA: {
    name: {
      singular: 'Volt-Ampere'
    , plural: 'Volt-Amperes'
    }
  , to_anchor: 1
  }
, mVA: {
    name: {
      singular: 'Millivolt-Ampere'
      , plural: 'Millivolt-Amperes'
    }
    , to_anchor: .001
  }
, kVA: {
    name: {
      singular: 'Kilovolt-Ampere'
    , plural: 'Kilovolt-Amperes'
    }
  , to_anchor: 1000
  }
, MVA: {
    name: {
      singular: 'Megavolt-Ampere'
    , plural: 'Megavolt-Amperes'
    }
  , to_anchor: 1000000
  }
, GVA: {
    name: {
      singular: 'Gigavolt-Ampere'
    , plural: 'Gigavolt-Amperes'
    }
  , to_anchor: 1000000000
  }
};

module.exports = {
  metric: apparentPower
, _anchors: {
    metric: {
      unit: 'VA'
    , ratio: 1
    }
  }
};

},{}],"rJDc":[function(require,module,exports) {
var energy;

energy = {
  Wh: {
    name: {
      singular: 'Watt-hour'
    , plural: 'Watt-hours'
    }
  , to_anchor: 3600
  }
, mWh: {
    name: {
      singular: 'Milliwatt-hour'
      , plural: 'Milliwatt-hours'
    }
    , to_anchor: 3.6
  }
, kWh: {
    name: {
      singular: 'Kilowatt-hour'
    , plural: 'Kilowatt-hours'
    }
  , to_anchor: 3600000
  }
, MWh: {
    name: {
      singular: 'Megawatt-hour'
    , plural: 'Megawatt-hours'
    }
  , to_anchor: 3600000000
  }
, GWh: {
    name: {
      singular: 'Gigawatt-hour'
    , plural: 'Gigawatt-hours'
    }
  , to_anchor: 3600000000000
  }
, J: {
    name: {
      singular: 'Joule'
    , plural: 'Joules'
    }
  , to_anchor: 1
  }
, kJ: {
    name: {
      singular: 'Kilojoule'
    , plural: 'Kilojoules'
    }
  , to_anchor: 1000
  }
};

module.exports = {
  metric: energy
, _anchors: {
    metric: {
      unit: 'J'
    , ratio: 1
    }
  }
};

},{}],"a6Bq":[function(require,module,exports) {
var reactiveEnergy;

reactiveEnergy = {
  VARh: {
    name: {
      singular: 'Volt-Ampere Reactive Hour'
    , plural: 'Volt-Amperes Reactive Hour'
    }
  , to_anchor: 1
  }
, mVARh: {
    name: {
      singular: 'Millivolt-Ampere Reactive Hour'
      , plural: 'Millivolt-Amperes Reactive Hour'
    }
    , to_anchor: .001
  }
, kVARh: {
    name: {
      singular: 'Kilovolt-Ampere Reactive Hour'
    , plural: 'Kilovolt-Amperes Reactive Hour'
    }
  , to_anchor: 1000
  }
, MVARh: {
    name: {
      singular: 'Megavolt-Ampere Reactive Hour'
    , plural: 'Megavolt-Amperes Reactive Hour'
    }
  , to_anchor: 1000000
  }
, GVARh: {
    name: {
      singular: 'Gigavolt-Ampere Reactive Hour'
    , plural: 'Gigavolt-Amperes Reactive Hour'
    }
  , to_anchor: 1000000000
  }
};

module.exports = {
  metric: reactiveEnergy
, _anchors: {
    metric: {
      unit: 'VARh'
    , ratio: 1
    }
  }
};

},{}],"yqpk":[function(require,module,exports) {
var metric
  , imperial;

metric = {
  'mm3/s': {
      name: {
        singular: 'Cubic Millimeter per second'
      , plural: 'Cubic Millimeters per second'
      }
    , to_anchor: 1/1000000
  }
, 'cm3/s': {
    name: {
      singular: 'Cubic Centimeter per second'
    , plural: 'Cubic Centimeters per second'
    }
  , to_anchor: 1/1000
  }
, 'ml/s': {
    name: {
      singular: 'Millilitre per second'
    , plural: 'Millilitres per second'
    }
  , to_anchor: 1/1000
  }
, 'cl/s': {
    name: {
      singular: 'Centilitre per second'
    , plural: 'Centilitres per second'
    }
  , to_anchor: 1/100
  }
, 'dl/s': {
    name: {
      singular: 'Decilitre per second'
    , plural: 'Decilitres per second'
    }
  , to_anchor: 1/10
  }
, 'l/s': {
    name: {
      singular: 'Litre per second'
    , plural: 'Litres per second'
    }
  , to_anchor: 1
  }
, 'l/min': {
    name: {
      singular: 'Litre per minute'
    , plural: 'Litres per minute'
    }
  , to_anchor: 1/60
  }
, 'l/h': {
    name: {
      singular: 'Litre per hour'
    , plural: 'Litres per hour'
    }
  , to_anchor: 1/3600
  }
, 'kl/s': {
    name: {
      singular: 'Kilolitre per second'
    , plural: 'Kilolitres per second'
    }
  , to_anchor: 1000
  }
, 'kl/min': {
    name: {
      singular: 'Kilolitre per minute'
    , plural: 'Kilolitres per minute'
    }
  , to_anchor: 50/3
  }
, 'kl/h': {
    name: {
      singular: 'Kilolitre per hour'
    , plural: 'Kilolitres per hour'
    }
  , to_anchor: 5/18
  }
, 'm3/s': {
    name: {
      singular: 'Cubic meter per second'
    , plural: 'Cubic meters per second'
    }
  , to_anchor: 1000
  }
, 'm3/min': {
    name: {
      singular: 'Cubic meter per minute'
    , plural: 'Cubic meters per minute'
    }
  , to_anchor: 50/3
  }
, 'm3/h': {
    name: {
      singular: 'Cubic meter per hour'
    , plural: 'Cubic meters per hour'
    }
  , to_anchor: 5/18
  }
, 'km3/s': {
    name: {
      singular: 'Cubic kilometer per second'
    , plural: 'Cubic kilometers per second'
    }
  , to_anchor: 1000000000000
  }
};

imperial = {
  'tsp/s': {
    name: {
      singular: 'Teaspoon per second'
    , plural: 'Teaspoons per second'
    }
  , to_anchor: 1/6
  }
, 'Tbs/s': {
    name: {
      singular: 'Tablespoon per second'
    , plural: 'Tablespoons per second'
    }
  , to_anchor: 1/2
  }
, 'in3/s': {
    name: {
      singular: 'Cubic inch per second'
    , plural: 'Cubic inches per second'
    }
  , to_anchor: 0.55411
  }
, 'in3/min': {
    name: {
      singular: 'Cubic inch per minute'
    , plural: 'Cubic inches per minute'
    }
  , to_anchor: 0.55411/60
  }
, 'in3/h': {
    name: {
      singular: 'Cubic inch per hour'
    , plural: 'Cubic inches per hour'
    }
  , to_anchor: 0.55411/3600
  }
, 'fl-oz/s': {
    name: {
      singular: 'Fluid Ounce per second'
    , plural: 'Fluid Ounces per second'
    }
  , to_anchor: 1
  }
, 'fl-oz/min': {
    name: {
      singular: 'Fluid Ounce per minute'
    , plural: 'Fluid Ounces per minute'
    }
  , to_anchor: 1/60
  }
, 'fl-oz/h': {
    name: {
      singular: 'Fluid Ounce per hour'
    , plural: 'Fluid Ounces per hour'
    }
  , to_anchor: 1/3600
  }
, 'cup/s': {
    name: {
      singular: 'Cup per second'
    , plural: 'Cups per second'
    }
  , to_anchor: 8
  }
, 'pnt/s': {
    name: {
      singular: 'Pint per second'
    , plural: 'Pints per second'
    }
  , to_anchor: 16
  }
, 'pnt/min': {
    name: {
      singular: 'Pint per minute'
    , plural: 'Pints per minute'
    }
  , to_anchor: 4/15
  }
, 'pnt/h': {
    name: {
      singular: 'Pint per hour'
    , plural: 'Pints per hour'
    }
  , to_anchor: 1/225
  }
, 'qt/s': {
    name: {
      singular: 'Quart per second'
    , plural: 'Quarts per second'
    }
  , to_anchor: 32
  }
, 'gal/s': {
    name: {
      singular: 'Gallon per second'
    , plural: 'Gallons per second'
    }
  , to_anchor: 128
  }
, 'gal/min': {
    name: {
      singular: 'Gallon per minute'
    , plural: 'Gallons per minute'
    }
  , to_anchor: 32/15
  }
, 'gal/h': {
    name: {
      singular: 'Gallon per hour'
    , plural: 'Gallons per hour'
    }
  , to_anchor: 8/225
  }
, 'ft3/s': {
    name: {
      singular: 'Cubic foot per second'
    , plural: 'Cubic feet per second'
    }
  , to_anchor: 957.506
  }
, 'ft3/min': {
    name: {
      singular: 'Cubic foot per minute'
    , plural: 'Cubic feet per minute'
    }
  , to_anchor: 957.506/60
  }
, 'ft3/h': {
    name: {
      singular: 'Cubic foot per hour'
    , plural: 'Cubic feet per hour'
    }
  , to_anchor: 957.506/3600
  }
, 'yd3/s': {
    name: {
      singular: 'Cubic yard per second'
    , plural: 'Cubic yards per second'
    }
  , to_anchor: 25852.7
  }
, 'yd3/min': {
    name: {
      singular: 'Cubic yard per minute'
    , plural: 'Cubic yards per minute'
    }
  , to_anchor: 25852.7/60
  }
, 'yd3/h': {
    name: {
      singular: 'Cubic yard per hour'
    , plural: 'Cubic yards per hour'
    }
  , to_anchor: 25852.7/3600
  }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'l/s'
    , ratio: 33.8140227
    }
  , imperial: {
      unit: 'fl-oz/s'
    , ratio: 1/33.8140227
    }
  }
};

},{}],"gjwW":[function(require,module,exports) {
var metric,
imperial;

metric = {
  'lx': {
    name: {
      singular: 'Lux',
      plural: 'Lux'
    },
    to_anchor: 1
  }
};

imperial = {
  'ft-cd': {
    name: {
      singular: 'Foot-candle',
      plural: 'Foot-candles'
    },
    to_anchor: 1
  }
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: 'lx',
      ratio: 1/10.76391
    },
    imperial: {
      unit: 'ft-cd',      
	  ratio: 10.76391
    }
  }
};

},{}],"qRLX":[function(require,module,exports) {
var frequency;

frequency = {
  mHz: {
    name: {
      singular: 'millihertz'
    , plural: 'millihertz'
    }
  , to_anchor: 1/1000
  }
, Hz: {
    name: {
      singular: 'hertz'
    , plural: 'hertz'
    }
  , to_anchor: 1
  }
, kHz: {
    name: {
      singular: 'kilohertz'
    , plural: 'kilohertz'
    }
  , to_anchor: 1000
  }
, MHz: {
    name: {
      singular: 'megahertz'
    , plural: 'megahertz'
    }
  , to_anchor: 1000 * 1000
  }
, GHz: {
    name: {
      singular: 'gigahertz'
    , plural: 'gigahertz'
    }
  , to_anchor: 1000 * 1000 * 1000
  }
, THz: {
    name: {
      singular: 'terahertz'
    , plural: 'terahertz'
    }
  , to_anchor: 1000 * 1000 * 1000 * 1000
  }
, rpm: {
    name: {
      singular: 'rotation per minute'
    , plural: 'rotations per minute'
    }
  , to_anchor: 1/60
  }
, "deg/s": {
    name: {
      singular: 'degree per second'
    , plural: 'degrees per second'
    }
  , to_anchor: 1/360
  }
, "rad/s": {
    name: {
      singular: 'radian per second'
    , plural: 'radians per second'
    }
  , to_anchor: 1/(Math.PI * 2)
  }
};


module.exports = {
  metric: frequency
, _anchors: {
    frequency: {
      unit: 'hz'
    , ratio: 1
    }
  }
};

},{}],"zo6V":[function(require,module,exports) {
var angle;

angle = {
  rad: {
    name: {
      singular: 'radian'
    , plural: 'radians'
    }
  , to_anchor: 180/Math.PI
  }
, deg: {
    name: {
      singular: 'degree'
    , plural: 'degrees'
    }
  , to_anchor: 1
  }
, grad: {
    name: {
      singular: 'gradian'
    , plural: 'gradians'
    }
  , to_anchor: 9/10
  }
, arcmin: {
    name: {
      singular: 'arcminute'
    , plural: 'arcminutes'
    }
  , to_anchor: 1/60
  }
, arcsec: {
    name: {
      singular: 'arcsecond'
    , plural: 'arcseconds'
    }
  , to_anchor: 1/3600
  }
};

module.exports = {
  metric: angle
, _anchors: {
    metric: {
      unit: 'deg'
    , ratio: 1
    }
  }
};

},{}],"K5Mp":[function(require,module,exports) {
var convert
  , keys = require('lodash.keys')
  , each = require('lodash.foreach')
  , measures = {
      length: require('./definitions/length')
    , area: require('./definitions/area')
    , mass: require('./definitions/mass')
    , volume: require('./definitions/volume')
    , each: require('./definitions/each')
    , temperature: require('./definitions/temperature')
    , time: require('./definitions/time')
    , digital: require('./definitions/digital')
    , partsPer: require('./definitions/partsPer')
    , speed: require('./definitions/speed')
    , pace: require('./definitions/pace')
    , pressure: require('./definitions/pressure')
    , current: require('./definitions/current')
    , voltage: require('./definitions/voltage')
    , power: require('./definitions/power')
    , reactivePower: require('./definitions/reactivePower')
    , apparentPower: require('./definitions/apparentPower')
    , energy: require('./definitions/energy')
    , reactiveEnergy: require('./definitions/reactiveEnergy')
    , volumeFlowRate: require('./definitions/volumeFlowRate')
    , illuminance: require('./definitions/illuminance')
    , frequency: require('./definitions/frequency')
    , angle : require('./definitions/angle')
    }
  , Converter;

Converter = function (numerator, denominator) {
  if(denominator)
    this.val = numerator / denominator;
  else
    this.val = numerator;
};

/**
* Lets the converter know the source unit abbreviation
*/
Converter.prototype.from = function (from) {
  if(this.destination)
    throw new Error('.from must be called before .to');

  this.origin = this.getUnit(from);

  if(!this.origin) {
    this.throwUnsupportedUnitError(from);
  }

  return this;
};

/**
* Converts the unit and returns the value
*/
Converter.prototype.to = function (to) {
  if(!this.origin)
    throw new Error('.to must be called after .from');

  this.destination = this.getUnit(to);

  var result
    , transform;

  if(!this.destination) {
    this.throwUnsupportedUnitError(to);
  }

  // Don't change the value if origin and destination are the same
  if (this.origin.abbr === this.destination.abbr) {
    return this.val;
  }

  // You can't go from liquid to mass, for example
  if(this.destination.measure != this.origin.measure) {
    throw new Error('Cannot convert incompatible measures of '
      + this.destination.measure + ' and ' + this.origin.measure);
  }

  /**
  * Convert from the source value to its anchor inside the system
  */
  result = this.val * this.origin.unit.to_anchor;

  /**
  * For some changes it's a simple shift (C to K)
  * So we'll add it when convering into the unit (later)
  * and subtract it when converting from the unit
  */
  if (this.origin.unit.anchor_shift) {
    result -= this.origin.unit.anchor_shift
  }

  /**
  * Convert from one system to another through the anchor ratio. Some conversions
  * aren't ratio based or require more than a simple shift. We can provide a custom
  * transform here to provide the direct result
  */
  if(this.origin.system != this.destination.system) {
    transform = measures[this.origin.measure]._anchors[this.origin.system].transform;
    if (typeof transform === 'function') {
      result = transform(result)
    }
    else {
      result *= measures[this.origin.measure]._anchors[this.origin.system].ratio;
    }
  }

  /**
  * This shift has to be done after the system conversion business
  */
  if (this.destination.unit.anchor_shift) {
    result += this.destination.unit.anchor_shift;
  }

  /**
  * Convert to another unit inside the destination system
  */
  return result / this.destination.unit.to_anchor;
};

/**
* Converts the unit to the best available unit.
*/
Converter.prototype.toBest = function(options) {
  if(!this.origin)
    throw new Error('.toBest must be called after .from');

  var options = Object.assign({
    exclude: [],
    cutOffNumber: 1,
  }, options)

  var best;
  /**
    Looks through every possibility for the 'best' available unit.
    i.e. Where the value has the fewest numbers before the decimal point,
    but is still higher than 1.
  */
  each(this.possibilities(), function(possibility) {
    var unit = this.describe(possibility);
    var isIncluded = options.exclude.indexOf(possibility) === -1;

    if (isIncluded && unit.system === this.origin.system) {
      var result = this.to(possibility);
      if (!best || (result >= options.cutOffNumber && result < best.val)) {
        best = {
          val: result,
          unit: possibility,
          singular: unit.singular,
          plural: unit.plural
        };
      }
    }
  }.bind(this));

  return best;
}

/**
* Finds the unit
*/
Converter.prototype.getUnit = function (abbr) {
  var found;

  each(measures, function (systems, measure) {
    each(systems, function (units, system) {
      if(system == '_anchors')
        return false;

      each(units, function (unit, testAbbr) {
        if(testAbbr == abbr) {
          found = {
            abbr: abbr
          , measure: measure
          , system: system
          , unit: unit
          };
          return false;
        }
      });

      if(found)
        return false;
    });

    if(found)
      return false;
  });

  return found;
};

var describe = function(resp) {
  return {
    abbr: resp.abbr
  , measure: resp.measure
  , system: resp.system
  , singular: resp.unit.name.singular
  , plural: resp.unit.name.plural
  };
}

/**
* An alias for getUnit
*/
Converter.prototype.describe = function (abbr) {
  var resp = Converter.prototype.getUnit(abbr);
  var desc = null;

  try {
    desc = describe(resp);
  } catch(err) {
    this.throwUnsupportedUnitError(abbr);
  }

  return desc;
};

/**
* Detailed list of all supported units
*/
Converter.prototype.list = function (measure) {
  var list = [];

  each(measures, function (systems, testMeasure) {
    if(measure && measure !== testMeasure)
      return;

    each(systems, function (units, system) {
      if(system == '_anchors')
        return false;

      each(units, function (unit, abbr) {
        list = list.concat(describe({
          abbr: abbr,
          measure: testMeasure
        , system: system
        , unit: unit
        }));
      });
    });
  });

  return list;
};

Converter.prototype.throwUnsupportedUnitError = function (what) {
  var validUnits = [];

  each(measures, function (systems, measure) {
    each(systems, function (units, system) {
      if(system == '_anchors')
        return false;

      validUnits = validUnits.concat(keys(units));
    });
  });

  throw new Error('Unsupported unit ' + what + ', use one of: ' + validUnits.join(', '));
}

/**
* Returns the abbreviated measures that the value can be
* converted to.
*/
Converter.prototype.possibilities = function (measure) {
  var possibilities = [];
  if(!this.origin && !measure) {
	  each(keys(measures), function (measure){
		  each(measures[measure], function (units, system) {
		    if(system == '_anchors')
		      return false;

		    possibilities = possibilities.concat(keys(units));
		  });
	  });
  } else {
	  measure = measure || this.origin.measure;
	  each(measures[measure], function (units, system) {
	    if(system == '_anchors')
	      return false;

	    possibilities = possibilities.concat(keys(units));
	  });
  }

  return possibilities;
};

/**
* Returns the abbreviated measures that the value can be
* converted to.
*/
Converter.prototype.measures = function () {
  return keys(measures);
};

convert = function (value) {
  return new Converter(value);
};

module.exports = convert;

},{"lodash.keys":"LvIh","lodash.foreach":"KHBi","./definitions/length":"pd3d","./definitions/area":"HOEa","./definitions/mass":"PLJ8","./definitions/volume":"smp0","./definitions/each":"wQDr","./definitions/temperature":"ESHn","./definitions/time":"SGR5","./definitions/digital":"bxlf","./definitions/partsPer":"yVy1","./definitions/speed":"JPpx","./definitions/pace":"VhYO","./definitions/pressure":"dzZ2","./definitions/current":"yIye","./definitions/voltage":"Ycrg","./definitions/power":"nElb","./definitions/reactivePower":"jcfx","./definitions/apparentPower":"zmOF","./definitions/energy":"rJDc","./definitions/reactiveEnergy":"a6Bq","./definitions/volumeFlowRate":"yqpk","./definitions/illuminance":"gjwW","./definitions/frequency":"qRLX","./definitions/angle":"zo6V"}],"A7mC":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('Chartist', [], function () {
      return root['Chartist'] = factory();
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist'] = factory();
  }
})(this, function () {
  /* Chartist.js 0.11.4
   * Copyright © 2019 Gion Kunz
   * Free to use under either the WTFPL license or the MIT license.
   * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
   * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
   */

  /**
   * The core module of Chartist that is mainly providing static functions and higher level functions for chart modules.
   *
   * @module Chartist.Core
   */
  var Chartist = {
    version: '0.11.4'
  };

  (function (globalRoot, Chartist) {
    'use strict';

    var window = globalRoot.window;
    var document = globalRoot.document;
    /**
     * This object contains all namespaces used within Chartist.
     *
     * @memberof Chartist.Core
     * @type {{svg: string, xmlns: string, xhtml: string, xlink: string, ct: string}}
     */

    Chartist.namespaces = {
      svg: 'http://www.w3.org/2000/svg',
      xmlns: 'http://www.w3.org/2000/xmlns/',
      xhtml: 'http://www.w3.org/1999/xhtml',
      xlink: 'http://www.w3.org/1999/xlink',
      ct: 'http://gionkunz.github.com/chartist-js/ct'
    };
    /**
     * Helps to simplify functional style code
     *
     * @memberof Chartist.Core
     * @param {*} n This exact value will be returned by the noop function
     * @return {*} The same value that was provided to the n parameter
     */

    Chartist.noop = function (n) {
      return n;
    };
    /**
     * Generates a-z from a number 0 to 26
     *
     * @memberof Chartist.Core
     * @param {Number} n A number from 0 to 26 that will result in a letter a-z
     * @return {String} A character from a-z based on the input number n
     */


    Chartist.alphaNumerate = function (n) {
      // Limit to a-z
      return String.fromCharCode(97 + n % 26);
    };
    /**
     * Simple recursive object extend
     *
     * @memberof Chartist.Core
     * @param {Object} target Target object where the source will be merged into
     * @param {Object...} sources This object (objects) will be merged into target and then target is returned
     * @return {Object} An object that has the same reference as target but is extended and merged with the properties of source
     */


    Chartist.extend = function (target) {
      var i, source, sourceProp;
      target = target || {};

      for (i = 1; i < arguments.length; i++) {
        source = arguments[i];

        for (var prop in source) {
          sourceProp = source[prop];

          if (typeof sourceProp === 'object' && sourceProp !== null && !(sourceProp instanceof Array)) {
            target[prop] = Chartist.extend(target[prop], sourceProp);
          } else {
            target[prop] = sourceProp;
          }
        }
      }

      return target;
    };
    /**
     * Replaces all occurrences of subStr in str with newSubStr and returns a new string.
     *
     * @memberof Chartist.Core
     * @param {String} str
     * @param {String} subStr
     * @param {String} newSubStr
     * @return {String}
     */


    Chartist.replaceAll = function (str, subStr, newSubStr) {
      return str.replace(new RegExp(subStr, 'g'), newSubStr);
    };
    /**
     * Converts a number to a string with a unit. If a string is passed then this will be returned unmodified.
     *
     * @memberof Chartist.Core
     * @param {Number} value
     * @param {String} unit
     * @return {String} Returns the passed number value with unit.
     */


    Chartist.ensureUnit = function (value, unit) {
      if (typeof value === 'number') {
        value = value + unit;
      }

      return value;
    };
    /**
     * Converts a number or string to a quantity object.
     *
     * @memberof Chartist.Core
     * @param {String|Number} input
     * @return {Object} Returns an object containing the value as number and the unit as string.
     */


    Chartist.quantity = function (input) {
      if (typeof input === 'string') {
        var match = /^(\d+)\s*(.*)$/g.exec(input);
        return {
          value: +match[1],
          unit: match[2] || undefined
        };
      }

      return {
        value: input
      };
    };
    /**
     * This is a wrapper around document.querySelector that will return the query if it's already of type Node
     *
     * @memberof Chartist.Core
     * @param {String|Node} query The query to use for selecting a Node or a DOM node that will be returned directly
     * @return {Node}
     */


    Chartist.querySelector = function (query) {
      return query instanceof Node ? query : document.querySelector(query);
    };
    /**
     * Functional style helper to produce array with given length initialized with undefined values
     *
     * @memberof Chartist.Core
     * @param length
     * @return {Array}
     */


    Chartist.times = function (length) {
      return Array.apply(null, new Array(length));
    };
    /**
     * Sum helper to be used in reduce functions
     *
     * @memberof Chartist.Core
     * @param previous
     * @param current
     * @return {*}
     */


    Chartist.sum = function (previous, current) {
      return previous + (current ? current : 0);
    };
    /**
     * Multiply helper to be used in `Array.map` for multiplying each value of an array with a factor.
     *
     * @memberof Chartist.Core
     * @param {Number} factor
     * @returns {Function} Function that can be used in `Array.map` to multiply each value in an array
     */


    Chartist.mapMultiply = function (factor) {
      return function (num) {
        return num * factor;
      };
    };
    /**
     * Add helper to be used in `Array.map` for adding a addend to each value of an array.
     *
     * @memberof Chartist.Core
     * @param {Number} addend
     * @returns {Function} Function that can be used in `Array.map` to add a addend to each value in an array
     */


    Chartist.mapAdd = function (addend) {
      return function (num) {
        return num + addend;
      };
    };
    /**
     * Map for multi dimensional arrays where their nested arrays will be mapped in serial. The output array will have the length of the largest nested array. The callback function is called with variable arguments where each argument is the nested array value (or undefined if there are no more values).
     *
     * @memberof Chartist.Core
     * @param arr
     * @param cb
     * @return {Array}
     */


    Chartist.serialMap = function (arr, cb) {
      var result = [],
          length = Math.max.apply(null, arr.map(function (e) {
        return e.length;
      }));
      Chartist.times(length).forEach(function (e, index) {
        var args = arr.map(function (e) {
          return e[index];
        });
        result[index] = cb.apply(null, args);
      });
      return result;
    };
    /**
     * This helper function can be used to round values with certain precision level after decimal. This is used to prevent rounding errors near float point precision limit.
     *
     * @memberof Chartist.Core
     * @param {Number} value The value that should be rounded with precision
     * @param {Number} [digits] The number of digits after decimal used to do the rounding
     * @returns {number} Rounded value
     */


    Chartist.roundWithPrecision = function (value, digits) {
      var precision = Math.pow(10, digits || Chartist.precision);
      return Math.round(value * precision) / precision;
    };
    /**
     * Precision level used internally in Chartist for rounding. If you require more decimal places you can increase this number.
     *
     * @memberof Chartist.Core
     * @type {number}
     */


    Chartist.precision = 8;
    /**
     * A map with characters to escape for strings to be safely used as attribute values.
     *
     * @memberof Chartist.Core
     * @type {Object}
     */

    Chartist.escapingMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#039;'
    };
    /**
     * This function serializes arbitrary data to a string. In case of data that can't be easily converted to a string, this function will create a wrapper object and serialize the data using JSON.stringify. The outcoming string will always be escaped using Chartist.escapingMap.
     * If called with null or undefined the function will return immediately with null or undefined.
     *
     * @memberof Chartist.Core
     * @param {Number|String|Object} data
     * @return {String}
     */

    Chartist.serialize = function (data) {
      if (data === null || data === undefined) {
        return data;
      } else if (typeof data === 'number') {
        data = '' + data;
      } else if (typeof data === 'object') {
        data = JSON.stringify({
          data: data
        });
      }

      return Object.keys(Chartist.escapingMap).reduce(function (result, key) {
        return Chartist.replaceAll(result, key, Chartist.escapingMap[key]);
      }, data);
    };
    /**
     * This function de-serializes a string previously serialized with Chartist.serialize. The string will always be unescaped using Chartist.escapingMap before it's returned. Based on the input value the return type can be Number, String or Object. JSON.parse is used with try / catch to see if the unescaped string can be parsed into an Object and this Object will be returned on success.
     *
     * @memberof Chartist.Core
     * @param {String} data
     * @return {String|Number|Object}
     */


    Chartist.deserialize = function (data) {
      if (typeof data !== 'string') {
        return data;
      }

      data = Object.keys(Chartist.escapingMap).reduce(function (result, key) {
        return Chartist.replaceAll(result, Chartist.escapingMap[key], key);
      }, data);

      try {
        data = JSON.parse(data);
        data = data.data !== undefined ? data.data : data;
      } catch (e) {}

      return data;
    };
    /**
     * Create or reinitialize the SVG element for the chart
     *
     * @memberof Chartist.Core
     * @param {Node} container The containing DOM Node object that will be used to plant the SVG element
     * @param {String} width Set the width of the SVG element. Default is 100%
     * @param {String} height Set the height of the SVG element. Default is 100%
     * @param {String} className Specify a class to be added to the SVG element
     * @return {Object} The created/reinitialized SVG element
     */


    Chartist.createSvg = function (container, width, height, className) {
      var svg;
      width = width || '100%';
      height = height || '100%'; // Check if there is a previous SVG element in the container that contains the Chartist XML namespace and remove it
      // Since the DOM API does not support namespaces we need to manually search the returned list http://www.w3.org/TR/selectors-api/

      Array.prototype.slice.call(container.querySelectorAll('svg')).filter(function filterChartistSvgObjects(svg) {
        return svg.getAttributeNS(Chartist.namespaces.xmlns, 'ct');
      }).forEach(function removePreviousElement(svg) {
        container.removeChild(svg);
      }); // Create svg object with width and height or use 100% as default

      svg = new Chartist.Svg('svg').attr({
        width: width,
        height: height
      }).addClass(className);
      svg._node.style.width = width;
      svg._node.style.height = height; // Add the DOM node to our container

      container.appendChild(svg._node);
      return svg;
    };
    /**
     * Ensures that the data object passed as second argument to the charts is present and correctly initialized.
     *
     * @param  {Object} data The data object that is passed as second argument to the charts
     * @return {Object} The normalized data object
     */


    Chartist.normalizeData = function (data, reverse, multi) {
      var labelCount;
      var output = {
        raw: data,
        normalized: {}
      }; // Check if we should generate some labels based on existing series data

      output.normalized.series = Chartist.getDataArray({
        series: data.series || []
      }, reverse, multi); // If all elements of the normalized data array are arrays we're dealing with
      // multi series data and we need to find the largest series if they are un-even

      if (output.normalized.series.every(function (value) {
        return value instanceof Array;
      })) {
        // Getting the series with the the most elements
        labelCount = Math.max.apply(null, output.normalized.series.map(function (series) {
          return series.length;
        }));
      } else {
        // We're dealing with Pie data so we just take the normalized array length
        labelCount = output.normalized.series.length;
      }

      output.normalized.labels = (data.labels || []).slice(); // Padding the labels to labelCount with empty strings

      Array.prototype.push.apply(output.normalized.labels, Chartist.times(Math.max(0, labelCount - output.normalized.labels.length)).map(function () {
        return '';
      }));

      if (reverse) {
        Chartist.reverseData(output.normalized);
      }

      return output;
    };
    /**
     * This function safely checks if an objects has an owned property.
     *
     * @param {Object} object The object where to check for a property
     * @param {string} property The property name
     * @returns {boolean} Returns true if the object owns the specified property
     */


    Chartist.safeHasProperty = function (object, property) {
      return object !== null && typeof object === 'object' && object.hasOwnProperty(property);
    };
    /**
     * Checks if a value is considered a hole in the data series.
     *
     * @param {*} value
     * @returns {boolean} True if the value is considered a data hole
     */


    Chartist.isDataHoleValue = function (value) {
      return value === null || value === undefined || typeof value === 'number' && isNaN(value);
    };
    /**
     * Reverses the series, labels and series data arrays.
     *
     * @memberof Chartist.Core
     * @param data
     */


    Chartist.reverseData = function (data) {
      data.labels.reverse();
      data.series.reverse();

      for (var i = 0; i < data.series.length; i++) {
        if (typeof data.series[i] === 'object' && data.series[i].data !== undefined) {
          data.series[i].data.reverse();
        } else if (data.series[i] instanceof Array) {
          data.series[i].reverse();
        }
      }
    };
    /**
     * Convert data series into plain array
     *
     * @memberof Chartist.Core
     * @param {Object} data The series object that contains the data to be visualized in the chart
     * @param {Boolean} [reverse] If true the whole data is reversed by the getDataArray call. This will modify the data object passed as first parameter. The labels as well as the series order is reversed. The whole series data arrays are reversed too.
     * @param {Boolean} [multi] Create a multi dimensional array from a series data array where a value object with `x` and `y` values will be created.
     * @return {Array} A plain array that contains the data to be visualized in the chart
     */


    Chartist.getDataArray = function (data, reverse, multi) {
      // Recursively walks through nested arrays and convert string values to numbers and objects with value properties
      // to values. Check the tests in data core -> data normalization for a detailed specification of expected values
      function recursiveConvert(value) {
        if (Chartist.safeHasProperty(value, 'value')) {
          // We are dealing with value object notation so we need to recurse on value property
          return recursiveConvert(value.value);
        } else if (Chartist.safeHasProperty(value, 'data')) {
          // We are dealing with series object notation so we need to recurse on data property
          return recursiveConvert(value.data);
        } else if (value instanceof Array) {
          // Data is of type array so we need to recurse on the series
          return value.map(recursiveConvert);
        } else if (Chartist.isDataHoleValue(value)) {
          // We're dealing with a hole in the data and therefore need to return undefined
          // We're also returning undefined for multi value output
          return undefined;
        } else {
          // We need to prepare multi value output (x and y data)
          if (multi) {
            var multiValue = {}; // Single series value arrays are assumed to specify the Y-Axis value
            // For example: [1, 2] => [{x: undefined, y: 1}, {x: undefined, y: 2}]
            // If multi is a string then it's assumed that it specified which dimension should be filled as default

            if (typeof multi === 'string') {
              multiValue[multi] = Chartist.getNumberOrUndefined(value);
            } else {
              multiValue.y = Chartist.getNumberOrUndefined(value);
            }

            multiValue.x = value.hasOwnProperty('x') ? Chartist.getNumberOrUndefined(value.x) : multiValue.x;
            multiValue.y = value.hasOwnProperty('y') ? Chartist.getNumberOrUndefined(value.y) : multiValue.y;
            return multiValue;
          } else {
            // We can return simple data
            return Chartist.getNumberOrUndefined(value);
          }
        }
      }

      return data.series.map(recursiveConvert);
    };
    /**
     * Converts a number into a padding object.
     *
     * @memberof Chartist.Core
     * @param {Object|Number} padding
     * @param {Number} [fallback] This value is used to fill missing values if a incomplete padding object was passed
     * @returns {Object} Returns a padding object containing top, right, bottom, left properties filled with the padding number passed in as argument. If the argument is something else than a number (presumably already a correct padding object) then this argument is directly returned.
     */


    Chartist.normalizePadding = function (padding, fallback) {
      fallback = fallback || 0;
      return typeof padding === 'number' ? {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding
      } : {
        top: typeof padding.top === 'number' ? padding.top : fallback,
        right: typeof padding.right === 'number' ? padding.right : fallback,
        bottom: typeof padding.bottom === 'number' ? padding.bottom : fallback,
        left: typeof padding.left === 'number' ? padding.left : fallback
      };
    };

    Chartist.getMetaData = function (series, index) {
      var value = series.data ? series.data[index] : series[index];
      return value ? value.meta : undefined;
    };
    /**
     * Calculate the order of magnitude for the chart scale
     *
     * @memberof Chartist.Core
     * @param {Number} value The value Range of the chart
     * @return {Number} The order of magnitude
     */


    Chartist.orderOfMagnitude = function (value) {
      return Math.floor(Math.log(Math.abs(value)) / Math.LN10);
    };
    /**
     * Project a data length into screen coordinates (pixels)
     *
     * @memberof Chartist.Core
     * @param {Object} axisLength The svg element for the chart
     * @param {Number} length Single data value from a series array
     * @param {Object} bounds All the values to set the bounds of the chart
     * @return {Number} The projected data length in pixels
     */


    Chartist.projectLength = function (axisLength, length, bounds) {
      return length / bounds.range * axisLength;
    };
    /**
     * Get the height of the area in the chart for the data series
     *
     * @memberof Chartist.Core
     * @param {Object} svg The svg element for the chart
     * @param {Object} options The Object that contains all the optional values for the chart
     * @return {Number} The height of the area in the chart for the data series
     */


    Chartist.getAvailableHeight = function (svg, options) {
      return Math.max((Chartist.quantity(options.height).value || svg.height()) - (options.chartPadding.top + options.chartPadding.bottom) - options.axisX.offset, 0);
    };
    /**
     * Get highest and lowest value of data array. This Array contains the data that will be visualized in the chart.
     *
     * @memberof Chartist.Core
     * @param {Array} data The array that contains the data to be visualized in the chart
     * @param {Object} options The Object that contains the chart options
     * @param {String} dimension Axis dimension 'x' or 'y' used to access the correct value and high / low configuration
     * @return {Object} An object that contains the highest and lowest value that will be visualized on the chart.
     */


    Chartist.getHighLow = function (data, options, dimension) {
      // TODO: Remove workaround for deprecated global high / low config. Axis high / low configuration is preferred
      options = Chartist.extend({}, options, dimension ? options['axis' + dimension.toUpperCase()] : {});
      var highLow = {
        high: options.high === undefined ? -Number.MAX_VALUE : +options.high,
        low: options.low === undefined ? Number.MAX_VALUE : +options.low
      };
      var findHigh = options.high === undefined;
      var findLow = options.low === undefined; // Function to recursively walk through arrays and find highest and lowest number

      function recursiveHighLow(data) {
        if (data === undefined) {
          return undefined;
        } else if (data instanceof Array) {
          for (var i = 0; i < data.length; i++) {
            recursiveHighLow(data[i]);
          }
        } else {
          var value = dimension ? +data[dimension] : +data;

          if (findHigh && value > highLow.high) {
            highLow.high = value;
          }

          if (findLow && value < highLow.low) {
            highLow.low = value;
          }
        }
      } // Start to find highest and lowest number recursively


      if (findHigh || findLow) {
        recursiveHighLow(data);
      } // Overrides of high / low based on reference value, it will make sure that the invisible reference value is
      // used to generate the chart. This is useful when the chart always needs to contain the position of the
      // invisible reference value in the view i.e. for bipolar scales.


      if (options.referenceValue || options.referenceValue === 0) {
        highLow.high = Math.max(options.referenceValue, highLow.high);
        highLow.low = Math.min(options.referenceValue, highLow.low);
      } // If high and low are the same because of misconfiguration or flat data (only the same value) we need
      // to set the high or low to 0 depending on the polarity


      if (highLow.high <= highLow.low) {
        // If both values are 0 we set high to 1
        if (highLow.low === 0) {
          highLow.high = 1;
        } else if (highLow.low < 0) {
          // If we have the same negative value for the bounds we set bounds.high to 0
          highLow.high = 0;
        } else if (highLow.high > 0) {
          // If we have the same positive value for the bounds we set bounds.low to 0
          highLow.low = 0;
        } else {
          // If data array was empty, values are Number.MAX_VALUE and -Number.MAX_VALUE. Set bounds to prevent errors
          highLow.high = 1;
          highLow.low = 0;
        }
      }

      return highLow;
    };
    /**
     * Checks if a value can be safely coerced to a number. This includes all values except null which result in finite numbers when coerced. This excludes NaN, since it's not finite.
     *
     * @memberof Chartist.Core
     * @param value
     * @returns {Boolean}
     */


    Chartist.isNumeric = function (value) {
      return value === null ? false : isFinite(value);
    };
    /**
     * Returns true on all falsey values except the numeric value 0.
     *
     * @memberof Chartist.Core
     * @param value
     * @returns {boolean}
     */


    Chartist.isFalseyButZero = function (value) {
      return !value && value !== 0;
    };
    /**
     * Returns a number if the passed parameter is a valid number or the function will return undefined. On all other values than a valid number, this function will return undefined.
     *
     * @memberof Chartist.Core
     * @param value
     * @returns {*}
     */


    Chartist.getNumberOrUndefined = function (value) {
      return Chartist.isNumeric(value) ? +value : undefined;
    };
    /**
     * Checks if provided value object is multi value (contains x or y properties)
     *
     * @memberof Chartist.Core
     * @param value
     */


    Chartist.isMultiValue = function (value) {
      return typeof value === 'object' && ('x' in value || 'y' in value);
    };
    /**
     * Gets a value from a dimension `value.x` or `value.y` while returning value directly if it's a valid numeric value. If the value is not numeric and it's falsey this function will return `defaultValue`.
     *
     * @memberof Chartist.Core
     * @param value
     * @param dimension
     * @param defaultValue
     * @returns {*}
     */


    Chartist.getMultiValue = function (value, dimension) {
      if (Chartist.isMultiValue(value)) {
        return Chartist.getNumberOrUndefined(value[dimension || 'y']);
      } else {
        return Chartist.getNumberOrUndefined(value);
      }
    };
    /**
     * Pollard Rho Algorithm to find smallest factor of an integer value. There are more efficient algorithms for factorization, but this one is quite efficient and not so complex.
     *
     * @memberof Chartist.Core
     * @param {Number} num An integer number where the smallest factor should be searched for
     * @returns {Number} The smallest integer factor of the parameter num.
     */


    Chartist.rho = function (num) {
      if (num === 1) {
        return num;
      }

      function gcd(p, q) {
        if (p % q === 0) {
          return q;
        } else {
          return gcd(q, p % q);
        }
      }

      function f(x) {
        return x * x + 1;
      }

      var x1 = 2,
          x2 = 2,
          divisor;

      if (num % 2 === 0) {
        return 2;
      }

      do {
        x1 = f(x1) % num;
        x2 = f(f(x2)) % num;
        divisor = gcd(Math.abs(x1 - x2), num);
      } while (divisor === 1);

      return divisor;
    };
    /**
     * Calculate and retrieve all the bounds for the chart and return them in one array
     *
     * @memberof Chartist.Core
     * @param {Number} axisLength The length of the Axis used for
     * @param {Object} highLow An object containing a high and low property indicating the value range of the chart.
     * @param {Number} scaleMinSpace The minimum projected length a step should result in
     * @param {Boolean} onlyInteger
     * @return {Object} All the values to set the bounds of the chart
     */


    Chartist.getBounds = function (axisLength, highLow, scaleMinSpace, onlyInteger) {
      var i,
          optimizationCounter = 0,
          newMin,
          newMax,
          bounds = {
        high: highLow.high,
        low: highLow.low
      };
      bounds.valueRange = bounds.high - bounds.low;
      bounds.oom = Chartist.orderOfMagnitude(bounds.valueRange);
      bounds.step = Math.pow(10, bounds.oom);
      bounds.min = Math.floor(bounds.low / bounds.step) * bounds.step;
      bounds.max = Math.ceil(bounds.high / bounds.step) * bounds.step;
      bounds.range = bounds.max - bounds.min;
      bounds.numberOfSteps = Math.round(bounds.range / bounds.step); // Optimize scale step by checking if subdivision is possible based on horizontalGridMinSpace
      // If we are already below the scaleMinSpace value we will scale up

      var length = Chartist.projectLength(axisLength, bounds.step, bounds);
      var scaleUp = length < scaleMinSpace;
      var smallestFactor = onlyInteger ? Chartist.rho(bounds.range) : 0; // First check if we should only use integer steps and if step 1 is still larger than scaleMinSpace so we can use 1

      if (onlyInteger && Chartist.projectLength(axisLength, 1, bounds) >= scaleMinSpace) {
        bounds.step = 1;
      } else if (onlyInteger && smallestFactor < bounds.step && Chartist.projectLength(axisLength, smallestFactor, bounds) >= scaleMinSpace) {
        // If step 1 was too small, we can try the smallest factor of range
        // If the smallest factor is smaller than the current bounds.step and the projected length of smallest factor
        // is larger than the scaleMinSpace we should go for it.
        bounds.step = smallestFactor;
      } else {
        // Trying to divide or multiply by 2 and find the best step value
        while (true) {
          if (scaleUp && Chartist.projectLength(axisLength, bounds.step, bounds) <= scaleMinSpace) {
            bounds.step *= 2;
          } else if (!scaleUp && Chartist.projectLength(axisLength, bounds.step / 2, bounds) >= scaleMinSpace) {
            bounds.step /= 2;

            if (onlyInteger && bounds.step % 1 !== 0) {
              bounds.step *= 2;
              break;
            }
          } else {
            break;
          }

          if (optimizationCounter++ > 1000) {
            throw new Error('Exceeded maximum number of iterations while optimizing scale step!');
          }
        }
      }

      var EPSILON = 2.221E-16;
      bounds.step = Math.max(bounds.step, EPSILON);

      function safeIncrement(value, increment) {
        // If increment is too small use *= (1+EPSILON) as a simple nextafter
        if (value === (value += increment)) {
          value *= 1 + (increment > 0 ? EPSILON : -EPSILON);
        }

        return value;
      } // Narrow min and max based on new step


      newMin = bounds.min;
      newMax = bounds.max;

      while (newMin + bounds.step <= bounds.low) {
        newMin = safeIncrement(newMin, bounds.step);
      }

      while (newMax - bounds.step >= bounds.high) {
        newMax = safeIncrement(newMax, -bounds.step);
      }

      bounds.min = newMin;
      bounds.max = newMax;
      bounds.range = bounds.max - bounds.min;
      var values = [];

      for (i = bounds.min; i <= bounds.max; i = safeIncrement(i, bounds.step)) {
        var value = Chartist.roundWithPrecision(i);

        if (value !== values[values.length - 1]) {
          values.push(value);
        }
      }

      bounds.values = values;
      return bounds;
    };
    /**
     * Calculate cartesian coordinates of polar coordinates
     *
     * @memberof Chartist.Core
     * @param {Number} centerX X-axis coordinates of center point of circle segment
     * @param {Number} centerY X-axis coordinates of center point of circle segment
     * @param {Number} radius Radius of circle segment
     * @param {Number} angleInDegrees Angle of circle segment in degrees
     * @return {{x:Number, y:Number}} Coordinates of point on circumference
     */


    Chartist.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      };
    };
    /**
     * Initialize chart drawing rectangle (area where chart is drawn) x1,y1 = bottom left / x2,y2 = top right
     *
     * @memberof Chartist.Core
     * @param {Object} svg The svg element for the chart
     * @param {Object} options The Object that contains all the optional values for the chart
     * @param {Number} [fallbackPadding] The fallback padding if partial padding objects are used
     * @return {Object} The chart rectangles coordinates inside the svg element plus the rectangles measurements
     */


    Chartist.createChartRect = function (svg, options, fallbackPadding) {
      var hasAxis = !!(options.axisX || options.axisY);
      var yAxisOffset = hasAxis ? options.axisY.offset : 0;
      var xAxisOffset = hasAxis ? options.axisX.offset : 0; // If width or height results in invalid value (including 0) we fallback to the unitless settings or even 0

      var width = svg.width() || Chartist.quantity(options.width).value || 0;
      var height = svg.height() || Chartist.quantity(options.height).value || 0;
      var normalizedPadding = Chartist.normalizePadding(options.chartPadding, fallbackPadding); // If settings were to small to cope with offset (legacy) and padding, we'll adjust

      width = Math.max(width, yAxisOffset + normalizedPadding.left + normalizedPadding.right);
      height = Math.max(height, xAxisOffset + normalizedPadding.top + normalizedPadding.bottom);
      var chartRect = {
        padding: normalizedPadding,
        width: function () {
          return this.x2 - this.x1;
        },
        height: function () {
          return this.y1 - this.y2;
        }
      };

      if (hasAxis) {
        if (options.axisX.position === 'start') {
          chartRect.y2 = normalizedPadding.top + xAxisOffset;
          chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
        } else {
          chartRect.y2 = normalizedPadding.top;
          chartRect.y1 = Math.max(height - normalizedPadding.bottom - xAxisOffset, chartRect.y2 + 1);
        }

        if (options.axisY.position === 'start') {
          chartRect.x1 = normalizedPadding.left + yAxisOffset;
          chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
        } else {
          chartRect.x1 = normalizedPadding.left;
          chartRect.x2 = Math.max(width - normalizedPadding.right - yAxisOffset, chartRect.x1 + 1);
        }
      } else {
        chartRect.x1 = normalizedPadding.left;
        chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
        chartRect.y2 = normalizedPadding.top;
        chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
      }

      return chartRect;
    };
    /**
     * Creates a grid line based on a projected value.
     *
     * @memberof Chartist.Core
     * @param position
     * @param index
     * @param axis
     * @param offset
     * @param length
     * @param group
     * @param classes
     * @param eventEmitter
     */


    Chartist.createGrid = function (position, index, axis, offset, length, group, classes, eventEmitter) {
      var positionalData = {};
      positionalData[axis.units.pos + '1'] = position;
      positionalData[axis.units.pos + '2'] = position;
      positionalData[axis.counterUnits.pos + '1'] = offset;
      positionalData[axis.counterUnits.pos + '2'] = offset + length;
      var gridElement = group.elem('line', positionalData, classes.join(' ')); // Event for grid draw

      eventEmitter.emit('draw', Chartist.extend({
        type: 'grid',
        axis: axis,
        index: index,
        group: group,
        element: gridElement
      }, positionalData));
    };
    /**
     * Creates a grid background rect and emits the draw event.
     *
     * @memberof Chartist.Core
     * @param gridGroup
     * @param chartRect
     * @param className
     * @param eventEmitter
     */


    Chartist.createGridBackground = function (gridGroup, chartRect, className, eventEmitter) {
      var gridBackground = gridGroup.elem('rect', {
        x: chartRect.x1,
        y: chartRect.y2,
        width: chartRect.width(),
        height: chartRect.height()
      }, className, true); // Event for grid background draw

      eventEmitter.emit('draw', {
        type: 'gridBackground',
        group: gridGroup,
        element: gridBackground
      });
    };
    /**
     * Creates a label based on a projected value and an axis.
     *
     * @memberof Chartist.Core
     * @param position
     * @param length
     * @param index
     * @param labels
     * @param axis
     * @param axisOffset
     * @param labelOffset
     * @param group
     * @param classes
     * @param useForeignObject
     * @param eventEmitter
     */


    Chartist.createLabel = function (position, length, index, labels, axis, axisOffset, labelOffset, group, classes, useForeignObject, eventEmitter) {
      var labelElement;
      var positionalData = {};
      positionalData[axis.units.pos] = position + labelOffset[axis.units.pos];
      positionalData[axis.counterUnits.pos] = labelOffset[axis.counterUnits.pos];
      positionalData[axis.units.len] = length;
      positionalData[axis.counterUnits.len] = Math.max(0, axisOffset - 10);

      if (useForeignObject) {
        // We need to set width and height explicitly to px as span will not expand with width and height being
        // 100% in all browsers
        var content = document.createElement('span');
        content.className = classes.join(' ');
        content.setAttribute('xmlns', Chartist.namespaces.xhtml);
        content.innerText = labels[index];
        content.style[axis.units.len] = Math.round(positionalData[axis.units.len]) + 'px';
        content.style[axis.counterUnits.len] = Math.round(positionalData[axis.counterUnits.len]) + 'px';
        labelElement = group.foreignObject(content, Chartist.extend({
          style: 'overflow: visible;'
        }, positionalData));
      } else {
        labelElement = group.elem('text', positionalData, classes.join(' ')).text(labels[index]);
      }

      eventEmitter.emit('draw', Chartist.extend({
        type: 'label',
        axis: axis,
        index: index,
        group: group,
        element: labelElement,
        text: labels[index]
      }, positionalData));
    };
    /**
     * Helper to read series specific options from options object. It automatically falls back to the global option if
     * there is no option in the series options.
     *
     * @param {Object} series Series object
     * @param {Object} options Chartist options object
     * @param {string} key The options key that should be used to obtain the options
     * @returns {*}
     */


    Chartist.getSeriesOption = function (series, options, key) {
      if (series.name && options.series && options.series[series.name]) {
        var seriesOptions = options.series[series.name];
        return seriesOptions.hasOwnProperty(key) ? seriesOptions[key] : options[key];
      } else {
        return options[key];
      }
    };
    /**
     * Provides options handling functionality with callback for options changes triggered by responsive options and media query matches
     *
     * @memberof Chartist.Core
     * @param {Object} options Options set by user
     * @param {Array} responsiveOptions Optional functions to add responsive behavior to chart
     * @param {Object} eventEmitter The event emitter that will be used to emit the options changed events
     * @return {Object} The consolidated options object from the defaults, base and matching responsive options
     */


    Chartist.optionsProvider = function (options, responsiveOptions, eventEmitter) {
      var baseOptions = Chartist.extend({}, options),
          currentOptions,
          mediaQueryListeners = [],
          i;

      function updateCurrentOptions(mediaEvent) {
        var previousOptions = currentOptions;
        currentOptions = Chartist.extend({}, baseOptions);

        if (responsiveOptions) {
          for (i = 0; i < responsiveOptions.length; i++) {
            var mql = window.matchMedia(responsiveOptions[i][0]);

            if (mql.matches) {
              currentOptions = Chartist.extend(currentOptions, responsiveOptions[i][1]);
            }
          }
        }

        if (eventEmitter && mediaEvent) {
          eventEmitter.emit('optionsChanged', {
            previousOptions: previousOptions,
            currentOptions: currentOptions
          });
        }
      }

      function removeMediaQueryListeners() {
        mediaQueryListeners.forEach(function (mql) {
          mql.removeListener(updateCurrentOptions);
        });
      }

      if (!window.matchMedia) {
        throw 'window.matchMedia not found! Make sure you\'re using a polyfill.';
      } else if (responsiveOptions) {
        for (i = 0; i < responsiveOptions.length; i++) {
          var mql = window.matchMedia(responsiveOptions[i][0]);
          mql.addListener(updateCurrentOptions);
          mediaQueryListeners.push(mql);
        }
      } // Execute initially without an event argument so we get the correct options


      updateCurrentOptions();
      return {
        removeMediaQueryListeners: removeMediaQueryListeners,
        getCurrentOptions: function getCurrentOptions() {
          return Chartist.extend({}, currentOptions);
        }
      };
    };
    /**
     * Splits a list of coordinates and associated values into segments. Each returned segment contains a pathCoordinates
     * valueData property describing the segment.
     *
     * With the default options, segments consist of contiguous sets of points that do not have an undefined value. Any
     * points with undefined values are discarded.
     *
     * **Options**
     * The following options are used to determine how segments are formed
     * ```javascript
     * var options = {
     *   // If fillHoles is true, undefined values are simply discarded without creating a new segment. Assuming other options are default, this returns single segment.
     *   fillHoles: false,
     *   // If increasingX is true, the coordinates in all segments have strictly increasing x-values.
     *   increasingX: false
     * };
     * ```
     *
     * @memberof Chartist.Core
     * @param {Array} pathCoordinates List of point coordinates to be split in the form [x1, y1, x2, y2 ... xn, yn]
     * @param {Array} values List of associated point values in the form [v1, v2 .. vn]
     * @param {Object} options Options set by user
     * @return {Array} List of segments, each containing a pathCoordinates and valueData property.
     */


    Chartist.splitIntoSegments = function (pathCoordinates, valueData, options) {
      var defaultOptions = {
        increasingX: false,
        fillHoles: false
      };
      options = Chartist.extend({}, defaultOptions, options);
      var segments = [];
      var hole = true;

      for (var i = 0; i < pathCoordinates.length; i += 2) {
        // If this value is a "hole" we set the hole flag
        if (Chartist.getMultiValue(valueData[i / 2].value) === undefined) {
          // if(valueData[i / 2].value === undefined) {
          if (!options.fillHoles) {
            hole = true;
          }
        } else {
          if (options.increasingX && i >= 2 && pathCoordinates[i] <= pathCoordinates[i - 2]) {
            // X is not increasing, so we need to make sure we start a new segment
            hole = true;
          } // If it's a valid value we need to check if we're coming out of a hole and create a new empty segment


          if (hole) {
            segments.push({
              pathCoordinates: [],
              valueData: []
            }); // As we have a valid value now, we are not in a "hole" anymore

            hole = false;
          } // Add to the segment pathCoordinates and valueData


          segments[segments.length - 1].pathCoordinates.push(pathCoordinates[i], pathCoordinates[i + 1]);
          segments[segments.length - 1].valueData.push(valueData[i / 2]);
        }
      }

      return segments;
    };
  })(this || global, Chartist);

  ;
  /**
  * Chartist path interpolation functions.
  *
  * @module Chartist.Interpolation
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    Chartist.Interpolation = {};
    /**
     * This interpolation function does not smooth the path and the result is only containing lines and no curves.
     *
     * @example
     * var chart = new Chartist.Line('.ct-chart', {
     *   labels: [1, 2, 3, 4, 5],
     *   series: [[1, 2, 8, 1, 7]]
     * }, {
     *   lineSmooth: Chartist.Interpolation.none({
     *     fillHoles: false
     *   })
     * });
     *
     *
     * @memberof Chartist.Interpolation
     * @return {Function}
     */

    Chartist.Interpolation.none = function (options) {
      var defaultOptions = {
        fillHoles: false
      };
      options = Chartist.extend({}, defaultOptions, options);
      return function none(pathCoordinates, valueData) {
        var path = new Chartist.Svg.Path();
        var hole = true;

        for (var i = 0; i < pathCoordinates.length; i += 2) {
          var currX = pathCoordinates[i];
          var currY = pathCoordinates[i + 1];
          var currData = valueData[i / 2];

          if (Chartist.getMultiValue(currData.value) !== undefined) {
            if (hole) {
              path.move(currX, currY, false, currData);
            } else {
              path.line(currX, currY, false, currData);
            }

            hole = false;
          } else if (!options.fillHoles) {
            hole = true;
          }
        }

        return path;
      };
    };
    /**
     * Simple smoothing creates horizontal handles that are positioned with a fraction of the length between two data points. You can use the divisor option to specify the amount of smoothing.
     *
     * Simple smoothing can be used instead of `Chartist.Smoothing.cardinal` if you'd like to get rid of the artifacts it produces sometimes. Simple smoothing produces less flowing lines but is accurate by hitting the points and it also doesn't swing below or above the given data point.
     *
     * All smoothing functions within Chartist are factory functions that accept an options parameter. The simple interpolation function accepts one configuration parameter `divisor`, between 1 and ∞, which controls the smoothing characteristics.
     *
     * @example
     * var chart = new Chartist.Line('.ct-chart', {
     *   labels: [1, 2, 3, 4, 5],
     *   series: [[1, 2, 8, 1, 7]]
     * }, {
     *   lineSmooth: Chartist.Interpolation.simple({
     *     divisor: 2,
     *     fillHoles: false
     *   })
     * });
     *
     *
     * @memberof Chartist.Interpolation
     * @param {Object} options The options of the simple interpolation factory function.
     * @return {Function}
     */


    Chartist.Interpolation.simple = function (options) {
      var defaultOptions = {
        divisor: 2,
        fillHoles: false
      };
      options = Chartist.extend({}, defaultOptions, options);
      var d = 1 / Math.max(1, options.divisor);
      return function simple(pathCoordinates, valueData) {
        var path = new Chartist.Svg.Path();
        var prevX, prevY, prevData;

        for (var i = 0; i < pathCoordinates.length; i += 2) {
          var currX = pathCoordinates[i];
          var currY = pathCoordinates[i + 1];
          var length = (currX - prevX) * d;
          var currData = valueData[i / 2];

          if (currData.value !== undefined) {
            if (prevData === undefined) {
              path.move(currX, currY, false, currData);
            } else {
              path.curve(prevX + length, prevY, currX - length, currY, currX, currY, false, currData);
            }

            prevX = currX;
            prevY = currY;
            prevData = currData;
          } else if (!options.fillHoles) {
            prevX = currX = prevData = undefined;
          }
        }

        return path;
      };
    };
    /**
     * Cardinal / Catmull-Rome spline interpolation is the default smoothing function in Chartist. It produces nice results where the splines will always meet the points. It produces some artifacts though when data values are increased or decreased rapidly. The line may not follow a very accurate path and if the line should be accurate this smoothing function does not produce the best results.
     *
     * Cardinal splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
     *
     * All smoothing functions within Chartist are factory functions that accept an options parameter. The cardinal interpolation function accepts one configuration parameter `tension`, between 0 and 1, which controls the smoothing intensity.
     *
     * @example
     * var chart = new Chartist.Line('.ct-chart', {
     *   labels: [1, 2, 3, 4, 5],
     *   series: [[1, 2, 8, 1, 7]]
     * }, {
     *   lineSmooth: Chartist.Interpolation.cardinal({
     *     tension: 1,
     *     fillHoles: false
     *   })
     * });
     *
     * @memberof Chartist.Interpolation
     * @param {Object} options The options of the cardinal factory function.
     * @return {Function}
     */


    Chartist.Interpolation.cardinal = function (options) {
      var defaultOptions = {
        tension: 1,
        fillHoles: false
      };
      options = Chartist.extend({}, defaultOptions, options);
      var t = Math.min(1, Math.max(0, options.tension)),
          c = 1 - t;
      return function cardinal(pathCoordinates, valueData) {
        // First we try to split the coordinates into segments
        // This is necessary to treat "holes" in line charts
        var segments = Chartist.splitIntoSegments(pathCoordinates, valueData, {
          fillHoles: options.fillHoles
        });

        if (!segments.length) {
          // If there were no segments return 'Chartist.Interpolation.none'
          return Chartist.Interpolation.none()([]);
        } else if (segments.length > 1) {
          // If the split resulted in more that one segment we need to interpolate each segment individually and join them
          // afterwards together into a single path.
          var paths = []; // For each segment we will recurse the cardinal function

          segments.forEach(function (segment) {
            paths.push(cardinal(segment.pathCoordinates, segment.valueData));
          }); // Join the segment path data into a single path and return

          return Chartist.Svg.Path.join(paths);
        } else {
          // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
          // segment
          pathCoordinates = segments[0].pathCoordinates;
          valueData = segments[0].valueData; // If less than two points we need to fallback to no smoothing

          if (pathCoordinates.length <= 4) {
            return Chartist.Interpolation.none()(pathCoordinates, valueData);
          }

          var path = new Chartist.Svg.Path().move(pathCoordinates[0], pathCoordinates[1], false, valueData[0]),
              z;

          for (var i = 0, iLen = pathCoordinates.length; iLen - 2 * !z > i; i += 2) {
            var p = [{
              x: +pathCoordinates[i - 2],
              y: +pathCoordinates[i - 1]
            }, {
              x: +pathCoordinates[i],
              y: +pathCoordinates[i + 1]
            }, {
              x: +pathCoordinates[i + 2],
              y: +pathCoordinates[i + 3]
            }, {
              x: +pathCoordinates[i + 4],
              y: +pathCoordinates[i + 5]
            }];

            if (z) {
              if (!i) {
                p[0] = {
                  x: +pathCoordinates[iLen - 2],
                  y: +pathCoordinates[iLen - 1]
                };
              } else if (iLen - 4 === i) {
                p[3] = {
                  x: +pathCoordinates[0],
                  y: +pathCoordinates[1]
                };
              } else if (iLen - 2 === i) {
                p[2] = {
                  x: +pathCoordinates[0],
                  y: +pathCoordinates[1]
                };
                p[3] = {
                  x: +pathCoordinates[2],
                  y: +pathCoordinates[3]
                };
              }
            } else {
              if (iLen - 4 === i) {
                p[3] = p[2];
              } else if (!i) {
                p[0] = {
                  x: +pathCoordinates[i],
                  y: +pathCoordinates[i + 1]
                };
              }
            }

            path.curve(t * (-p[0].x + 6 * p[1].x + p[2].x) / 6 + c * p[2].x, t * (-p[0].y + 6 * p[1].y + p[2].y) / 6 + c * p[2].y, t * (p[1].x + 6 * p[2].x - p[3].x) / 6 + c * p[2].x, t * (p[1].y + 6 * p[2].y - p[3].y) / 6 + c * p[2].y, p[2].x, p[2].y, false, valueData[(i + 2) / 2]);
          }

          return path;
        }
      };
    };
    /**
     * Monotone Cubic spline interpolation produces a smooth curve which preserves monotonicity. Unlike cardinal splines, the curve will not extend beyond the range of y-values of the original data points.
     *
     * Monotone Cubic splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
     *
     * The x-values of subsequent points must be increasing to fit a Monotone Cubic spline. If this condition is not met for a pair of adjacent points, then there will be a break in the curve between those data points.
     *
     * All smoothing functions within Chartist are factory functions that accept an options parameter.
     *
     * @example
     * var chart = new Chartist.Line('.ct-chart', {
     *   labels: [1, 2, 3, 4, 5],
     *   series: [[1, 2, 8, 1, 7]]
     * }, {
     *   lineSmooth: Chartist.Interpolation.monotoneCubic({
     *     fillHoles: false
     *   })
     * });
     *
     * @memberof Chartist.Interpolation
     * @param {Object} options The options of the monotoneCubic factory function.
     * @return {Function}
     */


    Chartist.Interpolation.monotoneCubic = function (options) {
      var defaultOptions = {
        fillHoles: false
      };
      options = Chartist.extend({}, defaultOptions, options);
      return function monotoneCubic(pathCoordinates, valueData) {
        // First we try to split the coordinates into segments
        // This is necessary to treat "holes" in line charts
        var segments = Chartist.splitIntoSegments(pathCoordinates, valueData, {
          fillHoles: options.fillHoles,
          increasingX: true
        });

        if (!segments.length) {
          // If there were no segments return 'Chartist.Interpolation.none'
          return Chartist.Interpolation.none()([]);
        } else if (segments.length > 1) {
          // If the split resulted in more that one segment we need to interpolate each segment individually and join them
          // afterwards together into a single path.
          var paths = []; // For each segment we will recurse the monotoneCubic fn function

          segments.forEach(function (segment) {
            paths.push(monotoneCubic(segment.pathCoordinates, segment.valueData));
          }); // Join the segment path data into a single path and return

          return Chartist.Svg.Path.join(paths);
        } else {
          // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
          // segment
          pathCoordinates = segments[0].pathCoordinates;
          valueData = segments[0].valueData; // If less than three points we need to fallback to no smoothing

          if (pathCoordinates.length <= 4) {
            return Chartist.Interpolation.none()(pathCoordinates, valueData);
          }

          var xs = [],
              ys = [],
              i,
              n = pathCoordinates.length / 2,
              ms = [],
              ds = [],
              dys = [],
              dxs = [],
              path; // Populate x and y coordinates into separate arrays, for readability

          for (i = 0; i < n; i++) {
            xs[i] = pathCoordinates[i * 2];
            ys[i] = pathCoordinates[i * 2 + 1];
          } // Calculate deltas and derivative


          for (i = 0; i < n - 1; i++) {
            dys[i] = ys[i + 1] - ys[i];
            dxs[i] = xs[i + 1] - xs[i];
            ds[i] = dys[i] / dxs[i];
          } // Determine desired slope (m) at each point using Fritsch-Carlson method
          // See: http://math.stackexchange.com/questions/45218/implementation-of-monotone-cubic-interpolation


          ms[0] = ds[0];
          ms[n - 1] = ds[n - 2];

          for (i = 1; i < n - 1; i++) {
            if (ds[i] === 0 || ds[i - 1] === 0 || ds[i - 1] > 0 !== ds[i] > 0) {
              ms[i] = 0;
            } else {
              ms[i] = 3 * (dxs[i - 1] + dxs[i]) / ((2 * dxs[i] + dxs[i - 1]) / ds[i - 1] + (dxs[i] + 2 * dxs[i - 1]) / ds[i]);

              if (!isFinite(ms[i])) {
                ms[i] = 0;
              }
            }
          } // Now build a path from the slopes


          path = new Chartist.Svg.Path().move(xs[0], ys[0], false, valueData[0]);

          for (i = 0; i < n - 1; i++) {
            path.curve( // First control point
            xs[i] + dxs[i] / 3, ys[i] + ms[i] * dxs[i] / 3, // Second control point
            xs[i + 1] - dxs[i] / 3, ys[i + 1] - ms[i + 1] * dxs[i] / 3, // End point
            xs[i + 1], ys[i + 1], false, valueData[i + 1]);
          }

          return path;
        }
      };
    };
    /**
     * Step interpolation will cause the line chart to move in steps rather than diagonal or smoothed lines. This interpolation will create additional points that will also be drawn when the `showPoint` option is enabled.
     *
     * All smoothing functions within Chartist are factory functions that accept an options parameter. The step interpolation function accepts one configuration parameter `postpone`, that can be `true` or `false`. The default value is `true` and will cause the step to occur where the value actually changes. If a different behaviour is needed where the step is shifted to the left and happens before the actual value, this option can be set to `false`.
     *
     * @example
     * var chart = new Chartist.Line('.ct-chart', {
     *   labels: [1, 2, 3, 4, 5],
     *   series: [[1, 2, 8, 1, 7]]
     * }, {
     *   lineSmooth: Chartist.Interpolation.step({
     *     postpone: true,
     *     fillHoles: false
     *   })
     * });
     *
     * @memberof Chartist.Interpolation
     * @param options
     * @returns {Function}
     */


    Chartist.Interpolation.step = function (options) {
      var defaultOptions = {
        postpone: true,
        fillHoles: false
      };
      options = Chartist.extend({}, defaultOptions, options);
      return function step(pathCoordinates, valueData) {
        var path = new Chartist.Svg.Path();
        var prevX, prevY, prevData;

        for (var i = 0; i < pathCoordinates.length; i += 2) {
          var currX = pathCoordinates[i];
          var currY = pathCoordinates[i + 1];
          var currData = valueData[i / 2]; // If the current point is also not a hole we can draw the step lines

          if (currData.value !== undefined) {
            if (prevData === undefined) {
              path.move(currX, currY, false, currData);
            } else {
              if (options.postpone) {
                // If postponed we should draw the step line with the value of the previous value
                path.line(currX, prevY, false, prevData);
              } else {
                // If not postponed we should draw the step line with the value of the current value
                path.line(prevX, currY, false, currData);
              } // Line to the actual point (this should only be a Y-Axis movement


              path.line(currX, currY, false, currData);
            }

            prevX = currX;
            prevY = currY;
            prevData = currData;
          } else if (!options.fillHoles) {
            prevX = prevY = prevData = undefined;
          }
        }

        return path;
      };
    };
  })(this || global, Chartist);

  ;
  /**
  * A very basic event module that helps to generate and catch events.
  *
  * @module Chartist.Event
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    Chartist.EventEmitter = function () {
      var handlers = [];
      /**
       * Add an event handler for a specific event
       *
       * @memberof Chartist.Event
       * @param {String} event The event name
       * @param {Function} handler A event handler function
       */

      function addEventHandler(event, handler) {
        handlers[event] = handlers[event] || [];
        handlers[event].push(handler);
      }
      /**
       * Remove an event handler of a specific event name or remove all event handlers for a specific event.
       *
       * @memberof Chartist.Event
       * @param {String} event The event name where a specific or all handlers should be removed
       * @param {Function} [handler] An optional event handler function. If specified only this specific handler will be removed and otherwise all handlers are removed.
       */


      function removeEventHandler(event, handler) {
        // Only do something if there are event handlers with this name existing
        if (handlers[event]) {
          // If handler is set we will look for a specific handler and only remove this
          if (handler) {
            handlers[event].splice(handlers[event].indexOf(handler), 1);

            if (handlers[event].length === 0) {
              delete handlers[event];
            }
          } else {
            // If no handler is specified we remove all handlers for this event
            delete handlers[event];
          }
        }
      }
      /**
       * Use this function to emit an event. All handlers that are listening for this event will be triggered with the data parameter.
       *
       * @memberof Chartist.Event
       * @param {String} event The event name that should be triggered
       * @param {*} data Arbitrary data that will be passed to the event handler callback functions
       */


      function emit(event, data) {
        // Only do something if there are event handlers with this name existing
        if (handlers[event]) {
          handlers[event].forEach(function (handler) {
            handler(data);
          });
        } // Emit event to star event handlers


        if (handlers['*']) {
          handlers['*'].forEach(function (starHandler) {
            starHandler(event, data);
          });
        }
      }

      return {
        addEventHandler: addEventHandler,
        removeEventHandler: removeEventHandler,
        emit: emit
      };
    };
  })(this || global, Chartist);

  ;
  /**
  * This module provides some basic prototype inheritance utilities.
  *
  * @module Chartist.Class
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    function listToArray(list) {
      var arr = [];

      if (list.length) {
        for (var i = 0; i < list.length; i++) {
          arr.push(list[i]);
        }
      }

      return arr;
    }
    /**
     * Method to extend from current prototype.
     *
     * @memberof Chartist.Class
     * @param {Object} properties The object that serves as definition for the prototype that gets created for the new class. This object should always contain a constructor property that is the desired constructor for the newly created class.
     * @param {Object} [superProtoOverride] By default extens will use the current class prototype or Chartist.class. With this parameter you can specify any super prototype that will be used.
     * @return {Function} Constructor function of the new class
     *
     * @example
     * var Fruit = Class.extend({
       * color: undefined,
       *   sugar: undefined,
       *
       *   constructor: function(color, sugar) {
       *     this.color = color;
       *     this.sugar = sugar;
       *   },
       *
       *   eat: function() {
       *     this.sugar = 0;
       *     return this;
       *   }
       * });
     *
     * var Banana = Fruit.extend({
       *   length: undefined,
       *
       *   constructor: function(length, sugar) {
       *     Banana.super.constructor.call(this, 'Yellow', sugar);
       *     this.length = length;
       *   }
       * });
     *
     * var banana = new Banana(20, 40);
     * console.log('banana instanceof Fruit', banana instanceof Fruit);
     * console.log('Fruit is prototype of banana', Fruit.prototype.isPrototypeOf(banana));
     * console.log('bananas prototype is Fruit', Object.getPrototypeOf(banana) === Fruit.prototype);
     * console.log(banana.sugar);
     * console.log(banana.eat().sugar);
     * console.log(banana.color);
     */


    function extend(properties, superProtoOverride) {
      var superProto = superProtoOverride || this.prototype || Chartist.Class;
      var proto = Object.create(superProto);
      Chartist.Class.cloneDefinitions(proto, properties);

      var constr = function () {
        var fn = proto.constructor || function () {},
            instance; // If this is linked to the Chartist namespace the constructor was not called with new
        // To provide a fallback we will instantiate here and return the instance


        instance = this === Chartist ? Object.create(proto) : this;
        fn.apply(instance, Array.prototype.slice.call(arguments, 0)); // If this constructor was not called with new we need to return the instance
        // This will not harm when the constructor has been called with new as the returned value is ignored

        return instance;
      };

      constr.prototype = proto;
      constr.super = superProto;
      constr.extend = this.extend;
      return constr;
    } // Variable argument list clones args > 0 into args[0] and retruns modified args[0]


    function cloneDefinitions() {
      var args = listToArray(arguments);
      var target = args[0];
      args.splice(1, args.length - 1).forEach(function (source) {
        Object.getOwnPropertyNames(source).forEach(function (propName) {
          // If this property already exist in target we delete it first
          delete target[propName]; // Define the property with the descriptor from source

          Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
        });
      });
      return target;
    }

    Chartist.Class = {
      extend: extend,
      cloneDefinitions: cloneDefinitions
    };
  })(this || global, Chartist);

  ;
  /**
  * Base for all chart types. The methods in Chartist.Base are inherited to all chart types.
  *
  * @module Chartist.Base
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    var window = globalRoot.window; // TODO: Currently we need to re-draw the chart on window resize. This is usually very bad and will affect performance.
    // This is done because we can't work with relative coordinates when drawing the chart because SVG Path does not
    // work with relative positions yet. We need to check if we can do a viewBox hack to switch to percentage.
    // See http://mozilla.6506.n7.nabble.com/Specyfing-paths-with-percentages-unit-td247474.html
    // Update: can be done using the above method tested here: http://codepen.io/gionkunz/pen/KDvLj
    // The problem is with the label offsets that can't be converted into percentage and affecting the chart container

    /**
     * Updates the chart which currently does a full reconstruction of the SVG DOM
     *
     * @param {Object} [data] Optional data you'd like to set for the chart before it will update. If not specified the update method will use the data that is already configured with the chart.
     * @param {Object} [options] Optional options you'd like to add to the previous options for the chart before it will update. If not specified the update method will use the options that have been already configured with the chart.
     * @param {Boolean} [override] If set to true, the passed options will be used to extend the options that have been configured already. Otherwise the chart default options will be used as the base
     * @memberof Chartist.Base
     */

    function update(data, options, override) {
      if (data) {
        this.data = data || {};
        this.data.labels = this.data.labels || [];
        this.data.series = this.data.series || []; // Event for data transformation that allows to manipulate the data before it gets rendered in the charts

        this.eventEmitter.emit('data', {
          type: 'update',
          data: this.data
        });
      }

      if (options) {
        this.options = Chartist.extend({}, override ? this.options : this.defaultOptions, options); // If chartist was not initialized yet, we just set the options and leave the rest to the initialization
        // Otherwise we re-create the optionsProvider at this point

        if (!this.initializeTimeoutId) {
          this.optionsProvider.removeMediaQueryListeners();
          this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
        }
      } // Only re-created the chart if it has been initialized yet


      if (!this.initializeTimeoutId) {
        this.createChart(this.optionsProvider.getCurrentOptions());
      } // Return a reference to the chart object to chain up calls


      return this;
    }
    /**
     * This method can be called on the API object of each chart and will un-register all event listeners that were added to other components. This currently includes a window.resize listener as well as media query listeners if any responsive options have been provided. Use this function if you need to destroy and recreate Chartist charts dynamically.
     *
     * @memberof Chartist.Base
     */


    function detach() {
      // Only detach if initialization already occurred on this chart. If this chart still hasn't initialized (therefore
      // the initializationTimeoutId is still a valid timeout reference, we will clear the timeout
      if (!this.initializeTimeoutId) {
        window.removeEventListener('resize', this.resizeListener);
        this.optionsProvider.removeMediaQueryListeners();
      } else {
        window.clearTimeout(this.initializeTimeoutId);
      }

      return this;
    }
    /**
     * Use this function to register event handlers. The handler callbacks are synchronous and will run in the main thread rather than the event loop.
     *
     * @memberof Chartist.Base
     * @param {String} event Name of the event. Check the examples for supported events.
     * @param {Function} handler The handler function that will be called when an event with the given name was emitted. This function will receive a data argument which contains event data. See the example for more details.
     */


    function on(event, handler) {
      this.eventEmitter.addEventHandler(event, handler);
      return this;
    }
    /**
     * Use this function to un-register event handlers. If the handler function parameter is omitted all handlers for the given event will be un-registered.
     *
     * @memberof Chartist.Base
     * @param {String} event Name of the event for which a handler should be removed
     * @param {Function} [handler] The handler function that that was previously used to register a new event handler. This handler will be removed from the event handler list. If this parameter is omitted then all event handlers for the given event are removed from the list.
     */


    function off(event, handler) {
      this.eventEmitter.removeEventHandler(event, handler);
      return this;
    }

    function initialize() {
      // Add window resize listener that re-creates the chart
      window.addEventListener('resize', this.resizeListener); // Obtain current options based on matching media queries (if responsive options are given)
      // This will also register a listener that is re-creating the chart based on media changes

      this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter); // Register options change listener that will trigger a chart update

      this.eventEmitter.addEventHandler('optionsChanged', function () {
        this.update();
      }.bind(this)); // Before the first chart creation we need to register us with all plugins that are configured
      // Initialize all relevant plugins with our chart object and the plugin options specified in the config

      if (this.options.plugins) {
        this.options.plugins.forEach(function (plugin) {
          if (plugin instanceof Array) {
            plugin[0](this, plugin[1]);
          } else {
            plugin(this);
          }
        }.bind(this));
      } // Event for data transformation that allows to manipulate the data before it gets rendered in the charts


      this.eventEmitter.emit('data', {
        type: 'initial',
        data: this.data
      }); // Create the first chart

      this.createChart(this.optionsProvider.getCurrentOptions()); // As chart is initialized from the event loop now we can reset our timeout reference
      // This is important if the chart gets initialized on the same element twice

      this.initializeTimeoutId = undefined;
    }
    /**
     * Constructor of chart base class.
     *
     * @param query
     * @param data
     * @param defaultOptions
     * @param options
     * @param responsiveOptions
     * @constructor
     */


    function Base(query, data, defaultOptions, options, responsiveOptions) {
      this.container = Chartist.querySelector(query);
      this.data = data || {};
      this.data.labels = this.data.labels || [];
      this.data.series = this.data.series || [];
      this.defaultOptions = defaultOptions;
      this.options = options;
      this.responsiveOptions = responsiveOptions;
      this.eventEmitter = Chartist.EventEmitter();
      this.supportsForeignObject = Chartist.Svg.isSupported('Extensibility');
      this.supportsAnimations = Chartist.Svg.isSupported('AnimationEventsAttribute');

      this.resizeListener = function resizeListener() {
        this.update();
      }.bind(this);

      if (this.container) {
        // If chartist was already initialized in this container we are detaching all event listeners first
        if (this.container.__chartist__) {
          this.container.__chartist__.detach();
        }

        this.container.__chartist__ = this;
      } // Using event loop for first draw to make it possible to register event listeners in the same call stack where
      // the chart was created.


      this.initializeTimeoutId = setTimeout(initialize.bind(this), 0);
    } // Creating the chart base class


    Chartist.Base = Chartist.Class.extend({
      constructor: Base,
      optionsProvider: undefined,
      container: undefined,
      svg: undefined,
      eventEmitter: undefined,
      createChart: function () {
        throw new Error('Base chart type can\'t be instantiated!');
      },
      update: update,
      detach: detach,
      on: on,
      off: off,
      version: Chartist.version,
      supportsForeignObject: false
    });
  })(this || global, Chartist);

  ;
  /**
  * Chartist SVG module for simple SVG DOM abstraction
  *
  * @module Chartist.Svg
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    var document = globalRoot.document;
    /**
     * Chartist.Svg creates a new SVG object wrapper with a starting element. You can use the wrapper to fluently create sub-elements and modify them.
     *
     * @memberof Chartist.Svg
     * @constructor
     * @param {String|Element} name The name of the SVG element to create or an SVG dom element which should be wrapped into Chartist.Svg
     * @param {Object} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
     * @param {String} className This class or class list will be added to the SVG element
     * @param {Object} parent The parent SVG wrapper object where this newly created wrapper and it's element will be attached to as child
     * @param {Boolean} insertFirst If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
     */

    function Svg(name, attributes, className, parent, insertFirst) {
      // If Svg is getting called with an SVG element we just return the wrapper
      if (name instanceof Element) {
        this._node = name;
      } else {
        this._node = document.createElementNS(Chartist.namespaces.svg, name); // If this is an SVG element created then custom namespace

        if (name === 'svg') {
          this.attr({
            'xmlns:ct': Chartist.namespaces.ct
          });
        }
      }

      if (attributes) {
        this.attr(attributes);
      }

      if (className) {
        this.addClass(className);
      }

      if (parent) {
        if (insertFirst && parent._node.firstChild) {
          parent._node.insertBefore(this._node, parent._node.firstChild);
        } else {
          parent._node.appendChild(this._node);
        }
      }
    }
    /**
     * Set attributes on the current SVG element of the wrapper you're currently working on.
     *
     * @memberof Chartist.Svg
     * @param {Object|String} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added. If this parameter is a String then the function is used as a getter and will return the attribute value.
     * @param {String} [ns] If specified, the attribute will be obtained using getAttributeNs. In order to write namepsaced attributes you can use the namespace:attribute notation within the attributes object.
     * @return {Object|String} The current wrapper object will be returned so it can be used for chaining or the attribute value if used as getter function.
     */


    function attr(attributes, ns) {
      if (typeof attributes === 'string') {
        if (ns) {
          return this._node.getAttributeNS(ns, attributes);
        } else {
          return this._node.getAttribute(attributes);
        }
      }

      Object.keys(attributes).forEach(function (key) {
        // If the attribute value is undefined we can skip this one
        if (attributes[key] === undefined) {
          return;
        }

        if (key.indexOf(':') !== -1) {
          var namespacedAttribute = key.split(':');

          this._node.setAttributeNS(Chartist.namespaces[namespacedAttribute[0]], key, attributes[key]);
        } else {
          this._node.setAttribute(key, attributes[key]);
        }
      }.bind(this));
      return this;
    }
    /**
     * Create a new SVG element whose wrapper object will be selected for further operations. This way you can also create nested groups easily.
     *
     * @memberof Chartist.Svg
     * @param {String} name The name of the SVG element that should be created as child element of the currently selected element wrapper
     * @param {Object} [attributes] An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
     * @param {String} [className] This class or class list will be added to the SVG element
     * @param {Boolean} [insertFirst] If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
     * @return {Chartist.Svg} Returns a Chartist.Svg wrapper object that can be used to modify the containing SVG data
     */


    function elem(name, attributes, className, insertFirst) {
      return new Chartist.Svg(name, attributes, className, this, insertFirst);
    }
    /**
     * Returns the parent Chartist.SVG wrapper object
     *
     * @memberof Chartist.Svg
     * @return {Chartist.Svg} Returns a Chartist.Svg wrapper around the parent node of the current node. If the parent node is not existing or it's not an SVG node then this function will return null.
     */


    function parent() {
      return this._node.parentNode instanceof SVGElement ? new Chartist.Svg(this._node.parentNode) : null;
    }
    /**
     * This method returns a Chartist.Svg wrapper around the root SVG element of the current tree.
     *
     * @memberof Chartist.Svg
     * @return {Chartist.Svg} The root SVG element wrapped in a Chartist.Svg element
     */


    function root() {
      var node = this._node;

      while (node.nodeName !== 'svg') {
        node = node.parentNode;
      }

      return new Chartist.Svg(node);
    }
    /**
     * Find the first child SVG element of the current element that matches a CSS selector. The returned object is a Chartist.Svg wrapper.
     *
     * @memberof Chartist.Svg
     * @param {String} selector A CSS selector that is used to query for child SVG elements
     * @return {Chartist.Svg} The SVG wrapper for the element found or null if no element was found
     */


    function querySelector(selector) {
      var foundNode = this._node.querySelector(selector);

      return foundNode ? new Chartist.Svg(foundNode) : null;
    }
    /**
     * Find the all child SVG elements of the current element that match a CSS selector. The returned object is a Chartist.Svg.List wrapper.
     *
     * @memberof Chartist.Svg
     * @param {String} selector A CSS selector that is used to query for child SVG elements
     * @return {Chartist.Svg.List} The SVG wrapper list for the element found or null if no element was found
     */


    function querySelectorAll(selector) {
      var foundNodes = this._node.querySelectorAll(selector);

      return foundNodes.length ? new Chartist.Svg.List(foundNodes) : null;
    }
    /**
     * Returns the underlying SVG node for the current element.
     *
     * @memberof Chartist.Svg
     * @returns {Node}
     */


    function getNode() {
      return this._node;
    }
    /**
     * This method creates a foreignObject (see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject) that allows to embed HTML content into a SVG graphic. With the help of foreignObjects you can enable the usage of regular HTML elements inside of SVG where they are subject for SVG positioning and transformation but the Browser will use the HTML rendering capabilities for the containing DOM.
     *
     * @memberof Chartist.Svg
     * @param {Node|String} content The DOM Node, or HTML string that will be converted to a DOM Node, that is then placed into and wrapped by the foreignObject
     * @param {String} [attributes] An object with properties that will be added as attributes to the foreignObject element that is created. Attributes with undefined values will not be added.
     * @param {String} [className] This class or class list will be added to the SVG element
     * @param {Boolean} [insertFirst] Specifies if the foreignObject should be inserted as first child
     * @return {Chartist.Svg} New wrapper object that wraps the foreignObject element
     */


    function foreignObject(content, attributes, className, insertFirst) {
      // If content is string then we convert it to DOM
      // TODO: Handle case where content is not a string nor a DOM Node
      if (typeof content === 'string') {
        var container = document.createElement('div');
        container.innerHTML = content;
        content = container.firstChild;
      } // Adding namespace to content element


      content.setAttribute('xmlns', Chartist.namespaces.xmlns); // Creating the foreignObject without required extension attribute (as described here
      // http://www.w3.org/TR/SVG/extend.html#ForeignObjectElement)

      var fnObj = this.elem('foreignObject', attributes, className, insertFirst); // Add content to foreignObjectElement

      fnObj._node.appendChild(content);

      return fnObj;
    }
    /**
     * This method adds a new text element to the current Chartist.Svg wrapper.
     *
     * @memberof Chartist.Svg
     * @param {String} t The text that should be added to the text element that is created
     * @return {Chartist.Svg} The same wrapper object that was used to add the newly created element
     */


    function text(t) {
      this._node.appendChild(document.createTextNode(t));

      return this;
    }
    /**
     * This method will clear all child nodes of the current wrapper object.
     *
     * @memberof Chartist.Svg
     * @return {Chartist.Svg} The same wrapper object that got emptied
     */


    function empty() {
      while (this._node.firstChild) {
        this._node.removeChild(this._node.firstChild);
      }

      return this;
    }
    /**
     * This method will cause the current wrapper to remove itself from its parent wrapper. Use this method if you'd like to get rid of an element in a given DOM structure.
     *
     * @memberof Chartist.Svg
     * @return {Chartist.Svg} The parent wrapper object of the element that got removed
     */


    function remove() {
      this._node.parentNode.removeChild(this._node);

      return this.parent();
    }
    /**
     * This method will replace the element with a new element that can be created outside of the current DOM.
     *
     * @memberof Chartist.Svg
     * @param {Chartist.Svg} newElement The new Chartist.Svg object that will be used to replace the current wrapper object
     * @return {Chartist.Svg} The wrapper of the new element
     */


    function replace(newElement) {
      this._node.parentNode.replaceChild(newElement._node, this._node);

      return newElement;
    }
    /**
     * This method will append an element to the current element as a child.
     *
     * @memberof Chartist.Svg
     * @param {Chartist.Svg} element The Chartist.Svg element that should be added as a child
     * @param {Boolean} [insertFirst] Specifies if the element should be inserted as first child
     * @return {Chartist.Svg} The wrapper of the appended object
     */


    function append(element, insertFirst) {
      if (insertFirst && this._node.firstChild) {
        this._node.insertBefore(element._node, this._node.firstChild);
      } else {
        this._node.appendChild(element._node);
      }

      return this;
    }
    /**
     * Returns an array of class names that are attached to the current wrapper element. This method can not be chained further.
     *
     * @memberof Chartist.Svg
     * @return {Array} A list of classes or an empty array if there are no classes on the current element
     */


    function classes() {
      return this._node.getAttribute('class') ? this._node.getAttribute('class').trim().split(/\s+/) : [];
    }
    /**
     * Adds one or a space separated list of classes to the current element and ensures the classes are only existing once.
     *
     * @memberof Chartist.Svg
     * @param {String} names A white space separated list of class names
     * @return {Chartist.Svg} The wrapper of the current element
     */


    function addClass(names) {
      this._node.setAttribute('class', this.classes(this._node).concat(names.trim().split(/\s+/)).filter(function (elem, pos, self) {
        return self.indexOf(elem) === pos;
      }).join(' '));

      return this;
    }
    /**
     * Removes one or a space separated list of classes from the current element.
     *
     * @memberof Chartist.Svg
     * @param {String} names A white space separated list of class names
     * @return {Chartist.Svg} The wrapper of the current element
     */


    function removeClass(names) {
      var removedClasses = names.trim().split(/\s+/);

      this._node.setAttribute('class', this.classes(this._node).filter(function (name) {
        return removedClasses.indexOf(name) === -1;
      }).join(' '));

      return this;
    }
    /**
     * Removes all classes from the current element.
     *
     * @memberof Chartist.Svg
     * @return {Chartist.Svg} The wrapper of the current element
     */


    function removeAllClasses() {
      this._node.setAttribute('class', '');

      return this;
    }
    /**
     * Get element height using `getBoundingClientRect`
     *
     * @memberof Chartist.Svg
     * @return {Number} The elements height in pixels
     */


    function height() {
      return this._node.getBoundingClientRect().height;
    }
    /**
     * Get element width using `getBoundingClientRect`
     *
     * @memberof Chartist.Core
     * @return {Number} The elements width in pixels
     */


    function width() {
      return this._node.getBoundingClientRect().width;
    }
    /**
     * The animate function lets you animate the current element with SMIL animations. You can add animations for multiple attributes at the same time by using an animation definition object. This object should contain SMIL animation attributes. Please refer to http://www.w3.org/TR/SVG/animate.html for a detailed specification about the available animation attributes. Additionally an easing property can be passed in the animation definition object. This can be a string with a name of an easing function in `Chartist.Svg.Easing` or an array with four numbers specifying a cubic Bézier curve.
     * **An animations object could look like this:**
     * ```javascript
     * element.animate({
     *   opacity: {
     *     dur: 1000,
     *     from: 0,
     *     to: 1
     *   },
     *   x1: {
     *     dur: '1000ms',
     *     from: 100,
     *     to: 200,
     *     easing: 'easeOutQuart'
     *   },
     *   y1: {
     *     dur: '2s',
     *     from: 0,
     *     to: 100
     *   }
     * });
     * ```
     * **Automatic unit conversion**
     * For the `dur` and the `begin` animate attribute you can also omit a unit by passing a number. The number will automatically be converted to milli seconds.
     * **Guided mode**
     * The default behavior of SMIL animations with offset using the `begin` attribute is that the attribute will keep it's original value until the animation starts. Mostly this behavior is not desired as you'd like to have your element attributes already initialized with the animation `from` value even before the animation starts. Also if you don't specify `fill="freeze"` on an animate element or if you delete the animation after it's done (which is done in guided mode) the attribute will switch back to the initial value. This behavior is also not desired when performing simple one-time animations. For one-time animations you'd want to trigger animations immediately instead of relative to the document begin time. That's why in guided mode Chartist.Svg will also use the `begin` property to schedule a timeout and manually start the animation after the timeout. If you're using multiple SMIL definition objects for an attribute (in an array), guided mode will be disabled for this attribute, even if you explicitly enabled it.
     * If guided mode is enabled the following behavior is added:
     * - Before the animation starts (even when delayed with `begin`) the animated attribute will be set already to the `from` value of the animation
     * - `begin` is explicitly set to `indefinite` so it can be started manually without relying on document begin time (creation)
     * - The animate element will be forced to use `fill="freeze"`
     * - The animation will be triggered with `beginElement()` in a timeout where `begin` of the definition object is interpreted in milli seconds. If no `begin` was specified the timeout is triggered immediately.
     * - After the animation the element attribute value will be set to the `to` value of the animation
     * - The animate element is deleted from the DOM
     *
     * @memberof Chartist.Svg
     * @param {Object} animations An animations object where the property keys are the attributes you'd like to animate. The properties should be objects again that contain the SMIL animation attributes (usually begin, dur, from, and to). The property begin and dur is auto converted (see Automatic unit conversion). You can also schedule multiple animations for the same attribute by passing an Array of SMIL definition objects. Attributes that contain an array of SMIL definition objects will not be executed in guided mode.
     * @param {Boolean} guided Specify if guided mode should be activated for this animation (see Guided mode). If not otherwise specified, guided mode will be activated.
     * @param {Object} eventEmitter If specified, this event emitter will be notified when an animation starts or ends.
     * @return {Chartist.Svg} The current element where the animation was added
     */


    function animate(animations, guided, eventEmitter) {
      if (guided === undefined) {
        guided = true;
      }

      Object.keys(animations).forEach(function createAnimateForAttributes(attribute) {
        function createAnimate(animationDefinition, guided) {
          var attributeProperties = {},
              animate,
              timeout,
              easing; // Check if an easing is specified in the definition object and delete it from the object as it will not
          // be part of the animate element attributes.

          if (animationDefinition.easing) {
            // If already an easing Bézier curve array we take it or we lookup a easing array in the Easing object
            easing = animationDefinition.easing instanceof Array ? animationDefinition.easing : Chartist.Svg.Easing[animationDefinition.easing];
            delete animationDefinition.easing;
          } // If numeric dur or begin was provided we assume milli seconds


          animationDefinition.begin = Chartist.ensureUnit(animationDefinition.begin, 'ms');
          animationDefinition.dur = Chartist.ensureUnit(animationDefinition.dur, 'ms');

          if (easing) {
            animationDefinition.calcMode = 'spline';
            animationDefinition.keySplines = easing.join(' ');
            animationDefinition.keyTimes = '0;1';
          } // Adding "fill: freeze" if we are in guided mode and set initial attribute values


          if (guided) {
            animationDefinition.fill = 'freeze'; // Animated property on our element should already be set to the animation from value in guided mode

            attributeProperties[attribute] = animationDefinition.from;
            this.attr(attributeProperties); // In guided mode we also set begin to indefinite so we can trigger the start manually and put the begin
            // which needs to be in ms aside

            timeout = Chartist.quantity(animationDefinition.begin || 0).value;
            animationDefinition.begin = 'indefinite';
          }

          animate = this.elem('animate', Chartist.extend({
            attributeName: attribute
          }, animationDefinition));

          if (guided) {
            // If guided we take the value that was put aside in timeout and trigger the animation manually with a timeout
            setTimeout(function () {
              // If beginElement fails we set the animated attribute to the end position and remove the animate element
              // This happens if the SMIL ElementTimeControl interface is not supported or any other problems occured in
              // the browser. (Currently FF 34 does not support animate elements in foreignObjects)
              try {
                animate._node.beginElement();
              } catch (err) {
                // Set animated attribute to current animated value
                attributeProperties[attribute] = animationDefinition.to;
                this.attr(attributeProperties); // Remove the animate element as it's no longer required

                animate.remove();
              }
            }.bind(this), timeout);
          }

          if (eventEmitter) {
            animate._node.addEventListener('beginEvent', function handleBeginEvent() {
              eventEmitter.emit('animationBegin', {
                element: this,
                animate: animate._node,
                params: animationDefinition
              });
            }.bind(this));
          }

          animate._node.addEventListener('endEvent', function handleEndEvent() {
            if (eventEmitter) {
              eventEmitter.emit('animationEnd', {
                element: this,
                animate: animate._node,
                params: animationDefinition
              });
            }

            if (guided) {
              // Set animated attribute to current animated value
              attributeProperties[attribute] = animationDefinition.to;
              this.attr(attributeProperties); // Remove the animate element as it's no longer required

              animate.remove();
            }
          }.bind(this));
        } // If current attribute is an array of definition objects we create an animate for each and disable guided mode


        if (animations[attribute] instanceof Array) {
          animations[attribute].forEach(function (animationDefinition) {
            createAnimate.bind(this)(animationDefinition, false);
          }.bind(this));
        } else {
          createAnimate.bind(this)(animations[attribute], guided);
        }
      }.bind(this));
      return this;
    }

    Chartist.Svg = Chartist.Class.extend({
      constructor: Svg,
      attr: attr,
      elem: elem,
      parent: parent,
      root: root,
      querySelector: querySelector,
      querySelectorAll: querySelectorAll,
      getNode: getNode,
      foreignObject: foreignObject,
      text: text,
      empty: empty,
      remove: remove,
      replace: replace,
      append: append,
      classes: classes,
      addClass: addClass,
      removeClass: removeClass,
      removeAllClasses: removeAllClasses,
      height: height,
      width: width,
      animate: animate
    });
    /**
     * This method checks for support of a given SVG feature like Extensibility, SVG-animation or the like. Check http://www.w3.org/TR/SVG11/feature for a detailed list.
     *
     * @memberof Chartist.Svg
     * @param {String} feature The SVG 1.1 feature that should be checked for support.
     * @return {Boolean} True of false if the feature is supported or not
     */

    Chartist.Svg.isSupported = function (feature) {
      return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#' + feature, '1.1');
    };
    /**
     * This Object contains some standard easing cubic bezier curves. Then can be used with their name in the `Chartist.Svg.animate`. You can also extend the list and use your own name in the `animate` function. Click the show code button to see the available bezier functions.
     *
     * @memberof Chartist.Svg
     */


    var easingCubicBeziers = {
      easeInSine: [0.47, 0, 0.745, 0.715],
      easeOutSine: [0.39, 0.575, 0.565, 1],
      easeInOutSine: [0.445, 0.05, 0.55, 0.95],
      easeInQuad: [0.55, 0.085, 0.68, 0.53],
      easeOutQuad: [0.25, 0.46, 0.45, 0.94],
      easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
      easeInCubic: [0.55, 0.055, 0.675, 0.19],
      easeOutCubic: [0.215, 0.61, 0.355, 1],
      easeInOutCubic: [0.645, 0.045, 0.355, 1],
      easeInQuart: [0.895, 0.03, 0.685, 0.22],
      easeOutQuart: [0.165, 0.84, 0.44, 1],
      easeInOutQuart: [0.77, 0, 0.175, 1],
      easeInQuint: [0.755, 0.05, 0.855, 0.06],
      easeOutQuint: [0.23, 1, 0.32, 1],
      easeInOutQuint: [0.86, 0, 0.07, 1],
      easeInExpo: [0.95, 0.05, 0.795, 0.035],
      easeOutExpo: [0.19, 1, 0.22, 1],
      easeInOutExpo: [1, 0, 0, 1],
      easeInCirc: [0.6, 0.04, 0.98, 0.335],
      easeOutCirc: [0.075, 0.82, 0.165, 1],
      easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
      easeInBack: [0.6, -0.28, 0.735, 0.045],
      easeOutBack: [0.175, 0.885, 0.32, 1.275],
      easeInOutBack: [0.68, -0.55, 0.265, 1.55]
    };
    Chartist.Svg.Easing = easingCubicBeziers;
    /**
     * This helper class is to wrap multiple `Chartist.Svg` elements into a list where you can call the `Chartist.Svg` functions on all elements in the list with one call. This is helpful when you'd like to perform calls with `Chartist.Svg` on multiple elements.
     * An instance of this class is also returned by `Chartist.Svg.querySelectorAll`.
     *
     * @memberof Chartist.Svg
     * @param {Array<Node>|NodeList} nodeList An Array of SVG DOM nodes or a SVG DOM NodeList (as returned by document.querySelectorAll)
     * @constructor
     */

    function SvgList(nodeList) {
      var list = this;
      this.svgElements = [];

      for (var i = 0; i < nodeList.length; i++) {
        this.svgElements.push(new Chartist.Svg(nodeList[i]));
      } // Add delegation methods for Chartist.Svg


      Object.keys(Chartist.Svg.prototype).filter(function (prototypeProperty) {
        return ['constructor', 'parent', 'querySelector', 'querySelectorAll', 'replace', 'append', 'classes', 'height', 'width'].indexOf(prototypeProperty) === -1;
      }).forEach(function (prototypeProperty) {
        list[prototypeProperty] = function () {
          var args = Array.prototype.slice.call(arguments, 0);
          list.svgElements.forEach(function (element) {
            Chartist.Svg.prototype[prototypeProperty].apply(element, args);
          });
          return list;
        };
      });
    }

    Chartist.Svg.List = Chartist.Class.extend({
      constructor: SvgList
    });
  })(this || global, Chartist);

  ;
  /**
  * Chartist SVG path module for SVG path description creation and modification.
  *
  * @module Chartist.Svg.Path
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';
    /**
     * Contains the descriptors of supported element types in a SVG path. Currently only move, line and curve are supported.
     *
     * @memberof Chartist.Svg.Path
     * @type {Object}
     */

    var elementDescriptions = {
      m: ['x', 'y'],
      l: ['x', 'y'],
      c: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],
      a: ['rx', 'ry', 'xAr', 'lAf', 'sf', 'x', 'y']
    };
    /**
     * Default options for newly created SVG path objects.
     *
     * @memberof Chartist.Svg.Path
     * @type {Object}
     */

    var defaultOptions = {
      // The accuracy in digit count after the decimal point. This will be used to round numbers in the SVG path. If this option is set to false then no rounding will be performed.
      accuracy: 3
    };

    function element(command, params, pathElements, pos, relative, data) {
      var pathElement = Chartist.extend({
        command: relative ? command.toLowerCase() : command.toUpperCase()
      }, params, data ? {
        data: data
      } : {});
      pathElements.splice(pos, 0, pathElement);
    }

    function forEachParam(pathElements, cb) {
      pathElements.forEach(function (pathElement, pathElementIndex) {
        elementDescriptions[pathElement.command.toLowerCase()].forEach(function (paramName, paramIndex) {
          cb(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
        });
      });
    }
    /**
     * Used to construct a new path object.
     *
     * @memberof Chartist.Svg.Path
     * @param {Boolean} close If set to true then this path will be closed when stringified (with a Z at the end)
     * @param {Object} options Options object that overrides the default objects. See default options for more details.
     * @constructor
     */


    function SvgPath(close, options) {
      this.pathElements = [];
      this.pos = 0;
      this.close = close;
      this.options = Chartist.extend({}, defaultOptions, options);
    }
    /**
     * Gets or sets the current position (cursor) inside of the path. You can move around the cursor freely but limited to 0 or the count of existing elements. All modifications with element functions will insert new elements at the position of this cursor.
     *
     * @memberof Chartist.Svg.Path
     * @param {Number} [pos] If a number is passed then the cursor is set to this position in the path element array.
     * @return {Chartist.Svg.Path|Number} If the position parameter was passed then the return value will be the path object for easy call chaining. If no position parameter was passed then the current position is returned.
     */


    function position(pos) {
      if (pos !== undefined) {
        this.pos = Math.max(0, Math.min(this.pathElements.length, pos));
        return this;
      } else {
        return this.pos;
      }
    }
    /**
     * Removes elements from the path starting at the current position.
     *
     * @memberof Chartist.Svg.Path
     * @param {Number} count Number of path elements that should be removed from the current position.
     * @return {Chartist.Svg.Path} The current path object for easy call chaining.
     */


    function remove(count) {
      this.pathElements.splice(this.pos, count);
      return this;
    }
    /**
     * Use this function to add a new move SVG path element.
     *
     * @memberof Chartist.Svg.Path
     * @param {Number} x The x coordinate for the move element.
     * @param {Number} y The y coordinate for the move element.
     * @param {Boolean} [relative] If set to true the move element will be created with relative coordinates (lowercase letter)
     * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
     * @return {Chartist.Svg.Path} The current path object for easy call chaining.
     */


    function move(x, y, relative, data) {
      element('M', {
        x: +x,
        y: +y
      }, this.pathElements, this.pos++, relative, data);
      return this;
    }
    /**
     * Use this function to add a new line SVG path element.
     *
     * @memberof Chartist.Svg.Path
     * @param {Number} x The x coordinate for the line element.
     * @param {Number} y The y coordinate for the line element.
     * @param {Boolean} [relative] If set to true the line element will be created with relative coordinates (lowercase letter)
     * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
     * @return {Chartist.Svg.Path} The current path object for easy call chaining.
     */


    function line(x, y, relative, data) {
      element('L', {
        x: +x,
        y: +y
      }, this.pathElements, this.pos++, relative, data);
      return this;
    }
    /**
     * Use this function to add a new curve SVG path element.
     *
     * @memberof Chartist.Svg.Path
     * @param {Number} x1 The x coordinate for the first control point of the bezier curve.
     * @param {Number} y1 The y coordinate for the first control point of the bezier curve.
     * @param {Number} x2 The x coordinate for the second control point of the bezier curve.
     * @param {Number} y2 The y coordinate for the second control point of the bezier curve.
     * @param {Number} x The x coordinate for the target point of the curve element.
     * @param {Number} y The y coordinate for the target point of the curve element.
     * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
     * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
     * @return {Chartist.Svg.Path} The current path object for easy call chaining.
     */


    function curve(x1, y1, x2, y2, x, y, relative, data) {
      element('C', {
        x1: +x1,
        y1: +y1,
        x2: +x2,
        y2: +y2,
        x: +x,
        y: +y
      }, this.pathElements, this.pos++, relative, data);
      return this;
    }
    /**
     * Use this function to add a new non-bezier curve SVG path element.
     *
     * @memberof Chartist.Svg.Path
     * @param {Number} rx The radius to be used for the x-axis of the arc.
     * @param {Number} ry The radius to be used for the y-axis of the arc.
     * @param {Number} xAr Defines the orientation of the arc
     * @param {Number} lAf Large arc flag
     * @param {Number} sf Sweep flag
     * @param {Number} x The x coordinate for the target point of the curve element.
     * @param {Number} y The y coordinate for the target point of the curve element.
     * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
     * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
     * @return {Chartist.Svg.Path} The current path object for easy call chaining.
     */


    function arc(rx, ry, xAr, lAf, sf, x, y, relative, data) {
      element('A', {
        rx: +rx,
        ry: +ry,
        xAr: +xAr,
        lAf: +lAf,
        sf: +sf,
        x: +x,
        y: +y
      }, this.pathElements, this.pos++, relative, data);
      return this;
    }
    /**
     * Parses an SVG path seen in the d attribute of path elements, and inserts the parsed elements into the existing path object at the current cursor position. Any closing path indicators (Z at the end of the path) will be ignored by the parser as this is provided by the close option in the options of the path object.
     *
     * @memberof Chartist.Svg.Path
     * @param {String} path Any SVG path that contains move (m), line (l) or curve (c) components.
     * @return {Chartist.Svg.Path} The current path object for easy call chaining.
     */


    function parse(path) {
      // Parsing the SVG path string into an array of arrays [['M', '10', '10'], ['L', '100', '100']]
      var chunks = path.replace(/([A-Za-z])([0-9])/g, '$1 $2').replace(/([0-9])([A-Za-z])/g, '$1 $2').split(/[\s,]+/).reduce(function (result, element) {
        if (element.match(/[A-Za-z]/)) {
          result.push([]);
        }

        result[result.length - 1].push(element);
        return result;
      }, []); // If this is a closed path we remove the Z at the end because this is determined by the close option

      if (chunks[chunks.length - 1][0].toUpperCase() === 'Z') {
        chunks.pop();
      } // Using svgPathElementDescriptions to map raw path arrays into objects that contain the command and the parameters
      // For example {command: 'M', x: '10', y: '10'}


      var elements = chunks.map(function (chunk) {
        var command = chunk.shift(),
            description = elementDescriptions[command.toLowerCase()];
        return Chartist.extend({
          command: command
        }, description.reduce(function (result, paramName, index) {
          result[paramName] = +chunk[index];
          return result;
        }, {}));
      }); // Preparing a splice call with the elements array as var arg params and insert the parsed elements at the current position

      var spliceArgs = [this.pos, 0];
      Array.prototype.push.apply(spliceArgs, elements);
      Array.prototype.splice.apply(this.pathElements, spliceArgs); // Increase the internal position by the element count

      this.pos += elements.length;
      return this;
    }
    /**
     * This function renders to current SVG path object into a final SVG string that can be used in the d attribute of SVG path elements. It uses the accuracy option to round big decimals. If the close parameter was set in the constructor of this path object then a path closing Z will be appended to the output string.
     *
     * @memberof Chartist.Svg.Path
     * @return {String}
     */


    function stringify() {
      var accuracyMultiplier = Math.pow(10, this.options.accuracy);
      return this.pathElements.reduce(function (path, pathElement) {
        var params = elementDescriptions[pathElement.command.toLowerCase()].map(function (paramName) {
          return this.options.accuracy ? Math.round(pathElement[paramName] * accuracyMultiplier) / accuracyMultiplier : pathElement[paramName];
        }.bind(this));
        return path + pathElement.command + params.join(',');
      }.bind(this), '') + (this.close ? 'Z' : '');
    }
    /**
     * Scales all elements in the current SVG path object. There is an individual parameter for each coordinate. Scaling will also be done for control points of curves, affecting the given coordinate.
     *
     * @memberof Chartist.Svg.Path
     * @param {Number} x The number which will be used to scale the x, x1 and x2 of all path elements.
     * @param {Number} y The number which will be used to scale the y, y1 and y2 of all path elements.
     * @return {Chartist.Svg.Path} The current path object for easy call chaining.
     */


    function scale(x, y) {
      forEachParam(this.pathElements, function (pathElement, paramName) {
        pathElement[paramName] *= paramName[0] === 'x' ? x : y;
      });
      return this;
    }
    /**
     * Translates all elements in the current SVG path object. The translation is relative and there is an individual parameter for each coordinate. Translation will also be done for control points of curves, affecting the given coordinate.
     *
     * @memberof Chartist.Svg.Path
     * @param {Number} x The number which will be used to translate the x, x1 and x2 of all path elements.
     * @param {Number} y The number which will be used to translate the y, y1 and y2 of all path elements.
     * @return {Chartist.Svg.Path} The current path object for easy call chaining.
     */


    function translate(x, y) {
      forEachParam(this.pathElements, function (pathElement, paramName) {
        pathElement[paramName] += paramName[0] === 'x' ? x : y;
      });
      return this;
    }
    /**
     * This function will run over all existing path elements and then loop over their attributes. The callback function will be called for every path element attribute that exists in the current path.
     * The method signature of the callback function looks like this:
     * ```javascript
     * function(pathElement, paramName, pathElementIndex, paramIndex, pathElements)
     * ```
     * If something else than undefined is returned by the callback function, this value will be used to replace the old value. This allows you to build custom transformations of path objects that can't be achieved using the basic transformation functions scale and translate.
     *
     * @memberof Chartist.Svg.Path
     * @param {Function} transformFnc The callback function for the transformation. Check the signature in the function description.
     * @return {Chartist.Svg.Path} The current path object for easy call chaining.
     */


    function transform(transformFnc) {
      forEachParam(this.pathElements, function (pathElement, paramName, pathElementIndex, paramIndex, pathElements) {
        var transformed = transformFnc(pathElement, paramName, pathElementIndex, paramIndex, pathElements);

        if (transformed || transformed === 0) {
          pathElement[paramName] = transformed;
        }
      });
      return this;
    }
    /**
     * This function clones a whole path object with all its properties. This is a deep clone and path element objects will also be cloned.
     *
     * @memberof Chartist.Svg.Path
     * @param {Boolean} [close] Optional option to set the new cloned path to closed. If not specified or false, the original path close option will be used.
     * @return {Chartist.Svg.Path}
     */


    function clone(close) {
      var c = new Chartist.Svg.Path(close || this.close);
      c.pos = this.pos;
      c.pathElements = this.pathElements.slice().map(function cloneElements(pathElement) {
        return Chartist.extend({}, pathElement);
      });
      c.options = Chartist.extend({}, this.options);
      return c;
    }
    /**
     * Split a Svg.Path object by a specific command in the path chain. The path chain will be split and an array of newly created paths objects will be returned. This is useful if you'd like to split an SVG path by it's move commands, for example, in order to isolate chunks of drawings.
     *
     * @memberof Chartist.Svg.Path
     * @param {String} command The command you'd like to use to split the path
     * @return {Array<Chartist.Svg.Path>}
     */


    function splitByCommand(command) {
      var split = [new Chartist.Svg.Path()];
      this.pathElements.forEach(function (pathElement) {
        if (pathElement.command === command.toUpperCase() && split[split.length - 1].pathElements.length !== 0) {
          split.push(new Chartist.Svg.Path());
        }

        split[split.length - 1].pathElements.push(pathElement);
      });
      return split;
    }
    /**
     * This static function on `Chartist.Svg.Path` is joining multiple paths together into one paths.
     *
     * @memberof Chartist.Svg.Path
     * @param {Array<Chartist.Svg.Path>} paths A list of paths to be joined together. The order is important.
     * @param {boolean} close If the newly created path should be a closed path
     * @param {Object} options Path options for the newly created path.
     * @return {Chartist.Svg.Path}
     */


    function join(paths, close, options) {
      var joinedPath = new Chartist.Svg.Path(close, options);

      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];

        for (var j = 0; j < path.pathElements.length; j++) {
          joinedPath.pathElements.push(path.pathElements[j]);
        }
      }

      return joinedPath;
    }

    Chartist.Svg.Path = Chartist.Class.extend({
      constructor: SvgPath,
      position: position,
      remove: remove,
      move: move,
      line: line,
      curve: curve,
      arc: arc,
      scale: scale,
      translate: translate,
      transform: transform,
      parse: parse,
      stringify: stringify,
      clone: clone,
      splitByCommand: splitByCommand
    });
    Chartist.Svg.Path.elementDescriptions = elementDescriptions;
    Chartist.Svg.Path.join = join;
  })(this || global, Chartist);

  ;
  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    var window = globalRoot.window;
    var document = globalRoot.document;
    var axisUnits = {
      x: {
        pos: 'x',
        len: 'width',
        dir: 'horizontal',
        rectStart: 'x1',
        rectEnd: 'x2',
        rectOffset: 'y2'
      },
      y: {
        pos: 'y',
        len: 'height',
        dir: 'vertical',
        rectStart: 'y2',
        rectEnd: 'y1',
        rectOffset: 'x1'
      }
    };

    function Axis(units, chartRect, ticks, options) {
      this.units = units;
      this.counterUnits = units === axisUnits.x ? axisUnits.y : axisUnits.x;
      this.chartRect = chartRect;
      this.axisLength = chartRect[units.rectEnd] - chartRect[units.rectStart];
      this.gridOffset = chartRect[units.rectOffset];
      this.ticks = ticks;
      this.options = options;
    }

    function createGridAndLabels(gridGroup, labelGroup, useForeignObject, chartOptions, eventEmitter) {
      var axisOptions = chartOptions['axis' + this.units.pos.toUpperCase()];
      var projectedValues = this.ticks.map(this.projectValue.bind(this));
      var labelValues = this.ticks.map(axisOptions.labelInterpolationFnc);
      projectedValues.forEach(function (projectedValue, index) {
        var labelOffset = {
          x: 0,
          y: 0
        }; // TODO: Find better solution for solving this problem
        // Calculate how much space we have available for the label

        var labelLength;

        if (projectedValues[index + 1]) {
          // If we still have one label ahead, we can calculate the distance to the next tick / label
          labelLength = projectedValues[index + 1] - projectedValue;
        } else {
          // If we don't have a label ahead and we have only two labels in total, we just take the remaining distance to
          // on the whole axis length. We limit that to a minimum of 30 pixel, so that labels close to the border will
          // still be visible inside of the chart padding.
          labelLength = Math.max(this.axisLength - projectedValue, 30);
        } // Skip grid lines and labels where interpolated label values are falsey (execpt for 0)


        if (Chartist.isFalseyButZero(labelValues[index]) && labelValues[index] !== '') {
          return;
        } // Transform to global coordinates using the chartRect
        // We also need to set the label offset for the createLabel function


        if (this.units.pos === 'x') {
          projectedValue = this.chartRect.x1 + projectedValue;
          labelOffset.x = chartOptions.axisX.labelOffset.x; // If the labels should be positioned in start position (top side for vertical axis) we need to set a
          // different offset as for positioned with end (bottom)

          if (chartOptions.axisX.position === 'start') {
            labelOffset.y = this.chartRect.padding.top + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
          } else {
            labelOffset.y = this.chartRect.y1 + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
          }
        } else {
          projectedValue = this.chartRect.y1 - projectedValue;
          labelOffset.y = chartOptions.axisY.labelOffset.y - (useForeignObject ? labelLength : 0); // If the labels should be positioned in start position (left side for horizontal axis) we need to set a
          // different offset as for positioned with end (right side)

          if (chartOptions.axisY.position === 'start') {
            labelOffset.x = useForeignObject ? this.chartRect.padding.left + chartOptions.axisY.labelOffset.x : this.chartRect.x1 - 10;
          } else {
            labelOffset.x = this.chartRect.x2 + chartOptions.axisY.labelOffset.x + 10;
          }
        }

        if (axisOptions.showGrid) {
          Chartist.createGrid(projectedValue, index, this, this.gridOffset, this.chartRect[this.counterUnits.len](), gridGroup, [chartOptions.classNames.grid, chartOptions.classNames[this.units.dir]], eventEmitter);
        }

        if (axisOptions.showLabel) {
          Chartist.createLabel(projectedValue, labelLength, index, labelValues, this, axisOptions.offset, labelOffset, labelGroup, [chartOptions.classNames.label, chartOptions.classNames[this.units.dir], axisOptions.position === 'start' ? chartOptions.classNames[axisOptions.position] : chartOptions.classNames['end']], useForeignObject, eventEmitter);
        }
      }.bind(this));
    }

    Chartist.Axis = Chartist.Class.extend({
      constructor: Axis,
      createGridAndLabels: createGridAndLabels,
      projectValue: function (value, index, data) {
        throw new Error('Base axis can\'t be instantiated!');
      }
    });
    Chartist.Axis.units = axisUnits;
  })(this || global, Chartist);

  ;
  /**
  * The auto scale axis uses standard linear scale projection of values along an axis. It uses order of magnitude to find a scale automatically and evaluates the available space in order to find the perfect amount of ticks for your chart.
  * **Options**
  * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
  * ```javascript
  * var options = {
  *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
  *   high: 100,
  *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
  *   low: 0,
  *   // This option will be used when finding the right scale division settings. The amount of ticks on the scale will be determined so that as many ticks as possible will be displayed, while not violating this minimum required space (in pixel).
  *   scaleMinSpace: 20,
  *   // Can be set to true or false. If set to true, the scale will be generated with whole numbers only.
  *   onlyInteger: true,
  *   // The reference value can be used to make sure that this value will always be on the chart. This is especially useful on bipolar charts where the bipolar center always needs to be part of the chart.
  *   referenceValue: 5
  * };
  * ```
  *
  * @module Chartist.AutoScaleAxis
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    var window = globalRoot.window;
    var document = globalRoot.document;

    function AutoScaleAxis(axisUnit, data, chartRect, options) {
      // Usually we calculate highLow based on the data but this can be overriden by a highLow object in the options
      var highLow = options.highLow || Chartist.getHighLow(data, options, axisUnit.pos);
      this.bounds = Chartist.getBounds(chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart], highLow, options.scaleMinSpace || 20, options.onlyInteger);
      this.range = {
        min: this.bounds.min,
        max: this.bounds.max
      };
      Chartist.AutoScaleAxis.super.constructor.call(this, axisUnit, chartRect, this.bounds.values, options);
    }

    function projectValue(value) {
      return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.bounds.min) / this.bounds.range;
    }

    Chartist.AutoScaleAxis = Chartist.Axis.extend({
      constructor: AutoScaleAxis,
      projectValue: projectValue
    });
  })(this || global, Chartist);

  ;
  /**
  * The fixed scale axis uses standard linear projection of values along an axis. It makes use of a divisor option to divide the range provided from the minimum and maximum value or the options high and low that will override the computed minimum and maximum.
  * **Options**
  * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
  * ```javascript
  * var options = {
  *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
  *   high: 100,
  *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
  *   low: 0,
  *   // If specified then the value range determined from minimum to maximum (or low and high) will be divided by this number and ticks will be generated at those division points. The default divisor is 1.
  *   divisor: 4,
  *   // If ticks is explicitly set, then the axis will not compute the ticks with the divisor, but directly use the data in ticks to determine at what points on the axis a tick need to be generated.
  *   ticks: [1, 10, 20, 30]
  * };
  * ```
  *
  * @module Chartist.FixedScaleAxis
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    var window = globalRoot.window;
    var document = globalRoot.document;

    function FixedScaleAxis(axisUnit, data, chartRect, options) {
      var highLow = options.highLow || Chartist.getHighLow(data, options, axisUnit.pos);
      this.divisor = options.divisor || 1;
      this.ticks = options.ticks || Chartist.times(this.divisor).map(function (value, index) {
        return highLow.low + (highLow.high - highLow.low) / this.divisor * index;
      }.bind(this));
      this.ticks.sort(function (a, b) {
        return a - b;
      });
      this.range = {
        min: highLow.low,
        max: highLow.high
      };
      Chartist.FixedScaleAxis.super.constructor.call(this, axisUnit, chartRect, this.ticks, options);
      this.stepLength = this.axisLength / this.divisor;
    }

    function projectValue(value) {
      return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.range.min) / (this.range.max - this.range.min);
    }

    Chartist.FixedScaleAxis = Chartist.Axis.extend({
      constructor: FixedScaleAxis,
      projectValue: projectValue
    });
  })(this || global, Chartist);

  ;
  /**
  * The step axis for step based charts like bar chart or step based line charts. It uses a fixed amount of ticks that will be equally distributed across the whole axis length. The projection is done using the index of the data value rather than the value itself and therefore it's only useful for distribution purpose.
  * **Options**
  * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
  * ```javascript
  * var options = {
  *   // Ticks to be used to distribute across the axis length. As this axis type relies on the index of the value rather than the value, arbitrary data that can be converted to a string can be used as ticks.
  *   ticks: ['One', 'Two', 'Three'],
  *   // If set to true the full width will be used to distribute the values where the last value will be at the maximum of the axis length. If false the spaces between the ticks will be evenly distributed instead.
  *   stretch: true
  * };
  * ```
  *
  * @module Chartist.StepAxis
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    var window = globalRoot.window;
    var document = globalRoot.document;

    function StepAxis(axisUnit, data, chartRect, options) {
      Chartist.StepAxis.super.constructor.call(this, axisUnit, chartRect, options.ticks, options);
      var calc = Math.max(1, options.ticks.length - (options.stretch ? 1 : 0));
      this.stepLength = this.axisLength / calc;
    }

    function projectValue(value, index) {
      return this.stepLength * index;
    }

    Chartist.StepAxis = Chartist.Axis.extend({
      constructor: StepAxis,
      projectValue: projectValue
    });
  })(this || global, Chartist);

  ;
  /**
  * The Chartist line chart can be used to draw Line or Scatter charts. If used in the browser you can access the global `Chartist` namespace where you find the `Line` function as a main entry point.
  *
  * For examples on how to use the line chart please check the examples of the `Chartist.Line` method.
  *
  * @module Chartist.Line
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    var window = globalRoot.window;
    var document = globalRoot.document;
    /**
     * Default options in line charts. Expand the code view to see a detailed list of options with comments.
     *
     * @memberof Chartist.Line
     */

    var defaultOptions = {
      // Options for X-Axis
      axisX: {
        // The offset of the labels to the chart area
        offset: 30,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: 'end',
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
          x: 0,
          y: 0
        },
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: true,
        // Interpolation function that allows you to intercept the value from the axis label
        labelInterpolationFnc: Chartist.noop,
        // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
        type: undefined
      },
      // Options for Y-Axis
      axisY: {
        // The offset of the labels to the chart area
        offset: 40,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: 'start',
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
          x: 0,
          y: 0
        },
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: true,
        // Interpolation function that allows you to intercept the value from the axis label
        labelInterpolationFnc: Chartist.noop,
        // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
        type: undefined,
        // This value specifies the minimum height in pixel of the scale steps
        scaleMinSpace: 20,
        // Use only integer values (whole numbers) for the scale steps
        onlyInteger: false
      },
      // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
      width: undefined,
      // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
      height: undefined,
      // If the line should be drawn or not
      showLine: true,
      // If dots should be drawn or not
      showPoint: true,
      // If the line chart should draw an area
      showArea: false,
      // The base for the area chart that will be used to close the area shape (is normally 0)
      areaBase: 0,
      // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
      lineSmooth: true,
      // If the line chart should add a background fill to the .ct-grids group.
      showGridBackground: false,
      // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
      low: undefined,
      // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
      high: undefined,
      // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
      chartPadding: {
        top: 15,
        right: 15,
        bottom: 5,
        left: 10
      },
      // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
      fullWidth: false,
      // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
      reverseData: false,
      // Override the class names that get used to generate the SVG structure of the chart
      classNames: {
        chart: 'ct-chart-line',
        label: 'ct-label',
        labelGroup: 'ct-labels',
        series: 'ct-series',
        line: 'ct-line',
        point: 'ct-point',
        area: 'ct-area',
        grid: 'ct-grid',
        gridGroup: 'ct-grids',
        gridBackground: 'ct-grid-background',
        vertical: 'ct-vertical',
        horizontal: 'ct-horizontal',
        start: 'ct-start',
        end: 'ct-end'
      }
    };
    /**
     * Creates a new chart
     *
     */

    function createChart(options) {
      var data = Chartist.normalizeData(this.data, options.reverseData, true); // Create new svg object

      this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart); // Create groups for labels, grid and series

      var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);
      var seriesGroup = this.svg.elem('g');
      var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);
      var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);
      var axisX, axisY;

      if (options.axisX.type === undefined) {
        axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
          ticks: data.normalized.labels,
          stretch: options.fullWidth
        }));
      } else {
        axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, options.axisX);
      }

      if (options.axisY.type === undefined) {
        axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
          high: Chartist.isNumeric(options.high) ? options.high : options.axisY.high,
          low: Chartist.isNumeric(options.low) ? options.low : options.axisY.low
        }));
      } else {
        axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, options.axisY);
      }

      axisX.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);
      axisY.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);

      if (options.showGridBackground) {
        Chartist.createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
      } // Draw the series


      data.raw.series.forEach(function (series, seriesIndex) {
        var seriesElement = seriesGroup.elem('g'); // Write attributes to series group element. If series name or meta is undefined the attributes will not be written

        seriesElement.attr({
          'ct:series-name': series.name,
          'ct:meta': Chartist.serialize(series.meta)
        }); // Use series class from series data or if not set generate one

        seriesElement.addClass([options.classNames.series, series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex)].join(' '));
        var pathCoordinates = [],
            pathData = [];
        data.normalized.series[seriesIndex].forEach(function (value, valueIndex) {
          var p = {
            x: chartRect.x1 + axisX.projectValue(value, valueIndex, data.normalized.series[seriesIndex]),
            y: chartRect.y1 - axisY.projectValue(value, valueIndex, data.normalized.series[seriesIndex])
          };
          pathCoordinates.push(p.x, p.y);
          pathData.push({
            value: value,
            valueIndex: valueIndex,
            meta: Chartist.getMetaData(series, valueIndex)
          });
        }.bind(this));
        var seriesOptions = {
          lineSmooth: Chartist.getSeriesOption(series, options, 'lineSmooth'),
          showPoint: Chartist.getSeriesOption(series, options, 'showPoint'),
          showLine: Chartist.getSeriesOption(series, options, 'showLine'),
          showArea: Chartist.getSeriesOption(series, options, 'showArea'),
          areaBase: Chartist.getSeriesOption(series, options, 'areaBase')
        };
        var smoothing = typeof seriesOptions.lineSmooth === 'function' ? seriesOptions.lineSmooth : seriesOptions.lineSmooth ? Chartist.Interpolation.monotoneCubic() : Chartist.Interpolation.none(); // Interpolating path where pathData will be used to annotate each path element so we can trace back the original
        // index, value and meta data

        var path = smoothing(pathCoordinates, pathData); // If we should show points we need to create them now to avoid secondary loop
        // Points are drawn from the pathElements returned by the interpolation function
        // Small offset for Firefox to render squares correctly

        if (seriesOptions.showPoint) {
          path.pathElements.forEach(function (pathElement) {
            var point = seriesElement.elem('line', {
              x1: pathElement.x,
              y1: pathElement.y,
              x2: pathElement.x + 0.01,
              y2: pathElement.y
            }, options.classNames.point).attr({
              'ct:value': [pathElement.data.value.x, pathElement.data.value.y].filter(Chartist.isNumeric).join(','),
              'ct:meta': Chartist.serialize(pathElement.data.meta)
            });
            this.eventEmitter.emit('draw', {
              type: 'point',
              value: pathElement.data.value,
              index: pathElement.data.valueIndex,
              meta: pathElement.data.meta,
              series: series,
              seriesIndex: seriesIndex,
              axisX: axisX,
              axisY: axisY,
              group: seriesElement,
              element: point,
              x: pathElement.x,
              y: pathElement.y
            });
          }.bind(this));
        }

        if (seriesOptions.showLine) {
          var line = seriesElement.elem('path', {
            d: path.stringify()
          }, options.classNames.line, true);
          this.eventEmitter.emit('draw', {
            type: 'line',
            values: data.normalized.series[seriesIndex],
            path: path.clone(),
            chartRect: chartRect,
            index: seriesIndex,
            series: series,
            seriesIndex: seriesIndex,
            seriesMeta: series.meta,
            axisX: axisX,
            axisY: axisY,
            group: seriesElement,
            element: line
          });
        } // Area currently only works with axes that support a range!


        if (seriesOptions.showArea && axisY.range) {
          // If areaBase is outside the chart area (< min or > max) we need to set it respectively so that
          // the area is not drawn outside the chart area.
          var areaBase = Math.max(Math.min(seriesOptions.areaBase, axisY.range.max), axisY.range.min); // We project the areaBase value into screen coordinates

          var areaBaseProjected = chartRect.y1 - axisY.projectValue(areaBase); // In order to form the area we'll first split the path by move commands so we can chunk it up into segments

          path.splitByCommand('M').filter(function onlySolidSegments(pathSegment) {
            // We filter only "solid" segments that contain more than one point. Otherwise there's no need for an area
            return pathSegment.pathElements.length > 1;
          }).map(function convertToArea(solidPathSegments) {
            // Receiving the filtered solid path segments we can now convert those segments into fill areas
            var firstElement = solidPathSegments.pathElements[0];
            var lastElement = solidPathSegments.pathElements[solidPathSegments.pathElements.length - 1]; // Cloning the solid path segment with closing option and removing the first move command from the clone
            // We then insert a new move that should start at the area base and draw a straight line up or down
            // at the end of the path we add an additional straight line to the projected area base value
            // As the closing option is set our path will be automatically closed

            return solidPathSegments.clone(true).position(0).remove(1).move(firstElement.x, areaBaseProjected).line(firstElement.x, firstElement.y).position(solidPathSegments.pathElements.length + 1).line(lastElement.x, areaBaseProjected);
          }).forEach(function createArea(areaPath) {
            // For each of our newly created area paths, we'll now create path elements by stringifying our path objects
            // and adding the created DOM elements to the correct series group
            var area = seriesElement.elem('path', {
              d: areaPath.stringify()
            }, options.classNames.area, true); // Emit an event for each area that was drawn

            this.eventEmitter.emit('draw', {
              type: 'area',
              values: data.normalized.series[seriesIndex],
              path: areaPath.clone(),
              series: series,
              seriesIndex: seriesIndex,
              axisX: axisX,
              axisY: axisY,
              chartRect: chartRect,
              index: seriesIndex,
              group: seriesElement,
              element: area
            });
          }.bind(this));
        }
      }.bind(this));
      this.eventEmitter.emit('created', {
        bounds: axisY.bounds,
        chartRect: chartRect,
        axisX: axisX,
        axisY: axisY,
        svg: this.svg,
        options: options
      });
    }
    /**
     * This method creates a new line chart.
     *
     * @memberof Chartist.Line
     * @param {String|Node} query A selector query string or directly a DOM element
     * @param {Object} data The data object that needs to consist of a labels and a series array
     * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
     * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
     * @return {Object} An object which exposes the API for the created chart
     *
     * @example
     * // Create a simple line chart
     * var data = {
     *   // A labels array that can contain any sort of values
     *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
     *   // Our series array that contains series objects or in this case series data arrays
     *   series: [
     *     [5, 2, 4, 2, 0]
     *   ]
     * };
     *
     * // As options we currently only set a static size of 300x200 px
     * var options = {
     *   width: '300px',
     *   height: '200px'
     * };
     *
     * // In the global name space Chartist we call the Line function to initialize a line chart. As a first parameter we pass in a selector where we would like to get our chart created. Second parameter is the actual data object and as a third parameter we pass in our options
     * new Chartist.Line('.ct-chart', data, options);
     *
     * @example
     * // Use specific interpolation function with configuration from the Chartist.Interpolation module
     *
     * var chart = new Chartist.Line('.ct-chart', {
     *   labels: [1, 2, 3, 4, 5],
     *   series: [
     *     [1, 1, 8, 1, 7]
     *   ]
     * }, {
     *   lineSmooth: Chartist.Interpolation.cardinal({
     *     tension: 0.2
     *   })
     * });
     *
     * @example
     * // Create a line chart with responsive options
     *
     * var data = {
     *   // A labels array that can contain any sort of values
     *   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
     *   // Our series array that contains series objects or in this case series data arrays
     *   series: [
     *     [5, 2, 4, 2, 0]
     *   ]
     * };
     *
     * // In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
     * var responsiveOptions = [
     *   ['screen and (min-width: 641px) and (max-width: 1024px)', {
     *     showPoint: false,
     *     axisX: {
     *       labelInterpolationFnc: function(value) {
     *         // Will return Mon, Tue, Wed etc. on medium screens
     *         return value.slice(0, 3);
     *       }
     *     }
     *   }],
     *   ['screen and (max-width: 640px)', {
     *     showLine: false,
     *     axisX: {
     *       labelInterpolationFnc: function(value) {
     *         // Will return M, T, W etc. on small screens
     *         return value[0];
     *       }
     *     }
     *   }]
     * ];
     *
     * new Chartist.Line('.ct-chart', data, null, responsiveOptions);
     *
     */


    function Line(query, data, options, responsiveOptions) {
      Chartist.Line.super.constructor.call(this, query, data, defaultOptions, Chartist.extend({}, defaultOptions, options), responsiveOptions);
    } // Creating line chart type in Chartist namespace


    Chartist.Line = Chartist.Base.extend({
      constructor: Line,
      createChart: createChart
    });
  })(this || global, Chartist);

  ;
  /**
  * The bar chart module of Chartist that can be used to draw unipolar or bipolar bar and grouped bar charts.
  *
  * @module Chartist.Bar
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    var window = globalRoot.window;
    var document = globalRoot.document;
    /**
     * Default options in bar charts. Expand the code view to see a detailed list of options with comments.
     *
     * @memberof Chartist.Bar
     */

    var defaultOptions = {
      // Options for X-Axis
      axisX: {
        // The offset of the chart drawing area to the border of the container
        offset: 30,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: 'end',
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
          x: 0,
          y: 0
        },
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: true,
        // Interpolation function that allows you to intercept the value from the axis label
        labelInterpolationFnc: Chartist.noop,
        // This value specifies the minimum width in pixel of the scale steps
        scaleMinSpace: 30,
        // Use only integer values (whole numbers) for the scale steps
        onlyInteger: false
      },
      // Options for Y-Axis
      axisY: {
        // The offset of the chart drawing area to the border of the container
        offset: 40,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: 'start',
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
          x: 0,
          y: 0
        },
        // If labels should be shown or not
        showLabel: true,
        // If the axis grid should be drawn or not
        showGrid: true,
        // Interpolation function that allows you to intercept the value from the axis label
        labelInterpolationFnc: Chartist.noop,
        // This value specifies the minimum height in pixel of the scale steps
        scaleMinSpace: 20,
        // Use only integer values (whole numbers) for the scale steps
        onlyInteger: false
      },
      // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
      width: undefined,
      // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
      height: undefined,
      // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
      high: undefined,
      // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
      low: undefined,
      // Unless low/high are explicitly set, bar chart will be centered at zero by default. Set referenceValue to null to auto scale.
      referenceValue: 0,
      // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
      chartPadding: {
        top: 15,
        right: 15,
        bottom: 5,
        left: 10
      },
      // Specify the distance in pixel of bars in a group
      seriesBarDistance: 15,
      // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
      stackBars: false,
      // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
      // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
      stackMode: 'accumulate',
      // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
      horizontalBars: false,
      // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
      distributeSeries: false,
      // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
      reverseData: false,
      // If the bar chart should add a background fill to the .ct-grids group.
      showGridBackground: false,
      // Override the class names that get used to generate the SVG structure of the chart
      classNames: {
        chart: 'ct-chart-bar',
        horizontalBars: 'ct-horizontal-bars',
        label: 'ct-label',
        labelGroup: 'ct-labels',
        series: 'ct-series',
        bar: 'ct-bar',
        grid: 'ct-grid',
        gridGroup: 'ct-grids',
        gridBackground: 'ct-grid-background',
        vertical: 'ct-vertical',
        horizontal: 'ct-horizontal',
        start: 'ct-start',
        end: 'ct-end'
      }
    };
    /**
     * Creates a new chart
     *
     */

    function createChart(options) {
      var data;
      var highLow;

      if (options.distributeSeries) {
        data = Chartist.normalizeData(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y');
        data.normalized.series = data.normalized.series.map(function (value) {
          return [value];
        });
      } else {
        data = Chartist.normalizeData(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y');
      } // Create new svg element


      this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart + (options.horizontalBars ? ' ' + options.classNames.horizontalBars : '')); // Drawing groups in correct order

      var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);
      var seriesGroup = this.svg.elem('g');
      var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);

      if (options.stackBars && data.normalized.series.length !== 0) {
        // If stacked bars we need to calculate the high low from stacked values from each series
        var serialSums = Chartist.serialMap(data.normalized.series, function serialSums() {
          return Array.prototype.slice.call(arguments).map(function (value) {
            return value;
          }).reduce(function (prev, curr) {
            return {
              x: prev.x + (curr && curr.x) || 0,
              y: prev.y + (curr && curr.y) || 0
            };
          }, {
            x: 0,
            y: 0
          });
        });
        highLow = Chartist.getHighLow([serialSums], options, options.horizontalBars ? 'x' : 'y');
      } else {
        highLow = Chartist.getHighLow(data.normalized.series, options, options.horizontalBars ? 'x' : 'y');
      } // Overrides of high / low from settings


      highLow.high = +options.high || (options.high === 0 ? 0 : highLow.high);
      highLow.low = +options.low || (options.low === 0 ? 0 : highLow.low);
      var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);
      var valueAxis, labelAxisTicks, labelAxis, axisX, axisY; // We need to set step count based on some options combinations

      if (options.distributeSeries && options.stackBars) {
        // If distributed series are enabled and bars need to be stacked, we'll only have one bar and therefore should
        // use only the first label for the step axis
        labelAxisTicks = data.normalized.labels.slice(0, 1);
      } else {
        // If distributed series are enabled but stacked bars aren't, we should use the series labels
        // If we are drawing a regular bar chart with two dimensional series data, we just use the labels array
        // as the bars are normalized
        labelAxisTicks = data.normalized.labels;
      } // Set labelAxis and valueAxis based on the horizontalBars setting. This setting will flip the axes if necessary.


      if (options.horizontalBars) {
        if (options.axisX.type === undefined) {
          valueAxis = axisX = new Chartist.AutoScaleAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
            highLow: highLow,
            referenceValue: 0
          }));
        } else {
          valueAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
            highLow: highLow,
            referenceValue: 0
          }));
        }

        if (options.axisY.type === undefined) {
          labelAxis = axisY = new Chartist.StepAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, {
            ticks: labelAxisTicks
          });
        } else {
          labelAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, options.axisY);
        }
      } else {
        if (options.axisX.type === undefined) {
          labelAxis = axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, {
            ticks: labelAxisTicks
          });
        } else {
          labelAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, options.axisX);
        }

        if (options.axisY.type === undefined) {
          valueAxis = axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
            highLow: highLow,
            referenceValue: 0
          }));
        } else {
          valueAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
            highLow: highLow,
            referenceValue: 0
          }));
        }
      } // Projected 0 point


      var zeroPoint = options.horizontalBars ? chartRect.x1 + valueAxis.projectValue(0) : chartRect.y1 - valueAxis.projectValue(0); // Used to track the screen coordinates of stacked bars

      var stackedBarValues = [];
      labelAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);
      valueAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);

      if (options.showGridBackground) {
        Chartist.createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
      } // Draw the series


      data.raw.series.forEach(function (series, seriesIndex) {
        // Calculating bi-polar value of index for seriesOffset. For i = 0..4 biPol will be -1.5, -0.5, 0.5, 1.5 etc.
        var biPol = seriesIndex - (data.raw.series.length - 1) / 2; // Half of the period width between vertical grid lines used to position bars

        var periodHalfLength; // Current series SVG element

        var seriesElement; // We need to set periodHalfLength based on some options combinations

        if (options.distributeSeries && !options.stackBars) {
          // If distributed series are enabled but stacked bars aren't, we need to use the length of the normaizedData array
          // which is the series count and divide by 2
          periodHalfLength = labelAxis.axisLength / data.normalized.series.length / 2;
        } else if (options.distributeSeries && options.stackBars) {
          // If distributed series and stacked bars are enabled we'll only get one bar so we should just divide the axis
          // length by 2
          periodHalfLength = labelAxis.axisLength / 2;
        } else {
          // On regular bar charts we should just use the series length
          periodHalfLength = labelAxis.axisLength / data.normalized.series[seriesIndex].length / 2;
        } // Adding the series group to the series element


        seriesElement = seriesGroup.elem('g'); // Write attributes to series group element. If series name or meta is undefined the attributes will not be written

        seriesElement.attr({
          'ct:series-name': series.name,
          'ct:meta': Chartist.serialize(series.meta)
        }); // Use series class from series data or if not set generate one

        seriesElement.addClass([options.classNames.series, series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex)].join(' '));
        data.normalized.series[seriesIndex].forEach(function (value, valueIndex) {
          var projected, bar, previousStack, labelAxisValueIndex; // We need to set labelAxisValueIndex based on some options combinations

          if (options.distributeSeries && !options.stackBars) {
            // If distributed series are enabled but stacked bars aren't, we can use the seriesIndex for later projection
            // on the step axis for label positioning
            labelAxisValueIndex = seriesIndex;
          } else if (options.distributeSeries && options.stackBars) {
            // If distributed series and stacked bars are enabled, we will only get one bar and therefore always use
            // 0 for projection on the label step axis
            labelAxisValueIndex = 0;
          } else {
            // On regular bar charts we just use the value index to project on the label step axis
            labelAxisValueIndex = valueIndex;
          } // We need to transform coordinates differently based on the chart layout


          if (options.horizontalBars) {
            projected = {
              x: chartRect.x1 + valueAxis.projectValue(value && value.x ? value.x : 0, valueIndex, data.normalized.series[seriesIndex]),
              y: chartRect.y1 - labelAxis.projectValue(value && value.y ? value.y : 0, labelAxisValueIndex, data.normalized.series[seriesIndex])
            };
          } else {
            projected = {
              x: chartRect.x1 + labelAxis.projectValue(value && value.x ? value.x : 0, labelAxisValueIndex, data.normalized.series[seriesIndex]),
              y: chartRect.y1 - valueAxis.projectValue(value && value.y ? value.y : 0, valueIndex, data.normalized.series[seriesIndex])
            };
          } // If the label axis is a step based axis we will offset the bar into the middle of between two steps using
          // the periodHalfLength value. Also we do arrange the different series so that they align up to each other using
          // the seriesBarDistance. If we don't have a step axis, the bar positions can be chosen freely so we should not
          // add any automated positioning.


          if (labelAxis instanceof Chartist.StepAxis) {
            // Offset to center bar between grid lines, but only if the step axis is not stretched
            if (!labelAxis.options.stretch) {
              projected[labelAxis.units.pos] += periodHalfLength * (options.horizontalBars ? -1 : 1);
            } // Using bi-polar offset for multiple series if no stacked bars or series distribution is used


            projected[labelAxis.units.pos] += options.stackBars || options.distributeSeries ? 0 : biPol * options.seriesBarDistance * (options.horizontalBars ? -1 : 1);
          } // Enter value in stacked bar values used to remember previous screen value for stacking up bars


          previousStack = stackedBarValues[valueIndex] || zeroPoint;
          stackedBarValues[valueIndex] = previousStack - (zeroPoint - projected[labelAxis.counterUnits.pos]); // Skip if value is undefined

          if (value === undefined) {
            return;
          }

          var positions = {};
          positions[labelAxis.units.pos + '1'] = projected[labelAxis.units.pos];
          positions[labelAxis.units.pos + '2'] = projected[labelAxis.units.pos];

          if (options.stackBars && (options.stackMode === 'accumulate' || !options.stackMode)) {
            // Stack mode: accumulate (default)
            // If bars are stacked we use the stackedBarValues reference and otherwise base all bars off the zero line
            // We want backwards compatibility, so the expected fallback without the 'stackMode' option
            // to be the original behaviour (accumulate)
            positions[labelAxis.counterUnits.pos + '1'] = previousStack;
            positions[labelAxis.counterUnits.pos + '2'] = stackedBarValues[valueIndex];
          } else {
            // Draw from the zero line normally
            // This is also the same code for Stack mode: overlap
            positions[labelAxis.counterUnits.pos + '1'] = zeroPoint;
            positions[labelAxis.counterUnits.pos + '2'] = projected[labelAxis.counterUnits.pos];
          } // Limit x and y so that they are within the chart rect


          positions.x1 = Math.min(Math.max(positions.x1, chartRect.x1), chartRect.x2);
          positions.x2 = Math.min(Math.max(positions.x2, chartRect.x1), chartRect.x2);
          positions.y1 = Math.min(Math.max(positions.y1, chartRect.y2), chartRect.y1);
          positions.y2 = Math.min(Math.max(positions.y2, chartRect.y2), chartRect.y1);
          var metaData = Chartist.getMetaData(series, valueIndex); // Create bar element

          bar = seriesElement.elem('line', positions, options.classNames.bar).attr({
            'ct:value': [value.x, value.y].filter(Chartist.isNumeric).join(','),
            'ct:meta': Chartist.serialize(metaData)
          });
          this.eventEmitter.emit('draw', Chartist.extend({
            type: 'bar',
            value: value,
            index: valueIndex,
            meta: metaData,
            series: series,
            seriesIndex: seriesIndex,
            axisX: axisX,
            axisY: axisY,
            chartRect: chartRect,
            group: seriesElement,
            element: bar
          }, positions));
        }.bind(this));
      }.bind(this));
      this.eventEmitter.emit('created', {
        bounds: valueAxis.bounds,
        chartRect: chartRect,
        axisX: axisX,
        axisY: axisY,
        svg: this.svg,
        options: options
      });
    }
    /**
     * This method creates a new bar chart and returns API object that you can use for later changes.
     *
     * @memberof Chartist.Bar
     * @param {String|Node} query A selector query string or directly a DOM element
     * @param {Object} data The data object that needs to consist of a labels and a series array
     * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
     * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
     * @return {Object} An object which exposes the API for the created chart
     *
     * @example
     * // Create a simple bar chart
     * var data = {
     *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
     *   series: [
     *     [5, 2, 4, 2, 0]
     *   ]
     * };
     *
     * // In the global name space Chartist we call the Bar function to initialize a bar chart. As a first parameter we pass in a selector where we would like to get our chart created and as a second parameter we pass our data object.
     * new Chartist.Bar('.ct-chart', data);
     *
     * @example
     * // This example creates a bipolar grouped bar chart where the boundaries are limitted to -10 and 10
     * new Chartist.Bar('.ct-chart', {
     *   labels: [1, 2, 3, 4, 5, 6, 7],
     *   series: [
     *     [1, 3, 2, -5, -3, 1, -6],
     *     [-5, -2, -4, -1, 2, -3, 1]
     *   ]
     * }, {
     *   seriesBarDistance: 12,
     *   low: -10,
     *   high: 10
     * });
     *
     */


    function Bar(query, data, options, responsiveOptions) {
      Chartist.Bar.super.constructor.call(this, query, data, defaultOptions, Chartist.extend({}, defaultOptions, options), responsiveOptions);
    } // Creating bar chart type in Chartist namespace


    Chartist.Bar = Chartist.Base.extend({
      constructor: Bar,
      createChart: createChart
    });
  })(this || global, Chartist);

  ;
  /**
  * The pie chart module of Chartist that can be used to draw pie, donut or gauge charts
  *
  * @module Chartist.Pie
  */

  /* global Chartist */

  (function (globalRoot, Chartist) {
    'use strict';

    var window = globalRoot.window;
    var document = globalRoot.document;
    /**
     * Default options in line charts. Expand the code view to see a detailed list of options with comments.
     *
     * @memberof Chartist.Pie
     */

    var defaultOptions = {
      // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
      width: undefined,
      // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
      height: undefined,
      // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
      chartPadding: 5,
      // Override the class names that are used to generate the SVG structure of the chart
      classNames: {
        chartPie: 'ct-chart-pie',
        chartDonut: 'ct-chart-donut',
        series: 'ct-series',
        slicePie: 'ct-slice-pie',
        sliceDonut: 'ct-slice-donut',
        sliceDonutSolid: 'ct-slice-donut-solid',
        label: 'ct-label'
      },
      // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
      startAngle: 0,
      // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
      total: undefined,
      // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
      donut: false,
      // If specified the donut segments will be drawn as shapes instead of strokes.
      donutSolid: false,
      // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
      // This option can be set as number or string to specify a relative width (i.e. 100 or '30%').
      donutWidth: 60,
      // If a label should be shown or not
      showLabel: true,
      // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
      labelOffset: 0,
      // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
      labelPosition: 'inside',
      // An interpolation function for the label value
      labelInterpolationFnc: Chartist.noop,
      // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
      labelDirection: 'neutral',
      // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
      reverseData: false,
      // If true empty values will be ignored to avoid drawing unncessary slices and labels
      ignoreEmptyValues: false
    };
    /**
     * Determines SVG anchor position based on direction and center parameter
     *
     * @param center
     * @param label
     * @param direction
     * @return {string}
     */

    function determineAnchorPosition(center, label, direction) {
      var toTheRight = label.x > center.x;

      if (toTheRight && direction === 'explode' || !toTheRight && direction === 'implode') {
        return 'start';
      } else if (toTheRight && direction === 'implode' || !toTheRight && direction === 'explode') {
        return 'end';
      } else {
        return 'middle';
      }
    }
    /**
     * Creates the pie chart
     *
     * @param options
     */


    function createChart(options) {
      var data = Chartist.normalizeData(this.data);
      var seriesGroups = [],
          labelsGroup,
          chartRect,
          radius,
          labelRadius,
          totalDataSum,
          startAngle = options.startAngle; // Create SVG.js draw

      this.svg = Chartist.createSvg(this.container, options.width, options.height, options.donut ? options.classNames.chartDonut : options.classNames.chartPie); // Calculate charting rect

      chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding); // Get biggest circle radius possible within chartRect

      radius = Math.min(chartRect.width() / 2, chartRect.height() / 2); // Calculate total of all series to get reference value or use total reference from optional options

      totalDataSum = options.total || data.normalized.series.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
      }, 0);
      var donutWidth = Chartist.quantity(options.donutWidth);

      if (donutWidth.unit === '%') {
        donutWidth.value *= radius / 100;
      } // If this is a donut chart we need to adjust our radius to enable strokes to be drawn inside
      // Unfortunately this is not possible with the current SVG Spec
      // See this proposal for more details: http://lists.w3.org/Archives/Public/www-svg/2003Oct/0000.html


      radius -= options.donut && !options.donutSolid ? donutWidth.value / 2 : 0; // If labelPosition is set to `outside` or a donut chart is drawn then the label position is at the radius,
      // if regular pie chart it's half of the radius

      if (options.labelPosition === 'outside' || options.donut && !options.donutSolid) {
        labelRadius = radius;
      } else if (options.labelPosition === 'center') {
        // If labelPosition is center we start with 0 and will later wait for the labelOffset
        labelRadius = 0;
      } else if (options.donutSolid) {
        labelRadius = radius - donutWidth.value / 2;
      } else {
        // Default option is 'inside' where we use half the radius so the label will be placed in the center of the pie
        // slice
        labelRadius = radius / 2;
      } // Add the offset to the labelRadius where a negative offset means closed to the center of the chart


      labelRadius += options.labelOffset; // Calculate end angle based on total sum and current data value and offset with padding

      var center = {
        x: chartRect.x1 + chartRect.width() / 2,
        y: chartRect.y2 + chartRect.height() / 2
      }; // Check if there is only one non-zero value in the series array.

      var hasSingleValInSeries = data.raw.series.filter(function (val) {
        return val.hasOwnProperty('value') ? val.value !== 0 : val !== 0;
      }).length === 1; // Creating the series groups

      data.raw.series.forEach(function (series, index) {
        seriesGroups[index] = this.svg.elem('g', null, null);
      }.bind(this)); //if we need to show labels we create the label group now

      if (options.showLabel) {
        labelsGroup = this.svg.elem('g', null, null);
      } // Draw the series
      // initialize series groups


      data.raw.series.forEach(function (series, index) {
        // If current value is zero and we are ignoring empty values then skip to next value
        if (data.normalized.series[index] === 0 && options.ignoreEmptyValues) return; // If the series is an object and contains a name or meta data we add a custom attribute

        seriesGroups[index].attr({
          'ct:series-name': series.name
        }); // Use series class from series data or if not set generate one

        seriesGroups[index].addClass([options.classNames.series, series.className || options.classNames.series + '-' + Chartist.alphaNumerate(index)].join(' ')); // If the whole dataset is 0 endAngle should be zero. Can't divide by 0.

        var endAngle = totalDataSum > 0 ? startAngle + data.normalized.series[index] / totalDataSum * 360 : 0; // Use slight offset so there are no transparent hairline issues

        var overlappigStartAngle = Math.max(0, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2)); // If we need to draw the arc for all 360 degrees we need to add a hack where we close the circle
        // with Z and use 359.99 degrees

        if (endAngle - overlappigStartAngle >= 359.99) {
          endAngle = overlappigStartAngle + 359.99;
        }

        var start = Chartist.polarToCartesian(center.x, center.y, radius, overlappigStartAngle),
            end = Chartist.polarToCartesian(center.x, center.y, radius, endAngle);
        var innerStart, innerEnd, donutSolidRadius; // Create a new path element for the pie chart. If this isn't a donut chart we should close the path for a correct stroke

        var path = new Chartist.Svg.Path(!options.donut || options.donutSolid).move(end.x, end.y).arc(radius, radius, 0, endAngle - startAngle > 180, 0, start.x, start.y); // If regular pie chart (no donut) we add a line to the center of the circle for completing the pie

        if (!options.donut) {
          path.line(center.x, center.y);
        } else if (options.donutSolid) {
          donutSolidRadius = radius - donutWidth.value;
          innerStart = Chartist.polarToCartesian(center.x, center.y, donutSolidRadius, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2));
          innerEnd = Chartist.polarToCartesian(center.x, center.y, donutSolidRadius, endAngle);
          path.line(innerStart.x, innerStart.y);
          path.arc(donutSolidRadius, donutSolidRadius, 0, endAngle - startAngle > 180, 1, innerEnd.x, innerEnd.y);
        } // Create the SVG path
        // If this is a donut chart we add the donut class, otherwise just a regular slice


        var pathClassName = options.classNames.slicePie;

        if (options.donut) {
          pathClassName = options.classNames.sliceDonut;

          if (options.donutSolid) {
            pathClassName = options.classNames.sliceDonutSolid;
          }
        }

        var pathElement = seriesGroups[index].elem('path', {
          d: path.stringify()
        }, pathClassName); // Adding the pie series value to the path

        pathElement.attr({
          'ct:value': data.normalized.series[index],
          'ct:meta': Chartist.serialize(series.meta)
        }); // If this is a donut, we add the stroke-width as style attribute

        if (options.donut && !options.donutSolid) {
          pathElement._node.style.strokeWidth = donutWidth.value + 'px';
        } // Fire off draw event


        this.eventEmitter.emit('draw', {
          type: 'slice',
          value: data.normalized.series[index],
          totalDataSum: totalDataSum,
          index: index,
          meta: series.meta,
          series: series,
          group: seriesGroups[index],
          element: pathElement,
          path: path.clone(),
          center: center,
          radius: radius,
          startAngle: startAngle,
          endAngle: endAngle
        }); // If we need to show labels we need to add the label for this slice now

        if (options.showLabel) {
          var labelPosition;

          if (data.raw.series.length === 1) {
            // If we have only 1 series, we can position the label in the center of the pie
            labelPosition = {
              x: center.x,
              y: center.y
            };
          } else {
            // Position at the labelRadius distance from center and between start and end angle
            labelPosition = Chartist.polarToCartesian(center.x, center.y, labelRadius, startAngle + (endAngle - startAngle) / 2);
          }

          var rawValue;

          if (data.normalized.labels && !Chartist.isFalseyButZero(data.normalized.labels[index])) {
            rawValue = data.normalized.labels[index];
          } else {
            rawValue = data.normalized.series[index];
          }

          var interpolatedValue = options.labelInterpolationFnc(rawValue, index);

          if (interpolatedValue || interpolatedValue === 0) {
            var labelElement = labelsGroup.elem('text', {
              dx: labelPosition.x,
              dy: labelPosition.y,
              'text-anchor': determineAnchorPosition(center, labelPosition, options.labelDirection)
            }, options.classNames.label).text('' + interpolatedValue); // Fire off draw event

            this.eventEmitter.emit('draw', {
              type: 'label',
              index: index,
              group: labelsGroup,
              element: labelElement,
              text: '' + interpolatedValue,
              x: labelPosition.x,
              y: labelPosition.y
            });
          }
        } // Set next startAngle to current endAngle.
        // (except for last slice)


        startAngle = endAngle;
      }.bind(this));
      this.eventEmitter.emit('created', {
        chartRect: chartRect,
        svg: this.svg,
        options: options
      });
    }
    /**
     * This method creates a new pie chart and returns an object that can be used to redraw the chart.
     *
     * @memberof Chartist.Pie
     * @param {String|Node} query A selector query string or directly a DOM element
     * @param {Object} data The data object in the pie chart needs to have a series property with a one dimensional data array. The values will be normalized against each other and don't necessarily need to be in percentage. The series property can also be an array of value objects that contain a value property and a className property to override the CSS class name for the series group.
     * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
     * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
     * @return {Object} An object with a version and an update method to manually redraw the chart
     *
     * @example
     * // Simple pie chart example with four series
     * new Chartist.Pie('.ct-chart', {
     *   series: [10, 2, 4, 3]
     * });
     *
     * @example
     * // Drawing a donut chart
     * new Chartist.Pie('.ct-chart', {
     *   series: [10, 2, 4, 3]
     * }, {
     *   donut: true
     * });
     *
     * @example
     * // Using donut, startAngle and total to draw a gauge chart
     * new Chartist.Pie('.ct-chart', {
     *   series: [20, 10, 30, 40]
     * }, {
     *   donut: true,
     *   donutWidth: 20,
     *   startAngle: 270,
     *   total: 200
     * });
     *
     * @example
     * // Drawing a pie chart with padding and labels that are outside the pie
     * new Chartist.Pie('.ct-chart', {
     *   series: [20, 10, 30, 40]
     * }, {
     *   chartPadding: 30,
     *   labelOffset: 50,
     *   labelDirection: 'explode'
     * });
     *
     * @example
     * // Overriding the class names for individual series as well as a name and meta data.
     * // The name will be written as ct:series-name attribute and the meta data will be serialized and written
     * // to a ct:meta attribute.
     * new Chartist.Pie('.ct-chart', {
     *   series: [{
     *     value: 20,
     *     name: 'Series 1',
     *     className: 'my-custom-class-one',
     *     meta: 'Meta One'
     *   }, {
     *     value: 10,
     *     name: 'Series 2',
     *     className: 'my-custom-class-two',
     *     meta: 'Meta Two'
     *   }, {
     *     value: 70,
     *     name: 'Series 3',
     *     className: 'my-custom-class-three',
     *     meta: 'Meta Three'
     *   }]
     * });
     */


    function Pie(query, data, options, responsiveOptions) {
      Chartist.Pie.super.constructor.call(this, query, data, defaultOptions, Chartist.extend({}, defaultOptions, options), responsiveOptions);
    } // Creating pie chart type in Chartist namespace


    Chartist.Pie = Chartist.Base.extend({
      constructor: Pie,
      createChart: createChart,
      determineAnchorPosition: determineAnchorPosition
    });
  })(this || global, Chartist);

  return Chartist;
});
},{}],"i5Wi":[function(require,module,exports) {
"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _moment = _interopRequireDefault(require("moment"));

var _convertUnits = _interopRequireDefault(require("convert-units"));

var _chartist = _interopRequireDefault(require("chartist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appVersion = "3.51";
var riverInfo = [{
  "river": "Cape Fear River",
  "siteID": "02102500",
  "state": "North Carolina",
  "safe_range": {
    "min": 500,
    "max": 1250
  },
  "flow_range_source": {
    "link": "https://capefearadventures.com/cape-fear-river-info/water-levels",
    "name": "Cape Fear Adventures"
  },
  "height_range": {
    "min": 2,
    "max": 7
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065"
  },
  "geo_location": {
    "lat": "35.4061111",
    "long": "-78.8133333"
  }
}, {
  "river": "Catawba River",
  "siteID": "02145000",
  "state": "North Carolina",
  "safe_range": {
    "min": 2500,
    "max": 3600
  },
  "flow_range_source": {
    "link": "https://rockinriveradventures.com/river-levels/",
    "name": "Rockin River Adventures"
  },
  "height_range": {
    "min": 2,
    "max": 8
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065"
  },
  "geo_location": {
    "lat": "35.28527778",
    "long": "-81.1011111"
  }
}, {
  "river": "Clinch River",
  "siteID": "03527220",
  "state": "Virginia",
  "safe_range": {
    "min": 100,
    "max": 900
  },
  "flow_range_source": {
    "link": "https://waterdata.usgs.gov/nwis/uv?site_no=03524000",
    "name": "Estimation based on averages from USGS"
  },
  "height_range": {
    "min": 1,
    "max": 6
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065"
  },
  "geo_location": {
    "lat": "36.57280708",
    "long": "-82.938754"
  }
}, {
  "river": "Congaree River",
  "siteID": "02169500",
  "state": "South Carolina",
  "safe_range": {
    "min": 1000,
    "max": 4000
  },
  "flow_range_source": {
    "link": "https://palmettooutdoor.com/faq-page",
    "name": "Palmettoo Outdoor"
  },
  "height_range": {
    "min": 2.5,
    "max": 7
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065"
  },
  "geo_location": {
    "lat": "33.99320985",
    "long": "-81.049815"
  }
}, {
  "river": "Dan River",
  "siteID": "02071000",
  "state": "North Carolina",
  "safe_range": {
    "min": 250,
    "max": 800
  },
  "flow_range_source": {
    "link": "https://waterdata.usgs.gov/usa/nwis/uv?site_no=02071000",
    "name": "Estimation based on averages from USGS"
  },
  "height_range": {
    "min": 1,
    "max": 10
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065"
  },
  "geo_location": {
    "lat": "36.4125",
    "long": "-79.8261111"
  }
}, {
  "river": "French Broad River",
  "siteID": "03451500",
  "state": "North Carolina",
  "safe_range": {
    "min": 500,
    "max": 2900
  },
  "flow_range_source": {
    "link": "https://www.frenchbroadoutfitters.com/river-flow-charts/",
    "name": "French Broad Outfitters"
  },
  "height_range": {
    "min": 1.5,
    "max": 4
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065",
    "water_temperature": "00010"
  },
  "geo_location": {
    "lat": "35.60888889",
    "long": "-82.5780556"
  }
}, {
  "river": "Holston North Fork",
  "siteID": "03490000",
  "state": "Virginia",
  "safe_range": {
    "min": 75,
    "max": 500
  },
  "flow_range_source": {
    "link": "https://waterdata.usgs.gov/nwis/uv?03488000",
    "name": "Estimation based on averages from USGS"
  },
  "height_range": {
    "min": .5,
    "max": 4
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065",
    "water_temperature": "00010"
  },
  "geo_location": {
    "lat": "36.60871119",
    "long": "-82.567931"
  }
}, {
  "river": "James River",
  "siteID": "02019500",
  "state": "Virginia",
  "safe_range": {
    "min": 300,
    "max": 900
  },
  "flow_range_source": {
    "link": "http://jamesriver.com/river-conditions/",
    "name": "James River Runners"
  },
  "height_range": {
    "min": 1,
    "max": 3
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065"
  },
  "geo_location": {
    "lat": "37.53068995",
    "long": "-79.6789281"
  }
}, {
  "river": "Maury River",
  "siteID": "02024000",
  "state": "Virginia",
  "safe_range": {
    "min": 100,
    "max": 600
  },
  "flow_range_source": {
    "link": "https://www.wildernesscanoecompany.com/river-gauge.html",
    "name": "Wilderness Canoe Company"
  },
  "height_range": {
    "min": 2,
    "max": 3.75
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065"
  },
  "geo_location": {
    "lat": "37.76263275",
    "long": "-79.3914251"
  }
}, {
  "river": "New River",
  "siteID": "03161000",
  "state": "North Carolina",
  "safe_range": {
    "min": 400,
    "max": 1000
  },
  "flow_range_source": {
    "link": "https://www.ncparks.gov/new-river-state-park/home",
    "name": "New River State Park"
  },
  "height_range": {
    "min": 1,
    "max": 4.5
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065"
  },
  "geo_location": {
    "lat": "36.3933333",
    "long": "-81.4069444"
  }
}, {
  "river": "Saluda River",
  "siteID": "02167000",
  "state": "South Carolina",
  "safe_range": {
    "min": 600,
    "max": 1300
  },
  "flow_range_source": {
    "link": "https://www.dominionenergy.com/lakes-and-recreation/lower-saluda-river-sc",
    "name": "Dominion Energy"
  },
  "height_range": {
    "min": 2,
    "max": 6
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065"
  },
  "geo_location": {
    "lat": "34.17457619",
    "long": "-81.864002"
  }
}, {
  "river": "South Fork Shenandoah",
  "siteID": "01629500",
  "state": "Virginia",
  "safe_range": {
    "min": 300,
    "max": 1200
  },
  "flow_range_source": {
    "link": "https://shenandoah-river.com/canoe-kayak-tube-raft-rentals/river-levels-new/",
    "name": "Shenandoah River Outfitters"
  },
  "height_range": {
    "min": 2,
    "max": 5.5
  },
  "site_parameters": {
    "discharge": "00060",
    "gage_height": "00065"
  },
  "geo_location": {
    "lat": "38.6462305",
    "long": "-78.5347329"
  }
}]; // Places info formatted as such
// 'river_name': [
//   {
//     "business_name": name,
//     "business_maps_link": link,
//     "business_rating": 0-5,
//     "business_contact": phone
//   },
//   etc...
// ]
// This function returns a state abbrivation

function abbrState(input, to) {
  var states = [['Arizona', 'AZ'], ['Alabama', 'AL'], ['Alaska', 'AK'], ['Arkansas', 'AR'], ['California', 'CA'], ['Colorado', 'CO'], ['Connecticut', 'CT'], ['Delaware', 'DE'], ['Florida', 'FL'], ['Georgia', 'GA'], ['Hawaii', 'HI'], ['Idaho', 'ID'], ['Illinois', 'IL'], ['Indiana', 'IN'], ['Iowa', 'IA'], ['Kansas', 'KS'], ['Kentucky', 'KY'], ['Louisiana', 'LA'], ['Maine', 'ME'], ['Maryland', 'MD'], ['Massachusetts', 'MA'], ['Michigan', 'MI'], ['Minnesota', 'MN'], ['Mississippi', 'MS'], ['Missouri', 'MO'], ['Montana', 'MT'], ['Nebraska', 'NE'], ['Nevada', 'NV'], ['New Hampshire', 'NH'], ['New Jersey', 'NJ'], ['New Mexico', 'NM'], ['New York', 'NY'], ['North Carolina', 'NC'], ['North Dakota', 'ND'], ['Ohio', 'OH'], ['Oklahoma', 'OK'], ['Oregon', 'OR'], ['Pennsylvania', 'PA'], ['Rhode Island', 'RI'], ['South Carolina', 'SC'], ['South Dakota', 'SD'], ['Tennessee', 'TN'], ['Texas', 'TX'], ['Utah', 'UT'], ['Vermont', 'VT'], ['Virginia', 'VA'], ['Washington', 'WA'], ['West Virginia', 'WV'], ['Wisconsin', 'WI'], ['Wyoming', 'WY']];

  if (to == 'abbr') {
    input = input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    for (var i = 0; i < states.length; i++) {
      if (states[i][0] == input) {
        return states[i][1];
      }
    }
  } else if (to == 'name') {
    input = input.toUpperCase();

    for (i = 0; i < states.length; i++) {
      if (states[i][1] == input) {
        return states[i][0];
      }
    }
  }
} // This function genrates the selection menu


function generateSelectionMenu() {
  // Iterate through the river info to determine the dropdow groupings
  var selectionGroups = [];

  for (var i = 0; i < riverInfo.length; i++) {
    if (i == 0) {
      selectionGroups.push(riverInfo[i].state);
    } else {
      if (selectionGroups.includes(riverInfo[i].state) == false) {
        selectionGroups.push(riverInfo[i].state);
      }
    }
  } // Iterate over each selection group, placing the group in the item-list


  for (var i = 0; i < selectionGroups.length; i++) {
    var currentGroup = '<div id="' + abbrState(selectionGroups[i], 'abbr') + '-group" class="item-group" data-state="' + selectionGroups[i] + '"></div>';
    (0, _jquery.default)('.item-list').append(currentGroup);
  } // Iterate over each item in the river info list, placing each one in its appropriate dropdown group


  riverInfo.forEach((riverData, i) => {
    var selectionIDText = riverData.river.toLowerCase().split(" ").join("-") + "-selection";
    var currentItem = document.createElement('div');
    currentItem.id = riverData.river.toLowerCase().split(" ").join("-") + '-selection';
    currentItem.classList.add('item');
    currentItem.dataset.index = i;
    currentItem.addEventListener('click', () => selectItem(selectionIDText));
    currentItem.innerHTML = riverData.river;
    var itemGroup = '#' + abbrState(riverData.state, 'abbr') + '-group';
    (0, _jquery.default)(itemGroup).append(currentItem);
  });
} // This function determines the max dropdown width and stores it in a data attribute on the dropdown wrapper. This width is measured in 'ch' and is determined by the longest river name


function maxDropdownWidth() {
  // Create an array of all river names
  let riverNameArray = [];

  for (var i = 0; i < riverInfo.length; i++) {
    riverNameArray.push(riverInfo[i].river);
  } // Iterate through the river name array to find the longest name


  let maxLength = 0;

  for (var i = 0; i < riverNameArray.length; i++) {
    if (riverNameArray[i].length > maxLength) {
      maxLength = riverNameArray[i].length;
    }
  }

  document.querySelector("#dropdown-wrapper").setAttribute("data-max-length", maxLength);
} // This function expands and collapses the dropdown menu when it is clicked on


(0, _jquery.default)('.selected-river').click(function () {
  let openWidth = parseInt(document.querySelector("#dropdown-wrapper").getAttribute("data-max-length"));

  if ((0, _jquery.default)('#dropdown-wrapper').attr('data-open') == 'false') {
    // Open the menu
    var dropdownWidth = (0, _jquery.default)('#dropdown-wrapper').width();
    (0, _jquery.default)('#dropdown-wrapper').attr('data-open', 'true');
    (0, _jquery.default)('#dropdown-wrapper').css('height', '').css('width', openWidth + 3 + 'ch');
    (0, _jquery.default)('body').css('background-color', '#C4C4C4');
    (0, _jquery.default)('.selected-river').css('background-color', '').css('width', openWidth + 3 + 'ch');
  } else {
    // Close the menu
    (0, _jquery.default)('#dropdown-wrapper').attr('data-open', 'false');
    (0, _jquery.default)('#dropdown-wrapper').height((0, _jquery.default)('.selected-river').height() + 16).width((0, _jquery.default)('.selected-river').text().length + 3 + 'ch');
    (0, _jquery.default)('body').css('background-color', '');
    (0, _jquery.default)('.selected-river').width((0, _jquery.default)('.selected-river').text().length + 3 + 'ch').css('background-color', 'rgba(29, 29, 29, 0)');
  }
}); // This function closes the menu if the user clicks anywhere outside of the menu

(0, _jquery.default)(document).click(function (e) {
  if ((0, _jquery.default)(e.target).closest("#dropdown-wrapper").length === 0 && (0, _jquery.default)('#answer > .container').text().trim().length < 1) {
    (0, _jquery.default)('#dropdown-wrapper').attr('data-open', 'false');
    (0, _jquery.default)('#dropdown-wrapper').height((0, _jquery.default)('.selected-river').height() + 16).width((0, _jquery.default)('.selected-river').text().length + 3 + 'ch');
    (0, _jquery.default)('body').css('background-color', '');
    (0, _jquery.default)('.selected-river').width((0, _jquery.default)('.selected-river').text().length + 3 + 'ch').css('background-color', 'rgba(29, 29, 29, 0)');
  }
}); // This function sets the selected item when an item in the dropdown menu is clicked

function selectItem(itemID) {
  (0, _jquery.default)('.item').css('background-color', '');
  (0, _jquery.default)('#' + itemID).css('background-color', 'rgba(29, 29, 29, .1)');
  (0, _jquery.default)('.selected-river').empty().text((0, _jquery.default)('#' + itemID).text()).attr('data-index', (0, _jquery.default)('#' + itemID).attr('data-index')); // Close the menu

  (0, _jquery.default)('#dropdown-wrapper').attr('data-open', 'false');
  (0, _jquery.default)('#dropdown-wrapper').height((0, _jquery.default)('.selected-river').height() + 16).width((0, _jquery.default)('.selected-river').text().length + 3 + 'ch');
  (0, _jquery.default)('body').css('background-color', '');
  (0, _jquery.default)('.selected-river').width((0, _jquery.default)('.selected-river').text().length + 3 + 'ch').css('background-color', 'rgba(29, 29, 29, 0)'); // Darken the content-question text

  (0, _jquery.default)('.content-question').css('opacity', '1'); // Drop down the CTA

  (0, _jquery.default)('.cta-mask > .container').css('transform', 'translateY(0%)');
} // Dectect when the user clicks Check Now and run the transition sequence


(0, _jquery.default)('.cta-wrapper').click(async function () {
  // Prepare the scene to transition
  // Grab the site data
  var selectedRiverIndex = parseInt((0, _jquery.default)('.selected-river').attr('data-index'));
  var siteCode = riverInfo[selectedRiverIndex].siteID;
  var selectedRiver = riverInfo[selectedRiverIndex].river; // Grab the site parameters

  let currentParametersObject = riverInfo[selectedRiverIndex].site_parameters;
  var siteParameterNames = Object.keys(currentParametersObject);
  var siteParameters = [];

  for (var i = 0; i < siteParameterNames.length; i++) {
    siteParameters.push(currentParametersObject[siteParameterNames[i]]);
  } // Name of the real-time cookie for the current site


  var currentSiteCookieName = "canitube_" + selectedRiver + "_currentdata"; // Name of the real-time height cookie

  var currentSiteHeightCookieName = "canitube_" + selectedRiver + "_currentheight"; // Save the currently selected river in the previous river selection cookie

  writeCookie('canitube_User_Previous Selection', selectedRiver, 48); // Delete the item list

  (0, _jquery.default)('.item-list').remove(); // Create the fake loading bar keyframes

  var loadTime = 4000;
  generateLoadFrames(loadTime); // Position the Subtitles

  (0, _jquery.default)('#left-subtitle').css('top', (0, _jquery.default)('#left-content-question').offset().top).css('left', (0, _jquery.default)('#left-content-question').offset().left).css('transform', 'translate(0%, 0%)');
  (0, _jquery.default)('#right-subtitle').css('top', (0, _jquery.default)('#right-content-question').offset().top).css('left', (0, _jquery.default)('#right-content-question').offset().left).css('transform', 'translate(0%, 0%)'); // Position the Title

  (0, _jquery.default)('#fill-title').text((0, _jquery.default)('.selected-river').text()).css('top', (0, _jquery.default)('.selected-river').offset().top).css('left', (0, _jquery.default)('.selected-river').offset().left).css('transform', 'translate(0%, 0%)').attr('data-text', (0, _jquery.default)('.selected-river').text());
  (0, _jquery.default)('#stroke-title').text((0, _jquery.default)('.selected-river').text()).css('top', (0, _jquery.default)('.selected-river').offset().top).css('left', (0, _jquery.default)('.selected-river').offset().left).css('transform', 'translate(0%, 0%)'); // Begin the transition to load state
  // Animate out the dropdown arrow and CTA

  (0, _jquery.default)('.cta-mask > .container').css('transform', 'translateY(125%)');
  (0, _jquery.default)('#dropdown-wrapper').attr('data-open', '').attr('data-animating', 'true'); // Fill in today's date

  (0, _jquery.default)('.date-mask > .container').text((0, _moment.default)().format("MMM Do")); // Fill in the range tooltip text

  var rangeTooltip = 'This range should only be used as a rough estimate. Always check\nwith local outfitters or state/national parks before visiting.\n';
  (0, _jquery.default)('#range-tooltip > .container > .tooltip-item').text(rangeTooltip).append('<span class="tooltip-subtext">This data was sourced from: <a href="' + riverInfo[selectedRiverIndex].flow_range_source.link + '" target="_blank">' + riverInfo[selectedRiverIndex].flow_range_source.name + '</a></span>'); // Start the call to the USGS after animating to the loading phase

  loadingStage(); // Check if data already exists in local storage

  let dataExistsInLocalStorage = true;

  for (var i = 0; i < siteParameterNames.length; i++) {
    // For each parameter, check if they exist in local storage
    let parameterName = siteParameterNames[i].split('_').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' ');
    let currentItemName = 'canitube_' + selectedRiver + '_Current ' + parameterName;

    if (checkLocalStorage(currentItemName) == false && dataExistsInLocalStorage == true) {
      dataExistsInLocalStorage = false;
    }
  } // If dataExistsInLocalStorage is no longer true the data needs to be requested from USGS


  if (dataExistsInLocalStorage == false) {
    // Ring up the bois over at USGS for some spicy data
    var siteValues = await fetchRealTimeData(siteCode, siteParameters); // Store returned site data in local storage

    for (var i = 0; i < siteParameterNames.length; i++) {
      // For each parameter value, store an item in local storage
      // "discharge": "00060",
      // "gage_height": "00065",
      // "water_temperature": "00010"
      let parameterName = siteParameterNames[i].split('_').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' ');
      let currentItemName = 'canitube_' + selectedRiver + '_Current ' + parameterName;
      writeLocalStorage(currentItemName, siteValues[siteParameters[i]], ['hourstil', 1], 'River');
    } // Link up site values read to the functions below

  } else {
    // Load up the site data that is already in local storage
    console.log("Data Already Present in Local Storage!");
    var siteValues = {};

    for (var i = 0; i < siteParameterNames.length; i++) {
      // For each parameter value, store an item in local storage
      // "discharge": "00060",
      // "gage_height": "00065",
      // "water_temperature": "00010"
      let parameterName = siteParameterNames[i].split('_').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' ');
      let currentItemName = 'canitube_' + selectedRiver + '_Current ' + parameterName;
      siteValues[siteParameters[i]] = readLocalStorage(currentItemName).value;
    }
  } // Set the value varibles to the returned data


  var realTimeFlowValue = siteValues["00060"];
  var realTimeHeightValue = siteValues["00065"]; // Most sites don't have water temp values, and for those that don't 'null' is passed so the current condition display knows to style the water temp reading

  var realTimeWaterTemp = siteValues["00010"] || 'null'; // If the realTimeWaterTemp is 'null' this value has not been stored in Local Storage yet

  if (realTimeWaterTemp == 'null') {
    writeLocalStorage('canitube_' + selectedRiver + '_Current Water Temperature', realTimeWaterTemp, ['hourstil', 1], 'River');
  } // Finish the load-bar


  (0, _jquery.default)('#fill-title').removeClass('load-bar').addClass('load-bar-finish'); // Finish the load-bar

  (0, _jquery.default)('.text-load').addClass('text-load-finish').removeClass('text-load');
  gsap.to('#loader-text', {
    duration: .375,
    opacity: 0
  }); // Begin styling and transitioning the page

  var currentSafeRange = riverInfo[selectedRiverIndex].safe_range; // Calculate the look of the height range

  var currentHeightRange = riverInfo[selectedRiverIndex].height_range; // Store site information for page formatting (Weather Update)

  let siteLocation = riverInfo[selectedRiverIndex].geo_location;
  let siteName = riverInfo[selectedRiverIndex].river;
  let unitSet = "imperial"; // Test if the current flow value is within the safe range

  if (realTimeFlowValue > currentSafeRange.min - 1 && realTimeFlowValue < currentSafeRange.max + 1) {
    // Test if the average value is within a percentage of the safe range
    var rangeVariance = .25;
    var rangeSize = currentSafeRange.max - currentSafeRange.min;
    var superSafeRange = {
      "min": currentSafeRange.min + rangeSize * (rangeVariance / 2),
      "max": currentSafeRange.max - rangeSize * rangeVariance
    };

    if (realTimeFlowValue > superSafeRange.min - 1 && realTimeFlowValue < superSafeRange.max + 1) {
      // Today is safe
      console.log("Today is safe!");
      formatPage("yes", realTimeFlowValue, realTimeHeightValue, currentSafeRange, currentHeightRange, siteLocation, siteName, unitSet);
    } else {
      // Today is maybe safe
      console.log("Today is maybe safe?");
      formatPage("maybe", realTimeFlowValue, realTimeHeightValue, currentSafeRange, currentHeightRange, siteLocation, siteName, unitSet);
    }
  } else {
    // Today is not safe
    console.log("Today is not safe!");
    formatPage("no", realTimeFlowValue, realTimeHeightValue, currentSafeRange, currentHeightRange, siteLocation, siteName, unitSet);
  }
}); // This function removes elements based on a passed selector

function removeElement(selector) {
  (0, _jquery.default)(selector).remove();
} // This function adds a class to elements based on a passed selector


function elementAddClass(className, selector) {
  (0, _jquery.default)(selector).addClass(className);
} // This function determines the position away from the side that a subtitle would need to be


function subtitleSidePosition(subWidth, titleWidth, subScale, titleScale, marginBetween) {
  var subHalfWidth = subWidth * subScale / 2;
  var titleHalfWidth = titleWidth * titleScale / 2; // Calculate how far from the center this title needs to be

  var centerOffset = subHalfWidth + titleHalfWidth + marginBetween;
  var offset = (0, _jquery.default)(window).width() / 2 - centerOffset;
  return offset;
} // This function places the @keyframes animation for the loader bar and loader text in a style element within the head of the page


function generateLoadFrames(time) {
  var percentDone = 0;
  var timeLeft = time;
  var timeRange = {
    "max": 500,
    "min": 38
  };
  var ary = [];

  do {
    if (percentDone < 90) {
      var percentLeft = 100 - percentDone;
      var percentRandom = getRandomInt(percentLeft * .1, percentLeft / 2);
      percentDone = percentDone + percentRandom;
      var transition = getRandomInt(timeRange.min, timeRange.max);
      timeLeft = timeLeft - transition;
      var delay = getRandomInt(timeLeft * .1, timeLeft / 2);
      timeLeft = timeLeft - delay;
      ary.push(percentDone);
      ary.push(transition);
      ary.push(Math.abs(delay));
    } else {
      var transition = getRandomInt(timeRange.min, timeRange.max);
      var delay = timeLeft - transition;
      ary.push(100);
      ary.push(transition);
      ary.push(Math.abs(delay));
      percentDone = 100;
      timeLeft = 0;
    }
  } while (percentDone < 100); // This function generates a keyframe line based on input values


  function progressScale(scalePercent, previousScale, startTime, endTime, totalTime) {
    var easeChoice = getRandomInt(0, 3);

    if (easeChoice == 0) {
      easeChoice = 'linear';
    }

    if (easeChoice == 1) {
      easeChoice = 'ease-in';
    }

    if (easeChoice == 2) {
      easeChoice = 'ease-out';
    }

    if (easeChoice == 3) {
      easeChoice = 'ease';
    }

    var stepStartPercent = Math.round(startTime / totalTime * 1000) / 10;
    var stepEndPercent = Math.round(endTime / totalTime * 1000) / 10; // If the scale percent is more than 96, change it to be only a few more than previous percent, this allows us to have an 'unfinished load bar'

    if (previousScale > 0) {
      previousScale = previousScale - 4;
    }

    if (scalePercent > 0) {
      if (scalePercent >= 97) {
        scalePercent = previousScale + 4;
      } else {
        scalePercent = scalePercent - 4;
      }
    }

    var stepStart = '\t' + stepStartPercent + '%    {clip-path: polygon(0% 0%, ' + previousScale + '% 0%, ' + previousScale + '% 100%, 0% 100%); animation-timing-function: ' + easeChoice + ';}';
    var stepEnd = '\t' + stepEndPercent + '%    {clip-path: polygon(0% 0%, ' + scalePercent + '% 0%, ' + scalePercent + '% 100%, 0% 100%); animation-timing-function: linear;}';
    var stepAll = [stepStart, stepEnd];
    return stepAll.join("\n");
  } // This function generates a keyframe line for text based on input values


  function progressText(scalePercent, previousScale, startTime, endTime, totalTime) {
    var easeChoice = getRandomInt(0, 3);
    var stepStartPercent = Math.round(startTime / totalTime * 1000) / 10;
    var stepEndPercent = Math.round(endTime / totalTime * 1000) / 10; // If the scale percent is more than 96, change it to be only a few more than previous percent, this allows us to have an 'unfinished load bar'

    if (previousScale > 0) {
      previousScale = previousScale - 4;
    }

    if (scalePercent > 0) {
      if (scalePercent >= 97) {
        scalePercent = previousScale + 4;
      } else {
        scalePercent = scalePercent - 4;
      }
    }

    var stepStart = '\t' + stepStartPercent + '%    {content:"Loading ' + previousScale + '%";}';
    var stepEnd = '\t' + stepEndPercent + '%    {content:"Loading ' + scalePercent + '%";}';
    var stepAll = [stepStart, stepEnd];
    return stepAll.join("\n");
  } // Create the keyframes


  var openKeyframe = '@keyframes loadIn {\n\t0%    {clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%); animation-timing-function: linear;}';
  var closeKeyframe = '}';
  var keyframes = [openKeyframe];
  var openTextKeyframe = '@keyframes loadTextIn {';
  var closeTextKeyframe = '}';
  var textKeyframes = [openTextKeyframe];
  var elapsedTime = 0;
  var allTime = 0; // Add up the total amount of time

  for (var i = 0; i < ary.length;) {
    allTime = allTime + ary[i + 1] + ary[i + 2];
    i = i + 3;
  }

  for (var j = 0; j < ary.length;) {
    if (j > 2) {
      var previousScale = ary[j - 3];
    } else {
      var previousScale = 0;
    }

    var timeToStart = elapsedTime + ary[j + 2];
    elapsedTime = elapsedTime + ary[j + 1] + ary[j + 2];
    var currentKeyframe = progressScale(ary[j], previousScale, timeToStart, elapsedTime, allTime);
    keyframes.push(currentKeyframe);
    var currentTextKeyframe = progressText(ary[j], previousScale, timeToStart, elapsedTime, allTime);
    textKeyframes.push(currentTextKeyframe);
    j = j + 3;
  }

  keyframes.push(closeKeyframe);
  textKeyframes.push(closeTextKeyframe); // Create the bar class

  var barLoadClass = '.load-bar::after {\n\tanimation: loadIn ' + time / 1000 + 's linear both;\n\tclip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);\n\tcolor: #1D1D1D;\n\tcontent: attr(data-text);\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 0;\n\twidth: 100%;\n\ttransform: translate(0%, -50%);\n\tz-index: -1;\n}';
  var barFinishLoadClass = '.load-bar-finish::after {\n\tclip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);\n\tcolor: #1D1D1D;\n\tcontent: attr(data-text);\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 0;\n\twidth: 100%;\n\ttransform: translate(0%, -50%);\n\tz-index: -1;\n}'; // Create the loader text class

  var textLoadClass = '.text-load::after {\n\tposition: relative;\n\tdisplay: block;\n\twidth: 100%;\n\theight: 100%;\n\tcontent: "Loading 0%";\n\twhite-space: nowrap;\n\tfont-family: "Kayak Sans Regular", arial, sans-serif;\n\tletter-spacing: 1px;\n\tfont-size: 16px;\n\tcolor: #1D1D1D;\n\ttext-align: center;\n\ttext-transform: uppercase;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tanimation: loadTextIn ' + time / 1000 + 's linear both;\n}';
  var textFinishLoadClass = '.text-load-finish::after {\n\tposition: relative;\n\tdisplay: block;\n\twidth: 100%;\n\theight: 100%;\n\tcontent: "Loading 100%";\n\twhite-space: nowrap;\n\tfont-family: "Kayak Sans Regular", arial, sans-serif;\n\tletter-spacing: 1px;\n\tfont-size: 16px;\n\tcolor: #1D1D1D;\n\ttext-align: center;\n\ttext-transform: uppercase;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\ttransition: .25s .125s ease;\n}';
  (0, _jquery.default)('head').append('<style type="text/css">\n' + keyframes.join('\n') + '\n' + textKeyframes.join('\n') + '\n' + barLoadClass + '\n' + barFinishLoadClass + '\n' + textLoadClass + '\n' + textFinishLoadClass + '\n</style>');
} // This function returns a random integer between a min and max value


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
} // This function fetches the current data


function fetchRealTimeData(site, parameters) {
  console.log("Fetching parameters: " + parameters + " from USGS for site: " + site);
  return new Promise((resolve, reject) => {
    _jquery.default.ajax({
      url: "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site + "&parameterCd=" + parameters.join(",") + "&siteStatus=active",
      dataType: 'JSON',
      data: '',
      success: function (json) {
        console.log("Data Retreived from site!"); // Store the returned data in an object

        let dataObject = parseRealTimeData(json, parameters); // Return the data object

        resolve(dataObject);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log("Error: AJAX request failed...");
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  });
} // This function reads the USGS JSON data and returns an object with the required values


function parseRealTimeData(data, parameterCodes) {
  let timeSeries = data.value.timeSeries; // Sort the codes alphabetically so that the lowest code comes first

  parameterCodes = parameterCodes.sort(); // Iterate over each parameter code

  let returnData = {};

  for (var i = 0; i < parameterCodes.length; i++) {
    // The time series array contains objects with each parameter code, each code is returned in numerical order, lowest codes always come first
    // Test that the current parameter matches the current code, if it doesn't, log this to the console
    if (timeSeries[i].variable.variableCode[0].value !== parameterCodes[i]) {
      console.log("Selection(timeSeries[i].variable.variableCode[0].value): " + timeSeries[i].variable.variableCode[0].value + " does not match the current parameter: " + parameterCodes[i]);
    } // Grab the current value


    let currentValue = timeSeries[i].values[0].value[0].value;
    let currentKey = parameterCodes[i];
    returnData[currentKey.toString()] = currentValue;
  }

  return returnData;
} // This function transitions from the set-up selection stage to the loading stage


function loadingStage() {
  gsap.timeline().set('#title-wrapper', {
    opacity: 1
  }).set('#stroke-title', {
    opacity: 1
  }).to('.central-content', {
    duration: .01,
    delay: .375,
    display: 'none'
  }).call(removeElement, [".central-content"]).call(removeElement, [".cta-wrapper"]).to('.border-content', {
    duration: .6,
    ease: 'power2.inOut',
    width: (0, _jquery.default)(window).width() - 150,
    opacity: 1
  }).to('#left-subtitle', {
    duration: .6,
    ease: 'power2.inOut',
    left: subtitleSidePosition((0, _jquery.default)('#left-subtitle').width(), (0, _jquery.default)('#fill-title').width(), .625, 2.25, 20),
    scale: .625,
    x: '-50%'
  }, '-=.6').to('#right-subtitle', {
    duration: .6,
    ease: 'power2.inOut',
    right: subtitleSidePosition((0, _jquery.default)('#right-subtitle').width(), (0, _jquery.default)('#fill-title').width(), .625, 2.25, 20),
    scale: .625,
    x: '50%'
  }, '-=.6').to('#fill-title', {
    duration: .6,
    ease: 'power2.inOut',
    top: '50%',
    left: '50%',
    x: '-50%',
    y: '-50%',
    scale: 2.25,
    textStroke: '0px rgba(29,29,29,1)',
    letterSpacing: 2,
    color: 'rgba(29, 29, 29, 0)'
  }, '-=.6').to('#stroke-title', {
    duration: .6,
    ease: 'power2.inOut',
    top: '50%',
    left: '50%',
    x: '-50%',
    y: '-50%',
    scale: 2.25,
    color: 'rgba(29, 29, 29, 0)'
  }, '-=.6').set('.main-title', {
    fontFamily: 'Kayak Sans Bold'
  }).call(elementAddClass, ['load-bar', '#fill-title']).call(elementAddClass, ['text-load', '#loader-text']).from('#loader-text', {
    duration: .25,
    y: '-150%'
  });
} // This function formats the page based on the determined safety


function formatPage(state, currentFlowValue, heightValue, safeRange, heightRange, siteGeoLocation, siteName, unitSet) {
  // This object contains the information to determine the formatting of each global style
  var formatChoices = {
    'yes': {
      background_color: '#2E933C',
      text_color: '#261C15',
      stroke_color: '#261C15'
    },
    'maybe': {
      background_color: '#FF7F11',
      text_color: '#E4E6C3',
      stroke_color: '#E4E6C3'
    },
    'no': {
      background_color: '#C41E3D',
      text_color: '#EAC435',
      stroke_color: '#EAC435'
    }
  }; // Swap favicons

  swapFavicon(state); // Fill in the border edge content

  (0, _jquery.default)('#low-range').text(safeRange.min);
  (0, _jquery.default)('#high-range').text(safeRange.max); // Set the range scale and position the low, high, and indicator

  if (currentFlowValue > safeRange.max) {
    var maxScale = currentFlowValue * 1.25;
  } else {
    var maxScale = safeRange.max * 1.25;
  }

  var lowLeft = safeRange.min * 100 / maxScale;
  var highLeft = safeRange.max * 100 / maxScale;
  var indicatorLeft = currentFlowValue * 100 / maxScale;
  (0, _jquery.default)('#low-range').css('left', lowLeft + '%');
  (0, _jquery.default)('#high-range').css('left', highLeft + '%');
  (0, _jquery.default)('#range-indicator').css('left', indicatorLeft + '%'); // Height content

  (0, _jquery.default)('#low-height').text(heightRange.min);
  (0, _jquery.default)('#high-height').text(heightRange.max); // Set the height scale and position the low, high, and indicator

  var heightRangeSize = heightRange.max - heightRange.min;

  if (heightValue > heightRange.max) {
    var maxHeightScale = heightValue + heightRangeSize * .25;
    var minHeightScale = 0;
  } else {
    var maxHeightScale = heightRange.max + heightRangeSize * .25;
    var minHeightScale = 0;
  }

  var lowHeightLeft = remapNumber(heightRange.min, minHeightScale, maxHeightScale, 0, 100);
  var highHeightLeft = remapNumber(heightRange.max, minHeightScale, maxHeightScale, 0, 100);
  var indicatorHeightLeft = remapNumber(heightValue, minHeightScale, maxHeightScale, 0, 100);
  (0, _jquery.default)('#low-height').css('left', lowHeightLeft + '%');
  (0, _jquery.default)('#high-height').css('left', highHeightLeft + '%');
  (0, _jquery.default)('#height-indicator').css('left', indicatorHeightLeft + '%');
  gsap.to('#background-wave', {
    duration: 2.5,
    delay: 1.25,
    ease: 'power2.inOut',
    attr: {
      'data-height': indicatorHeightLeft
    }
  }); // Set the display option to default

  (0, _jquery.default)('#icon-translation').css('transform', 'translate(3.2779px, 0px)');
  (0, _jquery.default)('#icon-sun').css('opacity', '0');
  (0, _jquery.default)('#icon-i').css('opacity', '0'); // Set the wave mask to the correct size

  (0, _jquery.default)('#background-wave > mask').attr('width', (0, _jquery.default)(window).width()).attr('height', (0, _jquery.default)(window).height());
  (0, _jquery.default)('#background-wave > mask > g > rect').attr('width', (0, _jquery.default)(window).width()).attr('height', (0, _jquery.default)(window).height()); // Add loading spinner state to graph area

  let loaderClass = 'graph-load-state-' + state;
  document.querySelector('.graph-load-state').classList.add(loaderClass); // Call a weather display update

  weatherUpdate(siteGeoLocation, siteName, unitSet, formatChoices[state].stroke_color); // Call a local business update

  localBusinessPopulate(siteGeoLocation, document.getElementById('local-outfitters'), siteName, state); // Begin the transition to the final state

  gsap.timeline().delay(.25).call(createAnswer, [state, currentFlowValue]).set('.border-content', {
    zIndex: 100
  }).set('#answer > .container', {
    y: '150%',
    color: formatChoices[state].text_color
  }).set('#current-flow > .container', {
    y: '150%',
    color: formatChoices[state].text_color
  }).set('.measurement-number', {
    color: formatChoices[state].text_color
  }).set('.border-text > .container', {
    color: formatChoices[state].text_color
  }).set('.border-text', {
    background: formatChoices[state].background_color
  }).set('.date-content', {
    skewX: 0,
    skewY: 0,
    rotation: '-90',
    scaleX: 0,
    scaleY: 1
  }).set('.date-mask > .container', {
    color: formatChoices[state].text_color
  }).set('.date-mask', {
    background: formatChoices[state].background_color
  }).set('.settings-text', {
    color: formatChoices[state].text_color
  }).set('svg .svg-stroke-style', {
    stroke: formatChoices[state].stroke_color
  }).set('svg .svg-fill-style', {
    fill: formatChoices[state].stroke_color
  }).set('.point-indicator > svg > path', {
    fill: formatChoices[state].stroke_color
  }).set('.tooltip-item', {
    color: formatChoices[state].background_color,
    background: formatChoices[state].text_color
  }).set('.forecast-item', {
    borderColor: formatChoices[state].stroke_color
  }).set('#weather-forecast', {
    borderColor: formatChoices[state].stroke_color,
    color: formatChoices[state].text_color
  }).set('.line-rule', {
    background: formatChoices[state].stroke_color
  }).set('.information-display', {
    borderColor: formatChoices[state].stroke_color,
    color: formatChoices[state].text_color
  }).set('#graph-timeline > .container', {
    height: 'auto'
  }).to('body', {
    duration: 1,
    background: formatChoices[state].background_color
  }).to('.border-content', {
    duration: .75,
    ease: 'power2.inOut',
    height: (0, _jquery.default)(window).height() - 150,
    opacity: 1
  }, '-=.25').to('#background-wave > path', {
    duration: .75,
    ease: 'power2.inOut',
    fill: formatChoices[state].text_color
  }, '-=.75').to('.footer-text', {
    duration: .75,
    ease: 'power2.inOut',
    color: formatChoices[state].text_color
  }, '-=.75').to('#fill-title', {
    duration: .75,
    ease: 'power2.inOut',
    top: 75,
    x: '-50%',
    y: '-25%',
    color: formatChoices[state].text_color
  }, '-=.75').to('#stroke-title', {
    duration: .75,
    ease: 'power2.inOut',
    top: 75,
    x: '-50%',
    y: '-25%',
    textStrokeColor: formatChoices[state].stroke_color
  }, '-=.75').to('.subtitle', {
    duration: .75,
    ease: 'power2.inOut',
    top: 75 - (0, _jquery.default)('#fill-title').height() * 2.25 * .25 / 2,
    color: formatChoices[state].text_color
  }, '-=.75').to('.border-content', {
    duration: .75,
    borderColor: formatChoices[state].stroke_color
  }, '-=.75').to('#answer > .container', {
    duration: .75,
    ease: 'power2.inOut',
    y: '0%'
  }, '-=.75').to('#current-flow > .container', {
    duration: .5,
    ease: 'power2.inOut',
    y: '0%'
  }, '-=.375').to('.date-content', {
    duration: .5,
    ease: 'power2.inOut',
    scaleX: 1,
    scaleY: 1,
    rotation: '-90',
    skewX: 0,
    skewY: 0
  }, '-=.375').to('.date-mask > .container', {
    duration: .5,
    ease: 'power2.inOut',
    x: '0%'
  }, '-=.375').to('.range-content > .container > .border-text', {
    duration: .375,
    ease: 'power2.inOut',
    scaleX: 1
  }, '-=.25').to('#range-label > .container', {
    duration: .375,
    ease: 'power2.inOut',
    y: '0%'
  }, '-=.25').to('.range-wrapper > .container > .measurement-number', {
    duration: .375,
    ease: 'power2.inOut',
    y: '0%'
  }, '-=.25').to('#range-indicator', {
    duration: .375,
    ease: 'power2.inOut',
    y: '0%'
  }, "-=.25").to('#range-unit > .container', {
    duration: .375,
    ease: 'power2.inOut',
    y: '0%'
  }, "-=.25").set('.height-content', {
    width: ((0, _jquery.default)(window).height() - 150) * .9
  }).to('.height-content > .container > .border-text', {
    duration: .375,
    ease: 'power2.inOut',
    scaleX: 1
  }, "-=.25").to('#height-label > .container', {
    duration: .375,
    ease: 'power2.inOut',
    y: '0%'
  }, '-=.25').to('.height-wrapper > .container > .measurement-number', {
    duration: .375,
    ease: 'power2.inOut',
    y: '0%'
  }, '-=.25').to('#height-indicator', {
    duration: .375,
    ease: 'power2.inOut',
    y: '0%'
  }, "-=.25").to('#height-unit > .container', {
    duration: .375,
    ease: 'power2.inOut',
    y: '0%'
  }, "-=.25").from('#settings-cog', {
    duration: 1.25,
    ease: 'power2.inOut',
    rotation: -720
  }, "-=.375").to('#settings-cog', {
    duration: .375,
    ease: 'linear',
    opacity: 1
  }, "-=1").to('#current-conditions-box', {
    duration: .5,
    ease: 'power2.inOut',
    opacity: 1
  }, "-=2.25").to('#current-conditions-box', {
    duration: 1,
    ease: 'power2.inOut',
    scale: 1
  }, "-=2.5").to('#the-download-box', {
    duration: .5,
    ease: 'power2.inOut',
    opacity: 1
  }, "-=2").to('#the-download-box', {
    duration: 1,
    ease: 'power2.inOut',
    scale: 1
  }, "-=2.5").set('#range-tooltip', {
    pointerEvents: 'all'
  }); // Call a graph update
  // generateGraph(data, maxSafeFlow, relaxPeriod, baseFlow, 16, formatChoices[state].stroke_color)
} // This function hot-swaps the favicon based on the page formatting


function swapFavicon(state) {
  // Grab the various favicons to update
  // <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png" id="favicon32">
  // <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png" id="favicon16">
  // <link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg" color="#1d1d1d" id="safari-icon"> ONLY UPDATE COLOR
  // <link rel="shortcut icon" href="assets/favicon/favicon.ico" id="faviconICO">
  // <meta name="theme-color" content="#e6e6e6" id="themeColor">
  var themeSettings = {
    'default': {
      favicon: {
        favicon32: 'assets/favicon/favicon-32x32.png',
        favicon16: 'assets/favicon/favicon-16x16.png',
        faviconICO: 'assets/favicon/favicon.ico'
      },
      theme_color: {
        safari_color: '#1d1d1d',
        theme_color: '#e6e6e6'
      }
    },
    'no': {
      favicon: {
        favicon32: 'assets/favicon/no/favicon-32x32.png',
        favicon16: 'assets/favicon/no/favicon-16x16.png',
        faviconICO: 'assets/favicon/no/favicon.ico'
      },
      theme_color: {
        safari_color: '#c41e3d',
        theme_color: '#c41e3d'
      }
    },
    'maybe': {
      favicon: {
        favicon32: 'assets/favicon/maybe/favicon-32x32.png',
        favicon16: 'assets/favicon/maybe/favicon-16x16.png',
        faviconICO: 'assets/favicon/maybe/favicon.ico'
      },
      theme_color: {
        safari_color: '#ff7f11',
        theme_color: '#ff7f11'
      }
    },
    'yes': {
      favicon: {
        favicon32: 'assets/favicon/yes/favicon-32x32.png',
        favicon16: 'assets/favicon/yes/favicon-16x16.png',
        faviconICO: 'assets/favicon/yes/favicon.ico'
      },
      theme_color: {
        safari_color: '#2e933c',
        theme_color: '#2e933c'
      }
    }
  }; // Change colors

  (0, _jquery.default)('#themeColor').attr('content', themeSettings[state].theme_color.theme_color);
  (0, _jquery.default)('#safari-icon').attr('color', themeSettings[state].theme_color.safari_color); // Change icon

  (0, _jquery.default)('#faviconICO').attr('href', themeSettings[state].favicon.faviconICO);
  (0, _jquery.default)('#favicon16').attr('href', themeSettings[state].favicon.favicon16);
  (0, _jquery.default)('#favicon32').attr('href', themeSettings[state].favicon.favicon32);
} // This function populates the answer and flow values


function createAnswer(state, currentFlow) {
  var flowText = 'Current Flow: ' + currentFlow + 'FT<span class="superscript">3</span>/S';
  (0, _jquery.default)('#current-flow > .container').append(flowText).css('font-size', '18px').css('letter-spacing', '2px');
  (0, _jquery.default)('#answer > .container').text(state.toUpperCase());
} // This function returns a remapped a number from an old value range to a new value range


function remapNumber(input, low1, high1, low2, high2) {
  return low2 + (input - low1) * (high2 - low2) / (high1 - low1);
} // This function writes a cookie with a name, data, and a number of hours before expiring


function writeCookie(name, data, hoursTilExpire) {
  var date = new Date();
  var exp = date.setTime(+date + hoursTilExpire * 3600000);
  document.cookie = name + "=" + data + ";" + "expires=" + date.toGMTString() + ";";
} // This function writes a cookie with a name, data, and a unix expire timestamp


function writeCookieUnix(name, data, unixExpire) {
  document.cookie = name + "=" + data + ";" + "expires=" + new Date(unixExpire).toGMTString() + ";";
} // This function returns the data in a cookie of a specified name


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
} // This function checks for a cookie to see if it is present


function checkCookie(name) {
  var cookieCheck = getCookie(name);

  if (cookieCheck == "") {
    return false;
  } else {
    if (cookieCheck !== "" && cookieCheck !== null) {
      return true;
    }
  }
} // This function writes data to local storage
// Expire time is an array which contains an operation cue and a value given the operation


function writeLocalStorage(name, data, expireTime, category) {
  let expiringEpoch = 0;

  if (expireTime[0] == 'epoch') {
    // Expire time provided as an exact epoch time
    expiringEpoch = expireTime[1];
  }

  if (expireTime[0] == 'hourstil') {
    // Expire time provided as hours until
    let date = new Date();
    let exp = date.setTime(+date + expireTime[1] * 3600000);
    expiringEpoch = Math.floor(exp / 1000);
  }

  if (expireTime[0] == 'eod') {
    // Expire time set to End of current day
    let midnight = new Date();
    midnight.setHours(23, 59, 59, 0);
    expiringEpoch = midnight.getTime() / 1000;
  }

  category = category || 'Default';
  const item = {
    value: data,
    category: category,
    expiry: expiringEpoch
  };
  localStorage.setItem(name, JSON.stringify(item));
} // This function reads data from local storage and returns the data and expiry in an object


function readLocalStorage(name) {
  let fetchedItem = JSON.parse(localStorage.getItem(name));
  const item = {
    'value': fetchedItem.value,
    'category': fetchedItem.category,
    'expiry': fetchedItem.expiry
  };
  return item;
} // This function checks for an item in local storage, returns a bool value if the item exists or not


function checkLocalStorage(name) {
  if (localStorage.getItem(name) === null) {
    return false;
  } else {
    return true;
  }
} // This function removes an item from local storage


function removeItemLocalStorage(name) {
  localStorage.removeItem(name);
} // This function removes items from local storage that have expired


function expireLocalStorage() {
  let search = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;

  for (; key = keys[i]; i++) {
    let item = JSON.parse(localStorage.getItem(key));
    let currentTime = new Date();
    currentTime = Math.floor(currentTime.getTime() / 1000);

    if (item.expiry <= currentTime) {
      removeItemLocalStorage(key);
    }
  }
} // This function looks for items in local storage that match a category tag


function localStorageCategorySearch(category) {
  let search = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;

  for (; key = keys[i]; i++) {
    let item = JSON.parse(localStorage.getItem(key));

    if (item.category == category) {
      search.push(key);
    }
  } // If items are found return their key array, else return false


  if (search.length > 0) {
    return search;
  } else {
    return false;
  }
} // This function draws the animated river


function drawRiverFlow(speed, height) {
  // Time value
  var t = 0; // SVG animation function

  function animateWater() {
    // Set the animation resoultion
    var resolution = parseInt((0, _jquery.default)('#performance-svg').attr('data-resolution')); // Set the animation height
    // First get the percentage of height

    var height = parseFloat((0, _jquery.default)('#background-wave').attr('data-height')); // Invert the height

    height = remapNumber(height, 0, 100, 100, 0); // Convert the percentage to a window height value
    // 0% = (($(window).height()/2)+($('.height-wrapper').width()/2)) This value represents the bottom of the height range wrapper as a pixel value from the top of the window
    // 100% = (($(window).height()/2)-($('.height-wrapper').width()/2)) This value represents the top of the height range wrapper as a pixel value from the top of the window

    var heightWrapperHeight = ((0, _jquery.default)(window).height() - 150) * .9 * .75;
    var topOfHeightRange = ((0, _jquery.default)(window).height() - 150) * .9 * .125;
    height = topOfHeightRange + heightWrapperHeight * (height / 100);
    var xAxis = []; // Create a number of X points

    for (var i = 0; i < (0, _jquery.default)(window).width() / resolution + 2; i++) {
      xAxis.push(i * resolution);
    } // This value controls the speed of the river


    var masterPhase = t * (-8 * speed);
    var points = xAxis.map(x => {
      var sinA = 8 * Math.sin((x + masterPhase) / 209);
      var sinB = 4 * Math.sin((x + masterPhase * 3.218) / 272);
      var sinC = 1 * Math.sin((x + masterPhase * 2.1047) / 729);
      var y = sinA * sinB * sinC + height;
      return [x, y];
    }); // Create the SVG path

    var path = "M0,2000 " + points.map(p => {
      return p[0] + "," + p[1];
    }).join(" L");
    (0, _jquery.default)('#background-wave > path').attr('d', path + " L" + (0, _jquery.default)(window).width() + 25 + ",2000"); // Add 1 to time

    t += 1;
    requestAnimationFrame(animateWater);
  }

  animateWater();
} // Add click event to Settings Icon


document.getElementById("settings-cog").addEventListener("click", function () {
  toggleSettings();
}); // Add click event to each settings-item that prevents them from triggering the parent click event

document.querySelectorAll(".settings-item > .container").forEach(item => {
  item.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
}); // Add click event that changes the performance settings

document.getElementById("settings-performance").addEventListener("click", function () {
  togglePerformance();
}); // Add hover pointer event changes to range tooltip
// Mouse over

document.getElementById("range-tooltip").addEventListener("mouseover", function () {
  // Using GSAP here to prevent having to store previous inline styles and change with vanilla JS cause that seems cumbersome af
  gsap.set('#range-tooltip > .container > .tooltip-item', {
    pointerEvents: 'all'
  });
}); // Mouse out

document.getElementById("range-tooltip").addEventListener("mouseout", function () {
  // Using GSAP here to prevent having to store previous inline styles and change with vanilla JS cause that seems cumbersome af
  gsap.set('#range-tooltip > .container > .tooltip-item', {
    pointerEvents: 'none'
  });
}); // This function toggles the settings open and closed

function toggleSettings() {
  // The animation timeline
  var settingsAnimationOpen = gsap.timeline({
    paused: true
  }).set('#range-tooltip', {
    pointerEvents: 'none'
  }).to('#settings-cog', {
    duration: .375,
    ease: 'power2.inOut',
    rotation: '120deg'
  }).to('#settings-performance > .container', {
    duration: .375,
    ease: 'power2.inOut',
    x: '0%',
    opacity: 1
  }, '-=.25').to('#settings-display > .container', {
    duration: .375,
    ease: 'power2.inOut',
    x: '0%',
    opacity: 1
  }, '-=.25'); // The animation timeline

  var settingsAnimationClose = gsap.timeline({
    paused: true
  }).set('#range-tooltip', {
    pointerEvents: 'all'
  }).to('#settings-cog', {
    duration: .375,
    ease: 'power2.inOut',
    rotation: '0deg'
  }).to('#settings-performance > .container', {
    duration: .375,
    ease: 'power2.inOut',
    x: '-25%',
    opacity: 0
  }, '-=.25').to('#settings-display > .container', {
    duration: .375,
    ease: 'power2.inOut',
    x: '-25%',
    opacity: 0
  }, '-=.25'); // If the settings are open, reverse the timeline, else play the timeline

  if ((0, _jquery.default)('.settings').attr('data-expanded') == 'true') {
    // When the settings close, save the current state of the options
    // Performance
    writeCookie('canitube_Settings_Performance', (0, _jquery.default)('#performance-svg').attr('data-performance'), 10000000); // Display

    writeCookie('canitube_Settings_Display', (0, _jquery.default)('#display-svg').attr('data-display'), 10000000);
    (0, _jquery.default)('.settings').attr('data-expanded', 'false');
    settingsAnimationClose.play();
  } else {
    (0, _jquery.default)('.settings').attr('data-expanded', 'true');
    settingsAnimationOpen.play();
  }
} // This function toggles the performance settings


function togglePerformance() {
  // Read the current state
  var currentState = (0, _jquery.default)('#performance-svg').attr('data-performance'); // Show the next state and store the state

  if (currentState == 'smooth') {
    // Rough
    (0, _jquery.default)('#performance-svg').attr('data-performance', 'rough');
    (0, _jquery.default)('#performance-svg > polyline').attr('points', '6.9,22.8 6.9,19.6 10.1,19.6 10.1,16.4 13.3,16.4 13.3,13.2 16.5,13.2 16.5,10 19.7,10 19.7,6.8 22.9,6.8');
    gsap.to('#performance-svg', {
      duration: .1,
      ease: SteppedEase.config(1),
      attr: {
        'data-resolution': 250
      }
    });
  } else if (currentState == 'rough') {
    // None
    (0, _jquery.default)('#performance-svg').attr('data-performance', 'none');
    (0, _jquery.default)('#performance-svg > polyline').attr('points', '6,14 7.6,14 9.2,14 10.8,14 12.4,14 14,14 15.6,14 17.2,14 18.8,14 20.4,14 22,14');
    gsap.to('#performance-svg', {
      duration: .1,
      ease: SteppedEase.config(1),
      attr: {
        'data-resolution': 1000
      }
    });
    gsap.to('#background-wave', {
      duration: .5,
      ease: 'power2.inOut',
      opacity: 0
    });
  } else {
    // Smooth
    (0, _jquery.default)('#performance-svg').attr('data-performance', 'smooth');
    (0, _jquery.default)('#performance-svg > polyline').attr('points', '6,22 7.6,20.4 9.2,18.8 10.8,17.2 12.4,15.6 14,14 15.6,12.4 17.2,10.8 18.8,9.2 20.4,7.6 22,6');
    gsap.to('#performance-svg', {
      duration: .1,
      ease: SteppedEase.config(1),
      attr: {
        'data-resolution': 100
      }
    });
    gsap.to('#background-wave', {
      duration: .5,
      ease: 'power2.inOut',
      opacity: .5
    });
  }
} // When the document is ready, aka startup function


(0, _jquery.default)(document).ready(function () {
  // Test if the Cookie Policy has been accepted, if so, remove the cookie banner
  if (getCookie('canitube_User_Cookie Policy') == 'accepted') {
    (0, _jquery.default)('#cookie-policy-banner').remove();
  } else {
    writeCookie('canitube_User_Cookie Policy', 'unaccepted', 10000000); // Add event listener to cookie-policy close button

    document.getElementById('cookie-policy-close-button').addEventListener("click", function () {
      writeCookie('canitube_User_Cookie Policy', 'accepted', 10000000);
      gsap.to('#cookie-policy-banner', {
        duration: .375,
        ease: 'power2.inOut',
        y: '-150%'
      });
      (0, _jquery.default)('#cookie-policy-banner').remove();
    });
  }

  generateSelectionMenu(); // Set the central content transform to half the width and height of its loaded width and height

  var contentWidth = (0, _jquery.default)('.central-content').width();
  var contentHeight = (0, _jquery.default)('.central-content').height();
  (0, _jquery.default)('.central-content').css('transform', 'translate(' + -contentWidth / 2 + 'px, ' + -contentHeight / 2 + 'px)'); // Store the width and height values on the object

  (0, _jquery.default)('.central-content').attr('data-w', contentWidth).attr('data-h', contentHeight); // Determine and store the max length of the dropdown wrapper

  maxDropdownWidth(); // Check local storage and expire any items that are old

  expireLocalStorage(); // Check for the previous selection

  if (checkCookie('canitube_User_Previous Selection') == true) {
    // If there was a previous river selection set it as the default selection
    document.querySelector(".selected-river").innerHTML = getCookie('canitube_User_Previous Selection'); // Set the data index of the selection to the previously selected river

    let riverSelectionID = getCookie('canitube_User_Previous Selection').toLowerCase().split(" ").join("-") + '-selection';
    let riverIndex = document.querySelector('#' + riverSelectionID).getAttribute("data-index");
    document.querySelector(".selected-river").setAttribute("data-index", riverIndex); // Set the width of .selected-river to the selected river length

    (0, _jquery.default)('#dropdown-wrapper').height((0, _jquery.default)('.selected-river').height() + 16).width((0, _jquery.default)('.selected-river').text().length + 3 + 'ch');
    (0, _jquery.default)('.selected-river').width((0, _jquery.default)('.selected-river').text().length + 3 + 'ch').css('background-color', 'rgba(29, 29, 29, 0)');
  } // Set the display boxes to 0 opacity


  gsap.set('.display-box', {
    opacity: 0,
    scale: .85
  }); // Check settings cookies

  var settingsPerformanceCookiePresent = checkCookie('canitube_Settings_Performance');
  var settingsDisplayCookiePresent = checkCookie('canitube_Settings_Display'); // If there are no settings cookies, create cookies for the default settings

  if (settingsPerformanceCookiePresent == false && settingsDisplayCookiePresent == false) {
    // Performance
    writeCookie('canitube_Settings_Performance', 'smooth', 10000000); // Display

    writeCookie('canitube_Settings_Display', 'none', 10000000);
  } else {
    // If these cookies are present, read their data and set their states
    // Performance
    var performanceSetting = getCookie('canitube_Settings_Performance');

    if (performanceSetting == 'none') {
      // None
      (0, _jquery.default)('#performance-svg').attr('data-performance', 'none');
      (0, _jquery.default)('#performance-svg > polyline').attr('points', '6,14 7.6,14 9.2,14 10.8,14 12.4,14 14,14 15.6,14 17.2,14 18.8,14 20.4,14 22,14');
      gsap.to('#performance-svg', {
        duration: .1,
        ease: SteppedEase.config(1),
        attr: {
          'data-resolution': 1000
        }
      });
      gsap.to('#background-wave', {
        duration: .5,
        ease: 'power2.inOut',
        opacity: 0
      });
    } else if (performanceSetting == 'rough') {
      // Rough
      (0, _jquery.default)('#performance-svg').attr('data-performance', 'rough');
      (0, _jquery.default)('#performance-svg > polyline').attr('points', '6.9,22.8 6.9,19.6 10.1,19.6 10.1,16.4 13.3,16.4 13.3,13.2 16.5,13.2 16.5,10 19.7,10 19.7,6.8 22.9,6.8');
      gsap.to('#performance-svg', {
        duration: .1,
        ease: SteppedEase.config(1),
        attr: {
          'data-resolution': 250
        }
      });
    } else {
      // Smooth
      (0, _jquery.default)('#performance-svg').attr('data-performance', 'smooth');
      (0, _jquery.default)('#performance-svg > polyline').attr('points', '6,22 7.6,20.4 9.2,18.8 10.8,17.2 12.4,15.6 14,14 15.6,12.4 17.2,10.8 18.8,9.2 20.4,7.6 22,6');
      gsap.to('#performance-svg', {
        duration: .1,
        ease: SteppedEase.config(1),
        attr: {
          'data-resolution': 100
        }
      });
      gsap.to('#background-wave', {
        duration: .5,
        ease: 'power2.inOut',
        opacity: .5
      });
    }

    console.log('finish display code here!');
  } // Begin the water animation


  drawRiverFlow(1, 1);
}); // Look for the key combo that triggers the dev console (SHIFT + ~)

document.addEventListener("keydown", function (zEvent) {
  if (zEvent.shiftKey && zEvent.key === "~") {
    // case sensitive
    // If the dev console doesn't already exist create it, else destory it
    if ((0, _jquery.default)('#dev-console-area').length) {
      // Destory the dev console and return to the site
      devConsoleDestory();
    } else {
      // Initalize the dev console
      devConsoleInt();
    }
  }
}); // This function creates the dev console

function devConsoleInt() {
  // Add  the console area to the front of the body
  let consoleArea = '<div id="dev-console-area"></div>';
  (0, _jquery.default)('body').prepend(consoleArea); // Add the base console elements

  (0, _jquery.default)('#dev-console-area').append('<div class="container"></div>');
  let devConsoleContentArea = (0, _jquery.default)('#dev-console-area > .container');
  let devConsoleTitle = '<div class="dev-console-info" id="dev-console-title"><div class="container">Dev Console</div></div>';
  let devConsoleInstruction = '<div class="dev-console-info" id="dev-console-instruction"><div class="container">Press SHIFT + TILDA to close the console</div></div>';
  let devConsoleTime = '<div class="dev-console-info" id="dev-console-time"><div class="container"></div></div>';
  let devConsoleVersion = '<div class="dev-console-info" id="dev-console-version"><div class="container">Can I Tube <span class="lower-case">v</span>' + appVersion + '</div></div>';
  devConsoleContentArea.append(devConsoleTitle).append(devConsoleInstruction).append(devConsoleTime).append(devConsoleVersion); // Add the Cookie wrapper and actions wrapper

  let devConsoleItemsWrapper = '<div id="dev-console-items"><div class="container"></div></div>';
  devConsoleContentArea.append(devConsoleItemsWrapper);
  let cookieWrapper = '<div id="dev-console-cookies"></div>';
  let actionsWrapper = '<div id="dev-console-actions"></div>';
  (0, _jquery.default)('#dev-console-items > .container').append(cookieWrapper).append(actionsWrapper); // Add actions to the actions wrapper

  (0, _jquery.default)('#dev-console-actions').append('<div id="actions-title">ACTIONS\n<span class="dev-console-subtitle">Warning: these actions cannot be undone.</span></div>').append('<div class="actions-item" id="clear-settings">Clear Settings</div>').append('<div class="actions-item" id="clear-all-rivers">Clear All River Data</div>').append('<div class="actions-item" id="factory-reset">Factory Reset & Reload</div>'); // Add event listeners to each action

  document.getElementById('clear-settings').addEventListener("click", function () {
    clearSettings();
  });
  document.getElementById('clear-all-rivers').addEventListener("click", function () {
    clearAllRiverData();
  });
  document.getElementById('factory-reset').addEventListener("click", function () {
    factoryReset();
  }); // Populate the cookies wrapper with each major cookie and its checkbox
  // MOVING THIS TO A FUNCTION

  generateCookies(); // Start running the time function for the console

  updateTime(); // Animate in the console

  gsap.timeline().to('#dev-console-area', {
    duration: .5,
    ease: 'power2.inOut',
    background: 'rgba(29, 29, 29, .38)'
  }).to('.central-content', {
    duration: .5,
    ease: 'power2.inOut',
    filter: 'blur(24px)'
  }, '-.5').to('#title-wrapper', {
    duration: .5,
    ease: 'power2.inOut',
    filter: 'blur(24px)'
  }, '-.5').to('.cta-wrapper', {
    duration: .5,
    ease: 'power2.inOut',
    filter: 'blur(24px)'
  }, '-.5').to('.border-content', {
    duration: .5,
    ease: 'power2.inOut',
    filter: 'blur(24px)'
  }, '-.5').to('#stroke-title', {
    duration: .5,
    ease: 'power2.inOut',
    filter: 'blur(24px)'
  }, '-.5').to('.footer', {
    duration: .5,
    ease: 'power2.inOut',
    filter: 'blur(24px)'
  }, '-.5');
} // This function removes the dev console


function devConsoleDestory() {
  gsap.timeline().to('#dev-console-area', {
    duration: .375,
    ease: 'power2.inOut',
    background: 'rgba(29, 29, 29, 0)'
  }).to('.central-content', {
    duration: .375,
    ease: 'power2.inOut',
    filter: 'blur(0px)'
  }, '-.375').to('#title-wrapper', {
    duration: .375,
    ease: 'power2.inOut',
    filter: 'blur(0px)'
  }, '-.375').to('.cta-wrapper', {
    duration: .375,
    ease: 'power2.inOut',
    filter: 'blur(0px)'
  }, '-.375').to('.border-content', {
    duration: .375,
    ease: 'power2.inOut',
    filter: 'blur(0px)'
  }, '-.375').to('#stroke-title', {
    duration: .375,
    ease: 'power2.inOut',
    filter: 'blur(0px)'
  }, '-.375').to('.footer', {
    duration: .375,
    ease: 'power2.inOut',
    filter: 'blur(0px)'
  }, '-.375').call(removeElement, ["#dev-console-area"]);
} // This function updates the console time every second


function updateTime() {
  let currentTime = (0, _moment.default)().format('MMM DD, YYYY　　hh:mm:ss A'); // Only if the dev console time div exists should this function loop

  if ((0, _jquery.default)('#dev-console-time').length) {
    // set the content of the element with the ID time to the formatted string
    (0, _jquery.default)('#dev-console-time').text(currentTime); // call this function again in 1000ms

    setTimeout(updateTime, 1000);
  }
} // This function acts as a filter method for arrays that returns only unique values


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
} // This function resets the settings to the default values


function clearSettings() {
  writeCookie('canitube_Settings_Performance', 'smooth', 1000000);
  writeCookie('canitube_Settings_Display', 'simple', 1000000);
} // This function clears all river data


function clearAllRiverData() {
  let cookieArray = document.cookie.split("; ");

  for (var i = 0; i < cookieArray.length; i++) {
    // If the cookie isn't a settings cookie
    if (cookieArray[i].split("_")[1] !== 'Settings') {
      writeCookie('canitube_' + cookieArray[i].split("_")[1] + '_' + cookieArray[i].split("_")[2].split("=")[0], 'null', -1000);
    }
  }
} // This function resets all cookies and reloads the page


function factoryReset() {
  let cookieArray = document.cookie.split("; ");

  for (var i = 0; i < cookieArray.length; i++) {
    // Delete every cookie
    writeCookie('canitube_' + cookieArray[i].split("_")[1] + '_' + cookieArray[i].split("_")[2].split("=")[0], 'null', -100);
  } // Reload the page


  location.reload();
} // This function clears all selected cookies in the dev console


function clearSelectedCookies() {
  (0, _jquery.default)('input[name="cookie-selection"]:checkbox:checked').each(function () {
    const toTitleCase = phrase => {
      return phrase.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }; // Get the current cookie name


    let currentCookieName = toTitleCase((0, _jquery.default)(this).attr('id').replace(/-/g, ' ')).split(" ");
    currentCookieName = currentCookieName.splice(0, currentCookieName.length - 2).join(" "); // Write a cookie for each data point in this group that expires in the past so the cookie is deleted

    let cookieDataListParentID = currentCookieName.toLowerCase().replace(/\s/g, '-') + '-cookies';
    (0, _jquery.default)('#' + cookieDataListParentID + ' .cookie-data-point').each(function () {
      writeCookie('canitube_' + currentCookieName + '_' + (0, _jquery.default)(this).attr('id').split("-")[2], 'null', -1000);
    });
  });
} // When any cookie is selected turn up opacity on clear selected cookie


function cookieGroupClick() {
  let checkedAmount = (0, _jquery.default)('input[name="cookie-selection"]:checkbox:checked').length;

  if (checkedAmount > 0) {
    // If there are some boxes checked
    (0, _jquery.default)('#cookie-clear-selected').css('opacity', '1');
  } else {
    // If there aren't any boxes checked
    (0, _jquery.default)('#cookie-clear-selected').css('opacity', '');
  }
} // This function refreshes and generates cookies into the dev console


function generateCookies() {
  // Check if the number of groups in the cookie pannel is the same as the number of cookies in the document currently, if they are the same number, do nothing but update the refresh counter
  if ((0, _jquery.default)('.cookie-data-point').length !== document.cookie.split("; ")) {
    // If they are not equal then add all the cookies
    (0, _jquery.default)('#dev-console-cookies').empty();
    let uniqueValueCookies = document.cookie.split("; ").map(i => i.split("_")[1]).filter(onlyUnique);

    for (var i = 0; i < uniqueValueCookies.length; i++) {
      // If the current cookie group is not weather
      let currentCookieGroup = '<div class="cookie-group" id="' + uniqueValueCookies[i].toLowerCase().replace(/\s/g, '-') + '-cookies"></div>';
      (0, _jquery.default)('#dev-console-cookies').append(currentCookieGroup); // Create the checkbox and label

      let currentCookieLabel = '<label for="' + uniqueValueCookies[i].toLowerCase().replace(/\s/g, '-') + '-cookie-data"><input type="checkbox" id="' + uniqueValueCookies[i].toLowerCase().replace(/\s/g, '-') + '-cookie-data" name="cookie-selection" value="' + uniqueValueCookies[i] + '"><div class="cookie-label">' + uniqueValueCookies[i] + '</div></label>';
      (0, _jquery.default)('#' + uniqueValueCookies[i].toLowerCase().replace(/\s/g, '-') + '-cookies').append(currentCookieLabel);
    } // Iterate over each cookie


    let allCookies = document.cookie.split("; ");

    for (var i = 0; i < allCookies.length; i++) {
      // For each cookie determine which group it belongs in
      let cookieName = allCookies[i].split("_")[1];
      let cookieDataType = allCookies[i].split("_")[2].split("=")[0];

      if (cookieDataType == 'Weather') {
        cookieDataType = '[W] ' + allCookies[i].split("_")[3].split("=")[0];
        var cookieDataName = allCookies[i].split("_")[3].split("=")[0];

        if (cookieDataName.split(" ")[0] !== 'Current') {
          // If the weather cookie is not current then its data should be replaced with an Object notation
          var cookieData = '{Object}';
        } else {
          var cookieData = allCookies[i].split("_")[3].split("=")[1];
        }
      } else {
        cookieDataType = cookieDataType.split("=")[0];
        var cookieDataName = cookieDataType;
        var cookieData = allCookies[i].split("_")[2].split("=")[1];
      } // Determine the unit of measure


      if (cookieDataName == 'currentdata') {
        var cookieUnit = 'CUFT3/S';
      } else if (cookieDataName == 'currentheight') {
        var cookieUnit = 'FT';
      } else if (cookieDataName == 'Current Temperature') {
        var cookieUnit = 'K';
      } else if (cookieDataName == 'Current Wind Speed') {
        var cookieUnit = 'M/S';
      } else if (cookieDataName == 'Current Cloud Cover') {
        var cookieUnit = '%';
      } else {
        var cookieUnit = '';
      } // Craft the current cookie data entry


      let currentCookie = '<div class="cookie-data-point" id="cookie-' + cookieName.toLowerCase() + '-' + cookieDataName.toLowerCase().replace(/\s/g, '-') + '" data-value="' + cookieData + '" data-unit="' + cookieUnit + '">' + cookieDataType + '</div>'; // Append the current data entry into the cookie group

      (0, _jquery.default)('#' + cookieName.toLowerCase().replace(/\s/g, '-') + '-cookies').append(currentCookie);
    } // Add event listeners to each cookie group


    document.querySelectorAll('.cookie-group').forEach(element => {
      element.addEventListener("click", function () {
        cookieGroupClick();
      });
    }); // Add the clear selected cookies action

    let selectedCookieClearAction = '<div id="cookie-clear-selected">Clear Selected</div>';
    (0, _jquery.default)('#dev-console-cookies').append(selectedCookieClearAction);
    document.getElementById('cookie-clear-selected').addEventListener("click", function () {
      clearSelectedCookies();
    }); // Add the refresh button

    let refreshAction = '<div id="cookie-refresh"><div id="refresh-cookie-countdown"></div></div>';
    (0, _jquery.default)('#dev-console-cookies').append(refreshAction); // Restart the refresh timer

    refreshTimer();
  } else {
    // Restart the refresh timer
    refreshTimer();
  }
} // This function creates a refresh timer in the dev console


function refreshTimer() {
  // Empty the refresh timer text
  (0, _jquery.default)('#refresh-cookie-countdown').empty(); // Start the countdown

  let timeLeft = 30;
  var refreshInterval = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(refreshInterval);
      generateCookies();
    } // Set some refresh text


    let refreshText = 'Refreshing in ' + timeLeft + ' seconds';

    if (timeLeft == 1) {
      refreshText = 'Refreshing in ' + timeLeft + ' second';
    }

    (0, _jquery.default)('#refresh-cookie-countdown').empty().text(refreshText);
    timeLeft -= 1;
  }, 1000);
} // This function updates the weather cookies for the current site


async function weatherUpdate(siteLocation, siteName, unitSet, stateColor) {
  // Find all the cookie categories currently present
  let localStorageItemSearch = localStorageCategorySearch('Weather'); // Test if there are any Weather cookies

  if (localStorageItemSearch == false) {
    console.log('There are no weather items!'); // Set the weather API item to 0 calls and expire in 24 hours

    writeLocalStorage('canitube_' + siteName + '_API Calls', 0, ['hourstil', 24], 'Weather'); // Also write a local storage item that contains the item expire date

    let expDate = new Date();
    expDate = expDate.setTime(+expDate + 24 * 3600000);
    writeLocalStorage('canitube_' + siteName + '_API Calls Expire', expDate, ['hourstil', 24], 'Weather'); // Standard API call

    let apiCallsTotal = await weatherFetch(parseFloat(siteLocation.lat), parseFloat(siteLocation.long), siteName); // Set the new total of API calls

    let apiCallsExpDate = parseInt(readLocalStorage('canitube_' + siteName + '_API Calls').expiry);
    writeLocalStorage('canitube_' + siteName + '_API Calls', apiCallsTotal, ['epoch', apiCallsExpDate], 'Weather');
  } else {
    console.log('There are weather items!'); // Test if the API call item is present

    let apiItem = checkLocalStorage('canitube_' + siteName + '_API Calls');

    if (apiItem == false) {
      console.log('There is no API calls item!'); // Set the weather API item to 0 calls and expire in 24 hours

      writeLocalStorage('canitube_' + siteName + '_API Calls', 0, ['hourstil', 24], 'Weather'); // Also write a local storage item that contains the item expire date

      let expDate = new Date();
      expDate = expDate.setTime(+expDate + 24 * 3600000);
      writeLocalStorage('canitube_' + siteName + '_API Calls Expire', expDate, ['hourstil', 24], 'Weather'); // Standard API call

      let apiCallsTotal = await weatherFetch(parseFloat(siteLocation.lat), parseFloat(siteLocation.long), siteName); // Set the new total of API calls

      let apiCallsExpDate = parseInt(readLocalStorage('canitube_' + siteName + '_API Calls').expiry);
      writeLocalStorage('canitube_' + siteName + '_API Calls', apiCallsTotal, ['epoch', apiCallsExpDate], 'Weather');
    } else {
      // If the API calls value is less than 3
      console.log('There is an API calls item! Its value is: ' + readLocalStorage('canitube_' + siteName + '_API Calls').value);
      let itemWeatherAPICalls = readLocalStorage('canitube_' + siteName + '_API Calls').value;

      if (itemWeatherAPICalls < 3) {
        console.log('There are less than 3 API calls!'); // Check if new weather data is needed

        let hourlyWeather = checkLocalStorage('canitube_' + siteName + '_Hourly Weather');
        let hourlyTemperature = checkLocalStorage('canitube_' + siteName + '_Hourly Temperature');
        let hourlyWindSpeed = checkLocalStorage('canitube_' + siteName + '_Hourly Wind Speed');
        let hourlyCloudCover = checkLocalStorage('canitube_' + siteName + '_Hourly Cloud Cover');
        let dailyWeather = checkLocalStorage('canitube_' + siteName + '_Daily Weather');
        let dailyWindSpeed = checkLocalStorage('canitube_' + siteName + '_Daily Wind Speed');
        let dailyCloudCover = checkLocalStorage('canitube_' + siteName + '_Daily Cloud Cover');

        if (hourlyWeather * hourlyTemperature * hourlyWindSpeed * hourlyCloudCover * dailyWeather * dailyWindSpeed * dailyCloudCover == 0) {
          console.log('A hourly or daily weather item is missing!'); // At least 1 of the needed items is missing, run standard item call
          // Standard API call

          let apiCallsTotal = await weatherFetch(parseFloat(siteLocation.lat), parseFloat(siteLocation.long), siteName); // Set the new total of API calls

          let apiCallsExpDate = parseInt(readLocalStorage('canitube_' + siteName + '_API Calls').expiry);
          writeLocalStorage('canitube_' + siteName + '_API Calls', apiCallsTotal, ['epoch', apiCallsExpDate], 'Weather');
        } else {
          console.log('All hourly and daily item are here!'); // All of the needed items are present, check if the current item are present

          let currentWeather = checkLocalStorage('canitube_' + siteName + '_Current Weather');
          let currentWindSpeed = checkLocalStorage('canitube_' + siteName + '_Current Wind Speed');
          let currentCloudCover = checkLocalStorage('canitube_' + siteName + '_Current Cloud Cover');
          let currentTemperature = checkLocalStorage('canitube_' + siteName + '_Current Temperature');

          if (currentWeather * currentWindSpeed * currentCloudCover * currentTemperature !== 1) {
            console.log('A current item needs to be updated!'); // The current items are not present, perform operations to update current values
            // Determine the current time as a unix timestamp and read the hourly weather values for the current values at the current hour unix timestring

            function getFirstTime(data) {
              const times = Object.keys(data);
              const now = new Date().getTime();
              const [firstTime] = times.filter(time => now < time * 1000);
              return firstTime;
            } // Store the current closest time key


            let timeKey = getFirstTime(JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Weather').value)); // Use the time key to grab the value for all of the current value items from hourly items

            let currentTemperatureJSON = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Temperature').value);
            let currentWeatherJSON = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Weather').value);
            let currentWindSpeedJSON = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Wind Speed').value);
            let currentCloudCoverJSON = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Cloud Cover').value);
            let itemCurrentTemperature = currentTemperatureJSON[timeKey];
            let itemCurrentWeather = currentWeatherJSON[timeKey];
            let itemCurrentWindSpeed = currentWindSpeedJSON[timeKey];
            let itemCurrentCloudCover = currentCloudCoverJSON[timeKey]; // Store these new current values

            let appPrefix = 'canitube';
            let itemCategory = 'Weather';
            writeLocalStorage(appPrefix + '_' + siteName + '_Current Temperature', itemCurrentTemperature, ['hourstil', 1], 'Weather');
            writeLocalStorage(appPrefix + '_' + siteName + '_Current Weather', itemCurrentWeather, ['hourstil', 1], 'Weather');
            writeLocalStorage(appPrefix + '_' + siteName + '_Current Wind Speed', itemCurrentWindSpeed, ['hourstil', 1], 'Weather');
            writeLocalStorage(appPrefix + '_' + siteName + '_Current Cloud Cover', itemCurrentCloudCover, ['hourstil', 1], 'Weather'); // Check for sun values

            let sunriseCheck = checkLocalStorage('canitube_' + siteName + '_Sunrise');
            let sunsetCheck = checkLocalStorage('canitube_' + siteName + '_Sunset');

            if (sunriseCheck * sunsetCheck !== 1) {
              console.log('Sunrise or Sunset are missing!'); // Fill Sunrise/Sunset with default values

              let sunriseDefaultTime = new Date();
              sunriseDefaultTime.setHours(5);
              sunriseDefaultTime.setMinutes(0);
              sunriseDefaultTime.setSeconds(0);
              let sunsetDefaultTime = new Date();
              sunsetDefaultTime.setHours(20);
              sunsetDefaultTime.setMinutes(0);
              sunsetDefaultTime.setSeconds(0);
              writeLocalStorage('canitube_' + siteName + '_Sunrise', Math.floor(sunriseDefaultTime.getTime() / 1000.0), ['eod']);
              writeLocalStorage('canitube_' + siteName + '_Sunset', Math.floor(sunsetDefaultTime.getTime() / 1000.0), ['eod']);
            }
          } else {
            console.log('All current items are here!'); // Check if the sun items are present

            let sunriseCheck = checkLocalStorage('canitube_' + siteName + '_Sunrise');
            let sunsetCheck = checkLocalStorage('canitube_' + siteName + '_Sunset');

            if (sunriseCheck * sunsetCheck !== 1) {
              console.log('Sunrise or Sunset are missing!'); // Fill Sunrise/Sunset with default values

              let sunriseDefaultTime = new Date();
              sunriseDefaultTime.setHours(5);
              sunriseDefaultTime.setMinutes(0);
              sunriseDefaultTime.setSeconds(0);
              let sunsetDefaultTime = new Date();
              sunsetDefaultTime.setHours(20);
              sunsetDefaultTime.setMinutes(0);
              sunsetDefaultTime.setSeconds(0);
              writeLocalStorage('canitube_' + siteName + '_Sunrise', Math.floor(sunriseDefaultTime.getTime() / 1000.0), ['epoch', sunriseDefaultTime], 'Weather');
              writeLocalStorage('canitube_' + siteName + '_Sunset', Math.floor(sunsetDefaultTime.getTime() / 1000.0), ['epoch', sunriseDefaultTime], 'Weather');
            }
          }
        }
      } else {
        // Log an error message in the console
        console.log('Total API Calls: ' + itemWeatherAPICalls + '. Not doing anything!'); // Even if there are 3 api calls, still check updates on current temperature and sun, and push error message to display.
        // Check if new weather data is needed

        let hourlyWeather = checkLocalStorage('canitube_' + siteName + '_Hourly Weather');
        let hourlyTemperature = checkLocalStorage('canitube_' + siteName + '_Hourly Temperature');
        let hourlyWindSpeed = checkLocalStorage('canitube_' + siteName + '_Hourly Wind Speed');
        let hourlyCloudCover = checkLocalStorage('canitube_' + siteName + '_Hourly Cloud Cover');
        let dailyWeather = checkLocalStorage('canitube_' + siteName + '_Daily Weather');
        let dailyWindSpeed = checkLocalStorage('canitube_' + siteName + '_Daily Wind Speed');
        let dailyCloudCover = checkLocalStorage('canitube_' + siteName + '_Daily Cloud Cover');

        if (hourlyWeather * hourlyTemperature * hourlyWindSpeed * hourlyCloudCover * dailyWeather * dailyWindSpeed * dailyCloudCover == 0) {
          // Error some data is missing
          var dataError = true;
        } else {
          // Data is here but no new API calls can be made
          // The current items are not present, perform operations to update current values
          // Determine the current time as a unix timestamp and read the hourly weather values for the current values at the current hour unix timestring
          function getFirstTime(data) {
            const times = Object.keys(data);
            const now = new Date().getTime();
            const [firstTime] = times.filter(time => now < time * 1000);
            return firstTime;
          } // Store the current closest time key


          let timeKey = getFirstTime(JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Weather').value)); // Use the time key to grab the value for all of the current value items from hourly items

          let currentTemperatureJSON = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Temperature').value);
          let currentWeatherJSON = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Weather').value);
          let currentWindSpeedJSON = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Wind Speed').value);
          let currentCloudCoverJSON = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Cloud Cover').value);
          let itemCurrentTemperature = currentTemperatureJSON[timeKey];
          let itemCurrentWeather = currentWeatherJSON[timeKey];
          let itemCurrentWindSpeed = currentWindSpeedJSON[timeKey];
          let itemCurrentCloudCover = currentCloudCoverJSON[timeKey]; // Store these new current values

          let appPrefix = 'canitube';
          let itemCategory = 'Weather';
          writeLocalStorage(appPrefix + '_' + siteName + '_Current Temperature', itemCurrentTemperature, ['hourstil', 1], 'Weather');
          writeLocalStorage(appPrefix + '_' + siteName + '_Current Weather', itemCurrentWeather, ['hourstil', 1], 'Weather');
          writeLocalStorage(appPrefix + '_' + siteName + '_Current Wind Speed', itemCurrentWindSpeed, ['hourstil', 1], 'Weather');
          writeLocalStorage(appPrefix + '_' + siteName + '_Current Cloud Cover', itemCurrentCloudCover, ['hourstil', 1], 'Weather'); // Check for sun values

          let sunriseCheck = checkLocalStorage('canitube_' + siteName + '_Sunrise');
          let sunsetCheck = checkLocalStorage('canitube_' + siteName + '_Sunset');

          if (sunriseCheck * sunsetCheck !== 1) {
            console.log('Sunrise or Sunset are missing!'); // Fill Sunrise/Sunset with default values

            let sunriseDefaultTime = new Date();
            sunriseDefaultTime.setHours(5);
            sunriseDefaultTime.setMinutes(0);
            sunriseDefaultTime.setSeconds(0);
            let sunsetDefaultTime = new Date();
            sunsetDefaultTime.setHours(20);
            sunsetDefaultTime.setMinutes(0);
            sunsetDefaultTime.setSeconds(0);
            writeLocalStorage('canitube_' + siteName + '_Sunrise', Math.floor(sunriseDefaultTime.getTime() / 1000.0), ['eod']);
            writeLocalStorage('canitube_' + siteName + '_Sunset', Math.floor(sunsetDefaultTime.getTime() / 1000.0), ['eod']);
          } // Add error message to display. Base hours measurement on API calls expiry date


          let tilExpire = readLocalStorage('canitube_' + siteName + '_API Calls').expiry;
          tilExpire = new _moment.default().to(_moment.default.unix(tilExpire));
          let errorString = 'This Data May Be inaccurate. You have reached your Max API calls for today. Don’t worry. This Error Should Resolve ' + tilExpire;
          document.querySelector("#current-conditions-content > .container").setAttribute("data-notice", errorString);
        }
      }
    }
  } // Populate the Weather Display


  dataError = dataError || false;

  if (dataError == false) {
    weatherDisplayPopulate(siteName, unitSet, stateColor);
  } else {
    // Data errored out
    console.log("Weather data error. Clearing weather data display and inputting error message!"); // Clear the weather display framework

    document.querySelector("#current-conditions-content > .container").innerHTML = ""; // Add Yikes message

    document.querySelector("#current-conditions-content > .container").insertAdjacentHTML('afterbegin', '<div id="error-message-wrapper"></div>');
    document.querySelector("#error-message-wrapper").insertAdjacentHTML('afterbegin', '<div class="container"></div>'); // Add title

    document.querySelector("#error-message-wrapper > .container").insertAdjacentHTML('afterbegin', '<div id="error-message-title"><div class="display-error-subtitle">Something Went Wrong</div><div class="display-error-title">Yikes</div></div>'); // Add copy

    document.querySelector("#error-message-wrapper > .container").insertAdjacentHTML('beforeend', '<div class="display-error-body">Looks like Can I Tube has made too many API calls from this computer today but no weather data is present!</div>'); // Add subcopy

    let tilExpire = readLocalStorage('canitube_' + siteName + '_API Calls').expiry;
    tilExpire = new _moment.default().to(_moment.default.unix(tilExpire), true);
    let errorString = 'Lucky you, this problem should resolve itself within ' + tilExpire;
    document.querySelector("#error-message-wrapper > .container").insertAdjacentHTML('beforeend', '<div class="display-error-subcopy">' + errorString + '</div>');
  }
} // This function returns the JSON object with weather data


function weatherFetch(latCoord, longCoord, siteName) {
  return new Promise((resolve, reject) => {
    _jquery.default.ajax({
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + latCoord + "&lon=" + longCoord + "&exclude=minutely&appid=c9a47e2743a3a30b52affba80fee17fe",
      dataType: 'JSON',
      data: '',
      success: function (json) {
        console.log("Weather Data Retreived!"); // Here, store the data as cookies to an app-ready format

        let appPrefix = 'canitube';
        let cookieCategory = 'Weather'; // 1 Hour Expire

        writeLocalStorage(appPrefix + '_' + siteName + '_Current Temperature', json.current.feels_like, ['hourstil', 1], 'Weather');
        writeLocalStorage(appPrefix + '_' + siteName + '_Current Weather', json.current.weather[0].id, ['hourstil', 1], 'Weather');
        writeLocalStorage(appPrefix + '_' + siteName + '_Current Wind Speed', json.current.wind_speed, ['hourstil', 1], 'Weather');
        writeLocalStorage(appPrefix + '_' + siteName + '_Current Cloud Cover', json.current.clouds, ['hourstil', 1], 'Weather'); // 8 Hour Expire
        // Hourly Data

        let hourlyWeather = {};
        let hourlyWindSpeed = {};
        let hourlyCloudCover = {};
        let hourlyTemperature = {};

        for (var i = 0; i < 24; i++) {
          hourlyWeather[json.hourly[i].dt] = json.hourly[i].weather[0].id;
          hourlyWindSpeed[json.hourly[i].dt] = json.hourly[i].wind_speed;
          hourlyCloudCover[json.hourly[i].dt] = json.hourly[i].clouds;
          hourlyTemperature[json.hourly[i].dt] = json.hourly[i].feels_like;
        }

        writeLocalStorage(appPrefix + '_' + siteName + '_Hourly Weather', JSON.stringify(hourlyWeather), ['hourstil', 8], 'Weather');
        writeLocalStorage(appPrefix + '_' + siteName + '_Hourly Wind Speed', JSON.stringify(hourlyWindSpeed), ['hourstil', 8], 'Weather');
        writeLocalStorage(appPrefix + '_' + siteName + '_Hourly Cloud Cover', JSON.stringify(hourlyCloudCover), ['hourstil', 8], 'Weather');
        writeLocalStorage(appPrefix + '_' + siteName + '_Hourly Temperature', JSON.stringify(hourlyTemperature), ['hourstil', 8], 'Weather'); // Daily Data

        let dailyWeather = {};
        let dailyWindSpeed = {};
        let dailyCloudCover = {};

        for (var i = 0; i < 4; i++) {
          dailyWeather[json.daily[i].dt] = json.daily[i].weather[0].id;
          dailyWindSpeed[json.daily[i].dt] = json.daily[i].wind_speed;
          dailyCloudCover[json.daily[i].dt] = json.daily[i].clouds;
        }

        writeLocalStorage(appPrefix + '_' + siteName + '_Daily Weather', JSON.stringify(dailyWeather), ['hourstil', 8], 'Weather');
        writeLocalStorage(appPrefix + '_' + siteName + '_Daily Wind Speed', JSON.stringify(dailyWindSpeed), ['hourstil', 8], 'Weather');
        writeLocalStorage(appPrefix + '_' + siteName + '_Daily Cloud Cover', JSON.stringify(dailyCloudCover), ['hourstil', 8], 'Weather'); // End Of Day Expire

        writeLocalStorage(appPrefix + '_' + siteName + '_Sunrise', json.current.sunrise, ['eod'], 'Weather');
        writeLocalStorage(appPrefix + '_' + siteName + '_Sunset', json.current.sunset, ['eod'], 'Weather'); // Return the number of total API calls if the data has been retreived

        let apiCalls = parseInt(readLocalStorage('canitube_' + siteName + '_API Calls').value);
        apiCalls = apiCalls + 1;
        resolve(apiCalls);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log("Error: AJAX request failed...");
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  });
} // This function populates weather data into the weather display


function weatherDisplayPopulate(siteName, unitSet, stateStroke) {
  let unitsTo = {
    "length": "",
    "speed": "",
    "temperature": "",
    "volume_flow_rate": ""
  };

  if (unitSet == 'imperial') {
    // Imperial
    // Speed: mile/hour
    // Length: feet
    // Volume Flow Rate: cubic feet/second
    // Temperature: Fahrenheit
    unitsTo.length = 'ft';
    unitsTo.speed = 'm/h';
    unitsTo.temperature = 'F';
    unitsTo.volume_flow_rate = 'ft3/s';
  } else {
    // Metric
    // Speed: metre/second
    // Length: meter
    // Volume Flow Rate: cubic meter/second
    // Temperature: Celsius
    unitsTo.length = 'm';
    unitsTo.speed = 'm/s';
    unitsTo.temperature = 'C';
    unitsTo.volume_flow_rate = 'm3/s';
  } // Update the current local temperatures
  // Check if water temperature exists for this site


  let currentWaterTemperature = "";

  if (checkLocalStorage('canitube_' + siteName + '_Water Temperature') == true) {
    currentWaterTemperature = readLocalStorage('canitube_' + siteName + '_Current Water Temperature').value;
  } else {
    currentWaterTemperature = "null";
  }

  let currentAirTemperature = readLocalStorage('canitube_' + siteName + '_Current Temperature').value; // Convert the current measurements into their appropriate units
  // Default Water Temp measurement is Celsius
  // Default Air  Temp measurement is in Kelvin
  // If current water temp is 'null' then have the temperature be '-'

  if (currentWaterTemperature == "null") {
    currentWaterTemperature = "-";
  } else {
    currentWaterTemperature = Math.round((0, _convertUnits.default)(parseFloat(currentWaterTemperature)).from('C').to(unitsTo.temperature));
  }

  currentAirTemperature = Math.round((0, _convertUnits.default)(parseFloat(currentAirTemperature)).from('K').to(unitsTo.temperature)); // Add the current measurements to their display fields
  // Water Temp

  document.querySelector("#water-temp").innerHTML = "Water: " + currentWaterTemperature;
  document.querySelector("#water-temp").insertAdjacentHTML('beforeend', '<span class="degree">o</span>');
  document.querySelector("#water-temp").insertAdjacentText('beforeend', unitsTo.temperature); // Air Temp

  document.querySelector("#air-temp").innerHTML = "Air: " + currentAirTemperature;
  document.querySelector("#air-temp").insertAdjacentHTML('beforeend', '<span class="degree">o</span>');
  document.querySelector("#air-temp").insertAdjacentText('beforeend', unitsTo.temperature); // Calculate the current condition

  let conditionTranslations = {
    "Rainy Thunderstorm": "Rainy Thunderstorm",
    "Thunderstorm": "Thunderstorm",
    "Tornado": "Tornado",
    "Mist": "Mist",
    "Smoke": "Smoke",
    "Haze": "Haze",
    "Dust": "Dust",
    "Fog": "Fog",
    "Sand": "Sand",
    "Ash": "Ash",
    "Squall": "Squall",
    "Clear Night": "Clear",
    "Clear Day": "Clear",
    "Windy Clear Day": "High Winds",
    "Few Clouds": "Partly Cloudy",
    "Cloudy": "Cloudy",
    "Windy Clouds": "High Winds",
    "Partly Sunny Drizzle": "Sunny Drizzle",
    "Drizzle": "Drizzle",
    "Partly Sunny Snow": "Sunny Snow",
    "Snow": "Snow",
    "Partly Sunny Rain": "Sunny Rain",
    "Rain": "Rain"
  };
  let currentWeatherCode = parseInt(readLocalStorage('canitube_' + siteName + '_Current Weather').value);
  let currentWindSpeed = parseFloat(readLocalStorage('canitube_' + siteName + '_Current Wind Speed').value);
  let currentCloudCover = parseFloat(readLocalStorage('canitube_' + siteName + '_Current Cloud Cover').value);
  let sunRise = parseInt(readLocalStorage('canitube_' + siteName + '_Sunrise').value);
  let sunSet = parseInt(readLocalStorage('canitube_' + siteName + '_Sunset').value);
  let currentCondition = calculateCondition(currentWeatherCode, currentWindSpeed, currentCloudCover, {
    "rise": sunRise,
    "set": sunSet
  }); // Add current condition text

  document.querySelector("#timeline-now").innerHTML = conditionTranslations[currentCondition] + " Now"; // Add the current condition SVG

  document.querySelector("#now-icon").insertAdjacentHTML('afterbegin', conditionSVG(currentCondition)); // Calculate the next biggest change in weather

  let hourlyWeather = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Weather').value);
  let hourlyWindSpeed = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Wind Speed').value);
  let hourlyCloudCover = JSON.parse(readLocalStorage('canitube_' + siteName + '_Hourly Cloud Cover').value); // Iterate over the hour array until a new condition is found or until the 24hr item is reached

  let conditionPairs = {
    "Rainy Thunderstorm": ["Thunderstorm", "Rain"],
    "Thunderstorm": ["Rainy Thunderstorm"],
    "Tornado": [],
    "Mist": ["Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall"],
    "Smoke": ["Mist", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall"],
    "Haze": ["Mist", "Smoke", "Dust", "Fog", "Sand", "Ash", "Squall"],
    "Dust": ["Mist", "Haze", "Smoke", "Fog", "Sand", "Ash", "Squall"],
    "Fog": ["Mist", "Haze", "Smoke", "Dust", "Sand", "Ash", "Squall"],
    "Sand": ["Mist", "Haze", "Smoke", "Dust", "Fog", "Ash", "Squall"],
    "Ash": ["Mist", "Haze", "Smoke", "Dust", "Fog", "Sand", "Squall"],
    "Squall": ["Mist", "Haze", "Smoke", "Dust", "Fog", "Sand", "Ash"],
    "Clear Night": ["Clear Day"],
    "Clear Day": ["Clear Night", "Windy Clear Day", "Few Clouds"],
    "Windy Clear Day": ["Clear Day", "Clear Night", "Few Clouds", "Windy Clouds"],
    "Few Clouds": ["Clear Night", "Clear Day", "Cloudy"],
    "Cloudy": ["Few Clouds", "Windy Clouds"],
    "Windy Clouds": ["Clear Night", "Clear Day", "Windy Clear Day", "Clouds"],
    "Partly Sunny Drizzle": ["Cloudy", "Drizzle", "Partly Sunny Rain"],
    "Drizzle": ["Cloudy", "Partly Sunny Drizzle"],
    "Partly Sunny Snow": ["Few Clouds", "Cloudy", "Snow"],
    "Snow": ["Cloudy", "Partly Sunny Snow"],
    "Partly Sunny Rain": ["Few Clouds", "Cloudy", "Partly Sunny Drizzle", "Rain"],
    "Rain": ["Rainy Thunderstorm", "Cloudy", "Windy Clouds", "Drizzle", "Partly Sunny Rain"]
  };
  let laterCondition = {
    "weather": "",
    "time": ""
  };

  for (var i = 0; i < 24; i++) {
    // If the end of the object is reached, set the last condition
    if (i == 23) {
      laterCondition.weather = calculateCondition(hourlyWeather[Object.keys(hourlyWeather)[i]], hourlyWindSpeed[Object.keys(hourlyWindSpeed)[i]], hourlyCloudCover[Object.keys(hourlyCloudCover)[i]], {
        "rise": sunRise,
        "set": sunSet
      });
      laterCondition.time = Object.keys(hourlyWeather)[i];
    } else {
      // Test if the hour condition is different from the current condition
      let testCondition = calculateCondition(hourlyWeather[Object.keys(hourlyWeather)[i]], hourlyWindSpeed[Object.keys(hourlyWindSpeed)[i]], hourlyCloudCover[Object.keys(hourlyCloudCover)[i]], {
        "rise": sunRise,
        "set": sunSet
      });

      if (testCondition !== currentCondition) {
        // If the hourly condition is different from the current condition and it doesn't match any of the adjcent conditions return
        if (conditionPairs[currentCondition].indexOf(testCondition) == -1) {
          laterCondition.weather = testCondition;
          laterCondition.time = _moment.default.unix(parseInt(Object.keys(hourlyWeather)[i])).local().format('hA');
          break;
        }
      }
    }
  } // Add next condition text


  document.querySelector("#timeline-later").innerHTML = conditionTranslations[laterCondition.weather] + " Likely At " + laterCondition.time; // Add the next condition SVG

  document.querySelector("#later-icon").insertAdjacentHTML('afterbegin', conditionSVG(laterCondition.weather)); // Calculate 3 days of forecast

  let dailyWeather = JSON.parse(readLocalStorage('canitube_' + siteName + '_Daily Weather').value);
  let dailyWindSpeed = JSON.parse(readLocalStorage('canitube_' + siteName + '_Daily Wind Speed').value);
  let dailyCloudCover = JSON.parse(readLocalStorage('canitube_' + siteName + '_Daily Cloud Cover').value); // Get the days of the week of the 3 day forecast

  let daysKeyList = Object.keys(dailyWeather);

  let tomorrowDOW = _moment.default.unix(parseInt(daysKeyList[1])).isoWeekday();

  let twoDayDOW = _moment.default.unix(parseInt(daysKeyList[2])).isoWeekday();

  let threeDayDOW = _moment.default.unix(parseInt(daysKeyList[3])).isoWeekday(); // Convert the DOW number to a string


  tomorrowDOW = convertDOW(tomorrowDOW, 'abr');
  twoDayDOW = convertDOW(twoDayDOW, 'abr');
  threeDayDOW = convertDOW(threeDayDOW, 'abr'); // Get the conditions for the 3 day forecast

  let tomorrowCondition = calculateCondition(dailyWeather[Object.keys(dailyWeather)[1]], dailyWindSpeed[Object.keys(dailyWindSpeed)[1]], dailyCloudCover[Object.keys(dailyCloudCover)[1]], {
    "rise": sunRise,
    "set": sunSet
  });
  let twoDayCondition = calculateCondition(dailyWeather[Object.keys(dailyWeather)[2]], dailyWindSpeed[Object.keys(dailyWindSpeed)[2]], dailyCloudCover[Object.keys(dailyCloudCover)[2]], {
    "rise": sunRise,
    "set": sunSet
  });
  let threeDayCondition = calculateCondition(dailyWeather[Object.keys(dailyWeather)[3]], dailyWindSpeed[Object.keys(dailyWindSpeed)[3]], dailyCloudCover[Object.keys(dailyCloudCover)[3]], {
    "rise": sunRise,
    "set": sunSet
  }); // Add the 3 day forecast DOWs

  document.querySelector("#tomorrow-forecast > .forecast-text").innerHTML = tomorrowDOW;
  document.querySelector("#day-two-forecast > .forecast-text").innerHTML = twoDayDOW;
  document.querySelector("#day-three-forecast > .forecast-text").innerHTML = threeDayDOW; // Add the 3 day forecast condition SVG

  document.querySelector("#tomorrow-forecast > .weather-icon").insertAdjacentHTML('afterbegin', conditionSVG(tomorrowCondition));
  document.querySelector("#day-two-forecast > .weather-icon").insertAdjacentHTML('afterbegin', conditionSVG(twoDayCondition));
  document.querySelector("#day-three-forecast > .weather-icon").insertAdjacentHTML('afterbegin', conditionSVG(threeDayCondition)); // Change stroke color to current state for all SVG stroke icons

  (0, _jquery.default)('.weather-icon > svg > path').each(function () {
    (0, _jquery.default)(this).attr('stroke', stateStroke);
  });
  (0, _jquery.default)('.weather-icon > svg > circle').each(function () {
    (0, _jquery.default)(this).attr('stroke', stateStroke);
  });
} // This function returns the current condition based on input factors (Sun Times is an object that has rise and set keys)


function calculateCondition(weatherCode, windSpeed, cloudCover, sunTimes) {
  // Calculate if its currently day or night
  let currentTime = new Date();
  currentTime = Math.floor(currentTime.getTime() / 1000);

  if (currentTime >= sunTimes.rise && currentTime < sunTimes.set) {
    var dayTime = 'Day';
  } else {
    var dayTime = 'Night';
  } // First narrow possibilities of conditions via weather code


  if (weatherCode >= 200 && weatherCode <= 299) {
    // Thunder type
    if (weatherCode !== 210 && weatherCode !== 211 && weatherCode !== 212 && weatherCode !== 221) {
      // Thunderstorm with rain
      return "Rainy Thunderstorm";
    } else {
      // Thunderstorm no rain
      return "Thunderstorm";
    }
  }

  if (weatherCode >= 700 && weatherCode <= 799) {
    // Atmospheric
    if (weatherCode == 781) {
      // Tornado
      return "Tornado";
    }

    if (weatherCode >= 701 && weatherCode <= 710) {
      // Mist
      return "Mist";
    }

    if (weatherCode >= 711 && weatherCode <= 720) {
      // Smoke
      return "Smoke";
    }

    if (weatherCode >= 721 && weatherCode <= 730) {
      // Haze
      return "Haze";
    }

    if (weatherCode >= 731 && weatherCode <= 740) {
      // Dust
      return "Dust";
    }

    if (weatherCode >= 741 && weatherCode <= 750) {
      // Fog
      return "Fog";
    }

    if (weatherCode >= 751 && weatherCode <= 760) {
      // Sand
      return "Sand";
    }

    if (weatherCode == 761) {
      // Dust
      return "Dust";
    }

    if (weatherCode >= 762 && weatherCode <= 770) {
      // Ash
      return "Ash";
    }

    if (weatherCode >= 771 && weatherCode <= 780) {
      // Squall
      return "Squall";
    }
  }

  if (weatherCode == 800) {
    // Clear
    if (dayTime == 'Night') {
      // Clear Night
      return "Clear Night";
    } else {
      // Clear Day
      if (windSpeed >= 11.176) {
        // Clear Day
        return "Clear Day";
      } else {
        // Windy Clear Day
        return "Windy Clear Day";
      }
    }
  }

  if (weatherCode >= 801 && weatherCode <= 850) {
    // Clouds
    if (weatherCode == 801) {
      // Few Clouds
      return "Few Clouds";
    } else {
      // Cloudy
      if (windSpeed >= 11.176) {
        // Cloudy Day
        return "Cloudy";
      } else {
        // Windy Cloudy Day
        return "Windy Clouds";
      }
    }
  }

  if (weatherCode >= 300 && weatherCode <= 350) {
    // Drizzle
    if (cloudCover > 25) {
      // Partly Sunny Drizzle
      return "Partly Sunny Drizzle";
    } else {
      // Drizzle
      return "Drizzle";
    }
  }

  if (weatherCode >= 600 && weatherCode <= 650) {
    // Snow
    if (cloudCover > 25) {
      // Partly Sunny Snow
      return "Partly Sunny Snow";
    } else {
      // Snow
      return "Snow";
    }
  }

  if (weatherCode >= 500 && weatherCode <= 550) {
    // Rain
    if (cloudCover > 25) {
      // Partly Sunny Rain
      return "Partly Sunny Rain";
    } else {
      // Rain
      return "Rain";
    }
  }
} // This function returns the SVG Code for each type of weather condition


function conditionSVG(condition) {
  let svgItems = {
    "Rainy Thunderstorm": '<svg data-name="Rainy Thunderstorm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M54.5 50.5a9 9 0 000-18 18 18 0 00-35.54-4h-.46a11 11 0 000 22M20.15 46.24l15.7 15.7M44.15 46.24l15.7 15.7" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M43.85 61.94L36 54.09h8l-7.85-7.85" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Thunderstorm": '<svg data-name="Thunderstorm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M46.3 50.5h8.2a9 9 0 000-18 18 18 0 00-35.54-4h-.46a11 11 0 000 22h12.93" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M43.85 61.94L36 54.09h8l-7.85-7.85" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Tornado": '<svg data-name="Tornado" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M53.12 12h-33.2a4 4 0 000 8h38.44a4 4 0 010 8H35.43a4 4 0 000 8H48a4 4 0 010 8H27.35a4 4 0 100 8h8.15a4 4 0 010 8" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Mist": '<svg data-name="Mist" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M8 50c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 38c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 26c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 14c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Smoke": '<svg data-name="Smoke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M8 50c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 38c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 26c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 14c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Haze": '<svg data-name="Haze" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M8 50c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 38c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 26c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 14c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Dust": '<svg data-name="Dust" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M8 50c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 38c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 26c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 14c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Fog": '<svg data-name="Fog" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M8 50c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 38c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 26c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 14c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Sand": '<svg data-name="Sand" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M8 50c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 38c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 26c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 14c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Ash": '<svg data-name="Ash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M8 50c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 38c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 26c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 14c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Squall": '<svg data-name="Squall" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M8 50c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 38c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 26c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8M8 14c5.6 0 5.6 8 11.2 8s5.6-8 11.2-8 5.6 8 11.19 8 5.6-8 11.21-8 5.6 8 11.2 8" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Clear Night": '<svg data-name="Clear Night" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M46.65 50.5a14.5 14.5 0 010-29 14.21 14.21 0 012.63.25 19.5 19.5 0 100 28.5 14.21 14.21 0 01-2.63.25z" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Clear Day": '<svg data-name="Clear Day" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><circle cx="36" cy="36" r="17.85" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M36 4.95v8.1M36 67.05v-8.1M67.05 36h-8.1M4.95 36h8.1M56.2 15.8l-3.97 3.97M15.8 56.2l3.97-3.97M56.2 56.2l-3.97-3.97M15.8 15.8l3.97 3.97" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Windy Clear Day": '<svg data-name="Windy Clear Day" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M31.48 8.72v6.92M31.48 61.77v-6.92M58 35.24h-6.92M4.95 35.24h6.92M48.73 17.99l-3.39 3.39M14.22 52.5l3.39-3.39M14.22 17.99l3.39 3.39" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M50.5 50.5h13a4 4 0 010 8" stroke-dasharray="1 2 1000" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M29.5 47.5h19a5 5 0 000-10" stroke-dasharray="2 4 1000" fill="none" stroke="#000" stroke-miterlimit="10"/><path d="M56.5 47.5h5a3 3 0 000-6" stroke-dasharray="1 2 1000" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M42.5 64.5a7 7 0 000-14h-11a15.24 15.24 0 1113.64-8.44" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Few Clouds": '<svg data-name="Few Clouds" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M15.75 33.28a12.5 12.5 0 0119.44-15.2M26.69 5.5v5.67M4.95 27.24h5.67M40.82 13.1l-2.78 2.78M12.55 13.1l2.78 2.78" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M57.59 35.59a18 18 0 00-35.54-4h-.46a11 11 0 000 22h36a9 9 0 000-18z" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Cloudy": '<svg data-name="Cloudy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M54.5 32.5a18 18 0 00-35.54-4h-.46a11 11 0 000 22h36a9 9 0 000-18z" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Windy Clouds": '<svg data-name="Windy Clouds" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M63 38.55a9 9 0 00-8.51-6 18 18 0 00-35.54-4h-.46a11 11 0 000 22h24a7 7 0 010 14" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M50.5 50.5h13a4 4 0 010 8" stroke-dasharray="1 2 1000" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M29.5 47.5h19a5 5 0 000-10" stroke-dasharray="2 4 1000" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M56.5 47.5h5a3 3 0 000-6" stroke-dasharray="1 2 1000" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Partly Sunny Drizzle": '<svg data-name="Partly Sunny Drizzle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M39.59 46.08v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M39.59 51.72v12.74" stroke-dasharray="3.64 3.64" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M39.59 66.28v2M47.59 46.08v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M47.59 52.72v6.96" stroke-dasharray="4.64 4.64" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M47.59 62v2M55.59 46.08v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M55.59 51.19v4.66" stroke-dasharray="3.11 3.11" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M55.59 57.4v2M31.59 46.08v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M31.59 52.72v6.96" stroke-dasharray="4.64 4.64" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M31.59 62v2M23.59 46.08v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M23.59 51.19v4.66" stroke-dasharray="3.11 3.11" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M23.59 57.4v2M15.75 33.28a12.5 12.5 0 0119.44-15.2M26.69 5.5v5.67M4.95 27.24h5.67M40.82 13.1l-2.78 2.78M12.55 13.1l2.78 2.78" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M57.59 53.59a9 9 0 000-18 18 18 0 00-35.54-4h-.46a11 11 0 000 22" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Drizzle": '<svg data-name="Drizzle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M54.5 50.5a9 9 0 000-18 18 18 0 00-35.54-4h-.46a11 11 0 000 22M36.5 42.99v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M36.5 48.63v12.74" stroke-dasharray="3.64 3.64" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M36.5 63.19v2M44.5 42.99v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M44.5 49.63v6.96" stroke-dasharray="4.64 4.64" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M44.5 58.91v2M52.5 42.99v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M52.5 48.1v4.66" stroke-dasharray="3.11 3.11" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M52.5 54.31v2M28.5 42.99v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M28.5 49.63v6.96" stroke-dasharray="4.64 4.64" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M28.5 58.91v2M20.5 42.99v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M20.5 48.1v4.66" stroke-dasharray="3.11 3.11" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M20.5 54.31v2" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Partly Sunny Snow": '<svg data-name="Partly Sunny Snow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M57.59 53.59a9 9 0 000-18 18 18 0 00-35.54-4h-.46a11 11 0 000 22M15.75 33.28a12.5 12.5 0 0119.44-15.2M26.69 5.5v5.67M4.95 27.24h5.67M40.82 13.1l-2.78 2.78M12.55 13.1l2.78 2.78" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path class="cls-2" d="M22.53 53.48l2.12 2.12M22.53 46.48l2.12 2.12M22.53 55.6l2.12-2.12M22.53 48.6l2.12-2.12M54.53 53.48l2.12 2.12M54.53 46.48l2.12 2.12M54.53 55.6l2.12-2.12M54.53 48.6l2.12-2.12M30.53 56.48l2.12 2.12M30.53 49.48l2.12 2.12M30.53 58.6l2.12-2.12M30.53 63.48l2.12 2.12M30.53 65.6l2.12-2.12M30.53 51.6l2.12-2.12M46.53 56.48l2.12 2.12M46.53 49.48l2.12 2.12M46.53 58.6l2.12-2.12M46.53 63.48l2.12 2.12M46.53 65.6l2.12-2.12M46.53 51.6l2.12-2.12M38.53 53.48l2.12 2.12M38.53 46.48l2.12 2.12M38.53 55.6l2.12-2.12M38.53 60.48l2.12 2.12M38.53 62.6l2.12-2.12M38.53 67.48l2.12 2.12M38.53 69.6l2.12-2.12M38.53 48.6l2.12-2.12" stroke-dasharray="3 4" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Snow": '<svg data-name="Snow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M54.5 50.5a9 9 0 000-18 18 18 0 00-35.54-4h-.46a11 11 0 000 22" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/><path d="M19.44 50.43l2.12 2.12M19.44 43.43l2.12 2.12M19.44 52.55l2.12-2.12M19.44 45.55l2.12-2.12M51.44 50.43l2.12 2.12M51.44 43.43l2.12 2.12M51.44 52.55l2.12-2.12M51.44 45.55l2.12-2.12M27.44 53.43l2.12 2.12M27.44 46.43l2.12 2.12M27.44 55.55l2.12-2.12M27.44 60.43l2.12 2.12M27.44 62.55l2.12-2.12M27.44 48.55l2.12-2.12M43.44 53.43l2.12 2.12M43.44 46.43l2.12 2.12M43.44 55.55l2.12-2.12M43.44 60.43l2.12 2.12M43.44 62.55l2.12-2.12M43.44 48.55l2.12-2.12M35.44 50.43l2.12 2.12M35.44 43.43l2.12 2.12M35.44 52.55l2.12-2.12M35.44 57.43l2.12 2.12M35.44 59.55l2.12-2.12M35.44 64.43l2.12 2.12M35.44 66.55l2.12-2.12M35.44 45.55l2.12-2.12" stroke-dasharray="3 4" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Partly Sunny Rain": '<svg data-name="Partly Sunny Rain" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M57.59 53.59a9 9 0 000-18 18 18 0 00-35.54-4h-.46a11 11 0 000 22M15.75 33.28a12.5 12.5 0 0119.44-15.2M26.69 5.5v5.67M4.95 27.24h5.67M40.82 13.1l-2.78 2.78M12.55 13.1l2.78 2.78M35.62 49.21l15.7 15.7M23.62 49.21l15.7 15.7M47.62 49.21l15.7 15.7" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>',
    "Rain": '<svg data-name="Rain" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M54.5 50.5a9 9 0 000-18 18 18 0 00-35.54-4h-.46a11 11 0 000 22M32.15 46.24l15.7 15.7M20.15 46.24l15.7 15.7M44.15 46.24l15.7 15.7" fill="none" stroke-miterlimit="10" class="svg-stroke-style"/></svg>'
  };
  return svgItems[condition];
} // This function returns a day of week string based on an input number (Uses ISO week standard, 1 = Monday 7 = Sunday)


function convertDOW(dowNum, typeOfString) {
  if (dowNum > 7) {
    if (dowNum % 7 == 0) {
      dowNum = 7;
    } else {
      dowNum = dowNum % 7;
    }
  }

  let dowConverter = {
    "1": {
      "abr": "Mon",
      "full": "Monday"
    },
    "2": {
      "abr": "Tue",
      "full": "Tuesday"
    },
    "3": {
      "abr": "Wed",
      "full": "Wednesday"
    },
    "4": {
      "abr": "Thu",
      "full": "Thursday"
    },
    "5": {
      "abr": "Fri",
      "full": "Friday"
    },
    "6": {
      "abr": "Sat",
      "full": "Saturday"
    },
    "7": {
      "abr": "Sun",
      "full": "Sunday"
    }
  };
  return dowConverter[Object.keys(dowConverter)[dowNum - 1]][typeOfString];
} // This function returns businesses that deal with tubing based on input location and an element that will be populated with returned places


function localBusinessPopulate(location, element, riverName, state) {
  // This function checks for places data for the current river to decide if reading or fetching places is needed
  function checkPlacesData(river, parentElement) {
    if (checkLocalStorage('canitube_' + river + '_Local Outfitters') == false) {
      // There is no local outfitters data for the current river, get it from the Google Places API
      initialize(state);
    } else {
      addListings(readLocalStorage('canitube_' + river + '_Local Outfitters').value, parentElement, state);
    }
  } // This function handles the fetching of locations


  async function initialize(state) {
    var currentRiverLocation = new google.maps.LatLng(parseFloat(location.lat), parseFloat(location.long));
    var request = {
      location: currentRiverLocation,
      radius: '16093.4',
      query: 'river tubing'
    };
    let service = new google.maps.places.PlacesService(element);
    service.textSearch(request, callback); // Check local storage for returned item until it is found

    var placesReturn = await returnItem(); // Store the data properly

    writeLocalStorage('canitube_' + riverName + '_Local Outfitters', placesReturn, ['hourstil', 744], 'Local Outfitters'); // Add the listings to the outfitters subsection

    addListings(placesReturn, element, state);
  } // This function is what returns the places found based on the search string


  function callback(results, status) {
    console.log('Places API returned results'); // Return array that will hold each returned place

    let places = [];

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // If there are less than 5 places returned set the loop varible to the amount of places returned
      let maxPlaces = 5;

      if (results.length < 5) {
        maxPlaces = results.length;
      }

      for (var i = 0; i < maxPlaces; i++) {
        var place = results[i];
        places.push(place);
      }
    }

    writeLocalStorage('canitube_TEMP_Places Return', places, ['hourstil', 1], 'TEMP');
  } // This function checks every 25 miliseconds for the places data and when found returns it


  function returnItem() {
    return new Promise(resolve => {
      var checkInterval = setInterval(function () {
        // If the data is present in local storage resolve and return the data
        if (checkLocalStorage('canitube_TEMP_Places Return') == true) {
          // Store the data
          let returnData = readLocalStorage('canitube_TEMP_Places Return').value; // Delete the temp data

          removeItemLocalStorage('canitube_TEMP_Places Return');
          resolve(returnData);
        }
      }, 25);
    });
  } // This function adds each listing to the local outfitters section


  function addListings(placesAry, parentElement, answerState) {
    // Iterate over each listing
    // Preset information
    let baseURL = 'https://www.google.com/maps/search/?api=1&query=';
    let strokeColor = '';

    if (answerState == 'no') {
      strokeColor = '#EAC435';
    }

    if (answerState == 'maybe') {
      strokeColor = '#E4E6C3';
    }

    if (answerState == 'yes') {
      strokeColor = '#261C15';
    } // Add the container to the parent element


    parentElement.insertAdjacentHTML('beforeend', '<div class="container"></div>');

    for (var i = 0; i < placesAry.length; i++) {
      // Grab the relevant data
      let placeName = placesAry[i].name;
      let placeRating = placesAry[i].rating;
      let placeRatingCount = placesAry[i].user_ratings_total; // Create some adjusted ratings values for the rating stars to appear correct

      let ratingScale = 0;

      switch (true) {
        case placeRating >= 5:
          // 5 Star
          ratingScale = 1;
          break;

        case placeRating < 5 && placeRating >= 4.5:
          // 4.5 Star
          ratingScale = .9119158499;
          break;

        case placeRating < 4.5 && placeRating >= 4:
          // 4 Star
          ratingScale = .7906850137;
          break;

        case placeRating < 4 && placeRating >= 3.5:
          // 3.5 Star
          ratingScale = .7031809752;
          break;

        case placeRating < 3.5 && placeRating >= 3:
          // 3 Star
          ratingScale = .5814235761;
          break;

        case placeRating < 3 && placeRating >= 2.5:
          // 2.5 Star
          ratingScale = .4937838808;
          break;

        case placeRating < 2.5 && placeRating >= 2:
          // 2 Star
          ratingScale = .3721264393;
          break;

        case placeRating < 2 && placeRating >= 1.5:
          // 1.5 Star
          ratingScale = .284054784;
          break;

        case placeRating < 1.5 && placeRating >= 1:
          // 1 Star
          ratingScale = .1628721416;
          break;

        case placeRating < 1 && placeRating >= 0.5:
          // 0.5 Star
          ratingScale = .07482726061;
          break;

        default:
          // 0 Star
          ratingScale = 0;
          break;
      } // Form the place URL


      let placeURL = baseURL + encodeURIComponent(placeName); // If the place name is over an amount, truncate it

      if (placeName.length > 30) {
        placeName = placeName.substring(0, 28) + '...';
      } // Create the listing elements


      let item = '<a href="' + placeURL + '" target="_blank" class="outfitter-item item-' + answerState + '" id="outfitter-' + i + '"></div>'; // Title

      let itemTitle = '<div class="outfitter-title">' + placeName + '</div>'; // Rating Container

      let ratingParent = '<div class="outfitter-rating"></div>'; // Stars Container

      let starContainer = '<div class="outfitter-rating-stars"></div>'; // Rating SVG

      let ratingSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); // Set its attributes accordingly

      ratingSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      ratingSVG.setAttribute('x', '0');
      ratingSVG.setAttribute('y', '0');
      ratingSVG.setAttribute('enable-background', 'new 0 0 64 16');
      ratingSVG.setAttribute('version', '1.1');
      ratingSVG.setAttribute('viewBox', '0 0 64 16');
      ratingSVG.setAttribute('xml:space', 'preserve');
      ratingSVG.setAttribute('data-rating', placeRating); // ratingSVG.setAttribute('id', 'svg-rating-' + i);
      // Create the star outlines group

      let starOutlinesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      starOutlinesGroup.setAttributeNS(null, 'id', 'star-outlines-' + i); // Create the star outlines

      let starOutlines = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      starOutlines.setAttributeNS(null, 'd', 'M8.5 10.1l-3 2.1 1.1-3.5-3-2.3h3.8l1.2-3.5 1.1 3.5 3.8.1-3 2.2 1.1 3.6zM20.2 10.1l-3 2.1 1.1-3.5-3-2.3h3.8l1.2-3.5 1.2 3.5 3.7.1-3 2.2 1.1 3.6zM32 10.1l-3.1 2.1L30 8.7l-2.9-2.3h3.7L32 2.9l1.2 3.5 3.7.1-3 2.2 1.1 3.6zM43.7 10.1l-3.1 2.1 1.2-3.5-3-2.3h3.7l1.3-3.5 1.1 3.5 3.8.1-3.1 2.2 1.1 3.6zM55.4 10.1l-3 2.1 1.1-3.5-3-2.3h3.8l1.2-3.5 1.1 3.5 3.8.1-3 2.2 1.1 3.6z');
      starOutlines.setAttributeNS(null, 'fill', 'none');
      starOutlines.setAttributeNS(null, 'stroke', strokeColor);
      starOutlines.setAttributeNS(null, 'stroke-miterlimit', '10');
      starOutlines.setAttributeNS(null, 'class', 'svg-stroke-style'); // Add the outlines to the outlines group

      starOutlinesGroup.appendChild(starOutlines); // Add the outlines group to the rating SVG

      ratingSVG.appendChild(starOutlinesGroup); // Create the defs

      let ratingDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs'); // Create the mask filter

      let ratingFilterMask = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      ratingFilterMask.setAttributeNS(null, 'id', 'adobe-opacitymaskfilter-' + i);
      ratingFilterMask.setAttributeNS(null, 'width', '56.8');
      ratingFilterMask.setAttributeNS(null, 'height', '13');
      ratingFilterMask.setAttributeNS(null, 'x', '3.6');
      ratingFilterMask.setAttributeNS(null, 'y', '1.5');
      ratingFilterMask.setAttributeNS(null, 'filterUnits', 'userSpaceOnUse'); // Create the colorMatrix

      let filterFeColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
      filterFeColorMatrix.setAttributeNS(null, 'values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'); // Add the colorMatrix to the mask filter

      ratingFilterMask.appendChild(filterFeColorMatrix); // Add the filter to the defs

      ratingDefs.appendChild(ratingFilterMask); // Add the defs to the rating SVG

      ratingSVG.appendChild(ratingDefs); // Create the rating mask

      let ratingMask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
      ratingMask.setAttributeNS(null, 'id', 'rating-progress-mask-' + i);
      ratingMask.setAttributeNS(null, 'width', '55.3');
      ratingMask.setAttributeNS(null, 'height', '8');
      ratingMask.setAttributeNS(null, 'x', '4.4');
      ratingMask.setAttributeNS(null, 'y', '3.7');
      ratingMask.setAttributeNS(null, 'maskUnits', 'userSpaceOnUse'); // Create the mask group

      let maskGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      maskGroup.setAttributeNS(null, 'filter', 'url(#adobe-opacitymaskfilter-' + i); // Create the mask rect

      let maskRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      maskRect.setAttributeNS(null, 'id', 'rating-progress-mask-rect-' + i);
      maskRect.setAttributeNS(null, 'width', '56.8');
      maskRect.setAttributeNS(null, 'height', '13');
      maskRect.setAttributeNS(null, 'x', '3.6');
      maskRect.setAttributeNS(null, 'y', '1.5');
      maskRect.setAttributeNS(null, 'fill', '#FFF');
      maskRect.setAttributeNS(null, 'style', 'transform-origin: left center; transform: scaleX(' + ratingScale + ');'); // Add the mask rect to the mask group

      maskGroup.appendChild(maskRect); // Add the mask group to the rating mask

      ratingMask.appendChild(maskGroup); // Add the rating mask to the rating SVG

      ratingSVG.appendChild(ratingMask); // Create the rating progress fill group

      let fillGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      fillGroup.setAttributeNS(null, 'id', 'rating-progress-fill-' + i);
      fillGroup.setAttributeNS(null, 'mask', 'url(#rating-progress-mask-' + i + ')'); // Creating the rating fill path

      let fillPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      fillPath.setAttributeNS(null, 'd', 'M8.5 9.8l-2.6 1.8 1-3-2.5-1.9h3.1l1.1-3 1 3h3.1l-2.5 1.9.9 3.1zM20.2 9.8l-2.6 1.8 1-3-2.5-1.9h3.2l1-3 1 3h3.2l-2.6 1.9.9 3.1zM32 9.8l-2.6 1.8.9-3-2.5-1.9H31l1-3 1 3h3.2l-2.6 1.9.9 3.1zM43.7 9.8l-2.6 1.8 1-3-2.6-1.9h3.2l1-3 1 3h3.2l-2.5 1.9.9 3.1zM55.4 9.8l-2.6 1.8 1-3-2.5-1.9h3.1l1.1-3 1 3h3.1l-2.5 1.9.9 3.1z');
      fillPath.setAttributeNS(null, 'fill', strokeColor);
      fillPath.setAttributeNS(null, 'class', 'svg-fill-style'); // Add the fill path to the fill group

      fillGroup.appendChild(fillPath); // Add the fill group to the rating SVG

      ratingSVG.appendChild(fillGroup); // Rating Count

      let ratingCount = '<div class="outfitter-rating-count">(' + placeRatingCount + ')</div>'; // Add the item listing to the parent element's container

      document.querySelector('#local-outfitters > .container').insertAdjacentHTML('beforeend', item); // Add top-level elements to the current item

      document.querySelector('#outfitter-' + i).insertAdjacentHTML('beforeend', itemTitle);
      document.querySelector('#outfitter-' + i).insertAdjacentHTML('beforeend', ratingParent); // Add ratings elements to the ratings container

      document.querySelector('#outfitter-' + i + ' > .outfitter-rating').insertAdjacentHTML('beforeend', starContainer);
      document.querySelector('#outfitter-' + i + ' > .outfitter-rating').insertAdjacentHTML('beforeend', ratingCount); // Add the SVG to the star rating container

      document.querySelector('#outfitter-' + i + ' > .outfitter-rating > .outfitter-rating-stars').appendChild(ratingSVG);
    }
  }

  checkPlacesData(riverName, element);
} // This function generates the flow graph


function generateGraph(data, maxSafeFlow, relaxPeriod, baseFlow, dataResoultion, stokeColor) {
  let dataLabels = []; // X-Axis

  let dataValues = []; // Histoical Data

  let maxSafeFlowValues = []; // Max Safe Flow Line

  let estimationValues = []; // Estimated data
  // First lets make the historical data set

  for (var i = 0; i < data.value.timeSeries[0].values[0].value.length; i++) {
    // Time Entry
    let currentTime = (0, _moment.default)(json.value.timeSeries[0].values[0].value[i].dateTime.substr(0, json.value.timeSeries[0].values[0].value[i].dateTime.length - 10), "YYYY-MM-DDTHH:mm:ss").unix();
    dataLabels.push(currentTime / 900); // Data Entry

    let currentData = parseInt(json.value.timeSeries[0].values[0].value[i].value);
    dataValues.push(currentData);
    estimationValues.push('null'); // Max Safe Flow line

    maxSafeFlowValues.push(maxSafeFlow);
  } // Now we add data for the total number of days + 1 it will take the river to normalize


  let mostRecentFlow = dataValues[dataValues.length - 1];
  let mostRecentTime = (0, _moment.default)(json.value.timeSeries[0].values[0].value[json.value.timeSeries[0].values[0].value.length - 1].dateTime.substr(0, json.value.timeSeries[0].values[0].value[json.value.timeSeries[0].values[0].value.length - 1].dateTime.length - 10), "YYYY-MM-DDTHH:mm:ss").unix();
  let returnDays = Math.ceil((mostRecentFlow - baseFlow) / 1000 * relaxPeriod) + 1;
  let relaxValue = (mostRecentFlow - baseFlow) / 1000 * relaxPeriod;

  for (var i = 0; i < returnDays * 96; i++) {
    // Time Entry
    let newTime = _moment.default.unix(mostRecentTime).add(15 * i, 'minutes').unix();

    dataLabels.push(newTime / 900); // Data Entry

    dataValues.push('null'); // Estimation

    let est = (mostRecentFlow - baseFlow) * Math.pow(Math.floor(relaxValue) / relaxValue, i * (1 / relaxValue)) + baseFlow;
    estimationValues.push(est); // When the previous estimation value is above 1.1xBaseFlow, and the current estimation value is at or below that, change the estimate safe flow date to the current estimation time

    let normalFlow = baseFlow * 1.1;
    let previousEst = (mostRecentFlow - baseFlow) * Math.pow(Math.floor(relaxValue) / relaxValue, (i - 1) * (1 / relaxValue)) + baseFlow;

    if (previousEst > normalFlow && est <= normalFlow) {
      document.querySelector('#graph-later').textContent = _moment.default.unix(newTime).format('MMM D');
    } // Max Safe Flow line


    maxSafeFlowValues.push(maxSafeFlow);
  } // Here we extract every nth element based on the data resoultion setting
  // Store the current data arrays as temp arrays and clear the proper array contents


  let tempDataLabels = dataLabels;
  let tempDataValues = dataValues;
  let tempMaxSafeFlowValues = maxSafeFlowValues;
  let tempEstimationValues = estimationValues;
  dataLabels = [];
  dataValues = [];
  maxSafeFlowValues = [];
  estimationValues = [];

  for (var i = 0; i < tempDataLabels.length;) {
    dataLabels.push(tempDataLabels[i]);
    dataValues.push(tempDataValues[i]);
    maxSafeFlowValues.push(tempMaxSafeFlowValues[i]);
    estimationValues.push(tempEstimationValues[i]); // Make sure that the last non-null history value is the last null estimation value

    if (estimationValues[i / dataResoultion - 1] == 'null' && tempEstimationValues[i] !== 'null') {
      estimationValues.splice(i / dataResoultion - 1, 1, dataValues[i / dataResoultion - 1]);
    }

    i = i + dataResoultion;
  } // Remove some of the max flow line data points to make room for the label


  let maxSafeFlowValuesPre = maxSafeFlowValues;
  let maxSafeFlowValuesPost = maxSafeFlowValues;
  maxSafeFlowValues.splice(maxSafeFlowValues.length - 13, 13, 'null');
  var chart = new Chartist.Line('#graph-area', {
    labels: dataLabels,
    series: [dataValues, maxSafeFlowValues, estimationValues]
  }, {
    showPoint: false,
    showLine: true,
    showArea: false,
    fullWidth: true,
    showLabel: false,
    axisX: {
      showGrid: false,
      showLabel: false,
      offset: 2
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0
    },
    chartPadding: 0
  }); // Add a text label to the max flow line

  setTimeout(function () {
    // Get the coordinates for the max flow line group
    let coordinateObject = document.querySelector('.ct-series-b').getBoundingClientRect(); // Max Flow Line Group

    let maxFlowLineGroup = document.querySelector('.ct-series-b'); // Create a Text Label

    let maxFlowText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    maxFlowText.setAttributeNS(null, 'x', coordinateObject.width + 8);
    maxFlowText.setAttributeNS(null, 'fill', stokeColor);
    maxFlowText.textContent = "Highest Safe Flow";
    maxFlowText.setAttributeNS(null, 'style', 'font-size: 12px; letter-spacing: .5px;');
    maxFlowLineGroup.append(maxFlowText); // Reposition the text now that it is loaded in the SVG

    maxFlowText.setAttributeNS(null, 'y', document.querySelector('.ct-series-b').getBoundingClientRect().height - document.querySelector('.ct-series-b > text').getBoundingClientRect().height / 2); // Add the current pointer

    let svgParentObject = document.querySelector('.ct-chart-line').getBoundingClientRect();
    let estimateObject = document.querySelector('.ct-series-c').getBoundingClientRect();
    console.log(svgParentObject);
    console.log(estimateObject);
    let topOffset = estimateObject.top - svgParentObject.top;
    let leftOffset = estimateObject.left - svgParentObject.left; // <polygon fill="#eac435" points="8 2.7 2.2 12.9 13.9 12.9"/>

    let currentTimePointer = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    currentTimePointer.setAttributeNS(null, 'points', [leftOffset, topOffset + 10, leftOffset + 11.6913 / 2, topOffset + 20.125, leftOffset - 11.6913 / 2, topOffset + 20.125].join(" "));
    currentTimePointer.setAttributeNS(null, 'fill', stokeColor);
    currentTimePointer.setAttributeNS(null, 'style', 'transform-origin: ' + leftOffset + 'px ' + (topOffset + 10) + 'px; transform: translate(2px, 0px) rotate(0deg);');
    let svgParent = document.querySelector('.ct-chart-line');
    svgParent.appendChild(currentTimePointer);
  }, 1);
}
},{"jquery":"HlZQ","moment":"iROh","convert-units":"K5Mp","chartist":"A7mC"}]},{},["i5Wi"], null)
//# sourceMappingURL=app.8f92d78a.js.map