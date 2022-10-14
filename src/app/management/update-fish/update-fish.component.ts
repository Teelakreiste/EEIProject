import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { FishesService } from 'src/app/services/fishes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-update-fish',
  templateUrl: './update-fish.component.html',
  styleUrls: ['./update-fish.component.css']
})
export class UpdateFishComponent implements OnInit {

  updateFishForm: FormGroup;
  categories: string[];
  imageUrl: string = '';
  private namePattern = /^[a-zA-Z\u00C0-\u00FF]*$/;
  imgSrc: string = '../../../assets/imgManagement/undraw_photograph_re_up3b.svg';
  selectedImage: any = null;
  private index = 0;

  constructor(private formBuilder: FormBuilder,
    private fishService: FishesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private localService: LocalService,
    private angularFireStorage: AngularFireStorage) {
    this.updateFishForm = this.createFormGroup();
    this.categories = this.fishService.getCategories();
  }

  ngOnInit(): void {
    if (this.localService.getJsonValue('role') != 'admin') {
      this.router.navigate(['/eei/main']);
    } else {
      this.fishService.getFish(this.getID()).subscribe((data) => {
        this.setUpdateFishForm(data);
      });
    }
  }

  setUpdateFishForm(fishRef: any) {
    this.imgSrc = fishRef.image;
    this.imageUrl = fishRef.image;
    this.updateFishForm = this.formBuilder.group({
      name: [fishRef.name, [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(this.namePattern)]],
      description: [fishRef.description, [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      price: [fishRef.price, [Validators.required, Validators.min(0), Validators.max(99999999)]],
      image: ['', []],
      quantity: [fishRef.quantity, [Validators.required, Validators.min(0), Validators.max(9999999)]],
      category: [fishRef.category, [Validators.required]],
      available: [fishRef.available, []]
    });
  }

  getID() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  createFormGroup() {
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(this.namePattern)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]),
      price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99999999)]),
      image: new FormControl('', []),
      quantity: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9999999)]),
      category: new FormControl('', [Validators.required]),
      available: new FormControl('')
    });
  }

  onSubmit() {
    if (this.updateFishForm.valid && this.index == 0) {
      this.index++;
      this.uploadImage();
    }
  }

  updateFish(url: string) {
    this.updateFishForm.value.image = url;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    (this.updateFishForm.value.available) ? this.updateFishForm.value.available = true : this.updateFishForm.value.available = false;
    this.fishService.updateFish(id, this.updateFishForm.value);
    this.alertService.alertSuccess('Updated','Fish updated successfully!');
    this.resetForm();
  }

  uploadImage() {
    if (this.selectedImage != null) {
      var filePath = `fishes/${this.updateFishForm.get('category').value}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.angularFireStorage.ref(filePath);
      this.angularFireStorage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.updateFishForm['image'] = url;
            this.updateFish(url);
          })
        })
      ).subscribe();
    } else {
      this.updateFish(this.imgSrc);
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = this.imageUrl;
      this.selectedImage = null;
    }
  }

  resetForm() {
    this.updateFishForm.reset();
    this.imgSrc = '../../../assets/imgManagement/undraw_photograph_re_up3b.svg';
    this.selectedImage = null;
    this.index = 0;
    this.router.navigate(['/eei/main']);
  }

  onBack() {
    this.router.navigate(['/eei/main']);
  }

  get name() { return this.updateFishForm.get('name'); }
  get description() { return this.updateFishForm.get('description'); }
  get price() { return this.updateFishForm.get('price'); }
  get image() { return this.updateFishForm.get('image'); }
  get quantity() { return this.updateFishForm.get('quantity'); }
  get category() { return this.updateFishForm.get('category'); }
  get available() { return this.updateFishForm.get('available'); }
}
