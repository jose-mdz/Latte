module latte{
    /**
     * Shows items in calendar arrangement views
     **/
    export class CalendarView extends SplitView{

        /**
         *
         **/
         _controls: JQuery;

        /**
         * Group of buttons for scrolling through calendar
         **/
        buttonGroup: ButtonGroupItem;

        /**
         * Button for scrolling to next date range
         **/
        buttonNext: ButtonItem;

        /**
         * Button for scrolling to previous date range
         **/
        buttonPrevious: ButtonItem;

        /**
         * Button for scrolling to today date range
         **/
        buttonToday: ButtonItem;

        /**
         * Selector of dates for calendar
         **/
        dateView: DateView;

        /**
         * View for showing full days
         **/
        dayView: CalendarDayView;

        /**
         * View for showing full days
         **/
        monthView: CalendarMonthView;

        /**
         * Title showing current date range
         **/
        titleItem: LabelItem;

        /**
         * Raised when <c>selectionStart</c> or <c>selectionEnd</c> properties value change.
         **/
        selectionChanged: LatteEvent;

        /**
         * Raised when an item is added
         **/
        userAddItem: LatteEvent;

        /**
         * Raised when an item is removed
         **/
        userRemoveItem: LatteEvent;

        /**
         * Raised when the view start/end changes
         **/
        viewRangeChanged: LatteEvent;


        /**
         * Creates the view
         **/
        constructor(){

            // Init
            super();

            this.element.addClass('calendar');

            // Events
            this.userAddItem = new LatteEvent(this);
            this.userRemoveItem = new LatteEvent(this);
            this.viewRangeChanged = new LatteEvent(this);

            // Init events
            this.selectionChanged = new LatteEvent(this);

            // Init elements
            this._controls = $('<div>').addClass('controls').appendTo(this.element);

            // Init items
            this.dateView = new DateView();

            this.dayView = new CalendarDayView();

            this.monthView = new CalendarMonthView();

            this.titleItem = new LabelItem();

            this.titleItem.title = 1;

            this.buttonPrevious = new ButtonItem();

            this.buttonPrevious.icon = Glyph.left;

            this.buttonNext = new ButtonItem();

            this.buttonNext.icon = Glyph.right;

            this.buttonToday = new ButtonItem();

            this.buttonToday.text = strings.today;

            this.buttonGroup = new ButtonGroupItem();

            // Struct
            this.titleItem.appendTo(this._controls);
            this.buttonGroup.buttons.addArray([this.buttonPrevious, this.buttonToday, this.buttonNext]);
            this.buttonGroup.appendTo(this._controls);

            // Wire handlers
            this.dateView.dateItem.selectionChanged.add(() => {this.onSelectionChanged()});
            this.dayView.userAddItem.add((i) => {this.onUserAddItem(i)});
            this.dayView.userRemoveItem.add((i) => {this.onUserRemoveItem(i)});
            this.dayView.viewRangeChanged.add(() => {this.onViewRangeChanged()});
            this.monthView.userAddItem.add((i) => {this.onUserAddItem(i)});
            this.monthView.userRemoveItem.add((i) => {this.onUserRemoveItem(i)});
            this.monthView.viewRangeChanged.add(() => {this.onViewRangeChanged()});
            this.buttonToday.click.add(() => {this.goToday()});
            this.buttonPrevious.click.add(() => {this.goPrevious()});
            this.buttonNext.click.add(() => {this.goNext()});

            // Init me
            this.side = Side.RIGHT;
            this.sideSize = 250;

            this.view = this.dayView;
            this.sideView = this.dateView;
            this.dateView.dateItem.setSelectionRange(DateTime.today, DateTime.today);
            this.dateView.dateItem.selectionMode = DateSelectionMode.WORKWEEK;

        }

        /**
         * Navigates to the next range of dates, based on the current range
         **/
            goNext(){

            if(this.view === this.monthView){
                var first = this.monthView.monthOnView.addMonths(1);
                var last = first.addDays(DateTime.daysInMonth(first.year, first.month) - 1);
                this.dateView.dateItem.setSelectionRange(first, last);
            }else{
                var start = this.dayView.viewStart, end = this.dayView.viewEnd;
                var days = Math.floor(end.subtractDate(start).totalDays) + 1;

                if(this.dateView.dateItem.selectionMode === DateSelectionMode.WORKWEEK){
                    start = start.addDays(7);
                    var monday = start.addDays(-start.dayOfWeek + 1);
                    this.dateView.dateItem.setSelectionRange(monday, monday.addDays(4));
                }else{
                    this.dateView.dateItem.setSelectionRange(end.addDays(1), end.addDays(days));
                }
            }

        }

        /**
         * Navigates to the previous range of dates, based on the current range
         **/
            goPrevious(){

            if(this.view === this.monthView){
                var first = this.monthView.monthOnView.addMonths(-1);
                var last = first.addDays(DateTime.daysInMonth(first.year, first.month) - 1);
                this.dateView.dateItem.setSelectionRange(first, last);
            }else{
                var start = this.dayView.viewStart, end = this.dayView.viewEnd;
                var days = Math.floor(end.subtractDate(start).totalDays) + 1;

                if(this.dateView.dateItem.selectionMode === DateSelectionMode.WORKWEEK){
                    start = start.addDays(-7);
                    var monday = start.addDays(-start.dayOfWeek + 1);
                    this.dateView.dateItem.setSelectionRange(monday, monday.addDays(4));
                }else{
                    this.dateView.dateItem.setSelectionRange(start.addDays(-days), start.addDays(-1));
                }

            }

        }

        /**
         * Navigates to the today day.
         **/
            goToday(){

            this.dateView.dateItem.selectionMode = DateSelectionMode.DAY;
            this.dateView.dateItem.setSelectionRange(DateTime.today, DateTime.today);

        }

        /**
         * Overriden.
         **/
            onLayout(){

            super.onLayout();

            this.container.css({
                top: '+=50'
            });

            var r = this.container.rectangle(null, true);

            this._controls.css({
                top: r.top - 50,
                left: r.left,
                right: r.right,
                width: r.width
            });

            this.buttonGroup.onLayout();


        }

        /**
         * Raises the <c>selectionChanged</c> event
         **/
            onSelectionChanged(){


            var months = "january,february,march,april,may,june,july,august,september,october,november,december".split(",");
            var start = this.dateView.dateItem.selectionStart;
            var end: DateTime = this.dateView.dateItem.selectionEnd;
            var days = Math.floor(end.subtractDate(start).totalDays);
            var smonth = start.month, syear = start.year, emonth = end.month, eyear = end.year;

            if(days > 7){
                if(this.view !== this.monthView){
                    this.view = this.monthView;
                }
                this.titleItem.text = strings[months[start.month - 1]] + ' ' + start.year + (start.date.equals(DateTime.today) ? ' - ' + strings.today : '');
            }else{
                if(this.view !== this.dayView){
                    this.view = this.dayView;
                }

                if(days === 0){
                    this.titleItem.text = start.day + ' ' + strings[months[smonth - 1]] + ' ' + syear;
                }else{
                    this.titleItem.text = start.day + (smonth !== emonth ? ' ' + strings[months[smonth - 1]] : '') + (syear != eyear ? ' ' + syear : '') + ' - ' +
                        end.day + ' ' + strings[months[emonth - 1]] + ' ' + eyear;
                }
            }

            // Set range of view
            (<CalendarDayView>this.view).setViewRange(start, end);


            this.selectionChanged.raise();

        }

        /**
         * Raises the <c>userAddItem</c> event.
         **/
            onUserAddItem(item: CalendarItem){

            this.userAddItem.raise(item);

//            if(this.view === this.dayView){
//                this.monthView.items.add();
//            }

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
         * Gets or sets the working end time of specified week day.
         **/
            workDayEnd(day: WeekDay, value: TimeSpan = null): TimeSpan{

            throw new Ex();

        }

        /**
         * Gets or sets the working start time of specified week day.
         **/
            workDayStart(day: WeekDay, value: TimeSpan = null): TimeSpan{

            throw new Ex();

        }

        /**
         * Gets or sets a value indicating if user is allowed to create items on timespans
         **/
        get allowItemCreate(): boolean{
            return (<CalendarDayView>this.view).allowItemCreate;
        }

        /**
         * Gets or sets a value indicating if user is allowed to create items on timespans
         **/
        set allowItemCreate(value: boolean){


            (<CalendarDayView>this.view).allowItemCreate = value;


        }

        /**
         * Gets or sets a value indicating if user is allowed to drag items around
         **/
        get allowItemDrag(): boolean{
            throw new Ex();
        }

        /**
         * Gets or sets a value indicating if user is allowed to drag items around
         **/
        set allowItemDrag(value: boolean){
            throw new Ex();
        }

        /**
         * Gets or sets a value indicating if user is allowed to edit item text
         **/
        get allowItemEdit(): boolean{
            throw new Ex();

        }

        /**
         * Gets or sets a value indicating if user is allowed to edit item text
         **/
        set allowItemEdit(value: boolean){
            throw new Ex();
        }

        /**
         * Gets or sets a value indicating if user is allowed to delete items
         **/
        get allowItemRemove(): boolean{
            throw new Ex();
        }

        /**
         * Gets or sets a value indicating if user is allowed to delete items
         **/
        set allowItemRemove(value: boolean){
            throw new Ex();
        }

        /**
         * Gets or sets a value indicating if user is allowed to resize timespan of items
         **/
        get allowItemResize(): boolean{
            throw new Ex();
        }

        /**
         * Gets or sets a value indicating if user is allowed to resize timespan of items
         **/
        set allowItemResize(value: boolean){
            throw new Ex();
        }

        /**
         * Gets or sets the time days should end. Default is 23:59:59
         **/
        get dayEnd(): TimeSpan{
            throw new Ex();

        }

        /**
         * Gets or sets the time days should end. Default is 23:59:59
         **/
        set dayEnd(value: TimeSpan){
            throw new Ex();
        }

        /**
         * Gets or sets the time days should start. Default is 00:00
         **/
        get dayStart(): TimeSpan{
            throw new Ex();

        }

        /**
         * Gets or sets the time days should start. Default is 00:00
         **/
        set dayStart(value: TimeSpan){
            throw new Ex();
        }

        /**
         * Gets a value indicating if there is an item on edit mode
         **/
        get editMode(): any{

            throw new Ex();
        }

        /**
         * Gets a value indicating if there is an item on edit mode
         **/
        set editMode(value: any){
            throw new Ex();
        }

        /**
         * Gets the item being edited, if any.
         **/
        get editModeItem(): any{

            throw new Ex();
        }

        /**
         * Gets the item being edited, if any.
         **/
        set editModeItem(value: any){
            throw new Ex();
        }

        /**
         * Gets or sets the first day of week. Default is <c>WeekDay.SUNDAY</c>.
         **/
        get firstDayOfWeek(): WeekDay{
            throw new Ex();

        }

        /**
         * Gets or sets the first day of week. Default is <c>WeekDay.SUNDAY</c>.
         **/
        set firstDayOfWeek(value: WeekDay){
            throw new Ex();
        }

        /**
         * Gets or sets a value indicating if the navigator elements should be visible
         **/
        get navigatorVisible(): boolean{

            throw new Ex();
        }

        /**
         * Gets or sets a value indicating if the navigator elements should be visible
         **/
        set navigatorVisible(value: boolean){
            throw new Ex();
        }

        /**
         * Gets or sets the selection's start
         **/
        get selectionEnd(): DateTime{
            throw new Ex();

        }

        /**
         * Gets or sets the selection's start
         **/
        set selectionEnd(value: DateTime){
            throw new Ex();
        }

        /**
         * Gets or sets the selection mode
         **/
        get selectionMode(): DateSelectionMode{
            return this.dateView.dateItem.selectionMode;
        }

        /**
         * Gets or sets the selection mode
         **/
        set selectionMode(value: DateSelectionMode){

            this.dateView.dateItem.selectionMode = value;
        }

        /**
         * Gets or sets the selection's start
         **/
        get selectionStart(): DateTime{
            throw new Ex();
        }

        /**
         * Gets or sets the selection's start
         **/
        set selectionStart(value: DateTime){
            throw new Ex();
        }

        /**
         * Gets or sets the view's end.
         **/
        get viewEnd(): DateTime{
            return (<CalendarDayView>this.view).viewEnd;
        }



        /**
         * Gets or sets the view's start.
         **/
        get viewStart(): DateTime{
            return (<CalendarDayView>this.view).viewStart;
        }

        /**
         * Gets or sets the work week's end.
         **/
        get workWeekEnd(): WeekDay{

            throw new Ex();
        }

        /**
         * Gets or sets the work week's end.
         **/
        set workWeekEnd(value: WeekDay){
            throw new Ex();
        }

        /**
         * Gets or sets the work week's start.
         **/
        get workWeekStart(): WeekDay{
            throw new Ex();

        }

        /**
         * Gets or sets the work week's start.
         **/
        set workWeekStart(value: WeekDay){
            throw new Ex();
        }
    }
}