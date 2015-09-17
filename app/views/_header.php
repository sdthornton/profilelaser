<header>
  <div class="container container--full">
    <div class="columns column-12">
      <input type="checkbox" class="mobile_nav_check" id="mobile_nav_check">
      <label for="mobile_nav_check" class="toggle_mobile_nav" id="toggle_mobile_nav">
        <img src="<?= image_src('mobile_nav.png') ?>"
             srcset="<?= image_src('mobile_nav@2x.png') ?> 2x"
             width="60" height="60"
             alt="Profile Laser, LLC - The World's Greatest Laser Cutting Company
             - Operating in Portland, OR">
      </label>
      <div class="mobile_nav_wrapper">
        <nav class="mobile_nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>

      <span class="logo-container">
        <a href="/">
          <img src="<?= image_src('logo.svg') ?>" class="profile-logo">
        </a>
      </span>

      <nav class="desktop_nav">
        <ul>
          <li class="/home-link"><a href="/">Home</a></li>
          <li class="/gallery-link"><a href="gallery">Gallery</a></li>
          <li class="/contact-link"><a href="contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </div>
</header>
