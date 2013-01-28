<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Contact Us | Profile Laser - Excellent Laser Cutting Services | Portland, OR</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width">

  <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

  <!-- For serving Retina images with .htaccess -->
  <script>document.cookie='resolution='+Math.max(screen.width,screen.height)+("devicePixelRatio" in window ? ","+devicePixelRatio : ",1")+'; path=/';</script>

  <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600,800' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Raleway:300,400' rel='stylesheet' type='text/css'>

  <link rel="stylesheet" href="/css/main.css">
  <script src="/js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body class="contact_page">

  <?php include '_header.php'; ?>


  <!-- Start Page Content -->
  <section class="contact_us">
    <h1>Get In Touch</h1>

    <section id="map" class="map"></section>

    <div class="container">
      <section class="general_contact">
        <h2>Send Us a Message or Stop On By</h2>

        <a href="http://maps.google.com/?q=2138+N+Interstate+Ave+Portland+OR+97227" target="_blank"><span class="icon-map-marker"></span><span class="contact_text">2138 N. Interstate Ave<br>Portland, OR 97227</span></a><br>

        <a href="tel:5032926044" class="tel_link"><span class="icon-phone"></span><span class="contact_text">(503) 292-6044</span></a><br>

        <a href="mailto:&#115;&#97;&#108;&#101;&#115;&#64;&#112;&#114;&#111;&#102;&#105;&#108;&#101;&#108;&#97;&#115;&#101;&#114;&#46;&#99;&#111;&#109;"><span class="icon-envelope-alt"></span><span class="contact_text">&#115;&#97;&#108;&#101;&#115;&#64;&#112;&#114;&#111;&#102;&#105;&#108;&#101;&#108;&#97;&#115;&#101;&#114;&#46;&#99;&#111;&#109;</span></a>
      </section>

      <section class="contact_form">
        <?php
          //init variables
          $cf = array();
          $sr = false;
          if(isset($_SESSION['cf_returndata'])) {
            $cf = $_SESSION['cf_returndata'];
            $sr = true;
          }
        ?>

        <ul id="errors" class="<?php echo ($sr && $cf['form_ok']) ? 'visible' : ''; ?>">
          <li id="error_info">Sorry, there were some problems with your submission:</li>
          <?php
          if(isset($cf['errors']) && count($cf['errors']) > 0) :
            foreach ($cf['errors'] as $error) :
          ?>
          <li><?php echo $error ?></li>
          <?php
            endforeach;
          endif;
          ?>
        </ul>

        <p id="success" class="<?php echo ($sr && $cf['form_ok']) ? 'visible' : ''; ?>">Thanks for your message! We will get back to you ASAP!</p> 

        <form id="contact_form" method="post" action="contact_form.php">

          <div class="anti_robot"><label for="name">This field is to protect against robots. If you are a human, simply leave this field blank.</label>
          <input type="text" id="name" name="name"></div>

          <div><label for="real_name">Name: <span class="required">*</span></label>
          <input type="text" id="real_name" name="real_name" required></div>

          <div><label for="company">Company:</label>
          <input type="text" id="company" name="company"></div>

          <div><label for="email">Email: <span class="required">*</span></label>
          <input type="email" id="email" name="email" required></div>

          <div><label for="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone"></div>

          <div class="message_div"><label for="message">Message: <span class="required">*</span></label>
          <textarea id="message" name="message" required data-minlength="20"></textarea></div>

          <div><label for="location">Location (City and State): <span class="required">*</span></label>
          <input type="text" id="location" name="location" required></div>

          <span class="loading"></span>

          <input type="submit" value="Submit" id="submit" class="button">

          <p class="req-field-desc"><span class="required">*</span> indicates a required field</p>
        </form>
      </section>
    </div>
  </section>
  <!-- End Page Content -->


  <?php include '_footer.php'; ?>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="/js/vendor/jquery-1.8.3.min.js"><\/script>')</script>

  <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDKYaeLXuKtODPEm_6sQsdfYRpsaCovgyk&sensor=false"></script>
  <script src="/js/plugins.js"></script>
  <script src="/js/main.js"></script>

  <!-- Google Analytics -->
  <script>
    var _gaq=[['_setAccount','UA-37457373-1'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
</body>
</html>
