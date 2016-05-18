/// <reference path="datalatte.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="latte.d.ts" />
/// <reference path="latte.strings.d.ts" />
/// <reference path="latte.ui.d.ts" />
/// <reference path="latte.ui.strings.d.ts" />
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class DrawingRectangle {
        /**
         * Creates a new Rectangle from the specified left, top, right and bottom coordinates
         * @param left
         * @param top
         * @param right
         * @param bottom
         * @returns {latte.DrawingRectangle}
         */
        static fromLTRB(left?: number, top?: number, right?: number, bottom?: number): DrawingRectangle;
        /**
         * Creates a new Rectangle from the specifed location and size
         * @param location
         * @param size
         * @returns {latte.DrawingRectangle}
         */
        static fromLocationSize(location: Point, size: Size): DrawingRectangle;
        /**
         * Creates a new Rectangle from the specified points as corners
         * @param a
         * @param b
         */
        static fromPoints(a: Point, b: Point): DrawingRectangle;
        /**
         * Gets the intersection of two rectangles
         * @param a
         * @param b
         */
        static intersect(a: DrawingRectangle, b: DrawingRectangle): DrawingRectangle;
        /**
         * Returns the result of the union of the two rectangles
         * @param a
         * @param b
         * @returns {latte.DrawingRectangle}
         */
        static union(a: DrawingRectangle, b: DrawingRectangle): DrawingRectangle;
        /**
         * Creates a new Rectangle by specifiyng its location and size
         * @param left
         * @param top
         * @param width
         * @param height
         */
        constructor(left?: number, top?: number, width?: number, height?: number);
        /**
         * Creates a copy of the rectangle
         * @returns {DrawingRectangle}
         */
        clone(): DrawingRectangle;
        /**
         * Returns a value indicating if the specified point is contained in the rectangle
         * @param p
         */
        containsPoint(p: Point): boolean;
        /**
         * Returns a value indicating if the rectangle fits in the specified container
         *
         * @param r
         * @returns {boolean}
         */
        fitsIn(r: DrawingRectangle): boolean;
        /**
         * Inflates the rectangle
         * @param width
         * @param height
         */
        inflate(width: number, height: number): void;
        /**
         * Gets a value indicating if the rectangle intersects with the specified rectangle
         * @param r
         * @returns {boolean}
         */
        intersectsWidth(r: DrawingRectangle): boolean;
        /**
         * Offsets the rectangle
         * @param x
         * @param y
         */
        offset(x: number, y: number): void;
        /**
         * Changes the position of the rectangle to match the specified Bottom
         * @param bottom
         */
        positionBottom(bottom: number): void;
        /**
         * Changes the position of the rectangle to match the specified Right
         * @param right
         */
        positionRight(right: number): void;
        /**
         * Changes the size of the rectangle to match the specified Right
         * @param right
         */
        sizeBottom(bottom: number): void;
        /**
         * Changes the size of the rectangle to match the specified Right
         * @param right
         */
        sizeRight(right: number): void;
        /**
         * Scales the rectangle to fit the specified size
         * @param size
         */
        scaleToFit(size: Size): DrawingRectangle;
        /**
         * Returns a scaled rectangle
         * @param width
         */
        scaleToHeight(height: number): DrawingRectangle;
        /**
         * Returns a scaled rectangle
         * @param width
         */
        scaleToWidth(width: number): DrawingRectangle;
        /**
         * Gets the aspect ratio of the rectangle
         *
         * @returns {number}
         */
        aspectRatio: number;
        /**
         * Gets or sets the center point of the rectangle
         *
         * @returns {DrawingPoint}
         */
        /**
         * Gets or sets the center point of the rectangle
         *
         * @param {DrawingPoint} value
         */
        center: Point;
        /**
         * Gets or sets the X center of the rectangle
         *
         * @returns {number}
         */
        /**
         * Gets or sets the X center of the rectangle
         *
         * @param {number} value
         */
        centerX: number;
        /**
         * Gets or sets the Y center of the rectangle
         *
         * @returns {number}
         */
        /**
         * Gets or sets the Y center of the rectangle
         *
         * @param {number} value
         */
        centerY: number;
        /**
         * Gets the Bottom coordinate
         *
         * @returns {number}
         */
        bottom: number;
        /**
         * Gets or sets the bounds of rectangle. Use this property to copy out or in the coordinates of the rectangle
         *
         * @returns {DrawingRectangle}
         */
        /**
         * Gets or sets the bounds of rectangle. Use this property to copy out or in the coordinates of the rectangle
         *
         * @param {DrawingRectangle} value
         */
        bounds: DrawingRectangle;
        /**
         * Property field
         */
        private _height;
        /**
         * Gets or sets the Height of the rectangle
         *
         * @returns {number}
         */
        /**
         * Gets or sets the Height of the rectangle
         *
         * @param {number} value
         */
        height: number;
        /**
         * Property field
         */
        private _left;
        /**
         * Gets or sets the Left coordinate
         *
         * @returns {number}
         */
        /**
         * Gets or sets the Left coordinate
         *
         * @param {number} value
         */
        left: number;
        /**
         * Gets the location of the rectangle
         *
         * @returns {DrawingPoint}
         */
        /**
         * Gets or sets the location of the rectangle
         *
         * @returns {DrawingPoint}
         */
        location: Point;
        /**
         * Gets the Right coordinate
         *
         * @returns {number}
         */
        right: number;
        /**
         * Property field
         */
        private _top;
        /**
         * Gets or sets the Top coordinate
         *
         * @returns {number}
         */
        /**
         * Gets or sets the Top coordinate
         *
         * @param {number} value
         */
        top: number;
        /**
         * Gets or sets the size of the rectangle
         *
         * @returns {DrawingSize}
         */
        /**
         * Gets or sets the size of the rectangle
         * @param value
         */
        size: Size;
        /**
         * Property field
         */
        private _tag;
        /**
         * Gets or sets a tag for the object
         *
         * @returns {any}
         */
        /**
         * Gets or sets a tag for the object
         *
         * @param {any} value
         */
        tag: any;
        /**
         * Gets the top left point
         *
         * @returns {Point}
         */
        topLeft: Point;
        /**
         * Gets the top right point
         *
         * @returns {Point}
         */
        topRight: Point;
        /**
         * Gets the bottom left point
         *
         * @returns {Point}
         */
        bottomLeft: Point;
        /**
         * Gets the bottom right point
         *
         * @returns {Point}
         */
        bottomRight: Point;
        /**
         * Gets a value indicating if the rectangle is horizontal
         *
         * @returns {boolean}
         */
        isHorizontal: boolean;
        /**
         * Gets a value indicating if the rectangle is a square
         *
         * @returns {boolean}
         */
        isSquare: boolean;
        /**
         * Gets a value indicating if the rectangle is vertical
         *
         * @returns {boolean}
         */
        isVertical: boolean;
        /**
         * Property field
         */
        private _width;
        /**
         * Gets or sets the Width of the rectangle
         *
         * @returns {number}
         */
        /**
         * Gets or sets the Width of the rectangle
         *
         * @param {number} value
         */
        width: number;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class DrawingElement extends DrawingRectangle {
        /**
         *
         */
        constructor();
        /**
         * Draws the element
         * @param c
         */
        draw(c: DrawingContext): void;
        /**
         * Updates the element
         */
        update(): void;
        /**
         * Property field
         */
        private _hidden;
        /**
         * Gets or sets a value indicating if the element is currently hidden
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the element is currently hidden
         *
         * @param {boolean} value
         */
        hidden: boolean;
        /**
         * Property field
         */
        private _paused;
        /**
         * Gets or sets a value indicating if the element is paused
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the elment is paused
         *
         * @param {boolean} value
         */
        paused: boolean;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class Brush {
        /**
         * Creates the Brush
         */
        constructor(color?: Color);
        /**
         * Applies the brush on the specified context
         * @param c
         */
        applyOn(c: DrawingContext): void;
        /**
         * Property field
         */
        private _color;
        /**
         * Gets or sets the color of the brush
         *
         * @returns {Color}
         */
        /**
         * Gets or sets the color of the brush
         *
         * @param {Color} value
         */
        color: Color;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class DrawingNode extends DrawingElement {
        private originalLocation;
        private originalOpacity;
        private originalPivot;
        private originalScale;
        private animations;
        /**
         *
         */
        constructor();
        /**
         * Removes the ended animations from array
         */
        private clearEndedAnimations();
        /**
         * Gets the animation by the specified key
         * @param key
         * @returns {*}
         */
        private getNodeAnimationByKey(key);
        /**
         * Flushes the toilet after drawing
         * @param c
         */
        afterDraw(c: DrawingContext): void;
        /**
         * Prepares context for drawning
         * @param c
         */
        beforeDraw(c: DrawingContext): void;
        /**
         * Override
         * @param c
         */
        draw(c: DrawingContext): void;
        /**
         * Performs a complete draw with preparation and toilet flush
         * @param c
         */
        completeDraw(c: DrawingContext): void;
        /**
         * Gets the rotation point. Override to specify point. Center by default.
         * @returns {Point}
         */
        getRotationPoint(): Point;
        /**
         * Gets nodes at specified point
         * @param p
         * @returns {Array}
         */
        getNodesAtPoint(p: Point, deep?: boolean): DrawingNode[];
        /**
         * Gets the nodes of the specified type.
         * Additionally deep might be specified to search internally.
         * @param type
         * @returns {DrawingNode[]}
         */
        getNodesByType(type: Function, deep?: boolean): DrawingNode[];
        /**
         * Gets a value indicating if item is running an animation of the specified key
         * @param key
         * @returns {Animation|any}
         */
        isRunningAnimationOfKey(key: string): boolean;
        /**
         * Called when a node is added
         * @param node
         */
        onNodeAdded(node: DrawingNode): void;
        /**
         * Called when a node is removed
         * @param node
         */
        onNodeRemoved(node: DrawingNode): void;
        /**
         * Runs the specified animation
         * @param a
         */
        runAnimation(a: Animation, callback?: () => void): void;
        /**
         * Runs the specified animation by using the specified key
         * @param a
         * @param key
         */
        runAnimationWithKey(a: Animation, key: string, callback?: () => void): void;
        /**
         * Stops all running animations
         */
        stopAnimations(): void;
        /**
         * Stops the animation of the specified key
         * @param key
         */
        stopAnimation(key: string): void;
        /**
         * Override
         */
        update(): void;
        /**
         * Gets a value indicating if the node is currently being animated
         *
         * @returns {boolean}
         */
        animating: boolean;
        /**
         * Property field
         */
        private _angle;
        /**
         * Gets or sets the rotation angle of the node
         *
         * @returns {number}
         */
        /**
         * Gets or sets the rotation angle of the node
         *
         * @param {number} value
         */
        angle: number;
        /**
         * Field for nodes property
         */
        private _nodes;
        /**
         * Gets the nodes of the scene
         *
         * @returns {Collection<DrawingNode>}
         */
        nodes: Collection<DrawingNode>;
        /**
         * Property field
         */
        private _opacity;
        /**
         * Gets or sets the opacity of the node
         *
         * @returns {number}
         */
        /**
         * Gets or sets the opacity of the node
         *
         * @param {number} value
         */
        opacity: number;
        /**
         * Property field
         */
        private _parent;
        /**
         * Gets or sets the parent node of this node, if any. If null, node is directly under the scene order.
         *
         * @returns {DrawingNode}
         */
        /**
         * Gets or sets the parent node of this node, if any. If null, node is directly under the scene order.
         *
         * @param {DrawingNode} value
         */
        parent: DrawingNode;
        /**
         * Property field
         */
        private _scene;
        /**
         * Gets or sets the scene where the node lives
         *
         * @returns {DrawingScene}
         */
        /**
         * Gets or sets the scene where the node lives
         *
         * @param {DrawingScene} value
         */
        scene: DrawingScene;
    }
}
/**
 * Created by josemanuel on 5/29/14.
 */
declare module latte {
    /**
     *
     */
    class Animation {
        /**
         * Animates the bounds of the node
         * @param p
         * @param duration
         */
        static moveBounds(destination: DrawingRectangle, duration: number): Animation;
        /**
         * Animates the position of the node
         * @param p
         * @param duration
         */
        static moveLocation(destination: Point, duration: number): Animation;
        /**
         *
         */
        constructor(duration: number);
        /**
         * Gets the initial state of the animation
         */
        getInitialState(node: DrawingNode): any;
        /**
         * Back field for event
         */
        private _update;
        /**
         * Gets an event raised when the animation should update a target
         *
         * @returns {LatteEvent}
         */
        update: LatteEvent;
        /**
         * Raises the <c>update</c> event
         */
        onUpdate(node: DrawingNode, frame: number, initialState: any): void;
        /**
         * Property field
         */
        private _duration;
        /**
         * Gets or sets the seconds that animation should last
         *
         * @returns {number}
         */
        /**
         * Gets or sets the seconds that animation should last
         *
         * @param {number} value
         */
        duration: number;
        /**
         * Gets the number of frames that the animation should last
         *
         * @returns {number}
         */
        frames: number;
        /**
         * Property field
         */
        private _initialStateProcessor;
        /**
         * Gets or sets a function that returns the initial state for the node
         *
         * @returns {() => any}
         */
        /**
         * Gets or sets a function that returns the initial state for the node
         *
         * @param {() => any} value
         */
        initialStateProcessor: (node: DrawingNode) => any;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class CanvasView extends View {
        private _loopHandler;
        private _dragTimeout;
        /**
         *
         */
        constructor();
        /**
         * Stops the drawing process if running
         */
        private stopDrawing();
        /**
         * Starts the drawing process
         */
        private startDrawing();
        onLayout(): void;
        /**
         * Back field for event
         */
        private _frameDraw;
        /**
         * Gets an event raised when the frame should be drawn
         *
         * @returns {LatteEvent}
         */
        frameDraw: LatteEvent;
        /**
         * Raises the <c>frameDraw</c> event
         */
        onFrameDraw(): void;
        /**
         * Back field for event
         */
        private _frameUpdate;
        /**
         * Gets an event raised when the frame should be updated
         *
         * @returns {LatteEvent}
         */
        frameUpdate: LatteEvent;
        /**
         * Raises the <c>frameUpdate</c> event
         */
        onFrameUpdate(): void;
        /**
         * Back field for event
         */
        private _pausedChanged;
        /**
         * Gets an event raised when the value of the paused property changes
         *
         * @returns {LatteEvent}
         */
        pausedChanged: LatteEvent;
        /**
         * Raises the <c>paused</c> event
         */
        onPausedChanged(): void;
        /**
         * Field for canvas property
         */
        private _canvas;
        /**
         * Gets the canvas
         *
         * @returns {HTMLCanvasElement}
         */
        canvas: HTMLCanvasElement;
        /**
         * Property field
         */
        private _canvasPosition;
        /**
         * Gets the canvas position
         *
         * @returns {Point}
         */
        canvasPosition: Point;
        /**
         * Field for context property
         */
        private _context;
        /**
         * Gets the context to draw
         *
         * @returns {CanvasRenderingContext2D}
         */
        context: CanvasRenderingContext2D;
        /**
         * Field for drawingContext property
         */
        private _drawingContext;
        /**
         * Gets the drawing context
         *
         * @returns {DrawingContext}
         */
        drawingContext: DrawingContext;
        /**
         * Property field
         */
        private _fpsVisible;
        /**
         * Gets or sets a value indicating if the FPS count should be displayed
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the FPS count should be displayed
         *
         * @param {boolean} value
         */
        fpsVisible: boolean;
        /**
         * Property field
         */
        private _paused;
        /**
         * Gets or sets a value indicating if the drawing process is paused
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the drawing process is paused
         *
         * @param {boolean} value
         */
        paused: boolean;
        /**
         * Property field
         */
        private _redrawTime;
        /**
         * Gets or sets the milliseconds between redraws
         *
         * @returns {number}
         */
        /**
         * Gets or sets the milliseconds between redraws
         *
         * @param {number} value
         */
        redrawTime: number;
        /**
         * Property field
         */
        private _scene;
        /**
         * Gets or sets the current scene on canvas
         *
         * @returns {DrawingScene}
         */
        /**
         * Gets or sets the current scene on canvas
         *
         * @param {DrawingScene} value
         */
        scene: DrawingScene;
    }
}
/**
 * Created by josemanuel on 7/3/14.
 */
declare module latte {
    /**
     *
     */
    class DrawingClickable extends DrawingNode {
        /**
         *
         */
        constructor();
        /**
         * Raises the <c>click</c> event
         */
        onClick(p: Point, button: number): void;
        /**
         * Raises the <c>doubleClick</c> event
         */
        onDoubleClick(p: Point, button: number): void;
        /**
         * Raises the <c>dragged</c> event
         */
        onDragged(): void;
        /**
         * Raises the <c>mouseDown</c> event
         */
        onMouseDown(p: Point, button: number): void;
        /**
         * Raises the <c>mouseEnter</c> event
         */
        onMouseEnter(): void;
        /**
         * Raises the <c>mouseLeave</c> event
         */
        onMouseLeave(): void;
        /**
         * Raises the <c>mouseMove</c> event
         */
        onMouseMove(p: Point, button: number): void;
        /**
         * Raises the <c>mouseUp</c> event
         */
        onMouseUp(p: Point, button: number): void;
        /**
         * Raises the <c>mouseWheel</c> event
         */
        onMouseWheel(p: Point, delta: number): void;
        /**
         * Back field for event
         */
        private _click;
        /**
         * Gets an event raised when the node is clicked
         *
         * @returns {LatteEvent}
         */
        click: LatteEvent;
        /**
         * Back field for event
         */
        private _doubleClick;
        /**
         * Gets an event raised when the user double clicks the node
         *
         * @returns {LatteEvent}
         */
        doubleClick: LatteEvent;
        /**
         * Back field for event
         */
        private _dragged;
        /**
         * Gets an event raised when the node is dragged
         *
         * @returns {LatteEvent}
         */
        dragged: LatteEvent;
        /**
         * Back field for event
         */
        private _mouseDown;
        /**
         * Gets an event raised when the node captures the mouse down
         *
         * @returns {LatteEvent}
         */
        mouseDown: LatteEvent;
        /**
         * Back field for event
         */
        private _mouseEnter;
        /**
         * Gets an event raised when the mouse enters the node
         *
         * @returns {LatteEvent}
         */
        mouseEnter: LatteEvent;
        /**
         * Back field for event
         */
        private _mouseLeave;
        /**
         * Gets an event raised when the mouse leaves the node
         *
         * @returns {LatteEvent}
         */
        mouseLeave: LatteEvent;
        /**
         * Back field for event
         */
        private _mouseMove;
        /**
         * Gets an event raised when the mouse moves across the node
         *
         * @returns {LatteEvent}
         */
        mouseMove: LatteEvent;
        /**
         * Back field for event
         */
        private _mouseUp;
        /**
         * Gets an event raised when the node captures the mouse up
         *
         * @returns {LatteEvent}
         */
        mouseUp: LatteEvent;
        /**
         * Back field for event
         */
        private _mouseWheel;
        /**
         * Gets an event raised when the user scrolls on the element
         *
         * @returns {LatteEvent}
         */
        mouseWheel: LatteEvent;
        /**
         * Property field
         */
        private _draggable;
        /**
         * Gets or sets a value indicating if user is allowed to draw the node around.
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if user is allowed to draw the node around.
         *
         * @param {boolean} value
         */
        draggable: boolean;
        /**
         * Property field
         */
        private _dragOffset;
        /**
         * Gets the offset of dragging
         *
         * @returns {string}
         */
        dragOffset: Point;
        /**
         * Property field
         */
        private _mouseHovering;
        /**
         * Gets or sets a value indicating if the mouse is currently hovering the node
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the mouse is currently hovering the node
         *
         * @param {boolean} value
         */
        mouseHovering: boolean;
        /**
         * Property field
         */
        private _mouseIsDown;
        /**
         * Gets a value indicating if the mouse is currently down
         *
         * @returns {boolean}
         */
        mouseIsDown: boolean;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    enum TextAlign {
        START = 0,
        END = 1,
        LEFT = 2,
        CENTER = 3,
        RIGHT = 4,
    }
    enum TextBaseline {
        TOP = 0,
        BOTTOM = 1,
        MIDDLE = 2,
        ALPHABETIC = 3,
    }
    /**
     *
     */
    class DrawingContext {
        /**
         * Creates the context from the specified canvas
         *
         * @param c
         * @returns {latte.DrawingContext}
         */
        static fromCanvas(c: HTMLCanvasElement): DrawingContext;
        /**
         * Creates the drawing context
         */
        constructor(c: CanvasRenderingContext2D);
        private textAlignToString(t);
        private baselineToString(b);
        /**
         * Clears shadowing parameters
         */
        clearShadow(): void;
        /**
         * Draws an arc
         *
         * @param center
         * @param radius
         * @param startAngle
         * @param endAngle
         * @param counterClockwise
         */
        drawArc(p: Pen, center: Point, radius: number, startAngle: number, endAngle: number, counterClockwise?: boolean): void;
        /**
         * Draws the stroke of an ellipse
         * @param p
         * @param r
         */
        drawEllipse(p: Pen, r: DrawingRectangle): void;
        /**
         * Draws an image
         * @param image
         * @param bounds
         */
        drawImage(image: HTMLImageElement, bounds: DrawingRectangle, offset?: DrawingRectangle): boolean;
        /**
         * Draws a line between two points
         * @param p
         * @param a
         * @param b
         */
        drawLine(p: Pen, a: Point, b: Point): void;
        /**
         * Draws consecutive lines
         * @param p
         * @param Point
         */
        drawLines(p: Pen, origin: Point, ...Point: any[]): void;
        /**
         * Draws the stroke of a rectangle
         * @param p
         * @param r
         */
        drawRectangle(p: Pen, r: DrawingRectangle, radius?: number): void;
        /**
         * Draws the stroke of a path
         * @param p
         * @param r
         */
        drawPath(p: Pen, path: DrawingPath): void;
        /**
         * Draws consecutive lines
         * @param p
         * @param Point
         */
        drawPolygon(p: Pen, origin: Point, ...Point: any[]): void;
        /**
         * Fills an arc
         *
         * @param center
         * @param radius
         * @param startAngle
         * @param endAngle
         * @param counterClockwise
         */
        fillArc(b: Brush, center: Point, radius: number, startAngle: number, endAngle: number, counterClockwise?: boolean): void;
        /**
         * Fills an ellipse
         * @param p
         * @param r
         */
        fillEllipse(b: Brush, r: DrawingRectangle): void;
        /**
         * Fills consecutive lines
         * @param p
         * @param Point
         */
        fillPolygon(b: Brush, origin: Point, ...Point: any[]): void;
        /**
         * Fills a path
         * @param p
         * @param r
         */
        fillPath(b: Brush, path: DrawingPath): void;
        /**
         * Fills a rectangle
         * @param b
         * @param r
         */
        fillRectangle(b: Brush, r: DrawingRectangle, radius?: number): void;
        /**
         * Draws Text
         * @param b
         * @param text
         * @param p
         * @param align
         * @param baseline
         */
        fillText(b: Brush, text: string, p: Point, align?: TextAlign, baseline?: TextBaseline, maxWidth?: number): void;
        /**
         * Fills wrapped text
         * @param b
         * @param text
         * @param p
         * @param lineHeight
         * @param fitWidth
         */
        fillTextWrap(b: Brush, text: string, p: Point, lineHeight: number, fitWidth: number): DrawingRectangle;
        /**
         * Restores the saved state
         */
        restoreState(): void;
        /**
         * Saves the current state
         */
        saveState(): void;
        /**
         * Saves the state and clips the drawing region.
         *
         * Use restoreState() to restore the previous clipping region
         */
        setClip(p: DrawingPath): void;
        /**
         * Sets the font of the context
         * @param fontFamily
         * @param sizeInPixels
         * @param weight
         */
        setFont(fontFamily: string, sizeInPixels?: number, weight?: string, style?: string): void;
        /**
         * Sets the shadowing parameters
         * @param color
         * @param blur
         * @param offset
         */
        setShadow(color: Color, blur?: number, offset?: Size): void;
        /**
         * Property field
         */
        private _context;
        /**
         * Gets the context to draw
         *
         * @returns {CanvasRenderingContext2D}
         */
        context: CanvasRenderingContext2D;
        /**
         * Property field
         */
        private _scaleX;
        /**
         * Gets or sets the current X scale of the context
         *
         * @returns {number}
         */
        /**
         * Gets or sets the current X scale of the context
         *
         * @param {number} value
         */
        scaleX: number;
        /**
         * Property field
         */
        private _scaleY;
        /**
         * Gets or sets the current Y scale of the context
         *
         * @returns {number}
         */
        /**
         * Gets or sets the current Y scale of the context
         *
         * @param {number} value
         */
        scaleY: number;
    }
}
/**
 * Created by josemanuel on 7/1/14.
 */
declare module latte {
    /**
     *
     */
    class DrawingImage {
        /**
         * Creates image
         */
        constructor(image: HTMLImageElement);
        /**
         * Property field
         */
        private _image;
        /**
         * Gets the HTML Image object
         *
         * @returns {HTMLImageElement}
         */
        image: HTMLImageElement;
        /**
         * Gets the size of the image
         *
         * @returns {Size}
         */
        size: Size;
    }
}
/**
 * Created by josemanuel on 5/26/14.
 */
declare module latte {
    enum DrawingPathStep {
        MOVE_TO = 0,
        LINE_TO = 1,
        QUADRATIC_CURVE_TO = 2,
        ARC_TO = 3,
        BEZIER_CURVE_TO = 4,
        CLOSE_PATH = 5,
    }
    /**
     * Represents a path
     */
    class DrawingPath {
        /**
         * Returns an elllpise path
         * @param r
         * @returns {latte.DrawingPath}
         */
        static ellipse(r: DrawingRectangle): DrawingPath;
        /**
         * Returns a path with a rounded rectangle of the specified radius
         * @param r
         * @param radius
         */
        static roundRectangle(r: DrawingRectangle, radius: number): DrawingPath;
        /**
         * Returns a rectangle
         */
        static rectangle(r: DrawingRectangle): DrawingPath;
        private steps;
        /**
         * Creates the path
         */
        constructor();
        /**
         * Applies the path to the specified context
         * @param c
         */
        applyOn(c: DrawingContext): void;
        arcTo(begin: Point, end: Point, radius: number): void;
        bezierCurveTo(controlPointA: Point, controlPointB: Point, endPoint: Point): void;
        closePath(): void;
        moveTo(p: Point): void;
        lineTo(p: Point): void;
        quadraticCurveTo(controlPoint: Point, endPoint: Point): void;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class DrawingScene extends DrawingElement {
        /**
         * Holds pointers to the nodes where mouse is currently hovering,
         * in order to provide mouse enter and mouse leave events
         * @type {Array}
         */
        private mouseHovers;
        /**
         *
         */
        constructor();
        /**
         * Adds the node to the hoverList
         * @param d
         */
        addToHoverList(d: DrawingClickable): void;
        /**
         * Returns a value indicating if the node is in the hoverList
         * @param d
         * @returns {boolean}
         */
        inHoverList(d: DrawingClickable): boolean;
        /**
         * Removes the node from the hoverList
         * @param d
         */
        removeFromHoverList(d: DrawingClickable): void;
        /**
         * Called on Mouse Double Click
         */
        doubleClick(p: Point, button: number): void;
        /**
         * Called while drag-drop operation ongoing on scene
         * @param e
         */
        dragOver(p: Point, e: Event): void;
        /**
         * Called when drag-drop operation ended on scene
         * @param e
         */
        dragEnd(p: Point, e: Event): void;
        /**
         * Called when drag-drop operation started on scene
         * @param e
         */
        dragStart(p: Point, e: Event): void;
        /**
         * Called when something dropped on the scene
         * @param e
         */
        drop(p: Point, e: Event): void;
        /**
         * Draws the layer
         * @param c
         */
        draw(c: DrawingContext): void;
        /**
         * Gets the first matched node at specified point
         * @param p
         * @returns {*}
         */
        getNodeAtPoint(p: Point): DrawingNode;
        /**
         * Gets nodes at specified point
         * @param p
         * @returns {Array}
         */
        getNodesAtPoint(p: Point, deep?: boolean): DrawingNode[];
        /**
         * Gets the nodes of a specified type
         * @param type
         * @returns {Array}
         */
        getNodesByType(type: Function, deep?: boolean): any[];
        /**
         * Called on key down
         * @param keyCode
         * @param metaKey
         */
        keyDown(keyCode: number, metaKey: any): void;
        /**
         * Called on key down
         * @param keyCode
         * @param metaKey
         */
        keyUp(keyCode: number, metaKey: any): void;
        /**
         * Called on Mouse Down
         * @param p
         * @param button
         */
        mouseDown(p: Point, button: number): void;
        /**
         * Called on Mouse Move
         * @param p
         */
        mouseMove(p: Point): void;
        /**
         * Called on Mouse Up
         * @param p
         * @param button
         */
        mouseUp(p: Point, button: number): void;
        /**
         * Called on Mouse Wheel
         * @param p
         * @param delta
         */
        mouseWheel(p: Point, delta: number): void;
        /**
         * Called when a node is added
         * @param node
         */
        onNodeAdded(node: DrawingNode): void;
        /**
         * Called when a node is removed
         * @param node
         */
        onNodeRemoved(node: DrawingNode): void;
        /**
         * Updates the layer
         */
        update(): void;
        /**
         * Field for nodes property
         */
        private _nodes;
        /**
         * Gets the nodes of the scene
         *
         * @returns {Collection<DrawingNode>}
         */
        nodes: Collection<DrawingNode>;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class LinearGradientBrush extends Brush {
        private stops;
        /**
         *
         */
        constructor(a: Point, b: Point, stops?: {
            position: number;
            color: Color;
        }[]);
        /**
         * Adds a stop to the gradient
         * @param position
         * @param color
         */
        addStop(position: number, color: Color): void;
        /**
         * Applies the brush on the specified context
         * @param c
         */
        applyOn(c: DrawingContext): void;
        /**
         * Property field
         */
        private _pointA;
        /**
         * Gets or sets the point A of gradient
         *
         * @returns {Point}
         */
        /**
         * Gets or sets the point A of gradient
         *
         * @param {Point} value
         */
        pointA: Point;
        /**
         * Property field
         */
        private _pointB;
        /**
         * Gets or sets the B point of gradient
         *
         * @returns {Point}
         */
        /**
         * Gets or sets the B point of gradient
         *
         * @param {Point} value
         */
        pointB: Point;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class Pen {
        /**
         * Creates a new Pen
         */
        constructor(color?: Color, width?: number, dash?: number[]);
        /**
         * Applies the pen on the specified context
         * @param c
         */
        applyOn(c: DrawingContext): void;
        /**
         * Property field
         */
        private _color;
        /**
         * Gets or sets the color of the pen
         *
         * @returns {Color}
         */
        /**
         * Gets or sets the color of the pen
         *
         * @param {Color} value
         */
        color: Color;
        /**
         * Property field
         */
        private _dash;
        /**
         * Gets or sets the line dash (Array of numbers)
         *
         * @returns {number[]}
         */
        /**
         * Gets or sets the line dash (Array of numbers)
         *
         * @param {number[]} value
         */
        dash: number[];
        /**
         * Property field
         */
        private _width;
        /**
         * Gets or sets the width of the pen
         *
         * @returns {number}
         */
        /**
         * Gets or sets the width of the pen
         *
         * @param {number} value
         */
        width: number;
    }
}
