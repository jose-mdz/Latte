module latte{
    /**
     *
     **/
    export class NavigationListView extends NavigationView{

        /**
         *
         **/
        list: ListView;

        /**
         *
         **/
        toolbar: Toolbar;


        /**
         *
         **/
        constructor(){

            super();

            this.addClass('list');

            // Initialize view
            var t = new ToolbarView();

            this.view = t;

            // Get toolbar pointer
            this.toolbar = t.toolbar;

            // Assign list view as main view of toolbar view
            this.view.view = this.list = new ListView();

        }
    }
}