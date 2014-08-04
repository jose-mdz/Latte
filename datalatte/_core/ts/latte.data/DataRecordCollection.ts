module latte{

    /**
     * Represents a collection of records
     */
    export class DataRecordCollection extends Collection<DataRecord>{

        /**
         * Creates the collection of the specified type.
         * Optionally specifies handlers for adding and removing items, and a
         * context to call as closure of events.
         *
         * @param addCallback
         * @param removeCallback
         * @param context
         */
        constructor(addCallback: (DataRecord, number) => any = null, removeCallback: (DataRecord, number) => any = null, context: any = null){
            super(addCallback, removeCallback, context)
        }

        /**
         * Finds the record of the specified <c>id</c>
         *
         * @param id
         * @returns {null}
         */
        byId(id: number): DataRecord{
            return null;
        }

    }
}