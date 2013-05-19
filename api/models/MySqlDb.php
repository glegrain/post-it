<?php
/**
 * Sql class (i think this is more a controller than a model)
 * 
* @author Guillaume Legrain, <legrainguillaume@gmail.com>
 */
class MySqlDb
{
	protected $_mysql;
	protected $_where = array();
   	protected $_query;
   	protected $_paramTypeList;
	public $connected = FALSE; //I think i can change this to private
	

	/**
	 * Connect to database on class instantiation
	 * @param  string $host     The MySQL server
	 * @param  string $username The username
	 * @param  string $password The password 
	 * @param  string $database Database name to connect to
	 * @return bool   $connected connection status TRUE or Exception
	 */
	public function __Construct($host,$username,$password,$database)
	{
		//Connect to database
		$this->_mysql;
		$dbconn = mysql_pconnect($host, $username, $password);
		if(!$dbconn){
			$connected = FALSE; //This line is pretty much useless since connected is already set to FALSE
			throw new Exception(trigger_error(mysql_error(),E_USER_ERROR));
		}
		else
			$connected = TRUE;

	}

	public function select_db($database)
	{
		mysql_select_db($database);
	}

	public function query($query) {
		$this->_query = filter_var($query,FILTER_SANITIZE_STRING);
		$stmt = $this->_mysql->prepare($this->_query);
		$stmt->execute();

		$results = $this->_dynamicBindResults($stmt);
		return($results);
	}

	public function get($tableName, $numRows = NULL) {
		$this->_query = "SELECT * FROM $tableName";
	}


   /**
    * This helper method takes care of prepared statements' "bind_result method
    * , when the number of variables to pass is unknown.
    *
    * @param object $stmt Equal to the prepared statement object.
    * @return array The results of the SQL fetch.
    */
   protected function _dynamicBindResults($stmt) 
   {
      $parameters = array();
      $results = array();

      $meta = $stmt->result_metadata();

      while ($field = $meta->fetch_field()) {
         $parameters[] = &$row[$field->name];
      }

      call_user_func_array(array($stmt, 'bind_result'), $parameters);

      while ($stmt->fetch()) {
         $x = array();
         foreach ($row as $key => $val) {
            $x[$key] = $val;
         }
         $results[] = $x;
      }
      return $results;
   }


   /**
   * Method attempts to prepare the SQL query
   * and throws an error if there was a problem.
   */
   protected function _prepareQuery() 
   {
      if (!$stmt = $this->_mysql->prepare($this->_query)) {
         trigger_error("Problem preparing query", E_USER_ERROR);
      }
      return $stmt;
   }


   public function __destruct() 
   {
   		//FIXME
		//$this->_mysql->close();
   }

}