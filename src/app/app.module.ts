import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './components/app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppService } from './services/app.service';
import { AuthComponent } from './components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http'
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './routing/auth.guard';
import { NewTransComponent } from './components/transaction/new-trans/new-trans.component';
import { TransListComponent } from "./components/transaction/trans-list.component";
import { ColorDirective } from './directives/color.directive';
import { PositiveNumPipe } from './directives/positive.pipe';
import { ErrorNotifyService } from './services/errorNotify.service';
import { UserService } from './services/user.service';
import { AppMessageComponent } from './components/message/message.component'

// redux:
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { currentUserReducer, usersReducer, transactionsReducer } from './redux/reducers';
import { User, Users } from './model/model';
import { UserEffects } from './redux/effects';
import { TransactionService } from './services/transaction.service';

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
    AppMessageComponent,
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
    FlexLayoutModule,
    StoreModule.forRoot({ // IApp
      currentUser: currentUserReducer, // авторизированный пользователь
      users: usersReducer, // список всех пользователей
      transactions: transactionsReducer // транзакции авторизированного пользователя
    }),
    EffectsModule.forRoot([
      UserEffects
    ])
  ],
  providers: [
    AppService,
    AuthGuard,
    //MyValidators,
    { provide: "ERROR_MESS", useValue: ErrorNotifyService.notyfying },
    { provide: "BASE_URL", useValue: "http://localhost:3500/" },
    UserService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
