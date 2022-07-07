// Define the app steps functions
bempSteps = [
  bempGetCurrency,
  bempGetAmmount,
  bempGetName,
  // bempGetLastName,
  // bempSendResult
];

// Define all local variables
var somiCurrency = '';
var somiAmmount = '';
var somiName = '';
var somiLastName = '';

function bempGetCurrency(){
  fetch(bempUrl+'/includes/json/somi/somi.json')
    .then(data => data.json())
    .then(data => {
      bempDisablePrevBtn();
      var path = data.donaciones;
      var h1 = '¿Cuál es tu moneda?';
      bempGetOptions(data, path, h1, true, '', 0);
      bempOptionsWithEmogi();
    });
}
bempGetCurrency();

function bempGetAmmount(){
  somiCurrency = bC[0];

  fetch(bempUrl+'/includes/json/somi/somi.json')
    .then(data => data.json())
    .then(data => {
      var path = data.donaciones[bempSelected[0]];
      path = path[Object.keys(path)];
      path = path[bempSelected[1]];
      path = path[Object.keys(path)];
      var top = bempSelected[1];
      var h1 = '¿Cuál será tu ayuda?';
      bempGetOptions(data, path, h1, true, top, 1);
      bempOptions.classList.remove('d-flex');
    });
}

function bempGetName(){
  somiAmmount = bC[1];

  bempDisableNextBtn();
  bempH1.innerHTML = '¿Cómo es tu nombre completo?';
  bempNextBtn.innerHTML = 'Siguiente';
  bempOptions.classList.add('d-flex');
  bempOptions.innerHTML = '<div id="bemp-data"></div>';
  bempData = document.getElementById('bemp-data');

  var name = document.createElement("input");
  name.setAttribute("id", "bemp-name-input");
  name.setAttribute("type", "text");
  name.setAttribute("placeholder", "Escribí acá tu nombre");
  name.setAttribute("maxLength", "25");
  bempData.appendChild(name);

  var lastName = document.createElement("input");
  lastName.setAttribute("id", "bemp-last-name-input");
  lastName.setAttribute("type", "text");
  lastName.setAttribute("placeholder", "Escribí acá tu apellido");
  lastName.setAttribute("maxLength", "25");
  bempData.appendChild(lastName);

  bempData.innerHTML += '<small>Este es un formulario seguro con protección SSL</small>';

  var input = document.getElementById('bemp-name-input');
  input.addEventListener('keyup', bempSelectName, false);
  input.addEventListener('change', bempSelectName, false);

  var input = document.getElementById('bemp-last-name-input');
  input.addEventListener('keyup', bempSelectLastName, false);
  input.addEventListener('change', bempSelectLastName, false);
}

function bempSelectName(){
  somiName = this.value;

  bempBreadcrumbs.innerHTML = somiCurrency+' / '+ somiAmmount +' / '+ somiName+' '+ somiLastName;

  if(this.value){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempSelectLastName(){
  somiLastName = this.value;

  bempBreadcrumbs.innerHTML = somiCurrency+' / '+ somiAmmount +' / '+ somiName+' '+ somiLastName;

  if(this.value){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}
