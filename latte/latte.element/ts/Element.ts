/**
 * Created by josemanuel on 3/25/15.
 */
module latte {

    /**
     *
     */
    export class Element<T extends HTMLElement> {

        //region Static

        /**
         * Finds a node using the specified path.
         * Current version uses JQuery for search.
         * @param path
         */
        static find(path: string): HTMLElement{
            return <HTMLElement>document.querySelector(path);
        }

        /**
         * Searches for the specified path, clones it and returns its html element
         * @param path
         */
        static outlet(path: string): HTMLElement{

            var element = Element.find(path);
            return <HTMLElement>element.cloneNode(true);

        }

        /**
         * Gets the height of the specified document
         * @param d
         * @returns {number}
         */
        static getDocumentHeight(d: Document): number{
            var doc = d.documentElement;
            return Math.max(
                d.body.scrollWidth,
                doc.scrollWidth,
                d.body.offsetWidth,
                doc.offsetWidth,
                doc.clientWidth);

        }

        /**
         * Gets the width of the specified document
         * @param d
         * @returns {number}
         */
        static getDocumentWidth(d: Document): number{
            var doc = d.documentElement;
            return Math.max(
                d.body.scrollHeight,
                doc.scrollHeight,
                d.body.offsetHeight,
                doc.offsetHeight,
                doc.clientHeight);

        }

        /**
         * Gets the width of the viewport
         *
         * @returns {number}
         */
        static getViewportWidth(d: Document):number {
            return d.documentElement.clientWidth;
        }

        /**
         * Gets the width of the viewport
         *
         * @returns {number}
         */
        static getViewportHeight(d: Document):number {
            return d.documentElement.clientHeight;
        }

        /**
         * Gets the scrollTop
         * @returns {number}
         */
        static get windowScrollLeft(): number{
            return window.pageXOffset;
        }

        /**
         * Gets the scrollTop
         * @returns {number}
         */
        static get windowScrollTop(): number{
            return window.pageYOffset;
        }

        private getCssNumericValue(property: string): number{

            return parseFloat(this.style[property] || '0');
        }

        /**
         * Gets the suffix for the specified property
         *
         * @param property
         * @param value
         */
        private setCssNumericValue(property: string, value: number){

            if(property == 'opacity') {
                this.style[property] = String(value);
            }else {
                this.style[property] = value + 'px';
            }

        }

        //endregion

        //region Fields
        //endregion

        /**
         * Creates an element
         */
        constructor(element: HTMLElement) {

            if(!(element instanceof HTMLElement))
                throw "Element Required";
            this._element = <T>element;
        }

        //region Private Methods



        //endregion

        //region Methods

        /**
         * Adds an element
         * @param element
         */
        add(element: Element<HTMLElement>){
            this.element.appendChild(element.element);
        }

        /**
         * Adds an array of elements to this element
         * @param elements
         */
        addArray(elements: Element<HTMLElement>[]){
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
        }

        /**
         * Adds the specified class to the class list
         * @param className
         */
        addClass(className: string){
            if(className.indexOf(' ') >= 0) throw "Only one class can be added.";

            this.element.classList.add(className);
        }

        /**
         * Adds an event listener
         * @param event
         * @param handler
         * @param capture
         */
        addEventListener(event: string, handler: (any) => any, capture: boolean = false){
            this.element.addEventListener(event, handler, capture);
        }

        /**
         * Animates the element specified properties, by establishing the initial values for the properties to animate.
         *
         * @param startProperties
         * @param endProperties
         * @param duration Duration of the animation in seconds
         * @param callback
         */
        animateFrom(startProperties: any, endProperties: any, duration: number = 0.1, callback: () => void = null){

            var animations: Animation[] = [];

            var setValue = (p, value: number) => {
                if(_undef(this[p])) {
                    this.setCssNumericValue(p, value);
                }else {
                    this[p] = value;
                }
            };

            for(var p in startProperties){
                var a = new Animation(startProperties[p], endProperties[p], duration, null);
                a.tag = p;
                animations.push(a);
            }

            if(animations.length > 0) {
                var leader = animations[0];

                // Handle update
                leader.update.add(() => {
                    // Update all values
                    for (var i = 0; i < animations.length; i++) {
                        var a = animations[i];
                        setValue(a.tag, leader.running ? a.currentValue : a.endValue);
                    }
                });

                // Handle end of animations
                leader.ended.add(() => {
                    this._isAnimated = false;
                });

                // Handle end
                if (callback) {
                    leader.ended.add(callback);
                }

                this._isAnimated = true;

                leader.start();

                for (var i = 1; i < animations.length; i++) animations[i].startTime = DateTime.now;
            }
        }

        /**
         * Animates the element properties, by letting the code to infer the initial values of the properties
         *
         * @param properties
         * @param duration Duration of the animation in seconds
         */
        animate(properties: any, duration: number = 0.1, callback: () => void = null){
            var starts: any = {};

            var getValue = (p): number => {
                if(_undef(this[p])) {
                    return this.getCssNumericValue(p);
                }else {
                    return this[p];
                }
            };

            for(var p in properties){
                starts[p] = getValue(p);
            }

            this.animateFrom(starts, properties, duration, callback);
        }

        /**
         * Appends the element to the specified container
         * @param parent
         */
        appendTo(parent: HTMLElement){
            parent.appendChild(this.element);
        }

        /**
         * Creates an automatic handler
         *
         * @param container
         * @param elementName
         * @param eventName
         */
        autohandler(container: Element<HTMLElement>, elementName: string, eventName: string){

            var elem = this;

            this.addEventListener(eventName, function(){
                var methodname = (elementName + "_" + eventName).toLowerCase();
                var found = false;

                for(var i in container){
                    if (String(i).toLowerCase() == methodname){
                        found = true;
                        container[i].call(container, arguments);
                    }
                }

                if(!found){
                    log(sprintf("%s method missing from declaration", methodname));
                }
            })
        }

        /**
         * Makes the element blink
         *
         * @param callback
         */
        blink(callback: () => any = null){

            var visible = true;
            var total = 6;
            var current = 0;
            var time = 0.1; //1000;
            //var me = this.$ element;

            //me.stop();

            if(!this.visible) {
                this.visible = true;
            }

            var show = (callback) => {
                this.animate({opacity: 1}, time, () => { visible = true; callback(); })
                //me.animate({
                //    opacity: 1
                //}, time, 'swing', () => { visible = true; callback(); })
            };

            var hide = (callback) => {
                this.animate({opacity: 0}, time, () => { visible = false; callback(); })
                //me.animate({
                //    opacity: 0
                //}, time, 'swing', () => { visible = false; callback(); })
            };

            var go = function(){
                if(++current == total) {
                    show(() => {});
                    if(_isFunction(callback)) {
                        callback();
                    }
                    return;
                }
                if(visible) {
                    hide(go)
                }else {
                    show(go)
                }
            }

            go();

        }

        /**
         * Clears all the children of the element
         */
        clear(){
            while(this.element.firstChild){
                this.element.removeChild(this.element.firstChild);
            }
        }

        /**
         * Fades the element in
         * @param duration
         * @param callback
         */
        fadeIn(duration: number = 0.1, callback: () => any = null){

            this.style.opacity = '0';
            this.style.display = null;

            this.animate({opacity: 1}, duration, () => {
                this.visible = true;

                if(_isFunction(callback)) callback();
            });

            //$(this.element).animate({ opacity: 1}, duration, 'swing', () => {
            //
            //    this.visible = true;
            //
            //    if('function' == typeof callback)
            //        callback();
            //});
        }

        /**
         * Fades the element out
         * @param duration
         * @param callback
         */
        fadeOut(duration: number = 0.1, callback: () => any = null){
            this.style.opacity = '1';
            this.style.display = null;

            this.animate({opacity: 0}, duration, () => {
                this.visible = false;

                if(_isFunction(callback)) callback();
            });

            //$(this.element).animate({ opacity: 0}, duration, 'swing', () => {
            //
            //    this.visible = false;
            //
            //    if('function' == typeof callback)
            //    callback();
            //});
        }

        /**
         * Finds the native HTMLElement object
         * @param query
         * @returns {any}
         */
        find(query: string): HTMLElement{
            return <HTMLElement>this.element.querySelector(query);
            //return this.$element.find(query).get(0);
        }

        /**
         * Finds an element and returns it
         * @param query
         * @returns {Element}
         */
        findElement(query: string): Element<HTMLElement>{
            return new Element(this.find(query));
        }

        /**
         * Gets the size of the element
         */
        getSize(): {width: number; height: number}{
            var s = {
                width: this.element.offsetWidth,
                height: this.element.offsetHeight
            };

            if(!this.visible) {
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
        }

        /**
         * Adds an event handler to the
         * @param event
         * @param f
         */
        handle(context: any, event: string, f: Function){

            this.addEventListener(event, function(){
                f.apply(context, arguments);
            });
        }

        /**
         * Returns a value indicating if the element has the specified class
         *
         * @param className
         */
        hasClass(className: string){
            return this.element.classList.contains(className);
        }

        /**
         * Raises the <c>tag</c> event
         */
        onTagChanged(){
            if(this._tagChanged){
                this._tagChanged.raise();
            }
        }

        /**
         * Raises the <c>visible</c> event
         */
        onVisibleChanged(){
            if(this._visibleChanged){
                this._visibleChanged.raise();
            }

        }

        /**
         * Removes the specified child
         * @param e
         */
        remove(e: Element<HTMLElement>){
            this.element.removeChild(e.element);
        }

        /**
         * Removes the specified class to the class list
         *
         * @param className
         */
        removeClass(className: string){
            if(className.indexOf(' ') >= 0) throw "Only one class can be removed.";

            this.element.classList.remove(className);
        }

        /**
         * Removes this from its parent element
         */
        removeFromParent(){
            // Check if still has parent
            if(this.element.parentElement) {
                this.element.parentElement.removeChild(this.element);
            }

        }

        /**
         * Sets the content of the element, deleting all existing children.
         * @param e
         */
        setContent(e: Element<HTMLElement>){
            this.clear();
            this.add(e);
        }

        /**
         * Sets the children of the element, deleting all existing children
         * @param e
         */
        setChildren(e: Element<HTMLElement>[]){
            this.clear();
            for (var i = 0; i < e.length; i++) {
                this.add(e[i]);
            }
        }

        /**
         * Replaces the element
         * @param e
         */
        setElement(e: T){
            this._element = null;
            this._element = e;
        }

        //endregion

        //region Events
        /**
         * Back field for event
         */
        private _tagChanged: LatteEvent

        /**
         * Gets an event raised when the value of the tag property changes
         *
         * @returns {LatteEvent}
         */
        get tagChanged(): LatteEvent{
            if(!this._tagChanged){
                this._tagChanged = new LatteEvent(this);
            }
            return this._tagChanged;
        }

        /**
         * Back field for event
         */
        private _visibleChanged: LatteEvent

        /**
         * Gets an event raised when the value of the visible property changes
         *
         * @returns {LatteEvent}
         */
        get visibleChanged(): LatteEvent{
            if(!this._visibleChanged){
                this._visibleChanged = new LatteEvent(this);
            }
            return this._visibleChanged;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _isAnimated:boolean = false;

        /**
         * Gets a value indicating if the element is being animated
         *
         * @returns {boolean}
         */
        get isAnimated():boolean {
            return this._isAnimated;
        }


        /**
         * Gets the height of the elements document
         *
         * @returns {number}
         */
        get documentHeight():number {
            return Element.getDocumentHeight(this.element.ownerDocument);
        }

        /**
         * Gets the width of the elements document
         *
         * @returns {number}
         */
        get documentWidth():number {
            return Element.getDocumentWidth(this.element.ownerDocument);
        }


        /**
         * Property field
         */
        private _element:T;

        /**
         * Gets the core html element
         *
         * @returns {HTMLDivElement}
         */
        get element():T {
            return this._element;
        }

        /**
         * Gets or sets the height of the element in pixels
         *
         * @returns {number}
         */
        get height():number {

            if(!this.visible){
                return this.getSize().height;
            }
            return this.element.offsetHeight;
        }

        /**
         * Gets or sets the height of the element in pixels
         *
         * @param {number} value
         */
        set height(value:number) {
            if(value == null){
                this.style.height = '';
            }
            else{
                this.element.style.height = value + 'px';
            }
        }

        /**
         * Gets the left of the element, relative to the viewport
         *
         * @returns {number}
         */
        get left():number {
            return this.element.getBoundingClientRect().left;
        }

        /**
         * Gets the style of the element
         *
         * @returns {CSSStyleDeclaration}
         */
        get style():CSSStyleDeclaration {
            return this.element.style;
        }

        /**
         * Property field
         */
        private _tag: any = null;

        /**
         * Gets or sets the tag for the object
         *
         * @returns {any}
         */
        get tag(): any{
            return this._tag;
        }

        /**
         * Gets or sets the tag for the object
         *
         * @param {any} value
         */
        set tag(value: any){

            // Check if value changed
            var changed: boolean = value !== this._tag;

            // Set value
            this._tag = value;

            // Trigger changed event
            if(changed){
                this.onTagChanged();
            }
        }

        /**
         * Gets or sets the inner text of the element
         *
         * @returns {string}
         */
        get text():string {
            return this.element.innerHTML;
        }

        /**
         * Gets or sets the inner text of the element
         *
         * @param {string} value
         */
        set text(value:string) {
            this.element.innerHTML = value;
        }

        /**
         * Gets the top of the element, relative to the viewport
         *
         * @returns {number}
         */
        get top():number {
            return this.element.getBoundingClientRect().top;
        }

        /**
         * Gets the height of the viewport of the element
         *
         * @returns {number}
         */
        get viewportHeight():number {
            return Element.getViewportHeight(this.element.ownerDocument);
        }

        /**
         * Gets the width of the viewport of the element
         *
         * @returns {number}
         */
        get viewportWidth():number {
            return Element.getViewportWidth(this.element.ownerDocument);
        }

        /**
         * Property field
         */
        private _visible: boolean = true;

        /**
         * Gets or sets a value indicating if the element is displayed
         *
         * @returns {boolean}
         */
        get visible(): boolean{
            return this._visible;
        }

        /**
         * Gets or sets a value indicating if the element is displayed
         *
         * @param {boolean} value
         */
        set visible(value: boolean){

            // Check if value changed
            var changed: boolean = value !== this._visible;

            // Set value
            this._visible = value;

            if(this.visible) {
                this.element.style.display = null;
            }else {
                this.element.style.display = 'none';
            }

            // Trigger changed event
            if(changed){
                this.onVisibleChanged();
            }
        }

        /**
         * Gets or sets the width of the element in pixels
         *
         * @returns {number}
         */
        get width():number {
            if(!this.visible) {
                return this.getSize().width;
            }
            return this.element.offsetWidth;
        }

        /**
         * Gets or sets the width of the element in pixels
         *
         * @param {number} value
         */
        set width(value:number) {
            this.element.style.width = value + 'px';
        }

        //endregion

    }

}