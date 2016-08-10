import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'md-select',
    templateUrl: 'select.html',
    styleUrls:['select.css']
})

export 
/**
 * SelectComponent
 */
class SelectComponent {

    private active: boolean;
    private label: string = 'Select:';
    @Input() options: SelectOption[];
    @Input() value: string;
    @Output() selectChange = new EventEmitter();

    constructor() { }

    ngOnInit(){
        if(this.options) {
            this.label = this.options[0].title;
        }
    }

    show():void {
        this.active = true;
    }

    select(option: SelectOption):void {
        this.active = false; 
        this.value = option.value;
        this.label = option.title;
        this.selectChange.emit(this.value);        
    }
}

export interface SelectOption {
    title:string;
    value:any;
}

