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
    
    //首頁全新精品卡片hover樣式
    $('.hover-card').hover(
        function () {
          $(this).find('.card-title, .card-text').removeClass('d-none').addClass('d-block');
        },
        function () {
          $(this).find('.card-title, .card-text').removeClass('d-block').addClass('d-none');
        }
    );

    //首頁二手良品卡片hover樣式
    $('.hover-card2').hover(
        function(){
            $(this).find('img').attr('src','./images/PSVR02.png')
            $(this).find('.btn').css('color','#0d6efd')
        },
        function(){
            $(this).find('img').attr('src','./images/PSVR01.jpg')
            $(this).find('.btn').css('color','#212529')
        }
    );
    $('.hover-card3').hover(
        function(){
            $(this).find('img').attr('src','./images/PS3-02.png')
            $(this).find('.btn').css('color','#0d6efd')
        },
        function(){
            $(this).find('img').attr('src','./images/PS3-01.png')
            $(this).find('.btn').css('color','#212529')
        }
    );
    $('.hover-card4').hover(
        function(){
            $(this).find('img').attr('src','./images/PSC-02.jpg')
            $(this).find('.btn').css('color','#0d6efd')
        },
        function(){
            $(this).find('img').attr('src','./images/PSC-01.jpg')
            $(this).find('.btn').css('color','#212529')
        }
    );
});