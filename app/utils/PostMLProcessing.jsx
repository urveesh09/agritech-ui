import React from 'react'

export const PostMLProcessing = (data) => {
    // Assuming 'data' is a JSON string that needs to be parsed.
    data = JSON.parse(data);
    console.log(data, ' ', typeof(data));

    // Make sure that 'npk_output' is the correct key in your JSON.
    const npk_output = data['npk_output'] || data.npk_output;
    console.log(npk_output);

    const moisture_output = data['moisture_output'];
    const overall = data['overall_Fert'];
    console.log(moisture_output);

    // Declare 'prediction' with 'const' or 'let'.

    const prediction = JSON.parse(data['prediction']);
    console.log('Prediction')
    console.log(prediction)
    return {npk_output,moisture_output, prediction,overall}; 
}

export default PostMLProcessing

