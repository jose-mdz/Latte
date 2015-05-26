/// <reference path="_ui.strings.d.ts" />
/// <reference path="datalatte.d.ts" />
/// <reference path="jquery.d.ts" />
declare module latte {
    /**
     * Holds a list of already included plugins
     *
     * @type {Array<string>}
     */
    var includedPlugins: Object;
    /**
     * Tells if the passed objects are equal in its properties
     *
     * @param {object} a
     * @param {object} b
     */
    function _equalObjects(a: any, b: any): boolean;
    /**
     * Returns a value indicating if the parameter is a number
     *
     * @returns {boolean}
     */
    function _isNumber(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is a boolean
     *
     * @returns {boolean}
     */
    function _isBoolean(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is a string
     *
     * @returns {boolean}
     */
    function _isString(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is an Array
     *
     * @returns {boolean}
     */
    function _isArray(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is a Function
     *
     * @returns {boolean}
     */
    function _isFunction(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is an Object
     *
     * @returns {boolean}
     */
    function _isObject(param: any): boolean;
    /**
     * Returns a value indicating if the parameter as string represents a numeric value
     *
     * @returns {boolean}
     */
    function _isNumeric(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is undefined
     *
     * @returns {boolean}
     */
    function _undef(param: any): boolean;
    /**
     * Logs the specified data if there's a console.
     */
    function log(...any: any[]): void;
    /**
     * sprintf for only %s strings
     */
    function sprintf(...any: any[]): string;
    /**
     * Warns user about deprecated code.
     *
     * @param code
     * @param alternateUse
     */
    function warnDeprecated(code: string, alternateUse: string): void;
}
declare module latte {
    /**
     * Enumeration of Keyboard key codes
     */
    enum Key {
        /**
         * Backspace key
         *
         * @type {number}
         */
        BACKSPACE = 8,
        /**
         * Tab key
         *
         * @type {number}
         */
        TAB = 9,
        /**
         * Enter key
         *
         * @type {number}
         */
        ENTER = 13,
        /**
         * Shift key
         *
         * @type {number}
         */
        SHIFT = 16,
        /**
         * Control key
         *
         * @type {number}
         */
        CONTROL = 17,
        /**
         * Alt key
         *
         * @type {number}
         */
        ALT = 18,
        /**
         * Backspace key
         *
         * @type {number}
         */
        PAUSE = 19,
        /**
         * Caps Lock key
         *
         * @type {number}
         */
        CAPS_LOCK = 20,
        /**
         * Escape key
         *
         * @type {number}
         */
        ESCAPE = 27,
        /**
         * Page up key
         *
         * @type {number}
         */
        PAGE_UP = 33,
        /**
         * Page down key
         *
         * @type {number}
         */
        PAGE_DOWN = 34,
        /**
         * End key
         *
         * @type {number}
         */
        END = 35,
        /**
         * Home key
         *
         * @type {number}
         */
        HOME = 36,
        /**
         * Left arrow key
         *
         * @type {number}
         */
        ARROW_LEFT = 37,
        /**
         * Up arrow key
         *
         * @type {number}
         */
        ARROW_UP = 38,
        /**
         * Right arrow key
         *
         * @type {number}
         */
        ARROW_RIGHT = 39,
        /**
         * Down arrow key
         *
         * @type {number}
         */
        ARROW_DOWN = 40,
        /**
         * Insert key
         *
         * @type {number}
         */
        INSERT = 45,
        /**
         * Delete key
         *
         * @type {number}
         */
        DELETE = 46,
        /**
         * Zero key
         *
         * @type {number}
         */
        NUMBER_0 = 48,
        /**
         * One key
         *
         * @type {number}
         */
        NUMBER_1 = 49,
        /**
         * Two key
         *
         * @type {number}
         */
        NUMBER_2 = 50,
        /**
         * Three key
         *
         * @type {number}
         */
        NUMBER_3 = 51,
        /**
         * Four key
         *
         * @type {number}
         */
        NUMBER_4 = 52,
        /**
         * Five key
         *
         * @type {number}
         */
        NUMBER_5 = 53,
        /**
         * Siz key
         *
         * @type {number}
         */
        NUMBER_6 = 54,
        /**
         * Seven key
         *
         * @type {number}
         */
        NUMBER_7 = 55,
        /**
         * Eight key
         *
         * @type {number}
         */
        NUMBER_8 = 56,
        /**
         * Nine key
         *
         * @type {number}
         */
        NUMBER_9 = 57,
        /**
         * A key
         *
         * @type {number}
         */
        A = 65,
        /**
         * B key
         *
         * @type {number}
         */
        B = 66,
        /**
         * C key
         *
         * @type {number}
         */
        C = 67,
        /**
         * D key
         *
         * @type {number}
         */
        D = 68,
        /**
         * E key
         *
         * @type {number}
         */
        E = 69,
        /**
         * F key
         *
         * @type {number}
         */
        F = 70,
        /**
         * G key
         *
         * @type {number}
         */
        G = 71,
        /**
         * H key
         *
         * @type {number}
         */
        H = 72,
        /**
         * I key
         *
         * @type {number}
         */
        I = 73,
        /**
         * J key
         *
         * @type {number}
         */
        J = 74,
        /**
         * K key
         *
         * @type {number}
         */
        K = 75,
        /**
         * L key
         *
         * @type {number}
         */
        L = 76,
        /**
         * M key
         *
         * @type {number}
         */
        M = 77,
        /**
         * N key
         *
         * @type {number}
         */
        N = 78,
        /**
         * O key
         *
         * @type {number}
         */
        O = 79,
        /**
         * P key
         *
         * @type {number}
         */
        P = 80,
        /**
         * Q key
         *
         * @type {number}
         */
        Q = 81,
        /**
         * R key
         *
         * @type {number}
         */
        R = 82,
        /**
         * S key
         *
         * @type {number}
         */
        S = 83,
        /**
         * T key
         *
         * @type {number}
         */
        T = 84,
        /**
         * U key
         *
         * @type {number}
         */
        U = 85,
        /**
         * V key
         *
         * @type {number}
         */
        V = 86,
        /**
         * W key
         *
         * @type {number}
         */
        W = 87,
        /**
         * X key
         *
         * @type {number}
         */
        X = 88,
        /**
         * Y key
         *
         * @type {number}
         */
        Y = 89,
        /**
         * Z key
         *
         * @type {number}
         */
        Z = 90,
        /**
         * Left window key
         *
         * @type {number}
         */
        LEFT_WINDOW = 91,
        /**
         * Right window key
         *
         * @type {number}
         */
        RIGHT_WINDOW = 92,
        /**
         * Select key
         *
         * @type {number}
         */
        SELECT = 93,
        /**
         * Numpad Zero key
         *
         * @type {number}
         */
        NUMPAD_0 = 96,
        /**
         * Numpad One key
         *
         * @type {number}
         */
        NUMPAD_1 = 97,
        /**
         * Numpad two key
         *
         * @type {number}
         */
        NUMPAD_2 = 98,
        /**
         * Numpad 3 key
         *
         * @type {number}
         */
        NUMPAD_3 = 99,
        /**
         * Numpad 4 key
         *
         * @type {number}
         */
        NUMPAD_4 = 100,
        /**
         * Numpad 5 key
         *
         * @type {number}
         */
        NUMPAD_5 = 101,
        /**
         * Numpad 6 key
         *
         * @type {number}
         */
        NUMPAD_6 = 102,
        /**
         * Numpad 7 key
         *
         * @type {number}
         */
        NUMPAD_7 = 103,
        /**
         * Numpad 8 key
         *
         * @type {number}
         */
        NUMPAD_8 = 104,
        /**
         * Numpad 9 key
         *
         * @type {number}
         */
        NUMPAD_9 = 105,
        /**
         * Numpad * key
         *
         * @type {number}
         */
        NUMPAD_MULTIPLY = 106,
        /**
         * Numpad + key
         *
         * @type {number}
         */
        NUMPAD_ADD = 107,
        /**
         * Numpad - key
         *
         * @type {number}
         */
        NUMPAD_SUBTRACT = 109,
        /**
         * Numpad . key
         *
         * @type {number}
         */
        NUMPAD_DECIMAL_POINT = 110,
        /**
         * Numpad / key
         *
         * @type {number}
         */
        NUMPAD_DIVIDE = 111,
        /**
         * F1 key
         *
         * @type {number}
         */
        F1 = 112,
        /**
         * F2 key
         *
         * @type {number}
         */
        F2 = 113,
        /**
         * F3 key
         *
         * @type {number}
         */
        F3 = 114,
        /**
         * F4 key
         *
         * @type {number}
         */
        F4 = 115,
        /**
         * F5 key
         *
         * @type {number}
         */
        F5 = 116,
        /**
         * F6 key
         *
         * @type {number}
         */
        F6 = 117,
        /**
         * F7 key
         *
         * @type {number}
         */
        F7 = 118,
        /**
         * F8 key
         *
         * @type {number}
         */
        F8 = 119,
        /**
         * F9 key
         *
         * @type {number}
         */
        F9 = 120,
        /**
         * F10 key
         *
         * @type {number}
         */
        F10 = 121,
        /**
         * F11 key
         *
         * @type {number}
         */
        F11 = 122,
        /**
         * F12 key
         *
         * @type {number}
         */
        F12 = 123,
        /**
         * Num lock key
         *
         * @type {number}
         */
        NUM_LOCK = 144,
        /**
         * Scroll lock key
         *
         * @type {number}
         */
        SCROLL_LOCK = 145,
        /**
         * , key
         *
         * @type {number}
         */
        SEMI_COLON = 186,
        /**
         *  = key
         *
         * @type {number}
         */
        EQUAL_SIGN = 187,
        /**
         * , key
         *
         * @type {number}
         */
        COMMA = 188,
        /**
         * - key
         *
         * @type {number}
         */
        DASH = 189,
        /**
         * . key
         *
         * @type {number}
         */
        PERIOD = 190,
        /**
         * / key
         *
         * @type {number}
         */
        FORWARD_SLASH = 191,
        /**
         * Grave acccent key
         *
         * @type {number}
         */
        GRAVE_ACCENT = 192,
        /**
         * [ key
         *
         * @type {number}
         */
        OPEN_BRACKET = 219,
        /**
         * \ key
         *
         * @type {number}
         */
        BACK_SLASH = 220,
        /**
         * ] key
         *
         * @type {number}
         */
        CLOSE_BRACKET = 221,
        /**
         * ' key
         *
         * @type {number}
         */
        SINGLE_QUOTE = 222,
        /**
         * Space bar key
         * @type {number}
         */
        SPACEBAR = 32,
    }
}
/**
 * Created by josemanuel on 12/12/13.
 */
declare module latte {
    enum TriBool {
        UNKNOWN = 0,
        TRUE = 1,
        FALSE = 2,
    }
}
declare module latte {
    /**
     * Enumerates week days
     */
    enum WeekDay {
        /**
         * Sunday
         *
         * @type {number}
         */
        SUNDAY = 0,
        /**
         * Monday
         *
         * @type {number}
         */
        MONDAY = 1,
        /**
         * Tuesday
         *
         * @type {number}
         */
        TUESDAY = 2,
        /**
         * Wednesday
         *
         * @type {number}
         */
        WEDNESDAY = 3,
        /**
         * Thursday
         *
         * @type {number}
         */
        THURSDAY = 4,
        /**
         * Friday
         *
         * @type {number}
         */
        FRIDAY = 5,
        /**
         * Saturday
         *
         * @type {number}
         */
        SATURDAY = 6,
    }
}
declare module latte {
    /**
     * Represents selection modes for DateItem
     **/
    enum DateSelectionMode {
        /**
         * Single day
         **/
        DAY = 0,
        /**
         * No side specified so let to user selection
         **/
        MANUAL = 1,
        /**
         * Month
         **/
        MONTH = 2,
        /**
         * Week
         **/
        WEEK = 3,
        /**
         * Work week
         **/
        WORKWEEK = 4,
    }
}
declare module latte {
    /**
     * Possible Directions
     **/
    enum Direction {
        /**
         * Horizontal direction
         **/
        HORIZONTAL = 0,
        /**
         * Vertical direction
         **/
        VERTICAL = 1,
        /**
         * Non established direction
         */
        NONE = 2,
    }
}
declare module latte {
    /**
     * Enumerates sides of objects
     **/
    enum Side {
        /**
         * No side specified so automatic side is chosen.
         **/
        AUTO = 1,
        /**
         * Bottom side of something
         **/
        BOTTOM = 4,
        /**
         * Left side of something
         **/
        LEFT = 8,
        /**
         * Right side of something
         **/
        RIGHT = 16,
        /**
         * Top side of something
         **/
        TOP = 32,
    }
}
declare module latte {
    /**
     * Defines possible transition modes for views
     **/
    enum Transition {
        /**
         * Fades out the current view and fades in the new one.
         **/
        FADE = 0,
        /**
         * Gives the impression of advancing forward.
         **/
        SWIPE_FORWARD = 1,
    }
}
declare module latte {
    /**
     * Represents a basic element of the DOM, on which latte UI objects are constructed.
     **/
    class UiElement {
        /**
         * Collection of context items
         **/
        private static _contextItemsCollect;
        /**
         * Saves the coordinates where the drag operation started
         */
        private static _dragStart;
        /**
         * Flag to know if static constructor has been called
         */
        private static _staticInited;
        /**
         * Disables the text selection feature of User Agent on the specified element.
         **/
        static disableTextSelection(element: JQuery): JQuery;
        /**
         * Enables the text selection feature of User Agent on the specified element.
         **/
        static enableTextSelection(element: JQuery): JQuery;
        /**
         * Gets the opposite side of passed side
         * @param side
         * @returns {*}
         */
        static oppositeSide(side: Side): Side;
        /**
         * Static initializator
         */
        static staticInit(): void;
        /**
         *
         */
        private static _dragElement;
        /**
         * Gets the element dragged around to show user something is dragging.
         * @returns {JQuery}
         */
        static dragElement: JQuery;
        /**
         *
         */
        private static _dragging;
        /**
         * Gets a value indicating if the element is being dragged
         * @returns {boolean}
         */
        static dragging: boolean;
        /**
         *
         */
        private static _draggingElement;
        /**
         * Gets the UiElement currently being dragged (if any)
         * @returns {boolean}
         */
        static draggingElement: UiElement;
        /**
         * Property field
         */
        private static _dropTarget;
        /**
         * Gets or sets the element where dragging element will be dropped
         *
         * @returns {UiElement}
         */
        /**
         * Gets or sets the element where dragging element will be dropped
         *
         * @param {UiElement} value
         */
        static dropTarget: UiElement;
        /**
         *
         */
        private _beingDragged;
        /**
         *
         **/
        private _enabled;
        /**
         *
         */
        private _dragSource;
        /**
         *
         */
        private _dropped;
        /**
         *
         **/
        private _focusable;
        /**
         *
         */
        private _hideWhileDragging;
        /**
         *
         **/
        private _tag;
        /**
         *
         **/
        private _tooltip;
        /**
         *
         */
        private _visible;
        /**
         * Collection of items in contextual menu.
         **/
        contextItems: Collection<Item>;
        /**
         * Holds a pointer of the element on the DOM.
         **/
        element: JQuery;
        /**
         * Raised when the enabled state of item is changed.
         **/
        enabledChanged: LatteEvent;
        /**
         * Raised when the element updates its layout.
         **/
        layout: LatteEvent;
        /**
         * Raised when the menu with <c>contextItems</c> is about to be dislplayed.
         **/
        contextItemsShow: LatteEvent;
        /**
         * Raised when the <c>visible</c> property value changes
         **/
        visibleChanged: LatteEvent;
        /**
         * Creates the UiElement.
         **/
        constructor();
        /**
         *
         **/
        private _click(e);
        /**
         *
         **/
        private _contextMenu(e);
        /**
         *
         **/
        private _mouseDown(e);
        /**
         * Adds classes to the element
         **/
        addClass(classString: string): UiElement;
        /**
         * Appends the view to the specified element.
         **/
        appendTo(element: any): UiElement;
        /**
         * Passes css method to <c>element</c>
         **/
        css(css: any, value?: any): UiElement;
        /**
         * Finalizes the element
         */
        finalize(): void;
        /**
         * Raises the <c>contextItemsShow</c> event.
         **/
        onContextItemsShow(): void;
        /**
         * Called when the element who shows dragging is created, from this UiElement.
         */
        onCreateDragElement(): JQuery;
        /**
         * Raises the <c>dropped</c> event
         */
        onDropped(): void;
        /**
         * Raises the <c>enabledChanged</c> event.
         **/
        onEnabledChanged(): void;
        /**
         * Raises the <c>hidden</c> event
         */
        onHiddenChanged(): void;
        /**
         * Raises the <c>layout</c> event.
         **/
        onLayout(): void;
        /**
         * Raises the <c>visibleChanged</c> event.
         **/
        onVisibleChanged(): void;
        /**
         * Removes classes to the element
         **/
        removeClass(classString: string): UiElement;
        /**
         * Shows a menu with the <c>contextItems</c> at the specified position.
         **/
        showContextMenu(pageX: number, pageY: number): MenuOverlay;
        /**
         * Back field for event
         */
        private _dragOver;
        /**
         * Gets an event raised when an element is dragged over this element.
         * The handler must return <c>true</c> to confirm drop is allowed
         *
         * @returns {LatteEvent}
         */
        dragOver: LatteEvent;
        /**
         * Raises the <c>dragOver</c> event
         */
        onDragOver(): boolean;
        /**
         * Back field for event
         */
        private _finalizing;
        /**
         * Gets an event raised when the element is being finalized
         *
         * @returns {LatteEvent}
         */
        finalizing: LatteEvent;
        /**
         * Raises the <c>finalizing</c> event
         */
        onFinalizing(): any;
        /**
         * Back field for event
         */
        private _hiddenChanged;
        /**
         * Gets an event raised when the value of the hidden property changes
         *
         * @returns {LatteEvent}
         */
        hiddenChanged: LatteEvent;
        /**
         * Back field for event
         */
        private _dropElement;
        /**
         * Gets an event raised when an element is dropped over this element.
         * For an element to be allowed to be dropped over,
         *  the <c>dragOver</c> event handler must return true before the drop operation.
         *
         * @returns {LatteEvent}
         */
        dropElement: LatteEvent;
        /**
         * Raises the <c>dropElement</c> event.
         */
        onDropElement(): void;
        /**
         * Gets or sets a value indicating if the element is curerntly being dragged.
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the element is curerntly being dragged.
         * @param value
         */
        beingDragged: boolean;
        /**
         * Gets or sets the element who will act as source for dragging.
         * @returns {JQuery}
         */
        /**
         *
         * @param value
         */
        dragSource: JQuery;
        /**
         * Gets an event raised when the element is dropped after a dragging operation
         */
        dropped: LatteEvent;
        /**
         * Gets or sets a value indicating if the item is enabled.
         **/
        /**
         * Gets or sets a value indicating if the item is enabled.
         **/
        enabled: boolean;
        /**
         * Property field
         */
        private _finalized;
        /**
         * Gets a value indicating if the element has been finalized
         *
         * @returns {boolean}
         */
        finalized: boolean;
        /**
         * Gets or sets a value indicating if the element should be focusable
         **/
        /**
         * Gets or sets a value indicating if the element should be focusable
         **/
        focusable: boolean;
        /**
         * Gets or sets the height of the element.
         **/
        /**
         * Gets or sets the height of the element.
         **/
        height: number;
        /**
         * Property field
         */
        private _hidden;
        /**
         * Gets or sets a value indicating if the element is hidde
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the element is hidde
         *
         * @param {boolean} value
         */
        hidden: boolean;
        /**
         * Gets or sets a value indicating if the element should be hidden while its being dragged.
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the element should be hidden while its being dragged.
         * @param value
         */
        hideWhileDragging: boolean;
        /**
         * Gets or sets a generic object to add extra information to the element.
         **/
        /**
         * Gets or sets a generic object to add extra information to the element.
         **/
        tag: any;
        /**
         * Gets or sets the tooltip of the element
         **/
        /**
         * Gets or sets the tooltip of the element
         **/
        tooltip: string;
        /**
         * Gets or sets a value indicating if the element should be visible.
         **/
        /**
         * Gets or sets a value indicating if the element should be visible.
         **/
        visible: boolean;
        /**
         * Gets or sets the width of the element.
         **/
        /**
         * Gets or sets the width of the element.
         **/
        width: number;
    }
}
declare module latte {
    /**
     * Base class for UI items.

     The <c>element</c> property points to the DOM element who contains the item.
     **/
    class Item extends UiElement {
        /**
         * Creates a Clickable element. This element will react to clicks and mouse movement.
         **/
        static clickable(): JQuery;
        /**
         * Creates a Selectable element. This element will react to clicks and mouse movement.
         **/
        static selectable(): JQuery;
        /**
         *
         */
        private _tab;
        /**
         * Creates a new <c>Item</c>
         **/
        constructor();
        /**
         * Brings the item to the front
         **/
        bringToFront(): void;
        /**
         * Gets the <c>MenuOverlay</c> who contains this <c>Item</c>
         **/
        parentMenu: MenuOverlay;
        /**
         * Gets a value indicating if the parent of this <c>Item</c> is a <c>MenuOverlay</c>
         **/
        parentIsMenu: boolean;
        /**
         * Gets or sets the tab or tab index of item when inside a <c>Ribbon</c>
         **/
        /**
         * Gets or sets the tab or tab index of item when inside a <c>Ribbon</c>
         **/
        tab: any;
    }
}
declare module latte {
    /**
     * Renders an element that fills the space where its added. This is the base class for Views in DataLatte.

     The main feature of View is the fact that it can contains another View or Views.
     **/
    class View extends UiElement {
        private static _smallScreen;
        /**
         *
         **/
        private static _defaultButton;
        /**
         * Flag to recognize if statically initialized
         **/
        private static _initialized;
        /**
         *
         **/
        private static _layer;
        /**
         *
         **/
        private static _mainView;
        /**
         *
         **/
        private static _mainViewHolder;
        /**
         *
         **/
        private static _modalView;
        /**
         *
         */
        private static smallScreenChanged;
        /**
         *
         **/
        static getMainView(): View;
        /**
         *
         **/
        static initStatic(): void;
        /**
         * SPECIAL GETTER
         Gets or sets the modalView of the User Agent Viewport
         **/
        static getModalView(): View;
        /**
         * Raises the <c>smallScreenChanged</c> event
         */
        static onSmallScreenChanged(): void;
        /**
         * SPECIAL SETTER
         Gets or sets the modalView of the User Agent Viewport
         **/
        static setModalView(view?: View, itemsArray?: Item[]): void;
        /**
         * Sets the mainView of the User Agent Viewport
         **/
        static setMainView(view: View, transition?: Transition, milliseconds?: number): void;
        /**
         * Gets or sets the current default button of the User Agent.
         Any press to the ENTER key will be redirected as click for that button.
         **/
        /**
         * Gets or sets the current default button of the User Agent.
         Any press to the ENTER key will be redirected as click for that button.
         **/
        static defaultButton: ButtonItem;
        /**
         * Gets or sets the mainView of the User Agent Viewport
         **/
        /**
         * Gets or sets the mainView of the User Agent Viewport
         **/
        static mainView: View;
        /**
         * Gets or sets the modalView of the User Agent Viewport
         **/
        /**
         * Gets or sets the modalView of the User Agent Viewport
         **/
        static modalView: View;
        /**
         * Gets or sets a value indicating if the view is in a small screen (aka iPhone Screen)
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the view is in a small screen (aka iPhone Screen)
         * @param value
         */
        static smallScreen: boolean;
        /**
         *
         **/
        private _infoItem;
        /**
         *
         **/
        private _padding;
        /**
         *
         **/
        private _parentIsModal;
        /**
         *
         **/
        private _parentView;
        /**
         *
         **/
        private _unsavedChanges;
        /**
         *
         **/
        private _view;
        /**
         * Holds the DOM element in which the View content is contained
         **/
        container: JQuery;
        /**
         * Raised when the view is loaded and about to be placed into its container
         **/
        load: LatteEvent;
        /**
         * Raised when the view is already visible
         **/
        shown: LatteEvent;
        /**
         * Raised when the view is unloaded. If result of event is <c>false</c> unload will be aborted.
         **/
        unload: LatteEvent;
        /**
         * Raised when the value of <c>unsavedChanges()</c> changes
         **/
        unsavedChangesChanged: LatteEvent;
        /**
         * Raised when <c>saveChanges()</c> is invoked.
         It may return false to cancel furhter operation.
         **/
        savingChanges: LatteEvent;
        /**
         * Raised when <c>saveChanges()</c> has finalized.
         **/
        savedChanges: LatteEvent;
        /**
         * Creates the <c>View</c>
         **/
        constructor();
        /**
         * Focuses the first input if any
         **/
        focusInput(): void;
        /**
         * Returns the current view of the view
         **/
        getView(): View;
        /**
         * Raises the <c>hidden</c> event
         **/
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(): void;
        /**
         * Raises the <c>load</c> event
         **/
        onLoad(): void;
        /**
         * Raises the <c>savedChanges</c> event
         **/
        onSavedChanges(): void;
        /**
         * Called to save changes
         */
        onSaveChanges(): void;
        /**
         * Raises the <c>savingChanges</c> event
         **/
        onSavingChanges(): any;
        /**
         * Raises the <c>shown</c> event
         **/
        onShown(): void;
        /**
         * Raises the <c>unload</c> event
         **/
        onUnload(): any;
        /**
         * Raises the <c>unsavedChangesChanged</c> event
         **/
        onUnsavedChangesChanged(): void;
        /**
         * Saves changes on view.
         Override <c>onSavingChanges</c> to custom save your data.
         **/
        saveChanges(): void;
        /**
         * Sets the <c>View</c> inside this view.
         If view swap fails, it will return <c>false</c>
         **/
        setView(view?: View, transition?: Transition, milliseconds?: number): boolean;
        /**
         * SPECIAL GETTER
         Gets or sets a value indicating if the view contains elments with unsaved changes
         **/
        getUnsavedChanges(): boolean;
        /**
         * SPECIAL SETTER
         Gets or sets a value indicating if the view contains elments with unsaved changes
         **/
        setUnsavedChanges(value?: boolean, silent?: boolean): void;
        /**
         * Sets this view as the view of the specified view.
         **/
        viewOf(view: View): View;
        /**
         * Gets or sets the info item of the view. Its shown in the back of the container
         and centered into the view.
         **/
        /**
         * Gets or sets the info item of the view. Its shown in the back of the container
         and centered into the view.
         **/
        infoItem: Item;
        /**
         * Gets or sets the padding of the container
         **/
        /**
         * Gets or sets the padding of the container
         **/
        padding: number;
        /**
         * Gets or sets a value indicating if the parent of the view is modal
         **/
        /**
         * Gets or sets a value indicating if the parent of the view is modal
         **/
        parentIsModal: boolean;
        /**
         * Gets the parent view of this view.
         **/
        parentView: View;
        /**
         * Gets or sets a value indicating if the view contains elments with unsaved changes
         **/
        /**
         * Gets or sets a value indicating if the view contains elments with unsaved changes
         **/
        unsavedChanges: boolean;
        /**
         * Gets or sets the view of the view
         **/
        /**
         * Gets or sets the view of the view
         **/
        view: View;
    }
}
declare module latte {
    /**
     * Base class for items who capture values from user.

     Classes who inherits from ValueItem must implement <c>value</c> method
     and initialize the <c>input</c> property to the focusable.
     **/
    class ValueItem extends Item {
        /**
         * Raised when value changes.
         **/
        valueChanged: LatteEvent;
        /**
         * Every ValueItem must create its own <c>input</c> element
         **/
        constructor();
        /**
         *
         **/
        getValue(): any;
        /**
         * Gets the value as a string
         * @returns {string}
         */
        getValueString(): string;
        /**
         * Raises the <c>valueChanged</c> event
         **/
        onValueChanged(): void;
        /**
         *
         **/
        setValue(value: any): void;
        /**
         * Gets or sets the value of the item
         <b>Must be overriden</b>
         **/
        /**
         * Gets or sets the value of the item
         <b>Must be overriden</b>
         **/
        value: any;
        /**
         * Gets the value as a string
         **/
        valueString: any;
    }
}
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
declare module latte {
    /**
     * Shows items in a stack
     **/
    class ItemStack extends Item {
        /**
         *
         **/
        private _padding;
        /**
         * Pointer to the DOM element where items are placed
         **/
        container: JQuery;
        /**
         * Collection of items in the stack
         **/
        items: Collection<Item>;
        /**
         * Raised when the items are changed
         **/
        itemsChanged: LatteEvent;
        /**
         * Creates the stack of items
         **/
        constructor(items?: Item[]);
        /**
         *
         **/
        onAddItem(item: Item): void;
        /**
         *
         **/
        onRemoveItem(item: Item): void;
        /**
         * Adds an item to the <c>items</c> collection
         **/
        add(item: Item): void;
        /**
         * Clears all elements of collection
         **/
        clear(): void;
        /**
         * Raises the <c>itemsChanged</c> event
         **/
        onItemsChanged(): void;
        /**
         * Overriden
         **/
        onLayout(): void;
        /**
         * Removes an item from the <c>items</c> collection
         **/
        remove(item: Item): void;
        /**
         * Gets the count of <c>items</c> collection
         **/
        count: number;
        /**
         * Gets or sets the padding between items and edges of stack.
         If set to null, paddings and margins will be removed.
         Default is null.
         **/
        /**
         * Gets or sets the padding between items and edges of stack.
         If set to null, paddings and margins will be removed.
         Default is null.
         **/
        padding: number;
    }
}
declare module latte {
    class Overlay extends UiElement {
        /**
         *
         */
        private _top;
        /**
         *
         */
        private _left;
        /**
         *
         */
        private _parent;
        /**
         * Creates the overlay
         */
        constructor();
        close(): void;
        /**
         * Sets the parent of the overlay, and the overlay is inserted as first node of the parent
         * @param parent
         */
        setFirstInParent(parent: UiElement): void;
        /**
         * Shows at the specified position of the specified element
         *
         * @param side
         * @param element
         */
        showAtSide(side: Side, uielement: UiElement): void;
        /**
         * Gets the left coordinate of the overlay
         * @returns {number}
         */
        /**
         * Sets the top coordinate of the overlay
         *
         * @param value
         */
        left: number;
        /**
         * Gets or sets the parent element of the overlay (To inherit style and such)
         * @returns {UiElement}
         */
        /**
         * Gets or sets the parent element of the overlay (To inherit style and such)
         * @param value
         */
        parent: UiElement;
        /**
         * Gets the top coordinate of the overlay
         *
         * @returns {number}
         */
        /**
         * Sets the top coordinate of the overlay
         *
         * @param value
         */
        top: number;
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
declare module latte {
    /**
     * Represents an item that is selectable
     **/
    class SelectableItem extends Item {
        /**
         * Raised when the <c>selected</c> property value changes
         **/
        selectedChanged: LatteEvent;
        /**
         * Creates the selectable
         **/
        constructor();
        /**
         *
         **/
        private _thisClick(e);
        /**
         *
         **/
        private _thisMouseDown(e);
        /**
         *
         **/
        private _thisMouseOut(e);
        /**
         *
         **/
        private _thisMouseOver(e);
        /**
         * Raises the <c>selectedChanged</c> event
         **/
        onSelectedChanged(): void;
        /**
         * Sets a value indicaing if the item is currently selected.
         Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
         **/
        setSelected(value?: boolean, raiseEvent?: boolean): void;
        /**
         * Gets or sets a value indicaing if the item is currently selected.
         Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
         **/
        /**
         * Gets or sets a value indicaing if the item is currently selected.
         Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
         **/
        selected: boolean;
    }
}
declare module latte {
    class AnchorView extends View {
        /**
         * Initializes view, optionally with an anchor item.
         */
        constructor(anchorTop?: Item);
        /**
         * Raises the <c>layout</c> event.
         **/
        onLayout(): void;
        /**
         * Back field for event
         */
        private _anchorTopChanged;
        /**
         * Gets an event raised when the value of anchorTop changes
         *
         * @returns {LatteEvent}
         */
        anchorTopChanged: LatteEvent;
        /**
         * Raises the <c>anchorTopChanged</c> event
         */
        onAnchorTopChanged(): void;
        /**
         * Back field for event
         */
        private _anchorRightChanged;
        /**
         * Gets an event raised when the value of anchorRight changes
         *
         * @returns {LatteEvent}
         */
        anchorRightChanged: LatteEvent;
        /**
         * Raises the <c>anchorRightChanged</c> event
         */
        onAnchorRightChanged(): void;
        /**
         * Back field for event
         */
        private _anchorBottomChanged;
        /**
         * Gets an event raised when the value of anchorBottom changes
         *
         * @returns {LatteEvent}
         */
        anchorBottomChanged: LatteEvent;
        /**
         * Raises the <c>anchorBottomChanged</c> event
         */
        onAnchorBottomChanged(): void;
        /**
         * Back field for event
         */
        private _anchorLeftChanged;
        /**
         * Gets an event raised when when what?
         *
         * @returns {LatteEvent}
         */
        anchorLeftChanged: LatteEvent;
        /**
         * Raises the <c>anchorLeftChanged</c> event
         */
        onAnchorLeftChanged(): void;
        /**
         * Back field for event
         */
        private _anchorTopVisibleChanged;
        /**
         * Gets an event raised when the value of anchorTopVisible changes
         *
         * @returns {LatteEvent}
         */
        anchorTopVisibleChanged: LatteEvent;
        /**
         * Raises the <c>anchorTopVisibleChanged</c> event
         */
        onAnchorTopVisibleChanged(): void;
        /**
         * Back field for event
         */
        private _anchorRightVisibleChanged;
        /**
         * Gets an event raised when the value of anchorRightVisible changes
         *
         * @returns {LatteEvent}
         */
        anchorRightVisibleChanged: LatteEvent;
        /**
         * Raises the <c>anchorRightVisibleChanged</c> event
         */
        onAnchorRightVisibleChanged(): void;
        /**
         * Back field for event
         */
        private _anchorBottomVisibleChanged;
        /**
         * Gets an event raised when the value of anchorBottomVisible changed
         *
         * @returns {LatteEvent}
         */
        anchorBottomVisibleChanged: LatteEvent;
        /**
         * Raises the <c>anchorBottomVisibleChanged</c> event
         */
        onAnchorBottomVisibleChanged(): void;
        /**
         * Back field for event
         */
        private _anchorLeftVisibleChanged;
        /**
         * Gets an event raised when the value of anchorLeftVisible changed
         *
         * @returns {LatteEvent}
         */
        anchorLeftVisibleChanged: LatteEvent;
        /**
         * Raises the <c>anchorLeftVisibleChanged</c> event
         */
        onAnchorLeftVisibleChanged(): void;
        /**
         * Property field
         */
        private _anchorTop;
        /**
         * Gets or sets the top anchor item
         *
         * @returns {Item}
         */
        /**
         * Gets or sets the top anchor item
         *
         * @param {Item} value
         */
        anchorTop: Item;
        /**
         * Property field
         */
        private _anchorTopVisible;
        /**
         * Gets or sets the visibility of the top anchor item
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets the visibility of the top anchor item
         *
         * @param {boolean} value
         */
        anchorTopVisible: boolean;
        /**
         * Property field
         */
        private _anchorRight;
        /**
         * Gets or sets the right anchor item
         *
         * @returns {Item}
         */
        /**
         * Gets or sets the right anchor item
         *
         * @param {Item} value
         */
        anchorRight: Item;
        /**
         * Property field
         */
        private _anchorRightVisible;
        /**
         * Gets or sets the visibility of the right anchor item
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets the visibility of the right anchor item
         *
         * @param {boolean} value
         */
        anchorRightVisible: boolean;
        /**
         * Property field
         */
        private _anchorBottom;
        /**
         * Gets or sets the bottom anchor item
         *
         * @returns {Item}
         */
        /**
         * Gets or sets the bottom anchor item
         *
         * @param {Item} value
         */
        anchorBottom: Item;
        /**
         * Property field
         */
        private _anchorBottomVisible;
        /**
         * Gets or sets the visibility of bottom top anchor item
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets the visibility of the bottom anchor item
         *
         * @param {boolean} value
         */
        anchorBottomVisible: boolean;
        /**
         * Property field
         */
        private _anchorLeft;
        /**
         * Gets or sets the left item anchor
         *
         * @returns {Item}
         */
        /**
         * Gets or sets the left item anchor
         *
         * @param {Item} value
         */
        anchorLeft: Item;
        /**
         * Property field
         */
        private _anchorLeftVisible;
        /**
         * Gets or sets the visibility of the left anchor item
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets the visibility of the left anchor item
         *
         * @param {boolean} value
         */
        anchorLeftVisible: boolean;
    }
}
declare module latte {
    /**
     * Renders a view splitted in two. A <c>side</c> and the main <c>view</c>
     **/
    class SplitView extends View {
        /**
         *
         **/
        private _draggingSplit;
        /**
         *
         **/
        private _sensitivity;
        /**
         *
         **/
        private _side;
        /**
         *
         **/
        private _sideSize;
        /**
         *
         **/
        private _splitterSize;
        /**
         *
         */
        private _sideVisible;
        /**
         * View where side view is contained
         **/
        sideWrap: View;
        /**
         * Splitter between <c>side</c> and <c>view</c>
         **/
        splitterElement: JQuery;
        /**
         * Creates the View
         **/
        constructor();
        /**
         *
         **/
        private _onMouseDown(e);
        /**
         *
         **/
        private _onMouseMove(e);
        /**
         *
         **/
        private _onMouseUp(e);
        /**
         * Updates the layout of View
         **/
        onLayout(): void;
        /**
         * Gets or sets the sensitivity radius for dragging the splitter
         **/
        /**
         * Gets or sets the sensitivity radius for dragging the splitter
         **/
        sensitivity: number;
        /**
         * Gets or sets the side of the side view
         **/
        /**
         * Gets or sets the side of the side view
         **/
        side: Side;
        /**
         * Gets or sets the wide of the side view.
         If value is lower than 1, then it will be taken as the percent to occupy, i.e. 0.5 = 50% of space.
         **/
        /**
         * Gets or sets the wide of the side view.
         If value is lower than 1, then it will be taken as the percent to occupy, i.e. 0.5 = 50% of space.
         **/
        sideSize: number;
        /**
         * Gets or sets the side <c>View</c>
         **/
        /**
         * Gets or sets the side <c>View</c>
         **/
        sideView: View;
        /**
         * Sets a value indicating if side is currently visible
         * @returns {boolean}
         */
        /**
         * Gets a value indicating if side is currently visible
         * @param value
         */
        sideVisible: boolean;
        /**
         * Gets or sets the wide of the splitterElement
         **/
        /**
         * Gets or sets the wide of the splitterElement
         **/
        splitterSize: number;
    }
}
declare module latte {
    /**
     * Generic Exception class
     *
     * Usage
     * <example>
     *  if(somethingWrong){
     *      // Throw a simple exception
     *      throw new Ex()
     *  }
     * </example>
     */
    class Ex {
        private description;
        /**
         * Creates the exception object
         *
         * @param description
         */
        constructor(description?: string);
        /**
         * Returns the exception as a string.
         *
         * @returns {string}
         */
        toString(): string;
    }
}
declare module latte {
    /**
     * Represents a square Icon.

     Icons may be come from a single image, or from a sprite image with several icons.
     <c>IconItem</c> comes with a default sprite built in with a wide variety of icons.
     **/
    class IconItem extends Item {
        /**
         * Default URL of sprite used if coordinates are specified, and no <c>url</c> is provided.
         **/
        static defaultUrl: string;
        /**
         * Creates an empty icon of the specified size
         **/
        static empty(size: number): IconItem;
        /**
         * Gets a standard icon of the specified u and v coordinates. Size 16.
         **/
        static standard(u: number, v: number, size?: number): IconItem;
        /**
         * Creates the icon
         **/
        constructor();
        /**
         * Returns a clone of the icon
         **/
        clone(): IconItem;
        /**
         *
         **/
        private _name;
        /**
         * Gets or sets the name of the icon
         **/
        /**
         * Gets or sets the name of the icon
         **/
        name: string;
        /**
         *
         **/
        private _size;
        /**
         * Gets or sets the size of the icon
         The only possible values are: <c>16</c> | <c>32</c> | <c>48</c>
         **/
        /**
         * Gets or sets the size of the icon
         The only possible values are: <c>16</c> | <c>32</c> | <c>48</c>
         **/
        size: number;
        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        u: number;
        /**
         *
         **/
        private _u;
        /**
         *
         **/
        private _url;
        /**
         * Gets or sets the URL of the icon's image URL
         **/
        /**
         * Gets or sets the URL of the icon's image URL
         **/
        url: string;
        /**
         *
         **/
        private _v;
        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        v: number;
        /**
         *
         **/
        private _x;
        /**
         * Gets or sets the X coordinate of icon inside image (As a sprite)
         **/
        /**
         * Gets or sets the X coordinate of icon inside image (As a sprite)
         **/
        x: number;
        /**
         *
         **/
        private _y;
        /**
         * Gets or sets the Y coordinate of icon inside image (As a sprite)
         **/
        /**
         * Gets or sets the Y coordinate of icon inside image (As a sprite)
         **/
        y: number;
    }
}
declare module latte {
    /**
     * Represents an item which can be apparently clicked.

     - Item may be checked, event automatically if <c>checked()</c> value is <c>true</c>
     - Item may be selected, when user hovers over it, if <c>selectable()</c> value is <c>true</c>
     - Item may be pressed, when user holds the mouse button down.
     - Item may be withContext, when its showing contextual data, like a menu or a tab's content
     **/
    class ClickableItem extends Item {
        /**
         *
         **/
        private _checkable;
        /**
         *
         **/
        private _checked;
        /**
         *
         **/
        private _clickPropagation;
        /**
         *
         **/
        private _contextAt;
        /**
         *
         **/
        private _faceVisible;
        /**
         *
         **/
        private _flatSide;
        /**
         *
         **/
        private _openSide;
        /**
         *
         **/
        private _pressed;
        /**
         *
         **/
        private _selectable;
        /**
         *
         **/
        private _selected;
        /**
         *
         **/
        private _withContext;
        /**
         * Raised when user clicks the item. Passes the item when clicked.
         **/
        click: LatteEvent;
        /**
         * Raised when <c>checked()</c> value changes
         **/
        checkedChanged: LatteEvent;
        /**
         * Raised when <c>faceVisible()</c> value changes
         **/
        faceVisibleChanged: LatteEvent;
        /**
         * Raised when <c>pressed()</c> value changes
         **/
        pressedChanged: LatteEvent;
        /**
         * Raised when <c>selected()</c> value changes
         **/
        selectedChanged: LatteEvent;
        /**
         * Raised when <c>withContext()</c> value changes
         **/
        withContextChanged: LatteEvent;
        /**
         *
         **/
        constructor();
        /**
         * Returns the value of the checked property
         **/
        getChecked(): boolean;
        /**
         *
         **/
        getContextAt(): Side;
        /**
         *
         **/
        getSelected(): boolean;
        /**
         * Raises the <c>checkedChanged</c> event
         **/
        onCheckedChanged(): void;
        /**
         * Raises the <c>click</c> event
         **/
        onClick(): void;
        /**
         * Overriden. Raises the <c>enabledChanged</c> event
         **/
        onEnabledChanged(): void;
        /**
         * Raises the <c>faceVisibleChanged</c> event
         **/
        onFaceVisibleChanged(): void;
        /**
         * Raises the <c>pressedChanged</c> event
         **/
        onPressedChanged(): void;
        /**
         * Raises the <c>selectedChanged</c> event
         **/
        onSelectedChanged(): void;
        /**
         * Raises the <c>withContextChanged</c> event
         **/
        onWithContextChanged(): void;
        /**
         * Sets a value indicating if the item is currently checked.
         Optionally omits the <c>checkedChanged</c> event trigger.
         **/
        setChecked(value: boolean, silent?: boolean): void;
        /**
         *
         **/
        setContextAt(value: Side): void;
        /**
         *
         **/
        setSelected(value: boolean, silent?: boolean): void;
        /**
         * Gets or sets a value indicating if the item is checkable.
         When checkable, the item will be turned to checked when clicked.
         **/
        /**
         * Gets or sets a value indicating if the item is checkable.
         When checkable, the item will be turned to checked when clicked.
         **/
        checkable: boolean;
        /**
         * Gets or sets the checked state of the clickable
         **/
        /**
         * Gets or sets the checked state of the clickable
         **/
        checked: boolean;
        /**
         * Gets or sets a value indicating if click event will propagate as usual.
         If set to false, event propagation will be suspended on click.
         **/
        /**
         * Gets or sets a value indicating if click event will propagate as usual.
         If set to false, event propagation will be suspended on click.
         **/
        clickPropagation: boolean;
        /**
         * Gets or sets a value indicating if the item is visually indicating that it
         has context at some side.
         It will automatically affect the values of <c>openSide()</c>, <c>withContext</c>
         and <c>flatSide()</c>.
         It may be removed by passing <c>null</c> as value.
         **/
        /**
         * Gets or sets a value indicating if the item is visually indicating that it
         has context at some side.
         It will automatically affect the values of <c>openSide()</c>, <c>withContext</c>
         and <c>flatSide()</c>.
         It may be removed by passing <c>null</c> as value.
         **/
        contextAt: Side;
        /**
         * Gets or sets the visibility of the button face
         **/
        /**
         * Gets or sets the visibility of the button face
         **/
        faceVisible: boolean;
        /**
         *
         **/
        getFaceVisible(): boolean;
        /**
         * Sets a value indicating if the item's face is currently visible.
         **/
        setFaceVisible(value?: boolean, silent?: boolean): void;
        /**
         * Gets or sets the flat side of the button.
         The flat side will remove corner roundness on the specified side.
         It can be removed by passing null as value.
         **/
        /**
         * Gets or sets the flat side of the button.
         The flat side will remove corner roundness on the specified side.
         It can be removed by passing null as value.
         **/
        flatSide: Side;
        /**
         * Gets or sets the open side of the button.
         The open side will not show edge at the specified side.
         It can be removed by passing null as value.
         **/
        /**
         * Gets or sets the open side of the button.
         The open side will not show edge at the specified side.
         It can be removed by passing null as value.
         **/
        openSide: Side;
        /**
         * Gets or sets a value indicating if the item is currently pressed
         **/
        /**
         * Gets or sets a value indicating if the item is currently pressed
         **/
        pressed: boolean;
        /**
         * Gets or sets a value indicating if the item is selectable.
         If <c>selectable()</c>, Item will be selected when mouse hovers over it.
         **/
        /**
         * Gets or sets a value indicating if the item is selectable.
         If <c>selectable()</c>, Item will be selected when mouse hovers over it.
         **/
        selectable: boolean;
        /**
         * Gets or sets a value indicating if the item is currently selected.
         **/
        /**
         * Gets or sets a value indicating if the item is currently selected.
         **/
        selected: boolean;
        /**
         * Gets or sets a value indicating if the item has currently context
         **/
        /**
         * Gets or sets a value indicating if the item has currently context
         **/
        withContext: boolean;
    }
}
declare module latte {
    /**
     * Represents a single label
     **/
    class LabelItem extends Item {
        /**
         *
         */
        private _iconAndTextPadding;
        /**
         *
         **/
        private _direction;
        /**
         *
         **/
        private _icon;
        /**
         *
         **/
        private _linkStyle;
        /**
         *
         **/
        private _preformatted;
        /**
         *
         **/
        private _textWrap;
        /**
         *
         **/
        private _title;
        /**
         * Points to the element where the text and description elements are stored
         **/
        contentElement: JQuery;
        /**
         * Points to the element where the description is stored
         **/
        descriptionElement: JQuery;
        /**
         * Points to the element where the icon is stored
         **/
        iconElement: JQuery;
        /**
         * Points to the element where the text is stored
         **/
        textElement: JQuery;
        /**
         * Raised when user clicks the label and its a link label
         **/
        navigate: LatteEvent;
        /**
         * Raised when description() value changes
         **/
        descriptionChanged: LatteEvent;
        /**
         * Raised when icon() value changes
         **/
        iconChanged: LatteEvent;
        /**
         * Raised when text() value changes
         **/
        textChanged: LatteEvent;
        /**
         *
         **/
        constructor(text?: string, description?: string, icon?: IconItem, title?: number);
        /**
         * Updates the <c>.icon-and-text</c> flag.
         Also updates margin of label-cotent
         **/
        updateIconAndTextFlag(): void;
        /**
         * Updates the <c>white-space</c> CSS property
         **/
        private _updateWhitespace();
        /**
         * Raises the <c>descriptionChanged</c> event
         **/
        onDescriptionChanged(): void;
        /**
         * Raises the <c>iconChanged</c> event
         **/
        onIconChanged(): void;
        /**
         * Raises the <c>navigate</c> event
         **/
        onNavigate(): void;
        /**
         * Raises the <c>textChanged</c> event
         **/
        onTextChanged(): void;
        /**
         * Gets or sets the description of label, shown below the text.
         **/
        /**
         * Gets or sets the description of label, shown below the text.
         **/
        description: string;
        /**
         * Gets or sets the direction of the label
         **/
        /**
         * Gets or sets the direction of the label
         **/
        direction: Direction;
        /**
         * Gets or sets the icon of the label
         **/
        /**
         * Gets or sets the icon of the label
         **/
        icon: IconItem;
        iconAndTextPadding: number;
        /**
         * Gets or sets a value indicating if the label has a link style
         **/
        /**
         * Gets or sets a value indicating if the label has a link style
         **/
        linkStyle: boolean;
        /**
         * Gets or sets if label uses preformatted text. Or PRE whitespace
         **/
        /**
         * Gets or sets if label uses preformatted text. Or PRE whitespace
         **/
        preformatted: boolean;
        /**
         * Gets or sets the text of the label. This text may include HTML.
         **/
        /**
         * Gets or sets the text of the label. This text may include HTML.
         **/
        text: string;
        /**
         * Gets or sets a value indicating if the text is wrapped in lines
         **/
        /**
         * Gets or sets a value indicating if the text is wrapped in lines
         **/
        textWrap: boolean;
        /**
         * Gets or sets the title level of this label.
         Possible values are in the range from 0 to 5.
         **/
        /**
         * Gets or sets the title level of this label.
         Possible values are in the range from 0 to 5.
         **/
        title: number;
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
declare module latte {
    /**
     * Group of buttons.

     By default ButtonGroupItem doesn't allow to have multiple buttons checked at
     once, this can be altered by using the <c>multiCheck</c> method
     **/
    class ButtonGroupItem extends Item {
        /**
         *
         **/
        private _checkedButton;
        /**
         *
         **/
        private _direction;
        /**
         *
         **/
        private _faceVisible;
        /**
         *
         **/
        private _multiCheck;
        /**
         * Collection of buttons of button group
         **/
        buttons: Collection<ButtonItem>;
        /**
         * Raised when some button is checked
         **/
        checkedChanged: LatteEvent;
        /**
         * Creates the Button Group. Optionally adds the buttons to the group
         **/
        constructor(buttons?: ButtonItem[]);
        /**
         *
         **/
        private _checkCheck(checkedButton);
        /**
         *
         **/
        private _onAddButton(button);
        /**
         *
         **/
        private _onRemoveButton(button);
        /**
         *
         **/
        private _update();
        /**
         * Raises the <c>checkedChanged</c>
         **/
        onCheckedChanged(): void;
        /**
         * Overriden.
         **/
        onEnabledChanged(): void;
        /**
         * Overriden.
         **/
        onLayout(): void;
        /**
         * Gets the checked button of the group
         **/
        /**
         * Gets the checked button of the group
         **/
        checkedButton: ButtonItem;
        /**
         * Gets or sets the direction of the groups
         **/
        /**
         * Gets or sets the direction of the groups
         **/
        direction: Direction;
        /**
         * Gets ors sets a value indicating if the face of the button group should
         be visible.
         **/
        /**
         * Gets ors sets a value indicating if the face of the button group should
         be visible.
         **/
        faceVisible: boolean;
        /**
         * Gets or sets a value indicating if the group allows multiple buttons to
         be checked at the same time
         **/
        /**
         * Gets or sets a value indicating if the group allows multiple buttons to
         be checked at the same time
         **/
        multiCheck: boolean;
    }
}
declare module latte {
    /**
     * Renders a clickable button.

     Button may obtain different render modes, sub items who are shown in a
     contextual menu and react to its icon size.
     **/
    class ButtonItem extends ClickableItem {
        /**
         * Name of default glyph of buttons. This name must match a method name
         in the <c>Glyph</c> class.
         **/
        static defaultGlyph: string;
        /**
         *
         **/
        private _dropdownVisible;
        /**
         *
         **/
        private _glyph;
        /**
         *
         **/
        private _itemsEdge;
        /**
         *
         **/
        private _itemsMenu;
        /**
         *
         **/
        private _itemsSide;
        /**
         *
         **/
        private _split;
        /**
         *
         **/
        private _willLoadItems;
        /**
         * Clickable element where dropdown is shown
         **/
        private _dropdown;
        /**
         * Sub-Items of this item. These items are shown in a <c>MenuOverlay</c> element.
         **/
        items: Collection<Item>;
        /**
         * Label inside button. It supports the <c>icon</c>, <c>text()</c> and <c>description</c>
         properties, among other features.
         **/
        label: LabelItem;
        /**
         * Raised when items are about to be shown
         **/
        loadItems: LatteEvent;
        /**
         * Raised when the items are shown
         **/
        itemsShown: LatteEvent;
        /**
         * Creates the button
         **/
        constructor(text?: string, icon?: IconItem, click?: Function, tab?: any);
        /**
         * Handles drop down click
         **/
        private _dropdownClick();
        /**
         * Handles dropdown pressedChanged
         **/
        private _dropdownPressedChanged();
        /**
         * Handles dropdown selectedChanged
         **/
        private _dropdownSelectedChanged();
        /**
         * Handles item add
         **/
        private _onAddItem(item);
        /**
         * Handles item remove
         **/
        private _onRemoveItem(item);
        /**
         * Alternates between items visibility
         **/
        private _showOrHideItems();
        /**
         * Updates edges of dropdown clickable
         **/
        private _updateDropdownProperties();
        /**
         * Checks for the formatting CSS flags
         **/
        private _updateLabelFlag();
        private createDropdownButton();
        /**
         *
         **/
        getContextAt(): Side;
        /**
         * Returns a value indicating if the button contains items or will load them eventually
         **/
        hasItems: boolean;
        /**
         * Hides the MenuOverlay showing this button's items
         **/
        hideItems(): void;
        /**
         * Overriden.
         **/
        onClick(): void;
        /**
         * Overriden.
         **/
        onFaceVisibleChanged(): void;
        /**
         * Raises the <c>itemsShown</c> event
         **/
        onItemsShown(menuItem: MenuOverlay): void;
        /**
         * Overriden.
         **/
        onPressedChanged(): void;
        /**
         * Overriden.
         **/
        onSelectedChanged(): void;
        /**
         * Overriden.
         **/
        onWithContextChanged(): void;
        /**
         *
         **/
        setContextAt(value: Side): void;
        /**
         * Shows the items of the button. Optionally specifies the side and edge on which items are shown.
         **/
        showItems(side?: Side, edge?: Side): void;
        /**
         * Gets or sets the description of the button
         **/
        /**
         * Gets or sets the description of the button
         **/
        description: string;
        /**
         * Gets or sets the direction of the button.
         **/
        /**
         * Gets or sets the direction of the button.
         **/
        direction: Direction;
        dropdown: ClickableItem;
        /**
         * Gets or sets the visibility of the dropdown.
         When <c>null</c> dropdown will be shown automatically when items are added.
         **/
        /**
         * Gets or sets the visibility of the dropdown.
         When <c>null</c> dropdown will be shown automatically when items are added.
         **/
        dropdownVisible: boolean;
        /**
         * Gets or sets the Glyph of the button. The glyph is displayed to indicate the direction on which items will be shown.
         **/
        /**
         * Gets or sets the Glyph of the button. The glyph is displayed to indicate the direction on which items will be shown.
         **/
        glyph: IconItem;
        /**
         * Gets or sets the icon of the button
         **/
        /**
         * Gets or sets the icon of the button
         **/
        icon: IconItem;
        /**
         * Gets or sets the edge on wich items menu is shown.
         **/
        /**
         * Gets or sets the edge on wich items menu is shown.
         **/
        itemsEdge: Side;
        /**
         * Gets the MenuOverlay containing items, If currently being shown
         **/
        /**
         * Sets the menu containing the items.
         * SET BY CODE, you should not use this method.
         *
         * @param value
         */
        itemsMenu: MenuOverlay;
        /**
         * Gets or sets the side of button where items menu is shown.
         **/
        /**
         * Gets or sets the side of button where items menu is shown.
         **/
        itemsSide: Side;
        /**
         * Gets a boolean indicating if the items menu is currently showing
         **/
        showingItems: any;
        /**
         * Gets or sets a value indicating if the button is splitted.
         **/
        /**
         * Gets or sets a value indicating if the button is splitted.
         **/
        split: boolean;
        /**
         * Gets or sets the text of the button
         **/
        /**
         * Gets or sets the text of the button
         **/
        text: string;
        /**
         * Gets a flag indicating if the button will load items before showing them
         **/
        willLoadItems: boolean;
    }
}
declare module latte {
    /**
     * Shows items in a strip
     **/
    class Toolbar extends Item {
        /**
         *
         **/
        private _direction;
        /**
         *
         **/
        private _faceVisible;
        /**
         *
         **/
        private _holderWide;
        /**
         *
         **/
        private _padding;
        /**
         * Face of toolbar
         **/
        faceElement: JQuery;
        /**
         * Holds the items to a certain width
         **/
        holderElement: JQuery;
        /**
         * Collection of items in the toolbar
         **/
        items: Collection<Item>;
        /**
         * Element where the items are placed
         **/
        itemsElement: JQuery;
        /**
         * Collection of items shown in the opposite side of toolbar
         **/
        sideItems: Collection<Item>;
        /**
         * Element where the side items are placed
         **/
        sideItemsElement: JQuery;
        /**
         * Raised when items are addded or removed
         **/
        itemsChanged: LatteEvent;
        /**
         * Raised when side items are addded or removed
         **/
        sideItemsChanged: LatteEvent;
        /**
         * Creates the Toolbar
         **/
        constructor();
        /**
         *
         **/
        private _onAddItem(item);
        /**
         *
         **/
        private _onAddSideItem(item);
        /**
         *
         **/
        private _onRemoveItem(item);
        /**
         *
         **/
        private _onRemoveSideItem(item);
        /**
         * Raises the <c>itemsChanged</c> event
         **/
        onItemsChanged(): void;
        /**
         * Raises the <c>itemsChanged</c> event
         **/
        onSideItemsChanged(): void;
        /**
         * Gets or sets the direction of the toolbar
         **/
        /**
         * Gets or sets the direction of the toolbar
         **/
        direction: Direction;
        /**
         * Gets or sets a value indicating if the face of toolbar should be visible.
         **/
        /**
         * Gets or sets a value indicating if the face of toolbar should be visible.
         **/
        faceVisible: boolean;
        /**
         * Gets or sets the wide of the items holder to limit the area where items are placed.
         A value of zero or lower will set the holder to the wide of toolbar
         **/
        /**
         * Gets or sets the wide of the items holder to limit the area where items are placed.
         A value of zero or lower will set the holder to the wide of toolbar
         **/
        holderWide: number;
        /**
         * Gets or sets the padding of the toolbar.
         Can be set to <c>null</c> to reset padding to original.
         **/
        /**
         * Gets or sets the padding of the toolbar.
         Can be set to <c>null</c> to reset padding to original.
         **/
        padding: number;
    }
}
declare module latte {
    /**
     *
     **/
    class SelectableLabel extends SelectableItem {
        /**
         * Label of item
         **/
        label: LabelItem;
        /**
         *
         **/
        constructor();
        /**
         * Gets or sets the description of the item's label
         **/
        /**
         * Gets or sets the description of the item's label
         **/
        description: string;
        /**
         * Gets or sets the icon of the item's label
         **/
        /**
         * Gets or sets the icon of the item's label
         **/
        icon: IconItem;
        /**
         * Gets or sets the text of the item's label
         **/
        /**
         * Gets or sets the text of the item's label
         **/
        text: string;
    }
}
declare module latte {
    /**
     * Presents an input method for picking a date
     **/
    class DatePickerItem extends ValueItem {
        /**
         *
         **/
        private _date;
        /**
         *
         **/
        private _dateButton;
        /**
         *
         **/
        private _dateVisible;
        /**
         *
         **/
        private _timeVisible;
        /**
         *
         **/
        constructor();
        /**
         * Zero pads for dates
         * @param i
         * @returns {string}
         */
        private zeroPad(i);
        /**
         *
         **/
        _updateTimeComponent(): void;
        /**
         * Field for dateItem property
         */
        private _dateItem;
        /**
         * Gets the date item
         *
         * @returns {DateItem}
         */
        dateItem: DateItem;
        /**
         * Field for checkbox property
         */
        private _checkbox;
        /**
         * Gets the checkbox of item
         *
         * @returns {CheckboxItem}
         */
        checkbox: CheckboxItem;
        /**
         * Field for hourCombo property
         */
        private _hourCombo;
        /**
         * Gets the hour combo item
         *
         * @returns {ComboItem}
         */
        hourCombo: ComboItem;
        /**
         * Field for minuteCombo property
         */
        private _minuteCombo;
        /**
         * Gets the minutes combo Item
         *
         * @returns {ComboItem}
         */
        minuteCombo: ComboItem;
        /**
         * Gets or sets the date of the picker
         **/
        /**
         * Gets or sets the date of the picker
         **/
        date: DateTime;
        /**
         * Gets or sets a value indicating if the date part of picker should be visible
         **/
        /**
         * Gets or sets a value indicating if the date part of picker should be visible
         **/
        dateVisible: boolean;
        /**
         * Property field
         */
        private _nullable;
        /**
         * Gets or sets a value indicating if the date may be null
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the date may be null
         *
         * @param {boolean} value
         */
        nullable: boolean;
        /**
         * Back field for event
         */
        private _nullableChanged;
        /**
         * Gets an event raised when the value of the nullable property changes
         *
         * @returns {LatteEvent}
         */
        nullableChanged: LatteEvent;
        /**
         * Raises the <c>nullable</c> event
         */
        onNullableChanged(): void;
        /**
         * Gets or sets a value indicating if the time part of picker should be visible
         **/
        /**
         * Gets or sets a value indicating if the time part of picker should be visible
         **/
        timeVisible: boolean;
        /**
         * Gets or sets the date of the picker, as a string
         **/
        /**
         * Gets or sets the date of the picker, as a string
         **/
        value: any;
    }
}
declare module latte {
    class StackOverlay extends Overlay {
        stack: ItemStack;
        constructor();
        /**
         * Gets the collection of items of stack
         *
         * @returns {latte.Collection<latte.Item>}
         */
        items: Collection<Item>;
    }
}
declare module latte {
    /**
     * Represents a view who presents items in columns
     **/
    class ColumnView extends View {
        /**
         *
         **/
        private _columnWeights;
        /**
         *
         **/
        private _columns;
        /**
         *
         */
        private _paddingColumns;
        /**
         * Collection of items inside the view's columns
         **/
        items: Collection<Item>;
        /**
         * Creates the View with the specified amount of columns.
         **/
        constructor(columns?: number);
        /**
         * Called when an item is added to the items collection
         **/
        onAddItem(item: Item): void;
        /**
         * Called when an item is removed to the items collection
         **/
        onRemoveItem(item: Item): void;
        /**
         * Returns the column at the specified index. First column is zero
         **/
        getColumnAt(index: number): JQuery;
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(): void;
        /**
         * Gets or sets the weights of columns for computing their width.
         Weights must be numbers between 0 and 100.
         **/
        /**
         * Gets or sets the weights of columns for computing their width.
         Weights must be numbers between 0 and 100.
         **/
        columnWeights: number[];
        /**
         * Gets or sets the number of columns in the view.
         **/
        /**
         * Gets or sets the number of columns in the view.
         **/
        columns: number;
        /**
         * Gets or sets the column padding inside of columns
         **/
        /**
         * Gets or sets the column  padding inside of columns
         **/
        columnPadding: number;
    }
}
declare module latte {
    /**
     *
     **/
    class NavigationView extends SplitView {
        /**
         *
         **/
        tree: TreeView;
        /**
         *
         **/
        treeToolbar: Toolbar;
        /**
         *
         **/
        constructor();
    }
}
declare module latte {
    /**
     *
     */
    class Collection<T> {
        private pointer;
        /**
         *
         */
        constructor(addCallback?: (T: any, number: any) => void, removeCallback?: (T: any, number: any) => any, context?: any);
        /**
         * Adds an element to the collection
         *
         * @param element
         * @param raiseEvent
         */
        add(element: T, raiseEvent?: boolean): void;
        /**
         * Adds an array of elements
         *
         * @param elements
         * @param raiseEvent
         */
        addArray(elements: T[], raiseEvent?: boolean): void;
        /**
         * Adds a collection of elements to the collection
         *
         * @param collection
         * @param raiseEvent
         */
        addCollection(collection: Collection<T>, raiseEvent?: boolean): void;
        /**
         * Clears the collection
         */
        clear(): void;
        /**
         * Iterates through the collection, executing the handler for each item
         * @param handler
         */
        each(handler: (item: T, index: number) => any): void;
        /**
         * Gets the index of the specified element if found. -1 if not found.
         * @param item
         * @returns {number}
         */
        indexOf(item: T): number;
        /**
         * Gets the item at the specified position
         * @param index
         * @returns {*}
         */
        item(index: number): T;
        /**
         * Returns the object on current pointer and moves the pointer forward.
         * It returns null and resets pointer if end of collection reached.
         * @returns {*}
         */
        next(): T;
        /**
         * Raises the <c>addItem</c> event
         */
        onAddItem(item: T, index: number): void;
        /**
         * Raises the <c>removeItem</c> event
         */
        onRemoveItem(item: T, index: number): void;
        /**
         * Removes the specified item from the collection
         * @param item
         * @param raiseEvent
         */
        remove(item: T, raiseEvent?: boolean): Collection<T>;
        /**
         * Removes the item ath the specified index
         * @param index
         * @param raiseEvent
         */
        removeAt(index: number, raiseEvent?: boolean): void;
        /**
         * Resets the internal pointer for calls to <c>next()</c> method.
         */
        resetPointer(): void;
        /**
         * Back field for event
         */
        private _addItem;
        /**
         * Gets an event raised when an item is added
         *
         * @returns {LatteEvent}
         */
        addItem: LatteEvent;
        /**
         * Back field for event
         */
        private _removeItem;
        /**
         * Gets an event raised when an item is removed
         *
         * @returns {LatteEvent}
         */
        removeItem: LatteEvent;
        /**
         * Property field
         */
        private _context;
        /**
         * Gets or sets the context to execute methods of collection
         *
         * @returns {any}
         */
        /**
         * Gets or sets the context to execute methods of collection
         *
         * @param {any} value
         */
        context: any;
        /**
         * Gets the count of elements in collection
         *
         * @returns {number}
         */
        count: number;
        /**
         * Gets the first element of the collection
         * @returns {*}
         */
        first: T;
        /**
         * Gets the last element of the collection
         * @returns {*}
         */
        last: T;
        /**
         * Property field
         */
        private _length;
        /**
         * Gets the length of the collection
         *
         * @returns {number}
         */
        length: number;
    }
}
declare module latte {
    /**
     * Represents a color
     **/
    class Color {
        /**
         * Creates a color from the hexadecimal value.
         * It may contain the <c>#</c> symbol at the beginning of the string.
         **/
        static fromHex(hexColor: string): Color;
        /**
         * Field for black property.
         */
        private static _black;
        /**
         * Gets the black color
         */
        static black: Color;
        /**
         * Field for white property.
         */
        private static _white;
        /**
         * Gets the white color
         */
        static white: Color;
        /**
         * Field for red property.
         */
        private static _red;
        /**
         * Gets the red color
         */
        static red: Color;
        /**
         * Field for green property.
         */
        private static _green;
        /**
         * Gets the green color
         */
        static green: Color;
        /**
         * Field for blue property.
         */
        private static _blue;
        /**
         * Gets the blue color
         */
        static blue: Color;
        /**
         * Field for transparent property.
         */
        private static _transparent;
        /**
         * Gets the transparent color
         */
        static transparent: Color;
        /**
         * Creates the color from the specified RGB and Aplha components.
         **/
        constructor(r?: number, g?: number, b?: number, a?: number);
        /**
         * Returns the color as a hex string
         **/
        toHexString(): string;
        /**
         * Returns the color as a string
         **/
        toString(): string;
        /**
         *
         **/
        private _a;
        /**
         * Gets r sets the Alpha component of color, from 0 to 255
         * @returns {number}
         */
        /**
         * Gets or sets the Aplha component of color, from 0 to 255.
         **/
        a: number;
        /**
         *
         **/
        private _b;
        /**
         * Gets or sets the Blue component of color, from 0 to 255.
         **/
        /**
         * Gets or sets the Blue component of color, from 0 to 255.
         **/
        b: number;
        /**
         *
         **/
        private _g;
        /**
         * Gets or sets the Green component of color, from 0 to 255.
         **/
        /**
         * Gets or sets the Green component of color, from 0 to 255.
         **/
        g: number;
        /**
         * Returns a copy of the color with the specified alpha between 0 and 255.
         *
         * @param alpha
         */
        fade(alpha: number): Color;
        /**
         * Returns a copy of the color with the specified alpha between 0 and 1.
         *
         * @param alpha
         */
        fadeFloat(alpha: number): Color;
        /**
         * Gets a value indicating if the color is a dark color, by checking its perceived luminosity
         *
         * @returns {boolean}
         */
        isDark: boolean;
        /**
         * Gets a value indicating if the color is a light color, by checking its perceived luminosity
         *
         * @returns {boolean}
         */
        isLight: boolean;
        /**
         * Gets a value indicating if the color is transparent.
         **/
        isTransparent: boolean;
        /**
         * Returns the perceived luminosity
         * @returns {number}
         */
        perceivedLuminosity: number;
        /**
         *
         **/
        private _r;
        /**
         * Gets or sets the Red component of color, from 0 to 255.
         **/
        /**
         * Gets or sets the Red component of color, from 0 to 255.
         **/
        r: number;
    }
}
/**
 * Created by josemanuel on 2/6/14.
 */
declare module latte {
    /**
     *
     */
    class Culture {
        /**
         * Property field
         */
        private static _current;
        /**
         * Gets or sets the current culture of the system
         *
         * @returns {Culture}
         */
        /**
         * Gets or sets the current culture of the system
         *
         * @param {Culture} value
         */
        static current: Culture;
        /**
         * Field for esMX property
         */
        private static _esMx;
        /**
         * Gets the Español-Mexico Culture
         *
         * @returns {Culture}
         */
        static esMx: Culture;
        /**
         * Field for enUs property
         */
        private static _enUs;
        /**
         * Gets the English-USA Culture
         *
         * @returns {Culture}
         */
        static enUs: Culture;
        /**
         * Formats currency using the current culture
         * @param n
         * @returns {string}
         */
        static formatCurrency(n: number): string;
        /**
         * Formats a number using the current Culture
         * @param n
         * @param decimals
         * @param symbol
         * @returns {string}
         */
        static formatNumber(n: number, decimals?: number, symbol?: string): string;
        /**
         * Short date format
         */
        shortDateFormat: string;
        /**
         * Long date format
         */
        longDateFormat: string;
        /**
         * Amount of decimals to show in currency format
         */
        currencyDecimals: number;
        /**
         * Separator of decimals for currency
         */
        numberDecimalsSeparator: string;
        /**
         * Thousands separator for currency
         */
        numberThousandsSeparator: string;
        /**
         * Symbol to use in currency
         */
        currencySymbol: string;
        /**
         *
         */
        constructor();
        /**
         * Returns the specified number as a currency
         * @param n
         */
        onFormatCurrency(n: number): string;
        /**
         * Formats the specified number
         * @param n
         * @param decimals
         * @param symbol
         * @returns {string}
         */
        onFormatNumber(n: number, decimals?: number, symbol?: string): string;
    }
}
declare module latte {
    /**
     * Represents a specific date and time
     **/
    class DateTime {
        /**
         * Amount of days in months of a non-leap year
         **/
        static monthDays: number[];
        /**
         * Amount of days in months of leap year
         **/
        static monthDaysLeapYear: number[];
        /**
         * Returns the absolute number of days on the specified day-month-year
         **/
        static absoluteDays(year: number, month: number, day: number): number;
        /**
         * Returns the amount of days in the specified month of the specified year
         **/
        static daysInMonth(year: number, month: number): number;
        /**
         * Returns a DateTime object from the specifed date and time components
         **/
        static fromDateAndTime(date: DateTime, time: TimeSpan): DateTime;
        /**
         * Returns a DateTime object from the specified amount of milliseconds
         **/
        static fromMilliseconds(milliseconds: number): DateTime;
        /**
         * Creates a DateTime object from the specified string.
         String should be in the format <c>yyyy-mm-dd hh:mm:ss</c>
         **/
        static fromString(dateTimeString: string): DateTime;
        /**
         * Returns a value indicating if the specified year is leap year
         **/
        static isLeapYear(year: number): boolean;
        /**
         * Gets a DateTime representing the current millisecond
         **/
        static now: DateTime;
        /**
         * Gets a DateTime representing the current day without time component
         **/
        static today: DateTime;
        /**
         * Gets a DateTime representing the day of tomorrow without time component
         **/
        static tomorrow: DateTime;
        /**
         * Gets a DateTime representing the day of yesterday without time component
         **/
        static yesterday: DateTime;
        _span: TimeSpan;
        /**
         * Creates the DateTime object
         **/
        constructor(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number);
        /**
         * Prepends a zero to the number if lower than 10
         **/
        private _zeroPad(n);
        /**
         * Returns the specified element of date.
         Possible values for <c>what</c> are: <c>year</c> | <c>month</c> | <c>dayyear</c> | <c>day</c>
         **/
        private fromTimeSpan(what);
        /**
         * Returns the result of adding the specified timespan to this date
         **/
        add(timespan: TimeSpan): DateTime;
        /**
         * Returns the result of adding the specified amount of days to this date
         **/
        addDays(days: number): DateTime;
        /**
         * Returns the result of adding the specified amount of hours to this date
         **/
        addHours(hours: number): DateTime;
        /**
         * Returns the result of adding the specified amount of milliseconds to this date
         **/
        addMilliseconds(milliseconds: number): DateTime;
        /**
         * Returns the result of adding the specified amount of minutes to this date
         **/
        addMinutes(minutes: number): DateTime;
        /**
         * Returns the result of adding the specified amount of months to this date
         **/
        addMonths(months: number): DateTime;
        /**
         * Returns the result of adding the specified amount of seconds to this date
         **/
        addSeconds(seconds: number): DateTime;
        /**
         * Returns the result of adding the specified amount of years to this date
         **/
        addYears(years: number): DateTime;
        /**
         * Returns the result of comparing this datetime to the specified datetime
         **/
        compareTo(datetime: DateTime): number;
        /**
         * Returns just the date component of this datetime
         **/
        date: DateTime;
        /**
         * Gets a value indicating if the specified datetime is equals to this datetime
         **/
        equals(datetime: DateTime): boolean;
        /**
         * Returns a value indicating if the date is contained in the range specified by the arguments
         **/
        onRange(start: DateTime, end: DateTime): boolean;
        /**
         * Returns the result of subtracting the specified datetime to this datetime
         **/
        subtractDate(datetime: DateTime): TimeSpan;
        /**
         * Returns the result of subtracting the specified timespan to this datetime
         **/
        subtractTime(timespan: TimeSpan): DateTime;
        /**
         * Returns a relative representatio of the date, like "Yesterday 10:00AM"
         **/
        toRelativeString(): string;
        /**
         * Gets the day of this datetime
         **/
        day: number;
        /**
         * Gets the day of week this datetime. Sunday is 0 and Saturday is 6.
         **/
        dayOfWeek: number;
        /**
         * Gets the name of the day of the week
         * @returns {*}
         */
        dayOfWeekString: string;
        /**
         * Gets the day of year datetime
         **/
        dayOfYear: number;
        /**
         * Gets the hour of the datetime
         **/
        hour: number;
        /**
         * Gets the millisecond of the date
         **/
        millisecond: number;
        /**
         * Gets the minute of the time
         **/
        minute: number;
        /**
         * Gets the month of the date
         **/
        month: number;
        /**
         * Gets the name of the month of the date
         **/
        monthString: string;
        /**
         * Gets the second of the date
         **/
        second: number;
        /**
         * Gets the time component of this datetime
         **/
        timeOfDay: TimeSpan;
        /**
         * Returns a formatted string
         **/
        toFormattedString(): string;
        /**
         * Gets the DateTime as a string
         **/
        toString(): string;
        /**
         * Gets the week number of date. First week of year is 1
         **/
        weekOfYear: number;
        /**
         * Gets the year of the date
         **/
        year: number;
    }
}
declare module latte {
    class EventHandler {
        handler: Function;
        context: any;
        constructor(handler: Function, context: any);
    }
    /**
     * Manages events and event handlers
     */
    class LatteEvent {
        context: any;
        handlers: EventHandler[];
        /**
         * Raised when a handler is added to the event
         */
        _handlerAdded: LatteEvent;
        /**
         *
         * @param context Context where
         */
        constructor(context: any);
        /**
         * Gets the event for handler adding
         *
         * @returns {LatteEvent}
         */
        handlerAdded: LatteEvent;
        /**
         * Adds a handler to the event
         * @param handler
         */
        add(handler: Function, context?: any): void;
        /**
         * Raises the <c>handlerAdded</c> event
         * @param handler
         */
        onHandlerAdded(handler: Function): void;
        /**
         * Raises the actual event handlers.
         * @param parameter
         * @returns {*}
         */
        raise(...parameter: any[]): any;
    }
}
declare module latte {
    /**
     * Exception thrown when an argument of the function was invalid.
     *
     * Usage:
     * <example>
     *
     * function pow(a){
     *
     *      if(typeof a != 'number')
     *          // Inform user that the parameter was invalid
     *          throw new InvalidArgumentEx('a');
     *
     *      return a * a;
     *
     * }
     *
     * </example>
     */
    class InvalidArgumentEx extends Ex {
        argument: string;
        value: any;
        /**
         * Creates the exception
         *
         * @param argument
         * @param value
         */
        constructor(argument?: string, value?: any);
        /**
         * Returns a string explaining the exception
         *
         * @returns {string}
         */
        toString(): string;
    }
}
declare module latte {
    /**
     * Exception thrown when an argument of the function was invalid.
     *
     * Usage:
     * <example>
     *
     * function pow(a){
     *
     *      throw new latte.InvalidCallEx('pow')
     *
     * }
     *
     * </example>
     */
    class InvalidCallEx extends Ex {
        method: string;
        /**
         * Creates the Exception
         * @param method
         */
        constructor(method?: string);
        /**
         * Returns a string explaining the exception
         *
         * @returns {string}
         */
        toString(): string;
    }
}
declare module latte {
    /**
     * Handles hash navigation. This is designed to manage navigation of apps.

     Catch a handler to <c>hashChanged</c> event, and to alter the current hash path
     use the <c>Navigation.hash</c> property.
     **/
    class Navigation {
        /**
         *
         **/
        private static _hash;
        /**
         *
         **/
        private static _lock;
        /**
         * Hash represented as a path. It is updated every time the value of <c>hash</c> changes.
         **/
        static path: string[];
        /**
         * Raised when the navigation hash changed
         **/
        static hashChanged: LatteEvent;
        /**
         * Initializes the static class
         **/
        static staticConstructor(): void;
        /**
         * Gets or sets the current hash of the navigation.
         Optionally <c>silent</c> makes it without raising the <c>hashChanged<c> event.
         **/
        /**
         * Gets or sets the current hash of the navigation.
         Optionally <c>silent</c> makes it without raising the <c>hashChanged<c> event.
         **/
        static hash: string;
        /**
         * Gets or sets the current hash of the navigation.
         Optionally <c>silent</c> makes it without raising the <c>hashChanged<c> event.
         **/
        static setHash(value: string, silent?: boolean): typeof Navigation;
        /**
         * Raises the <c>hashChanged</c> event
         **/
        static onHashChanged(hash: string): void;
    }
}
declare module latte {
    /**
     * Reprsents a Rectangle
     **/
    class Rectangle {
        /**
         * Creates a rectangle with the specified left, right, top and bottom.
         **/
        static fromLRTB(left: number, right: number, top: number, bottom: number): Rectangle;
        /**
         * Height of rectangle
         **/
        private _height;
        /**
         * Left of rectangle
         **/
        private _left;
        /**
         * Top of rectangle
         **/
        private _top;
        /**
         * Width of rectangle
         **/
        private _width;
        /**
         *
         */
        private _tag;
        /**
         * Creates a rectangle with the specified left, top, width and height.
         **/
        constructor(left?: number, top?: number, width?: number, height?: number);
        /**
         * Returns the result of centering this into the specified container
         **/
        center(container: Rectangle): Rectangle;
        /**
         * Gets a value indicating if the specified point is contained
         **/
        contains(x: number, y: number): boolean;
        /**
         * Gets a value indicating if the rectangle is contained inside this rectangle
         **/
        containsRectangle(rectangle: Rectangle): boolean;
        /**
         * Returns the result of inflating the rectangle vertically and horizontally on each edge.
         **/
        inflate(horizontal: number, vertical: number): Rectangle;
        /**
         * Returns the rectangle result of intersecting this with passed rectangle
         **/
        intersection(rectangle: Rectangle): Rectangle;
        /**
         * Gets a value indicating if the rectangle intersects specified rectangle
         **/
        intersects(rectangle: Rectangle): boolean;
        /**
         * Returns a string describing the rectangle
         **/
        toString(): string;
        /**
         * Gets a rectangle representing the union of this rectangle and the passed one
         **/
        union(rectangle: Rectangle): Rectangle;
        /**
         * Gets or sets the right side of the rectangle
         **/
        /**
         * Gets or sets the right side of the rectangle
         **/
        bottom: number;
        /**
         * Gets or sets the height of the rectangle
         **/
        /**
         * Gets or sets the height of the rectangle
         **/
        height: number;
        /**
         * Gets or sets the left of the rectangle
         **/
        /**
         * Gets or sets the left of the rectangle
         **/
        left: number;
        /**
         * Gets or sets the right side of the rectangle
         **/
        /**
         * Gets or sets the right side of the rectangle
         **/
        right: number;
        tag: any;
        /**
         * Gets or sets the top of the rectangle
         **/
        /**
         * Gets or sets the top of the rectangle
         **/
        top: number;
        /**
         * Gets or sets the width of the rectangle
         **/
        /**
         * Gets or sets the width of the rectangle
         **/
        width: number;
    }
}
declare module latte {
    /**
     * Represents a time interval.
     **/
    class TimeSpan {
        millis: number;
        /**
         * Creates a TimeSpan from the specified amount of days
         **/
        static fromDays(days: number): TimeSpan;
        /**
         * Creates a TimeSpan from the specified amount of hours
         **/
        static fromHours(hours: number): TimeSpan;
        /**
         * Creates a TimeSpan from the specified amount of milliseconds
         **/
        static fromMilliseconds(milliseconds: number): TimeSpan;
        /**
         * Creates a TimeSpan from the specified amount of minutes
         **/
        static fromMinutes(minutes: number): TimeSpan;
        /**
         * Creates a TimeSpan from the specified amount of seconds
         **/
        static fromSeconds(seconds: number): TimeSpan;
        /**
         * Creates a TimeSpan object from the specified string.
         String should be in the format <c>hh:mm:ss</c>
         **/
        static fromString(timeString: string): TimeSpan;
        /**
         * Gets a timespan with the time passed since the specified date and time
         * @param d
         */
        static timeSince(d: DateTime): TimeSpan;
        /**
         * Creates the TimeSpan with the specified parameters. Parameters not specified will be asumed to be zero.
         **/
        constructor(days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number);
        /**
         * Makes math rounding depending on the sign of the milliseconds
         **/
        private _rounder(number);
        /**
         * Prepends a zero to the number if lower than 10
         **/
        private _zeroPad(n);
        /**
         * Returns the result of adding the specified timespan to this timespan
         **/
        add(timespan: TimeSpan): TimeSpan;
        /**
         * Returns the result of adding the specified amount of hours to this timespan
         **/
        addHours(hours: number): TimeSpan;
        /**
         * Returns the result of adding the specified amount of minutes to this timespan
         **/
        addMinutes(minutes: number): TimeSpan;
        /**
         * Returns the result of adding the specified amount of seconds to this timespan
         **/
        addSeconds(seconds: number): TimeSpan;
        /**
         * Returns the result of comparing this timespan against the provided timespan
         **/
        compareTo(timespan: TimeSpan): number;
        /**
         * Returns a timespan representing the actual duration of the timespan
         **/
        duration(): TimeSpan;
        /**
         * Returns a value indicating if this timespan represents the same than the specified timespan
         **/
        equals(timespan: TimeSpan): boolean;
        /**
         * Negates the timespan duration
         **/
        negate(): void;
        /**
         * Returns the result of subtracting the specified timespan to this timespan
         **/
        subtract(timespan: TimeSpan): TimeSpan;
        /**
         * Returns this timespan as a string
         **/
        toString(): string;
        /**
         * Gets the days component of the time interval represented by this object
         **/
        days: number;
        /**
         * Gets the hours component of the time interval represented by this object
         **/
        hours: number;
        /**
         * Gets a value indicating if the total time this timespan represents is zero
         **/
        isEmpty: boolean;
        /**
         * Gets the milliseconds component of the time interval represented by this object
         **/
        milliseconds: number;
        /**
         * Gets the minutes component of the time interval represented by this object
         **/
        minutes: number;
        /**
         * Gets the seconds component of the time interval represented by this object
         **/
        seconds: number;
        /**
         * Gets the value of this timespan expressed in whole and fractional days
         **/
        totalDays: number;
        /**
         * Gets the value of this timespan expressed in whole and fractional hours
         **/
        totalHours: number;
        /**
         * Gets the value of this timespan expressed in milliseconds
         **/
        totalMilliseconds: number;
        /**
         * Gets the value of this timespan expressed in whole and fractional minutes
         **/
        totalMinutes: number;
        /**
         * Gets the value of this timespan expressed in whole and fractional seconds
         **/
        totalSeconds: number;
    }
}
declare module latte {
    /**
     * Executes an action every specified amount of milliseconds
     **/
    class Timer {
        /**
         *
         **/
        private _callback;
        /**
         *
         **/
        private _context;
        /**
         *
         **/
        private _milliseconds;
        /**
         *
         **/
        private _paused;
        /**
         * Creates a timer that will call <c>callback</c> every specified amount of
         <c>milliseconds</c> on the specified <c>context</c>.
         **/
        constructor(callback: Function, milliseconds: number, context: any);
        /**
         * Gets or sets the function who will be called every tick
         **/
        /**
         * Gets or sets the function who will be called every tick
         **/
        callback: Function;
        /**
         * Gets or sets the context in which the function is executed
         **/
        /**
         * Gets or sets the context in which the function is executed
         **/
        context: any;
        /**
         * Gets or sets the milliseconds to sleep between calls
         **/
        /**
         * Gets or sets the milliseconds to sleep between calls
         **/
        milliseconds: number;
        /**
         * Pauses the timer
         **/
        pause(): void;
        /**
         * Starts ticking
         **/
        start(): void;
        /**
         * Ticks the timer. Executes the callback and programs next tick.
         **/
        tick(): void;
    }
}
declare module latte {
    class HEvent<T> {
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
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class Point {
        /**
         * Gets the distance between two points
         * @param a
         * @param b
         */
        static distance(a: Point, b: Point): number;
        /**
         * Returns an empty point
         * @returns {latte.Point}
         */
        static empty(): Point;
        /**
         * Returns a point situated on the origin
         * @returns {latte.Point}
         */
        static origin(): Point;
        /**
         * Creates a new point, optionally
         */
        constructor(x?: number, y?: number);
        /**
         * Returns the offset operation of the point
         *
         * @param x
         * @param y
         * @returns {latte.Point}
         */
        offset(x: number, y: number): Point;
        /**
         * Gets string representation of the point
         * @returns {string}
         */
        toString(): string;
        /**
         * Gets a value indicating if the point is empty (No value has been set)
         *
         * @returns {boolean}
         */
        isEmpty: boolean;
        /**
         * Property field
         */
        private _x;
        /**
         * Gets or sets the X of the point
         *
         * @returns {number}
         */
        x: number;
        /**
         * Property field
         */
        private _y;
        /**
         * Gets the Y coordinate of the point
         *
         * @returns {number}
         */
        y: number;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class Size {
        /**
         * Returns an empty size
         * @returns {latte.Size}
         */
        static empty(): Size;
        /**
         * Returns a size of zero width and zero height
         * @returns {latte.Point}
         */
        static zero(): Size;
        /**
         * Creates a new Size, optionally sets its Width and Height components
         */
        constructor(width?: number, height?: number);
        /**
         * Inflates the size on the specified width and height
         *
         * @param width
         * @param height
         * @returns {latte.Size}
         */
        inflate(width: number, height: number): Size;
        /**
         * Inflates the size uniformly
         * @param wide
         */
        inflateUniform(wide: number): Size;
        /**
         * Gets string representation of the size
         * @returns {string}
         */
        toString(): string;
        /**
         * Gets the area represented by the size
         *
         * @returns {number}
         */
        area: number;
        /**
         * Gets a value indicating if the size has no compnents assigned or initialized
         *
         * @returns {boolean}
         */
        isEmpty: boolean;
        /**
         * Property field
         */
        private _height;
        /**
         * Gets the Height component of the size
         *
         * @returns {number}
         */
        height: number;
        /**
         * Property field
         */
        private _width;
        /**
         * Gets the Width component of the size
         *
         * @returns {number}
         */
        width: number;
    }
}
declare module latte {
    /**
     * represents an action
     **/
    class Action {
        /**
         *
         **/
        private _buttons;
        /**
         *
         **/
        private _checked;
        /**
         *
         **/
        private _description;
        /**
         *
         **/
        private _enabled;
        /**
         *
         **/
        private _icon;
        /**
         *
         **/
        private _text;
        /**
         * Contains sub-actions of the icon
         **/
        actions: Collection<Action>;
        /**
         * Raised when the action is clicked or invoked.
         **/
        execute: LatteEvent;
        /**
         * Creates the action
         **/
        constructor(text?: string, icon?: IconItem, execute?: () => any, description?: string);
        /**
         * Gets or sets a value indicating if the action is currently checked
         **/
        /**
         * Gets or sets a value indicating if the action is currently checked
         **/
        checked: boolean;
        /**
         * Gets or sets the description of the action
         **/
        /**
         * Gets or sets the description of the action
         **/
        description: string;
        /**
         * Gets or sets a value indicating if the action is currently enabled
         **/
        /**
         * Gets or sets a value indicating if the action is currently enabled
         **/
        enabled: boolean;
        /**
         * Gets a <c>ButtonItem</c> representation of the action
         **/
        getButton(): ButtonItem;
        /**
         * Gets or sets the 16 x 16 icon of the action
         **/
        /**
         * Gets or sets the 16 x 16 icon of the action
         **/
        icon: IconItem;
        /**
         * Gets or sets the text of the action
         **/
        /**
         * Gets or sets the text of the action
         **/
        text: string;
    }
}
declare module latte {
    /**
     * Manages z-index related positions
     <b style="color:darkred">This class should not be used directly because it is likely to disappear in future version</b>
     **/
    class ZIndex {
        /**
         * Array of elements that are being handled by class
         **/
        static elements: JQuery[];
        /**
         * Brings the specified element to the top
         **/
        static bringToFront(element: JQuery): void;
        /**
         * Remove elemet from elements, and erase z-index
         **/
        static removeElement(element: JQuery): void;
        /**
         * Updates the z-indexes of elements
         **/
        static updateZIndexes(): void;
    }
}
/**
 * Created by josemanuel on 7/1/14.
 */
declare module latte {
    /**
     *
     */
    class ColorIconItem extends IconItem {
        /**
         *
         */
        constructor(color: Color, size?: number);
        /**
         * Property field
         */
        private _color;
        /**
         * Gets or sets the color of the icon
         *
         * @returns {Color}
         */
        /**
         * Gets or sets the color of the icon
         *
         * @param {Color} value
         */
        color: Color;
    }
}
declare module latte {
    /**
     * Provides an icon from provided built-in glyphs to indicate graphical actions.
     **/
    class Glyph extends IconItem {
        /**
         * URL used for glyphs sprite
         **/
        static defaultUrl: string;
        /**
         * Returns the glyph specified by its location
         **/
        private static _byLocation(u, v, name);
        /**
         * Gets an empty glyph
         **/
        static add: Glyph;
        /**
         * Gets an empty glyph
         **/
        static check: Glyph;
        /**
         * Gets a checked glyph
         **/
        static checked: Glyph;
        /**
         * Gets a checked glyph
         **/
        static checkedRadio: Glyph;
        /**
         * Gets a chevron glyph
         **/
        static chevron: Glyph;
        /**
         * Gets a collapse glyph
         **/
        static collapse: Glyph;
        /**
         * Gets collapse icon for ribbon glyph
         **/
        static collapseRibbon: Glyph;
        /**
         *
         * @returns {Glyph}
         */
        static collapseWidget: Glyph;
        /**
         *
         * @returns {Glyph}
         */
        static expandWidget: Glyph;
        /**
         * Gets a dismiss glyph
         **/
        static dismiss: Glyph;
        /**
         * Gets a down arrow glyph
         **/
        static down: Glyph;
        /**
         * Gets an expand glyph
         **/
        static expand: Glyph;
        /**
         * Gets a grip glyph
         **/
        static grip: Glyph;
        /**
         * Gets a left arrow glyph
         **/
        static left: Glyph;
        /**
         * Gets a maximize glyph
         **/
        static maximize: Glyph;
        /**
         * Gets a minimize glyph
         **/
        static minimize: Glyph;
        /**
         * Gets note glyph
         **/
        static note: Glyph;
        /**
         * Gets a right arrow glyph
         **/
        static right: Glyph;
        /**
         * Gets a checked glyph
         **/
        static unchecked: Glyph;
        /**
         * Gets a checked glyph
         **/
        static uncheckedRadio: Glyph;
        /**
         * Gets an up arrow glyph
         **/
        static up: Glyph;
        /**
         * Creates the glyph
         **/
        constructor();
    }
}
declare module latte {
    class ImageItem extends Item {
        /**
         *
         */
        private _autoSize;
        /**
         *
         */
        imageElement: JQuery;
        /**
         *
         */
        constructor();
        /**
         *
         * @returns {boolean}
         */
        /**
         *
         * @param value
         */
        autoSize: boolean;
        /**
         *
         * @returns {string|JQuery}
         */
        /**
         *
         * @param value
         */
        src: string;
    }
}
declare module latte {
    /**
     * Renders a separator for various purposes.
     **/
    class SeparatorItem extends Item {
        /**
         *
         **/
        private _text;
        /**
         * Creates the separator
         **/
        constructor();
        /**
         * Gets or sets the text of the separator
         **/
        /**
         * Gets or sets the text of the separator
         **/
        text: string;
    }
}
declare module latte {
    /**
     * ButtonGroup with pagination information
     **/
    class PaginationItem extends ButtonGroupItem {
        /**
         *
         **/
        private _page;
        /**
         *
         **/
        private _pages;
        /**
         *
         **/
        btnCurrent: ButtonItem;
        /**
         *
         **/
        btnNext: ButtonItem;
        /**
         *
         **/
        btnPrevious: ButtonItem;
        /**
         * Raised when page changes
         **/
        pageChanged: LatteEvent;
        /**
         *
         **/
        constructor();
        /**
         * Navigates to next page, if possible.
         **/
        nextPage(): void;
        /**
         * Raises the <c>pageChanged</c> event
         **/
        onPageChanged(): void;
        /**
         * Navigates to the previous page, if possible.
         **/
        previousPage(): void;
        txtPage_enterPressed(): void;
        /**
         * Gets or sets the current page
         **/
        /**
         * Gets or sets the current page
         **/
        page: number;
        /**
         * Gets the current page.
         * @returns {number}
         */
        getPage(): number;
        /**
         * Sets the current page.
         * Optionally omits the <c>pageChanged</c> event trigger.
         * @param value
         * @param silent
         */
        setPage(value: number, silent?: boolean): void;
        /**
         * Gets or sets the amount of pages for navigation
         **/
        /**
         * Gets or sets the amount of pages for navigation
         **/
        pages: number;
        private _txtPage;
        txtPage: TextboxItem;
        /**
         * Fields for lblPages property.
         */
        private _lblPages;
        /**
         * Gets a value indicating
         */
        lblPages: LabelItem;
        /**
         * Fields for btnGo property.
         */
        private _btnGo;
        /**
         * Gets a value indicating
         */
        btnGo: ButtonItem;
        /**
         * Fields for btnOverlay property.
         */
        private _btnOverlay;
        /**
         * Gets a value indicating
         */
        btnOverlay: ButtonItem;
    }
}
declare module latte {
    /**
     * Represents a selectable tab
     **/
    class TabItem extends ButtonItem {
        private _active;
        private _contentSide;
        /**
         * Raised when the value of the <c>active</c> property changes
         */
        activeChanged: LatteEvent;
        /**
         * Raised when the value of the <c>
         */
        contentSideChanged: LatteEvent;
        /**
         * Creates the tab
         **/
        constructor(text?: string, icon?: IconItem, click?: Function, tab?: any);
        private _applyActiveProperties();
        /**
         * Raises the activeChanged event.
         */
        onActiveChanged(): void;
        /**
         * Gets a value indicating if the tab is currently active.
         * @returns {boolean}
         */
        /**
         * Sets a value indicating if the tab is currently active.
         * @param value
         */
        active: boolean;
        /**
         * Gets the side where content is shown. So tab is drawn accordingly.
         *
         * @returns {Side}
         */
        /**
         * Sets the side where content is shown. So tab is drawn accordingly.
         * @param value
         */
        contentSide: Side;
    }
}
/**
 * Created by josemanuel on 3/21/14.
 */
declare module latte {
    /**
     * Used to model swatches on the palettes
     */
    interface ColorPickerSwatch {
        /**
         * Bounds of swatch in canvas
         */
        bounds: Rectangle;
        /**
         * Color of swatch
         */
        color: Color;
    }
    /**
     *
     */
    class ColorPicker extends ItemStack {
        /**
         *
         */
        constructor();
        /**
         * Handles mouse move on canvas
         * @param screenX
         * @param screenY
         */
        canvasMouseMove(screenX: number, screenY: number): void;
        /**
         * Handles mouse down on canvas
         * @param screenX
         * @param screenY
         */
        canvasMouseDown(screenX: number, screenY: number): void;
        /**
         * Draws the palette
         */
        drawPalette(): void;
        /**
         * Raises the <c>color</c> event
         */
        onColorChanged(): void;
        /**
         * Override.
         */
        onLayout(): void;
        /**
         * Gets the swatch at the specified point (if any)
         * @param screenX
         * @param screenY
         * @returns {*}
         */
        swatchAt(screenX: number, screenY: number): ColorPickerSwatch;
        /**
         * Back field for event
         */
        private _colorChanged;
        /**
         * Gets an event raised when the value of the color property changes
         *
         * @returns {LatteEvent}
         */
        colorChanged: LatteEvent;
        /**
         * Field for canvas property
         */
        private _canvas;
        /**
         * Gets the canvas where color palette is drawn
         *
         * @returns {JQuery}
         */
        canvas: JQuery;
        /**
         * Field for lblIndicator property
         */
        private _lblIndicator;
        /**
         * Gets the color indicator label
         *
         * @returns {LabelItem}
         */
        lblIndicator: LabelItem;
        /**
         * Field for toolbar property
         */
        private _toolbar;
        /**
         * Gets the toolbar
         *
         * @returns {Toolbar}
         */
        toolbar: Toolbar;
        /**
         * Field for txtHex property
         */
        private _txtHex;
        /**
         * Gets the textbox item
         *
         * @returns {TextboxItem}
         */
        txtHex: TextboxItem;
        /**
         * Property field
         */
        private _color;
        /**
         * Gets or sets the selected color of the picker
         *
         * @returns {Color}
         */
        /**
         * Gets or sets the selected color of the picker
         *
         * @param {Color} value
         */
        color: Color;
        /**
         * Field for context property
         */
        private _context;
        /**
         * Gets the context for rendering
         *
         * @returns {CanvasRenderingContext2D}
         */
        context: CanvasRenderingContext2D;
        /**
         * Field for swatches property
         */
        private _swatches;
        /**
         * Gets the swatches on the canvas
         *
         * @returns {ColorPickerSwatch[]}
         */
        swatches: ColorPickerSwatch[];
    }
}
declare module latte {
    /**
     * Renders a conversation made of <c>CommentItem</c>s, allowing the user to add comments.
     **/
    class ConversationItem extends Item {
        /**
         *
         **/
        private _allowNewComments;
        /**
         *
         **/
        private _invisible;
        /**
         *
         **/
        private _pendentPages;
        /**
         * Collection of comments in conversation
         **/
        comments: Collection<CommentItem>;
        /**
         * Points to the DOM element where comments are stored.
         **/
        commentsElement: JQuery;
        /**
         * Points to the DOM element where the new comment textarea is placed.
         **/
        newCommentElement: JQuery;
        /**
         * Points to the DOM element where hidden comments text is placed.
         **/
        pendentPagesElement: JQuery;
        /**
         * Textbox for new comments
         **/
        textbox: TextboxItem;
        /**
         * Raised when a new comment is added. The text of the comment is passed as an argument.
         **/
        commentAdded: LatteEvent;
        /**
         * Raised when comments are added or removed from collection
         **/
        commentsChanged: LatteEvent;
        /**
         * Raised when the user asks for the hidden comments of conversation
         **/
        pendentPagesSolicited: LatteEvent;
        /**
         * Creates the conversation
         **/
        constructor();
        /**
         * Sets the textbox of the comment editor.
         * This method is useful for replacing the default textbox for a custom one.
         *
         * @param t
         */
        setTextbox(t: TextboxItem): void;
        /**
         *
         **/
        _onAddComment(comment: CommentItem): void;
        /**
         *
         **/
        private _onRemoveComment(comment);
        /**
         * Raises the <c>commentAdded</c> event
         **/
        onCommentAdded(text: string): boolean;
        /**
         *
         **/
        onCommentsChanged(): void;
        /**
         * Raises the <c>pendentPagesRequested</c> event
         **/
        onHiddenCommentsRequested(): void;
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(): void;
        /**
         * Raises the <c>pendentPagesSolicited</c> event
         **/
        onPendentPagesSolicited(): void;
        /**
         * Prepends the specified comment
         **/
        prependComment(comment: CommentItem): void;
        /**
         * Gets or sets a value indicating if the user may add new comments
         **/
        /**
         * Gets or sets a value indicating if the user may add new comments
         **/
        allowNewComments: boolean;
        /**
         * Property field
         */
        private _ignoreEnter;
        /**
         * Gets or sets a value indicating if the enter key should be ignored.
         * Used for allowing user to hit enter on selecting users from auto-complete
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the enter key should be ignored.
         * Used for allowing user to hit enter on selecting users from auto-complete
         *
         * @param {boolean} value
         */
        ignoreEnter: boolean;
        /**
         * Gets or sets the number of hidden comments in conversation
         **/
        /**
         * Gets or sets the number of hidden comments in conversation
         **/
        pendentPages: number;
    }
}
declare module latte {
    /**
     * Shows a calendar to pick a date or a date range.
     **/
    class DateItem extends Item {
        /**
         *
         **/
        private _columns;
        /**
         *
         **/
        private _draggingSelection;
        /**
         *
         **/
        private _rows;
        /**
         *
         **/
        private _selectionEnd;
        /**
         *
         **/
        private _selectionMode;
        /**
         *
         **/
        private _selectionStart;
        /**
         *
         **/
        nextButton: ButtonItem;
        /**
         *
         **/
        previousButton: ButtonItem;
        /**
         * Points to the TABLE element where months are placed
         **/
        table: JQuery;
        /**
         * Raised when <c>selectionStart</c> or <c>selectionEnd</c> properties value change.
         **/
        selectionChanged: LatteEvent;
        /**
         * Raised when <c>selectionEnd</c> property changes.
         **/
        selectionEndChanged: LatteEvent;
        /**
         * Raised when <c>selectionStart</c> property changes.
         **/
        selectionStartChanged: LatteEvent;
        /**
         * Raised when <c>selectionMode</c> property changes.
         **/
        selectionModeChanged: LatteEvent;
        /**
         * Creates the Item
         **/
        constructor();
        /**
         * Creates a month. January is 1, december is 12.
         **/
        private _createMonth(year, month);
        /**
         *
         **/
        private _dayMouseDown(e, day);
        /**
         *
         **/
        private _dayMouseMove(e, day);
        /**
         *
         **/
        private _dayMouseUp(e, day);
        /**
         * Marks the specified day in calendar as selected
         **/
        private _selectDay(date);
        /**
         *
        **/
        getSelectionStart(): DateTime;
        /**
         * Returns a value indicating if the specified date is currently visible in the date range.
         **/
        isOnDisplay(date: DateTime): boolean;
        /**
         *
         **/
        onSelectionChanged(): void;
        /**
         *
         **/
        onSelectionEndChanged(): void;
        /**
         *
         **/
        onSelectionModeChanged(): void;
        /**
         *
         **/
        onSelectionStartChanged(): void;
        /**
         * SPECIAL GETTER
         Gets or sets the end of selection
         **/
        getSelectionEnd(): DateTime;
        /**
         * SPECIAL SETTER
         Gets or sets the end of selection
         **/
        setSelectionEnd(value?: DateTime, raiseEvent?: boolean): void;
        /**
         * Sets the selection range.
         If <c>start</c> is not on view, view will be taken to the <c>start</c>'s month
         Optionally rebuilds the calendar rows and columns.
         Optionally raises events.
         **/
        setSelectionRange(start: DateTime, end: DateTime, rebuild?: boolean, raiseEvents?: boolean): void;
        /**
         * Sets the start of selection
         **/
        setSelectionStart(value?: DateTime, raiseEvent?: boolean): void;
        /**
         * Sets the view start
         **/
        setViewStart(date: DateTime): void;
        /**
         * Unselects all dates on display
         **/
        unselectAll(): void;
        /**
         * Moves the view to the next set of months
         **/
        viewNext(): void;
        /**
         * Moves the view to the previous set of months
         **/
        viewPrevious(): void;
        /**
         * Gets or sets the number of columns of months
         **/
        /**
         * Gets or sets the number of columns of months
         **/
        columns: number;
        /**
         * Gets the size of a month as an object {width, height}
         **/
        monthSize: any;
        /**
         * Gets or sets the number of rows of months
         **/
        /**
         * Gets or sets the number of rows of months
         **/
        rows: number;
        /**
         * Gets or sets the end of selection
         **/
        /**
         * Gets or sets the end of selection
         **/
        selectionEnd: DateTime;
        /**
         * Gets or sets the selection mode
         **/
        /**
         * Gets or sets the selection mode
         **/
        selectionMode: DateSelectionMode;
        /**
         * Gets or sets the start of selection
         **/
        /**
         * Gets or sets the start of selection
         **/
        selectionStart: DateTime;
        /**
         * Gets the first day on view
         **/
        viewEnd: DateTime;
        /**
         * Gets the first day on view
         **/
        viewStart: DateTime;
    }
}
declare module latte {
    /**
     *
     **/
    class FormItem extends ItemStack {
        /**
         *
         **/
        private _faceVisible;
        /**
         *
         **/
        private _readOnly;
        /**
         * Input items of the form
         **/
        inputs: Collection<InputItem>;
        /**
         * Holds the title element of the form
         **/
        titleLabel: LabelItem;
        /**
         *
         **/
        constructor();
        /**
         *
         **/
        private _onAddInput(input);
        /**
         *
         **/
        private _onRemoveInput(input);
        /**
         * Returns an input by its assigned name
         **/
        byName(name: string): InputItem;
        /**
         * Gets an object with the values of fields
         **/
        getValues(): any;
        /**
         * Sets the direction of Inputs
         * @param d
         */
        setDirection(d: Direction): void;
        /**
         * Gets or sets the with of the text parts.
         * Value must be percent since it must be leveled with value part. Value size will be adjusted
         * to 5% less large than it should to avoid edge collisions.
         * Values lower than 1 accepted.
         * Note that when horizontal input, layout may become affected.
         *
         */
        setTextWidth(value: number): void;
        /**
         * Back field for event
         */
        private _valueChanged;
        /**
         * Gets an event raised when the value of an input is changed
         *
         * @returns {LatteEvent}
         */
        valueChanged: LatteEvent;
        /**
         * Raises the <c>valueChanged</c> event
         */
        onValueChanged(): void;
        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        faceVisible: boolean;
        /**
         * Gets or sets a value indicating if the inputs in the form are read-only
         **/
        /**
         * Gets or sets a value indicating if the inputs in the form are read-only
         **/
        readOnly: boolean;
        /**
         * Gets or sets the title of the form
         **/
        /**
         * Gets or sets the title of the form
         **/
        title: string;
        /**
         * Gets a value of checking every input in <c>inputs</c> to be valid
         **/
        valid: boolean;
    }
}
declare module latte {
    class HtmlEditorCommands {
        /**
         * Swaps selection boldness
         */
        static BOLD: string;
        /**
         * Wraps seletion into CODE tag
         */
        static CODE: string;
        /**
         * Clears all formatting on fonts and colors
         */
        static CLEAR_FORMAT: string;
        /**
         * Formats the block as something
         */
        static FORMAT_BLOCK: string;
        /**
         * Swaps selection italics
         */
        static ITALIC: string;
        /**
         * Makes selectikon super-script
         */
        static SUPER_SCRIPT: string;
        /**
         * Makes selection sub-script
         */
        static SUB_SCRIPT: string;
        /**
         * Aligns text to left
         */
        static JUSTIFY_LEFT: string;
        /**
         * Centers text
         */
        static JUSTIFY_CENTER: string;
        /**
         * Aligns text to right
         */
        static JUSTIFY_RIGHT: string;
        /**
         * Justifies text
         */
        static JUSTIFY_FULL: string;
        /**
         * Decreases indent
         */
        static OUTDENT: string;
        /**
         * Increases indent
         */
        static INDENT: string;
        /**
         * Shows a dialog to insert HTML
         */
        static INSERT_HTML: string;
        /**
         * Inserts an image
         */
        static INSERT_IMAGE: string;
        /**
         * Inserts a link
         */
        static INSERT_LINK: string;
        /**
         * Inserts an ordered list
         */
        static INSERT_ORDERED_LIST: string;
        /**
         * Inserts an unordered list
         */
        static INSERT_UNORDERED_LIST: string;
        /**
         * Shows a dialog to insert a YouTube video
         */
        static INSERT_YOUTUBE: string;
        /**
         * Unerlines selection
         */
        static UNDERLINE: string;
    }
}
declare module latte {
    /**
     * Html Editor. Loads the <c>rangy</c> plugin.

     For specification of <c>rangy</c> objects refer to:
     <a href="http://code.google.com/p/rangy/w/list" target=_blank>http://code.google.com/p/rangy/w/list</a>
     **/
    class HtmlEditorItem extends ValueItem {
        static rangyLoaded: boolean;
        /**
         *
         **/
        private _ready;
        /**
         * Value is stored here while not ready.
         **/
        private _value;
        /**
         * Points to the iframe of the editor
         **/
        iframe: JQuery;
        /**
         * Toolbar of basic commands
         **/
        toolbar: Toolbar;
        /**
         * Raised when the editor gets focus
         **/
        focus: LatteEvent;
        /**
         * Raised when the selection of editor changes
         **/
        selectionChanged: LatteEvent;
        /**
         * Raised when an image in the editor is selected
         **/
        imageSelected: LatteEvent;
        /**
         * Creates the editor.
         **/
        constructor();
        /**
         * Creates default buttons
         **/
        private _addToolbarButtons();
        /**
         *
         **/
        private _assignElementHandlers();
        /**
         * Returns a value indicating if the editor can be initialized.
         It can be initialized when its attached to the DOM.
         **/
        private _canInit();
        /**
         * Clears all formatting in editor
         **/
        private _clearFormatting();
        /**
         * Tries to convert the passed object to a node
         **/
        private _ensureNode(obj);
        /**
         * Tries to get the editor ready. Returns if control is ready after call.
         **/
        private _ensureReady();
        /**
         * Initializes the editor, if possible.
         **/
        private _initEditor();
        /**
         * Shows a dialog to insert HTML
         **/
        private _insertHTML();
        /**
         * Inserts an image, asking for the URL
         **/
        private _insertImage(value?);
        /**
         * Inserts a link, asking for the Url
         **/
        private _insertLink();
        /**
         * Shows a dialog to insert a YouTube video
         **/
        private _insertYouTube();
        /**
         * Returns a value indicating if editor must be initialized.
         It happens every time its dettached from DOM.
         **/
        private _mustInit();
        /**
         * Gets the body of the iframe
         **/
        body(): JQuery;
        /**
         * Gets the JavaScript document's object of iframe.
         **/
        document(): Document;
        /**
         * Executes the specified command
         **/
        execCommand(command: string, value?: any): void;
        /**
         *
         **/
        getValue(): string;
        /**
         * Inserts the specified node at the currently selected range.
         Returns the inserted node, or <c>null</c> if not possible.
         **/
        insertElement(element: any): JQuery;
        /**
         * Raises the <c>focus</c> event
         **/
        onFocus(): void;
        /**
         * Raises the <c>imageSelected</c> event
         **/
        onImageSelected(image: JQuery): void;
        /**
         * Overriden.
         **/
        onLayout(): void;
        /**
         * Raises the <c>selectionChanged</c> event.
         **/
        onSelectionChanged(): void;
        /**
         * Overriden.
         **/
        onValueChanged(): void;
        /**
         * Gets a value indicating if the editor is ready to be used as editor.
         While the editor is not ready, all data will be displayed in a non-editable element.
         **/
        ready(): boolean;
        /**
         * Selects the specified element and returns it as a jQuery object.
         **/
        selectElement(element: any): JQuery;
        /**
         * Selects the contents of the specified node and returns the element as a jQuery object.
         **/
        selectElementContents(element: any): JQuery;
        /**
         * Gets the current selection
         **/
        selection: RangySelection;
        /**
         * Gets the element where selection ends.
         **/
        selectionEnd(): JQuery;
        /**
         * Returns the parent of selection, passing the specified <c>selector</c>
         to the jQuery <c>parents()<c> method.
         **/
        selectionParents(selector?: string): JQuery;
        /**
         * Gets the element where selection starts.
         **/
        selectionStart(): JQuery;
        /**
         * Override.
         **/
        setValue(value: string): void;
        /**
         * Surrounds selected contents with specified element, and returns the
         attached element as a jQuery object.
         **/
        surroundSelectionWith(element: any): JQuery;
        /**
         * Gets the range of selection. Returns <c>null</c> if no current selection.
         **/
        selectionRange: RangyRange;
        /**
         * Gets or sets the source html
         */
        /**
         * Gets or sets the source html
         */
        value: string;
        /**
         * Gets the Window of the iframe
         **/
        window: any;
    }
}
declare module latte {
    /**
     * Renders a Ribbon.

     Ribbons are toolbars with tabbed views of tools and a button called <c>startButton</c>.
     **/
    class Ribbon extends Item {
        /**
         *
         **/
        private _lastWrapper;
        /**
         *
         */
        private _selectedTab;
        /**
         *
         **/
        collapseButton: ButtonItem;
        /**
         *
         **/
        face: JQuery;
        /**
         * Collection of items in the Ribbon
         **/
        items: Collection<Item>;
        /**
         *
         **/
        itemsContainer: JQuery;
        /**
         * Holds the pointer to the start button of the ribbon
         **/
        startButton: ButtonItem;
        /**
         * Collection of tabs in the Ribbon
         **/
        tabs: Collection<TabItem>;
        /**
         *
         **/
        tabsElement: JQuery;
        /**
         * Raised when <c>collapsed</c> value changes
         **/
        collapsedChanged: LatteEvent;
        /**
         * Raised when <c>selectedTab()</c> value changes.
         **/
        selectedTabChanged: LatteEvent;
        /**
         * Creates the Ribbon
         **/
        constructor();
        /**
         * Adds the item to the face of ribbon
         **/
        private _addToFace(item);
        private _cutLastWrapper();
        /**
         * Creates a wrapper for grouping items on ribbon's face
         **/
        private _addWrappedItem(item);
        /**
         *
         **/
        private _clearTabsMarks();
        /**
         * Gets the tab for the specified item
         **/
        private _getItemTab(item);
        /**
         * Tells if the item should be wrapped
         **/
        private _goesWrapped(item);
        /**
         *
         **/
        private _onAddItem(item);
        /**
         *
         **/
        private _onAddTab(tab);
        /**
         *
         **/
        private _onRemoveItem(item);
        /**
         *
         **/
        private _onRemoveTab(tab);
        /**
         * Adds a tab with the specified text
         **/
        addTab(text: string): TabItem;
        /**
         * Adds a separator on the specified tab
         * @param tab
         */
        addSeparator(tab: TabItem): void;
        /**
         * Raises the <c>collapsedChanged</c> event
         **/
        onCollapsedChanged(): void;
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(): void;
        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged(): void;
        /**
         * Gets or sets a value indicating if the ribbon is currently collapsed
         **/
        /**
         * Gets or sets a value indicating if the ribbon is currently collapsed
         **/
        collapsed: boolean;
        /**
         * Gets or sets a value indicating if the ribbon face is visible
         **/
        /**
         * Gets or sets a value indicating if the ribbon face is visible
         **/
        faceVisible: boolean;
        /**
         * Field for itemsInGroup property.
         */
        private _itemsInGroup;
        /**
         * Gets or sets the number of items in groups
         */
        /**
         * Gets or sets the number of items in groups
         */
        itemsInGroup: number;
        /**
         * Gets or sets the currently selected Tab
         **/
        /**
         * Gets or sets the currently selected Tab
         **/
        selectedTab: TabItem;
    }
}
declare module latte {
    /**
     * Stack of items. It unselects siblings when a selectable within is selected
     */
    class SelectableStack extends ItemStack {
        private _selectedItem;
        private _selectedItemChanged;
        /**
         * Creates the item
         */
        constructor();
        /**
         * Clears the current selection
         */
        clearSelection(): void;
        /**
         * Adds selection handlers
         * @param item
         */
        onAddItem(item: Item): void;
        /**
         * Raises the <c>selectedItemChanged</c> event
         */
        onSelectedItemChanged(): void;
        /**
         * Gets the selected item of the stack
         *
         * @returns {SelectableItem}
         */
        selectedItem: SelectableItem;
        /**
         * Gets an event raised when
         * @returns {LatteEvent}
         */
        selectedItemChanged: LatteEvent;
    }
}
declare module latte {
    class TabContainer extends ItemStack {
        tabToolbar: TabToolbar;
        tabs: Collection<TabItem>;
        content: Collection<Item>;
        selectedTabChanged: LatteEvent;
        constructor();
        private updateVisibility();
        /**
         *
         **/
        onTabAdded(tab: TabItem): void;
        /**
         *
         **/
        onTabRemoved(tab: TabItem): void;
        /**
         *
         * @param item
         */
        onContentAdded(item: Item): void;
        /**
         *
         * @param item
         */
        onContentRemoved(item: Item): void;
        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged(): void;
        /**
         * Gets or sets the selected tab of the view
         **/
        /**
         * Gets or sets the selected tab of the view
         **/
        selectedTab: TabItem;
        /**
         * Gets the side where content should be relative to the tabs
         * @returns {Side}
         */
        /**
         * Sets the side where content should be relative to the tabs
         * @param value
         */
        contentSide: Side;
    }
}
declare module latte {
    /**
     * Toolbar specialized on showing tabs.
     *
     * This toolbar is necessary because of the rendering styles applied to tabs to make the
     * graphical "tab" effect.
     */
    class TabToolbar extends Toolbar {
        private _selectedTab;
        private _contentSide;
        /**
         * Collection of tabs
         */
        tabs: Collection<TabItem>;
        /**
         * Raised when a tab is selected
         **/
        selectedTabChanged: LatteEvent;
        /**
         * Creates the toolbar
         */
        constructor();
        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged(): void;
        /**
         * Handles tab adding
         * @param tab
         */
        onTabAdded(tab: TabItem): void;
        /**
         * Handles tab removing
         * @param tab
         */
        onTabRemoved(tab: TabItem): void;
        /**
         * Gets the current content side
         * @returns {Side}
         */
        /**
         * Sets the content side of tabs
         * @param value
         */
        contentSide: Side;
        /**
         * Gets the selected tab of the toolbar
         * @returns {TabItem}
         */
        /**
         * Sets the selected tab of the toolbar
         * @param value
         */
        selectedTab: TabItem;
    }
}
declare module latte {
    /**
     * An Item for containing a View
     **/
    class ViewItem extends Item {
        /**
         *
         **/
        private _autoHeight;
        /**
         *
         **/
        private _view;
        /**
         * Creates the Item, optionally specifies the view to contain.
         **/
        constructor(view?: View);
        /**
         * Gets or sets a value indicating if the item's height will be adjusted
         to the contents of the view.

         This is achieved by setting the bottom CSS property of the View and its container to 'inherit'
         **/
        /**
         * Gets or sets a value indicating if the item's height will be adjusted
         to the contents of the view.

         This is achieved by setting the bottom CSS property of the View and its container to 'inherit'
         **/
        autoHeight: boolean;
        /**
         * Gets or sets the height of the item, and so the view
         **/
        /**
         * Gets or sets the height of the item, and so the view
         **/
        height: number;
        /**
         * Gets or sets the View inside this item
         **/
        /**
         * Gets or sets the View inside this item
         **/
        view: View;
    }
}
declare module latte {
    /**
     * Represents a widget.

     Widgets are like small windows who can be maximized, minimized and dragged around.
     **/
    class WidgetItem extends Item {
        /**
         *
         **/
        private _allowClose;
        /**
         *
         **/
        private _allowMaximize;
        /**
         *
         **/
        private _allowMinimize;
        /**
         *
         **/
        private _minimized;
        /**
         * Button for closing widget
         **/
        closeButton: ButtonItem;
        /**
         * Collection of items in widget
         **/
        items: Collection<Item>;
        /**
         * Button for maximizing the widget
         **/
        maximizeButton: ButtonItem;
        /**
         * Button for minimizing the widget
         **/
        minimizeButton: ButtonItem;
        /**
         * Collection of options of widget
         **/
        options: Collection<Item>;
        /**
         * Button for options
         **/
        optionsButton: ButtonItem;
        /**
         * Stack of items in the widget
         **/
        stack: ItemStack;
        /**
         * Label where title is placed
         **/
        titleLabel: LabelItem;
        /**
         * Bottom toolbar
         **/
        toolbar: Toolbar;
        /**
         * Top toolbar
         **/
        topToolbar: Toolbar;
        /**
         * Raised when the widget has been closed
         **/
        closed: LatteEvent;
        /**
         * Raised when the widget has been maximized
         **/
        maximized: LatteEvent;
        /**
         * Raised when the widget has been minimized
         **/
        minimizedChanged: LatteEvent;
        /**
         * Creates the widget
         **/
        constructor();
        /**
         *
         **/
        private _onAddItem(item);
        /**
         *
         **/
        private _onAddOption(item);
        /**
         *
         **/
        private _onRemoveItem(item);
        /**
         *
         **/
        private _onRemoveOption(item);
        /**
         * Raises the <c>closed</c> event
         **/
        onClosed(): void;
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(): void;
        /**
         * Raises the <c>maximized</c> event
         **/
        onMaximized(): void;
        /**
         * Raises the <c>minimized</c> event
         **/
        onMinimizedChanged(): void;
        /**
         * Gets or sets a value indicating if the item could be closed
         **/
        /**
         * Gets or sets a value indicating if the item could be closed
         **/
        allowClose: boolean;
        /**
         * Gets or sets a value indicating if the item could be maximized
         **/
        /**
         * Gets or sets a value indicating if the item could be maximized
         **/
        allowMaximize: boolean;
        /**
         * Gets or sets a value indicating if the item could be minimized
         **/
        /**
         * Gets or sets a value indicating if the item could be minimized
         **/
        allowMinimize: boolean;
        /**
         * Gets or sets a value indicating if the widget is currently minimized
         **/
        /**
         * Gets or sets a value indicating if the widget is currently minimized
         **/
        minimized: boolean;
        /**
         * Gets or sets the title of the widget
         **/
        /**
         * Gets or sets the title of the widget
         **/
        title: string;
    }
}
declare module latte {
    /**
     * Represents a column header
     **/
    class ColumnHeader extends LabelItem {
        /**
         *
         **/
        private _width;
        /**
         * Creates the Column Header
         **/
        constructor(text?: string, width?: number);
        /**
         * Gets or sets the width of the column
         **/
        /**
         * Gets or sets the width of the column
         **/
        width: number;
    }
}
declare module latte {
    /**
     * Represents a Comment
     **/
    class CommentItem extends Item {
        /**
         *
         **/
        private blinkerElement;
        /**
         *
         **/
        private container;
        /**
         *
         **/
        private _date;
        /**
         *
         **/
        private _icon;
        /**
         *
         **/
        private _relativeDate;
        /**
         *
         **/
        private _text;
        /**
         *
         **/
        private _user;
        /**
         * Points to the DOM element where text is stored
         **/
        commentSideElement: JQuery;
        /**
         * Points to the DOM element where user date is stored
         **/
        dateElement: JQuery;
        /**
         * Points to the DOM element where icon is stored
         **/
        iconSideElement: JQuery;
        /**
         * Points to the DOM element where text is stored
         **/
        textElement: JQuery;
        /**
         * Points to the DOM element where user is stored
         **/
        userElement: JQuery;
        /**
         * Raised when User name or icon is clicked
         **/
        userDetail: LatteEvent;
        /**
         * Creates the item
         **/
        constructor();
        /**
         * Blinks to call for attention. Optionally specifies the milliseconds to blink.
         **/
        blink(milliseconds?: number): void;
        /**
         * Raises the <c>userDetail</c> event
         **/
        onUserDetail(): void;
        /**
         * Gets or sets the date of the comment
         **/
        /**
         * Gets or sets the date of the comment
         **/
        date: DateTime;
        /**
         * Gets or sets the icon of the comment.
         **/
        /**
         * Gets or sets the icon of the comment.
         **/
        icon: IconItem;
        /**
         * Gets or sets a value indicating if the date of message should be displayed as a relative date.
         **/
        /**
         * Gets or sets a value indicating if the date of message should be displayed as a relative date.
         **/
        relativeDate: boolean;
        /**
         * Gets or sets the date of the comment
         **/
        /**
         * Gets or sets the date of the comment
         **/
        text: string;
        /**
         * Gets or sets the date of the comment
         **/
        /**
         * Gets or sets the date of the comment
         **/
        user: string;
    }
}
declare module latte {
    /**
     * Label with date time as value. When clicked swaps between relative date
     and exact date displaying.
     **/
    class DateTimeLabel extends LabelItem {
        /**
         *
         **/
        private _relative;
        /**
         *
         **/
        private _value;
        /**
         * Creates the label. Optionally it may be initialized with a date, passed
         as a <c>string</c> or a <c>latte.DateTime</c> object.
         **/
        constructor(value?: any);
        /**
         * Updates the text of the label
         **/
        private _updateText();
        /**
         * Gets or sets a value indicating if the date is shown as a relative string
         **/
        /**
         * Gets or sets a value indicating if the date is shown as a relative string
         **/
        relative: boolean;
        /**
         * Gets or sets the value of the label
         **/
        /**
         * Gets or sets the value of the label
         **/
        value: any;
    }
}
declare module latte {
    /**
     * Single element containing text
     */
    class UiText extends UiElement {
        /**
         * Trims the text and adds ellipsis if it overpasses the limit.
         *
         * @param text
         * @param length
         * @returns {string}
         */
        static ellipsis(text: string, length?: number): string;
        /**
         * Creates the text
         */
        constructor(text?: string);
        /**
         * Gets the text/html of the box
         * @returns {string}
         */
        /**
         * Sets the text/html of the box
         * @param value
         */
        text: string;
    }
}
declare module latte {
    /**
     * Represents an item for calendar views
     **/
    class CalendarItem extends SelectableLabel {
        /**
         *
         **/
        private _dateEnd;
        /**
         *
         **/
        private _dateStart;
        /**
         *
         **/
        _matrixDepth: number;
        /**
         *
         **/
        matrixAttributes: any;
        /**
         * Gets a collection of rectangles that exist extra to the element of this item
         **/
        rectangles: Collection<Rectangle>;
        /**
         * Creates the item
         **/
        constructor();
        /**
         *
         **/
        private _onAddRectangle(r);
        /**
         *
         **/
        private _onRemoveRectangle(r);
        /**
         * Clones the item
         **/
        clone(): CalendarItem;
        /**
         *
         **/
        onSelectedChanged(): void;
        /**
         * Gets a value indicating if the item is an <c>all-day</c> item.
         All-day items are those who its time of day both start and end dates are zero minutes
         **/
        allDay: boolean;
        /**
         * Gets or sets the end date of the item
         **/
        /**
         * Gets or sets the end date of the item
         **/
        dateEnd: DateTime;
        /**
         * Gets or sets the start date of the item
         **/
        /**
         * Gets or sets the start date of the item
         **/
        dateStart: DateTime;
        /**
         * Gets or sets the text of the item
         **/
        /**
         * Gets or sets the text of the item
         **/
        text: string;
    }
}
declare module latte {
    /**
     * Represents an item of a ListView
     **/
    class ListViewItem extends SelectableItem {
        /**
         *
         **/
        private _icon;
        /**
         *
         **/
        private _iconPadding;
        /**
         *
         **/
        private _listView;
        /**
         *
         **/
        private _text;
        /**
         *
         */
        private _columns;
        /**
         * Holds pointers to items
         */
        private _items;
        /**
         *
         **/
        columnsElement: JQuery;
        /**
         *
         **/
        iconElement: JQuery;
        /**
         *
         **/
        activated: LatteEvent;
        /**
         * Creates the Item. Optionally specifies its <c>ListView</c>
         **/
        constructor(listView?: ListView);
        /**
         * Adds a column of the specified width
         **/
        addColumn(width?: number): ListViewItem;
        /**
         * Gets the column element at the specified index
         *
         * @deprecated use columns.count instead
         **/
        getColumn(index: number): JQuery;
        /**
         * Gets the count of columns in item
         *
         * @deprecated use columns.count instead
         **/
        getColumnCount(): number;
        /**
         * Returns or sets the item of the specified column. First column's index is zero.
         *
         * @deprecated Use getItem and setItem methods
         **/
        item(index: number, value?: Item): Item;
        /**
         * Raises the <c>activated</c> event
         **/
        onActivated(): void;
        /**
         * Overriden. Raises the <c>layout</c> event
         **/
        onLayout(): void;
        /**
         *
         **/
        onSelectedChanged(): void;
        /**
         * Sets the width of the specified column
         **/
        setColumnWidth(index: number, width: number): void;
        /**
         * Gets the item at the specified column
         * @param index
         */
        getItem(index: number): Item;
        /**
         * Gets the text of a column (if a LabelItem)
         * @param index
         */
        getText(index: number): string;
        /**
         * Sets the text of a column
         *
         * @param index
         * @param text
         */
        setText(index: number, text: string): void;
        /**
         * Sets the item at the specified column
         * @param index
         * @param item
         */
        setItem(index: number, item: Item): void;
        /**
         * Returns or sets the text of the specified column.
         * When setting, it is equivalent to passing a <c>LabelItem</c> to the <c>item</c> method.
         *
         * @deprecated Use getText and setText instead
         **/
        text(index: number, value?: string): string;
        /**
         * Gets the column elements of the item
         *
         * @returns {Array<JQuery>}
         */
        columns: JQuery[];
        /**
         * Gets or sets the icon of the item.
         **/
        /**
         * Gets or sets the icon of the item.
         **/
        icon: IconItem;
        /**
         * Gets the listView of the item
         **/
        listView: ListView;
    }
}
declare module latte {
    /**
     * Renders an Item that may contains more <c>TreeItem</c>s and shows them as a tree.
     **/
    class TreeItem extends Item {
        /**
         *
         **/
        private _expandOnSelect;
        /**
         *
         **/
        private _expanded;
        /**
         *
         **/
        private _glyph;
        /**
         *
         **/
        private _icon;
        /**
         *
         **/
        private _level;
        /**
         *
         **/
        private _parent;
        /**
         *
         **/
        private _selected;
        /**
         *
         **/
        private _selectedIcon;
        /**
         *
         **/
        private _willLoadItems;
        /**
         *
         **/
        faceElement: JQuery;
        /**
         *
         **/
        glyphElement: JQuery;
        /**
         *
         **/
        iconElement: JQuery;
        /**
         *
         **/
        levelElement: JQuery;
        /**
         *
         **/
        textElement: JQuery;
        /**
         *
         **/
        items: Collection<TreeItem>;
        /**
         * Pointer to the element where items are placed
         **/
        itemsElement: JQuery;
        /**
         * Raised when user clicks the item
         **/
        click: LatteEvent;
        /**
         * Raised when children items need to be loaded
         **/
        loadItems: LatteEvent;
        /**
         * Raised when the <c>selected</c> property value changes
         **/
        selectedChanged: LatteEvent;
        /**
         * Creates the item
         **/
        constructor();
        /**
         *
         **/
        private _onAddItem(item);
        /**
         *
         **/
        private _onRemoveItem(item);
        /**
         *
         **/
        _updateGlyph(): void;
        /**
         * Deletes the node from its parent
         **/
        deleteFromParent(): void;
        /**
         * Raises the <c>click</c> event
         **/
        onClick(): void;
        /**
         * Raises the <c>loadItems</c> event
         **/
        onLoadItems(): void;
        /**
         * Raises the <c>selectedChanged</c> event
         **/
        onSelectedChanged(): void;
        /**
         * Reports to the <c>TreeView</c> that items have been loaded
         so it can trigger the <c>itemItemsLoaded</c>
         **/
        reportItemsLoaded(): void;
        /**
         * Returns the top most parent of the item
         **/
        topParent(): TreeItem;
        /**
         * Gets or sets a value indicating if the item will react to select as a gesture to alternate its <c>expand</c> state
         Default is <c>true</c>
         **/
        /**
         * Gets or sets a value indicating if the item will react to select as a gesture to alternate its <c>expand</c> state
         Default is <c>true</c>
         **/
        expandOnSelect: boolean;
        /**
         * Gets or sets a value indicating if the item is currently expanded, this is, showing its child items
         **/
        /**
         * Gets or sets a value indicating if the item is currently expanded, this is, showing its child items
         **/
        expanded: boolean;
        /**
         * Gets or sets the glyph of the item. Glyph is changed automatically when <c>expanded()</c> is invoked
         **/
        /**
         * Gets or sets the glyph of the item. Glyph is changed automatically when <c>expanded()</c> is invoked
         **/
        glyph: IconItem;
        /**
         * Gets a value indicating if the item contains child items or a handler for <c>loadItems</c> has been set
         **/
        hasItems: boolean;
        /**
         * Gets or sets the icon of the item
         **/
        /**
         * Gets or sets the icon of the item
         **/
        icon: IconItem;
        /**
         * Gets or sets the level of the item. The level specifies the indent of the item.
         **/
        /**
         * Gets or sets the level of the item. The level specifies the indent of the item.
         **/
        level: number;
        /**
         * Gets the parent <c>TreeItem</c> of this item
         **/
        parent: TreeItem;
        /**
         * Gets the navigation path as a string
         **/
        path: any;
        /**
         * Gets or sets a value indicaing if the item is currently selected
         **/
        /**
         * Gets or sets a value indicaing if the item is currently selected
         **/
        selected: boolean;
        /**
         * Gets or sets the icon of the item when selected
         **/
        /**
         * Gets or sets the icon of the item when selected
         **/
        selectedIcon: IconItem;
        /**
         * Gets or sets the text of the item
         **/
        /**
         * Gets or sets the text of the item
         **/
        text: string;
        /**
         * Gets the <c>TreeView</c> item who contains this item, if any
         **/
        treeView: TreeView;
    }
}
declare module latte {
    /**
     *
     **/
    class CheckboxItem extends ValueItem {
        /**
         *
         **/
        private _value;
        /**
         * Label for checkbox
         **/
        label: LabelItem;
        /**
         *
         **/
        constructor();
        /**
         * Gets or sets the text of the checkbox
         **/
        /**
         * Gets or sets the text of the checkbox
         **/
        text: string;
        /**
         * Gets or sets the checked state of checkbox
         **/
        /**
         * Gets or sets the checked state of checkbox
         **/
        value: boolean;
    }
}
/**
 * Created by josemanuel on 7/1/14.
 */
declare module latte {
    /**
     *
     */
    class ColorValueItem extends ValueItem {
        /**
         *
         */
        constructor(color?: Color);
        setValue(value: string): void;
        getValue(): string;
        onLayout(): void;
        /**
         * Field for colorPicker property
         */
        private _colorPicker;
        /**
         * Gets the color picker
         *
         * @returns {ColorPicker}
         */
        colorPicker: ColorPicker;
        /**
         * Field for button property
         */
        private _button;
        /**
         * Gets the button for selection
         *
         * @returns {ButtonItem}
         */
        button: ButtonItem;
        /**
         * Property field
         */
        private _color;
        /**
         * Gets or sets the color of the item
         *
         * @returns {Color}
         */
        /**
         * Gets or sets the color of the item
         *
         * @param {Color} value
         */
        color: Color;
        /**
         * Field for icon property
         */
        private _icon;
        /**
         * Gets the color icon
         *
         * @returns {ColorIconItem}
         */
        icon: ColorIconItem;
    }
}
declare module latte {
    /**
     * Presents a method for choosing options from a combobox.
     Combo options are presented as the button's items.
     The button's items tag value is assumed to be the value of the combobox.
     **/
    class ComboItem extends ValueItem {
        /**
         *
         **/
        private _options;
        /**
         *
         **/
        private _value;
        /**
         * Button who hosts the combo
         **/
        button: ButtonItem;
        /**
         *
         **/
        constructor();
        /**
         * Gets or sets the options of the combo
         **/
        /**
         * Gets or sets the options of the combo
         **/
        options: any;
        /**
         * Gets or sets the selected value of the combo
         **/
        /**
         * Gets or sets the selected value of the combo
         **/
        value: any;
        /**
         * Gets the value as a string for human reading
         **/
        valueString: any;
    }
}
declare module latte {
    /**
     * Value item for files. Value of item is an array of system File objects.
     */
    class FileValueItem extends ValueItem {
        fileInput: JQuery;
        constructor();
        /**
         * Gets an array of selected files
         *
         * @returns {Array<File>}
         */
        getValue(): File[];
        /**
         * Resets the input field
         */
        resetInput(): void;
        /**
         * Sets the value. This is ignored since UA won't allow it.
         *
         * @param value
         */
        setValue(value: File[]): void;
    }
}
declare module latte {
    /**
     * Renders an item to input data from user.
     **/
    class InputItem extends ValueItem {
        /**
         * Gets a formatted string of the value depending on the type
         **/
        static format(value: any, type: string, options?: any): string;
        /**
         * Creates the input item from a caption and a value item
         *
         * @param text
         * @param item
         */
        static fromItem(text: string, item: ValueItem): InputItem;
        /**
         * Stores options
         */
        private _options;
        /**
         *
         **/
        private _direction;
        /**
         *
         **/
        private _name;
        /**
         *
         **/
        private _readOnly;
        /**
         *
         **/
        private _separator;
        /**
         *
         **/
        private _type;
        /**
         *
         */
        private _textWidth;
        /**
         *
         **/
        private _valueItem;
        /**
         * Points to the label where text is stored
         **/
        label: LabelItem;
        /**
         * Points to the label where read-only elements are shown
         **/
        readOnlyLabel: LabelValueItem;
        /**
         * Points to separator element
         **/
        separatorElement: JQuery;
        /**
         * Points to the DOM element where <c>labelElement</> is contained, i.e. the text side.
         **/
        textElement: JQuery;
        /**
         * Points to the DOM element where the value is shown, i.e. the value side
         **/
        valueElement: JQuery;
        /**
         * Creates the input element
         **/
        constructor(text?: string, type?: string, value?: any, readOnly?: boolean, name?: string);
        /**
         * Checks if the current value is valid for the field <c>type</c>
         **/
        isValid(): boolean;
        /**
         *
         **/
        onLayout(): void;
        onValueChanged(): void;
        /**
         * Override
         * @returns {string}
         */
        getValueString(): string;
        /**
         * Gets or sets the direction of input.
         **/
        /**
         * Gets or sets the direction of input.
         **/
        direction: Direction;
        /**
         * Gets or sets the name of the input
         **/
        /**
         * Gets or sets the name of the input
         **/
        name: string;
        /**
         * Gets or sets the options of the control
         **/
        /**
         * Gets or sets the options of the control
         **/
        options: any;
        /**
         * Gets or sets a value indicating if the input is read-only
         **/
        /**
         * Gets or sets a value indicating if the input is read-only
         **/
        readOnly: boolean;
        /**
         * Gets or sets a value indicating if the input has a separator on bottom
         **/
        /**
         * Gets or sets a value indicating if the input has a separator on bottom
         **/
        separator: boolean;
        /**
         * Gets ors ets the text of the input
         **/
        /**
         * Gets ors ets the text of the input
         **/
        text: string;
        /**
         * Gets or sets a value indicating if the text section is visible
         **/
        /**
         * Gets or sets a value indicating if the text section is visible
         **/
        textVisible: boolean;
        /**
         * Gets or sets the with of the text part. Use value lower than 1 for percentages.
         * Note that when horizontal input, layout may become affected.
         *
         * @returns {number}
         */
        /**
         * Gets or sets the with of the text part.
         * Value must be percent since it must be leveled with value part. Value size will be adjusted
         * to 5% less large than it should to avoid edge collisions.
         * Values lower than 1 accepted.
         * Note that when horizontal input, layout may become affected.
         *
         */
        textWidth: number;
        /**
         * Gets or sets the type of the input.
         Possible values are: <c>auto</c> | <c>string</c> | <c>text</c> |
         <c>html</c> | <c>number</c> | <c>integer</c> | <c>float</c> |
         <c>boolean</c> | <c>password</c> | <c>md5-password</c> | <c>date</c> |
         <c>time</c> | <c>enumeration</c> | <c>combo</c> | <c>record-combo</c> | <c>flags</c> |
         <c>file</c> | <c>image</c> | <c>custom</c>

         If input is to be a type (function), it must inherit from <c>latte.ui.ValueItem</c>
         **/
        /**
         * Gets or sets the type of the input.
         Possible values are: <c>auto</c> | <c>string</c> | <c>text</c> |
         <c>html</c> | <c>number</c> | <c>integer</c> | <c>float</c> |
         <c>boolean</c> | <c>password</c> | <c>md5-password</c> | <c>date</c> |
         <c>time</c> | <c>enumeration</c> | <c>combo</c> | <c>record-combo</c> |
         <c>radio</c> | <c>flags</c> | <c>file</c> | <c>image</c> | <c>custom</c>

         If input is to be a type (function), it must inherit from <c>latte.ui.ValueItem</c>
         **/
        type: any;
        /**
         * Gets or sets the value of the input
         **/
        /**
         * Gets or sets the value of the input
         **/
        value: any;
        /**
         * Gets or sets the valueItem of the input
         **/
        /**
         * Gets or sets the valueItem of the input
         **/
        valueItem: ValueItem;
    }
}
declare module latte {
    /**
     * Label with value property
     **/
    class LabelValueItem extends ValueItem {
        /**
         * Label for text displaying
         **/
        label: LabelItem;
        /**
         *
         **/
        constructor();
        /**
         * Gets or sets the value
         **/
        /**
         * Gets or sets the value
         **/
        value: any;
    }
}
declare module latte {
    /**
     * Represents a progress bar
     **/
    class ProgressItem extends ValueItem {
        /**
         *
         **/
        private _maxValue;
        /**
         *
         **/
        private _minValue;
        /**
         *
         **/
        private _value;
        /**
         * Points to the DOM element of bar
         **/
        bar: JQuery;
        /**
         * Points to the DOM element where progress bar is contained
         **/
        container: JQuery;
        /**
         * Creates the progress item
         **/
        constructor();
        /**
         * Gets the percentage represented by min, max and value values.
         Value ranges from 0 to 100
         **/
        getPercentage(): number;
        /**
         * Raises the layout event
         **/
        onLayout(animate?: boolean): void;
        /**
         * Gets or sets the maximum value of the progress bar
         **/
        /**
         * Gets or sets the maximum value of the progress bar
         **/
        maxValue: number;
        /**
         * Gets or sets the minimum value of the progress bar
         **/
        /**
         * Gets or sets the minimum value of the progress bar
         **/
        minValue: number;
        /**
         * Gets or sets the current value of the progress bar
         **/
        /**
         * Gets or sets the current value of the progress bar
         **/
        value: number;
    }
}
declare module latte {
    /**
     * Presents a method for choosing options from a combobox.
     Combo options are presented as the button's items.
     The button's items tag value is assumed to be the value of the combobox.
     **/
    class RadioGroup extends ValueItem {
        /**
         *
         **/
        private _options;
        /**
         *
         **/
        private _value;
        /**
         *
         */
        private _radios;
        /**
         *
         */
        private stack;
        /**
         * Creates t
         **/
        constructor(options?: any);
        /**
         * Gets or sets the options of the combo
         **/
        /**
         * Gets or sets the options of the combo
         **/
        options: any;
        /**
         * Gets the collection of radio items
         *
         * @returns {Collection<RadioItem>}
         */
        radios: Collection<RadioItem>;
        /**
         * Gets or sets the selected value of the combo
         **/
        /**
         * Gets or sets the selected value of the combo
         **/
        value: any;
        /**
         * Gets the value as a string for human reading
         **/
        valueString: any;
    }
}
/**
 * Created by josemanuel on 12/23/13.
 */
declare module latte {
    /**
     * Shows a selectable radio button
     */
    class RadioItem extends ValueItem {
        private _value;
        /**
         * Label for radio
         **/
        label: LabelItem;
        constructor(text?: string, value?: boolean);
        /**
         * Gets or sets the text of the checkbox
         **/
        /**
         * Gets or sets the text of the checkbox
         **/
        text: string;
        /**
         * Gets or sets the checked state of checkbox
         **/
        /**
         * Gets or sets the checked state of checkbox
         **/
        value: boolean;
    }
}
declare module latte {
    /**
     * Allows user to pick a time
     **/
    class TimePickerItem extends DatePickerItem {
        /**
         *
         **/
        constructor();
        /**
         * Gets or sets the value of the item
         **/
        getValue(): TimeSpan;
        setValue(value: TimeSpan): void;
    }
}
declare module latte {
    /**
     *
     **/
    class TextboxItem extends ValueItem {
        /**
         *
         **/
        private _autoGrow;
        /**
         *
         **/
        private _inputContainer;
        /**
         *
         **/
        private _invisible;
        /**
         *
         **/
        private _maxLength;
        /**
         *
         **/
        private _minHeight;
        /**
         *
         **/
        private _multiline;
        /**
         *
         **/
        private _password;
        /**
         *
         */
        private _minLenToSuggest;
        /**
         *
         */
        private _suggestionOverlay;
        /**
         * Index of Currently selected suggestion
         */
        private selectedIndex;
        private _selectedSuggestion;
        private _suggestions;
        private _loadingSuggestions;
        /**
         * Points to the element who receives input
         **/
        input: JQuery;
        /**
         * Points to the placeholder label
         **/
        placeholderLabel: LabelItem;
        /**
         * Points to the label on the side of textbox
         **/
        sideLabel: LabelItem;
        /**
         * Raised when user presses the enter key
         **/
        enterPressed: LatteEvent;
        /**
         * Raised when accessing the value of item.
         Returning something will override the value returned by the method
         **/
        gettingValue: LatteEvent;
        /**
         * Raised when accessing the value string of item.
         Returning something will override the value returned by the method
         **/
        gettingValueString: LatteEvent;
        /**
         * Raised when the user presses a key on the textbox
         */
        keyPress: LatteEvent;
        /**
         * Raised when a key goes down
         */
        keyDown: LatteEvent;
        /**
         * Raised when a key goes up
         */
        keyUp: LatteEvent;
        /**
         * Raised when changing the value of the item.
         * Returning a string will override the value setted to the method
         **/
        settingValue: LatteEvent;
        /**
         * Raised when time to add suggestions.
         */
        filterSuggestions: LatteEvent;
        /**
         * Initializes the item
         **/
        constructor();
        /**
         * Updates the input element
         **/
        private _updateInput();
        /**
         *
         **/
        getValue(): string;
        /**
         * Hides the suggestions
         */
        hideSuggestions(): void;
        /**
         * Raises the <c>addSuggestion</c> event
         * @param item
         */
        onAddSuggestion(item: Item): void;
        /**
         * Raises the <c>enterPressed</c> event
         **/
        onEnterPressed(): void;
        /**
         * Raises the <c>filterSuggestions</c> event
         */
        onFilterSuggestions(): void;
        /**
         * Raises the <c>gettingValue</c> event
         **/
        onGettingValue(value: string): any;
        /**
         * Raises the <c>gettingValueString</c> event
         **/
        onGettingValueString(value: string): any;
        /**
         * Raises the <c>keyPress</c> event
         * @param e
         */
        onKeyPress(e: JQueryEventObject): void;
        /**
         * Raises the <c>keyDown</c>
         * @param e
         */
        onKeyDown(e: JQueryEventObject): any;
        /**
         * Raises the <c>keyUp</c>
         * @param e
         */
        onKeyUp(e: JQueryEventObject): any;
        /**
         * Overriden.
         **/
        onLayout(): void;
        /**
         * Raises the <c>removeSuggestion</c> event
         * @param item
         */
        onRemoveSuggestion(item: Item): void;
        /**
         * Raises the <c>settingValue</c> event
         **/
        onSettingValue(value: string): any;
        /**
         * Raises the <c>valueChanged</c> event
         **/
        onValueChanged(): void;
        /**
         * Selects the first item of suggestions
         */
        selectFirstSuggestion(): void;
        /**
         * Selects the next suggestion (if possible)
         */
        selectNextSuggestion(): void;
        /**
         * Selects the previous suggestion (if possible)
         */
        selectPreviousSuggestion(): void;
        /**
         * Selects the specified suggestion from list
         * @throws Exception if index is out of range
         * @param index
         */
        selectSuggestion(index: number): void;
        /**
         * Sets the width as a percentage. Dont forget to include '%' after size
         **/
        setRelativeWidth(width: string): void;
        /**
         * Sets the side label as a "clear text" button, with the specified button
         * @param icon
         */
        setSideAsCleaner(icon?: IconItem): void;
        /**
         * Sets the value.
         Optionally it sets the value silently whitout updating the INPUT value.
         **/
        setValue(value: string, silentOnInput?: boolean): void;
        /**
         * Gets or sets a value indicating if the textbox height should grow automatically
         to adjust to fit its text
         **/
        /**
         * Gets or sets a value indicating if the textbox height should grow automatically
         to adjust to fit its text
         **/
        autoGrow: boolean;
        /**
         * Gets or sets the maximum length for input in the textbox
         **/
        /**
         * Gets or sets the maximum length for input in the textbox
         **/
        maxLength: number;
        /**
         * Gets or sets the minimum height of the textbox, if multiline
         **/
        /**
         * Gets or sets the minimum height of the textbox, if multiline
         **/
        minHeight: number;
        /**
         * Gets or sets the minimum length of text to activate suggestions
         * @param value
         */
        /**
         * Gets or sets the minimum length of text to activate suggestions
         * @param value
         */
        minLengthToActivateSuggestions: number;
        /**
         * Gets or sets a value indicating if the textbox can be multiline
         **/
        /**
         * Gets or sets a value indicating if the textbox can be multiline
         **/
        multiline: boolean;
        /**
         * Gets or sets a value indicating if the textbox accepts passwords
         **/
        /**
         * Gets or sets a value indicating if the textbox accepts passwords
         **/
        password: boolean;
        /**
         * Gets or sets the placeholder text of textbox
         **/
        /**
         * Gets or sets the placeholder text of textbox
         **/
        placeholder: string;
        /**
         * Property field
         */
        private _readOnly;
        /**
         * Gets or sets a value indicating if the textbox should be read-only
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the textbox should be read-only
         *
         * @param {boolean} value
         */
        readOnly: boolean;
        /**
         * Back field for event
         */
        private _readOnlyChanged;
        /**
         * Gets an event raised when the value of the readOnly property changes
         *
         * @returns {LatteEvent}
         */
        readOnlyChanged: LatteEvent;
        /**
         * Raises the <c>readOnly</c> event
         */
        onReadOnlyChanged(): void;
        /**
         * Gets the suggestions overlay
         */
        suggestionOverlay: SuggestionOverlay;
        /**
         * Gets the collection of suggestions for autocompletion
         *
         * @returns {Collection<Item>}
         */
        suggestions: Collection<Item>;
        /**
         * Gets a value indicating if the suggestions list is currently visible
         * @returns {boolean}
         */
        suggestionsVisible: boolean;
        /**
         * Gets or sets the value.
         Optionally it sets the value silently whitout updating the INPUT value.
         **/
        /**
         * Gets or sets the value.
         Optionally it sets the value silently whitout updating the INPUT value.
         **/
        value: string;
        /**
         * Gets the value as a string
         **/
        valueString: string;
        /**
         * Gets or sets the width of the textbox.
         **/
        /**
         * Gets or sets the width of the textbox.
         **/
        width: number;
    }
}
declare module latte {
    /**
     * Shows a graphical indicator of activity.
     <example><code><span style="color: #000000">
     <span style="color: #0000BB"><br /><br />&nbsp;&nbsp;</span><span style="color: #FF8000">//&nbsp;Show&nbsp;loader<br />&nbsp;&nbsp;</span><span style="color: #007700">var&nbsp;</span><span style="color: #0000BB">loader&nbsp;</span><span style="color: #007700">=&nbsp;new&nbsp;</span><span style="color: #0000BB">Loader</span><span style="color: #007700">(</span><span style="color: #DD0000">"Doing&nbsp;some&nbsp;stuff"</span><span style="color: #007700">);<br /><br />&nbsp;&nbsp;</span><span style="color: #FF8000">//&nbsp;...<br />&nbsp;&nbsp;//&nbsp;Load&nbsp;some&nbsp;heavy&nbsp;stuff..<br />&nbsp;&nbsp;//&nbsp;...<br /><br />&nbsp;&nbsp;//&nbsp;Hide&nbsp;loader<br />&nbsp;&nbsp;</span><span style="color: #0000BB">loader</span><span style="color: #007700">.</span><span style="color: #0000BB">stop</span><span style="color: #007700">();<br />&nbsp;<br /></span><span style="color: #0000BB"></span>
     </span>
     </code></example>
     **/
    class Loader extends Overlay {
        /**
         *
         **/
        private static _active;
        /**
         * Amount of pixels between loaders when stacked
         **/
        static separation: number;
        /**
         * Adds a loader to the list of active loaders, if not already present.
         **/
        private static add(loader);
        /**
         * Removes the Loader from the active list of loaders
         **/
        private static remove(loader);
        /**
         * Updates all active loaders position and ensures modal layer visibility
         **/
        private static update();
        /**
         * Updates all active loaders positions
         **/
        private static updateLayout();
        /**
         * Iterates trough active loaders to check if modal layer should be visible
         **/
        private static updateModalVisibility();
        /**
         * Gets the widest loader width
         **/
        private static maxWidth;
        /**
         * Gets a boolean indicating if the modal layer should be visible based on the active loaders.
         **/
        private static modalShouldBeVisible;
        /**
         * Gets or Sets visibility of modal layer. Optimized for concurrent calling.
         **/
        /**
         * Gets or Sets visibility of modal layer. Optimized for concurrent calling.
         **/
        private static modalVisible;
        /**
         *
         **/
        private _cancellable;
        /**
         *
         **/
        private _description;
        /**
         *
         **/
        private _modal;
        /**
         *
         */
        cancelElement: JQuery;
        /**
         * Points to the DOM element where loader text is placed
         **/
        labelElement: JQuery;
        /**
         * Progressbar of loader. Hidden by default.
         **/
        progress: ProgressItem;
        /**
         * Raised when user cancels the loader
         **/
        cancelled: LatteEvent;
        /**
         * Creates and shows the loader. Optionally specifies if is to be shown as <c>modal</c>.
         **/
        constructor(text?: string, modal?: boolean);
        /**
         * Raises the <c>cancelled</c> event
         **/
        onCancelled(): void;
        /**
         * Shows the loader on the UI
         **/
        start(): void;
        /**
         * Hides the loader on the UI
         **/
        stop(): void;
        /**
         * Gets or sets a value indicating if the loader allows user to cancel it.
         **/
        /**
         * Gets or sets a value indicating if the loader allows user to cancel it.
         **/
        cancellable: boolean;
        /**
         * Gets or sets the description of the loader
         **/
        /**
         * Gets or sets the description of the loader
         **/
        description: string;
        /**
         * Gets or sets a value indicating if the loader is modal
         **/
        /**
         * Gets or sets a value indicating if the loader is modal
         **/
        modal: boolean;
        /**
         * Gets or sets the text of the loader
         **/
        /**
         * Gets or sets the text of the loader
         **/
        text: string;
    }
}
declare module latte {
    /**
     * Shows items in a popup.
     **/
    class MenuOverlay extends Overlay {
        /**
         * Raised when closing all open menuitems. This method can be hooked statically
         to close elements with similar behavior to menus, like popups.
         **/
        static closingAll: LatteEvent;
        /**
         * Flag to save static initialization
         */
        static initialized: boolean;
        /**
         * Initialize handlers at global level
         **/
        static _initialize(): void;
        /**
         * Closes all open menus along the User Agent viewport
         **/
        static closeAll(): void;
        /**
         * Marks with CSS the element as currently showing a menu. If no side
         is specified, it just clears the CSS as "no showing the menu"
         **/
        static mark(elem: JQuery, side?: Side): void;
        /**
         * Raises the <c>closingAll</c> static event
         **/
        static onClosingAll(): void;
        /**
         *
         */
        private _domElement;
        /**
         *
         **/
        private _edge;
        /**
         *
         **/
        private _item;
        /**
         *
         **/
        private _parentButton;
        /**
         *
         **/
        private _side;
        /**
         * Items within the menu
         **/
        items: Collection<Item>;
        /**
         * Raised when the menu is closed
         **/
        closed: LatteEvent;
        /**
         * Raised when the menu is about the be shown at the passed X coordinate.
         Handler may return a number to alter its position.
         **/
        willShowAtX: LatteEvent;
        /**
         * Raised when the menu is about the be shown at the passed Y coordinate.
         Handler may return a number to alter its position.
         **/
        willShowAtY: LatteEvent;
        /**
         * Creates the Menu
         **/
        constructor();
        /**
         *
         **/
        private _onAddItem(item);
        /**
         *
         **/
        private _onRemoveItem(item);
        /**
         * Closes the menu and removes its elements from the DOM
         **/
        close(): MenuOverlay;
        /**
         * Closes the menus open by any of this Menu's children
         **/
        closeChildrenMenus(): MenuOverlay;
        /**
         * Raises the <c>closed</c> event
         **/
        onClosed(): void;
        onLayout(): void;
        /**
         * Raises the <c>willShowAtX</c> event
         **/
        onWillShowAtX(x: number): any;
        /**
         * Raises the <c>willShowAtY</c> event
         **/
        onWillShowAtY(y: number): any;
        /**
         * Sets the parent button of the menu
         */
        setParentButton(b: ButtonItem): void;
        /**
         * Shows the menu relative to the specified element
         **/
        show(item: Item, side: Side, edge: Side): MenuOverlay;
        /**
         * Shows the menu at the exact point
         **/
        showAt(x: number, y: number): void;
        /**
         * Gets the parent element relative to this menu. The menu is shown to the <c>side</c> of this element
         **/
        domElement: JQuery;
        /**
         * Gets the edge of the menu, relative to element provided by <c>domElement</c>
         **/
        edge: Side;
        /**
         * Gets the parent item of the menu
         **/
        item: Item;
        /**
         * Gets the orientation of the menu, relative to element provided by <c>domElement</c>
         **/
        side: Side;
    }
}
declare module latte {
    class SuggestionOverlay extends StackOverlay {
        constructor();
    }
}
declare module latte {
    /**
     * A <c>View</c> with a ribbon on the top.

     The view reacts in size when ribbon is collapsed and preserves it on the top.
     **/
    class RibbonView extends AnchorView {
        /**
         * The Ribbon of the View
         **/
        ribbon: Ribbon;
        /**
         * Creates the View
         **/
        constructor();
        /**
         * Handles changes in size
         **/
        onLayoutHIDDEN(): void;
    }
}
declare module latte {
    /**
     * Represents a Tabbed View.
     *
     * Add tabs and views to its collections to obtain "Tabbed View" behavior
     **/
    class TabView extends AnchorView {
        /**
         * Toolbar where tabs are stored
         */
        private tabToolbar;
        /**
         * Collection of tabs
         **/
        tabs: Collection<TabItem>;
        /**
         * Collection of views.
         View will be activated when tab changed if matches index of tab.
         **/
        views: Collection<View>;
        /**
         * Raised when a tab is selected
         **/
        selectedTabChanged: LatteEvent;
        /**
         * Creates the view
         **/
        constructor();
        /**
         *
         **/
        onTabAdded(tab: TabItem): void;
        /**
         *
         **/
        onTabRemoved(tab: TabItem): void;
        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged(): void;
        /**
         * Override
         */
        onAnchorTopChanged(): void;
        /**
         * Override
         */
        onAnchorRightChanged(): void;
        /**
         * Override
         */
        onAnchorBottomChanged(): void;
        /**
         * Override
         */
        onAnchorLeftChanged(): void;
        /**
         * Gets or sets the selected tab of the view
         **/
        /**
         * Gets or sets the selected tab of the view
         **/
        selectedTab: TabItem;
        /**
         * Property field
         */
        private _tabsSide;
        /**
         * Gets or sets the side of the tabs
         *
         * @returns {Side}
         */
        /**
         * Gets or sets the side of the tabs
         *
         * @param {Side} value
         */
        tabsSide: Side;
    }
}
declare module latte {
    /**
     * A View with a toolbar on the top, bottom or side
     **/
    class ToolbarView extends AnchorView {
        /**
         * Toolbar of the view
         **/
        toolbar: Toolbar;
        /**
         * Creates the ToolbarView
         **/
        constructor();
        onAnchorTopChanged(): void;
        onAnchorRightChanged(): void;
        onAnchorBottomChanged(): void;
        onAnchorLeftChanged(): void;
    }
}
declare module latte {
    /**
     * Represents a set of days who contains day items
     **/
    class CalendarDayView extends View {
        /**
         *
         **/
        private _allDayOffset;
        /**
         *
         **/
        private _allowItemCreate;
        /**
         *
         **/
        private _columns;
        /**
         *
         **/
        private _columnsGrid;
        /**
         *
         **/
        private _columnsItems;
        /**
         *
         **/
        private _content;
        /**
         *
         **/
        private _daysGrid;
        /**
         *
         */
        private _daysItems;
        /**
         *
         **/
        private _draggingHeaderSelection;
        /**
         *
         **/
        private _draggingSelection;
        /**
         *
         **/
        private _itemPadding;
        /**
         *
         **/
        private _minuteSpan;
        /**
         *
         **/
        private _scrollStart;
        /**
         *
         **/
        private _selectionEnd;
        /**
         *
         **/
        private _selectionStart;
        /**
         *
         **/
        private _separator;
        /**
         *
         **/
        private _timeIndicator;
        /**
         *
         **/
        private _timeSpans;
        /**
         *
         **/
        private _timeline;
        /**
         *
         **/
        private _viewEnd;
        /**
         *
         **/
        private _viewStart;
        /**
         *
         **/
        private _workDayEnd;
        /**
         *
         **/
        private _workDayStart;
        /**
         *
         */
        private _firstScroll;
        /**
         * Collection of items
         **/
        items: Collection<CalendarItem>;
        /**
         * Raised when the view start/end changes
         **/
        viewRangeChanged: LatteEvent;
        /**
         * Raised when an item is added
         **/
        userAddItem: LatteEvent;
        /**
         * Raised when an item is removed
         **/
        userRemoveItem: LatteEvent;
        /**
         * Creates the day view
         **/
        constructor();
        /**
         *
         **/
        private _columnsMouseDown(e);
        /**
         *
         **/
        private _columnsMouseLeave(e);
        /**
         *
         **/
        private _columnsMouseMove(e);
        /**
         *
         **/
        private _columnsMouseUp(e);
        /**
         * Creates a matrix filling each item as a position to measure item width and horizontal location

         Assigns three properties to each item to know its horizontal position
         **/
        private _createMatrix();
        /**
         * Craetes a matrix for filling the all-day items
         **/
        private _createTopMatrix();
        /**
         *
         **/
        private _dayColumn(date);
        /**
         *
         **/
        private _daysGridMouseDown(e);
        /**
         *
         **/
        private _daysGridMouseMove(e);
        /**
         *
         **/
        private _daysGridMouseUp(e);
        /**
         *
         **/
        private _keyDown(e);
        /**
         *
         **/
        private _onAddItem(item);
        /**
         * Specifies if the page coordinates are on the headers zone
         **/
        private _onHeadersZone(x, y);
        /**
         *
         **/
        private _onRemoveItem(item);
        /**
         * Returns a collection of rectangles for the specified range
         **/
        private _rectanglesFor(start, end);
        /**
         *
         **/
        private _timeSpanHitTest(x, y);
        /**
         *
         **/
        private _updateBoard();
        /**
         * Clears the selection
         **/
        clearSelection(): void;
        /**
         * Creates an item at the selection
         **/
        createItemAtSelection(text?: string): CalendarItem;
        /**
         * Overriden. Raises the <c>layout</c> event
         **/
        onLayout(): void;
        /**
         * Updates layout of items on calendar
         **/
        onLayoutItems(): void;
        /**
         * Raises the <c>userAddItem</c> event.
         **/
        onUserAddItem(item: CalendarItem): void;
        /**
         * Raises the <c>userRemoveItem</c> event.
         **/
        onUserRemoveItem(item: CalendarItem): void;
        /**
         * Raises the <c>viewRangeChanged</c> event.
         **/
        onViewRangeChanged(): void;
        /**
         * Returns a value indicating if the selection is on header
         **/
        selectionOnHeader(): boolean;
        /**
         * Sets the current selection range
         **/
        setSelectionRange(start: DateTime, end: DateTime): void;
        /**
         * Sets the view range of the day view
         **/
        setViewRange(start: DateTime, end: DateTime): void;
        /**
         * Gets the height (or Y coordinate) for the specified time
         **/
        private _heightOf(time);
        /**
         * Gets the timespan element index of the specified time
         **/
        private _timeSpanIndexOf(time);
        /**
         * Gets the timespan element of the specified time
         **/
        private _timeSpanOf(time);
        /**
         * Gets or sets a value indicating if the view allows user to create new items
         **/
        /**
         * Gets or sets a value indicating if the view allows user to create new items
         **/
        allowItemCreate: boolean;
        /**
         * Gets the end of view
         **/
        viewEnd: DateTime;
        /**
         * Gets the start of view
         **/
        viewStart: DateTime;
    }
}
declare module latte {
    /**
     * Represents a month who show <c>CalendarItem</c>s
     **/
    class CalendarMonthView extends View {
        /**
         *
         **/
        private _content;
        /**
         *
         **/
        private _draggingSelection;
        /**
         *
         **/
        private _itemItemHeight;
        /**
         *
         **/
        private _itemItemTopStart;
        /**
         *
         **/
        private _itemPadding;
        /**
         *
         **/
        private _monthOnView;
        /**
         *
         **/
        private _selectionEnd;
        /**
         *
         **/
        private _selectionStart;
        /**
         *
         **/
        private _viewEnd;
        /**
         *
         **/
        private _viewStart;
        /**
         * Collection of items
         **/
        items: Collection<CalendarItem>;
        /**
         * Raised when the view start/end changes
         **/
        viewRangeChanged: LatteEvent;
        /**
         * Raised when an item is added
         **/
        userAddItem: LatteEvent;
        /**
         * Raised when an item is removed
         **/
        userRemoveItem: LatteEvent;
        /**
         * Creates the MonthView
         **/
        constructor();
        /**
         *
         **/
        private _createBoard();
        /**
         *
         **/
        private _createMatrix();
        /**
         *
         **/
        private _dayElement(date);
        /**
         *
         **/
        private _dayMouseDown(e, dayElement);
        /**
         *
         **/
        private _dayMouseMove(e, dayElement);
        /**
         *
         **/
        private _dayMouseUp(e, dayElement);
        /**
         *
         **/
        private _keyDown(e);
        /**
         *
         **/
        private _onAddItem(item);
        /**
         *
         **/
        private _onRemoveItem(item);
        /**
         *
         **/
        private _rectanglesFor(start, end);
        /**
         *
         **/
        private _weekRectangle(date);
        /**
         * Clears the selection
         **/
        clearSelection(): void;
        /**
         * Creates an item at the selection
         **/
        createItemAtSelection(text?: string): CalendarItem;
        /**
         * Overriden. Raises the <c>layout</c> event.
         **/
        onLayout(): void;
        /**
         * Extension for setting the layout of items
         **/
        onLayoutItems(): void;
        /**
         * Raises the <c>userAddItem</c> event.
         **/
        onUserAddItem(item: CalendarItem): void;
        /**
         * Raises the <c>userRemoveItem</c> event.
         **/
        onUserRemoveItem(item: CalendarItem): void;
        /**
         * Raises the <c>viewRangeChanged</c> event.
         **/
        onViewRangeChanged(): void;
        /**
         *
         **/
        setSelectionRange(start: DateTime, end: DateTime): void;
        /**
         * Sets the month to show. Only year and month of date will be taken.
         **/
        setViewRange(date: DateTime): void;
        /**
         * Gets or sets the month on the view
         **/
        /**
         * Gets or sets the month on the view
         **/
        monthOnView: DateTime;
        /**
         * Gets the end of view
         **/
        viewEnd: DateTime;
        /**
         * Gets the start of view
         **/
        viewStart: DateTime;
    }
}
declare module latte {
    /**
     * Shows items in calendar arrangement views
     **/
    class CalendarView extends SplitView {
        /**
         *
         **/
        _controls: JQuery;
        /**
         * Group of buttons for scrolling through calendar
         **/
        buttonGroup: ButtonGroupItem;
        /**
         * Button for scrolling to next date range
         **/
        buttonNext: ButtonItem;
        /**
         * Button for scrolling to previous date range
         **/
        buttonPrevious: ButtonItem;
        /**
         * Button for scrolling to today date range
         **/
        buttonToday: ButtonItem;
        /**
         * Selector of dates for calendar
         **/
        dateView: DateView;
        /**
         * View for showing full days
         **/
        dayView: CalendarDayView;
        /**
         * View for showing full days
         **/
        monthView: CalendarMonthView;
        /**
         * Title showing current date range
         **/
        titleItem: LabelItem;
        /**
         * Raised when <c>selectionStart</c> or <c>selectionEnd</c> properties value change.
         **/
        selectionChanged: LatteEvent;
        /**
         * Raised when an item is added
         **/
        userAddItem: LatteEvent;
        /**
         * Raised when an item is removed
         **/
        userRemoveItem: LatteEvent;
        /**
         * Raised when the view start/end changes
         **/
        viewRangeChanged: LatteEvent;
        /**
         * Creates the view
         **/
        constructor();
        /**
         * Navigates to the next range of dates, based on the current range
         **/
        goNext(): void;
        /**
         * Navigates to the previous range of dates, based on the current range
         **/
        goPrevious(): void;
        /**
         * Navigates to the today day.
         **/
        goToday(): void;
        /**
         * Overriden.
         **/
        onLayout(): void;
        /**
         * Raises the <c>selectionChanged</c> event
         **/
        onSelectionChanged(): void;
        /**
         * Raises the <c>userAddItem</c> event.
         **/
        onUserAddItem(item: CalendarItem): void;
        /**
         * Raises the <c>userRemoveItem</c> event.
         **/
        onUserRemoveItem(item: CalendarItem): void;
        /**
         * Raises the <c>viewRangeChanged</c> event.
         **/
        onViewRangeChanged(): void;
        /**
         * Gets or sets the working end time of specified week day.
         **/
        workDayEnd(day: WeekDay, value?: TimeSpan): TimeSpan;
        /**
         * Gets or sets the working start time of specified week day.
         **/
        workDayStart(day: WeekDay, value?: TimeSpan): TimeSpan;
        /**
         * Gets or sets a value indicating if user is allowed to create items on timespans
         **/
        /**
         * Gets or sets a value indicating if user is allowed to create items on timespans
         **/
        allowItemCreate: boolean;
        /**
         * Gets or sets a value indicating if user is allowed to drag items around
         **/
        /**
         * Gets or sets a value indicating if user is allowed to drag items around
         **/
        allowItemDrag: boolean;
        /**
         * Gets or sets a value indicating if user is allowed to edit item text
         **/
        /**
         * Gets or sets a value indicating if user is allowed to edit item text
         **/
        allowItemEdit: boolean;
        /**
         * Gets or sets a value indicating if user is allowed to delete items
         **/
        /**
         * Gets or sets a value indicating if user is allowed to delete items
         **/
        allowItemRemove: boolean;
        /**
         * Gets or sets a value indicating if user is allowed to resize timespan of items
         **/
        /**
         * Gets or sets a value indicating if user is allowed to resize timespan of items
         **/
        allowItemResize: boolean;
        /**
         * Gets or sets the time days should end. Default is 23:59:59
         **/
        /**
         * Gets or sets the time days should end. Default is 23:59:59
         **/
        dayEnd: TimeSpan;
        /**
         * Gets or sets the time days should start. Default is 00:00
         **/
        /**
         * Gets or sets the time days should start. Default is 00:00
         **/
        dayStart: TimeSpan;
        /**
         * Gets a value indicating if there is an item on edit mode
         **/
        /**
         * Gets a value indicating if there is an item on edit mode
         **/
        editMode: any;
        /**
         * Gets the item being edited, if any.
         **/
        /**
         * Gets the item being edited, if any.
         **/
        editModeItem: any;
        /**
         * Gets or sets the first day of week. Default is <c>WeekDay.SUNDAY</c>.
         **/
        /**
         * Gets or sets the first day of week. Default is <c>WeekDay.SUNDAY</c>.
         **/
        firstDayOfWeek: WeekDay;
        /**
         * Gets or sets a value indicating if the navigator elements should be visible
         **/
        /**
         * Gets or sets a value indicating if the navigator elements should be visible
         **/
        navigatorVisible: boolean;
        /**
         * Gets or sets the selection's start
         **/
        /**
         * Gets or sets the selection's start
         **/
        selectionEnd: DateTime;
        /**
         * Gets or sets the selection mode
         **/
        /**
         * Gets or sets the selection mode
         **/
        selectionMode: DateSelectionMode;
        /**
         * Gets or sets the selection's start
         **/
        /**
         * Gets or sets the selection's start
         **/
        selectionStart: DateTime;
        /**
         * Gets or sets the view's end.
         **/
        viewEnd: DateTime;
        /**
         * Gets or sets the view's start.
         **/
        viewStart: DateTime;
        /**
         * Gets or sets the work week's end.
         **/
        /**
         * Gets or sets the work week's end.
         **/
        workWeekEnd: WeekDay;
        /**
         * Gets or sets the work week's start.
         **/
        /**
         * Gets or sets the work week's start.
         **/
        workWeekStart: WeekDay;
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
declare module latte {
    /**
     * View for choosing dates or date ranges.

     The <c>DateItem</c> used inside the view adapts its <c>rows</c> and <c>columns</c> to take advantage of the view area.
     **/
    class DateView extends View {
        /**
         *
         **/
        private _useWorkWeek;
        /**
         * DateItem for date choosing.
         **/
        dateItem: DateItem;
        /**
         * Button for activating day selection mode.
         **/
        dayButton: ButtonItem;
        /**
         * Button for activating month selection mode.
         **/
        monthButton: ButtonItem;
        /**
         * Button for activating week selection mode.
         **/
        weekButton: ButtonItem;
        /**
         * Button for activating work week selection mode.
         **/
        workWeekButton: ButtonItem;
        /**
         * Creates the view
         **/
        constructor();
        /**
         * Hides the selection mode buttons
         **/
        hideButtons(): void;
        /**
         * Overriden
         **/
        onLayout(): void;
        /**
         * Layout of buttons
         **/
        onLayoutButtons(): void;
        /**
         * Shows the selection mode buttons
         **/
        showButtons(): void;
        /**
         * Updates the selection mode indicators
         **/
        updateSelectionMode(): void;
    }
}
declare module latte {
    /**
     * Renders a form to iunput data.
     **/
    class FormView extends ColumnView {
        /**
         * Creates a new form, using the specified fields
         and commands
         **/
        constructor(inputs?: InputItem[]);
        /**
         * Checks every input in <c>inputs</c> to be valid
         **/
        valid(): boolean;
        /**
         * Returns an object with the values of fields
         **/
        getValues(): any;
        /**
         * Gets or sets the with of the text parts.
         * Value must be percent since it must be leveled with value part. Value size will be adjusted
         * to 5% less large than it should to avoid edge collisions.
         * Values lower than 1 accepted.
         * Note that when horizontal input, layout may become affected.
         *
         */
        setTextWidth(value: number): void;
        /**
         * Back field for event
         */
        private _valueChanged;
        /**
         * Gets an event raised when a value of the form changes
         *
         * @returns {LatteEvent}
         */
        valueChanged: LatteEvent;
        /**
         * Raises the <c>valueChanged</c> event
         */
        onValueChanged(): void;
        /**
         * Field for form property
         */
        private _form;
        /**
         * Gets the form of the view
         *
         * @returns {FormItem}
         */
        form: FormItem;
        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        /**
         * Gets or sets a value indicating if the form has a visible face style.
         **/
        faceVisible: boolean;
        /**
         * Gets the inputs of the form
         *
         * @returns {Collection<InputItem>}
         */
        inputs: Collection<InputItem>;
        /**
         * Gets or sets a value indicating if the inputs in the form are read-only
         **/
        /**
         * Gets or sets a value indicating if the inputs in the form are read-only
         **/
        readOnly: boolean;
        /**
         * Gets or sets the title of the form
         **/
        /**
         * Gets or sets the title of the form
         **/
        title: string;
        /**
         * Gets the title label of the form
         *
         * @returns {LabelItem}
         */
        titleLabel: LabelItem;
    }
}
declare module latte {
    /**
     * Provides a view that contains just HTML
     <example><code><span style="color: #000000">
     <span style="color: #0000BB"><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color: #FF8000">//&nbsp;Show&nbsp;an&nbsp;HTML&nbsp;view&nbsp;as&nbsp;modal&nbsp;dialog<br />&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color: #0000BB">View</span><span style="color: #007700">.</span><span style="color: #0000BB">modalView</span><span style="color: #007700">(new&nbsp;</span><span style="color: #0000BB">HtmlView</span><span style="color: #007700">(</span><span style="color: #DD0000">"&lt;p&gt;Hello&nbsp;World&lt;/p&gt;"</span><span style="color: #007700">));<br />&nbsp;<br /></span><span style="color: #0000BB"></span>
     </span>
     </code></example>
     **/
    class HtmlView extends View {
        /**
         * Creates the view with HTML or jQuery elements
         **/
        constructor(html: any);
        /**
         * Appends elements to the HTML view DOM
         **/
        append(element: JQuery): void;
        /**
         * Gets or sets the html of the view
         **/
        /**
         * Gets or sets the html of the view
         **/
        html: string;
    }
}
declare module latte {
    /**
     * A View containing an Item
     **/
    class ItemView extends View {
        /**
         *
         **/
        private _item;
        /**
         *
         **/
        constructor(item?: Item);
        /**
         * Overriden.
         **/
        onLayout(): void;
        /**
         * Gets or sets the item of the view
         **/
        /**
         * Gets or sets the item of the view
         **/
        item: Item;
    }
}
declare module latte {
    /**
     * Shows a message with eye sugar to improve usability and design.
     **/
    class MessageView extends View {
        /**
         *
         **/
        private _icon;
        descriptionElement: JQuery;
        /**
         * Pointer to the DOM element of icon holder.
         **/
        iconElement: JQuery;
        /**
         * Pointer to the DOM element of message text.
         **/
        messageElement: JQuery;
        /**
         * Creates the message view
         **/
        constructor();
        /**
         * Sets the icon as the default "alert" icon
         **/
        iconAlert(): MessageView;
        /**
         * Sets the icon as the default "error" icon
         **/
        iconError(): MessageView;
        /**
         * Sets the icon as the default "info" icon
         **/
        iconInfo(): MessageView;
        /**
         * Sets the icon as the default "alert" icon
         **/
        iconQuestion(): MessageView;
        /**
         * Gets or sets the description of the message
         **/
        /**
         * Gets or sets the description of the message
         **/
        description: string;
        /**
         * Gets or sets the icon of the message
         **/
        /**
         * Gets or sets the icon of the message
         **/
        icon: IconItem;
        /**
         * Gets or sets the message
         **/
        /**
         * Gets or sets the message
         **/
        message: string;
    }
}
declare module latte {
    /**
     * A view with an editable text box
     **/
    class TextView extends View {
        /**
         * Points to the TEXTAREA of the view.
         **/
        textElement: JQuery;
        /**
         * Creates the TextView
         **/
        constructor();
        /**
         * Gets or sets the text of the view
         **/
        /**
         * Gets or sets the text of the view
         **/
        text: string;
    }
}
declare module latte {
    /**
     * Shows a resizable dialog
     **/
    class DialogView extends View {
        private static initialized;
        /**
         * Initialize handlers at global level
         **/
        private static _initialize();
        /**
         * Shows an alert <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static alert(message: string, description?: string, items?: Item[]): DialogView;
        /**
         * Shows a question <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static ask(message: string, description?: string, items?: Item[]): DialogView;
        /**
         * Shows a question MessageView asking form deletion confirmation of the specified object
         * @param objectName
         * @param callback
         */
        static confirmDelete(objectName: string, callback: () => any): void;
        /**
         * Shows an error <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static error(message: string, description?: string, items?: Item[]): DialogView;
        /**
         * Shows an information <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static inform(message: string, description?: string, items?: Item[]): DialogView;
        /**
         * Shows the specified <c>message</c> within a DialogView. Optionally specifies <c>items</c> for the dialog.
         **/
        static showMessage(message: MessageView, items?: Item[]): DialogView;
        /**
         *
         **/
        private _cancelButton;
        /**
         *
         **/
        private _closeable;
        /**
         *
         **/
        private _defaultButton;
        /**
         * Pointer to the DOM element where the title bar lives
         **/
        barElement: JQuery;
        /**
         * Pointer to the <c>close</c> button
         **/
        closeButton: ButtonItem;
        /**
         * Collection of items to show as commands
         **/
        items: Collection<Item>;
        /**
         * Pointer to the DOM element where <c>items</c> are placed
         **/
        itemsElement: JQuery;
        /**
         * Pointer to the DOM element where title text is placed
         **/
        titleElement: JQuery;
        /**
         * Raised when the user is soliciting to close the dialog. If the event returns false, the close is cancelled.
         **/
        closing: LatteEvent;
        /**
         * Raised when the dialog has been closed.
         **/
        closed: LatteEvent;
        /**
         * Creates the Dialog
         **/
        constructor(view?: View, items?: Item[]);
        /**
         *
         **/
        private _onAddItem(item);
        /**
         *
         **/
        private _onRemoveItem(item);
        /**
         * Adds a button with the specified text and handler to the dialog items
         **/
        addButton(text: string, handler?: GenericCallback): DialogView;
        /**
         * Adds an 'Cancel' button to the dialog items
         **/
        addCancelButton(handler?: GenericCallback): DialogView;
        /**
         * Adds an 'No' button to the dialog items
         **/
        addNoButton(handler: GenericCallback): DialogView;
        /**
         * Adds an 'Ok' button to the dialog items
         **/
        addOkButton(handler: GenericCallback): DialogView;
        /**
         * Adds an 'Save' button to the dialog items
         **/
        addSaveButton(handler: GenericCallback): DialogView;
        /**
         * Adds a 'Yes' button to the dialog items
         **/
        addYesButton(handler: GenericCallback): DialogView;
        /**
         * Closes the dialog
         **/
        close(): boolean;
        /**
         *
         **/
        handler(): void;
        /**
         * Raises the <c>closed</c> event
         **/
        onClosed(): void;
        /**
         * Raises the <c>closing</c> event
         **/
        onClosing(): boolean;
        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(): void;
        /**
         * Shows the dialog as modal
         **/
        show(items?: Item[]): DialogView;
        /**
         * Gets or sets the button which is to be pressed by default when cancelling the dialog.
         If no button is set as default, this function will return the last button of <c>items</c> collection.
         **/
        /**
         * Gets or sets the button which is to be pressed by default when cancelling the dialog.
         If no button is set as default, this function will return the last button of <c>items</c> collection.
         **/
        cancelButton: ButtonItem;
        /**
         * Gets or sets a value indicating if the dialog is closable by default
         **/
        /**
         * Gets or sets a value indicating if the dialog is closable by default
         **/
        closeable: boolean;
        /**
         * Gets or sets the button which is to be pressed by default when pressing enter.
         If no button is set as default, this function will return the first button of <c>items</c> collection.
         **/
        /**
         * Gets or sets the button which is to be pressed by default when pressing enter.
         If no button is set as default, this function will return the first button of <c>items</c> collection.
         **/
        defaultButton: ButtonItem;
        /**
         * Gets or sets the title of the dialog
         **/
        /**
         * Gets or sets the title of the dialog
         **/
        title: string;
    }
}
declare module latte {
    /**
     * Renders a list with columns
     **/
    class ListView extends View {
        /**
         *
         **/
        private _selectedItem;
        /**
         * Collection of column headers of list.
         **/
        columnHeaders: Collection<ColumnHeader>;
        /**
         * Points to the DOM element where the column headers are placed.
         **/
        columnHeadersElement: JQuery;
        /**
         * Collection of items in list
         **/
        items: Collection<ListViewItem>;
        /**
         * Creates the ListView
         **/
        constructor();
        /**
         *
         **/
        _informSelectedItem(item: ListViewItem): void;
        /**
         *
         **/
        private _itemSelected(item);
        /**
         *
         **/
        private _onAddColumn(column);
        /**
         *
         **/
        private _onAddItem(item);
        /**
         *
         **/
        private _onRemoveColumn(column);
        /**
         *
         **/
        private _onRemoveItem(item);
        /**
         * Overriden. Raises the <c>layout</c> event
         **/
        onLayout(): void;
        /**
         * Gets or sets a value indicating if the column headers are currently visible
         **/
        /**
         * Gets or sets a value indicating if the column headers are currently visible
         **/
        columnHeadersVisible: boolean;
        /**
         * Gets or sets the selected item of the list
         *
         * @returns {ListViewItem}
         */
        /**
         * Gets or sets the selected item of the list
         *
         * @param {ListViewItem} value
         */
        selectedItem: ListViewItem;
        /**
         * Back field for event
         */
        private _selectedItemChanged;
        /**
         * Gets an event raised when the value of the selectedItem property changes
         *
         * @returns {LatteEvent}
         */
        selectedItemChanged: LatteEvent;
        /**
         * Raises the <c>selectedItem</c> event
         */
        onSelectedItemChanged(): void;
    }
}
declare module latte {
    /**
     *
     **/
    class NavigationListView extends NavigationView {
        /**
         *
         **/
        list: ListView;
        /**
         *
         **/
        toolbar: Toolbar;
        /**
         *
         **/
        constructor();
    }
}
declare module latte {
    /**
     * Renders a view that contains only TreeItems
     **/
    class TreeView extends View {
        /**
         *
         **/
        private _defaultGlyphCollapse;
        /**
         *
         **/
        private _defaultGlyphCollapseSelected;
        /**
         *
         **/
        private _defaultGlyphExpand;
        /**
         *
         **/
        private _defaultGlyphExpandSelected;
        /**
         *
         **/
        private _navigating;
        /**
         *
         **/
        private _navigatingCurrent;
        /**
         *
         **/
        private _navigatingPath;
        /**
         *
         **/
        private _selectedItem;
        /**
         *
         */
        private _addItem;
        /**
         *
         */
        private _removeItem;
        /**
         * Items of view
         **/
        items: Collection<TreeItem>;
        /**
         * Raised when an item of the view is selected
         **/
        itemSelected: LatteEvent;
        /**
         * Raised when the items of an item are loaded. This event is manually
         * triggered, it is raised when <c>TreeItem.reportItemsLoaded</c> is invoked.
         **/
        itemItemsLoaded: LatteEvent;
        /**
         * Creates the item
         **/
        constructor();
        /**
         *
         **/
        _informSelectedItem(item: TreeItem): void;
        /**
         * Advances in the navigation to a specific node path
         **/
        private _navigateToSection(items, index);
        /**
         *
         **/
        private onAddItem(item);
        /**
         *
         **/
        private onRemoveItem(item);
        /**
         * Goes to the specified path. Path is an array with names of nodes to visit.
         The path is in the format of the path found in <c>latte.Navigation.path</c>
         **/
        navigateToPath(path: string[]): void;
        /**
         * Raises the <c>itemItemsLoaded</c> event
         **/
        onItemItemsLoaded(item: TreeItem): void;
        /**
         * Raises the <c>itemSelected</c> event
         **/
        onItemSelected(item: TreeItem): void;
        /**
         * Gets an event raised when an item is added
         *
         * @returns {LatteEvent}
         */
        addItem: LatteEvent;
        /**
         * Gets or sets the default glyph for collapse
         **/
        /**
         * Gets or sets the default glyph for collapse
         **/
        defaultGlyphCollapse: Glyph;
        /**
         * Gets or sets the default glyph for collapse when item is selected
         **/
        /**
         * Gets or sets the default glyph for collapse when item is selected
         **/
        defaultGlyphCollapseSelected: Glyph;
        /**
         * Gets or sets the default glyph for expand
         **/
        /**
         * Gets or sets the default glyph for expand
         **/
        defaultGlyphExpand: Glyph;
        /**
         * Gets or sets the default glyph for expand when item is selected
         **/
        /**
         * Gets or sets the default glyph for expand when item is selected
         **/
        defaultGlyphExpandSelected: Glyph;
        /**
         * Gets a value indicating if the tree view is currently in the process
         of navigating to a specific node.
         **/
        navigating: boolean;
        /**
         * Gets the current navigation path as a string
         **/
        path: any;
        /**
         * Gets or sets the item who is selected on the tree
         **/
        /**
         * Gets or sets the item who is selected on the tree
         **/
        selectedItem: TreeItem;
        /**
         * Gets an event raised when an item is removed from tree
         *
         * @returns {LatteEvent}
         */
        removeItem: LatteEvent;
    }
}
