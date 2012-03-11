<?php
/**
* USER MODEL
* 
* @author Guillaume Legrain, <legrainguillaume@gmail.com>
*/
class User 
{
	
	protected $_user_id;
	protected $_firstname;
	protected $_lastname;
	protected $_username;
	protected $_password;
	protected $_email;

	// public function __construct($user_id)
	// {
	// 	$user_record = self::_getUserRecords($user_id);
	// 	$this->_user_id = $user_record['user_id'];
	// 	$this->_firstname = $user_record['firstname'];
	// 	$this->_lastname = $user_record['lastname'];
	// 	$this->_username = $user_record['username'];
	// 	$this->_password = $user_record['password'];
	// 	$this->_email = $user_record['email'];
	// }

	public function getUserRecords($user_id)	//TODO:Secure query and clean up, this is only a mockup for testing
	{
		include_once '../Connections/dbconn.php';
		mysql_select_db($database_dbconn);
		$query_getUser = "SELECT * FROM users WHERE id_user = $user_id";
		$getUser = mysql_query($query_getUser,$dbconn);
		if(!$getUser)
			throw new Exception('SQL Error:'.mysql_error());
		$row_getUser = mysql_fetch_assoc($getUser);
		mysql_free_result($getUser);
		return $row_getUser;
	}

	public function insert()						//TODO
	{				
		throw new Exception("The functionality has not been implemented yet");
	}

	public function __get($value) 			//TODO
	{		
		throw new Exception("The functionality has not been implemented yet");
	}
  	 public function __set($name, $value) 	//TODO
  	 {
  	 	throw new Exception("The functionality has not been implemented yet");
  	 }
}
