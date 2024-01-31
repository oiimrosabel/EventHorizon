<?php

include "utils/getTimetable.php";
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *", false);

if (!isset($_GET["url"])) {
    echo json_encode([
        "response" => 1,
        "comment" => "No URL provided.",
        "value" => null]);
    die();
}

$obj = null;

try {
    $obj = edt(urldecode($_GET["url"]));
} catch (TypeError) {
    echo json_encode([
        "response" => 2,
        "comment" => "An error occured while fetching the calendar.",
        "value" => $_GET["url"]], JSON_PRETTY_PRINT);
    die();
}

if (!$obj) {
    echo json_encode([
        "response" => 3,
        "comment" => "An error occured while encoding the calendar.",
        "value" => $obj], JSON_PRETTY_PRINT);
    die();
}
echo json_encode([
    "response" => 0,
    "comment" => "Success !",
    "value" => $obj], JSON_PRETTY_PRINT);

?>