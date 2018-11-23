$( document ).ready(function(){

//***************************************
//************** Options ****************
//***************************************
 
  //*** Set perspective ***
var gijtPerspective = 700; 

  
$(document).ready(function() {

  $(".gijt_panel").each(function(i) {

    $(this).addClass("panelNumber" + (i+1));

  });

});


//*** Set & apply Stage width (auto height) ***
var gijtManualStageWidth = '100%';
  
$('#stage').css( '-webkit-perspective', gijtPerspective + 'px').css('width',gijtManualStageWidth);
  
var gijtStageWidth = $('#stage').width();
var  gijtStageHght = 500;
  
$('#stage').css('height', gijtStageHght + 'px').css('margin-top', gijtStageHght/(gijtPerspective/25) + 'px');
    
//*** Set rotator overall width *** 
var gijtrotatorSel = '#gijt_rotator'
var gijtRotatorWidth = 1000;  
  
//To account for side panels
var gijtRotNewWidth = .872;
  
var gijtRotWidthSetting = 'scale3d('+ gijtRotNewWidth + ',' + gijtRotNewWidth + ',' + gijtRotNewWidth + ')';
  
  
 //*** Scale the overall stage ***
var scaleTheStage = gijtStageWidth/gijtRotatorWidth; 
  // Now that the scale amount is set using the stage width, change it to 'width: auto' to help center it.  
function SetStageSize() {
  $('#stage_scale').css('transform', 'scale('+ scaleTheStage + ')' ).css('width', 'auto');
}
    
  
  //*** Set Post selector and width *** 
var gijtPostSelector = '#gijt_rotator .gijt_panel';
var gijtPostWidth    = 1000;
var gijtPostBkgrnd   = 'linear-gradient(to bottom, #4c4c4c 0%,#595959 1%,#666666 50%,#474747 99%,#111111 100%)';
  
  //*** Post Border Settings ***
var gijtPostBordWdth = '2px';
var gijtPostBordType = 'outset';
var gijtPostBordColr = '#333';
var gijtPostBordRad  =  '10px'

  //*** Set Rotator speed *** 
var gijtRotatorSpeed = 'all 2.5s ease';  
  
  //*** Set autoplay speed *** 
var gijtAutoPlaySpeed = 7000;  

//*** Differnt Button Designs ***
$("#gijt-button-wrap").addClass('dark-metal');  
  
 
  
//***************************************
//********** Apply Settings *************
//***************************************

  //*** Apply Rotator settings *** 
$(gijtrotatorSel).css('transform', gijtRotWidthSetting ).css('transition', gijtRotatorSpeed );
  
  
  //*** Diagnostic tools ***    
  //console.log( gijtStageWidth, gijtRotatorWidth,  gijtStageWidth/gijtRotatorWidth);
  
  
 $(gijtrotatorSel).css('transform', 'scale3d(.872,.872,.872)');  

    //*** Set Rotator width to screen *** 
/*function SetRotatorSize() {
   if (gijtRotatorWidth !== gijtStageWidth ) {
     $(gijtrotatorSel).css('transform', gijtRotWidthSetting);
   }  
    else {
      $(gijtrotatorSel).css('transform', 'scale3d(.872,.872,.872)');
        gijtRotWidthSetting = 'scale3d(.872,.872,.872)';
    }  
 }
  */

                  
                 
$(document).ready(function() {SetStageSize()});
$(window).resize(function() {SetStageSize()});
  
  //*** Apply post settings *** 
$(gijtPostSelector).css('height', gijtPostWidth/1.777777777777778).css('background', gijtPostBkgrnd).css('border', gijtPostBordWdth + ' ' + gijtPostBordType + ' ' + gijtPostBordColr).css('width', gijtPostWidth + 'px').css('border-radius',gijtPostBordRad );  

$('#stage_scale').css('opacity', '1'); 
//***************************************
//************ Functions ****************
//***************************************

//************* Auto Play **************
 var gijtIntervalFn;
 var intRestRunning = false;
 var myIntRestart = function() {
   setTimeout(startRotation, gijtAutoPlaySpeed);
 } 
function startRotation() {
    if (!intRestRunning) {
      gijtIntervalFn = window.setInterval(gijt_moveRight, gijtAutoPlaySpeed);
      intRestRunning = true;
  } 
}
function stopRotation() {
    window.clearInterval(gijtIntervalFn);
  intRestRunning = false;
}
$(gijtrotatorSel).hover(stopRotation, myIntRestart);
  
 //*** Pause when in other tabs ***
window.addEventListener('focus', startRotation);    
window.addEventListener('blur', stopRotation);
   
  
//************* Movement ***************
var rotateAmt = 0;
function gijt_moveLeft() {
   rotateAmt = rotateAmt -45;
  
  $(gijtrotatorSel).css('transform', 'rotatey(' + rotateAmt + 'deg )' + gijtRotWidthSetting );
  myIntRestart();

   
}
function gijt_moveRight() {
rotateAmt = rotateAmt +45;
 
  $(gijtrotatorSel).stop(true,true).css('transform', 'rotatey(' + rotateAmt + 'deg )' + gijtRotWidthSetting);
  myIntRestart();
} 
 

//************* Buttons ****************
$(document).on('click', '.gijt-btnL', function() {
 stopRotation();
  gijt_moveLeft();
  setTimeout(startRotation, 5000)
  

});
 
$(document).on('click', '.gijt-btnR', function() {
  stopRotation();
  gijt_moveRight();
  setTimeout(startRotation, 5000)
});    

  
  //********************** Touch Control ******************************
  //*** This was slightly modified (to create left and right movement) code from user "mddw" at https://stackoverflow.com/questions/12428433/jquery-touch-swipe-event-no-jquery-mobile ***
  //*******************************************************************
  
  ;(function($) { 
  $.fn.tactile = function(swipe) {
    return this.each(function() {
      var $this = $(document),
      isTouching = false,
      debut;                                // means start in french

      $this.on('touchstart', debutGeste);       

      function debutGeste() {               // means start of gesture
        if (event.touches.length == 1) {
          debut = event.touches[0].pageX;
          isTouching = true;
          $this.on('touchmove', geste);
        }
      }

      function finGeste() {                 // means end of gesture
        $this.off('touchmove');
        isTouching = false;
        debut = null;
      } 

      function geste() {                   // geste means gesture
        if(isTouching) {
          var actuel = event.touches[0].pageX,
          delta = debut - actuel;

          if (Math.abs(delta) >= 30) {     // this '30' is the length of the swipe
            if (delta > 0) {
              swipe.left();
            } else {
              swipe.right();
            }                       
            finGeste();
          } 
        }
        event.preventDefault(); 
      }
    });
  };
})(jQuery);
 
  
  $(document).tactile({   
  left: function() {gijt_moveLeft(); }, 
  right: function() { gijt_moveRight();}
});
  
 }) 
