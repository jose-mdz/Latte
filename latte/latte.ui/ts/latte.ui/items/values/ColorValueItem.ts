/**
 * Created by josemanuel on 7/1/14.
 */
module latte {

    /**
     *
     */
    export class ColorValueItem extends ValueItem<string> {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor(color: Color = null) {
            super();

            this.element.append(this.button.element);

            if(!color) {
                color = Color.black;
            }

            this.color = color;
        }

        //region Private Methods
        //endregion

        //region Methods

        setValue(value: string){
            this.color = Color.fromHex(value);
        }

        get value(): string{
            return this.color.toHexString();
        }

        onLayout(){
            super.onLayout();

            this.button.onLayout();
        }

        //endregion

        //region Events
        //endregion

        //region Components

        /**
         * Field for colorPicker property
         */
        private _colorPicker:ColorPicker;

        /**
         * Gets the color picker
         *
         * @returns {ColorPicker}
         */
        public get colorPicker():ColorPicker {
            if (!this._colorPicker) {
                this._colorPicker = new ColorPicker();
                this._colorPicker.colorChanged.add(() => {
                    this.color = this._colorPicker.color;
                    this.onValueChanged();
                });
            }
            return this._colorPicker;
        }


        /**
         * Field for button property
         */
        private _button:ButtonItem;

        /**
         * Gets the button for selection
         *
         * @returns {ButtonItem}
         */
        public get button():ButtonItem {
            if (!this._button) {
                this._button = new ButtonItem();
                this._button.items.add(this.colorPicker);
                this._button.icon = this.icon;
            }
            return this._button;
        }


        //endregion

        //region Properties

        /**
         * Property field
         */
        private _color:Color = null;

        /**
         * Gets or sets the color of the item
         *
         * @returns {Color}
         */
        public get color():Color {
            return this._color;
        }

        /**
         * Gets or sets the color of the item
         *
         * @param {Color} value
         */
        public set color(value:Color) {
            this._color = value;
            this.icon.color = value;
        }

        /**
         * Field for icon property
         */
        private _icon:ColorIconItem;

        /**
         * Gets the color icon
         *
         * @returns {ColorIconItem}
         */
        public get icon():ColorIconItem {
            if (!this._icon) {
                this._icon = new ColorIconItem(Color.black);
            }
            return this._icon;
        }


        //endregion

    }

}