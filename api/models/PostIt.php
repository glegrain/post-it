<?php
/**
*	POSTIT MODEL
* An instance of this class represents a Post-it
* 
* @author Guillaume Legrain, <legrainguillaume@gmail.com>
*/


//TODO: send error if there is no data
class PostIt
{
	public $post_id;
	public $title;
	public $message;
	public $color;
	///public $post_coord_x;

	public $hostname_dbconn = "localhost";
public $database_dbconn = "postit";
public $username_dbconn = "dbuser";
public $password_dbconn = "g}&9DN&2Ex3.6V:&1_00";
public $dbconn = new MySqlDb($hostname_dbconn,$username_dbconn, $password_dbconn, $database_dbconn);

	//public function setColor(); //TODO
	//public function setSize();  //TODO
	
	public function save($username = 0, $password = 0)
	{
		$this->insert();
	}

	public function insert($username = 0,$password = 0)		//TODO: Clean up (remove all procedural SQL things)
	{
		//Include connection to database
		include_once("../Connections/dbconn.php");
		//Secure SQL Queries
		include_once('../GetSQLValueString.php');
	
		//Hash password
		$userhash = sha1("{$username}_{$password}");
		

		$data = $this->toArray();
		//var_dump($data);

		if(isset($color))
			$deccolor = hexdec($color);

		mysql_select_db($database_dbconn,$dbconn);
		//Update the coordinates table
		$insertSQL = sprintf("
			INSERT INTO `posts`(`title`, `message`) VALUES (%s,%s);",
			GetSQLValueString($data['title'],"text"),
			GetSQLValueString($data['message'],"text"));

		$result = mysql_query($insertSQL,$dbconn) or die(mysql_error());
		//mysql_close($dbconn);

		//$this->setcords(); //TODO
		$insertSQLcoords = "INSERT INTO `coordinates` (`id_post`,`x`, `y`) VALUES (LAST_INSERT_ID(),100,100)";
		$resultCoords = mysql_query($insertSQLcoords,$dbconn) or die(mysql_error());
		mysql_close($dbconn);
	}
	
	/**
	 * Get All posts
	 * @param  integer $username  Client's username
	 * @param  integer $password  Client's password
	 * @return array
	 */
	public function getAllItems($username = 0,$password = 0)  //Working, but needs to be cleaned
	{
		//self::_checkIfUserExists($username,$password); //When user db implemented
		
		$postIts = array();

		//Include connection to database
		include_once("../Connections/dbconn.php");
		//Select MySQL Database
		mysql_select_db($database_dbconn,$dbconn);
		
		//Query Posts
		$query_getPosts = "SELECT * FROM posts INNER JOIN coordinates USING(`id_post`) ORDER BY `rank` DESC";
		$getPosts = mysql_query($query_getPosts) or die(mysql_error());
		//$row_getPosts = mysql_fetch_assoc($getPosts);
		while ($row = mysql_fetch_array($getPosts)) { //or mysql_fecth_object, depending if you need to return array of object or simple multidimensinal array
    		array_push($postIts,$row);
		}
		//$totalRows_getPosts= mysql_num_rows($getPosts);
		mysql_free_result($getPosts);
		return $postIts;
	}

	public function getItem($id_post)		//Working, but needs to be cleaned
	{
		//Include connection to database
		include_once("../Connections/dbconn.php");
		//Secure SQL Queries
		include_once('../GetSQLValueString.php');
		//Select MySQL Database
		mysql_select_db($database_dbconn,$dbconn);
		
		//Query Posts
		$query_getPosts = sprintf("SELECT * FROM posts INNER JOIN coordinates USING(`id_post`) WHERE id_post=%s",
			GetSQLValueString($id_post,'int'));
		$getPosts = mysql_query($query_getPosts) or die(mysql_error());
		$post_record = mysql_fetch_array($getPosts);
		mysql_free_result($getPosts);
		
		return $post_record;
	}

	/**
	 * Convert object to array
	 * @return array
	 */
	public function toArray()
	{
		return array(
			'id_post'=>$this->id_post,
			'title'=>$this->title,
			'message'=>$this->message,
			'color'=>$this->color
		);
	}

	public function updateCoords()  	//Working, but needs to be cleaned
	{
		require_once '../Connections/dbconn.php';
		require_once '../GetSQLValueString.php';

		var_dump($this);
		$updateSQL = sprintf("UPDATE `coordinates` SET x=%s, y=%s WHERE `id_post`=%s", 
    	GetSQLValueString($this->coord_x,"long"),
  		GetSQLValueString($this->coord_y,"long"),
   		GetSQLValueString($this->post_id,"int")); //Change to INSERT and ON DUPLACTE KEY ....
	
		$result = mysql_query($updateSQL,$dbconn) or die(mysql_error());
 	 	if(mysql_affected_rows()==0)
   			throw new Exception("Post $this->post_id does not exist.");
		
		return "Coordinates Updated";
	}

	private static function _checkIfUserExists($username, $password)	//TODO
	{	
		//Hash password
		$userhash = sha1("{$username}_{$password}");
		if(0 /*Check if !valid*/)
			throw new Exception('Username  or Password is invalid');
		return true;
	}

	public function testQuery() {
		$row = $dbconn->query("SELECT * FROM posts");
		print_r($row);
		var_dump($this);

		return 0;
	}
}