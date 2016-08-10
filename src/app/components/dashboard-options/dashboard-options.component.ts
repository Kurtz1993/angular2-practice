import {Component, ViewEncapsulation} from '@angular/core';
import { MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox'; 
import { MD_RADIO_DIRECTIVES, MdUniqueSelectionDispatcher} from '@angular2-material/radio';
 

@Component({
    selector: 'dashboard-options',
    templateUrl: 'dashboard-options.component.html',
    styleUrls: ['./dashboard-options.component.scss'],
    directives: [MD_CHECKBOX_DIRECTIVES, MD_RADIO_DIRECTIVES],
    providers: [MdUniqueSelectionDispatcher],
    encapsulation: ViewEncapsulation.None
})


export class DashboardOptions{

    public views: View[] = [{id:1, name:'Basic'}, {id:2, name:'Budget'}, {id:3, name:'Retirement'}];
    private activeView: View = {id:2, name:'Budget'};
    private isShown: boolean = false;

    constructor(){}

    toggle(): void{
        this.isShown = !this.isShown;
    }

    setActiveView(view: View): void{
        this.activeView = view;
    }
}

interface View {
    id: number;
    name: string;
}