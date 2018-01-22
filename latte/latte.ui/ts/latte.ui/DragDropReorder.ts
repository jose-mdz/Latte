module latte {

    /**
     * Allows drag & drop reordering on a specific container
     */
    export class DragDropReorder{

        //region Static
        //endregion

        //region Fields

        //endregion

        /**
         * Initializes the helper
         */
        constructor(container: HTMLElement, items: Collection<Item>, sorted: () => any = null) {

            if(!container) throw "Container can't be null";
            if(!items) throw "Items can't be null";

            this._container = container;
            this._items = items;

            // Handle item adding
            this.items.addItem.add(item => this.onAddItem(item));

            // Handle mouse move
            this.container.addEventListener('mousemove', e => this.mouseMove(e));

            if(sorted) {
                this.sorted.add(sorted);
            }
        }

        //region Private Methods

        /**
         * Handles an item being dragged
         * @param item
         */
        private handleBeingDragged(item){

            if(!item.beingDragged) {
                return;
            }


            if(!this._spacer){

                let itemBounds = Rectangle.fromElement(item.raw);
                this._spacer = document.createElement('div');
                this._spacer.classList.add('drag-drop-spacer');
                this._spacer.style.width = itemBounds.width + 'px';
                this._spacer.style.height = itemBounds.height + 'px';

                // Insert next to dragging element
                item.element.after(this._spacer);

                // Inform spacer creation
                this.onSpacerCreated();
            }

        }

        /**
         * Handles drop of item
         * @param {latte.Item} item
         */
        private handleDrop(item: Item){

            // Move card in DOM
            item.element.insertAfter(this._spacer);

            // Remove spacer
            this._spacer.remove();
            this._spacer = null;

            // Correct the collection
            this.correctCollection();

            // Detonate event
            this.onSorted();

        }

        //endregion

        //region Methods

        /**
         * Searches for the item at the specified coordinate
         * @param {number} x
         * @param {number} y
         * @returns {latte.Item}
         */
        private itemAt(x: number, y: number): Item{
            for(let i = 0; i < this.items.length; i++){
                let item = this.items[i];
                let b = Rectangle.fromElement(item.raw);
                if(b.contains(x, y)) {
                    return item;
                }
            }
            return null;
        }

        /**
         * Corrects the item collection by checking the DOM items
         */
        correctCollection(){

            let children = this.container.childNodes;
            let correct = [];

            for(let i = 0; i < children.length; i++){
                let instance = $(children[i]).data('instance');

                if(instance) {
                    correct.push(instance);
                }
            }

            this.items.correctItems(correct);

        }

        /**
         *
         * @param {MouseEvent} e
         */
        mouseMove(e: MouseEvent){

            // Check for drag
            if(!(UiElement.dragging && UiElement.draggingElement instanceof Item)) {
                return;
            }

            // Bounds to check sides
            // let b = Rectangle.fromElement(this.container);
            let hit: any = this.itemAt(e.clientX, e.clientY);

            if(hit) {

                let b = Rectangle.fromElement(hit.raw);

                let comparer = this.flowDirection == Direction.VERTICAL ?
                    e.clientY > b.center.y : e.clientX > b.center.x;

                // this._spacer.remove();

                // Insert spacer before or after hit item
                if(comparer){
                    hit.element.after(this._spacer);
                }else{
                    this._spacer.remove();
                    this.container.insertBefore(this._spacer, hit.raw);
                    // hit.element.before(this._spacer);
                }
            }
        }

        /**
         * Handle Item Adding.
         **/
        onAddItem(item: Item){

            item.dragSource = item.element;
            item.hideWhileDragging = true;

            item.beingDraggedChanged.add(() => this.handleBeingDragged(item));
            item.dropped.add(() => this.handleDrop(item));
        }

        /**
         * Raises the <c>sorted</c> event
         */
        onSorted(){
            if(this._sorted){
                this._sorted.raise();
            }
        }

        /**
         * Raises the <c>spacerCreated</c> event
         */
        onSpacerCreated(){
            if(this._spacerCreated){
                this._spacerCreated.raise();
            }
        }
        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _sorted: LatteEvent;

        /**
         * Gets an event raised when the items have been sorted
         *
         * @returns {LatteEvent}
         */
        get sorted(): LatteEvent{
            if(!this._sorted){
                this._sorted = new LatteEvent(this);
            }
            return this._sorted;
        }


        /**
         * Back field for event
         */
        private _spacerCreated: LatteEvent;

        /**
         * Gets an event raised when the Spacer element has been created
         *
         * @returns {LatteEvent}
         */
        get spacerCreated(): LatteEvent{
            if(!this._spacerCreated){
                this._spacerCreated = new LatteEvent(this);
            }
            return this._spacerCreated;
        }
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _container: HTMLElement = null;

        /**
         * Gets or sets the container where drag & drop happens
         *
         * @returns {HTMLElement}
         */
        get container(): HTMLElement {
            return this._container;
        }

        /**
         * Property field
         */
        private _flowDirection: Direction = Direction.VERTICAL;

        /**
         * Gets or sets the flow Direction
         *
         * @returns {Direction}
         */
        get flowDirection(): Direction {
            return this._flowDirection;
        }

        /**
         * Gets or sets the flow Direction
         *
         * @param {Direction} value
         */
        set flowDirection(value: Direction) {
            this._flowDirection = value;
        }

        /**
         * Property field
         */
        private _items: Collection<Item>;

        /**
         * Gets the items collection
         *
         * @returns {Collection<Item>}
         */
        get items(): Collection<Item> {
            return this._items;
        }

        /**
         * Spacer marks the place where item would end up
         */
        private _spacer: HTMLDivElement;

        /**
         * Gets the spacer element
         *
         * @returns {HTMLElement}
         */
        get spacer(): HTMLElement {
            return this._spacer;
        }


        //endregion

    }

}