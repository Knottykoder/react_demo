import React, { useReducer, useContext, useState, useEffect } from "react";
import { createContext } from "react";
import Form from "../Components/Form";
import Button from "../Components/Button";
import Table from "../Components/Table";

const initialState = {
  data: [],
  temp: [],
  value: "",
  tableInfo: [],
  tempObj : {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Save":
      return {
        ...state,
        data: [
          ...state.data,
         action.value
        ],
      };
    case "Remove":
      const newData = state.data.filter((item) => item.id !== action.value);
      return {
        ...state,
        data: newData,
      };
    case "filter":
      return {
        ...state,
        temp: state.data.flatMap((key) => key[action.value]),
      };
    case "selectedvalue":
      return {
        ...state,
        value: action.value,
      };
    case "filterData":
      let tempdata = state.data.filter(
        (item) =>
          item.name.includes(action.value) ||
          item.city.includes(action.value) ||
          item.age.includes(action.value)
      );
      return {
        ...state,
        tableInfo: tempdata,
      };
      case "updateObject" : return {
        ...state,
        tempObj : action.value
      }
    case "showData":
      return {
        ...state,
        tableInfo: state.data,
      };
      case "update":  
         let findIndex = state.data.findIndex(item=>item.id === action.value.value)
         let elements = [...state.data]
         elements[findIndex ] = {id:action.value.value, name: action.value.form.name,
          city: action.value.form.city,
          age: action.value.form.age }
      return {
        ...state,
         data: elements
      }
    default:
      return state;
  }
};

const Contextpage = () => {
  const context = createContext();
  const [form,setform] = useState({name:"",city:"",age:""})
  const [isediting , setisediting] = useState(false)
  const [value, setvalue] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    let find = state.data.find(item=>item.id===value)
    if (find === undefined) {
      return;
    } else {
      dispatch({type: "updateObject", value: find});
    }
    setform({
      name: state.tempObj.name,
      city: state.tempObj.city,
      age: state.tempObj.age
    });
  },[value,state.tempObj])

  const handleChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
      id: new Date().getTime().toString()
    });
  };

  const saveInfo = () => {
    dispatch({
      type: "Save",
      value: form,
    });
    setform({ name: "", city: "" ,age:""});
  };
  const key = state.data.flatMap((key) => Object.keys(key));
  const tags = key.filter((item, index) => key.indexOf(item) === index);

  const filterHandler = (e) => {
    dispatch({
      type: "filter",
      value: e.target.value,
    });
  };

  const filterInfo = state.temp.filter(
    (item, index) => state.temp.indexOf(item) === index
  );

  const filterData = () => {
    dispatch({
      type: "filterData",
      value: state.value,
    });
  };
  const tempData = (e) => {
    dispatch({
      type: "selectedvalue",
      value: e.target.value,
    });
  };

  const showAll = () => {
    dispatch({
      type: "showData",
    });
  };
 
  const getUpdateObject = (e)=>{
    setvalue(e.target.value)
    setisediting(true)
  }
   const updated = ()=>{
     dispatch({
       type: "update",
       value:{value,form}
     })
     setform({ name: "", city: "" ,age:""});
     setisediting(false)
   }
  return (
    <div>
      <h1>USING CONTEXT</h1>
      <Form handleChange={handleChange} value={form}/>
      <Button text={isediting? "update": "Save"} onClick={isediting? updated : saveInfo }/>
      <br/>
      <select onChange={getUpdateObject}>
        <option>----Select Id</option>
        {state.data.map((key) => (
          <option>{key.id}</option>
        ))}
      </select>
      <Button
        text="Delete"
        onClick={() => dispatch({ type: "Remove", value: value })}
      />
      <br />
      <select onChange={filterHandler}>
        <option>----Select tag</option>
        {tags.map((item) => (
          <option>{item}</option>
        ))}
      </select>
      <select onChange={tempData}>
        <option>----Select value</option>
        {filterInfo.map((item) => (
          <option>{item}</option>
        ))}
      </select>
      <Button text="Filter" onClick={filterData} />
      <Button text="All" onClick={showAll} />
      <hr />
      <Table body={state.tableInfo} />
    </div>
  );
};

export default Contextpage;
