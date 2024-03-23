function reverseAlphabet(str) {
    var letters = [];
    var numbers = [];

    for (var i = 0; i < str.length; i++) {
        var char = str.charAt(i);
        if (/[a-zA-Z]/.test(char)) {
            letters.push(char);
        } else {
            numbers.push(char);
        }
    }
    var reversedLetters = letters.reverse();
    var result = reversedLetters.concat(numbers).join('');

    return result;
}

var str = "NEGIE1";
var reversedStr = reverseAlphabet(str);
console.log(reversedStr);
