// Define the app steps functions
bempSteps = [
  bempGetOperation,
  bempGetOwnership,
  bempGetSquareMeters,
  bempGetAge,
  bempGetUbication,
  bempSendResult
];

// Define all local variables
var bempOperation = '';
var bempOwnership = '';
var bempsquareMeters = '';
var bempAge = '';
var bempUbication = '';

function bempGetOperation(){
  fetch(bempUrl+'/includes/json/realstate/realstate.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.Realstate[0];
      path = path[Object.keys(path)];
      var h1 = '¿Que operación quiere realizar?';
      bempGetOptions(data, path, h1, true, '', 0);
    });
}
bempGetOperation();

function bempGetOwnership(){
  bempOperation = bC[0];

  fetch(bempUrl+'/includes/json/realstate/realstate.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Realstate[1];
      path = path[Object.keys(path)];
      var top = bempOperation;
      var h1 = '¿Quién es el titular?';
      bempGetOptions(data, path, h1, true, top, 1);
    });
}

function bempGetSquareMeters(){
  bempOwnership = bC[1];
  bempOptions.classList.remove('d-flex');

  fetch(bempUrl+'/includes/json/realstate/realstate.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Realstate[2];
      path = path[Object.keys(path)];
      var top = bempOwnership;
      var h1 = '¿Cuántos metros construidos tiene?';
      bempGetOptions(data, path, h1, true, top, 2);
    });
}

function bempGetAge(){
  bempsquareMeters = bC[2];
  fetch(bempUrl+'/includes/json/realstate/realstate.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Realstate[3];
      path = path[Object.keys(path)];
      var top = bempsquareMeters;
      var h1 = '¿Cuántos años de antigüedad tiene?';
      bempGetOptions(data, path, h1, true, top, 3);
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
