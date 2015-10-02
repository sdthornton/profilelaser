<?php
$body_class = 'home-page';
?>

<section class="banner">
  <h1 class="banner__heading text-left">
    Precision Laser Cutting
    <span class="banner__subheading">Serving Portland Oregon</span>
  </h1>
</section>

<section class="clients">
  <div class="container">
    <div class="columns column-12">
      <img src="<?= image_src('client_logos.png') ?>"
           srcset="<?= image_src('client_logos@2x.png') ?> 2x"
           alt="Names of companies we have worked with, including GE, Intel,
           Siemens, Tri-Met, City of Portland, PDX Airport, ODOT, Square D and
           the Rose Quarter."
           class="clients__img"
           width="100%" height="auto">
    </div>
  </div>
</section>

<section class="about main-section">
  <div class="container">
    <div class="columns column-3 text-left">
      <h1 class="text-blue">Who We Are</h1>
    </div>
    <div class="columns column-9 text-left">
      <p>Profile Laser is a family-owned and operated precision laser cutting
      service. We specialize in cutting and etching stainless steel and carbon
      steel and cutting aluminum for a diverse set of customers. From lighting
      fixtures to electrical enclosures to craft brewing tanks, we take care of
      the needs of our customers. We work efficiently and effectively to maintain
      quick turn-around times and tight tolerances.</p>

      <p>Profile laser began in 2011 and boasts a team with extensive background
      in the laser-cutting industry. We’re experienced designers, programmers
      and operators and we’ll use our talents to produce the best possible
      product within the design specifications and time restrictions given.
      We’re proud of our high quality work and we look forward to seeing what
      we can create for you!</p>

      <a href="contact" class="button pull-right">Work With Us</a>
    </div>
  </div>
</section>

<section class="process main-section">
  <div class="container">
    <div class="columns column-6 push-3">
      <h1 class="no-margin">What We Do</h1>
      <h5 class="text-blue">And Why We're the Best</h5>

      <p>The laser cutting process starts with you. At Profile Laser, we make sure
      we pay attention to every customer no matter the size of the job.</p>
    </div>

    <div class="columns column-4">
      <div id="design" class="process-icon"></div>

      <h3 class="small-margin">Personal Design</h3>
      <h5>We’ll help you develop a design that is right for your needs.</h5>

      <p>You’ll work 1-on-1 with a member of our team who is an expert working
      with CAD, understanding metal properties, and knowing the capabilities of
      our machine. We can develop prototypes or jump straight into
      production.</p>
    </div>

    <div class="columns column-4">
      <div id="production" class="process-icon"></div>

      <h3 class="small-margin">Efficient Production</h3>
      <h5>We'll make sure your project is done quickly and is done well.</h5>

      <p>The design will then go to our trained operator who will begin the
      cutting. Our new fiber laser and pallet exchanger allow for efficient processing
      so your job will be finished quickly and precisely.</p>
    </div>

    <div class="columns column-4">
      <div id="efficient" class="process-icon"></div>

      <h3 class="small-margin">Fast Turnaround</h3>
      <h5>Before you can say, "Best laser cutting company around."</h5>

      <p>We boast some of the fastest turnaround times and most accurate parts
      in the industry. When your project is finished we will sort parts for
      customer pick-up or package them carefully for shipment.</p>
    </div>
  </div>
</section>

<section class="why main-section">
  <div class="container">
    <div class="columns column-6 push-3">
      <h1 class="no-margin">Why Laser Cutting?</h1>
      <h5>What's So Great About It?</h5>

      <p>Laser cutting might be just what your project needs! Laser cutting offers
      an accurate and affordable way to produce almost any shape in sheet metal or
      plate.</p>
    </div>

    <div class="columns column-4">
      <div id="afford" class="why-icon"></div>

      <h3 class="small-margin">Affordability</h3>
      <p>Because of high feed rates, efficient layout of parts on the sheet, no
      special tooling requirements, and very little material wasted, pieces can
      be cut at a low cost.</p>
    </div>

    <div class="columns column-4">
      <div id="accuracy" class="why-icon"></div>

      <h3 class="small-margin">Accuracy</h3>
      <p>Lasers are remarkably accurate. Your parts can be cut within a
      thousandth of an inch and the first part will be exactly like the last,
      whether cutting two pieces or thousands.</p>
    </div>

    <div class="columns column-4">
      <div id="flexibility" class="why-icon"></div>

      <h3 class="small-margin">Flexibility</h3>
      <p>A laser is equally well-suited for prototyping or production, cutting
      or etching. A laser can be compared to an artist’s brush&mdash;in capable
      hands it’s limited only by the imagination.</p>
    </div>
  </div>
</section>

<section class="talk main-section">
  <div class="talk-bg"></div>
  <div class="container">
    <div class="icon-left-open talk-arrow" data-talk="next"></div>
    <div class="icon-right-open talk-arrow--right" data-talk="prev"></div>

    <div class="columns column-10 push-1">
      <h1>Our Happy Clients</h1>

      <div id="talk_box_container" class="talk-box-container">
        <div class="talk-box active-talk">
          <p>&ldquo;Profile Laser is a fantastic company that you can rely on to
          meet deadlines and provide a quality product every time. The Profile Laser
          team is always helpful and accommodating to our varying needs. The whole
          staff is a pleasure to work with!&rdquo;</p>
          <span class="pull-right">- Metalcraft Fabrication, Inc</span>
        </div>

        <div class="talk-box">
          <p>&ldquo;Profile Laser has turned out to be very instrumental in our
          success as a machining job shop. Profile Laser has continued to come
          through time and time again with quality, pricing and delivery. Profile
          Laser has shown to be a perfect fit to our budget and high-quality
          standards.&rdquo;</p>
          <span class="pull-right">- Hillcore Machine Inc</span>
        </div>

        <div class="talk-box">
          <p>&ldquo;I wanted to send a special note of thanks&hellip; The plaque
          that you created and prepared for us was just what [we] needed. We
          sincerely appreciate the efforts you put forth.&rdquo;</p>
          <span class="pull-right">- GE Energy</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="partners main-section">
  <div class="container">
    <div class="columns column-8 push-2">
      <h1>Our Partners</h1>

      <p>We have close partnerships with <a href="http://www.fouch.com/" target="_blank">
      Fouch Electric Mfg. Co.</a> and <a href="http://www.roymfg.com/" target="_blank">
      Roy Manufacturing</a> that allow us to provide fabrication services. If
      your lasered parts need to be welded, bent, tapped, punched or painted we
      have the time, means, and resources to take care of you.</p>

      <a href="http://www.fouch.com/" target="_blank" class="button">Visit Fouch</a>
      <a href="http://www.roymfg.com/" target="_blank" class="button">Visit Roy</a>
    </div>
  </div>
</section>

<?php setoradd($javascript_content, 'new Profile.Talk();'); ?>
