import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../Components/Form";
import Button from "../Components/Button";
import Table from "../Components/Table";
import {
  deleteData,
  tempfilter,
  filterData,
  showAllData,
  getObject
} from "../Components/actions";

const Reduxpage = () => {
  const [value, setvalue] = useState();
  const [tempValue, settempValue] = useState();


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

  const getIndex = (e)=>{
    setvalue(e.target.value)
    let find = dataa.find(item=>item.id ===value)
    if(find === undefined){
      return 
    }else{
      Dispatch(getObject(find))
    }
  }
 

  return (
    <div>
      <h1>USING REDUX</h1>
      <Form value={value} update={tempObj}/>
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
