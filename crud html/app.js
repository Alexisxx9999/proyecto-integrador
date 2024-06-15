let listaProductos = [];

const objProducto = {
    id: '',
    producto: '',
    precio: '',
    cantidad: ''
}

let editando = false;

const produc = document.querySelector('#produc');
const nombreImput = document.querySelector('#nombre');
const precioImput = document.querySelector('#precio');
const cantidadImput = document.querySelector('#cantidad');
const btnAgregar = document.querySelector('#ntnAgregar');

produc.addEventListener('submit', validarproduc);

function validarproduc(e){
    e.preventDefault();

    if(nombreImput.value === '' || precioImput.value === '' || cantidadImput.value === ''){
        alert("Toods los campos son obligatorios")
        return;
    }

    if(editando){
        editarProducto();
        editando = false;
    }else{
        objProducto.id = Date.now();
        objProducto.nombre = nombreImput.value;
        objProducto.precio = precioImput.value;
        objProducto.cantidad = cantidadImput.value;

        agregarProducto();
    }
}

function agregarProducto(){
    listaProductos.push({...objProducto});

    mostrarProductos();

    produc.reset();

    limpiarObjeto();
}

function limpiarObjeto(){
    objProducto.id = '';
    objProducto.nombre = '';
    objProducto.precio = '';
    objProducto.cantidad = '';
}

function mostrarProductos(){

    limpiarHTML();

    const divProductos = document.querySelector('.div-productos');

    listaProductos.forEach( producto => {
        const {id,nombre,precio,cantidad} = producto;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${precio} - ${cantidad} -`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarProducto(producto);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn-editar');
        parrafo.append(editarBoton);

        
        const eliminarBoton = document.createElement('button');
        //eliminarBoton.onclick = () => eliminarProducto(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divProductos.appendChild(parrafo);
        divProductos.appendChild(hr);

    });
}

function cargarProducto(){
    
    const{id,nombre,precio,cantidad} =  producto;

    nombreImput.value = nombre;
    precioImput.value = precio;
    cantidadImput.value = cantidad;

    objProducto.id = id;

    produc.querySelector('button[type-"submit"]').textContent = 'Actualizar';

    editando = true;

}

function editarProducto(){

    objProducto.nombre = nombreImput.value;
    objProducto.precio = precioImput.value;
    objProducto.cantidad = cantidadImput.value;

    listaProductos.map( producto =>{

        if (producto.id === objProducto.id) {
            producto.id = objProducto.id;
            producto.nombre = objProducto.nombre;
            producto.precio = objProducto.precio;
            producto.cantidad = objProducto.cantidad;
        }
    }); 

    limpiarHTML();
    mostrarProductos();

    produc.reset();

    produc.querySelector('button[type-"submit"]').textContent = 'Actualizar';

    editando = false;
}

function limpiarHTML(){
    const divProductos = document.querySelector('.div-productos');
    while (divProductos.firstChild) {
        divProductos.removeChild(divProductos.firstChild);
    }
}