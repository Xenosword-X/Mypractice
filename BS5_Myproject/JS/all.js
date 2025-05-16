$(document).ready(function () {
    //首頁banner change-btn樣式
    $('.change-btn').hover(
        function () {
            $(this).find('img').attr('src', './images/robot02.png');
            $(this).find('p').removeClass('bg-white').addClass('bg-primary text-white');
        },
        function () {
            $(this).find('img').attr('src', './images/robot01.png');
            $(this).find('p').removeClass('bg-primary text-white').addClass('bg-white');
        }
    );    
});