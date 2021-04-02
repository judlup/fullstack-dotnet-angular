import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';
import { AddEditEmpComponent } from '../add-edit-emp/add-edit-emp.component';
import {
  faEdit,
  faTrash,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.scss'],
})
export class ShowEmpComponent implements OnInit {
  constructor(private service: SharedService, private modalService: NgbModal) {}

  EmployeeList: any = [];
  emp: any;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlusSquare = faPlusSquare;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  refreshEmpList(): any {
    this.service.getEmpList().subscribe({
      next: (data) => {
        this.EmployeeList = data;
      },
      error: (error) => {
        alert('Error: ' + error);
      },
    });
  }

  open(mode: string, item: any = null): any {
    const modalRef = this.modalService.open(AddEditEmpComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });
    if (mode === 'Add') {
      modalRef.componentInstance.ModalTitle = 'Add Employee';
      modalRef.componentInstance.Mode = 'Add';
    } else {
      modalRef.componentInstance.ModalTitle = 'Edit Employee';
      modalRef.componentInstance.Mode = 'Edit';
      modalRef.componentInstance.Data = item;
    }

    modalRef.componentInstance.passEntry.subscribe((response: string) => {
      if (response === 'OK') {
        this.refreshEmpList();
      }
      modalRef.close();
    });
  }

  delete(id: number): any {
    const conf = confirm('Are you sure?');
    if (conf) {
      this.service.deleteEmployee(id).subscribe({
        next: (data: any) => {
          alert(data);
          this.refreshEmpList();
        },
        error: (error: any) => {
          alert('Error: ' + error);
        },
      });
    }
  }

  imgPrint(fileName: string): string {
    return this.service.Photourl + fileName;
  }
}
