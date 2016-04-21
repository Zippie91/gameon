<?php
$save_dir = "/games";
$file_name = "newgame.json";

$myFile = $save_dir . file_name;
$fh = fopen($myFile, 'w') or die("can't open file");
$stringData = $_POST["data"];
fwrite($fh, $stringData);
fclose($fh);
?>