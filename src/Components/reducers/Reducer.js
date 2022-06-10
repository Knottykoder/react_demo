 const initial = {
    info:[],
    temp:[],
    filteredData:[],
    tempObj:{}
}

const Reducer = (state=initial,action)=>{
switch(action.type){
    case "SAVE":

    const {data}= action.payload
    return{
        ...state, 
        info:[...state.info,data]
        
    }
   case "DELETE": return {
       ...state,
       info: [...state.info].filter((item) => item.id !== action.payload)
   }
   case "filter": 
    const tag = action.payload
   return {
        ...state,
        temp: [...state.info].flatMap((key)=>key[tag])
   }
   case "filterInfo" : 
      const tempinfo =  [...state.info].filter(
        (item) =>
          item.name.includes(action.payload) ||
          item.city.includes(action.payload) ||
          item.age.includes(action.payload)
      );
   return {
       ...state,
       filteredData: tempinfo}

   case "showData" : return {
       ...state,
       filteredData: [...state.info]
   }
   case "updateObject" : return {
       ...state,
       tempObj : action.payload
   }
   case "UpdateList": 
    let findIndex = [...state.info].findIndex(item=>item.id === action.payload.value)
     let element = [...state.info]
     element[findIndex] =  {id:action.payload.value, name: action.payload.user.name,
        city: action.payload.user.city,
        age: action.payload.user.age }
   return {
       ...state,
       info : [...element]
   }
    default : return state
}
}

export default Reducer