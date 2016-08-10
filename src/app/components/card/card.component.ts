import { Component, OnInit, Input,
    trigger,
    state,
    style,
    transition,
    animate } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

@Component({
    moduleId: module.id,
    selector: 'dtwo-card',
    templateUrl: 'card.component.html',
    styleUrls: ['./card.component.css'],
    directives: [MD_CARD_DIRECTIVES],
    animations: [
        trigger('cardFlip', [
            state('front', style({
                transform: 'rotateY(0deg)'
            })),
            state('back', style({
                transform: 'rotateY(180deg)'
            })),
            transition('front => back', [
                    style({
                        backfacevisibility: 'hidden'
                    }),
                    animate('800ms')
                ]),
            transition('back => front',[
                    style({
                        backfacevisibility: 'hidden'
                    }), 
                    animate('800ms')
                ])
        ])
    ]
})
export class DtwoCardComponent implements OnInit {

    @Input()
    title: string;
    @Input()
    cardWidth: number = 300;

    @Input()
    cardHeight: number = 300;

     @Input()
    flipable: boolean = true;

    front: boolean = true;
    state: string = "front";

    constructor() { }

    ngOnInit() {
        console.log(this.cardWidth);
        console.log(this.cardHeight);
    }

    flip() {        
        if (this.front) {
            this.state = 'back';
            this.front = false;
        } else {
            this.state = 'front';
            this.front = true;
        }
    }

    showCog() {

    }

}