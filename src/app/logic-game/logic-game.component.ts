import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-logic-game',
  templateUrl: './logic-game.component.html',
  styleUrls: ['./logic-game.component.scss'],
})
export class LogicGameComponent implements OnInit {
  
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Operacion suma/resta*',
      subHeader:`${this.firstValue}`+'-'+`${this.secondValue}`,
      message: `La respuesta correcta es ${this.total}`,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  constructor(public alertController: AlertController) { }
  firstValue: number;
  secondValue: number;
  operator: string;
  value: number;
  total: number;
  contador: number;
  n: number;
  chars: string;
  result: string;
  totalOperator: number;

  ngOnInit() {
    this.generateOperator();
    this.generateValues();    
  }

  generateOperator(){
    this.result='';  
    this.chars = '+-*/';   
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
    this.value = parseFloat((document.getElementById("inputTotal") as HTMLInputElement).value);
    this.resultOperator(this.firstValue,this.secondValue,this.result);
    this.total =this.totalOperator;
    this.presentAlert();
    console.log(this.result);
    if (this.total===this.value) {
      this.contador += 1;
    } 
    else{
      this.contador -= 1;
    }
    this.ngOnInit();
    // document.getElementById("inputTotal").innerHTML="";
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
