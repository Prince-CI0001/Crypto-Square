let text = <HTMLInputElement>document.getElementById("text");
let grid = <HTMLInputElement>document.getElementById("grid");
const matrixArray: string[][] = [[], []];
const whiteSpaceIndex: number[] = [];
let matrixIterator: number;
let newStr: string;
let output: string = "";


function encryption(event: Event) {
    event.preventDefault();
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
    for (let i = 0; i < +(grid.value); i++) {
        for (let j = 0; j < newStr.length; j++) {
            output += matrixArray[j][i];
        }
    }


    //encoding + output
    let encode: string = "";
    for (let i = 0; i < whiteSpaceIndex.length; i++) {
        if (i == whiteSpaceIndex.length - 1)
            encode += whiteSpaceIndex[i];
        else
            encode += whiteSpaceIndex[i] + "-";
    }
    output = output + "|" + btoa(encode);
    text.value = "";
    grid.value = "";
    (document.querySelector('.display') as HTMLInputElement).style.display = "block";
    (document.querySelector('.display') as HTMLInputElement).innerText = output;
}


function decryption(event: Event) {

    event.preventDefault();
    const index = text.value.lastIndexOf("|");
    const str = text.value.substring(0, index);
    const whitespace = (atob(text.value.substring(index + 1))).split("-");
    const matrixCol = Math.floor(str.length / (+grid.value));
    let matrixRem = Math.floor(str.length % (+grid.value));

    let increaseCounter = 0;
    if (matrixRem > 0)
        increaseCounter = 1;
    let iterator = 0;
        for (let i = 0; i < str.length; i++) {
        matrixArray[i] = [];
        for (let j = 0; j < matrixCol + increaseCounter; j++) {
            matrixArray[i].push(str.charAt(iterator++));
        }
        if (matrixRem > 0)
            matrixRem--;
        if (matrixRem <= 0)
            increaseCounter = 0;
    }
    matrixIterator = 0;
    let outputStr: string = "";
    for (let i = 0; i < matrixArray[0].length; i++) {

        for (let j = 0; j < matrixArray.length; j++) {
            if(matrixArray[j][i] !==undefined)
            {
                outputStr += matrixArray[j][i];
            }
        }
    }
    decryptedString(outputStr,whitespace);
 
}

function decryptedString(decryptedStrv:string,whitespace:string[]):void{
    let space=0;
    let whitespacecounter=0;
    let decryptedString = "";
    for(let i=0;i<decryptedStrv.length;i++)
    {
        if(i == (+whitespace[whitespacecounter] - space))
        {
            decryptedString += " ";
            space++;
            whitespacecounter++;
        }
        decryptedString += decryptedStrv.charAt(i);
    }


    (document.querySelector('.display') as HTMLInputElement).style.display = "block";

    (document.querySelector('.display') as HTMLInputElement).innerText = decryptedString;
}
