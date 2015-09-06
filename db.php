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
	$categories = $_GET ["categories"];
	$limit = $_GET ["limit"];
	$offset = $_GET ["offset"];
	if (! $categories || ! is_numeric ( $limit ) || ! is_numeric ( $offset )) {
		die ( "Missing parameter!" );
	}
	$link = openDBConnection ();
	/*
	 * columns: id, weight, price, path, category, param1, param2, param3, param4, mag_nom
	 */
	$query = sprintf ( "select id, param1, price, path from items where category in(%s) limit %d offset %d", mysql_real_escape_string ( $categories ), mysql_real_escape_string ( $limit ), mysql_real_escape_string ( $offset ) );
	$result = mysql_query ( $query, $link );
	$arr = array ();
	$i = 0;
	while ( $row = mysql_fetch_array ( $result ) ) {
		$tmp = array (
				$row ['id'],
				$row ['param1'],
				$row ['price'],
				$row ['path'],
		);
		$arr [$i] = $tmp;
		$i ++;
	}
	header ( 'Content-type: application/json' );
	echo json_encode ( $arr );
	mysql_free_result ( $result );
	mysql_close ( $link );
}
function searchItem() {
	$id = $_GET ["id"];
	if (! is_numeric ( $id )) {
		die ( "Missing parameter!" );
	}
	$link = openDBConnection ();
	/*
	 * columns: id, weight, price, path, category, param1, param2, param3, param4, mag_nom
	 */
	$query = sprintf ( "select id, param1, price, path from items where id=%d", mysql_real_escape_string ( $id ) );
	$result = mysql_query ( $query, $link );
	$row = mysql_fetch_row ( $result );
	$arr = array ($row [0], $row [1], $row [2], $row [3] );
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
	$query = sprintf ( "select weight, price, path, param1, param2, param3, param4, id from items where id=%d", mysql_real_escape_string ( $id ) );
	$result = mysql_query ( $query, $link );
	$row = mysql_fetch_row ( $result );
	$imageUrl = trim($row [2]);
	$imageUrl2 = str_replace ( ".jpg", "_2.jpg", $imageUrl );
	$imageUrl3 = str_replace ( ".jpg", "_3.jpg", $imageUrl );
	$imageUrl4 = str_replace ( ".jpg", "_4.jpg", $imageUrl );
	$img2 = file_exists("../".$imageUrl2) ? $imageUrl2 : "";
	$img3 = file_exists("../".$imageUrl3) ? $imageUrl3 : "";
	$img4 = file_exists("../".$imageUrl4) ? $imageUrl4 : "";
	//$row [3] = $imageUrl2;
	//$row [4] = $imageUrl3;
	//$row [5] = $imageUrl4;
	$arr = array (
			$row [0],
			$row [1],
			$row [2],
			$img2,
			$img3,
			$img4,
			$row [3],
			$row [4],
			$row [5],
			$row [6],
			$row [7]
	);
	header ( 'Content-type: application/json' );
	echo json_encode ( $arr );
	mysql_free_result ( $result );
	mysql_close ( $link );
}
function getCount() {
	$categories = $_GET ["categories"];
	if (! $categories) {
		die ( "Missing parameter!" );
	}
	$link = openDBConnection ();
	$query = sprintf ( "select count(*) from items where category in (%s)", mysql_real_escape_string ( $categories ) );
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
	case "searchItem" :
		searchItem ();
		break;
	default :
		die ( "Unknown function " . $function );
}

/*
 * function createCategoriesFilter($categories) {
 * $str = "";
 * for($i = 0; $i < count ( $categories ); $i ++) {
 * $str += ($categories[$i] + ",");
 * }
 * }
 */

?>