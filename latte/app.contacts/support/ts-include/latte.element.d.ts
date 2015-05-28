/// <reference path="datalatte.d.ts" />
/// <reference path="latte.d.ts" />
/// <reference path="latte.strings.d.ts" />
/**
 * Created by josemanuel on 3/25/15.
 */
declare module latte {
    /**
     *
     */
    class Element<T extends HTMLElement> {
        /**
         * Finds a node using the specified path.
         * Current version uses JQuery for search.
         * @param path
         */
        static find(path: string): HTMLElement;
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
        /**
         * Creates an element
         */
        constructor(element: HTMLElement);
        /**
         * Adds an element
         * @param element
         */
        add(element: Element<HTMLElement>): void;
        /**
         * Adds an array of elements to this element
         * @param elements
         */
        addArray(elements: Element<HTMLElement>[]): void;
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
        addEventListener(event: string, handler: (any: any) => any, capture?: boolean): void;
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
         * Finds the native HTMLElement object
         * @param query
         * @returns {any}
         */
        find(query: string): HTMLElement;
        /**
         * Finds an element and returns it
         * @param query
         * @returns {Element}
         */
        findElement(query: string): Element<HTMLElement>;
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
        setContent(e: Element<HTMLElement>): void;
        /**
         * Sets the children of the element, deleting all existing children
         * @param e
         */
        setChildren(e: Element<HTMLElement>[]): void;
        /**
         * Replaces the element
         * @param e
         */
        setElement(e: T): void;
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
 * Created by josemanuel on 4/15/15.
 */
declare module latte {
    /**
     *
     */
    class Textbox extends Element<HTMLInputElement> {
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
        charCheck(validChars: string): boolean;
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
