import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppService } from './services/app.service';
import { AuthComponent } from './auth-component/auth.component';
import { HttpClientModule } from '@angular/common/http'
import { MainComponent } from './main-component/main.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: "/main", pathMatch: "full"},
  {path: "main", component: MainComponent, canActivate: [AuthGuard]},
  {path: "auth", component: AuthComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [AppService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
