module latte{

    /**
     * Enumeration of Keyboard key codes
     */
    export enum Key{

        /**
         * Backspace key
         *
         * @type {number}
         */
        BACKSPACE = 8,

        /**
         * Tab key
         *
         * @type {number}
         */
            TAB = 9,

        /**
         * Enter key
         *
         * @type {number}
         */
            ENTER = 13,

        /**
         * Shift key
         *
         * @type {number}
         */
            SHIFT = 16,

        /**
         * Control key
         *
         * @type {number}
         */
            CONTROL = 17,

        /**
         * Alt key
         *
         * @type {number}
         */
            ALT = 18,

        /**
         * Backspace key
         *
         * @type {number}
         */
            PAUSE = 19,

        /**
         * Caps Lock key
         *
         * @type {number}
         */
            CAPS_LOCK = 20,

        /**
         * Escape key
         *
         * @type {number}
         */
            ESCAPE = 27,

        /**
         * Page up key
         *
         * @type {number}
         */
            PAGE_UP = 33,

        /**
         * Page down key
         *
         * @type {number}
         */
            PAGE_DOWN = 34,

        /**
         * End key
         *
         * @type {number}
         */
            END = 35,

        /**
         * Home key
         *
         * @type {number}
         */
            HOME = 36,

        /**
         * Left arrow key
         *
         * @type {number}
         */
            ARROW_LEFT = 37,

        /**
         * Up arrow key
         *
         * @type {number}
         */
            ARROW_UP = 38,

        /**
         * Right arrow key
         *
         * @type {number}
         */
            ARROW_RIGHT = 39,

        /**
         * Down arrow key
         *
         * @type {number}
         */
            ARROW_DOWN = 40,

        /**
         * Insert key
         *
         * @type {number}
         */
            INSERT = 45,

        /**
         * Delete key
         *
         * @type {number}
         */
            DELETE = 46,

        /**
         * Zero key
         *
         * @type {number}
         */
            NUMBER_0 = 48,

        /**
         * One key
         *
         * @type {number}
         */
            NUMBER_1 = 49,

        /**
         * Two key
         *
         * @type {number}
         */
        NUMBER_2 = 50,

        /**
         * Three key
         *
         * @type {number}
         */
        NUMBER_3 = 51,

        /**
         * Four key
         *
         * @type {number}
         */
        NUMBER_4 = 52,

        /**
         * Five key
         *
         * @type {number}
         */
        NUMBER_5 = 53,

        /**
         * Siz key
         *
         * @type {number}
         */
        NUMBER_6 = 54,

        /**
         * Seven key
         *
         * @type {number}
         */
        NUMBER_7 = 55,

        /**
         * Eight key
         *
         * @type {number}
         */
        NUMBER_8 = 56,

        /**
         * Nine key
         *
         * @type {number}
         */
        NUMBER_9 = 57,

        /**
         * A key
         *
         * @type {number}
         */
            A = 65,

        /**
         * B key
         *
         * @type {number}
         */
            B = 66,

        /**
         * C key
         *
         * @type {number}
         */
            C = 67,

        /**
         * D key
         *
         * @type {number}
         */
            D = 68,

        /**
         * E key
         *
         * @type {number}
         */
            E = 69,

        /**
         * F key
         *
         * @type {number}
         */
            F = 70,

        /**
         * G key
         *
         * @type {number}
         */
            G = 71,

        /**
         * H key
         *
         * @type {number}
         */
            H = 72,

        /**
         * I key
         *
         * @type {number}
         */
            I = 73,

        /**
         * J key
         *
         * @type {number}
         */
            J = 74,

        /**
         * K key
         *
         * @type {number}
         */
            K = 75,

        /**
         * L key
         *
         * @type {number}
         */
            L = 76,

        /**
         * M key
         *
         * @type {number}
         */
            M = 77,

        /**
         * N key
         *
         * @type {number}
         */
            N = 78,

        /**
         * O key
         *
         * @type {number}
         */
            O = 79,

        /**
         * P key
         *
         * @type {number}
         */
            P = 80,

        /**
         * Q key
         *
         * @type {number}
         */
            Q = 81,

        /**
         * R key
         *
         * @type {number}
         */
            R = 82,

        /**
         * S key
         *
         * @type {number}
         */
            S = 83,

        /**
         * T key
         *
         * @type {number}
         */
            T = 84,

        /**
         * U key
         *
         * @type {number}
         */
            U = 85,

        /**
         * V key
         *
         * @type {number}
         */
            V = 86,

        /**
         * W key
         *
         * @type {number}
         */
            W = 87,

        /**
         * X key
         *
         * @type {number}
         */
            X = 88,

        /**
         * Y key
         *
         * @type {number}
         */
            Y = 89,

        /**
         * Z key
         *
         * @type {number}
         */
            Z = 90,

        /**
         * Left window key
         *
         * @type {number}
         */
            LEFT_WINDOW = 91,

        /**
         * Right window key
         *
         * @type {number}
         */
            RIGHT_WINDOW = 92,

        /**
         * Select key
         *
         * @type {number}
         */
            SELECT = 93,

        /**
         * Numpad Zero key
         *
         * @type {number}
         */
            NUMPAD_0 = 96,

        /**
         * Numpad One key
         *
         * @type {number}
         */
            NUMPAD_1 = 97,

        /**
         * Numpad two key
         *
         * @type {number}
         */
            NUMPAD_2 = 98,

        /**
         * Numpad 3 key
         *
         * @type {number}
         */
            NUMPAD_3 = 99,

        /**
         * Numpad 4 key
         *
         * @type {number}
         */
            NUMPAD_4 = 100,

        /**
         * Numpad 5 key
         *
         * @type {number}
         */
            NUMPAD_5 = 101,

        /**
         * Numpad 6 key
         *
         * @type {number}
         */
            NUMPAD_6 = 102,

        /**
         * Numpad 7 key
         *
         * @type {number}
         */
            NUMPAD_7 = 103,

        /**
         * Numpad 8 key
         *
         * @type {number}
         */
            NUMPAD_8 = 104,

        /**
         * Numpad 9 key
         *
         * @type {number}
         */
            NUMPAD_9 = 105,

        /**
         * Numpad * key
         *
         * @type {number}
         */
            NUMPAD_MULTIPLY = 106,

        /**
         * Numpad + key
         *
         * @type {number}
         */
            NUMPAD_ADD = 107,

        /**
         * Numpad - key
         *
         * @type {number}
         */
            NUMPAD_SUBTRACT = 109,

        /**
         * Numpad . key
         *
         * @type {number}
         */
            NUMPAD_DECIMAL_POINT = 110,

        /**
         * Numpad / key
         *
         * @type {number}
         */
            NUMPAD_DIVIDE = 111,

        /**
         * F1 key
         *
         * @type {number}
         */
            F1 = 112,

        /**
         * F2 key
         *
         * @type {number}
         */
            F2 = 113,

        /**
         * F3 key
         *
         * @type {number}
         */
            F3 = 114,

        /**
         * F4 key
         *
         * @type {number}
         */
            F4 = 115,

        /**
         * F5 key
         *
         * @type {number}
         */
            F5 = 116,

        /**
         * F6 key
         *
         * @type {number}
         */
            F6 = 117,

        /**
         * F7 key
         *
         * @type {number}
         */
            F7 = 118,

        /**
         * F8 key
         *
         * @type {number}
         */
            F8 = 119,

        /**
         * F9 key
         *
         * @type {number}
         */
            F9 = 120,

        /**
         * F10 key
         *
         * @type {number}
         */
            F10 = 121,

        /**
         * F11 key
         *
         * @type {number}
         */
            F11 = 122,

        /**
         * F12 key
         *
         * @type {number}
         */
            F12 = 123,

        /**
         * Num lock key
         *
         * @type {number}
         */
            NUM_LOCK = 144,

        /**
         * Scroll lock key
         *
         * @type {number}
         */
            SCROLL_LOCK = 145,

        /**
         * , key
         *
         * @type {number}
         */
            SEMI_COLON = 186,

        /**
         *  = key
         *
         * @type {number}
         */
            EQUAL_SIGN = 187,

        /**
         * , key
         *
         * @type {number}
         */
            COMMA = 188,

        /**
         * - key
         *
         * @type {number}
         */
            DASH = 189,

        /**
         * . key
         *
         * @type {number}
         */
            PERIOD = 190,

        /**
         * / key
         *
         * @type {number}
         */
            FORWARD_SLASH = 191,

        /**
         * Grave acccent key
         *
         * @type {number}
         */
            GRAVE_ACCENT = 192,

        /**
         * [ key
         *
         * @type {number}
         */
            OPEN_BRACKET = 219,

        /**
         * \ key
         *
         * @type {number}
         */
            BACK_SLASH = 220,

        /**
         * ] key
         *
         * @type {number}
         */
            CLOSE_BRACKET = 221,

        /**
         * ' key
         *
         * @type {number}
         */
            SINGLE_QUOTE = 222,

        /**
         * Space bar key
         * @type {number}
         */
        SPACEBAR = 32,

    }

}