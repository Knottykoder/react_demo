import React, { useEffect } from "react";
import { useState } from "react";
import Button from "./Button";
import { saveData ,updateInfo} from "./actions";
import { useDispatch } from "react-redux";

const Form = (props) => {
  const [name, setname] = useState("");
  const [city, setcity] = useState("");
  const [age, setage] = useState("");
  const Dispatch = useDispatch();
  
  useEffect(()=>{
   setcity(props.update.city)
   setage(props.update.age)
   setname(props.update.name)
  },[props.update])

  const id = props.value
  const FormHandler = (e) => {
    e.preventDefault();
  };

  const getName = (e) => {
    setname(e.target.value);
  };
  const getCity = (e) => {
    setcity(e.target.value);
  };
  const getAge = (e) => {
    setage(e.target.value);
  };

  const SaveData = (e) => {
    // props.adduser(name, city, age);
    props.addInfo(name,city,age)
    // Dispatch(saveData(name, city, age))
    setname("");
    setcity("");
    setage("");
  };

  const updateData = () => {
    // props.updateInfo(name,city,age)
    props.updateList(name,city,age)
    // Dispatch(updateInfo(name,city,age,id))
    setname("");
    setcity("");
    setage("");
  };

 

  return (
    <>
      <form onSubmit={FormHandler}>
        <label>Name:</label>
        <input type="text" onChange={getName} value={name} />
        <label>City:</label>
        <input type="text" onChange={getCity} value={city} />
        <label>Age:</label>
        <input type="number" onChange={getAge} value={age} />
        <Button text="Save" onClick={SaveData}/>
       <Button text="Update" onClick={updateData} />
      </form>
    </>
  );
};

export default Form;
