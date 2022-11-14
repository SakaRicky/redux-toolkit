<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Access-Control-Allow-Methods: *");
	header("Content-Type: application/json; charset=UTF-8");
	include_once '../config/dbconfig.php';
	include_once '../helpers/tutorialHelper.php';

	$db = new DBClass();
	$tutorialHelper = new tutorialHelper();

	$path='../config/dbconfig.php';
	//$data = $connection->query('SELECT NOW()');
	// print_r($data);
	
	//main function 
	//catch action
	//@var $request_method
	$request_method = isset($_SERVER['REQUEST_METHOD'])?$_SERVER['REQUEST_METHOD']:'';
	$data = json_decode(file_get_contents("php://input"),true);

	if($request_method == "GET"){
		//Get action method
		$action = $_REQUEST['action'];
		$connection = $db->getConnection();
		$id = isset($_REQUEST['id'])?$_REQUEST['id']:'';

		switch ($action) {
		  case "listTutorials":
			$json = $tutorialHelper->listTutorials($connection);
			break;
		
		  case "getTutorial":
			$json = $tutorialHelper->getTutorial($connection, $id);
			break;
		  
		  case "createTutorial":
			$json = $tutorialHelper->createTutorial($connection, $data);
			break;
		  default:
			$json = array("success" => false, "Info" => "Request get method not available! " );
		}

        $connection = null;
		echo json_encode($json);

	} elseif ($request_method == "PUT"){
		$action = $_REQUEST['action'];
		$connection = $db->getConnection();

		switch ($action) {
			case "updateTutorial":
				$json = $tutorialHelper->updateTutorial($connection, $data);
				break;
			default:
				$json = array("success" => false, "Info" => "Request post method not available! " );
		}
		$connection = null;
		echo json_encode($json);

	} else {
		$json = array("success" => false, "Info" => "Request method not accepted!" );
		echo json_encode($json);

	}
?>