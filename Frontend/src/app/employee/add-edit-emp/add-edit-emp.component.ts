import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.scss'],
})
export class AddEditEmpComponent implements OnInit {
  constructor(private service: SharedService, private modalService: NgbModal) {}

  @Input() ModalTitle: string | undefined;
  @Input() Mode: string | undefined;
  @Input() Data: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  frm: any;
  departments: any = [];
  imgFile: any;

  ngOnInit(): void {
    this.frm = new FormGroup({
      name: new FormControl(this.Data ? this.Data.EmployeeName : ''),
      department: new FormControl(this.Data ? this.Data.Department : ''),
      dateOfJoining: new FormControl(this.Data ? this.Data.DateOfJoining : ''),
    });
    this.DepartmentList();
  }

  send(): any {
    if (this.Mode === 'Add') {
      this.addEmployee();
    } else {
      this.updateEmployee();
    }
  }

  addEmployee(): any {
    const val = {
      EmployeeName: this.frm.value.name,
      Department: this.frm.value.department,
      DateOfJoining: this.frm.value.dateOfJoining,
    };
    this.service.addEmployee(val).subscribe((data: any) => {
      this.passEntry.emit('OK');
    });
  }

  updateEmployee(): any {
    const val = {
      EmployeeId: this.Data.EmployeeId,
      EmployeeName: this.frm.value.name,
      Department: this.frm.value.department,
      DateOfJoining: this.frm.value.dateOfJoining,
    };
    this.service.updateEmployee(val).subscribe((data: any) => {
      this.passEntry.emit('OK');
    });
  }

  DepartmentList(): any {
    this.service.getAllDepartmentNames().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (error) => {
        alert('Error: ' + error);
      },
    });
  }

  selectFile(event: any): any {
    this.imgFile = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', this.imgFile, this.imgFile?.name);
    this.service
      .uploadPhoto(formData, this.Data.EmployeeId)
      .subscribe((data: any) => {
        this.passEntry.emit('OK');
      });
  }

  imgPrint(fileName: string): string {
    return this.service.Photourl + fileName;
  }

  closeClick(): any {
    this.modalService.dismissAll();
  }
}
