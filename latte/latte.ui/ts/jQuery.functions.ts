/// jQuery Rectangle plugin
(function($){
    $['fn'].rectangle = function(rect, relative){

        var offset = relative !== true ? this.offset() : this.position();


        if(!offset) offset = {top: 0, left: 0};


        if(rect instanceof latte.Rectangle){
            return this.css({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });

        }else{
            return new latte.Rectangle(offset.left, offset.top, this.outerWidth(), this.outerHeight());
        }


    };

    $['fn'].innerRectangle = function(rect, relative){
        var offset = relative !== true ? this.offset() : this.position();

        if(!offset) offset = {top: 0, left: 0};


        if(rect instanceof latte.Rectangle){
            return this.css({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });

        }else{
            return new latte.Rectangle(offset.left, offset.top, this.width(), this.height());
        }


    }



})(jQuery);


/**
 * Adds a cleaner of Css float properties to the elements
 */
$.fn.clear = function(){ return this.append($('<div>').css({'clear': 'both'})) };

/**
 * Returns the latte instance object related with first element
 */
$.fn.instance = function(){ return this.data('instance') };