/**
 * Created by josemanuel on 10/14/16.
 */
module latte {

    /**
     *
     */
    export class ElementDialog extends Element<HTMLDivElement> {

        //region Static
        /**
         * Shows a dialog for the specified element
         * @param element
         */
        static showElement(element: Element<HTMLElement>): ElementDialog{
            let d = new ElementDialog(element);
            d.show();
            return d;
        }
        //endregion

        //region Fields
        //endregion

        /**
         * Creates a dialog
         */
        constructor(content: Element<HTMLElement>) {
            super(document.createElement('div'));
            this.addClass('element-dialog');
            this.content = content;
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Closes the dialog
         */
        close(){
            this.removeFromParent();
        }

        /**
         * Raises the <c>content</c> event
         */
        onContentChanged(){
            if(this._contentChanged){
                this._contentChanged.raise();
            }

            // Empty me
            this.clear();

            // Append
            if(this.content) {
                this.add(this.content);
            }
        }

        /**
         * Shows the dialog
         */
        show(){
            document.body.appendChild(this.element);
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _contentChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the content property changes
         *
         * @returns {LatteEvent}
         */
        get contentChanged(): LatteEvent{
            if(!this._contentChanged){
                this._contentChanged = new LatteEvent(this);
            }
            return this._contentChanged;
        }
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _content: Element<HTMLElement> = null;

        /**
         * Gets or sets the content of the dialog
         *
         * @returns {Element<HTMLElement>}
         */
        get content(): Element<HTMLElement>{
            return this._content;
        }

        /**
         * Gets or sets the content of the dialog
         *
         * @param {Element<HTMLElement>} value
         */
        set content(value: Element<HTMLElement>){

            // Check if value changed
            let changed: boolean = value !== this._content;

            // Set value
            this._content = value;

            // Trigger changed event
            if(changed){
                this.onContentChanged();
            }
        }
        //endregion

    }

}