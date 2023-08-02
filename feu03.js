//FUNCTION

const dataFilesExtraction  = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8') ;
        const dataArray = data.split("\n").map((element)=> {
            return element = element.split("");
        });
        return dataArray;
    }catch (err) {
    console.log("unfindable");
          process.exit(1);
    }
}

const isError = (data) => {
    if (data.length !== 9) {
         return true;
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].length !== 9) {
            return true;
        }
        
    }
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (isNaN(data[i][j]) & data[i][j]!=="."){
                return true;
            }
        }
    }
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i].indexOf([j])!==data[i].lastIndexOf([j])) {
                return true;
            }
        }
    }
    return false;
}

function sudokuTest (table) {
    for (let i = 0; i < table.length; i++) {
        if (table[i].includes(".")) {
            if (table[i].indexOf(".")===table[i].lastIndexOf(".")) {
                let referenceArray = Array(9).fill(0).map((_,index) => index + 1);
                for (let j = 0; j < table[i].length; j++) {
                    if (referenceArray.includes(parseInt(table[i][j]))) {
                        referenceArray = referenceArray.filter((element) =>element !== parseInt(table[i][j]));
                    }
                } 
                table[i][table[i].indexOf(".")]=referenceArray[0].toString();
            } 
        }
    }
    for (let j = 0; j < table[0].length; j++) {
        let Index = [];
        let referenceArrayBis = Array(9).fill(0).map((_,index) => index + 1);
        for (let i = 0; i < table.length; i++) {
            referenceArrayBis = referenceArrayBis.filter((element) =>element !== parseInt(table[i][j]));
            if (table[i][j]===".") {
                Index = [i, j];
            }
        }
        if (referenceArrayBis.length>0) {
            table[Index[0]][Index[1]] = referenceArrayBis[0].toString();
        }
       
    }
    return table;
} 


function isSudokuCompleted (table) {
let testIndicator = true
    for (let i = 0; i < table.length; i++) {
        if (table[i].includes(".")) {
            testIndicator = false
            break;
        }
    }
    return testIndicator;
}

//ERRORS HANDLING
const fs = require('fs');

const sudokuTable  = dataFilesExtraction(process.argv[2]);

if (isError(sudokuTable)) {
    console.log("error");
    process.exit(1);
}

//PARSING
let testedSudoku = sudokuTest(sudokuTable);


//RESOLUTION


//DISPLAY

if (isSudokuCompleted(testedSudoku)) {
    console.log(testedSudoku.join("\n"));
}
