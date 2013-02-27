<?php include '_head.php'; ?>

<body class="gallery_page">

  <?php include '_header.php'; ?>


  <!-- Start Page Content -->
  <section class="gallery bottom_section <?php if($mobile == true): ?>mobile_bottom_section<?php endif ?>">
    <div class="container">
      <h1>Gallery</h1>
      
      <!-- Pure CSS Loading Image -->
      <p class="loading_error">There seems to be an issue loading the images. If you have a slow internet connection, you might just keep waiting. Otherwise, try <a href="javascript:void(0)" onclick="window.location.href = 'gallery'; window.location.reload(true);">refreshing</a> the page.</p>
      <img class="loader" src="img/loader.gif" width="64" height="64" alt="Loading images, please wait">

      <section id="gallery_images" class="gallery_images">
      </section>
    </div>
  </section>
  <!-- End Page Content -->


  <?php include '_footer.php'; ?>

</body>
</html>