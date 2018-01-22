/**
 * Created by josemanuel on 8/9/16.
 */
module latte{
    export interface IEntityMeta{

        /**
         * Should give information about the fields of the entity
         */
        fields?: IInputList;

        /**
         * It's called when the form about the entity is created and fully loaded
         * @param form
         */
        onFormCreated?(form: any);

        /**
         * It's called when the form about the entity is created
         * @param form
         */
        onFormCreating?(form: any);
    }
}