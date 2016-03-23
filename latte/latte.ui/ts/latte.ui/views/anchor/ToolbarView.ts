module latte{
    /**
     * A View with a toolbar on the top, bottom or side
     **/
    export class ToolbarView extends AnchorView{

        /**
         * Toolbar of the view
         **/
        toolbar: Toolbar;

        /**
         * Creates the ToolbarView
         **/
        constructor(){

            // Init
            super();

            this.toolbar = new Toolbar();
            this.anchorTop = this.toolbar;

            this.element.addClass('toolbar');

            // Init elements
            this.toolbar.itemsChanged.add(() => {
                this.onLayout();
            });

        }

        onAnchorTopChanged(){

            this.toolbar.direction = Direction.HORIZONTAL;
            this.removeClass('top left bottom right');
            this.addClass('top');

            super.onAnchorTopChanged();

        }

        onAnchorRightChanged(){

            this.toolbar.direction = Direction.VERTICAL;
            this.removeClass('top left bottom right');
            this.addClass('right');

            super.onAnchorRightChanged();

        }

        onAnchorBottomChanged(){

            this.toolbar.direction = Direction.HORIZONTAL;
            this.removeClass('top left bottom right');
            this.addClass('bottom');

            super.onAnchorBottomChanged();

        }

        onAnchorLeftChanged(){

            this.toolbar.direction = Direction.VERTICAL;
            this.removeClass('top left bottom right');
            this.addClass('left');

            super.onAnchorLeftChanged();

        }

    }
}