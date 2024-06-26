import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SideBarComponent } from './sidebar';
import { LayoutComponent } from './layout';
import { OverviewComponent } from './navbar';
import { SharedModule } from '@app/shared';
import { ClaimadminComponent } from './claimadmin/claimadmin.component'; // Assurez-vous que c'est bien importé

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        SharedModule
    ],
    declarations: [
        SideBarComponent,
        LayoutComponent,
        OverviewComponent,
        ClaimadminComponent // Assurez-vous que c'est bien déclaré
    ]
})
export class AdminModule { }