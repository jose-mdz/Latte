module latte{
    /**
     * Shows a dialog to edit the specified <c>DataRecord</c>
     **/
    export class DataRecordDialogView extends DialogView{

        //region Static

        /**
         * Shows a dialog to edit the specified record
         * @param r
         * @param onSaved
         * @param title
         */
        static editRecord(r: DataRecord, onSaved: () => any = null, title:string = ''): DataRecordDialogView{

            var d = new DataRecordDialogView(r);

            d.title = title;
            d.saved.add(onSaved);
            d.show();

            // let input = d.raw.querySelector('input');
            //
            // if(input) {
            //     setTimeout(() => (<any>input).focus());
            //
            // }

            return d;

        }

        //endregion

        /**
         *
         */
        private _readOnly: boolean;

        /**
         *
         **/
        cancelButton: ButtonItem;

        /**
         *
         **/
        formView: DataRecordFormView;

        /**
         *
         **/
        saveButton: ButtonItem;

        /**
         *
         **/
        saving: LatteEvent;

        /**
         *
         **/
        saved: LatteEvent;


        /**
         *
         **/
        constructor(record: DataRecord = null){


            super();

            var dialog = this;

            this.saving = new LatteEvent(this);
            this.saved = new LatteEvent(this);

            this.formView = new DataRecordFormView(record);

            this.saveButton = new ButtonItem()
            this.saveButton.text = strings.save;
            this.saveButton.click.add(() => { dialog.formView.saveChanges(); this.onSaved(); });
            this.cancelButton = new ButtonItem()
            this.cancelButton.text = strings.cancel;

            this.view = this.formView;
            this.items.add(this.saveButton);
            this.items.add(this.cancelButton);


        }

        /**
         * Raises the <c>saved</c> event
         **/
        onSaved(){

            this.saved.raise();

        }

        /**
         * Raises the <c>saving</c> event
         **/
        onSaving(){

            let ptr = this;
            this.formView.applyValues();
            this.record.save(function(){
                ptr.onSaved();
            });
            this.saving.raise();

        }

        /**
         * Gets or sets a value indicating if the form is for read-only
         **/
        get readOnly(): boolean{
            return this._readOnly;
        }

        /**
         * Gets or sets a value indicating if the form is for read-only
         **/
        set readOnly(value: boolean){

            this._readOnly = value;

            for(var i = 0; i < this.formView.inputs.count; i++)
                this.formView.inputs.item(i).readOnly = value;

            if(value){
                this.saveButton.visible = false;
                this.cancelButton.text = strings.close;
            }else{
                this.saveButton.visible = true;
                this.cancelButton.text = strings.cancel;
            }

        }

        /**
         * Gets the record of the view
         *
         * @returns {DataRecord}
         */
        get record(): DataRecord{
            return this.formView.record;
        }
    }
}