/**
 * Created by josemanuel on 5/2/16.
 */
module latte {

    /**
     *
     */
    export interface IDataRecordCustomForm{

        //region Methods

        onFormCreated?(form:DataRecordFormItem);

        onFormCreating?(form:DataRecordFormItem);

        //endregion



    }

}