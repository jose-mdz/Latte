module latte{

    export enum TextboxFilter{

        NONE,

        NUMBER,

        INTEGER

    }

    /**
     *
     **/
    export class TextboxItem extends ValueItem<string>{

        //region Static

        //endregion

        //region Fields

        /**
         *
         **/
        private _inputContainer: JQuery;

        /**
         *
         **/
        private _invisible: JQuery;

        /**
         *
         */
        private _minLenToSuggest: number = 4 - 1;

        /**
         * Index of Currently selected suggestion
         */
        private selectedIndex = -1;

        /**
         *
         */
        private _selectedSuggestion: Item;

        /**
         *
         */
        private _loadingSuggestions: boolean = false;

        /**
         * Points to the element who receives input
         **/
        input: JQuery;

        ignorePassToTextbox: boolean = false;

        //endregion

        /**
         * Initializes the item
         **/
        constructor(){

            super();

            this.element.addClass('textbox');

            // Elements
            this._inputContainer = $('<div>').addClass('input').appendTo(this.element);
            this._invisible = $('<div>').addClass('invisible').appendTo(this.element);

            this._updateInput();

        }

        //region Methods
        /**
         * Updates the input element
         **/
        private _updateInput(){

            this._inputContainer.empty();

            if(this.password){
                this.input = $('<input type=password>').appendTo(this._inputContainer);
            }else{
                if(this.multiline){
                    this.input = $('<textarea>').appendTo(this._inputContainer);
                }else{
                    this.input = $('<input type=text>').appendTo(this._inputContainer);
                }
            }

            if(this.maxLength > 0)
                this.maxLength = this.maxLength;

            this.input.click((e) => {
                e.stopPropagation();
                return false;
            });

            this.input.keydown((evt) => {

                // Allowed keys filter
                if(_isArray(this.allowedKeys)) {
                    let found = false;

                    if(!(evt.ctrlKey || evt.altKey || evt.metaKey || evt.shiftKey
                            || evt.keyCode == Key.ENTER || evt.keyCode == Key.TAB
                            || evt.keyCode == Key.ESCAPE || evt.keyCode == Key.ARROW_DOWN
                            || evt.keyCode == Key.ARROW_LEFT || evt.keyCode == Key.ARROW_RIGHT
                            || evt.keyCode == Key.ARROW_UP
                        )) {
                        // Search if key is in allowed keys
                        for(let i in this.allowedKeys){
                            if(evt.keyCode == this.allowedKeys[i]) {
                                found = true;
                                break;
                            }
                        }

                        // If not found, bye
                        if(!found) {
                            evt.preventDefault();
                            evt.stopImmediatePropagation();
                            return false;
                        }
                    }


                }


                if(evt.keyCode === Key.ENTER){
                    this.onEnterPressed();
                }
                this.setValueSilently(this.input.val());

                if(this.onKeyDown(evt) === false){
                    return false;
                }
            });

            this.input.keypress((e) => {
                this.onLayout();
                this.setValueSilently(this.input.val());
                this.onKeyPress(e);

            });

            this.input.keyup((e) => {
                this.onLayout();
                this.setValueSilently(this.input.val());
                return this.onKeyUp(e) !== false;
            });

            this.input.focus(() => {
                if(this.minLengthToActivateSuggestions == 0) {
                    this.onFilterSuggestions();
                }
            });

            this.input.blur(() => {
                this.hideSuggestions();
            })

        }

        /**
         * Hides the suggestions
         */
        hideSuggestions(){
            this.suggestionOverlay.items.clear();
            this.suggestionOverlay.close();
            this._suggestionOverlay = null;
        }

        /**
         * Raises the <c>addSuggestion</c> event
         * @param item
         */
        onAddSuggestion(item: Item){
            this.suggestionOverlay.items.add(item);

            if(item instanceof ButtonItem){
                (<ButtonItem>item).click.add(( ) =>  this.hideSuggestions() );

                item.raw.addEventListener('mousedown', e => item.onClick());
            }

        }

        /**
         * Raises the <c>enterPressed</c> event
         */
        onEnterPressed(){
            if(this._enterPressed){
                this._enterPressed.raise();
            }
        }

        /**
         * Raises the <c>filterSuggestions</c> event
         */
        onFilterSuggestions(){
            if(this._filterSuggestions){
                this._filterSuggestions.raise();
            }
        }

        /**
         * Raises the <c>keyDown</c>
         * @param e
         */
        onKeyDown(e: JQueryEventObject): any{
            this.keyDown.raise();

            if(this.suggestionsVisible){
                if(e.keyCode == Key.ARROW_UP){
                    this.selectPreviousSuggestion();
                    e.stopImmediatePropagation();
                    return false;

                }else if(e.keyCode == Key.ARROW_DOWN){
                    this.selectNextSuggestion();
                    e.stopImmediatePropagation();
                    return false;

                }else if(e.keyCode == Key.ENTER /*|| e.keyCode == Key.TAB*/){

                    if(this._selectedSuggestion instanceof ButtonItem){
                        (<ButtonItem>this._selectedSuggestion).onClick();
                    }
                    e.stopImmediatePropagation();
                    return false;

                }else if(e.keyCode == Key.ESCAPE){
                    this.hideSuggestions();
                    e.stopImmediatePropagation();
                    return false;
                }
            }
        }

        /**
         * Raises the <c>keyUp</c>
         * @param e
         */
        onKeyUp(e: JQueryEventObject): any{
            this.keyUp.raise();

            if(e.keyCode != Key.ARROW_DOWN && e.keyCode != Key.ARROW_UP
                && e.keyCode != Key.TAB && e.keyCode != Key.ENTER && e.keyCode != Key.ESCAPE){

                if(!this._loadingSuggestions){

                    if(this.value.length >= this.minLengthToActivateSuggestions){
                        this._loadingSuggestions = true;
                        setInterval(() => { this._loadingSuggestions = false }, 1000);
                        this.onFilterSuggestions();
                    }else{
                        this.hideSuggestions();
                    }

                }
            }

        }

        /**
         * Raises the <c>keyPress</c> event
         */
        onKeyPress(e){
            if(this._keyPress){
                return this._keyPress.raise(e);
            }
        }

        /**
         * Override.
         **/
        onLayout(){

            super.onLayout();

            //this.width(this.element.width() - 12);

            if(this.multiline && this.autoGrow && this.input){
                this._invisible
                    .width(this.input.width())
                    .text(this.input.val() + '.');

                this.input.height(Math.max(13, this._invisible.height()));
            }

        }

        /**
         * Raises the <c>readOnly</c> event
         */
        onReadOnlyChanged(){
            if(this._readOnlyChanged){
                this._readOnlyChanged.raise();
            }

            if(this.readOnly) {
                this.input.attr('readonly', 'yes');
            }else {
                this.input.removeAttr('readonly');
            }
        }

        /**
         * Raises the <c>removeSuggestion</c> event
         * @param item
         */
        onRemoveSuggestion(item: Item){
            this.suggestionOverlay.items.remove(item);
        }

        /**
         * Raises the <c>valid</c> event
         */
        onValidChanged(){
            if(this._validChanged){
                return this._validChanged.raise();
            }
            this.ensureClass('invalid', !this.valid);
        }

        /**
         * Override
         **/
        onValueChanged(){

            super.onValueChanged();

            // log(`Value changed: ${this.value} Ignore:${this.ignorePassToTextbox}`);

            // Pass value to textbox
            if(this.ignorePassToTextbox) {
                this.ignorePassToTextbox = false;
            }else {
                this.input.val(this.value);
            }

            if(this._placeholderLabel) {
                this.placeholderLabel.visible = this.value.length === 0;
            }

            if(this.value.length < this.minLengthToActivateSuggestions && this.suggestionsVisible){
                this.hideSuggestions();
            }

            if(this.validationRegex && String(this.value).length > 0) {
                this.valid = this.validationRegex.test(this.value);
            }
        }

        /**
         * Selects the first item of suggestions
         */
        selectFirstSuggestion(){
            this.selectSuggestion(0);
        }

        /**
         * Selects the next suggestion (if possible)
         */
        selectNextSuggestion(){
            if(this.suggestionsVisible && this.selectedIndex < this._suggestionOverlay.items.length){
                this.selectSuggestion(this.selectedIndex + 1);
            }
        }

        /**
         * Selects the previous suggestion (if possible)
         */
        selectPreviousSuggestion(){
            if(this.suggestionsVisible && this.selectedIndex > 0){
                this.selectSuggestion(this.selectedIndex - 1);
            }
        }

        /**
         * Selects the specified suggestion from list
         * @throws Exception if index is out of range
         * @param index
         */
        selectSuggestion(index: number){
            if(this.suggestionsVisible){
                if(index < 0 || index >= this._suggestionOverlay.items.length){
                    throw new Ex();
                }

                for(var i = 0; i < this._suggestionOverlay.items.length; i++){
                    var b: ButtonItem = (<ButtonItem>this._suggestionOverlay.stack.items[i]);
                    b.checked = i == index;
                    if(i == index) this._selectedSuggestion = b;
                }

                this.selectedIndex = index;

            }else{
                this.selectedIndex = -1;
            }
        }

        /**
         * Sets the width as a percentage. Dont forget to include '%' after size
         **/
        setRelativeWidth(width: string){

            this.input.css('width', width);

        }

        /**
         * Sets the side label as a "clear text" button, with the specified button
         * @param icon
         */
        setSideAsCleaner(icon: IconItem = null){
            if(!icon){
                icon = IconItem.standard(8, 10);
            }

            this.sideLabel.tooltip = strings.clearText;
            this.sideLabel.css('cursor', 'pointer');
            this.sideLabel.element.click(() => { this.value = '' });

            this.valueChanged.add(() => {
                if(this.value.length > 0){
                    this.sideLabel.icon = icon;
                }else{
                    this.sideLabel.icon = null;
                }
            });
        }

        /**
         * Sets the value silently without updating the textbox
         * @param value
         */
        setValueSilently(value: string){
            this.ignorePassToTextbox = true;
            this.value = value;
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _enterPressed: LatteEvent;

        /**
         * Gets an event raised when user presses the enter key
         *
         * @returns {LatteEvent}
         */
        get enterPressed(): LatteEvent{
            if(!this._enterPressed){
                this._enterPressed = new LatteEvent(this);
            }
            return this._enterPressed;
        }

        /**
         * Back field for event
         */
        private _filterSuggestions: LatteEvent;

        /**
         * Gets an event raised when its time to add suggestins
         *
         * @returns {LatteEvent}
         */
        get filterSuggestions(): LatteEvent{
            if(!this._filterSuggestions){
                this._filterSuggestions = new LatteEvent(this);
            }
            return this._filterSuggestions;
        }

        /**
         * Back field for event
         */
        private _keyPress: LatteEvent;

        /**
         * Gets an event raised when the user presses a key on the input
         *
         * @returns {LatteEvent}
         */
        get keyPress(): LatteEvent{
            if(!this._keyPress){
                this._keyPress = new LatteEvent(this);
            }
            return this._keyPress;
        }

        /**
         * Back field for event
         */
        private _keyDown: LatteEvent;

        /**
         * Gets an event raised when a key is pressed
         *
         * @returns {LatteEvent}
         */
        get keyDown(): LatteEvent{
            if(!this._keyDown){
                this._keyDown = new LatteEvent(this);
            }
            return this._keyDown;
        }

        /**
         * Back field for event
         */
        private _keyUp: LatteEvent;

        /**
         * Gets an event raised when the key is released
         *
         * @returns {LatteEvent}
         */
        get keyUp(): LatteEvent{
            if(!this._keyUp){
                this._keyUp = new LatteEvent(this);
            }
            return this._keyUp;
        }

        /**
         * Back field for event
         */
        private _readOnlyChanged: LatteEvent

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

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _allowedKeys: Key[] = null;

        /**
         * Gets or sets the allowed keys of the keyboard
         *
         * @returns {Key[]}
         */
        get allowedKeys(): Key[] {
            return this._allowedKeys;
        }

        /**
         * Gets or sets the allowed keys of the keyboard
         *
         * @param {Key[]} value
         */
        set allowedKeys(value: Key[]) {
            this._allowedKeys = value;
        }

        /**
         *
         **/
        private _autoGrow: boolean = true;

        /**
         * Gets or sets a value indicating if the textbox height should grow automatically
         to adjust to fit its text
         **/
        get autoGrow(): boolean{
            return this._autoGrow;
        }

        /**
         * Gets or sets a value indicating if the textbox height should grow automatically
         to adjust to fit its text
         **/
        set autoGrow(value: boolean){


            this._autoGrow = value;


        }

        /**
         * Property field
         */
        private _filter: TextboxFilter = null;

        /**
         * Gets or sets the filter for input
         *
         * @returns {TextboxFilter}
         */
        get filter(): TextboxFilter {
            return this._filter;
        }

        /**
         * Gets or sets the filter for input
         *
         * @param {TextboxFilter} value
         */
        set filter(value: TextboxFilter) {
            this._filter = value;

            let navs = [Key.ARROW_LEFT, Key.ARROW_RIGHT, Key.TAB,
                Key.SHIFT, Key.ALT, Key.DELETE, Key.BACKSPACE];
            let numbers = [Key.NUMBER_0, Key.NUMBER_1, Key.NUMBER_2, Key.NUMBER_3, Key.NUMBER_4, Key.NUMBER_5,
                Key.NUMBER_6, Key.NUMBER_7, Key.NUMBER_8, Key.NUMBER_9, Key.NUMPAD_0, Key.NUMPAD_1, Key.NUMPAD_2,
                Key.NUMPAD_3, Key.NUMPAD_4, Key.NUMPAD_5, Key.NUMPAD_6, Key.NUMPAD_7, Key.NUMPAD_8, Key.NUMPAD_9];
            let period = [Key.PERIOD];
            let comma = [Key.COMMA];

            if(value && value == TextboxFilter.NUMBER) {
                this.allowedKeys = navs.concat(numbers).concat(period).concat(comma);

            }else if(value && value == TextboxFilter.INTEGER) {
                this.allowedKeys = navs.concat(numbers);
            }

        }

        /**
         * Gets or sets the maximum length for input in the textbox
         **/
        get maxLength(): number{
            return this._maxLength;
        }

        /**
         *
         **/
        private _maxLength: number;

        /**
         * Gets or sets the maximum length for input in the textbox
         **/
        set maxLength(value: number){


            if(!_isNumber(value))
                throw new InvalidArgumentEx('value');

            this._maxLength = value;
            if(value > 0)
                this.input.attr('maxlength', value);



        }

        /**
         * Gets or sets the minimum height of the textbox, if multiline
         **/
        get minHeight(): number{
            return this._minHeight;
        }

        /**
         * Gets or sets the minimum length of text to activate suggestions
         * @param value
         */
        get minLengthToActivateSuggestions(): number{
            return this._minLenToSuggest;
        }

        /**
         * Gets or sets the minimum length of text to activate suggestions
         * @param value
         */
        set minLengthToActivateSuggestions(value: number){
            this._minLenToSuggest = value;
        }

        /**
         *
         **/
        private _minHeight: number;

        /**
         * Gets or sets the minimum height of the textbox, if multiline
         **/
        set minHeight(value: number){


            this._minHeight = value;
            this.input.css({minHeight: value});



        }

        /**
         *
         **/
        private _multiline: boolean;

        /**
         * Gets or sets a value indicating if the textbox can be multiline
         **/
        get multiline(): boolean{
            return this._multiline;
        }

        /**
         * Gets or sets a value indicating if the textbox can be multiline
         **/
        set multiline(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            this._multiline = value;
            this._updateInput();




        }

        /**
         *
         **/
        private _password: boolean;

        /**
         * Gets or sets a value indicating if the textbox accepts passwords
         **/
        get password(): boolean{
            return this._password;
        }

        /**
         * Gets or sets a value indicating if the textbox accepts passwords
         **/
        set password(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            this._password = value;
            this._updateInput();




        }

        /**
         * Gets or sets the placeholder text of textbox
         **/
        get placeholder(): string{
            return this.placeholderLabel.text;
        }

        /**
         * Gets or sets the placeholder text of textbox
         **/
        set placeholder(value: string){


            this.placeholderLabel.text = value;



        }

        /**
         * Property field
         */
        private _readOnly: boolean = false;

        /**
         * Gets or sets a value indicating if the textbox should be read-only
         *
         * @returns {boolean}
         */
        get readOnly(): boolean{
            return this._readOnly;
        }

        /**
         * Gets or sets a value indicating if the textbox should be read-only
         *
         * @param {boolean} value
         */
        set readOnly(value: boolean){

            // Check if value changed
            var changed: boolean = value !== this._readOnly;

            // Set value
            this._readOnly = value;

            // Trigger changed event
            if(changed){
                this.onReadOnlyChanged();
            }
        }

        /**
         *
         */
        private _suggestions: Collection<Item>;

        /**
         * Gets the collection of suggestions for autocompletion
         *
         * @returns {Collection<Item>}
         */
        get suggestions(): Collection<Item>{
            if(!this._suggestions){
                this._suggestions = new Collection<Item>(this.onAddSuggestion, this.onRemoveSuggestion, this);
            }

            return this._suggestions;
        }

        /**
         * Gets a value indicating if the suggestions list is currently visible
         * @returns {boolean}
         */
        get suggestionsVisible(): boolean{
            return this._suggestionOverlay instanceof Overlay;
        }

        /**
         * Property field
         */
        private _valid: boolean = true;

        /**
         * Gets or sets a value indicating if the control is valid
         *
         * @returns {boolean}
         */
        get valid(): boolean{
            return this._valid;
        }

        /**
         * Gets or sets a value indicating if the control is valid
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

        /**
         * Property field
         */
        private _validationRegex: RegExp = null;

        /**
         * Gets or sets the regular expression for validating content
         *
         * @returns {RegExp}
         */
        get validationRegex(): RegExp {
            return this._validationRegex;
        }

        /**
         * Gets or sets the regular expression for validating content
         *
         * @param {RegExp} value
         */
        set validationRegex(value: RegExp) {
            this._validationRegex = value;
        }

        /**
         * Gets or sets the width of the textbox.
         **/
        get width(): number{
            return this.input.width();
        }

        /**
         * Gets or sets the width of the textbox.
         **/
        set width(value: number){

            // Width considering padding and border
            this.input.width(value - Math.abs(this.input.width() - this.input.outerWidth()));

        }

        //endregion

        //region Components

        /**
         * Field for placeHolerLabel property
         */
        private _placeholderLabel: LabelItem;

        /**
         * Gets the placeholder label
         *
         * @returns {LabelItem}
         */
        get placeholderLabel(): LabelItem {
            if (!this._placeholderLabel) {
                this._placeholderLabel = new LabelItem();
                this._placeholderLabel.addClass('placeholder');
                this._placeholderLabel.appendTo(this);
                this._placeholderLabel.addEventListener('click', () => this.input.focus());
                UiElement.disableTextSelection(this.placeholderLabel.element);
            }
            return this._placeholderLabel;
        }

        /**
         * Field for sideLabel property
         */
        private _sideLabel: LabelItem;

        /**
         * Gets the side label
         *
         * @returns {LabelItem}
         */
        get sideLabel(): LabelItem {
            if (!this._sideLabel) {
                this._sideLabel = new LabelItem();
                this._sideLabel.addClass('side-label');
                this._sideLabel.appendTo(this);
            }
            return this._sideLabel;
        }

        /**
         *
         */
        private _suggestionOverlay: SuggestionOverlay = null;

        /**
         * Gets the suggestions overlay
         */
        get suggestionOverlay(): SuggestionOverlay{
            if(!this._suggestionOverlay){
                this._suggestionOverlay = new SuggestionOverlay();
//                this._suggestionOverlay.parent = this;
                this._suggestionOverlay.element.appendTo('body');

                /**
                 * Show suggestions when more than one
                 */
                this._suggestionOverlay.stack.items.addItem.add(() => {
                    if(this._suggestionOverlay.stack.items.length > 0){
                        this._suggestionOverlay.showAtSide(Side.BOTTOM, this);
                    }

                    if(this._suggestionOverlay.items.length == 1){
                        this.selectFirstSuggestion();
                    }
                });

                this._suggestionOverlay.stack.items.removeItem.add(() => {
                    if(this._suggestionOverlay.stack.items.length == 0){
                        this.hideSuggestions();
                    }
                });
            }

            return this._suggestionOverlay;
        }

        //endregion

    }
}