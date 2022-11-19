<?php
    class Category{
        
        // Connection
        private $conn;

        // Table
        private $db_table = "categories";
        
        // Columns
        public $id;
        public $title;
        public $description;
        
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        
        // GET ALL
        public function getAll(){
            $sqlQuery = "SELECT id, title FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
    }
?>