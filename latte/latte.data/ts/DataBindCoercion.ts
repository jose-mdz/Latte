module latte {

    /**
     * Initialize, then call value property to obtain coerced value
     */
    export class DataBindCoercion {

        //region Static

        /**
         * Performs the coercion
         * @param value
         * @param {latte.BindValueType} sourceType
         * @param {latte.BindValueType} targetType
         * @returns {any}
         */
        static coerce(value: any, sourceType: BindValueType, targetType: BindValueType){

            // Ensure value is what type it should be
            value = DataBindCoercion.ensureType(value, sourceType);

            switch(targetType){
                case BindValueType.ANY:     return value;
                case BindValueType.STRING:
                    if(sourceType == BindValueType.DATETIME && value instanceof DateTime) {
                        return (<DateTime>value).toString();
                    }else{
                        return String(value);
                    }
                case BindValueType.BOOLEAN:
                    if(sourceType == BindValueType.NUMBER){
                        return value > 0;
                    }else{
                        return !!value;
                    }
                case BindValueType.NUMBER:
                    if(sourceType == BindValueType.BOOLEAN) {
                        return value ? 1 : 0;
                    }else{
                        return value;
                    }
                case BindValueType.DATETIME:
                    if(sourceType == BindValueType.STRING){
                        return DateTime.fromString(value);
                    }else{
                        return value;
                    }
            }
        }

        /**
         * Ensures the specified value is of the specified type
         * @param value
         * @param {latte.BindValueType} type
         */
        static ensureType(value: any, type: BindValueType){

            switch(type){
                case BindValueType.ANY:     return value;
                case BindValueType.STRING:  return String(value || '');
                case BindValueType.BOOLEAN: return !!value;
                case BindValueType.NUMBER:  return parseFloat(value || 0);
            }

            return value;
        }

        /**
         * Parses the type
         * @param {string} typeAsString
         */
        static parseType(typeAsString = ''): BindValueType{

            let s = String(typeAsString).trim().toLowerCase();

            switch (s){
                case 'html':
                case 'text':
                case 'password':
                case 'string':      return BindValueType.STRING;
                case 'record':
                case 'flags':
                case 'number':
                case 'float':
                case 'integer':     return BindValueType.NUMBER;
                case 'switch':
                case 'boolean':     return BindValueType.BOOLEAN;
                case 'date':
                case 'datetime':    return BindValueType.DATETIME;
                case 'time':        return BindValueType.TIMESPAN;
            }

            return BindValueType.ANY;

        }


        //endregion



    }

}