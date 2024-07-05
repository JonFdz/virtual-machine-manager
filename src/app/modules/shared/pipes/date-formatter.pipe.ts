import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
	name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

	constructor(private datePipe: DatePipe) { }

	transform(value: Date | string | number, format: string = 'short'): string | null {
		return this.datePipe.transform(value, format);
	}
}