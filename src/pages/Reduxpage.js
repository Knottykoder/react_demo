import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../Components/Form";
import Button from "../Components/Button";
import Table from "../Components/Table";
import {
  saveData,
  deleteData,
  tempfilter,
  filterData,
  showAllData,
  getObject,
  updateInfo
} from "../Components/actions";

const Reduxpage = () => {
  const [value, setvalue] = useState();
  const [tempValue, settempValue] = useState();
  const [form,setform] = useState({name:"",city:"",age:""})
  const [isediting , setisediting] = useState(false)

  
  const Dispatch = useDispatch();

  const dataa = useSelector((state) => state.Reducer.info);
  const filterValue = useSelector((state) => state.Reducer.temp);
  const tableData = useSelector((state) => state.Reducer.filteredData);
  const tempObj = useSelector((state)=>state.Reducer.tempObj)

  const key = dataa.flatMap((key) => Object.keys(key));
  const tags = key.filter((item, index) => key.indexOf(item) === index);
  const info = filterValue.filter(
    (item, index) => filterValue.indexOf(item) === index
  );

  useEffect(()=>{
    let find = dataa.find(item=>item.id ===value)
    if(find === undefined){
      return 
    }else{
      Dispatch(getObject(find))
    }
    setform({
      name: tempObj.name,
      city: tempObj.city,
      age: tempObj.age
    });
  },[value,tempObj])

  const handleChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
      id: new Date().getTime().toString()
    });
  };
  const getIndex = (e)=>{
    setvalue(e.target.value)
    setisediting(true)
   }
  const saveUser = ()=>{
    Dispatch(saveData(form))
    setform({ name: "", city: "" ,age:""});
  }
  const updateUser = ()=>{
    Dispatch(updateInfo(form,value))
    setform({ name: "", city: "" ,age:""});
    setisediting(false)
  }

  return (
    <div>
      <h1>USING REDUX</h1>
      <Form handleChange={handleChange} value={form}/>
      <Button text={isediting? "update": "Save"} onClick={isediting? updateUser : saveUser}/>
      <br/>
      <select onChange={ getIndex}>
        <option>----Select Id</option>
        {dataa.map((key) => (
          <option key={key.id}>{key.id}</option>
        ))}
      </select>
      <Button text="Delete" onClick={() => Dispatch(deleteData(value))} />
      <br />
      <select onChange={(e) => Dispatch(tempfilter(e.target.value))}>
        <option>----Select tag</option>
        {tags.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
      <select onChange={(e) => settempValue(e.target.value)}>
        <option>----Select value</option>
        {info.map((key, index) => (
          <option key={index}>{key}</option>
        ))}
      </select>
      <Button text="filter" onClick={() => Dispatch(filterData(tempValue))} />
      <Button text="All" onClick={() => Dispatch(showAllData())} />
      <hr />
      <Table body={tableData} />
    </div>
  );
};

export default Reduxpage;
