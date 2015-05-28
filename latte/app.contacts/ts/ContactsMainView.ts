/**
 * Created by josemanuel on 5/27/15.
 */
module latte {

    export interface PersonSearchOptions{
        idcategory?: number;
        text?: string;
    }

    /**
     *
     */
    export class ContactsMainView extends ContactsMainViewBase {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the view
         */
        constructor() {
            super();


            this.btnAdd.handle(this, 'click', this.btnAdd_Click);
            this.btnEdit.handle(this, 'click', this.btnEdit_Click);
            this.lblLastName.handle(this, 'focus', this.lblLastName_Focus);
            this.lblFirstName.handle(this, 'focus', this.lblFirstName_Focus);
            this.txtSearch.handle(this, 'change', this.txtSearch_Change);

            this.loadCategories();
            this.loadContacts();

            this.detailHeader.visible = false;
            this.detailRows.visible = false;

        }

        //region Private Methods

        selectCategoryItem(item: ListItem){

            // Unselect everyone
            var elems  = this.listGroups.element.querySelectorAll('.selected');

            for (var i = 0; i < elems.length; i++) {
                (new Element<HTMLElement>(<any>elems[i])).removeClass('selected');
            }

            item.addClass('selected');
            this.selectedCategory = item.tag;
        }

        selectPersonItem(item: ListItem){
            // Unselect everyone
            var elems  = this.listPeople.element.querySelectorAll('.selected');

            for (var i = 0; i < elems.length; i++) {
                (new Element<HTMLElement>(<any>elems[i])).removeClass('selected');
            }

            item.addClass('selected');
            this.person = <Person>item.tag;
        }

        //endregion

        //region Methods

        /**
         * Event Handler.
         */
        btnAdd_Click(){

            if(this.editMode) {
                this.editMode = false;
            }

            this.person = new Person();
            this.editMode = true;
        }

        /**
         * Event Handler.
         */
        btnEdit_Click(){
            this.editMode = !this.editMode;
        }

        /**
         * Event Handler.
         */
        lblFirstName_Focus(){
            setTimeout(() => {
                document.execCommand('selectAll', false, null)
            }, 100);
        }

        /**
         * Event Handler.
         */
        lblLastName_Focus(){
            setTimeout(() => {
                document.execCommand('selectAll', false, null)
            }, 100);
        }

        /**
         * Event Handler.
         */
        loadCategories(){
            this.listGroups.clear();

            var itemAll = new ListItem();
            itemAll.text = strings.allContacts;
            itemAll.tag = null;
            itemAll.addEventListener('click', () => { this.selectCategoryItem(itemAll) });
            this.listGroups.add(itemAll);

            Category.fullCatalog().send((cats: Category[]) => {

                var groups = {};

                //region Group by groups
                for (var i = 0; i < cats.length; i++) {

                    var c: Category = cats[i];

                    if(_undef(groups[c.group])) {
                        groups[c.group] = [];
                    }

                    groups[c.group].push(c);
                }
                //endregion

                for(var g in groups){
                    ((g) => {
                        var array: Category[] = groups[g];

                        // Sort categories
                        array.sort((a: Category, b: Category )=> {return a.i - b.i});

                        var groupItem = new ListItemHeader();
                        groupItem.text = g;

                        this.listGroups.add(groupItem);

                        for (var i = 0; i < array.length; i++) {
                            ((category:Category) => {
                                var item = new ListItem();
                                item.tag = category;
                                item.text = category.name;
                                item.addEventListener('click', () => {this.selectCategoryItem(item)});

                                this.listGroups.add(item);
                            })(array[i]);
                        }
                    })(g);
                }

            });

        }

        /**
         * Loads the contacts of the specified filters
         */
        loadContacts(){
            this.listPeople.clear();

            var opts: PersonSearchOptions = {};

            if(this.selectedCategory instanceof Category) {
                opts.idcategory = this.selectedCategory.idcategory;
            }

            if(this.txtSearch.value.length > 0){
                opts.text = this.txtSearch.value;
            }

            Person.search(opts, 1, 50).send((p: PageResult<Person>)=> {

                var groups = {};

                //region Group by Starting Letter
                for (var i = 0; i < p.records.length; i++) {
                    ((person:Person) => {

                        if(_undef(groups[person.charForIndex])) {
                            groups[person.charForIndex] = [];
                        }

                        groups[person.charForIndex].push(person);

                    })(p.records[i]);
                }
                //endregion

                //region Alert if no matches
                if(p.records.length == 0) {
                    var noItems = new Element<HTMLElement>(document.createElement('div'));
                    noItems.addClass('no-items');
                    noItems.text = strings.noContacts;
                    this.listPeople.add(noItems);
                }
                //endregion

                for(var g in groups){
                    var array: Person[] = groups[g];

                    var groupItem = new ListItemHeader();
                    groupItem.text = g;

                    this.listPeople.add(groupItem);

                    for (var i = 0; i < array.length; i++) {
                        ((person:Person) => {

                            var item = new ListItem();
                            item.tag = person;
                            item.text = person.fullName;
                            item.addEventListener('click', () => {
                                this.selectPersonItem(item);
                            });

                            this.listPeople.add(item);

                        })(array[i]);
                    }
                }

            });

        }

        /**
         * Raises the <c>editMode</c> event
         */
        onEditModeChanged(){
            if(this._editModeChanged) {
                this._editModeChanged.raise();
            }

            this.lblFirstName   .contentEditable = this.editMode;
            this.lblLastName    .contentEditable = this.editMode;
            this.lblPhone       .contentEditable = this.editMode;
            this.lblAddress     .contentEditable = this.editMode;
            this.lblNote        .contentEditable = this.editMode;
            this.lblDescription .contentEditable = this.editMode;
            this.lblMobile      .contentEditable = this.editMode;

            if(this.editMode) {
                this.lblFirstName.element.focus();
                this.btnEdit.addClass('checked');
            }else {
                this.btnEdit.removeClass('checked');

                // Save data
                this.person.name = this.lblFirstName.text;
                this.person.lastname = this.lblLastName.text;
                this.person.phone = this.lblPhone.text;
                this.person.address = this.lblAddress.text;
                this.person.note = this.lblNote.text;
                this.person.mobile = this.lblMobile.text;
                this.person.company = this.lblDescription.text;
                this.person.save(() => {
                    //TODO: After save?
                });
            }

        }

        /**
         * Raises the <c>person</c> event
         */
        onPersonChanged(){
            if(this._personChanged){
                this._personChanged.raise();
            }

            this.lblFirstName.text = this.person.name || strings.name;
            this.lblLastName.text = this.person.lastname || strings.lastName;
            this.lblPhone.text = this.person.phone || '';
            this.lblAddress.text = this.person.address || '';
            this.lblNote.text = this.person.note || '';
            this.lblDescription.text = this.person.company || '';
            this.lblMobile.text = this.person.mobile || '';
            this.lblInitials.text = this.person.initials;

            this.detailHeader.visible = this.person instanceof Person;
            this.detailRows.visible = this.person instanceof Person;

        }

        /**
         * Raises the <c>selectedCategory</c> event
         */
        onSelectedCategoryChanged(){
            if(this._selectedCategoryChanged){
                this._selectedCategoryChanged.raise();
            }

            this.loadContacts();

        }

        /**
         * Event Handler.
         */
        txtSearch_Change(){
            this.loadContacts();
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _editModeChanged: LatteEvent

        /**
         * Gets an event raised when the value of the editMode property changes
         *
         * @returns {LatteEvent}
         */
        get editModeChanged(): LatteEvent{
            if(!this._editModeChanged){
                this._editModeChanged = new LatteEvent(this);
            }
            return this._editModeChanged;
        }

        /**
         * Back field for event
         */
        private _personChanged: LatteEvent

        /**
         * Gets an event raised when the value of the person property changes
         *
         * @returns {LatteEvent}
         */
        get personChanged(): LatteEvent{
            if(!this._personChanged){
                this._personChanged = new LatteEvent(this);
            }
            return this._personChanged;
        }

        /**
         * Back field for event
         */
        private _selectedCategoryChanged: LatteEvent

        /**
         * Gets an event raised when the value of the selectedCategory property changes
         *
         * @returns {LatteEvent}
         */
        get selectedCategoryChanged(): LatteEvent{
            if(!this._selectedCategoryChanged){
                this._selectedCategoryChanged = new LatteEvent(this);
            }
            return this._selectedCategoryChanged;
        }


        //endregion

        //region Properties

        /**
         * Property field
         */
        private _selectedCategory: Category = null;

        /**
         * Gets or sets the currently selected category, if any.
         *
         * @returns {Category}
         */
        get selectedCategory(): Category{
            return this._selectedCategory;
        }

        /**
         * Gets or sets the currently selected category, if any.
         *
         * @param {Category} value
         */
        set selectedCategory(value: Category){

            // Check if value changed
            var changed: boolean = value !== this._selectedCategory;

            // Set value
            this._selectedCategory = value;

            // Trigger changed event
            if(changed){
                this.onSelectedCategoryChanged();
            }
        }

        /**
         * Property field
         */
        private _editMode: boolean = null;
        
        /**
         * Gets or sets a value indicating if the view is in edit mode
         *
         * @returns {boolean}
         */
        get editMode(): boolean{
            return this._editMode;
        }
        
        /**
         * Gets or sets a value indicating if the view is in edit mode
         *
         * @param {boolean} value
         */
        set editMode(value: boolean){
        
            // Check if value changed
            var changed: boolean = value !== this._editMode;
            
            // Set value
            this._editMode = value;
            
            // Trigger changed event
            if(changed){
                this.onEditModeChanged();
            }
        }

        /**
         * Property field
         */
        private _person: Person = null;

        /**
         * Gets or sets the person of the detail zone
         *
         * @returns {Person}
         */
        get person(): Person{
            return this._person;
        }

        /**
         * Gets or sets the person of the detail zone
         *
         * @param {Person} value
         */
        set person(value: Person){

            // Check if value changed
            var changed: boolean = value !== this._person;

            // Set value
            this._person = value;

            // Trigger changed event
            if(changed){
                this.onPersonChanged();
            }
        }

        //endregion

    }

}