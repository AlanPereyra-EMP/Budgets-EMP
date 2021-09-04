// Define the app steps functions
bempSteps = [
  bempWhoIs,
  bempHasCompany,
  bempWhichMedicines,
  bempWhichFrequency,
  bempGetUbication,
  bempSendResult
];

var aweClientData = [];
var aweMedicineData = [];
var whoIs = '';
var hasCompany = '';
var whichMedicines = '';
var whichFrequency = '';
var whatUbication = '';

function bempWhoIs(){
  fetch(bempUrl+'/includes/json/awe/awe-client-profile.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.aweClient;
      var h1 = '¿Quién necesita que compremos sus medicamentos?';
      bempGetOptions(data, path, h1, true, '', 0);
    });
}
bempWhoIs();

function bempHasCompany(){
  whoIs = bC[0];

  fetch(bempUrl+'/includes/json/awe/awe-client-profile.json')
    .then(data => data.json())
    .then(data => {
      var path = data.aweClient[bempSelected[0]];
      path = path[Object.keys(path)];
      var top = bempSelected[1];
      var h1 = '¿Tiene compañía o algún cuidador/a?';
      bempGetOptions(data, path, h1, false, top, 1);
    });
}

function bempWhichMedicines(){
  hasCompany = bC[1];

  for(var i = 0; i < 3; i++){
    aweClientData[i] = bempSelected[i];
  }

  fetch(bempUrl+'/includes/json/awe/awe-client-medicines.json')
  .then(data => data.json())
  .then(data => {
    bempResetStepsOn();
    var path = data.aweMedicines;
    var h1 = '¿Qué tipo de medicamentos necesita?';
    bempGetOptions(data, path, h1, true, '', 0);
  });
}

function bempWhichFrequency(){
  whichMedicines = bC[0];

  fetch(bempUrl+'/includes/json/awe/awe-client-medicines.json')
  .then(data => data.json())
  .then(data => {
    bempResetStepsOff();
    var path = data.aweMedicines[bempSelected[0]];
    path = path[Object.keys(path)];
    var top = bempSelected[1];
    var h1 = '¿Con qué frecuencia consume los medicamentos?';
    bempGetOptions(data, path, h1, false, top, 1);
  });
}

function bempGetUbication(){
  whichFrequency = bC[1];

  bempH1.innerHTML = '¿Dónde vive?';
  bempNextBtn.innerHTML = 'Enviar';
  bempDisableNextBtn();
  bempOptions.innerHTML = '<select id="bemp-select"></select>';
  bempOptions.classList.add('d-flex');

  var select = document.getElementById('bemp-select');

  bempAddOption('Selecciona una opción', select);
  bempAddOption('Jose C. Paz', select);
  bempAddOption('San Miguel', select);
  bempAddOption('Muñiz', select);
  bempAddOption('Bella Vista', select);
  bempAddOption('Malvinas Argentinas', select);
  bempAddOption('Moreno', select);
  bempAddOption('Pilar', select);
  bempAddOption('Otra', select);

  select.addEventListener('change', function(){
    if(this.value != 'Selecciona una opción'){
      whatUbication = this.value;
      bempBreadcrumbs.innerHTML = whoIs+' / '+hasCompany+' / '+whichMedicines+' / '+whichFrequency+' / '+this.value;

      bempEnableNextBtn();
    }else{
      bempDisableNextBtn();
    }
  });
}

function bempSendResult(){
  for(var i = 4; i <= 5; i++){
    aweClientData[i-1] = bempSelected[i-3];
  }

  var msj = '';
  msj += '*'+whoIs+'*';
  msj += ' ('+hasCompany+') %0A%0A';
  msj += 'Los medicamentos son: %0A%0A*'+whichMedicines+'*';
  msj += ' ('+whichFrequency+') %0A%0A';
  msj += 'Ubicado/a en: *'+whatUbication+'*';

  msj = msj.replace(/ /g,'%20');
  bempMsj = bempMsj.replace(/ /g,'%20');
  var url = window.location.href;
  var link = 'https://api.whatsapp.com/send?phone='+bempWsp+'&text='+bempMsj+'%0A%0A'+msj+'%0A%0A'+url;
  console.log(link);
  window.location.href = link;
}
