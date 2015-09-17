<?php
$page_title = "Contact Us";
$body_class = "contact-page";
$contact_page = true;
?>

<section class="contact-us main-section">
  <h1>Get In Touch</h1>

  <section id="map" class="map"></section>

  <div class="container">
    <section class="general-contact">
      <h2>Send Us a Message or Stop On By</h2>

      <div class="contact-page-text">
        <a href="http://maps.google.com/?q=Profile+Laser+LLC+2138+N+Interstate+Ave+Portland+OR+97227" target="_blank">
          <span class="icon-location"></span>
          <span class="contact-text">2138 N. Interstate Ave<br>Portland, OR 97227</span>
        </a>
      </div>

      <div class="contact-page-text">
        <span class="icon-phone"></span>
        <span class="contact-text">(503) 292-6044</span>
      </div>

      <div class="contact-page-text">
        <span class="icon-print"></span>
        <span class="contact-text">Fax: (503) 284-0016</span>
      </div>

      <div class="contact-page-text">
        <a href="mailto:&#115;&#97;&#108;&#101;&#115;&#64;&#112;&#114;&#111;&#102;&#105;&#108;&#101;&#108;&#97;&#115;&#101;&#114;&#46;&#99;&#111;&#109;">
          <span class="icon-mail-alt"></span>
          <span class="contact-text">&#115;&#97;&#108;&#101;&#115;&#64;&#112;&#114;&#111;&#102;&#105;&#108;&#101;&#108;&#97;&#115;&#101;&#114;&#46;&#99;&#111;&#109;</span>
        </a>
      </div>
    </section>

    <section class="contact-form">
      <ul id="errors">
        <li id="info">Sorry, there were problems with your form submission:</li>
      </ul>
      <p id="success">Thanks for your message! We will get back to you ASAP.</p>
      <form id="contact_form" method="post" action="contact_form.ajax.php">
        <div class="anti_robot">
          <label for="name">This field is to protect against robots. If you are
            a human, simply leave this field blank.</label>
          <input type="text" id="name" name="name">
        </div>

        <div>
          <label for="real_name">Name: <span class="required">*</span></label>
          <input type="text" id="real_name" name="real_name" required>
        </div>

        <div>
          <label for="company">Company:</label>
          <input type="text" id="company" name="company">
        </div>

        <div>
          <label for="email">Email: <span class="required">*</span></label>
          <input type="email" id="email" name="email" required>
        </div>

        <div>
          <label for="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone">
        </div>

        <div class="message_div">
          <label for="message">Message: <span class="required">*</span></label>
          <textarea id="message" name="message" required data-minlength="20"></textarea>
        </div>

        <div>
          <label for="location">Location (City & State): <span class="required">*</span></label>
          <input type="text" id="location" name="location" required>
        </div>

        <div id="loading"></div>
        <p class="req-field-desc"><span class="required">*</span> indicates a required field</p>

        <input type="submit" value="Submit" id="submit" class="button">
      </form>
    </section>
  </div>
</section>

<?php setoradd($javascript_content, "new Profile.GoogleMap();"); ?>
