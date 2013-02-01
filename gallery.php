<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Gallery | Profile Laser - Excellent Laser Cutting Services | Portland, OR</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width">

  <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

  <!-- For serving Retina images with .htaccess -->
  <script>document.cookie='resolution='+Math.max(screen.width,screen.height)+("devicePixelRatio" in window ? ","+devicePixelRatio : ",1")+'; path=/';</script>

  <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600,800' rel='stylesheet' type='text/css'>

  <link rel="stylesheet" href="css/main.css">
  <script src="js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body class="gallery_page">

  <?php include '_header.php'; ?>


  <!-- Start Page Content -->
  <section class="gallery bottom_section">
    <div class="container">
      <h1>Gallery</h1>
      
      <!-- Pure CSS Loading Image -->
      <p class="loading_error">There seems to be an issue loading the images. If you have a slow internet connection, you might just keep waiting. Otherwise, try <a href="javascript:void(0)" onclick="window.location.href = 'gallery'; window.location.reload(true);">refreshing</a> the page.</p>
      <img class="loader" src="img/loader.gif" width="64" height="64" alt="Loading images, please wait">

      <section id="gallery_images">
      </section>
    </div>
  </section>
  <!-- End Page Content -->


  <?php include '_footer.php'; ?>

</body>
</html>