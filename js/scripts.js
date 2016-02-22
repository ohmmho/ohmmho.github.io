//video
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}


//type.js
function scaleBannerVideoSize(element){
  $(function(){
        $("#hello").typed({
            strings: ["Hey! Hola :)"],
            typeSpeed: 10,
            showCursor: false,
            backDelay: 1500,
            onStringTyped: function(){
              $(".load").css({"display":"inline-flex"});

   }
  });
  });
    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}


//scrolling stripes
var vh = window.innerHeight,
    dh = document.body.scrollHeight;

var lastPos = 0;

var stripes = [], stripes2 = [];
var numStripes = Math.ceil(vh / 49),
    numStripes2 = numStripes + 1;

var h = vh / numStripes;

var triggerPoint = document.getElementById('trigger').offsetTop;

var topBottom;

//init stripes
for(var i = 0; i < numStripes; i++)
{
  var stripe = {};
  stripe.h = 0;
  stripe.t = h * i;

  stripes.push(stripe);
}
for(var i = 0; i < numStripes2; i++)
{
  var stripe = {};
  stripe.h = 0;
  stripe.t = (h * i) - h/2;

  stripes2.push(stripe);
}

window.onscroll = function()
{
  var scrollPos = window.scrollY;
  var newH, newH2;

  if(scrollPos <= triggerPoint)
  {
    topBottom = 'top';
    newH = h - (triggerPoint - scrollPos) / numStripes;
    newH2 = newH;

    for(var j = 0; j < stripes.length; j++)
    {
      stripes[j].h = newH + j*1.5;
    }

    for(var a = 0; a < stripes2.length; a++)
    {
      stripes2[a].h = newH2 + a*1.5;
    }
  }
  else if (scrollPos > triggerPoint)
  {
    topBottom = 'bottom'
    newH = h - (scrollPos - triggerPoint) / numStripes;
    newH2 = newH;

    for(var j = 0; j < stripes.length; j++)
    {
      stripes[j].h = newH + j*1.5;
    }

    for(var b = 0; b < stripes2.length; b++)
    {
      stripes2[b].h = newH2 + b*1.5;
    }
  }

  //draw stripes
  var stripeContainer1 = document.getElementsByClassName('stripes-wrapper')[0],
      stripeContainer2 = document.getElementsByClassName('stripes-wrapper2')[0];

  stripeContainer1.innerHTML = '';
  stripeContainer2.innerHTML = '';

  for(var k = 0; k < stripes.length; k++)
  {
    var opacity;
    if(scrollPos == 0 || scrollPos == dh-vh)
    {
      opacity = 0;
    }
    else
    {
      opacity = stripes[k].h / (h/2);
    }

    stripeContainer1.innerHTML = stripeContainer1.innerHTML + ('<div class="stripe" style="height: ' + stripes[k].h + 'px;' + topBottom + ':' + stripes[k].t + 'px; opacity: ' + opacity + '"><div style="' + topBottom + ': ' + (h - 49) / 2 + 'px"></div></div>');
  }

  for(var c = 0; c < stripes2.length; c++)
  {
    var opacity;
    if(scrollPos == 0 || scrollPos == dh-vh)
    {
      opacity = 0;
    }
    else
    {
      opacity = stripes2[c].h / (h/2);
    }

    stripeContainer2.innerHTML = stripeContainer2.innerHTML + ('<div class="stripe" style="height: ' + stripes2[c].h + 'px;' + topBottom + ':' + stripes2[c].t + 'px; opacity: ' + opacity + '"><div style="' + topBottom + ': ' + (h - 49) / 2 + 'px"></div></div>');
  }

  lastPos = scrollPos;
};
