<?php 
session_start();
?>
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
if(!isset($_SESSION['todocollection']))
{
    $_SESSION['todocollection']=[];
}
?>

<form method="post" action="storeitem.php">
    <label for="todo">Add Todo<br>

        <input type="text" name="todo" placeholder="Write something here"/>
    </label>
</form>
<ul>
   <?php for($i=0; $i<sizeof($_SESSION['todocollection']); $i++) { ?>
<li>

        <?php  echo $_SESSION['todocollection'][$i]['caption'];?>

</li>
<?php  session_abort(); } ?>
</ul>
</body>
</html>


