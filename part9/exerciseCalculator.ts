
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
    }
}

const calculateTraining = (args: string[]) => {
    let trainings = 0;
    let hoursTrained = 0;

    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            if (Number(args[i]) > 0) {
                trainings++;
                hoursTrained += Number(args[i]);
            }
        } else throw new Error(`${args[i]} is not a number`);
        
    }

    return {trainingDays: trainings, hoursTrained};
}

const rate = (target: number, average: number) => {
    if (average / target >= 0.9) return { rating: 3, descr: "Well done, keep it up!" };
    else if (average / target >= 0.75) return { rating: 2, descr: "Good job!" };
    else if (average / target >= 0.5) return { rating: 1, descr: "Better than nothing!" };
}

try {
    console.log(parseArgs(process.argv));
} catch(e) {
    console.log('Error, something went wrong: ', e.message)
}
