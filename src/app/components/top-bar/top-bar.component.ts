 import { Component } from '@angular/core';
 import { MD_TOOLBAR_DIRECTIVES } from "@angular2-material/toolbar";
 import { MD_BUTTON_DIRECTIVES } from "@angular2-material/button";
 import { DashboardOptions } from "../dashboard-options/dashboard-options.component"

@Component({
    moduleId: module.id,
    selector: 'top-bar',
    templateUrl: 'top-bar.component.html',    
    styleUrls: ['./top-bar.component.scss'],
    directives: [MD_TOOLBAR_DIRECTIVES, MD_BUTTON_DIRECTIVES, DashboardOptions]
})

export class TopBarComponent{

    
}