<?php
function detect_mobile()
{
    if(preg_match('/(alcatel|amoi|android|avantgo|blackberry|benq|cell|cricket|docomo|elaine|htc|iemobile|iphone|ipad|ipaq|ipod|j2me|java|midp|mini|mmp|mobi|motorola|nec-|nokia|palm|panasonic|philips|phone|playbook|sagem|sharp|sie-|silk|smartphone|sony|symbian|t-mobile|telus|up\.browser|up\.link|vodafone|wap|webos|wireless|xda|xoom|zte)/i', $_SERVER['HTTP_USER_AGENT']))
        return true;
 
    else
        return false;
}

$mobile = detect_mobile();
?>

<!--[if lt IE 9]>
  <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
<![endif]-->

<?php if($mobile !== true): ?>
  <header>
    <div class="container">
      <a href="index"><img src="img/logo.png" width="300" height="50"></a>

      <nav>
        <ul>
          <li id="home_link"><a href="index">Home</a></li>
          <li id="gallery_link"><a href="gallery">Gallery</a></li>
          <li id="contact_link"><a href="contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
<?php else: ?>
  <header>
    <div class="container">
      <a href="index"><img src="img/logo.png" width="300" height="50"></a>

      <nav>
        <ul>
          <li id="home_link"><a href="index">Home</a></li>
          <li id="gallery_link"><a href="gallery">Gallery</a></li>
          <li id="contact_link"><a href="contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
<?php endif; ?>