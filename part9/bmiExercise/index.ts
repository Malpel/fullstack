import express from 'express';
import { getBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello, Full Stack!");
});

app.get('/bmi', (req, res) => {
    try {
        if (req.query.weight == null || req.query.height == null
            || isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
            throw new Error('malformatted parameters');
        }

        const reqWeight = Number(req.query.weight);
        const reqHeight = Number(req.query.height);

        res.json(
            {
                weight: reqWeight,
                height: reqHeight,
                bmi: getBmi(reqHeight, reqWeight)
            }
        );
    } catch (e) {
        res.status(400);
        res.send('malformatted parameters');
        console.log('Error: ', e.message);
    }

});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;

    try {
        res.json(exerciseCalculator(daily_exercises, target));
    } catch (e) {
        res.status(400);
        res.send('Error: '+ e.message);
        console.log('Error: ', e.message);
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});