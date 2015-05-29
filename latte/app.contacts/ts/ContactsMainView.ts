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

            this.bind(this);

            this.loadCategories();
            this.loadContacts();

            this.detailHeader.visible = false;
            this.detailRows.visible = false;

        }

        //region Private Methods

        /**
         * Selects the specified category item
         * @param item
         */
        selectCategoryItem(item: Element<HTMLElement>){

            // Deselect everyone
            this.listGroups.findAll('.selected').removeClass('selected');

            // Select item
            item.addClass('selected');

            // Pass selection
            this.selectedCategory = item.dataBind ? item.dataBind.record : null;
        }

        /**
         * Selects the specified category item
         * @param item
         */
        selectPersonItem(item: Element<HTMLElement>){
            // Deselect everyone
            this.listPeople.findAll('.selected').removeClass('selected');

            // Select ittem
            item.addClass('selected');

            // Pass selection
            this.person = <Person>item.dataBind.record;
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

            // All Contacts Item
            var all = this.listGroups.add(new CategoryListItem());
            all.text = strings.allContacts;
            all.addEventListener('click', () => { this.selectCategoryItem(all); });

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

                        // Sort categories by index i.
                        array.sort((a: Category, b: Category )=> {return a.i - b.i});

                        // Add Group Item
                        var groupItem = this.listGroups.add(new ListItemHeader());
                        groupItem.text = g;

                        // Create Items
                        var items = this.listGroups.addCollection(ElementCollection.fromBindArray(array, CategoryListItem));

                        // Add Click Listener
                        items.addEventListener('click', (item) => { this.selectCategoryItem(item) });

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

                    // Add Group Item
                    var groupItem = this.listPeople.add(new ListItemHeader());
                    groupItem.text = g;

                    // Crete Person Items
                    var items: ElementCollection = this.listPeople.addCollection(
                        ElementCollection.fromBindArray(groups[g], PersonListItem));

                    // Assign Click
                    items.addEventListener('click', (item) => { this.selectPersonItem(item) });

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

            // Set edit mode of the binded elements
            this.findAll('[data-bind]').setProperty('contentEditable', this.editMode);

            if(this.editMode) {
                this.lblFirstName.element.focus();
                this.btnEdit.addClass('checked');
            }else {
                this.btnEdit.removeClass('checked');

                // Save data
                this.person.save(() => {
                    //this.onPersonChanged();
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

            this.panelDetail.bind(this.person);
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
        private _searchTextChanged: LatteEvent

        /**
         * Gets an event raised when the value of the searchText property changes
         *
         * @returns {LatteEvent}
         */
        get searchTextChanged(): LatteEvent{
            if(!this._searchTextChanged){
                this._searchTextChanged = new LatteEvent(this);
            }
            return this._searchTextChanged;
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