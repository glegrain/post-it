<?php
/**
*	FRONT CONTROLLER FOR THE API
* 
* @author Guillaume Legrain, <legrainguillaume@gmail.com>
*/

/* MVC: Model View Controller design:
*  	Model: Read/Write into database
*  	View: Deal with the presentation of the layer : The client/website, for the API the view just json_encode
*  	Controller: Get data from models and present inside views, interacts between model and view.
*/


//Secure $_REQUEST from CSRF
$_REQUEST = array_merge($_GET, $_POST);

// HTTP GET request example: http://post-it/api/index.php?controller=controllerName&action=actionName&message=Lorem+Ipsum
//http://post-it/api/index.php?controller=Post&action=createpost&title=note+1&message=asdaasdasdasasd+adad+adad+sdsd&username=test&password=cc03e747a6afbbcbf8be7668acfebee5

//include models
include_once 'models/MySqlDb.php';
include_once 'models/postit.php';
include_once 'models/User.php';




//try catching any potential exceptions
try {
	//TODO: Secure JSON requests with AppID through an encrypted call
	//TODO: json_decode with Content-type set to Application/json

	//EXTRACT THE CONTROLLER AND ACTION FOR THE API CALL
	//$method = $_SERVER['REQUEST_METHOD'];
	//$params = $_SERVER['REQUEST_URI'];
	$params = $_REQUEST;
	//echo 'method'.$method.' ';
	//print_r($params);
	//$params = explode('/', $_SERVER['REQUEST_URI']);
	//print_r($params);
	//$params['controller'] = $params[2];
	//$params['controller'] = $_REQUEST['controller'];
	//$params['action'] = $params[3];
	//$params['action'] = $_REQUEST['action'];
	//print_r($params);

	//$_SERVER['REQUEST_METHOD']  
	//$_SERVER['REQUEST_URI']

	//check if controller is set
	if(!isset($params['controller']))
		throw new Exception("Error Processing Request, please specify a controller ", 1);
	//format controller request
	$controller = ucfirst(strtolower($params['controller']));
	
	//check if action is set
	if(!isset($params['action']))
		throw new Exception("Error Processing Request, please specify an action", 1);
	//format action
	$action = strtolower($params['action']);


	//MAKE THE NECESSARY CHECKS TO ENSURE THAT THE CONTROLLER AND ACTION EXIST
	//check if controller exists.
	if( file_exists("controllers/{$controller}.php"))
		include_once "controllers/{$controller}.php";
	else 
		throw new Exception("Error Processing Request, invalid controller.", 1);	
	//instantiate controller
	$controller = new $controller($params);
	

	//echo "<pre>";
	//var_dump($controller);
	//echo "</pre>";
	
	//Check if action exist
	if(!method_exists($controller, $action)) //TODO:change to is_callable
		throw new Exception("Error Processing Request, invalid action.", 1);
	
	//EXECUTE ACTION
	$result['data'] = $controller->$action();
	$result['success'] = TRUE;

} catch(Exception $e) {
	//catch any exceptions and report the problem
   $result = array();
   $result['success'] = FALSE;
   $result['errormsg'] = $e->getMessage();
}

//ECHO THE RESULT of the API call in JavaScriptObjectNotation (XML can easly be added)
echo json_encode($result);
//send HTTP status code
exit();
