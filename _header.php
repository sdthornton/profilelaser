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

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title><?php echo $pageTitle; ?>Profile Laser - Precision Laser Cutting Services | Portland, OR</title>
  <meta name="description" content="Profile Laser is a family-owned and operated laser cutting service. We specialize in cutting and etching stainless steel and carbon steel and cutting aluminum for a diverse set of customers. From lighting fixtures to electrical enclosures to craft brewing tanks, we take care of the needs of our customers. We work efficiently and effectively to maintain quick turn-around times and tight tolerances.">
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

  <link rel="shortcut icon" href="favicon.ico">
  <link rel="apple-touch-icon-precomposed" href="apple-touch-icon-precomposed.png">
  <link rel="apple-touch-icon-precomposed" href="apple-touch-icon-72x72-precomposed.png">
  <link rel="apple-touch-icon-precomposed" href="apple-touch-icon-114x114-precomposed.png">
  <link rel="apple-touch-icon-precomposed" href="apple-touch-icon-144x144-precomposed.png">

  <!-- For serving Retina images with .htaccess -->
  <!--<script>document.cookie='resolution='+Math.max(screen.width,screen.height)+("devicePixelRatio" in window ? ","+devicePixelRatio.toFixed(1) : ",1.0")+'; path=/';</script>-->
  <script>(function(w){var dpr=((w.devicePixelRatio===undefined)?1:w.devicePixelRatio);if(!!w.navigator.standalone){var r=new XMLHttpRequest();r.open('GET','/retinaimages.php?devicePixelRatio='+dpr,false);r.send()}else{document.cookie='devicePixelRatio='+dpr+'; path=/'}})(window)</script>

  <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600,800' rel='stylesheet' type='text/css'>

  <link rel="stylesheet" href="css/main.20130302.css">
  <script src="js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body class="<?php echo $bodyClass; ?>">
<noscript><style id="devicePixelRatio" media="only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 144dpi)">#devicePixelRatio{background-image:url("/retinaimages.php?devicePixelRatio=2")}</style></noscript>

<!--[if lt IE 7]>
  <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
<![endif]-->
<div class="no-js-warning">For a full browsing experience, you'll need to make sure javascript is enabled on your browser.</div>
  
  <input type="checkbox" class="mobile_nav_check" id="mobile_nav_check">
  <nav class="mobile_nav">
    <ul>
      <li class="home_link"><a href="/">Home</a></li>
      <li class="gallery_link"><a href="gallery">Gallery</a></li>
      <li class="contact_link"><a href="contact">Contact</a></li>
    </ul>
  </nav>
  
  <header>
    <div class="container">
        <label id="fastclick" for="mobile_nav_check" class="toggle_mobile_nav" id="toggle_mobile_nav"><img src="img/mobile_nav.png" width="60" height="60" alt="Profile Laser, LLC - The World's Greatest Laser Cutting Company - Operating in Portland, OR"></label>

      <span class="logo_container"><a href="index"><img src="img/logo.png" width="300" height="50" class="profile_logo"></a></span>

      <nav class="desktop_nav">
        <ul>
          <li class="home_link"><a href="/">Home</a></li>
          <li class="gallery_link"><a href="gallery">Gallery</a></li>
          <li class="contact_link"><a href="contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>