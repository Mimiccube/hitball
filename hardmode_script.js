$(function(){
    $("#title").css("color", "white").css("font-style", "italic").css("font-size", "50px").css("font-family", "fantasy").css("float", "left").css("top", "0px");
  });
  
  $(document).ready(function() {
    var avatar = $('#avatar');
    var ball = $('#ball');
    var result = $('#result');
    
    var avatarWidth = avatar.width();
    var avatarHeight = avatar.height();
    var ballWidth = ball.width();
    var ballHeight = ball.height();
  
    var maxX = 1920 - ballWidth;
    var maxY = 1200 - ballHeight;
  
    var startX = Math.floor(Math.random() * maxX);
    var startY = 0;
  
    var directionX = Math.random() > 0.5 ? 1 : -1;
    var directionY = 1;
  
    var speedX = Math.floor(Math.random() * 11) + 1;
    var speedY = Math.floor(Math.random() * 11) + 1;
  
    var accelerationX = 0.02;
    var accelerationY = 0.02;
  
    var startTime = new Date().getTime(); // 시작 시간 저장
    var survivedTime = 0; // 버틴 시간 초기화
  
    ball.css({
      left: startX,
      top: startY
    });
  
    $(document).mousemove(function(event) {
      var avatarX = event.pageX - 100;
      avatar.css('left', avatarX);
    });
  
    function animateBall() {
      var currentTime = new Date().getTime(); // 현재 시간 가져오기
      var elapsedTime = (currentTime - startTime) / 1000; // 경과 시간 계산
  
      var currentX = parseInt(ball.css('left'));
      var currentY = parseInt(ball.css('top'));
  
      speedX += accelerationX;
      speedY += accelerationY;
  
      var newX = currentX + (speedX * directionX);
      var newY = currentY + (speedY * directionY);
  
      if (newX > maxX || newX < 0) {
        directionX *= -1;
      }
      if (newY > maxY || newY < 0) {
        directionY *= -1;
      }
      
      if (newY >= maxY && survivedTime === 0) {
        speedY = 0;
        directionY = 0;
        survivedTime = elapsedTime; // 버틴 시간 저장
      }
  
      var ballRect = ball[0].getBoundingClientRect();
      var avatarRect = avatar[0].getBoundingClientRect();
  
      if (
        ballRect.right >= avatarRect.left &&
        ballRect.left <= avatarRect.right &&
        ballRect.bottom >= avatarRect.top &&
        ballRect.top <= avatarRect.bottom
      ) {
        var collisionX = (ballRect.left + ballRect.right) / 2;
        var collisionY = (ballRect.top + ballRect.bottom) / 2;
  
        var avatarCenterX = (avatarRect.left + avatarRect.right) / 2;
        var avatarCenterY = (avatarRect.top + avatarRect.bottom) / 2;
  
        directionX = collisionX < avatarCenterX ? -1 : 1;
        directionY = collisionY < avatarCenterY ? -1 : 1;
      }
  
      ball.css({
        left: newX,
        top: newY
      });
  
      if (survivedTime === 0) {
        requestAnimationFrame(animateBall);
      } else {
        result.text("Point : " + Math.round(survivedTime) + " point"); // 버틴 시간 표시
      
      }
  
    }
  
    animateBall();
  });

function ChangeImage(strImage) {
        $("#ball").attr("src", strImage);
    }

    setTimeout(function() {
        ChangeImage('ball2.png');
    }, 5 * 1000);
