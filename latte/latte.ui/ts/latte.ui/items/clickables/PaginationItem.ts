module latte{
    /**
     * ButtonGroup with pagination information
     **/
    export class PaginationItem extends ButtonGroupItem{

        /**
         *
         **/
        private _page: number = 1;

        /**
         *
         **/
        private _pages: number = 1;

        /**
         *
         **/
        btnCurrent: ButtonItem;

        /**
         *
         **/
        btnNext: ButtonItem;

        /**
         *
         **/
        btnPrevious: ButtonItem;

        /**
         * Raised when page changes
         **/
        pageChanged: LatteEvent;


        /**
         *
         **/
        constructor(){


            super();
            this.addClass('pagination');

            // Events
            this.pageChanged = new LatteEvent(this);

            // Elements
            this.btnCurrent = new ButtonItem();
            this.btnNext = new ButtonItem();
            this.btnNext.icon = LinearIcon.chevron_right;
            this.btnPrevious = new ButtonItem();
            this.btnPrevious.icon = LinearIcon.chevron_left;

            // Tag CSS
            this.btnPrevious.addClass('previous');
            this.btnCurrent.addClass('current');
            this.btnNext.addClass('next');

            this.btnCurrent.items.add(this.btnOverlay);
            this.btnCurrent.dropdownVisible = false;

            this.buttons.addArray([
                this.btnPrevious, this.btnCurrent, this.btnNext
            ]);

            this.btnNext.faceVisible = this.btnPrevious.faceVisible = this.btnCurrent.faceVisible = false;

            // Wire events
            this.btnNext.click.add(() => {this.nextPage()});
            this.btnPrevious.click.add(() => {this.previousPage()});

            this.page = 1;
            this.pages = 1;

        }

        /**
         * Navigates to next page, if possible.
         **/
        nextPage(){

            if(this.page < this.pages){
                this.page = this.page + 1;
            }

        }

        /**
         * Raises the <c>pageChanged</c> event
         **/
        onPageChanged(){
            this.pageChanged.raise();
        }

        /**
         * Navigates to the previous page, if possible.
         **/
        previousPage(){

            if(this.page > 0){
                this.page = this.page - 1;
            }

        }

        // region Private Methods

        txtPage_enterPressed(){

            if(!(+this.txtPage.value > this.pages)){
                if(this.txtPage.value == "" || +this.txtPage.value <= 0 || isNaN(+this.txtPage.value))
                    this.txtPage.value = this.page + "";

                // Set page
                this.page = parseInt(<any>this.txtPage.value, 10);
            }
            else{
                this.txtPage.value = this.page + "";
            }
        }

        // endregion

        /**
         * Gets or sets the current page
         **/
        get page(): number{
            return this.getPage();
        }

        /**
         * Gets or sets the current page
         **/
        set page(value: number){
           this.setPage(value);
        }

        /**
         * Gets the current page.
         * @returns {number}
         */
        getPage(): number{
            return this._page;
        }

        /**
         * Sets the current page.
         * Optionally omits the <c>pageChanged</c> event trigger.
         * @param value
         * @param silent
         */
        setPage(value: number, silent: boolean = false){

            var changed = this._page != value;

            this._page = value;
            this.btnCurrent.text = this._page + '/' + this._pages;
            this.btnNext.enabled = this._page < this.pages;
            this.btnPrevious.enabled = this._page > 1;

            this.txtPage.enabled = this._page <= this.pages && this._page >= 1;

            if(changed && silent !== true){
                this.onPageChanged();
            }
        }


        /**
         * Gets or sets the amount of pages for navigation
         **/
        get pages(): number{
            return this._pages;
        }

        /**
         * Gets or sets the amount of pages for navigation
         **/
        set pages(value: number){

            this._pages = value;
            this.btnCurrent.text = this._page + '/' + this._pages;
            this.enabled = value > 1;

            if(this.enabled)
                this.page = this.page;


        }


        private _txtPage:TextboxItem;

        public get txtPage():TextboxItem {
            if (!this._txtPage) {
                this._txtPage = new TextboxItem();
                this._txtPage.value = this.page + "";
                this._txtPage.input.width(20);
                this._txtPage.input.height(14);
                this._txtPage.enabled = false;
                this._txtPage.enterPressed.add(this.txtPage_enterPressed, this);

                this._txtPage.element.css({float: 'left'});
            }
            return this._txtPage;
        }

        /**
         * Fields for lblPages property.
         */
        private _lblPages:LabelItem;

        /**
         * Gets a value indicating
         */
        public get lblPages():LabelItem {
            if (!this._lblPages) {
                this._lblPages = new LabelItem(strings.goToPage);
                this._lblPages.element.css({float: 'left', paddingTop: 5, paddingRight: 5, color: 'black'});
            }

            return this._lblPages;
        }

        /**
         * Fields for btnGo property.
         */
        private _btnGo:ButtonItem;

        /**
         * Gets a value indicating
         */
        public get btnGo():ButtonItem {
            if (!this._btnGo) {
                this._btnGo = new ButtonItem("Ir");
                this._btnGo.removeClass('clickable');
                this._btnGo.element.css({float: 'left'});
                this._btnGo.click.add(this.txtPage_enterPressed, this);
            }

            return this._btnGo;
        }

        /**
         * Fields for btnOverlay property.
         */
        private _btnOverlay:ButtonItem;

        /**
         * Gets a value indicating
         */
        public get btnOverlay():ButtonItem {
            if (!this._btnOverlay) {
                this._btnOverlay = new ButtonItem();
                this._btnOverlay.faceVisible = false;
                this._btnOverlay.removeClass('clickable');
                this._btnOverlay.height = 28;

                this._btnOverlay.label.contentElement.append(this.lblPages.element);
                this._btnOverlay.label.contentElement.append(this.txtPage.element);
                //this._btnOverlay.label.contentElement.append(this.btnGo.element);

                this._btnOverlay.label.contentElement.clear();
            }

            return this._btnOverlay;
        }


    }
}