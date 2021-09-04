// Define the app steps functions
bempSteps = [
  bempGetBrands,
  bempGetModel,
  bempGetTransmition,
  bempGetEngine,
  bempGetType,
  bempGetVersion,
  bempGetKilometers,
  bempGetUbication,
  bempSendResult
];

function bempGetBrands(){
  fetch(bempUrl+'/includes/json/cars/vehicles.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.vehiculos;
      var h1 = '¿De que marca es el vehículo que querés cambiar/vender ?';
      bempGetOptions(data, path, h1, true, '', 0);
    });
}
bempGetBrands();

function bempGetModel(){
  fetch(bempUrl+'/includes/json/cars/vehicles.json')
    .then(data => data.json())
    .then(data => {
      var path = data.vehiculos[bempSelected[0]];
      path = path[Object.keys(path)];
      var top = bempSelected[1];
      var h1 = '¿De que modelo es tu vehículo?';
      bempGetOptions(data, path, h1, false, top, 1);
    });
}

function bempGetTransmition(){
  fetch(bempUrl+'/includes/json/cars/vehicles.json')
    .then(data => data.json())
    .then(data => {
      var path = data.vehiculos[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      var top = bempSelected[2];
      var h1 = '¿Que tipo de transmisión tiene?';
      bempGetOptions(data, path, h1, false, top, 2);
    });
}

function bempGetEngine(){
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
      var h1 = '¿Que tipo de motorización tiene?';
      bempGetOptions(data, path, h1, false, top, 3);
    });
}

function bempGetType(){
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
      var h1 = '¿Que tipo de vehículo es?';
      bempGetOptions(data, path, h1, false, top, 4);
    });
}

function bempGetVersion(){
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
      var h1 = '¿Que versión del vehículo es?';
      bempOptions.classList.remove('d-flex');
      bempGetOptions(data, path, h1, false, top, 5);
    });
}

function bempGetKilometers(){
  bempDisableNextBtn();
  bempH1.innerHTML = '¿Cuántos kilometros tiene el vehículo?';
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
  bC[6] = this.value.slice(0, this.maxLength);

  bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+bC[3]+' / '+bC[4]+' / '+bC[5]+' / '+bC[6]+' km';

  if(parseInt(this.value) <= parseInt(this.max)){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempGetUbication(){
  bempH1.innerHTML = '¿Dónde está ubicado el vehículo?';
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
      bC[7] = this.value;

      bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+bC[3]+' / '+bC[4]+' / '+bC[5]+' / '+bC[6]+' km / '+bC[7];

      bempEnableNextBtn();
    }else{
      bempDisableNextBtn();
    }
  });
}

function bempSendResult(){
  var msj = '';
  msj += '*Marca: '+bC[0]+'*%0A%0A';
  msj += '*Modelo: '+bC[1]+'*%0A%0A';
  msj += '*Motorización: '+bC[2]+'*%0A%0A';
  msj += '*Transmisión: '+bC[3]+'*%0A%0A';
  msj += '*Tipo: '+bC[4]+'*%0A%0A';
  msj += '*Version: '+bC[5]+'*%0A%0A';
  msj += '*Kilometros: '+bC[6]+'*%0A%0A';
  msj += '*Ubicación: '+bC[7]+'*%0A%0A';

  msj = msj.replace(/ /g,'%20');
  bempMsj = bempMsj.replace(/ /g,'%20');
  var url = 'Enviado desde: '+window.location.href;
  var link = 'https://api.whatsapp.com/send?phone='+bempWsp+'&text='+bempMsj+'%0A%0A'+msj+'%0A%0A'+url;
  window.location.href = link;
}
