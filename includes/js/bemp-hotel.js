// Define the app steps functions
bempSteps = [
  bempGetIn,
  bempGetOut,
  bempGetAdults,
  bempGetChild,
  // bempGetRooms,
  // bempGetType,
  bempSendResult
];

// Define all local variables
var bempIn = '';
var bempOut = '';
var bempAdults = '';
var bempChild = '';
var bempRooms = '';
var bempType = '';

function bempGetIn(){
  fetch(bempUrl+'/includes/json/hotel/hotel.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.Hotel[0];
      path = path[Object.keys(path)];
      var h1 = '¿Que tipo de habitación?';
      bempGetOptions(data, path, h1, true, '', 0, false);
    });
}
bempGetIn();

function bempGetOut(){
  bempIn = bC[0];

  fetch(bempUrl+'/includes/json/hotel/hotel.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Hotel[1];
      path = path[Object.keys(path)];
      var top = bempIn;
      var h1 = '¿Cuántos adultos?';
      bempGetOptions(data, path, h1, true, top, 1);
    });
}

function bempGetAdults(){
  bempOwnership = bC[1];

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

function bempGetChild(){
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
