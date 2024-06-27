<?php

const TIMEZONE = 'Europe/Paris';

const TIME_LOCALE = 'fr_FR';
const DATE_CODE = "/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/mi";

function get_accurate_time($data): DateTime
{
    $content = preg_match(DATE_CODE, $data, $matches);
    if ($content === false || empty($matches)) return new DateTime('now');
    try {
        $DateTime = new DateTime("$matches[1]-$matches[2]-$matches[3] $matches[4]:$matches[5]:00", new DateTimeZone('UTC'));
    } catch (Exception $_) {
        return new DateTime('now');
    }
    $DateTime->setTimezone(new DateTimeZone(TIMEZONE));
    return $DateTime;
}

function clean($data): string
{
    return str_replace("\\", "", trim($data));
}

function is_upper($data): bool
{
    return preg_match("/^(?:\p{Lu}| )*$/", $data);
}

function format_date($date, $format): false|string
{
    $formatter = new IntlDateFormatter(TIME_LOCALE, 0, 0);
    $formatter->setPattern($format);
    return $formatter->format($date);
}