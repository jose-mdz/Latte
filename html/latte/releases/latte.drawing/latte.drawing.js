var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var DrawingRectangle = (function () {
        //endregion
        //region Fields
        //endregion
        /**
         * Creates a new Rectangle by specifiyng its location and size
         * @param left
         * @param top
         * @param width
         * @param height
         */
        function DrawingRectangle(left, top, width, height) {
            if (left === void 0) { left = 0; }
            if (top === void 0) { top = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            /**
             * Property field
             */
            this._height = 0;
            /**
             * Property field
             */
            this._left = 0;
            /**
             * Property field
             */
            this._top = 0;
            /**
             * Property field
             */
            this._tag = null;
            /**
             * Property field
             */
            this._width = 0;
            this.left = left;
            this.top = top;
            this.width = width;
            this.height = height;
        }
        //region Static
        /**
         * Creates a new Rectangle from the specified left, top, right and bottom coordinates
         * @param left
         * @param top
         * @param right
         * @param bottom
         * @returns {latte.DrawingRectangle}
         */
        DrawingRectangle.fromLTRB = function (left, top, right, bottom) {
            if (left === void 0) { left = 0; }
            if (top === void 0) { top = 0; }
            if (right === void 0) { right = 0; }
            if (bottom === void 0) { bottom = 0; }
            var r = new DrawingRectangle();
            r.top = top;
            r.left = left;
            r.sizeBottom(bottom);
            r.sizeRight(right);
            return r;
        };
        /**
         * Creates a new Rectangle from the specifed location and size
         * @param location
         * @param size
         * @returns {latte.DrawingRectangle}
         */
        DrawingRectangle.fromLocationSize = function (location, size) {
            return new DrawingRectangle(location.x, location.y, size.width, size.height);
        };
        /**
         * Creates a new Rectangle from the specified points as corners
         * @param a
         * @param b
         */
        DrawingRectangle.fromPoints = function (a, b) {
            return DrawingRectangle.fromLTRB(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.max(a.x, b.x), Math.max(a.y, b.y));
        };
        /**
         * Gets the intersection of two rectangles
         * @param a
         * @param b
         */
        DrawingRectangle.intersect = function (a, b) {
            var n = Math.max(a.left, b.left);
            var n1 = Math.min(a.right, b.right);
            var n2 = Math.max(a.top, b.top);
            var n3 = Math.min(a.bottom, b.bottom);
            if (n1 < n || n3 < n2) {
                return new DrawingRectangle();
            }
            else {
                return new DrawingRectangle(n, n2, n1 - n, n3 - n2);
            }
        };
        /**
         * Returns the result of the union of the two rectangles
         * @param a
         * @param b
         * @returns {latte.DrawingRectangle}
         */
        DrawingRectangle.union = function (a, b) {
            var num = Math.min(a.left, b.left);
            var num1 = Math.max(a.left + a.width, b.left + b.width);
            var num2 = Math.min(a.top, b.top);
            var num3 = Math.max(a.top + a.height, b.top + b.height);
            return new DrawingRectangle(num, num2, num1 - num, num3 - num2);
        };
        //region Private Methods
        //endregion
        //region Method
        /**
         * Creates a copy of the rectangle
         * @returns {DrawingRectangle}
         */
        DrawingRectangle.prototype.clone = function () {
            return DrawingRectangle.fromLocationSize(this.location, this.size);
        };
        /**
         * Returns a value indicating if the specified point is contained in the rectangle
         * @param p
         */
        DrawingRectangle.prototype.containsPoint = function (p) {
            return this.left <= p.x && this.right >= p.x && this.top <= p.y && this.bottom >= p.y;
        };
        /**
         * Returns a value indicating if the rectangle fits in the specified container
         *
         * @param r
         * @returns {boolean}
         */
        DrawingRectangle.prototype.fitsIn = function (r) {
            return this.width <= r.width && this.height <= r.height;
        };
        /**
         * Inflates the rectangle
         * @param width
         * @param height
         */
        DrawingRectangle.prototype.inflate = function (width, height) {
            this.left -= width;
            this.top -= height;
            this.width += width * 2;
            this.height += height * 2;
        };
        /**
         * Gets a value indicating if the rectangle intersects with the specified rectangle
         * @param r
         * @returns {boolean}
         */
        DrawingRectangle.prototype.intersectsWidth = function (r) {
            if (r.left >= this.right
                || this.left >= r.right
                || r.top >= this.bottom) {
                return false;
            }
            else {
                return this.top < r.bottom;
            }
        };
        /**
         * Offsets the rectangle
         * @param x
         * @param y
         */
        DrawingRectangle.prototype.offset = function (x, y) {
            this.left += x;
            this.top += y;
        };
        /**
         * Changes the position of the rectangle to match the specified Bottom
         * @param bottom
         */
        DrawingRectangle.prototype.positionBottom = function (bottom) {
            this.top = bottom - this.height;
        };
        /**
         * Changes the position of the rectangle to match the specified Right
         * @param right
         */
        DrawingRectangle.prototype.positionRight = function (right) {
            this.left = right - this.width;
        };
        /**
         * Changes the size of the rectangle to match the specified Right
         * @param right
         */
        DrawingRectangle.prototype.sizeBottom = function (bottom) {
            this.height = bottom - this.top;
        };
        /**
         * Changes the size of the rectangle to match the specified Right
         * @param right
         */
        DrawingRectangle.prototype.sizeRight = function (right) {
            this.width = right - this.left;
        };
        /**
         * Scales the rectangle to fit the specified size
         * @param size
         */
        DrawingRectangle.prototype.scaleToFit = function (size) {
            var outer = DrawingRectangle.fromLocationSize(this.location, size);
            var inner = this;
            var resizeFactor = inner.aspectRatio >= outer.aspectRatio ?
                (outer.width / inner.width) : (outer.height / inner.height);
            var newWidth = inner.width * resizeFactor;
            var newHeight = inner.height * resizeFactor;
            var newLeft = outer.left + (outer.width - newWidth) / 2;
            var newTop = outer.top + (outer.height - newHeight) / 2;
            return new DrawingRectangle(newLeft, newTop, newWidth, newHeight);
        };
        /**
         * Returns a scaled rectangle
         * @param width
         */
        DrawingRectangle.prototype.scaleToHeight = function (height) {
            return new DrawingRectangle(this.left, this.top, height * this.width / this.height, height);
        };
        /**
         * Returns a scaled rectangle
         * @param width
         */
        DrawingRectangle.prototype.scaleToWidth = function (width) {
            return new DrawingRectangle(this.left, this.top, width, width * this.height / this.width);
        };
        Object.defineProperty(DrawingRectangle.prototype, "aspectRatio", {
            //endregion
            //region Properties
            /**
             * Gets the aspect ratio of the rectangle
             *
             * @returns {number}
             */
            get: function () {
                return this.width / this.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "center", {
            /**
             * Gets or sets the center point of the rectangle
             *
             * @returns {DrawingPoint}
             */
            get: function () {
                return new latte.Point(this.centerX, this.centerY);
            },
            /**
             * Gets or sets the center point of the rectangle
             *
             * @param {DrawingPoint} value
             */
            set: function (value) {
                this.centerX = value.x;
                this.centerY = value.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "centerX", {
            /**
             * Gets or sets the X center of the rectangle
             *
             * @returns {number}
             */
            get: function () {
                return this.left + this.width / 2;
            },
            /**
             * Gets or sets the X center of the rectangle
             *
             * @param {number} value
             */
            set: function (value) {
                this.left = value - this.width / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "centerY", {
            /**
             * Gets or sets the Y center of the rectangle
             *
             * @returns {number}
             */
            get: function () {
                return this.top + this.height / 2;
            },
            /**
             * Gets or sets the Y center of the rectangle
             *
             * @param {number} value
             */
            set: function (value) {
                this.top = value - this.height / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "bottom", {
            /**
             * Gets the Bottom coordinate
             *
             * @returns {number}
             */
            get: function () {
                return this.top + this.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "bounds", {
            /**
             * Gets or sets the bounds of rectangle. Use this property to copy out or in the coordinates of the rectangle
             *
             * @returns {DrawingRectangle}
             */
            get: function () {
                return new DrawingRectangle(this.left, this.top, this.width, this.height);
            },
            /**
             * Gets or sets the bounds of rectangle. Use this property to copy out or in the coordinates of the rectangle
             *
             * @param {DrawingRectangle} value
             */
            set: function (value) {
                this.location = value.location;
                this.size = value.size;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "height", {
            /**
             * Gets or sets the Height of the rectangle
             *
             * @returns {number}
             */
            get: function () {
                return this._height;
            },
            /**
             * Gets or sets the Height of the rectangle
             *
             * @param {number} value
             */
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "left", {
            /**
             * Gets or sets the Left coordinate
             *
             * @returns {number}
             */
            get: function () {
                return this._left;
            },
            /**
             * Gets or sets the Left coordinate
             *
             * @param {number} value
             */
            set: function (value) {
                this._left = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "location", {
            /**
             * Gets the location of the rectangle
             *
             * @returns {DrawingPoint}
             */
            get: function () {
                return new latte.Point(this.left, this.top);
            },
            /**
             * Gets or sets the location of the rectangle
             *
             * @returns {DrawingPoint}
             */
            set: function (p) {
                this.left = p.x;
                this.top = p.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "right", {
            /**
             * Gets the Right coordinate
             *
             * @returns {number}
             */
            get: function () {
                return this.left + this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "top", {
            /**
             * Gets or sets the Top coordinate
             *
             * @returns {number}
             */
            get: function () {
                return this._top;
            },
            /**
             * Gets or sets the Top coordinate
             *
             * @param {number} value
             */
            set: function (value) {
                this._top = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "size", {
            /**
             * Gets or sets the size of the rectangle
             *
             * @returns {DrawingSize}
             */
            get: function () {
                return new latte.Size(this.width, this.height);
            },
            /**
             * Gets or sets the size of the rectangle
             * @param value
             */
            set: function (value) {
                this.width = value.width;
                this.height = value.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "tag", {
            /**
             * Gets or sets a tag for the object
             *
             * @returns {any}
             */
            get: function () {
                return this._tag;
            },
            /**
             * Gets or sets a tag for the object
             *
             * @param {any} value
             */
            set: function (value) {
                this._tag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "topLeft", {
            /**
             * Gets the top left point
             *
             * @returns {Point}
             */
            get: function () {
                return new latte.Point(this.left, this.top);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "topRight", {
            /**
             * Gets the top right point
             *
             * @returns {Point}
             */
            get: function () {
                return new latte.Point(this.right, this.top);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "bottomLeft", {
            /**
             * Gets the bottom left point
             *
             * @returns {Point}
             */
            get: function () {
                return new latte.Point(this.left, this.bottom);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "bottomRight", {
            /**
             * Gets the bottom right point
             *
             * @returns {Point}
             */
            get: function () {
                return new latte.Point(this.right, this.bottom);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "isHorizontal", {
            /**
             * Gets a value indicating if the rectangle is horizontal
             *
             * @returns {boolean}
             */
            get: function () {
                return this.height < this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "isSquare", {
            /**
             * Gets a value indicating if the rectangle is a square
             *
             * @returns {boolean}
             */
            get: function () {
                return this.height == this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "isVertical", {
            /**
             * Gets a value indicating if the rectangle is vertical
             *
             * @returns {boolean}
             */
            get: function () {
                return this.height > this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingRectangle.prototype, "width", {
            /**
             * Gets or sets the Width of the rectangle
             *
             * @returns {number}
             */
            get: function () {
                return this._width;
            },
            /**
             * Gets or sets the Width of the rectangle
             *
             * @param {number} value
             */
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        return DrawingRectangle;
    }());
    latte.DrawingRectangle = DrawingRectangle;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var DrawingElement = (function (_super) {
        __extends(DrawingElement, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function DrawingElement() {
            _super.call(this);
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._hidden = false;
            /**
             * Property field
             */
            this._paused = false;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Draws the element
         * @param c
         */
        DrawingElement.prototype.draw = function (c) {
        };
        /**
         * Updates the element
         */
        DrawingElement.prototype.update = function () {
        };
        Object.defineProperty(DrawingElement.prototype, "hidden", {
            /**
             * Gets or sets a value indicating if the element is currently hidden
             *
             * @returns {boolean}
             */
            get: function () {
                return this._hidden;
            },
            /**
             * Gets or sets a value indicating if the element is currently hidden
             *
             * @param {boolean} value
             */
            set: function (value) {
                this._hidden = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingElement.prototype, "paused", {
            /**
             * Gets or sets a value indicating if the element is paused
             *
             * @returns {boolean}
             */
            get: function () {
                return this._paused;
            },
            /**
             * Gets or sets a value indicating if the elment is paused
             *
             * @param {boolean} value
             */
            set: function (value) {
                this._paused = value;
            },
            enumerable: true,
            configurable: true
        });
        return DrawingElement;
    }(latte.DrawingRectangle));
    latte.DrawingElement = DrawingElement;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var Brush = (function () {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the Brush
         */
        function Brush(color) {
            if (color === void 0) { color = latte.Color.black; }
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._color = null;
            this.color = color;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Applies the brush on the specified context
         * @param c
         */
        Brush.prototype.applyOn = function (c) {
            c.context.fillStyle = this.color.toString();
        };
        Object.defineProperty(Brush.prototype, "color", {
            /**
             * Gets or sets the color of the brush
             *
             * @returns {Color}
             */
            get: function () {
                return this._color;
            },
            /**
             * Gets or sets the color of the brush
             *
             * @param {Color} value
             */
            set: function (value) {
                this._color = value;
            },
            enumerable: true,
            configurable: true
        });
        return Brush;
    }());
    latte.Brush = Brush;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    var NodeAnimation = (function () {
        function NodeAnimation(node, animation, key, callback) {
            /**
             * Property field
             */
            this._running = false;
            this.node = node;
            this.callback = callback;
            this.frame = 0;
            this.animation = animation;
            this.running = true;
            this.initialState = animation.getInitialState(node);
            this.key = key;
        }
        Object.defineProperty(NodeAnimation.prototype, "running", {
            /**
             * Gets or sets a value indicating if the animation is currently running
             *
             * @returns {boolean}
             */
            get: function () {
                return this._running;
            },
            /**
             * Gets or sets a value indicating if the animation is currently running
             *
             * @param {boolean} value
             */
            set: function (value) {
                var wasRunning = this._running;
                this._running = value;
                if (wasRunning && !value && this.callback) {
                    this.callback.call(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        return NodeAnimation;
    }());
    /**
     *
     */
    var DrawingNode = (function (_super) {
        __extends(DrawingNode, _super);
        //endregion
        /**
         *
         */
        function DrawingNode() {
            _super.call(this);
            //region Static
            //endregion
            //region Fields
            this.originalLocation = null;
            this.originalOpacity = 0;
            this.originalPivot = null;
            this.originalScale = null;
            this.animations = [];
            /**
             * Property field
             */
            this._angle = 0;
            /**
             * Property field
             */
            this._opacity = 1;
            /**
             * Property field
             */
            this._parent = null;
            /**
             * Property field
             */
            this._scene = null;
        }
        //region Private Methods
        /**
         * Removes the ended animations from array
         */
        DrawingNode.prototype.clearEndedAnimations = function () {
            var arr = [];
            for (var i = 0; i < this.animations.length; i++) {
                var nodeAnimation = this.animations[i];
                if (nodeAnimation.running) {
                    arr.push(nodeAnimation);
                }
            }
            this.animations = arr;
        };
        /**
         * Gets the animation by the specified key
         * @param key
         * @returns {*}
         */
        DrawingNode.prototype.getNodeAnimationByKey = function (key) {
            for (var i = 0; i < this.animations.length; i++) {
                var nodeAnimation = this.animations[i];
                if (nodeAnimation.key == key) {
                    return nodeAnimation;
                }
            }
            return null;
        };
        //endregion
        //region Methods
        /**
         * Flushes the toilet after drawing
         * @param c
         */
        DrawingNode.prototype.afterDraw = function (c) {
            // Rotation
            if (this.angle != 0) {
                // Return to original angle
                c.context.rotate(-this.angle);
                // Return to original location
                this.location = this.originalLocation;
                this.originalLocation = null;
                // Return translation of context
                c.context.translate(-this.originalPivot.x, -this.originalPivot.y);
                this.originalPivot = null;
            }
            // Opacity
            c.context.globalAlpha = this.originalOpacity;
        };
        /**
         * Prepares context for drawning
         * @param c
         */
        DrawingNode.prototype.beforeDraw = function (c) {
            this.originalLocation = this.location;
            // Get pivot for rotation
            var p = this.originalPivot = this.getRotationPoint();
            // Rotation
            if (this.angle != 0) {
                // Translate to pivot
                c.context.translate(p.x, p.y);
                // Rotate to angle
                c.context.rotate(this.angle);
                // Translate me to point
                //                this.location = new Point(-this.width/2, -this.height/2);
                this.location = new latte.Point(this.left - p.x, this.top - p.y);
            }
            // Opacity
            this.originalOpacity = c.context.globalAlpha;
            c.context.globalAlpha *= this.opacity;
        };
        /**
         * Override
         * @param c
         */
        DrawingNode.prototype.draw = function (c) {
            _super.prototype.draw.call(this, c);
        };
        /**
         * Performs a complete draw with preparation and toilet flush
         * @param c
         */
        DrawingNode.prototype.completeDraw = function (c) {
            // Prepare draw
            this.beforeDraw(c);
            // Draw
            this.draw(c);
            // Recursively draw children
            for (var i = 0; i < this.nodes.length; i++) {
                var drawingNode = this.nodes[i];
                if (!drawingNode.hidden) {
                    drawingNode.completeDraw(c);
                }
            }
            // Flush the toilet
            this.afterDraw(c);
        };
        /**
         * Gets the rotation point. Override to specify point. Center by default.
         * @returns {Point}
         */
        DrawingNode.prototype.getRotationPoint = function () {
            return this.center;
        };
        /**
         * Gets nodes at specified point
         * @param p
         * @returns {Array}
         */
        DrawingNode.prototype.getNodesAtPoint = function (p, deep) {
            if (deep === void 0) { deep = false; }
            var nodes = [];
            for (var i = this.nodes.length - 1; i >= 0; i--) {
                var drawingNode = this.nodes[i];
                if (drawingNode.containsPoint(p)) {
                    nodes.push(drawingNode);
                }
                if (deep) {
                    var sub = drawingNode.getNodesAtPoint(p, deep);
                    if (sub.length) {
                        nodes = nodes.concat(sub);
                    }
                }
            }
            return nodes;
        };
        /**
         * Gets the nodes of the specified type.
         * Additionally deep might be specified to search internally.
         * @param type
         * @returns {DrawingNode[]}
         */
        DrawingNode.prototype.getNodesByType = function (type, deep) {
            if (deep === void 0) { deep = false; }
            var nodes = [];
            for (var i = 0; i < this.nodes.length; i++) {
                var drawingNode = this.nodes[i];
                if (drawingNode instanceof type) {
                    nodes.push(drawingNode);
                }
                if (deep) {
                    var sub = drawingNode.getNodesByType(type);
                    if (sub.length) {
                        nodes = nodes.concat(sub);
                    }
                }
            }
            return nodes;
        };
        /**
         * Gets a value indicating if item is running an animation of the specified key
         * @param key
         * @returns {Animation|any}
         */
        DrawingNode.prototype.isRunningAnimationOfKey = function (key) {
            var a = this.getNodeAnimationByKey(key);
            return a && a.running;
        };
        /**
         * Called when a node is added
         * @param node
         */
        DrawingNode.prototype.onNodeAdded = function (node) {
            node.parent = this;
            node.scene = this.scene;
        };
        /**
         * Called when a node is removed
         * @param node
         */
        DrawingNode.prototype.onNodeRemoved = function (node) {
        };
        /**
         * Runs the specified animation
         * @param a
         */
        DrawingNode.prototype.runAnimation = function (a, callback) {
            if (callback === void 0) { callback = null; }
            this.runAnimationWithKey(a, null, callback);
        };
        /**
         * Runs the specified animation by using the specified key
         * @param a
         * @param key
         */
        DrawingNode.prototype.runAnimationWithKey = function (a, key, callback) {
            if (callback === void 0) { callback = null; }
            this.animations.push(new NodeAnimation(this, a, key, callback));
        };
        /**
         * Stops all running animations
         */
        DrawingNode.prototype.stopAnimations = function () {
            this.animations = [];
        };
        /**
         * Stops the animation of the specified key
         * @param key
         */
        DrawingNode.prototype.stopAnimation = function (key) {
            var a = this.getNodeAnimationByKey(key);
            if (a && a.running) {
                a.running = false;
                this.clearEndedAnimations();
            }
        };
        /**
         * Override
         */
        DrawingNode.prototype.update = function () {
            _super.prototype.update.call(this);
            var mustClean = false;
            for (var i = 0; i < this.animations.length; i++) {
                var nodeAnimation = this.animations[i];
                if (nodeAnimation.running) {
                    nodeAnimation.animation.onUpdate(this, nodeAnimation.frame++, nodeAnimation.initialState);
                    if (nodeAnimation.frame > nodeAnimation.animation.frames) {
                        nodeAnimation.running = false;
                        mustClean = true;
                    }
                }
            }
            if (mustClean) {
                this.clearEndedAnimations();
            }
        };
        Object.defineProperty(DrawingNode.prototype, "animating", {
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Gets a value indicating if the node is currently being animated
             *
             * @returns {boolean}
             */
            get: function () {
                for (var i = 0; i < this.animations.length; i++) {
                    var nodeAnimation = this.animations[i];
                    if (nodeAnimation.running) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingNode.prototype, "angle", {
            /**
             * Gets or sets the rotation angle of the node
             *
             * @returns {number}
             */
            get: function () {
                return this._angle;
            },
            /**
             * Gets or sets the rotation angle of the node
             *
             * @param {number} value
             */
            set: function (value) {
                this._angle = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingNode.prototype, "nodes", {
            /**
             * Gets the nodes of the scene
             *
             * @returns {Collection<DrawingNode>}
             */
            get: function () {
                var _this = this;
                if (!this._nodes) {
                    this._nodes = new latte.Collection(function (node, index) { _this.onNodeAdded(node); }, function (node, index) { _this.onNodeRemoved(node); });
                }
                return this._nodes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingNode.prototype, "opacity", {
            /**
             * Gets or sets the opacity of the node
             *
             * @returns {number}
             */
            get: function () {
                return this._opacity;
            },
            /**
             * Gets or sets the opacity of the node
             *
             * @param {number} value
             */
            set: function (value) {
                this._opacity = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingNode.prototype, "parent", {
            /**
             * Gets or sets the parent node of this node, if any. If null, node is directly under the scene order.
             *
             * @returns {DrawingNode}
             */
            get: function () {
                return this._parent;
            },
            /**
             * Gets or sets the parent node of this node, if any. If null, node is directly under the scene order.
             *
             * @param {DrawingNode} value
             */
            set: function (value) {
                this._parent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingNode.prototype, "scene", {
            /**
             * Gets or sets the scene where the node lives
             *
             * @returns {DrawingScene}
             */
            get: function () {
                return this._scene;
            },
            /**
             * Gets or sets the scene where the node lives
             *
             * @param {DrawingScene} value
             */
            set: function (value) {
                this._scene = value;
                for (var i = 0; i < this.nodes.length; i++) {
                    var node = this.nodes[i];
                    node.scene = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        return DrawingNode;
    }(latte.DrawingElement));
    latte.DrawingNode = DrawingNode;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/29/14.
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
         *
         */
        function Animation(duration) {
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._duration = 1;
            /**
             * Property field
             */
            this._initialStateProcessor = null;
            this.duration = duration;
        }
        //region Static
        /**
         * Animates the bounds of the node
         * @param p
         * @param duration
         */
        Animation.moveBounds = function (destination, duration) {
            var a = new Animation(duration);
            // Get initial state
            a.initialStateProcessor = function (node) {
                var r = {};
                var xd = destination.left - node.left;
                var yd = destination.top - node.top;
                var wd = destination.width - node.width;
                var hd = destination.height - node.height;
                r.x = node.left;
                r.y = node.top;
                r.width = node.width;
                r.height = node.height;
                r.xSpeed = xd / a.frames;
                r.ySpeed = yd / a.frames;
                r.wSpeed = wd / a.frames;
                r.hSpeed = hd / a.frames;
                return r;
            };
            // Update according to frame
            a.update.add(function (node, frame, initialState) {
                var xd = initialState.xSpeed * frame;
                var yd = initialState.ySpeed * frame;
                var wd = initialState.wSpeed * frame;
                var hd = initialState.hSpeed * frame;
                node.location = new latte.Point(initialState.x + xd, initialState.y + yd);
                node.size = new latte.Size(initialState.width + wd, initialState.height + hd);
            });
            return a;
        };
        /**
         * Animates the position of the node
         * @param p
         * @param duration
         */
        Animation.moveLocation = function (destination, duration) {
            var a = new Animation(duration);
            // Get initial state
            a.initialStateProcessor = function (node) {
                var r = {};
                var xd = destination.x - node.left;
                var yd = destination.y - node.top;
                r.x = node.left;
                r.y = node.top;
                r.xSpeed = xd / a.frames;
                r.ySpeed = yd / a.frames;
                return r;
            };
            // Update according to frame
            a.update.add(function (node, frame, initialState) {
                var xd = initialState.xSpeed * frame;
                var yd = initialState.ySpeed * frame;
                node.location = new latte.Point(initialState.x + xd, initialState.y + yd);
                //log(node.location);
            });
            return a;
        };
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Gets the initial state of the animation
         */
        Animation.prototype.getInitialState = function (node) {
            return this.initialStateProcessor.call(this, node);
        };
        Object.defineProperty(Animation.prototype, "update", {
            /**
             * Gets an event raised when the animation should update a target
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
        Animation.prototype.onUpdate = function (node, frame, initialState) {
            if (this._update) {
                this._update.raise(node, frame, initialState);
            }
        };
        Object.defineProperty(Animation.prototype, "duration", {
            /**
             * Gets or sets the seconds that animation should last
             *
             * @returns {number}
             */
            get: function () {
                return this._duration;
            },
            /**
             * Gets or sets the seconds that animation should last
             *
             * @param {number} value
             */
            set: function (value) {
                this._duration = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "frames", {
            /**
             * Gets the number of frames that the animation should last
             *
             * @returns {number}
             */
            get: function () {
                return Math.round(this.duration * 32);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "initialStateProcessor", {
            /**
             * Gets or sets a function that returns the initial state for the node
             *
             * @returns {() => any}
             */
            get: function () {
                return this._initialStateProcessor;
            },
            /**
             * Gets or sets a function that returns the initial state for the node
             *
             * @param {() => any} value
             */
            set: function (value) {
                this._initialStateProcessor = value;
            },
            enumerable: true,
            configurable: true
        });
        return Animation;
    }());
    latte.Animation = Animation;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var CanvasView = (function (_super) {
        __extends(CanvasView, _super);
        //endregion
        /**
         *
         */
        function CanvasView() {
            _super.call(this);
            /**
             * Property field
             */
            this._fpsVisible = true;
            /**
             * Property field
             */
            this._paused = false;
            /**
             * Property field
             */
            this._redrawTime = 1000 / 32;
            /**
             * Property field
             */
            this._scene = null;
            this.addClass('canvas');
            this.container.css('overflow', 'hidden');
        }
        //region Private Methods
        /**
         * Stops the drawing process if running
         */
        CanvasView.prototype.stopDrawing = function () {
            if (this._loopHandler) {
                clearInterval(this._loopHandler);
            }
            // Remove interval pointer
            this._loopHandler = 0;
        };
        /**
         * Starts the drawing process
         */
        CanvasView.prototype.startDrawing = function () {
            var _this = this;
            // If interval running
            if (this._loopHandler) {
                // Stop it
                this.stopDrawing();
            }
            // Set up interval
            this._loopHandler = setInterval(function () {
                _this.onFrameUpdate();
                _this.onFrameDraw();
            }, this.redrawTime);
        };
        //endregion
        //region Methods
        CanvasView.prototype.onLayout = function () {
            _super.prototype.onLayout.call(this);
            this.canvas.width = this.container.width();
            this.canvas.height = this.container.height();
            if (this.scene) {
                this.scene.width = this.canvas.width;
                this.scene.height = this.canvas.height;
            }
            this._canvasPosition = null;
        };
        Object.defineProperty(CanvasView.prototype, "frameDraw", {
            /**
             * Gets an event raised when the frame should be drawn
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._frameDraw) {
                    this._frameDraw = new latte.LatteEvent(this);
                }
                return this._frameDraw;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>frameDraw</c> event
         */
        CanvasView.prototype.onFrameDraw = function () {
            if (this._frameDraw) {
                this._frameDraw.raise();
            }
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.scene) {
                this.scene.draw(this.drawingContext);
            }
        };
        Object.defineProperty(CanvasView.prototype, "frameUpdate", {
            /**
             * Gets an event raised when the frame should be updated
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._frameUpdate) {
                    this._frameUpdate = new latte.LatteEvent(this);
                }
                return this._frameUpdate;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>frameUpdate</c> event
         */
        CanvasView.prototype.onFrameUpdate = function () {
            if (this._frameUpdate) {
                this._frameUpdate.raise();
            }
            if (this.scene) {
                this.scene.update();
            }
        };
        Object.defineProperty(CanvasView.prototype, "pausedChanged", {
            /**
             * Gets an event raised when the value of the paused property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._pausedChanged) {
                    this._pausedChanged = new latte.LatteEvent(this);
                }
                return this._pausedChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>paused</c> event
         */
        CanvasView.prototype.onPausedChanged = function () {
            if (this._pausedChanged) {
                this._pausedChanged.raise();
            }
            if (this.paused) {
                this.stopDrawing();
            }
            else {
                this.startDrawing();
            }
        };
        Object.defineProperty(CanvasView.prototype, "canvas", {
            /**
             * Gets the canvas
             *
             * @returns {HTMLCanvasElement}
             */
            get: function () {
                var _this = this;
                if (!this._canvas) {
                    this._canvas = document.createElement('canvas');
                    this.container.append(this._canvas);
                    this._canvas.tabIndex = 0;
                    this.startDrawing();
                    //region Handlers
                    this._canvas.addEventListener('dblclick', function (e) {
                        if (_this.scene) {
                            _this.scene.doubleClick(new latte.Point(e.pageX - _this.canvasPosition.x, e.pageY - _this.canvasPosition.y), e.which);
                        }
                    });
                    this._canvas.addEventListener('mousedown', function (e) {
                        if (_this.scene) {
                            _this.scene.mouseDown(new latte.Point(e.pageX - _this.canvasPosition.x, e.pageY - _this.canvasPosition.y), e.which);
                        }
                    });
                    this._canvas.addEventListener('mousemove', function (e) {
                        if (_this.scene) {
                            _this.scene.mouseMove(new latte.Point(e.pageX - _this.canvasPosition.x, e.pageY - _this.canvasPosition.y));
                        }
                    });
                    this._canvas.addEventListener('mouseup', function (e) {
                        if (_this.scene) {
                            _this.scene.mouseUp(new latte.Point(e.pageX - _this.canvasPosition.x, e.pageY - _this.canvasPosition.y), e.which);
                        }
                    });
                    this._canvas.addEventListener('mouseleave', function (e) {
                        if (_this.scene) {
                            _this.scene.mouseUp(new latte.Point(e.pageX - _this.canvasPosition.x, e.pageY - _this.canvasPosition.y), e.which);
                        }
                    });
                    this._canvas.addEventListener('mousewheel', function (e) {
                        if (_this.scene) {
                            _this.scene.mouseWheel(new latte.Point(e.pageX - _this.canvasPosition.x, e.pageY - _this.canvasPosition.y), e['wheelDelta']);
                        }
                    });
                    this._canvas.addEventListener('keydown', function (e) {
                        if (_this.scene) {
                            _this.scene.keyDown(e.keyCode, e.metaKey);
                        }
                    });
                    this._canvas.addEventListener('keyup', function (e) {
                        if (_this.scene) {
                            _this.scene.keyUp(e.keyCode, e.metaKey);
                        }
                    });
                    this._canvas.ondragover = function (e) {
                        if (_this.scene) {
                            var p = new latte.Point(e.clientX - _this.canvasPosition.x, e.clientY - _this.canvasPosition.y);
                            e.preventDefault();
                            if (_this._dragTimeout) {
                                clearTimeout(_this._dragTimeout);
                            }
                            else {
                                _this.scene.dragStart(p, e);
                            }
                            _this.scene.dragOver(p, e);
                            _this._dragTimeout = setTimeout(function () {
                                if (_this._dragTimeout) {
                                    _this._dragTimeout = 0;
                                    _this.scene.dragEnd(p, e);
                                }
                            }, 100);
                            return false;
                        }
                    };
                    this._canvas.ondrop = function (e) {
                        if (_this.scene) {
                            var p = new latte.Point(e.clientX - _this.canvasPosition.x, e.clientY - _this.canvasPosition.y);
                            _this.scene.drop(p, e);
                            e.preventDefault();
                            _this._dragTimeout = 0;
                            _this.scene.dragEnd(p, e);
                            return false;
                        }
                    };
                }
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasView.prototype, "canvasPosition", {
            /**
             * Gets the canvas position
             *
             * @returns {Point}
             */
            get: function () {
                if (!this._canvasPosition) {
                    var offset = $(this.canvas).offset();
                    this._canvasPosition = new latte.Point(offset.left, offset.top);
                }
                return this._canvasPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasView.prototype, "context", {
            /**
             * Gets the context to draw
             *
             * @returns {CanvasRenderingContext2D}
             */
            get: function () {
                if (!this._context) {
                    this._context = this.canvas.getContext('2d');
                    this.redrawTime = this.redrawTime;
                }
                return this._context;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasView.prototype, "drawingContext", {
            /**
             * Gets the drawing context
             *
             * @returns {DrawingContext}
             */
            get: function () {
                if (!this._drawingContext) {
                    this._drawingContext = new latte.DrawingContext(this.context);
                }
                return this._drawingContext;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasView.prototype, "fpsVisible", {
            /**
             * Gets or sets a value indicating if the FPS count should be displayed
             *
             * @returns {boolean}
             */
            get: function () {
                return this._fpsVisible;
            },
            /**
             * Gets or sets a value indicating if the FPS count should be displayed
             *
             * @param {boolean} value
             */
            set: function (value) {
                this._fpsVisible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasView.prototype, "paused", {
            /**
             * Gets or sets a value indicating if the drawing process is paused
             *
             * @returns {boolean}
             */
            get: function () {
                return this._paused;
            },
            /**
             * Gets or sets a value indicating if the drawing process is paused
             *
             * @param {boolean} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._paused;
                // Set value
                this._paused = value;
                // Trigger changed event
                if (changed) {
                    this.onPausedChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasView.prototype, "redrawTime", {
            /**
             * Gets or sets the milliseconds between redraws
             *
             * @returns {number}
             */
            get: function () {
                return this._redrawTime;
            },
            /**
             * Gets or sets the milliseconds between redraws
             *
             * @param {number} value
             */
            set: function (value) {
                this._redrawTime = value;
                if (!this.paused) {
                    // Reset drawing process
                    this.stopDrawing();
                    this.startDrawing();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasView.prototype, "scene", {
            /**
             * Gets or sets the current scene on canvas
             *
             * @returns {DrawingScene}
             */
            get: function () {
                return this._scene;
            },
            /**
             * Gets or sets the current scene on canvas
             *
             * @param {DrawingScene} value
             */
            set: function (value) {
                this._scene = value;
                value.width = this.canvas.width;
                value.height = this.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        return CanvasView;
    }(latte.View));
    latte.CanvasView = CanvasView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/3/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var DrawingClickable = (function (_super) {
        __extends(DrawingClickable, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function DrawingClickable() {
            _super.call(this);
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._draggable = false;
            /**
             * Property field
             */
            this._mouseHovering = false;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>click</c> event
         */
        DrawingClickable.prototype.onClick = function (p, button) {
            if (this._click) {
                this._click.raise(p, button);
            }
        };
        /**
         * Raises the <c>doubleClick</c> event
         */
        DrawingClickable.prototype.onDoubleClick = function (p, button) {
            if (this._doubleClick) {
                this._doubleClick.raise(p, button);
            }
        };
        /**
         * Raises the <c>dragged</c> event
         */
        DrawingClickable.prototype.onDragged = function () {
            if (this._dragged) {
                this._dragged.raise();
            }
        };
        /**
         * Raises the <c>mouseDown</c> event
         */
        DrawingClickable.prototype.onMouseDown = function (p, button) {
            if (this._mouseDown) {
                this._mouseDown.raise(p, button);
            }
            if (this.draggable) {
                this._dragOffset = new latte.Point(p.x - this.left, p.y - this.top);
            }
            this._mouseIsDown = true;
        };
        /**
         * Raises the <c>mouseEnter</c> event
         */
        DrawingClickable.prototype.onMouseEnter = function () {
            if (this._mouseEnter) {
                this._mouseEnter.raise();
            }
        };
        /**
         * Raises the <c>mouseLeave</c> event
         */
        DrawingClickable.prototype.onMouseLeave = function () {
            if (this._mouseLeave) {
                this._mouseLeave.raise();
            }
        };
        /**
         * Raises the <c>mouseMove</c> event
         */
        DrawingClickable.prototype.onMouseMove = function (p, button) {
            if (this._mouseMove) {
                this._mouseMove.raise(p, button);
            }
        };
        /**
         * Raises the <c>mouseUp</c> event
         */
        DrawingClickable.prototype.onMouseUp = function (p, button) {
            if (this._mouseUp) {
                this._mouseUp.raise(p, button);
            }
            this._mouseIsDown = false;
        };
        /**
         * Raises the <c>mouseWheel</c> event
         */
        DrawingClickable.prototype.onMouseWheel = function (p, delta) {
            if (this._mouseWheel) {
                this._mouseWheel.raise(p, delta);
            }
        };
        Object.defineProperty(DrawingClickable.prototype, "click", {
            /**
             * Gets an event raised when the node is clicked
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._click) {
                    this._click = new latte.LatteEvent(this);
                }
                return this._click;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "doubleClick", {
            /**
             * Gets an event raised when the user double clicks the node
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._doubleClick) {
                    this._doubleClick = new latte.LatteEvent(this);
                }
                return this._doubleClick;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "dragged", {
            /**
             * Gets an event raised when the node is dragged
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._dragged) {
                    this._dragged = new latte.LatteEvent(this);
                }
                return this._dragged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "mouseDown", {
            /**
             * Gets an event raised when the node captures the mouse down
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._mouseDown) {
                    this._mouseDown = new latte.LatteEvent(this);
                }
                return this._mouseDown;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "mouseEnter", {
            /**
             * Gets an event raised when the mouse enters the node
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._mouseEnter) {
                    this._mouseEnter = new latte.LatteEvent(this);
                }
                return this._mouseEnter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "mouseLeave", {
            /**
             * Gets an event raised when the mouse leaves the node
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._mouseLeave) {
                    this._mouseLeave = new latte.LatteEvent(this);
                }
                return this._mouseLeave;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "mouseMove", {
            /**
             * Gets an event raised when the mouse moves across the node
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._mouseMove) {
                    this._mouseMove = new latte.LatteEvent(this);
                }
                return this._mouseMove;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "mouseUp", {
            /**
             * Gets an event raised when the node captures the mouse up
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._mouseUp) {
                    this._mouseUp = new latte.LatteEvent(this);
                }
                return this._mouseUp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "mouseWheel", {
            /**
             * Gets an event raised when the user scrolls on the element
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._mouseWheel) {
                    this._mouseWheel = new latte.LatteEvent(this);
                }
                return this._mouseWheel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "draggable", {
            /**
             * Gets or sets a value indicating if user is allowed to draw the node around.
             *
             * @returns {boolean}
             */
            get: function () {
                return this._draggable;
            },
            /**
             * Gets or sets a value indicating if user is allowed to draw the node around.
             *
             * @param {boolean} value
             */
            set: function (value) {
                this._draggable = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "dragOffset", {
            /**
             * Gets the offset of dragging
             *
             * @returns {string}
             */
            get: function () {
                return this._dragOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "mouseHovering", {
            /**
             * Gets or sets a value indicating if the mouse is currently hovering the node
             *
             * @returns {boolean}
             */
            get: function () {
                return this._mouseHovering;
            },
            /**
             * Gets or sets a value indicating if the mouse is currently hovering the node
             *
             * @param {boolean} value
             */
            set: function (value) {
                this._mouseHovering = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingClickable.prototype, "mouseIsDown", {
            /**
             * Gets a value indicating if the mouse is currently down
             *
             * @returns {boolean}
             */
            get: function () {
                return this._mouseIsDown;
            },
            enumerable: true,
            configurable: true
        });
        return DrawingClickable;
    }(latte.DrawingNode));
    latte.DrawingClickable = DrawingClickable;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    (function (TextAlign) {
        TextAlign[TextAlign["START"] = 0] = "START";
        TextAlign[TextAlign["END"] = 1] = "END";
        TextAlign[TextAlign["LEFT"] = 2] = "LEFT";
        TextAlign[TextAlign["CENTER"] = 3] = "CENTER";
        TextAlign[TextAlign["RIGHT"] = 4] = "RIGHT";
    })(latte.TextAlign || (latte.TextAlign = {}));
    var TextAlign = latte.TextAlign;
    (function (TextBaseline) {
        TextBaseline[TextBaseline["TOP"] = 0] = "TOP";
        TextBaseline[TextBaseline["BOTTOM"] = 1] = "BOTTOM";
        TextBaseline[TextBaseline["MIDDLE"] = 2] = "MIDDLE";
        TextBaseline[TextBaseline["ALPHABETIC"] = 3] = "ALPHABETIC";
    })(latte.TextBaseline || (latte.TextBaseline = {}));
    var TextBaseline = latte.TextBaseline;
    /**
     *
     */
    var DrawingContext = (function () {
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the drawing context
         */
        function DrawingContext(c) {
            /**
             * Property field
             */
            this._scaleX = 1;
            /**
             * Property field
             */
            this._scaleY = 1;
            this._context = c;
        }
        //region Static
        /**
         * Creates the context from the specified canvas
         *
         * @param c
         * @returns {latte.DrawingContext}
         */
        DrawingContext.fromCanvas = function (c) {
            return new DrawingContext(c.getContext('2d'));
        };
        //region Private Methods
        DrawingContext.prototype.textAlignToString = function (t) {
            switch (t) {
                case TextAlign.START: return 'start';
                case TextAlign.END: return 'end';
                case TextAlign.LEFT: return 'left';
                case TextAlign.CENTER: return 'center';
                case TextAlign.RIGHT: return 'right';
            }
            return '';
        };
        DrawingContext.prototype.baselineToString = function (b) {
            switch (b) {
                case TextBaseline.TOP: return 'top';
                case TextBaseline.BOTTOM: return 'bottom';
                case TextBaseline.MIDDLE: return 'middle';
                case TextBaseline.ALPHABETIC: return 'alphabetic';
            }
            return '';
        };
        //endregion
        //region Methods
        /**
         * Clears shadowing parameters
         */
        DrawingContext.prototype.clearShadow = function () {
            this.context.shadowBlur = 0;
            this.context.shadowColor = 'none';
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
        };
        /**
         * Draws an arc
         *
         * @param center
         * @param radius
         * @param startAngle
         * @param endAngle
         * @param counterClockwise
         */
        DrawingContext.prototype.drawArc = function (p, center, radius, startAngle, endAngle, counterClockwise) {
            if (counterClockwise === void 0) { counterClockwise = false; }
            p.applyOn(this);
            this.context.beginPath();
            this.context.arc(center.x, center.y, radius, startAngle, endAngle, counterClockwise);
            this.context.stroke();
        };
        /**
         * Draws the stroke of an ellipse
         * @param p
         * @param r
         */
        DrawingContext.prototype.drawEllipse = function (p, r) {
            this.drawPath(p, latte.DrawingPath.ellipse(r));
        };
        /**
         * Draws an image
         * @param image
         * @param bounds
         */
        DrawingContext.prototype.drawImage = function (image, bounds, offset) {
            if (offset === void 0) { offset = null; }
            try {
                if (offset) {
                    this.context.drawImage(image, offset.left, offset.top, offset.width, offset.height, bounds.left, bounds.top, bounds.width, bounds.height);
                }
                else {
                    this.context.drawImage(image, bounds.left, bounds.top, bounds.width, bounds.height);
                }
                return true;
            }
            catch (e) {
                return false;
            }
        };
        /**
         * Draws a line between two points
         * @param p
         * @param a
         * @param b
         */
        DrawingContext.prototype.drawLine = function (p, a, b) {
            p.applyOn(this);
            this.context.beginPath();
            this.context.moveTo(a.x, a.y);
            this.context.lineTo(b.x, b.y);
            this.context.stroke();
        };
        /**
         * Draws consecutive lines
         * @param p
         * @param Point
         */
        DrawingContext.prototype.drawLines = function (p, origin) {
            var Point = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                Point[_i - 2] = arguments[_i];
            }
            p.applyOn(this);
            this.context.beginPath();
            this.context.moveTo(origin.x, origin.y);
            for (var i = 2; i < arguments.length; i++) {
                var pt = arguments[i];
                this.context.lineTo(pt.x, pt.y);
            }
            this.context.stroke();
        };
        /**
         * Draws the stroke of a rectangle
         * @param p
         * @param r
         */
        DrawingContext.prototype.drawRectangle = function (p, r, radius) {
            if (radius === void 0) { radius = 0; }
            if (radius == 0) {
                p.applyOn(this);
                this.context.strokeRect(r.left, r.top, r.width, r.height);
            }
            else {
                this.drawPath(p, latte.DrawingPath.roundRectangle(r, radius));
            }
        };
        /**
         * Draws the stroke of a path
         * @param p
         * @param r
         */
        DrawingContext.prototype.drawPath = function (p, path) {
            p.applyOn(this);
            path.applyOn(this);
            this.context.stroke();
        };
        /**
         * Draws consecutive lines
         * @param p
         * @param Point
         */
        DrawingContext.prototype.drawPolygon = function (p, origin) {
            var Point = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                Point[_i - 2] = arguments[_i];
            }
            p.applyOn(this);
            this.context.beginPath();
            this.context.moveTo(origin.x, origin.y);
            for (var i = 2; i < arguments.length; i++) {
                var pt = arguments[i];
                this.context.lineTo(pt.x, pt.y);
            }
            this.context.stroke();
        };
        /**
         * Fills an arc
         *
         * @param center
         * @param radius
         * @param startAngle
         * @param endAngle
         * @param counterClockwise
         */
        DrawingContext.prototype.fillArc = function (b, center, radius, startAngle, endAngle, counterClockwise) {
            if (counterClockwise === void 0) { counterClockwise = false; }
            b.applyOn(this);
            this.context.beginPath();
            this.context.arc(center.x, center.y, radius, startAngle, endAngle, counterClockwise);
            this.context.fill();
        };
        /**
         * Fills an ellipse
         * @param p
         * @param r
         */
        DrawingContext.prototype.fillEllipse = function (b, r) {
            this.fillPath(b, latte.DrawingPath.ellipse(r));
        };
        /**
         * Fills consecutive lines
         * @param p
         * @param Point
         */
        DrawingContext.prototype.fillPolygon = function (b, origin) {
            var Point = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                Point[_i - 2] = arguments[_i];
            }
            b.applyOn(this);
            this.context.beginPath();
            this.context.moveTo(origin.x, origin.y);
            for (var i = 2; i < arguments.length; i++) {
                var pt = arguments[i];
                this.context.lineTo(pt.x, pt.y);
            }
            this.context.closePath();
            this.context.fill();
        };
        /**
         * Fills a path
         * @param p
         * @param r
         */
        DrawingContext.prototype.fillPath = function (b, path) {
            b.applyOn(this);
            path.applyOn(this);
            this.context.fill();
        };
        /**
         * Fills a rectangle
         * @param b
         * @param r
         */
        DrawingContext.prototype.fillRectangle = function (b, r, radius) {
            if (radius === void 0) { radius = 0; }
            if (radius == 0) {
                b.applyOn(this);
                this.context.fillRect(r.left, r.top, r.width, r.height);
            }
            else {
                this.fillPath(b, latte.DrawingPath.roundRectangle(r, radius));
            }
        };
        /**
         * Draws Text
         * @param b
         * @param text
         * @param p
         * @param align
         * @param baseline
         */
        DrawingContext.prototype.fillText = function (b, text, p, align, baseline, maxWidth) {
            if (align === void 0) { align = TextAlign.START; }
            if (baseline === void 0) { baseline = TextBaseline.TOP; }
            if (maxWidth === void 0) { maxWidth = null; }
            b.applyOn(this);
            this.context.textAlign = this.textAlignToString(align);
            this.context.textBaseline = this.baselineToString(baseline);
            if (latte._isNumber(maxWidth)) {
                this.context.fillText(text, p.x, p.y, maxWidth);
            }
            else {
                this.context.fillText(text, p.x, p.y);
            }
        };
        /**
         * Fills wrapped text
         * @param b
         * @param text
         * @param p
         * @param lineHeight
         * @param fitWidth
         */
        DrawingContext.prototype.fillTextWrap = function (b, text, p, lineHeight, fitWidth) {
            b.applyOn(this);
            var x = p.x;
            var y = p.y;
            var ctx = this.context;
            var r = new latte.DrawingRectangle(p.x, p.y, 0, 0);
            // Starts foreign code
            var draw = x !== null && y !== null;
            text = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
            var sections = text.split("\n");
            var i, index, str, wordWidth, words, currentLine = 0, maxWidth = 0;
            var printNextLine = function (str) {
                var textY = y + (lineHeight * currentLine);
                if (draw) {
                    ctx.fillText(str, x, textY, fitWidth);
                }
                currentLine++;
                var strSize = ctx.measureText(str);
                wordWidth = strSize.width;
                r = latte.DrawingRectangle.union(r, new latte.DrawingRectangle(x, textY, fitWidth, lineHeight));
                if (wordWidth > maxWidth) {
                    maxWidth = wordWidth;
                }
            };
            for (i = 0; i < sections.length; i++) {
                words = sections[i].split(' ');
                index = 1;
                while (words.length > 0 && index <= words.length) {
                    str = words.slice(0, index).join(' ');
                    wordWidth = ctx.measureText(str).width;
                    if (wordWidth > fitWidth) {
                        if (index === 1) {
                            // Falls to this case if the first word in words[] is bigger than fitWidth
                            // so we print this word on its own line; index = 2 because slice is
                            str = words.slice(0, 1).join(' ');
                            words = words.splice(1);
                        }
                        else {
                            str = words.slice(0, index - 1).join(' ');
                            words = words.splice(index - 1);
                        }
                        printNextLine(str);
                        index = 1;
                    }
                    else {
                        index++;
                    }
                }
                // The left over words on the last line
                if (index > 0) {
                    printNextLine(words.join(' '));
                }
            }
            r.offset(0, -(lineHeight * 0.5));
            r.height += lineHeight * 0.5; //HACK: Heuristic
            return r;
        };
        /**
         * Restores the saved state
         */
        DrawingContext.prototype.restoreState = function () {
            this.context.restore();
        };
        /**
         * Saves the current state
         */
        DrawingContext.prototype.saveState = function () {
            this.context.save();
        };
        /**
         * Saves the state and clips the drawing region.
         *
         * Use restoreState() to restore the previous clipping region
         */
        DrawingContext.prototype.setClip = function (p) {
            this.saveState();
            p.applyOn(this);
            this.context.clip();
        };
        /**
         * Sets the font of the context
         * @param fontFamily
         * @param sizeInPixels
         * @param weight
         */
        DrawingContext.prototype.setFont = function (fontFamily, sizeInPixels, weight, style) {
            if (sizeInPixels === void 0) { sizeInPixels = 10; }
            if (weight === void 0) { weight = 'normal'; }
            if (style === void 0) { style = 'normal'; }
            this.context.font = latte.sprintf('%s %s %s %s', style, weight, sizeInPixels + 'px', fontFamily);
        };
        /**
         * Sets the shadowing parameters
         * @param color
         * @param blur
         * @param offset
         */
        DrawingContext.prototype.setShadow = function (color, blur, offset) {
            if (blur === void 0) { blur = 0; }
            if (offset === void 0) { offset = null; }
            offset = offset || latte.Size.zero();
            this.context.shadowBlur = blur;
            this.context.shadowColor = color.toString();
            this.context.shadowOffsetX = offset.width;
            this.context.shadowOffsetY = offset.height;
        };
        Object.defineProperty(DrawingContext.prototype, "context", {
            /**
             * Gets the context to draw
             *
             * @returns {CanvasRenderingContext2D}
             */
            get: function () {
                return this._context;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingContext.prototype, "scaleX", {
            /**
             * Gets or sets the current X scale of the context
             *
             * @returns {number}
             */
            get: function () {
                return this._scaleX;
            },
            /**
             * Gets or sets the current X scale of the context
             *
             * @param {number} value
             */
            set: function (value) {
                this._scaleX = value;
                this.context.scale(value, this.scaleY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingContext.prototype, "scaleY", {
            /**
             * Gets or sets the current Y scale of the context
             *
             * @returns {number}
             */
            get: function () {
                return this._scaleY;
            },
            /**
             * Gets or sets the current Y scale of the context
             *
             * @param {number} value
             */
            set: function (value) {
                this._scaleY = value;
                this.context.scale(this.scaleX, value);
            },
            enumerable: true,
            configurable: true
        });
        return DrawingContext;
    }());
    latte.DrawingContext = DrawingContext;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/1/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var DrawingImage = (function () {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates image
         */
        function DrawingImage(image) {
            this._image = image;
        }
        Object.defineProperty(DrawingImage.prototype, "image", {
            /**
             * Gets the HTML Image object
             *
             * @returns {HTMLImageElement}
             */
            get: function () {
                return this._image;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DrawingImage.prototype, "size", {
            /**
             * Gets the size of the image
             *
             * @returns {Size}
             */
            get: function () {
                return new latte.Size(this.image.width, this.image.height);
            },
            enumerable: true,
            configurable: true
        });
        return DrawingImage;
    }());
    latte.DrawingImage = DrawingImage;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/26/14.
 */
var latte;
(function (latte) {
    (function (DrawingPathStep) {
        DrawingPathStep[DrawingPathStep["MOVE_TO"] = 0] = "MOVE_TO";
        DrawingPathStep[DrawingPathStep["LINE_TO"] = 1] = "LINE_TO";
        DrawingPathStep[DrawingPathStep["QUADRATIC_CURVE_TO"] = 2] = "QUADRATIC_CURVE_TO";
        DrawingPathStep[DrawingPathStep["ARC_TO"] = 3] = "ARC_TO";
        DrawingPathStep[DrawingPathStep["BEZIER_CURVE_TO"] = 4] = "BEZIER_CURVE_TO";
        DrawingPathStep[DrawingPathStep["CLOSE_PATH"] = 5] = "CLOSE_PATH";
    })(latte.DrawingPathStep || (latte.DrawingPathStep = {}));
    var DrawingPathStep = latte.DrawingPathStep;
    /**
     * Represents a path
     */
    var DrawingPath = (function () {
        //endregion
        /**
         * Creates the path
         */
        function DrawingPath() {
            //endregion
            //region Fields
            this.steps = [];
        }
        //region Static
        /**
         * Returns an elllpise path
         * @param r
         * @returns {latte.DrawingPath}
         */
        DrawingPath.ellipse = function (r) {
            var path = new DrawingPath();
            var x = r.left;
            var y = r.top;
            var w = r.width;
            var h = r.height;
            var kappa = 0.5522848;
            var ox = (w / 2) * kappa;
            var oy = (h / 2) * kappa;
            var xe = x + w;
            var ye = y + h;
            var xm = x + w / 2;
            var ym = y + h / 2;
            path.moveTo(new latte.Point(r.left, ym));
            path.moveTo(new latte.Point(x, ym));
            path.bezierCurveTo(new latte.Point(x, ym - oy), new latte.Point(xm - ox, y), new latte.Point(xm, y));
            path.bezierCurveTo(new latte.Point(xm + ox, y), new latte.Point(xe, ym - oy), new latte.Point(xe, ym));
            path.bezierCurveTo(new latte.Point(xe, ym + oy), new latte.Point(xm + ox, ye), new latte.Point(xm, ye));
            path.bezierCurveTo(new latte.Point(xm - ox, ye), new latte.Point(x, ym + oy), new latte.Point(x, ym));
            return path;
        };
        /**
         * Returns a path with a rounded rectangle of the specified radius
         * @param r
         * @param radius
         */
        DrawingPath.roundRectangle = function (r, radius) {
            var path = new DrawingPath();
            var x = r.left;
            var y = r.top;
            var w = r.width;
            var h = r.height;
            path.moveTo(new latte.Point(x + radius, y));
            path.lineTo(new latte.Point(x + w - radius, y));
            path.quadraticCurveTo(new latte.Point(x + w, y), new latte.Point(x + w, y + radius));
            path.lineTo(new latte.Point(x + w, y + h - radius));
            path.quadraticCurveTo(new latte.Point(x + w, y + h), new latte.Point(x + w - radius, y + h));
            path.lineTo(new latte.Point(x + radius, y + h));
            path.quadraticCurveTo(new latte.Point(x, y + h), new latte.Point(x, y + h - radius));
            path.lineTo(new latte.Point(x, y + radius));
            path.quadraticCurveTo(new latte.Point(x, y), new latte.Point(x + radius, y));
            path.closePath();
            return path;
        };
        /**
         * Returns a rectangle
         */
        DrawingPath.rectangle = function (r) {
            var path = new DrawingPath();
            path.moveTo(r.location);
            path.lineTo(r.topRight);
            path.lineTo(r.bottomRight);
            path.lineTo(r.bottomLeft);
            return path;
        };
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Applies the path to the specified context
         * @param c
         */
        DrawingPath.prototype.applyOn = function (c) {
            c.context.beginPath();
            for (var i = 0; i < this.steps.length; i++) {
                var step = this.steps[i];
                var a = step.args;
                switch (step.type) {
                    case DrawingPathStep.ARC_TO:
                        c.context.arcTo(a[0].x, a[0].y, a[1].x, a[1].y, a[2]);
                        break;
                    case DrawingPathStep.BEZIER_CURVE_TO:
                        c.context.bezierCurveTo(a[0].x, a[0].y, a[1].x, a[1].y, a[2].x, a[2].y);
                        break;
                    case DrawingPathStep.CLOSE_PATH:
                        c.context.closePath();
                        break;
                    case DrawingPathStep.LINE_TO:
                        c.context.lineTo(a[0].x, a[0].y);
                        break;
                    case DrawingPathStep.MOVE_TO:
                        c.context.moveTo(a[0].x, a[0].y);
                        break;
                    case DrawingPathStep.QUADRATIC_CURVE_TO:
                        c.context.quadraticCurveTo(a[0].x, a[0].y, a[1].x, a[1].y);
                        break;
                }
            }
        };
        DrawingPath.prototype.arcTo = function (begin, end, radius) {
            this.steps.push({ type: DrawingPathStep.ARC_TO, args: [begin, end, radius] });
        };
        DrawingPath.prototype.bezierCurveTo = function (controlPointA, controlPointB, endPoint) {
            this.steps.push({ type: DrawingPathStep.BEZIER_CURVE_TO, args: [controlPointA, controlPointB, endPoint] });
        };
        DrawingPath.prototype.closePath = function () {
            this.steps.push({ type: DrawingPathStep.CLOSE_PATH, args: [] });
        };
        DrawingPath.prototype.moveTo = function (p) {
            this.steps.push({ type: DrawingPathStep.MOVE_TO, args: [p] });
        };
        DrawingPath.prototype.lineTo = function (p) {
            this.steps.push({ type: DrawingPathStep.LINE_TO, args: [p] });
        };
        DrawingPath.prototype.quadraticCurveTo = function (controlPoint, endPoint) {
            this.steps.push({ type: DrawingPathStep.QUADRATIC_CURVE_TO, args: [controlPoint, endPoint] });
        };
        return DrawingPath;
    }());
    latte.DrawingPath = DrawingPath;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var DrawingScene = (function (_super) {
        __extends(DrawingScene, _super);
        //endregion
        /**
         *
         */
        function DrawingScene() {
            _super.call(this);
            //region Static
            //endregion
            //region Fields
            /**
             * Holds pointers to the nodes where mouse is currently hovering,
             * in order to provide mouse enter and mouse leave events
             * @type {Array}
             */
            this.mouseHovers = [];
        }
        //region Private Methods
        /**
         * Adds the node to the hoverList
         * @param d
         */
        DrawingScene.prototype.addToHoverList = function (d) {
            d.mouseHovering = true;
            d.onMouseEnter();
            this.mouseHovers.push(d);
        };
        /**
         * Returns a value indicating if the node is in the hoverList
         * @param d
         * @returns {boolean}
         */
        DrawingScene.prototype.inHoverList = function (d) {
            for (var i = 0; i < this.mouseHovers.length; i++) {
                var node = this.mouseHovers[i];
                if (node === d) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Removes the node from the hoverList
         * @param d
         */
        DrawingScene.prototype.removeFromHoverList = function (d) {
            var list = [];
            for (var i = 0; i < this.mouseHovers.length; i++) {
                var node = this.mouseHovers[i];
                if (node === d) {
                    d.mouseHovering = false;
                    d.onMouseLeave();
                }
                else {
                    list.push(node);
                }
            }
            this.mouseHovers = list;
        };
        //endregion
        //region Methods
        /**
         * Called on Mouse Double Click
         */
        DrawingScene.prototype.doubleClick = function (p, button) {
            var clickables = this.getNodesByType(latte.DrawingClickable, true);
            if (clickables.length) {
                for (var i = 0; i < clickables.length; i++) {
                    var node = clickables[i];
                    if (node.containsPoint(p)) {
                        node.onDoubleClick(p, button);
                    }
                }
            }
        };
        /**
         * Called while drag-drop operation ongoing on scene
         * @param e
         */
        DrawingScene.prototype.dragOver = function (p, e) {
        };
        /**
         * Called when drag-drop operation ended on scene
         * @param e
         */
        DrawingScene.prototype.dragEnd = function (p, e) {
        };
        /**
         * Called when drag-drop operation started on scene
         * @param e
         */
        DrawingScene.prototype.dragStart = function (p, e) {
        };
        /**
         * Called when something dropped on the scene
         * @param e
         */
        DrawingScene.prototype.drop = function (p, e) {
        };
        /**
         * Draws the layer
         * @param c
         */
        DrawingScene.prototype.draw = function (c) {
            _super.prototype.draw.call(this, c);
            if (!this.hidden) {
                for (var i = 0; i < this.nodes.length; i++) {
                    var n = this.nodes[i];
                    if (!n.hidden) {
                        n.completeDraw(c);
                    }
                }
            }
        };
        /**
         * Gets the first matched node at specified point
         * @param p
         * @returns {*}
         */
        DrawingScene.prototype.getNodeAtPoint = function (p) {
            for (var i = this.nodes.length - 1; i >= 0; i--) {
                var drawingNode = this.nodes[i];
                if (drawingNode.containsPoint(p) && !drawingNode.hidden) {
                    return drawingNode;
                }
            }
            return null;
        };
        /**
         * Gets nodes at specified point
         * @param p
         * @returns {Array}
         */
        DrawingScene.prototype.getNodesAtPoint = function (p, deep) {
            if (deep === void 0) { deep = false; }
            var nodes = [];
            for (var i = this.nodes.length - 1; i >= 0; i--) {
                var drawingNode = this.nodes[i];
                if (drawingNode.containsPoint(p)) {
                    nodes.push(drawingNode);
                }
                if (deep) {
                    var sub = drawingNode.getNodesAtPoint(p, deep);
                    if (sub.length) {
                        nodes = nodes.concat(sub);
                    }
                }
            }
            return nodes;
        };
        /**
         * Gets the nodes of a specified type
         * @param type
         * @returns {Array}
         */
        DrawingScene.prototype.getNodesByType = function (type, deep) {
            if (deep === void 0) { deep = false; }
            var nodes = [];
            for (var i = this.nodes.length - 1; i >= 0; i--) {
                var drawingNode = this.nodes[i];
                if (drawingNode instanceof type) {
                    nodes.push(drawingNode);
                }
                if (deep) {
                    var sub = drawingNode.getNodesByType(type, deep);
                    if (sub.length) {
                        nodes = nodes.concat(sub);
                    }
                }
            }
            return nodes;
        };
        /**
         * Called on key down
         * @param keyCode
         * @param metaKey
         */
        DrawingScene.prototype.keyDown = function (keyCode, metaKey) {
        };
        /**
         * Called on key down
         * @param keyCode
         * @param metaKey
         */
        DrawingScene.prototype.keyUp = function (keyCode, metaKey) {
        };
        /**
         * Called on Mouse Down
         * @param p
         * @param button
         */
        DrawingScene.prototype.mouseDown = function (p, button) {
            var clickables = this.getNodesByType(latte.DrawingClickable, true);
            if (clickables.length) {
                for (var i = clickables.length - 1; i >= 0; i--) {
                    var node = clickables[i];
                    if (node.hidden)
                        continue;
                    if (node.containsPoint(p)) {
                        node.onMouseDown(p, button);
                        break;
                    }
                }
            }
        };
        /**
         * Called on Mouse Move
         * @param p
         */
        DrawingScene.prototype.mouseMove = function (p) {
            var clickables = this.getNodesByType(latte.DrawingClickable, true);
            if (clickables.length) {
                for (var i = clickables.length - 1; i >= 0; i--) {
                    var node = clickables[i];
                    if (node.hidden)
                        continue;
                    if (node.draggable && node.mouseIsDown) {
                        node.location = new latte.Point(p.x + node.dragOffset.x, p.y + node.dragOffset.y);
                        node.onDragged();
                    }
                    if (node.containsPoint(p)) {
                        node.onMouseMove(p, 0);
                        if (!this.inHoverList(node)) {
                            this.addToHoverList(node);
                        }
                    }
                    else {
                        if (this.inHoverList(node)) {
                            this.removeFromHoverList(node);
                        }
                    }
                }
            }
            else if (this.mouseHovers.length > 0) {
                for (var i = 0; i < this.mouseHovers.length; i++) {
                    var node = this.mouseHovers[i];
                    node.mouseHovering = false;
                    node.onMouseLeave();
                }
                this.mouseHovers = [];
            }
        };
        /**
         * Called on Mouse Up
         * @param p
         * @param button
         */
        DrawingScene.prototype.mouseUp = function (p, button) {
            var clickables = this.getNodesByType(latte.DrawingClickable, true);
            if (clickables.length) {
                for (var i = clickables.length - 1; i >= 0; i--) {
                    var node = clickables[i];
                    if (node.hidden)
                        continue;
                    if (node.draggable) {
                        node.onMouseUp(p, button);
                    }
                    if (node.containsPoint(p)) {
                        node.onMouseUp(p, button);
                        if (node.mouseHovering) {
                            node.onClick(p, button);
                            break;
                        }
                    }
                }
            }
        };
        /**
         * Called on Mouse Wheel
         * @param p
         * @param delta
         */
        DrawingScene.prototype.mouseWheel = function (p, delta) {
            var clickables = this.getNodesByType(latte.DrawingClickable, true);
            if (clickables.length) {
                for (var i = 0; i < clickables.length; i++) {
                    var node = clickables[i];
                    if (node.hidden)
                        continue;
                    if (node.containsPoint(p)) {
                        node.onMouseWheel(p, delta);
                    }
                }
            }
        };
        /**
         * Called when a node is added
         * @param node
         */
        DrawingScene.prototype.onNodeAdded = function (node) {
            node.scene = this;
        };
        /**
         * Called when a node is removed
         * @param node
         */
        DrawingScene.prototype.onNodeRemoved = function (node) {
        };
        /**
         * Updates the layer
         */
        DrawingScene.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!this.paused) {
                for (var i = 0; i < this.nodes.length; i++) {
                    var n = this.nodes[i];
                    if (!n.paused) {
                        n.update();
                    }
                }
            }
        };
        Object.defineProperty(DrawingScene.prototype, "nodes", {
            /**
             * Gets the nodes of the scene
             *
             * @returns {Collection<DrawingNode>}
             */
            get: function () {
                var _this = this;
                if (!this._nodes) {
                    this._nodes = new latte.Collection(function (node, index) { _this.onNodeAdded(node); }, function (node, index) { _this.onNodeRemoved(node); });
                }
                return this._nodes;
            },
            enumerable: true,
            configurable: true
        });
        return DrawingScene;
    }(latte.DrawingElement));
    latte.DrawingScene = DrawingScene;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var LinearGradientBrush = (function (_super) {
        __extends(LinearGradientBrush, _super);
        //endregion
        /**
         *
         */
        function LinearGradientBrush(a, b, stops) {
            if (stops === void 0) { stops = []; }
            _super.call(this);
            //region Static
            //endregion
            //region Fields
            this.stops = [];
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._pointA = null;
            /**
             * Property field
             */
            this._pointB = null;
            this.pointA = a;
            this.pointB = b;
            this.stops = stops;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Adds a stop to the gradient
         * @param position
         * @param color
         */
        LinearGradientBrush.prototype.addStop = function (position, color) {
            this.stops.push({
                position: position,
                color: color
            });
        };
        /**
         * Applies the brush on the specified context
         * @param c
         */
        LinearGradientBrush.prototype.applyOn = function (c) {
            var g = c.context.createLinearGradient(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
            for (var i = 0; i < this.stops.length; i++) {
                g.addColorStop(this.stops[i].position, this.stops[i].color.toString());
            }
            c.context.fillStyle = g;
        };
        Object.defineProperty(LinearGradientBrush.prototype, "pointA", {
            /**
             * Gets or sets the point A of gradient
             *
             * @returns {Point}
             */
            get: function () {
                return this._pointA;
            },
            /**
             * Gets or sets the point A of gradient
             *
             * @param {Point} value
             */
            set: function (value) {
                this._pointA = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearGradientBrush.prototype, "pointB", {
            /**
             * Gets or sets the B point of gradient
             *
             * @returns {Point}
             */
            get: function () {
                return this._pointB;
            },
            /**
             * Gets or sets the B point of gradient
             *
             * @param {Point} value
             */
            set: function (value) {
                this._pointB = value;
            },
            enumerable: true,
            configurable: true
        });
        return LinearGradientBrush;
    }(latte.Brush));
    latte.LinearGradientBrush = LinearGradientBrush;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/12/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var Pen = (function () {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates a new Pen
         */
        function Pen(color, width, dash) {
            if (color === void 0) { color = latte.Color.black; }
            if (width === void 0) { width = 1; }
            if (dash === void 0) { dash = null; }
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._color = null;
            /**
             * Property field
             */
            this._dash = [];
            /**
             * Property field
             */
            this._width = 0;
            this.color = color;
            this.width = width;
            this.dash = dash;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Applies the pen on the specified context
         * @param c
         */
        Pen.prototype.applyOn = function (c) {
            if (c.context.setLineDash) {
                if (this.dash && this.dash.length > 0) {
                    c.context.setLineDash(this.dash);
                }
                else {
                    c.context.setLineDash([]);
                }
            }
            c.context.strokeStyle = this.color.toString();
            c.context.lineWidth = this.width;
        };
        Object.defineProperty(Pen.prototype, "color", {
            /**
             * Gets or sets the color of the pen
             *
             * @returns {Color}
             */
            get: function () {
                return this._color;
            },
            /**
             * Gets or sets the color of the pen
             *
             * @param {Color} value
             */
            set: function (value) {
                this._color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pen.prototype, "dash", {
            /**
             * Gets or sets the line dash (Array of numbers)
             *
             * @returns {number[]}
             */
            get: function () {
                return this._dash;
            },
            /**
             * Gets or sets the line dash (Array of numbers)
             *
             * @param {number[]} value
             */
            set: function (value) {
                this._dash = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pen.prototype, "width", {
            /**
             * Gets or sets the width of the pen
             *
             * @returns {number}
             */
            get: function () {
                return this._width;
            },
            /**
             * Gets or sets the width of the pen
             *
             * @param {number} value
             */
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        return Pen;
    }());
    latte.Pen = Pen;
})(latte || (latte = {}));
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/support/ts-include/jquery.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/support/ts-include/latte.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/support/ts-include/latte.ui.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/support/ts-include/latte.ui.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/DrawingRectangle.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/DrawingElement.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/Brush.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/DrawingNode.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/Animation.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/CanvasView.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/DrawingClickable.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/DrawingContext.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/DrawingImage.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/DrawingPath.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/DrawingScene.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/LinearGradientBrush.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.drawing/ts/Pen.ts" /> 
