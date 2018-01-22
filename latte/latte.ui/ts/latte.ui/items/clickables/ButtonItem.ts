module latte{
    /**
     * Renders a clickable button.

     Button may obtain different render modes, sub items who are shown in a
     contextual menu and react to its icon size.
     **/
    export class ButtonItem extends ClickableItem{

        /**
         * Name of default glyph of buttons. This name must match a method name
         in the <c>Glyph</c> class.
         **/
        static defaultGlyph: string = 'down';

        /**
         *
         **/
        private _dropdownVisible: boolean;

        /**
         *
         **/
        private _glyph: IconItem;

        /**
         *
         **/
        private _itemsEdge: Side;

        /**
         *
         **/
        private _itemsMenu: MenuOverlay;

        /**
         *
         **/
        private _itemsSide: Side;

        /**
         *
         **/
        private _split: boolean;

        /**
         *
         **/
        private _willLoadItems: boolean;

        /**
         * Clickable element where dropdown is shown
         **/
        private _dropdown: ClickableItem;

        /**
         * Sub-Items of this item. These items are shown in a <c>MenuOverlay</c> element.
         **/
        items: Collection<Item>;

        /**
         * Label inside button. It supports the <c>icon</c>, <c>text()</c> and <c>description</c>
         properties, among other features.
         **/
        label: LabelItem;

        /**
         * Raised when items are about to be shown
         **/
        loadItems: LatteEvent;

        /**
         * Raised when the items are shown
         **/
        itemsShown: LatteEvent;

        /**
         * Creates the button
         **/
        constructor(text: string = '', icon: IconItem = null, click: Function = null, tab: any = null){


            // Init
            super();
            this.element.addClass('button');
            UiElement.disableTextSelection(this.element);

            // Init collection
            this.items = new Collection<Item>(this._onAddItem, this._onRemoveItem, this);

            // Init Events
            this.loadItems = new LatteEvent(this);
            this.itemsShown = new LatteEvent(this);

            // Init Elements
            this.label = new LabelItem();
            this.label.appendTo(this);

            this.element.clear();

            this.itemsEdge = Side.AUTO;
            this.itemsSide = Side.AUTO;
            this.direction = Direction.HORIZONTAL;
            this.split = false;

            // Patch for split case
            this.element.hover( () => {
                if(this.split && !this.faceVisible){
                    this.element.addClass('with-face');
                    this.dropdown.element.addClass('with-face');
                }
            }, () => {

                if(this.split && this.contextAt == null){
                    this.element.removeClass('with-face');
                    this.dropdown.element.removeClass('with-face');
                    this.dropdown.setSelected(false, true);
                }
            });

            this.label.descriptionChanged.add(()=>{this._updateLabelFlag()});
            this.label.iconChanged.add(()=>{this._updateLabelFlag()});
            this.label.textChanged.add(()=>{this._updateLabelFlag()});

            this.text = text;
            this.icon = icon;
            if(click) this.click.add(click);
            this.tab = tab;
        }

        /**
         * Handles drop down click
         **/
        private _dropdownClick(){


            if(this.dropdownVisible && !this.split){
                this.onClick();
            }

            if(this.split){
                this._showOrHideItems();
            }

        }

        /**
         * Handles dropdown pressedChanged
         **/
        private _dropdownPressedChanged(){



        }

        /**
         * Handles dropdown selectedChanged
         **/
        private _dropdownSelectedChanged(){

            if(this.dropdownVisible && this.selected && !this.dropdown.selected){
                this.dropdown.selected = true;
            }

            if(this.split){
                this.setSelected(!this.dropdown.selected, true);
            }

        }

        /**
         * Handles item add
         **/
        private _onAddItem(item: Item){


            // If indeterminate dropdown visiblitiy
            if(this.dropdownVisible !== false){

                // Make dropdown visible
                this.dropdownVisible = true;

                // Assign default glyph
                if(this.glyph == null){
                    this.glyph = Glyph[ButtonItem.defaultGlyph];
                }
            }

            this.clickPropagation = false;

        }

        /**
         * Handles item remove
         **/
        private _onRemoveItem(item: Item){



        }

        /**
         * Alternates between items visibility
         **/
        private _showOrHideItems(){

            if(this.showingItems)
                this.hideItems();
            else
                this.showItems();

        }

        /**
         * Updates edges of dropdown clickable
         **/
        private _updateDropdownProperties(){


            var openSide = this.direction == Direction.VERTICAL ?
                Side.TOP : Side.LEFT;

            this.dropdown.flatSide = openSide;

            if(this.split){
                this.dropdown.openSide = null;
            }else{
                this.dropdown.openSide = openSide;
            }


        }

        /**
         * Checks for the formatting CSS flags
         **/
        private _updateLabelFlag(){


            if(!this.label.icon){
                this.element.addClass('no-icon');
            }else{
                this.element.removeClass('no-icon');
            }

        }

        private createDropdownButton(){

            // Initialize properties
            this._dropdown = new ClickableItem()
            this._dropdown.appendTo(this);
            this._dropdown.visible = false;
            this._dropdown.clickPropagation  = false;

            // Wire events
            this._dropdown.selectedChanged.add(() => {this._dropdownSelectedChanged()});
            this._dropdown.pressedChanged.add(()=>{this._dropdownPressedChanged()});
            this._dropdown.click.add(()=>{this._dropdownClick()});
        }

        /**
         *
         **/
        getContextAt(): Side{


            if(this.split){
                return this.dropdown.contextAt;
            }else{
                return super.getContextAt();
            }


        }

        /**
         * Returns a value indicating if the button contains items or will load them eventually
         **/
        get hasItems(): boolean{

            return this.items.count > 0 || this.willLoadItems;

        }

        /**
         * Hides the MenuOverlay showing this button's items
         **/
        hideItems(){


            if(!this._itemsMenu) return;

            this.itemsMenu.close();
            this._itemsMenu = null;

            var item;

            while( (item = this.items.next()) ){
                if(item instanceof ButtonItem)
                    item.hideItems();
            }

        }

        /**
         * Overriden.
         **/
        onClick(e: MouseEvent = null){

            if(!(this.hasItems && !this.split)){
                super.onClick(e);
            }

            if(!this.split && this.hasItems){
                this._showOrHideItems();
            }


        }

        /**
         * Override.
         */
        onEnabledChanged(){
            super.onEnabledChanged();

            if(this._dropdown) {
                this.dropdown.enabled = this.enabled;
            }
        }

        /**
         * Overriden.
         **/
        onFaceVisibleChanged(){

            super.onFaceVisibleChanged();

            this.dropdown.faceVisible = this.faceVisible;


        }

        /**
         * Raises the <c>itemsShown</c> event
         **/
        onItemsShown(menuItem: MenuOverlay){

            this.itemsShown.raise(menuItem);

        }

        /**
         * Overriden.
         **/
        onPressedChanged(){

            super.onPressedChanged();

            if(this.dropdownVisible && !this.split && !this.contextAt){
                this.dropdown.pressed = this.pressed;
            }

        }

        /**
         * Overriden.
         **/
        onSelectedChanged(){

            super.onSelectedChanged();

            if(this.dropdownVisible && !this.split){
                this.dropdown.selected = this.selected;
            }

            if(this.showingItems && this.selected) {
                this.selected = false;
            }


            if(this.split){
                if(this.selected){
                    this.dropdown.element.addClass('with-face');
                }else{
                    this.dropdown.element.removeClass('with-face');
                }
            }


        }

        /**
         * Overriden.
         **/
        onWithContextChanged(){

            super.onWithContextChanged();

            if(this.dropdownVisible && !this.split){
                this.dropdown.withContext = this.withContext;
            }

        }

        /**
         *
         **/
        setContextAt(value: Side){

            if(this.split){
                this.dropdown.contextAt = value;

                if(value === null){
                    this.direction = this.direction;

                    if(!this.faceVisible){
                        this.element.removeClass('with-face');
                        this.dropdown.element.removeClass('with-face');
                        this.dropdown.setSelected(false, true);
                    }
                }
            }else{
                super.setContextAt(value);
            }

        }

        /**
         * Shows the items of the button. Optionally specifies the side and edge on which items are shown.
         **/
        showItems(side: Side = null, edge: Side = null){


            if(this.parentIsMenu){
                this.parentMenu.closeChildrenMenus();
            }else{
                MenuOverlay.closeAll();
            }

            if(!side) side = this.itemsSide;
            if(!edge) edge = this.itemsEdge;


            // Create menu
            var menu = new MenuOverlay();

            // Set menu items
            this._itemsMenu = menu;

            if(this.willLoadItems){
                this.loadItems.raise();
            }

            // Add items
            menu.items.addCollection(this.items);

            // If side set to auto
            if(side === Side.AUTO){

                // Can infere from glpyh?
                if(this.glyph && !_undef(Side[this.glyph.name.toUpperCase()])){
                    side = Side[this.glyph.name.toUpperCase()];
                }else{
                    side = Side.BOTTOM;
                }
            }

            if(this.split && !this.faceVisible){
                this.element.addClass('with-face');
            }

            // Check orientation fix
            if(side == Side.AUTO && this.split){
                edge = Side.RIGHT;
            }

            // Show relative to the control
            menu.showByItem(this, side, edge);

            // When closed, remove zIndex
            menu.closed.add(()=>{
                ZIndex.removeElement(this.element);

                if(this.split && !this.faceVisible){
                    this.element.removeClass('with-face');
                }
            });

            // Hook parent button
            menu.setParentButton(this);


            //m.bringToFront();
            //this.bringToFront();
            ZIndex.bringToFront(this.element);
            //this.element.bringToFront();

            this.onItemsShown(menu);

        }

        /**
         * Gets or sets the description of the button
         **/
        get description(): string{
            return this.label.description;
        }

        /**
         * Gets or sets the description of the button
         **/
        set description(value: string){
            this.label.description = value;
        }

        /**
         * Gets or sets the direction of the button.
         **/
        get direction(): Direction{
            return this.label.direction;
        }

        /**
         * Gets or sets the direction of the button.
         **/
        set direction(value: Direction){


            this.label.direction = value;

            if(value == Direction.VERTICAL){
                this.element.removeClass('horizontal').addClass('vertical');
            }else{
                this.element.removeClass('vertical').addClass('horizontal');
            }

            this._updateDropdownProperties();



        }

        get dropdown(): ClickableItem{

            if(!this._dropdown){
                // Initialize properties
                this._dropdown = new ClickableItem()
                this._dropdown.appendTo(this);
                this._dropdown.visible = false;
//                this._dropdown.clickPropagation  = false;

                // Wire events
                this._dropdown.selectedChanged.add(() => {this._dropdownSelectedChanged()});
                this._dropdown.pressedChanged.add(()=>{this._dropdownPressedChanged()});
                this._dropdown.click.add(()=>{this._dropdownClick()});
            }

            return this._dropdown;
        }

        /**
         * Gets or sets the visibility of the dropdown.
         When <c>null</c> dropdown will be shown automatically when items are added.
         **/
        get dropdownVisible(): boolean{
            return this._dropdownVisible;
        }

        /**
         * Gets or sets the visibility of the dropdown.
         When <c>null</c> dropdown will be shown automatically when items are added.
         **/
        set dropdownVisible(value: boolean){

            this._dropdownVisible = value;

            this.dropdown.visible = !!value;

            if(!!value){
                this.element.addClass('with-dropdown');
            }else{
                this.element.removeClass('with-dropdown');
            }
        }

        /**
         * Gets or sets the Glyph of the button. The glyph is displayed to indicate the direction on which items will be shown.
         **/
        get glyph(): IconItem{
            return this._glyph;
        }

        /**
         * Gets or sets the Glyph of the button. The glyph is displayed to indicate the direction on which items will be shown.
         **/
        set glyph(value: IconItem){


            if(value && !(value instanceof IconItem))
                throw new InvalidArgumentEx('value', value);

            this._glyph = value;

            this.dropdown.element.empty();

            if(value){
                this.dropdown.element.append(value.element);
            }



        }

        /**
         * Gets or sets the icon of the button
         **/
        get icon(): IconItem{
            return this.label.icon;
        }

        /**
         * Gets or sets the icon of the button
         **/
        set icon(value: IconItem){
            this.label.icon = value;
        }

        /**
         * Gets or sets the edge on wich items menu is shown.
         **/
        get itemsEdge(): Side{
            return this._itemsEdge;
        }

        /**
         * Gets or sets the edge on wich items menu is shown.
         **/
        set itemsEdge(value: Side){


            this._itemsEdge = value;



        }

        /**
         * Gets the MenuOverlay containing items, If currently being shown
         **/
        get itemsMenu(): MenuOverlay{

            return this._itemsMenu;

        }

        /**
         * Sets the menu containing the items.
         * SET BY CODE, you should not use this method.
         *
         * @param value
         */
        set itemsMenu(value: MenuOverlay){
            this._itemsMenu = value;
        }

        /**
         * Gets or sets the side of button where items menu is shown.
         **/
        get itemsSide(): Side{
            return this._itemsSide;
        }

        /**
         * Gets or sets the side of button where items menu is shown.
         **/
        set itemsSide(value: Side){


            this._itemsSide = value;



        }

        /**
         * Gets a boolean indicating if the items menu is currently showing
         **/
        get showingItems(): any{

            return this.itemsMenu ? true : false;

        }

        /**
         * Gets or sets a value indicating if the button is splitted.
         **/
        get split(): boolean{
            return this._split;
        }

        /**
         * Gets or sets a value indicating if the button is splitted.
         **/
        set split(value: boolean){

            this._split = value;

            if(value){
                this.element.addClass('split');
            }else{
                this.element.removeClass('split');
            }

            this._updateDropdownProperties();



        }

        /**
         * Gets or sets the text of the button
         **/
        get text(): string{
            return this.label.text;
        }

        /**
         * Gets or sets the text of the button
         **/
        set text(value: string){
            this.label.text = value;
        }

        /**
         * Gets a flag indicating if the button will load items before showing them
         **/
        get willLoadItems(): boolean{

            return _isArray(this.loadItems.handlers) && this.loadItems.handlers.length ? true : false;

        }
    }
}