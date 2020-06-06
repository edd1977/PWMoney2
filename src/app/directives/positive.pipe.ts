import { Pipe } from "@angular/core";


@Pipe({
    name: 'positiveNum'
})
export class PositiveNumPipe {

    transform(value: number) {
        if(!isNaN(value)) {
            const num = +value;
            if(num < 0) {
                return -num;
            }
        }
        return value;
    }

}