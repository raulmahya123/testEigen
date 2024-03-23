function countOccurrences(INPUT, QUERY) {
    let result = [];
    QUERY.forEach(word => {
        let count = 0;
        INPUT.forEach(inputWord => {
            if (inputWord === word) {
                count++;
            }
        });
        result.push(count);
    });
    return result;
}

let INPUT = ['xc', 'dz', 'bbb', 'dz'];
let QUERY = ['bbb', 'ac', 'dz'];

let OUTPUT = countOccurrences(INPUT, QUERY);
console.log(OUTPUT);
