import React, { useEffect, useState } from "react";
import Form from "../Components/Form";
import Button from "../Components/Button";
import Table from "../Components/Table";

const Usestatepage = () => {
  const [form,setform] = useState({name:"",city:"",age:""})
  const [List, setList] = useState([]);
  const [value, setvalue] = useState();
  const [tags, settags] = useState([]);
  const [getInfo, setgetInfo] = useState([]);
  const [tableData, settableData] = useState([]);
  const [selectvalue, setselectvalue] = useState();
  const [object, setObject] = useState({});
  const [isediting , setisediting] = useState(false)
   
  useEffect(()=>{
    let find = List.find((item) => item.id === value);
    if (find === undefined) {
      return;
    } else {
      setObject(find);
    }
    setform({
      name: object.name,
      city: object.city,
      age: object.age
    });
  },[value,object])

  const handleChange = (event) => {
    setform({
      ...form,
      [event.target.name]: event.target.value,
      id: new Date().getTime().toString()
    });
  };

  const adduser = () => {
    setList([...List, form]);
    setform({ name: "", city: "" ,age:""});
  };

  const removeHandler = () => {
    let updatelist = List.filter((item) => item.id !== value);
    setList(updatelist);
    setisediting(false)
  };

  const gettags = () => {
    const key = List.flatMap((key) => Object.keys(key));
    const tags = key.filter((item, index) => key.indexOf(item) === index);
    setgetInfo(tags);
  };

  const filterHandler = () => {
    let tabledata = List.filter(
      (item) =>
        item.name.includes(selectvalue) ||
        item.city.includes(selectvalue) ||
        item.age.includes(selectvalue)
    );
    settableData(tabledata);
  };

  const changeHandler = (e) => {
    settags(e.target.value);
  };

  const getSelectedValue = (e) => {
    setselectvalue(e.target.value);
  };

  const tempinfo = List.flatMap((key) => key[tags]);
  const info = tempinfo.filter(
    (item, index) => tempinfo.indexOf(item) === index
  );

  const showAllData = () => {
    settableData(List);
  };

  const findObject = (e) => {
    setvalue(e.target.value);
    setisediting(true)
    };

    const updateData = () => {
      let findindex = List.findIndex((item) => item.id === value);
      let elements = [...List];
      elements[findindex] = { id: value, name: form.name, city: form.city ,age:form.age};
      setList(elements);
      setform({ name: "", city: "" ,age:""});
      setisediting(false);
    };

  return (
    <div>
      <h1>USING USESTATE</h1>
      <Form  value={form}  handleChange={handleChange}/>
       <Button text={isediting? "update": "Save"} onClick={isediting? updateData : adduser}/>
      <br />
      <select value={value} onChange={findObject}>
        <option>----Select Id</option>
        {List.map((item) => (
          <option key={item.id}>{item.id}</option>
        ))}
      </select>
      <Button text="Delete" onClick={removeHandler} />
      <br />
      <select value={tags} onContextMenu={gettags} onChange={changeHandler}>
        <option>----Select tag</option>
        {getInfo.map((key) => (
          <option>{key}</option>
        ))}
      </select>
      <select onChange={getSelectedValue}>
        <option>----Select value</option>
        {info.map((key, index) => (
          <option key={index}>{key}</option>
        ))}
      </select>
      <Button text="Filter" onClick={filterHandler} />
      <Button text="All" onClick={showAllData} />
      <hr />
      <Table body={tableData} />
    </div>
  );
};

export default Usestatepage;
