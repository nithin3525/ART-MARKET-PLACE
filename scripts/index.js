function colorMode(){
   var element = document.querySelector("#color-mode img");
   if(element.getAttribute("src") == 'svgs/brightness-high.svg'){
      element.removeAttribute("src");
      element.setAttribute("src","svgs/moon-stars-fill.svg");
      document.body.setAttribute("data-bs-theme","light");
   }else{
      element.removeAttribute("src");
      element.setAttribute("src","svgs/brightness-high.svg");
      document.body.setAttribute("data-bs-theme","dark");
   }  
}

window.addEventListener('scroll', function() {
   var content = document.querySelector('.content');
   var topOffset = 30; // Adjust the top offset as needed
   if (window.scrollY > topOffset) {
     content.classList.add('reduced-opacity');
   } else {
     content.classList.remove('reduced-opacity');
   }
 });

function openPopup(){
   document.getElementById('loginPopup').style.display = 'block';
}
function closePopup() {
   document.getElementById('loginPopup').style.display = 'none';
} 

function openRPopup(){
   document.getElementById("registrationPopup").style.display = "block";
}
function closeRPopup() {
   document.getElementById("registrationPopup").style.display = "none";
}