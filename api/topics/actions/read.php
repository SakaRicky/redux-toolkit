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
    $items = new Topic($db);

    //  SENDING THE CATEGORY ID FOR FILTERING
    $items->category_id = isset($_GET['category_id']) ? $_GET['category_id'] : '';

    $stmt = $items->getAll();
    $itemCount = $stmt->rowCount();

    // echo json_encode($items);

    if($itemCount > 0){
        $itemRecords = array();
        // $itemRecords["topics"] = array();
        // $itemRecords["itemCount"] = $itemCount;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "title" => $title,
                "description" => $description,
                "category_id" => $category_id,
                "published" => $published,
                "createdAt" => $createdAt
            );
            array_push($itemRecords, $e);
        }
        echo json_encode($itemRecords);
    }
    else{
        http_response_code(404);
        echo json_encode(
            array("message" => "No record found.")
        );
    }
?>