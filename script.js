var jugadaHecha = 4;
//Mediante un click se llama a una funcion que asigna un numero a cada boton
$("#button_0").click(() => jugadaHecha = 0); //concatenar un html en js 
$("#button_1").click(() => jugadaHecha = 1);
$("#button_2").click(() => jugadaHecha = 2);
$("#button_3").click(() => jugadaHecha = 3);

//Al clickear al boton empezar, ejecuta la funcion empezarJugada
$("#empezar").click(async() => {
    await empezarJugada();
});

async function empezarJugada() {

    document.getElementById("empezar").disabled = true; //Deshabilita boton

    limpiarResultado();

    let secuencia = [
        definirSecuencia(),
        definirSecuencia(),
        definirSecuencia(),
        definirSecuencia(),
        definirSecuencia()
    ]; //Se define secuencia como un array de funciones con una cantidad fija de rondas

    for (let i = 0; i < secuencia.length; i++) {
        let jugadaActiva = secuencia.slice(0, i + 1); //Crea un array jugadaActiva que guarda una parte del array secuencia

        iluminar(jugadaActiva);

        let sigueJugando = await escuchar(jugadaActiva);
        // Si el jugador pierde (no sigue jugando) anuncia el perdedor
        if (!sigueJugando) {
            anunciarPerdedor();
            document.getElementById("empezar").disabled = false;
            return;
        }
    }
    //Si se recorre todo el for y recorre todo el array de secuencia, se anuncia ganador
    anunciarGanador();
    document.getElementById("empezar").disabled = false;
}

//limpiarResultado reinicia resultado anterior
function limpiarResultado() {
    $("#resultado").text("");
    limpiarJugada();
}

//limpiarJugada resetea la jugada
function limpiarJugada() {
    jugadaHecha = 4;
}

//definirSecuencia retorna un valor entero entre 0 y 3 que hace referencia al numero del boton
function definirSecuencia() {
    let number = Math.floor(Math.random() * 4);

    if (number !== 4) return number;
    else return definirSecuencia();
}


//iluminar enciende el boton
async function iluminar(jugada) {

    for (let i = 0; i < jugada.length; i++) {

        let elBoton = `#button_${jugada[i]}`;

        await sleep(750); //tiempo de espera para encender el boton
        setTimeout(() => { hacerFoco(elBoton) });
        await sleep(250); //tiempo en el que el boton permanece encendido
        setTimeout(() => { quitarFoco(elBoton) });
    }
}

// sleep se utiliza para insertar un tiempo determinado
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//hacerFoco añade la clase de CSS iluminado
function hacerFoco(nombre) {
    $(nombre).addClass("iluminado");
}

//quitarFoco quita la clase CSS iluminado
function quitarFoco(nombre) {
    $(nombre).removeClass("iluminado");
}

//escuchar compara jugada del usuario con la correcta
async function escuchar(jugada) {
    limpiarJugada();

    for (let i = 0; i < jugada.length; i++) {
        let jugadaCorrecta = jugada[i];


        while (!seRealizoUnaJugada()) {
            await sleep(100);
        } //el sistema verifica cada 100 milisegundos si el jugador realizo un click en el boton

        if (jugadaCorrecta !== jugadaHecha) return false;

        limpiarJugada();
    }

    return true;
}

//seRealizoUnaJugada se fija si el usuario realizo una jugada
function seRealizoUnaJugada() {
    return jugadaHecha !== 4;
}

//anunciarPerdedor agrega al html el texto "perdiste"
function anunciarPerdedor() {
    $("#resultado").text("PERDISTE :(");
    $("#resultado").removeClass("text-success");
    $("#resultado").addClass("text-danger");
}

//anunciarGanador agrega al html el texto "ganaste"
function anunciarGanador() {
    $("#resultado").text("GANASTE!!!!!!!!!!");
    $("#resultado").removeClass("text-danger");
    $("#resultado").addClass("text-success");
}

//ANIMACIÓN INICIO
setTimeout(function() {
        $('.inner div').addClass('done');

        setTimeout(function() {
                $('.inner div').addClass('page');

                setTimeout(function() {
                        $('.pageLoad').addClass('off');

                        $('body, html').addClass('on');

                    }, 500) //Agrega fondo plano y oculta el juego
            }, 500) //Agrega los circulos y los cambia de tamaño
    }, 1500) //Finaliza animacion inicial