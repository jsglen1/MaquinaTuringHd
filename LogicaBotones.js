$("#btnPlay").prop("disabled", true);
$("#btnPause").prop("disabled", true);
$("#btnStep").prop("disabled", true);
$("#btnStop").prop("disabled", true);

function VerAlertNice(resultado, incono) {
    Swal.fire({
        icon: incono,
        text: resultado,
    })
}

//Función del grafo
function efectoGrafo(prevState, oldValue, newState, newValue, dir){
    //console.log("#"+newState + oldValue + newValue);
    $("#q1aa,#q1ba,#q2aa,#q2BB,#q3BB").css({"fill":"none"});
    $(".nodo").css({"fill":"aquamarine","opacity":"0.1"});
  
    $("#"+newState + oldValue + newValue).css({"fill":"#0062cc","opacity": "1"});
    //$("#g"+prevState).css({"fill":"none"});
    $("#g"+newState).css({"fill":"#0062cc","opacity": "0.5"});
    if(newState == "q3"){
      $("#q1aa,#q1ba,#q2aa,#q2BB,#q3BB").css({"fill":"black"});
      $("#"+newState + oldValue + newValue).css({"fill":"#0062cc"});
    }
}
//End Función del grafo

var estado = "q1" //global type
var cadena = "a"; //global type
var velocidad = 2000;

function load() { // carga cadena
    cadena = document.getElementById("fcadena").value;
    cadena = cadena.split("");

    vel = document.getElementById("fvelo").value;
    $("#btnPlay").prop("disabled", false);
}

validaVelo = /[0-9]/; 

function play() { // ejecuta toda la logica del automata
    var index = 0; // variable left y right

    var funciona = true;
    for (var i = 0; i < cadena.length; i++) {
        if (cadena[i] != 'a') {
            if (cadena[i] != 'b') {
                i = cadena.length;
                funciona = false;
            }
        }
    }

    if (!funciona || !validaVelo.test(vel)) {
        VerAlertNice("Error al Ingresar Los Datos", "error");
        $("#btnPlay").prop("disabled", true);
    } else {

        velocidad = vel*1000;

    /*    crearCeldas(); 
        llenarceldas(); */

     /*   while (estado != "q3") { */

        
             var dale = function(){
                anterior = cadena[index];
            switch (estado) {
                case 'q1':
                    if (cadena[index] == 'a') { // lee a
                        cadena[index] = 'a'; // pone a
                        index++; // derecha
                        console.log("1.1");
                    } else if (cadena[index] == 'b') { // lee b
                        cadena[index] = 'b'; //pone b 
                        index++; // derecha
                        console.log("1.2");
                    } else { // lee # blanco
                        index--; //izquierda
                        estado = "q2"; //cambia a q2
                        console.log("1.3");
                    }
                    efectoGrafo("q1", anterior, estado, cadena[index], i);
                    console.log("1f");
                    break;
                case 'q2':
                    if (cadena[index] == 'a') { // lee a
                        cadena[index] = 'a'; // pone a
                        index--; // izquierda
                        console.log("2.1");
                    } else { // lee # blanco
                        index++;
                        estado = "q3";
                        console.log("2.2");
                    }
                    efectoGrafo("q2", anterior, estado, cadena[index], i);
                    console.log("2f");
                    break;
                default:
                    VerAlertNice("DATOS NO validos", "error");
            }

            if(estado=="q3"){
                clearInterval(intervalo);
            }

            } ;

            efectoGrafo("q2", cadena[index], estado, cadena[index], i);
            

            var intervalo = setInterval(dale,velocidad);

            
            
       /* } */
        
    }
    VerAlertNice("Correcto", "success");
}


//animacion de la barra azul no me funciono como queria ;C

/*
function crearCeldas() {
    var size = cadena.length;
    cinta = document.getElementById("slip");
    var k = 0,
        num = -5,
        adds = 0;
    if (size > 10) {
        adds = (size - 10);
    }
    while (k < (15 + adds)) {
        var elemento = document.createElement("div");
        elemento.className = "items";
        elemento.id = "cinta" + num;
        document.getElementById("slip").appendChild(elemento);
        k++;
        num++;
    }
}

function llenarceldas() {
    for (var i = 0; i < cadena.length; i++) {
        document.getElementById("cinta" + (i + 1)).innerHTML = "<h3 id='letra" + (i + 1) + "'>" + cadena[i] + "</h3>";
    }
}

function newslider() {
    loadcinta(function () {
        crearCeldas(cadena.length);
        $("#slip").addClass("newSlider");
        loadNewSlider();
    });

    

    //end animacion de la barra azul ;/

}
*/