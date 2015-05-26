module latte{

    export class AnchorView extends View{


        /**
         * Initializes view, optionally with an anchor item.
         */
        constructor(anchorTop: Item = null){
            super();

            this.element.addClass('anchor');

            // Set item
            if(anchorTop){
                this.anchorTop = anchorTop;
            }
        }

        //region Methods

        /**
         * Raises the <c>layout</c> event.
         **/
        onLayout(){

            super.onLayout();

            var containerCss: any = {
                top: '',
                left: '',
                right: '',
                bottom: ''
            };

            var itemCss: any = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            };

            if(this.anchorTop && this.anchorTopVisible) {
                containerCss.top = this.anchorTop.element.outerHeight();

                this.anchorTop.css({
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: ''
                });

                this.anchorTop.onLayout();
            }

            if(this.anchorRight && this.anchorRightVisible) {
                containerCss.right = this.anchorRight.element.outerWidth();

                this.anchorRight.css({
                    top: 0,
                    left: '',
                    right: 0,
                    bottom: 0
                });

                this.anchorRight.onLayout();
            }

            if(this.anchorBottom && this.anchorBottomVisible) {
                containerCss.bottom = this.anchorBottom.element.outerHeight();

                this.anchorBottom.css({
                    top: '',
                    left: 0,
                    right: 0,
                    bottom: 0
                });

                this.anchorBottom.onLayout();
            }

            if(this.anchorLeft && this.anchorLeftVisible) {
                containerCss.left = this.anchorLeft.element.outerWidth();

                this.anchorLeft.css({
                    top: 0,
                    left: 0,
                    right: '',
                    bottom: 0
                });

                this.anchorLeft.onLayout();
            }


            this.container.css(containerCss);

        }


        //endregion

        //region Events
        /**
         * Back field for event
         */
        private _anchorTopChanged: LatteEvent

        /**
         * Gets an event raised when the value of anchorTop changes
         *
         * @returns {LatteEvent}
         */
        public get anchorTopChanged(): LatteEvent{
            if(!this._anchorTopChanged){
                this._anchorTopChanged = new LatteEvent(this);
            }
            return this._anchorTopChanged;
        }

        /**
         * Raises the <c>anchorTopChanged</c> event
         */
        public onAnchorTopChanged(){
            if(this._anchorTopChanged){
                this._anchorTopChanged.raise();
            }

            this.onLayout();
        }


        /**
         * Back field for event
         */
        private _anchorRightChanged: LatteEvent

        /**
         * Gets an event raised when the value of anchorRight changes
         *
         * @returns {LatteEvent}
         */
        public get anchorRightChanged(): LatteEvent{
            if(!this._anchorRightChanged){
                this._anchorRightChanged = new LatteEvent(this);
            }
            return this._anchorRightChanged;
        }

        /**
         * Raises the <c>anchorRightChanged</c> event
         */
        public onAnchorRightChanged(){
            if(this._anchorRightChanged){
                this._anchorRightChanged.raise();
            }
            this.onLayout();
        }


        /**
         * Back field for event
         */
        private _anchorBottomChanged: LatteEvent

        /**
         * Gets an event raised when the value of anchorBottom changes
         *
         * @returns {LatteEvent}
         */
        public get anchorBottomChanged(): LatteEvent{
            if(!this._anchorBottomChanged){
                this._anchorBottomChanged = new LatteEvent(this);
            }
            return this._anchorBottomChanged;
        }

        /**
         * Raises the <c>anchorBottomChanged</c> event
         */
        public onAnchorBottomChanged(){
            if(this._anchorBottomChanged){
                this._anchorBottomChanged.raise();
            }
            this.onLayout();
        }



       /**
        * Back field for event
        */
        private _anchorLeftChanged: LatteEvent

       /**
        * Gets an event raised when when what?
        *
        * @returns {LatteEvent}
        */
       public get anchorLeftChanged(): LatteEvent{
           if(!this._anchorLeftChanged){
               this._anchorLeftChanged = new LatteEvent(this);
           }
           return this._anchorLeftChanged;
       }

       /**
        * Raises the <c>anchorLeftChanged</c> event
        */
       public onAnchorLeftChanged(){
           if(this._anchorLeftChanged){
               this._anchorLeftChanged.raise();
           }
           this.onLayout();
       }


        /**
         * Back field for event
         */
        private _anchorTopVisibleChanged: LatteEvent

        /**
         * Gets an event raised when the value of anchorTopVisible changes
         *
         * @returns {LatteEvent}
         */
        public get anchorTopVisibleChanged(): LatteEvent{
            if(!this._anchorTopVisibleChanged){
                this._anchorTopVisibleChanged = new LatteEvent(this);
            }
            return this._anchorTopVisibleChanged;
        }

        /**
         * Raises the <c>anchorTopVisibleChanged</c> event
         */
        public onAnchorTopVisibleChanged(){
            if(this._anchorTopVisibleChanged){
                this._anchorTopVisibleChanged.raise();
            }
            this.onLayout();
        }


        /**
         * Back field for event
         */
        private _anchorRightVisibleChanged: LatteEvent

        /**
         * Gets an event raised when the value of anchorRightVisible changes
         *
         * @returns {LatteEvent}
         */
        public get anchorRightVisibleChanged(): LatteEvent{
            if(!this._anchorRightVisibleChanged){
                this._anchorRightVisibleChanged = new LatteEvent(this);
            }
            return this._anchorRightVisibleChanged;
        }

        /**
         * Raises the <c>anchorRightVisibleChanged</c> event
         */
        public onAnchorRightVisibleChanged(){
            if(this._anchorRightVisibleChanged){
                this._anchorRightVisibleChanged.raise();
            }
            this.onLayout();
        }


        /**
         * Back field for event
         */
        private _anchorBottomVisibleChanged: LatteEvent

        /**
         * Gets an event raised when the value of anchorBottomVisible changed
         *
         * @returns {LatteEvent}
         */
        public get anchorBottomVisibleChanged(): LatteEvent{
            if(!this._anchorBottomVisibleChanged){
                this._anchorBottomVisibleChanged = new LatteEvent(this);
            }
            return this._anchorBottomVisibleChanged;
        }

        /**
         * Raises the <c>anchorBottomVisibleChanged</c> event
         */
        public onAnchorBottomVisibleChanged(){
            if(this._anchorBottomVisibleChanged){
                this._anchorBottomVisibleChanged.raise();
            }
            this.onLayout();
        }




        /**
         * Back field for event
         */
        private _anchorLeftVisibleChanged: LatteEvent

        /**
         * Gets an event raised when the value of anchorLeftVisible changed
         *
         * @returns {LatteEvent}
         */
        public get anchorLeftVisibleChanged(): LatteEvent{
            if(!this._anchorLeftVisibleChanged){
                this._anchorLeftVisibleChanged = new LatteEvent(this);
            }
            return this._anchorLeftVisibleChanged;
        }

        /**
         * Raises the <c>anchorLeftVisibleChanged</c> event
         */
        public onAnchorLeftVisibleChanged(){
            if(this._anchorLeftVisibleChanged){
                this._anchorLeftVisibleChanged.raise();
            }
            this.onLayout();
        }
        //endregion

        //region Properties

        /**
         * Property field
         */
        private _anchorTop:Item = null;

        /**
         * Gets or sets the top anchor item
         *
         * @returns {Item}
         */
        public get anchorTop():Item {
            return this._anchorTop;
        }

        /**
         * Gets or sets the top anchor item
         *
         * @param {Item} value
         */
        public set anchorTop(value:Item) {
            var changed = this._anchorTop !== value;

            // If some item previously anchored
            if(this._anchorTop instanceof Item){

                // Declass it
                this._anchorTop.removeClass('anchor');

                // Detach it
                this._anchorTop.element.detach();
            }

            this._anchorTop = value;

            if(changed) {

                if(value){
                    value.addClass('anchor anchor-top');
                    value.appendTo(this.element);
                }

                this.onAnchorTopChanged();
            }
        }

        /**
         * Property field
         */
        private _anchorTopVisible:boolean = true;

        /**
         * Gets or sets the visibility of the top anchor item
         *
         * @returns {boolean}
         */
        public get anchorTopVisible():boolean {
            return this._anchorTopVisible;
        }

        /**
         * Gets or sets the visibility of the top anchor item
         *
         * @param {boolean} value
         */
        public set anchorTopVisible(value:boolean) {
            var changed = this._anchorTopVisible !== value;

            this._anchorTopVisible = value;

            if(changed){
                this.anchorTop.visible = value;
                this.onAnchorTopVisibleChanged();
            }
        }

        /**
         * Property field
         */
        private _anchorRight:Item = null;

        /**
         * Gets or sets the right anchor item
         *
         * @returns {Item}
         */
        public get anchorRight():Item {
            return this._anchorRight;
        }

        /**
         * Gets or sets the right anchor item
         *
         * @param {Item} value
         */
        public set anchorRight(value:Item) {

            var changed = this._anchorRight !== value;

            // If some item previously anchored
            if(this._anchorRight instanceof Item){

                // Declass it
                this._anchorRight.removeClass('anchor');

                // Detach it
                this._anchorRight.element.detach();
            }

            this._anchorRight = value;

            if(changed) {

                if(value){
                    value.addClass('anchor anchor-right');
                    value.appendTo(this.element);
                }

                this.onAnchorRightChanged();
            }
        }

        /**
         * Property field
         */
        private _anchorRightVisible:boolean = true;

        /**
         * Gets or sets the visibility of the right anchor item
         *
         * @returns {boolean}
         */
        public get anchorRightVisible():boolean {
            return this._anchorRightVisible;
        }

        /**
         * Gets or sets the visibility of the right anchor item
         *
         * @param {boolean} value
         */
        public set anchorRightVisible(value:boolean) {
            var changed = this._anchorRightVisible !== value;
            this._anchorRightVisible = value;

            if(changed) {
                this.anchorRight.visible = value;
                this.onAnchorRightVisibleChanged();
            }
        }

        /**
         * Property field
         */
        private _anchorBottom:Item = null;

        /**
         * Gets or sets the bottom anchor item
         *
         * @returns {Item}
         */
        public get anchorBottom():Item {
            return this._anchorBottom;
        }

        /**
         * Gets or sets the bottom anchor item
         *
         * @param {Item} value
         */
        public set anchorBottom(value:Item) {

            var changed = this._anchorBottom !== value;

            // If some item previously anchored
            if(this._anchorBottom instanceof Item){

                // Declass it
                this._anchorBottom.removeClass('anchor');

                // Detach it
                this._anchorBottom.element.detach();
            }

            this._anchorBottom = value;

            if(changed) {

                if(value){
                    value.addClass('anchor anchor-bottom');
                    value.appendTo(this.element);
                }

                this.onAnchorBottomChanged();
            }
        }

        /**
         * Property field
         */
        private _anchorBottomVisible:boolean = true;

        /**
         * Gets or sets the visibility of bottom top anchor item
         *
         * @returns {boolean}
         */
        public get anchorBottomVisible():boolean {
            return this._anchorBottomVisible;
        }

        /**
         * Gets or sets the visibility of the bottom anchor item
         *
         * @param {boolean} value
         */
        public set anchorBottomVisible(value:boolean) {

            var changed = this._anchorBottomVisible !== value;

            this._anchorBottomVisible = value;

            if(changed) {
                this.anchorBottom.visible = value;
                this.onAnchorBottomVisibleChanged();
            }
        }

        /**
         * Property field
         */
        private _anchorLeft:Item = null;

        /**
         * Gets or sets the left item anchor
         *
         * @returns {Item}
         */
        public get anchorLeft():Item {
            return this._anchorLeft;
        }

        /**
         * Gets or sets the left item anchor
         *
         * @param {Item} value
         */
        public set anchorLeft(value:Item) {

            var changed = this._anchorLeft !== value;

            // If some item previously anchored
            if(this._anchorLeft instanceof Item){

                // Declass it
                this._anchorLeft.removeClass('anchor');

                // Detach it
                this._anchorLeft.element.detach();
            }

            this._anchorLeft = value;

            if(changed) {

                if(value){
                    value.addClass('anchor anchor-left');
                    value.appendTo(this.element);
                }

                this.onAnchorLeftChanged();
            }
        }

        /**
         * Property field
         */
        private _anchorLeftVisible:boolean = true;

        /**
         * Gets or sets the visibility of the left anchor item
         *
         * @returns {boolean}
         */
        public get anchorLeftVisible():boolean {
            return this._anchorLeftVisible;
        }

        /**
         * Gets or sets the visibility of the left anchor item
         *
         * @param {boolean} value
         */
        public set anchorLeftVisible(value:boolean) {

            var changed = this._anchorLeftVisible !== value;

            this._anchorLeftVisible = value;

            if(changed) {
                this.anchorLeft.visible = value;
                this.onAnchorLeftVisibleChanged();
            }
        }

        //endregion

    }

}
