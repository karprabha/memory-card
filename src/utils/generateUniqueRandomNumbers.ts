const generateUniqueRandomNumbers = (count: number, maxNumber: number) => {
    if (count > maxNumber) {
        throw new Error(
            "Cannot generate more unique numbers than the available range"
        );
    }

    const initialNumbers = [];
    for (let number = 1; number <= maxNumber; number++) {
        initialNumbers.push(number);
    }

    const shuffledNumbers = [...initialNumbers];
    for (let i = shuffledNumbers.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffledNumbers[i], shuffledNumbers[randomIndex]] = [
            shuffledNumbers[randomIndex],
            shuffledNumbers[i],
        ];
    }

    return shuffledNumbers.slice(0, count);
};

export default generateUniqueRandomNumbers;
