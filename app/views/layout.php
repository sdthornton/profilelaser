<!doctype html>
<html class="no-js hover">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Profile Laser - Precision Laser Cutting Services | Portland, OR</title>
  <meta name="description" content="Profile Laser is a family-owned and operated
  laser cutting service. We specialize in cutting and etching stainless steel
  and carbon steel and cutting aluminum for a diverse set of customers. From
  lighting fixtures to electrical enclosures to craft brewing tanks, we take
  care of the needs of our customers. Proudly serving Portland and the greater
  Portland area including Vancouver, Beaverton, Gresham, Hillsboro, Milwaukie,
  Lake Oswego, Oregon City, Fairview, Wood Village, Troutdale, Tualatin, Tigard,
  West Linn, Camas, and Washougal.">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="apple-touch-icon" href="apple-touch-icon.png">

  <script>
  WebFontConfig = {
    google: { families: ['Lato:400,700', 'Inconsolata'] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
  </script>

  <?= stylesheet('vendor/normalize'); ?>
  <?= stylesheet('application'); ?>
  <?= javascript('vendor/modernizr'); ?>
</head>
<body class="<?= $body_class ?>">
  <!--[if lt IE 9]>
    <style>.page-header { top: 2.5rem; } main { margin-top: 6.5rem; }</style>
    <p class="browserupgrade">You are using an <strong>outdated</strong>
    browser. Please <a href="http://browsehappy.com/">upgrade your browser</a>
    to improve your experience.</p>
  <![endif]-->
  <div class="no-js-warning">
    For a full browsing experience, you'll need to make sure javascript is
    enabled on your browser.
  </div>

  <?php include(ROOT . DS . 'app' . DS . 'views' . DS . '_header.php') ?>
  <main>
    <?= $view_content; ?>
  </main>
  <?php include ROOT . DS . 'app' . DS . 'views' . DS . '_footer.php'; ?>

  <?= javascript('application'); ?>
  <script><?= issetor($javascript_content); ?></script>
</body>
</html>
