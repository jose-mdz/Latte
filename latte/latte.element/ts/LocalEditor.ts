module latte {

    /**
     * Allows an item to be edited in place.
     */
    export class LocalEditor{

        //region Static
        /**
         * Returns an editor that activates itself when user clicks the element
         *
         * @param {HTMLElement} element
         * @param {() => void} edited
         * @param {() => void} cancelled
         * @param {() => void} finished
         * @returns {latte.LocalEditor}
         */
        static onClick(element: HTMLElement, edited: () => void = null, cancelled: () => void = null, finished: () => void = null): LocalEditor{

            let editor = new LocalEditor(element, edited, cancelled, finished);

            element.addEventListener('click', e => {
                if(!editor.editionMode) {
                    editor.startEditMode();
                }
            });

            return editor;
        }
        //endregion

        //region Fields
        private _editingValue: boolean = false;
        private _editEventsAdded: boolean = false;
        private _oldTitle: string = null;
        //endregion

        /**
         * Creates the editor
         */
        constructor(element: HTMLElement, edited: () => void = null, cancelled: () => void = null, finished: () => void = null) {

            this._element = element;

            if(edited) {
                this.edited.add(edited);
            }

            if(cancelled) {
                this.cancelled.add(cancelled);
            }

            if(finished){
                this.finished.add(finished);
            }

        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Cancels the current edit mode, if any
         */
        cancel(){
            if(this.editionMode) {
                this.endEditMode(false);
            }
        }

        /**
         * Ends Edition Mode
         */
        endEditMode(success: boolean  = true){

            let t = this.element;

            this._editingValue = false;

            if(success && t.innerHTML != this._oldTitle) {
                this.onEdited();
            }else{
                this.onCancelled();
            }

            this.element.classList.remove('local-editor-edit-mode');
            t.setAttribute('contenteditable', 'false');
            t.removeAttribute('contenteditable');

        }

        /**
         * Raises the <c>cancelled</c> event
         */
        onCancelled(){
            if(this._cancelled){
                this._cancelled.raise();
            }
            this.onFinished();
        }

        /**
         * Raises the <c>edited</c> event
         */
        onEdited(){
            if(this._edited){
                this._edited.raise();
            }
            this.onFinished();
        }

        /**
         * Raises the <c>enabled</c> event
         */
        onEnabledChanged(){
            if(this._enabledChanged){
                this._enabledChanged.raise();
            }

            if(this.editionMode) {
                this.cancel();
            }
        }

        /**
         * Raises the <c>finished</c> event
         */
        onFinished(){
            if(this._finished){
                this._finished.raise();
            }
        }

        /**
         * Starts edit mode
         */
        startEditMode(){

            if(!this.enabled) {
                return;
            }

            // log("Starting edit mode")
            let t = this.element;

            this.element.classList.add('local-editor-edit-mode');
            t.setAttribute('contenteditable', 'true');

            if(!this._editEventsAdded) {
                this._editEventsAdded = true;

                t.addEventListener('keydown', e => {
                    if(e.keyCode == Key.ENTER || e.keyCode == Key.ESCAPE) {
                        if(this._editingValue) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            this.endEditMode(e.keyCode == Key.ENTER);
                        }

                    }
                });

                t.addEventListener('focusout', () => {
                    if(this._editingValue) {
                        this.endEditMode();
                    }

                });

            }

            this._editingValue = true;
            this._oldTitle = this.element.innerHTML;

            setTimeout(() => t.focus(), 0);
            setTimeout(() => document.execCommand('selectAll', false, null), 0);

        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _cancelled: LatteEvent;

        /**
         * Gets an event raised when the edition is cancelled
         *
         * @returns {LatteEvent}
         */
        get cancelled(): LatteEvent{
            if(!this._cancelled){
                this._cancelled = new LatteEvent(this);
            }
            return this._cancelled;
        }

        /**
         * Back field for event
         */
        private _finished: LatteEvent;

        /**
         * Gets an event raised when the edition finishes, whether it was successful or not
         *
         * @returns {LatteEvent}
         */
        get finished(): LatteEvent{
            if(!this._finished){
                this._finished = new LatteEvent(this);
            }
            return this._finished;
        }

        /**
         * Back field for event
         */
        private _edited: LatteEvent;

        /**
         * Gets an event raised when the edition succeeds
         *
         * @returns {LatteEvent}
         */
        get edited(): LatteEvent{
            if(!this._edited){
                this._edited = new LatteEvent(this);
            }
            return this._edited;
        }

        /**
         * Back field for event
         */
        private _enabledChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the enabled property changes
         *
         * @returns {LatteEvent}
         */
        get enabledChanged(): LatteEvent{
            if(!this._enabledChanged){
                this._enabledChanged = new LatteEvent(this);
            }
            return this._enabledChanged;
        }
        //endregion

        //region Properties

        /**
         * Gets a value indicating if the editor is in editing mode
         *
         * @returns {boolean}
         */
        get editionMode(): boolean {
            return this._editingValue;
        }

        /**
         * Property field
         */
        private _element: HTMLElement;

        /**
         * Gets the element to edit
         *
         * @returns {HTMLElement}
         */
        get element(): HTMLElement {
            return this._element;
        }

        /**
         * Property field
         */
        private _enabled: boolean = true;

        /**
         * Gets or sets a value indicating if the editor is enabled. A disabled editor will ignore the edition mode invocation.
         *
         * @returns {boolean}
         */
        get enabled(): boolean{
            return this._enabled;
        }

        /**
         * Gets or sets a value indicating if the editor is enabled. A disabled editor will ignore the edition mode invocation.
         *
         * @param {boolean} value
         */
        set enabled(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._enabled;

            // Set value
            this._enabled = value;

            // Trigger changed event
            if(changed){
                this.onEnabledChanged();
            }
        }

        //endregion

    }

}