import {Component, Input} from '@angular/core';
 

@Component({
    selector: 'menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})


export class MenuItem{

    @Input('name') name: string;
    @Input('icon') icon: string;
    @Input('collapsible') collapsible: boolean = false;
    @Input('collapsed') collapsed: boolean = true;

    toggle(){
        if (this.collapsible) this.collapsed = !this.collapsed;
    }

}