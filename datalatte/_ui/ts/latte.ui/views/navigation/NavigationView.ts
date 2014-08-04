module latte{
    /**
     *
     **/
    export class NavigationView extends SplitView{

        /**
         *
         **/
        tree: TreeView;

        /**
         *
         **/
        treeToolbar: Toolbar;

        /**
         *
         **/
        constructor(){

            super();

            this.addClass('navigation');

            this.tree = new TreeView();

            this.sideView = new ToolbarView();

            this.sideView.view = this.tree;

            this.treeToolbar = (<ToolbarView>this.sideView).toolbar;

        }
    }
}