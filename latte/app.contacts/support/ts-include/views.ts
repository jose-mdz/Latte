module latte{
	export class ContactsMainViewBase extends Element<HTMLDivElement>{
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

		private _lblDescription:Element<HTMLDivElement>;
		get lblDescription():Element<HTMLDivElement> {
			if (!this._lblDescription) {
				this._lblDescription = new Element<HTMLDivElement>(this.find('[data-property=lblDescription]'));
			}
			return this._lblDescription;
		}

		private _lblFullname:Element<HTMLDivElement>;
		get lblFullname():Element<HTMLDivElement> {
			if (!this._lblFullname) {
				this._lblFullname = new Element<HTMLDivElement>(this.find('[data-property=lblFullname]'));
			}
			return this._lblFullname;
		}

		private _lblInitials:Element<HTMLDivElement>;
		get lblInitials():Element<HTMLDivElement> {
			if (!this._lblInitials) {
				this._lblInitials = new Element<HTMLDivElement>(this.find('[data-property=lblInitials]'));
			}
			return this._lblInitials;
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
}module latte{
	export class ContactDataRowBase extends Element<HTMLDivElement>{
		private _lblName:Element<HTMLDivElement>;
		get lblName():Element<HTMLDivElement> {
			if (!this._lblName) {
				this._lblName = new Element<HTMLDivElement>(this.find('[data-property=lblName]'));
			}
			return this._lblName;
		}

		private _lblValue:Element<HTMLDivElement>;
		get lblValue():Element<HTMLDivElement> {
			if (!this._lblValue) {
				this._lblValue = new Element<HTMLDivElement>(this.find('[data-property=lblValue]'));
			}
			return this._lblValue;
		}

		private static _Model:Element<HTMLDivElement>;
		static getModel():Element<HTMLDivElement> {
			if (!this._Model) {
				this._Model = new Element<HTMLDivElement>(Element.find('[data-class=ContactDataRowBase]'));
			}
			return this._Model;
		}

		constructor(){
			super(Element.fromBank('ContactDataRowBase'))
		}
	}
}