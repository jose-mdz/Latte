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

            this.loadCategories();
            this.loadContacts();


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
            this.selectedCategory = item.dataBinds.length > 0 ? item.dataBinds[0].record : null;
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
            this.personView = new PersonView(<Person>item.dataBinds[0].record);
        }

        //endregion

        //region Methods

        /**
         * Event Handler.
         */
        btnAdd_Click(){

            if(this.personView.editMode) {
                this.personView.editMode = false;
            }

            this.personView.person = new Person();
            this.personView.person.idcategory = this.selectedCategory instanceof Category ? this.selectedCategory.idcategory : 0;
            this.personView.editMode = true;
        }

        /**
         * Event Handler.
         */
        btnEdit_Click(){
            this.personView.editMode = !this.personView.editMode;
        }

        /**
         * Event Handler.
         */
        loadCategories(){
            this.myContacts.clear();

            Category.fullCatalog().send((cats: Category[]) => {

                // Create Items
                var items = this.myContacts.addCollection(ElementCollection.fromBindArray(cats, CategoryListItem));

                // Add Listener
                items.addEventListener('click', (item) => { this.selectCategoryItem(item) });

            });

        }

        /**
         * Loads contacts of all categories
         */
        loadAllContacts(){
            this.selectCategoryItem(this.allContactsItem);
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
         * Raises the <c>personView</c> event
         */
        onPersonViewChanged(){
            if(this._personViewChanged){
                this._personViewChanged.raise();
            }

            this.personWrapper.setContent(this.personView);

            this.personView.editModeChanged.add(() => {
                if(this.personView.editMode) {
                    this.btnEdit.addClass('checked');
                }else {
                    this.btnEdit.removeClass('checked');
                }
            });
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
        private _personViewChanged: LatteEvent

        /**
         * Gets an event raised when the value of the personView property changes
         *
         * @returns {LatteEvent}
         */
        get personViewChanged(): LatteEvent{
            if(!this._personViewChanged){
                this._personViewChanged = new LatteEvent(this);
            }
            return this._personViewChanged;
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
        private _personView: PersonView = null;

        /**
         * Gets or sets the person view
         *
         * @returns {PersonView}
         */
        get personView(): PersonView{
            return this._personView;
        }

        /**
         * Gets or sets the person view
         *
         * @param {PersonView} value
         */
        set personView(value: PersonView){

            // Check if value changed
            var changed: boolean = value !== this._personView;

            // Set value
            this._personView = value;

            // Trigger changed event
            if(changed){
                this.onPersonViewChanged();
            }
        }

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

        //endregion

    }

}