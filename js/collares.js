// VARIABLES
let productos = [];
const contenedorProductos = document.getElementById('contenedorProductos');
const contenedorCarrito = document.getElementsByClassName('contenedorCarrito');
const tbody = document.getElementById('tbody');
const contador = document.getElementById('contador');
const montoTotal = document.getElementById('montoTotal');
const vaciar = document.getElementById('vaciar');
const comprar = document.getElementById('comprar');
const carro = document.getElementById('carro');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let inputSearch = document.getElementById('inputSearch')
let form = document.getElementById('search')
let boxSearch = document.getElementById('box-search')
let link = boxSearch.querySelector('a')

buscado = inputSearch.value.toLowerCase();

// OBTENER PRODUCTOS
async function obtenerProductos() {
    const response = await fetch('../stock.json')
    return await response.json()
}

obtenerProductos().then(productos => {
    filter = productos.filter(elem => elem.tipo == "Collar")
    filter.forEach((producto) => {
    let card = document.createElement("div");

    card.setAttribute("class", `${producto.tipo} card tarjeta`);
    card.style.width = "18rem";
    contenedorProductos.appendChild(card);
    
    let cardImg = document.createElement("div");
    cardImg.innerHTML = `<img src = "../img/${producto.nombre}.jpeg" class = "card-img-top" alt = "${producto.nombre}"</img>`;
    card.appendChild(cardImg);
    let cardBody = document.createElement("div");
    cardBody.innerHTML = `<h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">${producto.tipo} ${producto.id} | Precio: $${producto.precio}</p>
    <button id = "${producto.id}" class="btn btn-primary">Agregar al carrito</button>`;
    cardBody.setAttribute("class", "card-body");
    card.appendChild(cardBody);

    const boton = document.getElementById(`${producto.id}`)
    boton.addEventListener('click', () =>{
        agregarAlCarrito(producto.id)

})
// AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId);
    if (existe){
        const prod = carrito.map(prod =>{
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else{
        const item = productos.find((prod => prod.id === prodId))
        carrito.push(item)
    }
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1000
    })
    actualizarCarrito();
}
})
})
// ACTUALIZAR CARRITO
const actualizarCarrito = () =>{
    tbody.innerHTML= ""
    carrito.forEach((prod)=>{
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td> ${prod.nombre}</td>
        <td> $${prod.precio}</td>
        <td id='${prod.id}'> ${prod.cantidad}</td>
        <td><button onclick="eliminarDelCarrito(${prod.id})" class="btn bg-light"><i class="fas fa-trash"></i>></button></td>
        `
    tbody.appendChild(tr)
    })
    
    contador.innerText = carrito.length
    addLocalStorage();
    totalCarrito();
}

function addLocalStorage (){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

// ELIMINAR CARRITO
const eliminarDelCarrito = (prodId) =>{
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    if (carrito.lenght <= 1){
        localStorage.clear;
    }
    actualizarCarrito();
}

// VACIAR CARRITO
vaciar.onclick = ()=>{
    vaciarCarrito();
}

function vaciarCarrito (){
    carrito = [];
    actualizarCarrito();
}

// CALCULAR TOTAL
const totalCarrito = ()=>{
    let total = 0;
    for (const producto of carrito){
        total += producto.precio * producto.cantidad;
    }
    montoTotal.innerText = `${total}`;
}

// FINALIZAR COMPRA
comprar.onclick = () => {
    const precioFinal = montoTotal.innerText;
    if (precioFinal != 0) {
        Swal.fire({
            title: '¿Querés finalizar tu compra?',
            text: `Total a abonar: $${precioFinal}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No, seguir comprando'
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Tu compra fue realizada con éxito',
                '¡Muchas gracias!',
                'success'
                )
        vaciarCarrito();
                }
            })
    }else{
        Swal.fire({
            title: 'El carrito está vacío',
            icon: 'error',
            showConfirmButton: true
        })
    }
}

// BUSCADOR DE CATEGORIAS

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    buscar();
})

function buscar (){
    buscado = inputSearch.value.toLowerCase();
    form.reset();
    switch (buscado){
        case "anillos":
            link.setAttribute("href", "anillos.html")
            link.click();
            break;
        case "aros":
            link.setAttribute("href", "aros.html")
            link.click();
            break;
        case "collares":
            link.setAttribute("href", "collares.html")
            link.click();
            break;
        default:
            Swal.fire({
                title: 'Ingresá una categoría válida',
                text: 'Anillos - Aros - Collares',
                icon: 'error',
                showConfirmButton: true
            })
    }
}

// Actualiza el carrito en cada pagina
carro.addEventListener('click', () =>{
    actualizarCarrito()
})
