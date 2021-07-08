// Define the app steps functions
bempSteps = [
  bempGetWho,
  bempGetRelation,
  bempGetCompany,
  bempGetMedicines,
  bempGetFrequency,
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

function bempGetRelation(){

  fetch(bempUrl+'/includes/json/awe/awe-client-profile.json')
    .then(data => data.json())
    .then(data => {
      var path = data.aweClient[bempSelected[0]];
      path = path[Object.keys(path)];
      var top = bempSelected[1];
      var h1 = '¿Qué relación tiene con la otra persona?';
      bempGetOptions(data, path, h1, false, top, 1);
    });
  if(bempSelected[1] == 0){
    bempGetCompany();
    bC[1] = ''
    bempSelected[2] = 0;
    bempStep++;
    return;
  }
}

function bempGetCompany(){
  fetch(bempUrl+'/includes/json/awe/awe-client-profile.json')
    .then(data => data.json())
    .then(data => {
      bempResetStepsOn();
      var path = data.aweClient[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      var top = bempSelected[2];
      var h1 = '¿Tiene compañía o algún cuidador/a?';
      bempGetOptions(data, path, h1, false, top, 2);
    });
}

var bempClientProfile = [];
function bempGetMedicines(){
  for(var i = 0; i <= 3; i++){
    bempClientProfile[i] = bempSelected[i];
  }
  console.log(bempClientProfile);

  fetch(bempUrl+'/includes/json/awe/awe-medicines.json')
  .then(data => data.json())
  .then(data => {
    bempEnablePrevBtn();
    var path = data.aweMedicines;
    var h1 = '¿Qué tipo de medicamentos necesita?';
    bempGetOptions(data, path, h1, true, '', 0);
  });
}

function bempGetFrequency(){
  fetch(bempUrl+'/includes/json/awe/awe-medicines.json')
  .then(data => data.json())
  .then(data => {
    var path = data.aweMedicines[bempSelected[0]];
    path = path[Object.keys(path)];
    var top = bempSelected[1];
    var h1 = '¿Con que frecuencia toma sus medicamentos?';
    bempGetOptions(data, path, h1, false, top, 1);
  });
}
