
    let menu = document.querySelector('.sunrayGood');
    let items = menu.querySelectorAll('.sunray');
    let button =  menu.querySelector('.sunrayBtn');
    let active = false;

    const length = items.length;
    const arc = 2 * Math.PI * (1/10);
    const radius = 20;
    let size
    if(window.innerWidth > window.innerHeight){
        size = Math.round(window.innerHeight * 0.7)
        console.log("width");
    } else{
        size = Math.round(window.innerWidth * 0.7)
        console.log("height");
    }
    menu.style.width = size + "px";
    menu.style.height = size + "px";
     

    button.addEventListener( 'click' , (e) =>{
        e.preventDefault();

        active = !active;

        if(active){
            button.classList.add('sunrayBtnActive');
            for (let i = 0; i < length; i++) {
                let x, y;
                if (i < 10){
                    const angel = i * arc;
                    x = radius * Math.cos(angel);
                    y = radius * Math.sin(angel);
                }
                if (i >= 10 && i < 30){
                    const angel = i * arc/2;
                    x = radius * Math.cos(angel)*2;
                    y = radius * Math.sin(angel)*2;
                }
                if (i >= 30 && i < 40){
                    const angel = i * arc/2;
                    x = Math.round(radius * Math.cos(angel)*2.5);
                    y = Math.round(radius * Math.sin(angel)*2.5);
                }
                items[i].style.left = 50 + x + "%";
                items[i].style.top = 50 + y + "%";
            }
        }else{
            button.classList.remove('sunrayBtnActive');
            for (let i=0; i < length; i++){
                items[i].removeAttribute('style');
            }
        };

    });
