// Define the app steps functions
bempSteps = [
  bempGetAmmount,
  // bempSendResult
];

// Define all local variables
var somiAmmount = '';

function bempGetAmmount(){
  fetch(bempUrl+'/includes/json/somi/somi.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.vehiculos;
      var h1 = '¿Cuál será tu ayuda?';
      bempGetOptions(data, path, h1, true, '', 0);
    });
}
bempGetAmmount();
