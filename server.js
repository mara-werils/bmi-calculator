const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        return res.send('<h2>Invalid input. Please enter positive numbers for weight and height.</h2>');
    }
    const bmi = weight / (height * height);
    let category;
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }
    res.send(`<h2>Your BMI is ${bmi.toFixed(2)}. Category: ${category}</h2>`);
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
