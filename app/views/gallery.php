<?php
  $pageTitle = "Gallery";
  $body_class = "gallery-page";
?>

<!-- Start Page Content -->
<section class="gallery main-section">
  <div class="container">
    <div class="columns column-12">
      <h1>Gallery</h1>
    </div>

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
