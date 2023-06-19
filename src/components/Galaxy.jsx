import React from 'react'
import "../App.css"
const Galaxy = ({id,name,diameter}) => {
  return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{diameter}</td>
    </tr>
  )
}

export default Galaxy