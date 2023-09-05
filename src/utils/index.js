export const getRequestNameFromActionType = (actionType,status='/fulfilled')=>{
return actionType?.replace(status, "")
}