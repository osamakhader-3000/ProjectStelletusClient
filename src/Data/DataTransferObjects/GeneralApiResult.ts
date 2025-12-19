export class GeneralApiResult<T> {
    public readonly data: T | null;
    public readonly resultCode: number;
    public readonly resultMessage: string;

 
    constructor(resultCode: number, resultMessage: string , data: T | null) {
        this.resultCode = resultCode;
        this.resultMessage = resultMessage;
        this.data = data;
    }
}