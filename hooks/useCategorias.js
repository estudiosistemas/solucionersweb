import React, { useContext, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FirebaseContext } from "../firebase";
import { categorias_data } from "../data/tablas";

const useCategorias = (stateInicial) => {
  // State de nuestro custom hook
  const [state, actualizarState] = useState(stateInicial);
  const [opciones, setOpciones] = useState([]);

  const SelectCategorias = () => (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={categorias_data}
      getOptionLabel={(option) => option}
      value={state}
      onChange={(event, newValue) => {
        actualizarState(newValue);
      }}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Categorías"
          placeholder="Categorías"
        />
      )}
    />
  );

  // Retornar state, interfaz y fn que modifica el state
  return [state, SelectCategorias, actualizarState];
};

export default useCategorias;
