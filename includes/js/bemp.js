// Get global elements
var bempH1 = document.getElementById('bemp-h1');
var bempBreadcrumbs = document.getElementById('bemp-breadcrumbs');
var bempOptions = document.getElementById('bemp-options');

// Define global variables
var breadcrumb = [];

// Increce or reduce de step number
var bempSteps = [];
var bempStep = 0;
function bempPrevStep(){
  bempStep--;
  bempActualStep();
}
function bempNextStep(){
  bempEnablePrevBtn();
  bempStep++;
  bempActualStep();
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
  var bempNextBtn = document.getElementById('bemp-btn-next');
  bempNextBtn.disabled = true;
  bempNextBtn.classList.add('bemp-btn-disabled');
}
bempDisablePrevBtn();
bempDisableNextBtn();

// Enable prev and next buttons
function bempEnablePrevBtn(){
  var bempPrevBtn = document.getElementById('bemp-btn-prev');
  bempPrevBtn.disabled = false;
  bempPrevBtn.classList.remove('bemp-btn-disabled');
}
function bempEnableNextBtn(){
  var bempNextBtn = document.getElementById('bemp-btn-next');
  bempNextBtn.disabled = false;
  bempNextBtn.classList.remove('bemp-btn-disabled');
}


// Add fade in animation class
window.onload = function(){
  var fempFadeIn = document.getElementById('bemp-div');
  fempFadeIn.classList.add("bemp-faded");
  fempFadeIn.classList.remove("bemp-d-none");
}
