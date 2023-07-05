//FUNCTIONS
function isError(input){
    if(input===undefined || isNaN(input) || input===0) {
    return true;
    }
    return false;
}

function rectangleCreation (width, height) {
        const array = [];
        for (let i = 0; i < height; i++) {
            if (i===0 || i === height-1) {
                if (width<=2) {
                array.push("o".repeat(width));
                }
                else {
                    array.push("o"+"-".repeat(width-2)+"o");
                }
            } 
            else {
                if (width<=2) {
                array.push("|".repeat(width));
                    }
                else {
                array.push("|"+" ".repeat(width-2)+"|");
                }        
            }
        }
        return array;
    }


//ERROR HANDLING
const arg1 = parseInt(process.argv[2]);
const arg2 = parseInt(process.argv[3]);

if(isError(arg1) || isError(arg2)){
    console.log("error");
    process.exit(1);
}

//PARSING



//RESOLUTION
const rectangleArray = rectangleCreation(arg1, arg2);

//DISPLAY

console.log(rectangleArray.join("\n"));


