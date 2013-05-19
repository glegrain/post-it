<?php 
require_once('Connections/dbconn.php');
require_once('GetSQLValueString.php'); 

//Select db
mysql_select_db($database_dbconn);

//Query Posts
$query_getPosts = "SELECT * FROM posts INNER JOIN coordinates USING(`id_post`) ORDER BY `rank` DESC";
$getPosts = mysql_query($query_getPosts) or die(mysql_error());
$row_getPosts = mysql_fetch_assoc($getPosts);
$totalRows_getPosts= mysql_num_rows($getPosts);

//TODO: perform a JSON request to get all post-it

?>


<?php do { ?>

				<div id="post<?php echo $row_getPosts["id_post"];?>" class="post-it" style="left: <?php echo $row_getPosts["x"];?>px; top: <?php echo $row_getPosts["y"];?>px; background-color: #<?php echo dechex($row_getPosts["color"]); ?>" >
					<h1><?php echo $row_getPosts["title"]?></h1>
					<p><?php echo $row_getPosts["message"]; ?></p>
				</div>

			<?php } while ($row_getPosts = mysql_fetch_assoc($getPosts)); ?>

<?php mysql_close($dbconn); ?>