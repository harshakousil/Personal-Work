<?php

$file = "todo.txt";
if (file_exists($file)) {
    $fileItem = file_get_contents($file);
    $todoCollection = unserialize($fileItem);
} else {
    $todoCollection = [];
}

array_push($todoCollection, ['todo' => $_POST['todo'], 'isCompleted' => false]);
$fileItem = serialize($todoCollection);
file_put_contents($file, $fileItem);
header("Location: {$_SERVER['HTTP_REFERER']}");
?>
