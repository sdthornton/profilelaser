<?php
if(isset($_POST)) {
	//Form Validation
	$formok = true;
	$errors = array();

	//Submission Data
	//$ipaddress = $_SERVER['REMOTE_ADDR'];
	//$date = date('d/m/y');
	//$time = date('H:i:s');

	//Form Data
	$nospam = $_POST['name'];
	$name = $_POST['real_name'];
	$from = $_POST['email'];
	$to = "sdthornton@live.com";
	$company = $_POST['company'];
	$phone = $_POST['phone'];
	$location = $_POST['location'];
	$message = $_POST['message'];
	$subject = "Hello world";

	//Validations
	if(isset($nospam)) {
		$formok = false;
		$errors[] = "Sorry Mr. Robot, but no spamming for you today!";
	}

	if(empty($name)) {
		$formok = false;
		$errors[] = "Please enter your name.";
	}

	if(empty($email)) {
		$formok = false;
		$errors[] = "Please enter an email address.";
	} elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$formok = false;
		$errors[] = "Please enter a valid email address.";
	}

	if(empty($location)) {
		$formok = false;
		$errors[] = "Please enter your location.";
	}

	if(empty($message)) {
		$formok = false;
		$errors[] = "Please write us a message.";
	} elseif(strlen($message) < 20) {
		$formok = false;
		$errors[] = "Please leave a message greater than 20 characters.";
	}

	//Send Email (after validation)
	if($formok) {
		$headers = "From: {$from}" . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$emailbody = "
			<p>You've received a new message from the contact section of your website.</p>
			<p><strong>Name:</strong> {$name}</p>
			<strong>Company:</strong> {$company}<br>
			<strong>Email Address:</strong> {$from}<br>
			<strong>Phone Number:</strong> {$phone}<br>
			<strong>Location:</strong> {$location}</p>
			<p>{$message}</p>
			";
			//<p><small>Message sent from IP Address: {$ipaddress} on {$date} at {$time}.</small></p>";
		mail($to,$subject,$emailbody,$headers);
	}

	//Return Back to Form
	$returndata = array(
		'posted_from_data' => array(
			'name' => $real_name,
			'comapny' => $company,
			'email' => $email,
			'phone' => $phone,
			'location' => $location,
			'message' => $message
		),
		'form_ok' => $form_ok,
		'errors' => $errors
	);

	//If Not an AJAX Request
	if(empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
		//Set Session Variable
		session_start();
		$_SESSION['cf_returndata'] = $returndata;

		//Redirect Back to Form
		header('location: ' . $_SERVER['HTTP_REFERER']);
	}
}
?>