<?php
echo $_POST["jsondata"];

$save_dir = "games";
$file_name = $_POST["gamename"] . ".json";
$saveFile = $save_dir . '/' . $file_name;

$fh = fopen($saveFile, 'w+') or die("can't open file");
$stringData = $_POST["jsondata"];
fwrite($fh, $stringData);
fclose($fh);
?>
