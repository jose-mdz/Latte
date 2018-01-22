module latte{

    /**
     * Value item for files. Value of item is an array of system File objects.
     */
    export class FileValueItem extends ValueItem<string>{

        fileInput: JQuery;

        constructor(){
            super();
            this.addClass('file');

            this.resetInput();
        }

        /**
         * Gets an array of selected files
         *
         * @returns {Array<File>}
         */
        getValue(): Array<File>{
            return this.fileInput.get(0).files;
        }

        /**
         * Resets the input field
         */
        resetInput(){
            this.fileInput = $('<input multiple type="file">').appendTo(this.element.empty());

            this.fileInput.change(() => {
                this.onValueChanged();
            });
        }

        /**
         * Sets the value. This is ignored since UA won't allow it.
         *
         * @param value
         */
        setValue(value: string, silently: boolean = false){
            // Ignore. Files cannot be set
        }

    }

}