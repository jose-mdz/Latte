module latte{

    if(!NodeList.prototype.forEach){
        NodeList.prototype.forEach = function(callback){
            for(let i = 0; i < this.length; i++){
                callback(this[i], i);
            }
        }
    }

    // export interface NodeListOf<Element>{
    //     forEach(callback: (node: Element, i: number) => any);
    // }

    export interface NodeListOf<TNode extends Node> extends NodeList {
        forEach(callback: (node: TNode, i: number) => any);
    }
}