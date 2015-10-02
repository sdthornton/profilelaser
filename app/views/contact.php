<?php
$page_title = 'Contact Us';
$body_class = 'contact-page';
?>

<section class="contact-us main-section">
  <div class="container">
    <h1 class="columns column-12">Get In Touch</h1>
  </div>

  <section id="map" class="map"></section>

  <div class="container">
    <section class="text-left columns column-4">
      <h2>
        Send Us a Message
        <span class="contact-subtitle-break">or Stop On By</span>
      </h2>

      <div class="contact-page-text">
        <a href="http://maps.google.com/?q=Profile+Laser+LLC+2138+N+Interstate+Ave+Portland+OR+97227" target="_blank">
          <span class="icon-location"></span>
          <span class="contact-text">
            524 N Tillamook St, #104<br>
            Portland, OR 97227
          </span>
        </a>
      </div>

      <div class="contact-page-text">
        <span class="icon-clock"></span>
        <span class="contact-text">8:00am - 4:00pm, M-F
      </div>

      <div class="contact-page-text">
        <span class="icon-phone"></span>
        <span class="contact-text">(971) 271-7355</span>
      </div>

      <div class="contact-page-text">
        <span class="icon-fax"></span>
        <span class="contact-text">Fax: (503) 284-0016</span>
      </div>

      <div class="contact-page-text">
        <a href="mailto:&#115;&#97;&#108;&#101;&#115;&#64;&#112;&#114;&#111;&#102;&#105;&#108;&#101;&#108;&#97;&#115;&#101;&#114;&#46;&#99;&#111;&#109;">
          <span class="icon-email"></span>
          <span class="contact-text">&#115;&#97;&#108;&#101;&#115;&#64;&#112;&#114;&#111;&#102;&#105;&#108;&#101;&#108;&#97;&#115;&#101;&#114;&#46;&#99;&#111;&#109;</span>
        </a>
      </div>
    </section>

    <section class="contact-form columns column-8 collapse">
      <div id="errors" class="columns columns-12 text-left">
        <h5 class="small-margin text-red">Sorry, there were problems with your form submission:</h5>
        <ul class="errors-list text-red"></ul>
      </div>
      <p id="success" class="columns column-12 text-blue text-left">Thanks for
        your message! We will get back to you ASAP.</p>
      <p id="fail" class="columns column-12 text-red text-left">It looks like
        there was an issue on our end. Try submitting your message again in a
        minute or two.</p>
      <form id="contact_form" method="post" action="contact_form" novalidate>
        <div class="anti-robot">
          <label for="name">This field is to protect against robots. If you are
            a human, simply leave this field blank.</label>
          <input type="text" id="name" name="name">
        </div>

        <div class="columns column-6">
          <label for="real_name">Name: <span class="required">*</span></label>
          <input type="text" id="real_name" name="real_name" required>
        </div>

        <div class="columns column-6">
          <label for="company">Company:</label>
          <input type="text" id="company" name="company">
        </div>

        <div class="columns column-6">
          <label for="email">Email: <span class="required">*</span></label>
          <input type="email" id="email" name="email" required>
        </div>

        <div class="columns column-6">
          <label for="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone">
        </div>

        <div class="columns column-12">
          <label for="message">Message: <span class="required">*</span></label>
          <textarea id="message" name="message" required data-minlength="20"></textarea>
        </div>

        <div class="columns column-6 pull-6">
          <label for="location">Location (City & State): <span class="required">*</span></label>
          <input type="text" id="location" name="location" required>
        </div>

        <div class="columns column-6 text-left">
          <p class="req-field-desc"><span class="required">*</span> indicates a required field</p>
          <div id="loading"></div>
        </div>

        <div class="columns column-12 text-right">
          <input type="submit" value="Contact Us" id="submit" class="button">
        </div>
      </form>
    </section>
  </div>
</section>

<?php setoradd($javascript_content, 'new Profile.GoogleMap(); new Profile.Contact();'); ?>
