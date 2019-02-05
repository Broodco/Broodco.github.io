// Dropdown buttons

function showdropdown(list_class_name){
    document.getElementById(list_class_name).classList.toggle("show");
}

// Hide dropdown lists if the user clicks elsewhere

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

