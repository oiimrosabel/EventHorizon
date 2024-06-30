<?php

use JetBrains\PhpStorm\NoReturn;

const CALENDAR_TOKEN = "%%cal%%";
const WEEKS_TOKEN = "%%weeks%%";

#[NoReturn] function error_code(int $status, string $message): void
{
    echo json_encode(array('error' => $message));
    http_response_code($status);
    die();
}

function fetch_file(string $url, string $calendar, string $weeks): ?string
{
    $url = str_replace(CALENDAR_TOKEN, strval($calendar), $url);
    $url = str_replace(WEEKS_TOKEN, strval($weeks), $url);
    $data = file_get_contents($url);
    return ($data === false) ? null : $data;
}

function parse_vcalendar(string $data): ?array
{
    $parser = new ICalParser();
    return $parser->parse_cal($data);
}

function check_items(string $cal, string $weeks): bool
{
    return (
        preg_match('/^\d+$/', $cal) !== false
        && preg_match('/^\d{1,3}$/', $weeks) !== false
    );
}