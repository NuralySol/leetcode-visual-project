//! Enigma machine simulator (Learning version):

//* NOTE this enigma machine only works with uppercase letters:
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//! -- Util Functions for the Enigma cryptographic -- // 
// Util Function to get the index -> convert a letter to its alphabet index
function charToIndex(char) {
    return ALPHABET.indexOf(char);
};

// Util Function to convert index back to letter:
function indexToChar(index) {
    return ALPHABET[index];
};

// Utility Function -> make sure index stays inside 0-25
function mod(n, m) {
    return ((n % m) + m) % m;
};
//!-- End of Util Functions for the Enigma function --//

//* ROTOR Class:
// 1. wiring     -> how letters are substituted
// 2. notch      -> when next rotor should step
// 3. position   -> current visible letter setting
class Rotor {
    constructor(wiring, notch, position = 0) {
        this.wiring = wiring;
        this.notch = notch;
        this.position = position;

        // Build reverse wiring once so backward encryption is easy.
        this.reverseWiring = this.buildReverseWiring(wiring);
    }

    //* create custom method-functions for the Rotor class of the Enigma machine:
    // Build a reverse wiring:
    buildReverseWiring(wiring) {
        let reverse = new Array(26);

        for (let i = 0; i < 26; i++) {
            const mappedChar = wiring[i];
            const mappedIndex = charToIndex(mappedChar);
            reverse[mappedIndex] = ALPHABET[i];
        }
        return reverse.join('');
    }

    // Step rotor by 1 position:
    step() {
        this.position = mod(this.position + 1, 26);
    }

    // Check whether rotor is sitting at notch, if yes next rotor may step:
    isAtNotch() {
        return indexToChar(this.position) === this.notch;
    }

    //* forward encoding -> Steps: Signal Enters from the keyboard!
    // 1. shift input by rotor position
    // 2. apply rotor wiring
    // 3. shift back

    encodeForward(char) {
        const inputIndex = charToIndex(char);

        // shift input into rotor's rotated frame:
        const shiftedInput = mod(inputIndex + this.position, 26);

        // Find wired output letter
        const wiredChar = this.wiring[shiftedInput];
        const wiredIndex = charToIndex(wiredChar);

        // shift back out of rotor's rotated frame:
        const outputIndex = mod(wiredIndex - this.position, 26);

        return indexToChar(outputIndex);
    }

    //* backward encoding through the rotor, after reflection, signal comes back through the rotors in reverse direction. This uses reverse wiring.
    encodeBackward(char) {
        const inputIndex = charToIndex(char);

        // shift input into the rotor's rotated frame:
        const shiftedInput = mod(inputIndex + this.position, 26);

        // use reverse wiring this time:
        const wiredChar = this.reverseWiring[shiftedInput];
        const wiredIndex = charToIndex(wiredChar);

        // shift backout:
        const outputIndex = mod(wiredIndex - this.position, 26);

        return indexToChar(outputIndex);
    }
}

//* Reflector class, the refactor sends signal back. This is why Enigma encryption and decryption. Uses the same machine settings.
class Reflector {
    constructor(wiring) {
        this.wiring = wiring;
    }
    reflect(char) {
        return this.wiring[charToIndex(char)]
    }
}


// ==========================================
// PLUGBOARD CLASS
// ==========================================
// The plugboard swaps letters before entering
// the rotors, and again after leaving them.
//
// Example swaps:
// A <-> B
// C <-> D
//
// If a letter has no plug, it stays the same.
// ==========================================
class Plugboard {
    constructor(pairs = []) {
        this.mapping = this.createMapping(pairs);
    }

    createMapping(pairs) {
        const map = {};

        // Start with identity mapping:
        // A -> A, B -> B, C -> C, ...
        for (const char of ALPHABET) {
            map[char] = char;
        }

        // Apply swaps
        for (const [a, b] of pairs) {
            map[a] = b;
            map[b] = a;
        }

        return map;
    }

    swap(char) {
        return this.mapping[char] || char;
    }
}

// ==========================================
// ENIGMA MACHINE CLASS
// ==========================================
// This combines:
// - plugboard
// - 3 rotors
// - reflector
//
// Order of signal flow:
// keyboard
// -> plugboard
// -> rotor right
// -> rotor middle
// -> rotor left
// -> reflector
// -> rotor left backward
// -> rotor middle backward
// -> rotor right backward
// -> plugboard
// -> output lamp
// ==========================================
class EnigmaMachine {
    constructor(leftRotor, middleRotor, rightRotor, reflector, plugboard) {
        this.leftRotor = leftRotor;
        this.middleRotor = middleRotor;
        this.rightRotor = rightRotor;
        this.reflector = reflector;
        this.plugboard = plugboard;
    }

    // ----------------------------------------
    // Step rotors before each key press
    //
    // Real Enigma had a stepping mechanism.
    // This version includes the main idea:
    //
    // - right rotor always steps
    // - if right rotor hits notch, middle steps
    // - if middle rotor hits notch, left steps
    //
    // The real machine had double-stepping;
    // this version is simplified but close enough
    // for learning.
    // ----------------------------------------
    stepRotors() {
        const rightAtNotch = this.rightRotor.isAtNotch();
        const middleAtNotch = this.middleRotor.isAtNotch();

        // Right rotor always steps
        this.rightRotor.step();

        // If right rotor was at notch, middle steps
        if (rightAtNotch) {
            this.middleRotor.step();
        }

        // If middle rotor was at notch, left steps
        if (middleAtNotch) {
            this.leftRotor.step();
        }
    }

    // ----------------------------------------
    // Encrypt one character
    // Non-letters are returned unchanged
    // ----------------------------------------
    encryptChar(char) {
        // Preserve punctuation, spaces, numbers, etc.
        if (!ALPHABET.includes(char)) {
            return char;
        }

        // Step rotors before processing the key press
        this.stepRotors();

        // 1. Plugboard in
        let signal = this.plugboard.swap(char);

        // 2. Forward through rotors
        signal = this.rightRotor.encodeForward(signal);
        signal = this.middleRotor.encodeForward(signal);
        signal = this.leftRotor.encodeForward(signal);

        // 3. Reflect
        signal = this.reflector.reflect(signal);

        // 4. Backward through rotors
        signal = this.leftRotor.encodeBackward(signal);
        signal = this.middleRotor.encodeBackward(signal);
        signal = this.rightRotor.encodeBackward(signal);

        // 5. Plugboard out
        signal = this.plugboard.swap(signal);

        return signal;
    }

    // ----------------------------------------
    // Encrypt full message
    // Since Enigma is symmetric,
    // this same function also decrypts
    // if machine settings are identical.
    // ----------------------------------------
    encryptMessage(message) {
        let result = "";

        // Convert to uppercase because Enigma uses A-Z
        const upperMessage = message.toUpperCase();

        for (const char of upperMessage) {
            result += this.encryptChar(char);
        }

        return result;
    }
}

// ==========================================
// HISTORICAL ROTOR WIRINGS
// ==========================================
// These are real Enigma I rotor wirings
// often used in educational simulators.
// ------------------------------------------
const rotorI = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const rotorII = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
const rotorIII = "BDFHJLCPRTXVZNYEIWGAKMUSQO";

// Real reflector B
const reflectorB = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

// Rotor notch positions:
// Rotor I notch at Q
// Rotor II notch at E
// Rotor III notch at V

// ==========================================
// CREATE MACHINE SETTINGS
// ==========================================

// Create rotors with starting positions
// position 0 means A
// position 1 means B, etc.
const leftRotor = new Rotor(rotorI, "Q", 0);     // A
const middleRotor = new Rotor(rotorII, "E", 0);  // A
const rightRotor = new Rotor(rotorIII, "V", 0);  // A

// Create reflector
const reflector = new Reflector(reflectorB);

// Create plugboard swaps
// Example:
// A <-> B
// C <-> D
// E <-> F
const plugboard = new Plugboard([
    ["A", "B"],
    ["C", "D"],
    ["E", "F"]
]);

// Build machine
const machine = new EnigmaMachine(
    leftRotor,
    middleRotor,
    rightRotor,
    reflector,
    plugboard
);

// ==========================================
// EXAMPLE: ENCRYPT
// ==========================================
const plaintext = "HELLO WORLD";
const ciphertext = machine.encryptMessage(plaintext);

console.log("PLAINTEXT: ", plaintext);
console.log("CIPHERTEXT:", ciphertext);

// ==========================================
// EXAMPLE: DECRYPT
// ==========================================
// To decrypt correctly, you must reset the
// machine to the SAME starting settings.
// Because rotor positions changed during
// encryption, we need a fresh machine.
// ==========================================
const leftRotor2 = new Rotor(rotorI, "Q", 0);
const middleRotor2 = new Rotor(rotorII, "E", 0);
const rightRotor2 = new Rotor(rotorIII, "V", 0);

const reflector2 = new Reflector(reflectorB);

const plugboard2 = new Plugboard([
    ["A", "B"],
    ["C", "D"],
    ["E", "F"]
]);

const machineForDecryption = new EnigmaMachine(
    leftRotor2,
    middleRotor2,
    rightRotor2,
    reflector2,
    plugboard2
);

const decryptedText = machineForDecryption.encryptMessage(ciphertext);

console.log("DECRYPTED: ", decryptedText);