//! Ceasar cipher is one of the classic examples of the cryptography as it involves modular arithmetic, character manipulation, loops, encryption vs decryption logic.

//^ This function caesarEncrypt is a encryption function, feed a string a string and shift --- shift meaning how letters you wish to shift for the encrypted password to be on:
const caesarEncrypt = (message, shift) => {
    let result = '';

    for (let i = 0; i < message.length; i++) {
        let char = message[i];

        //* this will take care of the Uppercase letters:
        // NOTE remember this snippet of code IMPORTANT on how to manipulate UpperCases:
        if (char >= 'A' && char <= 'Z') {
            let code = char.charCodeAt(0);
            let newCode = ((code - 65 + shift) % 26) + 65;
            result += String.fromCharCode(newCode);
        }
        //* this will take of the lowerCase letters:
        else if (char >= 'a' && char <= 'z') {
            let code = char.charCodeAt(0);
            let newCode = ((code - 97 + shift) % 26) + 97;
            result += String.fromCharCode(newCode);
        }
        //* Non letters remain unchanged:
        else {
            result += char;
        }
    }
    return result;
}

console.log(caesarEncrypt("Attack", 3));

//^ this is a caesarCipher decryption function:
const caesarDecrypt = (message, shift) => {
    let result = '';

    for (let i = 0; i < message.length; i++) {
        let char = message[i];

        if (char >= 'A' && char <= 'Z') {
            let code = char.charCodeAt(0);
            let newCode = ((code - 65 - shift + 26) % 26) + 65;
            result += String.fromCharCode(newCode);
        }

        else if (char >= 'a' && char <= 'z') {
            let code = char.charCodeAt(0);
            let newCode = ((code - 97 - shift + 26) % 26) + 97;
            result += String.fromCharCode(newCode);
        }

        else {
            result += char;
        }
    }
    return result;
}

console.log(caesarDecrypt("Dwwdfn", 3));

//* This is the more interview friendly combined caesar Cipher function which combines both functionalities.
function caesarCipher(text, shift) {
    return text
        .split("")
        .map(char => {
            if (!/[a-z]/i.test(char)) return char;

            let code = char.charCodeAt(0);
            let base = code >= 97 ? 97 : 65;

            return String.fromCharCode(
                ((code - base + shift + 26) % 26) + base
            );
        })
        .join("");
}

console.log(caesarCipher("Hello World!", 3));
console.log(caesarCipher("Khoor Zruog!", -3));

