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
    * Requires the specified plugin
    *
    * @param {string} name
    * @param {function} callback
    */
    function _requirePlugin(name: any, callback: any): void;
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
        0 = 48,
        /**
        * One key
        *
        * @type {number}
        */
        1 = 49,
        /**
        * Two key
        *
        * @type {number}
        */
        2 = 50,
        /**
        * Three key
        *
        * @type {number}
        */
        3 = 51,
        /**
        * Four key
        *
        * @type {number}
        */
        4 = 52,
        /**
        * Five key
        *
        * @type {number}
        */
        5 = 53,
        /**
        * Siz key
        *
        * @type {number}
        */
        6 = 54,
        /**
        * Seven key
        *
        * @type {number}
        */
        7 = 55,
        /**
        * Eight key
        *
        * @type {number}
        */
        8 = 56,
        /**
        * Nine key
        *
        * @type {number}
        */
        9 = 57,
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
        static dragElement : JQuery;
        /**
        *
        */
        private static _dragging;
        /**
        * Gets a value indicating if the element is being dragged
        * @returns {boolean}
        */
        static dragging : boolean;
        /**
        *
        */
        private static _draggingElement;
        /**
        * Gets the UiElement currently being dragged (if any)
        * @returns {boolean}
        */
        static draggingElement : UiElement;
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
        static dropTarget : UiElement;
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
        public contextItems: Collection<Item>;
        /**
        * Holds a pointer of the element on the DOM.
        **/
        public element: JQuery;
        /**
        * Raised when the enabled state of item is changed.
        **/
        public enabledChanged: LatteEvent;
        /**
        * Raised when the element updates its layout.
        **/
        public layout: LatteEvent;
        /**
        * Raised when the menu with <c>contextItems</c> is about to be dislplayed.
        **/
        public contextItemsShow: LatteEvent;
        /**
        * Raised when the <c>visible</c> property value changes
        **/
        public visibleChanged: LatteEvent;
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
        public addClass(classString: string): UiElement;
        /**
        * Appends the view to the specified element.
        **/
        public appendTo(element: any): UiElement;
        /**
        * Passes css method to <c>element</c>
        **/
        public css(css: any, value?: any): UiElement;
        /**
        * Finalizes the element
        */
        public finalize(): void;
        /**
        * Raises the <c>contextItemsShow</c> event.
        **/
        public onContextItemsShow(): void;
        /**
        * Called when the element who shows dragging is created, from this UiElement.
        */
        public onCreateDragElement(): JQuery;
        /**
        * Raises the <c>dropped</c> event
        */
        public onDropped(): void;
        /**
        * Raises the <c>enabledChanged</c> event.
        **/
        public onEnabledChanged(): void;
        /**
        * Raises the <c>layout</c> event.
        **/
        public onLayout(): void;
        /**
        * Raises the <c>visibleChanged</c> event.
        **/
        public onVisibleChanged(): void;
        /**
        * Removes classes to the element
        **/
        public removeClass(classString: string): UiElement;
        /**
        * Shows a menu with the <c>contextItems</c> at the specified position.
        **/
        public showContextMenu(pageX: number, pageY: number): MenuOverlay;
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
        public dragOver : LatteEvent;
        /**
        * Raises the <c>dragOver</c> event
        */
        public onDragOver(): boolean;
        /**
        * Back field for event
        */
        private _finalizing;
        /**
        * Gets an event raised when the element is being finalized
        *
        * @returns {LatteEvent}
        */
        public finalizing : LatteEvent;
        /**
        * Raises the <c>finalizing</c> event
        */
        public onFinalizing(): any;
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
        public dropElement : LatteEvent;
        /**
        * Raises the <c>dropElement</c> event.
        */
        public onDropElement(): void;
        /**
        * Gets or sets a value indicating if the element is curerntly being dragged.
        * @returns {boolean}
        */
        /**
        * Gets or sets a value indicating if the element is curerntly being dragged.
        * @param value
        */
        public beingDragged : boolean;
        /**
        * Gets or sets the element who will act as source for dragging.
        * @returns {JQuery}
        */
        /**
        *
        * @param value
        */
        public dragSource : JQuery;
        /**
        * Gets an event raised when the element is dropped after a dragging operation
        */
        public dropped : LatteEvent;
        /**
        * Gets or sets a value indicating if the item is enabled.
        **/
        /**
        * Gets or sets a value indicating if the item is enabled.
        **/
        public enabled : boolean;
        /**
        * Property field
        */
        private _finalized;
        /**
        * Gets a value indicating if the element has been finalized
        *
        * @returns {boolean}
        */
        public finalized : boolean;
        /**
        * Gets or sets a value indicating if the element should be focusable
        **/
        /**
        * Gets or sets a value indicating if the element should be focusable
        **/
        public focusable : boolean;
        /**
        * Gets or sets the height of the element.
        **/
        /**
        * Gets or sets the height of the element.
        **/
        public height : number;
        /**
        * Gets or sets a value indicating if the element should be hidden while its being dragged.
        * @returns {boolean}
        */
        /**
        * Gets or sets a value indicating if the element should be hidden while its being dragged.
        * @param value
        */
        public hideWhileDragging : boolean;
        /**
        * Gets or sets a generic object to add extra information to the element.
        **/
        /**
        * Gets or sets a generic object to add extra information to the element.
        **/
        public tag : any;
        /**
        * Gets or sets the tooltip of the element
        **/
        /**
        * Gets or sets the tooltip of the element
        **/
        public tooltip : string;
        /**
        * Gets or sets a value indicating if the element should be visible.
        **/
        /**
        * Gets or sets a value indicating if the element should be visible.
        **/
        public visible : boolean;
        /**
        * Gets or sets the width of the element.
        **/
        /**
        * Gets or sets the width of the element.
        **/
        public width : number;
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
        public bringToFront(): void;
        /**
        * Gets the <c>MenuOverlay</c> who contains this <c>Item</c>
        **/
        public parentMenu : MenuOverlay;
        /**
        * Gets a value indicating if the parent of this <c>Item</c> is a <c>MenuOverlay</c>
        **/
        public parentIsMenu : boolean;
        /**
        * Gets or sets the tab or tab index of item when inside a <c>Ribbon</c>
        **/
        /**
        * Gets or sets the tab or tab index of item when inside a <c>Ribbon</c>
        **/
        public tab : any;
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
        static defaultButton : ButtonItem;
        /**
        * Gets or sets the mainView of the User Agent Viewport
        **/
        /**
        * Gets or sets the mainView of the User Agent Viewport
        **/
        static mainView : View;
        /**
        * Gets or sets the modalView of the User Agent Viewport
        **/
        /**
        * Gets or sets the modalView of the User Agent Viewport
        **/
        static modalView : View;
        /**
        * Gets or sets a value indicating if the view is in a small screen (aka iPhone Screen)
        * @returns {boolean}
        */
        /**
        * Gets or sets a value indicating if the view is in a small screen (aka iPhone Screen)
        * @param value
        */
        static smallScreen : boolean;
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
        public container: JQuery;
        /**
        * Raised when the view stops being visible
        **/
        public hidden: LatteEvent;
        /**
        * Raised when the view is loaded and about to be placed into its container
        **/
        public load: LatteEvent;
        /**
        * Raised when the view is already visible
        **/
        public shown: LatteEvent;
        /**
        * Raised when the view is unloaded. If result of event is <c>false</c> unload will be aborted.
        **/
        public unload: LatteEvent;
        /**
        * Raised when the value of <c>unsavedChanges()</c> changes
        **/
        public unsavedChangesChanged: LatteEvent;
        /**
        * Raised when <c>saveChanges()</c> is invoked.
        It may return false to cancel furhter operation.
        **/
        public savingChanges: LatteEvent;
        /**
        * Raised when <c>saveChanges()</c> has finalized.
        **/
        public savedChanges: LatteEvent;
        /**
        * Creates the <c>View</c>
        **/
        constructor();
        /**
        * Focuses the first input if any
        **/
        public focusInput(): void;
        /**
        * Returns the current view of the view
        **/
        public getView(): View;
        /**
        * Raises the <c>hidden</c> event
        **/
        public onHidden(): void;
        /**
        * Raises the <c>layout</c> event
        **/
        public onLayout(): void;
        /**
        * Raises the <c>load</c> event
        **/
        public onLoad(): void;
        /**
        * Raises the <c>savedChanges</c> event
        **/
        public onSavedChanges(): void;
        /**
        * Called to save changes
        */
        public onSaveChanges(): void;
        /**
        * Raises the <c>savingChanges</c> event
        **/
        public onSavingChanges(): any;
        /**
        * Raises the <c>shown</c> event
        **/
        public onShown(): void;
        /**
        * Raises the <c>unload</c> event
        **/
        public onUnload(): any;
        /**
        * Raises the <c>unsavedChangesChanged</c> event
        **/
        public onUnsavedChangesChanged(): void;
        /**
        * Saves changes on view.
        Override <c>onSavingChanges</c> to custom save your data.
        **/
        public saveChanges(): void;
        /**
        * Sets the <c>View</c> inside this view.
        If view swap fails, it will return <c>false</c>
        **/
        public setView(view?: View, transition?: Transition, milliseconds?: number): boolean;
        /**
        * SPECIAL GETTER
        Gets or sets a value indicating if the view contains elments with unsaved changes
        **/
        public getUnsavedChanges(): boolean;
        /**
        * SPECIAL SETTER
        Gets or sets a value indicating if the view contains elments with unsaved changes
        **/
        public setUnsavedChanges(value?: boolean, silent?: boolean): void;
        /**
        * Sets this view as the view of the specified view.
        **/
        public viewOf(view: View): View;
        /**
        * Gets or sets the info item of the view. Its shown in the back of the container
        and centered into the view.
        **/
        /**
        * Gets or sets the info item of the view. Its shown in the back of the container
        and centered into the view.
        **/
        public infoItem : Item;
        /**
        * Gets or sets the padding of the container
        **/
        /**
        * Gets or sets the padding of the container
        **/
        public padding : number;
        /**
        * Gets or sets a value indicating if the parent of the view is modal
        **/
        /**
        * Gets or sets a value indicating if the parent of the view is modal
        **/
        public parentIsModal : boolean;
        /**
        * Gets the parent view of this view.
        **/
        public parentView : View;
        /**
        * Gets or sets a value indicating if the view contains elments with unsaved changes
        **/
        /**
        * Gets or sets a value indicating if the view contains elments with unsaved changes
        **/
        public unsavedChanges : boolean;
        /**
        * Gets or sets the view of the view
        **/
        /**
        * Gets or sets the view of the view
        **/
        public view : View;
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
        public valueChanged: LatteEvent;
        /**
        * Every ValueItem must create its own <c>input</c> element
        **/
        constructor();
        /**
        *
        **/
        public getValue(): any;
        /**
        * Gets the value as a string
        * @returns {string}
        */
        public getValueString(): string;
        /**
        * Raises the <c>valueChanged</c> event
        **/
        public onValueChanged(): void;
        /**
        *
        **/
        public setValue(value: any): void;
        /**
        * Gets or sets the value of the item
        <b>Must be overriden</b>
        **/
        /**
        * Gets or sets the value of the item
        <b>Must be overriden</b>
        **/
        public value : any;
        /**
        * Gets the value as a string
        **/
        public valueString : any;
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
        public clone(): DrawingRectangle;
        /**
        * Returns a value indicating if the specified point is contained in the rectangle
        * @param p
        */
        public containsPoint(p: Point): boolean;
        /**
        * Returns a value indicating if the rectangle fits in the specified container
        *
        * @param r
        * @returns {boolean}
        */
        public fitsIn(r: DrawingRectangle): boolean;
        /**
        * Inflates the rectangle
        * @param width
        * @param height
        */
        public inflate(width: number, height: number): void;
        /**
        * Gets a value indicating if the rectangle intersects with the specified rectangle
        * @param r
        * @returns {boolean}
        */
        public intersectsWidth(r: DrawingRectangle): boolean;
        /**
        * Offsets the rectangle
        * @param x
        * @param y
        */
        public offset(x: number, y: number): void;
        /**
        * Changes the position of the rectangle to match the specified Bottom
        * @param bottom
        */
        public positionBottom(bottom: number): void;
        /**
        * Changes the position of the rectangle to match the specified Right
        * @param right
        */
        public positionRight(right: number): void;
        /**
        * Changes the size of the rectangle to match the specified Right
        * @param right
        */
        public sizeBottom(bottom: number): void;
        /**
        * Changes the size of the rectangle to match the specified Right
        * @param right
        */
        public sizeRight(right: number): void;
        /**
        * Scales the rectangle to fit the specified size
        * @param size
        */
        public scaleToFit(size: Size): DrawingRectangle;
        /**
        * Returns a scaled rectangle
        * @param width
        */
        public scaleToHeight(height: number): DrawingRectangle;
        /**
        * Returns a scaled rectangle
        * @param width
        */
        public scaleToWidth(width: number): DrawingRectangle;
        /**
        * Gets the aspect ratio of the rectangle
        *
        * @returns {number}
        */
        public aspectRatio : number;
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
        public center : Point;
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
        public centerX : number;
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
        public centerY : number;
        /**
        * Gets the Bottom coordinate
        *
        * @returns {number}
        */
        public bottom : number;
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
        public bounds : DrawingRectangle;
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
        public height : number;
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
        public left : number;
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
        public location : Point;
        /**
        * Gets the Right coordinate
        *
        * @returns {number}
        */
        public right : number;
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
        public top : number;
        /**
        * Gets or sets the size of the rectangle
        *
        * @returns {DrawingSize}
        */
        /**
        * Gets or sets the size of the rectangle
        * @param value
        */
        public size : Size;
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
        public tag : any;
        /**
        * Gets the top left point
        *
        * @returns {Point}
        */
        public topLeft : Point;
        /**
        * Gets the top right point
        *
        * @returns {Point}
        */
        public topRight : Point;
        /**
        * Gets the bottom left point
        *
        * @returns {Point}
        */
        public bottomLeft : Point;
        /**
        * Gets the bottom right point
        *
        * @returns {Point}
        */
        public bottomRight : Point;
        /**
        * Gets a value indicating if the rectangle is horizontal
        *
        * @returns {boolean}
        */
        public isHorizontal : boolean;
        /**
        * Gets a value indicating if the rectangle is a square
        *
        * @returns {boolean}
        */
        public isSquare : boolean;
        /**
        * Gets a value indicating if the rectangle is vertical
        *
        * @returns {boolean}
        */
        public isVertical : boolean;
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
        public width : number;
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
        public container: JQuery;
        /**
        * Collection of items in the stack
        **/
        public items: Collection<Item>;
        /**
        * Raised when the items are changed
        **/
        public itemsChanged: LatteEvent;
        /**
        * Creates the stack of items
        **/
        constructor(items?: Item[]);
        /**
        *
        **/
        public onAddItem(item: Item): void;
        /**
        *
        **/
        public onRemoveItem(item: Item): void;
        /**
        * Adds an item to the <c>items</c> collection
        **/
        public add(item: Item): void;
        /**
        * Clears all elements of collection
        **/
        public clear(): void;
        /**
        * Raises the <c>itemsChanged</c> event
        **/
        public onItemsChanged(): void;
        /**
        * Overriden
        **/
        public onLayout(): void;
        /**
        * Removes an item from the <c>items</c> collection
        **/
        public remove(item: Item): void;
        /**
        * Gets the count of <c>items</c> collection
        **/
        public count : number;
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
        public padding : number;
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
        public close(): void;
        /**
        * Sets the parent of the overlay, and the overlay is inserted as first node of the parent
        * @param parent
        */
        public setFirstInParent(parent: UiElement): void;
        /**
        * Shows at the specified position of the specified element
        *
        * @param side
        * @param element
        */
        public showAtSide(side: Side, uielement: UiElement): void;
        /**
        * Gets the left coordinate of the overlay
        * @returns {number}
        */
        /**
        * Sets the top coordinate of the overlay
        *
        * @param value
        */
        public left : number;
        /**
        * Gets or sets the parent element of the overlay (To inherit style and such)
        * @returns {UiElement}
        */
        /**
        * Gets or sets the parent element of the overlay (To inherit style and such)
        * @param value
        */
        public parent : UiElement;
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
        public top : number;
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
        public draw(c: DrawingContext): void;
        /**
        * Updates the element
        */
        public update(): void;
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
        public hidden : boolean;
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
        public paused : boolean;
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
        public selectedChanged: LatteEvent;
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
        public onSelectedChanged(): void;
        /**
        * Sets a value indicaing if the item is currently selected.
        Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
        **/
        public setSelected(value?: boolean, raiseEvent?: boolean): void;
        /**
        * Gets or sets a value indicaing if the item is currently selected.
        Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
        **/
        /**
        * Gets or sets a value indicaing if the item is currently selected.
        Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
        **/
        public selected : boolean;
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
        public onLayout(): void;
        /**
        * Back field for event
        */
        private _anchorTopChanged;
        /**
        * Gets an event raised when the value of anchorTop changes
        *
        * @returns {LatteEvent}
        */
        public anchorTopChanged : LatteEvent;
        /**
        * Raises the <c>anchorTopChanged</c> event
        */
        public onAnchorTopChanged(): void;
        /**
        * Back field for event
        */
        private _anchorRightChanged;
        /**
        * Gets an event raised when the value of anchorRight changes
        *
        * @returns {LatteEvent}
        */
        public anchorRightChanged : LatteEvent;
        /**
        * Raises the <c>anchorRightChanged</c> event
        */
        public onAnchorRightChanged(): void;
        /**
        * Back field for event
        */
        private _anchorBottomChanged;
        /**
        * Gets an event raised when the value of anchorBottom changes
        *
        * @returns {LatteEvent}
        */
        public anchorBottomChanged : LatteEvent;
        /**
        * Raises the <c>anchorBottomChanged</c> event
        */
        public onAnchorBottomChanged(): void;
        /**
        * Back field for event
        */
        private _anchorLeftChanged;
        /**
        * Gets an event raised when when what?
        *
        * @returns {LatteEvent}
        */
        public anchorLeftChanged : LatteEvent;
        /**
        * Raises the <c>anchorLeftChanged</c> event
        */
        public onAnchorLeftChanged(): void;
        /**
        * Back field for event
        */
        private _anchorTopVisibleChanged;
        /**
        * Gets an event raised when the value of anchorTopVisible changes
        *
        * @returns {LatteEvent}
        */
        public anchorTopVisibleChanged : LatteEvent;
        /**
        * Raises the <c>anchorTopVisibleChanged</c> event
        */
        public onAnchorTopVisibleChanged(): void;
        /**
        * Back field for event
        */
        private _anchorRightVisibleChanged;
        /**
        * Gets an event raised when the value of anchorRightVisible changes
        *
        * @returns {LatteEvent}
        */
        public anchorRightVisibleChanged : LatteEvent;
        /**
        * Raises the <c>anchorRightVisibleChanged</c> event
        */
        public onAnchorRightVisibleChanged(): void;
        /**
        * Back field for event
        */
        private _anchorBottomVisibleChanged;
        /**
        * Gets an event raised when the value of anchorBottomVisible changed
        *
        * @returns {LatteEvent}
        */
        public anchorBottomVisibleChanged : LatteEvent;
        /**
        * Raises the <c>anchorBottomVisibleChanged</c> event
        */
        public onAnchorBottomVisibleChanged(): void;
        /**
        * Back field for event
        */
        private _anchorLeftVisibleChanged;
        /**
        * Gets an event raised when the value of anchorLeftVisible changed
        *
        * @returns {LatteEvent}
        */
        public anchorLeftVisibleChanged : LatteEvent;
        /**
        * Raises the <c>anchorLeftVisibleChanged</c> event
        */
        public onAnchorLeftVisibleChanged(): void;
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
        public anchorTop : Item;
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
        public anchorTopVisible : boolean;
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
        public anchorRight : Item;
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
        public anchorRightVisible : boolean;
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
        public anchorBottom : Item;
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
        public anchorBottomVisible : boolean;
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
        public anchorLeft : Item;
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
        public anchorLeftVisible : boolean;
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
        public sideWrap: View;
        /**
        * Splitter between <c>side</c> and <c>view</c>
        **/
        public splitterElement: JQuery;
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
        public onLayout(): void;
        /**
        * Gets or sets the sensitivity radius for dragging the splitter
        **/
        /**
        * Gets or sets the sensitivity radius for dragging the splitter
        **/
        public sensitivity : number;
        /**
        * Gets or sets the side of the side view
        **/
        /**
        * Gets or sets the side of the side view
        **/
        public side : Side;
        /**
        * Gets or sets the wide of the side view.
        If value is lower than 1, then it will be taken as the percent to occupy, i.e. 0.5 = 50% of space.
        **/
        /**
        * Gets or sets the wide of the side view.
        If value is lower than 1, then it will be taken as the percent to occupy, i.e. 0.5 = 50% of space.
        **/
        public sideSize : number;
        /**
        * Gets or sets the side <c>View</c>
        **/
        /**
        * Gets or sets the side <c>View</c>
        **/
        public sideView : View;
        /**
        * Sets a value indicating if side is currently visible
        * @returns {boolean}
        */
        /**
        * Gets a value indicating if side is currently visible
        * @param value
        */
        public sideVisible : boolean;
        /**
        * Gets or sets the wide of the splitterElement
        **/
        /**
        * Gets or sets the wide of the splitterElement
        **/
        public splitterSize : number;
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
        public toString(): string;
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
        *
        **/
        private _name;
        /**
        *
        **/
        private _size;
        /**
        *
        **/
        private _u;
        /**
        *
        **/
        private _url;
        /**
        *
        **/
        private _v;
        /**
        *
        **/
        private _x;
        /**
        *
        **/
        private _y;
        /**
        * Creates the icon
        **/
        constructor();
        /**
        * Returns a clone of the icon
        **/
        public clone(): IconItem;
        /**
        * Gets or sets the name of the icon
        **/
        /**
        * Gets or sets the name of the icon
        **/
        public name : string;
        /**
        * Gets or sets the size of the icon
        The only possible values are: <c>16</c> | <c>32</c> | <c>48</c>
        **/
        /**
        * Gets or sets the size of the icon
        The only possible values are: <c>16</c> | <c>32</c> | <c>48</c>
        **/
        public size : number;
        /**
        * Gets or sets the U coordiante of the icon inside image
        **/
        /**
        * Gets or sets the U coordiante of the icon inside image
        **/
        public u : number;
        /**
        * Gets or sets the URL of the icon's image URL
        **/
        /**
        * Gets or sets the URL of the icon's image URL
        **/
        public url : string;
        /**
        * Gets or sets the U coordiante of the icon inside image
        **/
        /**
        * Gets or sets the U coordiante of the icon inside image
        **/
        public v : number;
        /**
        * Gets or sets the X coordinate of icon inside image (As a sprite)
        **/
        /**
        * Gets or sets the X coordinate of icon inside image (As a sprite)
        **/
        public x : number;
        /**
        * Gets or sets the Y coordinate of icon inside image (As a sprite)
        **/
        /**
        * Gets or sets the Y coordinate of icon inside image (As a sprite)
        **/
        public y : number;
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
        public click: LatteEvent;
        /**
        * Raised when <c>checked()</c> value changes
        **/
        public checkedChanged: LatteEvent;
        /**
        * Raised when <c>faceVisible()</c> value changes
        **/
        public faceVisibleChanged: LatteEvent;
        /**
        * Raised when <c>pressed()</c> value changes
        **/
        public pressedChanged: LatteEvent;
        /**
        * Raised when <c>selected()</c> value changes
        **/
        public selectedChanged: LatteEvent;
        /**
        * Raised when <c>withContext()</c> value changes
        **/
        public withContextChanged: LatteEvent;
        /**
        *
        **/
        constructor();
        /**
        * Returns the value of the checked property
        **/
        public getChecked(): boolean;
        /**
        *
        **/
        public getContextAt(): Side;
        /**
        *
        **/
        public getSelected(): boolean;
        /**
        * Raises the <c>checkedChanged</c> event
        **/
        public onCheckedChanged(): void;
        /**
        * Raises the <c>click</c> event
        **/
        public onClick(): void;
        /**
        * Overriden. Raises the <c>enabledChanged</c> event
        **/
        public onEnabledChanged(): void;
        /**
        * Raises the <c>faceVisibleChanged</c> event
        **/
        public onFaceVisibleChanged(): void;
        /**
        * Raises the <c>pressedChanged</c> event
        **/
        public onPressedChanged(): void;
        /**
        * Raises the <c>selectedChanged</c> event
        **/
        public onSelectedChanged(): void;
        /**
        * Raises the <c>withContextChanged</c> event
        **/
        public onWithContextChanged(): void;
        /**
        * Sets a value indicating if the item is currently checked.
        Optionally omits the <c>checkedChanged</c> event trigger.
        **/
        public setChecked(value: boolean, silent?: boolean): void;
        /**
        *
        **/
        public setContextAt(value: Side): void;
        /**
        *
        **/
        public setSelected(value: boolean, silent?: boolean): void;
        /**
        * Gets or sets a value indicating if the item is checkable.
        When checkable, the item will be turned to checked when clicked.
        **/
        /**
        * Gets or sets a value indicating if the item is checkable.
        When checkable, the item will be turned to checked when clicked.
        **/
        public checkable : boolean;
        /**
        * Gets or sets the checked state of the clickable
        **/
        /**
        * Gets or sets the checked state of the clickable
        **/
        public checked : boolean;
        /**
        * Gets or sets a value indicating if click event will propagate as usual.
        If set to false, event propagation will be suspended on click.
        **/
        /**
        * Gets or sets a value indicating if click event will propagate as usual.
        If set to false, event propagation will be suspended on click.
        **/
        public clickPropagation : boolean;
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
        public contextAt : Side;
        /**
        * Gets or sets the visibility of the button face
        **/
        /**
        * Gets or sets the visibility of the button face
        **/
        public faceVisible : boolean;
        /**
        *
        **/
        public getFaceVisible(): boolean;
        /**
        * Sets a value indicating if the item's face is currently visible.
        **/
        public setFaceVisible(value?: boolean, silent?: boolean): void;
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
        public flatSide : Side;
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
        public openSide : Side;
        /**
        * Gets or sets a value indicating if the item is currently pressed
        **/
        /**
        * Gets or sets a value indicating if the item is currently pressed
        **/
        public pressed : boolean;
        /**
        * Gets or sets a value indicating if the item is selectable.
        If <c>selectable()</c>, Item will be selected when mouse hovers over it.
        **/
        /**
        * Gets or sets a value indicating if the item is selectable.
        If <c>selectable()</c>, Item will be selected when mouse hovers over it.
        **/
        public selectable : boolean;
        /**
        * Gets or sets a value indicating if the item is currently selected.
        **/
        /**
        * Gets or sets a value indicating if the item is currently selected.
        **/
        public selected : boolean;
        /**
        * Gets or sets a value indicating if the item has currently context
        **/
        /**
        * Gets or sets a value indicating if the item has currently context
        **/
        public withContext : boolean;
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
        public contentElement: JQuery;
        /**
        * Points to the element where the description is stored
        **/
        public descriptionElement: JQuery;
        /**
        * Points to the element where the icon is stored
        **/
        public iconElement: JQuery;
        /**
        * Points to the element where the text is stored
        **/
        public textElement: JQuery;
        /**
        * Raised when user clicks the label and its a link label
        **/
        public navigate: LatteEvent;
        /**
        * Raised when description() value changes
        **/
        public descriptionChanged: LatteEvent;
        /**
        * Raised when icon() value changes
        **/
        public iconChanged: LatteEvent;
        /**
        * Raised when text() value changes
        **/
        public textChanged: LatteEvent;
        /**
        *
        **/
        constructor(text?: string, description?: string, icon?: IconItem, title?: number);
        /**
        * Updates the <c>.icon-and-text</c> flag.
        Also updates margin of label-cotent
        **/
        public updateIconAndTextFlag(): void;
        /**
        * Updates the <c>white-space</c> CSS property
        **/
        private _updateWhitespace();
        /**
        * Raises the <c>descriptionChanged</c> event
        **/
        public onDescriptionChanged(): void;
        /**
        * Raises the <c>iconChanged</c> event
        **/
        public onIconChanged(): void;
        /**
        * Raises the <c>navigate</c> event
        **/
        public onNavigate(): void;
        /**
        * Raises the <c>textChanged</c> event
        **/
        public onTextChanged(): void;
        /**
        * Gets or sets the description of label, shown below the text.
        **/
        /**
        * Gets or sets the description of label, shown below the text.
        **/
        public description : string;
        /**
        * Gets or sets the direction of the label
        **/
        /**
        * Gets or sets the direction of the label
        **/
        public direction : Direction;
        /**
        * Gets or sets the icon of the label
        **/
        /**
        * Gets or sets the icon of the label
        **/
        public icon : IconItem;
        public iconAndTextPadding : number;
        /**
        * Gets or sets a value indicating if the label has a link style
        **/
        /**
        * Gets or sets a value indicating if the label has a link style
        **/
        public linkStyle : boolean;
        /**
        * Gets or sets if label uses preformatted text. Or PRE whitespace
        **/
        /**
        * Gets or sets if label uses preformatted text. Or PRE whitespace
        **/
        public preformatted : boolean;
        /**
        * Gets or sets the text of the label. This text may include HTML.
        **/
        /**
        * Gets or sets the text of the label. This text may include HTML.
        **/
        public text : string;
        /**
        * Gets or sets a value indicating if the text is wrapped in lines
        **/
        /**
        * Gets or sets a value indicating if the text is wrapped in lines
        **/
        public textWrap : boolean;
        /**
        * Gets or sets the title level of this label.
        Possible values are in the range from 0 to 5.
        **/
        /**
        * Gets or sets the title level of this label.
        Possible values are in the range from 0 to 5.
        **/
        public title : number;
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
        public applyOn(c: DrawingContext): void;
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
        public color : Color;
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
        public afterDraw(c: DrawingContext): void;
        /**
        * Prepares context for drawning
        * @param c
        */
        public beforeDraw(c: DrawingContext): void;
        /**
        * Override
        * @param c
        */
        public draw(c: DrawingContext): void;
        /**
        * Performs a complete draw with preparation and toilet flush
        * @param c
        */
        public completeDraw(c: DrawingContext): void;
        /**
        * Gets the rotation point. Override to specify point. Center by default.
        * @returns {Point}
        */
        public getRotationPoint(): Point;
        /**
        * Gets nodes at specified point
        * @param p
        * @returns {Array}
        */
        public getNodesAtPoint(p: Point, deep?: boolean): DrawingNode[];
        /**
        * Gets the nodes of the specified type.
        * Additionally deep might be specified to search internally.
        * @param type
        * @returns {DrawingNode[]}
        */
        public getNodesByType(type: Function, deep?: boolean): DrawingNode[];
        /**
        * Gets a value indicating if item is running an animation of the specified key
        * @param key
        * @returns {Animation|any}
        */
        public isRunningAnimationOfKey(key: string): boolean;
        /**
        * Called when a node is added
        * @param node
        */
        public onNodeAdded(node: DrawingNode): void;
        /**
        * Called when a node is removed
        * @param node
        */
        public onNodeRemoved(node: DrawingNode): void;
        /**
        * Runs the specified animation
        * @param a
        */
        public runAnimation(a: Animation, callback?: () => void): void;
        /**
        * Runs the specified animation by using the specified key
        * @param a
        * @param key
        */
        public runAnimationWithKey(a: Animation, key: string, callback?: () => void): void;
        /**
        * Stops all running animations
        */
        public stopAnimations(): void;
        /**
        * Stops the animation of the specified key
        * @param key
        */
        public stopAnimation(key: string): void;
        /**
        * Override
        */
        public update(): void;
        /**
        * Gets a value indicating if the node is currently being animated
        *
        * @returns {boolean}
        */
        public animating : boolean;
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
        public angle : number;
        /**
        * Field for nodes property
        */
        private _nodes;
        /**
        * Gets the nodes of the scene
        *
        * @returns {Collection<DrawingNode>}
        */
        public nodes : Collection<DrawingNode>;
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
        public opacity : number;
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
        public parent : DrawingNode;
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
        public scene : DrawingScene;
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
        public buttons: Collection<ButtonItem>;
        /**
        * Raised when some button is checked
        **/
        public checkedChanged: LatteEvent;
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
        public onCheckedChanged(): void;
        /**
        * Overriden.
        **/
        public onEnabledChanged(): void;
        /**
        * Overriden.
        **/
        public onLayout(): void;
        /**
        * Gets the checked button of the group
        **/
        /**
        * Gets the checked button of the group
        **/
        public checkedButton : ButtonItem;
        /**
        * Gets or sets the direction of the groups
        **/
        /**
        * Gets or sets the direction of the groups
        **/
        public direction : Direction;
        /**
        * Gets ors sets a value indicating if the face of the button group should
        be visible.
        **/
        /**
        * Gets ors sets a value indicating if the face of the button group should
        be visible.
        **/
        public faceVisible : boolean;
        /**
        * Gets or sets a value indicating if the group allows multiple buttons to
        be checked at the same time
        **/
        /**
        * Gets or sets a value indicating if the group allows multiple buttons to
        be checked at the same time
        **/
        public multiCheck : boolean;
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
        public items: Collection<Item>;
        /**
        * Label inside button. It supports the <c>icon</c>, <c>text()</c> and <c>description</c>
        properties, among other features.
        **/
        public label: LabelItem;
        /**
        * Raised when items are about to be shown
        **/
        public loadItems: LatteEvent;
        /**
        * Raised when the items are shown
        **/
        public itemsShown: LatteEvent;
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
        public getContextAt(): Side;
        /**
        * Returns a value indicating if the button contains items or will load them eventually
        **/
        public hasItems : boolean;
        /**
        * Hides the MenuOverlay showing this button's items
        **/
        public hideItems(): void;
        /**
        * Overriden.
        **/
        public onClick(): void;
        /**
        * Overriden.
        **/
        public onFaceVisibleChanged(): void;
        /**
        * Raises the <c>itemsShown</c> event
        **/
        public onItemsShown(menuItem: MenuOverlay): void;
        /**
        * Overriden.
        **/
        public onPressedChanged(): void;
        /**
        * Overriden.
        **/
        public onSelectedChanged(): void;
        /**
        * Overriden.
        **/
        public onWithContextChanged(): void;
        /**
        *
        **/
        public setContextAt(value: Side): void;
        /**
        * Shows the items of the button. Optionally specifies the side and edge on which items are shown.
        **/
        public showItems(side?: Side, edge?: Side): void;
        /**
        * Gets or sets the description of the button
        **/
        /**
        * Gets or sets the description of the button
        **/
        public description : string;
        /**
        * Gets or sets the direction of the button.
        **/
        /**
        * Gets or sets the direction of the button.
        **/
        public direction : Direction;
        public dropdown : ClickableItem;
        /**
        * Gets or sets the visibility of the dropdown.
        When <c>null</c> dropdown will be shown automatically when items are added.
        **/
        /**
        * Gets or sets the visibility of the dropdown.
        When <c>null</c> dropdown will be shown automatically when items are added.
        **/
        public dropdownVisible : boolean;
        /**
        * Gets or sets the Glyph of the button. The glyph is displayed to indicate the direction on which items will be shown.
        **/
        /**
        * Gets or sets the Glyph of the button. The glyph is displayed to indicate the direction on which items will be shown.
        **/
        public glyph : IconItem;
        /**
        * Gets or sets the icon of the button
        **/
        /**
        * Gets or sets the icon of the button
        **/
        public icon : IconItem;
        /**
        * Gets or sets the edge on wich items menu is shown.
        **/
        /**
        * Gets or sets the edge on wich items menu is shown.
        **/
        public itemsEdge : Side;
        /**
        * Gets the MenuOverlay containing items, If currently being shown
        **/
        /**
        * Sets the menu containing the items.
        * SET BY CODE, you should not use this method.
        *
        * @param value
        */
        public itemsMenu : MenuOverlay;
        /**
        * Gets or sets the side of button where items menu is shown.
        **/
        /**
        * Gets or sets the side of button where items menu is shown.
        **/
        public itemsSide : Side;
        /**
        * Gets a boolean indicating if the items menu is currently showing
        **/
        public showingItems : any;
        /**
        * Gets or sets a value indicating if the button is splitted.
        **/
        /**
        * Gets or sets a value indicating if the button is splitted.
        **/
        public split : boolean;
        /**
        * Gets or sets the text of the button
        **/
        /**
        * Gets or sets the text of the button
        **/
        public text : string;
        /**
        * Gets a flag indicating if the button will load items before showing them
        **/
        public willLoadItems : boolean;
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
        public faceElement: JQuery;
        /**
        * Holds the items to a certain width
        **/
        public holderElement: JQuery;
        /**
        * Collection of items in the toolbar
        **/
        public items: Collection<Item>;
        /**
        * Element where the items are placed
        **/
        public itemsElement: JQuery;
        /**
        * Collection of items shown in the opposite side of toolbar
        **/
        public sideItems: Collection<Item>;
        /**
        * Element where the side items are placed
        **/
        public sideItemsElement: JQuery;
        /**
        * Raised when items are addded or removed
        **/
        public itemsChanged: LatteEvent;
        /**
        * Raised when side items are addded or removed
        **/
        public sideItemsChanged: LatteEvent;
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
        public onItemsChanged(): void;
        /**
        * Raises the <c>itemsChanged</c> event
        **/
        public onSideItemsChanged(): void;
        /**
        * Gets or sets the direction of the toolbar
        **/
        /**
        * Gets or sets the direction of the toolbar
        **/
        public direction : Direction;
        /**
        * Gets or sets a value indicating if the face of toolbar should be visible.
        **/
        /**
        * Gets or sets a value indicating if the face of toolbar should be visible.
        **/
        public faceVisible : boolean;
        /**
        * Gets or sets the wide of the items holder to limit the area where items are placed.
        A value of zero or lower will set the holder to the wide of toolbar
        **/
        /**
        * Gets or sets the wide of the items holder to limit the area where items are placed.
        A value of zero or lower will set the holder to the wide of toolbar
        **/
        public holderWide : number;
        /**
        * Gets or sets the padding of the toolbar.
        Can be set to <c>null</c> to reset padding to original.
        **/
        /**
        * Gets or sets the padding of the toolbar.
        Can be set to <c>null</c> to reset padding to original.
        **/
        public padding : number;
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
        public label: LabelItem;
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
        public description : string;
        /**
        * Gets or sets the icon of the item's label
        **/
        /**
        * Gets or sets the icon of the item's label
        **/
        public icon : IconItem;
        /**
        * Gets or sets the text of the item's label
        **/
        /**
        * Gets or sets the text of the item's label
        **/
        public text : string;
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
        public _updateTimeComponent(): void;
        /**
        * Field for dateItem property
        */
        private _dateItem;
        /**
        * Gets the date item
        *
        * @returns {DateItem}
        */
        public dateItem : DateItem;
        /**
        * Field for checkbox property
        */
        private _checkbox;
        /**
        * Gets the checkbox of item
        *
        * @returns {CheckboxItem}
        */
        public checkbox : CheckboxItem;
        /**
        * Field for hourCombo property
        */
        private _hourCombo;
        /**
        * Gets the hour combo item
        *
        * @returns {ComboItem}
        */
        public hourCombo : ComboItem;
        /**
        * Field for minuteCombo property
        */
        private _minuteCombo;
        /**
        * Gets the minutes combo Item
        *
        * @returns {ComboItem}
        */
        public minuteCombo : ComboItem;
        /**
        * Gets or sets the date of the picker
        **/
        /**
        * Gets or sets the date of the picker
        **/
        public date : DateTime;
        /**
        * Gets or sets a value indicating if the date part of picker should be visible
        **/
        /**
        * Gets or sets a value indicating if the date part of picker should be visible
        **/
        public dateVisible : boolean;
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
        public nullable : boolean;
        /**
        * Back field for event
        */
        private _nullableChanged;
        /**
        * Gets an event raised when the value of the nullable property changes
        *
        * @returns {LatteEvent}
        */
        public nullableChanged : LatteEvent;
        /**
        * Raises the <c>nullable</c> event
        */
        public onNullableChanged(): void;
        /**
        * Gets or sets a value indicating if the time part of picker should be visible
        **/
        /**
        * Gets or sets a value indicating if the time part of picker should be visible
        **/
        public timeVisible : boolean;
        /**
        * Gets or sets the date of the picker, as a string
        **/
        /**
        * Gets or sets the date of the picker, as a string
        **/
        public value : any;
    }
}
declare module latte {
    class StackOverlay extends Overlay {
        public stack: ItemStack;
        constructor();
        /**
        * Gets the collection of items of stack
        *
        * @returns {latte.Collection<latte.Item>}
        */
        public items : Collection<Item>;
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
        public items: Collection<Item>;
        /**
        * Creates the View with the specified amount of columns.
        **/
        constructor(columns?: number);
        /**
        * Called when an item is added to the items collection
        **/
        public onAddItem(item: Item): void;
        /**
        * Called when an item is removed to the items collection
        **/
        public onRemoveItem(item: Item): void;
        /**
        * Returns the column at the specified index. First column is zero
        **/
        public getColumnAt(index: number): JQuery;
        /**
        * Raises the <c>layout</c> event
        **/
        public onLayout(): void;
        /**
        * Gets or sets the weights of columns for computing their width.
        Weights must be numbers between 0 and 100.
        **/
        /**
        * Gets or sets the weights of columns for computing their width.
        Weights must be numbers between 0 and 100.
        **/
        public columnWeights : number[];
        /**
        * Gets or sets the number of columns in the view.
        **/
        /**
        * Gets or sets the number of columns in the view.
        **/
        public columns : number;
        /**
        * Gets or sets the column padding inside of columns
        **/
        /**
        * Gets or sets the column  padding inside of columns
        **/
        public columnPadding : number;
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
        public tree: TreeView;
        /**
        *
        **/
        public treeToolbar: Toolbar;
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
        public add(element: T, raiseEvent?: boolean): void;
        /**
        * Adds an array of elements
        *
        * @param elements
        * @param raiseEvent
        */
        public addArray(elements: T[], raiseEvent?: boolean): void;
        /**
        * Adds a collection of elements to the collection
        *
        * @param collection
        * @param raiseEvent
        */
        public addCollection(collection: Collection<T>, raiseEvent?: boolean): void;
        /**
        * Clears the collection
        */
        public clear(): void;
        /**
        * Iterates through the collection, executing the handler for each item
        * @param handler
        */
        public each(handler: (item: T, index: number) => any): void;
        /**
        * Gets the index of the specified element if found. -1 if not found.
        * @param item
        * @returns {number}
        */
        public indexOf(item: T): number;
        /**
        * Gets the item at the specified position
        * @param index
        * @returns {*}
        */
        public item(index: number): T;
        /**
        * Returns the object on current pointer and moves the pointer forward.
        * It returns null and resets pointer if end of collection reached.
        * @returns {*}
        */
        public next(): T;
        /**
        * Raises the <c>addItem</c> event
        */
        public onAddItem(item: T, index: number): void;
        /**
        * Raises the <c>removeItem</c> event
        */
        public onRemoveItem(item: T, index: number): void;
        /**
        * Removes the specified item from the collection
        * @param item
        * @param raiseEvent
        */
        public remove(item: T, raiseEvent?: boolean): Collection<T>;
        /**
        * Removes the item ath the specified index
        * @param index
        * @param raiseEvent
        */
        public removeAt(index: number, raiseEvent?: boolean): void;
        /**
        * Resets the internal pointer for calls to <c>next()</c> method.
        */
        public resetPointer(): void;
        /**
        * Back field for event
        */
        private _addItem;
        /**
        * Gets an event raised when an item is added
        *
        * @returns {LatteEvent}
        */
        public addItem : LatteEvent;
        /**
        * Back field for event
        */
        private _removeItem;
        /**
        * Gets an event raised when an item is removed
        *
        * @returns {LatteEvent}
        */
        public removeItem : LatteEvent;
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
        public context : any;
        /**
        * Gets the count of elements in collection
        *
        * @returns {number}
        */
        public count : number;
        /**
        * Gets the first element of the collection
        * @returns {*}
        */
        public first : T;
        /**
        * Gets the last element of the collection
        * @returns {*}
        */
        public last : T;
        /**
        * Property field
        */
        private _length;
        /**
        * Gets the length of the collection
        *
        * @returns {number}
        */
        public length : number;
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
        static black : Color;
        /**
        * Field for white property.
        */
        private static _white;
        /**
        * Gets the white color
        */
        static white : Color;
        /**
        * Field for red property.
        */
        private static _red;
        /**
        * Gets the red color
        */
        static red : Color;
        /**
        * Field for green property.
        */
        private static _green;
        /**
        * Gets the green color
        */
        static green : Color;
        /**
        * Field for blue property.
        */
        private static _blue;
        /**
        * Gets the blue color
        */
        static blue : Color;
        /**
        * Field for transparent property.
        */
        private static _transparent;
        /**
        * Gets the transparent color
        */
        static transparent : Color;
        /**
        * Creates the color from the specified RGB and Aplha components.
        **/
        constructor(r?: number, g?: number, b?: number, a?: number);
        /**
        * Returns the color as a hex string
        **/
        public toHexString(): string;
        /**
        * Returns the color as a string
        **/
        public toString(): string;
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
        public a : number;
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
        public b : number;
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
        public g : number;
        /**
        * Returns a copy of the color with the specified alpha between 0 and 255.
        *
        * @param alpha
        */
        public fade(alpha: number): Color;
        /**
        * Returns a copy of the color with the specified alpha between 0 and 1.
        *
        * @param alpha
        */
        public fadeFloat(alpha: number): Color;
        /**
        * Gets a value indicating if the color is a dark color, by checking its perceived luminosity
        *
        * @returns {boolean}
        */
        public isDark : boolean;
        /**
        * Gets a value indicating if the color is a light color, by checking its perceived luminosity
        *
        * @returns {boolean}
        */
        public isLight : boolean;
        /**
        * Gets a value indicating if the color is transparent.
        **/
        public isTransparent : boolean;
        /**
        * Returns the perceived luminosity
        * @returns {number}
        */
        public perceivedLuminosity : number;
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
        public r : number;
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
        static current : Culture;
        /**
        * Field for esMX property
        */
        private static _esMx;
        /**
        * Gets the Español-Mexico Culture
        *
        * @returns {Culture}
        */
        static esMx : Culture;
        /**
        * Field for enUs property
        */
        private static _enUs;
        /**
        * Gets the English-USA Culture
        *
        * @returns {Culture}
        */
        static enUs : Culture;
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
        public shortDateFormat: string;
        /**
        * Long date format
        */
        public longDateFormat: string;
        /**
        * Amount of decimals to show in currency format
        */
        public currencyDecimals: number;
        /**
        * Separator of decimals for currency
        */
        public numberDecimalsSeparator: string;
        /**
        * Thousands separator for currency
        */
        public numberThousandsSeparator: string;
        /**
        * Symbol to use in currency
        */
        public currencySymbol: string;
        /**
        *
        */
        constructor();
        /**
        * Returns the specified number as a currency
        * @param n
        */
        public onFormatCurrency(n: number): string;
        /**
        * Formats the specified number
        * @param n
        * @param decimals
        * @param symbol
        * @returns {string}
        */
        public onFormatNumber(n: number, decimals?: number, symbol?: string): string;
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
        static now : DateTime;
        /**
        * Gets a DateTime representing the current day without time component
        **/
        static today : DateTime;
        /**
        * Gets a DateTime representing the day of tomorrow without time component
        **/
        static tomorrow : DateTime;
        /**
        * Gets a DateTime representing the day of yesterday without time component
        **/
        static yesterday : DateTime;
        public _span: TimeSpan;
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
        public add(timespan: TimeSpan): DateTime;
        /**
        * Returns the result of adding the specified amount of days to this date
        **/
        public addDays(days: number): DateTime;
        /**
        * Returns the result of adding the specified amount of hours to this date
        **/
        public addHours(hours: number): DateTime;
        /**
        * Returns the result of adding the specified amount of milliseconds to this date
        **/
        public addMilliseconds(milliseconds: number): DateTime;
        /**
        * Returns the result of adding the specified amount of minutes to this date
        **/
        public addMinutes(minutes: number): DateTime;
        /**
        * Returns the result of adding the specified amount of months to this date
        **/
        public addMonths(months: number): DateTime;
        /**
        * Returns the result of adding the specified amount of seconds to this date
        **/
        public addSeconds(seconds: number): DateTime;
        /**
        * Returns the result of adding the specified amount of years to this date
        **/
        public addYears(years: number): DateTime;
        /**
        * Returns the result of comparing this datetime to the specified datetime
        **/
        public compareTo(datetime: DateTime): number;
        /**
        * Returns just the date component of this datetime
        **/
        public date : DateTime;
        /**
        * Gets a value indicating if the specified datetime is equals to this datetime
        **/
        public equals(datetime: DateTime): boolean;
        /**
        * Returns a value indicating if the date is contained in the range specified by the arguments
        **/
        public onRange(start: DateTime, end: DateTime): boolean;
        /**
        * Returns the result of subtracting the specified datetime to this datetime
        **/
        public subtractDate(datetime: DateTime): TimeSpan;
        /**
        * Returns the result of subtracting the specified timespan to this datetime
        **/
        public subtractTime(timespan: TimeSpan): DateTime;
        /**
        * Returns a relative representatio of the date, like "Yesterday 10:00AM"
        **/
        public toRelativeString(): string;
        /**
        * Gets the day of this datetime
        **/
        public day : number;
        /**
        * Gets the day of week this datetime. Sunday is 0 and Saturday is 6.
        **/
        public dayOfWeek : number;
        /**
        * Gets the name of the day of the week
        * @returns {*}
        */
        public dayOfWeekString : string;
        /**
        * Gets the day of year datetime
        **/
        public dayOfYear : number;
        /**
        * Gets the hour of the datetime
        **/
        public hour : number;
        /**
        * Gets the millisecond of the date
        **/
        public millisecond : number;
        /**
        * Gets the minute of the time
        **/
        public minute : number;
        /**
        * Gets the month of the date
        **/
        public month : number;
        /**
        * Gets the name of the month of the date
        **/
        public monthString : string;
        /**
        * Gets the second of the date
        **/
        public second : number;
        /**
        * Gets the time component of this datetime
        **/
        public timeOfDay : TimeSpan;
        /**
        * Returns a formatted string
        **/
        public toFormattedString(): string;
        /**
        * Gets the DateTime as a string
        **/
        public toString(): string;
        /**
        * Gets the week number of date. First week of year is 1
        **/
        public weekOfYear : number;
        /**
        * Gets the year of the date
        **/
        public year : number;
    }
}
declare module latte {
    class EventHandler {
        public handler: Function;
        public context: any;
        constructor(handler: Function, context: any);
    }
    /**
    * Manages events and event handlers
    */
    class LatteEvent {
        public context: any;
        public handlers: EventHandler[];
        /**
        * Raised when a handler is added to the event
        */
        public _handlerAdded: LatteEvent;
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
        public handlerAdded : LatteEvent;
        /**
        * Adds a handler to the event
        * @param handler
        */
        public add(handler: Function, context?: any): void;
        /**
        * Raises the <c>handlerAdded</c> event
        * @param handler
        */
        public onHandlerAdded(handler: Function): void;
        /**
        * Raises the actual event handlers.
        * @param parameter
        * @returns {*}
        */
        public raise(...parameter: any[]): any;
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
        public argument: string;
        public value: any;
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
        public toString(): string;
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
        public method: string;
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
        public toString(): string;
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
        static hash : string;
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
        public center(container: Rectangle): Rectangle;
        /**
        * Gets a value indicating if the specified point is contained
        **/
        public contains(x: number, y: number): boolean;
        /**
        * Gets a value indicating if the rectangle is contained inside this rectangle
        **/
        public containsRectangle(rectangle: Rectangle): boolean;
        /**
        * Returns the result of inflating the rectangle vertically and horizontally on each edge.
        **/
        public inflate(horizontal: number, vertical: number): Rectangle;
        /**
        * Returns the rectangle result of intersecting this with passed rectangle
        **/
        public intersection(rectangle: Rectangle): Rectangle;
        /**
        * Gets a value indicating if the rectangle intersects specified rectangle
        **/
        public intersects(rectangle: Rectangle): boolean;
        /**
        * Returns a string describing the rectangle
        **/
        public toString(): string;
        /**
        * Gets a rectangle representing the union of this rectangle and the passed one
        **/
        public union(rectangle: Rectangle): Rectangle;
        /**
        * Gets or sets the right side of the rectangle
        **/
        /**
        * Gets or sets the right side of the rectangle
        **/
        public bottom : number;
        /**
        * Gets or sets the height of the rectangle
        **/
        /**
        * Gets or sets the height of the rectangle
        **/
        public height : number;
        /**
        * Gets or sets the left of the rectangle
        **/
        /**
        * Gets or sets the left of the rectangle
        **/
        public left : number;
        /**
        * Gets or sets the right side of the rectangle
        **/
        /**
        * Gets or sets the right side of the rectangle
        **/
        public right : number;
        public tag : any;
        /**
        * Gets or sets the top of the rectangle
        **/
        /**
        * Gets or sets the top of the rectangle
        **/
        public top : number;
        /**
        * Gets or sets the width of the rectangle
        **/
        /**
        * Gets or sets the width of the rectangle
        **/
        public width : number;
    }
}
declare module latte {
    /**
    * Represents a time interval.
    **/
    class TimeSpan {
        public _millis: number;
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
        public add(timespan: TimeSpan): TimeSpan;
        /**
        * Returns the result of adding the specified amount of hours to this timespan
        **/
        public addHours(hours: number): TimeSpan;
        /**
        * Returns the result of adding the specified amount of minutes to this timespan
        **/
        public addMinutes(minutes: number): TimeSpan;
        /**
        * Returns the result of adding the specified amount of seconds to this timespan
        **/
        public addSeconds(seconds: number): TimeSpan;
        /**
        * Returns the result of comparing this timespan against the provided timespan
        **/
        public compareTo(timespan: TimeSpan): number;
        /**
        * Returns a timespan representing the actual duration of the timespan
        **/
        public duration(): TimeSpan;
        /**
        * Returns a value indicating if this timespan represents the same than the specified timespan
        **/
        public equals(timespan: TimeSpan): boolean;
        /**
        * Negates the timespan duration
        **/
        public negate(): void;
        /**
        * Returns the result of subtracting the specified timespan to this timespan
        **/
        public subtract(timespan: TimeSpan): TimeSpan;
        /**
        * Returns this timespan as a string
        **/
        public toString(): string;
        /**
        * Gets the days component of the time interval represented by this object
        **/
        public days : number;
        /**
        * Gets the hours component of the time interval represented by this object
        **/
        public hours : number;
        /**
        * Gets a value indicating if the total time this timespan represents is zero
        **/
        public isEmpty : boolean;
        /**
        * Gets the milliseconds component of the time interval represented by this object
        **/
        public milliseconds : number;
        /**
        * Gets the minutes component of the time interval represented by this object
        **/
        public minutes : number;
        /**
        * Gets the seconds component of the time interval represented by this object
        **/
        public seconds : number;
        /**
        * Gets the value of this timespan expressed in whole and fractional days
        **/
        public totalDays : number;
        /**
        * Gets the value of this timespan expressed in whole and fractional hours
        **/
        public totalHours : number;
        /**
        * Gets the value of this timespan expressed in milliseconds
        **/
        public totalMilliseconds : number;
        /**
        * Gets the value of this timespan expressed in whole and fractional minutes
        **/
        public totalMinutes : number;
        /**
        * Gets the value of this timespan expressed in whole and fractional seconds
        **/
        public totalSeconds : number;
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
        public callback : Function;
        /**
        * Gets or sets the context in which the function is executed
        **/
        /**
        * Gets or sets the context in which the function is executed
        **/
        public context : any;
        /**
        * Gets or sets the milliseconds to sleep between calls
        **/
        /**
        * Gets or sets the milliseconds to sleep between calls
        **/
        public milliseconds : number;
        /**
        * Pauses the timer
        **/
        public pause(): void;
        /**
        * Starts ticking
        **/
        public start(): void;
        /**
        * Ticks the timer. Executes the callback and programs next tick.
        **/
        public tick(): void;
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
        public getInitialState(node: DrawingNode): any;
        /**
        * Back field for event
        */
        private _update;
        /**
        * Gets an event raised when the animation should update a target
        *
        * @returns {LatteEvent}
        */
        public update : LatteEvent;
        /**
        * Raises the <c>update</c> event
        */
        public onUpdate(node: DrawingNode, frame: number, initialState: any): void;
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
        public duration : number;
        /**
        * Gets the number of frames that the animation should last
        *
        * @returns {number}
        */
        public frames : number;
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
        public initialStateProcessor : (node: DrawingNode) => any;
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
        public onClick(p: Point, button: number): void;
        /**
        * Raises the <c>doubleClick</c> event
        */
        public onDoubleClick(p: Point, button: number): void;
        /**
        * Raises the <c>dragged</c> event
        */
        public onDragged(): void;
        /**
        * Raises the <c>mouseDown</c> event
        */
        public onMouseDown(p: Point, button: number): void;
        /**
        * Raises the <c>mouseEnter</c> event
        */
        public onMouseEnter(): void;
        /**
        * Raises the <c>mouseLeave</c> event
        */
        public onMouseLeave(): void;
        /**
        * Raises the <c>mouseMove</c> event
        */
        public onMouseMove(p: Point, button: number): void;
        /**
        * Raises the <c>mouseUp</c> event
        */
        public onMouseUp(p: Point, button: number): void;
        /**
        * Raises the <c>mouseWheel</c> event
        */
        public onMouseWheel(p: Point, delta: number): void;
        /**
        * Back field for event
        */
        private _click;
        /**
        * Gets an event raised when the node is clicked
        *
        * @returns {LatteEvent}
        */
        public click : LatteEvent;
        /**
        * Back field for event
        */
        private _doubleClick;
        /**
        * Gets an event raised when the user double clicks the node
        *
        * @returns {LatteEvent}
        */
        public doubleClick : LatteEvent;
        /**
        * Back field for event
        */
        private _dragged;
        /**
        * Gets an event raised when the node is dragged
        *
        * @returns {LatteEvent}
        */
        public dragged : LatteEvent;
        /**
        * Back field for event
        */
        private _mouseDown;
        /**
        * Gets an event raised when the node captures the mouse down
        *
        * @returns {LatteEvent}
        */
        public mouseDown : LatteEvent;
        /**
        * Back field for event
        */
        private _mouseEnter;
        /**
        * Gets an event raised when the mouse enters the node
        *
        * @returns {LatteEvent}
        */
        public mouseEnter : LatteEvent;
        /**
        * Back field for event
        */
        private _mouseLeave;
        /**
        * Gets an event raised when the mouse leaves the node
        *
        * @returns {LatteEvent}
        */
        public mouseLeave : LatteEvent;
        /**
        * Back field for event
        */
        private _mouseMove;
        /**
        * Gets an event raised when the mouse moves across the node
        *
        * @returns {LatteEvent}
        */
        public mouseMove : LatteEvent;
        /**
        * Back field for event
        */
        private _mouseUp;
        /**
        * Gets an event raised when the node captures the mouse up
        *
        * @returns {LatteEvent}
        */
        public mouseUp : LatteEvent;
        /**
        * Back field for event
        */
        private _mouseWheel;
        /**
        * Gets an event raised when the user scrolls on the element
        *
        * @returns {LatteEvent}
        */
        public mouseWheel : LatteEvent;
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
        public draggable : boolean;
        /**
        * Property field
        */
        private _dragOffset;
        /**
        * Gets the offset of dragging
        *
        * @returns {string}
        */
        public dragOffset : Point;
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
        public mouseHovering : boolean;
        /**
        * Property field
        */
        private _mouseIsDown;
        /**
        * Gets a value indicating if the mouse is currently down
        *
        * @returns {boolean}
        */
        public mouseIsDown : boolean;
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
        * Creates the drawing context
        */
        constructor(c: CanvasRenderingContext2D);
        private textAlignToString(t);
        private baselineToString(b);
        /**
        * Clears shadowing parameters
        */
        public clearShadow(): void;
        /**
        * Draws an arc
        *
        * @param center
        * @param radius
        * @param startAngle
        * @param endAngle
        * @param counterClockwise
        */
        public drawArc(p: Pen, center: Point, radius: number, startAngle: number, endAngle: number, counterClockwise?: boolean): void;
        /**
        * Draws the stroke of an ellipse
        * @param p
        * @param r
        */
        public drawEllipse(p: Pen, r: DrawingRectangle): void;
        /**
        * Draws an image
        * @param image
        * @param bounds
        */
        public drawImage(image: HTMLImageElement, bounds: DrawingRectangle, offset?: DrawingRectangle): void;
        /**
        * Draws a line between two points
        * @param p
        * @param a
        * @param b
        */
        public drawLine(p: Pen, a: Point, b: Point): void;
        /**
        * Draws consecutive lines
        * @param p
        * @param Point
        */
        public drawLines(p: Pen, origin: Point, ...Point: any[]): void;
        /**
        * Draws the stroke of a rectangle
        * @param p
        * @param r
        */
        public drawRectangle(p: Pen, r: DrawingRectangle, radius?: number): void;
        /**
        * Draws the stroke of a path
        * @param p
        * @param r
        */
        public drawPath(p: Pen, path: DrawingPath): void;
        /**
        * Draws consecutive lines
        * @param p
        * @param Point
        */
        public drawPolygon(p: Pen, origin: Point, ...Point: any[]): void;
        /**
        * Fills an arc
        *
        * @param center
        * @param radius
        * @param startAngle
        * @param endAngle
        * @param counterClockwise
        */
        public fillArc(b: Brush, center: Point, radius: number, startAngle: number, endAngle: number, counterClockwise?: boolean): void;
        /**
        * Fills an ellipse
        * @param p
        * @param r
        */
        public fillEllipse(b: Brush, r: DrawingRectangle): void;
        /**
        * Fills consecutive lines
        * @param p
        * @param Point
        */
        public fillPolygon(b: Brush, origin: Point, ...Point: any[]): void;
        /**
        * Fills a path
        * @param p
        * @param r
        */
        public fillPath(b: Brush, path: DrawingPath): void;
        /**
        * Fills a rectangle
        * @param b
        * @param r
        */
        public fillRectangle(b: Brush, r: DrawingRectangle, radius?: number): void;
        /**
        * Draws Text
        * @param b
        * @param text
        * @param p
        * @param align
        * @param baseline
        */
        public fillText(b: Brush, text: string, p: Point, align?: TextAlign, baseline?: TextBaseline, maxWidth?: number): void;
        /**
        * Fills wrapped text
        * @param b
        * @param text
        * @param p
        * @param lineHeight
        * @param fitWidth
        */
        public fillTextWrap(b: Brush, text: string, p: Point, lineHeight: number, fitWidth: number): void;
        /**
        * Restores the saved state
        */
        public restoreState(): void;
        /**
        * Saves the current state
        */
        public saveState(): void;
        /**
        * Saves the state and clips the drawing region.
        *
        * Use restoreState() to restore the previous clipping region
        */
        public setClip(p: DrawingPath): void;
        /**
        * Sets the font of the context
        * @param fontFamily
        * @param sizeInPixels
        * @param weight
        */
        public setFont(fontFamily: string, sizeInPixels?: number, weight?: string, style?: string): void;
        /**
        * Sets the shadowing parameters
        * @param color
        * @param blur
        * @param offset
        */
        public setShadow(color: Color, blur?: number, offset?: Size): void;
        /**
        * Property field
        */
        private _context;
        /**
        * Gets the context to draw
        *
        * @returns {CanvasRenderingContext2D}
        */
        public context : CanvasRenderingContext2D;
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
        public scaleX : number;
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
        public scaleY : number;
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
        public image : HTMLImageElement;
        /**
        * Gets the size of the image
        *
        * @returns {Size}
        */
        public size : Size;
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
        public applyOn(c: DrawingContext): void;
        public arcTo(begin: Point, end: Point, radius: number): void;
        public bezierCurveTo(controlPointA: Point, controlPointB: Point, endPoint: Point): void;
        public closePath(): void;
        public moveTo(p: Point): void;
        public lineTo(p: Point): void;
        public quadraticCurveTo(controlPoint: Point, endPoint: Point): void;
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
        public addToHoverList(d: DrawingClickable): void;
        /**
        * Returns a value indicating if the node is in the hoverList
        * @param d
        * @returns {boolean}
        */
        public inHoverList(d: DrawingClickable): boolean;
        /**
        * Removes the node from the hoverList
        * @param d
        */
        public removeFromHoverList(d: DrawingClickable): void;
        /**
        * Called on Mouse Double Click
        */
        public doubleClick(p: Point, button: number): void;
        /**
        * Called while drag-drop operation ongoing on scene
        * @param e
        */
        public dragOver(p: Point, e: Event): void;
        /**
        * Called when drag-drop operation ended on scene
        * @param e
        */
        public dragEnd(p: Point, e: Event): void;
        /**
        * Called when drag-drop operation started on scene
        * @param e
        */
        public dragStart(p: Point, e: Event): void;
        /**
        * Called when something dropped on the scene
        * @param e
        */
        public drop(p: Point, e: Event): void;
        /**
        * Draws the layer
        * @param c
        */
        public draw(c: DrawingContext): void;
        /**
        * Gets the first matched node at specified point
        * @param p
        * @returns {*}
        */
        public getNodeAtPoint(p: Point): DrawingNode;
        /**
        * Gets nodes at specified point
        * @param p
        * @returns {Array}
        */
        public getNodesAtPoint(p: Point, deep?: boolean): DrawingNode[];
        /**
        * Gets the nodes of a specified type
        * @param type
        * @returns {Array}
        */
        public getNodesByType(type: Function, deep?: boolean): any[];
        /**
        * Called on key down
        * @param keyCode
        * @param metaKey
        */
        public keyDown(keyCode: number, metaKey: any): void;
        /**
        * Called on key down
        * @param keyCode
        * @param metaKey
        */
        public keyUp(keyCode: number, metaKey: any): void;
        /**
        * Called on Mouse Down
        * @param p
        * @param button
        */
        public mouseDown(p: Point, button: number): void;
        /**
        * Called on Mouse Move
        * @param p
        */
        public mouseMove(p: Point): void;
        /**
        * Called on Mouse Up
        * @param p
        * @param button
        */
        public mouseUp(p: Point, button: number): void;
        /**
        * Called on Mouse Wheel
        * @param p
        * @param delta
        */
        public mouseWheel(p: Point, delta: number): void;
        /**
        * Called when a node is added
        * @param node
        */
        public onNodeAdded(node: DrawingNode): void;
        /**
        * Called when a node is removed
        * @param node
        */
        public onNodeRemoved(node: DrawingNode): void;
        /**
        * Updates the layer
        */
        public update(): void;
        /**
        * Field for nodes property
        */
        private _nodes;
        /**
        * Gets the nodes of the scene
        *
        * @returns {Collection<DrawingNode>}
        */
        public nodes : Collection<DrawingNode>;
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
        public addStop(position: number, color: Color): void;
        /**
        * Applies the brush on the specified context
        * @param c
        */
        public applyOn(c: DrawingContext): void;
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
        public pointA : Point;
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
        public pointB : Point;
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
        public applyOn(c: DrawingContext): void;
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
        public color : Color;
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
        public dash : number[];
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
        public width : number;
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
        public offset(x: number, y: number): Point;
        /**
        * Gets string representation of the point
        * @returns {string}
        */
        public toString(): string;
        /**
        * Gets a value indicating if the point is empty (No value has been set)
        *
        * @returns {boolean}
        */
        public isEmpty : boolean;
        /**
        * Property field
        */
        private _x;
        /**
        * Gets or sets the X of the point
        *
        * @returns {number}
        */
        public x : number;
        /**
        * Property field
        */
        private _y;
        /**
        * Gets the Y coordinate of the point
        *
        * @returns {number}
        */
        public y : number;
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
        public inflate(width: number, height: number): Size;
        /**
        * Inflates the size uniformly
        * @param wide
        */
        public inflateUniform(wide: number): Size;
        /**
        * Gets string representation of the size
        * @returns {string}
        */
        public toString(): string;
        /**
        * Gets a value indicating if the size has no compnents assigned or initialized
        *
        * @returns {boolean}
        */
        public isEmpty : boolean;
        /**
        * Property field
        */
        private _height;
        /**
        * Gets the Height component of the size
        *
        * @returns {number}
        */
        public height : number;
        /**
        * Property field
        */
        private _width;
        /**
        * Gets the Width component of the size
        *
        * @returns {number}
        */
        public width : number;
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
        public actions: Collection<Action>;
        /**
        * Raised when the action is clicked or invoked.
        **/
        public execute: LatteEvent;
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
        public checked : boolean;
        /**
        * Gets or sets the description of the action
        **/
        /**
        * Gets or sets the description of the action
        **/
        public description : string;
        /**
        * Gets or sets a value indicating if the action is currently enabled
        **/
        /**
        * Gets or sets a value indicating if the action is currently enabled
        **/
        public enabled : boolean;
        /**
        * Gets a <c>ButtonItem</c> representation of the action
        **/
        public getButton(): ButtonItem;
        /**
        * Gets or sets the 16 x 16 icon of the action
        **/
        /**
        * Gets or sets the 16 x 16 icon of the action
        **/
        public icon : IconItem;
        /**
        * Gets or sets the text of the action
        **/
        /**
        * Gets or sets the text of the action
        **/
        public text : string;
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
        public color : Color;
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
        static add : Glyph;
        /**
        * Gets an empty glyph
        **/
        static check : Glyph;
        /**
        * Gets a checked glyph
        **/
        static checked : Glyph;
        /**
        * Gets a checked glyph
        **/
        static checkedRadio : Glyph;
        /**
        * Gets a chevron glyph
        **/
        static chevron : Glyph;
        /**
        * Gets a collapse glyph
        **/
        static collapse : Glyph;
        /**
        * Gets collapse icon for ribbon glyph
        **/
        static collapseRibbon : Glyph;
        /**
        *
        * @returns {Glyph}
        */
        static collapseWidget : Glyph;
        /**
        *
        * @returns {Glyph}
        */
        static expandWidget : Glyph;
        /**
        * Gets a dismiss glyph
        **/
        static dismiss : Glyph;
        /**
        * Gets a down arrow glyph
        **/
        static down : Glyph;
        /**
        * Gets an expand glyph
        **/
        static expand : Glyph;
        /**
        * Gets a grip glyph
        **/
        static grip : Glyph;
        /**
        * Gets a left arrow glyph
        **/
        static left : Glyph;
        /**
        * Gets a maximize glyph
        **/
        static maximize : Glyph;
        /**
        * Gets a minimize glyph
        **/
        static minimize : Glyph;
        /**
        * Gets note glyph
        **/
        static note : Glyph;
        /**
        * Gets a right arrow glyph
        **/
        static right : Glyph;
        /**
        * Gets a checked glyph
        **/
        static unchecked : Glyph;
        /**
        * Gets a checked glyph
        **/
        static uncheckedRadio : Glyph;
        /**
        * Gets an up arrow glyph
        **/
        static up : Glyph;
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
        public imageElement: JQuery;
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
        public autoSize : boolean;
        /**
        *
        * @returns {string|JQuery}
        */
        /**
        *
        * @param value
        */
        public src : string;
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
        public text : string;
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
        public btnCurrent: ButtonItem;
        /**
        *
        **/
        public btnNext: ButtonItem;
        /**
        *
        **/
        public btnPrevious: ButtonItem;
        /**
        * Raised when page changes
        **/
        public pageChanged: LatteEvent;
        /**
        *
        **/
        constructor();
        /**
        * Navigates to next page, if possible.
        **/
        public nextPage(): void;
        /**
        * Raises the <c>pageChanged</c> event
        **/
        public onPageChanged(): void;
        /**
        * Navigates to the previous page, if possible.
        **/
        public previousPage(): void;
        public txtPage_enterPressed(): void;
        /**
        * Gets or sets the current page
        **/
        /**
        * Gets or sets the current page
        **/
        public page : number;
        /**
        * Gets the current page.
        * @returns {number}
        */
        public getPage(): number;
        /**
        * Sets the current page.
        * Optionally omits the <c>pageChanged</c> event trigger.
        * @param value
        * @param silent
        */
        public setPage(value: number, silent?: boolean): void;
        /**
        * Gets or sets the amount of pages for navigation
        **/
        /**
        * Gets or sets the amount of pages for navigation
        **/
        public pages : number;
        private _txtPage;
        public txtPage : TextboxItem;
        /**
        * Fields for lblPages property.
        */
        private _lblPages;
        /**
        * Gets a value indicating
        */
        public lblPages : LabelItem;
        /**
        * Fields for btnGo property.
        */
        private _btnGo;
        /**
        * Gets a value indicating
        */
        public btnGo : ButtonItem;
        /**
        * Fields for btnOverlay property.
        */
        private _btnOverlay;
        /**
        * Gets a value indicating
        */
        public btnOverlay : ButtonItem;
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
        public activeChanged: LatteEvent;
        /**
        * Raised when the value of the <c>
        */
        public contentSideChanged: LatteEvent;
        /**
        * Creates the tab
        **/
        constructor(text?: string, icon?: IconItem, click?: Function, tab?: any);
        private _applyActiveProperties();
        /**
        * Raises the activeChanged event.
        */
        public onActiveChanged(): void;
        /**
        * Gets a value indicating if the tab is currently active.
        * @returns {boolean}
        */
        /**
        * Sets a value indicating if the tab is currently active.
        * @param value
        */
        public active : boolean;
        /**
        * Gets the side where content is shown. So tab is drawn accordingly.
        *
        * @returns {Side}
        */
        /**
        * Sets the side where content is shown. So tab is drawn accordingly.
        * @param value
        */
        public contentSide : Side;
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
        public canvasMouseMove(screenX: number, screenY: number): void;
        /**
        * Handles mouse down on canvas
        * @param screenX
        * @param screenY
        */
        public canvasMouseDown(screenX: number, screenY: number): void;
        /**
        * Draws the palette
        */
        public drawPalette(): void;
        /**
        * Raises the <c>color</c> event
        */
        public onColorChanged(): void;
        /**
        * Override.
        */
        public onLayout(): void;
        /**
        * Gets the swatch at the specified point (if any)
        * @param screenX
        * @param screenY
        * @returns {*}
        */
        public swatchAt(screenX: number, screenY: number): ColorPickerSwatch;
        /**
        * Back field for event
        */
        private _colorChanged;
        /**
        * Gets an event raised when the value of the color property changes
        *
        * @returns {LatteEvent}
        */
        public colorChanged : LatteEvent;
        /**
        * Field for canvas property
        */
        private _canvas;
        /**
        * Gets the canvas where color palette is drawn
        *
        * @returns {JQuery}
        */
        public canvas : JQuery;
        /**
        * Field for lblIndicator property
        */
        private _lblIndicator;
        /**
        * Gets the color indicator label
        *
        * @returns {LabelItem}
        */
        public lblIndicator : LabelItem;
        /**
        * Field for toolbar property
        */
        private _toolbar;
        /**
        * Gets the toolbar
        *
        * @returns {Toolbar}
        */
        public toolbar : Toolbar;
        /**
        * Field for txtHex property
        */
        private _txtHex;
        /**
        * Gets the textbox item
        *
        * @returns {TextboxItem}
        */
        public txtHex : TextboxItem;
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
        public color : Color;
        /**
        * Field for context property
        */
        private _context;
        /**
        * Gets the context for rendering
        *
        * @returns {CanvasRenderingContext2D}
        */
        public context : CanvasRenderingContext2D;
        /**
        * Field for swatches property
        */
        private _swatches;
        /**
        * Gets the swatches on the canvas
        *
        * @returns {ColorPickerSwatch[]}
        */
        public swatches : ColorPickerSwatch[];
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
        public comments: Collection<CommentItem>;
        /**
        * Points to the DOM element where comments are stored.
        **/
        public commentsElement: JQuery;
        /**
        * Points to the DOM element where the new comment textarea is placed.
        **/
        public newCommentElement: JQuery;
        /**
        * Points to the DOM element where hidden comments text is placed.
        **/
        public pendentPagesElement: JQuery;
        /**
        * Textbox for new comments
        **/
        public textbox: TextboxItem;
        /**
        * Raised when a new comment is added. The text of the comment is passed as an argument.
        **/
        public commentAdded: LatteEvent;
        /**
        * Raised when comments are added or removed from collection
        **/
        public commentsChanged: LatteEvent;
        /**
        * Raised when the user asks for the hidden comments of conversation
        **/
        public pendentPagesSolicited: LatteEvent;
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
        public setTextbox(t: TextboxItem): void;
        /**
        *
        **/
        public _onAddComment(comment: CommentItem): void;
        /**
        *
        **/
        private _onRemoveComment(comment);
        /**
        * Raises the <c>commentAdded</c> event
        **/
        public onCommentAdded(text: string): boolean;
        /**
        *
        **/
        public onCommentsChanged(): void;
        /**
        * Raises the <c>pendentPagesRequested</c> event
        **/
        public onHiddenCommentsRequested(): void;
        /**
        * Raises the <c>layout</c> event
        **/
        public onLayout(): void;
        /**
        * Raises the <c>pendentPagesSolicited</c> event
        **/
        public onPendentPagesSolicited(): void;
        /**
        * Prepends the specified comment
        **/
        public prependComment(comment: CommentItem): void;
        /**
        * Gets or sets a value indicating if the user may add new comments
        **/
        /**
        * Gets or sets a value indicating if the user may add new comments
        **/
        public allowNewComments : boolean;
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
        public ignoreEnter : boolean;
        /**
        * Gets or sets the number of hidden comments in conversation
        **/
        /**
        * Gets or sets the number of hidden comments in conversation
        **/
        public pendentPages : number;
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
        public nextButton: ButtonItem;
        /**
        *
        **/
        public previousButton: ButtonItem;
        /**
        * Points to the TABLE element where months are placed
        **/
        public table: JQuery;
        /**
        * Raised when <c>selectionStart</c> or <c>selectionEnd</c> properties value change.
        **/
        public selectionChanged: LatteEvent;
        /**
        * Raised when <c>selectionEnd</c> property changes.
        **/
        public selectionEndChanged: LatteEvent;
        /**
        * Raised when <c>selectionStart</c> property changes.
        **/
        public selectionStartChanged: LatteEvent;
        /**
        * Raised when <c>selectionMode</c> property changes.
        **/
        public selectionModeChanged: LatteEvent;
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
        public getSelectionStart(): DateTime;
        /**
        * Returns a value indicating if the specified date is currently visible in the date range.
        **/
        public isOnDisplay(date: DateTime): boolean;
        /**
        *
        **/
        public onSelectionChanged(): void;
        /**
        *
        **/
        public onSelectionEndChanged(): void;
        /**
        *
        **/
        public onSelectionModeChanged(): void;
        /**
        *
        **/
        public onSelectionStartChanged(): void;
        /**
        * SPECIAL GETTER
        Gets or sets the end of selection
        **/
        public getSelectionEnd(): DateTime;
        /**
        * SPECIAL SETTER
        Gets or sets the end of selection
        **/
        public setSelectionEnd(value?: DateTime, raiseEvent?: boolean): void;
        /**
        * Sets the selection range.
        If <c>start</c> is not on view, view will be taken to the <c>start</c>'s month
        Optionally rebuilds the calendar rows and columns.
        Optionally raises events.
        **/
        public setSelectionRange(start: DateTime, end: DateTime, rebuild?: boolean, raiseEvents?: boolean): void;
        /**
        * Sets the start of selection
        **/
        public setSelectionStart(value?: DateTime, raiseEvent?: boolean): void;
        /**
        * Sets the view start
        **/
        public setViewStart(date: DateTime): void;
        /**
        * Unselects all dates on display
        **/
        public unselectAll(): void;
        /**
        * Moves the view to the next set of months
        **/
        public viewNext(): void;
        /**
        * Moves the view to the previous set of months
        **/
        public viewPrevious(): void;
        /**
        * Gets or sets the number of columns of months
        **/
        /**
        * Gets or sets the number of columns of months
        **/
        public columns : number;
        /**
        * Gets the size of a month as an object {width, height}
        **/
        public monthSize : any;
        /**
        * Gets or sets the number of rows of months
        **/
        /**
        * Gets or sets the number of rows of months
        **/
        public rows : number;
        /**
        * Gets or sets the end of selection
        **/
        /**
        * Gets or sets the end of selection
        **/
        public selectionEnd : DateTime;
        /**
        * Gets or sets the selection mode
        **/
        /**
        * Gets or sets the selection mode
        **/
        public selectionMode : DateSelectionMode;
        /**
        * Gets or sets the start of selection
        **/
        /**
        * Gets or sets the start of selection
        **/
        public selectionStart : DateTime;
        /**
        * Gets the first day on view
        **/
        public viewEnd : DateTime;
        /**
        * Gets the first day on view
        **/
        public viewStart : DateTime;
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
        public inputs: Collection<InputItem>;
        /**
        * Holds the title element of the form
        **/
        public titleLabel: LabelItem;
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
        public byName(name: string): InputItem;
        /**
        * Gets an object with the values of fields
        **/
        public getValues(): any;
        /**
        * Sets the direction of Inputs
        * @param d
        */
        public setDirection(d: Direction): void;
        /**
        * Gets or sets the with of the text parts.
        * Value must be percent since it must be leveled with value part. Value size will be adjusted
        * to 5% less large than it should to avoid edge collisions.
        * Values lower than 1 accepted.
        * Note that when horizontal input, layout may become affected.
        *
        */
        public setTextWidth(value: number): void;
        /**
        * Back field for event
        */
        private _valueChanged;
        /**
        * Gets an event raised when the value of an input is changed
        *
        * @returns {LatteEvent}
        */
        public valueChanged : LatteEvent;
        /**
        * Raises the <c>valueChanged</c> event
        */
        public onValueChanged(): void;
        /**
        * Gets or sets a value indicating if the form has a visible face style.
        **/
        /**
        * Gets or sets a value indicating if the form has a visible face style.
        **/
        public faceVisible : boolean;
        /**
        * Gets or sets a value indicating if the inputs in the form are read-only
        **/
        /**
        * Gets or sets a value indicating if the inputs in the form are read-only
        **/
        public readOnly : boolean;
        /**
        * Gets or sets the title of the form
        **/
        /**
        * Gets or sets the title of the form
        **/
        public title : string;
        /**
        * Gets a value of checking every input in <c>inputs</c> to be valid
        **/
        public valid : boolean;
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
        public iframe: JQuery;
        /**
        * Toolbar of basic commands
        **/
        public toolbar: Toolbar;
        /**
        * Raised when the editor gets focus
        **/
        public focus: LatteEvent;
        /**
        * Raised when the selection of editor changes
        **/
        public selectionChanged: LatteEvent;
        /**
        * Raised when an image in the editor is selected
        **/
        public imageSelected: LatteEvent;
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
        public body(): JQuery;
        /**
        * Gets the JavaScript document's object of iframe.
        **/
        public document(): Document;
        /**
        * Executes the specified command
        **/
        public execCommand(command: string, value?: any): void;
        /**
        *
        **/
        public getValue(): string;
        /**
        * Inserts the specified node at the currently selected range.
        Returns the inserted node, or <c>null</c> if not possible.
        **/
        public insertElement(element: any): JQuery;
        /**
        * Raises the <c>focus</c> event
        **/
        public onFocus(): void;
        /**
        * Raises the <c>imageSelected</c> event
        **/
        public onImageSelected(image: JQuery): void;
        /**
        * Overriden.
        **/
        public onLayout(): void;
        /**
        * Raises the <c>selectionChanged</c> event.
        **/
        public onSelectionChanged(): void;
        /**
        * Overriden.
        **/
        public onValueChanged(): void;
        /**
        * Gets a value indicating if the editor is ready to be used as editor.
        While the editor is not ready, all data will be displayed in a non-editable element.
        **/
        public ready(): boolean;
        /**
        * Selects the specified element and returns it as a jQuery object.
        **/
        public selectElement(element: any): JQuery;
        /**
        * Selects the contents of the specified node and returns the element as a jQuery object.
        **/
        public selectElementContents(element: any): JQuery;
        /**
        * Gets the current selection
        **/
        public selection : RangySelection;
        /**
        * Gets the element where selection ends.
        **/
        public selectionEnd(): JQuery;
        /**
        * Returns the parent of selection, passing the specified <c>selector</c>
        to the jQuery <c>parents()<c> method.
        **/
        public selectionParents(selector?: string): JQuery;
        /**
        * Gets the range of selection. Returns <c>null</c> if no current selection.
        **/
        public selectionRange : RangyRange;
        /**
        * Gets the element where selection starts.
        **/
        public selectionStart(): JQuery;
        /**
        *
        **/
        public setValue(value: string): void;
        /**
        * Surrounds selected contents with specified element, and returns the
        attached element as a jQuery object.
        **/
        public surroundSelectionWith(element: any): JQuery;
        public value : string;
        /**
        * Gets the Window of the iframe
        **/
        public window : any;
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
        public collapseButton: ButtonItem;
        /**
        *
        **/
        public face: JQuery;
        /**
        * Collection of items in the Ribbon
        **/
        public items: Collection<Item>;
        /**
        *
        **/
        public itemsContainer: JQuery;
        /**
        * Holds the pointer to the start button of the ribbon
        **/
        public startButton: ButtonItem;
        /**
        * Collection of tabs in the Ribbon
        **/
        public tabs: Collection<TabItem>;
        /**
        *
        **/
        public tabsElement: JQuery;
        /**
        * Raised when <c>collapsed</c> value changes
        **/
        public collapsedChanged: LatteEvent;
        /**
        * Raised when <c>selectedTab()</c> value changes.
        **/
        public selectedTabChanged: LatteEvent;
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
        public addTab(text: string): TabItem;
        /**
        * Adds a separator on the specified tab
        * @param tab
        */
        public addSeparator(tab: TabItem): void;
        /**
        * Raises the <c>collapsedChanged</c> event
        **/
        public onCollapsedChanged(): void;
        /**
        * Raises the <c>layout</c> event
        **/
        public onLayout(): void;
        /**
        * Raises the <c>selectedTabChanged</c> event
        **/
        public onSelectedTabChanged(): void;
        /**
        * Gets or sets a value indicating if the ribbon is currently collapsed
        **/
        /**
        * Gets or sets a value indicating if the ribbon is currently collapsed
        **/
        public collapsed : boolean;
        /**
        * Gets or sets a value indicating if the ribbon face is visible
        **/
        /**
        * Gets or sets a value indicating if the ribbon face is visible
        **/
        public faceVisible : boolean;
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
        public itemsInGroup : number;
        /**
        * Gets or sets the currently selected Tab
        **/
        /**
        * Gets or sets the currently selected Tab
        **/
        public selectedTab : TabItem;
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
        public clearSelection(): void;
        /**
        * Adds selection handlers
        * @param item
        */
        public onAddItem(item: Item): void;
        /**
        * Raises the <c>selectedItemChanged</c> event
        */
        public onSelectedItemChanged(): void;
        /**
        * Gets the selected item of the stack
        *
        * @returns {SelectableItem}
        */
        public selectedItem : SelectableItem;
        /**
        * Gets an event raised when
        * @returns {LatteEvent}
        */
        public selectedItemChanged : LatteEvent;
    }
}
declare module latte {
    class TabContainer extends ItemStack {
        public tabToolbar: TabToolbar;
        public tabs: Collection<TabItem>;
        public content: Collection<Item>;
        public selectedTabChanged: LatteEvent;
        constructor();
        private updateVisibility();
        /**
        *
        **/
        public onTabAdded(tab: TabItem): void;
        /**
        *
        **/
        public onTabRemoved(tab: TabItem): void;
        /**
        *
        * @param item
        */
        public onContentAdded(item: Item): void;
        /**
        *
        * @param item
        */
        public onContentRemoved(item: Item): void;
        /**
        * Raises the <c>selectedTabChanged</c> event
        **/
        public onSelectedTabChanged(): void;
        /**
        * Gets or sets the selected tab of the view
        **/
        /**
        * Gets or sets the selected tab of the view
        **/
        public selectedTab : TabItem;
        /**
        * Gets the side where content should be relative to the tabs
        * @returns {Side}
        */
        /**
        * Sets the side where content should be relative to the tabs
        * @param value
        */
        public contentSide : Side;
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
        public tabs: Collection<TabItem>;
        /**
        * Raised when a tab is selected
        **/
        public selectedTabChanged: LatteEvent;
        /**
        * Creates the toolbar
        */
        constructor();
        /**
        * Raises the <c>selectedTabChanged</c> event
        **/
        public onSelectedTabChanged(): void;
        /**
        * Handles tab adding
        * @param tab
        */
        public onTabAdded(tab: TabItem): void;
        /**
        * Handles tab removing
        * @param tab
        */
        public onTabRemoved(tab: TabItem): void;
        /**
        * Gets the current content side
        * @returns {Side}
        */
        /**
        * Sets the content side of tabs
        * @param value
        */
        public contentSide : Side;
        /**
        * Gets the selected tab of the toolbar
        * @returns {TabItem}
        */
        /**
        * Sets the selected tab of the toolbar
        * @param value
        */
        public selectedTab : TabItem;
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
        public autoHeight : boolean;
        /**
        * Gets or sets the height of the item, and so the view
        **/
        /**
        * Gets or sets the height of the item, and so the view
        **/
        public height : number;
        /**
        * Gets or sets the View inside this item
        **/
        /**
        * Gets or sets the View inside this item
        **/
        public view : View;
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
        public closeButton: ButtonItem;
        /**
        * Collection of items in widget
        **/
        public items: Collection<Item>;
        /**
        * Button for maximizing the widget
        **/
        public maximizeButton: ButtonItem;
        /**
        * Button for minimizing the widget
        **/
        public minimizeButton: ButtonItem;
        /**
        * Collection of options of widget
        **/
        public options: Collection<Item>;
        /**
        * Button for options
        **/
        public optionsButton: ButtonItem;
        /**
        * Stack of items in the widget
        **/
        public stack: ItemStack;
        /**
        * Label where title is placed
        **/
        public titleLabel: LabelItem;
        /**
        * Bottom toolbar
        **/
        public toolbar: Toolbar;
        /**
        * Top toolbar
        **/
        public topToolbar: Toolbar;
        /**
        * Raised when the widget has been closed
        **/
        public closed: LatteEvent;
        /**
        * Raised when the widget has been maximized
        **/
        public maximized: LatteEvent;
        /**
        * Raised when the widget has been minimized
        **/
        public minimizedChanged: LatteEvent;
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
        public onClosed(): void;
        /**
        * Raises the <c>layout</c> event
        **/
        public onLayout(): void;
        /**
        * Raises the <c>maximized</c> event
        **/
        public onMaximized(): void;
        /**
        * Raises the <c>minimized</c> event
        **/
        public onMinimizedChanged(): void;
        /**
        * Gets or sets a value indicating if the item could be closed
        **/
        /**
        * Gets or sets a value indicating if the item could be closed
        **/
        public allowClose : boolean;
        /**
        * Gets or sets a value indicating if the item could be maximized
        **/
        /**
        * Gets or sets a value indicating if the item could be maximized
        **/
        public allowMaximize : boolean;
        /**
        * Gets or sets a value indicating if the item could be minimized
        **/
        /**
        * Gets or sets a value indicating if the item could be minimized
        **/
        public allowMinimize : boolean;
        /**
        * Gets or sets a value indicating if the widget is currently minimized
        **/
        /**
        * Gets or sets a value indicating if the widget is currently minimized
        **/
        public minimized : boolean;
        /**
        * Gets or sets the title of the widget
        **/
        /**
        * Gets or sets the title of the widget
        **/
        public title : string;
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
        public width : number;
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
        public commentSideElement: JQuery;
        /**
        * Points to the DOM element where user date is stored
        **/
        public dateElement: JQuery;
        /**
        * Points to the DOM element where icon is stored
        **/
        public iconSideElement: JQuery;
        /**
        * Points to the DOM element where text is stored
        **/
        public textElement: JQuery;
        /**
        * Points to the DOM element where user is stored
        **/
        public userElement: JQuery;
        /**
        * Raised when User name or icon is clicked
        **/
        public userDetail: LatteEvent;
        /**
        * Creates the item
        **/
        constructor();
        /**
        * Blinks to call for attention. Optionally specifies the milliseconds to blink.
        **/
        public blink(milliseconds?: number): void;
        /**
        * Raises the <c>userDetail</c> event
        **/
        public onUserDetail(): void;
        /**
        * Gets or sets the date of the comment
        **/
        /**
        * Gets or sets the date of the comment
        **/
        public date : DateTime;
        /**
        * Gets or sets the icon of the comment.
        **/
        /**
        * Gets or sets the icon of the comment.
        **/
        public icon : IconItem;
        /**
        * Gets or sets a value indicating if the date of message should be displayed as a relative date.
        **/
        /**
        * Gets or sets a value indicating if the date of message should be displayed as a relative date.
        **/
        public relativeDate : boolean;
        /**
        * Gets or sets the date of the comment
        **/
        /**
        * Gets or sets the date of the comment
        **/
        public text : string;
        /**
        * Gets or sets the date of the comment
        **/
        /**
        * Gets or sets the date of the comment
        **/
        public user : string;
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
        public relative : boolean;
        /**
        * Gets or sets the value of the label
        **/
        /**
        * Gets or sets the value of the label
        **/
        public value : any;
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
        public text : string;
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
        public _matrixDepth: number;
        /**
        *
        **/
        public matrixAttributes: any;
        /**
        * Gets a collection of rectangles that exist extra to the element of this item
        **/
        public rectangles: Collection<Rectangle>;
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
        public clone(): CalendarItem;
        /**
        *
        **/
        public onSelectedChanged(): void;
        /**
        * Gets a value indicating if the item is an <c>all-day</c> item.
        All-day items are those who its time of day both start and end dates are zero minutes
        **/
        public allDay : boolean;
        /**
        * Gets or sets the end date of the item
        **/
        /**
        * Gets or sets the end date of the item
        **/
        public dateEnd : DateTime;
        /**
        * Gets or sets the start date of the item
        **/
        /**
        * Gets or sets the start date of the item
        **/
        public dateStart : DateTime;
        /**
        * Gets or sets the text of the item
        **/
        /**
        * Gets or sets the text of the item
        **/
        public text : string;
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
        public columnsElement: JQuery;
        /**
        *
        **/
        public iconElement: JQuery;
        /**
        *
        **/
        public activated: LatteEvent;
        /**
        * Creates the Item. Optionally specifies its <c>ListView</c>
        **/
        constructor(listView?: ListView);
        /**
        * Adds a column of the specified width
        **/
        public addColumn(width?: number): ListViewItem;
        /**
        * Gets the column element at the specified index
        *
        * @deprecated use columns.count instead
        **/
        public getColumn(index: number): JQuery;
        /**
        * Gets the count of columns in item
        *
        * @deprecated use columns.count instead
        **/
        public getColumnCount(): number;
        /**
        * Returns or sets the item of the specified column. First column's index is zero.
        *
        * @deprecated Use getItem and setItem methods
        **/
        public item(index: number, value?: Item): Item;
        /**
        * Raises the <c>activated</c> event
        **/
        public onActivated(): void;
        /**
        * Overriden. Raises the <c>layout</c> event
        **/
        public onLayout(): void;
        /**
        *
        **/
        public onSelectedChanged(): void;
        /**
        * Sets the width of the specified column
        **/
        public setColumnWidth(index: number, width: number): void;
        /**
        * Gets the item at the specified column
        * @param index
        */
        public getItem(index: number): Item;
        /**
        * Gets the text of a column (if a LabelItem)
        * @param index
        */
        public getText(index: number): string;
        /**
        * Sets the text of a column
        *
        * @param index
        * @param text
        */
        public setText(index: number, text: string): void;
        /**
        * Sets the item at the specified column
        * @param index
        * @param item
        */
        public setItem(index: number, item: Item): void;
        /**
        * Returns or sets the text of the specified column.
        * When setting, it is equivalent to passing a <c>LabelItem</c> to the <c>item</c> method.
        *
        * @deprecated Use getText and setText instead
        **/
        public text(index: number, value?: string): string;
        /**
        * Gets the column elements of the item
        *
        * @returns {Array<JQuery>}
        */
        public columns : JQuery[];
        /**
        * Gets or sets the icon of the item.
        **/
        /**
        * Gets or sets the icon of the item.
        **/
        public icon : IconItem;
        /**
        * Gets the listView of the item
        **/
        public listView : ListView;
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
        public faceElement: JQuery;
        /**
        *
        **/
        public glyphElement: JQuery;
        /**
        *
        **/
        public iconElement: JQuery;
        /**
        *
        **/
        public levelElement: JQuery;
        /**
        *
        **/
        public textElement: JQuery;
        /**
        *
        **/
        public items: Collection<TreeItem>;
        /**
        * Pointer to the element where items are placed
        **/
        public itemsElement: JQuery;
        /**
        * Raised when user clicks the item
        **/
        public click: LatteEvent;
        /**
        * Raised when children items need to be loaded
        **/
        public loadItems: LatteEvent;
        /**
        * Raised when the <c>selected</c> property value changes
        **/
        public selectedChanged: LatteEvent;
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
        public _updateGlyph(): void;
        /**
        * Deletes the node from its parent
        **/
        public deleteFromParent(): void;
        /**
        * Raises the <c>click</c> event
        **/
        public onClick(): void;
        /**
        * Raises the <c>loadItems</c> event
        **/
        public onLoadItems(): void;
        /**
        * Raises the <c>selectedChanged</c> event
        **/
        public onSelectedChanged(): void;
        /**
        * Reports to the <c>TreeView</c> that items have been loaded
        so it can trigger the <c>itemItemsLoaded</c>
        **/
        public reportItemsLoaded(): void;
        /**
        * Returns the top most parent of the item
        **/
        public topParent(): TreeItem;
        /**
        * Gets or sets a value indicating if the item will react to select as a gesture to alternate its <c>expand</c> state
        Default is <c>true</c>
        **/
        /**
        * Gets or sets a value indicating if the item will react to select as a gesture to alternate its <c>expand</c> state
        Default is <c>true</c>
        **/
        public expandOnSelect : boolean;
        /**
        * Gets or sets a value indicating if the item is currently expanded, this is, showing its child items
        **/
        /**
        * Gets or sets a value indicating if the item is currently expanded, this is, showing its child items
        **/
        public expanded : boolean;
        /**
        * Gets or sets the glyph of the item. Glyph is changed automatically when <c>expanded()</c> is invoked
        **/
        /**
        * Gets or sets the glyph of the item. Glyph is changed automatically when <c>expanded()</c> is invoked
        **/
        public glyph : IconItem;
        /**
        * Gets a value indicating if the item contains child items or a handler for <c>loadItems</c> has been set
        **/
        public hasItems : boolean;
        /**
        * Gets or sets the icon of the item
        **/
        /**
        * Gets or sets the icon of the item
        **/
        public icon : IconItem;
        /**
        * Gets or sets the level of the item. The level specifies the indent of the item.
        **/
        /**
        * Gets or sets the level of the item. The level specifies the indent of the item.
        **/
        public level : number;
        /**
        * Gets the parent <c>TreeItem</c> of this item
        **/
        public parent : TreeItem;
        /**
        * Gets the navigation path as a string
        **/
        public path : any;
        /**
        * Gets or sets a value indicaing if the item is currently selected
        **/
        /**
        * Gets or sets a value indicaing if the item is currently selected
        **/
        public selected : boolean;
        /**
        * Gets or sets the icon of the item when selected
        **/
        /**
        * Gets or sets the icon of the item when selected
        **/
        public selectedIcon : IconItem;
        /**
        * Gets or sets the text of the item
        **/
        /**
        * Gets or sets the text of the item
        **/
        public text : string;
        /**
        * Gets the <c>TreeView</c> item who contains this item, if any
        **/
        public treeView : TreeView;
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
        public setValue(value: string): void;
        public getValue(): string;
        public onLayout(): void;
        /**
        * Field for colorPicker property
        */
        private _colorPicker;
        /**
        * Gets the color picker
        *
        * @returns {ColorPicker}
        */
        public colorPicker : ColorPicker;
        /**
        * Field for button property
        */
        private _button;
        /**
        * Gets the button for selection
        *
        * @returns {ButtonItem}
        */
        public button : ButtonItem;
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
        public color : Color;
        /**
        * Field for icon property
        */
        private _icon;
        /**
        * Gets the color icon
        *
        * @returns {ColorIconItem}
        */
        public icon : ColorIconItem;
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
        public button: ButtonItem;
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
        public options : any;
        /**
        * Gets or sets the selected value of the combo
        **/
        /**
        * Gets or sets the selected value of the combo
        **/
        public value : any;
        /**
        * Gets the value as a string for human reading
        **/
        public valueString : any;
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
        public label: LabelItem;
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
        public text : string;
        /**
        * Gets or sets the checked state of checkbox
        **/
        /**
        * Gets or sets the checked state of checkbox
        **/
        public value : boolean;
    }
}
declare module latte {
    /**
    * Value item for files. Value of item is an array of system File objects.
    */
    class FileValueItem extends ValueItem {
        public fileInput: JQuery;
        constructor();
        /**
        * Gets an array of selected files
        *
        * @returns {Array<File>}
        */
        public getValue(): File[];
        /**
        * Resets the input field
        */
        public resetInput(): void;
        /**
        * Sets the value. This is ignored since UA won't allow it.
        *
        * @param value
        */
        public setValue(value: File[]): void;
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
        public label: LabelItem;
        /**
        * Points to the label where read-only elements are shown
        **/
        public readOnlyLabel: LabelValueItem;
        /**
        * Points to separator element
        **/
        public separatorElement: JQuery;
        /**
        * Points to the DOM element where <c>labelElement</> is contained, i.e. the text side.
        **/
        public textElement: JQuery;
        /**
        * Points to the DOM element where the value is shown, i.e. the value side
        **/
        public valueElement: JQuery;
        /**
        * Creates the input element
        **/
        constructor(text?: string, type?: string, value?: any, readOnly?: boolean, name?: string);
        /**
        * Checks if the current value is valid for the field <c>type</c>
        **/
        public isValid(): boolean;
        /**
        *
        **/
        public onLayout(): void;
        public onValueChanged(): void;
        /**
        * Override
        * @returns {string}
        */
        public getValueString(): string;
        /**
        * Gets or sets the direction of input.
        **/
        /**
        * Gets or sets the direction of input.
        **/
        public direction : Direction;
        /**
        * Gets or sets the name of the input
        **/
        /**
        * Gets or sets the name of the input
        **/
        public name : string;
        /**
        * Gets or sets the options of the control
        **/
        /**
        * Gets or sets the options of the control
        **/
        public options : any;
        /**
        * Gets or sets a value indicating if the input is read-only
        **/
        /**
        * Gets or sets a value indicating if the input is read-only
        **/
        public readOnly : boolean;
        /**
        * Gets or sets a value indicating if the input has a separator on bottom
        **/
        /**
        * Gets or sets a value indicating if the input has a separator on bottom
        **/
        public separator : boolean;
        /**
        * Gets ors ets the text of the input
        **/
        /**
        * Gets ors ets the text of the input
        **/
        public text : string;
        /**
        * Gets or sets a value indicating if the text section is visible
        **/
        /**
        * Gets or sets a value indicating if the text section is visible
        **/
        public textVisible : boolean;
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
        public textWidth : number;
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
        public type : any;
        /**
        * Gets or sets the value of the input
        **/
        /**
        * Gets or sets the value of the input
        **/
        public value : any;
        /**
        * Gets or sets the valueItem of the input
        **/
        /**
        * Gets or sets the valueItem of the input
        **/
        public valueItem : ValueItem;
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
        public label: LabelItem;
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
        public value : any;
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
        public bar: JQuery;
        /**
        * Points to the DOM element where progress bar is contained
        **/
        public container: JQuery;
        /**
        * Creates the progress item
        **/
        constructor();
        /**
        * Gets the percentage represented by min, max and value values.
        Value ranges from 0 to 100
        **/
        public getPercentage(): number;
        /**
        * Raises the layout event
        **/
        public onLayout(animate?: boolean): void;
        /**
        * Gets or sets the maximum value of the progress bar
        **/
        /**
        * Gets or sets the maximum value of the progress bar
        **/
        public maxValue : number;
        /**
        * Gets or sets the minimum value of the progress bar
        **/
        /**
        * Gets or sets the minimum value of the progress bar
        **/
        public minValue : number;
        /**
        * Gets or sets the current value of the progress bar
        **/
        /**
        * Gets or sets the current value of the progress bar
        **/
        public value : number;
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
        public options : any;
        /**
        * Gets the collection of radio items
        *
        * @returns {Collection<RadioItem>}
        */
        public radios : Collection<RadioItem>;
        /**
        * Gets or sets the selected value of the combo
        **/
        /**
        * Gets or sets the selected value of the combo
        **/
        public value : any;
        /**
        * Gets the value as a string for human reading
        **/
        public valueString : any;
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
        public label: LabelItem;
        constructor(text?: string, value?: boolean);
        /**
        * Gets or sets the text of the checkbox
        **/
        /**
        * Gets or sets the text of the checkbox
        **/
        public text : string;
        /**
        * Gets or sets the checked state of checkbox
        **/
        /**
        * Gets or sets the checked state of checkbox
        **/
        public value : boolean;
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
        public input: JQuery;
        /**
        * Points to the placeholder label
        **/
        public placeholderLabel: LabelItem;
        /**
        * Points to the label on the side of textbox
        **/
        public sideLabel: LabelItem;
        /**
        * Raised when user presses the enter key
        **/
        public enterPressed: LatteEvent;
        /**
        * Raised when accessing the value of item.
        Returning something will override the value returned by the method
        **/
        public gettingValue: LatteEvent;
        /**
        * Raised when accessing the value string of item.
        Returning something will override the value returned by the method
        **/
        public gettingValueString: LatteEvent;
        /**
        * Raised when the user presses a key on the textbox
        */
        public keyPress: LatteEvent;
        /**
        * Raised when a key goes down
        */
        public keyDown: LatteEvent;
        /**
        * Raised when a key goes up
        */
        public keyUp: LatteEvent;
        /**
        * Raised when changing the value of the item.
        * Returning a string will override the value setted to the method
        **/
        public settingValue: LatteEvent;
        /**
        * Raised when time to add suggestions.
        */
        public filterSuggestions: LatteEvent;
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
        public getValue(): string;
        /**
        * Hides the suggestions
        */
        public hideSuggestions(): void;
        /**
        * Raises the <c>addSuggestion</c> event
        * @param item
        */
        public onAddSuggestion(item: Item): void;
        /**
        * Raises the <c>enterPressed</c> event
        **/
        public onEnterPressed(): void;
        /**
        * Raises the <c>filterSuggestions</c> event
        */
        public onFilterSuggestions(): void;
        /**
        * Raises the <c>gettingValue</c> event
        **/
        public onGettingValue(value: string): any;
        /**
        * Raises the <c>gettingValueString</c> event
        **/
        public onGettingValueString(value: string): any;
        /**
        * Raises the <c>keyPress</c> event
        * @param e
        */
        public onKeyPress(e: JQueryEventObject): void;
        /**
        * Raises the <c>keyDown</c>
        * @param e
        */
        public onKeyDown(e: JQueryEventObject): any;
        /**
        * Raises the <c>keyUp</c>
        * @param e
        */
        public onKeyUp(e: JQueryEventObject): any;
        /**
        * Overriden.
        **/
        public onLayout(): void;
        /**
        * Raises the <c>removeSuggestion</c> event
        * @param item
        */
        public onRemoveSuggestion(item: Item): void;
        /**
        * Raises the <c>settingValue</c> event
        **/
        public onSettingValue(value: string): any;
        /**
        * Raises the <c>valueChanged</c> event
        **/
        public onValueChanged(): void;
        /**
        * Selects the first item of suggestions
        */
        public selectFirstSuggestion(): void;
        /**
        * Selects the next suggestion (if possible)
        */
        public selectNextSuggestion(): void;
        /**
        * Selects the previous suggestion (if possible)
        */
        public selectPreviousSuggestion(): void;
        /**
        * Selects the specified suggestion from list
        * @throws Exception if index is out of range
        * @param index
        */
        public selectSuggestion(index: number): void;
        /**
        * Sets the width as a percentage. Dont forget to include '%' after size
        **/
        public setRelativeWidth(width: string): void;
        /**
        * Sets the side label as a "clear text" button, with the specified button
        * @param icon
        */
        public setSideAsCleaner(icon?: IconItem): void;
        /**
        * Sets the value.
        Optionally it sets the value silently whitout updating the INPUT value.
        **/
        public setValue(value: string, silentOnInput?: boolean): void;
        /**
        * Gets or sets a value indicating if the textbox height should grow automatically
        to adjust to fit its text
        **/
        /**
        * Gets or sets a value indicating if the textbox height should grow automatically
        to adjust to fit its text
        **/
        public autoGrow : boolean;
        /**
        * Gets or sets the maximum length for input in the textbox
        **/
        /**
        * Gets or sets the maximum length for input in the textbox
        **/
        public maxLength : number;
        /**
        * Gets or sets the minimum height of the textbox, if multiline
        **/
        /**
        * Gets or sets the minimum height of the textbox, if multiline
        **/
        public minHeight : number;
        /**
        * Gets or sets the minimum length of text to activate suggestions
        * @param value
        */
        /**
        * Gets or sets the minimum length of text to activate suggestions
        * @param value
        */
        public minLengthToActivateSuggestions : number;
        /**
        * Gets or sets a value indicating if the textbox can be multiline
        **/
        /**
        * Gets or sets a value indicating if the textbox can be multiline
        **/
        public multiline : boolean;
        /**
        * Gets or sets a value indicating if the textbox accepts passwords
        **/
        /**
        * Gets or sets a value indicating if the textbox accepts passwords
        **/
        public password : boolean;
        /**
        * Gets or sets the placeholder text of textbox
        **/
        /**
        * Gets or sets the placeholder text of textbox
        **/
        public placeholder : string;
        /**
        * Gets the suggestions overlay
        */
        public suggestionOverlay : SuggestionOverlay;
        /**
        * Gets the collection of suggestions for autocompletion
        *
        * @returns {Collection<Item>}
        */
        public suggestions : Collection<Item>;
        /**
        * Gets a value indicating if the suggestions list is currently visible
        * @returns {boolean}
        */
        public suggestionsVisible : boolean;
        /**
        * Gets or sets the value.
        Optionally it sets the value silently whitout updating the INPUT value.
        **/
        /**
        * Gets or sets the value.
        Optionally it sets the value silently whitout updating the INPUT value.
        **/
        public value : string;
        /**
        * Gets the value as a string
        **/
        public valueString : string;
        /**
        * Gets or sets the width of the textbox.
        **/
        /**
        * Gets or sets the width of the textbox.
        **/
        public width : number;
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
        public getValue(): TimeSpan;
        public setValue(value: TimeSpan): void;
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
        public cancelElement: JQuery;
        /**
        * Points to the DOM element where loader text is placed
        **/
        public labelElement: JQuery;
        /**
        * Progressbar of loader. Hidden by default.
        **/
        public progress: ProgressItem;
        /**
        * Raised when user cancels the loader
        **/
        public cancelled: LatteEvent;
        /**
        * Creates and shows the loader. Optionally specifies if is to be shown as <c>modal</c>.
        **/
        constructor(text?: string, modal?: boolean);
        /**
        * Raises the <c>cancelled</c> event
        **/
        public onCancelled(): void;
        /**
        * Shows the loader on the UI
        **/
        public start(): void;
        /**
        * Hides the loader on the UI
        **/
        public stop(): void;
        /**
        * Gets or sets a value indicating if the loader allows user to cancel it.
        **/
        /**
        * Gets or sets a value indicating if the loader allows user to cancel it.
        **/
        public cancellable : boolean;
        /**
        * Gets or sets the description of the loader
        **/
        /**
        * Gets or sets the description of the loader
        **/
        public description : string;
        /**
        * Gets or sets a value indicating if the loader is modal
        **/
        /**
        * Gets or sets a value indicating if the loader is modal
        **/
        public modal : boolean;
        /**
        * Gets or sets the text of the loader
        **/
        /**
        * Gets or sets the text of the loader
        **/
        public text : string;
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
        public items: Collection<Item>;
        /**
        * Raised when the menu is closed
        **/
        public closed: LatteEvent;
        /**
        * Raised when the menu is about the be shown at the passed X coordinate.
        Handler may return a number to alter its position.
        **/
        public willShowAtX: LatteEvent;
        /**
        * Raised when the menu is about the be shown at the passed Y coordinate.
        Handler may return a number to alter its position.
        **/
        public willShowAtY: LatteEvent;
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
        public close(): MenuOverlay;
        /**
        * Closes the menus open by any of this Menu's children
        **/
        public closeChildrenMenus(): MenuOverlay;
        /**
        * Raises the <c>closed</c> event
        **/
        public onClosed(): void;
        public onLayout(): void;
        /**
        * Raises the <c>willShowAtX</c> event
        **/
        public onWillShowAtX(x: number): any;
        /**
        * Raises the <c>willShowAtY</c> event
        **/
        public onWillShowAtY(y: number): any;
        /**
        * Sets the parent button of the menu
        */
        public setParentButton(b: ButtonItem): void;
        /**
        * Shows the menu relative to the specified element
        **/
        public show(item: Item, side: Side, edge: Side): MenuOverlay;
        /**
        * Shows the menu at the exact point
        **/
        public showAt(x: number, y: number): void;
        /**
        * Gets the parent element relative to this menu. The menu is shown to the <c>side</c> of this element
        **/
        public domElement : JQuery;
        /**
        * Gets the edge of the menu, relative to element provided by <c>domElement</c>
        **/
        public edge : Side;
        /**
        * Gets the parent item of the menu
        **/
        public item : Item;
        /**
        * Gets the orientation of the menu, relative to element provided by <c>domElement</c>
        **/
        public side : Side;
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
        public ribbon: Ribbon;
        /**
        * Creates the View
        **/
        constructor();
        /**
        * Handles changes in size
        **/
        public onLayoutHIDDEN(): void;
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
        public tabs: Collection<TabItem>;
        /**
        * Collection of views.
        View will be activated when tab changed if matches index of tab.
        **/
        public views: Collection<View>;
        /**
        * Raised when a tab is selected
        **/
        public selectedTabChanged: LatteEvent;
        /**
        * Creates the view
        **/
        constructor();
        /**
        *
        **/
        public onTabAdded(tab: TabItem): void;
        /**
        *
        **/
        public onTabRemoved(tab: TabItem): void;
        /**
        * Raises the <c>selectedTabChanged</c> event
        **/
        public onSelectedTabChanged(): void;
        /**
        * Override
        */
        public onAnchorTopChanged(): void;
        /**
        * Override
        */
        public onAnchorRightChanged(): void;
        /**
        * Override
        */
        public onAnchorBottomChanged(): void;
        /**
        * Override
        */
        public onAnchorLeftChanged(): void;
        /**
        * Gets or sets the selected tab of the view
        **/
        /**
        * Gets or sets the selected tab of the view
        **/
        public selectedTab : TabItem;
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
        public tabsSide : Side;
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
        public toolbar: Toolbar;
        /**
        * Creates the ToolbarView
        **/
        constructor();
        public onAnchorTopChanged(): void;
        public onAnchorRightChanged(): void;
        public onAnchorBottomChanged(): void;
        public onAnchorLeftChanged(): void;
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
        public items: Collection<CalendarItem>;
        /**
        * Raised when the view start/end changes
        **/
        public viewRangeChanged: LatteEvent;
        /**
        * Raised when an item is added
        **/
        public userAddItem: LatteEvent;
        /**
        * Raised when an item is removed
        **/
        public userRemoveItem: LatteEvent;
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
        public clearSelection(): void;
        /**
        * Creates an item at the selection
        **/
        public createItemAtSelection(text?: string): CalendarItem;
        /**
        * Overriden. Raises the <c>layout</c> event
        **/
        public onLayout(): void;
        /**
        * Updates layout of items on calendar
        **/
        public onLayoutItems(): void;
        /**
        * Raises the <c>userAddItem</c> event.
        **/
        public onUserAddItem(item: CalendarItem): void;
        /**
        * Raises the <c>userRemoveItem</c> event.
        **/
        public onUserRemoveItem(item: CalendarItem): void;
        /**
        * Raises the <c>viewRangeChanged</c> event.
        **/
        public onViewRangeChanged(): void;
        /**
        * Returns a value indicating if the selection is on header
        **/
        public selectionOnHeader(): boolean;
        /**
        * Sets the current selection range
        **/
        public setSelectionRange(start: DateTime, end: DateTime): void;
        /**
        * Sets the view range of the day view
        **/
        public setViewRange(start: DateTime, end: DateTime): void;
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
        public allowItemCreate : boolean;
        /**
        * Gets the end of view
        **/
        public viewEnd : DateTime;
        /**
        * Gets the start of view
        **/
        public viewStart : DateTime;
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
        public items: Collection<CalendarItem>;
        /**
        * Raised when the view start/end changes
        **/
        public viewRangeChanged: LatteEvent;
        /**
        * Raised when an item is added
        **/
        public userAddItem: LatteEvent;
        /**
        * Raised when an item is removed
        **/
        public userRemoveItem: LatteEvent;
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
        public clearSelection(): void;
        /**
        * Creates an item at the selection
        **/
        public createItemAtSelection(text?: string): CalendarItem;
        /**
        * Overriden. Raises the <c>layout</c> event.
        **/
        public onLayout(): void;
        /**
        * Extension for setting the layout of items
        **/
        public onLayoutItems(): void;
        /**
        * Raises the <c>userAddItem</c> event.
        **/
        public onUserAddItem(item: CalendarItem): void;
        /**
        * Raises the <c>userRemoveItem</c> event.
        **/
        public onUserRemoveItem(item: CalendarItem): void;
        /**
        * Raises the <c>viewRangeChanged</c> event.
        **/
        public onViewRangeChanged(): void;
        /**
        *
        **/
        public setSelectionRange(start: DateTime, end: DateTime): void;
        /**
        * Sets the month to show. Only year and month of date will be taken.
        **/
        public setViewRange(date: DateTime): void;
        /**
        * Gets or sets the month on the view
        **/
        /**
        * Gets or sets the month on the view
        **/
        public monthOnView : DateTime;
        /**
        * Gets the end of view
        **/
        public viewEnd : DateTime;
        /**
        * Gets the start of view
        **/
        public viewStart : DateTime;
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
        public _controls: JQuery;
        /**
        * Group of buttons for scrolling through calendar
        **/
        public buttonGroup: ButtonGroupItem;
        /**
        * Button for scrolling to next date range
        **/
        public buttonNext: ButtonItem;
        /**
        * Button for scrolling to previous date range
        **/
        public buttonPrevious: ButtonItem;
        /**
        * Button for scrolling to today date range
        **/
        public buttonToday: ButtonItem;
        /**
        * Selector of dates for calendar
        **/
        public dateView: DateView;
        /**
        * View for showing full days
        **/
        public dayView: CalendarDayView;
        /**
        * View for showing full days
        **/
        public monthView: CalendarMonthView;
        /**
        * Title showing current date range
        **/
        public titleItem: LabelItem;
        /**
        * Raised when <c>selectionStart</c> or <c>selectionEnd</c> properties value change.
        **/
        public selectionChanged: LatteEvent;
        /**
        * Raised when an item is added
        **/
        public userAddItem: LatteEvent;
        /**
        * Raised when an item is removed
        **/
        public userRemoveItem: LatteEvent;
        /**
        * Raised when the view start/end changes
        **/
        public viewRangeChanged: LatteEvent;
        /**
        * Creates the view
        **/
        constructor();
        /**
        * Navigates to the next range of dates, based on the current range
        **/
        public goNext(): void;
        /**
        * Navigates to the previous range of dates, based on the current range
        **/
        public goPrevious(): void;
        /**
        * Navigates to the today day.
        **/
        public goToday(): void;
        /**
        * Overriden.
        **/
        public onLayout(): void;
        /**
        * Raises the <c>selectionChanged</c> event
        **/
        public onSelectionChanged(): void;
        /**
        * Raises the <c>userAddItem</c> event.
        **/
        public onUserAddItem(item: CalendarItem): void;
        /**
        * Raises the <c>userRemoveItem</c> event.
        **/
        public onUserRemoveItem(item: CalendarItem): void;
        /**
        * Raises the <c>viewRangeChanged</c> event.
        **/
        public onViewRangeChanged(): void;
        /**
        * Gets or sets the working end time of specified week day.
        **/
        public workDayEnd(day: WeekDay, value?: TimeSpan): TimeSpan;
        /**
        * Gets or sets the working start time of specified week day.
        **/
        public workDayStart(day: WeekDay, value?: TimeSpan): TimeSpan;
        /**
        * Gets or sets a value indicating if user is allowed to create items on timespans
        **/
        /**
        * Gets or sets a value indicating if user is allowed to create items on timespans
        **/
        public allowItemCreate : boolean;
        /**
        * Gets or sets a value indicating if user is allowed to drag items around
        **/
        /**
        * Gets or sets a value indicating if user is allowed to drag items around
        **/
        public allowItemDrag : boolean;
        /**
        * Gets or sets a value indicating if user is allowed to edit item text
        **/
        /**
        * Gets or sets a value indicating if user is allowed to edit item text
        **/
        public allowItemEdit : boolean;
        /**
        * Gets or sets a value indicating if user is allowed to delete items
        **/
        /**
        * Gets or sets a value indicating if user is allowed to delete items
        **/
        public allowItemRemove : boolean;
        /**
        * Gets or sets a value indicating if user is allowed to resize timespan of items
        **/
        /**
        * Gets or sets a value indicating if user is allowed to resize timespan of items
        **/
        public allowItemResize : boolean;
        /**
        * Gets or sets the time days should end. Default is 23:59:59
        **/
        /**
        * Gets or sets the time days should end. Default is 23:59:59
        **/
        public dayEnd : TimeSpan;
        /**
        * Gets or sets the time days should start. Default is 00:00
        **/
        /**
        * Gets or sets the time days should start. Default is 00:00
        **/
        public dayStart : TimeSpan;
        /**
        * Gets a value indicating if there is an item on edit mode
        **/
        /**
        * Gets a value indicating if there is an item on edit mode
        **/
        public editMode : any;
        /**
        * Gets the item being edited, if any.
        **/
        /**
        * Gets the item being edited, if any.
        **/
        public editModeItem : any;
        /**
        * Gets or sets the first day of week. Default is <c>WeekDay.SUNDAY</c>.
        **/
        /**
        * Gets or sets the first day of week. Default is <c>WeekDay.SUNDAY</c>.
        **/
        public firstDayOfWeek : WeekDay;
        /**
        * Gets or sets a value indicating if the navigator elements should be visible
        **/
        /**
        * Gets or sets a value indicating if the navigator elements should be visible
        **/
        public navigatorVisible : boolean;
        /**
        * Gets or sets the selection's start
        **/
        /**
        * Gets or sets the selection's start
        **/
        public selectionEnd : DateTime;
        /**
        * Gets or sets the selection mode
        **/
        /**
        * Gets or sets the selection mode
        **/
        public selectionMode : DateSelectionMode;
        /**
        * Gets or sets the selection's start
        **/
        /**
        * Gets or sets the selection's start
        **/
        public selectionStart : DateTime;
        /**
        * Gets or sets the view's end.
        **/
        public viewEnd : DateTime;
        /**
        * Gets or sets the view's start.
        **/
        public viewStart : DateTime;
        /**
        * Gets or sets the work week's end.
        **/
        /**
        * Gets or sets the work week's end.
        **/
        public workWeekEnd : WeekDay;
        /**
        * Gets or sets the work week's start.
        **/
        /**
        * Gets or sets the work week's start.
        **/
        public workWeekStart : WeekDay;
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
        public onLayout(): void;
        /**
        * Back field for event
        */
        private _frameDraw;
        /**
        * Gets an event raised when the frame should be drawn
        *
        * @returns {LatteEvent}
        */
        public frameDraw : LatteEvent;
        /**
        * Raises the <c>frameDraw</c> event
        */
        public onFrameDraw(): void;
        /**
        * Back field for event
        */
        private _frameUpdate;
        /**
        * Gets an event raised when the frame should be updated
        *
        * @returns {LatteEvent}
        */
        public frameUpdate : LatteEvent;
        /**
        * Raises the <c>frameUpdate</c> event
        */
        public onFrameUpdate(): void;
        /**
        * Back field for event
        */
        private _pausedChanged;
        /**
        * Gets an event raised when the value of the paused property changes
        *
        * @returns {LatteEvent}
        */
        public pausedChanged : LatteEvent;
        /**
        * Raises the <c>paused</c> event
        */
        public onPausedChanged(): void;
        /**
        * Field for canvas property
        */
        private _canvas;
        /**
        * Gets the canvas
        *
        * @returns {HTMLCanvasElement}
        */
        public canvas : HTMLCanvasElement;
        /**
        * Property field
        */
        private _canvasPosition;
        /**
        * Gets the canvas position
        *
        * @returns {Point}
        */
        public canvasPosition : Point;
        /**
        * Field for context property
        */
        private _context;
        /**
        * Gets the context to draw
        *
        * @returns {CanvasRenderingContext2D}
        */
        public context : CanvasRenderingContext2D;
        /**
        * Field for drawingContext property
        */
        private _drawingContext;
        /**
        * Gets the drawing context
        *
        * @returns {DrawingContext}
        */
        public drawingContext : DrawingContext;
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
        public fpsVisible : boolean;
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
        public paused : boolean;
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
        public redrawTime : number;
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
        public scene : DrawingScene;
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
        public dateItem: DateItem;
        /**
        * Button for activating day selection mode.
        **/
        public dayButton: ButtonItem;
        /**
        * Button for activating month selection mode.
        **/
        public monthButton: ButtonItem;
        /**
        * Button for activating week selection mode.
        **/
        public weekButton: ButtonItem;
        /**
        * Button for activating work week selection mode.
        **/
        public workWeekButton: ButtonItem;
        /**
        * Creates the view
        **/
        constructor();
        /**
        * Hides the selection mode buttons
        **/
        public hideButtons(): void;
        /**
        * Overriden
        **/
        public onLayout(): void;
        /**
        * Layout of buttons
        **/
        public onLayoutButtons(): void;
        /**
        * Shows the selection mode buttons
        **/
        public showButtons(): void;
        /**
        * Updates the selection mode indicators
        **/
        public updateSelectionMode(): void;
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
        public valid(): boolean;
        /**
        * Returns an object with the values of fields
        **/
        public getValues(): any;
        /**
        * Gets or sets the with of the text parts.
        * Value must be percent since it must be leveled with value part. Value size will be adjusted
        * to 5% less large than it should to avoid edge collisions.
        * Values lower than 1 accepted.
        * Note that when horizontal input, layout may become affected.
        *
        */
        public setTextWidth(value: number): void;
        /**
        * Back field for event
        */
        private _valueChanged;
        /**
        * Gets an event raised when a value of the form changes
        *
        * @returns {LatteEvent}
        */
        public valueChanged : LatteEvent;
        /**
        * Raises the <c>valueChanged</c> event
        */
        public onValueChanged(): void;
        /**
        * Field for form property
        */
        private _form;
        /**
        * Gets the form of the view
        *
        * @returns {FormItem}
        */
        public form : FormItem;
        /**
        * Gets or sets a value indicating if the form has a visible face style.
        **/
        /**
        * Gets or sets a value indicating if the form has a visible face style.
        **/
        public faceVisible : boolean;
        /**
        * Gets the inputs of the form
        *
        * @returns {Collection<InputItem>}
        */
        public inputs : Collection<InputItem>;
        /**
        * Gets or sets a value indicating if the inputs in the form are read-only
        **/
        /**
        * Gets or sets a value indicating if the inputs in the form are read-only
        **/
        public readOnly : boolean;
        /**
        * Gets or sets the title of the form
        **/
        /**
        * Gets or sets the title of the form
        **/
        public title : string;
        /**
        * Gets the title label of the form
        *
        * @returns {LabelItem}
        */
        public titleLabel : LabelItem;
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
        public append(element: JQuery): void;
        /**
        * Gets or sets the html of the view
        **/
        /**
        * Gets or sets the html of the view
        **/
        public html : string;
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
        public onLayout(): void;
        /**
        * Gets or sets the item of the view
        **/
        /**
        * Gets or sets the item of the view
        **/
        public item : Item;
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
        public descriptionElement: JQuery;
        /**
        * Pointer to the DOM element of icon holder.
        **/
        public iconElement: JQuery;
        /**
        * Pointer to the DOM element of message text.
        **/
        public messageElement: JQuery;
        /**
        * Creates the message view
        **/
        constructor();
        /**
        * Sets the icon as the default "alert" icon
        **/
        public iconAlert(): MessageView;
        /**
        * Sets the icon as the default "error" icon
        **/
        public iconError(): MessageView;
        /**
        * Sets the icon as the default "info" icon
        **/
        public iconInfo(): MessageView;
        /**
        * Sets the icon as the default "alert" icon
        **/
        public iconQuestion(): MessageView;
        /**
        * Gets or sets the description of the message
        **/
        /**
        * Gets or sets the description of the message
        **/
        public description : string;
        /**
        * Gets or sets the icon of the message
        **/
        /**
        * Gets or sets the icon of the message
        **/
        public icon : IconItem;
        /**
        * Gets or sets the message
        **/
        /**
        * Gets or sets the message
        **/
        public message : string;
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
        public textElement: JQuery;
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
        public text : string;
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
        public barElement: JQuery;
        /**
        * Pointer to the <c>close</c> button
        **/
        public closeButton: ButtonItem;
        /**
        * Collection of items to show as commands
        **/
        public items: Collection<Item>;
        /**
        * Pointer to the DOM element where <c>items</c> are placed
        **/
        public itemsElement: JQuery;
        /**
        * Pointer to the DOM element where title text is placed
        **/
        public titleElement: JQuery;
        /**
        * Raised when the user is soliciting to close the dialog. If the event returns false, the close is cancelled.
        **/
        public closing: LatteEvent;
        /**
        * Raised when the dialog has been closed.
        **/
        public closed: LatteEvent;
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
        public addButton(text: string, handler?: GenericCallback): DialogView;
        /**
        * Adds an 'Cancel' button to the dialog items
        **/
        public addCancelButton(handler?: GenericCallback): DialogView;
        /**
        * Adds an 'No' button to the dialog items
        **/
        public addNoButton(handler: GenericCallback): DialogView;
        /**
        * Adds an 'Ok' button to the dialog items
        **/
        public addOkButton(handler: GenericCallback): DialogView;
        /**
        * Adds an 'Save' button to the dialog items
        **/
        public addSaveButton(handler: GenericCallback): DialogView;
        /**
        * Adds a 'Yes' button to the dialog items
        **/
        public addYesButton(handler: GenericCallback): DialogView;
        /**
        * Closes the dialog
        **/
        public close(): boolean;
        /**
        *
        **/
        public handler(): void;
        /**
        * Raises the <c>closed</c> event
        **/
        public onClosed(): void;
        /**
        * Raises the <c>closing</c> event
        **/
        public onClosing(): boolean;
        /**
        * Raises the <c>layout</c> event
        **/
        public onLayout(): void;
        /**
        * Shows the dialog as modal
        **/
        public show(): DialogView;
        /**
        * Gets or sets the button which is to be pressed by default when cancelling the dialog.
        If no button is set as default, this function will return the last button of <c>items</c> collection.
        **/
        /**
        * Gets or sets the button which is to be pressed by default when cancelling the dialog.
        If no button is set as default, this function will return the last button of <c>items</c> collection.
        **/
        public cancelButton : ButtonItem;
        /**
        * Gets or sets a value indicating if the dialog is closable by default
        **/
        /**
        * Gets or sets a value indicating if the dialog is closable by default
        **/
        public closeable : boolean;
        /**
        * Gets or sets the button which is to be pressed by default when pressing enter.
        If no button is set as default, this function will return the first button of <c>items</c> collection.
        **/
        /**
        * Gets or sets the button which is to be pressed by default when pressing enter.
        If no button is set as default, this function will return the first button of <c>items</c> collection.
        **/
        public defaultButton : ButtonItem;
        /**
        * Gets or sets the title of the dialog
        **/
        /**
        * Gets or sets the title of the dialog
        **/
        public title : string;
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
        public list: ListView;
        /**
        *
        **/
        public toolbar: Toolbar;
        /**
        *
        **/
        constructor();
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
        public columnHeaders: Collection<ColumnHeader>;
        /**
        * Points to the DOM element where the column headers are placed.
        **/
        public columnHeadersElement: JQuery;
        /**
        * Collection of items in list
        **/
        public items: Collection<ListViewItem>;
        /**
        * Creates the ListView
        **/
        constructor();
        /**
        *
        **/
        public _informSelectedItem(item: ListViewItem): void;
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
        public onLayout(): void;
        /**
        * Gets or sets a value indicating if the column headers are currently visible
        **/
        /**
        * Gets or sets a value indicating if the column headers are currently visible
        **/
        public columnHeadersVisible : boolean;
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
        public selectedItem : ListViewItem;
        /**
        * Back field for event
        */
        private _selectedItemChanged;
        /**
        * Gets an event raised when the value of the selectedItem property changes
        *
        * @returns {LatteEvent}
        */
        public selectedItemChanged : LatteEvent;
        /**
        * Raises the <c>selectedItem</c> event
        */
        public onSelectedItemChanged(): void;
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
        public items: Collection<TreeItem>;
        /**
        * Raised when an item of the view is selected
        **/
        public itemSelected: LatteEvent;
        /**
        * Raised when the items of an item are loaded. This event is manually
        * triggered, it is raised when <c>TreeItem.reportItemsLoaded</c> is invoked.
        **/
        public itemItemsLoaded: LatteEvent;
        /**
        * Creates the item
        **/
        constructor();
        /**
        *
        **/
        public _informSelectedItem(item: TreeItem): void;
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
        public navigateToPath(path: string[]): void;
        /**
        * Raises the <c>itemItemsLoaded</c> event
        **/
        public onItemItemsLoaded(item: TreeItem): void;
        /**
        * Raises the <c>itemSelected</c> event
        **/
        public onItemSelected(item: TreeItem): void;
        /**
        * Gets an event raised when an item is added
        *
        * @returns {LatteEvent}
        */
        public addItem : LatteEvent;
        /**
        * Gets or sets the default glyph for collapse
        **/
        /**
        * Gets or sets the default glyph for collapse
        **/
        public defaultGlyphCollapse : Glyph;
        /**
        * Gets or sets the default glyph for collapse when item is selected
        **/
        /**
        * Gets or sets the default glyph for collapse when item is selected
        **/
        public defaultGlyphCollapseSelected : Glyph;
        /**
        * Gets or sets the default glyph for expand
        **/
        /**
        * Gets or sets the default glyph for expand
        **/
        public defaultGlyphExpand : Glyph;
        /**
        * Gets or sets the default glyph for expand when item is selected
        **/
        /**
        * Gets or sets the default glyph for expand when item is selected
        **/
        public defaultGlyphExpandSelected : Glyph;
        /**
        * Gets a value indicating if the tree view is currently in the process
        of navigating to a specific node.
        **/
        public navigating : boolean;
        /**
        * Gets the current navigation path as a string
        **/
        public path : any;
        /**
        * Gets or sets the item who is selected on the tree
        **/
        /**
        * Gets or sets the item who is selected on the tree
        **/
        public selectedItem : TreeItem;
        /**
        * Gets an event raised when an item is removed from tree
        *
        * @returns {LatteEvent}
        */
        public removeItem : LatteEvent;
    }
}
