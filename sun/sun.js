let menu = document.querySelector('.sunrayGood');
var button = menu.querySelector('.sunrayBtn');
let infoContent = document.querySelector('.infoBlock');
var jsonSunArray;
let sunrayGood;
let content;
let items;
let active = false;
let length;

// создание JSON
let requestURL = "sun.json"; // ссылка на внешний JSON
let request = new XMLHttpRequest();

request.open('GET', requestURL);    //создается get-запрос по requestURL
request.responseType = 'json';      //присваивается тип принимаемого ответа
request.send();                     //отправляется запрос

request.onload = function () {
    jsonSunArray = request.response;
    let len = request.response.length;
    for (let i = len-1; i >= 0; i--) {
        $(menu).prepend('<a class="sunray" id="' + i + '">' + (i + 1) + '</a>');
    }
    sunrayGood = document.querySelector('.sunrayGood');
    content = document.getElementById("contentText");
    items = menu.querySelectorAll('.sunray');
    length = items.length;

}

const arc = 2 * Math.PI
const radius = 20;
let size
const sunRaySize = "7v";



if (window.innerWidth > window.innerHeight) {
    size = Math.round(window.innerHeight * 0.7)
    $('.sunray').css('height', sunRaySize + "h");
    $('.sunray').css('width', sunRaySize + "h");
} else {
    size = Math.round(window.innerWidth * 0.7)
    $('.sunray').css('height', sunRaySize + "w");
    $('.sunray').css('width', sunRaySize + "w");
}
menu.style.width = size + "px";
menu.style.height = size + "px";



//Отрисовка "лучей"
button.addEventListener('pointerup', (e) => {
    active = !active;
    if (active) {
        button.classList.add('sunrayBtnActive');
        for (let i = 0; i < length; i++) {
            let x, y;
            if (i < 5) {
                const angel = i * arc * (1 / 5);
                x = radius * Math.cos(angel);
                y = radius * Math.sin(angel);
            }
            if (i >= 5 && i < 15) {
                const angel = (i * arc * (1 / 3)) / 2;
                x = radius * Math.cos(angel) * 2;
                y = radius * Math.sin(angel) * 2;
            }

            items[i].style.left = 50 + x + "%";
            items[i].style.top = 50 + y + "%";
        }
    } else {
        button.classList.remove('sunrayBtnActive');
        for (let i = 0; i < length; i++) {
            items[i].removeAttribute('style');
        }
    };
});

//"содержание" луча
window.addEventListener("pointerup", (e) => {
    if (e.target.classList == "sunray") {
        let currentWindow = jsonSunArray[e.target.id];
        content.style.display = "flex";
        $(infoContent).append('<div id="info">' +
                                    '<div class="lable">' +
                                        '<p>' + currentWindow.lable + '<p>' +
                                    '</div>'+
                                    '<div class="galleryContener">'+
                                        '<div class="gallery">' +
                                            '<div class="image"><img src=' + currentWindow.imgLeader1 + '>'+'<p>'+ currentWindow.leader1+ '</p>' +'</div>' +
                                            '<div class="image"><img src=' + currentWindow.imgLeader2 + '>'+'<p>'+ currentWindow.leader2+ '</p>' +'</div>' +
                                            '<div class="image"><img src=' + currentWindow.activity + '></div>' +
                                        '</div>' +
                                    '</div>' +
                                '<div class="discription">' +
                                    '<p>' + currentWindow.discription + '</p>' +
                                '</div>'+
                            '</div>');
    }
    if (e.target.id == "contentText") {
        content.style.display = "none";
        $('#info').remove();

    }
});

$(function () {
    $('.image').click(function (event) {
        var i_path = $(this).attr('src');
        $('body').append('<div id="overlay"></div><div id="magnify"><img src="' + i_path + '"><div id="close-popup"><i></i></div></div>');
        $('#magnify').css({
            left: ($(document).width() - $('#magnify').outerWidth()) / 2,
            // top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
            top: ($(window).height() - $('#magnify').outerHeight()) / 2
        });
        $('#overlay, #magnify').fadeIn('fast');
    });

    $('body').on('click', '#close-popup, #overlay', function (event) {
        event.preventDefault();
        $('#overlay, #magnify').fadeOut('fast', function () {
            $('#close-popup, #magnify, #overlay').remove();
        });
    });
});