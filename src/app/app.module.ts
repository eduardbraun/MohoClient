import {NgModule, PipeTransform} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ProfileComponent } from './profile/index';
import {ListingService} from "./_services/listing.service";
import {
    MdButtonModule, MdDialog, MdDialogModule, MdInputModule,
    MdNativeDateModule, MdOptionModule, MdSelectModule, MdTooltipModule
} from "@angular/material";
import {
    AddListingDialog, ChangeProfilePictureDialog, DeleteListingDialog, DisableListingDialog,
    UpdateListingDialog
} from "./profile/profile.component";
import {ListingComponent} from "./listings/listing.component";
import {BusyModule} from "angular2-busy";
import {ViewListingComponent} from "./listings/viewListing.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

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
        MdTooltipModule,
        BusyModule,
        MdNativeDateModule,
        AngularFontAwesomeModule,
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
        ViewListingComponent,
        AddListingDialog,
        UpdateListingDialog,
        DisableListingDialog,
        DeleteListingDialog,
        ChangeProfilePictureDialog
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
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
    entryComponents: [
        AddListingDialog,
        UpdateListingDialog,
        DisableListingDialog,
        DeleteListingDialog,
        ChangeProfilePictureDialog
    ]
})

export class AppModule { }