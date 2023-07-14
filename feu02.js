//FUNCTIONS
const isOnlySpaces = (array) => {
    const newArray = array.filter((element,index)=>{
        return element[index]!==" ";
    });
    if (newArray.length<1) {
        return true;
    }return false;
}

const isError = (input1, input2) => {
    if (input1.length < input2.length || isOnlySpaces(input1) || isOnlySpaces(input2)) {
        return true;
    }return false;
}


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

const symbolWidth = (symbol) => {
    let arrayWidth = 0;
    for (let i = 0; i < symbol.length; i++) {
        if (symbol[i].length>arrayWidth) {
            arrayWidth = symbol[i].length
        }
    } return arrayWidth;
}

const findCoordinates = (reference, symbol, symbolWidth) => {
    const arrayCoordinates = [];

    for (let i = 0; i < reference.length - symbol.length + 1; i++) {
      for (let j = 0; j < reference[i].length - symbolWidth + 1; j++) {
        let match = true;
    
        for (let k = 0; k < symbol.length; k++) {
               for (let l = 0; l < symbol[k].length; l++) {
                       if (
                       symbol[k][l] !== " " &&
                       symbol[k][l] !== reference[i + k][j + l]
                       ) {
                       match = false;
                       break;
                       }
               }
               if (!match) {
                   break;
               }
        }
        if (match) {
          arrayCoordinates.push(i, j);
          break;
        }
       
    }
    if (arrayCoordinates.length>0) {
           break; 
   }
   }
    return arrayCoordinates;
}



const symbolIntegration = (reference, array, position) => {
    const arrayToDisplay = reference.map(element => element.fill("-"));

        for (let k = position[0],i = 0 ; k < position[0] + array.length, i < array.length; k++, i++) {
            for (let l = position[1], j = 0; l < position[1] + array[i].length, j < array[i].length; l++, j++) {
                if (array[i][j]!==" ") {
                    arrayToDisplay[k][l]=array[i][j];
                }
            }
        }
        return arrayToDisplay;
}

//PARSING

const fs = require('fs');

let boardArray  = dataFilesExtraction(process.argv[2]);

let toFindArray = dataFilesExtraction(process.argv[3]);



//ERROR HANDLING

if (isError(boardArray, toFindArray)) {
    console.log("data error");
    process.exit(1);
}

//RESOLUTION
const toFindArrayWidth = symbolWidth (toFindArray);

const symbolCoordinates = findCoordinates(boardArray,toFindArray,toFindArrayWidth);


//DISPLAY

if (symbolCoordinates.length>0) {
    console.log(`Trouvé sa mère ! \nCoordonnées : ${symbolCoordinates}`);
    const finalArray = symbolIntegration(boardArray, toFindArray, symbolCoordinates).map((element) => {
    return element.join("");
    });
    console.log(finalArray.join("\n"));
}
else {
    console.log("J'ai pas trouvéoo !!");
}      