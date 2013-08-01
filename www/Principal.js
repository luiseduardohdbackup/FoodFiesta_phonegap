var carro = "";
var poliza = "";
var inciso = "";
var aseguradoAuto = "";
var device = "";
var nombre = "";




$(document).one("pageinit", "#principal", function (event, ui) {
        //alert("init principal");
        init();

        carro = localStorage.getItem("auto");
        poliza = localStorage.getItem("poliza");
        inciso = localStorage.getItem("inciso");
        aseguradoAuto = localStorage.getItem("aseguradoAuto");
        device = localStorage.getItem("deviceNumber");
        nombre = localStorage.getItem("user");

        if (
            (carro === undefined) ||
            (carro == null) ||
            (carro == "undefined")) {
            $("#superiorTitle p").text("------");
        } else {
            $("#superiorTitle p").text(carro);
        }


    });

function checkConnection() {


    var networkState = navigator.connection.type;



    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';


    //alert("conexion :" + networkState);
    if (networkState == "wifi" || networkState == "4g" || networkState == "3g") {
        return true;
    }

    return false;
}



function init(runBeforeShow) {
    //Ajustar contenido al Height del dispositivo
    adjustContentHeight();
    adjustContentHeightWithPadding();

    // cargar el gif de loading
    createSpinner("res/lib/jquerymobile/images/ajax-loader.gif");


    // cargar funcionalidad 

    $("#principal").one("pagebeforeshow", function (event, ui) {

            onLoad();
        });


}

// screen onload

function onLoad() {
    deviceEvents();
    elementsEvents();
    //revisarInternet();
    //revisarGPS();
}

function revisarGPS() {
    localStorage.setItem("EstatusInternet", "NoDetectado");
    navigator.geolocation.getCurrentPosition(function () {
            localStorage.setItem("EstatusGPS", "Detectado");
        }, function (error) {
            localStorage.setItem("EstatusInternet", "NoDetectado");

            switch (error.code) {
            case error.PERMISSION_DENIED:
                //x.innerHTML="User denied the request for Geolocation."
                alert("Favor de activar su GPS");
                break;
                // case error.POSITION_UNAVAILABLE:
                //   x.innerHTML="Location information is unavailable."
                //   break;
                //  case error.TIMEOUT:
                //   x.innerHTML="The request to get user location timed out."
                //   break;
                // case error.UNKNOWN_ERROR:
                //   x.innerHTML="An unknown error occurred."
                //   break;
            }
        }, {
            enableHighAccuracy: true,
            //timeout: 20000
            timeout: 0
        });
}

function revisarInternet() {
    localStorage.setItem("EstatusInternet", "NoDetectado");
    // $.ajax({
    // 	type : "GET",
    // 	url : "http://www.google.com",
    // 	dataType:"test/html",
    // 	timeout:4000
    // }).done(function(data) {
    // 	alert("Si hay internet");
    // 	localStorage.setItem("EstatusInternet", "Detectado");
    // }).fail(function(jqXHR, textStatus, errorThrown) {
    // 	alert("No hay internet");
    // 	localStorage.setItem("EstatusInternet", "NoDetectado");
    // }); 
    $.get('http://www.google.com', function (data) {
            //alert("Internet detectado")
            localStorage.setItem("EstatusInternet", "Detectado");
        });
}


// device events

function deviceEvents() {
    document.addEventListener("deviceready", function () {
            //First, open our db  	       
            dbShell = window.openDatabase("AfirmeDB3", 3, "AfirmeDB", 1000000);

            //if (checkConnection()) {
            //	localStorage.setItem("EstatusInternet", "Detectado");
            //} else {
            //	localStorage.setItem("EstatusInternet", "NoDetectado");
            //}
            getEntries();

        });
}

//I handle getting entries from the db

function getEntries() {

    //	alert("getEntries");
    dbShell.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS autos (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Poliza TEXT NOT NULL, Inciso TEXT NOT NULL, Asegurado TEXT NOT NULL)");
            tx.executeSql("SELECT * FROM autos", [], renderEntries, dbErrorHandler);
        }, dbErrorHandler);
}

function renderEntries(tx, result) {

    if (result.rows.length > 0) {
        $('#botonazo').on("click", function (event) {
                window.location = "choque.html";
            });

        $('#BtnAsistencias').on("click", function (event) {
                window.location = "asistencia.html";
            });

    } else {
        //localStorage.removeItem("casa");
        //casa = null;

        $("#superiorTitle p").text("--------");
        localStorage.removeItem("auto");


        $('#botonazo').on("click", function (event) {
                alert("Favor de agregar un automovil"); // O que envíe a agregar automovil.
            });
    }

    $('#superiorEditarCasa').show();
    $("#formularioCasas").hide();
}

// screen elements handler

function elementsEvents() {


    $("a :input,a a,a fieldset label").on("click", function (event) {
            event.stopPropagation();
        });

    // else{

    // 	$('#botonazo').on("click", function(event) {
    // 	window.location = "choque.html";
    // 	});

    // 	$('#BtnAsistencias').on("click", function(event) {
    // 		window.location = "asistencia.html";
    // 	});

    // }

    $('#botonazo').on("click", function (event) {
            carro = localStorage.getItem("auto");
            if (
                (carro === undefined) ||
                (carro == null) ||
                (carro == "undefined")) {
                alert("Favor de seleccionar un auto");
            } else {
                window.location = "choque.html";
            }
        });

    $('#BtnAsistencias').on("click", function (event) {
            carro = localStorage.getItem("auto");
            if (
                (carro === undefined) ||
                (carro == null) ||
                (carro == "undefined")) {
                alert("Favor de seleccionar un auto");
            } else {
                window.location = "asistencia.html";
            }
        });



    $('#BtnAjustes').on("click", function (event) {
            localStorage.setItem("vieneDe", "Principal");
            window.location = "config.html";
        });

    $('#BtnSiniestroCasa').on("click", function (event) {

            window.location = "casa.html";
        });

    $('#BtnMisAutos').on("click", function (event) {

            window.location = "cambiar_autos.html";
        });

    $('#BtnNvaPoliza').on("click", function (event) {
            //alert("nueva poliza");
            try {
                //window.location.assign("sms:8112458031?body="+poliza + "," + inciso + "," + deviceNumber + "," + "latitud" + "," + "longitud" + "," + tipoSiniestro);
                window.location.assign("sms:8112458031?body=DeseoAdquirirNuevaPoliza");
            } catch (error) {
                if (error.description) {
                    alert("Error detectado: " + error.description)
                } else {
                    alert("Error detectado: " + error)
                }
            }
        });

    $('#BtnListaTalleres').on("click", function (event) {
            alert("No hay talleres cargados");
        });

}