<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>Todo List</h1>

    <form action="todoadd.php" method="post">
        <input type="text" name="name" id="" required>
        <input type="submit" value="Submit">
    </form>
    <?php
    $con = new mysqli("127.0.0.1", "kousil", "Goldtre9", "TODOLIST");
    $result = $con->query("SELECT * from todolist");
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) { ?>
            <li>
                <?php echo $row["list"];
                ?>
                <input type="submit" value="Remove" onclick="location.href = 'todoremove.php?index=<?php echo $row['id']; ?>'">
            </li>
        <?php } ?>
    <?php
    } else {
        echo "Please Add Tasks";
    }
    $con->close();
    ?>


