<?php

use JetBrains\PhpStorm\NoReturn;

include "data-tools.php";
include "_env.php";

const CALENDAR_TOKEN = "%%cal%%";
const WEEKS_TOKEN = "%%weeks%%";
const VEVENT = "/BEGIN:VEVENT(.*?)END:VEVENT/si";

#[NoReturn] function error_code($status, $message): void
{
    echo json_encode(array('error' => $message));
    http_response_code($status);
    die();
}

function fetch_file($calendar, $weeks): ?string
{
    $url = str_replace(CALENDAR_TOKEN, strval($calendar), URL_TEMPLATE);
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
    $res = strcmp($ev1['start'], $ev2['start']);
    if ($res === 0) $res = strcmp($ev1['end'], $ev2['end']);
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