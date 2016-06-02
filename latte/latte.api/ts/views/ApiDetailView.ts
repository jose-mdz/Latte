/**
 * Created by josemanuel on 3/7/14.
 */
module latte {

    declare var apiStructure: any;

    /**
     *
     */
    export class ApiDetailView extends ColumnView {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor(source: any) {
            super(1);

            this.addClass('api-detail');

            this._source = source;

            this.initView();
        }

        //region Private Methods
        initView(){

            var source = this.source;

            // Title
            this.items.add(new LabelItem(source.name, null, null, 1));

            // Description
            var lbld = new LabelItem(source.description)
            lbld.preformatted = true;
            this.items.add(lbld);

            // Properties
            this.items.add(new LabelItem('Properties', null, null, 2));
            this.items.add(this.propertiesTable());

            // Methods
            this.items.add(new LabelItem('Methods', null, null, 2));
            this.items.add(this.methodsTable());
        }

        cleanDescription(lines: string[]): string{

            if(!lines || lines.length == 0) return '';

            var r = [];

            lines.forEach((line: string) => {
                if(line.trim().indexOf('@') != 0){
                    r.push(line)
                }
            })

            return r.join('\n');
        }

        sortObject(o: any): any{
            var keys = [];

            for(var i in o){
                keys.push(i)
            }

            keys.sort();

            var r = {};

            keys.forEach((k: string) => {
                r[k] = o[k];
            });

            return r;
        }

        propertiesTable(): Item{

            var item = new Item();
            var table = $('<table>').addClass('api-table').appendTo(item.element);
            var props: any = this.sortObject(this.source.properties);

            // Add headers
            table.append($('<tr></tr>')
                .append($('<th>').text(''))
                .append($('<th>').text('Name'))
                .append($('<th>').text('Type'))
                .append($('<th>').text('Description'))
            );


            for(var prop in props){

                var property:any = this.source.properties[prop];
                var indicators;

                if(property.isPublic !== true) continue;

                var row = $('<tr></tr>').appendTo(table);

                row.append(indicators = $('<td>').append( (IconItem.standard(4, 4)).element ));
                row.append($('<td>').html(prop));
                row.append($('<td>').append(this.typeLabel(property.type).element));
                row.append($('<td>').html(this.cleanDescription(
                    property.description
                )));

                if(property.isStatic === true) {
                    indicators.append(this.staticLabel());
                }

            }


            return item;

        }

        methodsTable(): Item{

            var item = new Item();
            var table = $('<table>').addClass('api-table').appendTo(item.element);
            var meths = this.sortObject(this.source.methods);

            // Add headers
            table.append($('<tr></tr>')
                .append($('<th>').text(''))
                .append($('<th>').text('Name'))
                .append($('<th>').text('Arguments'))
                .append($('<th>').text('Description'))
            );

            for(var methodName in meths){

                var method: any = this.source.methods[methodName];
                var indicators;

                if(method.isPublic !== true) continue;

                var row = $('<tr></tr>').appendTo(table);



                row.append(indicators = $('<td>').append( (IconItem.standard(13, 8)).element ));
                row.append($('<td>').html(methodName));
                row.append($('<td>').html('<code>' + method.source.substr(method.source.indexOf('(')) + '</code>'));
                row.append($('<td>').html(this.cleanDescription(method.description)));


                if(method.isStatic === true) {
                    indicators.append(this.staticLabel());
                }

            }


            return item;

        }

        /**
         * Returns a type label
         * @param type
         * @returns {latte.LabelItem}
         */
        typeLabel(type): LabelItem{

            var lbl = new LabelItem();

            if(type.indexOf('latte.') === 0){
                lbl.text = type.substr(6).replace('<', '&lt;').replace('>', '&gt;');
                lbl.linkStyle = true;

            }else if(typeof apiStructure[type] !== 'undefined'){
                lbl.text = type.replace('<', '&lt;').replace('>', '&gt;');
                lbl.linkStyle = true;
            }else{
                lbl.text = type;
            }

            lbl.navigate.add(() => {
                this.onNavigate(type);
            });

            return lbl;
        }

        /**
         *
         */
        staticLabel(): JQuery{
            return $('<span></span>').addClass('static-icon').text('s').attr('title', 'Member is static');
        }

        //endregion

        //region Methods
        //endregion

        //region Events

        /**
         * Back field for event
         */
         private _navigate: LatteEvent

        /**
         * Gets an event raised when navigation to a class is requested
         *
         * @returns {LatteEvent}
         */
        public get navigate(): LatteEvent{
            if(!this._navigate){
                this._navigate = new LatteEvent(this);
            }
            return this._navigate;
        }

        /**
         * Raises the <c>navigate</c> event
         */
        public onNavigate(className: string){
            if(this._navigate){
                this._navigate.raise(className);
            }
        }
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _source:any;

        /**
         * Gets the source of the detail view
         *
         * @returns {any}
         */
        public get source():any {
            return this._source;
        }

        //endregion

    }

}