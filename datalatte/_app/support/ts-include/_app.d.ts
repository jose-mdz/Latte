/// <reference path="_app.strings.d.ts" />
/// <reference path="_core.d.ts" />
/// <reference path="_core.strings.d.ts" />
/// <reference path="_ui.d.ts" />
/// <reference path="_ui.strings.d.ts" />
/// <reference path="datalatte.d.ts" />
/// <reference path="jquery.d.ts" />
declare module latte {
    class personBase extends DataRecord {
        public _recordType: string;
        public _moduleName: string;
        /**
        * Database field: int(11)
        */
        public idperson: any;
        /**
        * Gets the name of the autoincrement field
        **/
        public onGetRecordIdName(): string;
        /**
        * Database field: varchar(10)
        */
        public title: any;
        /**
        * Database field: varchar(128)
        */
        public name: any;
        /**
        * Database field: varchar(128)
        */
        public lastname: any;
        /**
        * Database field: date
        */
        public birth: any;
        /**
        * Database field: varchar(1)
        */
        public sex: any;
        static search(term?: string, page?: number, pageSize?: number): RemoteCall<PageResult<Person>>;
    }
}
/**
* Created by josemanuel on 6/11/14.
*/
declare module latte {
    /**
    *
    */
    class Main {
        /**
        *
        */
        constructor();
    }
}
/**
* Created by josemanuel on 6/11/14.
*/
declare module latte {
    /**
    *
    */
    class MainView extends ToolbarView {
        /**
        * Creates the Agenda View
        */
        constructor();
        private btnNew_Click();
        /**
        * Loads the list of people in the agenda
        */
        public loadList(): void;
        /**
        * Field for btnNew property
        */
        private _btnNew;
        /**
        * Gets the "New" Button
        *
        * @returns {ButtonItem}
        */
        public btnNew : ButtonItem;
        /**
        * Field for paginator property
        */
        private _paginator;
        /**
        * Gets the pagination item
        *
        * @returns {PaginationItem}
        */
        public paginator : PaginationItem;
        /**
        * Field for listView property
        */
        private _listView;
        /**
        * Gets the list view
        *
        * @returns {ListView}
        */
        public listView : ListView;
    }
}
/**
* Created by josemanuel on 6/11/14.
*/
declare module latte {
    /**
    *
    */
    class Person extends personBase {
        /**
        *
        */
        constructor();
        public getMetadata(): {
            fields: {
                name: {
                    text: string;
                };
                lastname: {
                    text: string;
                };
                sex: {
                    text: string;
                    type: string;
                    options: string[];
                };
                birth: {
                    text: string;
                    type: string;
                };
            };
        };
    }
}
