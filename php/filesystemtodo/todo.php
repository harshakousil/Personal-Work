<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TODO File System</title>
</head>
<style>
body
{
    text-align:center;
    align-items:center;
    box-sizing:border-box;
}
.form
{ 
    align-items:center;
    text-align:center;
    width:25rem;
    display:flex;
    justify-content:space-around;
    margin-left:35rem;
    margin-bottom:2rem;
}
.text
{  
    font-size:x-large;
}
.submit
{
    margin-left:1rem;
    font-size:larger;
    
}
.li
{
    list-style-type:none;
    align-items:right;
}
.todoitem
{
    font-size:larger;
}
.btn
{
    margin-left:2rem;
    margin-bottom:1rem;
}
</style>
<body>
    <h1>Todo List</h1>
    <form class="form" method="POST" action="submit.php">
        <input class="text" type="text" name="todo" />
        <input  class="submit"type="Submit" />
    </form>

    <?php
    $file = "todo.txt";
    if (file_exists($file)) {
        $fileItem = file_get_contents($file);
        $todoCollection = unserialize($fileItem);
        // echo $todoCollection;

        for ($i = 0; $i < sizeof($todoCollection); $i++) { ?>
            <li class="li">
               <span class="todoitem"><?php echo $todoCollection[$i]['todo']; ?></span>
                <input  type="button" class="btn" value="remove" onclick=" location.href='remove.php?index=<?php echo $i; ?>'; " />
            </li>
    <?php }
    } ?>

</body>

</html>
