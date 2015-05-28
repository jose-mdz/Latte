module latte{
	export class ContactsMainViewBase extends Element<HTMLDivElement>{
		private _btnAdd:Element<HTMLDivElement>;
		get btnAdd():Element<HTMLDivElement> {
			if (!this._btnAdd) {
				this._btnAdd = new Element<HTMLDivElement>(this.find('[data-property=btnAdd]'));
			}
			return this._btnAdd;
		}

		private _btnEdit:Element<HTMLDivElement>;
		get btnEdit():Element<HTMLDivElement> {
			if (!this._btnEdit) {
				this._btnEdit = new Element<HTMLDivElement>(this.find('[data-property=btnEdit]'));
			}
			return this._btnEdit;
		}

		private _detailHeader:Element<HTMLDivElement>;
		get detailHeader():Element<HTMLDivElement> {
			if (!this._detailHeader) {
				this._detailHeader = new Element<HTMLDivElement>(this.find('[data-property=detailHeader]'));
			}
			return this._detailHeader;
		}

		private _detailRows:Element<HTMLDivElement>;
		get detailRows():Element<HTMLDivElement> {
			if (!this._detailRows) {
				this._detailRows = new Element<HTMLDivElement>(this.find('[data-property=detailRows]'));
			}
			return this._detailRows;
		}

		private _detailToolbar:Element<HTMLDivElement>;
		get detailToolbar():Element<HTMLDivElement> {
			if (!this._detailToolbar) {
				this._detailToolbar = new Element<HTMLDivElement>(this.find('[data-property=detailToolbar]'));
			}
			return this._detailToolbar;
		}

		private _lblAddress:Element<HTMLDivElement>;
		get lblAddress():Element<HTMLDivElement> {
			if (!this._lblAddress) {
				this._lblAddress = new Element<HTMLDivElement>(this.find('[data-property=lblAddress]'));
			}
			return this._lblAddress;
		}

		private _lblDescription:Element<HTMLDivElement>;
		get lblDescription():Element<HTMLDivElement> {
			if (!this._lblDescription) {
				this._lblDescription = new Element<HTMLDivElement>(this.find('[data-property=lblDescription]'));
			}
			return this._lblDescription;
		}

		private _lblFirstName:Element<HTMLDivElement>;
		get lblFirstName():Element<HTMLDivElement> {
			if (!this._lblFirstName) {
				this._lblFirstName = new Element<HTMLDivElement>(this.find('[data-property=lblFirstName]'));
			}
			return this._lblFirstName;
		}

		private _lblInitials:Element<HTMLDivElement>;
		get lblInitials():Element<HTMLDivElement> {
			if (!this._lblInitials) {
				this._lblInitials = new Element<HTMLDivElement>(this.find('[data-property=lblInitials]'));
			}
			return this._lblInitials;
		}

		private _lblLastName:Element<HTMLDivElement>;
		get lblLastName():Element<HTMLDivElement> {
			if (!this._lblLastName) {
				this._lblLastName = new Element<HTMLDivElement>(this.find('[data-property=lblLastName]'));
			}
			return this._lblLastName;
		}

		private _lblMobile:Element<HTMLDivElement>;
		get lblMobile():Element<HTMLDivElement> {
			if (!this._lblMobile) {
				this._lblMobile = new Element<HTMLDivElement>(this.find('[data-property=lblMobile]'));
			}
			return this._lblMobile;
		}

		private _lblNote:Element<HTMLDivElement>;
		get lblNote():Element<HTMLDivElement> {
			if (!this._lblNote) {
				this._lblNote = new Element<HTMLDivElement>(this.find('[data-property=lblNote]'));
			}
			return this._lblNote;
		}

		private _lblPhone:Element<HTMLDivElement>;
		get lblPhone():Element<HTMLDivElement> {
			if (!this._lblPhone) {
				this._lblPhone = new Element<HTMLDivElement>(this.find('[data-property=lblPhone]'));
			}
			return this._lblPhone;
		}

		private _listGroups:Element<HTMLDivElement>;
		get listGroups():Element<HTMLDivElement> {
			if (!this._listGroups) {
				this._listGroups = new Element<HTMLDivElement>(this.find('[data-property=listGroups]'));
			}
			return this._listGroups;
		}

		private _listPeople:Element<HTMLDivElement>;
		get listPeople():Element<HTMLDivElement> {
			if (!this._listPeople) {
				this._listPeople = new Element<HTMLDivElement>(this.find('[data-property=listPeople]'));
			}
			return this._listPeople;
		}

		private _panelDetail:Element<HTMLDivElement>;
		get panelDetail():Element<HTMLDivElement> {
			if (!this._panelDetail) {
				this._panelDetail = new Element<HTMLDivElement>(this.find('[data-property=panelDetail]'));
			}
			return this._panelDetail;
		}

		private _txtSearch:Textbox;
		get txtSearch():Textbox {
			if (!this._txtSearch) {
				this._txtSearch = new Textbox(this.find('[data-property=txtSearch]'));
			}
			return this._txtSearch;
		}

		private static _Model:Element<HTMLDivElement>;
		static getModel():Element<HTMLDivElement> {
			if (!this._Model) {
				this._Model = new Element<HTMLDivElement>(Element.find('[data-class=ContactsMainViewBase]'));
			}
			return this._Model;
		}

		constructor(){
			super(Element.fromBank('ContactsMainViewBase'))
		}
	}
}module latte{
	export class ListItem extends Element<HTMLDivElement>{
		private static _Model:Element<HTMLDivElement>;
		static getModel():Element<HTMLDivElement> {
			if (!this._Model) {
				this._Model = new Element<HTMLDivElement>(Element.find('[data-class=ListItem]'));
			}
			return this._Model;
		}

		constructor(){
			super(Element.fromBank('ListItem'))
		}
	}
}module latte{
	export class ListItemHeader extends Element<HTMLDivElement>{
		private static _Model:Element<HTMLDivElement>;
		static getModel():Element<HTMLDivElement> {
			if (!this._Model) {
				this._Model = new Element<HTMLDivElement>(Element.find('[data-class=ListItemHeader]'));
			}
			return this._Model;
		}

		constructor(){
			super(Element.fromBank('ListItemHeader'))
		}
	}
}