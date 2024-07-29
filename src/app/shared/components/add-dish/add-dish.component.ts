import { Component,OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MainService } from '../../../core/services/main.service';
import { CommonModule, Location, NgFor, NgIf } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatError, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../../features/dashboard/dashboard.component';
import { Food } from '../interfaces/dish';
@Component({
  selector: 'app-add-dish',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgIf,DashboardComponent,MatButtonModule,MatCardModule,MatInputModule,MatLabel,NgFor,MatFormFieldModule,MatError,MatLabel,MatCardModule,MatDialogActions,MatDialogContent],
  templateUrl: './add-dish.component.html',
  styleUrl: './add-dish.component.css'
})
export class AddDishComponent {
  foodForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private foodService: MainService,
    private location: Location,
    private modalService: NgbModal,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      dishname: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      image: ['', Validators.required],
    });
  }
  onfile(e:Event){
    const img=e.target as HTMLInputElement;
    if(img?.files){
      var reader=new FileReader();
      reader.readAsDataURL(img.files[0]);
      reader.onload=(event:any)=>{
        this.foodForm.patchValue({
          image:event.target.result
        })
      }
    }
  }

  add(): void {
    this.foodService.addFood(this.foodForm.value as Food)
      .subscribe(() => {this.router.navigate(['/dashboard'])});
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  goback(): void {
    this.location.back();
  }
}


