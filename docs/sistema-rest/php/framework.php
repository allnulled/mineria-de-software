<?php
define("MYSQL_HOST", "127.0.0.1");
define("MYSQL_PORT", "3306");
define("MYSQL_USER", "root");
define("MYSQL_PASSWORD", "");
define("MYSQL_DATABASE", "ejemplo");
class Request
{
    public $framework;
    private $mixed_parameters;
    public function __construct($framework)
    {
        $this->framework = $framework;
        $this->mixed_parameters = array_merge($_GET, $_POST);
    }
    public function get_all_parameters()
    {
        return $this->mixed_parameters;
    }
    public function get_parameter($name, $default_value = null)
    {
        return isset($this->mixed_parameters[$name]) ?? $default_value;
    }
}
class Database
{
    public $framework;
    public $connection;
    public function __construct($framework)
    {
        $this->framework = $framework;
        $this->connection = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT);
    }
    public function query($query)
    {
        $result = $this->connection->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    public function schema()
    {
        // Lógica para obtener el esquema de la base de datos
    }
    private function sanitize($value)
    {
        return $this->connection->real_escape_string($value);
    }
    public function select($table, $where, $sort, $page)
    {
        $sql = "SELECT * FROM $table";
        if (!empty($where)) {
            $whereClause = [];
            foreach ($where as $condition) {
                $column = $this->sanitize($condition[0]);
                $operator = $this->sanitize($condition[1]);
                $value = $this->sanitize($condition[2]);
                $whereClause[] = "$column $operator '$value'";
            }
            $sql .= " WHERE " . implode(" AND ", $whereClause);
        }
        if (!empty($sort)) {
            $orderByClause = [];
            foreach ($sort as $sortColumn) {
                $column = $this->sanitize($sortColumn[0]);
                $direction = $this->sanitize($sortColumn[1]);
                $orderByClause[] = "$column $direction";
            }
            $sql .= " ORDER BY " . implode(", ", $orderByClause);
        }
        if ($page > 0) {
            $offset = ($page * 20) - 20;
            $sql .= " LIMIT 20 OFFSET $offset";
        }
        return $sql; // Solo para propósitos de demostración
    }
    public function insert($table, $value)
    {
        $columns = array_map(function ($key) {
            return $this->sanitize($key);
        }, array_keys($value));
        $columnNames = implode(', ', $columns);
        $columnValues = array_map(function ($val) {
            return "'" . $this->sanitize($val) . "'";
        }, array_values($value));
        $columnValuesString = implode(', ', $columnValues);
        $sql = "INSERT INTO $table ($columnNames) VALUES ($columnValuesString)";
        return $sql; // Solo para propósitos de demostración
    }
    public function update($table, $id, $value)
    {
        $setClause = [];
        foreach ($value as $column => $val) {
            $setClause[] = $this->sanitize($column) . " = '" . $this->sanitize($val) . "'";
        }
        $setClauseString = implode(', ', $setClause);
        $sql = "UPDATE $table SET $setClauseString WHERE id = " . $this->sanitize($id);
        return $sql; // Solo para propósitos de demostración
    }
    public function delete($table, $id)
    {
        $sql = "DELETE FROM $table WHERE id = " . $this->sanitize($id);
        return $sql; // Solo para propósitos de demostración
    }
}
class Utilities
{
    public $framework;
    public function __construct($framework)
    {
        $this->framework = $framework;
    }
}
class Framework
{
    public $name;
    public $version;
    public $utilities;
    public $database;
    public $request;
    public function __construct()
    {
        $this->utilities = new Utilities($this);
        $this->database = new Database($this);
        $this->request = new Request($this);
    }
    public function dispatch_success($data)
    {
        echo json_encode(array_merge([
            "status" => "success",
            "success" => true
        ], $data), JSON_PRETTY_PRINT);
    }
    public function dispatch_error($data)
    {
        echo json_encode(array_merge([
            "status" => "error",
            "error" => true
        ], $data), JSON_PRETTY_PRINT);
    }
    public function dispatch()
    {
        try {
            $operation = $this->request->get_parameter("operation", null);
            if (!isset($operation)) {
                $this->dispatch_error([
                    "message" => "Required parameter «operation»"
                ]);
                exit;
            }
            if (!in_array($operation, ["select", "insert", "update", "delete"])) {
                $this->dispatch_error([
                    "message" => "Required parameter «operation» to be valid"
                ]);
                exit;
            }
            $table = $this->request->get_parameter("table", null);
            if (!isset($table)) {
                $this->dispatch_error([
                    "message" => "Required parameter «table»"
                ]);
                exit;
            }
            return $this->dispatch_success([]);
        } catch (Exception $ex) {
            return $this->dispatch_error($ex);
        }
    }
}
$framework = new Framework();
function get_framework()
{
    global $framework;
    return $framework;
}
$framework->dispatch();
?>