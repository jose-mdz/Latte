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
        _idperson: any;
        /**
         * Gets or sets the value of the idperson field of type int(11)
         */
        /**
         * Gets or sets the value of the idperson field of type int(11)
         */
        idperson: any;
        /**
         * Back field for event
         */
        _idpersonChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the idperson property changes
         */
        idpersonChanged: LatteEvent;
        /**
         * Raises the <c>idpersonChanged</c> event
         */
        onIdpersonChanged(): void;
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName(): string;
        /**
         * Database field: int(11)
         */
        _idcategory: any;
        /**
         * Gets or sets the value of the idcategory field of type int(11)
         */
        /**
         * Gets or sets the value of the idcategory field of type int(11)
         */
        idcategory: any;
        /**
         * Back field for event
         */
        _idcategoryChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the idcategory property changes
         */
        idcategoryChanged: LatteEvent;
        /**
         * Raises the <c>idcategoryChanged</c> event
         */
        onIdcategoryChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _title: any;
        /**
         * Gets or sets the value of the title field of type varchar(128)
         */
        /**
         * Gets or sets the value of the title field of type varchar(128)
         */
        title: any;
        /**
         * Back field for event
         */
        _titleChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the title property changes
         */
        titleChanged: LatteEvent;
        /**
         * Raises the <c>titleChanged</c> event
         */
        onTitleChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _name: any;
        /**
         * Gets or sets the value of the name field of type varchar(128)
         */
        /**
         * Gets or sets the value of the name field of type varchar(128)
         */
        name: any;
        /**
         * Back field for event
         */
        _nameChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the name property changes
         */
        nameChanged: LatteEvent;
        /**
         * Raises the <c>nameChanged</c> event
         */
        onNameChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _lastname: any;
        /**
         * Gets or sets the value of the lastname field of type varchar(128)
         */
        /**
         * Gets or sets the value of the lastname field of type varchar(128)
         */
        lastname: any;
        /**
         * Back field for event
         */
        _lastnameChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the lastname property changes
         */
        lastnameChanged: LatteEvent;
        /**
         * Raises the <c>lastnameChanged</c> event
         */
        onLastnameChanged(): void;
        /**
         * Database field: date
         */
        _birth: any;
        /**
         * Gets or sets the value of the birth field of type date
         */
        /**
         * Gets or sets the value of the birth field of type date
         */
        birth: any;
        /**
         * Back field for event
         */
        _birthChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the birth property changes
         */
        birthChanged: LatteEvent;
        /**
         * Raises the <c>birthChanged</c> event
         */
        onBirthChanged(): void;
        /**
         * Database field: varchar(10)
         */
        _sex: any;
        /**
         * Gets or sets the value of the sex field of type varchar(10)
         */
        /**
         * Gets or sets the value of the sex field of type varchar(10)
         */
        sex: any;
        /**
         * Back field for event
         */
        _sexChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the sex property changes
         */
        sexChanged: LatteEvent;
        /**
         * Raises the <c>sexChanged</c> event
         */
        onSexChanged(): void;
        /**
         * Database field: varchar(255)
         */
        _address: any;
        /**
         * Gets or sets the value of the address field of type varchar(255)
         */
        /**
         * Gets or sets the value of the address field of type varchar(255)
         */
        address: any;
        /**
         * Back field for event
         */
        _addressChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the address property changes
         */
        addressChanged: LatteEvent;
        /**
         * Raises the <c>addressChanged</c> event
         */
        onAddressChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _phone: any;
        /**
         * Gets or sets the value of the phone field of type varchar(128)
         */
        /**
         * Gets or sets the value of the phone field of type varchar(128)
         */
        phone: any;
        /**
         * Back field for event
         */
        _phoneChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the phone property changes
         */
        phoneChanged: LatteEvent;
        /**
         * Raises the <c>phoneChanged</c> event
         */
        onPhoneChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _mobile: any;
        /**
         * Gets or sets the value of the mobile field of type varchar(128)
         */
        /**
         * Gets or sets the value of the mobile field of type varchar(128)
         */
        mobile: any;
        /**
         * Back field for event
         */
        _mobileChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the mobile property changes
         */
        mobileChanged: LatteEvent;
        /**
         * Raises the <c>mobileChanged</c> event
         */
        onMobileChanged(): void;
        /**
         * Database field: text
         */
        _note: any;
        /**
         * Gets or sets the value of the note field of type text
         */
        /**
         * Gets or sets the value of the note field of type text
         */
        note: any;
        /**
         * Back field for event
         */
        _noteChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the note property changes
         */
        noteChanged: LatteEvent;
        /**
         * Raises the <c>noteChanged</c> event
         */
        onNoteChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _company: any;
        /**
         * Gets or sets the value of the company field of type varchar(128)
         */
        /**
         * Gets or sets the value of the company field of type varchar(128)
         */
        company: any;
        /**
         * Back field for event
         */
        _companyChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the company property changes
         */
        companyChanged: LatteEvent;
        /**
         * Raises the <c>companyChanged</c> event
         */
        onCompanyChanged(): void;
        /**
         * Database field: varchar(128)
         */
        _email: any;
        /**
         * Gets or sets the value of the email field of type varchar(128)
         */
        /**
         * Gets or sets the value of the email field of type varchar(128)
         */
        email: any;
        /**
         * Back field for event
         */
        _emailChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the email property changes
         */
        emailChanged: LatteEvent;
        /**
         * Raises the <c>emailChanged</c> event
         */
        onEmailChanged(): void;
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
        _idcategory: any;
        /**
         * Gets or sets the value of the idcategory field of type int(11)
         */
        /**
         * Gets or sets the value of the idcategory field of type int(11)
         */
        idcategory: any;
        /**
         * Back field for event
         */
        _idcategoryChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the idcategory property changes
         */
        idcategoryChanged: LatteEvent;
        /**
         * Raises the <c>idcategoryChanged</c> event
         */
        onIdcategoryChanged(): void;
        /**
        * Gets the name of the autoincrement field
        **/
        onGetRecordIdName(): string;
        /**
         * Database field: varchar(128)
         */
        _name: any;
        /**
         * Gets or sets the value of the name field of type varchar(128)
         */
        /**
         * Gets or sets the value of the name field of type varchar(128)
         */
        name: any;
        /**
         * Back field for event
         */
        _nameChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the name property changes
         */
        nameChanged: LatteEvent;
        /**
         * Raises the <c>nameChanged</c> event
         */
        onNameChanged(): void;
        /**
         * Database field: int(11)
         */
        _i: any;
        /**
         * Gets or sets the value of the i field of type int(11)
         */
        /**
         * Gets or sets the value of the i field of type int(11)
         */
        i: any;
        /**
         * Back field for event
         */
        _iChanged: LatteEvent;
        /**
         * Gets an event raised when the value of the i property changes
         */
        iChanged: LatteEvent;
        /**
         * Raises the <c>iChanged</c> event
         */
        onIChanged(): void;
        /**
        * Override. Gets data about the fields of the record.
        **/
        onGetFields(): any;
        static fullCatalog(): RemoteCall<Array<Category>>;
    }
}
declare module latte {
    class ContactsMainViewBase extends Element<HTMLDivElement> {
        private _allContactsItem;
        allContactsItem: Element<HTMLDivElement>;
        private _btnAdd;
        btnAdd: Element<HTMLDivElement>;
        private _btnEdit;
        btnEdit: Element<HTMLDivElement>;
        private _detailToolbar;
        detailToolbar: Element<HTMLDivElement>;
        private _listGroups;
        listGroups: Element<HTMLDivElement>;
        private _listPeople;
        listPeople: Element<HTMLDivElement>;
        private _myContacts;
        myContacts: Element<HTMLDivElement>;
        private _panelDetail;
        panelDetail: Element<HTMLDivElement>;
        private _personWrapper;
        personWrapper: Element<HTMLDivElement>;
        private _txtSearch;
        txtSearch: Textbox;
        private static _Model;
        static getModel(): Element<HTMLDivElement>;
        constructor();
    }
}
declare module latte {
    class CategoryListItem extends Element<HTMLDivElement> {
        private static _Model;
        static getModel(): Element<HTMLDivElement>;
        constructor();
    }
}
declare module latte {
    class ListItemHeaderBase extends Element<HTMLDivElement> {
        private static _Model;
        static getModel(): Element<HTMLDivElement>;
        constructor();
    }
}
declare module latte {
    class PersonListItem extends Element<HTMLDivElement> {
        private static _Model;
        static getModel(): Element<HTMLDivElement>;
        constructor();
    }
}
declare module latte {
    class PersonViewBase extends Element<HTMLDivElement> {
        private _detailHeader;
        detailHeader: Element<HTMLDivElement>;
        private _detailRows;
        detailRows: Element<HTMLDivElement>;
        private _lblDescription;
        lblDescription: Element<HTMLDivElement>;
        private _lblFirstName;
        lblFirstName: Element<HTMLDivElement>;
        private _lblInitials;
        lblInitials: Element<HTMLDivElement>;
        private _lblLastName;
        lblLastName: Element<HTMLDivElement>;
        private static _Model;
        static getModel(): Element<HTMLDivElement>;
        constructor();
    }
}
declare module latte {
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
        /**
         * Selects the specified category item
         * @param item
         */
        selectCategoryItem(item: Element<HTMLElement>): void;
        /**
         * Selects the specified category item
         * @param item
         */
        selectPersonItem(item: Element<HTMLElement>): void;
        /**
         * Event Handler.
         */
        btnAdd_Click(): void;
        /**
         * Event Handler.
         */
        btnEdit_Click(): void;
        /**
         * Event Handler.
         */
        loadCategories(): void;
        /**
         * Loads contacts of all categories
         */
        loadAllContacts(): void;
        /**
         * Loads the contacts of the specified filters
         */
        loadContacts(): void;
        /**
         * Raises the <c>personView</c> event
         */
        onPersonViewChanged(): void;
        /**
         * Raises the <c>selectedCategory</c> event
         */
        onSelectedCategoryChanged(): void;
        /**
         * Back field for event
         */
        private _personViewChanged;
        /**
         * Gets an event raised when the value of the personView property changes
         *
         * @returns {LatteEvent}
         */
        personViewChanged: LatteEvent;
        /**
         * Back field for event
         */
        private _searchTextChanged;
        /**
         * Gets an event raised when the value of the searchText property changes
         *
         * @returns {LatteEvent}
         */
        searchTextChanged: LatteEvent;
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
        private _personView;
        /**
         * Gets or sets the person view
         *
         * @returns {PersonView}
         */
        /**
         * Gets or sets the person view
         *
         * @param {PersonView} value
         */
        personView: PersonView;
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
    }
}
/**
 * Created by josemanuel on 5/29/15.
 */
declare module latte {
    /**
     *
     */
    class ListItemHeader extends ListItemHeaderBase {
        /**
         * Creates the header with the specified text
         */
        constructor(text?: string);
    }
}
/**
 * Created by josemanuel on 5/29/15.
 */
declare module latte {
    /**
     *
     */
    class PersonView extends PersonViewBase {
        /**
         *
         */
        constructor(person: Person);
        /**
         * Event Handler.
         */
        lblFirstName_Focus(): void;
        /**
         * Event Handler.
         */
        lblLastName_Focus(): void;
        /**
         * Raises the <c>editMode</c> event
         */
        onEditModeChanged(): void;
        /**
         * Raises the <c>person</c> event
         */
        onPersonChanged(): void;
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
    class Person extends personBase {
        /**
         *
         */
        constructor();
        onFieldValueChanged(name: string, value: any): void;
        /**
         * Raises the <c>initialsChanged</c> event
         */
        onInitialsChanged(): void;
        /**
         * Raises the <c>fullNameChanged</c> event
         */
        onFullNameChanged(): void;
        /**
         * Back field for event
         */
        private _fullNameChanged;
        /**
         * Gets an event raised when the full name changes
         *
         * @returns {LatteEvent}
         */
        fullNameChanged: LatteEvent;
        /**
         * Back field for event
         */
        private _initialsChanged;
        /**
         * Gets an event raised when the initials change
         *
         * @returns {LatteEvent}
         */
        initialsChanged: LatteEvent;
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
