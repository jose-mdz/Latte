/**
 * Created by josemanuel on 1/13/14.
 */
module latte{

    /**
     *
     */
    export interface DataRecordSuggestionLoader{
        (d: DataRecordValueItem, callback:(items:Array<Item>) => any): Message;
    }

    /**
     * Value item for representing data records as value item.
     */
    export class DataRecordValueItem extends ValueItem{

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
         * Override.
         * @returns {number}
         */
        getValue(): number{
            if(this.record){
                return this.record.recordId;
            }else{
                return 0;
            }
        }

        /**
         * Override
         * @returns {string}
         */
        getValueString(): string{
            if(this.record){
                return this.record.toString();
            }else{
                return '';
            }
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

                this._textbox = null;

                var icon = _isFunction(this.record['icon16']) ? (<any>this.record['icon16']()) : null;

                var bg = new ButtonGroupItem([
                    new ButtonItem(this.record.toString(), icon),
                    new ButtonItem(null, Glyph.dismiss, () => {
                        var txt = this.text;
                        this.record = null;
//                        this.textbox.value = txt;
                        this.textbox.input.select();
                        this.textbox.input.focus();
                    })
                ]);

                bg.appendTo(this);

            }else{
                this._textbox = new TextboxItem();
                this.textbox.appendTo(this);
                this.textbox.filterSuggestions.add(() => {
                    if(this.loaderFunction){
                        this.loaderFunction(this, (items: Array<Item>) => {
                            this.textbox.suggestions.clear();
                            this.textbox.suggestions.addArray(items);
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
         private _textboxCreated: LatteEvent

        /**
         * Gets an event raised when the textbox has been created
         *
         * @returns {LatteEvent}
         */
        public get textboxCreated(): LatteEvent{
            if(!this._textboxCreated){
                this._textboxCreated = new LatteEvent(this);
            }
            return this._textboxCreated;
        }

        /**
         * Raises the <c>textboxCreated</c> event
         */
        public onTextboxCreated(){
            if(this._textboxCreated){
                this._textboxCreated.raise(this.textbox);
            }
            if(_isString(this.placeholder) && this.placeholder.length > 0) {
                this.textbox.placeholder = this.placeholder;
            }
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
        public get loaderFunction():DataRecordSuggestionLoader {
            return this._loaderFunction;
        }

        /**
         * Gets or sets the loader function
         *
         * @param {(text:string, callback:(items:Array<Item>) => any) => Message} value
         */
        public set loaderFunction(value:DataRecordSuggestionLoader) {
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
        private _record:DataRecord = null;

        /**
         * Gets or sets the record of the item
         *
         * @returns {DataRecord}
         */
        public get record():DataRecord {
            return this._record;
        }

        /**
         * Gets or sets the record of the item
         *
         * @param {DataRecord} value
         */
        public set record(value:DataRecord) {

            var changed = value !== this._record;

            this._record = value;

            this.updateItem();

            if(changed) {
                this.onValueChanged();
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
        public get textbox():TextboxItem {
            return this._textbox;
        }

        /**
         * Gets the text of the textbox (if any)
         *
         * @returns {string}
         */
        public get text():string {

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