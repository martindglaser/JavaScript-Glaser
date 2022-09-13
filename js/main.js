function caclularCuotas(){
	let total = document.getElementById('total').value;
	let cuotas = document.getElementById('cuotas').value;
	if(cuotas==''){
		alert('Seleccione numero de cuotas');
		return;
	}
	let valorPorCuota = total/cuotas;
	alert('El valor que debera pagar por cada cuota es de $'+valorPorCuota);
	return;
}


function getTotal(){
	let PrecioArticulos = document.getElementsByClassName('precioArticulos');
	let total = 0;
	for (let i = 0; i < PrecioArticulos.length; i++) {
		total += parseFloat(PrecioArticulos[i].value);
	}
	document.getElementById('total').value = total;
}
getTotal();