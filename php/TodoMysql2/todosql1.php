

<html>
<?php session_start() ?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .checke input:checked~.main {
            text-decoration: line-through;
        }
    </style>
</head>

<body>
    <h1>Todo List</h1>

    <form action="todoadd1.php" method="post">
        <input type="text" name="name" id="" required>
        <input type="submit" value="Submit">
    </form>
    <?php

    $con = new mysqli("127.0.0.1", "kousil", "Goldtre9", "TASK2");
    $result = $con->query("SELECT * from sqltask2");
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) { ?>
            <li style="display:flex;flex-direction:row;">
                <div>
                    <form action="updatesql1.php?target=<?php echo $row['id']; ?>" method="post" class="checke" style="display: flex;flex-direction:row">
                        <input type="checkbox" name="check" value="checkBox" onchange="this.form.submit()">
                        <div class="main"> <?php echo $row['caption'] ?></div>
                    </form>
                </div>

                <div>
                    <input type="submit" value="Remove" onclick="location.href = 'todoremove1.php?index=<?php echo $row['id']; ?>'">
                </div>
            </li>

            <?php  ?>
        <?php } ?>


    <?php
    } else {
        echo "Please Add Tasks";
    }
    $con->close();
    ?>

</body>

</html>
