// Navigation bar in home page 
let menubutton=document.getElementsByClassName('menu');
let buttons=document.querySelector('#buttons');
let home_content=document.querySelector('#home-content');
function ToggleMenu(){
 let s = buttons.getAttribute('style')
 if( s == 'display:none'){
    buttons.setAttribute('style','display:flex')
    home_content.style.margin ='60px';
}else{
    buttons.setAttribute('style','display:none');
    home_content.style.margin ='0px';
}}
// End of Navigation bar in home page 

if(localStorage.getItem('user_email') === null){
    document.getElementById('logout').style.display='none'
}else{
    document.querySelector('#signup').style.display='none'
    document.querySelector('#login').style.display='none'
    document.getElementById('logout').style.display='flex'

}