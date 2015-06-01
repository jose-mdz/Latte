module latte{
	export class ContactsMainViewBase extends Element<HTMLDivElement>{
		private _allContactsItem:Element<HTMLDivElement>;
		get allContactsItem():Element<HTMLDivElement> {
			if (!this._allContactsItem) {
				this._allContactsItem = new Element<HTMLDivElement>(this.querySelector('[data-property=allContactsItem]'));
			}
			return this._allContactsItem;
		}

		private _btnAdd:Element<HTMLDivElement>;
		get btnAdd():Element<HTMLDivElement> {
			if (!this._btnAdd) {
				this._btnAdd = new Element<HTMLDivElement>(this.querySelector('[data-property=btnAdd]'));
			}
			return this._btnAdd;
		}

		private _btnEdit:Element<HTMLDivElement>;
		get btnEdit():Element<HTMLDivElement> {
			if (!this._btnEdit) {
				this._btnEdit = new Element<HTMLDivElement>(this.querySelector('[data-property=btnEdit]'));
			}
			return this._btnEdit;
		}

		private _detailToolbar:Element<HTMLDivElement>;
		get detailToolbar():Element<HTMLDivElement> {
			if (!this._detailToolbar) {
				this._detailToolbar = new Element<HTMLDivElement>(this.querySelector('[data-property=detailToolbar]'));
			}
			return this._detailToolbar;
		}

		private _listGroups:Element<HTMLDivElement>;
		get listGroups():Element<HTMLDivElement> {
			if (!this._listGroups) {
				this._listGroups = new Element<HTMLDivElement>(this.querySelector('[data-property=listGroups]'));
			}
			return this._listGroups;
		}

		private _listPeople:Element<HTMLDivElement>;
		get listPeople():Element<HTMLDivElement> {
			if (!this._listPeople) {
				this._listPeople = new Element<HTMLDivElement>(this.querySelector('[data-property=listPeople]'));
			}
			return this._listPeople;
		}

		private _myContacts:Element<HTMLDivElement>;
		get myContacts():Element<HTMLDivElement> {
			if (!this._myContacts) {
				this._myContacts = new Element<HTMLDivElement>(this.querySelector('[data-property=myContacts]'));
			}
			return this._myContacts;
		}

		private _panelDetail:Element<HTMLDivElement>;
		get panelDetail():Element<HTMLDivElement> {
			if (!this._panelDetail) {
				this._panelDetail = new Element<HTMLDivElement>(this.querySelector('[data-property=panelDetail]'));
			}
			return this._panelDetail;
		}

		private _personWrapper:Element<HTMLDivElement>;
		get personWrapper():Element<HTMLDivElement> {
			if (!this._personWrapper) {
				this._personWrapper = new Element<HTMLDivElement>(this.querySelector('[data-property=personWrapper]'));
			}
			return this._personWrapper;
		}

		private _txtSearch:Textbox;
		get txtSearch():Textbox {
			if (!this._txtSearch) {
				this._txtSearch = new Textbox(this.querySelector('[data-property=txtSearch]'));
			}
			return this._txtSearch;
		}

		private static _Model:Element<HTMLDivElement>;
		static getModel():Element<HTMLDivElement> {
			if (!this._Model) {
				this._Model = new Element<HTMLDivElement>(Element.fromBank('ContactsMainViewBase'));
			}
			return this._Model;
		}

		constructor(){
			super(Element.fromBank('ContactsMainViewBase'));
			this.bind(this, true);
		}
	}
}module latte{
	export class CategoryListItem extends Element<HTMLDivElement>{
		private static _Model:Element<HTMLDivElement>;
		static getModel():Element<HTMLDivElement> {
			if (!this._Model) {
				this._Model = new Element<HTMLDivElement>(Element.fromBank('CategoryListItem'));
			}
			return this._Model;
		}

		constructor(){
			super(Element.fromBank('CategoryListItem'));
			this.bind(this, true);
		}
	}
}module latte{
	export class ListItemHeaderBase extends Element<HTMLDivElement>{
		private static _Model:Element<HTMLDivElement>;
		static getModel():Element<HTMLDivElement> {
			if (!this._Model) {
				this._Model = new Element<HTMLDivElement>(Element.fromBank('ListItemHeaderBase'));
			}
			return this._Model;
		}

		constructor(){
			super(Element.fromBank('ListItemHeaderBase'));
			this.bind(this, true);
		}
	}
}module latte{
	export class PersonListItem extends Element<HTMLDivElement>{
		private static _Model:Element<HTMLDivElement>;
		static getModel():Element<HTMLDivElement> {
			if (!this._Model) {
				this._Model = new Element<HTMLDivElement>(Element.fromBank('PersonListItem'));
			}
			return this._Model;
		}

		constructor(){
			super(Element.fromBank('PersonListItem'));
			this.bind(this, true);
		}
	}
}module latte{
	export class PersonViewBase extends Element<HTMLDivElement>{
		private _detailHeader:Element<HTMLDivElement>;
		get detailHeader():Element<HTMLDivElement> {
			if (!this._detailHeader) {
				this._detailHeader = new Element<HTMLDivElement>(this.querySelector('[data-property=detailHeader]'));
			}
			return this._detailHeader;
		}

		private _detailRows:Element<HTMLDivElement>;
		get detailRows():Element<HTMLDivElement> {
			if (!this._detailRows) {
				this._detailRows = new Element<HTMLDivElement>(this.querySelector('[data-property=detailRows]'));
			}
			return this._detailRows;
		}

		private _lblDescription:Element<HTMLDivElement>;
		get lblDescription():Element<HTMLDivElement> {
			if (!this._lblDescription) {
				this._lblDescription = new Element<HTMLDivElement>(this.querySelector('[data-property=lblDescription]'));
			}
			return this._lblDescription;
		}

		private _lblFirstName:Element<HTMLDivElement>;
		get lblFirstName():Element<HTMLDivElement> {
			if (!this._lblFirstName) {
				this._lblFirstName = new Element<HTMLDivElement>(this.querySelector('[data-property=lblFirstName]'));
			}
			return this._lblFirstName;
		}

		private _lblInitials:Element<HTMLDivElement>;
		get lblInitials():Element<HTMLDivElement> {
			if (!this._lblInitials) {
				this._lblInitials = new Element<HTMLDivElement>(this.querySelector('[data-property=lblInitials]'));
			}
			return this._lblInitials;
		}

		private _lblLastName:Element<HTMLDivElement>;
		get lblLastName():Element<HTMLDivElement> {
			if (!this._lblLastName) {
				this._lblLastName = new Element<HTMLDivElement>(this.querySelector('[data-property=lblLastName]'));
			}
			return this._lblLastName;
		}

		private static _Model:Element<HTMLDivElement>;
		static getModel():Element<HTMLDivElement> {
			if (!this._Model) {
				this._Model = new Element<HTMLDivElement>(Element.fromBank('PersonViewBase'));
			}
			return this._Model;
		}

		constructor(){
			super(Element.fromBank('PersonViewBase'));
			this.bind(this, true);
		}
	}
}