module latte {

    /**
     *
     */
    export class SidebarOverlay extends Overlay {

        //region Static
        static DEFAULT_SIZE: number = 300;

        /**
         * Gets the side as a string
         * @param {latte.Side} side
         * @returns {string}
         */
        static sideString(side: Side): string{
            switch(side){
                case Side.AUTO: return 'auto';
                case Side.TOP: return 'top';
                case Side.LEFT: return 'left';
                case Side.RIGHT: return 'right';
                case Side.BOTTOM: return 'bottom';
            }
            return 'auto';
        }
        //endregion

        //region Fields
        lastSide: string;
        //endregion

        /**
         * Creates the Overlay
         */
        constructor(side: Side = Side.RIGHT, size: number = SidebarOverlay.DEFAULT_SIZE) {
            super();

            this.addClass('sidebar');

            this.raw.appendChild(this.btnClose.raw);

            this.dismissers.add(new OverlayClickDismisser());
            this.dismissers.add(new OverlayEscDismisser());

            // let unloader = e => {
            //
            //     this.close();
            //
            //     window.removeEventListener('click', unloader);
            // };
            //
            // // setTimeout(() => window.addEventListener('click', unloader));
            // window.addEventListener('click', unloader);
            //
            // this.raw.addEventListener('click', e => {
            //     e.stopPropagation();
            // });

            this.side = side;

            // Default Size
            this.size = size;

        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Raises the <c>side</c> event
         */
        onSideChanged(){
            if(this._sideChanged){
                this._sideChanged.raise();
            }

            if(this.lastSide) {
                this.removeClass(this.lastSide);
            }

            let side = SidebarOverlay.sideString(this.side);

            this.addClass(side);

            this.lastSide = side;

        }

        /**
         * Raises the <c>size</c> event
         */
        onSizeChanged(){
            if(this._sizeChanged){
                this._sizeChanged.raise();
            }

            let px = a => String(a) + 'px';

            // Reset width / height
            this.raw.style.width = this.raw.style.height = null;

            // Check axis of side
            let vertical: boolean = this.side == Side.TOP || this.side == Side.BOTTOM;

            // Affect width or height
            this.raw.style[ vertical ? 'height' : 'width'] = px(this.size);

            if(!this.isShown) {

                let auto = 'auto !important';

                // Reset measures
                "top,left,right,bottom".split(',').forEach(n => this.raw.style[n] = null);

                switch(this.side){
                    case Side.TOP:
                        this.raw.style.top = px(-this.size);
                        break;
                    case Side.BOTTOM:
                        this.raw.style.bottom = px(-this.size);
                        break;
                    case Side.LEFT:
                        this.raw.style.left = px(-this.size);
                        break;
                    case Side.RIGHT:
                    case Side.AUTO:
                        this.raw.style.right = px(-this.size);
                        break;
                }
            }
        }

        /**
         * Shows the sidebar
         */
        show(){
            super.show();

            setTimeout(() => {
                this.element.css(SidebarOverlay.sideString(this.side), 0);
            });

        }

        /**
         * Override
         */
        close(){
            // debugger;
            this.setIsClosed(true);
            this.element.css(SidebarOverlay.sideString(this.side), -400);
            setTimeout(() => super.close(), 1000);
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _sideChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the side property changes
         *
         * @returns {LatteEvent}
         */
        get sideChanged(): LatteEvent{
            if(!this._sideChanged){
                this._sideChanged = new LatteEvent(this);
            }
            return this._sideChanged;
        }

        /**
         * Back field for event
         */
        private _sizeChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the size property changes
         *
         * @returns {LatteEvent}
         */
        get sizeChanged(): LatteEvent{
            if(!this._sizeChanged){
                this._sizeChanged = new LatteEvent(this);
            }
            return this._sizeChanged;
        }
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _side: Side = null;

        /**
         * Gets or sets the side of the sidebar
         *
         * @returns {Side}
         */
        get side(): Side{
            return this._side;
        }

        /**
         * Gets or sets the side of the sidebar
         *
         * @param {Side} value
         */
        set side(value: Side){

            // Check if value changed
            let changed: boolean = value !== this._side;

            // Set value
            this._side = value;

            // Trigger changed event
            if(changed){
                this.onSideChanged();
            }
        }

        /**
         * Property field
         */
        private _size: number = null;

        /**
         * Gets or sets the size of the overlay
         *
         * @returns {number}
         */
        get size(): number{
            return this._size;
        }

        /**
         * Gets or sets the size of the overlay
         *
         * @param {number} value
         */
        set size(value: number){

            // Check if value changed
            let changed: boolean = value !== this._size;

            // Set value
            this._size = value;

            // Trigger changed event
            if(changed){
                this.onSizeChanged();
            }
        }
        //endregion

        //region Components

        /**
         * Field for btnClose property
         */
        private _btnClose: ButtonItem;

        /**
         * Gets the close button
         *
         * @returns {ButtonItem}
         */
        get btnClose(): ButtonItem {
            if (!this._btnClose) {
                let lazy: ButtonItem = this._btnClose = new ButtonItem(null, LinearIcon.cross, () =>this.close());
                lazy.addClass('close');
                lazy.faceVisible = false;
            }
            return this._btnClose;
        }

        //endregion

    }

}