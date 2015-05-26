var latte;
(function (latte) {
    /**
     * Represents a column of data for <c>DataSet</c>
     **/
    var DataSetColumn = (function () {
        /**
         * Creates the column.
         Optionally specifies its name, type and length.
         **/
        function DataSetColumn(name, type, length) {
            if (name === void 0) { name = ''; }
            if (type === void 0) { type = ''; }
            if (length === void 0) { length = 0; }
            this.optionsChanged = new latte.LatteEvent(this);
            this.name = name;
            this.type = type;
            this.length = length;
        }
        Object.defineProperty(DataSetColumn.prototype, "length", {
            /**
             * Gets or sets the length of the column values.
             **/
            get: function () {
                return this._length;
            },
            /**
             * Gets or sets the length of the column values.
             **/
            set: function (value) {
                this._length = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSetColumn.prototype, "name", {
            /**
             * Gets or sets the name of the column.
             **/
            get: function () {
                return this._name;
            },
            /**
             * Gets or sets the name of the column.
             **/
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>optionsChanged</c> event.
         **/
        DataSetColumn.prototype.onOptionsChanged = function () {
            this.optionsChanged.raise();
        };
        Object.defineProperty(DataSetColumn.prototype, "options", {
            /**
             * Gets or sets the options of the column.
             **/
            get: function () {
                return this._options;
            },
            /**
             * Gets or sets the options of the column.
             **/
            set: function (value /*(any|Array)*/) {
                this._options = value;
                this.onOptionsChanged();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSetColumn.prototype, "tag", {
            /**
             * Gets or sets a generic tag value for the object
             **/
            get: function () {
                return this._tag;
            },
            /**
             * Gets or sets a generic tag value for the object
             **/
            set: function (value) {
                this._tag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSetColumn.prototype, "type", {
            /**
             * Gets or sets the type of the column values.
             **/
            get: function () {
                return this._type;
            },
            /**
             * Gets or sets the type of the column values.
             **/
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        return DataSetColumn;
    })();
    latte.DataSetColumn = DataSetColumn;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a row of data for <c>DataSet</c>
     **/
    var DataSetRow = (function () {
        /**
         * Creates the row of data. Optionally sets the array of data
         **/
        function DataSetRow(data) {
            if (data === void 0) { data = []; }
            this.data = data;
            if (data)
                this.data = data;
            else
                this.data = [];
        }
        /**
         * Gets the data as an array of specified positions. Undefined positions will be set to null
         **/
        DataSetRow.prototype.getDataArray = function (columns) {
            var a = [];
            for (var i = 0; i < columns; i++)
                if (latte._undef(this.data[i]))
                    a[i] = null;
                else
                    a[i] = this.data[i];
            return a;
        };
        /**
         * Gets a value indicating if there is a value at the specified index
         **/
        DataSetRow.prototype.hasValueAt = function (index) {
            return !latte._undef(this.data[index]);
        };
        Object.defineProperty(DataSetRow.prototype, "readOnly", {
            /**
             * Gets or sets a value indicating if the row is read-only
             **/
            get: function () {
                return this._readOnly;
            },
            /**
             * Gets or sets a value indicating if the row is read-only
             **/
            set: function (value) {
                this._readOnly = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSetRow.prototype, "tag", {
            /**
             * Gets or sets the value at the specified position
             **/
            get: function () {
                return this._tag;
            },
            /**
             * Gets or sets the value at the specified position
             **/
            set: function (value) {
                this._tag = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Gets or sets the value at the specified position
         **/
        DataSetRow.prototype.getValueAt = function (index) {
            return this.data[index];
        };
        /**
         * Gets or sets the value at the specified position
         **/
        DataSetRow.prototype.setValueAt = function (index, value) {
            this.data[index] = value;
        };
        return DataSetRow;
    })();
    latte.DataSetRow = DataSetRow;
})(latte || (latte = {}));
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
var latte;
(function (latte) {
    /**
     * Saves full lists of records in Memory
     *
     * <example>
     * // Load cache of users
     * Cache.load('User', 'users');
     *
     * // After load, now we can use the users cache
     * // Cache.users is a DataRecordCollection object
     * for(var i = 0; i < Cache.users.count; i++)
     *  console.log(Cache.users.item(i));
     * </example>
     *
     */
    var Cache = (function () {
        function Cache() {
        }
        /**
         * Loads a cache of the specified name into cache itself.
         * @param recordType
         * @param name
         * @param callback
         * @returns {null}
         */
        Cache.prototype.load = function (recordType, name, callback) {
            /*
            DataRecord.fromListing(recordType, '/', {}, function(stages){

                // Add users to cache
                latte.Cache[name] = new latte.DataRecordCollection();
                latte.Cache[name].add(stages);

                // Call callback
                if(_isFunction(callback))
                    callback.call(this);
            });*/
            if (callback === void 0) { callback = null; }
            return null;
        };
        return Cache;
    })();
    latte.Cache = Cache;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a DataRecord on App
     **/
    var DataRecord = (function () {
        //endregion
        /**
         * Creates the record
         **/
        function DataRecord() {
            /**
             * Arbitrary collection of tags
             */
            this.tags = {};
            /**
             * Initialize empty the fields of record
             */
            var metadata = this.getMetadata();
            if (metadata && latte._isObject(metadata.fields)) {
                for (var i in metadata.fields) {
                    this[i] = '';
                }
            }
        }
        /**
         * Scans the passed Object and converts available packed records to latte.DataRecord
         instances
         **/
        DataRecord.scanAndConvert = function (obj) {
            if (obj && latte._isObject(obj) || latte._isArray(obj)) {
                if (latte.DataRecord.isPackedRecord(obj)) {
                    obj = latte.DataRecord.fromServerObject(obj);
                }
                else {
                    for (var i in obj) {
                        obj[i] = latte.DataRecord.scanAndConvert(obj[i]);
                    }
                }
            }
            return obj;
        };
        /**
         * Sets the default records namespace, and injects common code into records.
         **/
        DataRecord.setDefaultRecordsNamespace = function (namespace) {
            latte.DataRecord._defaultRecordsNamespace = namespace;
            for (var symbol in namespace) {
                // Set record name
                namespace[symbol].recordType = symbol;
                // Copy static methods
                namespace[symbol].fromServerObject = latte.DataRecord.fromServerObject;
                namespace[symbol].fromServerObjects = latte.DataRecord.fromServerObjects;
            }
        };
        /**
         * Creates a record from the specified name and id. If no id is specified, empty record will arrive.
         **/
        DataRecord.fromName = function (name, id, callback) {
            var m = new latte.Message('_core', 'DataLatteUa', 'recordSelect', { name: name, id: id }).send(function (record) {
                // Execute callback with record
                callback(record);
            });
            return m;
        };
        /**
         * Converts a server given Object to a Record of the specified type, if no type specified <c>DataRecord</c> will be used.
         **/
        DataRecord.fromServerObject = function (obj, classType) {
            if (classType === void 0) { classType = null; }
            var dns = latte.DataRecord._defaultRecordsNamespace ? latte.DataRecord._defaultRecordsNamespace : (latte._isObject(window[DataRecord.recordsNamespaceName]) ? window[DataRecord.recordsNamespaceName] : null);
            var rt = obj.recordType;
            var type = latte._isFunction(classType) ? classType : (latte._isFunction(dns[rt]) ? dns[rt] : DataRecord);
            var record = new type();
            var i, j;
            if (!latte.DataRecord.isPackedRecord(obj)) {
                throw new latte.Ex();
            }
            for (i in obj.fields)
                record[i] = obj.fields[i];
            record.recordType = obj.recordType;
            record.recordId = obj.recordId;
            if (obj.metadata) {
                // Metadata, if any
                record.metadata = obj.metadata || {};
            }
            // If record contains properties
            if (!latte._undef(obj['properties'])) {
                for (i in obj.properties) {
                    // If property is an array
                    if (latte._isArray(obj.properties[i])) {
                        for (j = 0; j < obj.properties[i].length; j++) {
                            obj.properties[i][j] = latte.DataRecord.fromServerObject(obj.properties[i][j]);
                        }
                    }
                    // If property is a record
                    if (obj.properties[i] && obj.properties[i]['type'] == 'DataRecord') {
                        // Unpack
                        record[i] = latte.DataRecord.fromServerObject(obj.properties[i]);
                    }
                    else {
                        // Or, Assign as it is
                        record[i] = obj.properties[i];
                    }
                }
            }
            return record;
        };
        /**
         * Converts a server given array of Object to a Records array
         **/
        DataRecord.fromServerObjects = function (array, classType) {
            if (classType === void 0) { classType = null; }
            if (!latte._isArray(array))
                throw new latte.InvalidArgumentEx('array', array);
            var a = [];
            for (var i = 0; i < array.length; i++) {
                a.push(latte.DataRecord.fromServerObject(array[i], classType));
            }
            return a;
        };
        /**
         * Returns a value indicating if the passed Object
         is a packed Object
         **/
        DataRecord.isPackedRecord = function (object) {
            return latte._isObject(object) && object.type == 'DataRecord' && !latte._undef(object.recordType);
        };
        //region Methods
        /**
         * Creates a view for displaying the record
         **/
        DataRecord.prototype.createView = function () {
            return new latte.DataRecordFormView(this);
        };
        /**
         * Gets the fields of the record, with values
         **/
        DataRecord.prototype.getFields = function () {
            var f = {};
            var metadata = this.getMetadata();
            if (metadata && metadata.fields) {
                for (var i in metadata.fields) {
                    f[i] = this[i] || null;
                }
            }
            return f;
        };
        /**
         * Can be overriden to return dynamically generated metadata
         **/
        DataRecord.prototype.getMetadata = function () {
            return this.metadata;
        };
        /**
         * Sends an insert message to the server
         **/
        DataRecord.prototype.insert = function (callback) {
            return this.insertCall().send(function () {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        };
        /**
         * Gets the remote call for insertion
         *
         * @returns {latte.RemoteCall}
         */
        DataRecord.prototype.insertCall = function () {
            var _this = this;
            var values = this.getFields();
            for (var i in values) {
                if (values[i] === null) {
                    values[i] = '';
                }
            }
            // Create call
            var call = new latte.RemoteCall(this.moduleName, 'DataLatteUa', 'recordInsert', { name: this.recordType, fields: values });
            // Catch auto-id
            call.success.add(function (data) {
                _this.recordId = parseInt(data, 10);
                _this[_this.onGetRecordIdName()] = _this.recordId;
            });
            return call;
        };
        /**
         * Returns a value indicating if the record is inserted, based on the existence of id
         **/
        DataRecord.prototype.inserted = function () {
            return this.recordId > 0;
        };
        /**
         * Raises the <c>formCreated</c> event
         **/
        DataRecord.prototype.onFormCreated = function (form) {
            if (this._formCreated) {
                this._formCreated.raise(form);
            }
        };
        /**
         * Raises the <c>formCreating</c> event
         **/
        DataRecord.prototype.onFormCreating = function (form) {
            if (this._formCreating) {
                this._formCreating.raise(form);
            }
        };
        /**
         * Gets the name of the id field
         * @returns {undefined}
         */
        DataRecord.prototype.onGetRecordIdName = function () {
            return undefined;
        };
        /**
         * Raises the <c>viewCreated</c> event
         **/
        DataRecord.prototype.onViewCreated = function (view) {
            if (this._viewCreated) {
                this._viewCreated.raise(view);
            }
        };
        /**
         * Raises the <c>viewCreating</c> event
         **/
        DataRecord.prototype.onViewCreating = function (view) {
            if (this._viewCreating) {
                this._viewCreating.raise(view);
            }
        };
        /**
         * Sends a DELETE request to the server
         **/
        DataRecord.prototype.remove = function (callback) {
            return this.removeCall().send(function () {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        };
        /**
         * Gets the call for removing this record
         * @returns {latte.RemoteCall}
         */
        DataRecord.prototype.removeCall = function () {
            return new latte.RemoteCall(this.moduleName, 'DataLatteUa', 'recordDelete', { name: this.recordType, id: this.recordId });
        };
        /**
         * Inserts or updates the record
         **/
        DataRecord.prototype.save = function (callback) {
            return this.saveCall().send(function () {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        };
        /**
         * Gets the insert or update call for record
         */
        DataRecord.prototype.saveCall = function () {
            if (this.recordId) {
                return this.updateCall();
            }
            else {
                return this.insertCall();
            }
        };
        /**
         * Sends an update message to the record
         **/
        DataRecord.prototype.update = function (callback) {
            return this.updateCall().send(function () {
                if (latte._isFunction(callback)) {
                    callback();
                }
            });
        };
        /**
         * Gets the call for updating the record
         *
         * @returns {latte.RemoteCall<string>}
         */
        DataRecord.prototype.updateCall = function () {
            var values = this.getFields();
            for (var i in values) {
                if (values[i] === null) {
                    values[i] = '';
                }
            }
            // Create call
            var call = new latte.RemoteCall(this.moduleName, 'DataLatteUa', 'recordUpdate', { name: this.recordType, id: this.recordId, fields: values });
            return call;
        };
        Object.defineProperty(DataRecord.prototype, "moduleName", {
            /**
             * Gets or sets the name of the module where record is contained
             *
             * @returns {string}
             */
            get: function () {
                return this._moduleName;
            },
            /**
             * Gets or sets the name of the module where record is contained
             *
             * @param {string} value
             */
            set: function (value) {
                this._moduleName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "formCreating", {
            /**
             * Gets an event raised when a form about the record is solicited
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._formCreating) {
                    this._formCreating = new latte.LatteEvent(this);
                }
                return this._formCreating;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "formCreated", {
            /**
             * Gets an event raised when a form about the record has been created
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._formCreated) {
                    this._formCreated = new latte.LatteEvent(this);
                }
                return this._formCreated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "recordId", {
            /**
             * Gets or sets the record id
             **/
            get: function () {
                return this._recordId;
            },
            /**
             * Gets or sets the record id
             **/
            set: function (value) {
                this._recordId = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "recordType", {
            /**
             * Gets or sets the record type
             **/
            get: function () {
                return this._recordType;
            },
            /**
             * Gets or sets the record type
             **/
            set: function (value) {
                this._recordType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "tag", {
            /**
             * Gets or sets an arbitrary value for the record
             **/
            get: function () {
                return this._tag;
            },
            /**
             * Gets or sets an arbitrary value for the record
             **/
            set: function (value) {
                this._tag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "viewCreated", {
            /**
             * Gets an event raised when a View about the record has been created
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._viewCreated) {
                    this._viewCreated = new latte.LatteEvent(this);
                }
                return this._viewCreated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataRecord.prototype, "viewCreating", {
            /**
             * Gets an event raised when a View about the record is being requested
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._viewCreating) {
                    this._viewCreating = new latte.LatteEvent(this);
                }
                return this._viewCreating;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Name of object where records are stored
         */
        DataRecord.recordsNamespaceName = 'latte';
        return DataRecord;
    })();
    latte.DataRecord = DataRecord;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a collection of records
     */
    var DataRecordCollection = (function (_super) {
        __extends(DataRecordCollection, _super);
        /**
         * Creates the collection of the specified type.
         * Optionally specifies handlers for adding and removing items, and a
         * context to call as closure of events.
         *
         * @param addCallback
         * @param removeCallback
         * @param context
         */
        function DataRecordCollection(addCallback, removeCallback, context) {
            if (addCallback === void 0) { addCallback = null; }
            if (removeCallback === void 0) { removeCallback = null; }
            if (context === void 0) { context = null; }
            _super.call(this, addCallback, removeCallback, context);
        }
        /**
         * Finds the record of the specified <c>id</c>
         *
         * @param id
         * @returns {null}
         */
        DataRecordCollection.prototype.byId = function (id) {
            return null;
        };
        return DataRecordCollection;
    })(latte.Collection);
    latte.DataRecordCollection = DataRecordCollection;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a set of structured data
     **/
    var DataSet = (function () {
        /**
         * Creates the dataset
         **/
        function DataSet() {
            this.columns = new latte.Collection();
            this.rows = new latte.Collection();
        }
        /**
         * Creates a <c>DataSet</c> from the dataset specified as a JSON object
         **/
        DataSet.fromServerObject = function (dataset) {
            var d = new DataSet();
            var i;
            for (i in dataset.fields) {
                d.columns.add(new latte.DataSetColumn(dataset.fields[i].name, DataSet.fromServerType(dataset.fields[i].type), dataset.fields[i].length));
            }
            // Add rows
            if (latte._isArray(dataset.rows)) {
                for (i = 0; i < dataset.rows.length; i++) {
                    var arr = dataset.rows[i];
                    var ds = new latte.DataSetRow(arr);
                    d.rows.add(ds);
                }
            }
            return d;
        };
        /**
         * Converts the type sent by server to a type compatible with <c>InputItem</c>
         **/
        DataSet.fromServerType = function (type) {
            switch (type) {
                case 'int':
                    type = 'integer';
                    break;
                case 'blob':
                    type = 'string';
                    break;
            }
            return type;
        };
        /**
         * Gets the index of the column by passing the name of the column
         **/
        DataSet.prototype.getColumnIndex = function (columnName) {
            var col = null;
            var i = 0;
            while ((col = this.columns.next())) {
                if (col.name.toLowerCase() == columnName.toLowerCase()) {
                    this.columns.resetPointer();
                    return i;
                }
                i++;
            }
            return null;
        };
        /**
         * Gets the data as an array of arrays
         **/
        DataSet.prototype.getDataArray = function () {
            var a = [];
            for (var i = 0; i < this.rows.count; i++)
                a.push(this.rows.item(i).getDataArray(this.columns.count));
            return a;
        };
        /**
         * Gets the value of the specified column at the specified row index
         **/
        DataSet.prototype.getValue = function (columnName, rowIndex) {
            var columnIndex;
            if ((columnIndex = this.getColumnIndex(columnName))) {
                return this.getValueAt(columnIndex, rowIndex);
            }
            else {
                throw new latte.InvalidArgumentEx(columnName);
            }
        };
        /**
         * Gets the value at the specified position
         **/
        DataSet.prototype.getValueAt = function (columnIndex, rowIndex) {
            if (this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex))
                return this.rows.item(rowIndex).getValueAt(columnIndex);
            else
                return null;
        };
        /**
         * Sets the value at the specified position
         **/
        DataSet.prototype.setValue = function (columnName, rowIndex, value) {
            var columnIndex;
            if ((columnIndex = this.getColumnIndex(columnName))) {
                return this.setValueAt(columnIndex, rowIndex, value);
            }
            return this;
        };
        /**
         * Sets the value at the specified position
         **/
        DataSet.prototype.setValueAt = function (columnIndex, rowIndex, value) {
            if (this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex))
                this.rows.item(rowIndex).setValueAt(columnIndex, value);
            else if (this.rows.count <= rowIndex)
                throw new latte.InvalidArgumentEx('rowIndex', rowIndex);
            else
                throw new latte.InvalidArgumentEx('columnIndex', columnIndex);
            return this;
        };
        return DataSet;
    })();
    latte.DataSet = DataSet;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Sends messages to objects on server.
     * <example>
     * // ( 1 )
     * // Execute method Person::computeAge() on person with id 1
     * var m1 = new Message('Person', 'computeAge', {}, 1);
     *
     * m1.send(function(){
     *   // Log result of computeAge()
     *   log(this.data);
     * });
     *
     * // ( 2 )
     * // Execute *static* method Person::count()
     * var m2 = new Message('Person', 'count');
     *
     * m2.send(function(){
     *   // Log result of count()
     *   log(this.data);
     * });
     *
     * </example>
     *
     * @class
     */
    var Message = (function () {
        //endregion
        /**
         * Creates the message with the specified call
         **/
        function Message(moduleName, className, method, arguments, id) {
            if (moduleName === void 0) { moduleName = null; }
            if (className === void 0) { className = null; }
            if (method === void 0) { method = null; }
            if (arguments === void 0) { arguments = null; }
            if (id === void 0) { id = 0; }
            /**
             *
             */
            this._calls = [];
            // Add first standard call
            if (className !== null) {
                this.calls.push(new latte.RemoteCall(moduleName, className, method, arguments, id));
            }
            if (Message._pendentMessages === null)
                Message._pendentMessages = new latte.Collection();
        }
        /**
         * Directly sends an array of calls
         * @param calls
         * @returns {latte.Message}
         */
        Message.sendCalls = function (calls) {
            var m = new Message();
            m.addCalls(calls);
            m.send();
            return m;
        };
        Object.defineProperty(Message, "networkAvailable", {
            /**
             * Checks if newtowrk is currently available, according to last message sent.
             **/
            get: function () {
                return Message._networkAvailable;
            },
            enumerable: true,
            configurable: true
        });
        //region Methods
        /**
         * Adds calls to the calls array
         * @param calls
         */
        Message.prototype.addCalls = function (calls) {
            this._calls = this._calls.concat(calls);
        };
        /**
         * Reacts to data arrived
         **/
        Message.prototype.dataArrived = function (data) {
            var parsed = false;
            var result = null;
            this._working = false;
            /// Assign response
            this.response = data;
            /// Network is available
            Message._networkAvailable = true;
            /// Raise received handler
            this.onResponseArrived();
            // Check if data arrived
            if (data.length == 0) {
                this.onFailed("Empty response from server");
            }
            try {
                result = jQuery.parseJSON(data);
                parsed = true;
            }
            catch (ex) {
            }
            if (parsed && latte._isArray(result)) {
                if (result.length !== this.calls.length) {
                    this.onFailed("Different amount of response than calls");
                }
                for (var i = 0; i < this.calls.length; i++) {
                    this.calls[i].respond(result[i]);
                }
            }
            else {
                /// Raise failed event
                this.onFailed("Can't parse or response is not an array.");
            }
            if (Message.networkAvailable) {
                if (!Message._pendentMessages) {
                    Message._pendentMessages = new latte.Collection();
                }
                // Send all messages
                Message._pendentMessages.each(function (m) {
                    m.send();
                });
                // Clear collection
                Message._pendentMessages.clear();
            }
        };
        /**
         * Raises the failed event
         **/
        Message.prototype.onFailed = function (errorDescription) {
            // Dump error
            latte.log(errorDescription);
            latte.log("On call(s):");
            for (var i = 0; i < this.calls.length; i++) {
                latte.log(this.calls[i].toString());
            }
            latte.log(this.response);
            if (this._failed instanceof latte.LatteEvent) {
                this.failed.raise();
            }
            if (latte._isFunction(Message.globalFailed)) {
                Message.globalFailed.call(this, errorDescription);
            }
        };
        /**
         * Raises the networkFailed event
         **/
        Message.prototype.onNetworkFailed = function () {
            /// Networks appears to be unavailable
            Message._networkAvailable = false;
            // If no retryLeader
            if (Message._retryLeader === null) {
                // I am the retry leader
                Message._retryLeader = this;
            }
            else if (Message._retryLeader !== this) {
                // Add me to pendent messages and good bye.
                Message._pendentMessages.add(this);
                return;
            }
            /// Raise event
            if (this._networkFailed) {
                this._networkFailed.raise();
            }
            //            this.onNetworkFailed();
            /// Ensure loader is there
            if (!(Message._retryLoader instanceof latte.Loader)) {
                Message._retryLoader = new latte.Loader(strings.reconnecting);
            }
            /// If message was critical
            if (this.critical) {
            }
            /// If first try
            if (Message._retryTime == 0) {
                // Initialize retry time to 5 seconds
                Message._retryTime = 5;
            }
            else {
                // Duplicate last retry time, topped to 5 minutes
                Message._retryTime = Math.min(latte.TimeSpan.fromMinutes(5).totalSeconds, Message._retryTime * 2);
            }
            // Initialize countdown
            Message._retryCountdown = Message._retryTime;
            // Announce countdown
            Message._retryLoader.text = (latte.sprintf(strings.reconnectingInS, latte.TimeSpan.fromSeconds(Message._retryCountdown).toString()));
            if (Message._retryTimer)
                Message._retryTimer.pause();
            /// Set timer to countdown
            Message._retryTimer = new latte.Timer(function () {
                Message._retryCountdown--;
                // Retry now?
                if (Message._retryCountdown == 0) {
                    Message._retryLoader.text = strings.reconnecting;
                    Message._networkAvailable = true;
                    this.send();
                }
                else if (Message._retryCountdown < 0) {
                    Message._retryTimer.pause();
                    Message._retryLoader.stop();
                }
                else {
                    /// Retry time text
                    Message._retryLoader.text = (latte.sprintf(strings.reconnectingInS, latte.TimeSpan.fromSeconds(Message._retryCountdown).toString()));
                }
            }, 1000, this);
            Message._retryTimer.start();
        };
        /**
         * Raises the responseArrived event
         **/
        Message.prototype.onResponseArrived = function () {
            if (this._loader instanceof latte.Loader)
                this._loader.stop();
            if (this._responseArrived) {
                this.responseArrived.raise();
            }
        };
        /**
         * Raises the <c>sent</c> event
         **/
        Message.prototype.onSent = function () {
            if (this._sent) {
                this.sent.raise();
            }
            Message.log.push(this);
            if (Message.log.length > 50) {
                Message.log.shift();
            }
        };
        /**
         * Sends the message. Optionally adds event handlers for <c>succeeded</c> and <c>failed</c> events
         **/
        Message.prototype.send = function (success, failure) {
            if (success === void 0) { success = null; }
            if (failure === void 0) { failure = null; }
            if (!Message.networkAvailable) {
                // Add to pendent messages
                Message._pendentMessages.add(this);
                return this;
            }
            if (success || failure) {
                if (this.calls.length !== 1) {
                    throw new latte.Ex("Can't assign handlers when more than one call in message");
                }
                else {
                    if (success) {
                        this.calls[0].success.add(success);
                    }
                    if (failure) {
                        this.calls[0].failure.add(failure);
                    }
                }
            }
            this._working = true;
            this.showLoader();
            // Gather calls
            var calls = [];
            for (var i = 0; i < this.calls.length; i++) {
                calls.push(this.calls[i].marshall());
            }
            //log(sprintf("Call: %s, %s", DateTime.now.toString(), JSON.stringify(calls)));
            $.ajax({
                /// Use URL for DataLatte requests
                url: Message.pathToRequest,
                /// Use the message as context
                context: this,
                /// Mix data with headers
                data: {
                    action: 'ajax-rpc',
                    calls: JSON.stringify(calls)
                },
                /// Interpret as text to make it JSON by ourselves
                dataType: 'text',
                /// Send request as POST
                type: 'POST',
                /// Handle success
                success: function (data) {
                    this.dataArrived(data);
                },
                /// Handle ajax error
                error: function (jqXHR, textStatus, errorThrown) {
                    this._working = false;
                    this.errorDescription = "Network error: " + textStatus;
                    this.errorCode = 1;
                    this.onNetworkFailed();
                }
            });
            this.onSent();
            return this;
        };
        /**
         * Shows the loader if any <c>loaderText</c> assigned
         **/
        Message.prototype.showLoader = function () {
            if (this.loaderText)
                this._loader = new latte.Loader(this.loaderText);
        };
        /**
         * Gets a value indcating if the message is in progress
         **/
        Message.prototype.working = function () {
            return this._working;
        };
        Object.defineProperty(Message.prototype, "calls", {
            //endregion
            //region Properties
            /**
             * Gets the calls this message will make
             *
             * @returns {Array<RemoteCall>}
             */
            get: function () {
                return this._calls;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "failed", {
            /**
             * Gets an event raised when the message fails by network issues or server issues
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._failed) {
                    this._failed = new latte.LatteEvent(this);
                }
                return this._failed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "loaderText", {
            /**
             * Gets or sets the text of a loader that will be shown while message arrives.
             **/
            get: function () {
                return this._loaderText;
            },
            /**
             * Gets or sets the text of a loader that will be shown while message arrives.
             **/
            set: function (value) {
                this._loaderText = value;
                if (this.working())
                    this.showLoader();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "networkFailed", {
            /**
             * Gets an event raised when the network fails
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._networkFailed) {
                    this._networkFailed = new latte.LatteEvent(this);
                }
                return this._networkFailed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "responseArrived", {
            /**
             * Gets an event raised when the response arrives
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._responseArrived) {
                    this._responseArrived = new latte.LatteEvent(this);
                }
                return this._responseArrived;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "sent", {
            /**
             * Gets an event raised when the message is sent
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._sent) {
                    this._sent = new latte.LatteEvent(this);
                }
                return this._sent;
            },
            enumerable: true,
            configurable: true
        });
        //region Static
        Message.log = [];
        /**
         * Flag to indicate if network is
         **/
        Message._networkAvailable = true;
        /**
         * Pointer to messages
         **/
        Message._pendentMessages = null;
        /**
         * Path where requests are made
         */
        Message.pathToRequest = "/datalatte-files/request.php";
        return Message;
    })();
    latte.Message = Message;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a call to a remote procedure
     */
    var RemoteCall = (function () {
        //endregion
        /**
         * Creates the procedure with optional parameters
         * @param module
         * @param className
         * @param method
         * @param params
         * @param id
         * @param returns
         */
        function RemoteCall(moduleName, className, method, params, id, returns) {
            if (moduleName === void 0) { moduleName = null; }
            if (className === void 0) { className = null; }
            if (method === void 0) { method = null; }
            if (params === void 0) { params = null; }
            if (id === void 0) { id = 0; }
            if (returns === void 0) { returns = null; }
            //region Fields
            this._className = null;
            this._method = null;
            this._id = 0;
            this._params = null;
            this._returns = null;
            this._success = null;
            this._failure = null;
            /**
             * Property field
             */
            this._something = null;
            /**
             * Property field
             */
            this._moduleName = null;
            if (moduleName)
                this.moduleName = moduleName;
            if (className)
                this.className = className;
            if (method)
                this.method = method;
            if (params)
                this.params = params;
            if (id)
                this.id = id;
            if (returns)
                this.returns = returns;
        }
        //region Methods
        /**
         * Gets the marshalled call
         */
        RemoteCall.prototype.marshall = function () {
            return {
                moduleName: this.moduleName,
                className: this.className,
                method: this.method,
                id: this.id,
                params: this.params
            };
        };
        /**
         * Raises the <c>failure</c> event
         */
        RemoteCall.prototype.onFailure = function () {
            if (this._failure instanceof latte.LatteEvent) {
                this._failure.raise();
            }
        };
        /**
         * Raises the <c>success</c> event
         * @param data
         */
        RemoteCall.prototype.onSuccess = function (data) {
            if (this._success instanceof latte.LatteEvent) {
                this._success.raise(data);
            }
        };
        /**
         * Reports a response from server to the call
         *
         * @param responseData
         */
        RemoteCall.prototype.respond = function (responseData) {
            var response = new latte.RemoteResponse(this, responseData);
            this.response = response;
        };
        /**
         * Creates a Message object and sends the call, additionally handlers for success and failure may be added.
         */
        RemoteCall.prototype.send = function (success, failure) {
            if (success === void 0) { success = null; }
            if (failure === void 0) { failure = null; }
            this.withHandlers(success, failure);
            // Create message
            var m = new latte.Message();
            // Add this call to message
            m.calls.push(this);
            // Send the message
            m.send();
            return m;
        };
        /**
         * Creates a Message object and sends the call, showing a loader with the specified text
         * @param loaderText
         * @param success
         * @param failure
         */
        RemoteCall.prototype.sendWithLoader = function (loaderText, success, failure) {
            if (success === void 0) { success = null; }
            if (failure === void 0) { failure = null; }
            var m = this.send(success, failure);
            m.loaderText = loaderText;
            return m;
        };
        /**
         * Gets a string representation of the call
         * @returns {*|string}
         */
        RemoteCall.prototype.toString = function () {
            var idpart = this.id > 0 ? latte.sprintf("<%s>", this.id) : '';
            var paramspart = [];
            for (var i in this.params) {
                var a = this.params[i];
                paramspart.push(i + ' = ' + (latte._isArray(a) || latte._isObject(a) ? JSON.stringify(a) : String(a)));
            }
            return latte.sprintf("%s%s.%s(%s)", this.className, idpart, this.method, paramspart.join(', '));
        };
        /**
         * Adds handlers for success and/or failure and returns the call object
         * @param success
         * @param failure
         * @returns {latte.RemoteCall}
         */
        RemoteCall.prototype.withHandlers = function (success, failure) {
            if (success === void 0) { success = null; }
            if (failure === void 0) { failure = null; }
            // Add success handler
            if (success) {
                this.success.add(success);
            }
            // Add failed handler
            if (failure) {
                this.failure.add(failure);
            }
            return this;
        };
        Object.defineProperty(RemoteCall.prototype, "className", {
            //endregion
            //region Properties
            /**
             * Gets or sets the name of the class where the procedure is located
             * @returns {string}
             */
            get: function () {
                return this._className;
            },
            /**
             * Gets or sets the name of the class where the procedure is located
             * @param value
             */
            set: function (value) {
                this._className = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "method", {
            /**
             * Gets or sets the name of the remote procedure to be called
             * @returns {string}
             */
            get: function () {
                return this._method;
            },
            /**
             * Gets or sets the name of the remote procedure to be called
             * @param value
             */
            set: function (value) {
                this._method = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "failure", {
            /**
             * Gets an event raised when the call fails
             * @returns {LatteEvent}
             */
            get: function () {
                if (!(this._failure instanceof latte.LatteEvent)) {
                    this._failure = new latte.LatteEvent(this);
                }
                return this._failure;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "something", {
            /**
             * Gets or sets something
             *
             * @returns {string}
             */
            get: function () {
                return this._something;
            },
            /**
             * Gets or sets something
             *
             * @param {string} value
             */
            set: function (value) {
                this._something = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "moduleName", {
            /**
             * Gets or sets the module name
             *
             * @returns {string}
             */
            get: function () {
                return this._moduleName;
            },
            /**
             * Gets or sets the module name
             *
             * @param {string} value
             */
            set: function (value) {
                this._moduleName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "id", {
            /**
             * Gets or sets the id of the object instance where procedure should be called
             * @returns {number}
             */
            get: function () {
                return this._id;
            },
            /**
             * Gets or sets the id of the object instance where procedure should be called
             * @param value
             */
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "params", {
            /**
             * Gets or sets an object representing the parameters to use when calling the remote procedure
             * @returns {*}
             */
            get: function () {
                return this._params;
            },
            /**
             * Gets or sets an object representing the parameters to use when calling the remote procedure
             * @param value
             */
            set: function (value) {
                this._params = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "response", {
            /**
             * Gets or sets the response of the message
             *
             * @returns {RemoteResponse}
             */
            get: function () {
                return this._response;
            },
            /**
             * Gets or sets the response of the message
             *
             * @param value
             */
            set: function (value) {
                this._response = value;
                if (value.logs.length > 0) {
                    latte.log(latte.sprintf("Log: " + this.toString()));
                    for (var i = 0; i < value.logs.length; i++) {
                        latte.log('    ' + value.logs[i]);
                    }
                }
                if (value.warnings.length > 0) {
                    latte.log("Warnings: " + latte.sprintf(this.toString()));
                    for (var i = 0; i < value.warnings.length; i++) {
                        if (console && console.warn) {
                            console.warn('    ' + value.warnings[i]);
                        }
                        else {
                            latte.log('    ' + value.warnings[i]);
                        }
                    }
                }
                if (value.success) {
                    this.onSuccess(value.data);
                }
                else {
                    this.onFailure();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "returns", {
            /**
             * Gets or sets the type of data returned by the remote procedure
             * @param value
             */
            get: function () {
                return this._returns;
            },
            /**
             * Gets or sets the type of data returned by the remote procedure
             * @param value
             */
            set: function (value) {
                this._returns = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteCall.prototype, "success", {
            /**
             * Gets an event raised when message arrives successfully
             */
            get: function () {
                if (!(this._success instanceof latte.LatteEvent)) {
                    this._success = new latte.LatteEvent(this);
                }
                return this._success;
            },
            enumerable: true,
            configurable: true
        });
        return RemoteCall;
    })();
    latte.RemoteCall = RemoteCall;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     */
    var RemoteResponse = (function () {
        //endregion
        /**
         * Creates the response
         * @param call
         * @param responseText
         */
        function RemoteResponse(call, response) {
            //region Fields
            this._call = null;
            this._errorCode = -1;
            this._errorDescription = null;
            this._success = false;
            /**
             * Property field
             */
            this._logs = [];
            /**
             * Property field
             */
            this._warnings = [];
            this._call = call;
            this._response = response;
            this.unmarshall();
        }
        //region Private Methods
        /**
         * Unpacks the response text to indicate attributes
         */
        RemoteResponse.prototype.unmarshall = function () {
            for (var i in this.response) {
                this['_' + i] = this.response[i];
            }
            if (this.success === true) {
                this._data = latte.DataRecord.scanAndConvert(this.data);
            }
            else {
                latte.log("Error on call: " + this.call.toString());
                latte.log(latte.sprintf("(%s) - %s", this.errorCode, this.errorDescription));
                this.call.onFailure();
            }
        };
        Object.defineProperty(RemoteResponse.prototype, "call", {
            //endregion
            //region Properties
            /**
             * Gets the call who originated this response
             * @returns {RemoteCall}
             */
            get: function () {
                return this._call;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "errorCode", {
            /**
             * Gets the error code returned (if any)
             * @returns {number}
             */
            get: function () {
                return this._errorCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "errorDescription", {
            /**
             * Gets the error description returned (if any)
             * @returns {string}
             */
            get: function () {
                return this._errorDescription;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "logs", {
            /**
             * Gets or sets the logs array in response
             *
             * @returns {Array<string>}
             */
            get: function () {
                return this._logs;
            },
            /**
             * Gets or sets the logs array in response
             *
             * @param {Array<string>} value
             */
            set: function (value) {
                this._logs = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "response", {
            /**
             * Gets the literal response from server
             * @returns {string}
             */
            get: function () {
                return this._response;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "data", {
            /**
             * Gets
             * @returns {T}
             */
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "success", {
            /**
             * Gets a value indicating if the call was a success
             * @returns {boolean}
             */
            get: function () {
                return this._success;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RemoteResponse.prototype, "warnings", {
            /**
             * Gets or sets
             *
             * @returns {Array<string>}
             */
            get: function () {
                return this._warnings;
            },
            /**
             * Gets or sets
             *
             * @param {Array<string>} value
             */
            set: function (value) {
                this._warnings = value;
            },
            enumerable: true,
            configurable: true
        });
        return RemoteResponse;
    })();
    latte.RemoteResponse = RemoteResponse;
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
         is supposed to recieve the values
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
                record.onFormCreating(this);
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
                record.onFormCreated(this);
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
