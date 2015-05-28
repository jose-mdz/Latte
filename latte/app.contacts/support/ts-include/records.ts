module latte{
		export class personBase extends DataRecord{

		/* Name of Php record */
		_recordType: string = 'Person';

		/* Name of Module where record lives*/
		_moduleName: string = 'app.contacts';

		/**
		 * Database field: int(11)
		 */
		idperson: any;

		/**
		* Gets the name of the autoincrement field
		**/
		onGetRecordIdName(): string { return 'idperson'; }

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
		onGetFields(): any { return {'idperson': this.idperson, 'idcategory': this.idcategory, 'title': this.title, 'name': this.name, 'lastname': this.lastname, 'birth': this.birth, 'sex': this.sex, 'address': this.address, 'phone': this.phone, 'mobile': this.mobile, 'note': this.note, 'company': this.company}; }

		/*
		 * Remote Method. 
 Searches for persons in the database


		 */
		static search(options: PersonSearchOptions, page: number = 1, pageSize: number = 50): RemoteCall<PageResult<Person>>{
			return new RemoteCall<PageResult<Person>>('app.contacts', 'Person', 'search', {options: options, page: page, pageSize: pageSize} );
		}
	}

	export class categoryBase extends DataRecord{

		/* Name of Php record */
		_recordType: string = 'Category';

		/* Name of Module where record lives*/
		_moduleName: string = 'app.contacts';

		/**
		 * Database field: int(11)
		 */
		idcategory: any;

		/**
		* Gets the name of the autoincrement field
		**/
		onGetRecordIdName(): string { return 'idcategory'; }

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
		onGetFields(): any { return {'idcategory': this.idcategory, 'name': this.name, 'group': this.group, 'i': this.i}; }

		/*
		 * Remote Method. 

		 */
		static fullCatalog(): RemoteCall<Array<Category>>{
			return new RemoteCall<Array<Category>>('app.contacts', 'Category', 'fullCatalog', {} );
		}
	}


}