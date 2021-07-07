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

// Get vehicle.json data and create list with this
function bempGetOptions(data, path, h1, getTop, top, nextStep) {
  bempOptions.innerHTML = '';
  bempDisableNextBtn();
  bempH1.innerHTML = h1;

  if(getTop){
    getTopAndLower();
  } else{
    getOnlyLower();
  }

  function getTopAndLower(){
    tops = path.length;
    for(var i = 0; i < tops; i++){
      var firstLevelLi = document.createElement("li");
      var textLi = document.createTextNode(Object.keys(path[i]));
      firstLevelLi.appendChild(textLi);
      bempOptions.appendChild(firstLevelLi);

      var firstLevelUl = document.createElement("ul");
      firstLevelLi.appendChild(firstLevelUl);

      getLower(i, firstLevelUl);
    }
  }
  function getOnlyLower() {
    firstLevelLi = document.createElement("li");
    var textLi = document.createTextNode(Object.keys(path[top]));
    firstLevelLi.appendChild(textLi);
    bempOptions.appendChild(firstLevelLi);

    var firstLevelUl = document.createElement("ul");
    firstLevelLi.appendChild(firstLevelUl);

    getLower(top, firstLevelUl);
  }
  function getLower(i, firstLevelUl){
    var top = String(Object.keys(path[i]));
    var options = path[i][top].length;
    for(var l = 0; l < options; l++){
      var secondLevelLi = document.createElement("li");
      secondLevelLi.classList.add('bemp-option');
      secondLevelLi.dataset.top = i;
      secondLevelLi.dataset.item = l;
      var textLi = document.createTextNode(Object.keys(path[i][top][l]));
      secondLevelLi.appendChild(textLi);
      firstLevelUl.appendChild(secondLevelLi);
    }
  }
  nextStep();
}

function bempGetBrands(){
  fetch(bempUrl+'/includes/json/vehicles.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.vehiculos;
      var h1 = '¿De que marca es tu vehículo?';
      bempGetOptions(data, path, h1, true, '', bempSelectBrand);
    });
}
bempGetBrands();

var bempSelected = [];
function bempSelectBrand(){
  bempBreadcrumbs.innerHTML = '';
  var items = document.getElementsByClassName('bemp-option');
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', selectBrand, false);
  }

  var lastSelected;
  function selectBrand(){
    if(lastSelected){
      lastSelected.classList.remove('bemp-option-actived');
    }
    lastSelected = this;
    bempEnableNextBtn();
    this.classList.add('bemp-option-actived');
    bempBreadcrumbs.innerHTML = this.innerHTML;
    bC[0] = this.innerHTML;
    bempSelected = [parseInt(this.dataset.top),parseInt(this.dataset.item)];
    console.log(bempSelected);
  }
}
function bempGetModel(){
  fetch(bempUrl+'/includes/json/vehicles.json')
    .then(data => data.json())
    .then(data => {
      var path = data.vehiculos[bempSelected[0]];
      path = path[Object.keys(path)];
      var top = bempSelected[1];
      var h1 = '¿De que modelo es tu vehículo?';
      bempGetOptions(data, path, h1, false, top, bempSelectModel);
    });
}

function bempSelectModel(){
  bempBreadcrumbs.innerHTML = bC[0];

  var items = document.getElementsByClassName('bemp-option');
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', selectedModel, false);
  }

  var lastSelected;
  function selectedModel(){
    if(lastSelected){
      lastSelected.classList.remove('bemp-option-actived');
    }
    this.classList.add('bemp-option-actived');

    bempEnableNextBtn();

    bempBreadcrumbs.innerHTML = bC[0] +' / '+ this.innerHTML;
    bC[1] = this.innerHTML;
    var bempModel = parseInt(this.dataset.item);
    bempSelected[2] = bempModel;
    console.log(bempSelected);

    lastSelected = this;
  }
}

function bempGetTransmition(){
  fetch(bempUrl+'/includes/json/vehicles.json')
    .then(data => data.json())
    .then(data => {
      var path = data.vehiculos[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      var top = bempSelected[2];
      var h1 = '¿Que tipo de transmisión tiene?';
      bempGetOptions(data, path, h1, false, top, bempSelectTransmition);
    });
}

function bempSelectTransmition(){
  bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1];

  var items = document.getElementsByClassName('bemp-option');
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', selectedTransmition, false);
  }

  var lastSelected;
  function selectedTransmition(){
    if(lastSelected){
      lastSelected.classList.remove('bemp-option-actived');
    }
    this.classList.add('bemp-option-actived');

    bempEnableNextBtn();

    bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1] +' / '+ this.innerHTML;
    bC[2] = this.innerHTML;
    var bempTransmition = parseInt(this.dataset.item);
    bempSelected[3] = bempTransmition;
    console.log(bempSelected);

    lastSelected = this;
  }
}

function bempGetEngine(){
  fetch(bempUrl+'/includes/json/vehicles.json')
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
      bempGetOptions(data, path, h1, false, top, bempSelectEngine);
    });
}

function bempSelectEngine(){
  bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2];

  var items = document.getElementsByClassName('bemp-option');
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', selectedEngine, false);
  }

  var lastSelected;
  function selectedEngine(){
    if(lastSelected){
      lastSelected.classList.remove('bemp-option-actived');
    }
    this.classList.add('bemp-option-actived');

    bempEnableNextBtn();

    bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+ this.innerHTML;
    bC[3] = this.innerHTML;
    var bempType = parseInt(this.dataset.item);
    bempSelected[4] = bempType;
    console.log(bempSelected);

    lastSelected = this;
  }
}

function bempGetType(){
  fetch(bempUrl+'/includes/json/vehicles.json')
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
      bempGetOptions(data, path, h1, false, top, bempSelectType);
    });
}

function bempSelectType(){
  bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+bC[3];

  var items = document.getElementsByClassName('bemp-option');
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', selectedType, false);
  }

  var lastSelected;
  function selectedType(){
    if(lastSelected){
      lastSelected.classList.remove('bemp-option-actived');
    }
    this.classList.add('bemp-option-actived');

    bempEnableNextBtn();

    bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+bC[3]+' / '+ this.innerHTML;
    bC[4] = this.innerHTML;
    var bempType = parseInt(this.dataset.item);
    bempSelected[5] = bempType;
    console.log(bempSelected);

    lastSelected = this;
  }
}

function bempGetVersion(){
  fetch(bempUrl+'/includes/json/vehicles.json')
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
      var h1 = '¿Que versión de vehículo es?';
      bempOptions.classList.remove('d-flex');
      bempGetOptions(data, path, h1, false, top, bempSelectVersion);
    });
}

function bempSelectVersion(){
  bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+bC[3]+' / '+bC[4];

  var items = document.getElementsByClassName('bemp-option');
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', selectedVersion, false);
  }

  var lastSelected;
  function selectedVersion(){
    if(lastSelected){
      lastSelected.classList.remove('bemp-option-actived');
    }
    this.classList.add('bemp-option-actived');

    bempEnableNextBtn();

    bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+bC[3]+' / '+bC[4]+' / '+ this.innerHTML;
    bC[5] = this.innerHTML;
    var bempVersion = parseInt(this.dataset.item);
    bempSelected[6] = bempVersion;
    console.log(bempSelected);

    lastSelected = this;
  }
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

  select.addEventListener('change', bempSelectUbication, false);
}

function bempSelectUbication(){
  if(this.value != 'Selecciona una opción'){
    bC[7] = this.value;

    bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+bC[3]+' / '+bC[4]+' / '+bC[5]+' / '+bC[6]+' km'+' / '+bC[7];

    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempSendResult(){
  msj = bempBreadcrumbs.innerHTML;
  msj = msj.replace(/ /g,'%20');
  bempMsj = bempMsj.replace(/ /g,'%20');
  var url = window.location.href;
  var link = 'https://api.whatsapp.com/send?phone='+bempWsp+'&text='+bempMsj+'%0A%0A*'+msj+'*%0A%0A'+url;
  window.location.href = link;
}
