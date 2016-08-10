import {Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'olb-card',
    templateUrl: './olb-card.component.html',
    styleUrls: ['./olb-card.component.scss']
})
export class OlbCardComponent {
    @Input() title: string;
    @Input() hasFooter: boolean;
    @Input() canFlip: boolean;

    private element: Element;

    constructor(){}
}