import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Firestore, collection } from '@angular/fire/firestore';
import { CollectionReference, addDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore)
  usersCollection: CollectionReference;

  constructor () {
    this.usersCollection = collection(this.firestore, 'users');
  }

  initAuthListener() {
    authState(this.auth).subscribe( fuser => {
      console.log(fuser)
      console.log( fuser?.uid )
      console.log( fuser?.email )
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // console.log({ email, nombre, password})
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then( ({ user }) => {
        let uid = user.uid
        return addDoc(this.usersCollection, <Usuario>{ uid, nombre, email})
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
