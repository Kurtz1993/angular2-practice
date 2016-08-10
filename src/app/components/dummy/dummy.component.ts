import {Component, Input} from '@angular/core';
 

@Component({
    selector: 'dummy',
    templateUrl: `<h1>This is a Dummy Component  {{title}}</h1>`
})


export class Dummy{

    @Input('title') title: string;


}