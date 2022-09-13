"use strict";
const text = document.getElementById("text");
const grid = document.getElementById("grid");
const matrixArray = [[], []];
const whiteSpaceIndex = [];
let matrixIterator;
let newStr;
function encryption(event) {
    event.preventDefault();
    console.log(event);
    text.value = text.value.replace(/[%20]/g, " ");
    text.value = text.value.replace(/[^a-zA-Z" "]/g, '');
    if (text.value == "" || +grid.value < 1)
        return;
    whiteSpaceIndex.splice(0);
    newStr = "";
    //making new string with no spaces and filling whitespace array
    for (let index = 0; index < text.value.length; index++) {
        if (text.value[index] != " ")
            newStr += text.value[index];
        else {
            whiteSpaceIndex.push(index);
        }
    }
    // filling matrix
    let iterator = 0;
    for (let i = 0; i < newStr.length; i++) {
        matrixArray[i] = [];
        for (let j = 0; j < +(grid.value); j++) {
            matrixArray[i].push(newStr.charAt(iterator++));
        }
    }
    //Encrypted String
    let output = "";
    for (let i = 0; i < +(grid.value); i++) {
        for (let j = 0; j < newStr.length; j++) {
            output += matrixArray[j][i];
        }
    }
    text.value = "";
    grid.value = "";
    document.querySelector('.display').style.display = "block";
    document.querySelector('.display').innerText = output;
}
function decryption() {
    if (newStr == "") {
        alert("Kindly do encrytion first");
        return;
    }
    let index = 0;
    matrixIterator = 0;
    let decryptedStrv = "";
    for (let i = 0; i < matrixArray.length; i++) {
        for (let j = 0; j < matrixArray[0].length; j++) {
            if (whiteSpaceIndex[index] == matrixIterator) {
                decryptedStrv = decryptedStrv + " " + matrixArray[i][j];
                index++;
                matrixIterator++;
            }
            else {
                decryptedStrv += matrixArray[i][j];
            }
            matrixIterator++;
        }
    }
    document.querySelector('.display').innerText = decryptedStrv;
}
