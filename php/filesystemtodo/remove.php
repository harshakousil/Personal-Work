<?php
$index=$_REQUEST['index'];
$file="todo.txt";
$fileItem=file_get_contents($file);
$todoCollection=unserialize($fileItem);

array_splice($todoCollection,$index,1);
$fileItem=serialize($todoCollection);
file_put_contents($file,$fileItem);

header("Location: {$_SERVER['HTTP_REFERER']}");
?>

