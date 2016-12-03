module latte{
    /**
     * Represents an item of a ListView
     **/
    export class ListViewItem extends SelectableItem{

        /**
         *
         **/
        private _icon: IconItem;

        /**
         *
         **/
        private _iconPadding: number = 10;

        /**
         *
         **/
        private _text: string;

        /**
         *
         */
        private _columns: Array<JQuery> = [];

        /**
         * Holds pointers to items
         */
        private _items: Array<Item> = [];

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
        constructor(listView: ListView = null){
            super();

            // Init
            this.element.addClass('list');

            // Init events
            this.activated = new LatteEvent(this);

            // Init elements
            this.iconElement = $('<div>').addClass('icon').appendTo(this.element);
            this.columnsElement = $('<div>').addClass('columns').appendTo(this.element);
            this.element.clear();

            // Add empty icon
            this.icon = IconItem.empty(16);

            // Check if list passed
            if(listView){
                this._listView = listView;
                listView.items.add(this);
            }

        }

        /**
         * Adds a column of the specified width
         **/
        addColumn(width: number = 200): ListViewItem{

            var column = $('<div>').width(width);

            this._columns.push(column);

            this.columnsElement.append(column);
            this.onLayout();
            return this;

        }

        /**
         * Gets the column element at the specified index
         *
         * @deprecated use columns.count instead
         **/
        getColumn(index: number): JQuery{
            warnDeprecated("ListViewItem.getColumn", "ListViewItem.columns");
            return this.columns[index];
        }

        /**
         * Gets the count of columns in item
         *
         * @deprecated use columns.count instead
         **/
        getColumnCount(): number{
            warnDeprecated("ListViewItem.getColumnCount", "ListViewItem.columns.length");
            return this.columns.length;
        }

        /**
         * Returns or sets the item of the specified column. First column's index is zero.
         *
         * @deprecated Use getItem and setItem methods
         **/
        item(index: number, value?: Item): Item{

            warnDeprecated("ListViewItem.item", "ListViewItem.getItem and ListViewItem.setItem");

            if(!_isNumber(index) || index < 0 || index > this.columns.length)
                throw new InvalidArgumentEx('index');

            if(_undef(value)){
                return this._items[index];
            }

            this.setItem(index, value);

            return this;


        }

        /**
         * Raises the <c>activated</c> event
         **/
        onActivated(){

            this.activated.raise(this);

        }

        /**
         * Overriden. Raises the <c>layout</c> event
         **/
        onLayout(){


            if(this.element.parent().length === 0) return;

            super.onLayout();

            var w = 0;

            for(var i = 0; i < this.columns.length; i++){
                w += this.columns[i].outerWidth();
            }

            // Icon padding
            w += this._iconPadding;

            if(this._icon instanceof IconItem)
                w += this._icon.size;

            this.columnsElement.width(w);
            this.iconElement.css('margin-right', this._iconPadding);
            // this.element.css('min-width', w + this._iconPadding * 2);

            if(this.listView)
            this.element.css('min-width', this.listView.columnHeadersWidth);

        }

        /**
         *
         **/
        onSelectedChanged(){


            if(this.selected){
                // Get TreeView
                var lv = this.listView;

                // Inform tree view selection
                if(lv) {
                    lv.informSelectedItem(this);
                // }else{
                //     log("wut? no listview?")
                }
            }

            super.onSelectedChanged();

            if (this.selected) {
                this.onActivated();
            }

        }

        /**
         * Sets the width of the specified column
         **/
        setColumnWidth(index: number, width: number){

            this._columns[index].width(width);

        }

        /**
         * Gets the item at the specified column
         * @param index
         */
        getItem(index: number): Item{
            return this._items[index];
        }

        /**
         * Gets the text of a column (if a LabelItem)
         * @param index
         */
        getText(index: number): string{
            if(this._items[index] instanceof LabelItem){
                return (<LabelItem>this._items[index]).text;
            }else{
                log("ListViewItem.getText should be not invoked on non-LabelItem items. This addresses performance.");
                return this._columns[index].text();
            }
        }

        /**
         * Sets the text of a column
         *
         * @param index
         * @param text
         */
        setText(index: number, text: string){
            this.setItem(index, new LabelItem(text));
        }

        /**
         * Sets the item at the specified column
         * @param index
         * @param item
         */
        setItem(index: number, item: Item){
            if(!_isNumber(index) || index < 0 || index > this.columns.length){
                throw new InvalidArgumentEx('index');
            }

            // Empty column
            this.columns[index].empty();

            // Append Item
            this.columns[index].append(item.element);

            // Save item
            this._items[index] = item;

            // Perform layout
            this.onLayout();

        }

        /**
         * Returns or sets the text of the specified column.
         * When setting, it is equivalent to passing a <c>LabelItem</c> to the <c>item</c> method.
         *
         * @deprecated Use getText and setText instead
         **/
        text(index: number, value: string = ''): string{

            warnDeprecated("ListViewItem.text", "ListViewItem.getText and ListViewItem.setText");

            if(!_isNumber(index) || index < 0 || index > this.columns.length)
                throw new InvalidArgumentEx('index');

            if(_undef(value)){
                var item = this.item(index);

                return item instanceof Item ? item.element.text() : null;
            }

            var lbl: LabelItem = new LabelItem();
            lbl.text = value;

            this.item(index, lbl);

            return value;


        }

        /**
         * Gets the column elements of the item
         *
         * @returns {Array<JQuery>}
         */
        get columns():JQuery[] {
            return this._columns;
        }

        /**
         * Gets or sets the icon of the item.
         **/
        get icon(): IconItem{
            return this._icon;
        }

        /**
         * Gets or sets the icon of the item.
         **/
        set icon(value: IconItem){


            // Empty element
            this.iconElement.empty();

            if(value instanceof IconItem)
                this.iconElement.append(value.element).clear();

            this._icon = value;
            this.onLayout();


        }

        /**
         * Property field
         */
        private _listView: ListView = null;

        /**
         * Gets or sets the listview of the item
         *
         * @returns {ListView}
         */
        get listView(): ListView {
            return this._listView;
        }

        /**
         * Gets or sets the listview of the item
         *
         * @param {ListView} value
         */
        set listView(value: ListView) {
            this._listView = value;
        }
    }
}