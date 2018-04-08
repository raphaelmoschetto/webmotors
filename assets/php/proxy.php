<?php

$path = "";

if($_GET['selector'] == "null") 
	$path = "Make";
else if($_GET['selector'] == "marca")
	$path = "Model?MakeID=".$_GET['value'];
else if($_GET['selector'] == "modelo")
	$path = "Version?ModelID=".$_GET['value'];

	echo file_get_contents ("http://desafioonline.webmotors.com.br/api/OnlineChallenge/".$path);
?>