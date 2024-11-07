function getTemplatePokeCardOneType(id, name, first){
  return `
    <div onclick="openOverlay(${id})" class="poke-card">
        <h1>#${id}&nbsp;${name}</h1>

        <img class="poke-img bg_${first}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${first}" title="${name}">

        <div class="poke-types">
          <img src="./img/icons/types/${first}.svg" alt="${first}" title="${first}">
        </div>
        
      </div> 
  `;
}


function getTemplatePokeCardTwoTypes(id, name, first, second){
  return `
    <div onclick="openOverlay(${id})" class="poke-card">

      <h1>#${id}&nbsp;${name}</h1>
  
      <img class="poke-img bg_${first}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${first}" title="${name}">

      <div class="poke-types">
        <img src="./img/icons/types/${first}.svg" alt="${first}" title="${first}">
        <img id="second_type" class="" src="./img/icons/types/${second}.svg" alt="${second}" title="${second}">
      </div>
        
    </div>
  `;
}


function getTemplateOverlay(id, data, abbArr, evoArr){
  return `
  <div onclick="logDownWBubblingProtection(event)" class="overlay-ctn">
    <div class="overlay-header">
      <img id="back_arrow_header" onclick=openPrevOverlay(${id}) src="./img/icons/arrow_back_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="">
      <h1>#${id}&nbsp;${capitalizeFirstLetter(data.name)}</h1>
      <img id="forward_arrow_header" onclick=openNextOverlay(${id}) src="./img/icons/arrow_forward_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="">
    </div>

    <img class="img-overlay bg_${data.types[0].type.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${data.types[0].type.name}" title="${data.types[0].type.name}">
    
    <div class="button-overlay">
      <button id="btn1" onclick="openTab(1)">Main</button>
      <button id="btn2" onclick="openTab(2)">Stats</button>
      <button id="btn3" onclick="openTab(3)">Evo-Chain</button>
    </div>

    <div id="tab1" class="main-tab">
      <table>
        <tr>
          <td>Height:</td>
          <td>${data.height/10}m</td>
        </tr>
        <tr>
          <td>Weight:</td>
          <td>${data.weight/10}kg</td>
        </tr>
        <tr>
          <td>Base-Experience:</td>
          <td>${data.base_experience}&nbsp;Punkte</td>
        </tr>
        <tr>
          <td>Abilities:</td>
          <td>${abbArr.sort().join(" / ")}</td>
        </tr>
      </table>
    </div>

    <div id="tab2" class="tab-stats" style="display:none;">
      <table>
        <tr>
          <td>HP:</td>
          <td class="progressbar"><div id="progress_bar0">${data.stats[0].base_stat}</div></td>
        </tr>
        <tr>
          <td>Attack:</td>
          <td class="progressbar"><div id="progress_bar1">${data.stats[1].base_stat}</div></td>
        </tr>
        <tr>
          <td>Defense:</td>
          <td class="progressbar"><div id="progress_bar2">${data.stats[2].base_stat}</div></td>
        </tr>
        <tr>
          <td>Special-Attack:</td>
          <td class="progressbar"><div id="progress_bar3">${data.stats[3].base_stat}</div></td>
        </tr>
        <tr>
          <td>Special-Defense:</td>
          <td class="progressbar"><div id="progress_bar4">${data.stats[4].base_stat}</div></td>
        </tr>
        <tr>
          <td>Speed:</td>
          <td class="progressbar"><div id="progress_bar5">${data.stats[5].base_stat}</div></td>
        </tr>
      </table>
    </div>
    
    <div id="tab3" class="tab-evo" style="display:none;">
        <p>${evoArr.join("&nbsp;>>&nbsp;")}</p>
        <p id="tab3_img" class="tab-evo-img"></p>
    </div>

  </div>
  `;
}


function getTemplateEvoArr(arrIds, i){
  return `
    <span>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${arrIds[i]}.png">
    </span>
  `;  
}


function getTemplateNoSearchResultsFound(){
  return `
    <div class="error404">
      <h1>Unerf<img class="error-pokeball" src="./img/loading_pokeball.png" alt="Loading Pokeball">lgreiche Suche.</h1>
      <br>
      <h1>N<img class="error-pokeball" src="./img/loading_pokeball.png" alt="Pokeball">&nbsp;P<img class="error-pokeball" src="./img/loading_pokeball.png" alt="Pokeball">kem<img class="error-pokeball" src="./img/loading_pokeball.png" alt="Pokeball">ns&nbsp;f<img class="error-pokeball" src="./img/loading_pokeball.png" alt="Pokeball">und.</h1>
    </div>
  `;
}


function getTemplateTooShortSearch(){
  return `
    <div class="error404">
      <h1>Error 4<img class="error-pokeball" src="./img/loading_pokeball.png" alt="Pokeball">4. Please enter at least 3 Characters. Thank Y<img class="error-pokeball" src="./img/loading_pokeball.png" alt="Pokeball">u!</h1>
    </div>
  `;
}


function getTemplateNoPokiFound(){
  return `
    <h1 class="error404">Error 4<img class="error-pokeball" src="./img/loading_pokeball.png" alt="Loading Pokeball" >4. Poki not found.</h1>
  `;
}