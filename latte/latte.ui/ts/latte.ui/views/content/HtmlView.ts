module latte{
    /**
     * Provides a view that contains just HTML
     <example><code><span style="color: #000000">
     <span style="color: #0000BB"><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color: #FF8000">//&nbsp;Show&nbsp;an&nbsp;HTML&nbsp;view&nbsp;as&nbsp;modal&nbsp;dialog<br />&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color: #0000BB">View</span><span style="color: #007700">.</span><span style="color: #0000BB">modalView</span><span style="color: #007700">(new&nbsp;</span><span style="color: #0000BB">HtmlView</span><span style="color: #007700">(</span><span style="color: #DD0000">"&lt;p&gt;Hello&nbsp;World&lt;/p&gt;"</span><span style="color: #007700">));<br />&nbsp;<br /></span><span style="color: #0000BB"></span>
     </span>
     </code></example>
     **/
    export class HtmlView extends View{

        /**
         * Creates the view with HTML or jQuery elements
         **/
            constructor(html: any){

            super();

            this.element.addClass('html');

            if(html instanceof jQuery)
                this.append(html);
            else if(typeof html == 'string')
                this.html = html;

        }

        /**
         * Appends elements to the HTML view DOM
         **/
            append(element: JQuery){

            this.container.append(element);

        }

        /**
         * Gets or sets the html of the view
         **/
        get html(): string{
            return this.container.html();
        }

        /**
         * Gets or sets the html of the view
         **/
        set html(value: string){


            this.container.html(value);



        }
    }
}