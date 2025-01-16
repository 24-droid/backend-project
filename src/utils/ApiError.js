class ApiError extends Error{
    constructor(
        statusCode,
        message="Something Went Wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null,
        this.message=message,
        this.success=false,
        this.errors=errors
        if(stack){
        this.stack=stack
        }
        else{
        Error.captureStackTrace(this,this.constructor)  // This is used to track the function calls that led to error.
        }
    }
}
export default ApiError