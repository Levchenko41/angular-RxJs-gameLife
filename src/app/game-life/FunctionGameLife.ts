import { range } from "rxjs"

export function populatinArr(rows:number, columns:number){
    const popArr:number[][]=[]
    range(columns).forEach((i)=>{
      popArr[i]=[]
      range(rows).forEach((j)=>{
          if(Math.random()<0.9) return popArr[i][j]=0
          
     return popArr[i][j]=1
      })
    
     } )
    return popArr
  }
  
  export function arrayInitialization(array:number[][],rows:number,  columns:number){
  range(columns).forEach((i)=>{
    array[i]=[]
  range(rows).forEach((j)=>{
  array[i][j]=0
  })
  })
  return array
  }
  export function countNeighbours(i:number,j:number, array:number[][]){
    function setCellValueHelper  (row:number, col:number) {
      try {
          return array[row][col];
      }
      catch {
          return 0;
       }
  };
    let total_neighbours = 0;
    total_neighbours +=setCellValueHelper(i - 1, j - 1);
      total_neighbours +=setCellValueHelper(i - 1, j);
      total_neighbours +=setCellValueHelper(i - 1, j + 1);
      total_neighbours +=setCellValueHelper(i, j - 1);
      total_neighbours +=setCellValueHelper(i, j + 1);
      total_neighbours +=setCellValueHelper(i + 1, j - 1);
      total_neighbours +=setCellValueHelper(i + 1, j);
      total_neighbours +=setCellValueHelper(i + 1, j + 1);
      return total_neighbours;
  }
  
  