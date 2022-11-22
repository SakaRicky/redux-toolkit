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
    // $data = json_decode(file_get_contents("php://input"));
    $data = json_decode(file_get_contents('php://input'), true);

    echo "HELLO.... ";
    echo json_encode($_POST);

    echo file_get_contents('php://input');

    var_dump("update here: " . $data);
    // die();

    if( !empty($data->id) ){
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