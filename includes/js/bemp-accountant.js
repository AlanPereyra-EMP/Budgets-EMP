// Define the app steps functions
bempSteps = [
  bempGetAfip,
  bempGetBussiness,
  bempGetEmployers,
  bempGetAge,
  bempGetUbication,
  bempSendResult
];

// Define all local variables
var bempAfip = '';
var bempBussiness = '';
var bempEmployers = '';
var bempAge = '';
var bempUbication = '';

function bempGetAfip(){
  bempOptions.classList.remove('d-flex');

  fetch(bempUrl+'/includes/json/accountant/accountant.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.Accountant[0];
      path = path[Object.keys(path)];
      var h1 = '¿Estás inscripto en Afip?';
      bempGetOptions(data, path, h1, true, '', 0);
    });
}
bempGetAfip();

function bempGetBussiness(){
  bempAfip = bC[0]
  bempOptions.classList.remove('d-flex');

  fetch(bempUrl+'/includes/json/accountant/accountant.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.Accountant[1];
      path = path[Object.keys(path)];
      var top = bempAfip;
      var h1 = '¿Tenés un negocio activo?';
      bempGetOptions(data, path, h1, true, top, 1);
    });
}

function bempGetEmployers(){
  bempBussiness = bC[1]
  bempOptions.classList.remove('d-flex');

  fetch(bempUrl+'/includes/json/accountant/accountant.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.Accountant[2];
      path = path[Object.keys(path)];
      var top = bempBussiness;
      var h1 = '¿Tenés empleados?';
      bempGetOptions(data, path, h1, true, top, 2);
    });
}

function bempGetAge(){
  bempEmployers = bC[2];
  bempOptions.classList.add('d-flex');
  bempDisableNextBtn();

  bempH1.innerHTML = '¿Cuándo naciste?';
  bempOptions.innerHTML = '<div id="bemp-number"></div>';
  bempA = document.getElementById('bemp-number');

  var x = document.createElement("input");
  x.setAttribute("id", "bemp-number-input");
  x.setAttribute("type", "number");
  x.setAttribute("min", "1900");
  x.setAttribute("max", "2022");
  bempA.appendChild(x);

  bempA.innerHTML += '<small>Ingresá el año en el que naciste</small>';

  var input = document.getElementById('bemp-number-input');
  input.addEventListener('keyup', bempSelectAge, false);
  input.addEventListener('change', bempSelectAge, false);
}

function bempSelectAge(){
  bC[3] = this.value;
  bempBreadcrumbs.innerHTML = bempAfip+' / '+bempBussiness+' / '+bempEmployers+' / '+bC[3];

  if(bC[3]){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempGetUbication(){
  bempAge = bC[3];
  bempOptions.classList.remove('d-flex');
  bempNextBtn.innerHTML = 'Enviar';

  fetch(bempUrl+'/includes/json/accountant/accountant.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Accountant[3];
      path = path[Object.keys(path)];
      var top = bempAge;
      var h1 = '¿Dónde está ubucado?';
      bempGetOptions(data, path, h1, true, top, 4);
    });
}

function bempSendResult(){
  bempUbication = bC[4];

  var msj = '';
  msj += '*Incripción Afip: '+bempAfip+'*%0A%0A';
  msj += '*Negocio: '+bempBussiness+'*%0A%0A';
  msj += '*Empleados: '+bempEmployers+'*%0A%0A';
  msj += '*Edad: '+bempAge+'*%0A%0A';
  msj += '*Ubicación: '+bempUbication+'*%0A%0A';

  msj = msj.replace(/ /g,'%20');
  bempMsj = bempMsj.replace(/ /g,'%20');
  var url = 'Enviado%20desde:%20'+window.location.href;
  var link = 'https://api.whatsapp.com/send?phone='+bempWsp+'&text='+bempMsj+'%0A%0A'+msj+'%0A%0A'+url;
  window.location.href = link;
}
