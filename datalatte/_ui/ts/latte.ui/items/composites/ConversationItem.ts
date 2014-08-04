module latte{
    /**
     * Renders a conversation made of <c>CommentItem</c>s, allowing the user to add comments.
     **/
    export class ConversationItem extends Item{

        /**
         *
         **/
        private _allowNewComments: boolean = true;

        /**
         *
         **/
        private _invisible: JQuery;

        /**
         *
         **/
        private _pendentPages: number;

        /**
         * Collection of comments in conversation
         **/
        comments: Collection<CommentItem>;

        /**
         * Points to the DOM element where comments are stored.
         **/
        commentsElement: JQuery;

        /**
         * Points to the DOM element where the new comment textarea is placed.
         **/
        newCommentElement: JQuery;

        /**
         * Points to the DOM element where hidden comments text is placed.
         **/
        pendentPagesElement: JQuery;

        /**
         * Textbox for new comments
         **/
        textbox: TextboxItem;

        /**
         * Raised when a new comment is added. The text of the comment is passed as an argument.
         **/
        commentAdded: LatteEvent;

        /**
         * Raised when comments are added or removed from collection
         **/
        commentsChanged: LatteEvent;

        /**
         * Raised when the user asks for the hidden comments of conversation
         **/
        pendentPagesSolicited: LatteEvent;

        /**
         * Creates the conversation
         **/
        constructor(){
            super();

            var __this = this;

            this.element.addClass('conversation');

            // Initialize evens
            this.commentAdded = new LatteEvent(this);
            this.pendentPagesSolicited = new LatteEvent(this);
            this.commentsChanged = new LatteEvent(this);

            // Initialize collection
            this.comments = new Collection<CommentItem>(
                this._onAddComment, this._onRemoveComment, this);

            // Initialize elements
            this.pendentPagesElement = $('<div>').addClass('hidden-comments').hide().appendTo(this.element);
            this.commentsElement = $('<div>').addClass('comments').appendTo(this.element);
            this.newCommentElement = $ ('<div>').addClass('new-comment').appendTo(this.element);

            this.setTextbox(new TextboxItem());

            // Add handlers
            this.pendentPagesElement.click(function(){
                __this.onPendentPagesSolicited();
            });


        }

        //region Methods

        /**
         * Sets the textbox of the comment editor.
         * This method is useful for replacing the default textbox for a custom one.
         *
         * @param t
         */
        setTextbox(t: TextboxItem){

            var replace = !!this.textbox;
            var old = this.textbox;

            this.textbox = t;
            this.textbox.multiline = true;
            this.textbox.placeholder = strings.writeComment;
            this.textbox.appendTo(this.newCommentElement);

            if(replace) {
                old.element.replaceWith(this.textbox);
            }else {
                this.textbox.appendTo(this.newCommentElement);
            }

            this.element.clear();

            this.textbox.enterPressed.add(() => {

                if(this.ignoreEnter) {
                    return;
                }

                if(this.textbox.value.length > 0){

                    setTimeout(() => {
                        this.onCommentAdded(this.textbox.value);
                        this.textbox.value = ('');
                    }, 100);
                }
            });


        }

        //endregion

        /**
         *
         **/
        public _onAddComment(comment: CommentItem){

            this.commentsElement.append(comment.element);
            this.onCommentsChanged();

        }

        /**
         *
         **/
        private _onRemoveComment(comment: CommentItem){

            comment.element.detach();
            this.onCommentsChanged();

        }

        /**
         * Raises the <c>commentAdded</c> event
         **/
        onCommentAdded(text: string): boolean{

            return this.commentAdded.raise(text);

        }

        /**
         *
         **/
        onCommentsChanged(){
            this.commentsChanged.raise();
        }

        /**
         * Raises the <c>pendentPagesRequested</c> event
         **/
        onHiddenCommentsRequested(){

            this.pendentPagesSolicited.raise();

        }

        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(){

            super.onLayout();

            this.textbox.onLayout();
            this.textbox.width = this.width;

        }

        /**
         * Raises the <c>pendentPagesSolicited</c> event
         **/
        onPendentPagesSolicited(){

            this.pendentPagesSolicited.raise();

        }

        /**
         * Prepends the specified comment
         **/
        prependComment(comment: CommentItem){

            this.commentsElement.prepend(comment.element);

        }

        //region Properties

        /**
         * Gets or sets a value indicating if the user may add new comments
         **/
        get allowNewComments(): boolean{
            return this._allowNewComments;
        }

        /**
         * Gets or sets a value indicating if the user may add new comments
         **/
        set allowNewComments(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            if(value){
                this.newCommentElement.show();
            }else{
                this.newCommentElement.hide();
            }

            this._allowNewComments = value;


        }

        /**
         * Property field
         */
        private _ignoreEnter:boolean = false;

        /**
         * Gets or sets a value indicating if the enter key should be ignored.
         * Used for allowing user to hit enter on selecting users from auto-complete
         *
         * @returns {boolean}
         */
        public get ignoreEnter():boolean {
            return this._ignoreEnter;
        }

        /**
         * Gets or sets a value indicating if the enter key should be ignored.
         * Used for allowing user to hit enter on selecting users from auto-complete
         *
         * @param {boolean} value
         */
        public set ignoreEnter(value:boolean) {
            this._ignoreEnter = value;
        }


        /**
         * Gets or sets the number of hidden comments in conversation
         **/
        get pendentPages(): number{
            return this._pendentPages;
        }

        /**
         * Gets or sets the number of hidden comments in conversation
         **/
        set pendentPages(value: number){


            if(!_isNumber(value))
                throw new InvalidArgumentEx('value', value);

            this._pendentPages = value;

            if(value <= 0){
                this.pendentPagesElement.hide();

            }else{
                this.pendentPagesElement.show();
                this.pendentPagesElement.text(sprintf(strings.showMoreCommentsS, value));
            }

            this._pendentPages = value;



        }
        //endregion
    }
}