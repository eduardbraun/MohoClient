import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { ProfileComponent } from './profile/index';
import { LoginComponent } from './login/index';
import { UserComponent } from './user/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {ListingComponent} from "./listings/listing.component";
import {ViewListingComponent} from "./listings/viewListing.component";

const appRoutes: Routes = [
    { path: '', component: ListingComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'listings', component: ListingComponent },
    { path: 'listing/:id', component: ViewListingComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);