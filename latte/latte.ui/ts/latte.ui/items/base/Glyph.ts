module latte{
    /**
     * Provides an icon from provided built-in glyphs to indicate graphical actions.
     **/
    export class Glyph extends IconItem{

        /**
         * URL used for glyphs sprite
         **/
        static get defaultUrl(): string{
            return _latteUrl() + '/releases/latte.ui/support/imgs/glyphs.png';
        }

        /**
         * Returns the glyph specified by its location
         **/
        private static _byLocation(u: number, v: number, name: string): Glyph{


            var g = new Glyph();


            g.size = 16;
            g.url = Glyph.defaultUrl;
            g.u = u;
            g.v = v;
            g.name = name || '';

            return g;

        }

        /**
         * Gets an empty glyph
         **/
        static get add(): Glyph{
            return Glyph._byLocation(2, 10, 'add');
        }

        /**
         * Gets an empty glyph
         **/
        static get check(): Glyph{
            return Glyph._byLocation(2, 5, 'check');
        }

        /**
         * Gets a checked glyph
         **/
        static get checked(): Glyph{
            return Glyph._byLocation(3, 4, 'checked');
        }

        /**
         * Gets a checked glyph
         **/
        static get checkedRadio(): Glyph{
            return Glyph._byLocation(4, 4, 'checked');
        }

        /**
         * Gets a chevron glyph
         **/
        static get chevron(): Glyph{
            return Glyph._byLocation(2, 7, 'chevron');
        }

        /**
         * Gets a collapse glyph
         **/
        static get collapse(): Glyph{
            return Glyph._byLocation(1, 3, 'collapse');
        }

        /**
         * Gets collapse icon for ribbon glyph
         **/
        static get collapseRibbon(): Glyph{
            return Glyph._byLocation(2, 8, 'collapse');
        }

        /**
         *
         * @returns {Glyph}
         */
        static get collapseWidget(): Glyph{
            return Glyph._byLocation(2, 8, 'collapse');
        }

        /**
         *
         * @returns {Glyph}
         */
        static get expandWidget(): Glyph{
            return Glyph._byLocation(3, 5, 'expand');
        }

        /**
         * Gets a dismiss glyph
         **/
        static get dismiss(): Glyph{
            return Glyph._byLocation(2, 9, 'dismiss');
        }

        /**
         * Gets a down arrow glyph
         **/
        static get down(): Glyph{
            return Glyph._byLocation(2, 2, 'down');
        }

        /**
         * Gets an expand glyph
         **/
        static get expand(): Glyph{
            return Glyph._byLocation(1, 2, 'expand');
        }

        /**
         * Gets a grip glyph
         **/
        static get grip(): Glyph{
            return Glyph._byLocation(2, 6, 'grip');
        }

        /**
         * Gets a left arrow glyph
         **/
        static get left(): Glyph{
            return Glyph._byLocation(2, 4, 'left');
        }

        /**
         * Gets a maximize glyph
         **/
        static get maximize(): Glyph{
            return Glyph._byLocation(3, 2, 'maximize');
        }

        /**
         * Gets a minimize glyph
         **/
        static get minimize(): Glyph{
            return Glyph._byLocation(3, 1, 'minimize');
        }

        /**
         * Gets note glyph
         **/
        static get note(): Glyph{
            return Glyph._byLocation(1, 4, 'note');
        }

        /**
         * Gets a right arrow glyph
         **/
        static get right(): Glyph{
            return Glyph._byLocation(2, 3, 'right');
        }

        /**
         * Gets a checked glyph
         **/
        static get unchecked(): Glyph{
            return Glyph._byLocation(3, 3, 'checked');
        }

        /**
         * Gets a checked glyph
         **/
        static get uncheckedRadio(): Glyph{
            return Glyph._byLocation(4, 3, 'checked');
        }

        /**
         * Gets an up arrow glyph
         **/
        static get up(): Glyph{
            return Glyph._byLocation(2, 1, 'up');
        }

        /**
         * Creates the glyph
         **/
        constructor(){

            super();
            this.element.addClass('glyph');

        }
    }
}