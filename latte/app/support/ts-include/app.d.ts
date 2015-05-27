/// <reference path="app.strings.d.ts" />
/// <reference path="datalatte.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="latte.d.ts" />
/// <reference path="latte.data.d.ts" />
/// <reference path="latte.data.strings.d.ts" />
/// <reference path="latte.data.ui.d.ts" />
/// <reference path="latte.strings.d.ts" />
/// <reference path="latte.ui.d.ts" />
/// <reference path="latte.ui.strings.d.ts" />
declare module latte {
    class personBase extends DataRecord {
        _recordType: string;
        _moduleName: string;
        /**
         * Database field: int(11)
         */
        idperson: any;
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName(): string;
        /**
         * Database field: varchar(128)
         */
        title: any;
        /**
         * Database field: varchar(128)
         */
        name: any;
        /**
         * Database field: varchar(128)
         */
        lastname: any;
        /**
         * Database field: date
         */
        birth: any;
        /**
         * Database field: varchar(10)
         */
        sex: any;
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
        loadList(): void;
        /**
         * Field for btnNew property
         */
        private _btnNew;
        /**
         * Gets the "New" Button
         *
         * @returns {ButtonItem}
         */
        btnNew: ButtonItem;
        /**
         * Field for paginator property
         */
        private _paginator;
        /**
         * Gets the pagination item
         *
         * @returns {PaginationItem}
         */
        paginator: PaginationItem;
        /**
         * Field for listView property
         */
        private _listView;
        /**
         * Gets the list view
         *
         * @returns {ListView}
         */
        listView: ListView;
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
        getMetadata(): {
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
