import React from 'react'

const button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text} </button>
  )
}

export default button