var EstadoUsuario = 0;


var AGREGAR = 1;
var EDITAR = 2;

var idAuto = "";


$(document).off("pageinit", "**").on("pageinit", "#config", function (event, ui) {
        //alert("pageinit");
        init();
        //alert("init cambiarAutos");
        EstadoUsuario = AGREGAR;

    });




function init(runBeforeShow) {
    //alert("init");
    //Ajustar contenido al Height del dispositivo
    adjustContentHeight();
    adjustContentHeightWithPadding();

    // cargar el gif de loading
    createSpinner("res/lib/jquerymobile/images/ajax-loader.gif");


    // cargar funcionalidad 
    $("#config").one("pagebeforeshow", function (event, ui) {
            //alert("onLoad");
            onLoad();
        });



}

// screen onload

function onLoad() {
    deviceEvents();
    elementsEvents();
}



// device events

function deviceEvents() {
    document.addEventListener("deviceready", function () {
            dbShell = window.openDatabase("AfirmeDB3", 3, "AfirmeDB", 1000000);
            cargarBD();
        });
}

//BASE DE DATOS
var Usuario = "";
var numeroCelular = "";


function GetData() {

    Usuario = $("#dispositivo").val();
    numeroCelular = $("#telDispositivo").val();



    //alert("Nombre: " + Usuario + "  numero: " + numeroCelular  );




    if (typeof dbShell != "undefined") {

        if (EstadoUsuario == AGREGAR) {
            dbShell.transaction(tabla, dbErrorHandler, onInsert);
        } else if (EstadoUsuario == EDITAR) {
            dbShell.transaction(updateTable, dbErrorHandler, onUpdate);
        }
    } else {
        alert("dbShell is undefined");
    }




}

//I just create our initial table - all one of em

function tabla(tx) {
    //alert("DB: Setup Table");
    tx.executeSql('INSERT INTO user (Name, Numero) VALUES ("' + Usuario + '","' + numeroCelular + '")');
}

function dbErrorHandler(err) {
    alert("DB Error: " + err.message + "\nCode=" + err.code);
}

function cargarBD() {

    if (typeof dbShell != "undefined")
        dbShell.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Numero TEXT NOT NULL)");
                tx.executeSql("SELECT * FROM user", [], render, dbErrorHandler);
            }, dbErrorHandler);
    else
        alert("dbshell is undefined");
}


function render(tx, result) {

    if (result.rows.length > 0) {
        var temp = result.rows.item(0);
        EstadoUsuario = EDITAR;


        $("#dispositivo").val(temp["Name"]);
        $("#telDispositivo").val(temp["Numero"]);

        $('#BtnBack').on("click", function (event) {

                var viene_de = localStorage.getItem("vieneDe");
                if (viene_de == "casa") {
                    window.location = "casa.html";
                } else {
                    window.location = "Principal.html";
                }
            });



    } else {
        EstadoUsuario = AGREGAR;

    }
}

//I handle getting entries from the db

function onInsert() {
    localStorage.setItem("user", Usuario);
    localStorage.setItem("deviceNumber", numeroCelular);

    var viene_de = localStorage.getItem("vieneDe");
    if (viene_de == "casa") {
        window.location = "casa.html";
    } else {
        window.location = "Principal.html";
    }
}

function updateTable(tx) {
    //alert("DB: update Table");

    tx.executeSql('UPDATE user SET Name="' + Usuario + '",Numero="' + numeroCelular + '" WHERE id="1"');
}

function onUpdate() {
    //alert("informacion actualizada");

    localStorage.setItem("user", Usuario);
    localStorage.setItem("deviceNumber", numeroCelular);

    var viene_de = localStorage.getItem("vieneDe");
    if (viene_de == "casa") {
        window.location = "casa.html";
    } else {
        window.location = "Principal.html";
    }


}



// screen elements handler

function elementsEvents() {


    $("a :input,a a,a fieldset label").on("click", function (event) {
            event.stopPropagation();
        });


    //form validation rules
    $("#formularioConfig").validate({
            rules: {
                dispositivo: {
                    required: true,
                },
                telDispositivo: {
                    required: true
                }
            },
            submitHandler: function (form) {

                if (EstadoUsuario == AGREGAR) {
                    insertarUsuario();
                } else if (EstadoUsuario == EDITAR) {
                    editaUsuario();

                }

            }
        });

    var usuario = localStorage.getItem("user");


    //jQuery.fx.off = true;
    //$('#BtnBack').hide();
    //jQuery.fx.off = false;

    $('#btnConfiguraciones').on("click", function (event) {
            $("#formularioConfig").submit();
        });




}

function insertarUsuario() {
    GetData();
}

function editaUsuario() {
    GetData();

}