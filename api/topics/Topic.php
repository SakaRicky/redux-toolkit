<?php
    header("Access-Control-Allow-Origin: *");

    class Topic{
        
        // Connection
        private $conn;

        // Table
        private $db_table = "tutorials";
        
        // Columns
        public $id;
        public $title;
        public $description;
        public $published;
        
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        
        // GET ALL
        public function getAll(){
            $sqlQuery = "SELECT id, title, description, published, createdAt FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // CREATE
        public function create(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        title = :title, 
                        description = :description, 
                        published = :published";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->title=htmlspecialchars(strip_tags($this->title));
            $this->description=htmlspecialchars(strip_tags($this->description));
            $this->published=htmlspecialchars(strip_tags($this->published));
        
            // bind data
            $stmt->bindParam(":title", $this->title);
            $stmt->bindParam(":description", $this->description);
            $stmt->bindParam(":published", $this->published);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // READ single
        public function getSingle(){
            $sqlQuery = "SELECT id, title, description, published, createdAt FROM " . $this->db_table . " WHERE id = ? LIMIT 0, 1 ";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(1, $this->id);
            $stmt->execute();
            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $this->title = $dataRow['title'];
            $this->description = $dataRow['description'];
            $this->published = $dataRow['published'];
            $this->createdAt = $dataRow['createdAt'];
        }

        // UPDATE
        public function update(){
            $sqlQuery = "UPDATE
                        ". $this->db_table ."
                    SET
                        title = :title, 
                        description = :description, 
                        published = :published
                    WHERE 
                        id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->title=htmlspecialchars(strip_tags($this->title));
            $this->description=htmlspecialchars(strip_tags($this->description));
            $this->published=htmlspecialchars(strip_tags($this->published));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(":title", $this->title);
            $stmt->bindParam(":description", $this->description);
            $stmt->bindParam(":published", $this->published);
            $stmt->bindParam(":id", $this->id);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }
        
        // DELETE
        function delete(){
            $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
            $this->id=htmlspecialchars(strip_tags($this->id));
            $stmt->bindParam(1, $this->id);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }
    }
?>