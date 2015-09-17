<?php
if (isset($_POST)) {

  # Form validation vars
  $form_ok = true;
  $errors = array();

  # Sumbission data
  $ipaddress = $_SERVER['REMOTE_ADDR'];
  $date = date('d/m/Y');
  $time = date('H:i:s');

  # Form data
  $to = "sales@profilelaser.com";
  $from = $_POST['email'];
  $nospam = $_POST['name'];
  $name = $_POST['real_name'];
  $company = $_POST['company'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $message = $_POST['message'];
  $location = $_POST['location'];

  # Validate form data
  if (!empty($nospam)) {
    $form_ok = false;
    $errors[] = "Sorry robot, no spamming for you today! If you are not a robot, but are in fact human, and you are seeing this error, it means you have accidentally filled out our hidden anti spam field. Simply leave that blank and try to resubmit the form.";
  }

  if (empty($name)) {
    $form_ok = false;
    $errors[] = "You have not entered a name";
  }

  if (empty($email)) {
    $form_ok = false;
    $errors[] = "You have not entered an email address";
  } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) { # Validate email address is valid
    $form_ok = false;
    $errors[] = "You have not entered a valid email address";
  }

  if (empty($message)) {
    $form_ok = false;
    $errors[] = "You have not entered a message";
  } elseif(strlen($message) < 20) {
    $form_ok = false;
    $errors[] = "Your message must be greater than 20 characters";
  }

  if (empty($location)) {
    $form_ok = false;
    $errors[] = "Please enter your location (just the city and state)";
  }

  if (empty($company)) {
    $company = 'None provided';
  }

  if (empty($phone)) {
    $phone = 'None provided';
  }

  # Send email if all is ok
  if ($form_ok) {
    $headers = "From: {$from}" . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    $emailbody = "<p><i>You have recieved a new message from the enquiries form on your website.</i></p>
                  <p><strong>Name:</strong> {$name}<br>
                  <strong>Company:</strong> {$company}<br>
                  <strong>Email Address:</strong> {$email}<br>
                  <strong>Phone Number:</strong> {$phone}<br>
                  <strong>Location:</strong> {$location}</p>
                  <p><strong>Message: </strong> {$message}</p>";

    mail($to, "New Message via Website", $emailbody, $headers);
  }

  # What we need to return back to our form
  $return_data = array(
    'posted_form_data' => array(
        'nospam' => $nospam,
        'name' => $name,
        'company' => $company,
        'email' => $email,
        'phone' => $phone,
        'message' => $message,
        'location' => $location
    ),
    'form_ok' => $form_ok,
    'errors' => $errors
  );
}
