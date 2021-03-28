import React, { useContext, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FirebaseContext } from "../firebase";

const useInstructor = (stateInicial) => {
  // State de nuestro custom hook
  const [state, actualizarState] = useState(stateInicial);
  const [opciones, setOpciones] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerInstructores = () => {
      firebase.db
        .collection("usuarios")
        .where("isInstructor", "==", true)
        .onSnapshot(manejarSnapshot);
    };

    obtenerInstructores();
  }, []);

  function manejarSnapshot(snapshot) {
    const result = snapshot.docs.map((doc) => {
      return {
        nombre: doc.data().nombre,
        usuario: doc.data().usuario,
      };
    });
    setOpciones(result);
  }

  const SelectInstructor = () => (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={opciones}
      getOptionLabel={(option) => option.nombre}
      getOptionSelected={(option, value) => option.nombre === value.nombre}
      value={state}
      onChange={(event, newValue) => {
        actualizarState(newValue);
      }}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Instructores"
          placeholder="Instructores"
        />
      )}
    />
  );

  // Retornar state, interfaz y fn que modifica el state
  return [state, SelectInstructor, actualizarState];
};

export default useInstructor;
