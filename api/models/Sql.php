<?php
/**
 * Sql class (i think this is more a controller than a model)
 * 
* @author Guillaume Legrain, <legrainguillaume@gmail.com>
 */
class Sql
{
	protected $_mysql;
	public $connected = FALSE; //I think i can change this to private
	

	/**
	 * Connect to database on class instantiation
	 * @param  string $host     The MySQL server
	 * @param  string $username The username
	 * @param  string $password The password 
	 * @param  string $database Database name to connect to
	 * @return [type]
	 */
	public function __Construct($host,$username,$password,$database)
	{
		//Connect to database
		$this->_mysql;
		$dbconn = mysql_pconnect($host, $username, $password);
		if(!$dbconn)
			throw new Exception(trigger_error(mysql_error(),E_USER_ERROR));
		else
			$connected = TRUE;

	}

	public function select($database)
	{
		mysql_select_db($database);
	}
}