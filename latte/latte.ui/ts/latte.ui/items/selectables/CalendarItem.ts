module latte{
    /**
     * Represents an item for calendar views
     **/
    export class CalendarItem extends SelectableLabel{

        /**
         *
         **/
        private _dateEnd: DateTime;

        /**
         *
         **/
        private _dateStart: DateTime;

        /**
         *
         **/
        public _matrixDepth: number;

        /**
         *
         **/
        matrixAttributes: any;

        /**
         * Gets a collection of rectangles that exist extra to the element of this item
         **/
        rectangles: Collection<Rectangle>;


        /**
         * Creates the item
         **/
        constructor(){

            // Init
            super();
            this.element.addClass('calendar');

            // Rectangles
            this.rectangles = new Collection<Rectangle>(this._onAddRectangle, this._onRemoveRectangle, this);

            // Hide element. It is not visible by default
            this.element.hide();

        }

        /**
         *
         **/
        private _onAddRectangle(r: Rectangle){



            // Clone element
            var clon = this.element.clone();

            // Set bounds of clon
            clon.rectangle(r);

            // append as sibling
            this.element.parent().append(clon);

            clon.click((evt) => {
                this.selected = !this.selected;
                evt.stopPropagation();
            });

            // Make visible
            clon.show();

            // mark rectangle
            r.tag = clon;


        }

        /**
         *
         **/
        private _onRemoveRectangle(r: Rectangle){

            if(r.tag instanceof jQuery)
                (<JQuery>r.tag).remove();

        }

        /**
         * Clones the item
         **/
        clone(): CalendarItem{

            var c = new CalendarItem();

            c.dateStart = this.dateStart;
            c.dateEnd = this.dateEnd;
            c.text = this.text;

            return c;

        }

        /**
         *
         **/
        onSelectedChanged(){
            super.onSelectedChanged();
        }

        /**
         * Gets a value indicating if the item is an <c>all-day</c> item.
         All-day items are those who its time of day both start and end dates are zero minutes
         **/
        get allDay(): boolean{

            return this._dateStart.timeOfDay.totalMinutes == 0
                && this._dateEnd.timeOfDay.totalMinutes == 0;

        }

        /**
         * Gets or sets the end date of the item
         **/
        get dateEnd(): DateTime{
            return this._dateEnd;
        }

        /**
         * Gets or sets the end date of the item
         **/
        set dateEnd(value: DateTime){


            if(!(value instanceof DateTime))
                throw new InvalidArgumentEx('value');

            this._dateEnd = value;


        }

        /**
         * Gets or sets the start date of the item
         **/
        get dateStart(): DateTime{
            return this._dateStart;
        }

        /**
         * Gets or sets the start date of the item
         **/
        set dateStart(value: DateTime){


            if(!(value instanceof DateTime))
                throw new InvalidArgumentEx('value');

            this._dateStart = value;


        }

        /**
         * Gets or sets the text of the item
         **/
        get text(): string{
            return this.label.text;
        }

        /**
         * Gets or sets the text of the item
         **/
        set text(value: string){


            this.label.text = value;


        }
    }
}