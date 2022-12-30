// Get global elements
var bempH1 = document.getElementById('bemp-h1');
var bempBreadcrumbs = document.getElementById('bemp-breadcrumbs');
var bempOptions = document.getElementById('bemp-options');
var bempPrevBtn = document.getElementById('bemp-btn-prev');
var bempNextBtn = document.getElementById('bemp-btn-next');
var items = document.getElementsByClassName('bemp-option');
// Global variables
var bempSelected = [];
var bempSteps = [];
var bC = [];

// Increce or reduce de step number
var bempStep = 0;
var bempResetStep = false;
function bempPrevStep(){
  if(bempResetStep){
    bempStep = 0;
    bempResetStep = false;
  }else{
    bempStep--;
  }
  bempActualStep();
}
function bempNextStep(){
  bempEnablePrevBtn();
  bempStep++;
  bempActualStep();
}
function bempResetStepsOn(){
  bempResetStep = true;
}
function bempResetStepsOff(){
  bempResetStep = false;
}

// Execute actual step
function bempActualStep(){
  bempSteps[bempStep]();
}

// Disable prev and next buttons
function bempDisablePrevBtn(){
  var bempPrevBtn = document.getElementById('bemp-btn-prev');
  bempPrevBtn.disabled = true;
  bempPrevBtn.classList.add('bemp-btn-disabled');
}
function bempDisableNextBtn(){
  bempNextBtn.disabled = true;
  bempNextBtn.classList.add('bemp-btn-disabled');
}
bempDisablePrevBtn();
bempDisableNextBtn();

// Enable prev and next buttons
function bempEnablePrevBtn(){
  bempPrevBtn.disabled = false;
  bempPrevBtn.classList.remove('bemp-btn-disabled');
}
function bempEnableNextBtn(){
  var bempNextBtn = document.getElementById('bemp-btn-next');
  bempNextBtn.disabled = false;
  bempNextBtn.classList.remove('bemp-btn-disabled');
}

// Add an option to the item
function bempAddOption(name, select){
  var option = document.createElement('option');
  option.setAttribute('value', name);
  option.innerHTML = name;
  select.appendChild(option);
}

// Create a list with the data that the first function will send
function bempGetOptions(data, path, h1, getTop, top, step, autoNext) {
  bempOptions.innerHTML = '';
  bempDisableNextBtn();
  bempH1.innerHTML = h1;

  var onBreadcrumbs;
  if(getTop === true){
    getTopAndLower();
  }else if (getTop == 'onBreadcrumbs') {
    onBreadcrumbs = true;
    getOnlyLower();
  }else{
    getOnlyLower();
  }

  var textLi;
  function getTopAndLower(){
    tops = path.length;
    for(var i = 0; i < tops; i++){
      var firstLevelLi = document.createElement("li");
      textLi = document.createTextNode(Object.keys(path[i]));
      firstLevelLi.appendChild(textLi);
      bempOptions.appendChild(firstLevelLi);

      var firstLevelUl = document.createElement("ul");
      firstLevelLi.appendChild(firstLevelUl);

      getLower(i, firstLevelUl);
    }
  }

  function getOnlyLower() {
    tops = path.length;
    for(var i = 0; i < tops; i++){
      firstLevelLi = document.createElement("li");
      bempOptions.appendChild(firstLevelLi);

      var firstLevelUl = document.createElement("ul");
      firstLevelLi.appendChild(firstLevelUl);

      getLower(i, firstLevelUl);
    }
  }
  function getLower(i, firstLevelUl){
    var top = String(Object.keys(path[i]));
    var options = path[i][top].length;
    for(var l = 0; l < options; l++){
      console.log(top);
      var secondLevelLi = document.createElement("li");
      secondLevelLi.classList.add('bemp-option');
      secondLevelLi.dataset.top = i;
      secondLevelLi.dataset.item = l;
      textLi = document.createTextNode(Object.keys(path[i][top][l]));
      secondLevelLi.appendChild(textLi);
      firstLevelUl.appendChild(secondLevelLi);
    }
  }

  if(step > 0){
    var aux = '';
    for(var l = 0; l < step; l++){
      aux += bC[l] +' / ';
    }
    bempBreadcrumbs.innerHTML = aux;
  }else{
    bempBreadcrumbs.innerHTML = '(No almacenaremos estos datos en nuestros servidores)';
  }

  var lastSelected;
  var element = [];
  for (var i = 0; i < items.length; i++) {

    items[i].addEventListener('click', function(){
      console.log(this.innerHTML);
      if(lastSelected){
        lastSelected.classList.remove('bemp-option-actived');
      }
      this.classList.add('bemp-option-actived');

      if(step > 0){
        if(onBreadcrumbs){
          bempBreadcrumbs.innerHTML= String(Object.keys(path[parseInt(this.dataset.top)]));
          bempBreadcrumbs.classList.add('onBreadcrumbs');
          bempSelected[step+1] = parseInt(this.dataset.top),parseInt(this.dataset.item);
        }else {
          var aux = '';
          for(var j = 0; j < step; j++){
            aux += bC[j] +' / ';
          }
          bempBreadcrumbs.innerHTML= aux+this.innerHTML;
          bempSelected[step+1] = parseInt(this.dataset.item);
        }
      }else{
        bempBreadcrumbs.classList.remove('onBreadcrumbs');
        bempBreadcrumbs.innerHTML = this.innerHTML;
        bempSelected = [parseInt(this.dataset.top),parseInt(this.dataset.item)];
      }
      bC[step] = this.innerHTML;
      lastSelected = this;

      // Detect if the child element on json document is "disabled" if it is disable next step with the cliked option
      // console.log(!(step == 0));
      if (step == 0) {
        auxPath = path[bempSelected[step]];
        auxPath = auxPath[Object.keys(auxPath)];

        auxPath = auxPath[bempSelected[1]];
        auxPath = auxPath[Object.keys(auxPath)];
        auxPath = auxPath[bempSelected[1]];
      } else {
        auxPath = path[bempSelected[step+1]];
        auxPath = auxPath[Object.keys(auxPath)];
        auxPath = auxPath[0];
        auxPath = auxPath[Object.keys(auxPath)];
        auxPath = auxPath[0];
      }
      if (auxPath) {
        auxPath = Object.keys(auxPath);
      }

      if (auxPath||!autoNext) {
        bempEnableNextBtn();
      }else {
        bempDisableNextBtn();
      }
    });
  }
}

// Add emogi support on first step
function bempOptionsWithEmogi(){
  var bempOptionsWithEmogi = document.querySelectorAll('#bemp-options li ul li');
  for (var i = 0; i < bempOptionsWithEmogi.length; i++) {
    bempOptionsWithEmogi[i].classList.add('has-emoji');
  }
}


// Add personalized background image
function bempHasPersonalizedBackground() {
  var bempBackground = document.getElementById('bemp-background');
  var bempPage = document.getElementById('bemp-page');

  if (bempBg) {
    bempBackground.style.background = "url("+bempBg+") no-repeat 50% 50%";
    bempPage.classList.add("has-personalized-bg");
  }
}
bempHasPersonalizedBackground();

// Add fade in animation class
window.onload = function(){
  var fempFadeIn = document.getElementById('bemp-div');
  fempFadeIn.classList.add("bemp-faded");
  fempFadeIn.classList.remove("bemp-d-none");
}
