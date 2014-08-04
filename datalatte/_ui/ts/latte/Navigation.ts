module latte{

    /**
     * Handles hash navigation. This is designed to manage navigation of apps.

     Catch a handler to <c>hashChanged</c> event, and to alter the current hash path
     use the <c>Navigation.hash</c> property.
     **/
    export class Navigation{

        /**
         *
         **/
        private static _hash: string;

        /**
         *
         **/
        private static _lock: boolean;

        /**
         * Hash represented as a path. It is updated every time the value of <c>hash</c> changes.
         **/
        static path: Array<string> = [];

        /**
         * Raised when the navigation hash changed
         **/
        static hashChanged: LatteEvent;

        /**
         * Initializes the static class
         **/
        public static staticConstructor(){


            // Assign initial hash
            if(!_undef(window.location.hash))
                Navigation.hash = window.location.hash;

            // Init event
            Navigation.hashChanged = new LatteEvent(Navigation);

            // React to handler adding
            Navigation.hashChanged.handlerAdded.add(() => {
                Navigation.onHashChanged(Navigation._hash);
            });

            // Catch outer hashchange event
            if(!_undef(window.onhashchange)){
                $(window).bind('hashchange', () => {
                    Navigation.hash = window.location.hash;
                });
            }

        }

        /**
         * Gets or sets the current hash of the navigation.
         Optionally <c>silent</c> makes it without raising the <c>hashChanged<c> event.
         **/
        static get hash(): string{

                return Navigation._hash;
        }

        /**
         * Gets or sets the current hash of the navigation.
         Optionally <c>silent</c> makes it without raising the <c>hashChanged<c> event.
         **/
        static set hash(value: string){
            Navigation.setHash(value, false);
        }

        /**
         * Gets or sets the current hash of the navigation.
         Optionally <c>silent</c> makes it without raising the <c>hashChanged<c> event.
         **/
        static setHash(value: string, silent: boolean = false){

            if(_isString(value) && value.length > 0 && value.charAt(0) == '#')
                value = value.substr(1);

            var change = value != Navigation._hash;

            Navigation._hash = value;

            if(!_undef(window.location.hash)){
                Navigation._lock = true;
                window.location.hash = value;
                Navigation._lock = false;
            }

            /// Create path
            var path = value.split('/');
            if(path.length > 0 && !path[0]) path.shift();
            Navigation.path = path;

            if(change && !(silent === true))
                Navigation.onHashChanged(value);

            return Navigation;

        }

        /**
         * Raises the <c>hashChanged</c> event
         **/
        static onHashChanged(hash: string){

            if(Navigation.hashChanged)
                Navigation.hashChanged.raise(hash);

        }
    }

    $(() => {Navigation.staticConstructor()})
}