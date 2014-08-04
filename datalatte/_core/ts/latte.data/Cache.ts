module latte{

    /**
     * Saves full lists of records in Memory
     *
     * <example>
     * // Load cache of users
     * Cache.load('User', 'users');
     *
     * // After load, now we can use the users cache
     * // Cache.users is a DataRecordCollection object
     * for(var i = 0; i < Cache.users.count; i++)
     *  console.log(Cache.users.item(i));
     * </example>
     *
     */
    export class Cache{

        /**
         * Loads a cache of the specified name into cache itself.
         * @param recordType
         * @param name
         * @param callback
         * @returns {null}
         */
        load(recordType: string, name: string, callback: () =>any = null): Message{

            /*
            DataRecord.fromListing(recordType, '/', {}, function(stages){

                // Add users to cache
                latte.Cache[name] = new latte.DataRecordCollection();
                latte.Cache[name].add(stages);

                // Call callback
                if(_isFunction(callback))
                    callback.call(this);
            });*/

            return null;
        }

    }
}