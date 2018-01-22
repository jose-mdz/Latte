module latte{
    /**
     * Represents a single label
     **/
    export class LabelItem extends Item{

        /**
         *
         */
        private _iconAndTextPadding: number = 0;

        /**
         *
         **/
        private _direction: Direction;

        /**
         *
         **/
        private _icon: IconItem;

        /**
         *
         **/
        private _linkStyle: boolean;

        /**
         *
         **/
        private _preformatted: boolean = true;

        /**
         *
         **/
        private _textWrap: boolean;

        /**
         *
         **/
        private _title: number;

        /**
         * Points to the element where the text and description elements are stored
         **/
        contentElement: JQuery;

        /**
         * Points to the element where the description is stored
         **/
        descriptionElement: JQuery;

        /**
         * Points to the element where the icon is stored
         **/
        iconElement: JQuery;

        /**
         * Points to the element where the text is stored
         **/
        textElement: JQuery;

        /**
         * Raised when user clicks the label and its a link label
         **/
        navigate: LatteEvent;

        /**
         * Raised when description() value changes
         **/
        descriptionChanged: LatteEvent;

        /**
         * Raised when icon() value changes
         **/
        iconChanged: LatteEvent;

        /**
         *
         **/
        constructor(text: string = '', description: string = '', icon: IconItem = null, title: number = 0){

            super();
            this.element.addClass('label');

            // Init events
            this.descriptionChanged = new LatteEvent(this);
            this.iconChanged = new LatteEvent(this);
            this.navigate = new LatteEvent(this);

            // Init elements
            this.iconElement = $('<div>').addClass('icon').appendTo(this.element);
            this.contentElement = $('<div>').addClass('label-content').appendTo(this.element);
            this.textElement = $('<div>').addClass('text').appendTo(this.contentElement);
            this.descriptionElement = $('<div>').addClass('description').appendTo(this.contentElement);
            this.element.clear();

            // Init this item
            this.direction = Direction.HORIZONTAL;

            this.element.click(() => {
                if(this.linkStyle){
                    this.onNavigate();
                }
            });

            this.text = text;
            this.description = description;
            this.icon = icon;
            this.title = title;
        }

        //region Private Methods
        /**
         * Updates the <c>white-space</c> CSS property
         **/
        private _updateWhitespace(){

            var p = this.preformatted;
            var w = this.textWrap;

            if(p){
                if(w){
                    this.contentElement.css('white-space', 'pre-wrap');
                }else{
                    this.contentElement.css('white-space', 'pre');
                }
            }else{
                this.contentElement.css('whiteSpace', 'normal');
            }


        }
        //endregion

        //region Methods
        /**
         * Updates the <c>.icon-and-text</c> flag.
         Also updates margin of label-cotent
         **/
        updateIconAndTextFlag(){

            if(this.icon instanceof IconItem && (this.text || this.description || this.textElement.children().length > 0 || this.descriptionElement.children().length > 0)){
                this.element.addClass('icon-and-text');
            }else{
                this.element.removeClass('icon-and-text');
            }

            if(this.element.hasClass('icon-and-text') && this.direction == Direction.HORIZONTAL && this.icon){
                this.contentElement.css({marginLeft: this.icon.size + this.iconAndTextPadding});
            }else{
                this.contentElement.css({marginLeft: ''});
            }

        }

        /**
         * Raises the <c>descriptionChanged</c> event
         **/
        onDescriptionChanged(){

            this.descriptionChanged;

        }

        /**
         * Raises the <c>iconChanged</c> event
         **/
        onIconChanged(){

            this.iconChanged.raise();

        }

        /**
         * Raises the <c>navigate</c> event
         **/
        onNavigate(){

            this.navigate.raise();

        }

        /**
         * Raises the <c>text</c> event
         */
        onTextChanged(){
            if(this._textChanged){
                this._textChanged.raise();
            }

            this.textElement.html(this.text || '');
            this.updateIconAndTextFlag();
        }
        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _textChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the text property changes
         *
         * @returns {LatteEvent}
         */
        get textChanged(): LatteEvent{
            if(!this._textChanged){
                this._textChanged = new LatteEvent(this);
            }
            return this._textChanged;
        }

        //endregion

        //region Properties

        /**
         * Gets or sets the description of label, shown below the text.
         **/
        get description(): string{
            return this.descriptionElement.html();
        }

        /**
         * Gets or sets the description of label, shown below the text.
         **/
        set description(value: string){


            this.descriptionElement.html(value);
            this.updateIconAndTextFlag();
            this.onDescriptionChanged();



        }

        /**
         * Gets or sets the direction of the label
         **/
        get direction(): Direction{
            return this._direction;
        }

        /**
         * Gets or sets the direction of the label
         **/
        set direction(value: Direction){


            if(value != Direction.VERTICAL && value != Direction.HORIZONTAL)
                throw new InvalidArgumentEx('value', value);

            if(value == Direction.VERTICAL){
                this.element.removeClass('horizontal').addClass('vertical');
            }else{
                this.element.removeClass('vertical').addClass('horizontal');
            }

            this._direction = value;
            this.updateIconAndTextFlag();



        }

        /**
         * Gets or sets the icon of the label
         **/
        get icon(): IconItem{
            return this._icon;
        }

        /**
         * Gets or sets the icon of the label
         **/
        set icon(value: IconItem){


            if(value != null && !(value instanceof IconItem))
                throw new InvalidArgumentEx('value', value);

            this._icon = value;
            this.iconElement.empty();

            if(value) {
                this.iconElement.append(value.element);
            }

            this.updateIconAndTextFlag();
            this.onIconChanged();



        }

        get iconAndTextPadding(): number{
            return this._iconAndTextPadding;
        }

        set iconAndTextPadding(value: number){
            this._iconAndTextPadding = value;

            this.updateIconAndTextFlag();
        }

        /**
         * Gets or sets a value indicating if the label has a link style
         **/
        get linkStyle(): boolean{
            return this._linkStyle;
        }

        /**
         * Gets or sets a value indicating if the label has a link style
         **/
        set linkStyle(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value');


            this._linkStyle = value;

            if(value)
                this.addClass('link-style');
            else
                this.removeClass('link-style');



        }

        /**
         * Gets or sets if label uses preformatted text. Or PRE whitespace
         **/
        get preformatted(): boolean{
            return this._preformatted;
        }

        /**
         * Gets or sets if label uses preformatted text. Or PRE whitespace
         **/
        set preformatted(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            this._preformatted = value;
            this._updateWhitespace();


        }

        /**
         * Property field
         */
        private _text: string = '';

        /**
         * Gets or sets the text of the label
         *
         * @returns {string}
         */
        get text(): string{
            return this._text;
        }

        /**
         * Gets or sets the text of the label
         *
         * @param {string} value
         */
        set text(value: string){

            // Check if value changed
            let changed: boolean = value !== this._text;

            // Set value
            this._text = value;

            // Trigger changed event
            if(changed){
                this.onTextChanged();
            }
        }

        /**
         * Gets or sets a value indicating if the text is wrapped in lines
         **/
        get textWrap(): boolean{
            return this._textWrap;
        }

        /**
         * Gets or sets a value indicating if the text is wrapped in lines
         **/
        set textWrap(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            this._textWrap = value;
            this._updateWhitespace();

        }

        /**
         * Gets or sets the title level of this label.
         Possible values are in the range from 0 to 5.
         **/
        get title(): number{
            return this._title;
        }

        /**
         * Gets or sets the title level of this label.
         Possible values are in the range from 0 to 5.
         **/
        set title(value: number){


            if(!_isNumber(value) || (value < 0 && value > 5))
                throw new InvalidArgumentEx('value');

            this.element.removeClass('title-1 title-2 title-3');

            if(value > 0)
                this.element.addClass('title-' + value);

            this._title = value;


        }
        //endregion
    }
}