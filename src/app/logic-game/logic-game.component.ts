import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logic-game',
  templateUrl: './logic-game.component.html',
  styleUrls: ['./logic-game.component.scss'],
})
export class LogicGameComponent implements OnInit {

  constructor() { }
  firstValue: number;
  secondValue: number;
  operator: string;

  ngOnInit() {
    this.firstValue = Math.floor(Math.random()*101);
    this.secondValue = Math.floor(Math.random()*101);
  }
}
