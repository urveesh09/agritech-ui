// This file is essentially that from ui Initiates the sending from sql to model and back 
import React, { useState } from 'react';
import io from 'socket.io-client';
import PostMLProcessing from '../utils/PostMLProcessing'
// import decryptClientResponse from '../utils/decrypt'
const MiddleMan = () => {
  const [data, setData] = useState('');
  const [response, setResponse] = useState();
  const [moist, setMoist] = useState();
  const [fert, setFert] = useState();
  const [CropName, setCropName] = useState('');
  // This function fetches data from the Node server's /map endpoint to get table from SQL 
  const getData = async () => {
    try {
      const response = await fetch('http://localhost:3020/map');
      const data = await response.text();
      setData(data);
      console.log(`Data received from SQL Database: ${data}`);
      return data;
    } catch (error) {
      console.error('Error fetching data from /map from the SQL Table Farm:', error);
    }
  };

  // This function sends data and the name of the Crop to the Node server which forwards it to the ML server
  const sendDataToServers = async (data,CropName) => {
    return new Promise((resolve, reject) => {
      console.log('Effort')
      const socket = io('192.168.29.187:3012', {
        transports: ['websocket']
      });
      socket.on('connect', () => {
        console.log('Connected to Node server');
        data=JSON.parse(data)
        data.push(CropName)
        data=JSON.stringify(data)
        setData(data)
        socket.emit('sendData',data);
      });

      socket.on('response', (response) => {
        console.log(`Response from ML server: ${response}`);
        // response = decryptClientResponse(response)
        resolve(response);
        socket.disconnect();
      });

      socket.on('connect_error', (error) => {
        console.error('Connection error:', 'This is error');
        reject(error);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from Node server');
      });
    });
  };

  // This function orchestrates the fetching and sending of data
  const handleFetchAndSend = async (e) => {
    e.preventDefault();
    console.log('jaan jiye')
    const data = await getData();
    if (data) {
      try {
        const response = await sendDataToServers(data,CropName);
        console.log(response)
        const {npk_output,moisture_output, prediction,overall}=PostMLProcessing(response)
        console.log('Process')
        console.log(overall)
        setResponse(npk_output);
        setMoist(moisture_output);
        setFert(overall)
    //     setResponse('You have to increase the value of N in the soil by 9.0 You have to decrease the value of K in the soil by 5.0 You have to increase the value of P in the soil by 0.0');
    // setMoist('You have to decrease the value of moisture in the soil by 8.0');
    // setFert('19:19:19 NPK')  
        console.log(`Server response: ${npk_output}`);
      } catch (error) {
        console.error('Error sending data to server:', 'There is error here');
      }
    }

  };
  const handleChange = (e) => {
    setCropName(e.target.value);
    console.log('Change')
    
  };
  return (
    <div>
      <form onSubmit={handleFetchAndSend}>
      <div>
          <label>Cropname </label>
          <input type="text" name={CropName} value={CropName} onChange={handleChange} />
        </div>
      <button type='submit'>Fetch and Send Data</button>
      </form>
      <div>
        {/* <p>Your data(s) which we received from Table: {data}</p> */}
        <p>Server response: {moist}</p><br />
        <p>Server response: {response}</p>
        <br />
        <p>Server response: {fert}</p>

        
      </div>
    </div>
  );
};

export default MiddleMan;
