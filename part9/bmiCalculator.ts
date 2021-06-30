
const bmiCalc = (a: number, b: number): number => {
    const meters = a / 100;
    return b / (meters ** 2);
};

const calculateBmi = (args: string[]): string => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if ((!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) && (Number(args[2]) > 0 && Number(args[3]) > 0)) {
        return getBmi(Number(args[2]), Number(args[3]));

    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const getBmi = (height: number, weight: number): string => {
    const bmi = bmiCalc(height, weight);

    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi > 30) {
        return "Obese";
    } else if (bmi > 25 && bmi < 30) {
        return "Overweight";
    } else return "Normal (healthy weight)";
};

try {
    console.log(calculateBmi(process.argv));
} catch (e) {
    console.log('Error, something went wrong:', e.message);
}