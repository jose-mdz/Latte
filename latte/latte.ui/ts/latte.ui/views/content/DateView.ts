module latte{
    /**
     * View for choosing dates or date ranges.

     The <c>DateItem</c> used inside the view adapts its <c>rows</c> and <c>columns</c> to take advantage of the view area.
     **/
    export class DateView extends View{

        /**
         *
         **/
        private _useWorkWeek: boolean;

        /**
         * DateItem for date choosing.
         **/
        dateItem: DateItem;

        /**
         * Button for activating day selection mode.
         **/
        dayButton: ButtonItem;

        /**
         * Button for activating month selection mode.
         **/
        monthButton: ButtonItem;

        /**
         * Button for activating week selection mode.
         **/
        weekButton: ButtonItem;

        /**
         * Button for activating work week selection mode.
         **/
        workWeekButton: ButtonItem;


        /**
         * Creates the view
         **/
        constructor(){


//            var __this = this;

            // Init
            super();
            this.element.addClass('date');

            // Init items
            this.dateItem = new DateItem();
            this.dayButton = new ButtonItem();
            this.dayButton.text = strings.day;
            this.workWeekButton = new ButtonItem();
            this.workWeekButton.text = strings.week;
            this.weekButton = new ButtonItem();
            this.weekButton.text = strings.fullWeek;
            this.monthButton = new ButtonItem();
            this.monthButton.text = strings.month;

            // Initprops
            this.dayButton.faceVisible = false;
            this.weekButton.faceVisible = false;
            this.monthButton.faceVisible = false;
            this.workWeekButton.faceVisible = false;
            this.dayButton.element.css('opacity', .5);
            this.weekButton.element.css('opacity', .5);
            this.monthButton.element.css('opacity', .5);
            this.workWeekButton.element.css('opacity', .5);
            this.weekButton.visible = false;

            // Init struct
            this.dateItem.appendTo(this.container);
            this.dayButton.appendTo(this.element);
            this.weekButton.appendTo(this.element);
            this.workWeekButton.appendTo(this.element);
            this.monthButton.appendTo(this.element);

            // Wire handlers
            this.dateItem.selectionModeChanged.add(() => {this.updateSelectionMode()});
            this.dayButton.click.add(() => {this.dateItem.selectionMode = DateSelectionMode.DAY});
            this.weekButton.click.add(() => {this.dateItem.selectionMode = DateSelectionMode.WEEK});
            this.workWeekButton.click.add(() => {this.dateItem.selectionMode = DateSelectionMode.WORKWEEK});
            this.monthButton.click.add(() => {this.dateItem.selectionMode = DateSelectionMode.MONTH});
            this.dayButton.visibleChanged.add(() => {this.onLayout()});
            this.weekButton.visibleChanged.add(() => {this.onLayout()});
            this.workWeekButton.visibleChanged.add(() => {this.onLayout()});
            this.monthButton.visibleChanged.add(() => {this.onLayout()});


        }

        /**
         * Hides the selection mode buttons
         **/
            hideButtons(){

            this.weekButton.visible = false;
            this.workWeekButton.visible = false;
            this.monthButton.visible = false;
            this.dayButton.visible = false;

        }

        /**
         * Overriden
         **/
        onLayout(){

            super.onLayout();

            this.container.css('bottom', this.dayButton.element.height() + 2);

            var size = this.dateItem.monthSize;
            var cols = Math.floor(this.container.width() / size.width);
            var rows = Math.floor(this.container.height()/ size.height);
            var cont = this.container.rectangle();
            cont.top = 0;
            cont.left = 0;
            var elem = this.dateItem.element;

            if(this.dateItem.columns != cols && cols > 0)
                this.dateItem.columns = cols;

            if(this.dateItem.rows != rows && rows > 0)
                this.dateItem.rows = rows;

            if(this.dateItem.table)
                elem.rectangle( this.dateItem.table.rectangle().centerOn(cont) );

            this.onLayoutButtons();

        }

        /**
         * Layout of buttons
         **/
        onLayoutButtons(){


            var btns = [];

            if(this.dayButton.visible) btns.push(this.dayButton);
            if(this.workWeekButton.visible) btns.push(this.workWeekButton);
            if(this.weekButton.visible) btns.push(this.weekButton);
            if(this.monthButton.visible) btns.push(this.monthButton);

            var w = Math.floor(this.element.width() / btns.length);

            for(var i = 0; i < btns.length; i++)
                // 22 accounts for padding
                btns[i].element.width(w - 22).css('left', w * i);


        }

        /**
         * Shows the selection mode buttons
         **/
        showButtons(){

            this.weekButton.visible = true;
            this.workWeekButton.visible = true;
            this.monthButton.visible = true;
            this.dayButton.visible = true;

        }

        /**
         * Updates the selection mode indicators
         **/
            updateSelectionMode(){

            this.dayButton.checked = (this.dateItem.selectionMode == DateSelectionMode.DAY);
            this.workWeekButton.checked = (this.dateItem.selectionMode == DateSelectionMode.WORKWEEK);
            this.weekButton.checked = (this.dateItem.selectionMode == DateSelectionMode.WEEK);
            this.monthButton.checked = (this.dateItem.selectionMode == DateSelectionMode.MONTH);

        }
    }
}