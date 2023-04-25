import React from 'react'

const DisplayTable = ({ result, clearResult }) => {
  console.log(result,"result")
    if (result.length === 0) {
        return null;
        }
    const [age, country1, country2, gender] = result; 
    console.log(country1,"country1")
    console.log(country2,"country2")
    return (
        <table>
        <thead>
        <tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Age</th>
        <th>Country</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>{age.name}</td>
        <td>{gender.gender}</td>
        <td>{age.age}</td>
        <td>
        {country1.country} ({country1.probability}%)
        <br />
        {country2.country} ({country2.probability}%)
        </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
        <td colSpan="4">
        <button onClick={clearResult}>Clear</button>
        </td>
        </tr>
        </tfoot>
        </table>
         );
        }


export default DisplayTable