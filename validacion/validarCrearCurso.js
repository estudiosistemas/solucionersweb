export default function validarCrearCurso(valores) {
  let errores = {};

  if (!valores.nombre) {
    errores.nombre = "El Nombre es obligatorio";
  }

  return errores;
}
