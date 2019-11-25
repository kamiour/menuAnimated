let sections = document.getElementsByClassName('section');
for (let i = 0; i < sections.length; i++) {
    sections[i].style.backgroundColor = 'rgb('+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+')';
    sections[i].style.opacity = '0.5';
}

function callBack() {
    console.log('done');
}

$(document).ready(function(){
    let scrollElems = $('.scrollPage');
    let scrolledToDown = [0];
    let scrollDist = window.innerHeight/1;
    let currentSection = 0;
    
    //setting Current section top to 0;
    for (let i = 0; i < scrollElems.length-1; i++) {
        if (window.scrollY >= scrollElems[i].offsetTop && window.scrollY < scrollElems[i+1].offsetTop) {
            currentSection = i;
        };
    }
    scrolledToDown.push(currentSection)
    $('html, body').animate({
        scrollTop: scrollElems[currentSection].offsetTop
    }, 500, 'easeInCubic');


    $(window).mousewheel(function(event) {
        let direction = (-event.deltaY/Math.abs(event.deltaY));

        for (let i = currentSection; i < scrollElems.length; i++) {
            if (direction > 0) {
                if (this.scrollY > scrollElems[i].offsetTop - scrollDist && !scrolledToDown.includes(i)) {
                    scrolledToDown.push(i);
                    $('html, body').animate({
                        scrollTop: scrollElems[i].offsetTop
                    }, {
                        duration: 500,
                        easing: "easeInCubic",
                    }).promise().then(function() {
                        console.log('Animation for all elements (html and body) to go down complete');
                      });
                    currentSection = i;
                }
            } else if (direction < 0 && currentSection > 0) {
                if (this.scrollY < scrollElems[currentSection-1].offsetTop + scrollDist) {
                    $('html, body').animate({
                        scrollTop: scrollElems[currentSection-1].offsetTop
                    }, {
                        duration: 500,
                        easing: "easeInCubic",
                    }).promise().then(function() {
                        console.log('Animation for all elements (html and body) to go up complete');
                        
                      });
                    currentSection--;
                    scrolledToDown.pop(currentSection);
                }
            }
            
         }
    });

});
