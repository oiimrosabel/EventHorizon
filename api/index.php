<?php

include "_utils/calendar-tools.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

if (!isset($_POST['cal']) || !isset($_POST['weeks'])) error_code(400, 'Paramètres manquants.');

$file = fetch_file($_POST['cal'], $_POST['weeks']);
if ($file === null) error_code(500, 'Impossible de récupérer le calendrier.');

$events = parse_vcalendar($file);
if ($events === null) error_code(500, 'Impossible de traiter le calendrier.');

echo json_encode(beautify_events($events), JSON_PRETTY_PRINT);
http_response_code(200);