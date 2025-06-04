const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
  usuario: /^[a-zA-Z0-9_]{4,16}$/, 
  nombre: /^[a-zA-ZÀ-ÿ\s]{6,40}$/,  
  password: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/ 
};

const campos = {
  usuario: false,
  nombre: false,
  password: false,
  password2: false
};

const validarFormulario = (e) => {
  const name = e.target.name;
  const value = e.target.value.trim();

  switch (name) {
    case 'usuario':
      validarCampo(expresiones.usuario, e.target, 'usuario');
      break;
    case 'nombre':
      const validoNombre = expresiones.nombre.test(value) && value.includes(' ');
      actualizarEstado('nombre', validoNombre);
      campos['nombre'] = validoNombre;
      break;
    case 'password':
      validarCampo(expresiones.password, e.target, 'password');
      validarPassword2();
      break;
    case 'password2':
      validarPassword2();
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  const valido = expresion.test(input.value);
  actualizarEstado(campo, valido);
  campos[campo] = valido;
};

const validarPassword2 = () => {
  const inputPassword1 = document.getElementById('password');
  const inputPassword2 = document.getElementById('password2');
  const iguales = inputPassword1.value === inputPassword2.value && inputPassword1.value.length > 0;

  actualizarEstado('password2', iguales);
  campos['password2'] = iguales;
};

const actualizarEstado = (campo, valido) => {
  const grupo = document.getElementById(`grupo-${campo}`);
  if (grupo) {
    grupo.classList.remove('correct', 'incorrect');
    grupo.classList.add(valido ? 'correct' : 'incorrect');
    const mensajeError = grupo.querySelector('.form-input-error');
    if (mensajeError) {
      mensajeError.style.display = valido ? 'none' : 'block';
    }
  }
};

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const todosValidos = Object.values(campos).every(v => v === true);
  if (todosValidos) {
    alert("Formulario enviado correctamente.");
    formulario.reset();
    Object.keys(campos).forEach(k => campos[k] = false);
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('correct', 'incorrect'));
  } else {
    alert("Por favor corrige los errores en el formulario.");
  }
});
