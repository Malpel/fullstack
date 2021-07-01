
interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArgs = (args: string[]): Result => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (Number(args[2]) <= 0) throw new Error('Target must be greater than 0 (zero)');

    const training = calculateTraining(args);
    
    const target = Number(args[2]);
    const average = training.hoursTrained / (args.length - 3);
    const success = target < average;

    const rated = rate(target, average);

    return {
        periodLength: (args.length - 3),
        trainingDays: training.trainingDays,
        success,
        rating: rated.rating,
        ratingDescription: rated.descr,
        target,
        average
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateTraining = (args: any[]) => {
    let trainings = 0;
    let hoursTrained = 0; 

    // i needs to be set to 3 if you want to use the original command line version
    for (let i = 0; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            if (Number(args[i]) > 0) {
                trainings++;
                hoursTrained += Number(args[i]);
            }
        } else throw new Error(`Malformatted parameters`);
        
    }

    return {trainingDays: trainings, hoursTrained};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exerciseCalculator = (daily_exercises: any[], target: any) => {
    if (daily_exercises == null || target == null) throw new Error('Parameters missing');
    if (isNaN(Number(target))) throw new Error('Malformatted parameters');
    if (Number(target) <= 0) throw new Error('Target must be greater than 0 (zero)');

    const training = calculateTraining(daily_exercises);
    
    const average = training.hoursTrained / daily_exercises.length;
    const success = target < average;

    const rated = rate(target, average);

    return {
        periodLength: daily_exercises.length,
        trainingDays: training.trainingDays,
        success,
        rating: rated.rating,
        ratingDescription: rated.descr,
        target,
        average
    };
};

const rate = (target: number, average: number) => {
    if (average / target >= 0.9) return { rating: 3, descr: "Well done, keep it up!" };
    else if (average / target >= 0.75) return { rating: 2, descr: "Good job!" };
    else return { rating: 1, descr: "Better than nothing!" };
};

try {
    console.log(parseArgs(process.argv));
} catch(e) {
    console.log('Error, something went wrong: ', e.message);
}
