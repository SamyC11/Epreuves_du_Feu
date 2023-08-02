//FUNCTION
const dataFilesExtraction  = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8') ;
        return data;
    }catch (err) {
    console.log("unfindable");
          process.exit(1);
    }
}

const isError = (data) => {
    if (data.length>5) {
        return true;
    }
    if (data.slice(0,data.length - 3)<1 || data.slice(0,data.length - 3)>30) {
        return true;
    }
    if (data[data.length - 3] === data[data.length - 2] || data[data.length - 3] === data[data.length - 1] || data[data.length - 2] === data[data.length - 1] ) {
        return true;
    }
    return false;
}

const plateauCreation = (length,empty,obstacle) => {
    let table = Array(parseInt(length));
        for (let i = 0; i < table.length; i++) {
            table[i] = Array(25);
            for (let j = 0; j < table[i].length; j++) {
                table[i][j] = Math.random()< 0.8 ? empty : obstacle;
            }
        }
return table;
}


const SquareCoordinatesAndMultiplicator = (base, multiplicator,coordinates) => {

const square = Array(multiplicator).fill(Array(multiplicator).fill("."));
let newCoordinates = [];

    for (let i = 0; i < base.length - multiplicator; i++) {
        for (let j = 0; j < base[i].length - multiplicator; j++) {
            let match = true;

                for (let k = 0; k < square.length; k++) {
                    for (let l = 0; l < square[k].length; l++) {
                        if (base[i + k][j + l] !== ".") {
                            match = false;
                            break;
                        } 
                    }
                    if (!match) {
                    break;
                    }
                }
                if (match) {
                newCoordinates = [i,j];
                break;
                }
        }
        if (newCoordinates.length>0) {
            break; 
        }
    }
    if (newCoordinates.length>0) {
        return SquareCoordinatesAndMultiplicator(base, multiplicator+1, newCoordinates);
    } else {
        coordinates.push(multiplicator-1);
        return coordinates;
    }
}

const squareIntegration = (table, squareData, character) => {
    for (let i = squareData[0]; i < squareData[0] + squareData[2]; i++) {
        for (let j = squareData[1]; j < squareData[1] + squareData[2]; j++) {
            table[i][j]='\x1b[32m' + character + '\x1b[0m';
        }
    }
return table;
}


//ERROR HANDLING
const fs = require('fs');
const data = dataFilesExtraction(process.argv[2]);

if (isError(data)) {
    console.log("error");
    process.exit(1);
}

//PARSING
const plateauLength = data.slice(0,data.length - 3);
const empty = data[data.length - 3];
const obstacle = data[data.length - 2];
const signFull = data[data.length - 1];

const initialMultiplicator = 1;
const initialCoordinates = [];

//RESOLUTION
const plateau = plateauCreation(plateauLength,empty,obstacle);

const biggerSquareData = SquareCoordinatesAndMultiplicator(plateau, initialMultiplicator, initialCoordinates);

const squareInPlateau = squareIntegration(plateau, biggerSquareData, signFull)

//DISPLAY
for (let i = 0; i < squareInPlateau.length; i++) {
    console.log(squareInPlateau[i].join(""))
}