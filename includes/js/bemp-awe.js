// Define the app steps functions
bempSteps = [
  bempGetWho,
  bempGetCompany,
  bempGetMedicines,
  bempGetFrequency,
  bempSendResult
];

function bempGetWho(){
  fetch(bempUrl+'/includes/json/awe/awe-client-profile.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.aweClient;
      var h1 = '¿Para quién sería el servicio?';
      bempGetOptions(data, path, h1, true, '', 0);
    });
}
bempGetWho();

function bempGetCompany(){

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

var aweClientData = [];
function bempGetMedicines(){
  for(var i = 0; i < 3; i++){
    aweClientData[i] = bempSelected[i];
  }

  fetch(bempUrl+'/includes/json/awe/awe-medicines.json')
  .then(data => data.json())
  .then(data => {
    bempResetStepsOn();
    var path = data.aweMedicines;
    var h1 = '¿Qué tipo de medicamentos necesita?';
    bempGetOptions(data, path, h1, true, '', 0);
  });
}

function bempGetFrequency(){
  fetch(bempUrl+'/includes/json/awe/awe-medicines.json')
  .then(data => data.json())
  .then(data => {
    bempResetStepsOff();
    var path = data.aweMedicines[bempSelected[0]];
    path = path[Object.keys(path)];
    var top = bempSelected[1];
    var h1 = 'Frecuencia...';
    bempGetOptions(data, path, h1, false, top, 1);
  });
}

var aweMedicineData = [];
function bempSendResult(){
  for(var i = 3; i <= 5; i++){
    aweMedicineData[i] = bempSelected[i-3];
  }
  console.log(aweClientData+aweMedicineData);
}
