import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout';
import { ClaimadminComponent } from './claimadmin/claimadmin.component'; // Assurez-vous que c'est bien importé

const FeatureModule = () => import('@features/admin').then(x => x.EntityModule);
const AccountsModule = () => import('@features/admin').then(x => x.AccountsModule);
const CoursesModule = () => import('@features/admin').then(x => x.CoursesModule);
const DashboardModule = () => import('@features/admin').then(x => x.DashboardModule);
const CategoriesModule = () => import('@features/admin').then(x => x.CategoriesModule);
const QuizModule = () => import('@features/admin').then(x => x.QuizModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: DashboardModule },
            { path: 'accounts', loadChildren: AccountsModule },
            { path: 'courses', loadChildren: CoursesModule },
            { path: 'categories', loadChildren: CategoriesModule },
            { path: 'feature', loadChildren: FeatureModule },
            { path: 'quiz', loadChildren: QuizModule },
            { path: 'claim', component: ClaimadminComponent }, // Route pour accéder à ClaimadminComponent
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }