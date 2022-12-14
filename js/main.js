function getProductos(){
  let productosDiv = document.getElementById('productosDiv');
  fetch('js/productos.json')
  .then((response) => response.json())
  .then((Data) => {
    for (let i = 0; i < Data.length; i++) {
      let card = document.createElement('div');
      card.classList = 'card';
      card.innerHTML = `
        <div class="card">
          <!-- <img src="..." class="card-img-top" alt="..."> -->
          <div class="card-body">
            <h5 class="card-title">${Data[i].description}</h5>
            <p class="card-text">Precio: $${Data[i].price}</p>
            <input type="number" value="1" placeholder="Cantidad" class="form-control form-control-sm" id="cantidad-elemento-${Data[i].id}">
            <button type="button" id="elemento-${Data[i].id}" class="btn btn-primary agregarElemento">Agregar al carrito</button>
          <input type="hidden" id="precio-elemento-${Data[i].id}" value="${Data[i].price}">
          <input type="hidden" id="nombre-elemento-${Data[i].id}" value="${Data[i].description}">
          </div>
        </div>
      `;
      productosDiv.appendChild(card);
    }


    let elementos = document.getElementsByClassName("agregarElemento");
    for (let j = 0; j < elementos.length; j++) {
        elementos[j].addEventListener('click', agregarArticulo);
    }
  })
  .catch((error) => {console.error('Error:', error)});


}
getProductos();



if(typeof localStorage.getItem('CarritoDeCompras') == 'object'){
	localStorage.setItem('CarritoDeCompras', JSON.stringify([]));
}


function mostrarNotificacion(texto){
  Toastify({
    text: texto,
    duration: 3000,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
/*    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }*/
  }).showToast();
}


class ElementosStorage {
  constructor(idProducto,nombre,precio,cantidad) {
    this.idProducto = idProducto;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

function getIndexById(array,id){
  return array.findIndex((obj => obj.idProducto == id));
}




let agregarArticulo = function() {
    let botonId = this.id;
    let nombreAgregar = document.getElementById(`nombre-${botonId}`).value;
    let precioAgregar = document.getElementById(`precio-${botonId}`).value;
    let cantidad = parseInt(document.getElementById(`cantidad-${botonId}`).value);
    if(cantidad < 1 || isNaN(cantidad)){
      return mostrarNotificacion('La cantidad debe ser mayor o igual a 1');
    }

    let CarritoViejo = JSON.parse(localStorage.getItem('CarritoDeCompras'));

    let filtro = CarritoViejo.filter( (el)=> {
      //busco el index del producto que estoy agregando (si ya existe)
      return el.idProducto == botonId;
    });
    if(filtro.length>0){
      //si ya existia lo actualizo
      let index = getIndexById(CarritoViejo,botonId)
      let update = new ElementosStorage(
        botonId,
        nombreAgregar,
        precioAgregar,
        cantidad + CarritoViejo[index].cantidad
      );
      CarritoViejo[index] = update;
    }else{
      //si todavia no existia lo creo
      let crearElemento = new ElementosStorage(botonId,nombreAgregar,precioAgregar,cantidad);
      CarritoViejo.push(crearElemento);
    }

    let CarritoNuevo = CarritoViejo;

    let CarritoNuevoReady = JSON.stringify(CarritoNuevo);

    localStorage.setItem('CarritoDeCompras', CarritoNuevoReady);

    mostrarNotificacion(`${nombreAgregar} agregado`)

    getArticulosEnCarrito();
};





function eliminar(){
  let id = this.parentElement.parentElement.id;

  let Carrito = JSON.parse(localStorage.getItem('CarritoDeCompras'));
  let index = getIndexById(Carrito,id);

  Carrito.splice(index, 1);
  localStorage.setItem('CarritoDeCompras', JSON.stringify(Carrito));

  mostrarNotificacion('Elemento Eliminado');
  
  getArticulosEnCarrito();

}
function sumarUno(){
  let id = this.parentElement.parentElement.parentElement.id;
  modificarCantidad(id, 'sumar');
}
function restarUno(){
  let id = this.parentElement.parentElement.parentElement.id;
  modificarCantidad(id, 'restar');
}
function modificarCantidad(id,accion){
  let Carrito = JSON.parse(localStorage.getItem('CarritoDeCompras'));

  let index = getIndexById(Carrito,id);

  if(Carrito[index]['cantidad'] == 1 && accion=='restar'){
    return mostrarNotificacion('La cantidad no puede ser menor a 1');
  } 

  accion=='sumar' ? Carrito[index]['cantidad']++ : Carrito[index]['cantidad']--;
  

  CarritoNuevoReady = JSON.stringify(Carrito);

  localStorage.setItem('CarritoDeCompras', CarritoNuevoReady);

  getArticulosEnCarrito();
}

function getArticulosEnCarrito(){
	let carritoDiv = document.getElementById('carrito');
    let Carrito = JSON.parse(localStorage.getItem('CarritoDeCompras'));

    carritoDiv.innerHTML = '';
    let totalCarrito = 0;
    for(let i = 0; i < Carrito.length; i++){
      let card = document.createElement('div');
      card.classList.add("card");
      card.innerHTML = `
        <div class="card-body" id="${Carrito[i]['idProducto']}">
          <h5 id="nombreArticulo-${Carrito[i].idProducto}" class="card-title">${Carrito[i]['nombre']}</h5>
          <p class="card-text">Precio: $${Carrito[i]['precio']}</p>
          <div class="elementoCarritoCont">
            <div>
              <p class="card-text">Cantidad: ${Carrito[i]['cantidad']}</p>
              <img id="sumarUno-${Carrito[i]['idProducto']}" class="pointer" src="img/flecha-arriba.svg" style="height: 10px">
              <img id="restarUno-${Carrito[i]['idProducto']}" class="pointer" src="img/flecha-abajo.svg" style="height: 10px">
            </div>
            <div>
              <button id="eliminar-${Carrito[i]['idProducto']}" class="btn btn-outline-danger">
                <img src="img/basura.svg" class="borrarImg">
              </button>
            </div>
          </div>
        </div>
      `;
      carritoDiv.appendChild(card);
    	totalCarrito+=parseFloat(Carrito[i]['precio'] * Carrito[i]['cantidad']);

      document.getElementById(`sumarUno-${Carrito[i]['idProducto']}`).addEventListener('click', sumarUno);
      document.getElementById(`restarUno-${Carrito[i]['idProducto']}`).addEventListener('click', restarUno);
      document.getElementById(`eliminar-${Carrito[i]['idProducto']}`).addEventListener('click', eliminar);
    }

    if(Carrito.length>0){
      datos.innerHTML = `
      <h2>Carrito</h2>
      <span>Total: 
        <span id="totalCarrito"></span>
      </span>
      <button class="btn btn-danger" id="vaciarCarrito">
        Vaciar Carrito
      </button>`;

    	document.getElementById('totalCarrito').innerText = '$'+totalCarrito;
      document.getElementById('vaciarCarrito').addEventListener('click', function(){
      localStorage.setItem('CarritoDeCompras', JSON.stringify([]));
      document.getElementById('totalCarrito').innerText = '';
      mostrarNotificacion('Carrito vaciado');
      getArticulosEnCarrito();
    });
    }else{
      datos.innerHTML = '';
    }

}
getArticulosEnCarrito();






