module latte{
		export class personBase extends DataRecord{

		/* Name of Php record */
		_recordType: string = 'Person';

		/* Name of Module where record lives */
		_moduleName: string = 'app.list';

		/**
		 * Database field: int(11)
		 */
		_idperson: any = null;

		/**
		 * Gets or sets the value of the idperson field of type int(11)
		 */
		get idperson(): any{
			return this._idperson;
		}

		/**
		 * Gets or sets the value of the idperson field of type int(11)
		 */
		set idperson(value: any){
			var changed: boolean = value !== this._idperson
			this._idperson = value;
			if(changed){ this.onIdpersonChanged(); }
		}

		/**
		 * Back field for event
		 */
		_idpersonChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the idperson property changes
		 */
		get idpersonChanged(): LatteEvent{
			if(!this._idpersonChanged){ this._idpersonChanged = new LatteEvent(this); }
			return this._idpersonChanged;
		}

		/**
		 * Raises the <c>idpersonChanged</c> event
		 */
		onIdpersonChanged(){
			if(this._idpersonChanged){
				this._idpersonChanged.raise()
			}
			this.onFieldValueChanged('idperson', this.idperson)
		}

		/**
		* Gets the name of the autoincrement field
		**/
		onGetRecordIdName(): string { return 'idperson'; }

		/**
		 * Database field: int(11)
		 */
		_idcategory: any = null;

		/**
		 * Gets or sets the value of the idcategory field of type int(11)
		 */
		get idcategory(): any{
			return this._idcategory;
		}

		/**
		 * Gets or sets the value of the idcategory field of type int(11)
		 */
		set idcategory(value: any){
			var changed: boolean = value !== this._idcategory
			this._idcategory = value;
			if(changed){ this.onIdcategoryChanged(); }
		}

		/**
		 * Back field for event
		 */
		_idcategoryChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the idcategory property changes
		 */
		get idcategoryChanged(): LatteEvent{
			if(!this._idcategoryChanged){ this._idcategoryChanged = new LatteEvent(this); }
			return this._idcategoryChanged;
		}

		/**
		 * Raises the <c>idcategoryChanged</c> event
		 */
		onIdcategoryChanged(){
			if(this._idcategoryChanged){
				this._idcategoryChanged.raise()
			}
			this.onFieldValueChanged('idcategory', this.idcategory)
		}

		/**
		 * Database field: varchar(128)
		 */
		_title: any = null;

		/**
		 * Gets or sets the value of the title field of type varchar(128)
		 */
		get title(): any{
			return this._title;
		}

		/**
		 * Gets or sets the value of the title field of type varchar(128)
		 */
		set title(value: any){
			var changed: boolean = value !== this._title
			this._title = value;
			if(changed){ this.onTitleChanged(); }
		}

		/**
		 * Back field for event
		 */
		_titleChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the title property changes
		 */
		get titleChanged(): LatteEvent{
			if(!this._titleChanged){ this._titleChanged = new LatteEvent(this); }
			return this._titleChanged;
		}

		/**
		 * Raises the <c>titleChanged</c> event
		 */
		onTitleChanged(){
			if(this._titleChanged){
				this._titleChanged.raise()
			}
			this.onFieldValueChanged('title', this.title)
		}

		/**
		 * Database field: varchar(128)
		 */
		_name: any = null;

		/**
		 * Gets or sets the value of the name field of type varchar(128)
		 */
		get name(): any{
			return this._name;
		}

		/**
		 * Gets or sets the value of the name field of type varchar(128)
		 */
		set name(value: any){
			var changed: boolean = value !== this._name
			this._name = value;
			if(changed){ this.onNameChanged(); }
		}

		/**
		 * Back field for event
		 */
		_nameChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the name property changes
		 */
		get nameChanged(): LatteEvent{
			if(!this._nameChanged){ this._nameChanged = new LatteEvent(this); }
			return this._nameChanged;
		}

		/**
		 * Raises the <c>nameChanged</c> event
		 */
		onNameChanged(){
			if(this._nameChanged){
				this._nameChanged.raise()
			}
			this.onFieldValueChanged('name', this.name)
		}

		/**
		 * Database field: varchar(128)
		 */
		_lastname: any = null;

		/**
		 * Gets or sets the value of the lastname field of type varchar(128)
		 */
		get lastname(): any{
			return this._lastname;
		}

		/**
		 * Gets or sets the value of the lastname field of type varchar(128)
		 */
		set lastname(value: any){
			var changed: boolean = value !== this._lastname
			this._lastname = value;
			if(changed){ this.onLastnameChanged(); }
		}

		/**
		 * Back field for event
		 */
		_lastnameChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the lastname property changes
		 */
		get lastnameChanged(): LatteEvent{
			if(!this._lastnameChanged){ this._lastnameChanged = new LatteEvent(this); }
			return this._lastnameChanged;
		}

		/**
		 * Raises the <c>lastnameChanged</c> event
		 */
		onLastnameChanged(){
			if(this._lastnameChanged){
				this._lastnameChanged.raise()
			}
			this.onFieldValueChanged('lastname', this.lastname)
		}

		/**
		 * Database field: date
		 */
		_birth: any = null;

		/**
		 * Gets or sets the value of the birth field of type date
		 */
		get birth(): any{
			return this._birth;
		}

		/**
		 * Gets or sets the value of the birth field of type date
		 */
		set birth(value: any){
			var changed: boolean = value !== this._birth
			this._birth = value;
			if(changed){ this.onBirthChanged(); }
		}

		/**
		 * Back field for event
		 */
		_birthChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the birth property changes
		 */
		get birthChanged(): LatteEvent{
			if(!this._birthChanged){ this._birthChanged = new LatteEvent(this); }
			return this._birthChanged;
		}

		/**
		 * Raises the <c>birthChanged</c> event
		 */
		onBirthChanged(){
			if(this._birthChanged){
				this._birthChanged.raise()
			}
			this.onFieldValueChanged('birth', this.birth)
		}

		/**
		 * Database field: varchar(10)
		 */
		_sex: any = null;

		/**
		 * Gets or sets the value of the sex field of type varchar(10)
		 */
		get sex(): any{
			return this._sex;
		}

		/**
		 * Gets or sets the value of the sex field of type varchar(10)
		 */
		set sex(value: any){
			var changed: boolean = value !== this._sex
			this._sex = value;
			if(changed){ this.onSexChanged(); }
		}

		/**
		 * Back field for event
		 */
		_sexChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the sex property changes
		 */
		get sexChanged(): LatteEvent{
			if(!this._sexChanged){ this._sexChanged = new LatteEvent(this); }
			return this._sexChanged;
		}

		/**
		 * Raises the <c>sexChanged</c> event
		 */
		onSexChanged(){
			if(this._sexChanged){
				this._sexChanged.raise()
			}
			this.onFieldValueChanged('sex', this.sex)
		}

		/**
		 * Database field: varchar(255)
		 */
		_address: any = null;

		/**
		 * Gets or sets the value of the address field of type varchar(255)
		 */
		get address(): any{
			return this._address;
		}

		/**
		 * Gets or sets the value of the address field of type varchar(255)
		 */
		set address(value: any){
			var changed: boolean = value !== this._address
			this._address = value;
			if(changed){ this.onAddressChanged(); }
		}

		/**
		 * Back field for event
		 */
		_addressChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the address property changes
		 */
		get addressChanged(): LatteEvent{
			if(!this._addressChanged){ this._addressChanged = new LatteEvent(this); }
			return this._addressChanged;
		}

		/**
		 * Raises the <c>addressChanged</c> event
		 */
		onAddressChanged(){
			if(this._addressChanged){
				this._addressChanged.raise()
			}
			this.onFieldValueChanged('address', this.address)
		}

		/**
		 * Database field: varchar(128)
		 */
		_phone: any = null;

		/**
		 * Gets or sets the value of the phone field of type varchar(128)
		 */
		get phone(): any{
			return this._phone;
		}

		/**
		 * Gets or sets the value of the phone field of type varchar(128)
		 */
		set phone(value: any){
			var changed: boolean = value !== this._phone
			this._phone = value;
			if(changed){ this.onPhoneChanged(); }
		}

		/**
		 * Back field for event
		 */
		_phoneChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the phone property changes
		 */
		get phoneChanged(): LatteEvent{
			if(!this._phoneChanged){ this._phoneChanged = new LatteEvent(this); }
			return this._phoneChanged;
		}

		/**
		 * Raises the <c>phoneChanged</c> event
		 */
		onPhoneChanged(){
			if(this._phoneChanged){
				this._phoneChanged.raise()
			}
			this.onFieldValueChanged('phone', this.phone)
		}

		/**
		 * Database field: varchar(128)
		 */
		_mobile: any = null;

		/**
		 * Gets or sets the value of the mobile field of type varchar(128)
		 */
		get mobile(): any{
			return this._mobile;
		}

		/**
		 * Gets or sets the value of the mobile field of type varchar(128)
		 */
		set mobile(value: any){
			var changed: boolean = value !== this._mobile
			this._mobile = value;
			if(changed){ this.onMobileChanged(); }
		}

		/**
		 * Back field for event
		 */
		_mobileChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the mobile property changes
		 */
		get mobileChanged(): LatteEvent{
			if(!this._mobileChanged){ this._mobileChanged = new LatteEvent(this); }
			return this._mobileChanged;
		}

		/**
		 * Raises the <c>mobileChanged</c> event
		 */
		onMobileChanged(){
			if(this._mobileChanged){
				this._mobileChanged.raise()
			}
			this.onFieldValueChanged('mobile', this.mobile)
		}

		/**
		 * Database field: text
		 */
		_note: any = null;

		/**
		 * Gets or sets the value of the note field of type text
		 */
		get note(): any{
			return this._note;
		}

		/**
		 * Gets or sets the value of the note field of type text
		 */
		set note(value: any){
			var changed: boolean = value !== this._note
			this._note = value;
			if(changed){ this.onNoteChanged(); }
		}

		/**
		 * Back field for event
		 */
		_noteChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the note property changes
		 */
		get noteChanged(): LatteEvent{
			if(!this._noteChanged){ this._noteChanged = new LatteEvent(this); }
			return this._noteChanged;
		}

		/**
		 * Raises the <c>noteChanged</c> event
		 */
		onNoteChanged(){
			if(this._noteChanged){
				this._noteChanged.raise()
			}
			this.onFieldValueChanged('note', this.note)
		}

		/**
		 * Database field: varchar(128)
		 */
		_company: any = null;

		/**
		 * Gets or sets the value of the company field of type varchar(128)
		 */
		get company(): any{
			return this._company;
		}

		/**
		 * Gets or sets the value of the company field of type varchar(128)
		 */
		set company(value: any){
			var changed: boolean = value !== this._company
			this._company = value;
			if(changed){ this.onCompanyChanged(); }
		}

		/**
		 * Back field for event
		 */
		_companyChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the company property changes
		 */
		get companyChanged(): LatteEvent{
			if(!this._companyChanged){ this._companyChanged = new LatteEvent(this); }
			return this._companyChanged;
		}

		/**
		 * Raises the <c>companyChanged</c> event
		 */
		onCompanyChanged(){
			if(this._companyChanged){
				this._companyChanged.raise()
			}
			this.onFieldValueChanged('company', this.company)
		}

		/**
		 * Database field: varchar(128)
		 */
		_email: any = null;

		/**
		 * Gets or sets the value of the email field of type varchar(128)
		 */
		get email(): any{
			return this._email;
		}

		/**
		 * Gets or sets the value of the email field of type varchar(128)
		 */
		set email(value: any){
			var changed: boolean = value !== this._email
			this._email = value;
			if(changed){ this.onEmailChanged(); }
		}

		/**
		 * Back field for event
		 */
		_emailChanged: LatteEvent;

		/**
		 * Gets an event raised when the value of the email property changes
		 */
		get emailChanged(): LatteEvent{
			if(!this._emailChanged){ this._emailChanged = new LatteEvent(this); }
			return this._emailChanged;
		}

		/**
		 * Raises the <c>emailChanged</c> event
		 */
		onEmailChanged(){
			if(this._emailChanged){
				this._emailChanged.raise()
			}
			this.onFieldValueChanged('email', this.email)
		}

		/**
		* Override. Gets data about the fields of the record.
		**/
		onGetFields(): any { return {'idperson': this.idperson, 'idcategory': this.idcategory, 'title': this.title, 'name': this.name, 'lastname': this.lastname, 'birth': this.birth, 'sex': this.sex, 'address': this.address, 'phone': this.phone, 'mobile': this.mobile, 'note': this.note, 'company': this.company, 'email': this.email}; }

		/*
		 * Remote Method. 
 Searches for persons in the database


		 */
		static search(term: string = '', page: number = 1, pageSize: number = 50): RemoteCall<PageResult<Person>>{
			return new RemoteCall<PageResult<Person>>('app.list', 'Person', 'search', {term: term, page: page, pageSize: pageSize} );
		}
	}


}