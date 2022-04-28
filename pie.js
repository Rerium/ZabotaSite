let menu = document.querySelector('.sunrayGood');
let infoContent = document.querySelector('.infoBlock');
let content = document.getElementById("contentText");
let items = menu.querySelectorAll('.sunray');
let button = menu.querySelector('.sunrayBtn');
let active = false;

var jsonSunArray;


const length = items.length;
const arc = 2 * Math.PI * (1 / 10);
const radius = 20;
let size

if (window.innerWidth > window.innerHeight) {
    size = Math.round(window.innerHeight * 0.7)
} else {
    size = Math.round(window.innerWidth * 0.7)
}
menu.style.width = size + "px";
menu.style.height = size + "px";

//Отрисовка "лучей"
button.addEventListener('click', (e) => {
    e.preventDefault();
    active = !active;

    if (active) {
        button.classList.add('sunrayBtnActive');
        for (let i = 0; i < length; i++) {
            let x, y;
            if (i < 10) {
                const angel = i * arc;
                x = radius * Math.cos(angel);
                y = radius * Math.sin(angel);
            }
            if (i >= 10 && i < 30) {
                const angel = i * arc / 2;
                x = radius * Math.cos(angel) * 2;
                y = radius * Math.sin(angel) * 2;
            }
            if (i >= 30 && i < 40) {
                const angel = i * arc / 2;
                x = Math.round(radius * Math.cos(angel) * 2.5);
                y = Math.round(radius * Math.sin(angel) * 2.5);
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

// создание JSON
let requestURL = "http://127.0.0.1:5500/zabota/pie.json"; // ссылка на внешний JSON

var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
jsonSunArray = request.response;
}
window.addEventListener("mousedown", (e) => {

    if (e.target.classList == "sunray") {
        let currentWindow = jsonSunArray[e.target.id];
        console.log(currentWindow);
        content.style.display = "flex";
        $(infoContent).append('<div id="info"><div class="gallery"><img class="image" src=' + currentWindow.img1+ '><img class="image" src='+currentWindow.img2+ '></div><p>'+currentWindow.leading+currentWindow.text+'</p></div>');
    }
    if (e.target.id == "contentText") {
        content.style.display = "none";
        $('#info').remove();

    }
});
