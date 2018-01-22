module latte {

    export interface IRemoteResponse{
        success: boolean;
        data: any;
        errorCode: number;
        errorDescription: string;
    }

}