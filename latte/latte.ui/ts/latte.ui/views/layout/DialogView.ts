module latte{
    /**
     * Shows a resizable dialog
     **/
    export class DialogView extends View {

        //region Static

        private static initialized: boolean;



        /**
         * Initialize handlers at global level
         **/
        private static _initialize() {

            let f = DialogView;

            // Check if not already initialized
            if (!_undef(f.initialized) && f.initialized) return;

            // Flag as initialized
            f.initialized = true;

            $(window)
                .keydown(function (e) {

                    let modal: DialogView = (View.modalView instanceof DialogView) ? <DialogView>View.modalView : null;
                    modal = modal instanceof DialogView ? modal : null;

                    if (e.keyCode == Key.ESCAPE) {
                        if (modal && modal.closeable)
                            (modal).close();

                    } else if (e.keyCode == Key.ENTER) {
                        if (
                            modal // There's a modal
                            && modal.defaultButton  // Has a default button
                            && modal.defaultButton.enabled // Default button is enabled
                            && document.activeElement['tagName'] != 'TEXTAREA' // And focused element is not a textarea (enter is for new lines)
                            && !modal.defaultButtonHandled
                            && !modal.isClosed
                        ){
                            modal.defaultButtonHandled = true;
                            log(`triggering click`);
                            modal.defaultButton.onClick();
                        }
                    }
                });


            // log("DialogView Inited")
        }

        /**
         * Shows an alert <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static alert(message:string, description:string = '', items:Array<Item> = null):DialogView {


            if (!_isString(message)) throw new InvalidArgumentEx('message', message);
            description = description || '';

            let m = new MessageView();

            // Prepare message
            m.message = message;

            // Prepare description
            if (!_undef(description)) m.description = description;

            m.iconAlert();

            if(!items) {
                items = [new ButtonItem(strings.ok)];
            }

            return DialogView.showMessage(m, items);

        }

        /**
         * Shows a question <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static ask(message:string, description:string = '', items:Array<Item> = null):DialogView {


            if (!_isString(message)) throw new InvalidArgumentEx('message', message);
            if (!_undef(description) && !_isString(description)) throw new InvalidArgumentEx('description', description);

            var m = new MessageView();

            // Prepare message
            m.message = message;

            // Prepare description
            if (!_undef(description)) m.description = description;

            m.iconQuestion();

            return DialogView.showMessage(m, items);

        }

        /**
         * Shows a question MessageView asking form deletion confirmation of the specified object
         * @param objectName
         * @param callback
         */
        static confirmDelete(objectName: string, callback: () => any){

            DialogView.ask(sprintf(strings.confirmDeleteS, objectName), strings.cantBeUndone, [
                new ButtonItem(sprintf(strings.yesDeleteS, objectName), null, () => { callback() }),
                new ButtonItem(strings.cancel)
            ])

        }

        /**
         * Shows an error <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static error(message:string, description:string = '', items:Array<Item> = null):DialogView {


            if (!_undef(description) && !_isString(description)) throw new InvalidArgumentEx('description', description);

            var m = new MessageView();

            // Prepare message
            m.message = (message || "");

            // Prepare description
            if (!_undef(description)) m.description = description;

            m.iconError();

            return DialogView.showMessage(m, items);

        }

        /**
         * Shows an information <c>MessageView</c> on a <c>DialogView</c> with the specified <c>message</c> and <c>description</c>
         **/
        static inform(message:string, description:string = '', items:Array<Item> = null):DialogView {


            if (!_isString(message)) throw new InvalidArgumentEx('message', message);
            description = description || '';

            let m = new MessageView();

            // Prepare message
            m.message = message;

            // Prepare description
            if (!_undef(description)) m.description = description;

            m.iconInfo();

            if(!items) {
                items = [new ButtonItem(strings.ok)];
            }

            return DialogView.showMessage(m, items);

        }

        /**
         * Presents the specified inputs and presents them
         * @param title
         * @param inputs
         * @param save
         * @param validate Return false in case validation is incorrect
         */
        static input(
                    title: string,
                    inputs: IInputList,
                    validate: (values: {[index: string]: any}, items: {[index: string]: InputItem}) => any = null,
                    save: (values: {[index: string]: any}) => any = null,
                    cancel: () => any = null){

            let d = new DialogView();
            let f = new FormView();

            // let cv = new ColumnView();
            let items: {[index: string]: InputItem} = {};
            let values = () => {
                let r = {};
                for(let i in items){
                    r[i] = items[i].value;
                }
                return r;
            };
            let cancelled = false;

            d.closeButton.visible = false;

            for(let i in inputs){
                items[i] = InputItem.fromIInput(inputs[i], i, null);
                f.inputs.add(items[i]);
            }

            let type = latte['MetaFormItem'];
            // let mf = new type(null, {
            //     fields: inputs
            // });

            // debugger;
            // cv.items.add(mf);

            d.items.addArray([
                new ButtonItem(strings.ok),
            ]);

            d.addCancelButton(() => {
                cancelled = true;
                if(cancel){
                    cancel();
                }
            });

            d.closing.add(() => {
                if(cancelled) {
                    return true;
                }

                let valid = null;

                if(validate) {
                    valid = validate(values(), items);
                }

                if(_isFunction(valid)) {

                    // Execute validation
                    d.enabled = false;
                    valid((validationResult: boolean) => {
                        d.enabled = true;

                        if((_isBoolean(validationResult) && validationResult) || f.isValid){
                            cancelled = true;
                            d.close();
                            save(values());
                        }
                    });
                    return false;
                }

                if(!_isBoolean(valid)) {
                    valid = f.isValid;
                }

                // Check for validation
                if(valid) {
                    // Save callback
                    save(values());
                }else {

                    return false;
                }
            });

            d.title = title;
            d.view = f;
            // d.view = new View();
            // d.view.container.append(mf.raw);
            d.show();

            return d;
        }
        /**
         * Presents the specified inputs and presents them
         * @param title
         * @param inputs
         * @param save
         * @param validate Return false in case validation is incorrect
         */
        static metaInput(
                    title: string,
                    inputs: IInputList,
                    validate: (values: {[index: string]: any}, items: {[index: string]: InputItem}) => any = null,
                    save: (values: {[index: string]: any}) => any = null,
                    cancel: () => any = null){

            let d = new DialogView();
            let f = new FormView();

            // let cv = new ColumnView();
            let cancelled = false;

            d.closeButton.visible = false;

            let type = latte['MetaFormItem'];
            let mf:any = new type({}, {
                fields: inputs
            });

            let getValues = () => {
                let r = {};
                for(let name in inputs){
                    r[name] = mf.byName(name).value;
                }
                return r;
            };

            let getItems = () => {
                let r = {};
                for(let name in inputs){
                    r[name] = mf.byName(name);
                }
                return r;
            };

            // debugger;
            // cv.items.add(mf);

            d.items.addArray([
                new ButtonItem(strings.ok),
            ]);

            d.addCancelButton(() => {
                cancelled = true;
                if(cancel){
                    cancel();
                }
            });

            d.closing.add(() => {
                if(cancelled) {
                    return true;
                }

                let valid = null;

                if(validate) {
                    valid = validate(getValues() as any, getItems() as any);
                }

                if(_isFunction(valid)) {

                    // Execute validation
                    d.enabled = false;
                    valid((validationResult: boolean) => {
                        d.enabled = true;

                        if((_isBoolean(validationResult) && validationResult) || f.isValid){
                            cancelled = true;
                            d.close();
                            save(getValues());
                        }
                    });
                    return false;
                }

                if(!_isBoolean(valid)) {
                    valid = f.isValid;
                }

                // Check for validation
                if(valid) {
                    // Save callback
                    save(getValues());
                }else {

                    return false;
                }
            });

            d.title = title;
            // d.view = f;
            let cv = new ColumnView();
            d.view = cv;
            cv.items.add(mf);
            // d.view.container.append(mf.raw);
            d.show();

            return d;
        }

        /**
         * Shows the specified <c>message</c> within a DialogView. Optionally specifies <c>items</c> for the dialog.
         **/
        static showMessage(message:MessageView, items:Array<Item> = null):DialogView {


            if (!(message instanceof MessageView))
                throw new InvalidArgumentEx('message', message);

            if (_undef(items)){
                var okButton = new ButtonItem();
                okButton.text = strings.ok;
                items = [okButton];
            }

            return new DialogView(message, items).show();

        }
        //endregion

        //region Fields

        /**
         * Points to the layer that obscures contextual elements
         */
        subLayer: HTMLElement;

        /**
         * Points to the layer where the dialog view lives.
         */
        containmentLayer: HTMLElement;

        /**
         *
         **/
        private _cancelButton:ButtonItem;

        /**
         *
         **/
        private _closeable:boolean = true;

        /**
         *
         **/
        private _defaultButton: ButtonItem;

        private defaultButtonHandled: boolean;

        /**
         * Pointer to the DOM element where the title bar lives
         **/
        barElement:JQuery;

        /**
         * Pointer to the <c>close</c> button
         **/
        closeButton:ButtonItem;

        /**
         * Collection of items to show as commands
         **/
        items: Collection<Item>;

        /**
         * Pointer to the DOM element where <c>items</c> are placed
         **/
        itemsElement:JQuery;

        /**
         * Pointer to the DOM element where title text is placed
         **/
        titleElement:JQuery;

        /**
         * Raised when the user is soliciting to close the dialog. If the event returns false, the close is cancelled.
         **/
        closing:LatteEvent;

        /**
         * Raised when the dialog has been closed.
         **/
        closed:LatteEvent;
        //endregion

        /**
         * Creates the Dialog
         **/
        constructor(view:View = null, items:Array<Item> = null) {

            super();
            DialogView._initialize();

            this.element.addClass('dialog');

            // Initialize events
            this.closing = new LatteEvent(this);
            this.closed = new LatteEvent(this);

            // Initialize collection
            this.items = new Collection<Item>(this._onAddItem, this._onRemoveItem, this);

            // Initialize elements
            this.barElement = $('<div>').addClass('bar').appendTo(this.element);
            this.itemsElement = $('<div>').addClass('items').appendTo(this.element);
            this.titleElement = $('<div>').addClass('title').appendTo(this.barElement);

            this.closeButton = new ButtonItem();
            this.closeButton.faceVisible = false;
            this.closeButton.icon = LinearIcon.cross; //Glyph.dismiss;
            this.closeButton.appendTo(this.barElement);
            this.closeButton.click.add( () => {
                this.close();
            });

            this.closeButton.element.addClass('close');

            if (view instanceof View) {
                this.view = view;
            }

            if (items instanceof Array) {
                this.items.addArray(items);
            }

            // TODO: PATCH:
            if(!View.smallScreen){
                this.container.css('maxHeight', 400);
            }


        }

        //region Private Methods

        //endregion

        //region Methods

        private clickableItemsCount(): number{
            var count = 0;
            this.items.each((item: Item) => {
                if(item instanceof ClickableItem) count++;
            })
            return count;
        }

        /**
         *
         **/
        private _onAddItem(item: Item) {

            if (item instanceof ButtonItem) {
                (<ButtonItem>item).click.add( () => {
                    return this.close();
                })
            }

            this.itemsElement.append(item.element);
            this.onLayout();

            item.focusable = true;

            if(this.items.length == 1 && item instanceof ButtonItem) {
                (<ClickableItem>item).defaulted = true;
                this.defaultButton = <ButtonItem>item;
            }
        }

        /**
         *
         **/
        private _onRemoveItem(item:Item) {

            item.element.detach();
            this.onLayout();

        }

        /**
         * Adds a button with the specified text and handler to the dialog items
         **/
        addButton(text:string, handler: GenericCallback = null):DialogView {


            var b = new ButtonItem();
            b.text = text;
            b.click.add(_isFunction(handler) ? handler : () => {});

            this.items.add(b);
            return this;

        }

        /**
         * Adds an 'Cancel' button to the dialog items
         **/
        addCancelButton(handler:GenericCallback = null):DialogView {

            return this.addButton(strings.cancel, handler);

        }

        /**
         * Adds an 'No' button to the dialog items
         **/
        addNoButton(handler:GenericCallback = null):DialogView {

            return this.addButton(strings.no, handler);

        }

        /**
         * Adds an 'Ok' button to the dialog items
         **/
        addOkButton(handler:GenericCallback = null):DialogView {

            return this.addButton(strings.ok, handler);

        }

        /**
         * Adds an 'Save' button to the dialog items
         **/
        addSaveButton(handler:GenericCallback = null):DialogView {

            return this.addButton(strings.save, handler);

        }

        /**
         * Adds a 'Yes' button to the dialog items
         **/
        addYesButton(handler:GenericCallback = null):DialogView {

            return this.addButton(strings.yes, handler);

        }

        /**
         * Closes the dialog
         **/
        close(): boolean {

            this._isClosed = true;

            if (this.onClosing() === false) {
                return false;
            }

            // Hide sub layer modal
            if(this.subLayer){
                let sub = $(this.subLayer);
                sub.fadeOut(() => sub.remove());
                this.subLayer = null;
            }

            // Hide containment layer
            if(this.containmentLayer){
                let cont = $(this.containmentLayer);
                cont.animate({
                    top: $(window).height()
                }, () => cont.remove());
            }

            this.onClosed();

            return true;

        }

        /**
         *
         **/
        handler() {
            throw new Ex();
        }

        /**
         * Raises the <c>closed</c> event
         **/
        onClosed() {

            this.closed.raise();

        }

        /**
         * Raises the <c>closing</c> event
         **/
        onClosing():boolean {

            return this.closing.raise();

        }

        onEnabledChanged(){
            super.onEnabledChanged();

            // TODO: Disabling the dialog should disable every single click on it.

            if(this.enabled) {
                this.removeClass('disabled');
            }else{
                this.addClass('disabled');
            }

            for (let i = 0; i < this.items.length; i++) {
                this.items[i].enabled = this.enabled;
            }
        }

        /**
         * Raises the <c>layout</c> event
         **/
        onLayout() {

            super.onLayout();

            this.container.css('margin-top', this.barElement.outerHeight());

            if (this.items.count > 0) {
                this.itemsElement.show();
                this.container.css('margin-bottom', this.itemsElement.outerHeight());
            } else {
                this.itemsElement.hide();
                this.container.css('margin-bottom', 0);
            }


        }

        /**
         * Shows the dialog as modal
         **/
        show(items: Item[] = null):DialogView {

            View.modalView = this;

            if(items) {
                this.items.addArray(items);


            }

            return this;

        }
        //endregion

        //region Properties

        /**
         * Gets or sets the button which is to be pressed by default when cancelling the dialog.
         If no button is set as default, this function will return the last button of <c>items</c> collection.
         **/
        get cancelButton(): ButtonItem {
            if (this._cancelButton === null) {
                if (this.items.count > 0 && this.items.first instanceof ButtonItem) {
                    return <ButtonItem>(this.items.first);
                } else {
                    return null;
                }
            } else {
                return this._cancelButton;
            }
        }

        /**
         * Gets or sets the button which is to be pressed by default when cancelling the dialog.
         If no button is set as default, this function will return the last button of <c>items</c> collection.
         **/
        set cancelButton(button: ButtonItem) {
            this._cancelButton = button;
        }

        /**
         * Gets or sets a value indicating if the dialog is closable by default
         **/
        get closeable():boolean {
            return this._closeable;
        }

        /**
         * Gets or sets a value indicating if the dialog is closable by default
         **/
        set closeable(value:boolean) {
            this._closeable = value;
            this.closeButton.visible = value;
        }

        /**
         * Gets or sets the button which is to be pressed by default when pressing enter.
         If no button is set as default, this function will return the first button of <c>items</c> collection.
         **/
        get defaultButton(): ButtonItem {
            if (this._defaultButton === null) {
                if (this.items.count > 0 && this.items.first instanceof ButtonItem) {
                    return <ButtonItem>this.items.first;
                } else {
                    return null;
                }
            } else {
                return this._defaultButton;
            }
        }

        /**
         * Gets or sets the button which is to be pressed by default when pressing enter.
         If no button is set as default, this function will return the first button of <c>items</c> collection.
         **/
        set defaultButton(button: ButtonItem) {
            this._defaultButton = button;

        }

        /**
         * Property field
         */
        private _isClosed: boolean;

        /**
         * Gets a value indicating if the dialog is already closed
         *
         * @returns {boolean}
         */
        get isClosed(): boolean {
            return this._isClosed;
        }


        /**
         * Gets or sets the title of the dialog
         **/
        get title():string {
            return this.titleElement.html();
        }

        /**
         * Gets or sets the title of the dialog
         **/
        set title(value: string) {


            this.titleElement.html(value);


        }

        //endregion
    }
}