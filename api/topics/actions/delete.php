<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once ('../../config/database.php');
    include_once '../Topic.php';
    
    $database = new Database();
    $db = $database->getConnection();
    
    $item = new Topic($db);
    $item->id = isset($_GET['id']) ? $_GET['id'] : die();

    $data = json_decode(file_get_contents("php://input"));

    if(!empty($item->id)) {
        if($item->delete()){    
            http_response_code(200); 
            echo json_encode(array("message" => "Item was deleted."));
        } else {    
            http_response_code(503);   
            echo json_encode(array("message" => "Unable to delete item."));
        }
    } else {
        http_response_code(400);    
        echo json_encode(array("message" => "Unable to delete items. Data is incomplete."));
    }
    
?>