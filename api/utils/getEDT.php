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
    $res = array();
    $day = array();
    foreach ($basecal as $item) {
        //remove all the unused data
        unset($item["DTSTAMP"]);
        unset($item["CREATED"]);
        unset($item["SEQUENCE"]);
        unset($item["UID"]);
        unset($item["VALARM"]);
        unset($item["LAST-MODIFIED"]);

        $item["DTSTART"] = array(
            "date" => $item["DTSTART"]->format("Y_m_d"),
            "hour" => $item["DTSTART"]->format("H_i"),
            "day" => $item["DTSTART"]->format("D"));
        $item["DTEND"] = array(
            "date" => $item["DTEND"]->format("Y_m_d"),
            "hour" => $item["DTEND"]->format("H_i"),
            "day" => $item["DTEND"]->format("D"));

        //reformat the description
        preg_match("/^([^\s\d]* [^\s\d]*)$/m", $item["DESCRIPTION"], $desc);
        $item["TEACHER"] = $desc[0];
        unset($item["DESCRIPTION"]);
    }
    ksort($res);
    //parse each event in one day
        if(count($day) == 0 || $day[0]["DTSTART"]["date"] == $item["DTSTART"]["date"]) {
            $day[] = $item;
        }

        if($day[0]["DTSTART"]["date"] == $item["DTSTART"]["date"]) {
            $res[] = $day;
            $day = array();
        }
    }
    return $res;
}

?>