// Esta es una solución de fuerza bruta, si puede mejorarlo 
// siéntase libre de hacerlo
function cabePaquete(dimensiones){
    // Ordenamos el array en forma ascendente
    dimensiones.sort((a, b) => {return a - b});
    // Las dimensiones permitidas son (largo, ancho, alto)
    // S (4.3 x 16 x 25) , M (9.5 x 16 x 25) y L (20 x 16 x 25)
    // El número más pequeño en el array será el ancho
    // El segundo número será el largo y el más grande el alto
    if(dimensiones[2]>25){
        return false;
    }
    else if(dimensiones[1]>20){
        return false;
    }
    else if(dimensiones[0]>16){
        return false;
    }
    return true;
}

// Esta es una solución de fuerza bruta, si puede mejorarlo 
// siéntase libre de hacerlo
function tamanoPaquete(dimensiones){
    // Suponemos que dimensiones es un arreglo ordenado ascendentemente
    let tamano;
    let largo = dimensiones[0]
    if(dimensiones[1] > 16){
        largo = dimensiones[1];
    } 
    if(largo <= 4.3){
        tamano = 'Pequeño';
    } else if (largo <= 9.5) {
        tamano = 'Mediano';
    } else {
        tamano = 'Grande';
    }
    return tamano;
}

module.exports = {
    cabePaquete,
    tamanoPaquete
};