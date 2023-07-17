
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



//PARSING

const fs = require('fs');

let incompleteSudoku  = dataFilesExtraction(process.argv[2]);


for (let i = 0; i < incompleteSudoku.length; i++) {
    if (incompleteSudoku[i].includes(".")) {
        if (incompleteSudoku[i].indexOf(".")===incompleteSudoku[i].lastIndexOf(".")) {
            let referenceArray = Array(9).fill(0).map((_,index) => index + 1);
            for (let j = 0; j < incompleteSudoku[i].length; j++) {
                if (referenceArray.includes(parseInt(incompleteSudoku[i][j]))) {
                    referenceArray = referenceArray.filter((element) =>element !== parseInt(incompleteSudoku[i][j]));
                }
            } 
        incompleteSudoku[i][incompleteSudoku[i].indexOf(".")]=referenceArray[0].toString();
        } 
    }
}
console.log(incompleteSudoku.join("\n"));

for (let i = 0; i < incompleteSudoku[0].length; i++) {
    const element = array[i];
    
}

/*
Pour tous le tableau1,

        pour chaque colonne (j de i=0)
            créer un tableau composé des j de tous les i
                si " " est présent

                
                    compter le nombre d'occurence COUNT
                        si COUNT = 1
                            extraire la ligne dans un tableau2
                            trier ce tableau2
                            push l'index de " " du tableau2, vers le tableau1*/
