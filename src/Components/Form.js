import React from "react";


const Form = (props) => {
   
 const FormHandler = (e) => {
    e.preventDefault();
  };


  // const SaveData = (e) => {
  //   props.adduser(name, city, age);
  //   // props.addInfo(name,city,age)
  //   // Dispatch(saveData(name, city, age))
  //   setname("");
  //   setcity("");
  //   setage("");
  // };

  // const updateData = () => {
  //   props.updateInfo(name,city,age)
  //   // props.updateList(name,city,age)
  //   // Dispatch(updateInfo(name,city,age,id))
  //   setname("");
  //   setcity("");
  //   setage("");
  // };

  const changehandler = (e)=>{
    props.handleChange(e)
  }

  return (
    <>
      <form onSubmit={FormHandler}>
        <label>Name:</label>
        <input type="text" name= "name" onChange={changehandler} value={props.value.name} />
        <label>City:</label>
        <input type="text" name= "city" onChange={changehandler} value={props.value.city} />
        <label>Age:</label>
        <input type="number" name= "age" onChange={changehandler} value={props.value.age} />
     
      </form>
    </>
  );
};

export default Form;
