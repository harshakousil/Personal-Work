<?php
session_start();
?>
<a href="todosql1.php" target="">Back</a>
<?php
$con = new mysqli("127.0.0.1", "kousil", "Goldtre9", "TASK2");

$x = $_REQUEST["target"];
if (isset($_POST['check'])) {
    $y = "true";
} else {
    $y = "false";
}
// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to delete a record
$sql = "UPDATE sqltask2 SET isCompleted='$y' WHERE id=$x";

$con->query($sql);

$con->close();
?>


