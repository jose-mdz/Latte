module latte{
    /**
     * Represents a set of days who contains day items
     **/
    export class CalendarDayView extends View{

        /**
         *
         **/
        private _allDayOffset: number = 30;

        /**
         *
         **/
        private _allowItemCreate: boolean;

        /**
         *
         **/
        private _columns: JQuery;

        /**
         *
         **/
        private _columnsGrid: JQuery;

        /**
         *
         **/
        private _columnsItems: JQuery;

        /**
         *
         **/
        private _content: JQuery;

        /**
         *
         **/
        private _daysGrid: JQuery;

        /**
         *
         */
        private _daysItems: JQuery;

        /**
         *
         **/
        private _draggingHeaderSelection: DateTime;

        /**
         *
         **/
        private _draggingSelection: DateTime;

        /**
         *
         **/
        private _itemPadding: number = 4;

        /**
         *
         **/
        private _minuteSpan: number = 30;

        /**
         *
         **/
        private _scrollStart: TimeSpan;

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
        private _separator: JQuery;

        /**
         *
         **/
        private _timeIndicator: JQuery;

        /**
         *
         **/
        private _timeSpans: JQuery;

        /**
         *
         **/
        private _timeline: JQuery;

        /**
         *
         **/
        private _viewEnd: DateTime;

        /**
         *
         **/
        private _viewStart: DateTime;

        /**
         *
         **/
        private _workDayEnd: TimeSpan;

        /**
         *
         **/
        private _workDayStart: TimeSpan;

        /**
         *
         */
        private _firstScroll: boolean;

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
         * Creates the day view
         **/
        constructor(){


            // Init
            super();
            this.element.addClass('calendar-day');
            this.focusable = true;

            // Events
            this.userAddItem = new LatteEvent(this);
            this.userRemoveItem = new LatteEvent(this);
            this.viewRangeChanged = new LatteEvent(this);

            // Init collection
            this.items = new Collection<CalendarItem>(this._onAddItem, this._onRemoveItem, this);

            // Create elements
            this._content = $('<div>').addClass('content').appendTo(this.element);
            this._timeline = $('<div>').addClass('timeline').appendTo(this._content);
            this._columnsGrid = $('<div>').addClass('columns-grid').appendTo(this._content);
            this._columns = $('<div>').addClass('columns').appendTo(this._columnsGrid);
            this._columnsItems = $('<div>').addClass('columns-items').appendTo(this._columnsGrid);
            this._separator = $('<div>').addClass('separator').appendTo(this._content);
            this._daysGrid = $('<div>').addClass('days-grid').appendTo(this._content);
            this._timeSpans = $('<div>').addClass('time-spans').appendTo(this._daysGrid);
            this._timeIndicator = $('<div>').addClass('time-indicator').appendTo(this._daysGrid);
            this._daysItems = $('<div>').addClass('days-items').appendTo(this._daysGrid);

            this._workDayStart = new TimeSpan(0, 8);
            this._workDayEnd = new TimeSpan(0, 17);
            this._scrollStart = new TimeSpan(0,7);

            // Handlers
            this.element.keydown((e) => { this._keyDown(e) });
            this._columnsGrid.mousedown  ((e) => {this._columnsMouseDown(e)})
                .mousemove  ((e) => {this._columnsMouseMove(e)})
                .mouseup    ((e) => {this._columnsMouseUp(e)})
                .mouseleave ((e) => {this._columnsMouseLeave(e)});
            this._daysGrid.mousedown ((e) => {this._daysGridMouseDown(e)})
                .mouseup   ((e) => {this._daysGridMouseUp(e)})
                .mousemove ((e) => {this._daysGridMouseMove(e)})
                .mouseleave((e) => {this._daysGridMouseUp(e)});

            // Init on this week
            this.setViewRange(DateTime.today.addDays(-DateTime.today.dayOfWeek + 1), DateTime.today.addDays(-DateTime.today.dayOfWeek + 1).addDays(4));

        }

        /**
         *
         **/
        private _columnsMouseDown(e: JQueryEventObject){


            if(!this.allowItemCreate){
                return;
            }

            var x = e.pageX;
            var y = e.pageY;

            if(this._onHeadersZone(x, y)){

                this._columns.children().each(function(){
                    var $this = $(this);
                    var r = $this.data('rectangle');
                    var d = $this.data('date');

                    if(r.contains(x, y)){
                        this._draggingHeaderSelection = d;
                        UiElement.disableTextSelection(this.element);
                        this.setSelectionRange(d, d);
                    }
                });
            }


        }

        /**
         *
         **/
        private _columnsMouseLeave(e: JQueryEventObject){

            //this._columnsMouseUp(e);

        }

        /**
         *
         **/
        private _columnsMouseMove(e: JQueryEventObject){


            if(this._draggingHeaderSelection){

                var __this = this;
                var x = e.pageX;
                var y = e.pageY;

                if(this._onHeadersZone(x, y)){

                    this._columns.children().each(function(){
                        var $this = $(this);
                        var r = $this.data('rectangle');
                        var d = $this.data('date');

                        if(r.contains(x, y)){
                            __this.setSelectionRange(__this._draggingHeaderSelection, d);
                        }
                    });
                }
            }

        }

        /**
         *
         **/
        private _columnsMouseUp(e: JQueryEventObject){


            if(this._draggingHeaderSelection){
                UiElement.enableTextSelection(this.element);
                this._draggingHeaderSelection = null;
            }

        }

        /**
         * Creates a matrix filling each item as a position to measure item width and horizontal location

         Assigns three properties to each item to know its horizontal position
         **/
        private _createMatrix(){


            var i, j, k, item, itemDays, startspan, endspan,
                start, end, date, dayIndex, col;
            var m = []; // Matrix
            var empty = undefined;
            var columns = this._columns.children();
            var spans = this.element.find('.time-span');
            var lastSpan = spans.length - 1;

            // Prints the matrix
            var printm = function(){
                var s = "";
                var i, j, k;
                for(i = 0; i < m.length; i++){
                    for(j = 0; j < m[i].length; j++){
                        if(m[i][j].length > 0)
                            for(k = 0; k < m[i][j].length; k++)
                                s += _undef(m[i][j][k]) ? '.' : m[i][j][k];
                        s += '\t\t';
                    }
                    s += '\n';
                }
                log(s);
            };

            // Checks if the specified place is available
            var isAvailable = function(day, depth, startspan, endspan){
                for(var i = startspan; i <= endspan; i++)
                    if(m[i][day][depth] != empty) return false;

                return true;
            }

            // Places the specified index at the specified position
            var placeIndex = function(day, depth, startspan, endspan, index){
                for(var i = startspan; i <= endspan; i++)
                    m[i][day][depth] = index;
            }

            // Gets the depth of day
            var dayDepth = function(day){
                return m.length > 0 ? m[0][day].length : 0;
            };

            // Initialize empty matrix
            for(i = 0; i < spans.length; i++)
                for(j = (m[i] = []).length; j < columns.length; j++)
                    m[i].push([]);

            // Iterate items
            for(i = 0; i < this.items.count; i++){
                item = this.items.item(i); if(item.allDay) continue;
                start = item.dateStart;
                end = item.dateEnd;
                itemDays = Math.ceil(end.date.subtractDate(start.date).totalDays) + 1;

                // for each day item touches
                for(j = 0; j < itemDays; j++){
                    date = start.date.addDays(j);
                    dayIndex = this._dayColumn(date).index();
                    startspan = start.date.equals(date) ? this._timeSpanIndexOf(start.timeOfDay) : 0;
                    endspan = end.date.equals(date) ? this._timeSpanIndexOf(end.timeOfDay) -1 : lastSpan;

                    // Add item through spans
                    if(dayIndex >= 0){

                        // Check if space available
                        var depth = 0;

                        // Find depth
                        while(!isAvailable(dayIndex, depth, startspan, endspan)) depth++;

                        // Place index where it fits
                        placeIndex(dayIndex, depth, startspan, endspan, i);

                        if(_undef(item.matrixAttributes)) item.matrixAttributes = [];

                        var obj = {
                            day: dayIndex,
                            depth: depth,
                            start: startspan,
                            end: endspan,
                            wide: 1
                        };

                        item.matrixAttributes.push(obj);
                    }

                }
            }

            // Expand to the right items with space
            for(j = 0; j < m[0].length; j++){

                // Get max amount of depth
                col = 0; for(i = 0; i < m.length; i++) col = Math.max(col, m[i][j].length);

                // Make all equally deep
                for(i = 0; i < m.length; i++)
                    for(k = m[i][j].length; k < col; k++)
                        m[i][j].push(empty);

            }

            // Expand where possible
            for(i = 0; i < this.items.count; i++){
                item = this.items.item(i); if(item.allDay) continue;

                for(j = 0; j < item.matrixAttributes.length; j++){
                    var r = item.matrixAttributes[j];

                    for(k = r.depth + 1; k < dayDepth(r.day); k++){
                        if(isAvailable(r.day, k, r.start, r.end)){
                            placeIndex(r.day, k, r.start, r.end, i);
                            r.wide++;
                        }else{
                            break;
                        }
                    }

                    r.index = r.depth;
                    r.count = dayDepth(r.day);
                }
            }

            //printm();


        }

        /**
         * Craetes a matrix for filling the all-day items
         **/
        private _createTopMatrix(): number{


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
            this._columns.children().each(function(){m.push([])});

            for(i = 0; i < this.items.count; i++){
                item = this.items.item(i); if(!item.allDay) continue;

                // Get start and end columns
                startColumn = item.dateStart.compareTo(this._viewStart) < 0 ? this._columns.children().first() : this._dayColumn(item.dateStart);
                endColumn = item.dateEnd.compareTo(this._viewEnd) > 0 ? this._columns.children().last() : this._dayColumn(item.dateEnd);

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
        private _dayColumn(date: DateTime): JQuery{

            return this._columns.find(sprintf('.day-%s-%s-%s', date.year, date.month, date.day));

        }

        /**
         *
         **/
        private _daysGridMouseDown(e: any){


            var hit = this._timeSpanHitTest(e.pageX, e.pageY);
            var col = hit.day;
            var span = hit.timespan;

            if(col && span){
                var date = col.data('date');
                var time = span.data('time');
                var start = date.date.add(time);
                var end = start.add(new TimeSpan(0,0,this._minuteSpan));

                this._draggingSelection = start;
                this.setSelectionRange(start, end);
            }


        }

        /**
         *
         **/
        private _daysGridMouseMove(e: any){


            if(this._draggingSelection instanceof DateTime){

                var hit = this._timeSpanHitTest(e.pageX, e.pageY);
                var col = hit.day;
                var span = hit.timespan;

                if(col && span){
                    var date = col.data('date');
                    var time = span.data('time');
                    var start = this._draggingSelection;
                    var end = date.date.add(time);

                    // Swap check
                    if(end.compareTo(start) < 0){
                        start = start.addMinutes(this._minuteSpan);
                        var tmp = end;
                        end = start;
                        start = tmp;
                    }else{
                        end = end.addMinutes(this._minuteSpan);
                    }

                    var changed = this._selectionStart.compareTo(start) != 0
                        || this._selectionEnd.compareTo(end) != 0;

                    if(changed){
                        this.setSelectionRange(start, end);
                    }
                }

            }


        }

        /**
         *
         **/
        private _daysGridMouseUp(e: any){


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

            if(item.allDay){
                item.element.appendTo(this._columnsItems);
                this.onLayout();
            }else{
                item.element.appendTo(this._daysItems);
                this.onLayoutItems();
            }


        }

        /**
         * Specifies if the page coordinates are on the headers zone
         **/
        private _onHeadersZone(x: number, y: number): boolean{

            var sep = this._separator.rectangle();
            var allday = this._columns.rectangle();
                allday.bottom = sep.top;
            return allday.contains(x, y);

        }

        /**
         *
         **/
        private _onRemoveItem(item: CalendarItem){

            item.rectangles.each(function(r){
                if(r.tag instanceof jQuery)
                    (<JQuery>r.tag).remove();
            });
            item.element.remove();

        }

        /**
         * Returns a collection of rectangles for the specified range
         **/
        private _rectanglesFor(start: DateTime, end: DateTime): Array<Rectangle>{


            var rects = [], rect : Rectangle = null;
            var days = Math.ceil(end.date.subtractDate(start.date).totalDays) + 1;

            // If is on headers Select header
            if(start.timeOfDay.totalMinutes == 0 && end.timeOfDay.totalMinutes == 0){

                rect = new Rectangle(); rects.push(rect);

                // If start is on view
                if(start.onRange(start, end)){
                    rect.left = ( this._dayColumn(start).position().left );
                }

                // Horizontal limits
                if(end.onRange(start, end)){
                    rect.right = ( this._dayColumn(end).rectangle(null, true).right );
                }else{
                    rect.right = (this._dayColumn(this._viewEnd).right());
                }

                // Bottom is separator's
                rect.bottom = (this._separator.position().top);

            }else{
                var lastspan = this._timeSpans.find('.time-span').last();
                var fullbottom = lastspan.position().top + lastspan.height() + this._daysGrid.scrollTop();
                var starttop = this._heightOf(start.timeOfDay);
                var endbottom = this._heightOf(end.timeOfDay);

                // One rectangle by day
                for(var i = 0; i < days; i++){

                    rect = new Rectangle();
                    var date = start.date.addDays(i);
                    var dayelem = this._columns.find(sprintf('.day-%s-%s-%s', date.year, date.month, date.day));

                    if(dayelem.length == 0) continue;

                    // Initialize rectangle
                    rect.left = dayelem.position().left + this._timeline.outerWidth();
                    rect.width = dayelem.width();
                    rect.height = fullbottom;

                    // If start is on day
                    if(start.date.compareTo(date) == 0){
                        rect.top = starttop;
                        rect.bottom = fullbottom;
                    }

                    // If end is on day
                    if(end.date.compareTo(date) == 0){
                        rect.bottom = (endbottom);
                    }

                    rects.push(rect);
                }
            }

            return rects;

        }

        /**
         *
         **/
        private _timeSpanHitTest(x: number, y: number): any{

            var col = null;
            var row = null;


            // Look for column collision
            this._columns.children().each(function(){
                var $this = $(this);
                var rect = $this.data('rectangle');

                if(rect instanceof Rectangle){
                    if(x >= rect.left && x <= rect.right){
                        col = $this;
                    }
                }
            });

            // Look for row collision
            this._timeSpans.find('.time-span').each(function(){
                var $this = $(this);
                var rect = $this.innerRectangle(); //$this.data('rectangle');

                if(rect instanceof Rectangle){
                    if(y >= rect.top && y <= rect.bottom){
                        row = $this;
                    }
                }
            });

            return {timespan: row, day: col};

        }

        /**
         *
         **/
        private _updateBoard(){


            var i = 0;
            var today = DateTime.today;
            var dayNames = "sunday,monday,tuesday,wednesday,thursday,friday,saturday".split(',');
            var dayCount = this._viewEnd.subtractDate(this._viewStart).totalDays + 1;
            var evenSpan = false;
            var firstSpan = true;

            this._columns.empty();
            this._timeSpans.empty();

            // Create columns
            for(i = 0; i < dayCount; i++){
                var date = this._viewStart.addDays(i);
                var name = strings[dayNames[date.dayOfWeek]];

                // Create column
                var c = $('<div>').addClass('column').appendTo(this._columns)
                    .addClass('day-' + date.year + '-' + date.month + '-' + date.day)
                    .data('date', date);

                // Create date
                var d = $('<div>').addClass('date').appendTo(c)
                    .text(date.day + ' ' + name);

                // Check if today
                if(date.compareTo(today)  == 0){
                    d.text(date.day + ' ' + name + ' - ' + strings.today);
                    c.addClass('today');

                    if(dayCount == 1) c.addClass('only-day');
                }
            }

            // Create rows
            for(var time = new TimeSpan();
                time.totalMinutes < 24 * 60;
                time = time.add(new TimeSpan(0,0,this._minuteSpan))){

                // Create span
                var span = $('<div>').addClass('time-span').appendTo(this._timeSpans)
                    .addClass('time-' + time.hours + '-' + time.minutes)
                    .data('time', time);

                // Mark as hour
                if(time.minutes == 0)
                    span.addClass('hour');

                // Mark as first
                if(firstSpan) span.addClass('first');

                // Add label
                if((!evenSpan || this._minuteSpan == 60) && !firstSpan){

                    var hour = time.hours;
                    var pm = hour > 12;
                    var ampm = pm ? 'PM' : 'AM';
                    var minutes = time.minutes == 0 ? ' ' + ampm : ':' + time.minutes;
                    var t = (pm ? hour - 12 : hour) + minutes;

                    span.append($('<div>').addClass('label').text(t));
                }

                // Mark as non-working
                if(!(time.compareTo(this._workDayStart) >= 0 && time.compareTo(this._workDayEnd) < 0)){
                    span.addClass('non-working');
                }

                evenSpan = !evenSpan;
                firstSpan = false;
            }

        }

        /**
         * Clears the selection
         **/
            clearSelection(){

            // Clear selection
            this.element.find('.selection').remove();
            this._selectionStart = null;
            this._selectionEnd = null;

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
         * Overriden. Raises the <c>layout</c> event
         **/
            onLayout(){

            super.onLayout();

            var dayCount = this._columns.children().length;
            var allDayDepth = this._createTopMatrix();
            var allDayItemHeight = this.element.find('.time-span').first().height();
            var allDayHeight = Math.max(55, this._allDayOffset + allDayDepth * allDayItemHeight + this._itemPadding); // This should be computed based on items in all day fields
            /*
             * Update columns width
             */
            var colwidth = Math.floor(this._columns.width() / dayCount);
            var left = 0;

            this._columns.children().each(function(){
                var c = $(this);

                c.width(colwidth);
                c.css('left', left);
                c.data('rectangle', c.innerRectangle());

                left += colwidth;
            });

            /**
             * Update row rectangles
             */
            this._timeSpans.find('.time-span').each(function(){
                var $this = $(this);
                $this.data('rectangle', $this.innerRectangle());
            });

            // Update separator
            this._separator.css('top', allDayHeight);

            // Upate days grid top
            this._daysGrid.css('top', allDayHeight + this._separator.outerHeight());

            // update selection
            if(this._selectionStart && this._selectionEnd)
                this.setSelectionRange(this._selectionStart, this._selectionEnd);

            // Update time indicator
            this._timeIndicator.animate({'top': this._heightOf(DateTime.now.timeOfDay)});

            // Layout items
            this.onLayoutItems();

            if(!this._firstScroll && this.element.height() > 0){
                this._daysGrid.scrollTop(this._heightOf(this._scrollStart) + 1);
                this._firstScroll = true;
            }


        }

        /**
         * Updates layout of items on calendar
         **/
            onLayoutItems(){


            var i = 0;
            var j = 0;
            var padding = this._itemPadding;
            var colw = 0;
            var alldaystart = this._allDayOffset;
            var alldayh = this.element.find('.time-span').first().height();

            // Clear all rectangles
            for(i = 0; i < this.items.count; i++){
                this.items.item(i).rectangles.clear();
                this.items.item(i).matrixAttributes = [];
            }

            // Create items matrix
            this._createTopMatrix();
            this._createMatrix();

            // Scan items
            for(i = 0; i < this.items.count; i++){
                var item = this.items.item(i);
                var rects: Array<Rectangle> = this._rectanglesFor(item.dateStart, item.dateEnd);

                // Add items rectangles
                for(j = 0; j < rects.length; j++){

                    var r = rects[j];
                    var att = item.matrixAttributes[j];

                    if(item.allDay){
                        r.top = alldaystart + item._matrixDepth * alldayh;
                        r.height = alldayh - padding;
                        r.width = r.width - padding;
                    }else{
                        colw = r.width / att.count;
                        r.left = r.left + colw * att.index;
                        r.width = colw * att.wide - padding;
                        r.height = r.height - padding;
                    }


                    item.rectangles.add(r);
                }
            }

            // Update horizontal bounds of items



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
         * Returns a value indicating if the selection is on header
         **/
            selectionOnHeader(): boolean{

            return this._selectionStart instanceof DateTime &&
                this._selectionEnd instanceof DateTime &&
                this._selectionStart.timeOfDay.totalMinutes == 0 &&
                this._selectionEnd.timeOfDay.totalMinutes == 0;

        }

        /**
         * Sets the current selection range
         **/
            setSelectionRange(start: DateTime, end: DateTime){


            if(!(start instanceof DateTime)) throw new InvalidArgumentEx('start');
            if(!(end instanceof DateTime)) throw new InvalidArgumentEx('end');

            // Swap check
            if(end.compareTo(start) < 0){ var tmp = start; start = end; end = tmp; }

            if(start.compareTo(this._viewStart) < 0) throw new InvalidArgumentEx('start');
            if(end.compareTo(this._viewEnd.addHours(24)) > 0) throw new InvalidArgumentEx('end');

            this.clearSelection();

            // Obtain selection rectangles
            var rects = this._rectanglesFor(start, end);

            // Add selection rectangles
            for(var i = 0; i < rects.length; i++){
                var selection = $('<div>').addClass('selection');

                selection.rectangle(rects[i]);

                if(start.timeOfDay.totalMinutes == 0 && end.timeOfDay.totalMinutes == 0){
                    this._columnsGrid.prepend(selection);
                }else{
                    this._timeSpans.append(selection);
                }
            }

            this._selectionStart = start;
            this._selectionEnd = end;


        }

        /**
         * Sets the view range of the day view
         **/
            setViewRange(start: DateTime, end: DateTime){

            this._viewStart = start;
            this._viewEnd = end;

            this.clearSelection();
            this._updateBoard();
            this.onLayout();

            this._daysGrid.scrollTop(this._heightOf(this._scrollStart) + 1);

            this.onViewRangeChanged();

        }

        /**
         * Gets the height (or Y coordinate) for the specified time
         **/
        private  _heightOf(time: TimeSpan): number{
            var span = this._timeSpanOf(time);
            var diff = null;
            var minutes = 0;
            var extraheight = 0;

            if(span.length == 0) return 0;

            diff = time.subtract(span.data('time'));
            minutes = diff.totalMinutes;

            if(minutes > 0){
                extraheight = Math.round(minutes * span.height() / this._minuteSpan);
            }
            return span.position().top + extraheight + this._daysGrid.scrollTop();
        }



        /**
         * Gets the timespan element index of the specified time
         **/
        private _timeSpanIndexOf(time: TimeSpan): number{
            return Math.floor(time.totalMinutes / this._minuteSpan);
        }


        /**
         * Gets the timespan element of the specified time
         **/
        private _timeSpanOf(time: TimeSpan): JQuery{
            return this._daysGrid.find('.time-span').eq( this._timeSpanIndexOf(time) ) ;
        }


        /**
         * Gets or sets a value indicating if the view allows user to create new items
         **/
        get allowItemCreate(): boolean{
            return this._allowItemCreate;
        }

        /**
         * Gets or sets a value indicating if the view allows user to create new items
         **/
        set allowItemCreate(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value');

            this._allowItemCreate = value;



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