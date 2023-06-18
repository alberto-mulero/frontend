import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { AuthGuard } from '../app/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PerfilComponent } from './perfil/perfil.component';
import { InitialsAvatarComponent } from './initials-avatar/initials-avatar.component';
import { DialogComponent } from './dialog/dialog.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { MensajeComponent } from './mensaje/mensaje.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    InicioComponent,
    PerfilComponent,
    InitialsAvatarComponent,
    DialogComponent,
    NotificacionComponent,
    MensajeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
