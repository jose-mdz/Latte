/// <reference path="datalatte.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="latte.d.ts" />
/// <reference path="latte.strings.d.ts" />
/// <reference path="latte.ui.strings.d.ts" />
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
        addClass(classString: string): this;
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
        removeClass(classString: string): this;
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
        static setModalView(view?: View, itemsArray?: Array<Item>): void;
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
        constructor(items?: Array<Item>);
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
        constructor(buttons?: Array<ButtonItem>);
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
        columnWeights: Array<number>;
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
        static path: Array<string>;
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
        static elements: Array<JQuery>;
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
        columns: Array<JQuery>;
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
        getValue(): Array<File>;
        /**
         * Resets the input field
         */
        resetInput(): void;
        /**
         * Sets the value. This is ignored since UA won't allow it.
         *
         * @param value
         */
        setValue(value: Array<File>): void;
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
    class SuggestionOverlay extends StackOverlay {
        constructor();
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
        close(): this;
        /**
         * Closes the menus open by any of this Menu's children
         **/
        closeChildrenMenus(): this;
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
        constructor(inputs?: Array<InputItem>);
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
        static alert(message: string, description?: string, items?: Array<Item>): DialogView;
        /**
         * Shows a question <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static ask(message: string, description?: string, items?: Array<Item>): DialogView;
        /**
         * Shows a question MessageView asking form deletion confirmation of the specified object
         * @param objectName
         * @param callback
         */
        static confirmDelete(objectName: string, callback: () => any): void;
        /**
         * Shows an error <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static error(message: string, description?: string, items?: Array<Item>): DialogView;
        /**
         * Shows an information <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static inform(message: string, description?: string, items?: Array<Item>): DialogView;
        /**
         * Shows the specified <c>message</c> within a DialogView. Optionally specifies <c>items</c> for the dialog.
         **/
        static showMessage(message: MessageView, items?: Array<Item>): DialogView;
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
        constructor(view?: View, items?: Array<Item>);
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
         * Property field
         */
        private _columnHeadersWidth;
        /**
         * Gets the width of column headers zone
         *
         * @returns {number}
         */
        columnHeadersWidth: number;
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
        navigateToPath(path: Array<string>): void;
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
