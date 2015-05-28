/// <reference path="app.contacts.strings.d.ts" />
/// <reference path="datalatte.d.ts" />
/// <reference path="latte.d.ts" />
/// <reference path="latte.data.d.ts" />
/// <reference path="latte.data.strings.d.ts" />
/// <reference path="latte.element.d.ts" />
/// <reference path="latte.strings.d.ts" />
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
         * Database field: int(11)
         */
        idcategory: any;
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
        /**
         * Database field: varchar(255)
         */
        address: any;
        /**
         * Database field: varchar(128)
         */
        phone: any;
        /**
         * Database field: varchar(128)
         */
        mobile: any;
        /**
         * Database field: text
         */
        note: any;
        /**
         * Database field: varchar(128)
         */
        company: any;
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields(): any;
        static search(options: PersonSearchOptions, page?: number, pageSize?: number): RemoteCall<PageResult<Person>>;
    }
    class categoryBase extends DataRecord {
        _recordType: string;
        _moduleName: string;
        /**
         * Database field: int(11)
         */
        idcategory: any;
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName(): string;
        /**
         * Database field: varchar(128)
         */
        name: any;
        /**
         * Database field: varchar(128)
         */
        group: any;
        /**
         * Database field: int(11)
         */
        i: any;
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields(): any;
        static fullCatalog(): RemoteCall<Category[]>;
    }
}
declare module latte {
    class ContactsMainViewBase extends Element<HTMLDivElement> {
        private _btnAdd;
        btnAdd: Element<HTMLDivElement>;
        private _btnEdit;
        btnEdit: Element<HTMLDivElement>;
        private _detailHeader;
        detailHeader: Element<HTMLDivElement>;
        private _detailRows;
        detailRows: Element<HTMLDivElement>;
        private _detailToolbar;
        detailToolbar: Element<HTMLDivElement>;
        private _lblAddress;
        lblAddress: Element<HTMLDivElement>;
        private _lblDescription;
        lblDescription: Element<HTMLDivElement>;
        private _lblFirstName;
        lblFirstName: Element<HTMLDivElement>;
        private _lblInitials;
        lblInitials: Element<HTMLDivElement>;
        private _lblLastName;
        lblLastName: Element<HTMLDivElement>;
        private _lblMobile;
        lblMobile: Element<HTMLDivElement>;
        private _lblNote;
        lblNote: Element<HTMLDivElement>;
        private _lblPhone;
        lblPhone: Element<HTMLDivElement>;
        private _listGroups;
        listGroups: Element<HTMLDivElement>;
        private _listPeople;
        listPeople: Element<HTMLDivElement>;
        private _panelDetail;
        panelDetail: Element<HTMLDivElement>;
        private _txtSearch;
        txtSearch: Textbox;
        private static _Model;
        static getModel(): Element<HTMLDivElement>;
        constructor();
    }
}
declare module latte {
    class ListItem extends Element<HTMLDivElement> {
        private static _Model;
        static getModel(): Element<HTMLDivElement>;
        constructor();
    }
}
declare module latte {
    class ListItemHeader extends Element<HTMLDivElement> {
        private static _Model;
        static getModel(): Element<HTMLDivElement>;
        constructor();
    }
}
declare module latte {
    var globalViewsBank: {
        "ContactsMainViewBase": string;
        "ListItem": string;
        "ListItemHeader": string;
    };
}
/**
 * Created by josemanuel on 5/27/15.
 */
declare module latte {
    interface PersonSearchOptions {
        idcategory?: number;
        text?: string;
    }
    /**
     *
     */
    class ContactsMainView extends ContactsMainViewBase {
        /**
         * Creates the view
         */
        constructor();
        selectCategoryItem(item: ListItem): void;
        selectPersonItem(item: ListItem): void;
        btnAdd_Click(): void;
        btnEdit_Click(): void;
        lblFirstName_Focus(): void;
        lblLastName_Focus(): void;
        loadCategories(): void;
        /**
         * Loads the contacts of the specified filters
         */
        loadContacts(): void;
        /**
         * Raises the <c>editMode</c> event
         */
        onEditModeChanged(): void;
        /**
         * Raises the <c>person</c> event
         */
        onPersonChanged(): void;
        /**
         * Raises the <c>selectedCategory</c> event
         */
        onSelectedCategoryChanged(): void;
        txtSearch_Change(): void;
        /**
         * Back field for event
         */
        private _editModeChanged;
        /**
         * Gets an event raised when the value of the editMode property changes
         *
         * @returns {LatteEvent}
         */
        editModeChanged: LatteEvent;
        /**
         * Back field for event
         */
        private _personChanged;
        /**
         * Gets an event raised when the value of the person property changes
         *
         * @returns {LatteEvent}
         */
        personChanged: LatteEvent;
        /**
         * Back field for event
         */
        private _selectedCategoryChanged;
        /**
         * Gets an event raised when the value of the selectedCategory property changes
         *
         * @returns {LatteEvent}
         */
        selectedCategoryChanged: LatteEvent;
        /**
         * Property field
         */
        private _selectedCategory;
        /**
         * Gets or sets the currently selected category, if any.
         *
         * @returns {Category}
         */
        /**
         * Gets or sets the currently selected category, if any.
         *
         * @param {Category} value
         */
        selectedCategory: Category;
        /**
         * Property field
         */
        private _editMode;
        /**
         * Gets or sets a value indicating if the view is in edit mode
         *
         * @returns {boolean}
         */
        /**
         * Gets or sets a value indicating if the view is in edit mode
         *
         * @param {boolean} value
         */
        editMode: boolean;
        /**
         * Property field
         */
        private _person;
        /**
         * Gets or sets the person of the detail zone
         *
         * @returns {Person}
         */
        /**
         * Gets or sets the person of the detail zone
         *
         * @param {Person} value
         */
        person: Person;
    }
}
/**
 * Created by josemanuel on 5/27/15.
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
 * Created by josemanuel on 5/27/15.
 */
declare module latte {
    /**
     *
     */
    class Category extends categoryBase {
        /**
         *
         */
        constructor();
    }
}
/**
 * Created by josemanuel on 5/27/15.
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
        /**
         * Gets the character for indexing the contact
         *
         * @returns {string}
         */
        charForIndex: string;
        /**
         * Gets the full name of the person
         *
         * @returns {string}
         */
        fullName: string;
        /**
         * Gets the initials of the person
         *
         * @returns {string}
         */
        initials: string;
    }
}
