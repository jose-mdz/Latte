module latte{
    /**
     * Represents a square Icon.

     Icons may be come from a single image, or from a sprite image with several icons.
     <c>IconItem</c> comes with a default sprite built in with a wide variety of icons.
     **/
    export class IconItem extends Item{

        /**
         * Default URL of sprite used if coordinates are specified, and no <c>url</c> is provided.
         **/
        static defaultUrl: string = '/datalatte-files/releases/_ui/support/imgs/std-icons.png';

        /**
         * Creates an empty icon of the specified size
         **/
        static empty(size: number): IconItem{
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
         **/
        private _name: string = '';

        /**
         *
         **/
        private _size: number = 16;

        /**
         *
         **/
        private _u: number;

        /**
         *
         **/
        private _url: string;

        /**
         *
         **/
        private _v: number;

        /**
         *
         **/
        private _x: number;

        /**
         *
         **/
        private _y: number;

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


        }

        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        get u(): number{
            return this._u;
        }

        /**
         * Gets or sets the U coordiante of the icon inside image
         **/
        set u(value: number){


            this._u = value;
            this.x = (value - 1) * this.size;


        }

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


            if(value !== null){
                this.element.css({
                    backgroundImage: 'url(' + value + ')',
                    backgroundRepeat: 'no-repeat'
                });
            }else{
                this.element.css({
                    backgroundImage: '',
                    backgroundRepeat: ''
                });
            }
            this._url = value;


        }

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
    }
}