'use strict';
function getPersonas() {
    var nom = $("#txtNombre").val();
    $("#resultado").empty();
    var uri = _spPageContextInfo.webAbsoluteUrl +
        "/_api/lists/getByTitle('Trabajador')/items?$filter=nombre eq '" +
        nom + "'";
    $.ajax({
        type: "GET",
        url: uri,
        contentType: "application/json",
        headers: {
            "accept":"application/json;odata=verbose"
        },
        success: onGetResults,
        error: onError
    });
}
function onError(r) {
    alert(r.status);
}
function onGetResults(data) {
    var odata = data.d.results;
    var res = "<table><thead><th>Nombre</th><th>Apellidos</th>" +
        "<th>Edad</th><th>Salario</th><th>Alta</th></thead>";
    $.each(odata, function(i, item) {
        res += "<tr>";
        res += "<td>" + item.nombre + "</td>";
        res += "<td>" + item.apellidos + "</td>";
        res += "<td>" + item.edad + "</td>";
        res += "<td>" + item.salario + "</td>";
        res += "<td>" + item.alta + "</td>";
        res += "</tr>";
    });
    res += "</table>";
    $("#resultado").html(res);

}

$(document).ready(function() {
    $("#btnOk").click(getPersonas);
});