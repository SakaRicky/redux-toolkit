<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
   header('Access-Control-Allow-Origin: *');
   header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
   header("HTTP/1.1 200 OK");
   die();
}
    
    include_once ('../../config/database.php');
    include_once '../Topic.php';
    $database = new Database();
    
    $db = $database->getConnection();
    $item = new Topic($db);
    $item->id = isset($_GET['id']) ? $_GET['id'] : die();
    $item->getSingle();

    if($item->title != null){
        // $itemRecords;
        $e = array(
            "id" =>  $item->id,
            "title" => $item->title,
            "description" => $item->description,
            "published" => $item->published,
            "createdAt" => $item->createdAt
        );
        http_response_code(200);
        // array_push($itemRecords, $e);
        echo json_encode($e);
    }else{     
        http_response_code(404);     
        echo json_encode(
            array("message" => "No item found.")
        );
    } 
?>