// Define the app steps functions
bempSteps = [
  bempGetSex,
  bempGetKilograms,
  bempGetHeight,
  bempGetWeight,
  bempGetMuscle,
  bempGetInjury,
  bempGetBirth,
  bempGetUbication,
  bempSendResult
];

// Define all local variables
var bempSex = '';
var bempKilograms = '';
var bempHeight = '';
var bempWeight = '';
var bempMuscle = '';
var bempInjury = '';
var bempBirth = '';
var bempUbication = '';

function bempGetSex(){
  bempOptions.classList.remove('d-flex');

  fetch(bempUrl+'/includes/json/breycon/breycon.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.Breycon[0];
      path = path[Object.keys(path)];
      var h1 = 'Soy un...';
      bempGetOptions(data, path, h1, true, '', 0);
    });
}
bempGetSex();

function bempGetKilograms(){
  bempSex = bC[0];
  bempOptions.classList.add('d-flex');
  bempDisableNextBtn();

  bempH1.innerHTML = '¿Cuanto pesas?';
  bempOptions.innerHTML = '<div id="bemp-number"></div>';
  bempA = document.getElementById('bemp-number');

  var x = document.createElement("input");
  x.setAttribute("id", "bemp-number-input");
  x.setAttribute("type", "number");
  x.setAttribute("placeholder", "Peso en Kg");
  x.setAttribute("min", "20");
  x.setAttribute("max", "200");
  bempA.appendChild(x);

  bempA.innerHTML += '<small>Escribí un peso entre '+x.min+' y '+x.max +'</small>';

  var input = document.getElementById('bemp-number-input');
  input.addEventListener('keyup', bempSelectKilograms, false);
  input.addEventListener('change', bempSelectKilograms, false);
}

function bempSelectKilograms(){
  bC[1] = this.value+'Kg';

  bempBreadcrumbs.innerHTML = bempSex+' / '+bC[1];

  if((parseInt(this.value) <= parseInt(this.max))&&(parseInt(this.value) >= parseInt(this.min))){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempGetHeight(){
  bempKilograms = bC[1];
  bempOptions.classList.add('d-flex');
  bempDisableNextBtn();

  bempH1.innerHTML = '¿Cuanto medís?';
  bempOptions.innerHTML = '<div id="bemp-number"></div>';
  bempA = document.getElementById('bemp-number');

  var x = document.createElement("input");
  x.setAttribute("id", "bemp-number-input");
  x.setAttribute("type", "number");
  x.setAttribute("placeholder", "Altura en cm");
  x.setAttribute("min", "100");
  x.setAttribute("max", "200");
  bempA.appendChild(x);

  bempA.innerHTML += '<small>Escribí una altura entre '+x.min+' y '+x.max +'</small>';

  var input = document.getElementById('bemp-number-input');
  input.addEventListener('keyup', bempSelectHeight, false);
  input.addEventListener('change', bempSelectHeight, false);
}

function bempSelectHeight(){
  bC[2] = this.value+'cm';
  bempBreadcrumbs.innerHTML = bempSex+' / '+bempKilograms+' / '+bC[2];

  if((parseInt(this.value) <= parseInt(this.max))&&(parseInt(this.value) >= parseInt(this.min))){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempGetWeight(){
  bempHeight = bC[3];
  bempOptions.classList.remove('d-flex');

  fetch(bempUrl+'/includes/json/breycon/breycon.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Breycon[1];
      path = path[Object.keys(path)];
      var h1 = 'Objetivo personal';
      bempGetOptions(data, path, h1, true, '', 3);
    });
}

function bempGetMuscle(){
  bempWeight = bC[4]
  bempOptions.classList.remove('d-flex');

  fetch(bempUrl+'/includes/json/breycon/breycon.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Breycon[2];
      path = path[Object.keys(path)];
      var top = bempWeight;
      var h1 = '¿Cuál es tu prioridad?';
      bempGetOptions(data, path, h1, true, top, 4);
    });
}

function bempGetInjury(){
  bempMuscle = bC[5]
  bempOptions.classList.remove('d-flex');

  fetch(bempUrl+'/includes/json/breycon/breycon.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Breycon[3];
      path = path[Object.keys(path)];
      var top = bempMuscle;
      var h1 = '¿Te lecionaste alguna vez?';
      bempGetOptions(data, path, h1, true, top, 5);
    });
}

function bempGetBirth(){
  bempInjury = bC[6];
  bempOptions.classList.add('d-flex');
  bempDisableNextBtn();

  bempH1.innerHTML = '¿Cuándo naciste?';
  bempOptions.innerHTML = '<div id="bemp-number"></div>';
  bempA = document.getElementById('bemp-number');

  var x = document.createElement("input");
  x.setAttribute("id", "bemp-number-input");
  x.setAttribute("type", "date");
  bempA.appendChild(x);

  bempA.innerHTML += '<small>Ingresá tu fecha de nacimiento</small>';

  var input = document.getElementById('bemp-number-input');
  input.addEventListener('keyup', bempSelectBirth, false);
  input.addEventListener('change', bempSelectBirth, false);
}

function bempSelectBirth(){
  bC[6] = this.value;
  bempBreadcrumbs.innerHTML = bC[0]+' / '+bC[1]+' / '+bC[2]+' / '+bC[3]+' / '+bC[4]+' / '+bC[5]+' / '+bC[6];

  if(bC[6]){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempGetUbication(){
  bempAge = bC[6];
  bempOptions.classList.remove('d-flex');
  bempNextBtn.innerHTML = 'Enviar';

  fetch(bempUrl+'/includes/json/breycon/breycon.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Breycon[4];
      path = path[Object.keys(path)];
      var top = bempAge;
      var h1 = '¿Dónde está ubucado?';
      bempGetOptions(data, path, h1, true, top, 7);
    });
}

function bempSendResult(){
  bempUbication = bC[4];

  var msj = '';
  msj += '*Soy un/a: '+bempSex+'*%0A%0A';
  msj += '*Peso: '+bempKilograms+'*%0A%0A';
  msj += '*Mido: '+bempHeight+'*%0A%0A';
  msj += '*Quiero enfocarme en: '+bempWeight+'*%0A%0A';
  msj += '*Con prioridad en: '+bempMuscle+'*%0A%0A';
  msj += '*Lesiones: '+bempInjury+'*%0A%0A';
  msj += '*Nací el: '+bempBirth+'*%0A%0A';
  msj += '*Ubicación: '+bempUbication+'*%0A%0A';

  msj = msj.replace(/ /g,'%20');
  bempMsj = bempMsj.replace(/ /g,'%20');
  var url = 'Enviado%20desde:%20'+window.location.href;
  var link = 'https://api.whatsapp.com/send?phone='+bempWsp+'&text='+bempMsj+'%0A%0A'+msj+'%0A%0A'+url;
  window.location.href = link;
}
