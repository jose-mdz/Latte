module latte{
    /**
     * Represents a square Icon.

     Icons may be come from a single image, or from a sprite image with several icons.
     <c>IconItem</c> comes with a default sprite built in with a wide variety of icons.
     **/
    export class IconItem extends Item{

        //region Static

        static sidebar_left_getter: () => IconItem = () => LinearIcon.map;

        static sidebar_right_getter: () => IconItem = () => LinearIcon.map;

        /**
         * Default URL of sprite used if coordinates are specified, and no <c>url</c> is provided.
         **/
        static get defaultUrl(): string {
            return _latteUrl() + '/releases/latte.ui/support/imgs/std-icons.png';
        }

        /**
         * Creates an empty icon of the specified size
         **/
        static empty(size: number = 16): IconItem{
            var icon = new IconItem();
            icon.size = size;
            icon.url = null;
            return icon;
        }

        /**
         * Gets a standard icon of the specified u and v coordinates. Size 16.
         **/
        static standard(u: number, v: number, size = 16): IconItem{

            var icon = new IconItem();
            icon.u = u;
            icon.v = v;
            icon.size = size;
            return icon;

        }

        /**
         *
         * @returns {IconItem}
         */
        static fileIcon(): IconItem{
            return LinearIcon.file_empty;
        }

        /**
         *
         * @returns {IconItem}
         */
        static folderIcon(): IconItem{
            return LinearIcon.book;
        }

        /**
         *
         * @returns {IconItem}
         */
        static homeIcon(): IconItem{
            return LinearIcon.home;
        }

        /**
         *
         * @returns {IconItem}
         */
        static newIcon(): IconItem{
            return LinearIcon.file_add;
        }

        /**
         *
         * @returns {IconItem}
         */
        static saveIcon(): IconItem{
            return LinearIcon.cloud_upload;
        }

        /**
         *
         * @returns {IconItem}
         */
        static refreshIcon(): IconItem{
            return LinearIcon.sync;
        }

        /**
         *
         * @returns {IconItem}
         */
        static sidebarLeft(): IconItem{
            return IconItem.sidebar_left_getter();
        }

        /**
         *
         * @returns {IconItem}
         */
        static sidebarRight(): IconItem{
            return IconItem.sidebar_right_getter();
        }

        /**
         *
         * @returns {IconItem}
         */
        static editIcon(): IconItem{
            return LinearIcon.pencil
        }

        /**
         *
         * @returns {IconItem}
         */
        static deleteIcon(): IconItem{
            return LinearIcon.cross;
        }

        //endregion

        /**
         * Creates the icon
         **/
        constructor(){

            super();

            this.element.addClass('icon');

            if(IconItem.defaultUrl !== null)
                this.url = IconItem.defaultUrl;

            // Initalize size
            this.size = this._size;

        }

        //region Methods
        /**
         * Returns a clone of the icon
         **/
        clone(): IconItem{

            var icon = new IconItem();

            icon.name = this.name;
            icon.size = this.size;
            icon.url = this.url;
            icon.x = this.x;
            icon.y = this.y;

            return icon;

        }
        //endregion

        //region Properties
        /**
         *
         **/
        private _name: string = '';

        /**
         * Gets or sets the name of the icon
         **/
        get name(): string{
            return this._name;
        }

        /**
         * Gets or sets the name of the icon
         **/
        set name(value: string){

            this._name = value;


        }

        /**
         *
         **/
        private _size: number = 16;

        /**
         * Gets or sets the size of the icon
         The only possible values are: <c>16</c> | <c>32</c> | <c>48</c>
         **/
        get size(): number{
            return this._size;
        }

        /**
         * Gets or sets the size of the icon
         The only possible values are: <c>16</c> | <c>32</c> | <c>48</c>
         **/
        set size(value: number){


            //if(value != 16 && value != 32 && value != 48)
            //    throw "Icon.size(" + value + ") size not supported";

            // Set size attributes
            this.element.width(value).height(value);

            this._size = value;

            if(_isNumber(this.u)) this.u = this.u;
            if(_isNumber(this.v)) this.v = this.v;

            this.addClass('size-' + value);

        }





        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        get u(): number{
            return this._u;
        }

        /**
         *
         **/
        private _u: number;

        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        set u(value: number){


            this._u = value;
            this.x = (value - 1) * this.size;


        }

        /**
         *
         **/
        private _url: string;

        /**
         * Gets or sets the URL of the icon's image URL
         **/
        get url(): string{
            return this._url;
        }

        /**
         * Gets or sets the URL of the icon's image URL
         **/
        set url(value: string){

            if(_isString(value) && value.length > 0) {
                this.element.css({
                    backgroundImage: 'url(' + value + ')',
                    backgroundRepeat: 'no-repeat'
                });
            }else {
                this.element.css({
                    backgroundImage: '',
                    backgroundRepeat: ''
                });
            }

            this._url = value;

        }

        /**
         *
         **/
        private _v: number;

        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        get v(): number{
            return this._v;
        }

        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        set v(value: number){

            this._v = value;
            this.y = (value - 1) * this.size;


        }

        /**
         *
         **/
        private _x: number;

        /**
         * Gets or sets the X coordinate of icon inside image (As a sprite)
         **/
        get x(): number{
            return this._x;
        }

        /**
         * Gets or sets the X coordinate of icon inside image (As a sprite)
         **/
        set x(value: number){


            this._x = value;

            this.element.css('background-position',
                (this._x !== null ? '-' + this._x : '0') + "px " + (this._y !== null ? '-' + this._y : '0') + "px" );


        }

        /**
         *
         **/
        private _y: number;

        /**
         * Gets or sets the Y coordinate of icon inside image (As a sprite)
         **/
        get y(): number{
            return this._y;
        }

        /**
         * Gets or sets the Y coordinate of icon inside image (As a sprite)
         **/
        set y(value: number){


            this._y = value;

            this.element.css('background-position',
                (this._x !== null ? '-' + this._x : '0') + "px " + (this._y !== null ? '-' + this._y : '0') + "px" );


        }
        //endregion

    }
}