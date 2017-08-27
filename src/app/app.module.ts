import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// used to create fake backend
import {BaseRequestOptions, HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { UserComponent } from './user/index';
import { ProfileComponent } from './profile/index';
import {ListingService} from "./_services/listing.service";
import {CdkTableModule} from "@angular/cdk";
import {
    MdButtonModule, MdDialog, MdDialogModule, MdInputContainer, MdInputModule,
    MdNativeDateModule, MdOptionModule, MdSelectModule
} from "@angular/material";
import {AddListingDialog} from "./profile/profile.component";
import {ListingComponent} from "./listings/listing.component";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MdButtonModule,
        MdInputModule,
        MdDialogModule,
        MdOptionModule,
        MdSelectModule,
        MdNativeDateModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        ProfileComponent,
        ListingComponent,
        AddListingDialog
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        ListingService,
        MdDialog,
        UserService,

        // providers used to create fake backend
        BaseRequestOptions
    ],
    bootstrap: [AppComponent],
    entryComponents: [AddListingDialog]
})

export class AppModule { }