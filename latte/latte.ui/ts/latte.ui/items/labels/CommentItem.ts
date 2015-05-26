module latte{
    /**
     * Represents a Comment
     **/
    export class CommentItem extends Item{

        /**
         *
         **/
        private blinkerElement: JQuery;

        /**
         *
         **/
        private container: JQuery;

        /**
         *
         **/
        private _date: DateTime;

        /**
         *
         **/
        private _icon: IconItem;

        /**
         *
         **/
        private _relativeDate: boolean = true;

        /**
         *
         **/
        private _text: string;

        /**
         *
         **/
        private _user: string;

        /**
         * Points to the DOM element where text is stored
         **/
        commentSideElement: JQuery;

        /**
         * Points to the DOM element where user date is stored
         **/
        dateElement: JQuery;

        /**
         * Points to the DOM element where icon is stored
         **/
        iconSideElement: JQuery;

        /**
         * Points to the DOM element where text is stored
         **/
        textElement: JQuery;

        /**
         * Points to the DOM element where user is stored
         **/
        userElement: JQuery;

        /**
         * Raised when User name or icon is clicked
         **/
        userDetail: LatteEvent;


        /**
         * Creates the item
         **/
        constructor(){

            super();
            var item = this;


            this.element.addClass('comment');
            UiElement.enableTextSelection(this.element);

            // Initialize events
            this.userDetail = new LatteEvent(this);

            // Initialize elements
            this.blinkerElement = $('<div>').addClass('blinker').appendTo(this.element);
            this.container = $('<div>').addClass('comment-content').appendTo(this.element)
            this.iconSideElement = $('<div>').addClass('icon-side').appendTo(this.container);
            this.commentSideElement = $('<div>').addClass('comment-side').appendTo(this.container);
            this.userElement = $('<a>', {href: 'javascript:void(0)'}).addClass('user').appendTo(this.commentSideElement);
            this.textElement = $('<span>').addClass('text').appendTo(this.commentSideElement);
            this.dateElement = $('<div>').addClass('date').appendTo(this.commentSideElement);
            this.container.clear();
            this.element.clear();

            // Elements handlers
            this.userElement.click(() => { item.onUserDetail() });
            this.iconSideElement.click(() => { item.onUserDetail() });
            this.dateElement.click(() => { item.relativeDate = !item.relativeDate });

            this.icon = IconItem.empty(32);

        }

        /**
         * Blinks to call for attention. Optionally specifies the milliseconds to blink.
         **/
        blink(milliseconds: number = 0){


            if(_undef(milliseconds))
                milliseconds = 3000;

            var __this = this;

            this.blinkerElement
                .show()
                .animate({opacity: 0}, milliseconds, 'swing', function(){
                    __this.blinkerElement.hide().css({opacity: 1})
                });


        }

        /**
         * Raises the <c>userDetail</c> event
         **/
            onUserDetail(){

            this.userDetail.raise();

        }

        /**
         * Gets or sets the date of the comment
         **/
        get date(): DateTime{
            return this._date;
        }

        /**
         * Gets or sets the date of the comment
         **/
        set date(value: DateTime){


            if(!(value instanceof DateTime))
                throw new InvalidArgumentEx('value');

            if(this.relativeDate){
                this.dateElement.html(value.toRelativeString());
                this.dateElement.attr('title', value.toString());
            }
            else{
                this.dateElement.html(value.toString());
                this.dateElement.attr('title', value.toRelativeString());
            }

            this._date = value;


        }

        /**
         * Gets or sets the icon of the comment.
         **/
        get icon(): IconItem{
            return this._icon;
        }

        /**
         * Gets or sets the icon of the comment.
         **/
        set icon(value: IconItem){


            this.iconSideElement.empty();

            if(value instanceof IconItem)
                this.iconSideElement.append(value.element);

            this._icon = value;


        }

        /**
         * Gets or sets a value indicating if the date of message should be displayed as a relative date.
         **/
        get relativeDate(): boolean{
            return this._relativeDate;
        }

        /**
         * Gets or sets a value indicating if the date of message should be displayed as a relative date.
         **/
        set relativeDate(value: boolean){


            this._relativeDate = value;

            // Refresh date
            this.date = this.date;



        }

        /**
         * Gets or sets the date of the comment
         **/
        get text(): string{
            return this._text;
        }

        /**
         * Gets or sets the date of the comment
         **/
        set text(value: string){

            this.textElement.html(value);
            this._text = value;


        }

        /**
         * Gets or sets the date of the comment
         **/
        get user(): string{
            return this._user;
        }

        /**
         * Gets or sets the date of the comment
         **/
        set user(value: string){

            this.userElement.html(value);
            this._user = value;


        }
    }
}