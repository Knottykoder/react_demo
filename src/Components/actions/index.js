export const saveData = (name,city,age)=>{
    return {
        type:"SAVE",
        payload:{
            data:{name,
            city,
        age,
    id: new Date().getTime().toString()}
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
export const updateInfo = (name,city,age,id)=>{
   return{
       type: "UpdateList",
       payload: {
        name, city, age,id
    }
   }
}

