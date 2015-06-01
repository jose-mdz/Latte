var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var latte;
(function (latte) {
    /**
     * Renders a grid that allows data manipulation
     **/
    var GridView = (function (_super) {
        __extends(GridView, _super);
        /**
         * Creates the GridView
         **/
        function GridView() {
            var _this = this;
            _super.call(this);
            /**
             *
             **/
            this._allowChangeRows = true;
            /**
             *
             **/
            this._allowDeleteRows = true;
            /**
             *
             **/
            this._allowNewRows = true;
            var gv = this;
            window['g'] = gv;
            this.element.addClass('grid');
            // Initialize Events
            this.committed = new latte.LatteEvent(this);
            this.valueChanged = new latte.LatteEvent(this);
            this.rowsAdded = new latte.LatteEvent(this);
            this.rowsChanged = new latte.LatteEvent(this);
            this.rowsRemoved = new latte.LatteEvent(this);
            // Initialize Collections
            this.columns = new latte.Collection(this._onAddColumn, this._onRemoveColumn, this);
            this.rows = new latte.Collection(this._onAddRow, this._onRemoveRow, this);
            // Create table
            this.table = $('<table>', { border: 1 }).appendTo(this.container).hide();
            // Create headers row
            this._trColumns = $('<tr>').addClass('headers').appendTo(this.table);
            // Create the Select all cell
            this._tdAll = $('<th>').appendTo(this._trColumns);
            // On table mouseout un select headers
            this.table.mouseleave(function () {
                _this._selectColumnHeader();
            });
            this.table.click(function () {
                _this.endCellEdit();
            });
            // Initialize properties
            this.allowNewRows = this.allowNewRows;
            // Initialize actions
            this._actionCommit = new latte.Action();
            this._actionCommit.text = strings.apply;
            this._actionCommit.icon = latte.IconItem.standard(1, 6);
            this._actionCommit.enabled = false;
            this._actionCommit.execute.add(function () {
                _this.commit();
            });
            this._actionRollback = new latte.Action();
            this._actionRollback.text = strings.revert;
            this._actionRollback.icon = latte.IconItem.standard(2, 6);
            this._actionRollback.enabled = false;
            this._actionRollback.execute.add(function () {
                _this.rollback();
            });
            this._actionRemoveRow = new latte.Action();
            this._actionRemoveRow.text = strings.deleteRow;
            this._actionRemoveRow.icon = latte.IconItem.standard(11, 5);
            this._actionRemoveRow.execute.add(function () {
                _this.deleteRowAt(_this.selectedCell.data('rowIndex'));
            });
            this._actionCopyCellValue = new latte.Action();
            this._actionCopyCellValue.text = strings.copy;
            this._actionCopyCellValue.icon = latte.IconItem.standard(14, 5);
            this._actionCopyCellValue.execute.add(function () {
                _this.copySelectedCellValue();
            });
            this._actionPasteCellValue = new latte.Action();
            this._actionPasteCellValue.text = strings.paste;
            this._actionPasteCellValue.icon = latte.IconItem.standard(15, 4);
            this._actionPasteCellValue.execute.add(function () {
            });
            this._actionSetCellNull = new latte.Action();
            this._actionSetCellNull.text = strings.setAsNull;
            this._actionSetCellNull.icon = latte.IconItem.empty(32);
            this._actionSetCellNull.execute.add(function () {
                _this.setValueAt(_this.selectedCell.data('columnIndex'), _this.selectedCell.data('rowIndex'), null, true);
            });
        }
        /**
         *
         **/
        GridView.prototype._addInsertRow = function () {
            var row = this._createRow();
            var rowIndex = this.rows.count;
            row.removeClass('row').addClass('insert-row').appendTo(this.table).find('th').text("*");
            // Fix row number
            row.find('td').data('rowIndex', rowIndex);
        };
        /**
         *
         **/
        GridView.prototype._createCell = function (columnIndex, rowIndex) {
            var gv = this;
            var cell = $('<td>').addClass('cell').data('rowIndex', rowIndex).data('columnIndex', columnIndex).click(function () {
                gv.selectCellAt($(this).data('columnIndex'), $(this).data('rowIndex'));
            }).dblclick(function () {
                if (!$(this).hasClass('editing'))
                    gv.editCellAt($(this).data('columnIndex'), $(this).data('rowIndex'));
            }).mouseenter(function () {
                gv._selectColumnHeader($(this).data('columnIndex'));
                gv._selectRowHeader($(this).data('rowIndex'));
                $(this).addClass('hover');
            }).mouseleave(function () {
                $(this).removeClass('hover');
            });
            latte.UiElement.disableTextSelection(cell);
            return cell;
        };
        /**
         *
         **/
        GridView.prototype._createRow = function () {
            var rowIndex = this.rows.count - 1; //this.table.find('tr.row').length;
            var tr = $('<tr>').addClass('row').appendTo(this.table);
            tr.data('rowIndex', rowIndex);
            // Create number th
            $('<th>').text(rowIndex + 1 + '').appendTo(tr);
            for (var i = 0; i < this.columns.count; i++) {
                this._createCell(i, rowIndex).appendTo(tr);
            }
            return tr;
        };
        /**
         *
         **/
        GridView.prototype._makeInsertRowCandidate = function () {
            var row = new latte.GridViewRow();
            this.rows.add(row, false);
            var count = this.rows.count;
            this.table.find('tr.insert-row').data('rowIndex', count - 1);
            this.table.find('tr.insert-row th').text(count + '*');
            row.element = this.table.find('tr.insert-row').removeClass('insert-row').addClass('insertable-row');
            // Activate insert button
            this._transactionStart();
        };
        /**
         *
         **/
        GridView.prototype._onAddColumn = function (column) {
            var _this = this;
            var th = $('<th>').appendTo(this._trColumns);
            var index = this.columns.count - 1;
            column.header = th;
            column.optionsChanged.add(function () {
                for (var i = 0; i < _this.rows.count; i++) {
                    _this.setValueAt(index, i, _this.getValueAt(index, i), false);
                }
            });
            th.text(column.name);
            this.table.show();
        };
        /**
         *
         **/
        GridView.prototype._onAddRow = function (row) {
            var rowIndex = this.rows.count - 1;
            // Remove the Insert Row
            if (this._allowNewRows)
                this._removeInsertRow();
            // Create table row
            this._createRow().appendTo(this.table);
            for (var i = 0; i < this.columns.count; i++) {
                // Set the cell value
                if (this.hasValueAt(i, rowIndex)) {
                    var v = this.getValueAt(i, rowIndex);
                    this.setValueAt(i, rowIndex, v);
                }
            }
            // Point row
            row.element = this.getRowElementAt(rowIndex);
            // Add the Insert Row
            if (this._allowNewRows)
                this._addInsertRow();
        };
        /**
         *
         **/
        GridView.prototype._onRemoveColumn = function (column) {
            column.header.remove();
            this.allowNewRows = this.allowNewRows;
        };
        /**
         *
         **/
        GridView.prototype._onRemoveRow = function (row, index) {
            row.element.remove();
            this._updateRowIndexes();
        };
        /**
         *
         **/
        GridView.prototype._removeInsertRow = function () {
            this.table.find('tr.insert-row').remove();
        };
        /**
         *
         **/
        GridView.prototype._selectColumnHeader = function (index) {
            if (index === void 0) { index = -1; }
            this.table.find('th').removeClass('selected');
            if (index < 0)
                this.columns.item(index).header.addClass('selected');
        };
        /**
         *
         **/
        GridView.prototype._selectRowHeader = function (index) {
            this.table.find('tr:eq(' + (index + 1) + ') > th').addClass('selected');
        };
        /**
         *
         **/
        GridView.prototype._transactionEnd = function () {
            this.container.find('.insert-button').remove();
            this._actionCommit.enabled = false;
            this._actionRollback.enabled = false;
        };
        /**
         *
         **/
        GridView.prototype._transactionStart = function () {
            if (this.container.find('.insert-button').length)
                return;
            var bg = new latte.ButtonGroupItem();
            bg.buttons.add(this._actionCommit.getButton());
            bg.buttons.add(this._actionRollback.getButton());
            bg.element.addClass('insert-button').css({
                position: 'absolute',
                right: 5,
                top: 5,
                borderRadius: 4,
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
            }).appendTo(this.container);
            this._actionCommit.enabled = true;
            this._actionRollback.enabled = true;
        };
        /**
         *
         **/
        GridView.prototype._updateRowIndexes = function () {
            var i = 0;
            this.table.find('tr:not(.headers)').each(function () {
                var tr = $(this);
                tr.data('rowIndex', i);
                tr.children().data('rowIndex', i);
                i++;
            });
        };
        /**
         * Gets a value indicating if the cell at the specified position can be edited.
         **/
        GridView.prototype.canEditCellAt = function (columnIndex, rowIndex) {
            var row = this.getRowElementAt(rowIndex);
            var cell = this.hasCellAt(columnIndex, rowIndex) ? this.getCellElementAt(columnIndex, rowIndex) : null;
            var canEdit = cell instanceof jQuery && !this.readOnly && !this.columns.item(columnIndex).readOnly && !row.hasClass('pendent') && !row.hasClass('deletable-row') && this.allowChangeRows;
            if (this.rows.item(rowIndex))
                canEdit = canEdit && !this.rows.item(rowIndex).readOnly;
            return canEdit;
        };
        /**
         * Clears selection of cells.
         **/
        GridView.prototype.clearSelection = function () {
            this.table.find('td.selected').removeClass('selected');
        };
        /**
         * Commits the current transaction of rows added, changed and deleted.
         Events <c>rowsAdded</c>, <c>rowsChanged</c>, <c>rowsRemoved</c> are raised accordingly.
         **/
        GridView.prototype.commit = function () {
            this.commitAddedRows();
            this.commitChangedRows();
            this.commitDeletedRows();
            this._transactionEnd();
            this.onCommitted();
        };
        /**
         * Commits the current transaction of rows added.
         LatteEvent <c>rowsAdded</c> is raised.
         **/
        GridView.prototype.commitAddedRows = function () {
            var d = new latte.DataSet();
            var indexes = [];
            this.endCellEdit();
            for (var i = 0; i < this.columns.count; i++) {
                d.columns.add(this.columns.item(i));
            }
            // Collect new row indexes
            this.table.find('tr.insertable-row').each(function () {
                var tr = $(this);
                // Remove * symbol
                tr.find('th').text(tr.data('rowIndex') + 1);
                // push index into array
                indexes.push(tr.data('rowIndex'));
                // Remove insertable-row class
                tr.removeClass('insertable-row').addClass('pendent pendent-insert');
            });
            for (var i = 0; i < indexes.length; i++) {
                d.rows.add(this.rows.item(indexes[i]));
            }
            // Notify added rows
            this.onRowsAdded(d);
        };
        /**
         * Commits the current transaction of rows changed.
         LatteEvent <c>rowsChanged</c> is raised.
         **/
        GridView.prototype.commitChangedRows = function () {
            var d = new latte.DataSet();
            var old = new latte.DataSet();
            var indexes = [];
            this.endCellEdit();
            // Add dataset columns
            d.columns.addCollection(this.columns);
            old.columns.addCollection(this.columns);
            // Collect new row indexes
            this.table.find('tr.changeable-row').each(function () {
                var tr = $(this);
                // push index into array
                indexes.push(tr.data('rowIndex'));
                // Remove insertable-row class
                tr.removeClass('changeable-row').addClass('pendent pendent-update');
            });
            for (var i = 0; i < indexes.length; i++) {
                var rowIndex = indexes[i];
                d.rows.add(this.rows.item(rowIndex));
                // Form old row
                var row = new latte.DataSetRow();
                old.rows.add(row);
                for (var j = 0; j < old.columns.count; j++) {
                    var columnIndex = j;
                    var value = this.originalValue(columnIndex, rowIndex);
                    if (latte._undef(value))
                        if (this.hasValueAt(columnIndex, rowIndex))
                            value = this.getValueAt(columnIndex, rowIndex);
                        else
                            null;
                    row.setValueAt(columnIndex, value);
                }
            }
            // Notify added rows
            this.onRowsChanged(d, old);
        };
        /**
         * Commits the current transaction of rows deleted.
         LatteEvent <c>rowsDeleted</c> is raised.
         **/
        GridView.prototype.commitDeletedRows = function () {
            var d = new latte.DataSet();
            var indexes = [];
            this.endCellEdit();
            // Add dataset columns
            d.columns.addCollection(this.columns);
            // Collect new row indexes
            this.table.find('tr.deletable-row').each(function () {
                var tr = $(this);
                // Remove * symbol
                tr.find('th').text(tr.data('rowIndex') + 1);
                // push index into array
                indexes.push(tr.data('rowIndex'));
                // Remove insertable-row class
                tr.removeClass('deletable-row').addClass('pendent pendent-delete');
            });
            for (var i = 0; i < indexes.length; i++) {
                d.rows.add(this.rows.item(indexes[i]));
            }
            // Notify removed rows
            this.onRowsRemoved(d);
        };
        /**
         * Confirms the commit of added rows
         **/
        GridView.prototype.confirmRowsAdded = function () {
            this.table.find('tr.pendent-insert').removeClass('pendent pendent-insert');
        };
        /**
         * Confirms the commit of changed rows
         **/
        GridView.prototype.confirmRowsChanged = function () {
            this.table.find('tr.pendent-update').removeClass('pendent pendent-update');
        };
        /**
         * Confirms the commit of delete rows
         **/
        GridView.prototype.confirmRowsRemoved = function () {
            // Remove rows on data
            var indexes = [];
            // Collect indexes
            this.table.find('tr.pendent-delete').each(function () {
                indexes.push($(this).data('rowIndex'));
            });
            for (var i = indexes.length - 1; i >= 0; i--)
                this.rows.removeAt(indexes[i]);
        };
        /**
         * Enables the user a mechanism for copying the value of the cell to clipboard
         **/
        GridView.prototype.copySelectedCellValue = function () {
            var txtView = new latte.TextView();
            txtView.text = this.selectedCell.text();
            var btnOk = new latte.ButtonItem();
            btnOk.text = strings.ok;
            var d = new latte.DialogView(txtView, [btnOk]);
            d.show();
            txtView.textElement.focus();
            txtView.textElement.select();
        };
        /**
         * Marks the row at the specified position for deletion
         **/
        GridView.prototype.deleteRowAt = function (rowIndex) {
            this.getRowElementAt(rowIndex).addClass('deletable-row');
            this._transactionStart();
        };
        /**
         * Starts the edition mode of the cell at the specified row and column.
         **/
        GridView.prototype.editCellAt = function (columnIndex, rowIndex) {
            if (!this.canEditCellAt(columnIndex, rowIndex))
                return;
            var gv = this;
            var td = this.getCellElementAt(columnIndex, rowIndex);
            var val = this.hasValueAt(columnIndex, rowIndex) ? this.getValueAt(columnIndex, rowIndex) : '';
            var col = this.columns.item(columnIndex);
            this.clearSelection();
            // Mark as editing
            td.addClass('editing');
            var input = new latte.InputItem();
            input.type = col.type;
            input.options = col.options;
            input.value = val;
            input.textVisible = false;
            input.element.find('input[type=text], input[type=password], textarea').width(td.width());
            // Add input to Td
            td.empty().append(input.element).data('input', input);
            // Focus input
            var elem = input.element.find('input, select, textarea');
            elem.keydown(function (evt) {
                if (evt.keyCode == 27 /* ESCAPE */)
                    gv.endCellEdit(true);
                else if (evt.keyCode == 9 /* TAB */)
                    if (evt.shiftKey)
                        gv.editPreviousCell();
                    else
                        gv.editNextCell();
                else if (evt.keyCode == 13 /* ENTER */)
                    gv.endCellEdit(false);
            }).click(function (ev) {
                ev.stopPropagation();
            });
            setTimeout(function () {
                elem.first().focus().select();
            }, 100);
            this.endCellEdit();
            this._editingTd = td;
        };
        /**
         * Starts the edition mode of the next cell on the grid, if already in edition mode.
         **/
        GridView.prototype.editNextCell = function () {
            if (!this.editing)
                return;
            var rowCount = this.table.find('tr.row').length - 1;
            var colCount = this.columns.count;
            var row = this._editingTd.data('rowIndex');
            var col = this._editingTd.data('columnIndex');
            if (col == colCount - 1 && row == rowCount - 1)
                return;
            if (col == colCount - 1) {
                col = 0;
                row++;
            }
            else {
                col++;
            }
            this.editCellAt(col, row);
        };
        /**
         * Starts the edition mode of the previous cell on the grid, if already in edition mode.
         **/
        GridView.prototype.editPreviousCell = function () {
            if (!this.editing)
                return;
            var colCount = this.columns.count;
            var row = this._editingTd.data('rowIndex');
            var col = this._editingTd.data('columnIndex');
            if (row == 0 && col == 0)
                return;
            if (col == 0) {
                col = colCount - 1;
                row--;
            }
            else {
                col--;
            }
            this.editCellAt(col, row);
        };
        /**
         * Ends the edition mode of the current editing cell. Optionally cancells edition by returning value to its original state.
         **/
        GridView.prototype.endCellEdit = function (cancelled) {
            if (cancelled === void 0) { cancelled = false; }
            if (!this._editingTd || this._editingTd.length == 0)
                return;
            var input = this._editingTd.data('input');
            var value = input.value;
            var row = this._editingTd.data('rowIndex');
            var col = this._editingTd.data('columnIndex');
            //log("endCell col: %s; row: %s; value: %s", col, row, value)
            // Check if new row
            if (this._editingTd.parent().hasClass('insert-row')) {
                // If not cancelled, add another row
                if (cancelled !== true) {
                    this._makeInsertRowCandidate();
                    this._addInsertRow();
                }
                // Clears the value
                this.setValueAt(col, row, value);
            }
            else if (this._editingTd.parent().hasClass('insertable-row')) {
                this.setValueAt(col, row, value);
            }
            else {
                if (cancelled !== true) {
                    this.setValueAt(col, row, value, true);
                }
                else {
                    if (this.hasValueAt(col, row))
                        this.setValueAt(col, row, this.getValueAt(col, row));
                }
            }
            if (!cancelled)
                this._editingTd.addClass('changeable-row');
            this._editingTd.data('input', null);
            this._editingTd.removeClass('editing');
            this._editingTd = null;
        };
        /**
         * Gets the actual element of the cell at specified column and row.
         **/
        GridView.prototype.getCellElementAt = function (columnIndex, rowIndex) {
            return this.table.find(latte.sprintf("tr:eq(%s) td:eq(%s)", rowIndex + 1, columnIndex));
            //return this.table.find('td.row-' + rowIndex + '.col-' + columnIndex);
        };
        /**
         *
         **/
        GridView.prototype.getData = function () {
            var d = new latte.DataSet();
            d.columns.addCollection(this.columns);
            d.rows.addCollection(this.rows);
            return d;
        };
        /**
         * Gets the actual element of the row at specified column and row.
         **/
        GridView.prototype.getRowElementAt = function (rowIndex) {
            return this.table.find(latte.sprintf("tr:eq(%s)", rowIndex + 1));
        };
        /**
         * Gets the data value at the specified position.
         **/
        GridView.prototype.getValueAt = function (columnIndex, rowIndex) {
            if (this.hasValueAt(columnIndex, rowIndex))
                return this.rows.item(rowIndex).getValueAt(columnIndex);
            else if (this.rows.count <= rowIndex)
                throw new latte.InvalidArgumentEx('rowIndex', rowIndex);
            else
                throw new latte.InvalidArgumentEx('columnIndex', columnIndex);
        };
        /**
         * Gets a value indicating if the there is a cell for the specified position
         **/
        GridView.prototype.hasCellAt = function (columnIndex, rowIndex) {
            return this.getCellElementAt(columnIndex, rowIndex).length > 0;
        };
        /**
         * Gets a value indicating if there is a value at the specified position.
         **/
        GridView.prototype.hasValueAt = function (columnIndex, rowIndex) {
            return this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex);
        };
        /**
         * Raises the <c>committed</c> event
         **/
        GridView.prototype.onCommitted = function () {
            this.committed.raise();
        };
        /**
         * Raises the <c>contextItemsShow</c> event.
         **/
        GridView.prototype.onContextItemsShow = function () {
            _super.prototype.onContextItemsShow.call(this);
            // Get cell on mouse
            var hover = this.table.find('td.cell.hover');
            var columnIndex = hover.data('columnIndex');
            var rowIndex = hover.data('rowIndex');
            // Clear actions
            this.contextItems.clear();
            // If no cell on mouse, no menus
            if (hover.length == 0)
                return;
            // Select hover cell
            this.selectCellAt(columnIndex, rowIndex);
            // Disable delete row if in new row
            this._actionRemoveRow.enabled = !hover.parent().hasClass('insert-row') && this.allowDeleteRows;
            // Disable set null
            this._actionSetCellNull.enabled = this.canEditCellAt(columnIndex, rowIndex);
            // Copy & paste
            this.contextItems.add(this._actionCopyCellValue.getButton());
            this.contextItems.add(this._actionPasteCellValue.getButton());
            this.contextItems.add(new latte.SeparatorItem());
            // Set NULL value
            this.contextItems.add(this._actionSetCellNull.getButton());
            // Delete row
            this.contextItems.add(this._actionRemoveRow.getButton());
        };
        /**
         * Raises the <c>rowsAdded</c> event.
         **/
        GridView.prototype.onRowsAdded = function (dataset) {
            this.rowsAdded.raise(dataset);
        };
        /**
         * Raises the <c>rowsChanged</c> event.
         **/
        GridView.prototype.onRowsChanged = function (dataset, oldDataset) {
            if (oldDataset === void 0) { oldDataset = null; }
            this.rowsChanged.raise(dataset, oldDataset);
        };
        /**
         * Raises the <c>rowsDeleted</c> event.
         **/
        GridView.prototype.onRowsRemoved = function (dataset) {
            this.rowsRemoved.raise(dataset);
        };
        /**
         * Raises the <c>valueChanged</c> event.
         **/
        GridView.prototype.onValueChanged = function (columnIndex, rowIndex, value, oldValue) {
            // Ensure transaction is on the go
            this._transactionStart();
            // Mark as changeable
            this.getRowElementAt(rowIndex).addClass('changeable-row');
            // Set original value
            if (latte._undef(this.originalValue(columnIndex, rowIndex)))
                this.originalValue(columnIndex, rowIndex, oldValue);
            // Raise event
            this.valueChanged.raise({ row: rowIndex, column: columnIndex, value: value, oldValue: oldValue });
        };
        /**
         * Gets or sets the original value of the specified position.
         If no changes have occoured, it will return <c>undefined</c>
         **/
        GridView.prototype.originalValue = function (columnIndex, rowIndex, value) {
            if (value === void 0) { value = null; }
            var cell = this.getCellElementAt(columnIndex, rowIndex);
            if (latte._undef(value))
                return cell.data('original-value');
            cell.data('original-value', value);
            return this;
        };
        /**
         * Restores the original value at the specified position if possible.
         **/
        GridView.prototype.restoreValueAt = function (columnIndex, rowIndex) {
            if (!this.hasCellAt(columnIndex, rowIndex))
                return;
            var cell = this.getCellElementAt(columnIndex, rowIndex);
            if (!latte._undef(cell.data('original-value'))) {
                this.setValueAt(columnIndex, rowIndex, cell.data('original-value'));
                cell.removeData('original-value');
            }
        };
        /**
         * Cancels the current transaction of rows added, changed and deleted.
         **/
        GridView.prototype.rollback = function () {
            var gv = this;
            // End any active edit
            this.endCellEdit();
            // Remove rows on data
            var indexes = [];
            // Collect indexes
            this.table.find('tr.insertable-row').each(function () {
                indexes.push($(this).data('rowIndex'));
            });
            for (var i = indexes.length - 1; i >= 0; i--)
                this.rows.removeAt(indexes[i]);
            // Remove insert row
            this._removeInsertRow();
            // Add if insertable
            if (this.allowNewRows)
                this.allowNewRows = this.allowNewRows;
            // Remove deletable-row marks
            this.table.find('tr.deletable-row').removeClass('deletable-row');
            // Remove changeable-row marks
            this.table.find('tr.changeable-row').each(function () {
                var rowIndex = $(this).data('rowIndex');
                for (var columnIndex = 0; columnIndex < gv.columns.count; columnIndex++)
                    gv.restoreValueAt(columnIndex, rowIndex);
            }).removeClass('changeable-row');
            // Remove the commit button
            this._transactionEnd();
        };
        /**
         * Selects the cell at the specified position.
         **/
        GridView.prototype.selectCellAt = function (columnIndex, rowIndex) {
            this.clearSelection();
            this.getCellElementAt(columnIndex, rowIndex).addClass('selected');
        };
        /**
         *
         **/
        GridView.prototype.setData = function (value) {
            this.columns.clear();
            this.rows.clear();
            var row, col, buff = this.allowNewRows;
            while ((col = value.columns.next()))
                this.columns.add(new latte.GridViewColumn(col.name, col.type, col.length));
            // Deactivate allow new rows
            this.allowNewRows = false;
            while ((row = value.rows.next()))
                this.rows.add(new latte.GridViewRow(row.data));
            // Deactivate allow new rows
            this.allowNewRows = buff;
        };
        /**
         * Sets the data value at the specified position.
         Optionally specifies if the <c>valueChanged</c> should be raised
         **/
        GridView.prototype.setValueAt = function (columnIndex, rowIndex, value, raiseEvent) {
            if (raiseEvent === void 0) { raiseEvent = false; }
            var td = this.getCellElementAt(columnIndex, rowIndex);
            var oldValue = this.hasValueAt(columnIndex, rowIndex) ? this.getValueAt(columnIndex, rowIndex) : null;
            // Set row value
            if (this.rows.count > rowIndex)
                this.rows.item(rowIndex).setValueAt(columnIndex, value);
            if (value === null) {
                td.empty().append($('<div>').addClass('null').text("NULL"));
            }
            else if (this.columns.item(columnIndex).type == 'password' || this.columns.item(columnIndex).type == 'md5-password') {
                // Place a "(Sectet)" string
                td.empty().html(latte.sprintf("(%s)", strings.secret));
            }
            else {
                // Empty td and set value
                td.empty().html(latte.InputItem.format(value, this.columns.item(columnIndex).type, this.columns.item(columnIndex).options));
            }
            if (raiseEvent === true) {
                this.onValueChanged(columnIndex, rowIndex, value, oldValue);
            }
        };
        Object.defineProperty(GridView.prototype, "allowChangeRows", {
            /**
             * Gets or sets a value indicating if the user is allowed to change values on rows
             **/
            get: function () {
                return this._allowChangeRows;
            },
            /**
             * Gets or sets a value indicating if the user is allowed to change values on rows
             **/
            set: function (value) {
                this._allowChangeRows = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "allowDeleteRows", {
            /**
             * Gets or sets a value indicating if the user is allowed to delete rows
             **/
            get: function () {
                return this._allowDeleteRows;
            },
            /**
             * Gets or sets a value indicating if the user is allowed to delete rows
             **/
            set: function (value) {
                this.allowDeleteRows = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "allowNewRows", {
            /**
             * Gets or sets a value indicating if the user is allowed to create new rows
             **/
            get: function () {
                return this._allowNewRows;
            },
            /**
             * Gets or sets a value indicating if the user is allowed to create new rows
             **/
            set: function (value) {
                this._allowNewRows = value;
                if (value) {
                    this._removeInsertRow();
                    if (!this.readOnly)
                        this._addInsertRow();
                }
                else {
                    this._removeInsertRow();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "data", {
            /**
             * Gets or sets the data on grid as a DataSet
             **/
            get: function () {
                return this.getData();
            },
            /**
             * Gets or sets the data on grid as a DataSet
             **/
            set: function (value) {
                this.setData(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "editing", {
            /**
             * Gets a value indicating if some cell of the grid is currently on edit mode
             **/
            get: function () {
                return this._editingTd ? true : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "readOnly", {
            /**
             * Gets or sets a value indicating if the whole grid should be read-only.
             **/
            get: function () {
                return this._readOnly;
            },
            /**
             * Gets or sets a value indicating if the whole grid should be read-only.
             **/
            set: function (value) {
                this._readOnly = value;
                if (value) {
                    this._removeInsertRow();
                }
                else {
                    this.allowNewRows = this.allowNewRows;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "selectedCell", {
            /**
             * Gets or sets the selected cell of grid
             **/
            get: function () {
                return this.table.find('td.cell.selected');
            },
            /**
             * Gets or sets the selected cell of grid
             **/
            set: function (value) {
                if (!(value instanceof jQuery))
                    throw new latte.InvalidArgumentEx('value');
                this.selectCellAt(value.data('columnIndex'), value.data('rowIndex'));
            },
            enumerable: true,
            configurable: true
        });
        return GridView;
    })(latte.View);
    latte.GridView = GridView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/8/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var ExplorerItem = (function () {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function ExplorerItem() {
            /**
             * Property field
             */
            this._childrenLoaded = false;
            /**
             * Property field
             */
            this._childrenPage = 1;
            /**
             * Property field
             */
            this._childrenPages = 0;
            /**
             * Property field
             */
            this._explorer = null;
            /**
             * Property field
             */
            this._loadsChildren = true;
            /**
             * Property field
             */
            this._loadsChildrenFolders = true;
            /**
             * Property field
             */
            this._parent = null;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Creates a tree item for the record
         */
        ExplorerItem.prototype.createTreeItem = function () {
            var item = new latte.TreeItem();
            item.tag = this;
            item.text = this.getName();
            item.icon = this.getIcon();
            return item;
        };
        /**
         * Creates a list view item for the record
         */
        ExplorerItem.prototype.createListViewItem = function () {
            var item = new latte.ListViewItem();
            var columns = this.getColumns();
            item.icon = this.getIcon();
            // Name column
            item.addColumn(150);
            item.setItem(0, new latte.LabelItem(this.getName()));
            return item;
        };
        /**
         * Gets the actions of the button
         *
         * @returns {Array}
         */
        ExplorerItem.prototype.getItems = function () {
            return [];
        };
        /**
         * Gets the actions that apply for child items
         *
         * @returns {Array}
         */
        ExplorerItem.prototype.getChildrenItems = function () {
            return [];
        };
        /**
         * Gets the icon of 16 pixels
         *
         * @returns {IconItem}
         */
        ExplorerItem.prototype.getIcon = function () {
            return latte.IconItem.standard(2, 1);
        };
        /**
         * Gets the icon of 32 pixels
         *
         * @returns {IconItem}
         */
        ExplorerItem.prototype.getIcon32 = function () {
            return latte.IconItem.standard(2, 1, 32);
        };
        /**
         * Gets the name for the item
         *
         * @returns {string}
         */
        ExplorerItem.prototype.getName = function () {
            return this.toString();
        };
        /**
         * Gets a value indicating if the item may be deleted
         *
         * @returns {boolean}
         */
        ExplorerItem.prototype.getCanBeDeleted = function () {
            return true;
        };
        /**
         * Gets the name of the columns that go in the lists
         * This are names of fields, described in metadata of record.
         */
        ExplorerItem.prototype.getColumns = function () {
            return [];
        };
        /**
         * Loads the children of the item
         */
        ExplorerItem.prototype.getChildrenLoader = function () {
            return null;
        };
        /**
         * Gets the detail view of the item
         *
         * @returns {latte.DataRecordFormItem}
         */
        ExplorerItem.prototype.getDetailView = function () {
            return null;
        };
        /**
         * Loads children if necessary.
         * Checks <c>loadsChildren</c> and <c>childrenLoaded</c> flags to avoid re-loading.
         */
        ExplorerItem.prototype.loadChildren = function (callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (!callback) {
                callback = function () {
                }; // Does nothing;
            }
            if (!this.loadsChildren || this.childrenLoaded) {
                callback();
                return;
            }
            else {
                // Raise load start
                this.onChildrenLoadStarted();
                // Retrieve loader
                var call = this.getChildrenLoader();
                if (call) {
                    this.children.clear();
                    this._childrenLoading = true;
                    call.send(function () {
                        // Check flag
                        _this.childrenLoaded = true;
                        // Report end of load
                        _this._childrenLoading = false;
                        // Raise load end
                        _this.onChildrenLoadEnd();
                        // Callback
                        callback();
                    });
                }
                else {
                    // Check flag
                    this.childrenLoaded = true;
                    // Raise load end
                    this.onChildrenLoadEnd();
                    callback();
                }
            }
        };
        Object.defineProperty(ExplorerItem.prototype, "childAdded", {
            /**
             * Gets an event raised when a child is added
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._childAdded) {
                    this._childAdded = new latte.LatteEvent(this);
                }
                return this._childAdded;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>childAdded</c> event
         */
        ExplorerItem.prototype.onChildAdded = function (item) {
            if (this._childAdded) {
                this._childAdded.raise(item);
            }
            item._parent = this;
        };
        Object.defineProperty(ExplorerItem.prototype, "childRemoved", {
            /**
             * Gets an event raised when a child is removed
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._childRemoved) {
                    this._childRemoved = new latte.LatteEvent(this);
                }
                return this._childRemoved;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>childRemoved</c> event
         */
        ExplorerItem.prototype.onChildRemoved = function (item) {
            if (this._childRemoved) {
                this._childRemoved.raise(item);
            }
            item._parent = null;
        };
        Object.defineProperty(ExplorerItem.prototype, "childrenChanged", {
            /**
             * Gets an event raised when the children of the item changed
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._childrenChanged) {
                    this._childrenChanged = new latte.LatteEvent(this);
                }
                return this._childrenChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>childrenChanged</c> event
         */
        ExplorerItem.prototype.onChildrenChanged = function () {
            this.childrenLoaded = false;
            if (this._childrenChanged) {
                this._childrenChanged.raise();
            }
        };
        Object.defineProperty(ExplorerItem.prototype, "childrenLoadStarted", {
            /**
             * Gets an event raised when the load of children starts
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._childrenLoadStarted) {
                    this._childrenLoadStarted = new latte.LatteEvent(this);
                }
                return this._childrenLoadStarted;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>childrenLoadStarted</c> event
         */
        ExplorerItem.prototype.onChildrenLoadStarted = function () {
            if (this._childrenLoadStarted) {
                this._childrenLoadStarted.raise();
            }
        };
        Object.defineProperty(ExplorerItem.prototype, "childrenLoadEnd", {
            /**
             * Gets an event raised when the load of children ends
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._childrenLoadEnd) {
                    this._childrenLoadEnd = new latte.LatteEvent(this);
                }
                return this._childrenLoadEnd;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>childrenLoadEnd</c> event
         */
        ExplorerItem.prototype.onChildrenLoadEnd = function () {
            if (this._childrenLoadEnd) {
                this._childrenLoadEnd.raise();
            }
        };
        Object.defineProperty(ExplorerItem.prototype, "children", {
            /**
             * Gets the collection of child items of this item
             *
             * @returns {Collection<ExplorerItem>}
             */
            get: function () {
                var _this = this;
                if (!this._children) {
                    this._children = new latte.Collection(function (item) {
                        _this.onChildAdded(item);
                    }, function (item) {
                        _this.onChildRemoved(item);
                    });
                }
                return this._children;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerItem.prototype, "childrenLoaded", {
            /**
             * Gets or sets a value indicating if the children is loaded
             *
             * @returns {boolean}
             */
            get: function () {
                return this._childrenLoaded;
            },
            /**
             * Gets or sets a value indicating if the children is loaded
             *
             * @param {boolean} value
             */
            set: function (value) {
                this._childrenLoaded = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerItem.prototype, "childrenLoadNeeded", {
            /**
             * Gets a value indicating if the node needs to load children, by analyzing its state
             *
             * @returns {boolean}
             */
            get: function () {
                return this.loadsChildren && !this.childrenLoaded && !this.childrenLoaded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerItem.prototype, "childrenPage", {
            /**
             * Gets or sets the current page of children
             *
             * @returns {number}
             */
            get: function () {
                return this._childrenPage;
            },
            /**
             * Gets or sets the current page of children
             *
             * @param {number} value
             */
            set: function (value) {
                this._childrenPage = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerItem.prototype, "childrenPages", {
            /**
             * Gets or sets the total pages of children items
             *
             * @returns {number}
             */
            get: function () {
                return this._childrenPages;
            },
            /**
             * Gets or sets the total pages of children items
             *
             * @param {number} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._childrenPages;
                // Set value
                this._childrenPages = value;
                // Trigger changed event
                if (changed) {
                    this.onChildrenPagesChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerItem.prototype, "childrenPagesChanged", {
            /**
             * Gets an event raised when the value of the childrenPages property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._childrenPagesChanged) {
                    this._childrenPagesChanged = new latte.LatteEvent(this);
                }
                return this._childrenPagesChanged;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>childrenPages</c> event
         */
        ExplorerItem.prototype.onChildrenPagesChanged = function () {
            if (this._childrenPagesChanged) {
                this._childrenPagesChanged.raise();
            }
        };
        Object.defineProperty(ExplorerItem.prototype, "explorer", {
            /**
             * Gets or sets the explorer view where the item lives
             *
             * @returns {ExplorerView}
             */
            get: function () {
                return this._explorer;
            },
            /**
             * Gets or sets the explorer view where the item lives
             *
             * @param {ExplorerView} value
             */
            set: function (value) {
                this._explorer = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerItem.prototype, "childrenLoading", {
            /**
             * Gets a value indicating if children are being loaded
             *
             * @returns {boolean}
             */
            get: function () {
                return this._childrenLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerItem.prototype, "loadsChildren", {
            /**
             * Gets or sets a flag indicating if the item may load children for sub-items
             *
             * @returns {boolean}
             */
            get: function () {
                return this._loadsChildren;
            },
            /**
             * Gets or sets a flag indicating if the item may load children for sub-items
             *
             * @param {boolean} value
             */
            set: function (value) {
                this._loadsChildren = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerItem.prototype, "loadsChildrenFolders", {
            /**
             * Gets or sets a value indicating if the item will load items with sub-items.
             *
             * @returns {boolean}
             */
            get: function () {
                return this._loadsChildrenFolders;
            },
            /**
             * Gets or sets a value indicating if the item will load items with sub-items.
             *
             * @param {boolean} value
             */
            set: function (value) {
                this._loadsChildrenFolders = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerItem.prototype, "parent", {
            /**
             * Gets the parent item of this item
             *
             * @returns {ExplorerItem}
             */
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        return ExplorerItem;
    })();
    latte.ExplorerItem = ExplorerItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 10/25/14.
 */
var latte;
(function (latte) {
    /**
     * Widget for showing children of a DataRecord.
     *
     * Children are added using the <c>children</c> collection, when <c>loadChildren</c> method is called.
     */
    var DataRecordChildrenView = (function (_super) {
        __extends(DataRecordChildrenView, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the widget
         */
        function DataRecordChildrenView(loadChildren, childAdd, childEdit, childRemove) {
            if (loadChildren === void 0) { loadChildren = null; }
            if (childAdd === void 0) { childAdd = null; }
            if (childEdit === void 0) { childEdit = null; }
            if (childRemove === void 0) { childRemove = null; }
            _super.call(this);
            /**
             * Property field
             */
            this._record = null;
            this.toolbar.sideItems.addArray([
                this.btnRemove,
                this.btnEdit,
                this.btnAdd,
                new latte.SeparatorItem(),
                this.btnRefresh,
            ]);
            this.view = this.listView;
            if (loadChildren) {
                this.loadChildren.add(loadChildren);
            }
            if (childAdd) {
                this.childAdd.add(childAdd);
            }
            if (childEdit) {
                this.childEdit.add(childEdit);
            }
            if (childRemove) {
                this.childRemove.add(childRemove);
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>childAdd</c> event
         */
        DataRecordChildrenView.prototype.onChildrenAdd = function () {
            if (this._childAdd) {
                this._childAdd.raise();
            }
        };
        /**
         * Raises the <c>childEdit</c> event
         */
        DataRecordChildrenView.prototype.onChildEdit = function () {
            if (this._childEdit) {
                this._childEdit.raise();
            }
        };
        /**
         * Raises the <c>record</c> event
         */
        DataRecordChildrenView.prototype.onRecordChanged = function () {
            if (this._recordChanged) {
                this._recordChanged.raise();
            }
            this.onLoadChildren();
        };
        Object.defineProperty(DataRecordChildrenView.prototype, "childAdd", {
            /**
             * Gets an event raised when the user asks to add a new children
             *
             * @returns {LatteEvent}
             */
            get: function () {
                var _this = this;
                if (!this._childAdd) {
                    this._childAdd = new latte.LatteEvent(this);
                    this._childAdd.handlerAdded.add(function () {
                        _this.btnAdd.visible = true;
                    });
                }
                return this._childAdd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "childEdit", {
            /**
             * Gets an event raised when the user requests to edit the children
             *
             * @returns {LatteEvent}
             */
            get: function () {
                var _this = this;
                if (!this._childEdit) {
                    this._childEdit = new latte.LatteEvent(this);
                    this._childEdit.handlerAdded.add(function () {
                        _this.btnEdit.visible = true;
                    });
                }
                return this._childEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "childRemove", {
            /**
             * Gets an event raised when the user requests to delete the children
             *
             * @returns {LatteEvent}
             */
            get: function () {
                var _this = this;
                if (!this._childRemove) {
                    this._childRemove = new latte.LatteEvent(this);
                    this._childRemove.handlerAdded.add(function () {
                        _this.btnRemove.visible = true;
                    });
                }
                return this._childRemove;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>childRemove</c> event
         */
        DataRecordChildrenView.prototype.onChildRemove = function () {
            if (this._childRemove) {
                this._childRemove.raise();
            }
        };
        Object.defineProperty(DataRecordChildrenView.prototype, "loadChildren", {
            /**
             * Gets an event raised when the children must be loaded
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._loadChildren) {
                    this._loadChildren = new latte.LatteEvent(this);
                }
                return this._loadChildren;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>loadChildren</c> event
         */
        DataRecordChildrenView.prototype.onLoadChildren = function () {
            this.btnRemove.enabled = this.btnEdit.enabled = false;
            this.children.clear();
            if (this._loadChildren) {
                this._loadChildren.raise();
            }
        };
        Object.defineProperty(DataRecordChildrenView.prototype, "recordChanged", {
            /**
             * Gets an event raised when the value of the record property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._recordChanged) {
                    this._recordChanged = new latte.LatteEvent(this);
                }
                return this._recordChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "btnAdd", {
            /**
             * Gets the add button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnAdd) {
                    this._btnAdd = new latte.ButtonItem(null, latte.IconItem.standard(3, 3), function () {
                        _this.onChildrenAdd();
                    });
                    this._btnAdd.tooltip = strings.add;
                    this._btnAdd.visible = false;
                }
                return this._btnAdd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "btnEdit", {
            /**
             * Gets the edit button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnEdit) {
                    this._btnEdit = new latte.ButtonItem(null, latte.IconItem.standard(14, 8), function () {
                        _this.onChildEdit();
                    });
                    this._btnEdit.tooltip = strings.edit;
                    this._btnEdit.visible = false;
                    this._btnEdit.enabled = false;
                }
                return this._btnEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "btnRefresh", {
            /**
             * Gets the refresh button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnRefresh) {
                    this._btnRefresh = new latte.ButtonItem(null, latte.IconItem.standard(1, 4), function () {
                        _this.onLoadChildren();
                    });
                }
                return this._btnRefresh;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "btnRemove", {
            /**
             * Gets the remove button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnRemove) {
                    this._btnRemove = new latte.ButtonItem(null, latte.IconItem.standard(9, 1), function () {
                        var name = _this.selectedChild.tag ? _this.selectedChild.tag.toString() : _this.selectedChild.toString();
                        latte.DialogView.confirmDelete(name, function () {
                            _this.onChildRemove();
                        });
                    });
                    //this._btnRemove.tooltip = strings.remove;
                    this._btnRemove.visible = false;
                    this._btnRemove.enabled = false;
                }
                return this._btnRemove;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "listView", {
            /**
             * Gets the list view of the view
             *
             * @returns {ListView}
             */
            get: function () {
                var _this = this;
                if (!this._listView) {
                    this._listView = new latte.ListView();
                    this._listView.selectedItemChanged.add(function () {
                        _this.btnEdit.enabled = _this.btnRemove.enabled = _this.listView.selectedItem != null;
                    });
                }
                return this._listView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "pagination", {
            /**
             * Gets the pagination item
             *
             * @returns {PaginationItem}
             */
            get: function () {
                if (!this._pagination) {
                    this._pagination = new latte.PaginationItem();
                }
                return this._pagination;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "children", {
            //endregion
            //region Properties
            /**
             * Gets the collection of children of the widget
             *
             * @returns {Collection<SelectableItem>}
             */
            get: function () {
                return this.listView.items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "record", {
            /**
             * Gets or sets the record parent of the children
             *
             * @returns {DataRecord}
             */
            get: function () {
                return this._record;
            },
            /**
             * Gets or sets the record parent of the children
             *
             * @param {DataRecord} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._record;
                // Set value
                this._record = value;
                // Trigger changed event
                if (changed) {
                    this.onRecordChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenView.prototype, "selectedChild", {
            /**
             * Gets the selected child of the widget
             *
             * @returns {SelectableItem}
             */
            get: function () {
                return this.listView.selectedItem;
            },
            enumerable: true,
            configurable: true
        });
        return DataRecordChildrenView;
    })(latte.ToolbarView);
    latte.DataRecordChildrenView = DataRecordChildrenView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 10/25/14.
 */
var latte;
(function (latte) {
    /**
     * Widget for showing children of a DataRecord.
     *
     * Children are added using the <c>children</c> collection, when <c>loadChildren</c> method is called.
     */
    var DataRecordChildrenWidget = (function (_super) {
        __extends(DataRecordChildrenWidget, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         * Creates the widget
         */
        function DataRecordChildrenWidget(loadChildren, childAdd, childEdit, childRemove) {
            if (loadChildren === void 0) { loadChildren = null; }
            if (childAdd === void 0) { childAdd = null; }
            if (childEdit === void 0) { childEdit = null; }
            if (childRemove === void 0) { childRemove = null; }
            _super.call(this);
            /**
             * Property field
             */
            this._record = null;
            this.allowClose = this.allowMaximize = false;
            this.topToolbar.sideItems.addArray([
                this.btnRemove,
                this.btnEdit,
                this.btnAdd,
                new latte.SeparatorItem(),
                this.btnRefresh,
            ]);
            this.items.add(this.stackChildren);
            if (loadChildren) {
                this.loadChildren.add(loadChildren);
            }
            if (childAdd) {
                this.childAdd.add(childAdd);
            }
            if (childEdit) {
                this.childEdit.add(childEdit);
            }
            if (childRemove) {
                this.childRemove.add(childRemove);
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>childAdd</c> event
         */
        DataRecordChildrenWidget.prototype.onChildrenAdd = function () {
            if (this._childAdd) {
                this._childAdd.raise();
            }
        };
        /**
         * Raises the <c>childEdit</c> event
         */
        DataRecordChildrenWidget.prototype.onChildEdit = function () {
            if (this._childEdit) {
                this._childEdit.raise();
            }
        };
        /**
         * Raises the <c>record</c> event
         */
        DataRecordChildrenWidget.prototype.onRecordChanged = function () {
            if (this._recordChanged) {
                this._recordChanged.raise();
            }
            this.onLoadChildren();
        };
        Object.defineProperty(DataRecordChildrenWidget.prototype, "childAdd", {
            /**
             * Gets an event raised when the user asks to add a new children
             *
             * @returns {LatteEvent}
             */
            get: function () {
                var _this = this;
                if (!this._childAdd) {
                    this._childAdd = new latte.LatteEvent(this);
                    this._childAdd.handlerAdded.add(function () {
                        _this.btnAdd.visible = true;
                    });
                }
                return this._childAdd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenWidget.prototype, "childEdit", {
            /**
             * Gets an event raised when the user requests to edit the children
             *
             * @returns {LatteEvent}
             */
            get: function () {
                var _this = this;
                if (!this._childEdit) {
                    this._childEdit = new latte.LatteEvent(this);
                    this._childEdit.handlerAdded.add(function () {
                        _this.btnEdit.visible = true;
                    });
                }
                return this._childEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenWidget.prototype, "childRemove", {
            /**
             * Gets an event raised when the user requests to delete the children
             *
             * @returns {LatteEvent}
             */
            get: function () {
                var _this = this;
                if (!this._childRemove) {
                    this._childRemove = new latte.LatteEvent(this);
                    this._childRemove.handlerAdded.add(function () {
                        _this.btnRemove.visible = true;
                    });
                }
                return this._childRemove;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>childRemove</c> event
         */
        DataRecordChildrenWidget.prototype.onChildRemove = function () {
            if (this._childRemove) {
                this._childRemove.raise();
            }
        };
        Object.defineProperty(DataRecordChildrenWidget.prototype, "loadChildren", {
            /**
             * Gets an event raised when the children must be loaded
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._loadChildren) {
                    this._loadChildren = new latte.LatteEvent(this);
                }
                return this._loadChildren;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>loadChildren</c> event
         */
        DataRecordChildrenWidget.prototype.onLoadChildren = function () {
            this.btnRemove.enabled = this.btnEdit.enabled = false;
            this.children.clear();
            if (this._loadChildren) {
                this._loadChildren.raise();
            }
        };
        Object.defineProperty(DataRecordChildrenWidget.prototype, "recordChanged", {
            /**
             * Gets an event raised when the value of the record property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._recordChanged) {
                    this._recordChanged = new latte.LatteEvent(this);
                }
                return this._recordChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenWidget.prototype, "btnAdd", {
            /**
             * Gets the add button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnAdd) {
                    this._btnAdd = new latte.ButtonItem(null, latte.IconItem.standard(3, 3), function () {
                        _this.onChildrenAdd();
                    });
                    this._btnAdd.tooltip = strings.add;
                    this._btnAdd.visible = false;
                }
                return this._btnAdd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenWidget.prototype, "btnEdit", {
            /**
             * Gets the edit button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnEdit) {
                    this._btnEdit = new latte.ButtonItem(null, latte.IconItem.standard(14, 8), function () {
                        _this.onChildEdit();
                    });
                    this._btnEdit.tooltip = strings.edit;
                    this._btnEdit.visible = false;
                    this._btnEdit.enabled = false;
                }
                return this._btnEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenWidget.prototype, "btnRefresh", {
            /**
             * Gets the refresh button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnRefresh) {
                    this._btnRefresh = new latte.ButtonItem(null, latte.IconItem.standard(1, 4), function () {
                        _this.onLoadChildren();
                    });
                }
                return this._btnRefresh;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenWidget.prototype, "btnRemove", {
            /**
             * Gets the remove button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnRemove) {
                    this._btnRemove = new latte.ButtonItem(null, latte.IconItem.standard(9, 1), function () {
                        var name = _this.selectedChild.tag ? _this.selectedChild.tag.toString() : _this.selectedChild.toString();
                        latte.DialogView.confirmDelete(name, function () {
                            _this.onChildRemove();
                        });
                    });
                    //this._btnRemove.tooltip = strings.remove;
                    this._btnRemove.visible = false;
                    this._btnRemove.enabled = false;
                }
                return this._btnRemove;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenWidget.prototype, "stackChildren", {
            /**
             * Gets the stack where children are placed
             *
             * @returns {SelectableStack}
             */
            get: function () {
                var _this = this;
                if (!this._stackChildren) {
                    this._stackChildren = new latte.SelectableStack();
                    this._stackChildren.padding = 0;
                    this._stackChildren.selectedItemChanged.add(function () {
                        _this.btnEdit.enabled = _this.btnRemove.enabled = _this.stackChildren.selectedItem != null;
                    });
                }
                return this._stackChildren;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenWidget.prototype, "children", {
            //endregion
            //region Properties
            /**
             * Gets the collection of children of the widget
             *
             * @returns {Collection<SelectableItem>}
             */
            get: function () {
                return this.stackChildren.items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenWidget.prototype, "record", {
            /**
             * Gets or sets the record parent of the children
             *
             * @returns {DataRecord}
             */
            get: function () {
                return this._record;
            },
            /**
             * Gets or sets the record parent of the children
             *
             * @param {DataRecord} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._record;
                // Set value
                this._record = value;
                // Trigger changed event
                if (changed) {
                    this.onRecordChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordChildrenWidget.prototype, "selectedChild", {
            /**
             * Gets the selected child of the widget
             *
             * @returns {SelectableItem}
             */
            get: function () {
                return this.stackChildren.selectedItem;
            },
            enumerable: true,
            configurable: true
        });
        return DataRecordChildrenWidget;
    })(latte.WidgetItem);
    latte.DataRecordChildrenWidget = DataRecordChildrenWidget;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Shows a dialog to edit the specified <c>DataRecord</c>
     **/
    var DataRecordDialogView = (function (_super) {
        __extends(DataRecordDialogView, _super);
        /**
         *
         **/
        function DataRecordDialogView(record) {
            if (record === void 0) { record = null; }
            _super.call(this);
            var dialog = this;
            this.saving = new latte.LatteEvent(this);
            this.saved = new latte.LatteEvent(this);
            this.formView = new latte.DataRecordFormView(record);
            this.saveButton = new latte.ButtonItem();
            this.saveButton.text = strings.save;
            this.saveButton.click.add(function () {
                dialog.onSaving();
            });
            this.cancelButton = new latte.ButtonItem();
            this.cancelButton.text = strings.cancel;
            this.view = this.formView;
            this.items.add(this.saveButton);
            this.items.add(this.cancelButton);
        }
        //region Static
        /**
         * Shows a dialog to edit the specified record
         * @param r
         * @param onSaved
         * @param title
         */
        DataRecordDialogView.editRecord = function (r, onSaved, title) {
            if (onSaved === void 0) { onSaved = null; }
            if (title === void 0) { title = ''; }
            var d = new DataRecordDialogView(r);
            d.title = title;
            d.saved.add(onSaved);
            d.show();
            return d;
        };
        /**
         * Raises the <c>saved</c> event
         **/
        DataRecordDialogView.prototype.onSaved = function () {
            this.saved.raise();
        };
        /**
         * Raises the <c>saving</c> event
         **/
        DataRecordDialogView.prototype.onSaving = function () {
            var ptr = this;
            this.formView.applyValues();
            this.record.save(function () {
                ptr.onSaved();
            });
            this.saving.raise();
        };
        Object.defineProperty(DataRecordDialogView.prototype, "readOnly", {
            /**
             * Gets or sets a value indicating if the form is for read-only
             **/
            get: function () {
                return this._readOnly;
            },
            /**
             * Gets or sets a value indicating if the form is for read-only
             **/
            set: function (value) {
                this._readOnly = value;
                for (var i = 0; i < this.formView.inputs.count; i++)
                    this.formView.inputs.item(i).readOnly = value;
                if (value) {
                    this.saveButton.visible = false;
                    this.cancelButton.text = strings.close;
                }
                else {
                    this.saveButton.visible = true;
                    this.cancelButton.text = strings.cancel;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordDialogView.prototype, "record", {
            /**
             * Gets the record of the view
             *
             * @returns {DataRecord}
             */
            get: function () {
                return this.formView.record;
            },
            enumerable: true,
            configurable: true
        });
        return DataRecordDialogView;
    })(latte.DialogView);
    latte.DataRecordDialogView = DataRecordDialogView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Creates a form for a specific <c>DataRecord</c>
     **/
    var DataRecordFormItem = (function (_super) {
        __extends(DataRecordFormItem, _super);
        /**
         * Creates the form of the specified record
         **/
        function DataRecordFormItem(record) {
            if (record === void 0) { record = null; }
            _super.call(this);
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._record = null;
            if (record)
                this.record = record;
        }
        //region Methods
        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to receive the values
         **/
        DataRecordFormItem.prototype.applyValues = function (record) {
            if (record === void 0) { record = null; }
            var input;
            var r = record || this.record;
            while ((input = this.inputs.next())) {
                if (input.readOnly === true)
                    continue;
                r[input.tag] = input.value;
            }
        };
        /**
         * Raises the <c>record</c> event
         */
        DataRecordFormItem.prototype.onRecordChanged = function () {
            var record = this.record;
            // Calls to get foreign key records
            var calls = [];
            // Clear inputs
            this.inputs.clear();
            if (record) {
                // Call form creating
                //TODO: onFormCreating is deprecated, a way around must be done
                //record.onFormCreating(this);
                // Extract metadata
                var metadata = record.getMetadata();
                // Scan metadata
                if (metadata && metadata.fields) {
                    for (var i in metadata.fields) {
                        var field = metadata.fields[i];
                        var input = new latte.InputItem();
                        var value = latte._undef(record[i]) ? null : record[i];
                        input.text = field.text ? field.text : '(No name)';
                        input.type = field.type ? field.type : 'string';
                        input.name = i;
                        input.tag = i;
                        input.readOnly = field['readonly'] === true;
                        input.visible = field['visible'] !== false;
                        input.options = field['options'];
                        input.value = value; //value !== null ? value : field['defaultValue'];
                        input.separator = field['separator'] === true;
                        if (field.type == 'record') {
                            // Get record value item
                            var d = input.valueItem;
                            // Assign loader function
                            d.loaderFunction = field.loaderFunction;
                            // If not record as value, load it in call
                            if (value && field['recordType'] && !(value instanceof latte.DataRecord)) {
                                (function (d, input) {
                                    var params = {
                                        name: field['recordType'],
                                        id: value
                                    };
                                    if (latte._isString(field['recordModule'])) {
                                        latte.log("Added module");
                                        params['module'] = field['recordModule'];
                                    }
                                    calls.push(new latte.RemoteCall('_core', 'DataLatteUa', 'recordSelect', params).withHandlers(function (r) {
                                        //                                    log("Arrived foreign key record:")
                                        //                                    log(r)
                                        if (r && r.recordId) {
                                            d.setRecordSilent(r);
                                            input.value = input.value;
                                        }
                                    }));
                                })(d, input);
                            }
                        }
                        this.inputs.add(input);
                    }
                }
                //TODO: onFormCreated was deprecated on module separation
                //record.onFormCreated(this);
                /**
                 * Send calls if any
                 */
                if (calls.length > 0) {
                    latte.Message.sendCalls(calls);
                }
            }
            if (this._recordChanged) {
                this._recordChanged.raise();
            }
        };
        Object.defineProperty(DataRecordFormItem.prototype, "recordChanged", {
            /**
             * Gets an event raised when the value of the record property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._recordChanged) {
                    this._recordChanged = new latte.LatteEvent(this);
                }
                return this._recordChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordFormItem.prototype, "record", {
            /**
             * Gets or sets the record of the form
             *
             * @returns {DataRecord}
             */
            get: function () {
                return this._record;
            },
            /**
             * Gets or sets the record of the form
             *
             * @param {DataRecord} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._record;
                // Set value
                this._record = value;
                // Trigger changed event
                if (changed) {
                    this.onRecordChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        return DataRecordFormItem;
    })(latte.FormItem);
    latte.DataRecordFormItem = DataRecordFormItem;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     **/
    var DataRecordFormView = (function (_super) {
        __extends(DataRecordFormView, _super);
        /**
         * Creates the form of the specified record
         **/
        function DataRecordFormView(record) {
            if (record === void 0) { record = null; }
            _super.call(this);
            //this.form = new DataRecordFormItem();
            //this.items.clear();
            //this.items.add(this.form);
            if (record)
                this.record = record;
        }
        /**
         * Applies the values on form to the record. Optionally specifies which record
         is supposed to recieve the values
         **/
        DataRecordFormView.prototype.applyValues = function (record) {
            if (record === void 0) { record = null; }
            this.form.applyValues(record);
        };
        Object.defineProperty(DataRecordFormView.prototype, "form", {
            /**
             * Gets the data record form view
             *
             * @returns {DataRecordFormItem}
             */
            get: function () {
                if (!this._dataform) {
                    this._dataform = new latte.DataRecordFormItem();
                    this._dataform.valueChanged.add(this.onValueChanged, this);
                }
                return this._dataform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordFormView.prototype, "record", {
            //endregion
            //region Properties
            /**
             * Gets or sets the record of the form
             **/
            get: function () {
                return this.form.record;
            },
            /**
             * Gets or sets the record of the form
             **/
            set: function (record) {
                this.form.record = record;
            },
            enumerable: true,
            configurable: true
        });
        return DataRecordFormView;
    })(latte.FormView);
    latte.DataRecordFormView = DataRecordFormView;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Hanldles insertions, updates and deletion of <c>DataRecords</c>
     **/
    var DataRecordGridView = (function (_super) {
        __extends(DataRecordGridView, _super);
        /**
         *
         **/
        function DataRecordGridView() {
            _super.call(this);
            this.records = new latte.Collection(this._onAddRecord, this._onRemoveRecord, this);
        }
        /**
         *
         **/
        DataRecordGridView.prototype._onAddRecord = function (record) {
            // Add row
            var row = new latte.GridViewRow();
            var colIndex = 0;
            var col = null;
            if (this.records.count === 1) {
                // Clear columns
                this.columns.clear();
                // Add columns
                var metadata = record.getMetadata();
                if (metadata && metadata.fields) {
                    for (var i in metadata.fields) {
                        var f = metadata.fields[i];
                        var c = new latte.GridViewColumn();
                        c.name = f.text || i;
                        c.type = f.type || 'string';
                        this.columns.add(c);
                    }
                    this.recordType = record.recordType;
                    this._metadata = metadata;
                    this.allowNewRows = metadata['can-insert'] === true;
                }
            }
            while ((col = this.columns.next())) {
                row.setValueAt(colIndex, record[col.tag]);
                colIndex++;
            }
            row.tag = record;
            row.readOnly = this._metadata['can-update'] !== true;
            // Point to row
            record.tags._recordDataGridViewRow = row;
            this.rows.add(row);
        };
        /**
         *
         **/
        DataRecordGridView.prototype._onRemoveRecord = function (record) {
            if (!(record.tags._recordDataGridViewRow instanceof latte.DataSetRow))
                throw new latte.Ex();
            this.rows.remove(record.tags._recordDataGridViewRow);
        };
        /**
         * Applies the values on row to the speified record
         **/
        DataRecordGridView.prototype.applyValues = function (row, record) {
            for (var i = 0; i < this.columns.count; i++) {
                var column = this.columns.item(i);
                var name = column.tag;
                record[name] = row.hasValueAt(i) ? row.getValueAt(i) : null;
            }
        };
        /**
         * Prepares items for context item showing
         **/
        DataRecordGridView.prototype.onContextItemsShow = function () {
            _super.prototype.onContextItemsShow.call(this);
            var cell = this.selectedCell;
            var row = this.rows.item(cell.data('rowIndex'));
            var record = row ? row.tag : null;
            var meta = record ? record.getMetadata() : null;
            this._actionRemoveRow.enabled = meta && meta['can-delete'] === true;
        };
        /**
         * Raises the <c>rowsAdded</c> event.
         **/
        DataRecordGridView.prototype.onRowsAdded = function (dataset) {
            _super.prototype.onRowsAdded.call(this, dataset);
            for (var i = 0; i < dataset.rows.count; i++) {
                var row = dataset.rows.item(i);
                var record = new latte.DataRecord();
                record.recordType = this.recordType;
                record.metadata = this._metadata;
                this.applyValues(row, record);
                row.tag = record;
                record.insert(function () {
                    latte.sprintf("Inserted: " + record.recordId);
                });
            }
            this.confirmRowsAdded();
        };
        /**
         * Raises the <c>rowsChanged</c> event.
         **/
        DataRecordGridView.prototype.onRowsChanged = function (dataset) {
            _super.prototype.onRowsChanged.call(this, dataset);
            for (var i = 0; i < dataset.rows.count; i++) {
                var row = dataset.rows.item(i);
                var record = row.tag;
                this.applyValues(row, record);
                record.update(function () {
                    latte.sprintf("Updated: " + record.recordId);
                });
            }
            this.confirmRowsChanged();
        };
        /**
         * Raises the <c>rowsRemoved</c> event.
         **/
        DataRecordGridView.prototype.onRowsRemoved = function (dataset) {
            _super.prototype.onRowsRemoved.call(this, dataset);
            for (var i = 0; i < dataset.rows.count; i++) {
                var row = dataset.rows.item(i);
                var record = row.tag;
                record.remove(function () {
                    latte.sprintf("Removed: " + record.recordId);
                });
            }
            this.confirmRowsRemoved();
        };
        Object.defineProperty(DataRecordGridView.prototype, "recordType", {
            /**
             * Gets or sets the recordType of the grid
             **/
            get: function () {
                return this._recordType;
            },
            /**
             * Gets or sets the recordType of the grid
             **/
            set: function (value) {
                this._recordType = value;
            },
            enumerable: true,
            configurable: true
        });
        return DataRecordGridView;
    })(latte.GridView);
    latte.DataRecordGridView = DataRecordGridView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 1/13/14.
 */
var latte;
(function (latte) {
    /**
     * Value item for representing data records as value item.
     */
    var DataRecordValueItem = (function (_super) {
        __extends(DataRecordValueItem, _super);
        /**
         * Creates the value item
         * @param loader
         * @param textboxCreated
         */
        function DataRecordValueItem(loader, textboxCreated, placeholder) {
            if (loader === void 0) { loader = null; }
            if (textboxCreated === void 0) { textboxCreated = null; }
            if (placeholder === void 0) { placeholder = null; }
            _super.call(this);
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._loaderFunction = null;
            /**
             * Property field
             */
            this._placeholder = null;
            /**
             * Property field
             */
            this._record = null;
            if (textboxCreated) {
                this.textboxCreated.add(textboxCreated);
            }
            this.updateItem();
            if (loader) {
                this.loaderFunction = loader;
            }
            if (placeholder) {
                this.placeholder = placeholder;
                if (this.textbox) {
                    this.textbox.placeholder = placeholder;
                }
            }
        }
        //region Methods
        /**
         * Override.
         * @returns {number}
         */
        DataRecordValueItem.prototype.getValue = function () {
            if (this.record) {
                return this.record.recordId;
            }
            else {
                return 0;
            }
        };
        /**
         * Override
         * @returns {string}
         */
        DataRecordValueItem.prototype.getValueString = function () {
            if (this.record) {
                return this.record.toString();
            }
            else {
                return '';
            }
        };
        /**
         * Override
         * @param value
         */
        DataRecordValueItem.prototype.setValue = function (value) {
            if (value instanceof latte.DataRecord) {
                this.record = value;
            }
        };
        /**
         * Sets the record without raising the valueChanged event
         */
        DataRecordValueItem.prototype.setRecordSilent = function (r) {
            this._record = r;
            this.updateItem();
        };
        /**
         * Updates the item inside to show
         */
        DataRecordValueItem.prototype.updateItem = function () {
            var _this = this;
            this.element.empty();
            if (this.record) {
                this._textbox = null;
                var icon = latte._isFunction(this.record['icon16']) ? this.record['icon16']() : null;
                var bg = new latte.ButtonGroupItem([
                    new latte.ButtonItem(this.record.toString(), icon),
                    new latte.ButtonItem(null, latte.Glyph.dismiss, function () {
                        var txt = _this.text;
                        _this.record = null;
                        //                        this.textbox.value = txt;
                        _this.textbox.input.select();
                        _this.textbox.input.focus();
                    })
                ]);
                bg.appendTo(this);
            }
            else {
                this._textbox = new latte.TextboxItem();
                this.textbox.appendTo(this);
                this.textbox.filterSuggestions.add(function () {
                    if (_this.loaderFunction) {
                        _this.loaderFunction(_this, function (items) {
                            _this.textbox.suggestions.clear();
                            _this.textbox.suggestions.addArray(items);
                        });
                    }
                });
                this.onTextboxCreated();
            }
            this.element.clear();
        };
        Object.defineProperty(DataRecordValueItem.prototype, "textboxCreated", {
            /**
             * Gets an event raised when the textbox has been created
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._textboxCreated) {
                    this._textboxCreated = new latte.LatteEvent(this);
                }
                return this._textboxCreated;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>textboxCreated</c> event
         */
        DataRecordValueItem.prototype.onTextboxCreated = function () {
            if (this._textboxCreated) {
                this._textboxCreated.raise(this.textbox);
            }
            if (latte._isString(this.placeholder) && this.placeholder.length > 0) {
                this.textbox.placeholder = this.placeholder;
            }
        };
        Object.defineProperty(DataRecordValueItem.prototype, "loaderFunction", {
            /**
             * Gets or sets the loader function
             *
             * @returns {(text:string, callback:(items:Array<Item>) => any) => Message}
             */
            get: function () {
                return this._loaderFunction;
            },
            /**
             * Gets or sets the loader function
             *
             * @param {(text:string, callback:(items:Array<Item>) => any) => Message} value
             */
            set: function (value) {
                this._loaderFunction = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordValueItem.prototype, "placeholder", {
            /**
             * Gets or sets the placeholder
             *
             * @returns {string}
             */
            get: function () {
                return this._placeholder;
            },
            /**
             * Gets or sets the placeholder
             *
             * @param {string} value
             */
            set: function (value) {
                this._placeholder = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordValueItem.prototype, "record", {
            /**
             * Gets or sets the record of the item
             *
             * @returns {DataRecord}
             */
            get: function () {
                return this._record;
            },
            /**
             * Gets or sets the record of the item
             *
             * @param {DataRecord} value
             */
            set: function (value) {
                var changed = value !== this._record;
                this._record = value;
                this.updateItem();
                if (changed) {
                    this.onValueChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordValueItem.prototype, "textbox", {
            /**
             * Gets the textbox used to search
             *
             * @returns {TextboxItem}
             */
            get: function () {
                return this._textbox;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordValueItem.prototype, "text", {
            /**
             * Gets the text of the textbox (if any)
             *
             * @returns {string}
             */
            get: function () {
                if (this._textbox) {
                    return this._textbox.value;
                }
                else if (this.record) {
                    return this.record.toString();
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return DataRecordValueItem;
    })(latte.ValueItem);
    latte.DataRecordValueItem = DataRecordValueItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 10/24/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var DataRecordWidget = (function (_super) {
        __extends(DataRecordWidget, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function DataRecordWidget(record) {
            if (record === void 0) { record = null; }
            _super.call(this);
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._record = null;
            this.allowMaximize = this.allowClose = false;
            this.topToolbar.sideItems.add(this.btnSave);
            this.items.add(this.form);
            if (record) {
                this.record = record;
            }
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Raises the <c>record</c> event
         */
        DataRecordWidget.prototype.onRecordChanged = function () {
            this.form.record = this.record;
            this.btnSave.enabled = false;
            if (this._recordChanged) {
                this._recordChanged.raise();
            }
        };
        /**
         * Raises the <c>saving</c> event
         */
        DataRecordWidget.prototype.onSaving = function () {
            if (this._saving) {
                this._saving.raise();
            }
        };
        /**
         * Raises the <c>saved</c> event
         */
        DataRecordWidget.prototype.onSaved = function () {
            if (this._saved) {
                this._saved.raise();
            }
        };
        Object.defineProperty(DataRecordWidget.prototype, "recordChanged", {
            /**
             * Gets an event raised when the value of the record property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._recordChanged) {
                    this._recordChanged = new latte.LatteEvent(this);
                }
                return this._recordChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordWidget.prototype, "saving", {
            /**
             * Gets an event raised when the record is being saved
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._saving) {
                    this._saving = new latte.LatteEvent(this);
                }
                return this._saving;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordWidget.prototype, "saved", {
            /**
             * Gets an event raised when the record is saved
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._saved) {
                    this._saved = new latte.LatteEvent(this);
                }
                return this._saved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordWidget.prototype, "form", {
            /**
             * Gets the form of the record
             *
             * @returns {DataRecordFormItem}
             */
            get: function () {
                var _this = this;
                if (!this._form) {
                    this._form = new latte.DataRecordFormItem();
                    this._form.faceVisible = false;
                    this._form.valueChanged.add(function () {
                        _this.btnSave.enabled = true;
                    });
                }
                return this._form;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordWidget.prototype, "btnSave", {
            /**
             * Gets the save button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnSave) {
                    this._btnSave = new latte.ButtonItem(null, latte.IconItem.standard(4, 2), function () {
                        _this.form.applyValues(_this.record);
                        _this.onSaving();
                        _this.record.save(function () {
                            _this.btnSave.enabled = false;
                            _this.onSaved();
                        });
                    });
                    this._btnSave.tooltip = strings.save;
                    this._btnSave.enabled = false;
                }
                return this._btnSave;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecordWidget.prototype, "record", {
            /**
             * Gets or sets the record of the widget
             *
             * @returns {DataRecord}
             */
            get: function () {
                return this._record;
            },
            /**
             * Gets or sets the record of the widget
             *
             * @param {DataRecord} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._record;
                // Set value
                this._record = value;
                // Trigger changed event
                if (changed) {
                    this.onRecordChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        return DataRecordWidget;
    })(latte.WidgetItem);
    latte.DataRecordWidget = DataRecordWidget;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a column of data in the GridView
     **/
    var GridViewColumn = (function (_super) {
        __extends(GridViewColumn, _super);
        /**
         * Creates the column.
         Optionally specifies its name, type and length.
         **/
        function GridViewColumn(name, type, length) {
            if (name === void 0) { name = ''; }
            if (type === void 0) { type = ''; }
            if (length === void 0) { length = 0; }
            _super.call(this);
            if (name)
                this.name = name;
            if (type)
                this.type = type;
            if (length)
                this.length = length;
        }
        Object.defineProperty(GridViewColumn.prototype, "header", {
            /**
             * Gets or sets the GridView header element this column represents
             **/
            get: function () {
                return this._header;
            },
            /**
             * Gets or sets the GridView header element this column represents
             **/
            set: function (value) {
                this._header = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridViewColumn.prototype, "readOnly", {
            /**
             * Gets or sets a value indicating if the column is read only
             **/
            get: function () {
                return this._readonly;
            },
            /**
             * Gets or sets a value indicating if the column is read only
             **/
            set: function (value) {
                this._readonly = value;
            },
            enumerable: true,
            configurable: true
        });
        return GridViewColumn;
    })(latte.DataSetColumn);
    latte.GridViewColumn = GridViewColumn;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a row of data on the <c>GridView</c>
     **/
    var GridViewRow = (function (_super) {
        __extends(GridViewRow, _super);
        /**
         * Creates the row
         **/
        function GridViewRow(data) {
            if (data === void 0) { data = []; }
            _super.call(this, data);
        }
        return GridViewRow;
    })(latte.DataSetRow);
    latte.GridViewRow = GridViewRow;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/11/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var ExplorerItemDataRecord = (function (_super) {
        __extends(ExplorerItemDataRecord, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function ExplorerItemDataRecord() {
            _super.call(this);
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._record = null;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Creates a list view item for the record
         */
        ExplorerItemDataRecord.prototype.createListViewItem = function () {
            var item = new latte.ListViewItem();
            var columns = this.getColumns();
            item.icon = this.getIcon();
            for (var i = 0; i < columns.length; i++) {
                var s = columns[i];
                item.addColumn(this.getColumnWithFor(s));
                item.setItem(i, this.getItemForColumn(s));
            }
            return item;
        };
        /**
         * Gets the name for the item
         *
         * @returns {string}
         */
        ExplorerItemDataRecord.prototype.getName = function () {
            return this.record ? this.record.toString() : this.toString();
        };
        /**
         * Gets the name of the columns that go in the lists
         * This are names of fields, described in metadata of record.
         */
        ExplorerItemDataRecord.prototype.getColumns = function () {
            if (!this.record) {
                return [];
            }
            var result = [];
            var metadata = this.record.getMetadata();
            if (metadata.fields) {
                for (var i in metadata.fields) {
                    result.push(i);
                }
            }
            return result;
        };
        /**
         * Gets the width of the specified column
         *
         * @param name
         */
        ExplorerItemDataRecord.prototype.getColumnWithFor = function (name) {
            return 200;
        };
        /**
         * Gets an item for the column
         *
         * @param name
         */
        ExplorerItemDataRecord.prototype.getItemForColumn = function (name) {
            return new latte.LabelItem(this.record[name]);
        };
        /**
         * Gets the detail view of the item
         *
         * @returns {latte.DataRecordFormItem}
         */
        ExplorerItemDataRecord.prototype.getDetailView = function () {
            var _this = this;
            var d = new latte.DataRecordFormView(this.record);
            d.savedChanges.add(function () {
                d.applyValues(_this.record);
                _this.record.save(function () {
                    d.unsavedChanges = false;
                });
            });
            return d;
        };
        Object.defineProperty(ExplorerItemDataRecord.prototype, "record", {
            /**
             * Gets or sets the record of the item
             *
             * @returns {DataRecord}
             */
            get: function () {
                return this._record;
            },
            /**
             * Gets or sets the record of the item
             *
             * @param {DataRecord} value
             */
            set: function (value) {
                this._record = value;
            },
            enumerable: true,
            configurable: true
        });
        return ExplorerItemDataRecord;
    })(latte.ExplorerItem);
    latte.ExplorerItemDataRecord = ExplorerItemDataRecord;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/8/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var ExplorerTreeItem = (function (_super) {
        __extends(ExplorerTreeItem, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function ExplorerTreeItem() {
            _super.call(this);
            //region Private Methods
            //endregion
            //region Methods
            //endregion
            //region Events
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._record = null;
        }
        Object.defineProperty(ExplorerTreeItem.prototype, "record", {
            /**
             * Gets or sets the record of the tree item
             *
             * @returns {DataRecord}
             */
            get: function () {
                return this._record;
            },
            /**
             * Gets or sets the record of the tree item
             *
             * @param {DataRecord} value
             */
            set: function (value) {
                this._record = value;
            },
            enumerable: true,
            configurable: true
        });
        return ExplorerTreeItem;
    })(latte.TreeItem);
    latte.ExplorerTreeItem = ExplorerTreeItem;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 8/6/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var ExplorerView = (function (_super) {
        __extends(ExplorerView, _super);
        //endregion
        /**
         *
         */
        function ExplorerView(rootItem) {
            if (rootItem === void 0) { rootItem = null; }
            _super.call(this);
            //region Static
            //endregion
            //region Fields
            this.ignorePageChange = false;
            /**
             * Property field
             */
            this._listSelectedItem = null;
            //region Structure
            this.sideSize = 300;
            // Tree View Side
            var treeSide = new latte.ToolbarView();
            this._treeViewToolbar = treeSide.toolbar;
            treeSide.view = this.treeView;
            // Detail View Side
            var detailSide = new latte.ToolbarView();
            this._detailViewToolbar = detailSide.toolbar;
            detailSide.view = this.detailView;
            this.detailViewToolbar.items.add(this.btnSaveDetail);
            this.detailViewToolbar.sideItems.add(this.btnRemoveDetail);
            // ListView Side
            var listSide = new latte.ToolbarView();
            this._listViewToolbar = listSide.toolbar;
            listSide.view = this.listView;
            this.listViewToolbar.sideItems.add(this.paginator);
            // Second split view
            var secondSplitView = new latte.SplitView();
            secondSplitView.sideView = detailSide;
            secondSplitView.view = listSide;
            secondSplitView.side = 16 /* RIGHT */;
            secondSplitView.sideSize = 400;
            // Set tree view side
            this.sideView = treeSide;
            this.view = secondSplitView;
            //endregion
            if (rootItem) {
                this.addRootItem(rootItem);
            }
        }
        //region Private Methods
        /**
         * Adds handlers to the item
         */
        ExplorerView.prototype.addTreeItemHandlers = function (treeItem) {
            var _this = this;
            var item = treeItem.tag;
            // Tree items load request
            if (item.loadsChildrenFolders) {
                treeItem.loadItems.add(function () {
                    item.loadChildren(function () {
                        _this.treeViewChildrenOf(item, treeItem);
                        if (treeItem.selected) {
                            _this.listViewChildrenOf(item);
                        }
                        treeItem.reportItemsLoaded();
                    });
                });
            }
            // Tree item selection change
            treeItem.selectedChanged.add(function () {
                if (treeItem.selected) {
                    _this._treeSelectedItem = item;
                    _this.detailViewOf(item);
                    if (item.childrenLoaded) {
                        _this.listViewChildrenOf(item);
                    }
                    else if (!item.loadsChildrenFolders) {
                        item.loadChildren(function () {
                            if (treeItem.selected) {
                                _this.listViewChildrenOf(item);
                            }
                        });
                    }
                }
            });
            // Children change reaction
            //item.childrenChanged.handlers = [];
            item.childrenChanged.add(function () {
                item.loadChildren(function () {
                    _this.treeViewChildrenOf(item, treeItem);
                    if (treeItem.selected) {
                        _this.listViewChildrenOf(item);
                    }
                    treeItem.reportItemsLoaded();
                });
            });
            item.childrenPagesChanged.add(function () {
                _this.paginator.pages = item.childrenPages;
            });
        };
        /**
         * Loads the children of specified item into the listview
         * @param treeItem
         */
        ExplorerView.prototype.listViewChildrenOf = function (item) {
            this.listView.items.clear();
            this.ignorePageChange = true;
            this.paginator.page = item.childrenPage;
            this.paginator.pages = item.childrenPages;
            this.ignorePageChange = false;
            for (var i = 0; i < item.children.length; i++) {
                var gitem = item.children[i];
                // Create listview item
                var litem = gitem.createListViewItem();
                litem.tag = gitem;
                // Add handlers to the item
                this.addListViewItemHandlers(litem);
                // Add to the listview
                this.listView.items.add(litem);
            }
            // Load items into the toolbar
            this.listViewToolbar.items.clear();
            this.listViewToolbar.items.addArray(item.getItems());
        };
        /**
         * Loads the children of specified item into its node
         * @param item
         */
        ExplorerView.prototype.treeViewChildrenOf = function (item, treeItem) {
            treeItem.items.clear();
            for (var i = 0; i < item.children.length; i++) {
                var gitem = item.children[i];
                if (gitem.loadsChildren) {
                    var gitemTree = gitem.createTreeItem();
                    this.addTreeItemHandlers(gitemTree);
                    treeItem.items.add(gitemTree);
                }
            }
        };
        /**
         * Assigns handlers to list view items
         * @param listItem
         */
        ExplorerView.prototype.addListViewItemHandlers = function (listItem) {
            var _this = this;
            var item = listItem.tag;
            listItem.selectedChanged.add(function () {
                if (listItem.selected) {
                    _this.detailViewOf(item);
                }
            });
        };
        /**
         * Sets the detail view of the specified item, if any
         *
         * @param item
         */
        ExplorerView.prototype.detailViewOf = function (item) {
            var _this = this;
            var view = item ? item.getDetailView() : null;
            //region Get rid of old view
            if (this.detailView.view) {
                var old = this.detailView.view;
                this.detailView.view = null;
                old.element.remove();
            }
            //endregion
            if (view) {
                this.detailView.view = view;
                this.btnSaveDetail.enabled = false;
                view.unsavedChangesChanged.add(function () {
                    //log("Unsaved changes changed")
                    //log("Unsaved changes " + view.unsavedChanges)
                    _this.btnSaveDetail.enabled = view.unsavedChanges;
                });
            }
            if (item) {
                this.btnRemoveDetail.enabled = item.getCanBeDeleted();
            }
            this._listSelectedItem = item;
        };
        //endregion
        //region Methods
        /**
         * Adds a root item
         *
         * @param item
         */
        ExplorerView.prototype.addRootItem = function (item) {
            var node = item.createTreeItem();
            this.addTreeItemHandlers(node);
            this.treeView.items.add(node);
        };
        /**
         * Refreshes the children of the list
         */
        ExplorerView.prototype.refreshList = function () {
            var item = this.listSelectedItem;
            var treeItem = this.treeView.selectedItem;
            item.childrenPage = this.paginator.page;
            item.onChildrenChanged();
            //this.listSelectedItem.loadChildren(() => {
            //
            //    this.treeViewChildrenOf(item, treeItem);
            //
            //    if(treeItem.selected) {
            //        this.listViewChildrenOf(item);
            //    }
            //
            //    treeItem.reportItemsLoaded();
            //});
        };
        Object.defineProperty(ExplorerView.prototype, "btnSaveDetail", {
            /**
             * Gets the "save" button
             *
             * @returns {boolean}
             */
            get: function () {
                var _this = this;
                if (!this._btnSaveDetail) {
                    this._btnSaveDetail = new latte.ButtonItem(strings.save, latte.IconItem.standard(4, 2), function () {
                        if (_this.detailView.view) {
                            _this.detailView.view.onSaveChanges();
                        }
                    });
                    this._btnSaveDetail.enabled = false;
                }
                return this._btnSaveDetail;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerView.prototype, "btnRemoveDetail", {
            /**
             * Gets the remove button
             *
             * @returns {ButtonItem}
             */
            get: function () {
                var _this = this;
                if (!this._btnRemoveDetail) {
                    this._btnRemoveDetail = new latte.ButtonItem(null, latte.IconItem.standard(9, 1), function () {
                        latte.DialogView.alert(latte.sprintf(strings.confirmDeleteS, _this.listSelectedItem.getName()), strings.cantBeUndone, [
                            new latte.ButtonItem(strings.cancel),
                            new latte.ButtonItem(latte.sprintf(strings.yesDeleteS, _this.listSelectedItem.getName()), null, function () {
                                // Delete now
                                if (_this.listSelectedItem instanceof latte.ExplorerItemDataRecord) {
                                    var r = _this.listSelectedItem.record;
                                    r.remove(function () {
                                        _this.detailViewOf(null);
                                        if (_this.treeSelectedItem) {
                                            _this.treeSelectedItem.onChildrenChanged();
                                        }
                                    });
                                }
                            })
                        ]);
                    });
                }
                return this._btnRemoveDetail;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerView.prototype, "detailViewToolbar", {
            /**
             * Gets the toolbar of the detail zone
             *
             * @returns {Toolbar}
             */
            get: function () {
                return this._detailViewToolbar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerView.prototype, "treeViewToolbar", {
            /**
             * Gets the toolbar of the tree view
             *
             * @returns {Toolbar}
             */
            get: function () {
                return this._treeViewToolbar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerView.prototype, "listSelectedItem", {
            /**
             * Gets the selected item on the list
             *
             * @returns {ExplorerItem}
             */
            get: function () {
                return this._listSelectedItem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerView.prototype, "listViewToolbar", {
            /**
             * Gets the toolbar of the list view
             *
             * @returns {Toolbar}
             */
            get: function () {
                return this._listViewToolbar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerView.prototype, "detailView", {
            /**
             * Gets the detail View
             *
             * @returns {View}
             */
            get: function () {
                if (!this._detailView) {
                    this._detailView = new latte.View();
                }
                return this._detailView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerView.prototype, "listView", {
            /**
             * Gets the list view
             *
             * @returns {ListView}
             */
            get: function () {
                if (!this._listView) {
                    this._listView = new latte.ListView();
                    this._listView.columnHeaders.add(new latte.ColumnHeader(''));
                }
                return this._listView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerView.prototype, "paginator", {
            /**
             * Gets the pagination item
             *
             * @returns {PaginationItem}
             */
            get: function () {
                var _this = this;
                if (!this._paginator) {
                    this._paginator = new latte.PaginationItem();
                    this._paginator.pageChanged.add(function () {
                        if (!_this.ignorePageChange) {
                            _this.refreshList();
                        }
                    });
                }
                return this._paginator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerView.prototype, "treeSelectedItem", {
            /**
             * Gets the selected item on the tree side
             *
             * @returns {ExplorerItem}
             */
            get: function () {
                return this._treeSelectedItem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExplorerView.prototype, "treeView", {
            /**
             * Gets the tree view
             *
             * @returns {TreeView}
             */
            get: function () {
                if (!this._treeView) {
                    this._treeView = new latte.TreeView();
                }
                return this._treeView;
            },
            enumerable: true,
            configurable: true
        });
        return ExplorerView;
    })(latte.SplitView);
    latte.ExplorerView = ExplorerView;
})(latte || (latte = {}));
