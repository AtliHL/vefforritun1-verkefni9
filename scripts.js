  
const API_URL = 'https://apis.is/company?name=';
const companies = document;

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
    e.preventDefault();
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
        if(companyInfo.results.length == 0){
          allResults.appendChild(document.createTextNode("Ekkert fyrirtæki fannst fyrir leitarstreng"));
        }
        for (let i = 0; i < companyInfo.results.length; i++) {
          // Bæta við nafni
          var name = document.createElement('dt');
          var nameText = document.createElement('dd');
          var section = document.createElement('dl');
          section.setAttribute('id', 'singleCompany');
          name.appendChild(document.createTextNode("Nafn: "));
          nameText.appendChild(document.createTextNode(companyInfo.results[i].name));
          section.appendChild(name);
          section.appendChild(nameText);
          // Bæta við kennitölu
          var sn = document.createElement('dt');
          var snText = document.createElement('dd');
          sn.appendChild(document.createTextNode("Kennitala: "));
          snText.appendChild(document.createTextNode(companyInfo.results[i].sn));
          section.appendChild(sn);
          section.appendChild(snText);
          // Bæta við heimilisfangi ef fyrirtækið er active
          if(companyInfo.results[i].active == 1){
            var address = document.createElement('dt');
            var addressText = document.createElement('dd');
            address.appendChild(document.createTextNode("Heimilisfang: "));
            addressText.appendChild(document.createTextNode(companyInfo.results[i].address));
            section.appendChild(address);
            section.appendChild(addressText);
            section.style.border = "solid 2px green";
          } 
          // Setja rauðan border ef fyrirtækið er ekki active
          else {
            section.style.border = "solid 2px red";
          }
          allResults.appendChild(section);
          var separator = document.createElement('hr');
          allResults.appendChild(separator);
        }
      } else {
        allResults.appendChild(document.createTextNode("Villa við að sækja gögn"));
      }
    }
    result.send();
  }
  
  function showLoadingGif(){
    var loadImg = document.createElement('img');
    loadImg.setAttribute('class', 'loadingImage');
    loadImg.setAttribute('src', 'loading.gif');
    loadImg.setAttribute('height', '12');
    loadImg.setAttribute('width', '12');
    allResults.appendChild(document.createTextNode("Leita að fyrirtækjum"));
    allResults.appendChild(loadImg);
  }

  function clearChildNodes(){
    while(allResults.hasChildNodes()){
        allResults.removeChild(allResults.lastChild);
    }
  }

  return {
    init, 
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  program.init(companies);
});