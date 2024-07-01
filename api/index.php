<?php

include_once 'vendor/autoload.php';
include_once '_utils/calendar-tools.php';
include_once '_utils/format-tools.php';
include_once '_parser/parser.php';
include_once '_parser/lexer.php';

include_once "_env.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

if (!isset($_POST['cal']) || !isset($_POST['weeks'])) error_code(400, 'Paramètres manquants.');

if (!check_items($_POST['cal'], $_POST['weeks'])) error_code(400, 'Requête incorrecte.');

$file = fetch_file(URL_TEMPLATE, $_POST['cal'], $_POST['weeks']);
if ($file === null) error_code(500, 'Impossible de récupérer le calendrier.');

$events = parse_vcalendar($file);
if ($events === null) error_code(500, 'Impossible de parser le calendrier.');

echo json_encode($events, JSON_PRETTY_PRINT);
http_response_code(200);