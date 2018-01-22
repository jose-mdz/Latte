module latte{
    /**
     * Renders an item to input data from user.
     **/
    export class InputItem extends ValueItem<any>{


        //region Static
        /**
         * Gets a formatted string of the value depending on the type
         **/
        static format(value: any, type: string, options: any = null): string{

            switch(type){
                case 'switch':
                    return value === true || value === 1 ? strings.switchOn : strings.switchOff;

                case 'boolean':
                    return value === true || value === 1 ? strings.yes : strings.no;

                case 'record-combo':

                    // IMPORTANT: Do not modify call of literal
                    // This is necessary to compile without data module
                    var c = new latte['DataRecordCollection']();

                    // Try to prepare collection
                    if(options)
                        try{ c.add(options); }catch(e){ throw new InvalidArgumentEx('value'); }

                    var r = c.byId(value);

                    if(r) return r.getMetadata().name;
                    return value;
                case 'combo':
                    if((_isArray(options) ||  (typeof options === 'object')) && !_undef(options[value]))
                        return options[value];
                    return value;

                case 'flags':
                    let list = [];
                    let flags = parseInt(value);
                    for(let i in options){
                        let flag = parseInt(i);
                        if( (flags & flag) == flag){
                            list.push(options[i]);
                        }
                    }
                    return list.join(', ') || strings.flagsNone;

                default:
                    return value;
            }

        }

        /**
         * Creates the input item from a caption and a value item
         *
         * @param text
         * @param item
         */
        static fromItem(text: string, item: ValueItem<any>): InputItem{

            var input = new InputItem(text, 'custom');

            input.valueItem = item;

            return input;

        }

        /**
         * Gets an input from the specified IInput
         * @param input
         * @param name
         */
        static fromIInput(input: IInput, name: string = null, value: any = null){

            let item = new InputItem(
                // input.text || '(no text)',
                // input.type || 'string',
                // (input.options) ? null : value || input.defaultValue || null,
                // input.readOnly === true || null,
                // name
            );

            item.name = name;
            item.meta = input;
            item.value = value;

            // item.name = name;

            // if(input.options) {
            //     item.options = input.options;
            //
            //     if(input.defaultValue){
            //         item.value = input.defaultValue;
            //     }
            //
            //     if(value) {
            //         item.value = value;
            //     }
            // }
            //
            // if(input.hint) {
            //     item.setHint(input.hint);
            // }
            //
            // if(input.nullable === true) {
            //     if(item.valueItem instanceof DatePickerItem) {
            //         let datePicker: DatePickerItem = <DatePickerItem>item.valueItem;
            //         datePicker.nullable = true;
            //     }
            // }

            return item;
        }

        /**
         * Returns a value indicating if the value is empty
         * @param value
         */
        static isEmptyValue(value: any): boolean{
            if(value instanceof DateTime) {
                return (value + 0) == 0;
            }else {
                return !value;
            }
        }

        //endregion

        //region Fields

        /**
         *
         */
        private _textWidth: number = 0.3;

        /**
         * Saves the last assigned value item
         */
        private _lastValueItem: ValueItem<any>;

        /**
         * Saves the last assigned hint item
         */
        private _lastHintItem: Item;

        /**
         * Points to the label where text is stored
         **/
        label: LabelItem;

        /**
         * Points to the label where read-only elements are shown
         **/
        readOnlyLabel: LabelValueItem;

        /**
         * Points to separator element
         **/
        separatorElement: JQuery;

        /**
         * Points to the DOM element where <c>labelElement</> is contained, i.e. the text side.
         **/
        textElement: JQuery;

        /**
         * Points to the DOM element where the value is shown, i.e. the value side
         **/
        valueElement: JQuery;
        //endregion

        /**
         * Creates the input element
         **/
        constructor(text: string = '', type: InputType = null, value: any = null, readOnly: boolean = null, name: string = null){

            super();
            this.element.addClass('input');

            // Create elements
            this.textElement = $('<div>').addClass('text').appendTo(this.element).hide();
            this.valueElement = $('<div>').addClass('value').appendTo(this.element);
            this.separatorElement = $('<div>').addClass('separator').appendTo(this.element);
            this.element.clear();

            // Create items
            this.label = new LabelItem();
            this.label.appendTo(this.textElement);
            this.readOnlyLabel = new LabelValueItem();
            this.readOnlyLabel.appendTo(this.valueElement);
            this.readOnlyLabel.addClass('read-only');
            this.readOnlyLabel.visible = (false);

            this.readOnlyLabel.valueChanged.add(() => {

                // if(this.name == 'type')
                // log(`Value: ${this.readOnlyLabel.value}`)
            });

            // Default props
            this.type = 'string';
            this.direction = View.smallScreen ? Direction.VERTICAL : Direction.HORIZONTAL;

            if(text) this.text = (text);
            if(type) this.type = (type);
            if(value) this.value = (value);
            if(readOnly) this.readOnly = (readOnly);
            if(name) this.name = name;

        }

        //region Private methods

        /**
         * Updates the readonly label
         */
        private updateReadonlyLabel(){

            // if(this.name == 'number') {
            //     debugger;
            // }

            if(this.readOnlyValue) {
                this.readOnlyLabel.value = this.readOnlyValue;
            }else{
                this.readOnlyLabel.value = this.valueItem.valueString;
            }

            // log(`ReadOnly for ${this.name}: ${this.readOnlyLabel.value}`);
        }

        /**
         * Creates an item from a specified value item
         * @param {latte.InputType} value
         * @returns {latte.ValueItem<any>}
         */
        private valueItemFromType(value: InputType): ValueItem<any>{
            let item;
            switch(value){
                case "auto":
                case "label":
                    item = new LabelValueItem();
                    break;

                case "string":
                    item = new TextboxItem();
                    break;

                case "text":
                    item = new TextboxItem();
                    item.multiline = (true);
                    break;

                case "html":
                    item = new HtmlEditorItem();
                    break;

                case "number":
                    item = new TextboxItem();
                    (<TextboxItem>item).filter = TextboxFilter.NUMBER;
                    (<TextboxItem>item).validationRegex = Culture.current.floatValidator;
                    break;

                case "integer":
                    item = new TextboxItem();
                    (<TextboxItem>item).filter = TextboxFilter.INTEGER;
                    (<TextboxItem>item).validationRegex = Culture.current.intValidator;
                    break;

                case "float":
                    item = new TextboxItem();
                    (<TextboxItem>item).filter = TextboxFilter.NUMBER;
                    (<TextboxItem>item).validationRegex = Culture.current.floatValidator;
                    break;

                case "boolean":
                    item = new CheckboxItem();
                    break;

                case "switch":
                    item = new SwitchItem();
                    break;

                case "password":
                    item = new TextboxItem();
                    item.password = (true);
                    break;

                case "md5-password":
                    item = new TextboxItem();
                    item.password = (true);
                    break;

                case "date":
                    item = new DatePickerItem();
                    break;

                case "time":
                    item = new TimePickerItem();
                    break;

                case "datetime":
                    item = new DatePickerItem();
                    item.timeVisible = (true);
                    break;

                case "enumeration":
                    item = new ComboItem();
                    break;

                case "combo":
                    item = new ComboItem();
                    break;

                case "radio":
                    item = new RadioGroup();
                    break;

                case "record-combo":
                    item = new ComboItem();
                    break;

                case "flags":
                    item = new FlagsValueItem();
                    break;

                case "color":
                    item = new ColorValueItem();
                    break;

                case "file":
                    item = new FileValueItem();
                    break;

                case "image":
                    item = new LabelValueItem();
                    break;

                case "custom":
                    if(_isFunction(this.meta.customFunction)){
                        item = this.meta.customFunction();
                    }else{
                        item = new LabelValueItem();
                    }

                    break;

                case "record":
                    // IMPORTANT: Do not modify call of literal
                    // This is necessary to compile without data module
                    item = new latte['DataRecordValueItem']();
                    break;
                default:
                    throw new InvalidArgumentEx('value');
            }
            return item;
        }

        //endregion

        //region Methods

        /**
         * Override
         * @returns {string}
         */
        getValueString(): string{
            if(this.valueItem){
                return this.valueItem.valueString;
            }else{
                return super.onGetValueString();
            }
        }

        /**
         * Checks if the current value is valid for the field <c>type</c>
         **/
        isValid(): boolean{

            var value = this.value;

            switch(this.type){
                case "integer":
                    var allowed = "1234567890";
                    for(var i = 0; i < value.length; i++)
                        if(allowed.indexOf(value.charAt(i)) < 0)
                            return false;

                    return true;

                case  "number":
                case  "float":
                    return !isNaN(value);

            }

            return true;

        }

        /**
         *
         **/
        onLayout(){

            super.onLayout();

            this.valueItem.onLayout();

        }

        /**
         * Raises the <c>meta</c> event
         */
        onMetaChanged(){
            if(this._metaChanged){
                this._metaChanged.raise();
            }

            // This code changes only the properties
            // of the metadata that apples to the item,
            // ignoring all the resolvableBoolean properties,
            // since they are resolved by a higher entity, like MetaFormItem.
            if(this.meta) {

                if('text' in this.meta) {
                    this.text = this.meta.text;
                }

                if('type' in this.meta) {
                    this.type = this.meta.type;
                }

                if('options' in this.meta) {
                    this.options = this.meta.options;

                    if(this.meta.defaultValue){
                        this.value = this.meta.defaultValue;
                    }
                }

                if('hint' in this.meta) {
                    this.setHint(this.meta.hint);
                }

                if(_isBoolean(this.meta.readOnly)) {
                    this.readOnly = !!this.meta.readOnly;
                }

                if(this.meta.nullable === true) {
                    if(this.valueItem instanceof DatePickerItem) {
                        let datePicker: DatePickerItem = <DatePickerItem>this.valueItem;
                        datePicker.nullable = true;
                    }
                }

            }
        }

        /**
         * Raises the <c>valueChanged</c> event
         */
        onValueChanged(){
            super.onValueChanged();

            if(this.readOnly){
                this.readOnly = this.readOnly;
            }
        }

        /**
         * Override.
         * @returns {string}
         */
        onGetValueString(): string{
            if(this.valueItem) {
                return this.valueItem.valueString;
            }else {
                return super.onGetValueString();
            }
        }

        /**
         * Raises the <c>hintItem</c> event
         */
        onHintItemChanged(){
            if(this._hintItemChanged){
                this._hintItemChanged.raise();
            }

            if(this._lastHintItem) {
                this._lastHintItem.raw.remove();
            }

            if(this.hintItem) {
                this.hintItem.addClass('input-hint');
                this.valueElement.append(this.hintItem.raw);
            }

            this._lastHintItem = this.hintItem;

        }

        /**
         * Raises the <c>options</c> event
         */
        onOptionsChanged(){
            if(this._optionsChanged){
                this._optionsChanged.raise();
            }

            if(this.valueItem instanceof ComboItem){
                (<ComboItem>this.valueItem).options = this.options;
            }

            if(this.valueItem instanceof RadioGroup){
                (<RadioGroup>this.valueItem).options = this.options;
            }

            if(this.valueItem instanceof FlagsValueItem) {
                (<FlagsValueItem>this.valueItem).options = this.options;
            }
        }

        /**
         * Raises the <c>readOnly</c> event
         */
        onReadOnlyChanged(){
            if(this._readOnlyChanged){
                this._readOnlyChanged.raise();
            }

            this.updateReadonlyLabel();
            this.readOnlyLabel.visible = this.readOnly;
            this.valueItem.visible = !this.readOnly;
        }

        /**
         * Raises the <c>readOnlyValue</c> event
         */
        onReadOnlyValueChanged(){
            if(this._readOnlyValueChanged){
                this._readOnlyValueChanged.raise();
            }

            this.updateReadonlyLabel();
        }

        /**
         * Raises the <c>separator</c> event
         */
        onSeparatorChanged(){
            if(this._separatorChanged){
                this._separatorChanged.raise();
            }


            if(this.separator) {
                this.separatorElement.addClass('visible');
            }else {
                this.separatorElement.addClass('visible');
            }
        }

        /**
         * Raises the <c>text</c> event
         */
        onTextChanged(){
            if(this._textChanged){
                this._textChanged.raise();
            }

            // Set visibility of text
            this.textVisible = !!this.text;

            // Update text to label
            if(this.text) {
                this.label.text = this.text;
            }
        }

        /**
         * Raises the <c>type</c> event
         */
        onTypeChanged(){
            if(this._typeChanged){
                this._typeChanged.raise();
            }

            let item: ValueItem<any>;

            if(_isFunction(this.type)) {
                item = new (this.value)();

            }else if(_isString(this.type)) {
                item = this.valueItemFromType(this.type);
            }

            this.valueItem = item;
        }

        /**
         * Raises the <c>valid</c> event
         */
        onValidChanged(){
            if(this._validChanged){
                this._validChanged.raise();
            }

            if(this.valid) {
                this.removeClass('invalid');
            }else {
                this.addClass('invalid');
            }
        }

        /**
         * Raises the <c>valueItem</c> event
         */
        onValueItemChanged(){
            if(this._valueItemChanged){
                this._valueItemChanged.raise();
            }

            // Remove previous item
            if(this._lastValueItem) {
                this._lastValueItem.raw.remove();
            }

            // Append current item
            if (this.valueItem) {
                this.valueElement.append(this.valueItem.raw);

                this.valueItem.valueChanged.add(() => this.onValueChanged());
            }

            // Save as last item
            this._lastValueItem = this.valueItem;
        }

        /**
         * Sets the hint as a string in a label
         * @param hint
         */
        setHint(hint: string){
            if(hint) {
                let l = new LabelItem(hint);
                this.hintItem = l;
            }else {
                this.hintItem = null;
            }
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _hintItemChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the hintItem property changes
         *
         * @returns {LatteEvent}
         */
        get hintItemChanged(): LatteEvent{
            if(!this._hintItemChanged){
                this._hintItemChanged = new LatteEvent(this);
            }
            return this._hintItemChanged;
        }

        /**
         * Back field for event
         */
        private _metaChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the meta property changes
         *
         * @returns {LatteEvent}
         */
        get metaChanged(): LatteEvent{
            if(!this._metaChanged){
                this._metaChanged = new LatteEvent(this);
            }
            return this._metaChanged;
        }

        /**
         * Back field for event
         */
        private _optionsChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the options property changes
         *
         * @returns {LatteEvent}
         */
        get optionsChanged(): LatteEvent{
            if(!this._optionsChanged){
                this._optionsChanged = new LatteEvent(this);
            }
            return this._optionsChanged;
        }

        /**
         * Back field for event
         */
        private _readOnlyChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the readOnly property changes
         *
         * @returns {LatteEvent}
         */
        get readOnlyChanged(): LatteEvent{
            if(!this._readOnlyChanged){
                this._readOnlyChanged = new LatteEvent(this);
            }
            return this._readOnlyChanged;
        }

        /**
         * Back field for event
         */
        private _readOnlyValueChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the readOnlyValue property changes
         *
         * @returns {LatteEvent}
         */
        get readOnlyValueChanged(): LatteEvent{
            if(!this._readOnlyValueChanged){
                this._readOnlyValueChanged = new LatteEvent(this);
            }
            return this._readOnlyValueChanged;
        }

        /**
         * Back field for event
         */
        private _separatorChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the separator property changes
         *
         * @returns {LatteEvent}
         */
        get separatorChanged(): LatteEvent{
            if(!this._separatorChanged){
                this._separatorChanged = new LatteEvent(this);
            }
            return this._separatorChanged;
        }

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

        /**
         * Back field for event
         */
        private _typeChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the type property changes
         *
         * @returns {LatteEvent}
         */
        get typeChanged(): LatteEvent{
            if(!this._typeChanged){
                this._typeChanged = new LatteEvent(this);
            }
            return this._typeChanged;
        }

        /**
         * Back field for event
         */
        private _validChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the valid property changes
         *
         * @returns {LatteEvent}
         */
        get validChanged(): LatteEvent{
            if(!this._validChanged){
                this._validChanged = new LatteEvent(this);
            }
            return this._validChanged;
        }

        /**
         * Back field for event
         */
        private _valueItemChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the valueItem property changes
         *
         * @returns {LatteEvent}
         */
        get valueItemChanged(): LatteEvent{
            if(!this._valueItemChanged){
                this._valueItemChanged = new LatteEvent(this);
            }
            return this._valueItemChanged;
        }

        //endregion

        //region Properties
        /**
         *
         **/
        private _direction: Direction;

        /**
         * Gets or sets the direction of input.
         **/
        get direction(): Direction{
            return this._direction;
        }

        /**
         * Gets or sets the direction of input.
         **/
        set direction(value: Direction){


            if(value !== Direction.VERTICAL && value !== Direction.HORIZONTAL)
                throw new InvalidArgumentEx('value', value);

            if(value === Direction.VERTICAL){
                this.element.removeClass('horizontal').addClass('vertical');
            }else{
                this.element.removeClass('vertical').addClass('horizontal');
            }

            this._direction = value;



        }

        /**
         * Property field
         */
        private _hintItem: Item = null;

        /**
         * Gets or sets the hint item
         *
         * @returns {Item}
         */
        get hintItem(): Item{
            return this._hintItem;
        }

        /**
         * Gets or sets the hint item
         *
         * @param {Item} value
         */
        set hintItem(value: Item){

            // Check if value changed
            let changed: boolean = value !== this._hintItem;

            // Set value
            this._hintItem = value;

            // Trigger changed event
            if(changed){
                this.onHintItemChanged();
            }
        }

        /**
         * Property field
         */
        private _meta: IInput = null;

        /**
         * Gets or sets the metadata of the input
         *
         * @returns {IInput}
         */
        get meta(): IInput{
            return this._meta;
        }

        /**
         * Gets or sets the metadata of the input
         *
         * @param {IInput} value
         */
        set meta(value: IInput){

            // Check if value changed
            let changed: boolean = value !== this._meta;

            // Set value
            this._meta = value;

            // Trigger changed event
            if(changed){
                this.onMetaChanged();
            }
        }

        /**
         *
         **/
        private _name: string;

        /**
         * Gets or sets the name of the input
         **/
        get name(): string{
            return this._name;
        }

        /**
         * Gets or sets the name of the input
         **/
        set name(value: string){


            this._name = value;


        }

        /**
         * Property field
         */
        private _options: any = null;

        /**
         * Gets or sets the options of the combo or other
         *
         * @returns {any}
         */
        get options(): any{
            return this._options;
        }

        /**
         * Gets or sets the options of the combo or other
         *
         * @param {any} value
         */
        set options(value: any){

            // Check if value changed
            let changed: boolean = value !== this._options;

            // Set value
            this._options = value;

            // Trigger changed event
            if(changed){
                this.onOptionsChanged();
            }
        }

        /**
         * Property field
         */
        private _readOnly: boolean = false;

        /**
         * Gets or sets a value indicating if the input is read-only
         *
         * @returns {boolean}
         */
        get readOnly(): boolean{
            return this._readOnly;
        }

        /**
         * Gets or sets a value indicating if the input is read-only
         *
         * @param {boolean} value
         */
        set readOnly(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._readOnly;

            // Set value
            this._readOnly = value;

            // Trigger changed event
            if(changed){
                this.onReadOnlyChanged();
            }
        }

        /**
         * Property field
         */
        private _readOnlyValue: string = null;

        /**
         * Gets or sets the read-only value to show
         *
         * @returns {string}
         */
        get readOnlyValue(): string{
            return this._readOnlyValue;
        }

        /**
         * Gets or sets the read-only value to show
         *
         * @param {string} value
         */
        set readOnlyValue(value: string){

            // Check if value changed
            let changed: boolean = value !== this._readOnlyValue;

            // Set value
            this._readOnlyValue = value;

            // Trigger changed event
            if(changed){
                this.onReadOnlyValueChanged();
            }
        }

        /**
         * Property field
         */
        private _separator: boolean = false;

        /**
         * Gets or sets a value indicating if the input has a separator on bottom
         *
         * @returns {boolean}
         */
        get separator(): boolean{
            return this._separator;
        }

        /**
         * Gets or sets a value indicating if the input has a separator on bottom
         *
         * @param {boolean} value
         */
        set separator(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._separator;

            // Set value
            this._separator = value;

            // Trigger changed event
            if(changed){
                this.onSeparatorChanged();
            }
        }

        /**
         * Property field
         */
        private _text: string = null;

        /**
         * Gets or sets the text of the input
         *
         * @returns {string}
         */
        get text(): string{
            return this._text;
        }

        /**
         * Gets or sets the text of the input
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
         * Gets or sets a value indicating if the text section is visible
         **/
        get textVisible(): boolean{
            return this.textElement.is(':visible');
        }

        /**
         * Gets or sets a value indicating if the text section is visible
         **/
        set textVisible(value: boolean){


            if(value){
                this.textElement.show();
                this.element.removeClass('no-text');
            }
            else{
                this.textElement.hide();
                this.element.addClass('no-text');
            }



        }

        /**
         * Gets or sets the with of the text part. Use value lower than 1 for percentages.
         * Note that when horizontal input, layout may become affected.
         *
         * @returns {number}
         */
        get textWidth(): number{
            return this._textWidth;
        }

        /**
         * Gets or sets the with of the text part.
         * Value must be percent since it must be leveled with value part. Value size will be adjusted
         * to 5% less large than it should to avoid edge collisions.
         * Values lower than 1 accepted.
         * Note that when horizontal input, layout may become affected.
         *
         */
        set textWidth(value: number){
            this._textWidth = value;

            if(value < 0){
                this.textElement.css('width', (value * 100) + '%');
                this.valueElement.css('width', ((100 - value - 0.05) * 100) + '%');
            }else{
                this.textElement.css('width', (value) + '%');
                this.valueElement.css('width', ((value - 0.1)) + '%');
            }

            this.onLayout();
        }

        /**
         * Property field
         */
        private _type: InputType = null;

        /**
         * Gets or sets the type of the input
         *
         * @returns {InputType}
         */
        get type(): InputType{
            return this._type;
        }

        /**
         * Gets or sets the type of the input
         *
         * @param {InputType} value
         */
        set type(value: InputType){

            // Check if value changed
            let changed: boolean = value !== this._type;

            // Set value
            this._type = value;

            // Trigger changed event
            if(changed){
                this.onTypeChanged();
            }
        }

        /**
         * Gets or sets the value of the input
         **/
        get value(): any{
            return this.valueItem.value;
        }

        /**
         * Gets or sets the value of the input
         **/
        set value(value: any){

            this.valueItem.value = (value);

            this.updateReadonlyLabel();

        }

        /**
         * Property field
         */
        private _valueItem: ValueItem<any> = null;

        /**
         * Gets or sets the valueItem of the input
         *
         * @returns {ValueItem<any>}
         */
        get valueItem(): ValueItem<any>{
            return this._valueItem;
        }

        /**
         * Gets or sets the valueItem of the input
         *
         * @param {ValueItem<any>} value
         */
        set valueItem(value: ValueItem<any>){

            // Check if value changed
            let changed: boolean = value !== this._valueItem;

            // Set value
            this._valueItem = value;

            // Trigger changed event
            if(changed){
                this.onValueItemChanged();
            }
        }

        /**
         * Property field
         */
        private _valid: boolean = true;

        /**
         * Gets or sets a value indicating if the value of the item is currently valid
         *
         * @returns {boolean}
         */
        get valid(): boolean{
            return this._valid;
        }

        /**
         * Gets or sets a value indicating if the value of the item is currently valid
         *
         * @param {boolean} value
         */
        set valid(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._valid;

            // Set value
            this._valid = value;

            // Trigger changed event
            if(changed){
                this.onValidChanged();
            }
        }

        //endregion

    }
}