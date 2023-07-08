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




//PARSING

const fs = require('fs');
const filePath = process.argv[2];
const filePath2 = process.argv[3]

let boardArray;
try {
    const data = fs.readFileSync(filePath, 'utf8') ;
    boardArray = data.split("\n");
}catch (err) {
console.log("unfindable");
      process.exit(1);
}

let toFindArray;
try {
    const data = fs.readFileSync(filePath2, 'utf8') ;
    toFindArray = data.split("\n");
}catch (err) {
console.log("unfindable");
      process.exit(1);
}

//ERROR HANDLING
let finalBoardArray = boardArray.map((element)=> {
    return element = element.split("");
});

let finaltoFindArray = toFindArray.map((element)=> {
    return element = element.split("");
});

if (isError(finalBoardArray, finaltoFindArray)) {
    console.log("data error");
    process.exit(1);
}


//RESOLUTION

console.log(finalBoardArray);
console.log(finaltoFindArray);



//COORDONNEES
         const arrayTest = [];

         for (let i = 0; i < finalBoardArray.length; i++) {
           for (let j = 0; j < finalBoardArray[i].length - finaltoFindArray.length + 1; j++) {
             let match = true;
         
             for (let k = 0; k < finaltoFindArray.length; k++) {
                    for (let l = 0; l < finaltoFindArray[k].length; l++) {
                            if (
                            finaltoFindArray[k][l] !== " " &&
                            finaltoFindArray[k][l] !== finalBoardArray[i + k][j + l]
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
               arrayTest.push([i, j]);
               break;
             }
            
         }
         if (arrayTest.length>0) {
                break; 
        }
        }
         console.log(arrayTest);
         
//ISPRESENT

if (arrayTest.length>0) {
    console.log("trouvé sa mère !");
}
else {
    console.log("j'ai pas trouvéoo !!");
}      
         
//Affichage tableau final avec symbole

const arrayDisplay = finalBoardArray.map(element => element.fill("-"));
console.log(arrayDisplay);

let positionJ =0
for (let i = 0; i < finaltoFindArray.length; i++) {
    for (let j = 0; j < finaltoFindArray[i].length; j++) {
        for (let k = 0; k < finaltoFindArray.length; k++) {
            for (let l = 6; l < 6 + finaltoFindArray[i].length; l++) {
                arrayDisplay[k][l]=finaltoFindArray[i][j];
            }  
        }
       
    } 
}
console.log(arrayDisplay.join("\n"));                 
//console.log(finaltoFindArray[1][0]);                      
         
  //console.log(arrayDisplay.join("\n"));
                //console.log(k);       
         
    