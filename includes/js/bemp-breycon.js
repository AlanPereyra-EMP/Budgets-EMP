// Define the app steps functions
bempSteps = [
  bempGetObjetive,
  bempGetKilograms,
  bempGetAge,
  bempSendResult
];

// Define all local variables
var bempObjetive = '';
var bempKilograms = '';
var bempSex = '';
var bempAge = '';
var bempUbication = '';

function bempGetObjetive(){
  bempOptions.classList.remove('d-flex');

  fetch(bempUrl+'/includes/json/breycon/breycon.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.Breycon[0];
      path = path[Object.keys(path)];
      var h1 = '¿Cuál es tu objetivo?';
      bempGetOptions(data, path, h1, true, '', 0);
    });
}
bempGetObjetive();

var boolean = true;
function bempGetKilograms(){
  bempObjetive = bC[0];
  bempOptions.classList.add('d-flex');
  bempDisableNextBtn();

  if(bempObjetive == 'Perder peso'){
    var objetive = 'perder';
  } else if(bempObjetive == 'Aumentar peso'){
    var objetive = 'aumentar';
  } else {
    if(boolean){
      bC[1] = 0;
      bempNextStep();
      boolean = false;
    } else {
      boolean = true;
      bempPrevStep();
    }
  }

  bempH1.innerHTML = '¿Cuantos kilos te gustaría '+objetive+'?';
  bempOptions.innerHTML = '<div id="bemp-age"></div>';
  bempA = document.getElementById('bemp-age');

  var x = document.createElement("input");
  x.setAttribute("id", "bemp-age-input");
  x.setAttribute("type", "number");
  x.setAttribute("placeholder", "Peso en Kg ("+objetive+")");
  x.setAttribute("min", "1");
  x.setAttribute("max", "90");
  bempA.appendChild(x);

  bempA.innerHTML += '<small>Escribí un peso entre '+x.min+' y '+x.max +'</small>';

  var input = document.getElementById('bemp-age-input');
  input.addEventListener('keyup', bempSelectKilograms, false);
  input.addEventListener('change', bempSelectKilograms, false);
}

function bempSelectKilograms(){
  bC[1] = this.value+'Kg';

  bempBreadcrumbs.innerHTML = bempObjetive+' / '+bC[1];

  if((parseInt(this.value) <= parseInt(this.max))&&(parseInt(this.value) >= parseInt(this.min))){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempGetAge(){
  bempKilograms = bC[1];
  bempOptions.classList.add('d-flex');
  bempDisableNextBtn();

  bempH1.innerHTML = '¿Cuándo naciste?';
  bempOptions.innerHTML = '<div id="bemp-age"></div>';
  bempA = document.getElementById('bemp-age');

  var x = document.createElement("input");
  x.setAttribute("id", "bemp-age-input");
  x.setAttribute("type", "date");
  bempA.appendChild(x);

  bempA.innerHTML += '<small>Ingresá tu fecha de nacimiento</small>';

  var input = document.getElementById('bemp-age-input');
  input.addEventListener('keyup', bempSelectAge, false);
  input.addEventListener('change', bempSelectAge, false);
}

function bempSelectAge(){
  bC[1] = this.value;
  bempBreadcrumbs.innerHTML = bempObjetive+' / '+bempKilograms+' / '+bC[1];

  if(bC[1]){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempGetUbication(){
  bempAge = bC[3];
  bempOptions.classList.remove('d-flex');
  bempNextBtn.innerHTML = 'Enviar';

  fetch(bempUrl+'/includes/json/breycon/breycon.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Breycon[0];
      path = path[Object.keys(path)];
      var top = bempAge;
      var h1 = '¿Dónde está ubucado?';
      bempGetOptions(data, path, h1, true, top, 4);
    });
}

function bempSendResult(){
  bempUbication = bC[4];

  var msj = '';
  msj += '*Operación: '+bempOperation+'*%0A%0A';
  msj += '*Titularidad: '+bempOwnership+'*%0A%0A';
  msj += '*Superficie construida: '+bempsquareMeters+'*%0A%0A';
  msj += '*Año: '+bempAge+'*%0A%0A';
  msj += '*Ubicación: '+bempUbication+'*%0A%0A';

  msj = msj.replace(/ /g,'%20');
  bempMsj = bempMsj.replace(/ /g,'%20');
  var url = 'Enviado%20desde:%20'+window.location.href;
  var link = 'https://api.whatsapp.com/send?phone='+bempWsp+'&text='+bempMsj+'%0A%0A'+msj+'%0A%0A'+url;
  window.location.href = link;
}
