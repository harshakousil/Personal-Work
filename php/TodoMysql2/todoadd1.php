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
    $con = new mysqli("127.0.0.1", "kousil", "Goldtre9", "TASK2");
    $x = $_POST["name"];

    $sql = "INSERT INTO sqltask2 (caption,isCompleted)
    VALUES ('$x','false')";
    $con->query($sql);
    header('Location: todosql1.php');
    ?>


</body>

</html>
