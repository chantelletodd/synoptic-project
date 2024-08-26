
function toggleNav(){
    let links = document.querySelector(".mainNav");
    links.classList.toggle('showNav');
    }
    
    let hamburger = document.querySelector("#hamburger");
    hamburger.addEventListener('click',toggleNav); 