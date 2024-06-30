<?php

class ICalParser
{
    private ICalLexer $lexer;

    public function __construct()
    {
        $this->lexer = new ICalLexer();
    }

    public function parse_cal(string $data): ?array
    {
        $this->lexer->setInput($data);
        $this->lexer->moveNext();

        if (!$this->lexer->isNextToken(ICalLexer::T_CALENDAR_BEGIN)) return null;

        $res = array();

        $this->lexer->moveNext();

        $this->fast_forward();

        while ($this->lexer->isNextToken(ICalLexer::T_EVENT_BEGIN)) {
            $this->lexer->moveNext();
            $event = $this->parse_event();
            if (!$event) return null;
            $key = $event['date-raw'];
            if (!array_key_exists($key, $res)) $res[$key] = array();
            unset($event['date-raw']);
            $res[$key][] = $event;
        }

        $this->fast_forward();

        if (!$this->lexer->isNextToken(ICalLexer::T_CALENDAR_END)) return null;

        foreach (array_keys($res) as $elem) usort($res[$elem], 'compare_events');
        ksort($res, SORT_STRING);
        $this->lexer->reset();
        return $res;
    }

    private function fast_forward(): void
    {
        while ($this->lexer->isNextToken(ICalLexer::T_USELESS)) $this->lexer->moveNext();
    }

    private function parse_event(): ?array
    {
        if ($this->lexer->token->type != ICalLexer::T_EVENT_BEGIN) return null;
        $this->lexer->moveNext();
        $res = array();
        $dtstart = null;
        $dtend = null;
        while (true) {
            if ($this->lexer->token->type == ICalLexer::T_EVENT_END) break;
            switch ($this->lexer->token->type) {
                case ICalLexer::T_DTSTART:
                    $dtstart = get_accurate_time($this->lexer->token->value);
                    $res['date'] = generate_date($dtstart);
                    $res['date-raw'] = generate_raw_date($dtstart);
                    $res['start'] = generate_hour($dtstart);
                    break;
                case ICalLexer::T_DTEND:
                    $dtend = get_accurate_time($this->lexer->token->value);
                    $res['end'] = generate_hour($dtend);
                    break;
                case ICalLexer::T_SUMMARY:
                    $res['title'] = generate_title($this->lexer->token->value);
                    break;
                case ICalLexer::T_LOCATION:
                    $res['locations'] = generate_location($this->lexer->token->value);
                    break;
                case ICalLexer::T_DESCRIPTION:
                    $res['teachers'] = generate_description($this->lexer->token->value);
                    break;
                case ICalLexer::T_USELESS:
                    break;
                default:
                    return null;
            }
            $this->lexer->moveNext();
        }

        $res['duration'] = generate_duration($dtstart, $dtend);

        return $res;
    }

}

function compare_events(array $ev1, array $ev2): int
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
