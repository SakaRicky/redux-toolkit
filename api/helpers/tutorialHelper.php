<?php
class TutorialHelper
{
    private $tutorialsTable = "tutorials";

    // object properties
    public $id;

    public function getTutorial($connection, $id){

        //check inputs
        if (!isset($id) ) {
            return $json = array("success" => false, "Info" => "Invalid Inputs");
        }

        // select one record
        $sql = "SELECT id, title, description FROM $this->tutorialsTable  
                    WHERE id=:id";

        //prepare query for execution
        $stmt = $connection->prepare($sql);

        $id=htmlspecialchars(strip_tags($id));
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        // $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $results=$stmt->fetch(PDO::FETCH_ASSOC);
        return $results;
    }

    public function updateTutorial($connection, $input){

        if (!isset($input['title']) ) {
            return $json = array("success" => false, "Info" => "No ID ");
        }

        $sql = "UPDATE $this->tutorialsTable 
                SET title=:title, description=:description , published=:published 
                WHERE id=:id";

        //prepare query for execution
        $stmt = $connection->prepare($sql);

        // sanitize
        $title = htmlspecialchars(strip_tags($input['title']));
		$description = htmlspecialchars(strip_tags($input['description']));
        $id=htmlspecialchars(strip_tags($input['id']));
        $published=htmlspecialchars(strip_tags($input['published']));

        // bind the parameters
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':published', $published);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }

	public function listTutorials($connection)
    {
        $sql      = "SELECT * FROM $this->tutorialsTable";
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $titles=$stmt->fetchAll(PDO::FETCH_ASSOC);
        return $titles;
	}

    public function createTutorial($connection, $input)
    {
        //check inputs
        if (!isset($input['title']) ) {
            return $json = array("success" => false, "Info" => "Invalid Inputs");
        }
        //sanitise inputs
        $title = htmlspecialchars(strip_tags($input['title']));
		$description = htmlspecialchars(strip_tags($input['description']));

        //check title exists  START
        $sql      = "SELECT * FROM $this->tutorialsTable WHERE title =:title";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(":title", $title);
        $stmt->execute();
        $titleCheck = $stmt->fetch();
        if (isset($titleCheck[0])) {
            return $json = array("success" => false, "Info" => "Title Already Exists");
        }

        //SET @VAR $UID
        $uid = md5(time().rand());
        $connection->beginTransaction();

        try {
            $sql  = "INSERT INTO $this->usersTable SET `title` =:title, `description` =:description ";
            $stmt = $connection->prepare($sql);
            $stmt->bindParam(":title", $title);
			$stmt->bindParam(":description", $description);
            $stmt->execute();
            if ($stmt->rowCount() === 1) {
                //execute profile table  START
            } else {
                $connection->rollBack();
                return array("success" => false, "Info" => "Couldn't create a tutorial");
            }

            //send activationlink after user creation
            $connection->commit();
            return array("success" => true, "uid" => $uid);
        } catch(Exception $e) {
            error_log($e);
            $connection->rollBack();
            return array("success" => false, "Info" => "Error while creating a tutorial");
        }
    }
}