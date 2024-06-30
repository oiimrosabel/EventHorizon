<?php

const TIMEZONE = 'Europe/Paris';
const TIME_LOCALE = 'fr_FR';
const DATE_CODE = "/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/mi";

function get_accurate_time(string $data): ?DateTime
{
    $content = preg_match(DATE_CODE, $data, $matches);
    if ($content === false || sizeof($matches) != 6) return null;
    try {
        $date = new DateTime(
            "$matches[1]-$matches[2]-$matches[3] $matches[4]:$matches[5]:00",
            new DateTimeZone('UTC'));
    } catch (Exception) {
        return null;
    }
    $date->setTimezone(new DateTimeZone(TIMEZONE));
    return $date;
}

function clean_string(string $data): string
{
    return str_replace("\\", "", trim($data));
}

function format_date(DateTime $date, string $format): false|string
{
    $formatter = new IntlDateFormatter(TIME_LOCALE, 0, 0, null, null, $format);
    return $formatter->format($date);
}

function generate_title(string $data): array
{
    $cleaned_data = clean_string(substr($data, 8));
    $res = preg_match('/^((?:CM|TD|TP|CC)[0-9]?) (.*)$/', $cleaned_data, $matches);
    if (!$res || sizeof($matches) !== 3) return [$cleaned_data, ''];
    array_shift($matches);
    return array_reverse($matches);
}

function generate_location(string $data): array
{
    return explode(",",
        clean_string(
            preg_replace("/ *\([^)]+\)/", '',
                substr($data, 9)
            )
        )
    );
}

function generate_description(string $data): array
{
    $res = preg_match_all('/([A-Z ]+)\\\n/', substr($data, 12), $matches);
    if (!$res || empty($matches)) return [];
    return $matches[1];
}

function generate_duration(DateTime $dtstart, DateTime $dtend): array
{
    $diff = $dtstart->diff($dtend);
    $hourdiff = strval($diff->h);
    $mindiff = $diff->i === 0 ? '' : strval($diff->i);
    return array($hourdiff, $mindiff);
}

function generate_date(DateTime $date): array
{
    return array(
        format_date($date, 'eeee'),
        format_date($date, 'dd'),
        format_date($date, 'MMM')
    );
}

function generate_hour(DateTime $time): array
{
    return array(
        format_date($time, 'HH'),
        format_date($time, 'mm')
    );
}

function generate_raw_date(DateTime $date): string
{
    return format_date($date, 'ddMM');
}