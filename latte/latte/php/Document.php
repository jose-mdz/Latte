<?php

/**
 * Represents an HTML document
 */
class Document {

    /**
     * The document's &lt;!DOCTYPE&gt; tag
     * 
     * @var Tag
     */
    public $doctype;
    
    /**
     * The document's &lt;html&gt; tag
     * 
     * @var Tag
     */
    public $html;
    
    /**
     * The document's &lt;head&gt; tag
     * 
     * @var Tag
     */
    public $head;
    
    /**
     * The document's &lt;title&gt; tag
     * 
     * @var Tag
     */
    public $title;
    
    /**
     * The document's &lt;body&gt; tag
     * 
     * @var Tag
     */
    public $body;
    
    /**
     * Function to call when rendering document
     * 
     * @var function
     */
    public $onRender;
    
    /**
     * If <c>true</c>, document will be rendered to output before deallocated from memory.
     * 
     * @var boolean
     */
    public $outputRender;

    /**
     * If set to true, will add Latte module tags when rendering
     *
     * @var boolean
     */
    public $addLatteTags;

    /**
     * Creates the document. Optionally speifies if document should be rendered to output when deallocated from memory.
     * 
     * @param boolean $output
     */
    function __construct($output = false, $addLatteTags = false) {

        // Create basic tags
        $this->doctype = new Tag("!doctype");
        $this->doctype->html = NULL;
        $this->html = tag("html");
        $this->head = tag("head")->addTo($this->html);
        $this->title = tag("title")->addTo($this->head)->text("New Document");
        $this->body = tag("body")->addTo($this->html);

        //Set content type
        $contentType = tag("meta")
                ->addTo($this->head)
                ->attr("http-equiv", "Content-Type")
                ->attr("content", "text/html; charset=UTF-8");

        // Make globals available
        $GLOBALS['body'] = $this->body;
        $GLOBALS['head'] = $this->head;

        // Initialize events
        $this->onRender = array();

        // Flag to indicate if document goes to output
        $this->outputRender = $output;

        // Flag to indicate if document should add latte tags
        $this->addLatteTags = $addLatteTags;
    }

    /**
     * If <c>outputRender</c>, renders the document to the output
     */
    function __destruct() {
        if ($this->outputRender) {
            $this->render();
        }
    }

    /**
     * Renders the document
     * 
     * @return string
     */
    function __toString() {
        return $this->render();
    }

    /**
     * Renders the document to the output or returns it as a <c>string</c>
     * 
     * @param boolean $return
     * @return string
     */
    public function render($return = false) {

        if($this->addLatteTags){
            /// Add latte tags
            foreach(LatteModule::$loadedModules as $module){
                $this->head->add($module->getTags());

                if($module->isMain){
                    $main = isset($module->metadata['ua-main']) ? $module->metadata['ua-main'] : "latte.Main";

                    // Loader module
                    $this->addScript(" window.addEventListener('load', function(){ new $main() });");
                }
            }


        }

        foreach ($this->onRender as $function) {
            if (is_callable($function)) {
                $function($this);
            } else {
                $this->body->add($function);
            }
        }

        if ($this->outputRender && !$return) {
            echo $this->doctype->render();
            echo $this->html->render();
        } else {
            return $this->doctype->render() . $this->html->render();
        }
    }

    /**
     * Adds Google Analytics 'pageview
     * @param $uaid
     */
    public function addGoogleAnalyticsPageView($uaid, $property){
        $this->addScript("
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', '$uaid', '$property');
            ga('send', 'pageview');
        ");
    }

    /**
     * Adds JavaScript code to the head of the document
     * 
     * @param string $jsCode
     * @param bool $minify Minifies the script (Removes tabs, line feeds and excesive white spaces)
     * @return Tag
     */
    public function addScript($jsCode, $minify = true) {

        $jsCode = str_replace("\r", "", $jsCode);
        $jsCode = str_replace("\n", "", $jsCode);
        $jsCode = str_replace("\t", "", $jsCode);
        $jsCode = preg_replace('/\s\s+/', ' ', $jsCode);

        return tag("script")
                ->attr("type", "text/javascript")
                //->text("\r\n<!-- \r\n $jsCode \r\n//-->\r\n")
                ->text("\r\n $jsCode \r\n")
                ->addTo($this->body);
    }

    /**
     * Adds CSS code to the head of the document
     * 
     * @param string $style
     * @return Tag
     */
    public function addStyle($style) {
        $style = str_replace("\r", "", $style);
        $style = str_replace("\n", "", $style);
        $style = str_replace("\t", "", $style);
        $style = preg_replace('/\s\s+/', ' ', $style);
        
        return tag("style")
                ->attr("type", "text/css")
                ->text("\r\n $style \r\n")
                ->addTo($this->head);
    }

    /**
     * Adds a CSS stylesheet to the document
     * 
     * @param string $url
     * @return Tag
     */
    public function addCss($url) {
        return tag("link")
                ->attr("rel", "stylesheet")
                ->attr("href", $url)
                ->addTo($this->head);
    }

    /**
     * Adds a JavaScript file to the document
     * 
     * @param string $url
     * @return Tag
     */
    public function addJs($url) {
        return tag("script")
                ->attr("type", "text/javascript")
                ->attr("src", $url)
                ->addTo($this->head);
    }

    /**
     * Adds a handler to the onRender event
     * 
     * @param function $function
     */
    function onRender($function) {
        $this->onRender[] = $function;
    }

}
