<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once ('../../config/database.php');
    include_once '../Category.php';
    
    $database = new Database();
    $db = $database->getConnection();
    
    $items = new Category($db);
    $stmt = $items->getAll();
    $itemCount = $stmt->rowCount();

    if($itemCount > 0){
        $itemRecords = array();
        $itemRecords["items"] = array();
        $itemRecords["itemCount"] = $itemCount;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "title" => $title,
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