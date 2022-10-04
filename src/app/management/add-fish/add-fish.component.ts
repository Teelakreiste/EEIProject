import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { FishesService } from 'src/app/services/fishes.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-fish',
  templateUrl: './add-fish.component.html',
  styleUrls: ['./add-fish.component.css']
})
export class AddFishComponent implements OnInit {

  addFishForm: FormGroup;
  categories: string[];
  //imgPattern = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  private namePattern = /^[a-zA-Z\u00C0-\u00FF]*$/;
  imgSrc: string = '../../../assets/imgManagement/undraw_photograph_re_up3b.svg';
  selectedImage: any = null;
  private index = 0;

  constructor(private formBuilder: FormBuilder, 
    private fishService: FishesService,
    private router: Router,
    private alertService: AlertService,
    private angularFireStorage: AngularFireStorage) { 
    this.addFishForm = this.createFormGroup();
    this.categories = this.fishService.getCategories();
  }

  ngOnInit(): void {
    this.resetForm();
  }

  createFormGroup() {
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(this.namePattern)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]),
      price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99999999)]),
      image: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9999999)]),
      category: new FormControl('', [Validators.required]),
      available: new FormControl('')
    });
  }

  onSubmit() {
    if (this.addFishForm.valid && this.index == 0) {
      this.index++;
      var filePath = `fishes/${this.addFishForm.get('category').value}/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.angularFireStorage.ref(filePath);
      this.angularFireStorage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.addFishForm['image'] = url;
            this.addFish(url);
          })
        })
      ).subscribe();
    }
  }

  addFish(url: string) {
    this.addFishForm.value.image = url;
    (this.addFishForm.value.available) ? this.addFishForm.value.available = true : this.addFishForm.value.available = false;
    this.fishService.createFish(this.addFishForm.value).then(() => {
      this.alertService.alertSuccess('Added','Fish added successfully');
      this.resetForm();
    }).catch((error) => {
      this.alertService.alertError(error);
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '../../../assets/imgManagement/undraw_photograph_re_up3b.svg';
      this.selectedImage = null;
    }
  }

  resetForm() {
    this.addFishForm.reset();
    this.imgSrc = '../../../assets/imgManagement/undraw_photograph_re_up3b.svg';
    this.selectedImage = null;
    this.index = 0;
  }

  get name() { return this.addFishForm.get('name'); }
  get description() { return this.addFishForm.get('description'); }
  get price() { return this.addFishForm.get('price'); }
  get image() { return this.addFishForm.get('image'); }
  get quantity() { return this.addFishForm.get('quantity'); }
  get category() { return this.addFishForm.get('category'); }
  get available() { return this.addFishForm.get('available'); }
}
