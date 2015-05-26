/**
 * Created by josemanuel on 5/12/14.
 */
module latte {

     class NodeAnimation{

        /**
         * Animation
         */
        animation: Animation;

         /**
          * Callback to execute after animation is completed
          */
        callback: () => void;

        /**
         * Current frame
         */
        frame: number;

        /**
         * Initial state of the animation
         */
        initialState: any;

        /**
         * Key of animation
         */
        key: string;

        /**
         * Node being animated
         */
        node: DrawingNode;


        constructor(node: DrawingNode, animation: Animation, key: string, callback: () => void){
            this.node = node;
            this.callback = callback;
            this.frame = 0;
            this.animation = animation;
            this.running = true;
            this.initialState = animation.getInitialState(node);
            this.key = key;
        }

         /**
          * Property field
          */
         private _running:boolean = false;

         /**
          * Gets or sets a value indicating if the animation is currently running
          *
          * @returns {boolean}
          */
         public get running():boolean {
             return this._running;
         }

         /**
          * Gets or sets a value indicating if the animation is currently running
          *
          * @param {boolean} value
          */
         public set running(value:boolean) {

             var wasRunning = this._running;

             this._running = value;

             if(wasRunning && !value && this.callback) {
                 this.callback.call(this);
             }
         }
    }

    /**
     *
     */
    export class DrawingNode extends DrawingElement {

        //region Static
        //endregion

        //region Fields
        private originalLocation: Point = null;
        private originalOpacity: number = 0;
        private originalPivot: Point = null;
        private originalScale: Size = null;
        private animations: NodeAnimation[] = [];
        //endregion

        /**
         *
         */
        constructor() {
            super();
        }

        //region Private Methods

        /**
         * Removes the ended animations from array
         */
        private clearEndedAnimations(){
            var arr: NodeAnimation[] = [];

            for (var i = 0; i < this.animations.length; i++) {
                var nodeAnimation:NodeAnimation = this.animations[i];

                if(nodeAnimation.running) {
                    arr.push(nodeAnimation);
                }
            }

            this.animations = arr;
        }

        /**
         * Gets the animation by the specified key
         * @param key
         * @returns {*}
         */
        private getNodeAnimationByKey(key: string): NodeAnimation{

            for (var i = 0; i < this.animations.length; i++) {
                var nodeAnimation:NodeAnimation = this.animations[i];

                if(nodeAnimation.key == key) {
                    return nodeAnimation
                }
            }

            return null;
        }

        //endregion

        //region Methods

        /**
         * Flushes the toilet after drawing
         * @param c
         */
        afterDraw(c: DrawingContext){



            // Rotation
            if(this.angle != 0) {

                // Return to original angle
                c.context.rotate(-this.angle);

                // Return to original location
                this.location = this.originalLocation;
                this.originalLocation = null;

                // Return translation of context
                c.context.translate(-this.originalPivot.x, -this.originalPivot.y);
                this.originalPivot = null;
            }

            // Opacity
            c.context.globalAlpha = this.originalOpacity;
        }

        /**
         * Prepares context for drawning
         * @param c
         */
        beforeDraw(c: DrawingContext){

            this.originalLocation = this.location;

            // Get pivot for rotation
            var p = this.originalPivot = this.getRotationPoint();

            // Rotation
            if(this.angle != 0) {

                // Translate to pivot
                c.context.translate(p.x, p.y);

                // Rotate to angle
                c.context.rotate(this.angle);

                // Translate me to point
//                this.location = new Point(-this.width/2, -this.height/2);
                this.location = new Point(this.left - p.x, this.top - p.y);

            }

            // Opacity
            this.originalOpacity = c.context.globalAlpha;
            c.context.globalAlpha *= this.opacity;

        }

        /**
         * Override
         * @param c
         */
        draw(c: DrawingContext){
            super.draw(c);
        }

        /**
         * Performs a complete draw with preparation and toilet flush
         * @param c
         */
        completeDraw(c: DrawingContext){

            // Prepare draw
            this.beforeDraw(c);

            // Draw
            this.draw(c);

            // Recursively draw children
            for (var i = 0; i < this.nodes.length; i++) {
                var drawingNode:DrawingNode = this.nodes[i];

                if(!drawingNode.hidden){
                    drawingNode.completeDraw(c);
                }

            }

            // Flush the toilet
            this.afterDraw(c);
        }

        /**
         * Gets the rotation point. Override to specify point. Center by default.
         * @returns {Point}
         */
        getRotationPoint(): Point{
            return this.center;
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
         * Gets the nodes of the specified type.
         * Additionally deep might be specified to search internally.
         * @param type
         * @returns {DrawingNode[]}
         */
        getNodesByType(type: Function, deep: boolean = false){
            var nodes: DrawingNode[] = [];

            for (var i = 0; i < this.nodes.length; i++) {
                var drawingNode:DrawingNode = this.nodes[i];

                if(drawingNode instanceof type) {
                    nodes.push(drawingNode);
                }

                if (deep) {
                    var sub = drawingNode.getNodesByType(type);

                    if (sub.length) {
                        nodes = nodes.concat(sub);
                    }
                }
            }

            return nodes;
        }

        /**
         * Gets a value indicating if item is running an animation of the specified key
         * @param key
         * @returns {Animation|any}
         */
        isRunningAnimationOfKey(key: string){
            var a: NodeAnimation = this.getNodeAnimationByKey(key);

            return a && a.running;
        }

        /**
         * Called when a node is added
         * @param node
         */
        onNodeAdded(node: DrawingNode){
            node.parent = this;
            node.scene = this.scene;
        }

        /**
         * Called when a node is removed
         * @param node
         */
        onNodeRemoved(node: DrawingNode){

        }

        /**
         * Runs the specified animation
         * @param a
         */
        runAnimation(a: Animation, callback: () => void = null ){
            this.runAnimationWithKey(a, null, callback)
        }

        /**
         * Runs the specified animation by using the specified key
         * @param a
         * @param key
         */
        runAnimationWithKey(a: Animation, key: string, callback: () => void = null){
            this.animations.push(new NodeAnimation(this, a, key, callback));
        }

        /**
         * Stops all running animations
         */
        stopAnimations(){
            this.animations = [];
        }

        /**
         * Stops the animation of the specified key
         * @param key
         */
        stopAnimation(key: string){
            var a: NodeAnimation = this.getNodeAnimationByKey(key);

            if(a && a.running) {
                a.running = false;
                this.clearEndedAnimations();
            }
        }

        /**
         * Override
         */
        update(){
            super.update();

            var mustClean = false;

            for (var i = 0; i < this.animations.length; i++) {

                var nodeAnimation:NodeAnimation = this.animations[i];

                if(nodeAnimation.running) {
                    nodeAnimation.animation.onUpdate(this, nodeAnimation.frame++, nodeAnimation.initialState);

                    if(nodeAnimation.frame > nodeAnimation.animation.frames) {
                        nodeAnimation.running = false;
                        mustClean = true;
                    }
                }

            }

            if(mustClean) {
                this.clearEndedAnimations();
            }
        }

        //endregion

        //region Events
        //endregion

        //region Properties

        /**
         * Gets a value indicating if the node is currently being animated
         *
         * @returns {boolean}
         */
        public get animating():boolean {

            for (var i = 0; i < this.animations.length; i++) {
                var nodeAnimation:NodeAnimation = this.animations[i];

                if(nodeAnimation.running) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Property field
         */
        private _angle:number = 0;

        /**
         * Gets or sets the rotation angle of the node
         *
         * @returns {number}
         */
        public get angle():number {
            return this._angle;
        }

        /**
         * Gets or sets the rotation angle of the node
         *
         * @param {number} value
         */
        public set angle(value:number) {
            this._angle = value;
        }

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

        /**
         * Property field
         */
        private _opacity:number = 1;

        /**
         * Gets or sets the opacity of the node
         *
         * @returns {number}
         */
        public get opacity():number {
            return this._opacity;
        }

        /**
         * Gets or sets the opacity of the node
         *
         * @param {number} value
         */
        public set opacity(value:number) {
            this._opacity = value;
        }

        /**
         * Property field
         */
        private _parent:DrawingNode = null;

        /**
         * Gets or sets the parent node of this node, if any. If null, node is directly under the scene order.
         *
         * @returns {DrawingNode}
         */
        public get parent():DrawingNode {
            return this._parent;
        }

        /**
         * Gets or sets the parent node of this node, if any. If null, node is directly under the scene order.
         *
         * @param {DrawingNode} value
         */
        public set parent(value:DrawingNode) {
            this._parent = value;
        }

        /**
         * Property field
         */
        private _scene:DrawingScene = null;

        /**
         * Gets or sets the scene where the node lives
         *
         * @returns {DrawingScene}
         */
        public get scene():DrawingScene {
            return this._scene;
        }

        /**
         * Gets or sets the scene where the node lives
         *
         * @param {DrawingScene} value
         */
        public set scene(value:DrawingScene) {
            this._scene = value;

            for (var i = 0; i < this.nodes.length; i++) {
                var node:DrawingNode = this.nodes[i];
                node.scene = value;
            }
        }

        //endregion

    }

}