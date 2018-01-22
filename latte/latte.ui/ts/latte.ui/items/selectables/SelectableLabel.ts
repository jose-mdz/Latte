module latte{
    /**
     *
     **/
    export class SelectableLabel extends SelectableItem{

        /**
         * Label of item
         **/
        label: LabelItem;

        /**
         * Creates the selectable label
         **/
        constructor(text?: string, description?: string, icon?: IconItem, title?: number){

            super();
            this.addClass('with-label');

            // Init element
            this.label = new LabelItem(text, description, icon, title);
            this.label.appendTo(this);
            this.element.clear();

        }

        //region Methods

        /**
         * Returns a string representation of the object
         */
        toString(): string{
            return this.text;
        }
        //endregion

        //region Properties

        /**
         * Gets or sets the description of the item's label
         **/
        get description(): string{
            return this.label.description;
        }

        /**
         * Gets or sets the description of the item's label
         **/
        set description(value: string){

            this.label.description = value;


        }

        /**
         * Gets or sets the icon of the item's label
         **/
        get icon(): IconItem{
            return this.label.icon;
        }

        /**
         * Gets or sets the icon of the item's label
         **/
        set icon(value: IconItem){

            this.label.icon = value;


        }

        /**
         * Gets or sets the text of the item's label
         **/
        get text(): string{
            return this.label.text;
        }

        /**
         * Gets or sets the text of the item's label
         **/
        set text(value: string){

            this.label.text = value;


        }
        //endregion
    }
}