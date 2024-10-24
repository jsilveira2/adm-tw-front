import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './notfound/notfound.component';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppComponent,
                children: []
            },
            { path: 'users', loadChildren: () => import('./adm/adm.module').then(m => m.AdmModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
