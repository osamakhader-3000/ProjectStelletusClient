export default class GeneralApiResult
{
    HasError:boolean;
    Error:string;
    Data:any;
    constructor(hasError:boolean,error:string,data:any){
        this.HasError = hasError;
        this.Error = error;
        this.Data = data;
    }
}