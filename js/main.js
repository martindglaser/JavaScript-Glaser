const Articulos = [
	{index: 1, articulo: 'Manzanas', precioKilo: 200},
	{index: 2, articulo: 'Peras', precioKilo: 150},
	{index: 3, articulo: 'Cerezas', precioKilo: 400},
]

function menu(){
	let menu = prompt('Menu \n 1. Ver articulos \n 2. Comprar \n 3. Buscar articulo');
	if(menu == 1){
		listarArticulos();
	}else if(menu == 2){
		comprarArticulo();
	}else if(menu == 3){
		filtrar();
	}
}

menu();

function multiplicar(a,b){
	return a * b;
}

function comprarArticulo(){
	let consulta = 'Que articulo queres comprar?\n';

	for(let i = 0; i < Articulos.length; i++){
		consulta += Articulos[i].index +'. '+Articulos[i].articulo+'\n';
	}

	let articuloAComprar = parseInt(prompt(consulta)) - 1;
	if(articuloAComprar < 0 || articuloAComprar >= Articulos.length){
		return;
	}
	let cantidad = parseInt(prompt('Cuantos kilos queres llevar?'));

	alert('El total a pagar es $'+ multiplicar(cantidad,Articulos[ articuloAComprar ].precioKilo) );
	menu();
}


function filtrar(){
	let filtro = prompt('Filtro');


	const Resultado = Articulos.filter((el) => el.articulo.includes(filtro))

	let mensaje = 'Resultado: \n';
	for (let i = 0; i < Resultado.length; i++) {
		mensaje += 'Articulo: '+Resultado[i].articulo + ' - Precio Kilo: $'+Resultado[i].precioKilo+'\n';
	}
	alert(mensaje);
	menu();
}


function listarArticulos(){
	let respuesta = '';
	for(let i = 0; i < Articulos.length; i++){
		respuesta += 'Articulo: '+Articulos[i].articulo + ' - Precio Kilo: $'+Articulos[i].precioKilo+'\n';
	}
	alert(respuesta);
	menu();
}