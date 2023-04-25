import { useState,useEffect } from "react";
import DisplayTable from "./DisplayTable";
import './Form.css'
const Form=()=>{
    const [name, setName] = useState("");
    const [result, setResult] = useState([]);
    const [display, setDisplay] = useState(false);
  
    useEffect(() => {
      if (name.length < 3) {
        setResult([]);
        return;
      }

      
      
  
      const fetchGender = fetch(`http://localhost:8080/api/getGender/${name}`).then((res) =>
        res.json()
      );
      console.log(fetchGender,"Gender")
      const fetchAge = fetch(`http://localhost:8080/api/getAge/${name}`).then((res) => res.json());
      console.log(fetchAge,"Age")
      const fetchCountries = fetch(`http://localhost:8080/api/getCountry/${name}`).then((res) =>
        res.json()
      );
      console.log(fetchAge,"country")
  
      Promise.all([fetchGender, fetchAge, fetchCountries]).then(([gender, age, countries]) => {
        const country1 = countries.country[0];
        const country2 = countries.country[1];
        const result = [age, { country: country1.name, probability: country1.probability }];
        if (country2) {
          result.push({ country: country2.name, probability: country2.probability });
        }
        result.push(gender);
        setResult(result);
      });

    //   return () => {
    //     setDisplay(prev=>!prev)
    //   }

    }, [display===true]);


    
    
  
    function handleSubmit(event) {
      event.preventDefault();
      if (name.trim().length < 3) {
        alert("Please enter a name with at least 3 characters");
        return;
      }
      if(!/^[a-zA-Z\s]*$/.test(name)) {
        alert("Please enter a name with only letters and spaces");
        return;
      }
      if (/\s{2,}/.test(name)) {
        alert("Please enter a name with only one continuous space between words");
        return;
      }
      setDisplay(prev=>!prev);
    }
  
    function handleNameChange(event) {
      setName(event.target.value);
    }
  
    function clearResult() {
      setResult([]);
      setName("");
      setDisplay(false);
    }
  
    return (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <button type="submit" disabled={name.trim().length < 3}>
            Check Fun
          </button>
        </form>
        
        {display && <DisplayTable result={result} clearResult={clearResult} />} 
      </div>


    );
  }

  export default Form;
  