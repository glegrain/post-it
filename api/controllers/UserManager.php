<?php
/**
* USER MANAGEMENT CONTROLLER 
* 
* @author Guillaume Legrain, <legrainguillaume@gmail.com>
*/

class UserManager 
{
	
 	private $_params;

	public function __construct($params) {
		$this->_params = $params;
	}

	public function addUser() {
		$newUser = new user();

		//print_r($newUser);
		return 'addUser finished ';
	}

	public function getUserInfo()
	{	
		$user = new user();
		//$user->user_id = $this->_params['user_id']; //TODO:implement __set()
		if(!isset($this->_params['user_id']) or empty($this->_params['user_id']))
			throw new Exception("Please specify a user_id");
		$user_id = $this->_params['user_id'];
		$result = $user->getUserRecords($user_id);
		if(empty($result))
			throw new Exception("No matching users has been found");
		
		return $result;
	}

	public function test()
	{
		throw new Exception("The functionality has not been implemented yet");
	}
}