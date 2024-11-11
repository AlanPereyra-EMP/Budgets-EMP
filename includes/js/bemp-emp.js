// Define the app steps functions
bempSteps = [
  bempGetSection,
  bempGetSubtype,
  bempSendResult
];

// Define all local variables
var somiSection = '';
var somiAmmount = '';
var somiName = '';
var somiLastName = '';
var somiFrecuency = '';

function bempGetSection(){
  fetch(bempUrl+'/includes/json/emp/emp.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.donaciones;
      var h1 = 'Empralidad Servicios';
      bempGetOptions(data, path, h1, true, '', 0);
      bempOptionsWithEmogi();
    });
}
bempGetSection();

function bempGetSubtype(){
  somiSection = bC[0];

  fetch(bempUrl+'/includes/json/emp/emp.json')
    .then(data => data.json())
    .then(data => {
      var path = data.donaciones[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      var top = bempSelected[1];
      var h1 = 'Empralidad Servicios';
      bempGetOptions(data, path, h1, 'onBreadcrumbs', top, 1);
      bempOptions.classList.remove('d-flex');
    });
}

function bempSendResult() {
  fetch(bempUrl+'/includes/json/emp/emp.json')
    .then(data => data.json())
    .then(data => {
      var path = data.donaciones[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      path = path[bempSelected[2]];
      path = path[Object.keys(path)];
      var top = String(Object.keys(path[0]));
      var finalLink = String(Object.keys(path[0][top][0]));

      bempH1.innerHTML = 'Gracias por responer, serás redirigido al lugar ideal';
      bempOptions.innerHTML = '<div class="text-center">Espera un momento...</div>';

      window.location.href = finalLink;
    });
}
