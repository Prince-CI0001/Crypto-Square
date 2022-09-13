"use strict";
var text = document.getElementById("text");
var grid = document.getElementById("grid");
var display = document.querySelector(".display");
let matrixArray = [[], []];
let m = 0;
let n = 0;
let whiteSpaceIndex = [];
let index = 0;
let count = 0;
let newStr = "";
function encryption() {
    text.value = text.value.replace(/[%20]/g, " ");
    text.value = text.value.replace(/[^a-zA-Z" "]/g, '');
    console.log(text.value);
    if (text.value == "" || +grid.value < 1)
        return;
    whiteSpaceIndex.splice(0);
    newStr = "";
    m = +(grid.value);
    for (var index = 0; index < text.value.length; index++) {
        if (text.value[index] != " ")
            newStr += text.value[index];
        else {
            whiteSpaceIndex.push(index);
        }
    }
    let k = 0;
    for (let i = 0; i < newStr.length; i++) {
        matrixArray[i] = [];
        for (let j = 0; j < m; j++) {
            matrixArray[i].push(newStr.charAt(k++));
        }
    }
    let output = "";
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < newStr.length; j++) {
            output += matrixArray[j][i];
        }
    }
    text.value = "";
    grid.value = "";
    display.style.display = "block";
    display.innerText = output;
}
function decryption() {
    if (newStr == "") {
        alert("Kindly do encrytion first");
        return;
    }
    index = 0;
    count = 0;
    let decryptedStrv = "";
    for (let i = 0; i < newStr.length; i++) {
        for (let j = 0; j < m; j++) {
            if (whiteSpaceIndex[index] == count) {
                decryptedStrv = decryptedStrv + " " + matrixArray[i][j];
                index++;
                count++;
            }
            else {
                decryptedStrv += matrixArray[i][j];
            }
            count++;
        }
    }
    display.innerText = decryptedStrv;
}
