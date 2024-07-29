import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../../core/services/main.service';
import { Location } from '@angular/common';
import { Food } from '../interfaces/dish';
@Component({
  selector: 'app-edit-dish',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor,CommonModule],
  templateUrl: './edit-dish.component.html',
  styleUrl: './edit-dish.component.css'
})
export class EditDishComponent {
  foodForm!: FormGroup;
  foodId!: number;

  constructor(
    private fb: FormBuilder,
    private foodService: MainService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.foodForm = this.fb.group({
      id:[''], 
      dishname: ['',Validators.required ],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      image: ['', Validators.required]
    });

    this.foodId = +this.route.snapshot.paramMap.get('id')!;
    this.getFood(this.foodId);
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

  getFood(id: number): void {
    this.foodService.getFood(id).subscribe(food => {
      this.foodForm.patchValue({
        id:food.id,
        dishname: food.dishname,
        description: food.description,
        price: food.price,
        image: food.image
      });
    });
  }

  update(): void {
   
    this.foodService.updateFood(this.foodForm.value)
      .subscribe(() => this.goback());
  }

  goback(): void {
    this.location.back();
  }

}
