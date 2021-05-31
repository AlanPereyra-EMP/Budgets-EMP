// Put de initial title
var bempH1 = document.getElementById('bemp-h1');
var bempOptions = document.getElementById('bemp-options');
bempH1.innerHTML = '¿De que marca es tu vehículo?';

function bempGetVehicles() {
  fetch(bempUrl+'/includes/json/vehicles.json')
    .then(data => data.json())
    .then(data => {
      types = data.vehiculos.length;
      for(var i = 0; i < types; i++){
        var firstLevelLi = document.createElement("li");
        var textLi = document.createTextNode(Object.keys(data.vehiculos[i]));
        firstLevelLi.appendChild(textLi);
        bempOptions.appendChild(firstLevelLi);

        var firstLevelUl = document.createElement("ul");
        firstLevelLi.appendChild(firstLevelUl);

        var type = String(Object.keys(data.vehiculos[i]));
        brands = data.vehiculos[i][type].length;
        for(var l = 0; l < brands; l++){
          var secondLevelLi = document.createElement("li");
          var textLi = document.createTextNode(Object.keys(data.vehiculos[i][type][l]));
          secondLevelLi.appendChild(textLi);
          firstLevelUl.appendChild(secondLevelLi);
        }
      }
    });
}
bempGetVehicles();
