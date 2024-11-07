const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
const SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/';
const EVO_URL = 'https://pokeapi.co/api/v2/evolution-chain/';
const ALL_THE_POKIS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0/';

const pokiRangeStart = 1;
const pokiRangeEnd = 20;

let pokeCardRef = document.getElementById("poke_card");
let pokeOverlayRef = document.getElementById("poke_overlay");

let currentStart = pokiRangeStart;
let currentEnd = pokiRangeEnd;

let allPokis = [];


function init(){
  fetchPokemonRange(pokiRangeStart, pokiRangeEnd);
  getAllPokemon();
  showBackAndForwardArrows();
  document.getElementById("back_arrow").classList.add("dnone");
}


function showPokeCardDependingOnType(data, upper, first, second){
  if(data.types.length === 2) {
    second = data.types[1].type.name;
  }
  if(second === first){    
    pokeCardRef.innerHTML += getTemplatePokeCardOneType(data.id,  upper, first);
  } else {
    pokeCardRef.innerHTML += getTemplatePokeCardTwoTypes(data.id, upper, first, second);
  }
}


async function fetchPokemonRange(startIdx, endIdx) {
  pokeCardRef.innerHTML = '';
  loadingPokeball();
  for (let i = startIdx; i <= endIdx; i++) {
    let response = await fetch(BASE_URL + i);
    let responseAsJson = await response.json();
    let pokeNameUpper = capitalizeFirstLetter(responseAsJson.name);
    let firstType = responseAsJson.types[0].type.name;
    let secondType = firstType;
    showPokeCardDependingOnType(responseAsJson, pokeNameUpper, firstType, secondType)
  }
  disableLoadingPokeball();
}


function showPrevRange(){
  currentStart -= 20;
  currentEnd -= 20;
  if(currentStart <= 1){
    document.getElementById("back_arrow").classList.add("dnone");
    currentStart = 1;
    currentEnd = 20;
  }
  fetchPokemonRange(currentStart, currentEnd);
}


function showNextRange(){
  currentStart += 20;
  currentEnd += 20;
  document.getElementById("back_arrow").classList.remove("dnone");
  fetchPokemonRange(currentStart, currentEnd);
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function capitalizeFirstLetterOfArray(arr) {
  let arrUpper = [];
  for (let i = 0; i < arr.length; i++) {
    arrUpper.push(capitalizeFirstLetter(arr[i]));
  }
  return arrUpper;
}


function setEvoChainIds(evoChainArrIds){
  for (let i = 0; i < evoChainArrIds.length; i++) {
    document.getElementById("tab3_img").innerHTML += getTemplateEvoArr(evoChainArrIds, i);
  }
}


function initOverlay(){
  pokeOverlayRef.innerHTML = '';
  pokeOverlayRef.style.display = "flex";
  loadingPokeball();
}


function getAbilityArray(data){
  let abilityArray = [];
  for (let i = 0; i < data.abilities.length; i++) {
    abilityArray.push(capitalizeFirstLetter(data.abilities[i].ability.name));
  }
  return abilityArray;
}


async function openOverlay(id){
  initOverlay();
  let response = await fetch(BASE_URL + id);
  let responseAsJson = await response.json();
  let evoChainArr = await fetchEvoChain(id);
  let evoChainArrIds = await fetchEvoIds(evoChainArr);
  evoChainArr = capitalizeFirstLetterOfArray(evoChainArr);
  disableLoadingPokeball();
  deactivatedBackgroundScrolling(true);
  pokeOverlayRef.innerHTML = getTemplateOverlay(id, responseAsJson, getAbilityArray(responseAsJson), evoChainArr);
  setEvoChainIds(evoChainArrIds);
  setStyleStartBtn();
  showProgressBar(responseAsJson.stats);
}


function openPrevOverlay(id){
  if(id === 1){
    openOverlay(1025);
  } else {
    openOverlay(id-1);
  }
}


function openNextOverlay(id){
  if(id === 1025){
    openOverlay(1);
  } else {
    openOverlay(id+1);
  }
}


function openTab(tab){
  if(tab === 1){setTab1();} else
  if(tab === 2){setTab2();} else
  if(tab === 3){setTab3();}
}


function closeOverlay(){
  let pokeOverlayRef = document.getElementById("poke_overlay");
  pokeOverlayRef.style.display = "none";
  deactivatedBackgroundScrolling(false);
}


function logDownWBubblingProtection(event){
  event.stopPropagation();
}

function getEvoChainArray(data){
  let evoChainArray = [];
  let currentEvoChain = data.chain;
  do {
    let speciesName = currentEvoChain.species.name
    evoChainArray.push(speciesName);
    currentEvoChain = currentEvoChain.evolves_to[0];
  } while (currentEvoChain);
  return evoChainArray;
}


async function fetchEvoChain(id){
  let response = await fetch(SPECIES_URL + id);
  let responseAsJson = await response.json();
  let evoChainUrl = responseAsJson.evolution_chain.url;
  let evoChainResponse = await fetch(evoChainUrl);
  let evoChainResponseAsJson = await evoChainResponse.json();
  return getEvoChainArray(evoChainResponseAsJson);
}


async function fetchEvoIds(arr){
  let tempIds = [];
  for(let i = 0; i < arr.length; i++){
    let response = await fetch(BASE_URL + arr[i]);
    let responseAsJson = await response.json();
    tempIds.push(responseAsJson.id);
  }
  return tempIds;
}


function errorMessage(){
  return console.error("Es ist ein Fehler aufgetreten.");
}


function loadingPokeball(){
  document.getElementById("loading").style.display = "flex";
  deactivatedBackgroundScrolling(true);
}


function disableLoadingPokeball(){
  document.getElementById("loading").style.display = "none";
  deactivatedBackgroundScrolling(false);
}


async function getAllPokemon(){
  let response = await fetch(ALL_THE_POKIS_URL);
  let data = await response.json();
  for (let i = 0; i < data.results.length; i++) {
    allPokis.push({
      name: data.results[i].name,
      id: i
    });
  }
}


function showSearchResultNotFound(){
  pokeCardRef.innerHTML = getTemplateNoSearchResultsFound();
  hideBackAndForwardArrows();
}


function showSearchResultTooShort(){
  pokeCardRef.innerHTML = getTemplateTooShortSearch();
  hideBackAndForwardArrows();
}


function searchAllPokemons(){
  let searchPokeRef = document.getElementById("search_input").value.toLowerCase();
  let resultArrIds = [];
  if(searchPokeRef.length > 2){
    for (let i = 0; i < allPokis.length; i++) {
      if(allPokis[i].name.includes(searchPokeRef)){
        resultArrIds.push(allPokis[i].id);
      }
    }
    if(resultArrIds.length == 0){
      showSearchResultNotFound();
    } else {
      fetchPokemonSearchArray(resultArrIds);
    }
  } else {
    showSearchResultTooShort();
  }
  document.getElementById("search_input").value = '';
}


function getSearchResultDependingOnType(data, upper, first, second){
  if(data.types.length === 2) {
    second = data.types[1].type.name;
  }
  if(second === first){    
    pokeCardRef.innerHTML += getTemplatePokeCardOneType(data.id,  upper, first);
  } else {
    pokeCardRef.innerHTML += getTemplatePokeCardTwoTypes(data.id, upper, first, second);
  }
}


async function fetchPokemonSearchArray(pokeArr) {
  pokeCardRef.innerHTML = '';
  loadingPokeball();
  for (let i = 0; i < pokeArr.length; i++) {
    let response = await fetch(BASE_URL + (pokeArr[i] + 1));
    let responseAsJson = await response.json();
    let pokeNameUpper = capitalizeFirstLetter(responseAsJson.name);
    let firstType = responseAsJson.types[0].type.name;
    let secondType = firstType;
    getSearchResultDependingOnType(responseAsJson, pokeNameUpper, firstType, secondType);
  }
  disableLoadingPokeball();
  hideBackAndForwardArrows();
}


async function theSearchForNerdsPreciseEdition(){
  let searchPokeRef = document.getElementById("search_input").value.toLowerCase();
  pokeCardRef.innerHTML = '';
  if(searchPokeRef.length > 2) {
    try {
      let response = await fetch(BASE_URL + searchPokeRef);
      let responseAsJson = await response.json();
      const pokiId = responseAsJson.id;
      fetchPokemonRange(pokiId, pokiId);
    } catch(error) {
        pokeCardRef.innerHTML = getTemplateNoPokiFound();
      }
  }  
  document.getElementById("search_input").value = '';
}