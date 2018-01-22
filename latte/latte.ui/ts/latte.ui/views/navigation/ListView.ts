module latte{
    /**
     * Renders a list with columns
     **/
    export class ListView extends View{

        /**
         *
         **/
        private _selectedItem: ListViewItem;

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
        constructor(){


            // Init
            super();
            this.element.addClass('list');

            // Init collections
            this.items = new Collection<ListViewItem>(this._onAddItem, this._onRemoveItem, this);
            this.columnHeaders = new Collection<ColumnHeader>(this._onAddColumn, this._onRemoveColumn, this);

            // Init elements
            this.columnHeadersElement = $('<div>').addClass('column-headers').appendTo(this.element);

            // Icon spacer for columns
            this.columnHeadersElement.append($('<div>').addClass('spacer'));


            // Test
            var lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac urna ac est ultrices adipiscing. Nulla eros justo, tristique venenatis ultricies et, congue ut orci. Donec vitae augue eros, nec pretium velit. Cras id nisl a sapien elementum mollis. Aenean augue turpis, sodales accumsan porttitor ut, sagittis quis massa. Etiam consequat, lectus ut tempor dapibus, dui lorem pharetra tellus, a luctus nunc tortor non nibh. Aliquam eros nisl, porta et consequat eleifend, rhoncus vel justo. Aliquam vel diam sit amet arcu suscipit aliquet. Morbi sed metus ut lectus condimentum interdum. Duis eu orci vel mauris luctus interdum. Proin sem lacus, dictum eget vehicula in, tempus ac felis. Mauris vitae purus nibh, et malesuada urna. Sed sit amet nunc leo, et vehicula dui.".split(' ');
            var word = function(){ return lipsum[Math.round(Math.random() * (lipsum.length - 1))]; };
            var words = function(){ var r =''; for(var i = 0; i < Math.random() * 8; i++) r+= word() + ' '; return r;  }

            this.element.get(0).addEventListener('keydown', (e) => {
                if(e.keyCode == Key.ARROW_DOWN || e.keyCode == Key.ARROW_LEFT){
                    this.selectNextItem();

                }else if(e.keyCode == Key.ARROW_UP || e.keyCode == Key.ARROW_RIGHT) {
                    this.selectPreviousItem();
                }
            });
        }

        //region Methods

        selectNextItem(){
            let index = this.selectedItem ? this.items.indexOf(this.selectedItem) : -1;

            if(index < 0) {
                // log(`No selected item`);
                return;
            }else {
                // log(`Selected ${this.items[index].getText(0)}`);
            }

            // log(`Pre-++ ${index}`);
            index++;
            // log(`Post++ ${index}`);

            if(index >= this.items.length) {
                // log(`Longer`);
                return;
            }

            if(index >= 0) {
                // log(`Going ${this.items[index].getText(0)}`);
                this.items[index].selected = true;
            }
            // this.items.each((item, i)=> log(`${i} ${item.getText(0)}`));
        }

        selectPreviousItem(){

            let index = this.selectedItem ? this.items.indexOf(this.selectedItem) : -1;

            index--;


            if(index < 0){
                return;
            }

            if(index < this.items.length ) {
                this.items[index].selected = true;
            }

        }

        /**
         *
         **/
        informSelectedItem(item: ListViewItem){

            // log("Informed!")
            var changed = item !== this._selectedItem;
            this._selectedItem = item;
            // log("Selected item set")

            if(changed) {
                this.onSelectedItemChanged();
            }
        }

        /**
         *
         **/
        private _itemSelected(item: ListViewItem){

            for(var i = 0; i < this.items.count; i++){
                if(this.items.item(i) !== item){
                    this.items.item(i).selected = false;
                }
            }

        }

        /**
         *
         **/
        private _onAddColumn(column: ColumnHeader){

            this.columnHeadersElement.append(column.element);

            // Add column to existing items
            for(var i = 0; i < this.items.count; i++){
                this.items.item(i).addColumn(column.width);
            }

            let index = this.columnHeaders.length - 1;

            // Handle width change
            column.widthChanged.add(() => this.updateWidthOfColumn(index, column));
            column.autoResize.add(() => this.autoSizeColumn(index));
            column.autoResizeAll.add(() => this.autoSizeAllColumns());
            column.sortRequested.add(() => this.sortByColumn(index));

            this.onLayout();

        }

        /**
         *
         **/
        private _onAddItem(item: ListViewItem){

            var __this = this;

            this.container.append(item.element);

            item.selectedChanged.add(function(){ if(this.selected) __this._itemSelected(this); })

            // Add existing columns
            for(var i = 0; i < this.columnHeaders.count; i++){
                item.addColumn(this.columnHeaders.item(i).width);
            }

            item.onLayout();

        }

        /**
         *
         **/
        private _onRemoveColumn(column: ColumnHeader){

            column.element.detach();
            this.onLayout();

        }

        /**
         *
         **/
        private _onRemoveItem(item: ListViewItem){

            item.element.detach();

        }

        /**
         * Auto sizes all columns
         */
        autoSizeAllColumns(){
            for (let i = 0; i < this.columnHeaders.length; i++) {
                this.autoSizeColumn(i);
            }
        }

        /**
         * Auto sizes the specified column
         * @param index
         */
        autoSizeColumn(index: number){

            let max = 50;

            // Collect maximum
            this.items.each((item: ListViewItem) => max = Math.max(max, item.getItem(index).element.width()));

            this.columnHeaders[index].width = max + 20; // 20 because of gradient transparency
        }

        private updateWidthOfColumn(index: number, column: ColumnHeader){
            this.items.each((item: ListViewItem) => item.setColumnWidth(index, column.width));
            this.onLayout();
        }

        /**
         * Overriden. Raises the <c>layout</c> event
         **/
        onLayout(){


            super.onLayout();

            if(this.element.parent().length == 0) return;

            let i = 0;


            if(this.columnHeadersVisible){

                if(this.columnHeaders.count > 0){
                    var maxHeight = 23;
                    var widthSum: number = 36; /*HACK: Extracted from CSS*/

                    for(i = 0; i < this.columnHeaders.count; i++){
                        maxHeight = Math.max(maxHeight, this.columnHeaders.item(i).element.outerHeight());
                        widthSum += this.columnHeaders.item(i).width;
                    }

                    this.columnHeadersElement.height(maxHeight);
                    this.columnHeadersElement.css('min-width', widthSum);
                    this.container.css('top', maxHeight);
                    this.container.css('min-width', widthSum);

                    this._columnHeadersWidth = widthSum;
                }
            }else{
                this.container.css('top', 0);
            }


            for(i = 0; i < this.items.count; i++)
                this.items.item(i).onLayout();


        }

        /**
         * Sorts by the specified column
         * @param index
         */
        sortByColumn(index: number){

            //TODO: Implement this
        }

        //endregion

        //region Events

        //endregion

        //region Properties

        /**
         * Gets or sets a value indicating if the column headers are currently visible
         **/
        get columnHeadersVisible(): boolean{
            return this.columnHeadersElement.is(':visible');
        }

        /**
         * Gets or sets a value indicating if the column headers are currently visible
         **/
        set columnHeadersVisible(value: boolean){


            if(!_isBoolean(value)) throw new InvalidArgumentEx('value');

            if(value) this.columnHeadersElement.show();
            else      this.columnHeadersElement.hide();



        }

        /**
         * Property field
         */
        private _columnHeadersWidth:number;

        /**
         * Gets the width of column headers zone
         *
         * @returns {number}
         */
        get columnHeadersWidth():number {
            return this._columnHeadersWidth;
        }


        /**
         * Gets or sets the selected item of the list
         *
         * @returns {ListViewItem}
         */
        get selectedItem(): ListViewItem{
            return this._selectedItem;
        }

        /**
         * Gets or sets the selected item of the list
         *
         * @param {ListViewItem} value
         */
        set selectedItem(value: ListViewItem){

            // Check if value changed
            var changed: boolean = value !== this._selectedItem;

            // Set value
            this._selectedItem = value;

            // Trigger changed event
            if(changed){
                this.onSelectedItemChanged();
            }
        }

        /**
         * Back field for event
         */
        private _selectedItemChanged: LatteEvent

        /**
         * Gets an event raised when the value of the selectedItem property changes
         *
         * @returns {LatteEvent}
         */
        get selectedItemChanged(): LatteEvent{
            if(!this._selectedItemChanged){
                this._selectedItemChanged = new LatteEvent(this);
            }
            return this._selectedItemChanged;
        }

        /**
         * Raises the <c>selectedItem</c> event
         */
        onSelectedItemChanged(){
            if(this._selectedItemChanged){
                this._selectedItemChanged.raise();
            }
        }
        //endregion
    }
}