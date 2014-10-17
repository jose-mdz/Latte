/**
 * Created by josemanuel on 5/12/14.
 */
module latte {

    /**
     *
     */
    export class DrawingScene extends DrawingElement {

        //region Static
        //endregion

        //region Fields

        /**
         * Holds pointers to the nodes where mouse is currently hovering,
         * in order to provide mouse enter and mouse leave events
         * @type {Array}
         */
        private mouseHovers: DrawingClickable[] = [];

        //endregion

        /**
         *
         */
        constructor() {
            super();
        }

        //region Private Methods

        /**
         * Adds the node to the hoverList
         * @param d
         */
        addToHoverList(d: DrawingClickable){
            d.mouseHovering = true;
            d.onMouseEnter();
            this.mouseHovers.push(d);
        }

        /**
         * Returns a value indicating if the node is in the hoverList
         * @param d
         * @returns {boolean}
         */
        inHoverList(d: DrawingClickable): boolean{

            for (var i = 0; i < this.mouseHovers.length; i++) {
                var node:DrawingClickable = this.mouseHovers[i];

                if(node === d) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Removes the node from the hoverList
         * @param d
         */
        removeFromHoverList(d: DrawingClickable){
            var list: DrawingClickable[] = [];

            for (var i = 0; i < this.mouseHovers.length; i++) {
                var node:DrawingClickable = this.mouseHovers[i];

                if(node === d) {
                    d.mouseHovering = false;
                    d.onMouseLeave();
                }else {
                    list.push(node);
                }
            }

            this.mouseHovers = list;
        }

        //endregion

        //region Methods

        /**
         * Called on Mouse Double Click
         */
        doubleClick(p: Point, button: number){

            var clickables: DrawingClickable[] = this.getNodesByType(DrawingClickable, true);

            if(clickables.length) {
                for (var i = 0; i < clickables.length; i++) {
                    var node:DrawingClickable = clickables[i];

                    if(node.containsPoint(p)) {
                        node.onDoubleClick(p, button);
                    }
                }
            }

        }

        /**
         * Called while drag-drop operation ongoing on scene
         * @param e
         */
        dragOver(p: Point, e: Event){
        }

        /**
         * Called when drag-drop operation ended on scene
         * @param e
         */
        dragEnd(p: Point, e: Event){
        }

        /**
         * Called when drag-drop operation started on scene
         * @param e
         */
        dragStart(p: Point, e: Event){
        }

        /**
         * Called when something dropped on the scene
         * @param e
         */
        drop(p: Point, e: Event){
        }

        /**
         * Draws the layer
         * @param c
         */
        draw(c: DrawingContext){
            super.draw(c);

            if(!this.hidden) {
                for (var i = 0; i < this.nodes.length; i++) {
                    var n:DrawingNode = this.nodes[i];

                    if(!n.hidden) {
                        n.completeDraw(c);
                    }
                }
            }
        }

        /**
         * Gets the first matched node at specified point
         * @param p
         * @returns {*}
         */
        getNodeAtPoint(p: Point){
            for (var i = this.nodes.length - 1; i >= 0; i--) {
                var drawingNode:DrawingNode = this.nodes[i];
                if(drawingNode.containsPoint(p) && !drawingNode.hidden) {
                    return drawingNode;
                }
            }
            return null;
        }

        /**
         * Gets nodes at specified point
         * @param p
         * @returns {Array}
         */
        getNodesAtPoint(p: Point, deep: boolean = false): DrawingNode[]{
            var nodes = [];

            for (var i = this.nodes.length - 1; i >= 0; i--) {
                var drawingNode:DrawingNode = this.nodes[i];
                if(drawingNode.containsPoint(p)) {
                    nodes.push(drawingNode);
                }

                if(deep) {
                    var sub = drawingNode.getNodesAtPoint(p, deep);

                    if(sub.length) {
                        nodes = nodes.concat(sub);
                    }
                }
            }

            return nodes;
        }

        /**
         * Gets the nodes of a specified type
         * @param type
         * @returns {Array}
         */
        getNodesByType(type: Function, deep: boolean = false){
            var nodes = [];

            for (var i = this.nodes.length - 1; i >= 0; i--) {
                var drawingNode:DrawingNode = this.nodes[i];
                if(drawingNode instanceof type) {
                    nodes.push(drawingNode);
                }

                if(deep) {
                    var sub = drawingNode.getNodesByType(type, deep);

                    if(sub.length) {
                        nodes = nodes.concat(sub);
                    }
                }
            }


            return nodes;
        }

        /**
         * Called on key down
         * @param keyCode
         * @param metaKey
         */
        keyDown(keyCode: number, metaKey: any){

        }

        /**
         * Called on key down
         * @param keyCode
         * @param metaKey
         */
        keyUp(keyCode: number, metaKey: any){

        }

        /**
         * Called on Mouse Down
         * @param p
         * @param button
         */
        mouseDown(p: Point, button: number){

            var clickables: DrawingClickable[] = this.getNodesByType(DrawingClickable, true);

            if(clickables.length) {
                for (var i = clickables.length - 1; i >= 0; i--) {
                    var node:DrawingClickable = clickables[i];

                    if(node.hidden) continue;

                    if(node.containsPoint(p)) {
                        node.onMouseDown(p, button);
                        break;
                    }
                }
            }

        }

        /**
         * Called on Mouse Move
         * @param p
         */
        mouseMove(p: Point){
            var clickables: DrawingClickable[] = this.getNodesByType(DrawingClickable, true);

            if(clickables.length) {
                for (var i = clickables.length - 1; i >= 0; i--) {
                    var node:DrawingClickable = clickables[i];

                    if(node.hidden) continue;

                    if(node.draggable && node.mouseIsDown) {
                        node.location = new Point(p.x + node.dragOffset.x, p.y + node.dragOffset.y);
                        node.onDragged();
                    }

                    if(node.containsPoint(p)) {
                        node.onMouseMove(p, 0);

                        if(!this.inHoverList(node)) {
                            this.addToHoverList(node);
                        }

                    }else {

                        if(this.inHoverList(node)) {
                            this.removeFromHoverList(node);
                        }

                    }

                }
            }else if(this.mouseHovers.length > 0){
                for (var i = 0; i < this.mouseHovers.length; i++) {
                    var node:DrawingClickable = this.mouseHovers[i];

                    node.mouseHovering = false;
                    node.onMouseLeave();
                }

                this.mouseHovers = [];
            }
        }

        /**
         * Called on Mouse Up
         * @param p
         * @param button
         */
        mouseUp(p: Point, button: number){
            var clickables: DrawingClickable[] = this.getNodesByType(DrawingClickable, true);

            if(clickables.length) {
                for (var i = clickables.length - 1; i >= 0; i--) {
                    var node:DrawingClickable = clickables[i];

                    if(node.hidden) continue;

                    if(node.draggable) {
                        node.onMouseUp(p, button);
                    }

                    if(node.containsPoint(p)) {
                        node.onMouseUp(p, button);
                        if(node.mouseHovering){
                            node.onClick(p, button);
                            break;
                        }

                    }
                }
            }
        }

        /**
         * Called on Mouse Wheel
         * @param p
         * @param delta
         */
        mouseWheel(p: Point, delta: number){
            var clickables: DrawingClickable[] = this.getNodesByType(DrawingClickable, true);

            if(clickables.length) {
                for (var i = 0; i < clickables.length; i++) {
                    var node:DrawingClickable = clickables[i];

                    if(node.hidden) continue;

                    if(node.containsPoint(p)) {
                        node.onMouseWheel(p, delta);
                    }
                }
            }
        }

        /**
         * Called when a node is added
         * @param node
         */
        onNodeAdded(node: DrawingNode){
            node.scene = this;
        }

        /**
         * Called when a node is removed
         * @param node
         */
        onNodeRemoved(node: DrawingNode){

        }

        /**
         * Updates the layer
         */
        update(){
            super.update();

            if(!this.paused) {

                for (var i = 0; i < this.nodes.length; i++) {
                    var n:DrawingNode = this.nodes[i];

                    if(!n.paused) {
                        n.update();
                    }
                }
            }
        }
        //endregion

        //region Events
        //endregion

        //region Properties

        /**
         * Field for nodes property
         */
        private _nodes:Collection<DrawingNode>;

        /**
         * Gets the nodes of the scene
         *
         * @returns {Collection<DrawingNode>}
         */
        public get nodes():Collection<DrawingNode> {
            if (!this._nodes) {
                this._nodes = new Collection<DrawingNode>(
                    (node, index) => { this.onNodeAdded(node) },
                    (node, index) => { this.onNodeRemoved(node) }
                );
            }
            return this._nodes;
        }


        //endregion

    }

}