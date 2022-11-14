<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once ('../../config/database.php');
    include_once '../Topic.php';
    
    $database = new Database();
    $db = $database->getConnection();
    
    $items = new Topic($db);
    $stmt = $items->getAll();
    $itemCount = $stmt->rowCount();

    // echo json_encode($itemCount);

    if($itemCount > 0){
        $itemRecords = array();
        $itemRecords["items"] = array();
        $itemRecords["itemCount"] = $itemCount;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "title" => $title,
                "description" => $description,
                "createdAt" => $createdAt
            );
            array_push($itemRecords["items"], $e);
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