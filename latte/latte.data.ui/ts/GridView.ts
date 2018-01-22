module latte{
    /**
     * Renders a grid that allows data manipulation
     **/
    export class GridView extends View{


        /**
         *
         **/
        private _actionCommit: Action;

        /**
         *
         **/
        private _actionCopyCellValue: Action;

        /**
         *
         **/
        private _actionPasteCellValue: Action;

        /**
         * Convert to PUBLIC
         **/
         _actionRemoveRow: Action;

        /**
         *
         **/
        private _actionRollback: Action;

        /**
         *
         **/
        private _actionSetCellNull: Action;

        /**
         *
         **/
        private _allowChangeRows: boolean = true;

        /**
         *
         **/
        private _allowDeleteRows: boolean = true;

        /**
         *
         **/
        private _allowNewRows: boolean = true;

        /**
         *
         **/
        private _editingTd: JQuery;

        /**
         *
         **/
        private _readOnly: boolean;

        /**
         *
         **/
        private _tdAll: JQuery;

        /**
         *
         **/
        private _trColumns: JQuery;

        /**
         * Columns of the grid view
         **/
        columns: Collection<GridViewColumn>;

        /**
         * Rows of data of the grid
         **/
        rows: Collection<GridViewRow>;

        /**
         * Holds the Table element where the grid lives
         **/
        table: JQuery;

        /**
         * Raised after <c>rowsAdded</c>, <c>rowsChanged</c>, <c>rowsRemoved</c> are raised originated by calling <c>commit()</c>
         **/
        committed: LatteEvent;

        /**
         * Raised when the value of a cell changed
         The object passed has the attribubtes:
         <example>
         {
           column:   number,
           row:      number,
           value:    string,
           oldValue: string
         }
         </exapmle>
         **/
        valueChanged: LatteEvent;

        /**
         * Raised when new rows are added to the grid and confirmed by the user.
         The object passed to the event is a <c>DataSet</c> with the new rows
         **/
        rowsAdded: LatteEvent;

        /**
         * Raised when changed rows where changed, and confirmed by the user.
         The object passed to the event is a <c>DataSet</c> with the changed rows
         **/
        rowsChanged: LatteEvent;

        /**
         * Raised when rows are removed from the grid and confirmed by the user.
         The object passed to the event is a <c>DataSet</c> with the deleted rows
         **/
        rowsRemoved: LatteEvent;


        /**
         * Creates the GridView
         **/
        constructor(){

            super();

            var gv = this;

            window['g'] = gv;


            this.element.addClass('grid');

            // Initialize Events
            this.committed = new LatteEvent(this);
            this.valueChanged = new LatteEvent(this);
            this.rowsAdded = new LatteEvent(this);
            this.rowsChanged = new LatteEvent(this);
            this.rowsRemoved = new LatteEvent(this);

            // Initialize Collections
            this.columns = new Collection<GridViewColumn>(this._onAddColumn, this._onRemoveColumn, this);
            this.rows = new Collection<GridViewRow>(this._onAddRow, this._onRemoveRow, this);

            // Create table
            this.table = $('<table>', {border: 1}).appendTo(this.container).hide();

            // Create headers row
            this._trColumns = $('<tr>').addClass('headers').appendTo(this.table);

            // Create the Select all cell
            this._tdAll = $('<th>').appendTo(this._trColumns);

            // On table mouseout un select headers
            this.table.mouseleave(() => {
                this._selectColumnHeader();
            });

            this.table.click(() => {
                this.endCellEdit();
            });

            // Initialize properties
            this.allowNewRows = this.allowNewRows;

            // Initialize actions
            this._actionCommit = new Action()
            this._actionCommit.text = strings.apply;
            this._actionCommit.icon = IconItem.standard(1, 6);
            this._actionCommit.enabled = false;
            this._actionCommit.execute.add( () => { this.commit(); });

            this._actionRollback = new Action();
            this._actionRollback.text = strings.revert;
            this._actionRollback.icon = IconItem.standard(2, 6);
            this._actionRollback.enabled = false;
            this._actionRollback.execute.add(() => {this.rollback(); });

            this._actionRemoveRow = new Action();
            this._actionRemoveRow.text = strings.deleteRow;
            this._actionRemoveRow.icon = IconItem.standard(11, 5);
            this._actionRemoveRow.execute.add(() => {
                this.deleteRowAt(this.selectedCell.data('rowIndex'));
            });

            this._actionCopyCellValue = new Action();
            this._actionCopyCellValue.text = strings.copy;
            this._actionCopyCellValue.icon = IconItem.standard(14, 5);
            this._actionCopyCellValue.execute.add(() => {
                this.copySelectedCellValue();
            });

            this._actionPasteCellValue = new Action();
            this._actionPasteCellValue.text = strings.paste;
            this._actionPasteCellValue.icon = IconItem.standard(15, 4);
            this._actionPasteCellValue.execute.add(() => {
            });

            this._actionSetCellNull = new Action();
            this._actionSetCellNull.text = strings.setAsNull;
            this._actionSetCellNull.icon = IconItem.empty(32);
            this._actionSetCellNull.execute.add(() => {
                this.setValueAt(this.selectedCell.data('columnIndex'),
                    this.selectedCell.data('rowIndex'), null, true);
            });


        }

        /**
         *
         **/
        private _addInsertRow(){

            var row = this._createRow();
            var rowIndex = this.rows.count;

            row
                .removeClass('row')
                .addClass('insert-row')
                .appendTo(this.table)
                .find('th').text("*");

            // Fix row number
            row.find('td').data('rowIndex', rowIndex);



        }

        /**
         *
         **/
        private _createCell(columnIndex: number, rowIndex: number): JQuery{

            var gv = this;
            var cell = $('<td>')
                .addClass('cell')
                .data('rowIndex', rowIndex)
                .data('columnIndex', columnIndex)
                .click(function(){
                    gv.selectCellAt($(this).data('columnIndex'), $(this).data('rowIndex'));
                })
                .dblclick(function(){
                    if(!$(this).hasClass('editing'))
                        gv.editCellAt($(this).data('columnIndex'), $(this).data('rowIndex'));
                })
                .mouseenter(function(){
                    gv._selectColumnHeader($(this).data('columnIndex'));
                    gv._selectRowHeader($(this).data('rowIndex'));
                    $(this).addClass('hover')
                })
                .mouseleave(function(){
                    $(this).removeClass('hover')
                });

            UiElement.disableTextSelection(cell);

            return cell;

        }

        /**
         *
         **/
        private _createRow(): JQuery{


            var rowIndex = this.rows.count - 1; //this.table.find('tr.row').length;
            var tr = $('<tr>').addClass('row').appendTo(this.table);

            tr.data('rowIndex', rowIndex);

            // Create number th
            $('<th>')
                //.text(this.rows.count)
                .text(rowIndex + 1 + '')
                .appendTo(tr);

            // Create cells
            for(var i = 0; i < this.columns.count; i++ ){
                this._createCell(i, rowIndex).appendTo(tr);
            }

            return tr;

        }

        /**
         *
         **/
        private _makeInsertRowCandidate(){


            var row = new GridViewRow();

            this.rows.add(row, false);

            var count = this.rows.count;

            this.table.find('tr.insert-row').data('rowIndex', count - 1);
            this.table.find('tr.insert-row th').text(count + '*')

            row.element = this.table.find('tr.insert-row')
                .removeClass('insert-row')
                .addClass('insertable-row');

            // Activate insert button
            this._transactionStart();


        }

        /**
         *
         **/
        private _onAddColumn(column: GridViewColumn){


            var th = $('<th>').appendTo(this._trColumns);
            var index = this.columns.count - 1;

            column.header = th;

            column.optionsChanged.add(() => {
                // Update values
                for(var i = 0; i < this.rows.count; i++){
                    this.setValueAt(index, i, this.getValueAt(index, i), false);
                }
            });

            th.text(column.name);

            this.table.show();

        }

        /**
         *
         **/
        private _onAddRow(row: GridViewRow){


            var rowIndex = this.rows.count - 1;

            // Remove the Insert Row
            if(this._allowNewRows) this._removeInsertRow();

            // Create table row
            this._createRow().appendTo(this.table);

            // Fill values
            for(var i = 0; i < this.columns.count; i++){
                // Set the cell value
                if(this.hasValueAt(i, rowIndex)){
                    var v = this.getValueAt(i, rowIndex)
                    this.setValueAt(i, rowIndex, v);
                }
            }

            // Point row
            row.element = this.getRowElementAt(rowIndex);

            // Add the Insert Row
            if(this._allowNewRows) this._addInsertRow();

        }

        /**
         *
         **/
        private _onRemoveColumn(column: GridViewColumn){

            column.header.remove();
            this.allowNewRows = this.allowNewRows

        }

        /**
         *
         **/
        private _onRemoveRow(row: GridViewRow, index: number){

            row.element.remove();
            this._updateRowIndexes();

        }

        /**
         *
         **/
        private _removeInsertRow(){

            this.table.find('tr.insert-row').remove();

        }

        /**
         *
         **/
        private _selectColumnHeader(index: number = -1){

            this.table.find('th').removeClass('selected');

            if(index < 0)
                this.columns.item(index).header.addClass('selected')

        }

        /**
         *
         **/
        private _selectRowHeader(index: number){

            this.table.find('tr:eq(' + (index + 1) +  ') > th').addClass('selected');

        }

        /**
         *
         **/
        private _transactionEnd(){

            this.container.find('.insert-button').remove();

            this._actionCommit.enabled = false;
            this._actionRollback.enabled = false;

        }

        /**
         *
         **/
        private _transactionStart(){


            if(this.container.find('.insert-button').length) return;

            var bg = new ButtonGroupItem();

            bg.buttons.add(this._actionCommit.getButton());
            bg.buttons.add(this._actionRollback.getButton());

            bg.element
                .addClass('insert-button')
                .css({
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    borderRadius: 4,
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
                }).appendTo(this.container);

            this._actionCommit.enabled = true;
            this._actionRollback.enabled = true;

        }

        /**
         *
         **/
        private _updateRowIndexes(){

            var i = 0;
            this.table.find('tr:not(.headers)').each(function(){
                var tr = $(this);

                tr.data('rowIndex', i);
                tr.children().data('rowIndex', i);

                i++;
            });

        }

        /**
         * Gets a value indicating if the cell at the specified position can be edited.
         **/
            canEditCellAt(columnIndex: number, rowIndex: number): boolean{


            var row = this.getRowElementAt(rowIndex);
            var cell = this.hasCellAt(columnIndex, rowIndex) ?
                this.getCellElementAt(columnIndex, rowIndex) : null;

            var canEdit = cell instanceof jQuery
                        && !this.readOnly
                        && !this.columns.item(columnIndex).readOnly
                        && !row.hasClass('pendent')
                        && !row.hasClass('deletable-row')
                        && this.allowChangeRows
                ;

            if(this.rows.item(rowIndex))
                canEdit = canEdit && !this.rows.item(rowIndex).readOnly;

            return canEdit;

        }

        /**
         * Clears selection of cells.
         **/
            clearSelection(){

            this.table.find('td.selected').removeClass('selected');

        }

        /**
         * Commits the current transaction of rows added, changed and deleted.
         Events <c>rowsAdded</c>, <c>rowsChanged</c>, <c>rowsRemoved</c> are raised accordingly.
         **/
            commit(){

            this.commitAddedRows();
            this.commitChangedRows();
            this.commitDeletedRows();

            this._transactionEnd();

            this.onCommitted();

        }

        /**
         * Commits the current transaction of rows added.
         LatteEvent <c>rowsAdded</c> is raised.
         **/
            commitAddedRows(){


            var d = new DataSet();
            var indexes = [];

            this.endCellEdit();

            // Add dataset columns
            //d.columns.addCollection(this.columns);

            for(var i = 0; i < this.columns.count; i++){
                d.columns.add(<DataSetColumn>this.columns.item(i));
            }

            // Collect new row indexes
            this.table.find('tr.insertable-row').each(function(){
                var tr = $(this);

                // Remove * symbol
                tr.find('th').text(tr.data('rowIndex') + 1);

                // push index into array
                indexes.push(tr.data('rowIndex'));

                // Remove insertable-row class
                tr.removeClass('insertable-row').addClass('pendent pendent-insert');
            });

            for(var i = 0; i < indexes.length; i++){
                d.rows.add(this.rows.item(indexes[i]));
            }

            // Notify added rows
            this.onRowsAdded(d);


        }

        /**
         * Commits the current transaction of rows changed.
         LatteEvent <c>rowsChanged</c> is raised.
         **/
        commitChangedRows(){


            var d = new DataSet();
            var old = new DataSet();
            var indexes = [];

            this.endCellEdit();

            // Add dataset columns
            d.columns.addCollection(this.columns);
            old.columns.addCollection(this.columns);

            // Collect new row indexes
            this.table.find('tr.changeable-row').each(function(){
                var tr = $(this);

                // push index into array
                indexes.push(tr.data('rowIndex'));

                // Remove insertable-row class
                tr.removeClass('changeable-row').addClass('pendent pendent-update');
            });

            for(var i = 0; i < indexes.length; i++){
                var rowIndex = indexes[i];
                d.rows.add(this.rows.item(rowIndex));

                // Form old row
                var row = new DataSetRow(); old.rows.add(row);

                for(var j = 0; j < old.columns.count; j++){
                    var columnIndex = j;
                    var value = this.originalValue(columnIndex, rowIndex);

                    if(_undef(value))
                        if(this.hasValueAt(columnIndex, rowIndex))
                            value = this.getValueAt(columnIndex, rowIndex)
                        else
                            null;

                    row.setValueAt(columnIndex, value);
                }
            }

            // Notify added rows
            this.onRowsChanged(d, old);


        }

        /**
         * Commits the current transaction of rows deleted.
         LatteEvent <c>rowsDeleted</c> is raised.
         **/
            commitDeletedRows(){


            var d = new DataSet();
            var indexes = [];

            this.endCellEdit();

            // Add dataset columns
            d.columns.addCollection(this.columns);

            // Collect new row indexes
            this.table.find('tr.deletable-row').each(function(){
                var tr = $(this);

                // Remove * symbol
                tr.find('th').text(tr.data('rowIndex') + 1);

                // push index into array
                indexes.push(tr.data('rowIndex'));

                // Remove insertable-row class
                tr.removeClass('deletable-row').addClass('pendent pendent-delete');
            });

            for(var i = 0; i < indexes.length; i++){
                d.rows.add(this.rows.item(indexes[i]));
            }

            // Notify removed rows
            this.onRowsRemoved(d);


        }

        /**
         * Confirms the commit of added rows
         **/
            confirmRowsAdded(){

            this.table.find('tr.pendent-insert').removeClass('pendent pendent-insert');

        }

        /**
         * Confirms the commit of changed rows
         **/
            confirmRowsChanged(){

            this.table.find('tr.pendent-update').removeClass('pendent pendent-update');

        }

        /**
         * Confirms the commit of delete rows
         **/
            confirmRowsRemoved(){


            // Remove rows on data
            var indexes = []

            // Collect indexes
            this.table.find('tr.pendent-delete').each(function(){
                indexes.push($(this).data('rowIndex')); });

            // Remove from the last to the first
            for(var i = indexes.length - 1; i >= 0; i--)
                this.rows.removeAt(indexes[i]);

        }

        /**
         * Enables the user a mechanism for copying the value of the cell to clipboard
         **/
        copySelectedCellValue(){


            var txtView = new TextView();
            txtView.text = this.selectedCell.text();

            var btnOk = new ButtonItem();
            btnOk.text = strings.ok;


            var d = new DialogView(
                txtView,
                [btnOk]
            );

            d.show();

            txtView.textElement.focus();
            txtView.textElement.select();

        }

        /**
         * Marks the row at the specified position for deletion
         **/
            deleteRowAt(rowIndex: number){

            this.getRowElementAt(rowIndex).addClass('deletable-row');
            this._transactionStart();

        }

        /**
         * Starts the edition mode of the cell at the specified row and column.
         **/
            editCellAt(columnIndex: number, rowIndex: number){


            if(!this.canEditCellAt(columnIndex, rowIndex)) return;

            var gv = this;
            var td = this.getCellElementAt(columnIndex, rowIndex);
            var val = this.hasValueAt(columnIndex, rowIndex) ? this.getValueAt(columnIndex, rowIndex) : '';
            var col = this.columns.item(columnIndex);

            this.clearSelection();

            // Mark as editing
            td.addClass('editing');

            var input = new InputItem()
            input.type = <any>col.type;
            input.options = col.options;
            input.value = val;
            input.textVisible = false;

            input.element.find('input[type=text], input[type=password], textarea')
                .width(td.width());

            // Add input to Td
            td.empty()
                .append(input.element)
                .data('input', input);

            // Focus input
            var elem = input.element.find('input, select, textarea');

            elem
                .keydown(function(evt){
                    if(evt.keyCode == Key.ESCAPE)
                        gv.endCellEdit(true);
                    else if(evt.keyCode == Key.TAB)
                        if((<any>evt).shiftKey)
                            gv.editPreviousCell();
                        else
                            gv.editNextCell();
                    else if(evt.keyCode == Key.ENTER)
                        gv.endCellEdit(false);
                })
                .click(function(ev){
                    ev.stopPropagation();
                });

            setTimeout(function(){ elem.first().focus().select() }, 100);


            this.endCellEdit();
            this._editingTd = td;

        }

        /**
         * Starts the edition mode of the next cell on the grid, if already in edition mode.
         **/
            editNextCell(){

            if(!this.editing) return;


            var rowCount = this.table.find('tr.row').length - 1;
            var colCount = this.columns.count;
            var row = this._editingTd.data('rowIndex');
            var col = this._editingTd.data('columnIndex');

            if(col == colCount - 1 && row == rowCount - 1) return;

            if(col == colCount - 1){
                col = 0;
                row++;
            }else{
                col++;
            }

            this.editCellAt(col, row);

        }

        /**
         * Starts the edition mode of the previous cell on the grid, if already in edition mode.
         **/
            editPreviousCell(){

            if(!this.editing) return;


            var colCount = this.columns.count;
            var row = this._editingTd.data('rowIndex');
            var col = this._editingTd.data('columnIndex');

            if(row == 0 && col == 0) return;

            if(col == 0){
                col = colCount - 1;
                row--;
            }else{
                col--;
            }

            this.editCellAt(col, row);

        }

        /**
         * Ends the edition mode of the current editing cell. Optionally cancells edition by returning value to its original state.
         **/
            endCellEdit(cancelled: boolean = false){

            if(!this._editingTd || this._editingTd.length == 0) return;

            var input = this._editingTd.data('input');
            var value = input.value;
            var row = this._editingTd.data('rowIndex');
            var col = this._editingTd.data('columnIndex');

            //log("endCell col: %s; row: %s; value: %s", col, row, value)

            // Check if new row
            if(this._editingTd.parent().hasClass('insert-row')){

                // If not cancelled, add another row
                if(cancelled !== true){
                    this._makeInsertRowCandidate();
                    this._addInsertRow();
                }
                // Clears the value
                this.setValueAt(col, row, value);

            }else if(this._editingTd.parent().hasClass('insertable-row')){
                this.setValueAt(col, row, value);

            }else{
                if(cancelled !== true){
                    this.setValueAt(col, row, value, true);
                }else{
                    if(this.hasValueAt(col, row))
                        this.setValueAt(col, row, this.getValueAt(col, row));
                }
            }

            if(!cancelled)
                this._editingTd.addClass('changeable-row');

            this._editingTd.data('input', null);
            this._editingTd.removeClass('editing');
            this._editingTd = null;

        }

        /**
         * Gets the actual element of the cell at specified column and row.
         **/
            getCellElementAt(columnIndex: number, rowIndex: number): JQuery{

            return this.table.find(sprintf("tr:eq(%s) td:eq(%s)", rowIndex + 1, columnIndex));
            //return this.table.find('td.row-' + rowIndex + '.col-' + columnIndex);

        }

        /**
         *
         **/
            getData(): DataSet{

            var d = new DataSet();

            d.columns.addCollection(this.columns);
            d.rows.addCollection(this.rows);

            return d;

        }

        /**
         * Gets the actual element of the row at specified column and row.
         **/
            getRowElementAt(rowIndex: number): JQuery{

            return this.table.find(sprintf("tr:eq(%s)", rowIndex + 1));

        }

        /**
         * Gets the data value at the specified position.
         **/
            getValueAt(columnIndex: number, rowIndex: number): any{

            if(this.hasValueAt(columnIndex, rowIndex))
                return this.rows.item(rowIndex).getValueAt(columnIndex);
            else
            if(this.rows.count <= rowIndex)
                throw new InvalidArgumentEx('rowIndex', rowIndex);
            else
                throw new InvalidArgumentEx('columnIndex', columnIndex);

        }

        /**
         * Gets a value indicating if the there is a cell for the specified position
         **/
            hasCellAt(columnIndex: number, rowIndex: number): boolean{

            return this.getCellElementAt(columnIndex, rowIndex).length > 0;

        }

        /**
         * Gets a value indicating if there is a value at the specified position.
         **/
            hasValueAt(columnIndex: number, rowIndex: number): boolean{

            return this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex);

        }

        /**
         * Raises the <c>committed</c> event
         **/
        onCommitted(){

            this.committed.raise();

        }

        /**
         * Raises the <c>contextItemsShow</c> event.
         **/
            onContextItemsShow(){

            super.onContextItemsShow();

            // Get cell on mouse
            var hover = this.table.find('td.cell.hover');
            var columnIndex = hover.data('columnIndex');
            var rowIndex = hover.data('rowIndex');

            // Clear actions
            this.contextItems.clear();

            // If no cell on mouse, no menus
            if(hover.length == 0) return;

            // Select hover cell
            this.selectCellAt(columnIndex, rowIndex);

            // Disable delete row if in new row
            this._actionRemoveRow.enabled = !hover.parent().hasClass('insert-row') && this.allowDeleteRows;

            // Disable set null
            this._actionSetCellNull.enabled = this.canEditCellAt(columnIndex, rowIndex);

            // Copy & paste
            this.contextItems.add(this._actionCopyCellValue.getButton());
            this.contextItems.add(this._actionPasteCellValue.getButton());
            this.contextItems.add(new SeparatorItem());

            // Set NULL value
            this.contextItems.add(this._actionSetCellNull.getButton());

            // Delete row
            this.contextItems.add(this._actionRemoveRow.getButton());

        }

        /**
         * Raises the <c>rowsAdded</c> event.
         **/
            onRowsAdded(dataset: DataSet){

            this.rowsAdded.raise(dataset);

        }

        /**
         * Raises the <c>rowsChanged</c> event.
         **/
            onRowsChanged(dataset: DataSet, oldDataset: DataSet = null){

            this.rowsChanged.raise(dataset, oldDataset);

        }

        /**
         * Raises the <c>rowsDeleted</c> event.
         **/
            onRowsRemoved(dataset: DataSet){

            this.rowsRemoved.raise(dataset);

        }

        /**
         * Raises the <c>valueChanged</c> event.
         **/
            onValueChanged(columnIndex: number, rowIndex: number, value: any, oldValue: any){


            // Ensure transaction is on the go
            this._transactionStart();

            // Mark as changeable
            this.getRowElementAt(rowIndex).addClass('changeable-row');

            // Set original value
            if(_undef(this.originalValue(columnIndex, rowIndex)))
                this.originalValue(columnIndex, rowIndex, oldValue);

            // Raise event
            this.valueChanged.raise({row: rowIndex, column: columnIndex, value: value, oldValue: oldValue});

        }

        /**
         * Gets or sets the original value of the specified position.
         If no changes have occoured, it will return <c>undefined</c>
         **/
        originalValue(columnIndex: number, rowIndex: number, value: any = null): any{


            var cell = this.getCellElementAt(columnIndex, rowIndex);

            if(_undef(value))
                return cell.data('original-value');

            cell.data('original-value', value);

            return this;

        }

        /**
         * Restores the original value at the specified position if possible.
         **/
            restoreValueAt(columnIndex: number, rowIndex: number){

            if(!this.hasCellAt(columnIndex, rowIndex)) return;

            var cell = this.getCellElementAt(columnIndex, rowIndex);

            if(!_undef(cell.data('original-value'))){
                this.setValueAt(columnIndex, rowIndex, cell.data('original-value'));
                cell.removeData('original-value');
            }

        }

        /**
         * Cancels the current transaction of rows added, changed and deleted.
         **/
            rollback(){


            var gv = this;

            // End any active edit
            this.endCellEdit();

            // Remove rows on data
            var indexes = []

            // Collect indexes
            this.table.find('tr.insertable-row').each(function(){
                indexes.push($(this).data('rowIndex')); });

            // Remove from the last to the first
            for(var i = indexes.length - 1; i >= 0; i--)
                this.rows.removeAt(indexes[i]);

            // Remove insert row
            this._removeInsertRow();

            // Add if insertable
            if(this.allowNewRows)
                this.allowNewRows = this.allowNewRows;

            // Remove deletable-row marks
                this.table.find('tr.deletable-row').removeClass('deletable-row');

            // Remove changeable-row marks
            this.table.find('tr.changeable-row')
                .each(function(){
                    var rowIndex = $(this).data('rowIndex');

                    for(var columnIndex = 0; columnIndex < gv.columns.count; columnIndex++)
                        gv.restoreValueAt(columnIndex, rowIndex);

                })
                .removeClass('changeable-row');

            // Remove the commit button
            this._transactionEnd();

        }

        /**
         * Selects the cell at the specified position.
         **/
            selectCellAt(columnIndex: number, rowIndex: number){

            this.clearSelection();
            this.getCellElementAt(columnIndex, rowIndex).addClass('selected');

        }

        /**
         *
         **/
            setData(value: DataSet){


            this.columns.clear();
            this.rows.clear();

            var row: DataSetRow, col: DataSetColumn, buff = this.allowNewRows;

            while( (col = value.columns.next()) )
                this.columns.add(new GridViewColumn(col.name, col.type, col.length));

            // Deactivate allow new rows
            this.allowNewRows = false;

            while( (row = value.rows.next()) )
                this.rows.add(new GridViewRow(row.data));

            // Deactivate allow new rows
            this.allowNewRows = buff;

        }

        /**
         * Sets the data value at the specified position.
         Optionally specifies if the <c>valueChanged</c> should be raised
         **/
            setValueAt(columnIndex: number, rowIndex: number, value: any, raiseEvent: boolean = false){


            var td = this.getCellElementAt(columnIndex, rowIndex);
            var oldValue = this.hasValueAt(columnIndex, rowIndex) ? this.getValueAt(columnIndex, rowIndex) : null;

            // Set row value
            if(this.rows.count > rowIndex)
                this.rows.item(rowIndex).setValueAt(columnIndex, value);

            if(value === null){
                td.empty().append($('<div>').addClass('null').text("NULL"));

            }else if(this.columns.item(columnIndex).type == 'password' || this.columns.item(columnIndex).type == 'md5-password'){

                // Place a "(Sectet)" string
                td.empty().html(sprintf("(%s)", strings.secret));
            }else{
                // Empty td and set value
                td.empty().html(
                    InputItem.format(
                        value,
                        this.columns.item(columnIndex).type,
                        this.columns.item(columnIndex).options
                    )
                );
            }

            if(raiseEvent === true){
                this.onValueChanged(columnIndex, rowIndex, value, oldValue);
            }


        }

        /**
         * Gets or sets a value indicating if the user is allowed to change values on rows
         **/
        get allowChangeRows(): boolean{
            return this._allowChangeRows;
        }

        /**
         * Gets or sets a value indicating if the user is allowed to change values on rows
         **/
        set allowChangeRows(value: boolean){


            this._allowChangeRows = value;



        }

        /**
         * Gets or sets a value indicating if the user is allowed to delete rows
         **/
        get allowDeleteRows(): boolean{
            return this._allowDeleteRows;
        }

        /**
         * Gets or sets a value indicating if the user is allowed to delete rows
         **/
        set allowDeleteRows(value: boolean){


            this.allowDeleteRows = value;



        }

        /**
         * Gets or sets a value indicating if the user is allowed to create new rows
         **/
        get allowNewRows(): boolean{
            return this._allowNewRows;
        }

        /**
         * Gets or sets a value indicating if the user is allowed to create new rows
         **/
        set allowNewRows(value: boolean){


            this._allowNewRows = value;

            if(value){
                this._removeInsertRow();
                if(!this.readOnly)
                    this._addInsertRow();
            }else{
                this._removeInsertRow();
            }




        }

        /**
         * Gets or sets the data on grid as a DataSet
         **/
        get data(): DataSet{
            return this.getData();
        }

        /**
         * Gets or sets the data on grid as a DataSet
         **/
        set data(value: DataSet){


            this.setData(value);




        }

        /**
         * Gets a value indicating if some cell of the grid is currently on edit mode
         **/
        get editing(): boolean{

            return this._editingTd ? true : false;

        }

        /**
         * Gets or sets a value indicating if the whole grid should be read-only.
         **/
        get readOnly(): boolean{
            return this._readOnly;
        }

        /**
         * Gets or sets a value indicating if the whole grid should be read-only.
         **/
        set readOnly(value: boolean){


            this._readOnly = value;

            if(value){
                this._removeInsertRow();
            }else{
                this.allowNewRows = this.allowNewRows;
            }



        }

        /**
         * Gets or sets the selected cell of grid
         **/
        get selectedCell(): JQuery{
            return this.table.find('td.cell.selected');
        }

        /**
         * Gets or sets the selected cell of grid
         **/
        set selectedCell(value: JQuery){


            if(!(value instanceof jQuery))
                throw new InvalidArgumentEx('value');

            this.selectCellAt(value.data('columnIndex'), value.data('rowIndex'));



        }
    }
}