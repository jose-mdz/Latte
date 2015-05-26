module latte{

    export class StackOverlay extends Overlay{

        stack: ItemStack;

        constructor(){

            super();

            this.stack = new ItemStack();
            this.stack.appendTo(this);

        }

        /**
         * Gets the collection of items of stack
         *
         * @returns {latte.Collection<latte.Item>}
         */
        get items(): Collection<Item>{
            return this.stack.items;
        }

    }
}