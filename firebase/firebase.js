import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

import Router from "next/router";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // Registra un usuario
  async registrar(nombre, email, password) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return this.auth.currentUser.updateProfile({ displayName: nombre });
      })
      .then(() => {
        return this.db.collection("usuarios").add({
          avatar: "",
          cursos: [],
          isAdmin: false,
          isInstructor: false,
          nombre,
          telegram: "",
          email: email,
          usuario: this.auth.currentUser.uid,
        });
      })
      .catch((error) => console.error("Error: ", error));
  }

  // Inicia sesión del usuario
  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Cierra la sesión del usuario
  async cerrarSesion() {
    await this.auth.signOut();
    Router.push("/");
  }

  // Subir Imagen
  async uploadFile(file) {
    const storageRef = this.storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    return fileUrl;
  }
}

const firebase = new Firebase();
export default firebase;
