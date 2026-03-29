//! atbash searching algorithm, is one of the simple and the most effective algorithms and is the progression of the next step from the caeser cipher algorithm.

const atbash = (text) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reversed = alphabet.split('').reverse().join('');

    return text
        .toUpperCase()
        .split('')
        .map(c => {
            const index = alphabet.indexOf(c);
            return index === -1 ? c : reversed[index];
        })
        .join('')

};

console.log(atbash('HELLO'));

