/**
 * Created by josemanuel on 1/13/14.
 */
module latte{

    /**
     *
     */
    export interface DataRecordSuggestionLoader{
        (d: DataRecordValueItem, callback:(items: Item[]) => any): Message;
    }

    /**
     * Value item for representing data records as value item.
     */
    export class DataRecordValueItem extends ValueItem<number>{

        //region Fields
        private buttonGroup: ButtonGroupItem;
        //endregion

        /**
         * Creates the value item
         * @param loader
         * @param textboxCreated
         */
        constructor(loader: DataRecordSuggestionLoader = null, textboxCreated: (t: TextboxItem) => any = null, placeholder: string = null){
            super();

            this.addClass('data-record');

            if(textboxCreated) {
                this.textboxCreated.add(textboxCreated);
            }

            this.updateItem();

            if(loader) {
                this.loaderFunction = loader;
            }

            if(placeholder) {
                this.placeholder = placeholder;

                if(this.textbox) {
                    this.textbox.placeholder = placeholder;
                }
            }

        }

        //region Methods

        /**
         * Override
         * @returns {string}
         */
        get valueString(): string{
            if(this.record){
                return this.record.toString();
            }else{
                return '';
            }
        }

        /**
         * Override
         */
        onLayout(){
            super.onLayout();

            if(this.buttonGroup) {
                setTimeout(() => {
                    let w = Rectangle.fromElement(this.raw).width;
                    let bw = Rectangle.fromElement(this.buttonGroup.buttons[1].raw).width;
                    // log(`w - bw =  ${w} - ${bw}`);
                    this.buttonGroup.buttons[0].element.css('max-width', w - bw - 35)
                });
            }
        }

        /**
         * Raises the <c>record</c> event
         */
        onRecordChanged(){
            if(this._recordChanged){
                this._recordChanged.raise();
            }

            this.updateItem();

            if(this.record) {

                this.value = this.record.recordId;

                this.record.recordIdChanged.add(() => this.value = this.record.recordId);

            }else{
                this.value = null;
            }
        }

        /**
         * Raises the <c>textboxCreated</c> event
         */
        onTextboxCreated(){
            if(this._textboxCreated){
                this._textboxCreated.raise(this.textbox);
            }
            if(_isString(this.placeholder) && this.placeholder.length > 0) {
                this.textbox.placeholder = this.placeholder;
            }
            this.textbox.minLengthToActivateSuggestions = 0;
        }

        /**
         * Override
         * @param value
         */
        setValue(value: any){
            if(value instanceof DataRecord){
                this.record = value;
            }
        }

        /**
         * Sets the record without raising the valueChanged event
         */
        setRecordSilent(r: DataRecord){
            this._record  = r;
            this.updateItem();
        }

        /**
         * Updates the item inside to show
         */
        updateItem(){

            this.element.empty();

            if(this.record){

                // Why is this line new?
                if (this._textbox) this._textbox.hideSuggestions();

                this._textbox = null;

                let icon = _isFunction(this.record['icon16']) ? (<any>this.record['icon16']()) : null;

                let bg = new ButtonGroupItem([
                    new ButtonItem(this.record.toString(), icon),
                    new ButtonItem(null, LinearIcon.cross, () => {
                        this.record = null;
                        this.textbox.input.select();
                        this.textbox.input.focus();
                    })
                ]);

                bg.appendTo(this);

                this.buttonGroup = bg;

                bg.buttons[0].addClass('no-front-padding');
                bg.buttons[0].faceVisible = bg.buttons[1].faceVisible = false;

                this.onLayout();

            }else{
                this.buttonGroup = null;
                this._textbox = new TextboxItem();
                this.textbox.appendTo(this);
                this.textbox.filterSuggestions.add(() => {
                    if(this.loaderFunction){
                        (<any>this.loaderFunction)(<any>this, (items: Item[]) => {
                            if(this.textbox) {
                                this.textbox.suggestions.clear();
                                this.textbox.suggestions.addArray(items);
                            }

                        });
                    }
                });

                this.onTextboxCreated();
            }

            this.element.clear();
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _recordChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the record property changes
         *
         * @returns {LatteEvent}
         */
        get recordChanged(): LatteEvent{
            if(!this._recordChanged){
                this._recordChanged = new LatteEvent(this);
            }
            return this._recordChanged;
        }

        /**
         * Back field for event
         */
        private _textboxCreated: LatteEvent

        /**
         * Gets an event raised when the textbox has been created
         *
         * @returns {LatteEvent}
         */
        get textboxCreated(): LatteEvent{
            if(!this._textboxCreated){
                this._textboxCreated = new LatteEvent(this);
            }
            return this._textboxCreated;
        }
        //endregion

        //region Properties

        /**
         * Property field
         */
        private _loaderFunction:DataRecordSuggestionLoader = null;

        /**
         * Gets or sets the loader function
         *
         * @returns {(text:string, callback:(items:Array<Item>) => any) => Message}
         */
        get loaderFunction():DataRecordSuggestionLoader {
            return this._loaderFunction;
        }

        /**
         * Gets or sets the loader function
         *
         * @param {(text:string, callback:(items:Array<Item>) => any) => Message} value
         */
        set loaderFunction(value:DataRecordSuggestionLoader) {
            this._loaderFunction = value;
        }

        /**
         * Property field
         */
        private _placeholder:string = null;

        /**
         * Gets or sets the placeholder
         *
         * @returns {string}
         */
        get placeholder():string {
            return this._placeholder;
        }

        /**
         * Gets or sets the placeholder
         *
         * @param {string} value
         */
        set placeholder(value:string) {
            this._placeholder = value;
        }

        /**
         * Property field
         */
        private _record: DataRecord = null;

        /**
         * Gets or sets the record of the item
         *
         * @returns {DataRecord}
         */
        get record(): DataRecord{
            return this._record;
        }

        /**
         * Gets or sets
         *
         * @param {DataRecord} value
         */
        set record(value: DataRecord){

            // Check if value changed
            let changed: boolean = value !== this._record;

            // Set value
            this._record = value;

            // Trigger changed event
            if(changed){
                this.onRecordChanged();
            }
        }

        /**
         * Property field
         */
        private _textbox:TextboxItem;

        /**
         * Gets the textbox used to search
         *
         * @returns {TextboxItem}
         */
        get textbox():TextboxItem {
            return this._textbox;
        }

        /**
         * Gets the text of the textbox (if any)
         *
         * @returns {string}
         */
        get text():string {

            if(this._textbox){
                return this._textbox.value;

            }else if(this.record) {
                return this.record.toString();
            }
            return null;
        }

        //endregion

    }

}