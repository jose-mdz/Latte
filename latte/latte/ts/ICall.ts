module latte {

    /**
     *
     */
    export interface ICall {

        marshall(): IDataRemoteCall;

        respond(responseData: IRemoteResponse);

        send(success?: (data) => void, failure?: (errorDescription: string) => void): IMessage;

        withHandlers(success?: (data) => void, failure?: (errorDescription: string) => void): ICall;

        success: LatteEvent;

        failure: LatteEvent;

    }

}