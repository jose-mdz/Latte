/**
 * Created by josemanuel on 8/4/16.
 */
module latte {

    /**
     *
     */
    export class SwitchItem extends ValueItem<boolean> {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();

            this.addClass('switch');
            this.element.append(this.orb);

            this.addEventListener('click', () => this.value = !this.value );
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Override.
         */
        onGetValueString(): string{
            return this.value ? strings.switchOn : strings.switchOff;
        }

        /**
         * Override.
         */
        onValueChanged(){
            super.onValueChanged();

            let value = this.value;

            if(!_isBoolean(value) && _isString(value) && _isNumeric(value)) {
                this.value = !!parseInt(<any>value);
            }else {
                this.ensureClass('on', this.value);
            }
        }

        /**
         * Override
         */
        serialize(): string{
            return this.value ? "1" : "0";
        }

        /**
         * Override
         */
        unserialize(value: string){
            this.value = !!parseInt(value);
        }

        //endregion

        //region Events
        //endregion

        //region Properties

        //endregion

        //region Components
        /**
         * Field for orb property
         */
        private _orb: HTMLElement;

        /**
         * Gets the orb of the switch
         *
         * @returns {HTMLElement}
         */
        get orb(): HTMLElement {
            if (!this._orb) {
                this._orb = document.createElement('div');
                this._orb.classList.add('orb');
            }
            return this._orb;
        }

        //endregion

    }

}