var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by josemanuel on 7/25/14.
 */
/**
 * Created by josemanuel on 7/25/14.
 */
/**
 * Created by josemanuel on 7/25/14.
 */
/**
 * Created by josemanuel on 7/25/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var ReflectionInfo = (function () {
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function ReflectionInfo() {
        }
        return ReflectionInfo;
    }());
    latte.ReflectionInfo = ReflectionInfo;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/25/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var TsPropertyInfo = (function (_super) {
        __extends(TsPropertyInfo, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function TsPropertyInfo() {
            _super.call(this);
        }
        return TsPropertyInfo;
    }(latte.ReflectionInfo));
    latte.TsPropertyInfo = TsPropertyInfo;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/25/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var TsClassInfo = (function (_super) {
        __extends(TsClassInfo, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function TsClassInfo() {
            _super.call(this);
        }
        return TsClassInfo;
    }(latte.ReflectionInfo));
    latte.TsClassInfo = TsClassInfo;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/25/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var TsEventInfo = (function (_super) {
        __extends(TsEventInfo, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function TsEventInfo() {
            _super.call(this);
        }
        return TsEventInfo;
    }(latte.TsPropertyInfo));
    latte.TsEventInfo = TsEventInfo;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/25/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var TsFieldInfo = (function (_super) {
        __extends(TsFieldInfo, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function TsFieldInfo() {
            _super.call(this);
        }
        return TsFieldInfo;
    }(latte.ReflectionInfo));
    latte.TsFieldInfo = TsFieldInfo;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 7/25/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var TsMethodInfo = (function (_super) {
        __extends(TsMethodInfo, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function TsMethodInfo() {
            _super.call(this);
        }
        return TsMethodInfo;
    }(latte.ReflectionInfo));
    latte.TsMethodInfo = TsMethodInfo;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 3/7/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var ApiDetailView = (function (_super) {
        __extends(ApiDetailView, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function ApiDetailView(source) {
            _super.call(this, 1);
            this.addClass('api-detail');
            this._source = source;
            this.initView();
        }
        //region Private Methods
        ApiDetailView.prototype.initView = function () {
            var source = this.source;
            // Title
            this.items.add(new latte.LabelItem(source.name, null, null, 1));
            // Description
            var lbld = new latte.LabelItem(source.description);
            lbld.preformatted = true;
            this.items.add(lbld);
            // Properties
            this.items.add(new latte.LabelItem('Properties', null, null, 2));
            this.items.add(this.propertiesTable());
            // Methods
            this.items.add(new latte.LabelItem('Methods', null, null, 2));
            this.items.add(this.methodsTable());
        };
        ApiDetailView.prototype.cleanDescription = function (lines) {
            if (!lines || lines.length == 0)
                return '';
            var r = [];
            lines.forEach(function (line) {
                if (line.trim().indexOf('@') != 0) {
                    r.push(line);
                }
            });
            return r.join('\n');
        };
        ApiDetailView.prototype.sortObject = function (o) {
            var keys = [];
            for (var i in o) {
                keys.push(i);
            }
            keys.sort();
            var r = {};
            keys.forEach(function (k) {
                r[k] = o[k];
            });
            return r;
        };
        ApiDetailView.prototype.propertiesTable = function () {
            var item = new latte.Item();
            var table = $('<table>').addClass('api-table').appendTo(item.element);
            var props = this.sortObject(this.source.properties);
            // Add headers
            table.append($('<tr></tr>')
                .append($('<th>').text(''))
                .append($('<th>').text('Name'))
                .append($('<th>').text('Type'))
                .append($('<th>').text('Description')));
            for (var prop in props) {
                var property = this.source.properties[prop];
                var indicators;
                if (property.isPublic !== true)
                    continue;
                var row = $('<tr></tr>').appendTo(table);
                row.append(indicators = $('<td>').append((latte.IconItem.standard(4, 4)).element));
                row.append($('<td>').html(prop));
                row.append($('<td>').append(this.typeLabel(property.type).element));
                row.append($('<td>').html(this.cleanDescription(property.description)));
                if (property.isStatic === true) {
                    indicators.append(this.staticLabel());
                }
            }
            return item;
        };
        ApiDetailView.prototype.methodsTable = function () {
            var item = new latte.Item();
            var table = $('<table>').addClass('api-table').appendTo(item.element);
            var meths = this.sortObject(this.source.methods);
            // Add headers
            table.append($('<tr></tr>')
                .append($('<th>').text(''))
                .append($('<th>').text('Name'))
                .append($('<th>').text('Arguments'))
                .append($('<th>').text('Description')));
            for (var methodName in meths) {
                var method = this.source.methods[methodName];
                var indicators;
                if (method.isPublic !== true)
                    continue;
                var row = $('<tr></tr>').appendTo(table);
                row.append(indicators = $('<td>').append((latte.IconItem.standard(13, 8)).element));
                row.append($('<td>').html(methodName));
                row.append($('<td>').html('<code>' + method.source.substr(method.source.indexOf('(')) + '</code>'));
                row.append($('<td>').html(this.cleanDescription(method.description)));
                if (method.isStatic === true) {
                    indicators.append(this.staticLabel());
                }
            }
            return item;
        };
        /**
         * Returns a type label
         * @param type
         * @returns {latte.LabelItem}
         */
        ApiDetailView.prototype.typeLabel = function (type) {
            var _this = this;
            var lbl = new latte.LabelItem();
            if (type.indexOf('latte.') === 0) {
                lbl.text = type.substr(6).replace('<', '&lt;').replace('>', '&gt;');
                lbl.linkStyle = true;
            }
            else if (typeof apiStructure[type] !== 'undefined') {
                lbl.text = type.replace('<', '&lt;').replace('>', '&gt;');
                lbl.linkStyle = true;
            }
            else {
                lbl.text = type;
            }
            lbl.navigate.add(function () {
                _this.onNavigate(type);
            });
            return lbl;
        };
        /**
         *
         */
        ApiDetailView.prototype.staticLabel = function () {
            return $('<span></span>').addClass('static-icon').text('s').attr('title', 'Member is static');
        };
        Object.defineProperty(ApiDetailView.prototype, "navigate", {
            /**
             * Gets an event raised when navigation to a class is requested
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._navigate) {
                    this._navigate = new latte.LatteEvent(this);
                }
                return this._navigate;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Raises the <c>navigate</c> event
         */
        ApiDetailView.prototype.onNavigate = function (className) {
            if (this._navigate) {
                this._navigate.raise(className);
            }
        };
        Object.defineProperty(ApiDetailView.prototype, "source", {
            /**
             * Gets the source of the detail view
             *
             * @returns {any}
             */
            get: function () {
                return this._source;
            },
            enumerable: true,
            configurable: true
        });
        return ApiDetailView;
    }(latte.ColumnView));
    latte.ApiDetailView = ApiDetailView;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 3/7/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var MainApiView = (function (_super) {
        __extends(MainApiView, _super);
        //region Static
        //endregion
        //region Fields
        //endregion
        /**
         *
         */
        function MainApiView() {
            _super.call(this);
            this.loadTree();
        }
        //region Private Methods
        /**
         * Adds the className to the tree
         *
         * @param className
         */
        MainApiView.prototype.addModuleNode = function (className) {
            latte.log(className);
            var item = new latte.TreeItem();
            item.text = className;
            item.icon = latte.IconItem.standard(15, 7);
            item.tag = className;
            var names = [];
            // Load module members
            for (var member in apiStructure[className]) {
                names.push(member);
            }
            names.sort();
            for (var i = 0; i < names.length; i++) {
                this.addMemberNode(item, names[i]);
            }
            this.treeView.items.add(item);
        };
        MainApiView.prototype.addMemberNode = function (node, member) {
            var _this = this;
            var memberItem = new latte.TreeItem();
            memberItem.text = member;
            memberItem.icon = latte.IconItem.standard(13, 7);
            memberItem.tag = member;
            memberItem.selectedChanged.add(function () {
                if (memberItem.selected) {
                    var d = new latte.ApiDetailView(apiStructure[node.tag][member]);
                    d.navigate.add(function (type) {
                        latte.log("Navigating " + type);
                        if (type.indexOf('latte.') >= 0) {
                            type = type.substr(6);
                            if (type.indexOf('<') >= 0) {
                                type = type.substr(0, type.indexOf('<'));
                            }
                            if (typeof apiStructure[type] != 'undefined') {
                                // GO type
                                for (var i = 0; i < _this.treeView.items.length; i++) {
                                    var treeItem = _this.treeView.items[i];
                                    if (treeItem.tag == type) {
                                        treeItem.selected = true;
                                    }
                                }
                            }
                            else {
                                latte.log("Type not found: " + type);
                            }
                        }
                    });
                    _this.view = d;
                }
            });
            node.items.add(memberItem);
        };
        /**
         * Loads the class tree
         */
        MainApiView.prototype.loadTree = function () {
            var names = [];
            for (var moduleName in apiStructure) {
                names.push(moduleName);
            }
            names.sort();
            for (var i = 0; i < names.length; i++) {
                this.addModuleNode(names[i]);
            }
        };
        Object.defineProperty(MainApiView.prototype, "treeView", {
            /**
             * Gets the treeView
             *
             * @returns {TreeView}
             */
            get: function () {
                if (!this._treeView) {
                    this._treeView = new latte.TreeView();
                    this.sideView = this._treeView;
                }
                return this._treeView;
            },
            enumerable: true,
            configurable: true
        });
        return MainApiView;
    }(latte.SplitView));
    latte.MainApiView = MainApiView;
})(latte || (latte = {}));
window['api'] = function () {
    latte.View.mainView = new latte.MainApiView();
};
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/support/ts-include/datalatte.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/support/ts-include/jquery.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/support/ts-include/latte.api.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/support/ts-include/latte.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/support/ts-include/latte.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/support/ts-include/latte.ui.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/support/ts-include/latte.ui.strings.d.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/reflection/PhpClassInfo.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/reflection/PhpFieldInfo.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/reflection/PhpMethodInfo.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/reflection/ReflectionInfo.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/reflection/TsPropertyInfo.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/reflection/TsClassInfo.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/reflection/TsEventInfo.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/reflection/TsFieldInfo.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/reflection/TsMethodInfo.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/views/ApiDetailView.ts" />
/// <reference path="/Users/josemanuel/Sites/Latte/latte/latte.api/ts/views/MainApiView.ts" /> 
