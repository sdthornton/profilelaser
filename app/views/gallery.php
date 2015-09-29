<?php
  $pageTitle = "Gallery";
  $body_class = "gallery-page";
?>

<!-- Start Page Content -->
<section class="gallery main-section">
  <div class="container">
    <div class="columns column-12">
      <h1>In the Shop</h1>
    </div>

    <div class="loader">
      <svg class="loader__circular">
        <circle class="loader__path"
                cx="50" cy="50" r="20"
                fill="none"
                stroke-width="2"
                stroke-miterlimit="10">
      </svg>
    </div>

    <p id="gallery_fail">Looks like there was an error populating our images.
    Try <a href="#" onclick="window.location = window.location.href; return false;">
    refreshing the page</a>.</p>

    <div id="gallery_images" class="gallery-images">
      <div class='gallery-image-wrap columns column-4'>
        <a href="#" class="gallery-image-link" target="_blank">
          <img src="" class="gallery-image">
        </a>
      </div>
    </div>
  </div>
</section>

<?php setoradd($javascript_content, "new Profile.PopulateGallery();"); ?>
