// PENDING DELETION 
import io from 'socket.io-client';
export const DatatoModel = (data) => {
    return new Promise((resolve, reject) => {
const socket = io('http://192.168.29.87:3012', {
    transports: ['websocket']
});

socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('sendData',JSON.stringify(data));

});

socket.on('response', (response) => { 
    console.log(response);  // resolve the Promise with the response
    resolve(response);
    socket.disconnect();  // disconnect after receiving a response
});

socket.on('connect_error', (error) => {
    console.log("Connection Error: ", error);  // more informative error message
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

});
};

export default { DatatoModel };

