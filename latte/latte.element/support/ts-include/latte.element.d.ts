/// <reference path="datalatte.d.ts" />
/// <reference path="latte.d.ts" />
/// <reference path="latte.data.d.ts" />
/// <reference path="latte.data.strings.d.ts" />
/// <reference path="latte.strings.d.ts" />
/**
 * Created by josemanuel on 5/28/15.
 */
declare module latte {
    /**
     * Requirements for an adapter. An adapter transforms the values from an latte.Element to any other object.
     */
    interface DataAdapter<E, V> {
        /**
         * Transforms the value of the record into a proper value for the element
         *
         * @param value
         */
        adaptForElement(value: V): E;
        /**
         * Transforms the value of the element into a proper value for the record
         * @param value
         */
        adaptForRecord(value: E): V;
    }
}
/**
 * Created by josemanuel on 3/25/15.
 */
declare module latte {
    /**
     *
     */
    class Element<T extends HTMLElement> {
        /**
         * Creates a new element in memory from the specified tag name
         * @param tagName
         * @returns {latte.Element<HTMLElement>}
         */
        static create(tagName?: string): Element<HTMLElement>;
        /**
         * Creates an element from the latte.globalViewBank object.
         *
         * @param key
         * @returns {latte.Element<HTMLElement>}
         */
        static fromBank(key: string): HTMLElement;
        /**
         * Searches for the specified path, clones it and returns its html element
         * @param path
         */
        static outlet(path: string): HTMLElement;
        /**
         * Gets the height of the specified document
         * @param d
         * @returns {number}
         */
        static getDocumentHeight(d: Document): number;
        /**
         * Gets the width of the specified document
         * @param d
         * @returns {number}
         */
        static getDocumentWidth(d: Document): number;
        /**
         * Gets the width of the viewport
         *
         * @returns {number}
         */
        static getViewportWidth(d: Document): number;
        /**
         * Gets the width of the viewport
         *
         * @returns {number}
         */
        static getViewportHeight(d: Document): number;
        /**
         * Gets the scrollTop
         * @returns {number}
         */
        static windowScrollLeft: number;
        /**
         * Gets the scrollTop
         * @returns {number}
         */
        static windowScrollTop: number;
        /**
         * Converts the value in css format to a number
         *
         * @param property
         * @returns {number}
         */
        private getCssNumericValue(property);
        /**
         * Converts the value to a value + px, depending on the property
         *
         * @param property
         * @param value
         */
        private setCssNumericValue(property, value);
        private dataElements;
        /**
         * Creates an element
         */
        constructor(element: HTMLElement);
        private addBindedElement(e, ebind, dbind);
        /**
         * Adds an element
         * @param element
         */
        add(element: Element<HTMLElement>): Element<HTMLElement>;
        /**
         * Adds an array of elements to this element
         * @param elements
         */
        addArray(elements: Element<HTMLElement>[]): Element<HTMLElement>[];
        /**
         * Adds the specified collection of elements
         *
         * @param elements
         */
        addCollection(elements: ElementCollection): ElementCollection;
        /**
         * Adds the specified class to the class list
         * @param className
         */
        addClass(className: string): void;
        /**
         * Adds an event listener
         * @param event
         * @param handler
         * @param capture
         */
        addEventListener(event: string, handler: (any) => any, capture?: boolean): void;
        /**
         * Animates the element specified properties, by establishing the initial values for the properties to animate.
         *
         * @param startProperties
         * @param endProperties
         * @param duration Duration of the animation in seconds
         * @param callback
         */
        animateFrom(startProperties: any, endProperties: any, duration?: number, callback?: () => void): void;
        /**
         * Animates the element properties, by letting the code to infer the initial values of the properties
         *
         * @param properties
         * @param duration Duration of the animation in seconds
         * @param callback
         */
        animate(properties: any, duration?: number, callback?: () => void): void;
        /**
         * Appends the element to the specified container
         * @param parent
         */
        appendTo(parent: HTMLElement): void;
        /**
         * Creates an automatic handler
         *
         * @param container
         * @param elementName
         * @param eventName
         */
        autohandler(container: Element<HTMLElement>, elementName: string, eventName: string): void;
        /**
         * Binds the element to the specified object
         * @param object
         * @param hide
         */
        bind(object: any, hide?: boolean): void;
        /**
         * Makes the element blink
         *
         * @param callback
         */
        blink(callback?: () => any): void;
        /**
         * Clears all the children of the element
         */
        clear(): void;
        /**
         * Called when the data of the element has loaded successfully
         */
        dataDidLoad(): void;
        /**
         * Called when the data load failed
         */
        dataLoadFailed(errorDescription: string): void;
        /**
         * Called when data load is about to start
         */
        dataWillLoad(): void;
        /**
         * Called when the element has been assigned as only child of another element, using the setContent method
         */
        didLoad(): void;
        /**
         * If conditional is true, ensures element has class, if not, ensures it doesn't
         * @param className
         * @param condition
         */
        ensureClass(className: string, condition: boolean): void;
        /**
         * Fades the element in
         * @param duration
         * @param callback
         */
        fadeIn(duration?: number, callback?: () => any): void;
        /**
         * Fades the element out
         * @param duration
         * @param callback
         */
        fadeOut(duration?: number, callback?: () => any): void;
        /**
         * Finds an element and returns it
         * @param query
         * @returns {Element}
         */
        find(query: string): Element<HTMLElement>;
        /**
         * Returns the collection of matched nodes who are instances of latte.Element
         * @param query
         * @returns {latte.ElementCollection}
         */
        findAll(query: string): ElementCollection;
        /**
         * Gets the children of the element as an ElementCollection
         */
        getCollection(): ElementCollection;
        /**
         * Gets the size of the element
         */
        getSize(): {
            width: number;
            height: number;
        };
        /**
         * Adds an event handler to the
         * @param event
         * @param f
         */
        handle(context: any, event: string, f: Function): void;
        /**
         * Returns a value indicating if the element has the specified class
         *
         * @param className
         */
        hasClass(className: string): boolean;
        /**
         * Loads the data of the data calls
         */
        loadData(): void;
        /**
         * Override this method to indicate the element loads data
         * @returns {null}
         */
        loadDataCalls(): RemoteCall<any>[];
        /**
         * Raises the <c>contentEditable</c> event
         */
        onContentEditableChanged(): void;
        /**
         * Raises the <c>tag</c> event
         */
        onTagChanged(): void;
        /**
         * Raises the <c>visible</c> event
         */
        onVisibleChanged(): void;
        /**
         * Queries element for a native HTMLElement
         * @param query
         * @returns {HTMLElement}
         */
        querySelector(query: string): HTMLElement;
        /**
         * Queries element for native HTMLElements
         * @param query
         * @returns {NodeList}
         */
        querySelectorAll(query: string): NodeList;
        /**
         * Removes the specified child
         * @param e
         */
        remove(e: Element<HTMLElement>): void;
        /**
         * Removes the specified class to the class list
         *
         * @param className
         */
        removeClass(className: string): void;
        /**
         * Removes this from its parent element
         */
        removeFromParent(): void;
        /**
         * Sets the content of the element, deleting all existing children.
         * @param e
         */
        setContent(e: Element<HTMLElement>, silent?: boolean): void;
        /**
         * Sets the children of the element, deleting all existing children
         * @param e
         */
        setChildren(e: Element<HTMLElement>[]): void;
        /**
         * Sets the children of the element as the elements of the collection
         * @param c
         */
        setCollection(c: ElementCollection): ElementCollection;
        /**
         * Replaces the element
         * @param e
         */
        setElement(e: T): void;
        /**
         * Alternates the class, adds it if no present and removes it if present.
         * @param className
         */
        swapClass(className: string): void;
        toString(): string;
        /**
         * Back field for event
         */
        private _contentEditableChanged;
        /**
         * Gets an event raised when the value of the contentEditable property changes
         *
         * @returns {LatteEvent}
         */
        contentEditableChanged: LatteEvent;
        /**
         * Back field for event
         */
        private _dataBindAdded;
        /**
         * Gets an event raised when a data bind is added
         *
         * @returns {LatteEvent}
         */
        dataBindAdded: LatteEvent;
        /**
         * Raises the <c>dataBindAdded</c> event
         */
        onDataBindAdded(b: DataBind): void;
        /**
         * Back field for event
         */
        private _eventBindAdded;
        /**
         * Gets an event raised when an event bind is added
         *
         * @returns {LatteEvent}
         */
        eventBindAdded: LatteEvent;
        /**
         * Raises the <c>eventBindAdded</c> event
         */
        onEventBindAdded(b: EventBind): void;
        /**
         * Back field for event
         */
        private _tagChanged;
        /**
         * Gets an event raised when the value of the tag property changes
         *
         * @returns {LatteEvent}
         */
        tagChanged: LatteEvent;
        /**
         * Back field for event
         */
        private _visibleChanged;
        /**
         * Gets an event raised when the value of the visible property changes
         *
         * @returns {LatteEvent}
         */
        visibleChanged: LatteEvent;
        /**
         * Gets or sets the background color of the element
         * @returns {string}
         */
        /**
         * Gets or sets the background color of the element
         * @param value
         */
        backgroundColor: string;
        /**
         * Gets or sets the background image url
         *
         * @returns {string}
         */
        /**
         * Gets or sets the background image url
         *
         * @param {string} value
         */
        backgroundImageUrl: string;
        /**
         * Field for bindedElements property
         */
        private _bindedElements;
        /**
         * Gets the binded elements of this element
         *
         * @returns {Element<HTMLElement>[]}
         */
        bindedElements: Element<HTMLElement>[];
        /**
         * Property field
         */
        private _contentEditable;
        /**
         * Gets or sets a value indicating if the node should de activated as editable
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the node should de activated as editable
         *
         * @param {boolean} value
         */
        contentEditable: boolean;
        /**
         * Property field
         */
        private _isAnimated;
        /**
         * Gets a value indicating if the element is being animated
         *
         * @returns {boolean}
         */
        isAnimated: boolean;
        /**
         * Field for dataBinds property
         */
        private _dataBinds;
        /**
         * Gets the data binds of the element
         *
         * @returns {DataBind[]}
         */
        dataBinds: DataBind[];
        /**
         * Gets the height of the elements document
         *
         * @returns {number}
         */
        documentHeight: number;
        /**
         * Gets the width of the elements document
         *
         * @returns {number}
         */
        documentWidth: number;
        /**
         * Property field
         */
        private _element;
        /**
         * Gets the core html element
         *
         * @returns {HTMLDivElement}
         */
        element: T;
        /**
         * Field for eventBinds property
         */
        private _eventBinds;
        /**
         * Gets the event binds of the element
         *
         * @returns {EventBind[]}
         */
        eventBinds: EventBind[];
        /**
         * Gets or sets the height of the element in pixels
         *
         * @returns {number}
         */
        /**
         * Gets or sets the height of the element in pixels
         *
         * @param {number} value
         */
        height: number;
        /**
         * Gets the left of the element, relative to the viewport
         *
         * @returns {number}
         */
        left: number;
        /**
         * Gets the style of the element
         *
         * @returns {CSSStyleDeclaration}
         */
        style: CSSStyleDeclaration;
        /**
         * Property field
         */
        private _tag;
        /**
         * Gets or sets the tag for the object
         *
         * @returns {any}
         */
        /**
         * Gets or sets the tag for the object
         *
         * @param {any} value
         */
        tag: any;
        /**
         * Gets or sets the inner text of the element
         *
         * @returns {string}
         */
        /**
         * Gets or sets the inner text of the element
         *
         * @param {string} value
         */
        text: string;
        /**
         * Gets the top of the element, relative to the viewport
         *
         * @returns {number}
         */
        top: number;
        /**
         * Gets the height of the viewport of the element
         *
         * @returns {number}
         */
        viewportHeight: number;
        /**
         * Gets the width of the viewport of the element
         *
         * @returns {number}
         */
        viewportWidth: number;
        /**
         * Property field
         */
        private _visible;
        /**
         * Gets or sets a value indicating if the element is displayed
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the element is displayed
         *
         * @param {boolean} value
         */
        visible: boolean;
        /**
         * Gets or sets the width of the element in pixels
         *
         * @returns {number}
         */
        /**
         * Gets or sets the width of the element in pixels
         *
         * @param {number} value
         */
        width: number;
        /**
         * Gets or sets the tooltip of the elent
         *
         * @returns {string}
         */
        /**
         * Gets or sets the tooltip of the elent
         *
         * @param {string} value
         */
        tooltip: string;
    }
}
/**
 * Created by josemanuel on 4/20/15.
 */
declare module latte {
    /**
     *
     */
    class Animation {
        /**
         * Stack of active animations
         * @type {Array}
         */
        static stack: Animation[];
        /**
         * Gets the requestAnimationRequest function, cross-browser
         */
        static requestAnimationFrame: any;
        static loopActive: boolean;
        /**
         * Starts the animation loop.
         */
        static loop(): void;
        /**
         * Creates the animation
         * @param startValue
         * @param endValue
         * @param duration Duration of animation in seconds
         */
        constructor(startValue: number, endValue: number, duration: number, updateHandler?: (value?: number) => any, endHandler?: () => any);
        /**
         * Gets the value of the animation for the specified second of the animation
         * @param f
         * @returns {number}
         */
        getValueForSecond(s: number): number;
        /**
         * Starts the animation
         */
        start(): void;
        /**
         * Back field for event
         */
        private _ended;
        /**
         * Gets an event raised when the animation ends
         *
         * @returns {LatteEvent}
         */
        ended: LatteEvent;
        /**
         * Raises the <c>ended</c> event
         */
        onEnded(): void;
        /**
         * Back field for event
         */
        private _update;
        /**
         * Gets an event raised when an update to the animation is performed
         *
         * @returns {LatteEvent}
         */
        update: LatteEvent;
        /**
         * Raises the <c>update</c> event
         */
        onUpdate(value: number): void;
        /**
         * Gets the current value of distance to the current frame
         *
         * @returns {number}
         */
        currentValue: number;
        /**
         * Gets the distance of the animation
         *
         * @returns {number}
         */
        distance: number;
        /**
         * Property field
         */
        private _duration;
        /**
         * Gets the duration of the animation, in seconds
         *
         * @returns {number}
         */
        duration: number;
        /**
         * Property field
         */
        private _endValue;
        /**
         * Gets the final value of the animation
         *
         * @returns {number}
         */
        endValue: number;
        /**
         * Gets the end time of the animation
         *
         * @returns {number}
         */
        endTime: DateTime;
        /**
         * Property field
         */
        private _running;
        /**
         * Gets a value indicating if the animation is currently running
         *
         * @returns {boolean}
         */
        running: boolean;
        /**
         * Property field
         */
        private _startValue;
        /**
         * Gets the initial value for the animation
         *
         * @returns {number}
         */
        startValue: number;
        /**
         * Property field
         */
        private _startTime;
        /**
         * Gets or sets the initial time of the animation
         *
         * @returns {DateTime}
         */
        /**
         * Gets or sets the initial time of the animation
         *
         * @returns {DateTime}
         */
        startTime: DateTime;
        /**
         * Gets the speed of the animation value, in distance per second
         *
         * @returns {number}
         */
        speed: number;
        /**
         * Property field
         */
        private _tag;
        /**
         * Gets or sets the tag of the animation
         *
         * @returns {any}
         */
        /**
         * Gets or sets the tag of the animation
         *
         * @param {any} value
         */
        tag: any;
    }
}
/**
 * Created by josemanuel on 5/29/15.
 */
declare module latte {
    /**
     *
     */
    class CollectionDataBind {
        /**
         * Creates and automatically sets up the binding
         */
        constructor(element: Element<HTMLElement>, elementProperty: string, collection: Collection<any>, type?: DataBindType);
    }
}
/**
 * Created by josemanuel on 4/15/15.
 */
declare module latte {
    /**
     *
     */
    class Textbox extends Element<HTMLInputElement> {
        /**
         * Checks if email is valid
         * @param email
         * @returns {boolean}
         */
        static validEmail(email: string): boolean;
        private lastValueOnKeyUp;
        /**
         * Creates the textbox
         */
        constructor(element: HTMLElement);
        /**
         * Returns a value indicating if the value of the textbox contains only the caracters specified
         * in the validChars string.
         * @param validChars
         */
        static charCheck(text: string, validChars: string): boolean;
        /**
         * Focuses on the Input
         */
        focus(): void;
        /**
         * Returns the value of the textbox
         * @returns {string}
         */
        toString(): string;
        /**
         * Gets the element as an input element (Type Cast)
         *
         * @returns {HTMLInputElement}
         */
        input: HTMLInputElement;
        /**
         * Gets a value indicating if the value of the textbox has only letters and numbers
         * @returns {boolean}
         */
        isAlphanumeric: boolean;
        /**
         * Gets a value indicating if the value of the textbox is an email
         *
         * @returns {boolean}
         */
        isEmail: boolean;
        /**
         * Gets a value indicating if the value of the textbox is an integer number
         * @returns {boolean}
         */
        isInt: boolean;
        /**
         * Gets a value indicating if the value of the textbox is a floating point number
         * @returns {boolean}
         */
        isFloat: boolean;
        /**
         * Gets or sets the minimum length of the text in textbox
         *
         * @returns {number}
         */
        /**
         * Gets or sets the minimum length of the text in textbox
         *
         * @param {number} value
         */
        minLength: number;
        /**
         * Property field
         */
        private _pristine;
        /**
         * Gets or sets a value indicating if the textbox is pristine, i.e., it hasn't been touched
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the textbox is pristine, i.e., it hasn't been touched
         *
         * @param {boolean} value
         */
        pristine: boolean;
        /**
         * Back field for event
         */
        private _pristineChanged;
        /**
         * Gets an event raised when the value of the pristine property changes
         *
         * @returns {LatteEvent}
         */
        pristineChanged: LatteEvent;
        /**
         * Raises the <c>pristine</c> event
         */
        onPristineChanged(): void;
        /**
         * Gets a value indicating if the textbox is valid
         *
         * @returns {boolean}
         */
        valid: boolean;
        /**
         * Gets or sets the value of the textbox
         *
         * @returns {string}
         */
        /**
         * Gets or sets the value of the textbox
         *
         * @param {string} value
         */
        value: string;
    }
}
/**
 * Created by josemanuel on 5/28/15.
 */
declare module latte {
    /**
     *
     */
    class ElementCollection extends Collection<Element<HTMLElement>> {
        /**
         * Creates the collection from the specified NodeList
         * @param list
         * @returns {latte.ElementCollection}
         */
        static fromNodeList(list: NodeList): ElementCollection;
        /**
         * Creates an array of elements of the specified base class, binds them to the specified array of records
         * and returns them as a ElementCollection
         *
         * @param array
         * @param baseClass
         * @returns {latte.ElementCollection}
         */
        static fromBindArray(array: any[], baseClass: Function): ElementCollection;
        /**
         *
         */
        constructor();
        /**
         * Adds an event listener to the elements in the collection
         * @param event
         * @param handler
         * @param capture
         */
        addEventListener(event: string, handler: (item: Element<HTMLElement>, e?: any) => any, capture?: boolean): void;
        /**
         * Adds the specified class to the class list of the elements in the collection
         * @param className
         */
        addClass(className: string): void;
        /**
         * Clears all the children of the elements in the collection
         */
        clear(): void;
        /**
         * Fades in the elements in the collection
         * @param duration
         * @param callback
         */
        fadeIn(duration?: number, callback?: () => any): void;
        /**
         * Fades out the elements in the collection
         * @param duration
         * @param callback
         */
        fadeOut(duration?: number, callback?: () => any): void;
        /**
         * Adds an event handler to the elements in the collection
         * @param context
         * @param event
         * @param f
         */
        handle(context: any, event: string, f: Function): void;
        /**
         * Removes the specified class to the class list of elements in the collection
         *
         * @param className
         */
        removeClass(className: string): void;
        /**
         * Sets the attribute of the elements
         * @param property
         * @param value
         */
        setAttribute(att: string, value: any): void;
        /**
         * Sets the property of the elements
         * @param property
         * @param value
         */
        setProperty(property: string, value: any): void;
        /**
         * Sets the visibility of the elements in the collection
         * @param visible
         */
        setVisible(visible: boolean): void;
    }
}
/**
 * Created by josemanuel on 5/28/15.
 */
declare module latte {
    /**
     *
     */
    class EventBind {
        /**
         *
         */
        constructor(element: Element<HTMLElement>, elementEvent: string, record: any, recordMethod: string);
        /**
         * Sets up the bind
         * @param element
         * @param elementEvethis.bindedElements.push(e);nt
         * @param record
         * @param recordMethod
         */
        setup(element: Element<HTMLElement>, elementEvent: string, record: any, recordMethod: string): void;
        /**
         * Property field
         */
        private _element;
        /**
         * Gets the element to bind
         *
         * @returns {Element<HTMLElement>}
         */
        element: Element<HTMLElement>;
        /**
         * Property field
         */
        private _elementEvent;
        /**
         * Gets the element event
         *
         * @returns {string}
         */
        elementEvent: string;
        /**
         * Property field
         */
        private _record;
        /**
         * Gets the record to bind
         *
         * @returns {any}
         */
        record: any;
        /**
         * Property field
         */
        private _recordMethod;
        /**
         * Gets the method to execute on the record
         *
         * @returns {string}
         */
        recordMethod: string;
    }
}
/**
 * Created by josemanuel on 5/28/15.
 */
declare module latte {
    /**
     * Represents a very simple data adapter that passes the data along as strings.
     */
    class DefaultDataAdapter implements DataAdapter<string, string> {
        /**
         * Creates the adapter
         */
        constructor();
        /**
         * Transforms the value of the record into a proper value for the element
         *
         * @param value
         */
        adaptForElement(value: string): string;
        /**
         * Transforms the value of the element into a proper value for the record
         * @param value
         */
        adaptForRecord(value: string): string;
    }
}
/**
 * Created by josemanuel on 5/28/15.
 */
declare module latte {
    /**
     * Types of binding
     */
    enum DataBindType {
        /**
         * Will listen for changes on both the element and the record.
         */
        AUTO = 1,
        /**
         * Will listen for changes only on the record property in order to call apply()
         * @type {number}
         */
        AUTO_APPLY = 2,
        /**
         * Will listen for changes only on the element, in order to call commit()
         * @type {number}
         */
        AUTO_COMMIT = 3,
        /**
         * Will not listen for any changes. User must call apply() and commit() manually.
         * @type {number}
         */
        MANUAL = 4,
    }
    /**
     * Binds the property of an object to the property of an element
     */
    class DataBind {
        private lastElement;
        private lastRecord;
        private lastElementListener;
        private lastElementEvent;
        private lastRecordListener;
        private lastRecordEvent;
        /**
         * Creates and automatically sets up the binding
         */
        constructor(element: Element<HTMLElement>, elementProperty: string, record: any, recordProperty: string, type?: DataBindType, dataAdapter?: DataAdapter<any, any>, elementEvent?: string, recordEvent?: string);
        /**
         * Sets up the listeners, removes previous listeners and applies the binding for the first time.
         */
        setup(element: Element<HTMLElement>, elementProperty: string, record: any, recordProperty: string, type?: DataBindType, elementEvent?: string, recordEvent?: string): void;
        /**
         * Uninstalls the last assigned listeners
         */
        uninstall(): void;
        /**
         * Applies the data of the record to the elements property
         */
        apply(): void;
        /**
         * Raises the <c>applied</c> event
         */
        onApplied(): void;
        /**
         * Obtains the data from the element and sends it to the record
         */
        commit(): void;
        /**
         * Raises the <c>committed</c> event
         */
        onCommitted(): void;
        /**
         * Back field for event
         */
        private _applied;
        /**
         * Gets an event raised when the data of the record is applied to the element
         *
         * @returns {LatteEvent}
         */
        applied: LatteEvent;
        /**
         * Back field for event
         */
        private _committed;
        /**
         * Gets an event raised when the binding is returned from the element to the record
         *
         * @returns {LatteEvent}
         */
        committed: LatteEvent;
        /**
         * Property field
         */
        private _dataAdapter;
        /**
         * Gets or sets the data adapter of the bind
         *
         * @returns {DataAdapter<any, any>}
         */
        /**
         * Gets or sets the data adapter of the bind
         *
         * @param {DataAdapter<any, any>} value
         */
        dataAdapter: DataAdapter<any, any>;
        /**
         * Property field
         */
        private _element;
        /**
         * Gets or sets the binded element
         *
         * @returns {Element}
         */
        element: Element<HTMLElement>;
        /**
         * Property field
         */
        private _elementEvent;
        /**
         * Gets or sets the event that will trigger obtain on change
         *
         * @returns {string}
         */
        elementEvent: string;
        /**
         * Property field
         */
        private _elementProperty;
        /**
         * Gets or sets the property of the element to bind
         *
         * @returns {string}
         */
        elementProperty: string;
        /**
         * Property field
         */
        private _record;
        /**
         * Gets or sets the record to bind
         *
         * @returns {any}
         */
        record: any;
        /**
         * Property field
         */
        private _recordEvent;
        /**
         * Gets or sets the name of the event that detonates a change in the record
         *
         * @returns {string}
         */
        recordEvent: string;
        /**
         * Property field
         */
        private _recordProperty;
        /**
         * Gets or sets the property of the record to bind
         *
         * @returns {string}
         */
        recordProperty: string;
        /**
         * Property field
         */
        private _type;
        /**
         * Gets the type of binding
         *
         * @returns {DataBindType}
         */
        type: DataBindType;
    }
}
