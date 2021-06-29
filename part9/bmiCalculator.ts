
const bmi = (a: number, b: number): number => {
    const meters = a / 100;
    return b/(meters**2);
}
// TODO: error handling: too few arguments, wrong types, division by 0, etc 
const calculateBmi = (args: string[]): string => {
    const bmiRes = bmi(Number(args[2]), Number(args[3]));

    if (bmiRes < 18.5) {
        return "Underweight";
    } else if (bmiRes > 30) {
        return "Obese";
    } else if (bmiRes > 25 && bmiRes < 30) {
        return "Overweight";
    } else return "Normal (healthy weight)";
       
}

console.log(calculateBmi(process.argv))