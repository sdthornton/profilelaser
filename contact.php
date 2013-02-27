<?php include '_head.php'; ?>

<body class="contact_page">

  <?php include '_header.php'; ?>


  <!-- Start Page Content -->
  <section class="contact_us bottom_section <?php if($mobile == true): ?>mobile_bottom_section<?php endif ?>">
    <h1>Get In Touch</h1>

    <section id="map" class="map"></section>

    <div class="container">
      <section class="general_contact">
        <h2>Send Us a Message or Stop On By</h2>

        <div class="contact_page_text"><a href="http://maps.google.com/?q=2138+N+Interstate+Ave+Portland+OR+97227" target="_blank"><span class="icon-location"></span><span class="contact_text">2138 N. Interstate Ave<br>Portland, OR 97227</span></a></div>

        <div class="contact_page_text"><a href="tel:5032926044" class="tel_link"><span class="icon-phone"></span><span class="contact_text">(503) 292-6044</span></a></div>

        <div class="contact_page_text"><span class="icon-print"></span><span class="contact_text">Fax: (503) 284-0016</span></div>

        <div class="contact_page_text"><a href="mailto:&#115;&#97;&#108;&#101;&#115;&#64;&#112;&#114;&#111;&#102;&#105;&#108;&#101;&#108;&#97;&#115;&#101;&#114;&#46;&#99;&#111;&#109;"><span class="icon-mail-alt"></span><span class="contact_text">&#115;&#97;&#108;&#101;&#115;&#64;&#112;&#114;&#111;&#102;&#105;&#108;&#101;&#108;&#97;&#115;&#101;&#114;&#46;&#99;&#111;&#109;</span></a></div>
      </section>

      <section class="contact_form">
        <?php
          //init variables
          $cf = array();
          $sr = false;
          
          if(isset($_SESSION['cf_returndata'])){
            $cf = $_SESSION['cf_returndata'];
            $sr = true;
          }
        ?>
        <ul id="errors" class="<?php echo ($sr && !$cf['form_ok']) ? 'visible' : ''; ?>">
            <li id="info">Sorry, there were problems with your form submission:</li>
            <?php 
            if(isset($cf['errors']) && count($cf['errors']) > 0) :
              foreach($cf['errors'] as $error) :
            ?>
            <li><?php echo $error ?></li>
            <?php
              endforeach;
            endif;
            ?>
        </ul>
        <p id="success" class="<?php echo ($sr && $cf['form_ok']) ? 'visible' : ''; ?>">Thanks for your message! We will get back to you ASAP.</p>
        <form id="contact_form" method="post" action="contact_form.php">

          <div class="anti_robot"><label for="name">This field is to protect against robots. If you are a human, simply leave this field blank.</label>
          <input type="text" id="name" name="name" value="<?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['nospam'] : '' ?>"></div>

          <div><label for="real_name">Name: <span class="required">*</span></label>
          <input type="text" id="real_name" name="real_name" value="<?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['name'] : '' ?>" required></div>

          <div><label for="company">Company:</label>
          <input type="text" id="company" name="company" value="<?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['company'] : '' ?>"></div>

          <div><label for="email">Email: <span class="required">*</span></label>
          <input type="email" id="email" name="email" value="<?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['email'] : '' ?>" required></div>

          <div><label for="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" value="<?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['phone'] : '' ?>"></div>

          <div class="message_div"><label for="message">Message: <span class="required">*</span></label>
          <textarea id="message" name="message" required data-minlength="20"><?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['message'] : '' ?></textarea></div>

          <div><label for="location">Location (City & State): <span class="required">*</span></label>
          <input type="text" id="location" name="location" value="<?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['location'] : '' ?>" required></div>

          <span id="loading"></span>
          <p class="req-field-desc"><span class="required">*</span> indicates a required field</p>

          <input type="submit" value="Submit" id="submit" class="button">
        </form>
        <?php unset($_SESSION['cf_returndata']); ?>
      </section>
    </div>
  </section>
  <!-- End Page Content -->


  <?php include '_footer.php'; ?>

</body>
</html>
