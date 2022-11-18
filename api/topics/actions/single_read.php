<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once ('../../config/database.php');
    include_once '../Topic.php';
    $database = new Database();
    
    $db = $database->getConnection();
    $item = new Topic($db);
    $item->id = isset($_GET['id']) ? $_GET['id'] : die();
    $item->getSingle();

    if($item->title != null){
        $itemRecords = array();
        $e = array(
            "id" =>  $item->id,
            "title" => $item->title,
            "description" => $item->description,
            "published" => $item->published,
            "createdAt" => $item->createdAt
        );
        http_response_code(200);
        array_push($itemRecords, $e);
        echo json_encode($itemRecords);
    }else{     
        http_response_code(404);     
        echo json_encode(
            array("message" => "No item found.")
        );
    } 
?>