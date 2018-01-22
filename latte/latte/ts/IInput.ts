/**
 * Created by josemanuel on 8/9/16.
 */
module latte {

    export interface IInputOptions{
        [index: string]: string;
    }

    export interface IInputFlagOptions{
        [index: number]: string;
    }

    export interface IInputList{
        [field: string]: IInput;
    }

    /**
     * Boolean that resolves based on criteria
     */
    export type InputResolvedBoolean = boolean | 'if-inserted' | 'if-not-inserted' | 'if-value' | 'if-readonly-and-value';

    /**
     * Types of input
     */
    export type InputType = 'string' | 'text' | 'html' | 'number' | 'integer' |
        'float' | 'boolean' | 'switch' | 'password' |
        'date' | 'time' | 'datetime' | 'enumeration' | 'combo' |
        'radio' | 'flags' | 'file' | 'image' | 'record' |
        'record-combo' | 'color' | 'custom'

    /**
     * Specifies an input description
     */
    export interface IInput{
        type?: InputType;
        options?: IInputOptions | IInputFlagOptions | String[];
        visible?: InputResolvedBoolean;
        loaderFunction?: (...any) => any;
        readOnly?: InputResolvedBoolean;
        recordType?: string;
        text?: string;
        defaultValue?: any;
        category?: string;
        hint?: string;
        separator?: InputResolvedBoolean;
        nullable?: InputResolvedBoolean;
        updatesForm?: InputResolvedBoolean;
        customFunction?: () => any; // Should return a ValueItem
    }
}