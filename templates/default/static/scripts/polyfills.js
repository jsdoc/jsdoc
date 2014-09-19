// getElementsByClassName() Polyfill -- <https://gist.github.com/stereobooster/2397759>
(function (document) {
  "use strict";
  if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (match) { 
      var result = [],
        elements = document.getElementsByTagName('*'),
        i, elem;
      match = " " + match + " ";
      for (i = 0; i < elements.length; i++) { 
        elem = elements[i];
        if ((" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1) {
          result.push(elem);
        }
      }
      return result; 
    };
  }
}(document));

// textContent Polyfill -- <http://www.snip2code.com/Snippet/27576/IE8-polyfill-shim-for-supporting-textCon>
if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
	(function() {
		var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
		Object.defineProperty(Element.prototype, "textContent",
			{
				get: function() {
					return innerText.get.call(this);
				},
				set: function(s) {
					return innerText.set.call(this, s);
				}
			}
		);
	})();
}

// DOM Event Polyfil
!function(undef){
	if( document.createElement('div').firstElementChild===undef ){
		Object.defineProperty(Element.prototype, 'firstElementChild', {
			get : function () { // faster then this.children[0]
				var el = this.firstChild;
				do {
					if(el.nodeType===1){
						return el;
					}
					el = el.nextSibling;
		        } while(el);
		        return null;
			}
		});
		Object.defineProperty(Element.prototype, 'lastElementChild', {
			get : function () {
				var el = this.lastChild;
				do {
					if(el.nodeType===1){
						return el;
					}
					el = el.previousSibling;
		        } while(el);
		        return null;
			}
		});
		Object.defineProperty(Element.prototype, 'nextElementSibling', {
			get : function () {
				var el = this.nextSibling;
				while(el) {
					if(el.nodeType===1){
						return el;
					}
					el = el.nextSibling;
		        };
		        return null;
			}
		});
		Object.defineProperty(Element.prototype, 'previousElementSibling', {
			get : function () {
				var el = this.previousSibling;
				while(el){
					if(el.nodeType===1){
						return el;
					}
					el = el.previousSibling;
		        };
		        return null;
			}
		});
	}
}();

// EventListener | MIT/GPL2 | github.com/jonathantneal/EventListener
this.Element && Element.prototype.attachEvent && !Element.prototype.addEventListener && (function () {
	function addToPrototype(name, method) {
		Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
	}

	// add
	addToPrototype("addEventListener", function (type, listener) {
		var
		target = this,
		listeners = target._c1_listeners = target._c1_listeners || {},
		typeListeners = listeners[type] = listeners[type] || [];

		// if no events exist, attach the listener
		if (!typeListeners.length){
			target.attachEvent("on" + type, typeListeners.event = function (event) {
				var documentElement = target.document && target.document.documentElement || target.documentElement || { scrollLeft: 0, scrollTop: 0 };

				// polyfill w3c properties and methods
				event.currentTarget = target;
				event.pageX = event.clientX + documentElement.scrollLeft;
				event.pageY = event.clientY + documentElement.scrollTop;
				event.preventDefault = function () { event.returnValue = false };
				event.relatedTarget = event.fromElement || null;
				event.stopImmediatePropagation = function () { immediatePropagation = false; event.cancelBubble = true };
				event.stopPropagation = function () { event.cancelBubble = true };
				event.relatedTarget = event.fromElement || null;
				event.target = event.srcElement || target;
				event.timeStamp = +new Date;

				// create an cached list of the master events list (to protect this loop from breaking when an event is removed)
				for (var i = 0, typeListenersCache = [].concat(typeListeners), typeListenerCache, immediatePropagation = true; immediatePropagation && (typeListenerCache = typeListenersCache[i]); ++i) {
					// check to see if the cached event still exists in the master events list
					for (var ii = 0, typeListener; typeListener = typeListeners[ii]; ++ii) {
						if (typeListener == typeListenerCache) {
							typeListener.call(target, event);
							break;
						}
					}
				}
			});
		}

		// add the event to the master event list
		typeListeners.push(listener);
	});

	// remove
	addToPrototype("removeEventListener", function (type, listener) {
		var
		target = this,
		listeners = target._c1_listeners = target._c1_listeners || {},
		typeListeners = listeners[type] = listeners[type] || [];

		// remove the newest matching event from the master event list
		for (var i = typeListeners.length - 1, typeListener; typeListener = typeListeners[i]; --i) {
			if (typeListener == listener) {
				typeListeners.splice(i, 1);
				break;
			}
		}

		// if no events exist, detach the listener
		if (!typeListeners.length && typeListeners.event) {
			target.detachEvent("on" + type, typeListeners.event);
		}
	});

	// dispatch
	addToPrototype("dispatchEvent", function (eventObject) {
		var
		target = this,
		type = eventObject.type,
		listeners = target._c1_listeners = target._c1_listeners || {},
		typeListeners = listeners[type] = listeners[type] || [];

		try {
			return target.fireEvent("on" + type, eventObject);
		} catch (error) {
			if (typeListeners.event) {
				typeListeners.event(eventObject);
			}

			return;
		}
	});

	// CustomEvent
	Object.defineProperty(Window.prototype, "CustomEvent", {
		get: function () {
			var self = this;

			return function CustomEvent(type, detail) {
				detail = detail || {};
				var event = self.document.createEventObject(), key;

				event.type = type;
				event.returnValue = !detail.cancelable;
				event.cancelBubble = !detail.bubbles;

				for (key in detail) {
					event[key] = detail[key];
				}

				return event;
			};
		}
	});
	
	// ready
	function ready(event) {
		if (ready.interval && document.body) {
			ready.interval = clearInterval(ready.interval);
			document.dispatchEvent(new CustomEvent("DOMContentLoaded"));
		}
	}
	ready.interval = setInterval(ready, 1);
	window.addEventListener("load", ready);
})();