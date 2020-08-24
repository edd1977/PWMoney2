import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppService } from './services/app.service';
import { AuthComponent } from './auth-component/auth.component';
import { HttpClientModule } from '@angular/common/http'
import { MainComponent } from './main-component/main.component';
import { AuthGuard } from './routing/auth.guard';
import { NewTransComponent, MyValidators } from './trans-component/new-trans.component/new-trans.component';
import { TransListComponent } from "./trans-component/trans-list.component";
import { ColorDirective } from './directives/color.directive';
import { PositiveNumPipe } from './directives/positive.pipe';
import { ErrorNotifyService } from './services/errorNotify.service';
import { UserService } from './services/user.service';

const routes: Routes = [
  {path: '', redirectTo: "/user-info", pathMatch: "full"},
  {path: 'new-trans', component: NewTransComponent, canActivate: [AuthGuard] },
  {path: 'trans-list', component: TransListComponent, canActivate: [AuthGuard] },
  {path: 'user-info', component: MainComponent, canActivate: [AuthGuard] },
  {path: "auth", component: AuthComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    NewTransComponent,
    TransListComponent,
    // Directives:
    ColorDirective,
    // Pipes:
    PositiveNumPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    AppService,
    AuthGuard,
    MyValidators,
    { provide: "ERROR_MESS", useValue: ErrorNotifyService.notyfying },
    { provide: "BASE_URL", useValue: "http://localhost:3500/" },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
