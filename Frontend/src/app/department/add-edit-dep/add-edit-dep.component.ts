import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.scss']
})
export class AddEditDepComponent implements OnInit {

  constructor(private service: SharedService, private modalService: NgbModal) { }

  @Input() ModalTitle: string | undefined;
  @Input() Mode: string | undefined;
  @Input() Data: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  frm: any;

  ngOnInit(): void {
    this.frm = new FormGroup ({
      name: new FormControl(this.Data ? this.Data.DepartmentName : ''),
    });
  }

  send(): any {
    if (this.Mode === 'Add'){
      this.addDepartment();
    }else{
      this.updateDepartment();
    }
  }

  addDepartment(): any {
    const val = {DepartmentName: this.frm.value.name};
    this.service.addDepartment(val).subscribe( (data: any) => {
      this.passEntry.emit('OK');
    });
  }

  updateDepartment(): any {
    const val = {DepartmentId: this.Data.DepartmentId, DepartmentName: this.frm.value.name};
    this.service.updateDepartment(val).subscribe( (data: any) => {
      this.passEntry.emit('OK');
    });
  }

  closeClick(): any {
    this.modalService.dismissAll();
  }
}
