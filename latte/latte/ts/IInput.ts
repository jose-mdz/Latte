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
     * Specifies an input description
     */
    export interface IInput{
        type?: 'string' | 'text' | 'html' | 'number' | 'integer' | 'float' | 'boolean' | 'switch' | 'password' |
            'date' | 'time' | 'datetime' | 'enumeration' | 'combo' | 'radio' | 'flags' | 'file' | 'image' | 'record' |
            'record-combo' | 'custom';
        options?: IInputOptions | IInputFlagOptions | String[];
        visible?: boolean | 'if-inserted' | 'if-not-inserted';
        loaderFunction?: (...any) => any;
        readOnly?: boolean;
        recordType?: string;
        text?: string;
        defaultValue?: any;
        category?: string;
        hint?: string;
    }
}