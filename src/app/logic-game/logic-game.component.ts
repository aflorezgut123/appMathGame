import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logic-game',
  templateUrl: './logic-game.component.html',
  styleUrls: ['./logic-game.component.scss'],
})
export class LogicGameComponent implements OnInit { 

  constructor(public alertController: AlertController, private router: Router) { }
  firstValue: number;
  secondValue: number;
  operator: string;
  value: number;
  total: number;
  contador: number = 0;
  n: number;
  chars: string;
  result: string;
  totalOperator: number;
  timeLeft: number = 15;
  interval;

  ngOnInit() {
    this.generateOperator();
    this.generateValues();    
    this.startTimer();
    this.resultOperator(this.firstValue,this.secondValue,this.result);
    this.total =this.totalOperator;    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Game Over',
      subHeader:`Operation: ${this.firstValue}`+`${this.result}`+`${this.secondValue}`,
      message: `Correct answer is: ${this.total}`,
      buttons: ['OK']
    });    
    await alert.present();   
    this.router.navigate(['/home']);
    const { role } = await alert.onDidDismiss();    
    this.pauseTimer();   
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      }else if(this.timeLeft < 1){
        this.pauseTimer();
        this.presentAlert();
      } else {
        this.timeLeft = 15;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  generateOperator(){
    this.result='';  
    this.chars = '+-';   
    this.n = this.chars.length;
    for (let i = 0; i < this.n; i++){
    this.result += this.chars.charAt(Math.floor(Math.random() * this.chars.length));
    }    
    this.result=this.result.substring(0,1);    
  }

  generateValues(){
    this.firstValue = Math.floor(Math.random()*101);
    this.secondValue = Math.floor(Math.random()*101);
  }

  valite(){
    this.pauseTimer();
    this.value = parseFloat((document.getElementById("inputTotal") as HTMLInputElement).value);
    this.resultOperator(this.firstValue,this.secondValue,this.result);
    this.total =this.totalOperator;

    if (this.total!=this.value) {
      this.presentAlert();            
    } 
    else{
      this.contador += 1;
      this.timeLeft = 15;      
    }
    this.ngOnInit();    
  }

  resultOperator(first: number, second: number, mathOperator: string){   
    switch(mathOperator){
      case '+':
        this.totalOperator = first+second;
        break;
      case '-':
        this.totalOperator = first-second;
        break;
      case '*':
        this.totalOperator = first*second;    
        break;
      case '/':
        this.totalOperator = first/second;
        break;  
    }    
  }
}
