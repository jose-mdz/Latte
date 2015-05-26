/// <reference path="_api.strings.d.ts" />
/// <reference path="_ui.d.ts" />
/// <reference path="_ui.strings.d.ts" />
/// <reference path="datalatte.d.ts" />
/// <reference path="jquery.d.ts" />
/**
* Created by josemanuel on 7/25/14.
*/
declare module latte {
    /**
    *
    */
    class ReflectionInfo {
        /**
        *
        */
        constructor();
    }
}
/**
* Created by josemanuel on 7/25/14.
*/
declare module latte {
    /**
    *
    */
    class TsPropertyInfo extends ReflectionInfo {
        /**
        *
        */
        constructor();
    }
}
/**
* Created by josemanuel on 7/25/14.
*/
declare module latte {
    /**
    *
    */
    class TsClassInfo extends ReflectionInfo {
        /**
        *
        */
        constructor();
    }
}
/**
* Created by josemanuel on 7/25/14.
*/
declare module latte {
    /**
    *
    */
    class TsEventInfo extends TsPropertyInfo {
        /**
        *
        */
        constructor();
    }
}
/**
* Created by josemanuel on 7/25/14.
*/
declare module latte {
    /**
    *
    */
    class TsFieldInfo extends ReflectionInfo {
        /**
        *
        */
        constructor();
    }
}
/**
* Created by josemanuel on 7/25/14.
*/
declare module latte {
    /**
    *
    */
    class TsMethodInfo extends ReflectionInfo {
        /**
        *
        */
        constructor();
    }
}
/**
* Created by josemanuel on 3/7/14.
*/
declare module latte {
    /**
    *
    */
    class ApiDetailView extends ColumnView {
        /**
        *
        */
        constructor(source: any);
        public initView(): void;
        public propertiesTable(): Item;
        public methodsTable(): Item;
        /**
        * Returns a type label
        * @param type
        * @returns {latte.LabelItem}
        */
        public typeLabel(type: any): LabelItem;
        /**
        *
        */
        public staticLabel(): JQuery;
        /**
        * Back field for event
        */
        private _navigate;
        /**
        * Gets an event raised when navigation to a class is requested
        *
        * @returns {LatteEvent}
        */
        public navigate : LatteEvent;
        /**
        * Raises the <c>navigate</c> event
        */
        public onNavigate(className: string): void;
        /**
        * Property field
        */
        private _source;
        /**
        * Gets the source of the detail view
        *
        * @returns {any}
        */
        public source : any;
    }
}
/**
* Created by josemanuel on 3/7/14.
*/
declare module latte {
    /**
    *
    */
    class MainApiView extends SplitView {
        /**
        *
        */
        constructor();
        /**
        * Adds the className to the tree
        *
        * @param className
        */
        public addModuleNode(className: string): void;
        public addMemberNode(node: TreeItem, member: string): void;
        /**
        * Loads the class tree
        */
        public loadTree(): void;
        /**
        * Field for treeView property
        */
        private _treeView;
        /**
        * Gets the treeView
        *
        * @returns {TreeView}
        */
        public treeView : TreeView;
    }
}
