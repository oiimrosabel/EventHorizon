<?php

use Doctrine\Common\Lexer\AbstractLexer;

class ICalLexer extends AbstractLexer
{
    const T_CALENDAR_BEGIN = 0;
    const T_CALENDAR_END = 1;
    const T_EVENT_BEGIN = 2;
    const T_EVENT_END = 3;
    const T_DTSTART = 4;
    const T_DTEND = 5;
    const T_SUMMARY = 6;
    const T_LOCATION = 7;
    const T_DESCRIPTION = 8;
    const T_USELESS = 127;

    protected function getCatchablePatterns(): array
    {
        return [
            '[A-Z]+:.*?\n'
        ];
    }

    protected function getNonCatchablePatterns(): array
    {
        return [
            '\s+',
            '.*',
        ];
    }

    protected function getType(string &$value): int
    {
        if (str_starts_with($value, 'BEGIN:VCALENDAR')) return self::T_CALENDAR_BEGIN;
        if (str_starts_with($value, 'END:VCALENDAR')) return self::T_CALENDAR_END;
        if (str_starts_with($value, 'BEGIN:VEVENT')) return self::T_EVENT_BEGIN;
        if (str_starts_with($value, 'END:VEVENT')) return self::T_EVENT_END;
        if (str_starts_with($value, 'DTSTART:')) return self::T_DTSTART;
        if (str_starts_with($value, 'DTEND:')) return self::T_DTEND;
        if (str_starts_with($value, 'SUMMARY:')) return self::T_SUMMARY;
        if (str_starts_with($value, 'LOCATION:')) return self::T_LOCATION;
        if (str_starts_with($value, 'DESCRIPTION:')) return self::T_DESCRIPTION;
        return self::T_USELESS;
    }
}
