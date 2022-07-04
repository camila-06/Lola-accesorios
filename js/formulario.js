class Formulario{
    constructor(nombre, apellido, telefono, email, textArea){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.textArea = textArea;
    }
}

let form = document.getElementById('form');
let nombre = document.getElementById('nombre');
let errorNombre = document.getElementById('error-nombre')
let apellido = document.getElementById('apellido');
let errorApellido = document.getElementById('error-apellido')
let telefono = document.getElementById('telefono');
let errorTelefono = document.getElementById('error-telefono')
let email = document.getElementById('email');
let errorEmail = document.getElementById('error-email')
let contacto = [];

form.addEventListener('submit', (e)=>{
    if (nombre.value == ""){
        e.preventDefault();
        errorNombre.removeAttribute("hidden");
        nombre.addEventListener('change', ()=>{
            errorNombre.setAttribute("hidden", "");
        })
    } else if (apellido.value == ""){
        e.preventDefault();
        errorApellido.removeAttribute("hidden");
        apellido.addEventListener('change',()=>{
            errorApellido.setAttribute("hidden", "");
        }) 
    }else if (telefono.value == ""){
        e.preventDefault();
        errorTelefono.removeAttribute("hidden");
        telefono.addEventListener('change',()=>{
            errorTelefono.setAttribute("hidden", "");
        }) 
    } else if (email.value == ""){
        e.preventDefault();
        errorEmail.removeAttribute("hidden");
        email.addEventListener('change', ()=>{
            errorEmail.setAttribute("hidden", "");
        })
    }else{
        e.preventDefault();
        let datos = new FormData (e.target)
        let consulta = new Formulario(datos.get('nombre'), datos.get('apellido'), datos.get('telefono'), datos.get('email'), datos.get('textarea'));
        contacto.push(consulta);
        form.reset();
    
        Swal.fire({
            icon: 'success',
            title: '¡Gracias por contactarnos!',
            text: 'Te estaremos respondiendo a la brevedad',
            showConfirmButton: false,
            timer: 2000
        })
        localStorage.setItem("contacto", JSON.stringify(consulta));
    }
})
