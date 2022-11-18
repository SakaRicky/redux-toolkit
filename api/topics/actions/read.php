<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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