<?php 
session_start();
header("Location: {$_SERVER['HTTP_REFERER']}");

if(isset($_POST['todo']))
array_push($_SESSION['todocollection'],['caption'=> $_POST['todo'], 'iscompleted'=>false]);
?>
