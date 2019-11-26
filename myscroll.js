let sections = document.getElementsByClassName('section');
for (let i = 0; i < sections.length; i++) {
    sections[i].style.backgroundColor = 'rgb('+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+')';
    sections[i].style.opacity = '0.5';
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

    let counter = 0;

    //function for resetting counter;
    function counterToZero() {
        counter = 0;
    }

    $(window).mousewheel(function(event) {
        let direction = (-event.deltaY/Math.abs(event.deltaY));

        for (let i = currentSection; i < scrollElems.length; i++) {
            if (counter == 0) {
                if (direction > 0) {
                    if (this.scrollY > scrollElems[i].offsetTop - scrollDist && !scrolledToDown.includes(i)) {
                        scrolledToDown.push(i);
                        counter = 1;
                        disableScroll();
                        $('html, body').animate({
                            scrollTop: scrollElems[i].offsetTop
                        }, {
                            duration: 500,
                            easing: "easeInCubic",
                        }).promise().then(function() {
                            console.log('Animation for all elements (html and body) to go down complete');
                            counterToZero();
                            enableScroll();
                          });
                        currentSection = i;
                    }
                } else if (direction < 0 && currentSection > 0) {
                    if (this.scrollY < scrollElems[currentSection-1].offsetTop + scrollDist) {
                        counter = 1;
                        disableScroll();
                        $('html, body').animate({
                            scrollTop: scrollElems[currentSection-1].offsetTop
                        }, {
                            duration: 500,
                            easing: "easeInCubic",
                        }).promise().then(function() {
                            console.log('Animation for all elements (html and body) to go up complete');
                            counterToZero();
                            enableScroll();
                          });
                        currentSection--;
                        scrolledToDown.pop(currentSection);
                    }
                }
            } else {
                return false;
            };
         }
    });

});

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

//functions for disabling scroll
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}