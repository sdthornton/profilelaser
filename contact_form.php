<?php
if( isset($_POST) ){
    
    //form validation vars
    $formok = true;
    $errors = array();
    
    //sumbission data
    $ipaddress = $_SERVER['REMOTE_ADDR'];
    //$date = date('d/m/Y');
    //$time = date('H:i:s');
    
    //form data
    $to = "sdthornton@live.com";
    $from = $_POST['email'];
    $nospam = $_POST['name'];
    $name = $_POST['real_name'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    $location = $_POST['location'];
    
    //validate form data
    if(!empty($nospam)) {
        $formok = false;
        $errors[] = "Sorry robot, no spamming for you today! If you are not a robot, but are in fact human, and you are seeing this error, it means you have accidentally filled out our hidden anti spam field. Simply leave that blank and try to resubmit the form.";
    }

    if(empty($name)) {
        $formok = false;
        $errors[] = "You have not entered a name";
    }

    if(empty($email)) {
        $formok = false;
        $errors[] = "You have not entered an email address";
    //validate email address is valid
    } elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $formok = false;
        $errors[] = "You have not entered a valid email address";
    }

    if(empty($message)) {
        $formok = false;
        $errors[] = "You have not entered a message";
    } elseif(strlen($message) < 20) {
        $formok = false;
        $errors[] = "Your message must be greater than 20 characters";
    }

    if(empty($location)) {
        $formok = false;
        $errors[] = "Please enter your location (just the city and state)";
    }

    if(empty($company)) {
        $company = 'None provided';
    }

    if(empty($phone)) {
        $phone = 'None provided';
    }
    
    //send email if all is ok
    if($formok) {
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
    
    //what we need to return back to our form
    $returndata = array(
        'posted_form_data' => array(
            'nospam' => $nospam,
            'name' => $name,
            'company' => $company,
            'email' => $email,
            'phone' => $phone,
            'message' => $message,
            'location' => $location
        ),
        'form_ok' => $formok,
        'errors' => $errors
    );
        
    
    //if this is not an ajax request
    if(empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
        //set session variables
        session_start();
        $_SESSION['cf_returndata'] = $returndata;
        
        //redirect back to form
        header('location: ' . $_SERVER['HTTP_REFERER']);
    }
}
