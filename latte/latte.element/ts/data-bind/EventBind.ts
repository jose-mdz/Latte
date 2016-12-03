/**
 * Created by josemanuel on 5/28/15.
 */
module latte {

    /**
     *
     */
    export class EventBind {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor(element: Element<HTMLElement>, elementEvent: string, record: any, recordMethod: string) {
            this.setup(element, elementEvent, record, recordMethod);
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Sets up the bind
         * @param element
         * @param elementEvent
         * @param record
         * @param recordMethod
         */
        setup(element: Element<HTMLElement>, elementEvent: string, record: any, recordMethod: string){

            this._element = element;
            this._elementEvent = elementEvent;
            this._record = record;
            this._recordMethod = recordMethod;

            var __this = this;

            if(this.element[this.elementEvent] instanceof LatteEvent) {
                this.element[this.elementEvent].add(function(){
                    var args = [];

                    for (var i = 0; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }

                    if(_isFunction(__this.record[__this.recordMethod])) {
                        __this.record[__this.recordMethod].apply(__this.record, args);

                    }else {
                        //log(sprintf("Warning: Method %s is not present in %s", this.recordMethod, String(this.record)));
                    }

                });

            }else {
                this.element.addEventListener(this.elementEvent, function() {
                    var args = [];

                    for (var i = 0; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    if(_isFunction(__this.record[__this.recordMethod])) {
                        __this.record[__this.recordMethod].apply(__this.record, args);

                    }else {
                        //log(sprintf("Warning: Method %s is not present in %s", this.recordMethod, String(this.record)));
                    }
                })
            }

        }
        //endregion

        //region Events
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _element:Element<HTMLElement>;

        /**
         * Gets the element to bind
         *
         * @returns {Element<HTMLElement>}
         */
        get element():Element<HTMLElement> {
            return this._element;
        }

        /**
         * Property field
         */
        private _elementEvent:string;

        /**
         * Gets the element event
         *
         * @returns {string}
         */
        get elementEvent():string {
            return this._elementEvent;
        }

        /**
         * Property field
         */
        private _record:any;

        /**
         * Gets the record to bind
         *
         * @returns {any}
         */
        get record():any {
            return this._record;
        }

        /**
         * Property field
         */
        private _recordMethod:string;

        /**
         * Gets the method to execute on the record
         *
         * @returns {string}
         */
        get recordMethod():string {
            return this._recordMethod;
        }


        //endregion

    }

}