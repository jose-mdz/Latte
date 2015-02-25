module latte{
    /**
     *
     **/
    export class TextboxItem extends ValueItem{

        /**
         *
         **/
        private _autoGrow: boolean = true;

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
         **/
        private _maxLength: number;

        /**
         *
         **/
        private _minHeight: number;

        /**
         *
         **/
        private _multiline: boolean;

        /**
         *
         **/
        private _password: boolean;

        /**
         *
         */
        private _minLenToSuggest: number = 4 - 1;

        /**
         *
         */
        private _suggestionOverlay: SuggestionOverlay = null;

        /**
         * Index of Currently selected suggestion
         */
        private selectedIndex = -1;

        private _selectedSuggestion: Item;

        private _suggestions: Collection<Item>;

        private _loadingSuggestions: boolean = false;

        /**
         * Points to the element who receives input
         **/
        input: JQuery;

        /**
         * Points to the placeholder label
         **/
        placeholderLabel: LabelItem;

        /**
         * Points to the label on the side of textbox
         **/
        sideLabel: LabelItem;

        /**
         * Raised when user presses the enter key
         **/
        enterPressed: LatteEvent;

        /**
         * Raised when accessing the value of item.
         Returning something will override the value returned by the method
         **/
        gettingValue: LatteEvent;

        /**
         * Raised when accessing the value string of item.
         Returning something will override the value returned by the method
         **/
        gettingValueString: LatteEvent;

        /**
         * Raised when the user presses a key on the textbox
         */
        keyPress: LatteEvent;

        /**
         * Raised when a key goes down
         */
        keyDown: LatteEvent;

        /**
         * Raised when a key goes up
         */
        keyUp: LatteEvent;

        /**
         * Raised when changing the value of the item.
         * Returning a string will override the value setted to the method
         **/
        settingValue: LatteEvent;

        /**
         * Raised when time to add suggestions.
         */
        filterSuggestions: LatteEvent;

        /**
         * Initializes the item
         **/
        constructor(){

            super();

            this.element.addClass('textbox');

            // Events
            this.enterPressed = new LatteEvent(this);
            this.gettingValue = new LatteEvent(this);
            this.gettingValueString = new LatteEvent(this);
            this.keyPress = new LatteEvent(this);
            this.keyDown = new LatteEvent(this);
            this.keyUp = new LatteEvent(this);
            this.settingValue = new LatteEvent(this);
            this.filterSuggestions = new LatteEvent(this);

            // Elements
            this._inputContainer = $('<div>').addClass('input').appendTo(this.element);
            this._invisible = $('<div>').addClass('invisible').appendTo(this.element);
            this.placeholderLabel = new LabelItem();
            this.placeholderLabel.addClass('placeholder');
            this.placeholderLabel.appendTo(this);
            this.sideLabel = new LabelItem();
            this.sideLabel.addClass('side-label');
            this.sideLabel.appendTo(this);

            this._updateInput();

            UiElement.disableTextSelection(this.placeholderLabel.element);

            // Pass click to textbox
            this.placeholderLabel.element.click(() => {
                this.input.focus();
            });

        }

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
                if(evt.keyCode === Key.ENTER){
                    this.onEnterPressed();
                }
                this.setValue(this.input.val(), true);

                if(this.onKeyDown(evt) === false){
                    return false;
                }
            });

            this.input.keypress((e) => {
                this.onLayout();
                this.setValue(this.input.val(), true);
                this.onKeyPress(e);

            });

            this.input.keyup((e) => {
                this.onLayout();
                this.setValue(this.input.val(), true);
                if(this.onKeyUp(e) === false) return false;
                return true;
            });


        }

        /**
         *
         **/
        getValue(): string{

            var getter = this.onGettingValue(this.input.val());

            if(_isString(getter) || _isNumber(getter)){
                return getter;
            }
            else{
                return this.input.val() || "";
            }

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
                (<ButtonItem>item).click.add(( ) => { this.hideSuggestions() });
            }
        }

        /**
         * Raises the <c>enterPressed</c> event
         **/
        onEnterPressed(){

            this.enterPressed.raise();

        }

        /**
         * Raises the <c>filterSuggestions</c> event
         */
        onFilterSuggestions(){
            this.filterSuggestions.raise();
        }

        /**
         * Raises the <c>gettingValue</c> event
         **/
        onGettingValue(value: string): any{

            return this.gettingValue.raise(value);

        }

        /**
         * Raises the <c>gettingValueString</c> event
         **/
        onGettingValueString(value: string): any{

            return this.gettingValueString.raise(value);

        }

        /**
         * Raises the <c>keyPress</c> event
         * @param e
         */
        onKeyPress(e: JQueryEventObject){
            this.keyPress.raise(e);
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

                }else if(e.keyCode == Key.ENTER || e.keyCode == Key.TAB){

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
         * Overriden.
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
         * Raises the <c>removeSuggestion</c> event
         * @param item
         */
        onRemoveSuggestion(item: Item){
            this.suggestionOverlay.items.remove(item);
        }

        /**
         * Raises the <c>settingValue</c> event
         **/
        onSettingValue(value: string): any{

            return this.settingValue.raise(value);

        }

        /**
         * Raises the <c>valueChanged</c> event
         **/
        onValueChanged(){


            super.onValueChanged();

            this.placeholderLabel.visible = this.value.length === 0;

            if(this.value.length < this.minLengthToActivateSuggestions && this.suggestionsVisible){
                this.hideSuggestions();
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
         * Sets the value.
         Optionally it sets the value silently whitout updating the INPUT value.
         **/
        setValue(value: string, silentOnInput: boolean = false){

            var changed = value != this.input.val();
            var setter = this.onSettingValue(value);

            if(silentOnInput !== true){
                if(_isString(setter) || _isNumber(setter)){
                    this.input.val(setter);
                }
                else{
                    this.input.val(value);
                }
            }

            if(changed || silentOnInput === true){
                this.onValueChanged();
            }

            this.onLayout();

        }

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
         * Gets or sets the maximum length for input in the textbox
         **/
        get maxLength(): number{
            return this._maxLength;
        }

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
         * Gets or sets the minimum height of the textbox, if multiline
         **/
        set minHeight(value: number){


            this._minHeight = value;
            this.input.css({minHeight: value});



        }

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
         * Gets or sets the value.
         Optionally it sets the value silently whitout updating the INPUT value.
         **/
        get value(): string{
            return this.getValue();
        }

        /**
         * Gets or sets the value.
         Optionally it sets the value silently whitout updating the INPUT value.
         **/
        set value(value: string){


            this.setValue(value, false)


        }

        /**
         * Gets the value as a string
         **/
        get valueString(): string{

            var getter = this.onGettingValueString(this.value);

            if(_isString(getter) || _isNumber(getter)){
                return getter;
            }else{
                return this.value;
            }

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
    }
}