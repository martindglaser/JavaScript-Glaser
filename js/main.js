if(typeof localStorage.getItem('CarritoDeCompras') == 'object'){
	localStorage.setItem('CarritoDeCompras', JSON.stringify([]));
}



class ElementosStorage {
  constructor(idProducto,nombre,precio) {
    this.idProducto = idProducto;
    this.nombre = nombre;
    this.precio = precio;
  }
}



let elementos = document.getElementsByClassName("agregarElemento");



let agregarArticulo = function() {
    let botonId = this.id;
    let nombreAgregar = document.getElementById(`nombre-${botonId}`).value;
    let precioAgregar = document.getElementById(`precio-${botonId}`).value;



    let CarritoViejo = JSON.parse(localStorage.getItem('CarritoDeCompras'));


    let objetoElemento = new ElementosStorage(botonId,nombreAgregar,precioAgregar);
 
    console.log(objetoElemento);

    CarritoViejo.push(objetoElemento)

    let CarritoNuevo = CarritoViejo;
    
    console.log(CarritoNuevo);

    let CarritoNuevoReady = JSON.stringify(CarritoNuevo);

    localStorage.setItem('CarritoDeCompras', CarritoNuevoReady);

    getArticulosEnCarrito();
};



for (let i = 0; i < elementos.length; i++) {
    elementos[i].addEventListener('click', agregarArticulo);
}



function getArticulosEnCarrito(){
	let carritoDiv = document.getElementById('carrito');
    let Carrito = JSON.parse(localStorage.getItem('CarritoDeCompras'));

    carritoDiv.innerHTML = '';
    let totalCarrito = 0;
    for(let i = 0; i < Carrito.length; i++){
    	carritoDiv.innerHTML += `
    	<div>
    		<h3>${Carrito[i]['nombre']}</h3>
    		<h4>$${Carrito[i]['precio']}</h4>
    		<hr>
    	</div>`;
    	totalCarrito+=parseFloat(Carrito[i]['precio']);
    }

    if(Carrito.length>0){
    	document.getElementById('totalCarrito').innerText = '$'+totalCarrito;
    }

}
getArticulosEnCarrito();


document.getElementById('vaciarCarrito').addEventListener('click', function(){
	localStorage.setItem('CarritoDeCompras', JSON.stringify([]));
	document.getElementById('totalCarrito').innerText = '';
	getArticulosEnCarrito();
});