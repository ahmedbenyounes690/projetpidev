import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@features/home';
import { ClaimComponent } from '@app/features/claim/claim.component';  // Assurez-vous que le chemin est correct
import { ChatComponent } from '@app/features/chat/chat.component';  // Importer ChatComponent
import { AuthGuard } from '@core/index';
import { Role } from '@app/_models';

const accountModule = () => import('@features/accountsModule').then(x => x.AccountsModule);
const adminModule = () => import('@features/admin/admin.module').then(x => x.AdminModule);
const coursesModule = () => import('@features/coursesModule').then(x => x.CoursesModule);
const PM = () => import('@features/accountsModule/profile/profile.module').then(x => x.ProfileModule);
const PaymentModule = () => import('@features/coursesModule/payment').then(x => x.PaymentModule);
const FM = () => import('@features/featuresModule/feature/features.module').then(x => x.FeatureModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'account', loadChildren: accountModule },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin], breadcrumb : 'admin' } },
    { path: 'courses', loadChildren: coursesModule, data : { breadcrumb : 'courses' }},
    { path: 'profile', loadChildren: PM },
    { path: 'pay', loadChildren: PaymentModule },
    { path: 'hello', loadChildren: FM },
    { path: 'chat/:id', component: ChatComponent },  // Route pour accéder à ChatComponent spécifique au claim
    { path: 'claims', component: ClaimComponent },  // Route pour accéder à ClaimComponent
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }