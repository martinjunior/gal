<?php

    define('__ROOT__', dirname(dirname(__FILE__)));
    require_once(__ROOT__ . '/functions/htmlEmailGenerator.php'); 

    $htmlEmail = generate_html_contact_email($_POST);

    // HTML email headers (required)
    $headers = "Reply-To: ".$email."\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    // Reverse captcha
    if ($_POST['referral'] == '') {
        echo mail(
            'martinduranwebdesign@gmail.com',
            'Website Contact - Great American Landscaping',
            $htmlEmail,
            $headers
        );
    }

?>