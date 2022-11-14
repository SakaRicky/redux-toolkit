<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("HTTP/1.0 200 OK");  // <------- update it HTTP/1.0 200 OK
    
    include_once ('../../config/database.php');
    include_once '../Topic.php';
    
    $database = new Database();
    $db = $database->getConnection();
    
    $item = new Topic($db);
    $data = json_decode(file_get_contents("php://input"));

    // print_r($data);
    // die();

    if( !empty($data->id) && !empty($data->title) ){
        $item->id = $data->id;
        $item->title = $data->title;
        $item->description = $data->description;
        $item->createdAt = date('Y-m-d H:i:s');
        
        if($item->update()){
            http_response_code(200);   
		    echo json_encode(array("message" => "Item was updated."));
        } else{
            http_response_code(503);     
		    echo json_encode(array("message" => "Unable to update items."));
        }

    } else {
        http_response_code(400);    
        echo json_encode(array("message" => "Unable to update items. Data is incomplete."));
    }
?>