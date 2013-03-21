<?php
  $bodyClass = "home_page";
  include '_header.php';
?>

  <!-- Start Page Content -->
  <section class="banner loading">
    <div class="banner_prev scroll_banner"></div>
    <div id="banner_img_container"><img src="img/banner2.jpg" class="banner_img" id="banner_img" width="2400" height="400" alt="A site banner - showing off Profile Laser's work and equipment."></div>
    <div class="banner_next scroll_banner"></div>
  </section>

  <section class="clients">
    <img src="img/client_logos.png" width="964" height="60" alt="Names of companies we have worked with, including GE, Intel, Siemens, Tri-Met, City of Portland, PDX Airport, ODOT, Square D and the Rose Quarter.">
  </section>

  <section class="about">
    <div class="container">
      <h1>Who<br>We<br>Are</h1>
      <p>Profile Laser is a family-owned and operated precision laser cutting service. We specialize in cutting and etching stainless steel and carbon steel and cutting aluminum for a diverse set of customers. From lighting fixtures to electrical enclosures to craft brewing tanks, we take care of the needs of our customers. We work efficiently and effectively to maintain quick turn-around times and tight tolerances.</p>

      <p>Profile laser began in 2011 but our team has an extensive background in the laser-cutting industry. We’re experienced designers, programmers and operators and we’ll use our talents to produce the best possible product within the design specifications and time restrictions given. We’re proud of our high quality work and we look forward to seeing what we can create for you!</p>

      <a href="contact" class="button">Contact Us</a>
    </div>
  </section>

  <section class="process">
    <div class="container">
      <h1>What We Do<br><span class="sub_head">And Why We're the Best</span></h1>

      <p>The laser cutting process starts with you. At Profile Laser, we make sure we pay attention to every customer no matter the size of the job. </p>

      <section class="three_column">
        <div id="design" class="process_icon"></div>

        <h2>Personal Design</h2>
        <h3>We’ll help you develop a design that is right for your needs.</h3>

        <p>You’ll work 1-on-1 with a member of our team who is an expert working with CAD, understanding metal properties, and knowing the capabilities of our machine. We can develop prototypes or jump straight into production.</p>
      </section>

      <section class="three_column">
        <div id="production" class="process_icon"></div>

        <h2>Efficient Production</h2>
        <h3>We'll make sure your project is done quickly and is done well.</h3>

        <p>The design will then go to our trained operator who will begin the cutting. Our new laser and pallet exchanger allow for efficient processing so your job will be finished quickly and precisely.</p>
      </section>

      <section class="three_column">
        <div id="efficient" class="process_icon"></div>

        <h2>Fast Turnaround</h2>
        <h3>Before you can say, "Best laser cutting company around."</h3>

        <p>We boast some of the fastest turnaround times and most accurate parts in the industry. When your project is finished we will sort parts for customer pick-up or package them carefully for shipment.</p>
      </section>
    </div>
  </section>

  <section class="why">
    <div class="container">
      <h1>Why Laser Cutting?<br><span class="sub_head">What's So Great About It?</span></h1>
      <p>Laser cutting might be just what your project needs! Laser cutting offers an accurate and affordable way to produce almost any shape in sheet metal or plate.</p>

      <section class="three_column">
        <div id="afford" class="why_icon"></div>

        <h2>Affordability</h2>
        <p>Because of high feed rates, efficient layout of parts on the sheet, no special tooling requirements, and very little material wasted, pieces can be cut at a low cost.</p>
      </section>

      <section class="three_column">
        <div id="accuracy" class="why_icon"></div>

        <h2>Accuracy</h2>
        <p>Lasers are remarkably accurate. Your parts can be cut within a thousandth of an inch and the first part will be exactly like the last, whether cutting two pieces or thousands.</p>
      </section>

      <section class="three_column">
        <div id="flexibility" class="why_icon"></div>

        <h2>Flexibility</h2>
        <p>A laser is equally well-suited for prototyping or production, cutting or etching. A laser can be compared to an artist’s brush&mdash;in capable hands it’s limited only by the imagination.</p>
      </section>
    </div>
  </section>

  <section class="talk">
    <h1>Our Happy Clients</h1>

    <div id="talk_box_container" class="container">
      <div class="talk_box">
        <p>&ldquo;Profile Laser has exceeded our expectations in every way possible, from the design of the mounting systems we need for our LED lighting to delivery of the finished product, we couldn't be better served. Profile Laser has won our business on every level.&rdquo;</p>
        <span>- Olino Energy</span>
      </div>
      
      <div class="talk_box">
        <p>&ldquo;Profile Laser is a fantastic company that you can rely on to meet deadlines and provide a quality product every time. The Profile Laser team is always helpful and accommodating to our varying needs. The whole staff is a pleasure to work with!&rdquo;</p>
        <span>- Metalcraft Fabrication, Inc</span>
      </div>
      
      <div class="talk_box">
        <p>&ldquo;Profile Laser has turned out to be very instrumental in our success as a machining job shop. Profile Laser has continued to come through time and time again with quality, pricing and delivery. Profile Laser has shown to be a perfect fit to our budget and high-quality standards.&rdquo;</p>
        <span>- Hillcore Machine Inc</span>
      </div>

      <div class="talk_box">
        <p>&ldquo;I wanted to send a special note of thanks&hellip; The plaque that you created and prepared for us was just what [we] needed. We sincerely appreciate the efforts you put forth.&rdquo;</p>
        <span>- GE Energy</span>
      </div>
    </div>
  </section>

  <section class="partners bottom_section <?php if($mobile == true): ?>mobile_bottom_section<?php endif ?>">
    <div class="container">
      <h1>Our Partners</h1>

      <p>We have close partnerships with <a href="http://www.fouch.com/">Fouch Electric Mfg. Co.</a> and <a href="http://www.roymfg.com/">Roy Manufacturing</a> that allow us to provide fabrication services. If your laser parts need to be welded, bent, tapped, punched or painted we have the resources to take care of you.</p><br>

      <a href="http://www.fouch.com/" target="_blank" class="button">Visit Fouch</a>
      <a href="http://www.roymfg.com/" target="_blank" class="button">Visit Roy</a>
    </div>
  </section>
  <!-- End Page Content -->

  <?php include '_footer.php'; ?>

</body>
</html>
