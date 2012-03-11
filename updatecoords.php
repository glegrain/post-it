<?php 
if(!isset($_POST["data"]))
	die("Sorry, I can't find any coordinates !");
?>

<?php 
require_once('Connections/dbconn.php');
require_once('GetSQLValueString.php'); 
?>

<?php 

//TODO: Clean up json decoding
$data = json_decode(stripcslashes($_POST["data"])); 



//Select db
mysql_select_db($database_dbconn);

//Update the coordinates table
foreach($data->coords as $item){
	 $postId = $item->postId;
   $x = $item->x;
   $y = $item->y;
	$updateSQL = sprintf("UPDATE `coordinates` SET x=%s, y=%s WHERE `id_post`=%s", 
    GetSQLValueString($x,"long"),
    GetSQLValueString($y,"long"),
    GetSQLValueString($postId,"int")); //Change to INSERT and ON DUPLACTE KEY ....
	
	$result = mysql_query($updateSQL,$dbconn) or die(mysql_error());
  if(mysql_affected_rows()==0)
    die("Error: Post $postId does not exist.");
}
echo "0";
mysql_close($dbconn);