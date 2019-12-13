let dropdownToggle = [...document.getElementsByClassName('dropdown-toggle')];
let dropdownMenu = [...document.getElementsByClassName('nav-mobile')];
let closeButton = [...document.getElementsByClassName('close-button')]

//requestAnimationFrame function
function animate({timing, draw, duration}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      // timeFraction changes from 0 to 1
      let timeFraction = (time - start) / (duration);
      if (timeFraction > 1) timeFraction = 1;
      // calculating animation current state
      let progress = timing(timeFraction);
      draw(progress); // drawing animation
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

//function for menu appearing
function menuIn(element) {
  return new Promise((res, rej) => {
    try {
      return animate({
        duration: 500,
        timing: function (timeFraction) {
          return Math.pow(timeFraction, 3)
        },
        draw: function(progress) {
          currentX = (window.innerWidth*(-1)) + progress*window.innerWidth + 'px';
          element.style.transform = `translateX(${currentX})`;
          if (progress == 1) {
            res();
          };
        }
      });
    } catch(e) {
      rej(e);
    }
  })
}

//function for menu disappearing
function menuOut(element) {
  return new Promise((res, rej) => {
    try {
      return animate({
        duration: 500,
        timing: function (timeFraction) {
          return Math.pow(timeFraction, 3)
        },
        draw: function(progress) {
          currentX = (window.innerWidth*(-1)*progress) + 'px';
          element.style.transform = `translateX(${currentX})`;
          if (progress == 1) {
            res();
          };
        }
      });
    } catch(e) {
      rej(e);
    };
  })
}

//actions on window content fully loaded
window.addEventListener("load", function() {
  for (let i = 0; i < dropdownToggle.length; i++) {
    dropdownToggle[i].addEventListener('click', function() {
      dropdownMenu[i].classList.toggle('is-open');
      menuIn(dropdownMenu[i]);

      closeButton[i].addEventListener('click', function(e) {
        menuOut(dropdownMenu[i])
            .then(() => dropdownMenu[i].classList.remove('is-open'));
      });
    });
  }
});
