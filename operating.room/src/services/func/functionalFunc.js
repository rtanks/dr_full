export const createArrayWithStartAndEndValue = (start, end) => {
    const arr = Array.from({length: end - start + 1}, (_, a) => a + start);
    return arr;
}