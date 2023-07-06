//FUNCTIONS

function calculWithoutBrakets(array) {
        function computeMultiplication(array) {
            const index = array.indexOf("*");
            if (index === -1) {
                return array;
            }
                    const array1 = array.slice(0,index-1);
                    const array2 = array.slice(index+2,array.length);
                    const array3 = [parseInt(array[index-1])*parseInt(array[index+1])];
                    const newresult = array1.concat(array3,array2);
            
                    return computeMultiplication(newresult);
        }

        function computeDivided(array) {
            const index = array.indexOf("/");
            if (index === -1) {
                return array;
            }
                    const array1 = array.slice(0,index-1);
                    const array2 = array.slice(index+2,array.length);
                    const array3 = [parseInt(array[index-1])/parseInt(array[index+1])];
                    const newresult = array1.concat(array3,array2);
            
                    return computeDivided(newresult);
            }
        function computeModuled(array) {
            const index = array.indexOf("%");
            if (index === -1) {
                return array;
            }
                    const array1 = array.slice(0,index-1);
                    const array2 = array.slice(index+2,array.length);
                    const array3 = [parseInt(array[index-1])%parseInt(array[index+1])];
                    const newresult = array1.concat(array3,array2);
            
                    return computeModuled(newresult);
            }
        function computeAddition(array) {
        const index = array.indexOf("+");
        if (index === -1) {
            return array;
        }
                const array1 = array.slice(0,index-1);
                const array2 = array.slice(index+2,array.length);
                const array3 = [parseInt(array[index-1])+parseInt(array[index+1])];
                const newresult = array1.concat(array3,array2);
        
                return computeAddition(newresult);
        }
    
        function computeSubstraction(array) {
            const index = array.indexOf("-");
            if (index === -1) {
                return array;
            }
                    const array1 = array.slice(0,index-1);
                    const array2 = array.slice(index+2,array.length);
                    const array3 = [parseInt(array[index-1])-parseInt(array[index+1])];
                    const newresult = array1.concat(array3,array2);
            
                    return computeSubstraction(newresult);
            }

        function evaluateExpression(array) {
            const arrayMultiplied = computeMultiplication(array);
            const arrayDivided = computeDivided(arrayMultiplied);
            const arrayModuled = computeModuled(arrayDivided);
            const arrayAdditionned = computeAddition(arrayModuled);
            const arraySubstracted = computeSubstraction(arrayAdditionned);
            return arraySubstracted;
        }

        return evaluateExpression(array);
}


function bracketsExtraction (array) {
   if  (!array.includes("(") && !array.includes(")")) {
    return array;
}
        const array1 = array.slice(0, array.lastIndexOf("("));
        const intermediateArray = array.slice(array.lastIndexOf("("));
        const subBracketsArray = intermediateArray.slice(1, intermediateArray.indexOf(")"));
        const array2 = intermediateArray.slice(intermediateArray.indexOf(")")+1);
        const subExpression = calculWithoutBrakets(subBracketsArray);
        const newArray = array1.concat(subExpression,array2);

        return bracketsExtraction(newArray);
}



//PARSING
const sentence = process.argv[2] ;

const sentenceArray = sentence.split("").filter((element)=>{
    return element!==" ";
});
//console.log(sentenceArray);

const arrayOfCharacters = [];
for (let i = 0; i < sentenceArray.length; i++) {
    if (!isNaN(sentenceArray[i]) && !isNaN(sentenceArray[i+1])) {
        arrayOfCharacters.push(sentenceArray[i] + sentenceArray[i+1]);
        i++;
    }
    else
        arrayOfCharacters.push(sentenceArray[i]);
}

//RESOLUTION
const arrayWithoutBrakets = bracketsExtraction(arrayOfCharacters);

const finalArray = calculWithoutBrakets(arrayWithoutBrakets);

//DISPLAY
console.log(finalArray);
