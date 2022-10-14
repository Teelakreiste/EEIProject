import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdditionalComponent } from './register-additional/register-additional.component';
import { MainComponent } from './main/main.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddFishComponent } from './management/add-fish/add-fish.component';

import { SwiperModule } from 'swiper/angular';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UpdateFishComponent } from './management/update-fish/update-fish.component';
import { BillingComponent } from './billing/billing.component';
import { ViewInfoProductComponent } from './view-info-product/view-info-product.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterAdditionalComponent,
    MainComponent,
    ForgotPasswordComponent,
    AddFishComponent,
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    UpdateFishComponent,
    BillingComponent,
    ViewInfoProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule, // <-- include ReactiveFormsModule in imports
    FormsModule, // <-- include FormsModule in imports
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
