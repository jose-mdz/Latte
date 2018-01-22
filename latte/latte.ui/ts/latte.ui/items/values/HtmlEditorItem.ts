module latte{
    /**
     * Html Editor. Loads the <c>rangy</c> plugin.

     For specification of <c>rangy</c> objects refer to:
     <a href="http://code.google.com/p/rangy/w/list" target=_blank>http://code.google.com/p/rangy/w/list</a>
     **/
    export class HtmlEditorItem extends ValueItem<string>{

        /**
         *
         * @param {string} s
         * @returns {string}
         */
        static clearFormattingOf(e: HTMLElement){

            let $e = $(e);

            // Remove all style
            $e.find('*').removeAttr('style');

            // By God.
            $e.find('font').removeAttr('face');

        }

        /**
         * Gets the path to rangy library
         * @returns {string}
         */
        static get rangyPath(): string {
            return _latteUrl() + '/releases/latte.ui/support/js/rangy.js';
        }

        //region Static

        static rangyLoaded: boolean = false;

        //endregion

        //region Fields
        /**
         *
         **/
        private _ready: boolean;

        /**
         * Value is stored here while not ready.
         **/
        private _valueHtml: string;

        /**
         * Points to the iframe of the editor
         **/
        iframe: JQuery;

        /**
         * Toolbar of basic commands
         **/
        toolbar: Toolbar;

        //endregion

        /**
         * Creates the editor.
         **/
        constructor(){

//            var __this = this;
            super();
            this.addClass('html-editor');

            // Elements
            this.toolbar = new Toolbar();
            this.toolbar.appendTo(this);
            this._addToolbarButtons();

            if(!HtmlEditorItem.rangyLoaded){
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = HtmlEditorItem.rangyPath;
                document.body.appendChild(script);

                HtmlEditorItem.rangyLoaded = true;
            }

        }

        //region Private Methods
        /**
         * Creates default buttons
         **/
        private _addToolbarButtons(){
            let btn = (icon, tooltip, cmd): Item =>{
                let b = new ButtonItem();
                b.icon = icon;
                b.tooltip = tooltip;
                b.click.add(() => { this.execCommand(cmd)});
                return b;
            };

            let sep = function(): Item{ return new SeparatorItem(); };

            this.toolbar.items.addArray([
                btn(LinearIcon.bold, strings.bold, HtmlEditorCommands.BOLD),
                btn(LinearIcon.italic, strings.italics, HtmlEditorCommands.ITALIC),
                sep(),
                btn(LinearIcon.text_align_left, strings.alignLeft, HtmlEditorCommands.JUSTIFY_LEFT),
                btn(LinearIcon.text_align_center, strings.alignCenter, HtmlEditorCommands.JUSTIFY_CENTER),
                btn(LinearIcon.text_align_right, strings.alignRight, HtmlEditorCommands.JUSTIFY_RIGHT),
                btn(LinearIcon.text_align_justify, strings.alignJustify, HtmlEditorCommands.JUSTIFY_FULL),
                sep(),
                btn(LinearIcon.indent_increase, strings.indent, HtmlEditorCommands.INDENT),
                btn(LinearIcon.indent_decrease, strings.outdent, HtmlEditorCommands.OUTDENT),
                sep(),
                btn(LinearIcon.menu, strings.numberedList, HtmlEditorCommands.INSERT_ORDERED_LIST),
                btn(LinearIcon.list, strings.bulletList, HtmlEditorCommands.INSERT_UNORDERED_LIST),
                sep(),
                btn(LinearIcon.highlight, strings.eraseFormat, HtmlEditorCommands.CLEAR_FORMAT),
                sep(),
                btn(LinearIcon.text_format, strings.insertLink, HtmlEditorCommands.INSERT_LINK),
                btn(LinearIcon.picture, strings.insertImage, HtmlEditorCommands.INSERT_IMAGE)
            ]);

        }

        /**
         *
         **/
        private _assignElementHandlers(){


            if(this._mustInit()) return;

            var __this = this;

            this.body()
                .find('img')
                .unbind('.editor')
                .bind('click.editor', function(){
                    // Image click selects image
                    __this.selectElement($(this));

                    __this.onImageSelected($(this));
                })
                .bind('load.editor', function(){
                    __this.onLayout();
                })
                .each(function(){
                    if(this.complete){
                        __this.onLayout();
                    }
                });


            //log("Images: %s", this.body().find('img').length)

        }

        /**
         * Returns a value indicating if the editor can be initialized.
         It can be initialized when its attached to the DOM.
         **/
        private _canInit(): boolean{

            return this.element.parents(':last').is('html');

        }

        /**
         * Clears all formatting in editor
         **/
        _clearFormatting(){

            HtmlEditorItem.clearFormattingOf(this.body().get(0));

            // this.body().find('*').removeAttr('style');
            //
            // // Ugly <font> tags
            // this.body().find('font').removeAttr('face');

        }

        /**
         * Tries to convert the passed object to a node
         **/
        private _ensureNode(obj: any): Element{


            if(window['rangy'] && !rangy.initialized){
                rangy.init();
            }

            if(_isString(obj)){
                return jQuery(obj).get(0);
            }else if(obj instanceof jQuery){
                return obj.get(0);
            }else{
                if(typeof Element == 'undefined'){
                    return obj;
                }else{
                    if(obj instanceof Element){
                        return obj;
                    }else{
                        throw new InvalidArgumentEx('obj');
                    }
                }
            }

        }

        /**
         * Tries to get the editor ready. Returns if control is ready after call.
         **/
        private _ensureReady(){

            if(this._mustInit()){
                this._initEditor();
            }

            return this.ready();

        }

        /**
         * Initializes the editor, if possible.
         **/
        private _initEditor(){


            // Check if init needed
            if(this._mustInit()){

                // Set ready flag as false
                this._ready = false;

                // If can't initialize, bye.
                if(!this._canInit()){
                    return;
                }
            }else{

                // No need to init
                return;
            }

            var __this = this;

            // Remove previous iframe
            if(this.iframe instanceof jQuery) this.iframe.remove();

            if(window['rangy']) rangy.init();

            // Create iframe
            this.iframe = $('<iframe>').attr({frameborder: 0}).appendTo(this.element);

            // Insert editable content into the iframe
            this.document().open();
            this.document().write('<html><head>');
            this.document().write('<link rel=stylesheet href="' + $('link').attr('href') + '">');
            this.document().write('</head>');
            this.document().write('<body class=html-editor contenteditable=true></body>');
            this.document().write('</html>');
            this.document().close();
            this._ready = true;

            // If some value existed, re-assign it.
            if(this._valueHtml){
                this.body().html(this._valueHtml);
                this._assignElementHandlers();
                this.onLayout();
            }

            this.body()
                .css({
                    minHeight: 20,
                    overflow: 'hidden',
                    fontFamily: this.element.css('font-family'),
                    fontSize: 14 //this.element.css('font-size')
                })
                .focus(function(){__this.onFocused()})
                .blur(function(){__this.onBlur()})
                .click(function(){__this.onSelectionChanged()})
                .keyup(function(){__this._valueHtml = $(this).html(); __this.onSelectionChanged(); __this.onValueChanged()})
                .change(function(){__this._valueHtml = $(this).html(); __this.onValueChanged()});

            this.body().get(0).addEventListener('paste', e =>{
                setTimeout(() => this._clearFormatting(), 100);
            })

        }

        /**
         * Shows a dialog to insert HTML
         **/
        private _insertHTML(){


//            var __this = this;
            var txt = new TextboxItem();
            var d = new DialogView();

            txt.multiline = true;
            txt.css({margin: 20});
            txt.input.css({minHeight: 100});
            txt.setRelativeWidth('100%');

            d.title = strings.insertHTML;
            d.view = (new ItemView(txt));
            d.addOkButton(()=>{
                this.insertElement($('<div class=cms-html-insert>').html(txt.value));
            });

            d.show();


        }

        /**
         * Inserts an image, asking for the URL
         **/
        private _insertImage(value: string = ''){

            var url = _isString(value) ? value : prompt(strings.imageUrl, 'http://');

            if(!url) return;

            var elem = $('<img>').attr('src', url);

            this.insertElement(elem);

        }

        /**
         * Inserts a link, asking for the Url
         **/
        private _insertLink(){

            var url = prompt(strings.linkUrl, 'http://');

            if(!url) return;

            var elem = $('<a>').attr({
                href: url,
                target: '_blank'
            });

            if(this.selection.isCollapsed){
                elem.text(url);
                this.insertElement(elem);
            }else{
                this.surroundSelectionWith(elem);
            }


        }

        /**
         * Shows a dialog to insert a YouTube video
         **/
        private _insertYouTube(){


            var __this = this;
            var txt = new TextboxItem();
            var d = new DialogView();

            txt.css({margin: 20});
            txt.setRelativeWidth('100%');
            txt.placeholder = strings.videoURL;

            d.title = strings.insertYouTube;
            d.view = (new ItemView(txt));
            d.addOkButton(function(){

                var videoId = txt.value.split('v=')[1];
                var ampersandPosition = videoId.indexOf('&');

                if(ampersandPosition != -1) {
                    videoId = videoId.substring(0, ampersandPosition);
                }

                if (videoId) {

                    var iframe = $('<iframe width="420" height="345" frameborder="0" allowfullscreen />').attr({
                        src: 'http://www.youtube.com/embed/' + videoId
                    });

                    __this.insertElement($('<div class=cms-html-youtube>').append(iframe));
                }else{
                    alert(strings.urlNotYouTube);
                }

            });

            d.show();


        }

        /**
         * Returns a value indicating if editor must be initialized.
         It happens every time its dettached from DOM.
         **/
        private _mustInit(): boolean{

            try{
                return (this.ready() && !this.body().hasClass('html-editor'))
                    || !this.ready();
            }catch(e){
                return true;
            }

        }
        //endregion

        //region Methods
        /**
         * Gets the body of the iframe
         **/
        body(): JQuery{

            return this.iframe.contents().find('body');

        }

        /**
         * Gets the JavaScript document's object of iframe.
         **/
        document(): Document{


            // Raw IFRAME element
            var iframe = this.iframe.get(0);

            // Send document object
            return iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow.document || iframe.document);

        }

        /**
         * Executes the specified command
         **/
        execCommand(command: string, value: any = null){


            if(!this._ensureReady())
                throw new InvalidCallEx();

            switch(command){
                case HtmlEditorCommands.BOLD:
                case HtmlEditorCommands.FORMAT_BLOCK:
                case HtmlEditorCommands.INDENT:
                case HtmlEditorCommands.INSERT_ORDERED_LIST:
                case HtmlEditorCommands.INSERT_UNORDERED_LIST:
                case HtmlEditorCommands.ITALIC:
                case HtmlEditorCommands.JUSTIFY_CENTER:
                case HtmlEditorCommands.JUSTIFY_FULL:
                case HtmlEditorCommands.JUSTIFY_LEFT:
                case HtmlEditorCommands.JUSTIFY_RIGHT:
                case HtmlEditorCommands.OUTDENT:
                case HtmlEditorCommands.SUB_SCRIPT:
                case HtmlEditorCommands.SUPER_SCRIPT:
                case HtmlEditorCommands.UNDERLINE:
                    this.document().execCommand(command, false, value);
                    break;
                case HtmlEditorCommands.CLEAR_FORMAT:
                    this._clearFormatting();
                    break;
                case HtmlEditorCommands.INSERT_IMAGE:
                    this._insertImage(value);
                    break;
                case HtmlEditorCommands.INSERT_LINK:
                    this._insertLink();
                    break;
                case HtmlEditorCommands.CODE:
                    this.surroundSelectionWith($('<code>'));
                    break;
                case HtmlEditorCommands.INSERT_HTML:
                    this._insertHTML();
                    break;
                case HtmlEditorCommands.INSERT_YOUTUBE:
                    this._insertYouTube();
                    break;
            }

            this.onValueChanged();


        }

        /**
         *
         **/
        getValue(): string{

            if(!this._mustInit()){
                return this.body().html() || "";
            }else{
                return this._valueHtml || "";
            }

        }

        /**
         * Inserts the specified node at the currently selected range.
         Returns the inserted node, or <c>null</c> if not possible.
         **/
        insertElement(element: any): JQuery{


            var range = this.selectionRange;

            if(range){
                var actualElement = this._ensureNode(element);

                range.insertNode(actualElement);

                this.onValueChanged();
                this._assignElementHandlers();

                return jQuery(actualElement);
            }

            return null;

        }

        /**
         * Raises the <c>imageSelected</c> event
         */
        onImageSelected(image: JQuery){
            if(this._imageSelected){
                return this._imageSelected.raise(image);
            }
        }

        /**
         * Overriden.
         **/
        onLayout(){

            super.onLayout();

            if(this._ensureReady()){

                // Height that editor should be
                var shouldHeight = this.body().get(0).scrollHeight + (this.toolbar.visible ? this.toolbar.height : 0);

//            if(this.element.height() < shouldHeight){
                this.element.height(shouldHeight);
//            }

//            if(this.iframe.height() < shouldHeight){
                this.iframe.css('height', this.body().get(0).scrollHeight);

                //log(`scrollHeight ${ this.body().get(0).scrollHeight}`);
                //log(this.body().get(0));

                if(!window['b'])
                window['b'] = this.body().get(0)
//            }
            }

        }

        /**
         * Raises the <c>selectionChanged</c> event.
         **/
        onSelectionChanged(){

            this.selectionChanged.raise();

            // Retrieve selection for inspection
            var sel = this.selectionRange;

            // If something selected
            if(sel){

                // Node where selection starts
                var start = $(sel.startContainer);

            }


        }

        /**
         * Overriden.
         **/
        onValueChanged(){

            this.onLayout();
            super.onValueChanged();

        }

        /**
         * Gets a value indicating if the editor is ready to be used as editor.
         While the editor is not ready, all data will be displayed in a non-editable element.
         **/
        ready(): boolean{

            return this._ready;

        }

        /**
         * Selects the specified element and returns it as a jQuery object.
         **/
        selectElement(element: any): JQuery{

            var el = this._ensureNode(element);

            var range = rangy.createRange();

            range.selectNode(el);

            var sel = rangy.getSelection();

            sel.setSingleRange(range);

            this.onSelectionChanged();

            return jQuery(element);

        }

        /**
         * Selects the contents of the specified node and returns the element as a jQuery object.
         **/
        selectElementContents(element: any): JQuery{


            // Get element to select
            element = this._ensureNode(element);

            // Create a new range
            var range = rangy.createRange();

            // Select contents of node
            range.selectNodeContents(element);

            // Get selection
            var sel = rangy.getSelection();

            // Set range of selection
            sel.setSingleRange(range);

            // selection changed
            this.onSelectionChanged();

            return jQuery(element);

        }

        /**
         * Gets the element where selection ends.
         **/
        selectionEnd(): JQuery{


            var sel = this.selectionRange;

            if (sel) {

                return $(sel.endContainer.parentElement);

            }

            return null;


        }

        /**
         * Returns the parent of selection, passing the specified <c>selector</c>
         to the jQuery <c>parents()<c> method.
         **/
        selectionParents(selector: string = ''): JQuery{


            var range = this.selectionRange;

            if(range){
                var container = jQuery(range.startContainer);

                return container.parents(selector);
            }

            return null;

        }

        /**
         * Gets the element where selection starts.
         **/
        selectionStart(): JQuery{


            var sel = this.selectionRange;

            if (sel) {

                return $(sel.startContainer.parentElement);

            }

            return null;


        }

        /**
         * Override.
         **/
        setValue(value: string){

            value = value || '';

            this._valueHtml = value;

            // Update editable if possible
            if(this._ensureReady()){
                this.body().html(value);
                this._assignElementHandlers();
                this.onLayout();
            }

        }

        /**
         * Surrounds selected contents with specified element, and returns the
         attached element as a jQuery object.
         **/
        surroundSelectionWith(element: any): JQuery{

            element = this._ensureNode(element);

            var savedSel = rangy.saveSelection(this.window);
            var range = this.selectionRange;

            if(range){

                if(!range.canSurroundContents()){
                    return null;
                }

                range.surroundContents(element);
                rangy.restoreSelection(savedSel);

                this.onValueChanged();
            }

            return jQuery(element);

        }
        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _selectionChanged: LatteEvent;

        /**
         * Gets an event raised when the selection of the editor changes
         *
         * @returns {LatteEvent}
         */
        get selectionChanged(): LatteEvent{
            if(!this._selectionChanged){
                this._selectionChanged = new LatteEvent(this);
            }
            return this._selectionChanged;
        }

        /**
         * Back field for event
         */
        private _imageSelected: LatteEvent;

        /**
         * Gets an event raised when an image in the editor is selected
         *
         * @returns {LatteEvent}
         */
        get imageSelected(): LatteEvent{
            if(!this._imageSelected){
                this._imageSelected = new LatteEvent(this);
            }
            return this._imageSelected;
        }

        //endregion

        //region Properties
        /**
         * Gets the current selection
         **/
        get selection(): RangySelection{


            if(window['rangy'] && !rangy.initialized){
                rangy.init();
            }

            //return rangy.getIframeSelection(this.iframe.get(0));
            return rangy.getSelection();

        }

        /**
         * Gets the range of selection. Returns <c>null</c> if no current selection.
         **/
        get  selectionRange(): RangyRange{


            var sel = this.selection;

            if(!sel.rangeCount)
                return null;

            return this.selection.getRangeAt(0);

        }

        /**
         * Gets or sets the source html
         */
        get value(): string{
            return this.getValue();
        }

        /**
         * Gets or sets the source html
         */
        set value(value: string){
            this.setValue(value);
        }

        /**
         * Gets the Window of the iframe
         **/
        get window(){

            return this.iframe.get(0).contentWindow;

        }
        //endregion


    }
}