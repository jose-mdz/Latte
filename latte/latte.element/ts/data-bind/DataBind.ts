/**
 * Created by josemanuel on 5/28/15.
 */
module latte {

    /**
     * Types of binding
     */
    export enum DataBindType{
        /**
         * Will listen for changes on both the element and the record.
         */
        AUTO = 1,

        /**
         * Will listen for changes only on the record property in order to call apply()
         * @type {number}
         */
        AUTO_APPLY = 2,

        /**
         * Will listen for changes only on the element, in order to call commit()
         * @type {number}
         */
        AUTO_COMMIT = 3,

        /**
         * Will not listen for any changes. User must call apply() and commit() manually.
         * @type {number}
         */
        MANUAL = 4,
    }

    /**
     * Binds the property of an object to the property of an element
     */
    export class DataBind {

        //region Static
        //endregion

        //region Fields
        private lastElement: Element<HTMLElement>;
        private lastRecord: any;
        private lastElementListener: any;
        private lastElementEvent: any;
        private lastRecordListener: any;
        private lastRecordEvent: any;
        //endregion

        /**
         * Creates and automatically sets up the binding
         */
        constructor(
            element: Element<HTMLElement>,
            elementProperty: string,
            record: any,
            recordProperty: string,
            type: DataBindType = DataBindType.AUTO,
            dataAdapter: DataAdapter<any, any> = null,
            elementEvent: string = null,
            recordEvent: string = null
        ) {

            if(dataAdapter) {
                this.dataAdapter = dataAdapter;
            }

            this.setup(element, elementProperty, record, recordProperty, type, elementEvent, recordEvent);
        }

        //region Private Methods

        /**
         * Sets up the listeners, removes previous listeners and applies the binding for the first time.
         */
        setup(
            element: Element<HTMLElement>,
            elementProperty: string,
            record: any,
            recordProperty: string,
            type: DataBindType = DataBindType.MANUAL,
            elementEvent: string = null,
            recordEvent: string = null
        ){

            this._element = element;
            this._elementProperty = elementProperty;
            this._record = record;
            this._recordProperty = recordProperty;
            this._elementEvent = elementEvent;
            this._recordEvent = recordEvent;
            this._type = type;

            this.uninstall();

            if(this.type == DataBindType.AUTO || this.type == DataBindType.AUTO_COMMIT) {

                if(this.element instanceof Element && _isString(this.elementEvent)) {
                    this.lastElement = this.element;
                    this.lastElementEvent = this.elementEvent;
                    this.lastElementListener = () => {this.commit()}

                    // Obtain when element changes
                    this.element.addEventListener(this.elementEvent, this.lastElementListener);
                }else {
                    log(sprintf("Warning: Binding -> commit not possible (Element: %s; %s; elementProperty: %s; recordProperty: %s).",
                        String(this.element), String(this.record), String(this.elementProperty), String(this.recordProperty)));
                }

            }

            if(this.type == DataBindType.AUTO || this.type == DataBindType.AUTO_APPLY) {

                if(this.record && _isString(this.recordEvent) && this.record[this.recordEvent]) {

                    this.lastRecord = this.record;
                    this.lastRecordEvent = this.recordEvent;
                    this.lastRecordListener = () => {this.apply()};

                    // Apply when data on record changes
                    this.record[this.recordEvent].add(this.lastRecordListener);
                }else {

                    if(!_undef(this.record[this.recordProperty])){
                        //log(sprintf("Warning: Binding -> apply not possible (Element: %s; Record: %s; elementProperty: %s; recordProperty: %s).",
                           // String(this.element), String(this.record), String(this.elementProperty), String(this.recordProperty)));
                    }
                }


            }

            this.apply();

        }

        /**
         * Uninstalls the last assigned listeners
         */
        uninstall(){
            if(this.lastElementListener) {
                this.lastElement.element.removeEventListener(this.lastElementEvent, this.lastElementListener);
            }

            if(this.lastRecordListener) {
                this.lastRecord[this.lastRecordEvent].remove(this.lastRecordListener);
            }
        }

        //endregion

        //region Methods

        /**
         * Applies the data of the record to the elements property
         */
        apply(){

            var value = this.record[this.recordProperty];

            //Is this all right? value will be only applied when value is not undefined
            if(!_undef(value)) {
                this.element[this.elementProperty] = this.dataAdapter.adaptForElement(value);
            }

            this.onApplied();
        }

        /**
         * Raises the <c>applied</c> event
         */
        onApplied(){
            if(this._applied){
                this._applied.raise();
            }
        }

        /**
         * Obtains the data from the element and sends it to the record
         */
        commit(){

            this.record[this.recordProperty] = this.dataAdapter.adaptForRecord(this.element[this.elementProperty]);

            this.onCommitted();
        }

        /**
         * Raises the <c>committed</c> event
         */
        onCommitted(){
            if(this._committed){
                this._committed.raise();
            }
        }

        //endregion

        //region Events


        /**
         * Back field for event
         */
        private _applied: LatteEvent;

        /**
         * Gets an event raised when the data of the record is applied to the element
         *
         * @returns {LatteEvent}
         */
        get applied(): LatteEvent{
            if(!this._applied){
                this._applied = new LatteEvent(this);
            }
            return this._applied;
        }

        /**
         * Back field for event
         */
        private _committed: LatteEvent;

        /**
         * Gets an event raised when the binding is returned from the element to the record
         *
         * @returns {LatteEvent}
         */
        get committed(): LatteEvent{
            if(!this._committed){
                this._committed = new LatteEvent(this);
            }
            return this._committed;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _dataAdapter:DataAdapter<any, any> = null;

        /**
         * Gets or sets the data adapter of the bind
         *
         * @returns {DataAdapter<any, any>}
         */
        get dataAdapter():DataAdapter<any, any> {
            if(!this._dataAdapter) {
                this._dataAdapter = new DefaultDataAdapter();
            }
            return this._dataAdapter;
        }

        /**
         * Gets or sets the data adapter of the bind
         *
         * @param {DataAdapter<any, any>} value
         */
        set dataAdapter(value:DataAdapter<any, any>) {
            this._dataAdapter = value;
        }

        /**
         * Property field
         */
        private _element:Element<HTMLElement> = null;

        /**
         * Gets or sets the binded element
         *
         * @returns {Element}
         */
        get element():Element<HTMLElement> {
            return this._element;
        }

        /**
         * Property field
         */
        private _elementEvent:string = null;

        /**
         * Gets or sets the event that will trigger obtain on change
         *
         * @returns {string}
         */
        get elementEvent():string {
            return this._elementEvent;
        }

        /**
         * Property field
         */
        private _elementProperty:string = null;

        /**
         * Gets or sets the property of the element to bind
         *
         * @returns {string}
         */
        get elementProperty():string {
            return this._elementProperty;
        }

        /**
         * Property field
         */
        private _record:any = null;

        /**
         * Gets or sets the record to bind
         *
         * @returns {any}
         */
        get record():any {
            return this._record;
        }

        /**
         * Property field
         */
        private _recordEvent:string = null;

        /**
         * Gets or sets the name of the event that detonates a change in the record
         *
         * @returns {string}
         */
        get recordEvent():string {
            return this._recordEvent;
        }

        /**
         * Property field
         */
        private _recordProperty:string = null;

        /**
         * Gets or sets the property of the record to bind
         *
         * @returns {string}
         */
        get recordProperty():string {
            return this._recordProperty;
        }

        /**
         * Property field
         */
        private _type:DataBindType;

        /**
         * Gets the type of binding
         *
         * @returns {DataBindType}
         */
        get type():DataBindType {
            return this._type;
        }

        //endregion

    }

}