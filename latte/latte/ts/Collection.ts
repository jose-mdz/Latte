module latte {

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
         *
         */
        constructor(addCallback: (T, number) => void = null, removeCallback: (T, number) => any = null, context: any = null ) {

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
        add(element: T, raiseEvent: boolean = true){

            this[this._length++] = element;

            if(raiseEvent) {
                this.onAddItem(element, this.length);
            }

        }

        /**
         * Adds an array of elements
         *
         * @param elements
         * @param raiseEvent
         */
        addArray(elements: Array<T>, raiseEvent: boolean = true){
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
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
         * Iterates through the collection, executing the handler for each item
         * @param handler
         */
        each(handler: (item: T, index: number) => any){
            for(var i: number = 0; i < this.count; i++){
                handler.call(this.context, this[i], i);
            }
        }

        /**
         * Gets the index of the specified element if found. -1 if not found.
         * @param item
         * @returns {number}
         */
        indexOf(item: T){
            for(var i = 0; i < this.length; i++){
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
         * Removes the specified item from the collection
         * @param item
         * @param raiseEvent
         */
        remove(item: T, raiseEvent: boolean = true){

            var buffer: T[] = [];
            var index: number = -1;

            //region Clear this

            for (var i = 0; i < this.length; i++) {
                var t: T = this[i];

                delete this[i];

                if(t === item) {
                    index = i;

                }else{
                    buffer.push(t);

                }

            }

            //endregion

            //region Apply buffer

            for (var i = 0; i < buffer.length; i++) {
                this[i] = buffer[i];
            }

            this._length = buffer.length;

            //endregion

            if(index >= 0){
                if(raiseEvent){
                    this.onRemoveItem(item, index);
                }
            }

            return this;

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

        //endregion

        //region Events

        /**
         * Back field for event
         */
         private _addItem: LatteEvent;

        /**
         * Gets an event raised when an item is added
         *
         * @returns {LatteEvent}
         */
        public get addItem(): LatteEvent{
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
        public get removeItem(): LatteEvent{
            if(!this._removeItem){
                this._removeItem = new LatteEvent(this);
                this._addItem.context = this.context;
            }
            return this._removeItem;
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