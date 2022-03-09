function bempGetUbication(){
  bempAge = bC[3];
  bempOptions.classList.remove('d-flex');
  bempNextBtn.innerHTML = 'Enviar';

  fetch(bempUrl+'/includes/json/realstate/bojko.json')
    .then(data => data.json())
    .then(data => {
      var path = data.Bojko[0];
      path = path[Object.keys(path)];
      var top = bempAge;
      var h1 = '¿Dónde está ubucado?';
      bempGetOptions(data, path, h1, true, top, 4);
    });
}
