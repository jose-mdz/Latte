module latte{
    /**
     * Shows a calendar to pick a date or a date range.
     **/
    export class DateItem extends Item{

        //region Fields
        /**
         *
         **/
        private _columns: number = 1;

        /**
         *
         **/
        private _draggingSelection: DateTime = null;

        /**
         *
         **/
        private _rows: number = 1;

        /**
         *
         **/
        private _selectionEnd: DateTime;

        /**
         *
         **/
        private _selectionMode: DateSelectionMode;

        /**
         *
         **/
        private _selectionStart: DateTime;

        /**
         *
         **/
        nextButton: ButtonItem;

        /**
         *
         **/
        previousButton: ButtonItem;

        /**
         * Points to the TABLE element where months are placed
         **/
        table: JQuery;

        /**
         * Raised when <c>selectionStart</c> or <c>selectionEnd</c> properties value change.
         **/
        selectionChanged: LatteEvent;

        /**
         * Raised when <c>selectionEnd</c> property changes.
         **/
        selectionEndChanged: LatteEvent;

        /**
         * Raised when <c>selectionStart</c> property changes.
         **/
        selectionStartChanged: LatteEvent;

        /**
         * Raised when <c>selectionMode</c> property changes.
         **/
        selectionModeChanged: LatteEvent;

        //endregion

        /**
         * Creates the Item
         **/
        constructor(){
            super();

            // Init

            this.element.addClass('date');

            // Init events
            this.selectionChanged = new LatteEvent(this);
            this.selectionEndChanged = new LatteEvent(this);
            this.selectionStartChanged = new LatteEvent(this);
            this.selectionModeChanged = new LatteEvent(this);

            this.selectionStart = DateTime.today;


        }

        //region Private Methods

        /**
         * Creates a month. January is 1, december is 12.
         **/
        private _createMonth(year: number, month: number){


            if(year < 0) throw new InvalidArgumentEx('year');
            if(month < 1 || month > 12) throw new InvalidArgumentEx('year');

            var __this = this;
            var i = 0, j = 0;
            var dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            var monthNames = "january,february,march,april,may,june,july,august,september,october,november,december".split(',');
            var container = $('<div>').addClass('month');
            var monthName = strings[monthNames[month - 1]] + ' ' + year;
            var table = $('<table>').addClass('month').appendTo(container);
            var tr = null;
            var today = DateTime.today;
            var monthDate = new DateTime(year, month, 1);
            var firstDay = monthDate.addDays(monthDate.dayOfWeek * -1);
            var cur = firstDay.date;

            // Create first row
            tr = $('<tr>').appendTo(table);

            // "Prev" control space
            $('<td>').addClass('previous').appendTo(tr);

            // Month name space
            let monthNameEl = $('<td>', {colspan: 5}).addClass('month-name').text(monthName).appendTo(tr);

            monthNameEl.click(() => {
                let newYear = prompt(strings.jumpToYear, String(year));

                let parsedYear = parseInt(newYear, 10);

                if(!isNaN(parsedYear)) {
                    this.selectionStart = new DateTime(parsedYear, month);
                    this.selectionEnd = this.selectionStart;
                }

            });

            // "Next" control space
            $('<td>').addClass('next').appendTo(tr);


            // Create day names
            tr = $('<tr>').addClass('day-names').appendTo(table);
            for(i = 0; i < 7; i++)
                tr.append(
                    $('<td>')
                        .addClass('day-name')
                        .text(strings[(dayNames[i]) + 'Short'])
                );

            // Create days
            for(i = 0; i < 6; i++){
                tr = $('<tr>').appendTo(table);

                for(j = 0; j < 7; j++){

                    var cell = $('<td>');
                    var sel = new SelectableItem();
                    var grayed = cur.month != monthDate.month;

                    sel.element.append($('<span>').text(cur.day.toString()));
                    sel.element.appendTo(cell);
                    sel.tag = cur;
                    sel.element.mousedown(function(e){__this._dayMouseDown(e, $(this).data('instance'))});
                    sel.element.mousemove(function(e){__this._dayMouseMove(e, $(this).data('instance'))});
                    sel.element.mouseup(function(e){__this._dayMouseUp(e, $(this).data('instance'))});

                    cell.addClass('day date-' + cur.year + '-' + cur.month + '-' + cur.day);
                    cell.appendTo(tr);

                    if(cur.compareTo(today) === 0){
                        cell.addClass('today');
                    }

                    if(grayed){
                        cell.addClass('grayed');

                        if(cur.compareTo(monthDate) < 1){
                            cell.addClass('before');
                        }else{
                            cell.addClass('after');
                        }
                    }

                    cur = cur.addDays(1);
                }
            }

            return container;


        }

        /**
         *
         **/
        private _dayMouseDown(e: JQueryEventObject, day: SelectableItem){

            var daytag: DateTime = day.tag;

            switch(this._selectionMode){
                case DateSelectionMode.WORKWEEK:
                    var monday: DateTime = daytag.addDays(-daytag.dayOfWeek + 1);
                    var friday = monday.addDays(4);
                    this.setSelectionRange(monday, friday, false, false);
                    break;
                case DateSelectionMode.WEEK:
                    var sunday = daytag.addDays(-daytag.dayOfWeek);
                    var saturday = monday.addDays(6);
                    this.setSelectionRange(monday, friday, false, false);
                    break;
                case DateSelectionMode.MONTH:
                    var first = new DateTime(daytag.year, daytag.month, 1);
                    var last = first.addDays(DateTime.daysInMonth(first.year, first.month) - 1);
                    this.setSelectionRange(first, last, false, false);
                    break;
                default:
                    this.setSelectionRange(daytag, daytag, false, false);
                    break;
            }
            this._draggingSelection = daytag;

        }

        /**
         *
         **/
        private _dayMouseMove(e: JQueryEventObject, day: SelectableItem){

            if(this._draggingSelection !== null){
                this.setSelectionRange(this._draggingSelection, day.tag, false, false);
                this.setSelectionRange(this._draggingSelection, day.tag, false, false);
                this.selectionMode = DateSelectionMode.MANUAL;
            }

        }

        /**
         *
         **/
        private _dayMouseUp(e: JQueryEventObject, day: JQuery){

            if(this._draggingSelection !== null){
                this._draggingSelection = null;
                this.setSelectionRange(this.selectionStart, this.selectionEnd, false, true);
            }

        }

        /**
         * Marks the specified day in calendar as selected
         **/
        private _selectDay(date: DateTime){


            this.element.find('td.date-' + date.year + '-' + date.month + '-' + date.day + ' > .latte-item.selectable').addClass('selected');


        }
        //endregion

        //region Methods
        /**
         *
        **/
        getSelectionStart(): DateTime{

            return this._selectionStart;

        }

        /**
         * Returns a value indicating if the specified date is currently visible in the date range.
         **/
        isOnDisplay(date: DateTime): boolean{

            return this.element.find('td.date-' + date.year + '-' + date.month + '-' + date.day + ':not(.grayed)').length > 0;

        }

        /**
         *
         **/
        onSelectionChanged(){
            this.selectionChanged.raise();
        }

        /**
         *
         **/
        onSelectionEndChanged(){
            this.selectionEndChanged.raise();
        }

        /**
         *
         **/
        onSelectionModeChanged(){
            this.selectionModeChanged.raise();
        }

        /**
         *
         **/
        onSelectionStartChanged(){
            this.selectionStartChanged.raise();
        }

        /**
         * SPECIAL GETTER
         Gets or sets the end of selection
         **/
        getSelectionEnd(): DateTime{
            return this._selectionEnd;
        }

        /**
         * SPECIAL SETTER
         Gets or sets the end of selection
         **/
        setSelectionEnd(value: DateTime = null, raiseEvent: boolean = false){


            var changed = this._selectionEnd ? this._selectionEnd.compareTo(value) != 0 : true;

            if(changed && !(raiseEvent === false)){
                this.setSelectionRange(this._selectionStart ? this._selectionStart : value, value);
                this.onSelectionEndChanged();
                this.onSelectionChanged();
            }

            this._selectionEnd = value;


        }

        /**
         * Sets the selection range.
         If <c>start</c> is not on view, view will be taken to the <c>start</c>'s month
         Optionally rebuilds the calendar rows and columns.
         Optionally raises events.
         **/
        setSelectionRange(start: DateTime, end: DateTime, rebuild: boolean = false, raiseEvents: boolean = false){


            if(!(start instanceof DateTime)) throw new InvalidArgumentEx('start');
            if(!(end instanceof DateTime)) throw new InvalidArgumentEx('end');

            // Swap if end is before start
            if(start.compareTo(end) > 0){ var tmp = start; start = end; end = tmp; }

            var cur = start.date;
            var sel = null;

            // If date is not visible
            if(!this.isOnDisplay(start) || rebuild === true){

                this.setViewStart(start);
            }

            // Unselect all
            this.unselectAll();

            // Select everything
            while(cur.compareTo(end) <= 0){
                this._selectDay(cur);
                cur = cur.addDays(1);
            }

            if(_undef(raiseEvents)){

                var changes = false;

                if(this._selectionStart && start.compareTo(this._selectionStart) != 0){
                    changes = true;
                    this._selectionStart = start;
                    this.onSelectionStartChanged();
                }

                if(this._selectionEnd && end.compareTo(this._selectionEnd) != 0){
                    changes = true;
                    this._selectionEnd = end;
                    this.onSelectionEndChanged();
                }

                if(changes){
                    this.onSelectionChanged();
                }

            }else{
                this._selectionStart = start;
                this._selectionEnd = end;

                if(raiseEvents === true){
                    this.onSelectionStartChanged();
                    this.onSelectionEndChanged();
                    this.onSelectionChanged();
                }
            }

        }

        /**
         * Sets the start of selection
         **/
        setSelectionStart(value: DateTime = null, raiseEvent: boolean = true){

            var changed = this._selectionStart ? this._selectionStart.compareTo(value) != 0 : true;

            if(changed && raiseEvent !== false){
                this.setSelectionRange(value, this._selectionEnd ? this._selectionEnd : value);
                this.onSelectionStartChanged();
                this.onSelectionChanged();
            }

            if(this._selectionEnd === null)
                this._selectionEnd = value;

            // Save date
            this._selectionStart = value;

        }

        /**
         * Sets the view start
         **/
        setViewStart(date: DateTime){

            let i = 0, j = 0;
            let curMonth = new DateTime(date.year, date.month, 1);
            let start = this._selectionStart;
            let end = this._selectionEnd;

            // append month
            this.element.empty();

            // Create months table
            let months = $('<table>').addClass('months').appendTo(this.element);

            for(i = 0; i < this.rows; i++){
                var row = $('<tr>').appendTo(months);

                for(j = 0; j < this.columns; j++){
                    var cell = $('<td>').appendTo(row);

                    // Create month
                    var month = this._createMonth(curMonth.year, curMonth.month).appendTo(cell);

                    // Hide the first items
                    if(!(j == 0 && i == 0))
                        month.find('.grayed.before').addClass('hidden');

                    if(!(j == this.columns - 1 && i == this.rows - 1))
                        month.find('.grayed.after').addClass('hidden');


                    // Increment month
                    curMonth = curMonth.addMonths(1);
                }
            }

            // Create Previous & Next buttons
            let prev = new ButtonItem();
                prev.faceVisible = false;
                prev.icon = LinearIcon.chevron_left;
                prev.clickPropagation = false;

            let next = new ButtonItem();
                next.faceVisible = false;
                next.icon = LinearIcon.chevron_right;
                next.clickPropagation = false;

            // Insert on DOM
            months.find('table.month').first().find('td.previous').append(prev.element);
            months.find('tr').first().find('table.month').last().find('td.next').append(next.element);

            // Assign Handlers
            prev.click.add(() => { this.viewPrevious() });
            next.click.add(() => { this.viewNext() });

            // Pointer to table
            this.table = months;

            // Re-select dates in range
            let days = start && end ? end.subtractDate(start).totalDays + 1 : 0;

            // Select days
            for(i = 0; i < days; i++) this._selectDay(start.addDays(i));


        }

        /**
         * Unselects all dates on display
         **/
        unselectAll(){

            this.element.find('.selectable').removeClass('selected');

        }

        /**
         * Moves the view to the next set of months
         **/
        viewNext(){

            this.setViewStart(this.viewStart.addMonths(this.rows * this.columns));

        }

        /**
         * Moves the view to the previous set of months
         **/
        viewPrevious(){

            this.setViewStart(this.viewStart.addMonths(this.rows * this.columns * -1));

        }
        //endregion

        //region Properties

        /**
         * Gets or sets the number of columns of months
         **/
        get columns(): number{
            return this._columns;
        }

        /**
         * Gets or sets the number of columns of months
         **/
        set columns(value: number){


            if(value < 1) throw new InvalidArgumentEx('value');

            this._columns = value;
            this.setSelectionRange(this.selectionStart, this.selectionEnd, true);


        }

        /**
         * Gets the size of a month as an object {width, height}
         **/
        get monthSize(): any{

            var m = this.element.find('table.month').first();

            return {
                width: m.width(),
                height: m.height()
            };

        }

        /**
         * Gets or sets the number of rows of months
         **/
        get rows(): number{
            return this._rows;
        }

        /**
         * Gets or sets the number of rows of months
         **/
        set rows(value: number){


            if(value < 1) throw new InvalidArgumentEx('value');

            this._rows = value;
            this.setSelectionRange(this.selectionStart, this.selectionEnd, true);


        }

        /**
         * Gets or sets the end of selection
         **/
        get selectionEnd(): DateTime{
            return this.getSelectionEnd();
        }

        /**
         * Gets or sets the end of selection
         **/
        set selectionEnd(value: DateTime){
            this.setSelectionEnd(value);
        }

        /**
         * Gets or sets the selection mode
         **/
        get selectionMode(): DateSelectionMode{
            return this._selectionMode;
        }

        /**
         * Gets or sets the selection mode
         **/
        set selectionMode(value: DateSelectionMode){

            var start = this.selectionStart || DateTime.today;
            var first = new DateTime(start.year, start.month, 1);
            var sunday = start.addDays(-start.dayOfWeek);
            var monday = sunday.addDays(1);

            switch(value){
                case DateSelectionMode.DAY:
                    this.setSelectionRange(start, start);
                    break;
                case DateSelectionMode.WEEK:
                    this.setSelectionRange(sunday, sunday.addDays(6));
                    break;
                case DateSelectionMode.WORKWEEK:
                    this.setSelectionRange(monday, monday.addDays(4));
                    break;
                case DateSelectionMode.MONTH:
                    this.setSelectionRange(first, first.addDays(DateTime.daysInMonth(first.year, first.month) - 1));
                    break;
            }

            this._selectionMode = value;

            this.onSelectionModeChanged();



        }

        /**
         * Gets or sets the start of selection
         **/
        get selectionStart(): DateTime{
            return this.getSelectionStart();
        }

        /**
         * Gets or sets the start of selection
         **/
        set selectionStart(value: DateTime){
            this.setSelectionStart(value);
        }

        /**
         * Gets the first day on view
         **/
        get viewEnd(): DateTime{

            return this.element.find('td.day').last().children().first().data('instance').tag;

        }

        /**
         * Gets the first day on view
         **/
        get viewStart(): DateTime{

            return this.element.find('td.day:not(.grayed)').first().children().first().data('instance').tag;

        }
        //endregion
    }
}