/**
 * Created by josemanuel on 5/28/15.
 */
module latte {

    /**
     *
     */
    export class ElementCollection extends Collection<Element<HTMLElement>> {

        //region Static

        /**
         * Creates the collection from the specified NodeList
         * @param list
         * @returns {latte.ElementCollection}
         */
        static fromNodeList(list: NodeList): ElementCollection{
            let collection = new ElementCollection();

            for (let i = 0; i < list.length; i++) {
                ((node:any) => {
                    if(node['latte-element-instance'] instanceof Element) {
                        collection.add(<Element<HTMLElement>>node['latte-element-instance']);
                    }
                })(list[i]);
            }

            return collection;
        }

        /**
         * Creates an array of elements of the specified base class, binds them to the specified array of records
         * and returns them as a ElementCollection
         *
         * @param array
         * @param baseClass
         * @returns {latte.ElementCollection}
         */
        static fromBindArray(array: any[], baseClass: Function): ElementCollection{
            var collection = new ElementCollection();

            for (var i = 0; i < array.length; i++) {
                ((object:any) => {

                    var c: any = baseClass;
                    var element = <Element<HTMLElement>>(new c);
                    element.bind(object);
                    collection.add(element);

                })(array[i]);
            }

            return collection;
        }

        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Adds an event listener to the elements in the collection
         * @param event
         * @param handler
         * @param capture
         */
        addEventListener(event: string, handler: (item: Element<HTMLElement>, e?: any) => any, capture: boolean = false){

            this.each((e: Element<HTMLElement>) => {
                e.addEventListener(event, function(evt){

                    var args = [e, evt];

                    for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);

                    handler.apply(e, args);

                }, capture);
            });

        }

        /**
         * Adds the specified class to the class list of the elements in the collection
         * @param className
         */
        addClass(className: string){
            this.each((e: Element<HTMLElement>) => {
                e.addClass(className);
            });
        }

        /**
         * Clears all the children of the elements in the collection
         */
        clear(){
            this.each((e: Element<HTMLElement>) => {
                e.clear();
            });
        }

        /**
         * Fades in the elements in the collection
         * @param duration
         * @param callback
         */
        fadeIn(duration: number = 0.1, callback: () => any = null){

            this.each((e: Element<HTMLElement>) => {
                e.fadeIn(duration, callback);
            });

        }

        /**
         * Fades out the elements in the collection
         * @param duration
         * @param callback
         */
        fadeOut(duration: number = 0.1, callback: () => any = null){
            this.each((e: Element<HTMLElement>) => {
                e.fadeOut(duration, callback);
            });
        }

        /**
         * Adds an event handler to the elements in the collection
         * @param context
         * @param event
         * @param f
         */
        handle(context: any, event: string, f: Function){
            this.each((e: Element<HTMLElement>) => {
                e.handle(context, event, f);
            });
        }

        /**
         * Removes the specified class to the class list of elements in the collection
         *
         * @param className
         */
        removeClass(className: string){
            this.each((e: Element<HTMLElement>) => {
                e.removeClass(className);
            });
        }

        /**
         * Sets the attribute of the elements
         * @param property
         * @param value
         */
        setAttribute(att: string, value: any){
            this.each((e: Element<HTMLElement>) => {
                e.element.setAttribute(att, value);
            });
        }

        /**
         * Sets the property of the elements
         * @param property
         * @param value
         */
        setProperty(property: string, value: any){
            this.each((e: Element<HTMLElement>) => {
                e[property] = value;
            });
        }

        /**
         * Sets the visibility of the elements in the collection
         * @param visible
         */
        setVisible(visible: boolean){
            this.each((e: Element<HTMLElement>) => {
                e.visible = visible;
            });
        }

        //endregion

        //region Events
        //endregion

        //region Properties
        //endregion

    }

}