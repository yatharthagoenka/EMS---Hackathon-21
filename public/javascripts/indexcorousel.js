
function disp1(){
document.getElementById('svgid').classList.add('go');
document.getElementById('profile').style.visibility="hidden";
document.getElementById('hood').style.visibility="hidden";
document.getElementById('userind').style.visibility="hidden";
document.getElementById('indexeventhead').classList.remove('go');
document.getElementById('indexhoodhead').classList.remove('go');
}
function disp3(){
document.getElementById('profile').style.visibility="visible";
document.getElementById('hood').style.visibility="hidden";
document.getElementById('userind').style.visibility="hidden";
document.getElementById('svgid').classList.remove('go');
document.getElementById('indexeventhead').classList.add('go');
document.getElementById('indexhoodhead').classList.remove('go');
}
function disp2(){
document.getElementById('svgid').classList.remove('go');
document.getElementById('profile').style.visibility="hidden";
document.getElementById('userind').style.visibility="hidden";
document.getElementById('hood').style.visibility="visible";
document.getElementById('indexeventhead').classList.remove('go');
document.getElementById('indexhoodhead').classList.add('go');
}