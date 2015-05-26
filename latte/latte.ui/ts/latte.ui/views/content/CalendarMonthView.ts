module latte{
    /**
     * Represents a month who show <c>CalendarItem</c>s
     **/
    export class CalendarMonthView extends View{

        /**
         *
         **/
        private _content: JQuery;

        /**
         *
         **/
        private _draggingSelection: DateTime;

        /**
         *
         **/
        private _itemItemHeight: number = 25;

        /**
         *
         **/
        private _itemItemTopStart: number = 20;

        /**
         *
         **/
        private _itemPadding: number = 4;

        /**
         *
         **/
        private _monthOnView: DateTime;

        /**
         *
         **/
        private _selectionEnd: DateTime;

        /**
         *
         **/
        private _selectionStart: DateTime;

        /**
         *
         **/
        private _viewEnd: DateTime;

        /**
         *
         **/
        private _viewStart: DateTime;

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
            constructor(){
            super();
            var __this = this;

            // Init

            this.element.addClass('calendar-month');
            this.focusable  = true;

            // Events
            this.userAddItem = new LatteEvent(this);
            this.userRemoveItem = new LatteEvent(this);
            this.viewRangeChanged = new LatteEvent(this);

            // Init collection
            this.items = new Collection<CalendarItem>(this._onAddItem, this._onRemoveItem, this);

            // Init elements
            this._content = $('<div>').addClass('content').appendTo(this.element);
            this._createBoard();
            //this._contentItems = $('<div>').addClass('content-items').appendTo(this._content);

            // Wire handlers
            this.element.keydown(function(e){ this._keyDown(e) });
            this._content.find('.day')
                .mousedown (function(e){__this._dayMouseDown(e, $(this))})
                .mouseup   (function(e){__this._dayMouseUp(e, $(this))})
                .mousemove (function(e){__this._dayMouseMove(e, $(this))})

            // Init me
            this.setViewRange(DateTime.today);


        }

        /**
         *
         **/
        private _createBoard(){


            for(var row = 0; row < 7; row++){
                for(var col = 0; col < 7; col++){
                    this._content.append(
                        $('<div>').addClass(sprintf('day day-%s-%s%s%s', row, col,
                            (row == 0 ? ' with-top' : ''), (col==0 ? ' with-left' :'')  ))
                    );
                }
            }

        }

        /**
         *
         **/
        private _createMatrix(){

            var i, j, item, start, end, startColumn, endColumn, depth, maxdepth = -1;
            var m = [];
            var empty = undefined;

            // Prints the matrix
            var printm = function(){
                var s = '', i, j;
                for(i = 0; i <= maxdepth; i++){
                    for(j = 0; j < m.length; j++){
                        s+= _undef(m[j][i]) ?  '.' : m[j][i];
                        s+= '\t';
                    }
                    s += '\n';
                }
                log(s);
            };

            // Checks if space available  in the specified depth
            var isAvailable = function(depth, start, end){
                for(var i = start; i <= end; i++)
                    if(m[i][depth] != empty)
                        return false;
                return true;
            };

            // Adds the index to the specified position in the matrix
            var placeIndex = function(index, depth, start, end){
                for(var i = start; i <= end; i++)
                    m[i][depth] = index;
            };

            // Initialize matrix
            this.element.find('.day').each(function(){m.push([])});

            for(i = 0; i < this.items.count; i++){
                item = this.items.item(i);

                // Get start and end columns
                startColumn = item.dateStart.compareTo(this._viewStart) < 0 ? this.element.find('.day:first') : this._dayElement(item.dateStart);
                endColumn = item.dateEnd.compareTo(this._viewEnd) > 0 ? this.element.find('.day:last') : this._dayElement(item.dateEnd);

                // Add index
                start = startColumn.index();
                end = endColumn.index();
                depth = 0;

                // Run for index
                while(!isAvailable(depth, start, end)) depth++;

                // Place index
                placeIndex(i, depth, start, end);

                // Save depth
                item._matrixDepth = depth;

            }

            //printm();
            for(i = 0; i < m.length; i++)
                maxdepth = Math.max(maxdepth, m[i].length);

            return maxdepth;

        }

        /**
         *
         **/
        private _dayElement(date: DateTime): JQuery{

            return this.element.find(sprintf('.day-%s-%s-%s', date.year, date.month, date.day));

        }

        /**
         *
         **/
        private _dayMouseDown(e: JQueryEventObject, dayElement: JQuery){


            var date = dayElement.data('date');

            this._draggingSelection = date;
            this.setSelectionRange(date, date);


        }

        /**
         *
         **/
        private _dayMouseMove(e: JQueryEventObject, dayElement: JQuery){

            if(this._draggingSelection){
                var date = dayElement.data('date');
                this.setSelectionRange(this._draggingSelection, date);
            }

        }

        /**
         *
         **/
        private _dayMouseUp(e: JQueryEventObject, dayElement: JQuery){

            if(this._draggingSelection){
                this._draggingSelection = null;
            }

        }

        /**
         *
         **/
        private _keyDown(e: JQueryEventObject){
            if(e.keyCode === Key.ENTER){
                this.createItemAtSelection();
            }

        }

        /**
         *
         **/
        private _onAddItem(item: CalendarItem){


            var i;
//            var __this = this;

            item.appendTo(this._content);

            // React to selection
            item.selectedChanged.add(() => {
                while((i = this.items.next())){
                    if(i != item){
                        i.selected = (false);
                    }
                }
            });

            this.onLayout();

        }

        /**
         *
         **/
        private _onRemoveItem(item: CalendarItem){

            var r;

            item.element.remove();

            while((r = item.rectangles.next())){
                r._element.remove();
            }


        }

        /**
         *
         **/
        private _rectanglesFor(start: DateTime, end: DateTime): Array<Rectangle>{


            var rects: Array<Rectangle> = [];
            var rect;
            var week = start.addDays(-start.dayOfWeek);
            var weeks = end.weekOfYear - start.weekOfYear + 1;

            for(var i = 0; i < weeks; i++){

                week = week.addDays(i == 0 ? 0 : 7);
                rect = this._weekRectangle(week);

                if(start.onRange(week, week.addDays(6))){
                    var r = rect.right;
                    rect.left =  this._dayElement(start).rectangle(null, true).left ;
                    rect.right = r;
                }

                if(end.onRange(week, week.addDays(6))){
                    rect.right =  this._dayElement(end).rectangle(null, true).right ;
                }

                rects.push(rect);

            }
            return rects;

        }

        /**
         *
         **/
        private _weekRectangle(date: DateTime): Rectangle{


            var start = date.addDays(-date.dayOfWeek);
            var end = start.addDays(6);
            var startRect = this._dayElement(start).rectangle(null, true);
            var endRect = this._dayElement(end).rectangle(null, true);

            return startRect.union(endRect);

        }

        /**
         * Clears the selection
         **/
            clearSelection(){

            this.element.find('.selection').remove();
            this._selectionStart = this._selectionEnd = null;

        }

        /**
         * Creates an item at the selection
         **/
            createItemAtSelection(text: string = ''): CalendarItem{

            if(!this._selectionStart || !this._selectionEnd) return null;

            var item = new CalendarItem();

            item.text = text;
            item.element.addClass('item-' + this.items.count);
            item.dateStart = this._selectionStart;
            item.dateEnd = this._selectionEnd;

            this.clearSelection();

            this.items.add(item);

            this.onUserAddItem(item);

            return item;

        }

        /**
         * Overriden. Raises the <c>layout</c> event.
         **/
            onLayout(){

            super.onLayout();

            // Create items matrix
            var depth = this._createMatrix();

            // Width and height of items
            var w = Math.floor(this._content.width() / 7);
            var h = Math.max(Math.floor(this._content.height() / 7), depth * this._itemItemHeight + this._itemItemTopStart);

            // Position calendar squares
            for(var row = 0; row < 7; row++)
                for(var col = 0; col < 7; col++)
                    this.element.find(sprintf('.day-%s-%s', row, col))
                        .css({ left: w * col, top: h * row })
                        .width(w).height(h);

            // Update selection
            if(this._selectionStart && this._selectionEnd)
                this.setSelectionRange(this._selectionStart, this._selectionEnd);

            // Layout items
            this.onLayoutItems();


        }

        /**
         * Extension for setting the layout of items
         **/
            onLayoutItems(){

            var i = 0;
            var j = 0;
            var padding = this._itemPadding;
            var topstart = this._itemItemTopStart;
            var itemh = this._itemItemHeight;

            // Clear all rectangles
            for(i = 0; i < this.items.count; i++){
                this.items.item(i).rectangles.clear();
                this.items.item(i).matrixAttributes = [];
            }

            // Create items matrix
            this._createMatrix();

            // Scan items
            for(i = 0; i < this.items.count; i++){
                var item = this.items.item(i);
                var rects = this._rectanglesFor(item.dateStart, item.dateEnd);

                // Add items rectangles
                for(j = 0; j < rects.length; j++){

                    var r = rects[j];
                    var att = item.matrixAttributes[j];

                    r.top = r.top + topstart + item._matrixDepth * itemh;
                    r.height = itemh - padding;
                    r.width = r.width - padding;

                    item.rectangles.add(r);
                }
            }

        }

        /**
         * Raises the <c>userAddItem</c> event.
         **/
            onUserAddItem(item: CalendarItem){

            this.userAddItem.raise(item);

        }

        /**
         * Raises the <c>userRemoveItem</c> event.
         **/
            onUserRemoveItem(item: CalendarItem){

            this.userRemoveItem.raise(item);

        }

        /**
         * Raises the <c>viewRangeChanged</c> event.
         **/
            onViewRangeChanged(){

            this.viewRangeChanged.raise();

        }

        /**
         *
         **/
            setSelectionRange(start: DateTime, end: DateTime){


            if(!(start instanceof DateTime)) throw new InvalidArgumentEx('start');
            if(!(end instanceof DateTime)) throw new InvalidArgumentEx('end');

            // Swap check
            if(end.compareTo(start) < 0){ var tmp = start; start = end; end = tmp; }

            if(start.compareTo(this._viewStart) < 0) start = this._viewStart;
            if(end.compareTo(this._viewEnd.addHours(24)) > 0) end = this._viewEnd;

            this.clearSelection();

            // Obtain selection rectangles
            var rects = this._rectanglesFor(start, end);

            // Add selection rectangles
            for(var i = 0; i < rects.length; i++){
                var selection = $('<div>').addClass('selection');

                selection.rectangle(rects[i]);

                this._content.prepend(selection);
            }

            this._selectionStart = start;
            this._selectionEnd = end;

        }

        /**
         * Sets the month to show. Only year and month of date will be taken.
         **/
            setViewRange(date: DateTime){


            var div, olddate, current;
            var daynames = "sunday,monday,tuesday,wednesday,thursday,friday,saturday".split(',');
            var monthFirst = new DateTime(date.year, date.month, 1);
            var start = monthFirst.addDays(-monthFirst.dayOfWeek);
            var today = DateTime.today;

            this.clearSelection();

            for(var row = 0; row < 7; row++){
                for(var col = 0; col < 7; col++){

                    div = this.element.find(sprintf('.day-%s-%s', row, col));
                    olddate = div.data('date');
                    current = start.addDays(row * 7 + col);

                    if(current.month != date.month){
                        div.addClass('grayed');
                    }else{
                        div.removeClass('grayed');
                    }

                    // Remove old date
                    if(olddate){
                        div.removeClass(sprintf('day-%s-%s-%s', olddate.year, olddate.month, olddate.day));
                    }

                    // Set date
                    div.data('date', current);

                    // Mark with correspondant date
                    div.addClass(sprintf('day-%s-%s-%s', current.year, current.month, current.day));

                    // Add day number
                    div.empty().append($('<div>').addClass('number').text((row == 0 ? strings[daynames[current.dayOfWeek]] + ' ' : '') + current.day));

                    // Add week number
                    if(col == 0){
                        div.append($('<div>').addClass('week-number').text(current.weekOfYear));
                    }
                }
            }

            // Remove today
            this.element.find('.day.today').removeClass('today');

            // Add today
            this.element.find(sprintf('.day-%s-%s-%s', today.year, today.month, today.day)).addClass('today');

            this._viewStart = start;
            this._viewEnd = current;
            this._monthOnView = monthFirst;

            this.onViewRangeChanged();

        }

        /**
         * Gets or sets the month on the view
         **/
        get monthOnView(): DateTime{
            return this._monthOnView;
        }

        /**
         * Gets or sets the month on the view
         **/
        set monthOnView(value: DateTime){

            if(value instanceof DateTime)
                this.setViewRange(value);

        }

        /**
         * Gets the end of view
         **/
        get viewEnd(): DateTime{

            return this._viewEnd;

        }

        /**
         * Gets the start of view
         **/
        get viewStart(): DateTime{

            return this._viewStart;

        }
    }
}