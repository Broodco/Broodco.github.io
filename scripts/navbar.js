
function dropEvent(){
    dropBtns = document.querySelectorAll(".dropdown")
    for (let i=0 ; i<dropBtns.length ; i++){
        dropBtns[i].addEventListener("click",function(e){
            console.log(e)
            console.log(e.target)
            console.log(e.target.firstElementChild )
            e.target.firstElementChild.classList.toggle("show");
        })
    }
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