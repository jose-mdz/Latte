/**
 * Created by josemanuel on 3/7/14.
 */
module latte {

    declare var apiStructure: any;

    /**
     *
     */
    export class MainApiView extends SplitView {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();

            this.loadTree();
        }

        //region Private Methods
        /**
         * Adds the className to the tree
         *
         * @param className
         */
        addModuleNode(className: string){

            log(className)

            var item = new TreeItem();
            item.text = className;
            item.icon = IconItem.standard(15, 7);
            item.tag = className;

            var names: string[] = [];

            // Load module members
            for(var member in apiStructure[className]){
                names.push(member);
            }

            names.sort();

            for(var i = 0; i < names.length; i++){
                this.addMemberNode(item, names[i]);
            }

            this.treeView.items.add(item);

        }

        addMemberNode(node: TreeItem, member: string){
            var memberItem = new TreeItem();

            memberItem.text = member;
            memberItem.icon = IconItem.standard(13, 7);
            memberItem.tag = member;
            memberItem.selectedChanged.add(() => {
                if(memberItem.selected) {
                    var d = new ApiDetailView(apiStructure[node.tag][member]);

                    d.navigate.add((type) => {

                        log("Navigating " + type)

                        if(type.indexOf('latte.') >= 0) {
                            type = type.substr(6);

                            if(type.indexOf('<') >= 0){
                                type = type.substr(0, type.indexOf('<'));
                            }

                            if(typeof apiStructure[type] != 'undefined'){
                                // GO type
                                for (var i = 0; i < this.treeView.items.length; i++) {
                                    var treeItem:TreeItem = this.treeView.items[i];

                                    if(treeItem.tag == type) {
                                        treeItem.selected = true;
                                    }
                                }
                            }else{
                                log("Type not found: " + type)
                            }
                        }

                    });

                    this.view = d;
                }
            });

            node.items.add(memberItem);
        }

        /**
         * Loads the class tree
         */
        loadTree(){

            var names: string[] = [];

            for(var moduleName in apiStructure){
                names.push(moduleName);
            }

            names.sort();

            for(var i = 0; i < names.length; i++){
                this.addModuleNode(names[i]);
            }

        }
        //endregion

        //region Methods
        //endregion

        //region Events
        //endregion

        //region Properties
        /**
         * Field for treeView property
         */
        private _treeView:TreeView;

        /**
         * Gets the treeView
         *
         * @returns {TreeView}
         */
        public get treeView():TreeView {
            if (!this._treeView) {
                this._treeView = new TreeView();
                this.sideView = this._treeView;
            }
            return this._treeView;
        }

        //endregion

    }

}

window['api'] = () => {
    latte.View.mainView = new latte.MainApiView()
};