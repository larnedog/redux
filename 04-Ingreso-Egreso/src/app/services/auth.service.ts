import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'
import { Observable, Subscription, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Firestore, collection, collectionData, doc, docData, setDoc } from '@angular/fire/firestore';
import { CollectionReference, addDoc } from '@firebase/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store'
import * as auth from '../auth/auth.actions'
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore)
  usersCollection!: CollectionReference;
  userSubscription!: Subscription
  private _usuario!: Usuario | null

  get user() {
    return {... this._usuario}
  }

  constructor (private store: Store<AppState>) {
  }

  initAuthListener() {
    authState(this.auth).subscribe( fuser => {
      if(fuser) {
        const user = doc(this.firestore, `${fuser.uid}/user`)
        this.userSubscription = docData(user).subscribe( user => {
                                  const usuario = user as Usuario
                                  this._usuario = usuario
                                  this.store.dispatch(auth.setUser({ user: usuario}))
                                })
      } else {
        this._usuario = null
        this.userSubscription.unsubscribe()
        this.store.dispatch(auth.unSetUser())
        this.store.dispatch( ingresoEgresoActions.unsetItems() )
      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // console.log({ email, nombre, password})
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then( ({ user }) => {
        let uid = user.uid
        this.usersCollection = collection(this.firestore, `${uid}`);
        return setDoc(doc(this.firestore, `${uid}`, 'user', ), <Usuario>{ uid, nombre, email})
      })
  }

  logInUsuario( email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  loggout() {
    return signOut(this.auth);
  }

  isAuth() {
    return authState(this.auth).pipe(
      map( fuser => fuser != null )
    )
  }
}
