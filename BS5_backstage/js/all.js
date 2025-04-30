//const toggleMenuBtn=document.querySelector('#toggle-btn');
//const body=document.querySelector('body');
//toggleMenuBtn.addEventListener('click',(evt) =>{
//     evt.preventDefault();
//     body.classList.toggle('sidebar-toggled');
//})

$(document).ready(function () {
    $('#toggle-btn').click(function(e){
        e.preventDefault();
        $('body').toggleClass('sidebar-toggled');
    })
});