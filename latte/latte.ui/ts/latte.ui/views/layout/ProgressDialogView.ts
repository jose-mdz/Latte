/**
 * Created by josemanuel on 6/8/16.
 */
module latte {

    /**
     *
     */
    export class ProgressDialogView extends DialogView {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();

            this.columnView.items.addArray([this.label, this.progress])

            this.view = this.columnView;
        }

        /**
         * Updates the progress of the dialog
         * @param value
         * @param status
         * @param max
         * @param min
         */
        updateProgress(value: number, status: string = null, max: number = -1, min: number = -1 ){
            this.progress.value = value;

            if(status)
            this.label.text = status;

            if(min >= 0)
            this.progress.minValue = min;

            if(max >= 0)
            this.progress.maxValue = max;
        }
        //region Private Methods
        //endregion

        //region Methods

        //endregion

        //region Events
        //endregion

        //region Properties
        /**
         * Field for columnView property
         */
        private _columnView:ColumnView;

        /**
         * Gets the column view
         *
         * @returns {ColumnView}
         */
        get columnView():ColumnView {
            if (!this._columnView) {
                this._columnView = new ColumnView(1);
            }
            return this._columnView;
        }

        /**
         * Field for label property
         */
        private _label:LabelItem;

        /**
         * Gets the label of the dialog
         *
         * @returns {LabelItem}
         */
        get label():LabelItem {
            if (!this._label) {
                this._label = new LabelItem();
            }
            return this._label;
        }

        /**
         * Field for progress property
         */
        private _progress:ProgressItem;

        /**
         * Gets the progress item
         *
         * @returns {ProgressItem}
         */
        get progress():ProgressItem {
            if (!this._progress) {
                this._progress = new ProgressItem();
            }
            return this._progress;
        }


        //endregion

    }

}