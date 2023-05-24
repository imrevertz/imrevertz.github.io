'use strict';

'use strict';

const ipgeolocation = 'https://api.ipgeolocation.io/ipgeo?apiKey=813ff81068c84cf7980735c716e89e09';

const timeouts = [];

const mobileAndTabletCheck = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


$(document).ready(() => {
  const links = [
    {
      name: 'bazzy',
      link: '76561197960958773',
    },
    {
      name: 'sean',
      link: '76561198121800913',
    },
    {
      name: 'devvo',
      link: '76561198881137975',
    },
    {
      name: 'unknown-ct',
      link: '76561198063247994',
    },
    {
      name: '3cho',
      link: '76561198173548590'
    },
    {
      name: 'moe',
      link: '76561198364985687'
    },
    {
      name: 'trappo',
      link: '76561197961058952',
    },
    {
      name: 'angel',
      link: '76561198893938524',
    },
    {
      name: 'adxm',
      link: '76561198962972012',
    },
    {
      name: 'connor',
      link: '76561199188488467',
    },
    {
      name: 'archie',
      link: '76561198392193931',
    },
  ];

  for (let i in links) {
    let link = links[i];

    $('#marquee').append(`<a href="https://steamcommunity.com/profiles/${link.link}" target="_BLANK">${link.name}</a>`);

    link = $('#marquee').children('a').last();

    if (i != links.length - 1) $('#marquee').append(' <img class="emoticon" src="assets/icons/rose1.png"> ');
  }

  if (mobileAndTabletCheck()) {
    $('#background').replaceWith('<div id="background" style="background-image: url(assets/images/mobile-background.jpg);"></div>');

    app.shouldIgnoreVideo = true;
  }

  app.titleChanger(['shoreline.rip', 'hi infistar', 'hi fini', 'arma 3 terrorists', 'shoreline.rip', '=', 'gods', 'Song name: All The Time - Shoreline Mafia']);
  app.iconChanger(['assets/icons/roses/rose1.png']);
});

if ($.cookie('videoTime')) {
  app.videoElement.currentTime = $.cookie('videoTime');
  app.audioElement.currentTime = $.cookie('videoTime');
}

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

document.body.onkeyup = (event) => {
  if (event.keyCode == 32 && app.skippedIntro) {
    if (app.backgroundToggler) {
      app.videoElement.play();
      app.audioElement.play();
    } else {
      app.videoElement.pause();
      app.audioElement.pause();
    }

    return (app.backgroundToggler = !app.backgroundToggler);
  }
};

$('html').on('contextmenu', (event) => {
  const img = document.createElement('img');

  const trollfaceLight = app.skippedIntro ? '' : 'trollface-light';

  img.src = 'assets/icons/rose1.png';
  img.width = 64;
  img.height = 64;
  img.alt = 'shoreline.rip';
  img.style = `position: absolute; left: ${event.pageX}px; top: ${event.pageY}px; z-index: 10`;
  img.className = `troll ${trollfaceLight}`;

  document.body.appendChild(img);
});

setInterval(() => {
  $('.troll').remove();
}, 200);

$('.skip').click(() => {
  skipIntro();
});

$.fn.extend({
  animateCss: function (animationName) {
    const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    this.addClass(`animated ${animationName}`).one(animationEnd, () => {
      $(this).removeClass(`animated ${animationName}`);
    });

    return this;
  },
});

const writeLine = (text, speed, timeout, callback) => {
  timeout = typeof timeout === 'number' ? timeout : [0, (callback = timeout)];

  const lineNumber = app.id !== 2 ? ++app.id : (app.id += 2);

  setTimeout(() => {
    const typed = new Typed(`#line${lineNumber}`, {
      strings: text,
      typeSpeed: speed,
      onComplete: callback,
    });
  }, timeout);
};

$.getJSON(ipgeolocation, (data) => {
  writeLine(["Authenticating...", "Granting access to <span style='font-size: 14px; color: #06d;'>[shoreline.rip]</span>..."], 30, function () {

    if (app.skippedIntro)
      return;

    clearCursor();

      var usernames = ["user", "dude"];

      writeLine(["Access granted! <span style='font-size: 14px; color: #0f0;'>[success]</span>", "Welcome back, <i style='color: #0f0'>" +  ((data.ip) ? data.ip : usernames[Math.floor(Math.random()*usernames.length)]) 
          + "</i>! By the way, nice to see someone from " + ((data.country_name) ? data.country_name : 'your country') + " here!"], 30, 500, function () {

          if (app.skippedIntro)
              return;

          clearCursor();

          writeLine(["<i style='color: #F62459'>shoreline.rip $$$</i>"], 120, 500, function () {

            timeouts.push(
              setTimeout(() => {
                if (app.skippedIntro) return;
    
                clearCursor();
    
                setTimeout(() => {
                  skipIntro();
                }, 500);
              }, 1000)
            );
          });
        });
      });
    });
    
    const skipIntro = () => {
      if (app.skippedIntro) return;
    
      app.skippedIntro = true;
    
      timeouts.forEach((timeout) => {
        clearTimeout(timeout);
      });
    
      $('.top-right').remove();
    
      $('#main').fadeOut(100, () => {
        $('#main').remove();
    
        $('#marquee').marquee({
          duration: 15000,
          gap: 420,
          delayBeforeStart: 1000,
          direction: 'left',
          duplicated: true,
        });
    
        setTimeout(() => {
          $('.brand-header').animateCss(app.effects[Math.floor(Math.random() * app.effects.length)]);
        }, 200);
    
        setTimeout(() => {
          const typed = new Typed('#brand', {
            strings: app.brandDescription,
            typeSpeed: 40,
    
            onComplete: () => {
              clearCursor();
            
            },
          });
        }, 1350);
    
        setTimeout(() => {
          if (!app.shouldIgnoreVideo) {
            app.videoElement.play();
            app.audioElement.play();
          }
    
          app.videoElement.addEventListener(
            'timeupdate',
            () => {
              $.cookie('videoTime', app.videoElement.currentTime, { expires: 1 });
            },
            false
          );
    
          $('.marquee-container').css('visibility', 'visible').hide().fadeIn(100);
    
          $('.marquee-container').animateCss('zoomIn');
    
          $('.container').fadeIn();
    
          $('.background').fadeIn(200, () => {
            if (!app.shouldIgnoreVideo) $('#audio').animate({ volume: app.musicVolume }, app.musicFadeIn);
          });
        }, 200);
      });
    };
    
    const clearCursor = () => {
      return $('span').siblings('.typed-cursor').css('opacity', '0');
    };
