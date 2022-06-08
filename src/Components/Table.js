import React from 'react'

const Table = (props) => {
  

  return (
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>city</th>
        <th>age</th>
      </tr>
    </thead>
    <tbody>{props.body.map(key=><tr key={key.id}>
      <td>{key.name}</td>
      <td>{key.city}</td>
      <td>{key.age}</td>
      </tr>)}</tbody>
   </table>
  )
}

export default Table