<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    $x = $_REQUEST['index'];
    $con = new mysqli("127.0.0.1", "kousil", "Goldtre9", "TODOLIST");
    // Check connection
    if ($con->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // sql to delete a record
    $sql = "DELETE FROM todolist WHERE id=$x";

    $con->query($sql);

    $con->close();
    header("Location:TODOSQL.php");

    ?>
</body>

</html>
