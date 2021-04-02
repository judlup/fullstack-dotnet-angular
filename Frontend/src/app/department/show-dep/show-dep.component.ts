import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';
import { AddEditDepComponent } from '../add-edit-dep/add-edit-dep.component';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.scss']
})
export class ShowDepComponent implements OnInit {

  constructor(private service: SharedService, private modalService: NgbModal) { }

  DepartmentList: any = [];
  dep: any;

  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList(): any{
    this.service.getDepList().subscribe({
      next : (data) => { this.DepartmentList = data; },
      error: (error) => { alert('Error: ' + error); }
    });
  }

  open(mode: string, item: any = null): any{
    const modalRef = this.modalService.open(AddEditDepComponent, {ariaLabelledBy: 'modal-basic-title'});
    if(mode === 'Add'){
      modalRef.componentInstance.ModalTitle = 'Add Department';
      modalRef.componentInstance.Mode = 'Add';
    }else{
      modalRef.componentInstance.ModalTitle = 'Edit Department';
      modalRef.componentInstance.Mode = 'Edit';
      modalRef.componentInstance.Data = item;
    }

    modalRef.componentInstance.passEntry.subscribe( (response: string) => {
      if(response === 'OK'){
        this.refreshDepList();
      }
      modalRef.close();
    });
  }

  delete(id: number): any{
    const conf = confirm('Are you sure?')
    if(conf){
      this.service.deleteDepartment(id).subscribe({
        next: (data) => { alert(data); this.refreshDepList(); },
        error: (error) => { alert('Error: ' + error); }
      });
    }
  }
}
