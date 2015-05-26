module latte{
    /**
     * represents an action
     **/
    export class Action{

        /**
         *
         **/
        private _buttons: Array<Item> = [];

        /**
         *
         **/
        private _checked: boolean;

        /**
         *
         **/
        private _description: string;

        /**
         *
         **/
        private _enabled: boolean = true;

        /**
         *
         **/
        private _icon: IconItem;

        /**
         *
         **/
        private _text: string;

        /**
         * Contains sub-actions of the icon
         **/
        actions: Collection<Action>;

        /**
         * Raised when the action is clicked or invoked.
         **/
        execute: LatteEvent;


        /**
         * Creates the action
         **/
        constructor(text: string = null, icon: IconItem = null, execute: () => any = null, description: string = null){


            // Initialize events
            this.execute = new LatteEvent(this);

            // Initialize collections
            this.actions = new Collection<Action>();

            // Create buttons array
            this._buttons = [];

            if(text) {
                this.text = text;
            }

            if(icon) {
                this.icon = icon;
            }

            if(execute) {
                this.execute.add(execute);
            }

            if(description) {
                this.description = description;
            }

        }

        /**
         * Gets or sets a value indicating if the action is currently checked
         **/
        get checked(): boolean{
            return this._checked;
        }

        /**
         * Gets or sets a value indicating if the action is currently checked
         **/
        set checked(value: boolean){


            this._checked = value;

            for(var i = 0; i < this._buttons.length; i++)
                (<ButtonItem>this._buttons[i]).checked = value;



        }

        /**
         * Gets or sets the description of the action
         **/
        get description(): string{
            return this._description;
        }

        /**
         * Gets or sets the description of the action
         **/
        set description(value: string){


            this._description = value;

            for(var i = 0; i < this._buttons.length; i++)
                (<ButtonItem>this._buttons[i]).description = value;



        }

        /**
         * Gets or sets a value indicating if the action is currently enabled
         **/
        get enabled(): boolean{
            return this._enabled;
        }

        /**
         * Gets or sets a value indicating if the action is currently enabled
         **/
        set enabled(value: boolean){


            this._enabled = value;

            for(var i = 0; i < this._buttons.length; i++)
                this._buttons[i].enabled = value;



        }

        /**
         * Gets a <c>ButtonItem</c> representation of the action
         **/
        getButton(): ButtonItem{

            var b = new ButtonItem();
            var a = this;

            this._buttons.push(b);

            b.text = this.text;
            b.description = this.description;
            b.enabled = this.enabled;
            //b.checked = this.checked;
            b.click.add( () => { a.execute.raise(); });
            if(this.icon)
                b.icon = this.icon.clone();

            return b;

        }

        /**
         * Gets or sets the 16 x 16 icon of the action
         **/
        get icon(): IconItem{
            return this._icon;
        }

        /**
         * Gets or sets the 16 x 16 icon of the action
         **/
        set icon(value: IconItem){


            this._icon = value;

            for(var i = 0; i < this._buttons.length; i++)
                (<ButtonItem>this._buttons[i]).icon = value.clone();



        }

        /**
         * Gets or sets the text of the action
         **/
        get text(): string{
            return this._text;
        }

        /**
         * Gets or sets the text of the action
         **/
        set text(value: string){


            this._text = value;

            for(var i = 0; i < this._buttons.length; i++)
                (<ButtonItem>this._buttons[i]).text = value;



        }
    }
}