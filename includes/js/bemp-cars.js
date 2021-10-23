// Define the app steps functions
bempSteps = [
  bempGetYear,
  bempGetBrands,
  bempGetModel,
  bempGetEngine,
  bempGetTransmition,
  bempGetType,
  bempGetVersion,
  bempGetKilometers,
  bempGetUbication,
  bempSendResult
];

// Define all local variables
var carYear = '';
var carBrand = '';
var carModel = '';
var carEngine = '';
var carTransmition = '';
var carType = '';
var carVersion = '';
var carKilometers = '';
var carUbication = '';

function bempGetYear(){
  fetch(bempUrl+'/includes/json/cars/vehicles.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.vehiculos;
      var h1 = '¿De qué año es el vehículo?';
      bempGetOptions(data, path, h1, true, '', 0);
    });
}
bempGetYear();

function bempGetBrands(){
  carYear = bC[0];

  fetch(bempUrl+'/includes/json/cars/vehicles.json')
    .then(data => data.json())
    .then(data => {
      var path = data.vehiculos[bempSelected[0]];
      path = path[Object.keys(path)];
      var top = bempSelected[1];
      var h1 = '¿De qué marca es?';
      bempGetOptions(data, path, h1, false, top, 1);
    });
}

function bempGetModel(){
  carBrand = bC[1];

  fetch(bempUrl+'/includes/json/cars/vehicles.json')
    .then(data => data.json())
    .then(data => {
      var path = data.vehiculos[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      var top = bempSelected[2];
      var h1 = '¿Cuál es el modelo?';
      bempGetOptions(data, path, h1, false, top, 2);
    });
}

function bempGetEngine(){
  carModel = bC[2];

  fetch(bempUrl+'/includes/json/cars/vehicles.json')
    .then(data => data.json())
    .then(data => {
      var path = data.vehiculos[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      path = path[bempSelected[2]];
      path = path[Object.keys(path)];
      var top = bempSelected[3];
      var h1 = '¿Qué tipo de motor tiene?';
      bempGetOptions(data, path, h1, false, top, 3);
    });
}

function bempGetTransmition(){
  carEngine = bC[3];

  fetch(bempUrl+'/includes/json/cars/vehicles.json')
    .then(data => data.json())
    .then(data => {
      var path = data.vehiculos[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      path = path[bempSelected[2]];
      path = path[Object.keys(path)];
      path = path[bempSelected[3]];
      path = path[Object.keys(path)];
      var top = bempSelected[4];
      var h1 = '¿Que transmisión tiene?';
      bempGetOptions(data, path, h1, false, top, 4);
    });
}

function bempGetType(){
  carTransmition = bC[4];

  fetch(bempUrl+'/includes/json/cars/vehicles.json')
    .then(data => data.json())
    .then(data => {
      var path = data.vehiculos[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      path = path[bempSelected[2]];
      path = path[Object.keys(path)];
      path = path[bempSelected[3]];
      path = path[Object.keys(path)];
      path = path[bempSelected[4]];
      path = path[Object.keys(path)];
      var top = bempSelected[5];
      var h1 = '¿Cuántas puertas tiene?';
      bempGetOptions(data, path, h1, false, top, 5);
    });
}

function bempGetVersion(){
  carType = bC[5];

  fetch(bempUrl+'/includes/json/cars/vehicles.json')
    .then(data => data.json())
    .then(data => {
      var path = data.vehiculos[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      path = path[bempSelected[2]];
      path = path[Object.keys(path)];
      path = path[bempSelected[3]];
      path = path[Object.keys(path)];
      path = path[bempSelected[4]];
      path = path[Object.keys(path)];
      path = path[bempSelected[5]];
      path = path[Object.keys(path)];
      var top = bempSelected[6];
      var h1 = '¿Qué versión del vehículo es?';
      bempOptions.classList.remove('d-flex');
      bempGetOptions(data, path, h1, false, top, 6);
    });
}

function bempGetKilometers(){
  carVersion = bC[6];

  bempDisableNextBtn();
  bempH1.innerHTML = '¿Cuántos kilometros tiene?';
  bempNextBtn.innerHTML = 'Siguiente';
  bempOptions.classList.add('d-flex');
  bempOptions.innerHTML = '<div id="bemp-km"></div>';
  bempKm = document.getElementById('bemp-km');

  var x = document.createElement("input");
  x.setAttribute("id", "bemp-km-input");
  x.setAttribute("type", "number");
  x.setAttribute("placeholder", "Escribí acá los kilometros");
  x.setAttribute("min", "0");
  x.setAttribute("max", bempMaxKm);
  x.setAttribute("maxLength", bempMaxKm.length);
  bempKm.appendChild(x);

  bempKm.innerHTML += '<small>Tomamos vehículos de máximo '+ x.max +'km</small>';

  var input = document.getElementById('bemp-km-input');
  input.addEventListener('keyup', bempSelectKilometers, false);
  input.addEventListener('change', bempSelectKilometers, false);
}

function bempSelectKilometers(){
  bC[7] = this.value.slice(0, this.maxLength);

  bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+bC[3]+' / '+bC[4]+' / '+bC[5]+' / '+bC[6]+' km';

  if(parseInt(this.value) <= parseInt(this.max)){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempGetUbication(){
  carKilometers = bC[7];

  bempH1.innerHTML = '¿Dónde está ubicado?';
  bempNextBtn.innerHTML = 'Enviar';
  bempDisableNextBtn();
  bempOptions.innerHTML = '<select id="bemp-select"></select>'

  var select = document.getElementById('bemp-select');

  bempAddOption('Selecciona una opción', select);
  bempAddOption('Capital Federal', select);
  bempAddOption('Bs. As. Zona Norte', select);
  bempAddOption('Bs. As. Zona Oeste', select);
  bempAddOption('Bs. As. Zona Sur', select);
  bempAddOption('La Plata', select);
  bempAddOption('Otra', select);

  select.addEventListener('change', function(){
    if(this.value != 'Selecciona una opción'){
      bC[8] = this.value;

      bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+bC[3]+' / '+bC[4]+' / '+bC[5]+' / '+bC[6]+' km / '+bC[7];

      bempEnableNextBtn();
    }else{
      bempDisableNextBtn();
    }
  });
}

function bempSendResult(){
  carUbication = bC[8];

  var msj = '';
  msj += '*Año: '+carYear+'*%0A%0A';
  msj += '*Marca: '+carBrand+'*%0A%0A';
  msj += '*Modelo: '+carModel+'*%0A%0A';
  msj += '*Motorización: '+carEngine+'*%0A%0A';
  msj += '*Transmisión: '+carTransmition+'*%0A%0A';
  msj += '*Tipo: '+carType+'*%0A%0A';
  msj += '*Version: '+carVersion+'*%0A%0A';
  msj += '*Kilometros: '+carKilometers+'*%0A%0A';
  msj += '*Ubicación: '+carUbication+'*%0A%0A';

  msj = msj.replace(/ /g,'%20');
  bempMsj = bempMsj.replace(/ /g,'%20');
  var url = 'Enviado%20desde:%20'+window.location.href;
  var link = 'https://api.whatsapp.com/send?phone='+bempWsp+'&text='+bempMsj+'%0A%0A'+msj+'%0A%0A'+url;
  window.location.href = link;
}
