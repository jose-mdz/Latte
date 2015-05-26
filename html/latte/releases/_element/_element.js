var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var latte;
(function (latte) {
    var SomethingViewBase = (function (_super) {
        __extends(SomethingViewBase, _super);
        function SomethingViewBase() {
            _super.call(this, latte.Element.outlet('[data-class=SomethingViewBase]'));
        }
        Object.defineProperty(SomethingViewBase.prototype, "lblSomething", {
            get: function () {
                if (!this._lblSomething) {
                    this._lblSomething = new latte.Element(this.find('[data-property=lblSomething]'));
                }
                return this._lblSomething;
            },
            enumerable: true,
            configurable: true
        });
        SomethingViewBase.getModel = function () {
            if (!this._Model) {
                this._Model = new latte.Element(latte.Element.find('[data-class=SomethingViewBase]'));
            }
            return this._Model;
        };
        return SomethingViewBase;
    })(latte.Element);
    latte.SomethingViewBase = SomethingViewBase;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 3/25/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var Element = (function () {
        //endregion
        //region Fields
        //endregion
        /**
         * Creates an element
         */
        function Element(element) {
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._isAnimated = false;
            /**
             * Property field
             */
            this._tag = null;
            /**
             * Property field
             */
            this._visible = true;
            if (!(element instanceof HTMLElement))
                throw "Element Required";
            this._element = element;
        }
        //region Static
        /**
         * Finds a node using the specified path.
         * Current version uses JQuery for search.
         * @param path
         */
        Element.find = function (path) {
            return document.querySelector(path);
        };
        /**
         * Searches for the specified path, clones it and returns its html element
         * @param path
         */
        Element.outlet = function (path) {
            var element = Element.find(path);
            return element.cloneNode(true);
        };
        /**
         * Gets the height of the specified document
         * @param d
         * @returns {number}
         */
        Element.getDocumentHeight = function (d) {
            var doc = d.documentElement;
            return Math.max(d.body.scrollWidth, doc.scrollWidth, d.body.offsetWidth, doc.offsetWidth, doc.clientWidth);
        };
        /**
         * Gets the width of the specified document
         * @param d
         * @returns {number}
         */
        Element.getDocumentWidth = function (d) {
            var doc = d.documentElement;
            return Math.max(d.body.scrollHeight, doc.scrollHeight, d.body.offsetHeight, doc.offsetHeight, doc.clientHeight);
        };
        /**
         * Gets the width of the viewport
         *
         * @returns {number}
         */
        Element.getViewportWidth = function (d) {
            return d.documentElement.clientWidth;
        };
        /**
         * Gets the width of the viewport
         *
         * @returns {number}
         */
        Element.getViewportHeight = function (d) {
            return d.documentElement.clientHeight;
        };
        Object.defineProperty(Element, "windowScrollLeft", {
            /**
             * Gets the scrollTop
             * @returns {number}
             */
            get: function () {
                return window.pageXOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "windowScrollTop", {
            /**
             * Gets the scrollTop
             * @returns {number}
             */
            get: function () {
                return window.pageYOffset;
            },
            enumerable: true,
            configurable: true
        });
        Element.prototype.getCssNumericValue = function (property) {
            return parseFloat(this.style[property] || '0');
        };
        /**
         * Gets the suffix for the specified property
         *
         * @param property
         * @param value
         */
        Element.prototype.setCssNumericValue = function (property, value) {
            if (property == 'opacity') {
                this.style[property] = String(value);
            }
            else {
                this.style[property] = value + 'px';
            }
        };
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Adds an element
         * @param element
         */
        Element.prototype.add = function (element) {
            this.element.appendChild(element.element);
        };
        /**
         * Adds an array of elements to this element
         * @param elements
         */
        Element.prototype.addArray = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
        };
        /**
         * Adds the specified class to the class list
         * @param className
         */
        Element.prototype.addClass = function (className) {
            if (className.indexOf(' ') >= 0)
                throw "Only one class can be added.";
            this.element.classList.add(className);
        };
        /**
         * Adds an event listener
         * @param event
         * @param handler
         * @param capture
         */
        Element.prototype.addEventListener = function (event, handler, capture) {
            if (capture === void 0) { capture = false; }
            this.element.addEventListener(event, handler, capture);
        };
        /**
         * Animates the element specified properties, by establishing the initial values for the properties to animate.
         *
         * @param startProperties
         * @param endProperties
         * @param duration Duration of the animation in seconds
         * @param callback
         */
        Element.prototype.animateFrom = function (startProperties, endProperties, duration, callback) {
            var _this = this;
            if (duration === void 0) { duration = 0.1; }
            if (callback === void 0) { callback = null; }
            var animations = [];
            var setValue = function (p, value) {
                if (_undef(_this[p])) {
                    _this.setCssNumericValue(p, value);
                }
                else {
                    _this[p] = value;
                }
            };
            for (var p in startProperties) {
                var a = new Animation(startProperties[p], endProperties[p], duration, null);
                a.tag = p;
                animations.push(a);
            }
            if (animations.length > 0) {
                var leader = animations[0];
                // Handle update
                leader.update.add(function () {
                    for (var i = 0; i < animations.length; i++) {
                        var a = animations[i];
                        setValue(a.tag, leader.running ? a.currentValue : a.endValue);
                    }
                });
                // Handle end of animations
                leader.ended.add(function () {
                    _this._isAnimated = false;
                });
                // Handle end
                if (callback) {
                    leader.ended.add(callback);
                }
                this._isAnimated = true;
                leader.start();
                for (var i = 1; i < animations.length; i++)
                    animations[i].startTime = DateTime.now;
            }
        };
        /**
         * Animates the element properties, by letting the code to infer the initial values of the properties
         *
         * @param properties
         * @param duration Duration of the animation in seconds
         */
        Element.prototype.animate = function (properties, duration, callback) {
            var _this = this;
            if (duration === void 0) { duration = 0.1; }
            if (callback === void 0) { callback = null; }
            var starts = {};
            var getValue = function (p) {
                if (_undef(_this[p])) {
                    return _this.getCssNumericValue(p);
                }
                else {
                    return _this[p];
                }
            };
            for (var p in properties) {
                starts[p] = getValue(p);
            }
            this.animateFrom(starts, properties, duration, callback);
        };
        /**
         * Appends the element to the specified container
         * @param parent
         */
        Element.prototype.appendTo = function (parent) {
            parent.appendChild(this.element);
        };
        /**
         * Creates an automatic handler
         *
         * @param container
         * @param elementName
         * @param eventName
         */
        Element.prototype.autohandler = function (container, elementName, eventName) {
            var elem = this;
            this.addEventListener(eventName, function () {
                var methodname = (elementName + "_" + eventName).toLowerCase();
                var found = false;
                for (var i in container) {
                    if (String(i).toLowerCase() == methodname) {
                        found = true;
                        container[i].call(container, arguments);
                    }
                }
                if (!found) {
                    log(sprintf("%s method missing from declaration", methodname));
                }
            });
        };
        /**
         * Makes the element blink
         *
         * @param callback
         */
        Element.prototype.blink = function (callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            var visible = true;
            var total = 6;
            var current = 0;
            var time = 0.1; //1000;
            //var me = this.$ element;
            //me.stop();
            if (!this.visible) {
                this.visible = true;
            }
            var show = function (callback) {
                _this.animate({ opacity: 1 }, time, function () {
                    visible = true;
                    callback();
                });
                //me.animate({
                //    opacity: 1
                //}, time, 'swing', () => { visible = true; callback(); })
            };
            var hide = function (callback) {
                _this.animate({ opacity: 0 }, time, function () {
                    visible = false;
                    callback();
                });
                //me.animate({
                //    opacity: 0
                //}, time, 'swing', () => { visible = false; callback(); })
            };
            var go = function () {
                if (++current == total) {
                    show(function () {
                    });
                    if (_isFunction(callback)) {
                        callback();
                    }
                    return;
                }
                if (visible) {
                    hide(go);
                }
                else {
                    show(go);
                }
            };
            go();
        };
        /**
         * Clears all the children of the element
         */
        Element.prototype.clear = function () {
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        };
        /**
         * Fades the element in
         * @param duration
         * @param callback
         */
        Element.prototype.fadeIn = function (duration, callback) {
            var _this = this;
            if (duration === void 0) { duration = 0.1; }
            if (callback === void 0) { callback = null; }
            this.style.opacity = '0';
            this.style.display = null;
            this.animate({ opacity: 1 }, duration, function () {
                _this.visible = true;
                if (_isFunction(callback))
                    callback();
            });
            //$(this.element).animate({ opacity: 1}, duration, 'swing', () => {
            //
            //    this.visible = true;
            //
            //    if('function' == typeof callback)
            //        callback();
            //});
        };
        /**
         * Fades the element out
         * @param duration
         * @param callback
         */
        Element.prototype.fadeOut = function (duration, callback) {
            var _this = this;
            if (duration === void 0) { duration = 0.1; }
            if (callback === void 0) { callback = null; }
            this.style.opacity = '1';
            this.style.display = null;
            this.animate({ opacity: 0 }, duration, function () {
                _this.visible = false;
                if (_isFunction(callback))
                    callback();
            });
            //$(this.element).animate({ opacity: 0}, duration, 'swing', () => {
            //
            //    this.visible = false;
            //
            //    if('function' == typeof callback)
            //    callback();
            //});
        };
        /**
         * Finds the native HTMLElement object
         * @param query
         * @returns {any}
         */
        Element.prototype.find = function (query) {
            return this.element.querySelector(query);
            //return this.$element.find(query).get(0);
        };
        /**
         * Finds an element and returns it
         * @param query
         * @returns {Element}
         */
        Element.prototype.findElement = function (query) {
            return new Element(this.find(query));
        };
        /**
         * Gets the size of the element
         */
        Element.prototype.getSize = function () {
            var s = {
                width: this.element.offsetWidth,
                height: this.element.offsetHeight
            };
            if (!this.visible) {
                var buffDisplay = this.style.display;
                var buffPosition = this.style.position;
                var buffVisibility = this.style.visibility;
                // Prepare for measuring
                this.style.display = 'block';
                this.style.position = 'absolute';
                this.style.visibility = 'hidden';
                s.width = this.element.offsetWidth;
                s.height = this.element.offsetHeight;
                // Restore properties
                this.style.display = buffDisplay;
                this.style.position = buffPosition;
                this.style.visibility = buffVisibility;
            }
            return s;
        };
        /**
         * Adds an event handler to the
         * @param event
         * @param f
         */
        Element.prototype.handle = function (context, event, f) {
            this.addEventListener(event, function () {
                f.apply(context, arguments);
            });
        };
        /**
         * Returns a value indicating if the element has the specified class
         *
         * @param className
         */
        Element.prototype.hasClass = function (className) {
            return this.element.classList.contains(className);
        };
        /**
         * Raises the <c>tag</c> event
         */
        Element.prototype.onTagChanged = function () {
            if (this._tagChanged) {
                this._tagChanged.raise();
            }
        };
        /**
         * Raises the <c>visible</c> event
         */
        Element.prototype.onVisibleChanged = function () {
            if (this._visibleChanged) {
                this._visibleChanged.raise();
            }
        };
        /**
         * Removes the specified child
         * @param e
         */
        Element.prototype.remove = function (e) {
            this.element.removeChild(e.element);
        };
        /**
         * Removes the specified class to the class list
         *
         * @param className
         */
        Element.prototype.removeClass = function (className) {
            if (className.indexOf(' ') >= 0)
                throw "Only one class can be removed.";
            this.element.classList.remove(className);
        };
        /**
         * Removes this from its parent element
         */
        Element.prototype.removeFromParent = function () {
            // Check if still has parent
            if (this.element.parentElement) {
                this.element.parentElement.removeChild(this.element);
            }
        };
        /**
         * Sets the content of the element, deleting all existing children.
         * @param e
         */
        Element.prototype.setContent = function (e) {
            this.clear();
            this.add(e);
        };
        /**
         * Sets the children of the element, deleting all existing children
         * @param e
         */
        Element.prototype.setChildren = function (e) {
            this.clear();
            for (var i = 0; i < e.length; i++) {
                this.add(e[i]);
            }
        };
        /**
         * Replaces the element
         * @param e
         */
        Element.prototype.setElement = function (e) {
            this._element = null;
            this._element = e;
        };
        Object.defineProperty(Element.prototype, "tagChanged", {
            /**
             * Gets an event raised when the value of the tag property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._tagChanged) {
                    this._tagChanged = new LatteEvent(this);
                }
                return this._tagChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "visibleChanged", {
            /**
             * Gets an event raised when the value of the visible property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._visibleChanged) {
                    this._visibleChanged = new LatteEvent(this);
                }
                return this._visibleChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "isAnimated", {
            /**
             * Gets a value indicating if the element is being animated
             *
             * @returns {boolean}
             */
            get: function () {
                return this._isAnimated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "documentHeight", {
            /**
             * Gets the height of the elements document
             *
             * @returns {number}
             */
            get: function () {
                return Element.getDocumentHeight(this.element.ownerDocument);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "documentWidth", {
            /**
             * Gets the width of the elements document
             *
             * @returns {number}
             */
            get: function () {
                return Element.getDocumentWidth(this.element.ownerDocument);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "element", {
            /**
             * Gets the core html element
             *
             * @returns {HTMLDivElement}
             */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "height", {
            /**
             * Gets or sets the height of the element in pixels
             *
             * @returns {number}
             */
            get: function () {
                if (!this.visible) {
                    return this.getSize().height;
                }
                return this.element.offsetHeight;
            },
            /**
             * Gets or sets the height of the element in pixels
             *
             * @param {number} value
             */
            set: function (value) {
                if (value == null) {
                    this.style.height = '';
                }
                else {
                    this.element.style.height = value + 'px';
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "left", {
            /**
             * Gets the left of the element, relative to the viewport
             *
             * @returns {number}
             */
            get: function () {
                return this.element.getBoundingClientRect().left;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "style", {
            /**
             * Gets the style of the element
             *
             * @returns {CSSStyleDeclaration}
             */
            get: function () {
                return this.element.style;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "tag", {
            /**
             * Gets or sets the tag for the object
             *
             * @returns {any}
             */
            get: function () {
                return this._tag;
            },
            /**
             * Gets or sets the tag for the object
             *
             * @param {any} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._tag;
                // Set value
                this._tag = value;
                // Trigger changed event
                if (changed) {
                    this.onTagChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "text", {
            /**
             * Gets or sets the inner text of the element
             *
             * @returns {string}
             */
            get: function () {
                return this.element.innerHTML;
            },
            /**
             * Gets or sets the inner text of the element
             *
             * @param {string} value
             */
            set: function (value) {
                this.element.innerHTML = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "top", {
            /**
             * Gets the top of the element, relative to the viewport
             *
             * @returns {number}
             */
            get: function () {
                return this.element.getBoundingClientRect().top;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "viewportHeight", {
            /**
             * Gets the height of the viewport of the element
             *
             * @returns {number}
             */
            get: function () {
                return Element.getViewportHeight(this.element.ownerDocument);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "viewportWidth", {
            /**
             * Gets the width of the viewport of the element
             *
             * @returns {number}
             */
            get: function () {
                return Element.getViewportWidth(this.element.ownerDocument);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "visible", {
            /**
             * Gets or sets a value indicating if the element is displayed
             *
             * @returns {boolean}
             */
            get: function () {
                return this._visible;
            },
            /**
             * Gets or sets a value indicating if the element is displayed
             *
             * @param {boolean} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._visible;
                // Set value
                this._visible = value;
                if (this.visible) {
                    this.element.style.display = null;
                }
                else {
                    this.element.style.display = 'none';
                }
                // Trigger changed event
                if (changed) {
                    this.onVisibleChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "width", {
            /**
             * Gets or sets the width of the element in pixels
             *
             * @returns {number}
             */
            get: function () {
                if (!this.visible) {
                    return this.getSize().width;
                }
                return this.element.offsetWidth;
            },
            /**
             * Gets or sets the width of the element in pixels
             *
             * @param {number} value
             */
            set: function (value) {
                this.element.style.width = value + 'px';
            },
            enumerable: true,
            configurable: true
        });
        return Element;
    })();
    latte.Element = Element;
})(latte || (latte = {}));
