/*
 * Commands available for <c>HtmlEditorItem</c>
 *
 * @enum
 */

module latte{
    export class HtmlEditorCommands{

        /**
         * Swaps selection boldness
         */
        public static BOLD= 'bold';

        /**
         * Wraps seletion into CODE tag
         */
        public static CODE= 'code';

        /**
         * Clears all formatting on fonts and colors
         */
        public static CLEAR_FORMAT= 'clearformat';

        /**
         * Formats the block as something
         */
        public static FORMAT_BLOCK= 'formatblock';

        /**
         * Swaps selection italics
         */
        public static ITALIC= 'italic';

        /**
         * Makes selectikon super-script
         */
        public static SUPER_SCRIPT= 'superscript';

        /**
         * Makes selection sub-script
         */
        public static SUB_SCRIPT= 'subscript';

        /**
         * Aligns text to left
         */
        public static JUSTIFY_LEFT= 'justifyleft';

        /**
         * Centers text
         */
        public static JUSTIFY_CENTER= 'justifycenter';

        /**
         * Aligns text to right
         */
        public static JUSTIFY_RIGHT= 'justifyright';

        /**
         * Justifies text
         */
        public static JUSTIFY_FULL= 'justifyfull';

        /**
         * Decreases indent
         */
        public static OUTDENT='outdent';

        /**
         * Increases indent
         */
        public static INDENT= 'indent';

        /**
         * Shows a dialog to insert HTML
         */
        public static INSERT_HTML=  'inserthtml';

        /**
         * Inserts an image
         */
        public static INSERT_IMAGE= 'insertimage';

        /**
         * Inserts a link
         */
        public static INSERT_LINK= 'insertlink';

        /**
         * Inserts an ordered list
         */
        public static INSERT_ORDERED_LIST= 'insertorderedlist';

        /**
         * Inserts an unordered list
         */
        public static INSERT_UNORDERED_LIST= 'insertunorderedlist';

        /**
         * Shows a dialog to insert a YouTube video
         */
        public static INSERT_YOUTUBE= 'insertyoutube';

        /**
         * Unerlines selection
         */
        public static UNDERLINE= 'underline';
    }

}