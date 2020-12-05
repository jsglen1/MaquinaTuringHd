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
function efectoGrafo(prevState, oldValue, newState, newValue, dir) {
    //console.log("#"+newState + oldValue + newValue);
    $("#q1aa,#q1ba,#q2aa,#q2BB,#q3BB").css({
        "fill": "none"
    });
    $(".nodo").css({
        "fill": "aquamarine",
        "opacity": "0.1"
    });

    $("#" + newState + oldValue + newValue).css({
        "fill": "#0062cc",
        "opacity": "1"
    });
    //$("#g"+prevState).css({"fill":"none"});
    $("#g" + newState).css({
        "fill": "#0062cc",
        "opacity": "0.5"
    });
    if (newState == "q3") {
        $("#q1aa,#q1ba,#q2aa,#q2BB,#q3BB").css({
            "fill": "black"
        });
        $("#" + newState + oldValue + newValue).css({
            "fill": "#0062cc"
        });
    }
}
//End Función del grafo

var estado = "q1" //global type
var cadena = "a"; //global type
var velocidad = 2000;

function load() { // carga cadena
    cadena = document.getElementById("fcadena").value;
    cadena = cadena.split("");
    console.log("cadena " + cadena)

    vel = document.getElementById("fvelo").value;
    $("#btnPlay").prop("disabled", false);
}

validaVelo = /[0-9]/;

function play() { // ejecuta toda la logica del automata
    var index = 0; // variable left y right, viene siendo mi i

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

        /*graficando la cinta*/

        var px = (Math.round(((14 - cadena.length) / 2)) + 1) * (60); // para graficar cinta es decir el origen 
        // var id = px+""; // letra del id 
        var pxINicial = px;
        console.log(px);
        console.log("en teoria deberia sumar 2 cademas " + (px + "") + 50); // yes funciona test

        for (var i = 0; i < cadena.length; i++) {
            document.getElementById(((px + (i * 60)) + "")).innerHTML = (cadena[i] + "");
            px = pxINicial;
        }

        /*end graficando la cinta*/

        velocidad = vel * 1000;

        anterior = cadena[index];

        var dale = function () {

            switch (estado) {
                case 'q1':
                    if (cadena[index] == 'a') { // lee a
                        cadena[index] = 'a'; // pone a
                        document.getElementById(((px + (index * 60)) + "")).innerHTML = (cadena[index] + "");
                        document.getElementById(((px + ((index-1) * 60)) + "")).style = "fill:red;"
                        document.getElementById(((px + (index * 60)) + "")).style = "fill:green;"
                        index++; // derecha
                        console.log("estado q1 lee a pone a y derecha");
                    } else if (cadena[index] == 'b') { // lee b
                        cadena[index] = 'a'; //pone a 
                        document.getElementById(((px + (index * 60)) + "")).innerHTML = (cadena[index] + "");
                        document.getElementById(((px + ((index-1) * 60)) + "")).style = "fill:red;"
                        document.getElementById(((px + (index * 60)) + "")).style = "fill:green;"
                        index++; // derecha
                        console.log("estado q1 lee b pone a y derecha");
                    } else { // lee # blanco
                        document.getElementById(((px + ((index-1) * 60)) + "")).style = "fill:red;"
                        index--; //izquierda
                        estado = "q2"; //cambia a q2
                        console.log("estado q1 lee vacio pone a y izquierda");
                    }

                    efectoGrafo("q1", anterior, estado, cadena[index], i);
                    console.log("1f" + "cadena[" + index + "] = " + cadena[index - 1]);
                    break;
                case 'q2':
                    console.log(cadena);
                    if (cadena[index] == 'a') { // lee a
                        cadena[index] = 'a'; // pone a  
                        document.getElementById(((px + ((index+1) * 60)) + "")).style = "fill:red;"        
                        document.getElementById(((px + (index * 60)) + "")).innerHTML = (cadena[index] + "") ;
                        document.getElementById(((px + (index * 60)) + "")).style = "fill:green;"
                        index--; // izquierda
                        console.log("estado q2 lee a pone a y izquierda");
                    } else { // lee # blanco
                        document.getElementById(((px + ((index+1) * 60)) + "")).style = "fill:red;"
                    //    document.getElementById(((px + (index * 60)) + "")).style = "fill:green;"
                        index++;
                        estado = "q3";
                        console.log("estado q3 lee vacio pone a y derecha inicio");
                    }

                
                    efectoGrafo("q2", anterior, estado, cadena[index], i);
                    console.log("2f");
                    break;
                default:
                    VerAlertNice("DATOS NO validos", "error");
            }

            if (estado == "q3") {    
                clearInterval(intervalo);
                document.getElementById(((px + (index * 60)) + "")).style = "fill:green;"
            }
            anterior = cadena[index - 1];

            px = pxINicial; // reinicia para graficar bien

        };

        var intervalo = setInterval(dale, velocidad);

        efectoGrafo("q2", cadena[index], estado, cadena[index], i);

        

    }
    VerAlertNice("Correcto", "success");
}