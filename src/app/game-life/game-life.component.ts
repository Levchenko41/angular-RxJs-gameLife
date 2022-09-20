import { Component, OnInit } from '@angular/core';
import { fromEvent, range } from 'rxjs';
import {
  map,
  pairwise,
  switchMap,
  takeUntil,
  withLatestFrom,
  startWith,
} from 'rxjs/operators';
import {
  populatinArr,
  arrayInitialization,
  countNeighbours,
} from './FunctionGameLife';

@Component({
  selector: 'app-game-life',
  templateUrl: './game-life.component.html',
  styleUrls: ['./game-life.component.css'],
})
export class GameLifeComponent implements OnInit {
  cell_size: number = 5;
  cell_in_collumns: number = 0;
  cell_in_rows: number = 0;
  cell_color: string = '#26e446';
  canvas: any;
  ctx: any;
  widthCanvas: number = 0;
  heigthCanvas: number = 0;

  activeArray: number[][] = [];
  constructor() {}

  ngOnInit(): void {
    this.initConvas();
    this.gridConvas();
  }
  click() {
    this.updateCells();
  }
  initConvas() {
    this.canvas = document.getElementById('canvas')!;
    this.ctx = this.canvas.getContext('2d')!;

    this.canvas.width = innerWidth;
    this.canvas.height = 400;
    this.widthCanvas = Math.floor(this.canvas.width / this.cell_size);
    this.heigthCanvas = Math.floor(this.canvas.height / this.cell_size);
    console.log(this.heigthCanvas);
    this.activeArray = populatinArr(this.widthCanvas, this.heigthCanvas);
  }

  gridConvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = '#d5dfd7';

    this.ctx.fillStyle = this.cell_color;
    this.activeArray.forEach((arrV: number[], i: number) => {
      arrV.forEach((v: number, j: number) => {
        if (v) {
          this.ctx.fillRect(
            j * this.cell_size,
            i * this.cell_size,
            this.cell_size,
            this.cell_size
          );
        }
      });
    });
  }
  updateCells() {
    const array: number[][] = [];

    this.activeArray.forEach((arr, i) => {
      array[i] = [];
      arr.forEach((_, j) => {
        const total = countNeighbours(i, j, this.activeArray);
        if (this.activeArray[i][j]) {
          if (total == 2 || total == 3) {
            return (array[i][j] = 1);
          }
          return (array[i][j] = 0);
        }
        if (total !== 3) return (array[i][j] = 0);
        return (array[i][j] = 1);
      });
    });
    this.activeArray = array;
    this.gridConvas();
  }

  createLifeCell() {
    this.mouseClick$().pipe(
      map((v:any) => {
        return { x: v.offsetX, y: v.offsetY };
      })
    ).subscribe((v)=>{
      
    });
  }
  mouseClick$() {
    return fromEvent(this.canvas, 'click');
  }
}
