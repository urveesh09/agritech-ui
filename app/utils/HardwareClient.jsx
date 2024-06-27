// PENDING DELETION 
import io from 'socket.io-client';
export const sendDataToServers = (data) => {
  return new Promise((resolve, reject) => {
    const socket = io('http://localhost:3012');
    // const socket = io('http://localhost:3012');
     // create a new connection
    console.log("Connecting to server")
    socket.emit('sendData', JSON.stringify(data));

    socket.on('response', (response) => {
      resolve(response); 
      console.log(response) // resolve the Promise with the response
      socket.disconnect();  // disconnect after receiving a response
    });

    socket.on('connect_error', (error) => {
      reject(error);  // reject the Promise if there's a connection error
    });
  });
};

export default { sendDataToServers };

