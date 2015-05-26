
declare var rangy: any;
declare var strings: latte.Strings;

/**
 * Data of a page load result from Server DataLatte
 */
interface PageResult<T>{
    records: Array<T>;
    recordcount: number;
    page: number;
    pages: number;
}

interface RangySelection {
    isCollapsed: boolean;
    rangeCount: number;
    getRangeAt(index: number): RangyRange;
}

interface RangyRange {
    insertNode(any);
    startContainer: any;
    endContainer: any;
    canSurroundContents(): boolean;
    surroundContents(any);
    collapsed: boolean;
}

interface GenericCallback {
    (...any): any;
    (any): any;
}


interface JQuery{

    clear();
    instance();

    right(): number;

    rectangle(): latte.Rectangle;
    rectangle(rect: latte.Rectangle): latte.Rectangle;
    rectangle(rect: latte.Rectangle , relative): latte.Rectangle;

    tag(): any;
    tag(value: any);

    innerRectangle(): latte.Rectangle;
    innerRectangle(rect: latte.Rectangle): latte.Rectangle;
    innerRectangle(rect: latte.Rectangle , relative): latte.Rectangle;
}