<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("HTTP/1.0 200 OK");  // <------- update it HTTP/1.0 200 OK

    include_once ('../../config/database.php');
    include_once '../Topic.php';

    $database = new Database();
    $db = $database->getConnection();
    $item = new Topic($db);
    $data = json_decode(file_get_contents("php://input"));
    
    if( !empty($data->title) ){
        $item->title = $data->title;
        $item->description = $data->description;
        $item->published = '';
        $item->createdAt = date('Y-m-d H:i:s');

        if($item->create()) {
            http_response_code(200);         
            echo json_encode(array("message" => "Item was created."));
        } else {         
            http_response_code(503);        
            echo json_encode(array("message" => "Unable to create item."));
        }
    } else {    
        http_response_code(400);    
        echo json_encode(array("message" => "Unable to create item. Data is incomplete."));
    }

?>