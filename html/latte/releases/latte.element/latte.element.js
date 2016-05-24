var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        /**
         * Creates an element
         */
        function Element(element) {
            //endregion
            //region Fields
            this.dataElements = [];
            /**
             * Property field
             */
            this._contentEditable = false;
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
            this._element['latte-element-instance'] = this;
        }
        //region Static
        /**
         * Creates a new element in memory from the specified tag name
         * @param tagName
         * @returns {latte.Element<HTMLElement>}
         */
        Element.create = function (tagName) {
            if (tagName === void 0) { tagName = 'div'; }
            var parts = tagName.split('.');
            var tagName = parts[0];
            var element = new Element(document.createElement(tagName));
            for (var i = 1; i < parts.length; i++) {
                element.addClass(parts[i]);
            }
            return element;
        };
        /**
         * Creates an element from the latte.globalViewBank object.
         *
         * @param key
         * @returns {latte.Element<HTMLElement>}
         */
        Element.fromBank = function (key) {
            if (!latte._undef(latte['globalViewsBank']) && !latte._undef(latte['globalViewsBank'][key])) {
                // Bring from bank into a wrap
                var wrap = document.createElement('div');
                wrap.innerHTML = latte['globalViewsBank'][key];
                // Obtain generated element
                var e = wrap.children[0];
                return e;
            }
            throw latte.sprintf("View %s not found in bank.", key);
        };
        /**
         * Searches for the specified path, clones it and returns its html element
         * @param path
         */
        Element.outlet = function (path) {
            var element = document.querySelector(path);
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
        /**
         * Converts the value in css format to a number
         *
         * @param property
         * @returns {number}
         */
        Element.prototype.getCssNumericValue = function (property) {
            return parseFloat(this.style[property] || '0');
        };
        /**
         * Converts the value to a value + px, depending on the property
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
        Element.prototype.addBindedElement = function (e, ebind, dbind) {
            for (var i = 0; i < this.bindedElements.length; i++) {
                if (this.bindedElements[i] === e) {
                    return;
                }
            }
            if (ebind) {
                this.onEventBindAdded(ebind);
            }
            if (dbind) {
                this.onDataBindAdded(dbind);
            }
            this.bindedElements.push(e);
        };
        //endregion
        //region Methods
        /**
         * Adds an element
         * @param element
         */
        Element.prototype.add = function (element) {
            this.element.appendChild(element.element);
            return element;
        };
        /**
         * Adds an array of elements to this element
         * @param elements
         */
        Element.prototype.addArray = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
            return elements;
        };
        /**
         * Adds the specified collection of elements
         *
         * @param elements
         */
        Element.prototype.addCollection = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
            return elements;
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
                if (latte._undef(_this[p])) {
                    _this.setCssNumericValue(p, value);
                }
                else {
                    _this[p] = value;
                }
            };
            for (var p in startProperties) {
                var a = new latte.Animation(startProperties[p], endProperties[p], duration, null);
                a.tag = p;
                animations.push(a);
            }
            if (animations.length > 0) {
                var leader = animations[0];
                // Handle update
                leader.update.add(function () {
                    // Update all values
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
                    animations[i].startTime = latte.DateTime.now;
            }
        };
        /**
         * Animates the element properties, by letting the code to infer the initial values of the properties
         *
         * @param properties
         * @param duration Duration of the animation in seconds
         * @param callback
         */
        Element.prototype.animate = function (properties, duration, callback) {
            var _this = this;
            if (duration === void 0) { duration = 0.1; }
            if (callback === void 0) { callback = null; }
            var starts = {};
            var getValue = function (p) {
                if (latte._undef(_this[p])) {
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
                    latte.log(latte.sprintf("%s method missing from declaration", methodname));
                }
            });
        };
        /**
         * Binds the element to the specified object
         * @param object
         * @param hide
         */
        Element.prototype.bind = function (object, hide) {
            var _this = this;
            if (hide === void 0) { hide = false; }
            var list = this.element.querySelectorAll('[data-bind]');
            for (var i = 0; i < list.length; i++) {
                (function (node) {
                    if (node.nodeType != 1)
                        return;
                    var e = new Element(node);
                    var prop = e.element.getAttribute('data-bind');
                    var dataBinds = prop.split(";");
                    for (var j = 0; j < dataBinds.length; j++) {
                        var parts = dataBinds[j].split(":");
                        var elementProperty = parts.length == 2 ? parts[0] : 'text';
                        var recordProperty = parts.length == 2 ? parts[1] : parts[0];
                        var bind = new latte.DataBind(e, elementProperty, object, recordProperty, latte.DataBindType.AUTO, null, 'input', latte.sprintf('%sChanged', prop));
                        if (!hide) {
                            _this.dataBinds.push(bind);
                        }
                        _this.addBindedElement(e, null, bind);
                    }
                    //// TODO: Criteria for elementProperty, elementEvent, type, DataAdapter
                    //var bind = new DataBind(e, 'text', object, prop, DataBindType.AUTO, null, 'input', sprintf('%sChanged', prop));
                    //
                    //if(!hide){
                    //    this.dataBinds.push(bind);
                    //}
                    //
                    //this.addBindedElement(e);
                })(list[i]);
            }
            var elist = this.element.querySelectorAll('[data-event]');
            for (var i = 0; i < elist.length; i++) {
                (function (node) {
                    var e = new Element(node);
                    var prop = e.element.getAttribute('data-event');
                    var binds = prop.split(';');
                    for (var j = 0; j < binds.length; j++) {
                        var parts = binds[j].split(':');
                        if (parts.length == 2) {
                            var bind = new latte.EventBind(e, parts[0].trim(), object, parts[1].trim());
                            e.eventBinds.push(bind);
                            _this.addBindedElement(e, bind, null);
                        }
                        else {
                            latte.log("[data-event] Bad Syntax: " + binds[j]);
                        }
                    }
                })(elist[i]);
            }
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
                _this.animate({ opacity: 1 }, time, function () { visible = true; callback(); });
                //me.animate({
                //    opacity: 1
                //}, time, 'swing', () => { visible = true; callback(); })
            };
            var hide = function (callback) {
                _this.animate({ opacity: 0 }, time, function () { visible = false; callback(); });
                //me.animate({
                //    opacity: 0
                //}, time, 'swing', () => { visible = false; callback(); })
            };
            var go = function () {
                if (++current == total) {
                    show(function () { });
                    if (latte._isFunction(callback)) {
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
         * Called when the data of the element has loaded successfully
         */
        Element.prototype.dataDidLoad = function () {
            for (var i = 0; i < this.dataElements.length; i++) {
                this.dataElements[i].dataDidLoad();
            }
        };
        /**
         * Called when the data load failed
         */
        Element.prototype.dataLoadFailed = function (errorDescription) {
            for (var i = 0; i < this.dataElements.length; i++) {
                this.dataElements[i].dataLoadFailed(errorDescription);
            }
        };
        /**
         * Called when data load is about to start
         */
        Element.prototype.dataWillLoad = function () {
            for (var i = 0; i < this.dataElements.length; i++) {
                this.dataElements[i].dataWillLoad();
            }
        };
        /**
         * Called when the element has been assigned as only child of another element, using the setContent method
         */
        Element.prototype.didLoad = function () {
        };
        /**
         * If conditional is true, ensures element has class, if not, ensures it doesn't
         * @param className
         * @param condition
         */
        Element.prototype.ensureClass = function (className, condition) {
            if (condition) {
                this.addClass(className);
            }
            else {
                this.removeClass(className);
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
                if (latte._isFunction(callback))
                    callback();
            });
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
                if (latte._isFunction(callback))
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
         * Finds an element and returns it
         * @param query
         * @returns {Element}
         */
        Element.prototype.find = function (query) {
            return new Element(this.querySelector(query));
        };
        /**
         * Returns the collection of matched nodes who are instances of latte.Element
         * @param query
         * @returns {latte.ElementCollection}
         */
        Element.prototype.findAll = function (query) {
            return latte.ElementCollection.fromNodeList(this.querySelectorAll(query));
        };
        /**
         * Gets the children of the element as an ElementCollection
         */
        Element.prototype.getCollection = function () {
            return latte.ElementCollection.fromNodeList(this.element.childNodes);
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
         * Loads the data of the data calls
         */
        Element.prototype.loadData = function () {
            var _this = this;
            var calls = this.loadDataCalls();
            if (calls.length > 0) {
                // Data will load
                this.dataWillLoad();
                // Create message
                var m = latte.Message.sendCalls(calls);
                // Handle fail
                m.failed.add(function (errorDesc) {
                    _this.dataLoadFailed(errorDesc);
                });
                // Handle arrival
                m.responseArrived.add(function () {
                    _this.dataDidLoad();
                });
            }
        };
        /**
         * Override this method to indicate the element loads data
         * @returns {null}
         */
        Element.prototype.loadDataCalls = function () {
            return [];
        };
        /**
         * Raises the <c>contentEditable</c> event
         */
        Element.prototype.onContentEditableChanged = function () {
            if (this._contentEditableChanged) {
                this._contentEditableChanged.raise();
            }
            if (this.contentEditable) {
                this.element['contentEditable'] = 'true';
            }
            else {
                this.element['contentEditable'] = 'false';
            }
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
         * Queries element for a native HTMLElement
         * @param query
         * @returns {HTMLElement}
         */
        Element.prototype.querySelector = function (query) {
            return this.element.querySelector(query);
        };
        /**
         * Queries element for native HTMLElements
         * @param query
         * @returns {NodeList}
         */
        Element.prototype.querySelectorAll = function (query) {
            return this.element.querySelectorAll(query);
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
        Element.prototype.setContent = function (e, silent) {
            if (silent === void 0) { silent = false; }
            this.clear();
            this.add(e);
            if (!silent) {
                e.visible = true;
                e.didLoad();
            }
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
         * Sets the children of the element as the elements of the collection
         * @param c
         */
        Element.prototype.setCollection = function (c) {
            this.clear();
            this.addCollection(c);
            return c;
        };
        /**
         * Replaces the element
         * @param e
         */
        Element.prototype.setElement = function (e) {
            this._element = null;
            this._element = e;
        };
        /**
         * Alternates the class, adds it if no present and removes it if present.
         * @param className
         */
        Element.prototype.swapClass = function (className) {
            if (this.hasClass(className)) {
                this.removeClass(className);
            }
            else {
                this.addClass(className);
            }
        };
        Element.prototype.toString = function () {
            return latte.sprintf("%s.%s", this.element.tagName, this.element.classList.toString());
        };
        Object.defineProperty(Element.prototype, "contentEditableChanged", {
            /**
             * Gets an event raised when the value of the contentEditable property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._contentEditableChanged) {
                    this._contentEditableChanged = new latte.LatteEvent(this);
                }
                return this._contentEditableChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "dataBindAdded", {
            /**
             * Gets an event raised when a data bind is added
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._dataBindAdded) {
                    this._dataBindAdded = new latte.LatteEvent(this);
                }
                return this._dataBindAdded;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>dataBindAdded</c> event
         */
        Element.prototype.onDataBindAdded = function (b) {
            if (this._dataBindAdded) {
                this._dataBindAdded.raise(b);
            }
        };
        Object.defineProperty(Element.prototype, "eventBindAdded", {
            /**
             * Gets an event raised when an event bind is added
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._eventBindAdded) {
                    this._eventBindAdded = new latte.LatteEvent(this);
                }
                return this._eventBindAdded;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>eventBindAdded</c> event
         */
        Element.prototype.onEventBindAdded = function (b) {
            if (this._eventBindAdded) {
                this._eventBindAdded.raise(b);
            }
        };
        Object.defineProperty(Element.prototype, "tagChanged", {
            /**
             * Gets an event raised when the value of the tag property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._tagChanged) {
                    this._tagChanged = new latte.LatteEvent(this);
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
                    this._visibleChanged = new latte.LatteEvent(this);
                }
                return this._visibleChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "backgroundColor", {
            //endregion
            //region Properties
            /**
             * Gets or sets the background color of the element
             * @returns {string}
             */
            get: function () {
                return this.style.backgroundColor;
            },
            /**
             * Gets or sets the background color of the element
             * @param value
             */
            set: function (value) {
                this.style.backgroundColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "backgroundImageUrl", {
            /**
             * Gets or sets the background image url
             *
             * @returns {string}
             */
            get: function () {
                return this.element.style.backgroundImage;
            },
            /**
             * Gets or sets the background image url
             *
             * @param {string} value
             */
            set: function (value) {
                this.element.style.backgroundImage = latte.sprintf("url(%s)", value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "bindedElements", {
            /**
             * Gets the binded elements of this element
             *
             * @returns {Element<HTMLElement>[]}
             */
            get: function () {
                if (!this._bindedElements) {
                    this._bindedElements = [];
                }
                return this._bindedElements;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "contentEditable", {
            /**
             * Gets or sets a value indicating if the node should de activated as editable
             *
             * @returns {boolean}
             */
            get: function () {
                return this._contentEditable;
            },
            /**
             * Gets or sets a value indicating if the node should de activated as editable
             *
             * @param {boolean} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._contentEditable;
                // Set value
                this._contentEditable = value;
                // Trigger changed event
                if (changed) {
                    this.onContentEditableChanged();
                }
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
        Object.defineProperty(Element.prototype, "dataBinds", {
            /**
             * Gets the data binds of the element
             *
             * @returns {DataBind[]}
             */
            get: function () {
                if (!this._dataBinds) {
                    this._dataBinds = [];
                }
                return this._dataBinds;
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
        Object.defineProperty(Element.prototype, "eventBinds", {
            /**
             * Gets the event binds of the element
             *
             * @returns {EventBind[]}
             */
            get: function () {
                if (!this._eventBinds) {
                    this._eventBinds = [];
                }
                return this._eventBinds;
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
                if (isNaN(value)) {
                    this.element.style.height = 'auto';
                }
                else if (value == null) {
                    this.element.style.height = '';
                }
                else if (value < 1) {
                    this.element.style.height = (value * 100) + 'px';
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
                var tagName = this.element.tagName.toLowerCase();
                //log("was " +tagName)
                if (tagName == 'input' || tagName == 'textarea') {
                    return this.element['value'];
                }
                else {
                    return this.element.innerHTML;
                }
            },
            /**
             * Gets or sets the inner text of the element
             *
             * @param {string} value
             */
            set: function (value) {
                var tagName = this.element.tagName.toLowerCase();
                if (tagName == 'input' || tagName == 'textarea' && !latte._undef(value)) {
                    this.element['value'] = value;
                }
                else {
                    this.element['innerHTML'] = value;
                }
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
        Object.defineProperty(Element.prototype, "tooltip", {
            /**
             * Gets or sets the tooltip of the elent
             *
             * @returns {string}
             */
            get: function () {
                return this.element.title;
            },
            /**
             * Gets or sets the tooltip of the elent
             *
             * @param {string} value
             */
            set: function (value) {
                this.element['title'] = value;
            },
            enumerable: true,
            configurable: true
        });
        return Element;
    }());
    latte.Element = Element;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 4/20/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var Animation = (function () {
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the animation
         * @param startValue
         * @param endValue
         * @param duration Duration of animation in seconds
         */
        function Animation(startValue, endValue, duration, updateHandler, endHandler) {
            if (updateHandler === void 0) { updateHandler = null; }
            if (endHandler === void 0) { endHandler = null; }
            /**
             * Property field
             */
            this._running = false;
            /**
             * Property field
             */
            this._tag = null;
            this._duration = duration;
            this._startValue = startValue;
            this._endValue = endValue;
            if (updateHandler) {
                this.update.add(updateHandler);
            }
            if (endHandler) {
                this.ended.add(endHandler);
            }
        }
        Object.defineProperty(Animation, "requestAnimationFrame", {
            /**
             * Gets the requestAnimationRequest function, cross-browser
             */
            get: function () {
                return window.requestAnimationFrame || (function () {
                    var timeLast = 0;
                    return window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || function (callback) {
                        var timeCurrent = (new Date()).getTime(), timeDelta;
                        /* Dynamically set the delay on a per-tick basis to more closely match 60fps. */
                        /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671. */
                        timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
                        timeLast = timeCurrent + timeDelta;
                        return setTimeout(function () { callback(timeCurrent + timeDelta); }, timeDelta);
                    };
                })();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Starts the animation loop.
         */
        Animation.loop = function () {
            Animation.loopActive = true;
            var now = latte.DateTime.now;
            var runningAnimations = 0;
            for (var i = 0; i < Animation.stack.length; i++) {
                // Get animation to attend
                var a = Animation.stack[i];
                // If animation no longer valid, continue
                if (!a || !a.running)
                    continue;
                var value = a.currentValue;
                //log("Updating: %s-%s -> %s", a.startValue, a.endValue, a.currentValue)
                if (now.compareTo(a.endTime) > 0 || value >= a.endValue) {
                    a._running = false;
                    a.onUpdate(a.endValue);
                    a.onEnded();
                }
                else {
                    a.onUpdate(value);
                    runningAnimations++;
                }
            }
            if (runningAnimations > 0) {
                var rq = Animation.requestAnimationFrame;
                //log("Relooping")
                rq(Animation.loop);
            }
            else {
                // Clear stack
                //log("Ending Loop")
                Animation.stack = [];
                Animation.loopActive = false;
            }
        };
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the value of the animation for the specified second of the animation
         * @param f
         * @returns {number}
         */
        Animation.prototype.getValueForSecond = function (s) {
            //if(this.startValue  + (this.speed * s) > 600) {
            //    debugger;
            //}
            return this.startValue + (this.speed * s);
        };
        /**
         * Starts the animation
         */
        Animation.prototype.start = function () {
            this._startTime = latte.DateTime.now;
            this._running = true;
            Animation.stack.push(this);
            if (!Animation.loopActive)
                Animation.loop(); // Start the animation loop
        };
        Object.defineProperty(Animation.prototype, "ended", {
            /**
             * Gets an event raised when the animation ends
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._ended) {
                    this._ended = new latte.LatteEvent(this);
                }
                return this._ended;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>ended</c> event
         */
        Animation.prototype.onEnded = function () {
            if (this._ended) {
                this._ended.raise();
            }
        };
        Object.defineProperty(Animation.prototype, "update", {
            /**
             * Gets an event raised when an update to the animation is performed
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._update) {
                    this._update = new latte.LatteEvent(this);
                }
                return this._update;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>update</c> event
         */
        Animation.prototype.onUpdate = function (value) {
            if (this._update) {
                this._update.raise(value);
            }
        };
        Object.defineProperty(Animation.prototype, "currentValue", {
            //endregion
            //region Properties
            /**
             * Gets the current value of distance to the current frame
             *
             * @returns {number}
             */
            get: function () {
                return this.getValueForSecond(latte.DateTime.now.subtractDate(this.startTime).totalSeconds);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "distance", {
            /**
             * Gets the distance of the animation
             *
             * @returns {number}
             */
            get: function () {
                return this.endValue - this.startValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "duration", {
            /**
             * Gets the duration of the animation, in seconds
             *
             * @returns {number}
             */
            get: function () {
                return this._duration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "endValue", {
            /**
             * Gets the final value of the animation
             *
             * @returns {number}
             */
            get: function () {
                return this._endValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "endTime", {
            /**
             * Gets the end time of the animation
             *
             * @returns {number}
             */
            get: function () {
                return this.startTime.addSeconds(this.duration);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "running", {
            /**
             * Gets a value indicating if the animation is currently running
             *
             * @returns {boolean}
             */
            get: function () {
                return this._running;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "startValue", {
            /**
             * Gets the initial value for the animation
             *
             * @returns {number}
             */
            get: function () {
                return this._startValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "startTime", {
            /**
             * Gets or sets the initial time of the animation
             *
             * @returns {DateTime}
             */
            get: function () {
                return this._startTime;
            },
            /**
             * Gets or sets the initial time of the animation
             *
             * @returns {DateTime}
             */
            set: function (value) {
                this._startTime = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "speed", {
            /**
             * Gets the speed of the animation value, in distance per second
             *
             * @returns {number}
             */
            get: function () {
                return this.distance / this.duration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "tag", {
            /**
             * Gets or sets the tag of the animation
             *
             * @returns {any}
             */
            get: function () {
                return this._tag;
            },
            /**
             * Gets or sets the tag of the animation
             *
             * @param {any} value
             */
            set: function (value) {
                this._tag = value;
            },
            enumerable: true,
            configurable: true
        });
        //region Static
        /**
         * Stack of active animations
         * @type {Array}
         */
        Animation.stack = [];
        Animation.loopActive = false;
        return Animation;
    }());
    latte.Animation = Animation;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/29/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var CollectionDataBind = (function () {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates and automatically sets up the binding
         */
        function CollectionDataBind(element, elementProperty, collection, type) {
            if (type === void 0) { type = latte.DataBindType.AUTO; }
            collection.each(function (object) {
            });
        }
        return CollectionDataBind;
    }());
    latte.CollectionDataBind = CollectionDataBind;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 4/15/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var Textbox = (function (_super) {
        __extends(Textbox, _super);
        //endregion
        /**
         * Creates the textbox
         */
        function Textbox(element) {
            var _this = this;
            _super.call(this, element);
            //endregion
            //region Fields
            this.lastValueOnKeyUp = null;
            /**
             * Property field
             */
            this._pristine = true;
            this.addEventListener('input', function () {
                if (_this.pristine) {
                    //log("Unpristined: " + this.input.name)
                    _this.pristine = false;
                }
                _this.lastValueOnKeyUp = _this.value;
            });
        }
        //region Static
        /**
         * Checks if email is valid
         * @param email
         * @returns {boolean}
         */
        Textbox.validEmail = function (email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        };
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Returns a value indicating if the value of the textbox contains only the caracters specified
         * in the validChars string.
         * @param validChars
         */
        Textbox.charCheck = function (text, validChars) {
            validChars = String(validChars);
            for (var i = 0; i < text.length; i++) {
                if (validChars.indexOf(text.charAt(i)) < 0) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Focuses on the Input
         */
        Textbox.prototype.focus = function () {
            this.input.focus();
        };
        /**
         * Returns the value of the textbox
         * @returns {string}
         */
        Textbox.prototype.toString = function () {
            return this.value;
        };
        Object.defineProperty(Textbox.prototype, "input", {
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Gets the element as an input element (Type Cast)
             *
             * @returns {HTMLInputElement}
             */
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Textbox.prototype, "isAlphanumeric", {
            /**
             * Gets a value indicating if the value of the textbox has only letters and numbers
             * @returns {boolean}
             */
            get: function () {
                return Textbox.charCheck(this.value, '1234567890qwertyuiopasdfghjklzxcvbnm');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Textbox.prototype, "isEmail", {
            /**
             * Gets a value indicating if the value of the textbox is an email
             *
             * @returns {boolean}
             */
            get: function () {
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                return re.test(this.value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Textbox.prototype, "isInt", {
            /**
             * Gets a value indicating if the value of the textbox is an integer number
             * @returns {boolean}
             */
            get: function () {
                return Textbox.charCheck(this.value, '1234567890');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Textbox.prototype, "isFloat", {
            /**
             * Gets a value indicating if the value of the textbox is a floating point number
             * @returns {boolean}
             */
            get: function () {
                return Textbox.charCheck(this.value, '123456789.');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Textbox.prototype, "minLength", {
            /**
             * Gets or sets the minimum length of the text in textbox
             *
             * @returns {number}
             */
            get: function () {
                return parseInt(this.element.getAttribute('data-minlength'), 10) || 0;
            },
            /**
             * Gets or sets the minimum length of the text in textbox
             *
             * @param {number} value
             */
            set: function (value) {
                this.element.setAttribute('data-minlength', String(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Textbox.prototype, "pristine", {
            /**
             * Gets or sets a value indicating if the textbox is pristine, i.e., it hasn't been touched
             *
             * @returns {boolean}
             */
            get: function () {
                return this._pristine;
            },
            /**
             * Gets or sets a value indicating if the textbox is pristine, i.e., it hasn't been touched
             *
             * @param {boolean} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._pristine;
                // Set value
                this._pristine = value;
                // Trigger changed event
                if (changed) {
                    this.onPristineChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Textbox.prototype, "pristineChanged", {
            /**
             * Gets an event raised when the value of the pristine property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._pristineChanged) {
                    this._pristineChanged = new latte.LatteEvent(this);
                }
                return this._pristineChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>pristine</c> event
         */
        Textbox.prototype.onPristineChanged = function () {
            if (this._pristineChanged) {
                this._pristineChanged.raise();
            }
        };
        Object.defineProperty(Textbox.prototype, "valid", {
            /**
             * Gets a value indicating if the textbox is valid
             *
             * @returns {boolean}
             */
            get: function () {
                var valid = true;
                if (valid && latte._isNumber(this.minLength)) {
                    valid = String(this.value).length >= this.minLength;
                }
                return valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Textbox.prototype, "value", {
            /**
             * Gets or sets the value of the textbox
             *
             * @returns {string}
             */
            get: function () {
                return this.input.value || "";
            },
            /**
             * Gets or sets the value of the textbox
             *
             * @param {string} value
             */
            set: function (value) {
                this.input.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return Textbox;
    }(latte.Element));
    latte.Textbox = Textbox;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/28/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var ElementCollection = (function (_super) {
        __extends(ElementCollection, _super);
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function ElementCollection() {
            _super.call(this);
        }
        //region Static
        /**
         * Creates the collection from the specified NodeList
         * @param list
         * @returns {latte.ElementCollection}
         */
        ElementCollection.fromNodeList = function (list) {
            var collection = new ElementCollection();
            for (var i = 0; i < list.length; i++) {
                (function (node) {
                    if (node['latte-element-instance'] instanceof latte.Element) {
                        collection.add(node['latte-element-instance']);
                    }
                })(list[i]);
            }
            return collection;
        };
        /**
         * Creates an array of elements of the specified base class, binds them to the specified array of records
         * and returns them as a ElementCollection
         *
         * @param array
         * @param baseClass
         * @returns {latte.ElementCollection}
         */
        ElementCollection.fromBindArray = function (array, baseClass) {
            var collection = new ElementCollection();
            for (var i = 0; i < array.length; i++) {
                (function (object) {
                    var c = baseClass;
                    var element = (new c);
                    element.bind(object);
                    collection.add(element);
                })(array[i]);
            }
            return collection;
        };
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Adds an event listener to the elements in the collection
         * @param event
         * @param handler
         * @param capture
         */
        ElementCollection.prototype.addEventListener = function (event, handler, capture) {
            if (capture === void 0) { capture = false; }
            this.each(function (e) {
                e.addEventListener(event, function (evt) {
                    var args = [e, evt];
                    for (var i = 0; i < arguments.length; i++)
                        args.push(arguments[i]);
                    handler.apply(e, args);
                }, capture);
            });
        };
        /**
         * Adds the specified class to the class list of the elements in the collection
         * @param className
         */
        ElementCollection.prototype.addClass = function (className) {
            this.each(function (e) {
                e.addClass(className);
            });
        };
        /**
         * Clears all the children of the elements in the collection
         */
        ElementCollection.prototype.clear = function () {
            this.each(function (e) {
                e.clear();
            });
        };
        /**
         * Fades in the elements in the collection
         * @param duration
         * @param callback
         */
        ElementCollection.prototype.fadeIn = function (duration, callback) {
            if (duration === void 0) { duration = 0.1; }
            if (callback === void 0) { callback = null; }
            this.each(function (e) {
                e.fadeIn(duration, callback);
            });
        };
        /**
         * Fades out the elements in the collection
         * @param duration
         * @param callback
         */
        ElementCollection.prototype.fadeOut = function (duration, callback) {
            if (duration === void 0) { duration = 0.1; }
            if (callback === void 0) { callback = null; }
            this.each(function (e) {
                e.fadeOut(duration, callback);
            });
        };
        /**
         * Adds an event handler to the elements in the collection
         * @param context
         * @param event
         * @param f
         */
        ElementCollection.prototype.handle = function (context, event, f) {
            this.each(function (e) {
                e.handle(context, event, f);
            });
        };
        /**
         * Removes the specified class to the class list of elements in the collection
         *
         * @param className
         */
        ElementCollection.prototype.removeClass = function (className) {
            this.each(function (e) {
                e.removeClass(className);
            });
        };
        /**
         * Sets the attribute of the elements
         * @param property
         * @param value
         */
        ElementCollection.prototype.setAttribute = function (att, value) {
            this.each(function (e) {
                e.element.setAttribute(att, value);
            });
        };
        /**
         * Sets the property of the elements
         * @param property
         * @param value
         */
        ElementCollection.prototype.setProperty = function (property, value) {
            this.each(function (e) {
                e[property] = value;
            });
        };
        /**
         * Sets the visibility of the elements in the collection
         * @param visible
         */
        ElementCollection.prototype.setVisible = function (visible) {
            this.each(function (e) {
                e.visible = visible;
            });
        };
        return ElementCollection;
    }(latte.Collection));
    latte.ElementCollection = ElementCollection;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/28/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var EventBind = (function () {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function EventBind(element, elementEvent, record, recordMethod) {
            this.setup(element, elementEvent, record, recordMethod);
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Sets up the bind
         * @param element
         * @param elementEvethis.bindedElements.push(e);nt
         * @param record
         * @param recordMethod
         */
        EventBind.prototype.setup = function (element, elementEvent, record, recordMethod) {
            this._element = element;
            this._elementEvent = elementEvent;
            this._record = record;
            this._recordMethod = recordMethod;
            var __this = this;
            if (this.element[this.elementEvent] instanceof latte.LatteEvent) {
                this.element[this.elementEvent].add(function () {
                    var args = [];
                    for (var i = 0; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    if (latte._isFunction(__this.record[__this.recordMethod])) {
                        __this.record[__this.recordMethod].apply(__this.record, args);
                    }
                    else {
                    }
                });
            }
            else {
                this.element.addEventListener(this.elementEvent, function () {
                    var args = [];
                    for (var i = 0; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    if (latte._isFunction(__this.record[__this.recordMethod])) {
                        __this.record[__this.recordMethod].apply(__this.record, args);
                    }
                    else {
                    }
                });
            }
        };
        Object.defineProperty(EventBind.prototype, "element", {
            /**
             * Gets the element to bind
             *
             * @returns {Element<HTMLElement>}
             */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventBind.prototype, "elementEvent", {
            /**
             * Gets the element event
             *
             * @returns {string}
             */
            get: function () {
                return this._elementEvent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventBind.prototype, "record", {
            /**
             * Gets the record to bind
             *
             * @returns {any}
             */
            get: function () {
                return this._record;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventBind.prototype, "recordMethod", {
            /**
             * Gets the method to execute on the record
             *
             * @returns {string}
             */
            get: function () {
                return this._recordMethod;
            },
            enumerable: true,
            configurable: true
        });
        return EventBind;
    }());
    latte.EventBind = EventBind;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/28/15.
 */
var latte;
(function (latte) {
    /**
     * Represents a very simple data adapter that passes the data along as strings.
     */
    var DefaultDataAdapter = (function () {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the adapter
         */
        function DefaultDataAdapter() {
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Transforms the value of the record into a proper value for the element
         *
         * @param value
         */
        DefaultDataAdapter.prototype.adaptForElement = function (value) {
            return value;
        };
        /**
         * Transforms the value of the element into a proper value for the record
         * @param value
         */
        DefaultDataAdapter.prototype.adaptForRecord = function (value) {
            return value;
        };
        return DefaultDataAdapter;
    }());
    latte.DefaultDataAdapter = DefaultDataAdapter;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/28/15.
 */
var latte;
(function (latte) {
    /**
     * Types of binding
     */
    (function (DataBindType) {
        /**
         * Will listen for changes on both the element and the record.
         */
        DataBindType[DataBindType["AUTO"] = 1] = "AUTO";
        /**
         * Will listen for changes only on the record property in order to call apply()
         * @type {number}
         */
        DataBindType[DataBindType["AUTO_APPLY"] = 2] = "AUTO_APPLY";
        /**
         * Will listen for changes only on the element, in order to call commit()
         * @type {number}
         */
        DataBindType[DataBindType["AUTO_COMMIT"] = 3] = "AUTO_COMMIT";
        /**
         * Will not listen for any changes. User must call apply() and commit() manually.
         * @type {number}
         */
        DataBindType[DataBindType["MANUAL"] = 4] = "MANUAL";
    })(latte.DataBindType || (latte.DataBindType = {}));
    var DataBindType = latte.DataBindType;
    /**
     * Binds the property of an object to the property of an element
     */
    var DataBind = (function () {
        //endregion
        /**
         * Creates and automatically sets up the binding
         */
        function DataBind(element, elementProperty, record, recordProperty, type, dataAdapter, elementEvent, recordEvent) {
            if (type === void 0) { type = DataBindType.AUTO; }
            if (dataAdapter === void 0) { dataAdapter = null; }
            if (elementEvent === void 0) { elementEvent = null; }
            if (recordEvent === void 0) { recordEvent = null; }
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._dataAdapter = null;
            /**
             * Property field
             */
            this._element = null;
            /**
             * Property field
             */
            this._elementEvent = null;
            /**
             * Property field
             */
            this._elementProperty = null;
            /**
             * Property field
             */
            this._record = null;
            /**
             * Property field
             */
            this._recordEvent = null;
            /**
             * Property field
             */
            this._recordProperty = null;
            if (dataAdapter) {
                this.dataAdapter = dataAdapter;
            }
            this.setup(element, elementProperty, record, recordProperty, type, elementEvent, recordEvent);
        }
        //region Private Methods
        /**
         * Sets up the listeners, removes previous listeners and applies the binding for the first time.
         */
        DataBind.prototype.setup = function (element, elementProperty, record, recordProperty, type, elementEvent, recordEvent) {
            var _this = this;
            if (type === void 0) { type = DataBindType.MANUAL; }
            if (elementEvent === void 0) { elementEvent = null; }
            if (recordEvent === void 0) { recordEvent = null; }
            this._element = element;
            this._elementProperty = elementProperty;
            this._record = record;
            this._recordProperty = recordProperty;
            this._elementEvent = elementEvent;
            this._recordEvent = recordEvent;
            this._type = type;
            this.uninstall();
            if (this.type == DataBindType.AUTO || this.type == DataBindType.AUTO_COMMIT) {
                if (this.element instanceof latte.Element && latte._isString(this.elementEvent)) {
                    this.lastElement = this.element;
                    this.lastElementEvent = this.elementEvent;
                    this.lastElementListener = function () { _this.commit(); };
                    // Obtain when element changes
                    this.element.addEventListener(this.elementEvent, this.lastElementListener);
                }
                else {
                    latte.log(latte.sprintf("Warning: Binding -> commit not possible (Element: %s; %s; elementProperty: %s; recordProperty: %s).", String(this.element), String(this.record), String(this.elementProperty), String(this.recordProperty)));
                }
            }
            if (this.type == DataBindType.AUTO || this.type == DataBindType.AUTO_APPLY) {
                if (this.record && latte._isString(this.recordEvent) && this.record[this.recordEvent]) {
                    this.lastRecord = this.record;
                    this.lastRecordEvent = this.recordEvent;
                    this.lastRecordListener = function () { _this.apply(); };
                    // Apply when data on record changes
                    this.record[this.recordEvent].add(this.lastRecordListener);
                }
                else {
                    if (!latte._undef(this.record[this.recordProperty])) {
                    }
                }
            }
            this.apply();
        };
        /**
         * Uninstalls the last assigned listeners
         */
        DataBind.prototype.uninstall = function () {
            if (this.lastElementListener) {
                this.lastElement.element.removeEventListener(this.lastElementEvent, this.lastElementListener);
            }
            if (this.lastRecordListener) {
                this.lastRecord[this.lastRecordEvent].remove(this.lastRecordListener);
            }
        };
        //endregion
        //region Methods
        /**
         * Applies the data of the record to the elements property
         */
        DataBind.prototype.apply = function () {
            var value = this.record[this.recordProperty];
            //Is this all right? value will be only applied when value is not undefined
            if (!latte._undef(value)) {
                this.element[this.elementProperty] = this.dataAdapter.adaptForElement(value);
            }
            this.onApplied();
        };
        /**
         * Raises the <c>applied</c> event
         */
        DataBind.prototype.onApplied = function () {
            if (this._applied) {
                this._applied.raise();
            }
        };
        /**
         * Obtains the data from the element and sends it to the record
         */
        DataBind.prototype.commit = function () {
            this.record[this.recordProperty] = this.dataAdapter.adaptForRecord(this.element[this.elementProperty]);
            this.onCommitted();
        };
        /**
         * Raises the <c>committed</c> event
         */
        DataBind.prototype.onCommitted = function () {
            if (this._committed) {
                this._committed.raise();
            }
        };
        Object.defineProperty(DataBind.prototype, "applied", {
            /**
             * Gets an event raised when the data of the record is applied to the element
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._applied) {
                    this._applied = new latte.LatteEvent(this);
                }
                return this._applied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBind.prototype, "committed", {
            /**
             * Gets an event raised when the binding is returned from the element to the record
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._committed) {
                    this._committed = new latte.LatteEvent(this);
                }
                return this._committed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBind.prototype, "dataAdapter", {
            /**
             * Gets or sets the data adapter of the bind
             *
             * @returns {DataAdapter<any, any>}
             */
            get: function () {
                if (!this._dataAdapter) {
                    this._dataAdapter = new latte.DefaultDataAdapter();
                }
                return this._dataAdapter;
            },
            /**
             * Gets or sets the data adapter of the bind
             *
             * @param {DataAdapter<any, any>} value
             */
            set: function (value) {
                this._dataAdapter = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBind.prototype, "element", {
            /**
             * Gets or sets the binded element
             *
             * @returns {Element}
             */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBind.prototype, "elementEvent", {
            /**
             * Gets or sets the event that will trigger obtain on change
             *
             * @returns {string}
             */
            get: function () {
                return this._elementEvent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBind.prototype, "elementProperty", {
            /**
             * Gets or sets the property of the element to bind
             *
             * @returns {string}
             */
            get: function () {
                return this._elementProperty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBind.prototype, "record", {
            /**
             * Gets or sets the record to bind
             *
             * @returns {any}
             */
            get: function () {
                return this._record;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBind.prototype, "recordEvent", {
            /**
             * Gets or sets the name of the event that detonates a change in the record
             *
             * @returns {string}
             */
            get: function () {
                return this._recordEvent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBind.prototype, "recordProperty", {
            /**
             * Gets or sets the property of the record to bind
             *
             * @returns {string}
             */
            get: function () {
                return this._recordProperty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataBind.prototype, "type", {
            /**
             * Gets the type of binding
             *
             * @returns {DataBindType}
             */
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        return DataBind;
    }());
    latte.DataBind = DataBind;
})(latte || (latte = {}));
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/support/ts-include/latte.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/support/ts-include/latte.data.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/support/ts-include/latte.data.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/ts/data-bind/DataAdapter.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/ts/Element.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/ts/Animation.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/ts/data-bind/CollectionDataBind.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/ts/Textbox.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/ts/ElementCollection.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/ts/data-bind/EventBind.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/ts/data-bind/DefaultDataAdapter.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.element/ts/data-bind/DataBind.ts" /> 
