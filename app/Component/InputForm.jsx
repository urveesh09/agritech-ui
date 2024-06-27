//  PENDING DELETION 
import React, { useState } from 'react';
// import { sendDataToServers } from '../utils/HardwareClient.jsx'; // replace with the path to your socketClient.js file
import {DatatoModel} from '../utils/ModelClient.jsx'
const InputForm = () => {
  const [state, setState] = useState({
    temperature: '',
    Humidity  : '',
    moisture: '',
    N: '',
    K: '',
    P: '',
    cropname: '',
  });
  const [response, setResponse] = useState(null);  // new line
  const [responses, setResponses] = useState(null);  // new line

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {  // new line
    e.preventDefault();
    // Send data to server
    console.log(state)
    const serverResponses = await DatatoModel(state);  // new line
    setResponses(serverResponses);  
    // const serverResponse= await sendDataToServers(state);  // new line
    // setResponse(serverResponse);  
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(state).map((key) => (
        <div key={key}>
          <label>{key}:</label>
          <input type="text" name={key} value={state[key]} onChange={handleChange} />
        </div>
      ))}
      <button type="submit">Submit</button>
      {response && <p>{response}</p>}
      <p>This is Hardware thing</p>
      {responses && <p>{responses}</p>}
    </form>
  );
};

export default InputForm;
