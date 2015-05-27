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
        private rows: ContactDataRow[] = [];
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
        //endregion

        //region Methods

        loadCategories(){
            this.listGroups.clear();

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
                            var item = new ListItem();
                            item.text = array[i].name;

                            this.listGroups.add(item);
                        }
                    })(g);
                }

            });

        }

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

                    for (var i = 0; i < array.length; i++) {
                        ((person:Person) => {

                            var item = new ListItem();
                            item.text = person.fullName;

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

            this.detailHeader.visible = this.editMode;

            if(this.editMode) {

            }

        }

        /**
         * Raises the <c>person</c> event
         */
        onPersonChanged(){
            if(this._personChanged){
                this._personChanged.raise();
            }

            this.detailRows.clear();

            this.rows = [
                new ContactDataRow()
            ]

        }

        /**
         * Raises the <c>selectedCategory</c> event
         */
        onSelectedCategoryChanged(){
            if(this._selectedCategoryChanged){
                this._selectedCategoryChanged.raise();
            }


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