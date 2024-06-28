<?php

include "format-tools.php";

const DTSTART = "/^DTSTART:(.*?)$/mi";
const DTEND = "/^DTEND:(.*?)$/mi";
const SUMMARY = "/^SUMMARY:(.*?)$/mi";
const LOCATION = "/^LOCATION:(.*?)$/mi";
const DESCRIPTION = "/^DESCRIPTION:(.*?)$/mi";

function parse_event($data): array
{
    $res = array();
    $dtstart = get_accurate_time(get_element($data, DTSTART));
    $dtend = get_accurate_time(get_element($data, DTEND));
    $res['date-raw'] = format_date($dtstart, "ddMM");
    $res['date'] = array(
        format_date($dtstart, "eeee"),
        format_date($dtstart, "dd"),
        format_date($dtstart, "MMM")
    );
    $res['start'] = array(
        format_date($dtstart, "HH"),
        format_date($dtstart, "mm")
    );
    $res['end'] = array(
        format_date($dtend, "HH"),
        format_date($dtend, "mm")
    );
    $res['duration'] = get_duration($dtstart, $dtend);
    $res['title'] = clean(get_element($data, SUMMARY));
    $res['locations'] = get_location(get_element($data, LOCATION));
    $res['teachers'] = get_teacher(get_element($data, DESCRIPTION));
    return $res;
}

function get_element($data, $pattern): ?string
{
    $content = preg_match($pattern, $data, $matches);
    return ($content === false || empty($matches)) ? '' : $matches[1];
}

function get_location($data): array
{
    return explode(",", clean(preg_replace("/ *\([^)]+\)/", '', $data)));
}

function get_teacher($data): array
{
    $raw = array_filter(explode("\\n", $data));
    $content = array();
    foreach ($raw as $e) if (is_upper($e)) $content[] = clean($e);
    return $content;
}

function get_duration($dtstart, $dtend): array
{
    $diff = $dtstart->diff($dtend);
    $hourdiff = strval($diff->h);
    $mindiff = $diff->i === 0 ? '' : strval($diff->i);
    return array($hourdiff, $mindiff);
}

