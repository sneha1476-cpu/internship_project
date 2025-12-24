

function createResult(err,data){
    result={}
    if(data){
        result.status="success"
        result.data=data
    }
    else{
        result.status="error"
        result.data=err
   }
   return result
}
module.exports={createResult}