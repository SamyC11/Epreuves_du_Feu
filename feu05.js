// FUNCTION


const dataFilesExtraction  = (filePath) => {
  try {
      const data = fs.readFileSync(filePath, 'utf8') ;
      return data;
  }catch (err) {
  console.log("unfindable");
        process.exit(1);
  }
}


function generateMaze(rows, columns, emptyChar, wallChar, entryChar, exitChar, obstacleChar) {
  const maze = [];

  // Créer une matrice de labyrinthe vide
  for (let i = 0; i < rows; i++) {
    maze.push(new Array(columns).fill(emptyChar));
  }

  // Placer les murs autour du labyrinthe
  for (let i = 0; i < rows; i++) {
    maze[i][0] = wallChar;
    maze[i][columns - 1] = wallChar;
  }

  for (let j = 0; j < columns; j++) {
    maze[0][j] = wallChar;
    maze[rows - 1][j] = wallChar;
  }

  // Placer l'entrée et/ou la sortie (au hasard)
  const entryRow = Math.floor(Math.random() * (rows - 2)) + 1;
  const entryColumn = 0;
  maze[entryRow][entryColumn] = entryChar;

  
  const exitRow = Math.floor(Math.random() * (rows - 2)) + 1;
  const exitColumn = columns - 1;
  maze[exitRow][exitColumn] = exitChar;

  // Placer des obstacles (au hasard)
  const numObstacles = Math.floor((rows * columns) / 10); // 10% du labyrinthe sera des obstacles
  for (let i = 0; i < numObstacles; i++) {
    const obstacleRow = Math.floor(Math.random() * (rows - 2)) + 1;
    const obstacleColumn = Math.floor(Math.random() * (columns - 2)) + 1;
    maze[obstacleRow][obstacleColumn] = obstacleChar;
  }

  return maze;
}


//PARSING
const fs = require('fs');
const data  = dataFilesExtraction(process.argv[2]);
console.log(data);

const rows = parseInt(data.slice(0,2));
const columns = parseInt(data.slice(3,5));
const emptyChar = data.slice(6,7);
const wallChar = data.slice(5,6);
const entryChar = data.slice(8,9);
const exitChar = data.slice(9,10);
const obstacleChar = data.slice(5,6);

const maze = generateMaze(rows, columns, emptyChar, wallChar, entryChar, exitChar, obstacleChar);
console.log(maze.map(row => row.join('')).join('\n'));