import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IRecipe} from "../../../shared/interface/recipe";
import {RecipeRepository} from "../../../shared/repository/recipe.repository";
import {IRecipeEntityWithoutId} from "../../../shared/interface/entity/recipeEntity";
import {AuthService} from "../../../shared/service/auth.service";
import {finalize, Observable, of, Subject, switchMap} from "rxjs";
import {TuiFileLike} from "@taiga-ui/kit";
import {Router} from "@angular/router";
import {FileUploadService} from "../../../shared/repository/file.upload.service";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.sass']
})
export class RecipeCreateComponent implements OnInit {
  allProducts: IRecipe[];
  addedProducts: IRecipe[] = [];
  currentKcal = 0

  send = false
  error = false
  empty = false

  constructor(private recipeRepository: RecipeRepository, private fileUploadService: FileUploadService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.recipeRepository.getProducts().subscribe((r) => this.allProducts = r)
  }

  create = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    img: new FormControl(null, Validators.required),
  });

  get name() {
    return this.create.controls.name;
  }

  get description() {
    return this.create.controls.description;
  }

  get img() {
    return this.create.controls.img;
  }

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.create.controls.img.valueChanges.pipe(
    switchMap(file => (file ? this.makeRequest(file) : of(null))),
  );

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.create.controls.img.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);

    return of(file).pipe(
      finalize(() => this.loadingFiles$.next(null)),
    );
  }

  addProduct = (product: IRecipe, type: string) => {
    this.addedProducts.push(product)
    this.currentKcal += product.kcal
  }

  deleteProduct = (product: IRecipe, type: string) => {
    for (let i = 0; i < this.addedProducts.length; i++) {
      if (this.addedProducts[i].id === product.id) {
        this.addedProducts.splice(i, 1)
        this.currentKcal -= product.kcal
        break
      }
    }
  }

  fix(num: number) {
    return Number(num % 1 === 0 ? num.toFixed(0) : num.toFixed(1))
  }

  createRecipe() {
    if (this.create.invalid || this.currentKcal <= 0) {
      if (this.create.invalid) {
        this.create.markAllAsTouched()
      }
      if (this.currentKcal <= 0) {
        this.empty = true
      }
      return;
    }
    const file = this.create.controls.img.value! as File
    const fileName = this.fileUploadService.generateRandomName(file)
    this.fileUploadService.uploadImage(file, fileName).subscribe(res => {
      if (res == 100) {
        this.fileUploadService.getDownloadUrl(fileName).subscribe(downloadUrl => {
          let newRecipe: IRecipeEntityWithoutId = {
            carbohydrate: this.fix(this.addedProducts.reduce((accumulator, currentValue) => accumulator + currentValue.carbohydrate, 0)),
            date: new Date(),
            fat: this.fix(this.addedProducts.reduce((accumulator, currentValue) => accumulator + currentValue.fat, 0)),
            img: downloadUrl as string,
            kcal: this.fix(this.currentKcal),
            productIds: this.addedProducts.map(v => v.id),
            protein: this.fix(this.addedProducts.reduce((accumulator, currentValue) => accumulator + currentValue.protein, 0)),
            description: this.create.controls.description.value!,
            title: this.create.controls.name.value!,
            userId: this.authService.getCurrentUserId()
          }
          this.recipeRepository.create(newRecipe)
            .subscribe({
              next: (value) => {
                this.send = true
                setTimeout(() => this.send = false, 1500)
                setTimeout(() => this.router.navigate(['/recipes', value.id]), 1500);
              },
              error: () => {
                this.error = true
                setTimeout(() => this.error = false, 3000)
              }
            })
        })
      }
    })

  }

}
