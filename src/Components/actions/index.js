export const saveData = (user)=>{
    return {
        type:"SAVE",
        payload:{
            data:user
        }
        }
}

export const deleteData = (id)=>{
    return  {
        type:"DELETE",
        payload: id
    }
}
export const tempfilter = (id)=>{
    return {
        type: "filter",
        payload:id
    }
}
export const filterData = (id)=>{
    return {
         type:"filterInfo",
         payload:id
    }
}
export const showAllData =()=>{
    return{
        type: "showData"
    }
}
export const getObject = (obj)=>{
  return {
       type: "updateObject",
       payload: obj
  }
}
export const updateInfo = (user,value)=>{
   return{
       type: "UpdateList",
       payload: {user,value}
   }
}

