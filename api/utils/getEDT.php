<?php

/*
 * edt
 *
 * Refactors parsed files as a more readable Array
 *
 * @author Lurgrid <sagbot@gmail.com>
 * @license MIT
 * @version 1.0
 *
 */

use utils\CalFileParser;

function edt($url): bool|array
{
    include('CalFileParser.php');
    $cal = new CalFileParser();
    $cal->set_timezone('Europe/Paris');
    $basecal = $cal->parse($url);
    if (gettype($basecal) == ENT_COMPAT) return false;
    if (count($basecal) == 0) return false;
    $EDT = array();
    foreach ($basecal as $key => $val) {
        $basecal[$key]["DTSTART"] = array($basecal[$key]["DTSTART"]->format("Y_m_d"), $basecal[$key]["DTSTART"]->format("H_i"), $basecal[$key]["DTSTART"]->format("D"));
        $basecal[$key]["DTEND"] = array($basecal[$key]["DTEND"]->format("Y_m_d"), $basecal[$key]["DTEND"]->format("H_i"));
        unset($basecal[$key]["DTSTAMP"]);
        unset($basecal[$key]["CREATED"]);
        unset($basecal[$key]["SEQUENCE"]);
        unset($basecal[$key]["UID"]);
        unset($basecal[$key]["VALARM"]);
        unset($basecal[$key]["LAST-MODIFIED"]);
        preg_match("/^([^\s\d]* [^\s\d]*)$/m", $basecal[$key]["DESCRIPTION"], $desc);
        $basecal[$key]["DESCRIPTION"] = $desc[0];
        $EDT[$basecal[$key]["DTSTART"][0] . "_" . $basecal[$key]["DTSTART"][2]][$basecal[$key]["DTSTART"][1]] = $basecal[$key];
    }
    ksort($EDT);
    foreach ($EDT as $key => $val) {
        ksort($EDT[$key]);
    }
    return $EDT;
}

;
?>