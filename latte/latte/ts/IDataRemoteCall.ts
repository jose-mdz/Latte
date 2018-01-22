module latte {

    /**
     * Object who contains marshalled call data
     */
    export interface IDataRemoteCall{
        moduleName: string;
        className: string;
        method: string;
        id: number;
        params: any;
    }

}