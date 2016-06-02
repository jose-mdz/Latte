/// <reference path="datalatte.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="latte.api.strings.d.ts" />
/// <reference path="latte.d.ts" />
/// <reference path="latte.strings.d.ts" />
/// <reference path="latte.ui.d.ts" />
/// <reference path="latte.ui.strings.d.ts" />
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
        initView(): void;
        cleanDescription(lines: string[]): string;
        sortObject(o: any): any;
        propertiesTable(): Item;
        methodsTable(): Item;
        /**
         * Returns a type label
         * @param type
         * @returns {latte.LabelItem}
         */
        typeLabel(type: any): LabelItem;
        /**
         *
         */
        staticLabel(): JQuery;
        /**
         * Back field for event
         */
        private _navigate;
        /**
         * Gets an event raised when navigation to a class is requested
         *
         * @returns {LatteEvent}
         */
        navigate: LatteEvent;
        /**
         * Raises the <c>navigate</c> event
         */
        onNavigate(className: string): void;
        /**
         * Property field
         */
        private _source;
        /**
         * Gets the source of the detail view
         *
         * @returns {any}
         */
        source: any;
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
        addModuleNode(className: string): void;
        addMemberNode(node: TreeItem, member: string): void;
        /**
         * Loads the class tree
         */
        loadTree(): void;
        /**
         * Field for treeView property
         */
        private _treeView;
        /**
         * Gets the treeView
         *
         * @returns {TreeView}
         */
        treeView: TreeView;
    }
}
