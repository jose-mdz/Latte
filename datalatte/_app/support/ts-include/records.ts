module latte{
		export class personBase extends DataRecord{

		/* Name of Php record */
		_recordType: string = 'Person';

		/* Name of Module where record lives*/
		_moduleName: string = '_app';

		/**
		 * Database field: int(11)
		 */
		idperson: any;

		/**
		* Gets the name of the autoincrement field
		**/
		onGetRecordIdName(): string { return 'idperson'; }

		/**
		 * Database field: varchar(10)
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
		 * Database field: varchar(1)
		 */
		sex: any;

		/*
		 * Remote Method. 
 Searches for persons in the database


		 */
		static search(term: string = '', page: number = 1, pageSize: number = 50): RemoteCall<PageResult<Person>>{
			return new RemoteCall<PageResult<Person>>('_app', 'Person', 'search', {term: term, page: page, pageSize: pageSize} );
		}
	}


}