module latte{

    export class SuggestionOverlay extends StackOverlay{


        constructor(){

            super();

            this.addClass('suggestion');

            // Remove face from buttons
            this.items.addItem.add((item: Item) => {
                if(item instanceof ButtonItem){
                    (<ButtonItem>item).faceVisible = false;
                }
            });

        }


    }
}