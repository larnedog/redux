import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, collectionSnapshots, deleteDoc, doc, docData, setDoc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private firestore: Firestore = inject(Firestore)

  constructor(private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid
    delete ingresoEgreso.uid
    doc(this.firestore, `${uid}`, 'ingresos-egresos')
    const ingresosEgresosCol = collection(this.firestore, `${uid}/ingreso-egreso/items`)
    return addDoc(ingresosEgresosCol, {...ingresoEgreso})
  }

  initIngresoEgresoListener(uid: string) {
    const ingresosEgresosCol = collection(this.firestore, `${uid}/ingreso-egreso/items`)
    return collectionSnapshots(ingresosEgresosCol)
            .pipe(
              map( snapshot => snapshot.map( doc => ({
                      uid: doc.id,
                      ...doc.data()
                  })
                )
              )
            )
  }

  borrarIngresoEgreso( uidItems: string | undefined) {
    const uidUser = this.authService.user.uid
    console.log(uidItems)
    console.log(uidUser)
    const ingresoEgreso = doc(this.firestore, `${uidUser}/ingreso-egreso/items/${uidItems}`)
    return deleteDoc(ingresoEgreso)
  }
}
