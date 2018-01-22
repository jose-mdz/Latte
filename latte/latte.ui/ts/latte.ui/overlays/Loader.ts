module latte{
    /**
     * Shows a graphical indicator of activity.
     <example><code><span style="color: #000000">
     <span style="color: #0000BB"><br /><br />&nbsp;&nbsp;</span><span style="color: #FF8000">//&nbsp;Show&nbsp;loader<br />&nbsp;&nbsp;</span><span style="color: #007700">var&nbsp;</span><span style="color: #0000BB">loader&nbsp;</span><span style="color: #007700">=&nbsp;new&nbsp;</span><span style="color: #0000BB">Loader</span><span style="color: #007700">(</span><span style="color: #DD0000">"Doing&nbsp;some&nbsp;stuff"</span><span style="color: #007700">);<br /><br />&nbsp;&nbsp;</span><span style="color: #FF8000">//&nbsp;...<br />&nbsp;&nbsp;//&nbsp;Load&nbsp;some&nbsp;heavy&nbsp;stuff..<br />&nbsp;&nbsp;//&nbsp;...<br /><br />&nbsp;&nbsp;//&nbsp;Hide&nbsp;loader<br />&nbsp;&nbsp;</span><span style="color: #0000BB">loader</span><span style="color: #007700">.</span><span style="color: #0000BB">stop</span><span style="color: #007700">();<br />&nbsp;<br /></span><span style="color: #0000BB"></span>
     </span>
     </code></example>
     **/
    export class Loader extends Overlay{

        /**
         *
         **/
        private static _active: Array<Loader> = [];

        /**
         * Amount of pixels between loaders when stacked
         **/
        static separation: number = 5;

        /**
         * Adds a loader to the list of active loaders, if not already present.
         **/
        private static add(loader: Loader){


            /// Validate loader
            if(!(loader instanceof Loader))
                throw new InvalidArgumentEx('loader');

            /// Retrieve array
            var a = Loader._active;

            /// Check loader is not already there
            var found = false;

            for(var i = 0; i < a.length; i++){
                if(a[i] === loader){
                    found = true;
                    break;
                }
            }

            /// Add if not found
            if(!found){
                a.unshift(loader);
            }


        }

        /**
         * Removes the Loader from the active list of loaders
         **/
        private static remove(loader: Loader){


            /// Validate loader
            if(!(loader instanceof Loader))
                throw new InvalidArgumentEx('loader');

            // Retrieve array
            var a = Loader._active;

            // New array
            var arr = [];

            // Scan
            for(var i = 0; i < a.length; i++){
                if(a[i] != loader)
                    arr.push(a[i]);
            }

            // Set new array
            Loader._active = arr;

        }

        /**
         * Updates all active loaders position and ensures modal layer visibility
         **/
        private static update(){

            Loader.updateModalVisibility();
            Loader.updateLayout();

        }

        /**
         * Updates all active loaders positions
         **/
        private static updateLayout(){


            var loaders = Loader._active;
            if(!loaders.length) return;
            var loader = null;
            var curTop = 0;
            var s = Loader.separation;
            var sampleHeight = loaders[0].element.outerHeight();
            var r = new Rectangle(s, 0, Loader.maxWidth, (sampleHeight + s) * loaders.length);

            /// Center r on screen
            r = r.centerOn($(document).rectangle());

            if(!Loader.modalShouldBeVisible){
                r.top = s;
            }

            curTop = r.top;

            /// Animate each loader to its place
            for(var i = 0; i < loaders.length; i++){
                loader = loaders[i];
                loader
                    .element
                    .css({
                        left: r.left
                    })
                    .show()
                    .animate({
                        opacity: 1,
                        //width: r.width(),
                        //left: r.left(),
                        top: curTop
                    }, 'fast');

                // Increase curTop
                curTop += sampleHeight + s;
            }


        }

        /**
         * Iterates trough active loaders to check if modal layer should be visible
         **/
        private static updateModalVisibility(){

            Loader.modalVisible = Loader.modalShouldBeVisible;

        }

        /**
         * Gets the widest loader width
         **/
        private static get maxWidth(): number{

            var max = 0;
            var a = Loader._active;

            for(var i = 0; i < a.length; i++){
                a[i].element.css('width', null);
                max = Math.max(max, a[i].element.width());
            }

            return max;

        }

        /**
         * Gets a boolean indicating if the modal layer should be visible based on the active loaders.
         **/
        private static get modalShouldBeVisible(): boolean{


            var shouldBeVisible = false;
            var a = Loader._active;

            /// Scan all active loaders to check if layer should be visible
            for(var i = 0; i < a.length; i++){
                if(a[i].modal === true){
                    shouldBeVisible = true;
                    break;
                }
            }

            return shouldBeVisible;

        }

        /**
         * Gets or Sets visibility of modal layer. Optimized for concurrent calling.
         **/
        private static get modalVisible(): boolean{
            var m = $('.latte-loader-modal');
            return m.is(':visible') || m.hasClass('fading-out');
        }

        /**
         * Gets or Sets visibility of modal layer. Optimized for concurrent calling.
         **/
        private static set modalVisible(visible: boolean){
            var m = $('.latte-loader-modal');

            if(m.length == 0){
                m = $('<div>')
                    .addClass('latte-loader-modal')
                    .hide()
                    .appendTo('body')
                    .css({
                        position: 'fixed',
                        left: 0, top:0, right: 0, bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)'
                    });
            }

            /// Re insert before any other loader
            m.detach();

            var loaders = $('body > div.loader');

            if(loaders.length == 0) $('body').append(m);

            else loaders.first().before(m);

            if(visible === true){
                if(!m.is(':visible')){
                    m.show().css('opacity', 0).animate({
                        opacity: 1
                    }, 'fast' );
                }
            }else{
                if(m.is(':visible') && !m.hasClass('fading-out')){
                    m.addClass('fading-out').css('opacity', 1).animate({
                        opacity: 0
                    }, 'fast', 'swing', function(){$(this).removeClass('fading-out').hide();});
                }
            }
        }
        /**
         *
         **/
        private _cancellable: boolean;

        /**
         *
         **/
        private _description: string;

        /**
         *
         **/
        private _modal: boolean;

        /**
         *
         */
        cancelElement: JQuery;

        /**
         * Points to the DOM element where loader text is placed
         **/
        labelElement: JQuery;

        /**
         * Progressbar of loader. Hidden by default.
         **/
        progress: ProgressItem;

        /**
         * Raised when user cancels the loader
         **/
        cancelled: LatteEvent;

        /**
         * Creates and shows the loader. Optionally specifies if is to be shown as <c>modal</c>.
         **/
        constructor(text: string = '', modal: boolean = false){

            super();
            this.element.addClass('loader');

            // Init events
            this.cancelled = new LatteEvent(this);

            this.element.addClass('loader').appendTo('body');
            this.labelElement = $('<div>').addClass('label').appendTo(this.element);
            this.cancelElement = $('<div>').addClass('cancel').appendTo(this.element);
            this.progress = new ProgressItem();
            this.progress.visible = false;
            this.progress.appendTo(this.element);

            this.text = _undef(text) ? strings.working : text;
            this.modal = modal === true;

            this.start();


        }

        /**
         * Raises the <c>cancelled</c> event
         **/
        onCancelled(){

            this.cancelled.raise();

        }

        /**
         * Shows the loader on the UI
         **/
        start(){


            // Add to active Loaders
            Loader.add(this);

            var screen = $(document).rectangle();
            var r = this.element.rectangle();r = r.centerOn(screen);

            // Position on the center
            this.element.css({
                top: -this.element.height() - 10,
                left: r.left,
                opacity: 0
            });

            /// Update Layout
            Loader.update();


        }

        /**
         * Hides the loader on the UI
         **/
        stop(){


            var inst = this;

            /// Remove from active loaders
            Loader.remove(this);

            /// Disappear element
            this.element
                .animate({
                    opacity: 0,
                    top: -(this.element.height())
                }, 'fast', 'swing', () => { inst.element.remove() });

            /// Update Layout
            Loader.update();

        }

        /**
         * Gets or sets a value indicating if the loader allows user to cancel it.
         **/
        get cancellable(): boolean{
            return this._cancellable;
        }

        /**
         * Gets or sets a value indicating if the loader allows user to cancel it.
         **/
        set cancellable(value: boolean){


            this._cancellable = value;


        }

        /**
         * Gets or sets the description of the loader
         **/
        get description(): string{
            return this._description;
        }

        /**
         * Gets or sets the description of the loader
         **/
        set description(value: string){


            this._description = value;


        }

        /**
         * Gets or sets a value indicating if the loader is modal
         **/
        get modal(): boolean{
            return this._modal;
        }

        /**
         * Gets or sets a value indicating if the loader is modal
         **/
        set modal(value: boolean){


            this._modal = value;


        }

        /**
         * Gets or sets the text of the loader
         **/
        get text(): string{
            return this.labelElement.html();
        }

        /**
         * Gets or sets the text of the loader
         **/
        set text(value: string){


            this.labelElement.html(value);
            Loader.update();


        }
    }
}