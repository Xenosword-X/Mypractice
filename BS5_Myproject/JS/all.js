$(document).ready(function () {
    //首頁banner change-btn樣式
    $('.change-btn').hover(
        function () {
            $(this).find('img').attr('src', './images/robot02.jpg');
            $(this).find('p').removeClass('bg-white').addClass('bg-primary text-white');
        },
        function () {
            $(this).find('img').attr('src', './images/robot01.jpg');
            $(this).find('p').removeClass('bg-primary text-white').addClass('bg-white');
        }
    );    
});