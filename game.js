const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rtg = 0.0174533; // 1 радус в радианах
var cloudAr = []; // массив для облаков
var cloudID = 0; // индицикация облаков, нужна для корректного удаления
var cloudTimer = Math.floor(Math.random() * 1000); // тиаймер КД спавна облака
var sunAr = []; //массив солнца

//настройка
const SunRadius = 100; // радиус солнца

Resize();
window.addEventListener("resize", Resize);
window.addEventListener("mousedown", function (e) { KeyDown(e); })


function KeyDown(k) {
    if (k.which == 1){
    cloudAr.push(new cloud(cloudID++))
    }
    if (k.which == 2){
        arr.pop();
    }
}

setInterval(Update, 1000 / 60); //Состояние игры будет обновляться 60 раз в секунду — при такой частоте обновление происходящего будет казаться очень плавным


function Update() //Обновление игры
{
    for(let i = 0; i < cloudAr.length; i++){cloudAr[i].update();}
    CloudF();
    Draw();
}

function Draw() //Работа с графикой
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Очистка холста от предыдущего кадра
    for(let i = 0; i < sunAr.length; i++){
        sunAr[i].update();
    }
    for(let i = 0; i < cloudAr.length; i++){
        ctx.drawImage
        (
            cloudAr[i].image, //Изображение для отрисовки
            cloudAr[i].x,
            cloudAr[i].y
        );
    }
}
function Resize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("width=", canvas.width, " height=",canvas.height);
}
function CloudF()
{
    if (Math.floor(Math.random() * 2) == 1 && cloudTimer <=0)  {
        cloudAr.push(new cloud(cloudID++));
        cloudTimer = Math.floor(Math.random() * 1000);
    }
    cloudTimer--;

}


class sunMain{
    constructor(r) {

        this.r=r;
    }
    update(){
        ctx.beginPath();
        ctx.ellipse(
            canvas.width/2,
            canvas.height/2,
            this.r,
            this.r,
            0*rtg,
            0,
            360*rtg
        );
        ctx.fillStyle = 'yellow';
        ctx.fill()
    }
}
sunAr.push(new sunMain(SunRadius));

class cloud{
    constructor(n) {
        this.id = n; // индификатор облака
        let im = Math.floor(Math.random() * 5);   //номер используемого облака
        this.image = new Image();                   //создаем изображени
        this.image.src = "img/cloud/"+im+".png";    //присваиваем изображение

        this.speed=Math.floor(Math.random() * 10)+1;    //генерируем скорость облака

        if (Math.floor(Math.random() * 101) > 90){  // куда будет двигаться и где заспавниться, если 1 то слева на право
            this.x=-this.image.width;
        }else {
            this.x = this.image.width + canvas.width;
            this.speed = -this.speed;
        }
        this.y=Math.floor(Math.random() * (canvas.height-((canvas.height/3)*2)));   //генерируем позицию по y

    }
    update(){
        if (this.x > (this.image.width + canvas.width) || this.x < -this.image.width){ // проверяем не ушло ли облако за экран, если ушло то удаляем
            cloudAr.splice((cloudAr.indexOf(this.id)), 1);
        }
        this.x+=this.speed; // перемещаем облако
    }

}

