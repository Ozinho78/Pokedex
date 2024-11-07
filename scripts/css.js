function showProgressBar(stat){
  for (let i = 0; i < stat.length; i++) {
    document.getElementById('progress_bar' + i).style.width = 
    `${Math.ceil(stat[i].base_stat*0.75)}%`;
    document.getElementById('progress_bar' + i).style.backgroundColor = 
    `#F75C4E`;
    document.getElementById('progress_bar' + i).style.borderRadius = `10px/50%`;
    document.getElementById('progress_bar' + i).style.textAlign = `center`;
  }
}


function setTab1(){
  document.getElementById("tab1").style.display="block";
  document.getElementById("tab2").style.display="none";
  document.getElementById("tab3").style.display="none";
  document.getElementById("btn1").style.backgroundColor="rebeccapurple";
  document.getElementById("btn2").style.backgroundColor="";
  document.getElementById("btn3").style.backgroundColor="";
}


function setTab2(){
  document.getElementById("tab1").style.display="none";
  document.getElementById("tab2").style.display="block";
  document.getElementById("tab3").style.display="none";
  document.getElementById("btn1").style.backgroundColor="";
  document.getElementById("btn2").style.backgroundColor="rebeccapurple";
  document.getElementById("btn3").style.backgroundColor="";
}


function setTab3(){
  document.getElementById("tab1").style.display="none";
  document.getElementById("tab2").style.display="none";
  document.getElementById("tab3").style.display="block";
  document.getElementById("btn1").style.backgroundColor="";
  document.getElementById("btn2").style.backgroundColor="";
  document.getElementById("btn3").style.backgroundColor="rebeccapurple";
}


function setStyleStartBtn(){
  document.getElementById("btn1").style.backgroundColor="rebeccapurple";
}


function deactivatedBackgroundScrolling(bool){
  if(bool){
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}


function hideBackAndForwardArrows(){
  document.getElementById("back_arrow").classList.add("dnone");
  document.getElementById("forward_arrow").classList.add("dnone");
}


function showBackAndForwardArrows(){
  document.getElementById("back_arrow").classList.remove("dnone");
  document.getElementById("forward_arrow").classList.remove("dnone");
}

