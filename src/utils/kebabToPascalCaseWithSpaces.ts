const kebabToPascalWithSpaces = (kebabCase: string) => {
    const words = kebabCase.split("-");
    const pascalWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return pascalWords.join(" ");
};

export default kebabToPascalWithSpaces;
