import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss']
})
export class DatepickerRangeComponent implements OnInit, OnChanges {

  @Input()
  fromDateInput: Date;
  @Input()
  toDateInput: Date;

  @Output()
  newIntervalSelected = new EventEmitter<{from: Date, to: Date}>();

  hoveredDate: NgbDate;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(private calendar: NgbCalendar,
              private ngbDateAdapter: NgbDateAdapter<Date>) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fromDate = this.ngbDateAdapter.fromModel(this.fromDateInput);
    this.toDate = this.ngbDateAdapter.fromModel(this.toDateInput);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.newIntervalSelected.emit({
      from: isNullOrUndefined(this.fromDate) ? null : new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day),
        to: isNullOrUndefined(this.toDate) ? null : new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day)});
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
