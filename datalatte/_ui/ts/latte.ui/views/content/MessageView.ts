module latte{
    /**
     * Shows a message with eye sugar to improve usability and design.
     **/
    export class MessageView extends View{

        /**
         *
         **/
        private _icon: IconItem;

        descriptionElement: JQuery;


        /**
         * Pointer to the DOM element of icon holder.
         **/
        iconElement: JQuery;

        /**
         * Pointer to the DOM element of message text.
         **/
        messageElement: JQuery;

        /**
         * Creates the message view
         **/
        constructor(){

            super();

            this.element.addClass('message');

            this.iconElement = $('<div>').addClass('icon').appendTo(this.element);
            this.messageElement = $('<div>').addClass('message').appendTo(this.element);
            this.descriptionElement = $('<div>').addClass('description').appendTo(this.element);

            this.container.detach().appendTo(this.element);

        }

        /**
         * Sets the icon as the default "alert" icon
         **/
        iconAlert(): MessageView{

            var icon = IconItem.standard(4, 8);
            icon.size = 32;
            this.icon = icon;

            return this;

        }

        /**
         * Sets the icon as the default "error" icon
         **/
        iconError(): MessageView{

            var icon = IconItem.standard(5, 8);
            icon.size = 32;
            this.icon = icon;

            return this;

        }

        /**
         * Sets the icon as the default "info" icon
         **/
        iconInfo(): MessageView{

            var icon = IconItem.standard(5, 7);
            icon.size = 32;
            this.icon = icon;

            return this;

        }

        /**
         * Sets the icon as the default "alert" icon
         **/
        iconQuestion(): MessageView{

            var icon = IconItem.standard(4, 9);
            icon.size = 32;
            this.icon = icon;

            return this;

        }

        //region Properties




        /**
         * Gets or sets the description of the message
         **/
        get description(): string{
            return this.descriptionElement.html();
        }

        /**
         * Gets or sets the description of the message
         **/
        set description(value: string){
            this.descriptionElement.html(value);
        }

        /**
         * Gets or sets the icon of the message
         **/
        get icon(): IconItem{
            return this._icon;
        }

        /**
         * Gets or sets the icon of the message
         **/
        set icon(value: IconItem){


            this._icon = value;

            this.iconElement.empty();

            if(value instanceof IconItem)
                this.iconElement.append(value.element);



        }

        /**
         * Gets or sets the message
         **/
        get message(): string{
            return this.messageElement.html();
        }

        /**
         * Gets or sets the message
         **/
        set message(value: string){

            this.messageElement.html(value);


        }
        //endregion
    }
}