<?php

    function generate_html_contact_email($args) {
        $htmlEmail = '<html>' .
                        '<head></head>' .
                        '<body style="padding-bottom:20px;font-family:Arial;">' .
                            '<h1 style="padding-top:20px;padding-bottom:20px;font-size:22px;font-weight:200;">Website contact - contact form</h1>' .
                            '<table style="width:600px;border-collapse:collapse;">' .
                                '<thead>' .
                                    '<tr>' .
                                        '<th style="padding:15px;border:1px solid #cccccc;background:#f1f1f1;">Field</th>' .
                                        '<th style="padding:15px;border:1px solid #cccccc;background:#f1f1f1;">Value</th>' .
                                    '</tr>' .
                                '</thead>' .
                                '<tbody>';

        foreach ($args as $key=>$value) {
             // If this field has been filled out, it's most likely spam.
             // Form won't submit if this field is filled out.
            if ($key !== 'comments' && $key !== 'action') {
                $htmlEmail .=         '<tr style="border-bottom:1px solid #cccccc;">';

                if ($key !== 'referral') {
                $htmlEmail .=             '<td style="padding:10px 15px;vertical-align:middle;">' . str_replace('_', ' ', $key) . '</td>';
                }

                if (is_array($value)) {
                    $htmlEmail .=         '<td style="padding:10px 15px;vertical-align:middle;">';

                    foreach ($value as $key=>$value) {
                        if ($key !== 0) {
                            $htmlEmail .=     ', ';
                        }

                        $htmlEmail .=         $value;
                    }

                    $htmlEmail .=         '</td>';
                } else if ($key !== 'referral') {
                    $htmlEmail .=         '<td style="padding:10px 15px;vertical-align:middle;">' . $value . '</td>';
                }

                $htmlEmail .=         '</tr>';
            }
        }

        $htmlEmail .=             '</tbody>' .
                            '</table>' .
                        '</body>' .
                    '</html>';

        return $htmlEmail;
    }

?>