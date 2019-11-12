  
const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  var allResults;
  var userInput;

  function init(companies) {
    allResults = companies.querySelector('.results');
    var form = companies.querySelector('[method=get]');
    userInput = form.querySelector('input');

    companies.addEventListener('submit', submit);
  }

  function submit(e){
    if(userInput.value.length == 0){
        alert("Lén verður að vera strengur");
        return;
    }
    var companyURL = API_URL + userInput.value;
    var result = new XMLHttpRequest();
    showLoadingGif();
    result.open('GET', companyURL, true);
    result.onload = function(){
        if(result.status >= 200 && result.status < 400){
            var companyInfo = JSON.parse(result.response);
            clearChildNodes();
            addCompanyInfo("Nafn: ", companyInfo.result[0].name);
            addCompanyInfo("Kennitala: ", companyInfo.result[0].sn);
            if(companyInfo.result[0].active == 1){
                addCompanyInfo("Heimilisfang: ", companyInfo.result[0].address);
            }
        }
    };
  }
  
  function showLoadingGif(){
    var loadImg = document.createElement('img');
    loadImg.setAttribute('class', 'loadingImage');
    loadImg.setAttribute('src', 'loading.gif');
    loadImg.setAttribute('height', '12');
    loadImg.setAttribute('width', '12');
    allResults.appendChild(loadImg);
  }

  function clearChildNodes(){
    while(allResults.hasChildNodes()){
        allResults.removeChild(allResults.lastChild);
    }
  }

  function addCompanyInfo(type, info){
      var infoType = document.createElement('dt');
      var infoText = document.createElement('dd');
      var section = document.createElement('dl');

      infoType.appendChild(document.createTextNode(type));
      infoText.appendChild(document.createTextNode(info));
      section.appendChild(infoType);
      section.appendChild(infoText);

      allResults.appendChild(section);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  program.init(companies);
});