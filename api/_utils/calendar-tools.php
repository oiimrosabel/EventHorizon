<?php

use JetBrains\PhpStorm\NoReturn;

include "data-tools.php";

const CALENDAR_TOKEN = "%%cal%%";
const WEEKS_TOKEN = "%%weeks%%";
const VEVENT = "/BEGIN:VEVENT(.*?)END:VEVENT/si";

#[NoReturn] function error_code($status, $message): void
{
    echo json_encode(array('error' => $message));
    http_response_code($status);
    die();
}

function fetch_file($url, $calendar, $weeks): ?string
{
    $url = str_replace(CALENDAR_TOKEN, strval($calendar), $url);
    $url = str_replace(WEEKS_TOKEN, strval($weeks), $url);
    $data = file_get_contents($url);
    return ($data === false) ? null : $data;
}

function parse_vcalendar($data): ?array
{
    $content = preg_match_all(VEVENT, $data, $matches);
    if ($content === false || empty($matches)) return null;
    $res = array();
    foreach ($matches[1] as $event) $res[] = parse_event($event);
    return $res;
}

function compare_events($ev1, $ev2): int
{
    $ev1start = $ev1['start'][0] . $ev1['start'][1];
    $ev2start = $ev2['start'][0] . $ev2['start'][1];
    $res = strcmp($ev1start, $ev2start);
    if ($res === 0) {
        $ev1end = $ev1['end'][0] . $ev1['end'][1];
        $ev2end = $ev2['end'][0] . $ev2['end'][1];
        $res = strcmp($ev1end, $ev2end);
    }
    return $res > 0 ? 1 : -1;
}

function beautify_events($data): array
{
    $res = array();
    foreach ($data as $event) {
        $key = $event['date-raw'];
        if (!array_key_exists($key, $res)) $res[$key] = array();
        unset($event['date-raw']);
        $res[$key][] = $event;
    }
    foreach (array_keys($res) as $elem) usort($res[$elem], 'compare_events');
    ksort($res, SORT_STRING);
    return $res;
}

function check_items($cal, $weeks): bool
{
    return (
        preg_match('/^\d+$/', $cal) !== false
        && preg_match('/^\d{1,3}$/', $weeks) !== false
    );
}