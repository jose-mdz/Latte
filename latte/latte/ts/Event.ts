module latte{

    export class EventHandler{

        constructor(public handler: Function, public context: any){

        }

    }

    /**
     * Manages events and event handlers
     */
    export class LatteEvent{

        public handlers: Array<EventHandler> = [];

        /**
         * Raised when a handler is added to the event
         */
        public _handlerAdded: LatteEvent;

        /**
         *
         * @param context Context where
         */
        constructor(public context: any){

        }

        /**
         * Gets the event for handler adding
         *
         * @returns {LatteEvent}
         */
        get handlerAdded(): LatteEvent{
            if(!this._handlerAdded){
                this._handlerAdded = new latte.LatteEvent(this);
            }
            return this._handlerAdded;
        }

        /**
         * Adds a handler to the event
         * @param handler
         */
        add(handler: Function, context: any = null){

//            var c = context === null ? this.context : context;

            this.handlers.push(new EventHandler(handler, context));

            this.onHandlerAdded(handler);
        }

        /**
         * Raises the <c>handlerAdded</c> event
         * @param handler
         */
        onHandlerAdded(handler: Function){
            this.handlerAdded.raise(handler);
        }

        /**
         * Raises the actual event handlers.
         * @param parameter
         * @returns {*}
         */
        raise(...parameter: any[]): any{

            var args = arguments;

            // Call each handler
            for(var i = 0; i < this.handlers.length; i++){

                var evh = this.handlers[i];

                if(!evh.handler) continue;

                var result: any = evh.handler.apply(evh.context || this.context, args);

                if(typeof result == 'boolean'){
                    return result;
                }
            }
        }

        /**
         * Removes the specified handler
         * @param {Function} handler
         */
        remove(handler: Function){

            let index = -1;

            this.handlers.forEach((h, i) => {
                if(h.handler == handler){
                    index = i;
                }
            });

            if(index >= 0) {
                this.handlers.splice(index, 1);
            }
        }

    }
}