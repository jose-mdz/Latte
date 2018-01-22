module latte {

    export interface CollectionEventHanler<T>{
        (item: T, e: CollectionEvent<T>)
    }

    /**
     *
     */
    export class Collection<T> {

        //region Static
        //endregion

        //region Fields
        private pointer = 0;
        //endregion

        /**
         * Initializes the collection
         */
        constructor(addCallback: (e: T, index: number) => void = null, removeCallback: (e: T, index: number) => void = null, context: any = null ) {

            if(addCallback) {
                this.addItem.add(addCallback, context);
            }

            if(removeCallback) {
                this.removeItem.add(removeCallback, context);
            }

            this.context = context;

        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Adds an element to the collection
         *
         * @param element
         * @param raiseEvent
         */
        add(element: T, raiseEvent: boolean = true): T{

            let e = new CollectionEvent<T>(element, this.length, true);

            // Check for cancellation
            if(e.cancel) {
                return null;
            }

            this[this._length++] = element;

            if(raiseEvent) {
                this.onAddItem(element, this.length);
            }

            return element;
        }

        /**
         * Adds an array of elements
         *
         * @param elements
         * @param raiseEvent
         */
        addArray(elements: T[], raiseEvent: boolean = true): T[]{

            if(_isArray(elements)) {
                elements.forEach(e => this.add(e));
            }

            return elements;
        }

        /**
         * Adds a collection of elements to the collection
         *
         * @param collection
         * @param raiseEvent
         */
        addCollection(collection: Collection<T>, raiseEvent: boolean = true){
            for (var i = 0; i < collection.length; i++) {
                this.add(collection[i]);
            }
        }

        /**
         * Clears the collection
         */
        clear(){

            while(this.length > 0){
                this.removeAt(0);
            }

        }

        /**
         * Returns a value indicating if the specified element is contained in the collection
         * @param element
         */
        contains(element: T): boolean{
            for (let i = 0; i < this.length; i++) {
                if(this[i] == element) return true;
            }
            return false;
        }

        /**
         * Corrects the collection to be the specified on the arguments, without raising events.
         *
         * @param {T[]} elements
         */
        correctItems(elements: T[]){
            for(let i = 0; i < this.length; i++)
                delete this[i];

            for(let i = 0; i < elements.length; i++)
                this[i] = elements[i];

            this._length = elements.length;
        }

        /**
         * Iterates through the collection, executing the handler for each item
         * @param handler
         */
        each(handler: (item: T, index: number) => any){
            for(var i: number = 0; i < this.count; i++){
                handler.call(this.context, this[i], i);
            }
        }

        /**
         * Iterates through the collection, executing the handler for each item
         * @param handler
         */
        eachBut(exclude: T, handler: (item: T, index: number) => any){
            for(var i: number = 0; i < this.count; i++){
                if(this[i] != exclude)
                    handler.call(this.context, this[i], i);
            }
        }

        /**
         * Gets the index of the specified element if found. -1 if not found.
         * @param item
         * @returns {number}
         */
        indexOf(item: T){
            for(let i = 0; i < this.length; i++){
                if(this[i] === item){
                    return i;
                }
            }
            return -1;
        }

        /**
         * Gets the item at the specified position
         * @param index
         * @returns {*}
         */
        item(index: number): T{
            return this[index];
        }

        /**
         * Returns the object on current pointer and moves the pointer forward.
         * It returns null and resets pointer if end of collection reached.
         * @returns {*}
         */
        next(): T{
            if(this.pointer >= this.length){
                this.pointer = 0;
                return null;
            }

            var elem = this[this.pointer];

            this.pointer++;

            return elem;
        }

        /**
         * Raises the <c>addItem</c> event
         */
        onAddItem(item: T, index: number){
            if(this._addItem){
                this._addItem.raise(item, index);
            }
        }

        /**
         * Raises the <c>removeItem</c> event
         */
        onRemoveItem(item: T, index: number){
            if(this._removeItem){
                this._removeItem.raise(item, index);
            }
        }

        /**
         * Raises the <c>removingItem</c> event
         */
        onRemovingItem(e: CollectionEvent<T>){
            if(this._removingItem){
                this._removingItem.raise(e);
            }
        }

        /**
         * Removes the specified item from the collection
         * @param item
         * @param raiseEvent
         */
        remove(item: T, raiseEvent: boolean = true): T{

            let e = new CollectionEvent<T>(item, -1, true);

            // Trigger cancellation item
            this.onRemovingItem(e);

            // Check for cancellation
            if(e.cancel) {
                return null;
            }

            let buffer: T[] = [];
            let index: number = -1;
            let result: T;

            //region Clear this

            for (let i = 0; i < this.length; i++) {
                let t: T = this[i];

                delete this[i];

                if(t === item) {
                    result = item;
                    index = i;

                }else{
                    buffer.push(t);

                }

            }

            //endregion

            //region Apply buffer

            for (let i = 0; i < buffer.length; i++) {
                this[i] = buffer[i];
            }

            this._length = buffer.length;

            //endregion

            if(index >= 0){
                if(raiseEvent){
                    this.onRemoveItem(item, index);
                }
            }

            return result;

        }

        /**
         * Removes the item ath the specified index
         * @param index
         * @param raiseEvent
         */
        removeAt(index: number, raiseEvent: boolean = true){
            this.remove(this[index], raiseEvent);
        }

        /**
         * Resets the internal pointer for calls to <c>next()</c> method.
         */
        resetPointer(){
            this.pointer = 0;
        }

        /**
         * Returns an array representation of the collection
         * @returns {T[]}
         */
        toArray(): T[]{
            let a: T[] = [];
            this.each(i => a.push(i));
            return a;
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _addingItem: LatteEvent;

        /**
         * Gets an event raised when the collection is about to add an item. Its cancellable
         *
         * @returns {LatteEvent}
         */
        get addingItem(): LatteEvent{
            if(!this._addingItem){
                this._addingItem = new LatteEvent(this);
            }
            return this._addingItem;
        }

        /**
         * Raises the <c>addingItem</c> event
         */
        onAddingItem(e: CollectionEvent<T>){
            if(this._addingItem){
                this._addingItem.raise(e);
            }
        }

        /**
         * Back field for event
         */
        private _addItem: LatteEvent;

        /**
         * Gets an event raised when an item is added
         *
         * @returns {LatteEvent}
         */
        get addItem(): LatteEvent{
            if(!this._addItem){
                this._addItem = new LatteEvent(this);
                this._addItem.context = this.context;
            }
            return this._addItem;
        }

        /**
         * Back field for event
         */
        private _removeItem: LatteEvent;

        /**
         * Gets an event raised when an item is removed
         *
         * @returns {LatteEvent}
         */
        get removeItem(): LatteEvent{
            if(!this._removeItem){
                this._removeItem = new LatteEvent(this);
                this._addItem.context = this.context;
            }
            return this._removeItem;
        }


        /**
         * Back field for event
         */
        private _removingItem: LatteEvent;

        /**
         * Gets an event raised when the item is about to be removed
         *
         * @returns {LatteEvent}
         */
        get removingItem(): LatteEvent{
            if(!this._removingItem){
                this._removingItem = new LatteEvent(this);
            }
            return this._removingItem;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _context:any = null;

        /**
         * Gets or sets the context to execute methods of collection
         *
         * @returns {any}
         */
        public get context():any {
            return this._context;
        }

        /**
         * Gets or sets the context to execute methods of collection
         *
         * @param {any} value
         */
        public set context(value:any) {
            this._context = value;
        }

        /**
         * Gets the count of elements in collection
         *
         * @returns {number}
         */
        public get count():number {
            return this.length;
        }

        /**
         * Gets the first element of the collection
         * @returns {*}
         */
        get first(): T{
            return this.length > 0 ? this[0] : null;
        }

        /**
         * Gets the last element of the collection
         * @returns {*}
         */
        get last(): T{
            return (this.length > 0 ? this[this.length - 1] : null);
        }

        /**
         * Property field
         */
        private _length:number = 0;

        /**
         * Gets the length of the collection
         *
         * @returns {number}
         */
        public get length():number {
            return this._length;
        }


        //endregion

    }

}