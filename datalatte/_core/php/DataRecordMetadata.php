<?php
/**
 * Created by PhpStorm.
 * User: menendezpoo
 * Date: 9/27/13
 * Time: 1:09 AM
 */

class DataRecordMetadata {

    /**
     * Default Action structure
     * @var array
     */
    private static $defaultAction = array(
        'text' => '',
        'description' => '',
        'method' => '',
        'js-call' => '',
        'js-before' => '',
        'js-after' => '',
        'params' => array(),
        'refreshes' => true,
        'return' => '',
        'confirm' => null,
        'is-visible' => true
    );

    /**
     * Default Entity structure
     * @var array
     */
    private static $defaultEntity = array(
        'title' => '',
        'name' => '',
        'relationships' => array(),
        'fields' => array(),
        'icon' => null,
        'actions' => array(),
        'listings' => array(),
        'tabs' => array(),
        'can-insert' => true,
        'can-delete' => false,
        'can-update' => true,
        'can-read' => true,
    );

    /**
     * Default Filter structure
     * @var array
     */
    private static $defaultFilter = array(
        'operators' => '</>/<=/>=/LIKE/BETWEEN',
        'custom-operators' => array(),
        'expr-a' => null,
        'expr-b' => null,
        'expr-c' => null
    );

    /**
     * Default FilterOperator structure
     * @var string
     */
    private static $defaultFilterOperator = array(
        'text' => '',
        'fields' => array(),
        'evaluator' => ''
    );

    /**
     * Default Input structure
     * @var string
     */
    private static $defaultInput = array(
        'text' => '',
        'field' => '',
        'description' => '',
        'helper' => '',
        'actions' => array(),
        'type' => 'string',
        'options' => array(),
        'format' => '',
        'fields' => array(),
        'list-visible' => false,
        'grid-visible' => true,
        'form-visible' => true,
        'grid-input-visible' => true,
        'filter' => null,
        'max-length' => 0,
        'source' => null,
        'readonly' => '',
        'mandatory' => false,
        'width' => 0,
        'height' => 0,
        'style' => '',
        'default-value' => null,
        'is-visible' => true,
        'class' => '',
    );

    /**
     * Default Listring structure
     * @var array
     */
    private static $defaultListing = array(
        'type' => '',
        'page' => 0,
        'text' => '',
        'description' => '',
        'actions' => array(),
        'pickable' => false,
        'icon' => null,
        'editable' => false,
        'insertable' => false,
        'filters' => array(),
        'available' => true,
        'order' => array(),
    );

    /**
     * Default Relationshp structure
     * @var array
     */
    private static $defaultRelationship = array(
        'title' => '',
        'tab-text' => '',
        'description' => '',
        'type' => '',
        'cardinality' => null,
        'key' => '',
        'key-foreign' => '',
        'connector' => null,
        'affect' => 'auto',
        'elements-editable' => true,
        'elements-mode' => 'grid',
        'elements-remove' => true,
        'elements-insert' => true,
        'elements-add' => true,
        'elements-swap' => true,
        'show-fields' => false,
        'is-children' => false,
        'is-parent' => false,
        'is-longlist' => false,
        'is-visible' => true,
        'icon' => null,
        'actions' => array(),
        'attributes' => array(),
        'listing' => array(),
        'listing-key' => '',
        'visible-if-empty' => true,
        'visible-if-new' => false,
    );

    /**
     * Default Tab structure
     * @var array
     */
    private static $defaultTab = array(
        'text' => '',
        'description' => '',
        'icon' => null,
        'actions' => array(),
        'renderer' => ''
    );

    /**
     * Gets the metadata of the specified DataRecord
     *
     * @param DataRecord $record
     * @return array|null|type
     */
    public static function byRecord(DataRecord $record){
        if (!$record->_metadata) {

            // Get metadata
            $metadata = $record->metadata();

            // Extend
            $metadata = self::extendEntity($metadata, $record);

            // Save
            $record->_metadata = $metadata;
        }

        return $record->_metadata;
    }

    /**
     * Checks if logged user can delete the specified record based on record's metadata
     * @param DataRecord $record
     * @param array $metadata
     * @return boolean
     */
    public static function canDelete($record) {
        $metadata = self::byRecord($record);
        return $metadata['can-delete'];
    }

    /**
     * Checks if logged user can read the specified record based on record's metadata
     * @param DataRecord $record
     * @param array $metadata
     * @return boolean
     */
    public static function canRead($record) {
        $metadata = self::byRecord($record);
        return $metadata['can-read'];
    }

    /**
     * Checks if logged user can edit the specified record based on record's metadata
     *  If no parameters are passed method will use
     * @param DataRecord $record
     * @param array $metadata
     * @return boolean
     */
    public static function canEdit($record) {
        $metadata = self::byRecord($record);
        return $metadata['can-update'];
    }

    /**
     * Checks if logged user can insert the specified record based on record's metadata
     *  If no parameters are passed method will use
     * @param DataRecord $record
     * @param array $metadata
     * @return boolean
     */
    public static function canInsert($record) {
        $metadata = self::byRecord($record);
        return $metadata['can-insert'];
    }

    /**
     * Merge the contents of two or more arrays together into the first array
     * (It works like jQuery.extend)
     * @param array Array1
     * @return array Merged array
     */
    private static function extend() {
        $args = func_get_args();
        $extended = array();
        if (is_array($args) && count($args)) {
            foreach ($args as $array) {
                if (is_array($array)) {
                    $extended = array_merge($extended, $array);
                }
            }
        }
        return $extended;
    }

    /**
     * Extends Action arrays, setting its missing default attributes.
     * @param array $action Action data
     * @return array Action with defaults established
     */
    private static function extendAction($action) {
        $action = self::extend(self::$defaultAction, $action);

        foreach ($action['params'] as $key => &$input)
            $input = self::extendInput($input, $key);

        return $action;
    }

    /**
     * Extends Entity arrays, setting its missing default attributes.
     * @param array $entity Entity data
     * @param array $record Entity data
     * @return array Entity with defaults established
     */
    private static function extendEntity($entity, $record) {

        $entity = self::extend(self::$defaultEntity, $entity);

        // Extend relationships
        foreach ($entity['relationships'] as $key => &$rel)
            $rel = self::extendRelationship($rel, $key);

        // Extend Fields
        foreach ($entity['fields'] as $key => &$input)
            $input = self::extendInput($input, $key);

        // Icon is not extended
        // Extend Actions
        foreach ($entity['actions'] as &$action)
            $action = self::extendAction($action);

        // Extend Lists
        foreach ($entity['listings'] as &$list)
            $list = self::extendListing($list, get_class($record));

        // Extend Tabs
        foreach ($entity['tabs'] as &$tab)
            $tab = self::extendTab($tab);

        return $entity;
    }

    /**
     * Extends Filter arrays, setting its missing default attributes.
     * @param array $filter Filter data
     * @return array Filter with defaults established
     */
    private static function extendFilter($filter) {
        $filter = self::extend(self::$defaultFilter, $filter);

        // Extend filter
        foreach ($filter['custom-operators'] as &$operator)
            $operator = self::extendFilterOperator($operator);

        return $filter;
    }

    /**
     * Extends FilterOperator arrays, setting its missing default attributes.
     * @param array $operator FilterOperator data
     * @return array FilterOperator with defaults established
     */
    private static function extendFilterOperator($operator) {
        $operator = self::extend(self::$defaultFilterOperator, $operator);

        // Extend filter
        foreach ($operator['fields'] as $key => &$input)
            $input = self::extendInput($input, $key);

        return $operator;
    }

    /**
     * Extends Input arrays, setting its missing default attributes.
     * @param array $input Input data
     * @param array $inputKey Input data
     * @return array Input with defaults established
     */
    private static function extendInput($input, $inputKey) {

        $input = self::extend(self::$defaultInput, $input);

        // Extend Actions
        foreach ($input['actions'] as &$action)
            $action = self::extendAction($action);

        // Extend fields
        foreach ($input['fields'] as $key => &$sinput)
            $sinput = self::extendInput($sinput, $key);

        if (!$input['field']) {
            $input['field'] = $inputKey;
        }

        // Extend filter (if present)
        if ($input['filter'])
            $input['filter'] = self::extendFilter($input['filter']);

        return $input;
    }

    /**
     * Extends List arrays, setting its missing default attributes.
     * @param array $list List data
     * @param array $type List data
     * @return array List with defaults established
     */
    private static function extendListing($list, $type) {

        if (!$type)
            die("No type!");

        $list = self::extend(self::$defaultListing, $list);

        $list['type'] = $type;


        // Extend actions
        foreach ($list['actions'] as &$action)
            $action = self::extendAction($action);

        return $list;
    }

    /**
     * Extends Relationship arrays, setting its missing default attributes.
     * @param array $relationship Relationship data
     * @param array $relationshipKey Relationship data
     * @return array Relationship with defaults established
     */
    private static function extendRelationship($relationship, $relationshipKey) {
        $relationship = self::extend(self::$defaultRelationship, $relationship);

        // Extend actions
        foreach ($relationship['actions'] as &$action)
            $action = self::extendAction($action);

        // Extend attributes
        foreach ($relationship['attributes'] as $key => &$input)
            $action = self::extendInput($input, $key);

        if (!$relationship['key']) {
            $relationship['key'] = $relationshipKey;
        }

        return $relationship;
    }

    /**
     * Extends Tab arrays, setting its missing default attributes.
     * @param array $tab Tab data
     * @return array Tab with defaults established
     */
    private static function extendTab($tab) {
        $tab = self::extend(self::$defaultTab, $tab);

        // Extend actions
        foreach ($tab['actions'] as &$action)
            $action = self::extendAction($action);

        return $tab;
    }

} 