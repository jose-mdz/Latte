module latte{
    /**
     * Renders an element that fills the space where its added. This is the base class for Views in DataLatte.

     The main feature of View is the fact that it can contains another View or Views.
     **/
    export class View extends UiElement{

        //region Static

        private static _smallScreen: boolean = false;

        /**
         *
         **/
        private static _defaultButton: ButtonItem;

        /**
         * Flag to recognize if statically initialized
         **/
        private static _initialized: boolean;

        /**
         *
         **/
        private static _layer: JQuery;

        /**
         *
         **/
        private static _mainView: View;

        /**
         *
         **/
        private static _mainViewHolder: View;

        /**
         *
         **/
        private static _modalView: DialogView;

        /**
         *
         */
        private static smallScreenChanged: LatteEvent;

        /**
         *
         **/
        static getMainView(): View{

            return View._mainViewHolder ? View._mainViewHolder.view : null;

        }

        /**
         *
         **/
        static initStatic(){

            View.smallScreenChanged = new LatteEvent(this);

            $(document)
                .keydown(function(e){
                    if(e.keyCode == Key.ENTER){
                        if(View.defaultButton instanceof ButtonItem)
                            View.defaultButton.onClick();
                    }
                });


        }

        /**
         * SPECIAL GETTER
         Gets or sets the modalView of the User Agent Viewport
         **/
        static getModalView(): DialogView{
            return this._modalView;
        }

        /**
         * Raises the <c>smallScreenChanged</c> event
         */
        static onSmallScreenChanged(){

            if(View.mainView instanceof View){
                if(View.smallScreen){
                    $('body').addClass('small-screen');
                }else{
                    $('body').removeClass('small-screen');
                }
            }

            if(View.smallScreenChanged instanceof LatteEvent){
                View.smallScreenChanged.raise();
            }
        }

        /**
         * SPECIAL SETTER
         Gets or sets the modalView of the User Agent Viewport
         **/
        static setModalView(view: DialogView = null, itemsArray: Array<Item> = null){

            // let items: Collection<Item> = new Collection<Item>();
            //
            // if(itemsArray){
            //     items.addArray(itemsArray);
            // }


            // Hide previous modal
            // if(this._modalView instanceof View && this._modalView !== view){
            //     if(this._layer){
            //         this._layer.fadeOut(function(){ $(this).remove() });
            //         this._layer = null;
            //     }
            //
            //     if(this._modalView){
            //         let parentsParent = this._modalView.element.parent().parent();
            //
            //         parentsParent.animate({
            //             top: $(window).height()
            //         }, 'fast', 'swing', () => { parentsParent.remove() });
            //     }
            // }

            let layer = $('<div>').addClass('latte-modal-view-layer').appendTo('body');
            let dialog = $('<div>').addClass('latte-modal-view').appendTo('body');
            let eInner = $('<div>').addClass('inner-view').appendTo(dialog);


            view.subLayer = layer.get(0);
            view.containmentLayer = dialog.get(0);

            // Adapt & append view
            view.parentIsModal = true;

            eInner.append(view.element);

            if(itemsArray && itemsArray.length > 0){
                let eItems = $('<div>').addClass('items').appendTo(dialog);
                itemsArray.forEach((item) => eItems.append(item.element));
                eItems.clear();

                if(itemsArray.length == 0) eItems.detach();
            }

            // // Items
            // let its = new Collection<Item>();
            // its.addCollection(items);
            //
            // let item;
            //
            // while( (item = its.next()) )
            //     eItems.append(item.element);

            // Center dialog
            let centerRect = dialog.rectangle().centerOn(layer.rectangle());
            dialog.rectangle(centerRect);
            dialog.css('height', '');

            let start = {
                top: -dialog.height(),
                opacity: 0
            };

            let end = {
                top: centerRect.top,
                opacity: 1
            };

            view.onLayout();

            // Show now
            layer.css({opacity:0}).animate({opacity:1}, 'fast');
            dialog.css(start).animate(end, 'fast', 'swing', function(){ view.focusInput(); });
            this._layer = layer;

            this._modalView = view;


        }

        /**
         * Sets the mainView of the User Agent Viewport
         **/
        static setMainView(view: View, transition: Transition = null, milliseconds: number = 0){



            // Create main holder if not already present
            if(!(View._mainViewHolder instanceof View)){
                View._mainViewHolder = new View();
                View._mainViewHolder.addClass('main-view-holder');
                View._mainViewHolder.appendTo('body');
            }

            // Handle window resize
            if(!View._initialized){
                $(window).bind('resize', function(){
                    if(View._mainViewHolder instanceof View){
                        View.smallScreen = document.documentElement.clientWidth <= 480;
                        View._mainViewHolder.onLayout();
                    }
                });
                View._initialized = true;
            }

            // Set view of main holder
            View._mainViewHolder.setView(view, transition, milliseconds);

            View.smallScreen = document.documentElement.clientWidth <= 480;

        }

        /**
         * Gets or sets the current default button of the User Agent.
         Any press to the ENTER key will be redirected as click for that button.
         **/
        static get defaultButton(): ButtonItem{
            return View._defaultButton;
        }

        /**
         * Gets or sets the current default button of the User Agent.
         Any press to the ENTER key will be redirected as click for that button.
         **/
        static set defaultButton(value: ButtonItem){


            View._defaultButton = value;


        }

        /**
         * Gets or sets the mainView of the User Agent Viewport
         **/
        static get mainView(): View{
            return this.getMainView();
        }

        /**
         * Gets or sets the mainView of the User Agent Viewport
         **/
        static set mainView(view: View){

            this.setMainView(view);

        }

        /**
         * Gets or sets the modalView of the User Agent Viewport
         **/
        static get modalView(): DialogView{
            return this.getModalView();
        }

        /**
         * Gets or sets the modalView of the User Agent Viewport
         **/
        static set modalView(value: DialogView){
            this.setModalView(value);
        }

        /**
         * Gets or sets a value indicating if the view is in a small screen (aka iPhone Screen)
         * @returns {boolean}
         */
        static get smallScreen(): boolean{
            return View._smallScreen;
        }

        /**
         * Gets or sets a value indicating if the view is in a small screen (aka iPhone Screen)
         * @param value
         */
        static set smallScreen(value: boolean){
            var changed = value !== View._smallScreen;
            View._smallScreen = value;

            if(changed){
                View.onSmallScreenChanged();
            }
        }
        //endregion

        //region Fields

        /**
         *
         **/
        private _infoItem: Item;

        /**
         *
         **/
        private _padding: number;

        /**
         *
         **/
        private _parentIsModal: boolean;

        /**
         *
         **/
        private _parentView: View;

        /**
         *
         **/
        private _view: View;

        /**
         * Holds the DOM element in which the View content is contained
         **/
        container: JQuery;

        ///**
        // * Raised when the view stops being visible
        // **/
        //hidden: LatteEvent;

        //endregion

        /**
         * Creates the <c>View</c>
         **/
        constructor(){

            super();

            // Create base elements
            this.element.addClass('latte-view');
            this.container = $('<div>').appendTo(this.element).addClass('container');

        }

        //region Methods
        /**
         * Focuses the first input if any
         **/
        focusInput(){

            this.element.find('input, select, textarea').first().focus().select();

        }

        /**
         * Returns the current view of the view
         **/
        getView(): View{

            return this._view;

        }

        /**
         * Raises the <c>hidden</c> event
         **/
        //onHidden(){
        //
        //    this.hidden.raise();
        //
        //}

        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(){

            super.onLayout();

            if(this._infoItem instanceof Item){
                this._infoItem.element.css({width: 'auto', height: 'auto'});

                // Center on view
                var viewRect = this.element.rectangle();
                viewRect.top = 0;
                viewRect.left = 0;

                var itemRect = this._infoItem.element.rectangle();
                this._infoItem.element.css('position', 'absolute').rectangle(itemRect.centerOn(viewRect));
            }

            if(this._view instanceof View)
                this._view.onLayout();

        }

        /**
         * Raises the <c>load</c> event
         */
        onLoad(){
            if(this._load){
                this._load.raise();
            }
        }

        /**
         * Raises the <c>shown</c> event
         */
        onShown(){
            if(this._shown){
                this._shown.raise();
            }
        }

        /**
         * Raises the <c>unload</c> event
         **/
        onUnload(){

            let response = this.unload.raise();

            if(response !== false){

                // Check if unsaved changes
                if(this.unsavedChanges){

                    let btnSave = new ButtonItem();
                    btnSave.text = strings.yesSaveChanges;
                    btnSave.click.add( () => { this.saveChanges() });

                    let btnIgnore = new ButtonItem();
                    btnIgnore.text = strings.noIgnoreChanges;
                    btnIgnore.click.add( () => { this.unsavedChanges = false; } );

                    // Ask if user wants to save changes
                    DialogView
                        .ask(
                        strings.askSaveChanges,
                        strings.unsavedChanges,
                        [btnSave, btnIgnore]
                    );
                }

            }

            return response;

        }

        /**
         * Sets the <c>View</c> inside this view.
         If view swap fails, it will return <c>false</c>
         **/
        setView(view: View = null, transition: Transition = null, milliseconds: number = 0): boolean{

            // If same view as current, cancel.
            if(view && view === this._view)
                return true;

            // Set default transition
            if(_undef(transition))
                transition = Transition.FADE;

            // Unload current view
            if(this._view instanceof View){

                if(this._view.onUnload() === false){
                    // Cancel unload
                    return false;
                }

                this.saveItems.remove(this._view);

            }

            // States for animation of transition
            let oldView = this._view, newView = view, oldStart: any = {}, oldEnd: any = {}, newStart: any = {}, newEnd: any = {};

            if(newView){
                // Call load of view
                view.onLoad();

                // Set modal if necessary
                newView.parentIsModal = this.parentIsModal;

                // Append view
                this.container.append(view.element);

                // Add to saveItems
                this.saveItems.add(view);

                newView._parentView = this;
            }

            if(oldView) oldView._parentView = null;

            // Prepare states for animation
            switch(transition){
                case Transition.FADE:
                    oldStart.opacity = newEnd.opacity = 1;
                    oldEnd.opacity = newStart.opacity = 0;
                    break;
                case Transition.SWIPE_FORWARD:
                    oldEnd.left = oldView ? -oldView.element.width() : 0;
                    newStart.left = newView ? newView.element.width() : 0;
                    newEnd.left = 0;
                    break;
            }

            // Prepare animation
            if(newView) newView.element.css(newStart);
            if(oldView) oldView.element.css(oldStart);

            // Perform a layout of items
            if(newView) view.onLayout();

            // Animate new view
            if(newView) view.element.animate(newEnd, _undef(milliseconds) ? 100 : milliseconds, 'swing', () => {
                // Let view know is about to be shown
                if(newView) view.onShown();
            });

            // Animate old view
            if(oldView) oldView.element.animate(oldEnd,  _undef(milliseconds) ? 100 : milliseconds, 'swing', () => {
                // Detach from view
                oldView.element.detach();

                // Inform hidden
                //oldView.onHidden();
            });

            this._view = newView;

        }
        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _load: LatteEvent;

        /**
         * Gets an event raised when the view is loaded
         *
         * @returns {LatteEvent}
         */
        get load(): LatteEvent{
            if(!this._load){
                this._load = new LatteEvent(this);
            }
            return this._load;
        }

        /**
         * Back field for event
         */
        private _shown: LatteEvent;

        /**
         * Gets an event raised when the view is already visible
         *
         * @returns {LatteEvent}
         */
        get shown(): LatteEvent{
            if(!this._shown){
                this._shown = new LatteEvent(this);
            }
            return this._shown;
        }

        /**
         * Back field for event
         */
        private _unload: LatteEvent;

        /**
         * Gets an event raised when the view is unloaded. If result of event is false, unload will be aborted
         *
         * @returns {LatteEvent}
         */
        get unload(): LatteEvent{
            if(!this._unload){
                this._unload = new LatteEvent(this);
            }
            return this._unload;
        }

        //endregion

        //region Properties
        /**
         * Gets or sets the info item of the view. Its shown in the back of the container
         and centered into the view.
         **/
        get infoItem(): Item{
            return this._infoItem;
        }

        /**
         * Gets or sets the info item of the view. Its shown in the back of the container
         and centered into the view.
         **/
        set infoItem(value: Item){

            if(this._infoItem instanceof Item)
                this._infoItem.element.detach();

            if(value instanceof Item)
                value.element.insertBefore(this.container);

            this._infoItem = value;
            this.onLayout();

        }

        /**
         * Gets or sets the padding of the container
         **/
        get padding(): number{
            return this._padding;
        }

        /**
         * Gets or sets the padding of the container
         **/
        set padding(value: number){


            this._padding = value;
            this.container.css('padding', value);



        }

        /**
         * Gets or sets a value indicating if the parent of the view is modal
         **/
        get parentIsModal(): boolean{
            return this._parentIsModal;
        }

        /**
         * Gets or sets a value indicating if the parent of the view is modal
         **/
        set parentIsModal(value: boolean){

            this._parentIsModal = value;

            if(value){
                this.element.css('position', 'static');
                this.container.css('position', 'static');
            }else{
                this.element.css('position', 'absolute');
                this.container.css('position', 'absolute');
            }

            if(this.view instanceof View)
                this.view.parentIsModal = value;



        }

        /**
         * Gets the parent view of this view.
         **/
        get parentView(): View{

            return this._parentView;

        }

        /**
         * Gets or sets the view of the view
         **/
        get view(): View{
            return this.getView();
        }

        /**
         * Gets or sets the view of the view
         **/
        set view(value: View){

            this.setView(value);

        }
        //endregion
    }

    $(() => { View.initStatic(); });
}