<?php
/**
 * Represents an HTML element as a tag.
 * 
 * <example>
 * 
 *    // ( 1 ) Usage
 *    echo new Tag('div');          // Writes <div></div>
 * 
 *    // ( 2 ) Assign Class
 *    echo new Tag('div.higlight'); // Writes <div class="highlight"></div>
 * 
 *    // ( 3 ) Set Text
 *    $t = new Tag('div.a'); 
 *    $t->text("Hello world");
 *    echo $t;                      // Writes <div class="a">Hello World</div>
 * 
 *    // ( 4 ) Change text color
 *    echo $t->color('white');      // Writes <div class="a" style="color: white">Hello World</div>
 * 
 *    // ( 5 ) Change text color
 *    echo $t->add(tag('<hr>'));    // Writes <div class="a" style="color: white">Hello World<hr></div>
 * 
 *    // ( 6 ) Quick input
 *    $t = new Tag('text')    
 *    echo $t;                      // Writes <input type="text">
 * 
 *    // ( 7 ) Set Name and value
 *    $t->name("last-name")
 *    $t->value("Doe")
 *    echo $t;                      // Writes <input type="text" name="last-name" value="Doe">
 * 
 * </example>
 */
class Tag {

    /**
     * Name of the tag
     * 
     * @var string 
     */
    public $tagname = "";
    
    /**
     * Holds attributes and its values
     * 
     * @var array
     */
    public $atts = array();
    
    /**
     * Holds the content added to the tag
     * 
     * @var array
     */
    public $content = array();

    /**
     * Creates a new instance of tag, using the tag name.
     * @param string $name Name of tag. Classes may be added using "tag.class1.class2"
     * Special tag transformations:
     *   &middot; text: <c>&lt;input type=text&gt;</c>
     *   &middot; hidden: <c>&lt;input type=hidden&gt;</c>
     *   &middot; checkbox: <c>&lt;input type=checkbox&gt;</c>
     *   &middot; radio: <c>&lt;input type=radio&gt;</c>
     *   &middot; submit: <c>&lt;input type=submit&gt;</c>
     *   &middot; passwor: <c>&lt;input type=password&gt;</c>
     */
    function __construct($name = 'span') {

        $class = explode(".", $name);
        $id = explode("#", $name);

        if (sizeof($class) > 1) {
            $name = $class[0];
            for ($i = 1; $i < sizeof($class); $i++)
                $this->addClass($class[$i]);
        }

        if (sizeof($id) > 1) {
            $name = $id[0];
            $this->attr('id', $id[1]);
        }

        switch ($name) {
            case "text": $name = "input";
                $this->type("text");
                break;
            case "hidden": $name = "input";
                $this->type("hidden");
                break;
            case "checkbox":$name = "input";
                $this->type("checkbox");
                break;
            case "radio": $name = "input";
                $this->type("radio");
                break;
            case "submit": $name = "input";
                $this->type("submit");
                break;
            case "password": $name = "input";
                $this->type("password");
                break;
            case "file": $name = "input";
                $this->type("file");
                break;
        }

        $this->tagname = $name;
    }

    /**
     * Adds JavaScript to the page. Optionally minifies the script by removing white spaces.
     * 
     * @param string $script
     * @param bool $minify
     * @return Tag
     */
    public function addScript($script, $minify = true) {

        $script = str_replace("\r", "", $script);
        $script = str_replace("\n", "", $script);
        $script = str_replace("\t", "", $script);
        $script = preg_replace('/\s\s+/', ' ', $script);

        return tag("script")
                ->attr("type", "text/javascript")
                ->text("\r\n<!-- \r\n $script \r\n//-->\r\n")
                ->addTo($this);
    }

    /**
     * Adds content to this tag
     * 
     * @param string|Tag $what
     * @return Tag
     */
    public function add($what) {

        if (is_array($what)) {
            foreach ($what as $subWhat)
                $this->add($subWhat);
        } else {
            $this->content[] = $what;
        }

        return $this;
    }

    /**
     * Adds text to this tag. Special HTML characters are converted
     * 
     * @param string|Tag $what
     * @return Tag
     */
    public function addText($what) {
        $this->content[] = htmlentities($what);
        return $this;
    }

    /**
     * Adds content to this tag
     * 
     * @param string $class
     * @return Tag
     */
    public function addClass($class) {
        if (isset($this->atts['class'])) {
            $this->atts['class'] .= " " . $class;
        } else {
            $this->attr("class", $class);
        }
        return $this;
    }

    /**
     * Adds this tag to another tag and returns this tag.
     * 
     * @param Tag $tag
     * @return Tag
     */
    public function addTo(Tag $tag) {
        $tag->add($this);

        return $this;
    }

    /**
     * Sets the value of the "action" attribute
     * 
     * @param string $action
     * @return Tag
     */
    public function action($action) {
        return $this->attr('action', $action);
    }

    /**
     * Sets the value of the "alt" attribute
     * 
     * @param string $src
     * @return
     */
    public function alt($alt) {
        return $this->attr('alt', $alt);
    }

    /**
     * Adds an attribute with a value. Optionally encodes the special HTML characters of the value.
     * 
     * @param string $attribute
     * @param string $value
     * @param boolean $converthtmlchars
     * @return Tag
     */
    public function attr($attribute, $value, $converthtmlchars = true) {
        if ($converthtmlchars)
            if (is_string($value))
                $value = htmlspecialchars($value);
        $this->atts[$attribute] = $value;
        return $this;
    }

    /**
     * Alias of add
     * 
     * @param string|Tag $content 
     * @return Tag
     */
    public function append($content) {
        return $this->add($content);
    }

    /**
     * Adds inline-style for "background"
     * 
     * @param string $value
     * @return Tag
     */
    public function background($value) {
        return $this->css('background', $value);
    }

    /**
     * Adds inline-style for "background-attachment"
     * 
     * @param string $value
     * @return Tag
     */
    public function backgroundAttachment($value) {
        return $this->css('background-attachment', $value);
    }

    /**
     * Adds inline-style for "background-color"
     * 
     * @param string $value
     * @return Tag
     */
    public function backgroundColor($value) {
        return $this->css('background-color', $value);
    }

    /**
     * Adds inline-style for "background-position"
     * 
     * @param string $value
     * @return Tag
     * 
     */
    public function backgroundPosition($value) {
        return $this->css('background-position', $value);
    }

    /**
     * Adds inline-style for "background-repeat"
     * 
     * @param string $value
     * @return Tag
     */
    public function backgroundRepeat($value) {
        return $this->css('background-repeat', $value);
    }

    /**
     * Adds inline-style for "background-image"
     * 
     * @param string $value
     * @return Tag
     */
    public function backgroundImage($url) {
        return $this->css('background-image', "url($url)");
    }

    /**
     * Adds inline-style for "border"
     * 
     * @param string $value
     * @return Tag
     */
    public function border($value) {
        return $this->css('border', $value);
    }

    /**
     * Adds inline-style for "border-top"
     * 
     * @param string $value
     * @return Tag
     */
    public function borderTop($value) {
        return $this->css('border-top', $value);
    }

    /**
     * Adds inline-style for "border-right"
     * 
     * @param string $value
     * @return Tag
     */
    public function borderRight($value) {
        return $this->css('border-right', $value);
    }

    /**
     * Adds inline-style for "border-bottom"
     * 
     * @param string $value
     * @return Tag
     */
    public function borderBottom($value) {
        return $this->css('border-botom', $value);
    }

    /**
     * Adds inline-style for "border-left"
     * 
     * @param string $value
     * @return Tag
     */
    public function borderLeft($value) {
        return $this->css('border-left', $value);
    }

    /**
     * Adds inline-style for "bottom"
     * 
     * @param string $value
     * @return Tag
     */
    public function bottom($value) {
        return $this->css('bottom', $value);
    }

    /**
     * Adds inline-style for "color"
     * 
     * @param string $value
     * @return Tag
     */
    public function color($value) {
        return $this->css('color', $value);
    }

    /**
     * Sets the content attribute
     * 
     * @param string $value
     * @return Tag
     */
    public function content($value) {
        return $this->attr('content', $value);
    }

    /**
     * Activates the attribute for editing content in the element
     * 
     * @return Tag
     */
    public function contentEditable() {
        return $this->attr('contenteditable', 'true');
    }

    /**
     * Sets the value of the "cellpadding" attribute
     * 
     * @param string $cellpadding
     * @return Tag
     */
    public function cellpadding($cellpadding) {
        return $this->attr('cellpadding', $cellpadding);
    }

    /**
     * Sets the value of the "cellspacing"
     * 
     * @param string $cellspacing
     * @return Tag
     */
    public function cellspacing($cellspacing) {
        return $this->attr('cellspacing', $cellspacing);
    }

    /**
     * Sets the value of the "checked" attribute
     * 
     * @param string $checked
     * @return Tag
     */
    public function checked($checked) {
        return $this->attr('checked', $checked);
    }

    /**
     * Adds inline-style for "clear"
     * 
     * @param string $value
     * @return Tag
     */
    public function clear($value = 'both') {
        return $this->css('clear', $value);
    }

    /**
     * Adds CSS styles to the tag
     * 
     * @param string $style
     * @param string $value
     * @return Tag
     */
    public function css($style, $value = NULL) {
        if ($value != NULL) {
            if (is_numeric($value))
                $value = $value . "px";
            return $this->css("$style: $value");
        }

        if (isset($this->atts['style'])) {

            $this->atts['style'] .= "; " . $style;
        } else {
            $this->attr("style", $style);
        }
        return $this;
    }

    /**
     * Sets a data value attribute.
     * 
     * @param string $name
     * @param string $value 
     * @return Tag
     */
    public function data($name, $value) {
        return $this->attr("data-$name", $value);
    }

    /**
     * Adds inline-style for "display"
     * 
     * @param string $value
     * @return Tag
     */
    public function display($value) {
        return $this->css('display', $value);
    }

    /**
     * Recursively finds all tags with the specified tag name
     * 
     * @param string $tagname
     * @param array $buffer 
     * @return array
     */
    public function findByTagName($tagname, $buffer = null) {

        if (!$buffer)
            $buffer = array();

        foreach ($this->content as $tag) {
            if (!($tag instanceof Tag))
                continue;

            if ($tag->tagname == $tagname) {
                $buffer[] = $tag;
            }

            $buffer = array_merge($buffer, $tag->findByTagName($tagname));
        }

        return $buffer;
    }

    /**
     * Adds inline-style for "float" 
     * 
     * @param string $value
     * @return Tag
     */
    public function float($value) {
        return $this->css('float', $value);
    }

    /**
     * Adds inline-style for "font-size"
     * 
     * @param string $value
     * @return Tag
     */
    public function fontSize($value) {
        return $this->css('font-size', $value);
    }

    /**
     * Adds inline-style for "font-weight"
     * 
     * @param string $value
     * @return Tag
     */
    public function fontWeight($value) {
        return $this->css('font-weight', $value);
    }

    /**
     * Finds element based on the value of the specified attribute
     * 
     * @param string $attribute
     * @param string $value 
     * @param Tag
     */
    public function getElementByAttribute($attribute, $value, $recursive = false) {

        foreach ($this->content as $unit) {
            if ($unit instanceof Tag) {
                if (array_key_exists($attribute, $unit->atts)) {
                    if ($unit->atts[$attribute] == $value) {
                        return $unit;
                    }
                }

                if ($recursive) {
                    $found = $this->getElementByAttribute($attribute, $value, $recursive);
                    if ($found) {
                        return $found;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Adds inline-style for "height"
     * 
     * @param string $value
     * @return Tag
     */
    public function height($value) {
        return $this->css('height', $value);
    }

    /**
     * Sets the HTML of tag. Clears all previosly added content
     * 
     * @param string $value
     * @return Tag
     */
    public function html($value) {
        $this->content = array();
        return $this->add($value);
    }

    /**
     * Sets the value for the "id" attribute
     * 
     * @param string $id
     * @return Tag
     */
    public function id($id) {
        return $this->attr('id', $id);
    }

    /**
     * Adds inline-style for "left"
     * 
     * @param string $value
     * @return Tag
     */
    public function left($value) {
        return $this->css('left', $value);
    }

    /**
     * Sets the value for the "href" attribute
     * 
     * @param string $href
     * @return Tag
     */
    public function href($href) {
        return $this->attr('href', $href);
    }

    /**
     * Sets the href attribute to "javascript:void(0)"
     * 
     * @return Tag
     */
    public function hrefVoid() {
        return $this->attr('href', 'javascript:void(0)');
    }

    /**
     * Adds inline-style for "margin"
     * 
     * @param string $value
     * @return Tag
     */
    public function margin($value) {
        return $this->css('margin', $value);
    }

    /**
     * Adds inline-style for "margin-top"
     * 
     * @param string $value
     * @return Tag
     */
    public function marginTop($value) {
        return $this->css('margin-top', $value);
    }

    /**
     * Adds inline-style for "margin-right"
     * 
     * @param string $value
     * @return Tag
     */
    public function marginRight($value) {
        return $this->css('margin-right', $value);
    }

    /**
     * Adds inline-style for "margin-bottom"
     * 
     * @param string $value
     * @return Tag
     */
    public function marginBottom($value) {
        return $this->css('margin-bottom', $value);
    }

    /**
     * Adds inline-style for "margin-left"
     * 
     * @param string $value
     * @return Tag
     */
    public function marginLeft($value) {
        return $this->css('margin-left', $value);
    }

    /**
     * Adds inline-style for "min-height"
     * 
     * @param string $value
     * @return Tag
     */
    public function minHeight($value) {
        return $this->css('min-height', $value);
    }

    /**
     * Adds inline-style for "max-width"
     * 
     * @param string $value
     * @return Tag
     */
    public function maxWidth($value) {
        return $this->css('max-width', $value);
    }

    /**
     * Sets the value of the "method" attribute
     * 
     * @param string $method
     * @return Tag
     */
    public function method($method) {
        return $this->attr('method', $method);
    }

    /**
     * Sets the value of the "maxlength" attribute
     * 
     * @param string $value
     * @return Tag
     */
    public function maxLength($value) {
        return $this->attr('maxlength', $value);
    }

    /**
     * Adds inline-style for "max-height"
     * 
     * @param string $value
     * @return Tag
     */
    public function maxHeight($value) {
        return $this->css('max-height', $value);
    }

    /**
     * Adds inline-style for "min-width"
     * 
     * @param string $value
     * @return Tag
     */
    public function minWidth($value) {
        return $this->css('min-width', $value);
    }

    /**
     * Indicates if tag should be closed based on forbidden tags on HTML4 spec
     * 
     * @return boolean
     */
    public function mustClose() {
        $arr = explode(",", "!doctype,area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param");
        return array_search(strtolower($this->tagname), $arr) === FALSE;
    }

    /**
     * Sets the value of "name" attribute
     * 
     * @param string $name
     * @return Tag
     */
    public function name($name) {
        return $this->attr("name", $name);
    }

    /**
     * Adds inline-style for "overflow"
     * 
     * @param string $value
     * @return Tag
     */
    public function overflow($value) {
        return $this->css('overflow', $value);
    }

    /**
     * Adds inline-style for "padding"
     * 
     * @param string $value
     * @return Tag
     */
    public function padding($value) {
        return $this->css('padding', $value);
    }

    /**
     * Adds inline-style for "padding-top"
     * 
     * @param string $value
     * @return Tag
     */
    public function paddingTop($value) {
        return $this->css('padding-top', $value);
    }

    /**
     * Adds inline-style for "padding-right"
     * 
     * @param string $value
     * @return Tag
     */
    public function paddingRight($value) {
        return $this->css('padding-right', $value);
    }

    /**
     * Adds inline-style for "padding-bottom"
     * 
     * @param string $value
     * @return Tag
     */
    public function paddingBottom($value) {
        return $this->css('padding-bottom', $value);
    }

    /**
     * Adds inline-style for "padding-left"
     * 
     * @param string $value
     * @return Tag
     */
    public function paddingLeft($value) {
        return $this->css('padding-left', $value);
    }

    /**
     * Adds inline-style for "position"
     * 
     * @param string $value
     * @return Tag
     */
    public function position($value) {
        return $this->css('position', $value);
    }

    public function rel($value) {
        return $this->attr('rel', $value);
    }

    /**
     * Removes class from tag
     * 
     * @param string $class
     * @return Tag
     */
    public function removeClass($class) {
        if (isset($this->atts['class'])) {

            $this->atts['class'] = str_replace($class, "", $this->atts['class']);
        }
        return $this;
    }

    /**
     * Adds inline-style for "right"
     * 
     * @param string $value
     * @return Tag
     */
    public function right($value) {
        return $this->css('right', $value);
    }

    /**
     * Renders the tag and returns it as a string
     * 
     * @return string
     */
    public function render() {

        $str = "";
        $attributes = array();

        $str .= "<" . $this->tagname;


        foreach ($this as $att => $value) {

            $att = str_replace("_", "-", $att);

            if ($att == "tagname" || $att == "content" || $att == "atts")
                continue;

            $attributes[$att] = $value;
        }

        foreach ($this->atts as $att => $value) {
            $attributes[$att] = $value;
        }

        foreach ($attributes as $att => $value) {
            $str .= $this->render_att($att, $value);
        }

        $str .= ">";

        foreach ($this->content as $i => $value) {

            if ($value === NULL)
                continue;

            if ($value instanceOf Tag) {
                $str .= $value->render();
            } else {
                $str .= $value;
            }
        }

        if (sizeof($this->content) > 0 || $this->mustClose()) {
            $str .= '</' . $this->tagname . '>';
        }

        return $str;
    }

    private function render_att($att, $value) {
        $str = "";
        if ($value === NULL) {
            $str .= " " . $att;
        } else {
            $str .= " " . $att . "=\"" . $value . "\"";
        }
        return $str;
    }

    /**
     * Sets the value of the "src" attribute
     * @param string $src
     * @return Tag
     */
    public function src($src) {
        return $this->attr('src', $src);
    }

    /**
     * Sets the value of the "style" attribute
     * WARNING: There's a collision with the values setted by css() method
     * 
     * @param string $src
     * @return Tag
     */
    public function style($src) {
        return $this->attr('style', $src);
    }

    /**
     * Sets the value of the "target" attribute
     * 
     * @param string $value
     * @return Tag 
     */
    public function target($value) {
        return $this->attr('target', $value);
    }

    /**
     * Sets the value of the "title" attribute
     * 
     * @param string $src
     * @return Tag
     */
    public function title($value) {
        return $this->attr('title', $value);
    }

    /**
     * Adds inline-style for "top"
     * 
     * @param string $value
     * @return Tag
     */
    public function top($value) {
        return $this->css('top', $value);
    }

    /**
     * Sets the content of tag to be the specified text
     * 
     * @param string $text
     * @return Tag
     */
    public function text($text = null) {
        if ($text) {
            $this->content = array($text);
        } else {
            $this->content = array();
        }
        return $this;
    }

    /**
     * Adds inline-style for "text-align"
     * 
     * @param string $value
     * @return Tag
     */
    public function textAlign($value) {
        return $this->css('text-align', $value);
    }

    /**
     * Sets the type attribute
     * 
     * @param string $type 
     * @return Tag
     */
    public function type($type) {
        return $this->attr("type", $type);
    }

    /**
     * Sets the value of the "Value" attribute
     * @param string $value
     * @return Tag 
     */
    public function value($value) {


        switch (strtolower($this->tagname)) {
            case 'textarea':
                return $this->attr('text', $value);

            case 'select':
                foreach ($this->content as $ct) {
                    if ($ct instanceof Tag) {
                        if ($ct->tagname == "option" && $ct->atts['value'] == $value) {
                            $ct->attr('selected', 'true');
                        }
                    }
                }

            default:
                return $this->attr("value", $value);
        }
    }

    /**
     * Sets the value of "onclick" attribute
     * 
     * @param string $value
     * @return Tag
     */
    public function onclick($value) {
        return $this->attr('onclick', $value);
    }

    /**
     * Sets the value of "onchange" attribute
     * 
     * @param string $value
     * @return Tag
     */
    public function onchange($value) {
        return $this->attr('onchange', $value);
    }

    /**
     * Sets the value of "onsubmit" attribute
     * 
     * @param string $value
     * @return Tag
     */
    public function onsubmit($value) {
        return $this->attr('onsubmit', $value);
    }

    /**
     * Adds inline-style for "outline"
     * 
     * @param string $value
     * @return Tag
     */
    public function outline($value) {
        return $this->css('outline', $value);
    }

    /**
     * Prepends something into the element
     * 
     * @param string|Tag $what
     * @return Tag
     */
    public function prepend($what) {
        array_unshift($this->content, $what);
        return $this;
    }

    /**
     * Prepends tag into the specified tag
     * 
     * @param Tag $tag
     * @return Tag
     */
    public function prependTo($tag) {
        $tag->prepend($this);
        return $this;
    }

    /**
     * Sets the value of the "selected" attribute
     * 
     * @param string $action
     * @return Tag
     */
    public function selected($action) {
        return $this->attr('selected', $action);
    }

    /**
     * Sets the text of the tag with script format
     * 
     * @param string $text
     * @return string
     */
    public function scriptText($text) {
        //return $this->text("<!--\n$text\n//-->");
        return $this->text("\n$text\n");
    }

    /**
     * Sets the value of "size" attribute
     * 
     * @param int|string
     * @return Tag
     */
    public function size($value) {
        return $this->attr('size', $value);
    }

    /**
     * Returns the tag as a string
     * 
     * @return Tag
     */
    public function __toString() {
        return $this->render();
    }

    /**
     * Adds inline-style for "visibility"
     * 
     * @param string $value
     * @return Tag
     */
    public function visibility($value) {
        return $this->css('visibility', $value);
    }

    /**
     * Adds inline-style for "width"
     * 
     * @param string $value
     * @return Tag
     */
    public function width($value) {
        return $this->css('width', $value);
    }

    /**
     * Adds inline-style for "z-index"
     * 
     * @param string $value
     * @return Tag
     */
    public function zIndex($value) {
        return $this->css('z-index', $value);
    }

}

/**
 * Creates a new tag on the fly
 * @param string $name
 * @return Tag
 */
function tag($name) {
    return new Tag($name);
}