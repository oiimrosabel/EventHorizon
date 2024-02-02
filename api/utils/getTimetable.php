<?php

/*
 * getTimetable (based on edt)
 *
 * Refactors parsed files as a more readable Array
 *
 * @author Lurgrid <sagbot@gmail.com>
 * EDIT by Nerd <imalonelynerd@gmail.com>
 * @license MIT
 * @version 1.0
 *
 */

use utils\CalFileParser;

function eventComp($a, $b): int
{
    if (strcasecmp($a["DTSTART"]["date"], $b["DTSTART"]["date"]) < 0) {
        return -1;
    }
    if (strcasecmp($a["DTSTART"]["date"], $b["DTSTART"]["date"]) > 0) {
        return 1;
    }
    if (strcasecmp($a["DTSTART"]["hour"], $b["DTSTART"]["hour"]) < 0) {
        return -1;
    }
    if (strcasecmp($a["DTSTART"]["hour"], $b["DTSTART"]["hour"]) > 0) {
        return 1;
    }
    return 0;
}

function edt($url): bool|array
{
    include('CalFileParser.php');
    $cal = new CalFileParser();
    $cal->set_timezone('Europe/Paris');
    $basecal = $cal->parse($url);
    if (gettype($basecal) != "array") return false;
    if (count($basecal) == 0) return false;
    $res = array();
    foreach ($basecal as $item) {

        //remove all the unused data
        unset($item["DTSTAMP"]);
        unset($item["CREATED"]);
        unset($item["SEQUENCE"]);
        unset($item["UID"]);
        unset($item["VALARM"]);
        unset($item["LAST-MODIFIED"]);

        //reformat the date
        $item["DTSTART"] = array(
            "date" => $item["DTSTART"]->format("Y_m_d"),
            "hour" => $item["DTSTART"]->format("H_i"),
            "day" => $item["DTSTART"]->format("N") % 7);
        $item["DTEND"] = array(
            "date" => $item["DTEND"]->format("Y_m_d"),
            "hour" => $item["DTEND"]->format("H_i"),
            "day" => $item["DTEND"]->format("N") % 7);

        //reformat the description
        preg_match("/^([^\s\d]* [^\s\d]*)$/m", $item["DESCRIPTION"], $desc);
        $item["TEACHER"] = $desc[0];
        unset($item["DESCRIPTION"]);
        $res[] = $item;
    }

    usort($res, "eventComp");

    //parse each event in one day
    $day = array();
    $res2 = array();
    foreach ($res as $item) {
        if (count($day) == 0 || strcasecmp($day[0]["DTSTART"]["date"], $item["DTSTART"]["date"]) == 0) {
            $day[] = $item;
        }

        if (strcasecmp($day[0]["DTSTART"]["date"], $item["DTSTART"]["date"]) != 0) {
            $res2[] = $day;
            $day = array();
            $day[] = $item;
        }
    }
    return $res2;
}

?>