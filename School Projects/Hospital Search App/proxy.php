<?php
	$URL = "https://www.metaweather.com/api/location/search/?query=";

	$query = "san";

	$combine = $URL . $query;

	$opts = array('http' =>
			array(
					'method'  => 'GET',
					'header'  => 'Content-Type: application/json',
			)
	);
	$context = stream_context_create($opts);

	$result = file_get_contents($combine, false, $context);

	header('content-type:application/json');
	header("Access-Control-Allow-Origin: *");
	echo $result;
?>