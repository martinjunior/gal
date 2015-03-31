<?php

    define('__ROOT__', dirname(dirname(__FILE__)));
    require_once(__ROOT__ . '/functions/htmlEmailGenerator.php'); 

    $htmlEmail = generate_html_contact_email($_POST);

    if (mail(
        'martinduranwebdesign@gmail.com',
        'Website Contact - Great American Landscaping',
        $htmlEmail
    )) {
        echo $htmlEmail;
    }

?>