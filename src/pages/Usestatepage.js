import React, { useState } from "react";
import Form from "../Components/Form";
import Button from "../Components/Button";
import Table from "../Components/Table";

const Usestatepage = () => {
  const [List, setList] = useState([]);
  const [value, setvalue] = useState();
  const [tags, settags] = useState([]);
  const [getInfo, setgetInfo] = useState([]);
  const [tableData, settableData] = useState([]);
  const [selectvalue, setselectvalue] = useState();
  const [object, setObject] = useState({});

  const adduser = (name, city, age) => {
    setList((prev) => {
      return [
        ...prev,
        { id: new Date().getTime().toString(), name, city, age },
      ];
    });
  };

  const removeHandler = () => {
    let updatelist = List.filter((item) => item.id !== value);

    setList(updatelist);
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
    let find = List.find((item) => item.id === value);
    if (find === undefined) {
      return;
    } else {
      setObject(find);
    }
     };
  const updateInfo = (name,city,age) => {
    let findindex = List.findIndex(item=>item.id===value)
     let elements = [...List]
     elements[findindex] = { id: value ,name,city,age};
     setList(elements)
  }

  return (
    <div>
      <h1>USING USESTATE</h1>
      <Form adduser={adduser} update={object} updateInfo={updateInfo}/>

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
