module latte{
    /**
     * Base class for UI items.

     The <c>element</c> property points to the DOM element who contains the item.
     **/
    export class Item extends UiElement{


        /**
         * Creates a Clickable element. This element will react to clicks and mouse movement.
         **/
        static clickable(): JQuery{


            return UiElement.disableTextSelection($('<div>')
                .addClass('clickable')
                .mouseover(function(){

                    var $this = $(this);

                    if($this.hasClass('disabled')) return;

                    if(!$this.hasClass('with-menu'))
                        $this.addClass('hover')
                })
                .mouseout( function(){

                    var $this = $(this);

                    if($this.hasClass('disabled')) return;

                    $this.removeClass('hover');
                    $this.removeClass('pressed');
                })
                .mousedown(function(){

                    var $this = $(this);

                    if($this.hasClass('disabled')) return;

                    $this.addClass('pressed');
                })
                .mouseup(  function(){

                    var $this = $(this);

                    // Remove Pressed
                    $this.removeClass('pressed');

                    // Check if checkable
                    if($this.hasClass('checkable')){
                        if($this.hasClass('checked')){
                            $this.removeClass('checked');
                        }else{
                            $this.addClass('checked');
                        }
                    }

                }));

        }

        /**
         * Creates a Selectable element. This element will react to clicks and mouse movement.
         **/
        static selectable(): JQuery{

            return UiElement.disableTextSelection($('<div>')
                .addClass('selectable')
                .click(function(){
                    var $this = $(this);
                    if($this.hasClass('selected')){
                        $this.removeClass('selected');
                    }
                    else{
                        $this.addClass('selected');
                        $this.removeClass('hover');
                    }
                })
                .mouseover(function(){
                    if(!$(this).hasClass('selected'))
                        $(this).addClass('hover')
                })
                .mouseout( function(){

                    $(this).removeClass('hover pressed');
                }));

        }

        /**
         *
         */
        private _tab: TabItem;

        /**
         * Creates a new <c>Item</c>
         **/
        constructor(){


            super();

            // Create base element
            this.element.addClass('latte-item');


        }

        /**
         * Brings the item to the front
         **/
        bringToFront(){

            ZIndex.bringToFront(this.element);

        }

        /**
         * Gets the <c>MenuOverlay</c> who contains this <c>Item</c>
         **/
        get parentMenu(): MenuOverlay{

            var r = null;

            if(this.parentIsMenu){
                r = this.element.parent().data('instance');
            }

            return r;

        }

        /**
         * Gets a value indicating if the parent of this <c>Item</c> is a <c>MenuOverlay</c>
         **/
        get parentIsMenu(): boolean{

            return this.element.parent().is('.latte-overlay.menu');

        }

        /**
         * Gets or sets the tab or tab index of item when inside a <c>Ribbon</c>
         **/
        get tab(): any{
            return this._tab;
        }

        /**
         * Gets or sets the tab or tab index of item when inside a <c>Ribbon</c>
         **/
        set tab(value: any){

            this._tab = value;

        }
    }
}