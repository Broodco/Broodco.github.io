/* This script is used to create a drop down button in the header part of the page */

function showdropdowna(){
    document.getElementById("myDropdown-exos").classList.toggle("show");
}
function showdropdownb(){
    document.getElementById("myDropdown-contact").classList.toggle("show");
}
window.onclick = function(event){
    if (!event.target.matches('.dropdown')){
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i=0 ; i < dropdowns.length ; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Script used for the Burger Menu 

function showBurgerMenu(){ 
    var menu = document.getElementById("responsive");
    if (menu.style.display == "block"){
        menu.style.display = "none";
    }
    else{
        menu.style.display = "block";
    }
};

function showdropdownc(){
    document.getElementById("myDropdown-exos-mobile").classList.toggle("show");
}
function showdropdownd(){
    document.getElementById("myDropdown-contact-mobile").classList.toggle("show");
}
