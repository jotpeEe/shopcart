export const capFirst = (input: string): string => {
    if (input && input[0] !== input[0]?.toUpperCase()) {
        return input[0]?.toUpperCase() + input.slice(1);
    }
    return input;
};
