import { Directive, ElementRef, Input } from "@angular/core";


@Directive({
    selector: '[colorNum]'
})
export class ColorDirective {
    
    constructor(private el: ElementRef) {
        //
    }

    @Input('colorNum')
    colorNum: number = 0;

    ngOnChanges() {
        if(!isNaN(this.colorNum)) {
            if(this.colorNum >= 0) {
                this.el.nativeElement.style.color = "green";
            } else {
                this.el.nativeElement.style.color = "red";
            }
        }
    }

}