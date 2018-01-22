module latte{
    /**
     * Represents a view who presents items in columns
     **/
    export class ColumnView extends View{

        /**
         *
         **/
        private _columnWeights: Array<number> = [];

        /**
         *
         **/
        private _columns: number;

        /**
         *
         */
        private _paddingColumns: number = 10;

        /**
         * Collection of items inside the view's columns
         **/
        items: Collection<Item>;


        /**
         * Creates the View with the specified amount of columns.
         **/
        constructor(columns: number = 1){

            super();

            this.element.addClass('column');

            this.items = new Collection<Item>(this.onAddItem, this.onRemoveItem, this);

            if(columns > 0){
                this.columns = columns;
            }



        }

        /**
         * Called when an item is added to the items collection
         **/
         onAddItem(item: Item){

            var column = this.getColumnAt( (this.items.count - 1) % this.columns );

            // Append to current column
            item.appendTo(column);

            // Padding between items
            item.element.css('margin-bottom', this.columnPadding);

            // Layout item
            item.onLayout();

        }

        /**
         * Called when an item is removed to the items collection
         **/
        onRemoveItem(item: Item){

            item.element.detach();

        }

        /**
         * Returns the column at the specified index. First column is zero
         **/
        getColumnAt(index: number): JQuery{

            if(!_isNumber(index) || index < 0 || index >= this.columns)
                throw new InvalidArgumentEx('index', index);

            return this.container.find('.column').eq(index).find('.column-content');

        }

        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(){

            super.onLayout();

            if(this.columnWeights.length > 0){
                //this.columnWeights = this.columnWeights;
            }else{
                if(View.smallScreen){
                    this.container.children().css('width', '');
                }else{
                    let w = Math.floor(100 / this.columns);
                    this.container.children().css('width', w + '%');
                }

            }

            // Update Items
            this.items.each(item => item.onLayout());

        }

        /**
         * Gets or sets the weights of columns for computing their width.
         Weights must be numbers between 0 and 100.
         **/
        get columnWeights(): Array<number>{
            return this._columnWeights;
        }

        /**
         * Gets or sets the weights of columns for computing their width.
         Weights must be numbers between 0 and 100.
         **/
        set columnWeights(value: Array<number>){


            if(value.length != this._columns)
                throw new Ex();

            this._columnWeights = value;

            if(View.smallScreen){
                for(var i = 0; i < this.columns; i++){
                    this.getColumnAt(i).parent().css('width', '');
                }
            }else{
                for(var i = 0; i < this.columns; i++){
                    this.getColumnAt(i).parent().css('width', value[i] + '%');
                }
            }


            this.onLayout();


        }

        /**
         * Gets or sets the number of columns in the view.
         **/
        get columns(): number{
            return this._columns;
        }

        /**
         * Gets or sets the number of columns in the view.
         **/
        set columns(value: number){


            if(!_isNumber(value))
                throw new InvalidArgumentEx('value', value);

            this._columns = value;

            var i = 0;

            // Detach items
            for(i = 0; i < this.items.count; i++)
                this.items.item(i).element.detach();

            // Clear space
            this.container.empty();

            if(value > 0){
                var w = Math.floor(100 / value);

                for(i = 0; i < value; i++){

                    // Create column
                    var c = $('<div>')
                        .addClass('column')
                        .css('width', w + '%')
                        .appendTo(this.container);

                    // Create container
                    $('<div>')
                        .addClass('column-content')
                        .appendTo(c);
                }

                var buffer = [];

                // Buffer items
                for(i = 0; i < this.items.count; i++)
                    buffer.push(this.items.item(i));

                // Clear items
                this.items.clear();

                // Reatach items
                for(i = 0; i < buffer.length; i++)
                    this.items.add(buffer[i]);

            }

            this.columnPadding = this.columnPadding;



        }

        /**
         * Gets or sets the column padding inside of columns
         **/
        get columnPadding(): number{
            return this._paddingColumns;
        }

        /**
         * Gets or sets the column  padding inside of columns
         **/
        set columnPadding(value: number){


            this.container.find('.column-content').css('margin', value);
            this.container.find('.column-content > .latte-item').css('margin-bottom', value);

            this._paddingColumns = value;


        }
    }
}