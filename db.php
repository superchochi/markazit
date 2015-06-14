<?php
function openDBConnection() {
	$link = mysql_connect ( "localhost", "bigbest_genadi", "GenadiVidenov100" );
	if (! $link) {
		die ( 'Could not connect: ' . mysql_error () );
	}
	mysql_set_charset ( 'utf8', $link );
	$db_selected = mysql_select_db ( 'bigbest_markazit', $link );
	if (! $db_selected) {
		die ( 'Can\'t use bigbest_markazit : ' . mysql_error () );
	}
	return $link;
}
function getItems() {
	$category = $_GET ["category"];
	$limit = $_GET ["limit"];
	$offset = $_GET ["offset"];
	if (! is_numeric ( $category ) || ! is_numeric ( $limit ) || ! is_numeric ( $offset )) {
		die ( "Missing parameter!" );
	}
	$link = openDBConnection ();
	/*
	 * columns: id, weight, price, path, category, param1, param2, param3, param4, mag_nom
	 */
	$query = sprintf ( "select id, param1, price, path from items where category=%d limit %d offset %d", mysql_real_escape_string ( $category ), mysql_real_escape_string ( $limit ), mysql_real_escape_string ( $offset ) );
	$result = mysql_query ( $query, $link );
	$arr = array ();
	$i = 0;
	while ( $row = mysql_fetch_array ( $result ) ) {
		$tmp = array (
				$row ['id'],
				$row ['param1'],
				$row ['price'],
				$row ['path'] 
		);
		$arr [$i] = $tmp;
		$i ++;
	}
	header ( 'Content-type: application/json' );
	echo json_encode ( $arr );
	mysql_free_result ( $result );
	mysql_close ( $link );
}
function getItem() {
	$id = $_GET ["id"];
	if (! is_numeric ( $id )) {
		die ( "Missing parameter!" );
	}
	$link = openDBConnection ();
	/*
	 * columns: id, weight, price, path, category, param1, param2, param3, param4, mag_nom
	 */
	$query = sprintf ( "select weight, price, path, param1, param2, param3, param4 from items where id=%d", mysql_real_escape_string ( $id ) );
	$result = mysql_query ( $query, $link );
	$row = mysql_fetch_row ( $result );
	$arr = array (
			$row [0],
			$row [1],
			$row [2],
			$row [3],
			$row [4],
			$row [5],
			$row [6] 
	);
	header ( 'Content-type: application/json' );
	echo json_encode ( $arr );
	mysql_free_result ( $result );
	mysql_close ( $link );
}
function getCount() {
	$category = $_GET ["category"];
	if (! is_numeric ( $category )) {
		die ( "Missing parameter!" );
	}
	$link = openDBConnection ();
	$query = sprintf ( "select count(*) from items where category=%d", mysql_real_escape_string ( $category ) );
	$result = mysql_query ( $query, $link );
	$count = mysql_result ( $result, 0 );
	echo $count;
	mysql_free_result ( $result );
	mysql_close ( $link );
}

$function = $_GET ["function"];
if (! $function) {
	die ( "Function not specified!" );
}
switch ($function) {
	case "getItems" :
		getItems ();
		break;
	case "getCount" :
		getCount ();
		break;
	case "getItem" :
		getItem ();
		break;
	default :
		die ( "Unknown function " . $function );
}

?>