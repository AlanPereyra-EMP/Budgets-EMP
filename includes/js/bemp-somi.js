// Define the app steps functions
bempSteps = [
  bempGetCurrency,
  bempGetAmmount,
  bempGetName,
  // bempSendResult
];

// Define all local variables
var somiCurrency = '';
var somiAmmount = '';
var somiName = '';

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
      var top = bempSelected[1];
      var h1 = '¿Cuál será tu ayuda?';
      bempGetOptions(data, path, h1, false, top, 1);
      bempOptions.classList.remove('d-flex');
    });
}

function bempGetName(){
  somiAmmount = bC[1];

  bempDisableNextBtn();
  bempH1.innerHTML = '¿Cuál es tu nombre?';
  bempNextBtn.innerHTML = 'Siguiente';
  bempOptions.classList.add('d-flex');
  bempOptions.innerHTML = '<div id="bemp-data"></div>';
  bempKm = document.getElementById('bemp-data');

  var name = document.createElement("input");
  name.setAttribute("id", "bemp-data-input");
  name.setAttribute("type", "text");
  name.setAttribute("placeholder", "Escribí acá tu nombre");
  name.setAttribute("maxLength", "1");
  bempKm.appendChild(name);

  bempKm.innerHTML += '<small>Este es un formulario seguro con protección SSL</small>';

  var input = document.getElementById('bemp-data-input');
  input.addEventListener('keyup', bempSelectName, false);
  input.addEventListener('change', bempSelectName, false);
}

function bempSelectName(){
  somiName = this.value;

  bempBreadcrumbs.innerHTML = somiCurrency+' / '+ somiAmmount +' / '+ somiName;

  if(parseInt(this.value)){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}

function bempGetName(){
  somiAmmount = bC[1];

  bempDisableNextBtn();
  bempH1.innerHTML = '¿Cuál es tu nombre?';
  bempNextBtn.innerHTML = 'Siguiente';
  bempOptions.classList.add('d-flex');
  bempOptions.innerHTML = '<div id="bemp-data"></div>';
  bempKm = document.getElementById('bemp-data');

  var lastName = document.createElement("input");
  lastName.setAttribute("id", "bemp-data-input");
  lastName.setAttribute("type", "text");
  lastName.setAttribute("placeholder", "Escribí acá tu nombre");
  lastName.setAttribute("maxLength", "25");
  bempKm.appendChild(lastName);

  bempKm.innerHTML += '<small>Este es un formulario seguro con protección SSL</small>';

  var input = document.getElementById('bemp-data-input');
  input.addEventListener('keyup', bempSelectlastName, false);
  input.addEventListener('change', bempSelectlastName, false);
}

function bempSelectlastName(){
  somilastName = this.value;

  bempBreadcrumbs.innerHTML = somiCurrency+' / '+ somiAmmount +' / '+ somiName+' / '+ somiName;

  if(parseInt(this.value)){
    bempEnableNextBtn();
  }else{
    bempDisableNextBtn();
  }
}
