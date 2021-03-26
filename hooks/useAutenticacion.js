import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function useAutenticacion() {
  const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

  useEffect(() => {
    // const buscarInstructor = async (usr) => {
    //   const instructoresRef = firebase.db.collection("instructores");
    //   const snapshot = await instructoresRef
    //     .where("usuario", "==", usr.uid)
    //     .get();
    //   if (snapshot.empty) {
    //     return {
    //       ...usr,
    //       isInstructor: false,
    //       instructorProfile: null,
    //       userProfile: null,
    //     };
    //   }
    //   return {
    //     ...usr,
    //     isInstructor: true,
    //     instructorProfile: snapshot.docs[0].data(),
    //     userProfile: null,
    //   };
    // };

    const buscarUsuario = async (usr) => {
      const usuariosRef = firebase.db.collection("usuarios");
      const snapshot = await usuariosRef.where("usuario", "==", usr.uid).get();
      if (snapshot.empty) {
        return usr;
      }
      return {
        ...usr,
        userProfile: snapshot.docs[0].data(),
      };
    };

    // function instructorCallback(resultado) {
    //   if (resultado.isInstructor) {
    //     guardarUsuarioAutenticado(resultado);
    //   } else {
    //     const usuario = buscarUsuario(resultado);
    //     usuario.then(usuarioCallback);
    //   }
    // }

    function usuarioCallback(resultado) {
      guardarUsuarioAutenticado(resultado);
    }

    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        const usuario = buscarUsuario(user);
        usuario.then(usuarioCallback);
      } else {
        guardarUsuarioAutenticado(null);
      }
    });
    return () => unsuscribe();
  }, []);

  return usuarioAutenticado;
}
export default useAutenticacion;
