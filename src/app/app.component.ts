import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<button (click)='toggleState()' [@removeMe]='btnState'>My Button</button>
  <ul>
    <li *ngFor="let item of items"
        [@myTrigger]='state'
        (@myTrigger.start)="animStart($event)"
        (@myTrigger.done)="animDone($event)">{{ item }}</li>
  </ul>
  `,
  styles: [`
  ul { list-style-type:none; margin: 30px 30px 0 0; padding: 0; }
  li {
    padding:15px;
    width:100%;
    background:#f1f1f1;
    margin-bottom:2px;
    font-weight:bold;
  }
  `],
  animations:[
    trigger('myTrigger', [
      state('small', style({
        transform:'scale(1)'
      })),
      state('large', style({
        transform:'scale(1.4)'
      })),
      state('fadeIn', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({ opacity: '0', transform: 'translateY(20px)' }),
        animate(500, keyframes([
          style({opacity:0, transform: 'translateY(-30px)', offset: 0}),
          style({opacity:1, transform: 'translateY(5px) scale(1.2)', offset: .3}),
          style({opacity:1, transform: 'translateY(0px)', offset: 1})
        ]))
      ])
    ]),
    trigger('removeMe', [
      state('out', style({
        transform:'scale(0)',
        opacity: 0
      })),
      transition('* => out', [
        animate('500ms 0s ease-in', keyframes([
          style({opacity: 1, transform: 'translateX(-8px)', offset: 0}),
          style({opacity: 1, transform: 'translateX(0px)', offset: 0.3}),
          style({opacity: 0, transform: 'translateX(50px)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class AppComponent  {
  state: string = 'small';
  btnState: string ='in';
  items: string[] = new Array<string>();
  toggleState() {
    //this.state = (this.state === 'small' ? 'large' : 'small');
    this.items.push("Another item");
    this.state = "fadeIn";
    this.btnState ="out";
  }
  animStart(event:any){
    console.log("Animation started");
    console.log(event);
  }
  animDone(event:any){
    console.log("Animation finished");
    console.log(event);
  }
}
