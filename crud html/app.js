let listaProductos = [];

const objProducto = {
    id: '',
    precio: '',
    descripcion: '',
    categoria: '',
    fecha: ''
}

let editando = false;

const produc = document.querySelector('#produc');
const precioImput = document.querySelector('#precio');
const descripcionImput = document.querySelector('#descripcion');
const categoriaSelect = document.querySelector('#categoria-select');
const categoriaImput = document.querySelector('#categoria');
const fechaImput = document.querySelector('#fecha');
const btnAgregar = document.querySelector('#btnAgregar');

// Mostrar campo de texto para categoría personalizada si se selecciona "Otros"
categoriaSelect.addEventListener('change', () => {
    if (categoriaSelect.value === 'Otros') {
        categoriaImput.style.display = 'block';
    } else {
        categoriaImput.style.display = 'none';
        categoriaImput.value = ''; // Limpiar el campo personalizado si no se usa
    }
});

produc.addEventListener('submit', validarproduc);

function validarproduc(e){
    e.preventDefault();

    const categoriaValor = categoriaSelect.value === 'Otros' ? categoriaImput.value : categoriaSelect.value;

    if(precioImput.value === '' || descripcionImput.value === '' || categoriaValor === '' || fechaImput.value === ''){
        alert("Todos los campos son obligatorios");
        return;
    }

    if(editando){
        editarProducto();
        editando = false;
    }else{
        objProducto.id = Date.now();
        objProducto.precio = precioImput.value;
        objProducto.descripcion = descripcionImput.value;
        objProducto.categoria = categoriaValor;
        objProducto.fecha = fechaImput.value;

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
    objProducto.precio = '';
    objProducto.descripcion = '';
    objProducto.categoria = '';
    objProducto.fecha = '';
}

function mostrarProductos(){
    limpiarHTML();

    const divProductos = document.querySelector('.div-productos');

    listaProductos.forEach( producto => {
        const {id, precio, descripcion, categoria, fecha} = producto;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${precio} - ${descripcion} - ${categoria} - ${fecha} `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarProducto(producto);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarProducto(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divProductos.appendChild(parrafo);
        divProductos.appendChild(hr);
    });
}

function cargarProducto(producto){
    const {id, precio, descripcion, categoria, fecha} = producto;

    precioImput.value = precio;
    descripcionImput.value = descripcion;
    if (categoria === 'Ahorros' || categoria === 'Ventas' || categoria === 'Otros') {
        categoriaSelect.value = categoria;
        categoriaImput.style.display = 'none';
    } else {
        categoriaSelect.value = 'Otros';
        categoriaImput.style.display = 'block';
        categoriaImput.value = categoria;
    }
    fechaImput.value = fecha;

    objProducto.id = id;

    produc.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarProducto(){
    objProducto.precio = precioImput.value;
    objProducto.descripcion = descripcionImput.value;
    objProducto.categoria = categoriaSelect.value === 'Otros' ? categoriaImput.value : categoriaSelect.value;
    objProducto.fecha = fechaImput.value;

    listaProductos = listaProductos.map(producto => {
        if (producto.id === objProducto.id) {
            producto.precio = objProducto.precio;
            producto.descripcion = objProducto.descripcion;
            producto.categoria = objProducto.categoria;
            producto.fecha = objProducto.fecha;
        }
        return producto;
    });

    limpiarHTML();
    mostrarProductos();

    produc.reset();

    produc.querySelector('button[type="submit"]').textContent = 'Agregar';

    limpiarObjeto();
}

function eliminarProducto(id){
    listaProductos = listaProductos.filter(producto => producto.id !== id);

    limpiarHTML();
    mostrarProductos();
}

function limpiarHTML(){
    const divProductos = document.querySelector('.div-productos');
    while (divProductos.firstChild) {
        divProductos.removeChild(divProductos.firstChild);
    }
}
