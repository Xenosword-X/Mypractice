$(document).ready(function () {
    //下拉式選單
    $('.dropdown > a').click(function(e){
        e.preventDefault();        
        $(this).siblings('.dropdown-open').slideToggle();
    })

    //回到網頁頂部
    $('.back-top').click(function(e){
        e.preventDefault();
        $('html,body').animate({
            scrollTop:0
        }, 1000);
    });

    //初始化Glightbox
    const lightbox = GLightbox({
        selector: '.glightbox'
    });

    //初始化swiper
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });
});