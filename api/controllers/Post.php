<?php
/**
*	POST CONTROLLER
* 
* @author Guillaume Legrain, <legrainguillaume@gmail.com>
*/

class Post 
{

	/**
	 * $_params  contains request parameters
	 * @var array
	 */
	protected $_params;
	
	public function __construct($params){
	   	$this->_params = $params;
	}

	//Testing GET http://post-it/api/index.php?controller=Post&action=test&variable1=123
	public function test(){
		$tempVar = PostIt::testQuery();
		//return $this->_params; //returns object to front controller
		return $tempVar;
	}

	//Basic CRUD functions:
	public function createPost() {


		//TODO: erro checking method
		if(!isset($this->_params['title']) || empty($this->_params['title']))
	 		throw new Exception("Please specify a title", 1);
	 	$post->post_id = $this->_params['title'];
	 	if(!isset($this->_params['message']) || empty($this->_params['message']))
	 		throw new Exception("Please specify as message ",1);

		$post = new PostIt();
		$post->title = $this->_params['title'];
		$post->message = $this->_params['message'];
		//$post->color = $this->_params['color'];
	
		$post->id_post = 1; //Change this crap
		$post->save();

		return $post->toArray();
	}


	public function readPost()	
	{
		$posts = PostIt::getAllItems();

		return $posts;
	} 		

	public function getPost()
	{
		if(!isset($this->_params['post_id']) || empty($this->_params['post_id']))
	 		throw new Exception("Please specify a post_id", 1);
		return PostIt::getItem($this->_params['post_id']);
	}

	public function updatePost()			//TODO
	{

		//Retreive PostIt
		$post = PostIt::getItem($this->_params['todo_id']);
		$todo->title = $this->_params['title'];
		$todo->message = $this->_params['description'];
		$todo->color = $this->_params['due_date'];
		$todo->rank = $this->_params['is_done'];
		//$todo->id_user = $this->_params['user_id'];
		
		//$todo->coord_x = $this->_params['x']; //To be merged with updateCoords()
		//$todo->coord_y = $this->_params['y'];

		//Update the PostIt

		throw new Exception("The functionality has not been implemented yet");
	} 	

	public function deletePost()			//TODO
	{
		throw new Exception("The functionality has not been implemented yet");
	}		



	//other functions:
	 public function setColor($newColor)
	 {
	 	$this->_params['color'] = $newColor;
	 }	

	 public function getColor()
	 {
	 	return $this->_params['color'];
	 }

	 public function updateCoords()		//Working, but needs to be cleaned
	{
	 	$post = new PostIt();
	 	if(!isset($this->_params['post_id']) || empty($this->_params['post_id']))
	 		throw new Exception("Please specify a post id", 1);
	 	$post->post_id = $this->_params['post_id'];
	 	if(!isset($this->_params['x']) || empty($this->_params['x']))
	 		throw new Exception("Check your coords", 1);
	 	$post->coord_x = $this->_params['x'];
	 	if(!isset($this->_params['y']) || empty($this->_params['y']))
	 		throw new Exception("Check your coords", 1);
	 	$post->coord_y = $this->_params['y'];

	 	return $post->updateCoords();
	 }
	 public function updateSize()		  	//TODO
	{
	 	return "The functionality has not been implemented yet";
	 }

	 public function updateRank()		  	//TODO
	{
	 	return "The functionality has not been implemented yet";
	 }

	 public function testPost()
	 {
	 	var_dump($this);
	 	var_dump($this->_params);
	 	//echo $this->post_coord_x;
		//$conn = new sql('localhost','dbuser','password','postit');
		var_dump($conn);
		//echo 'Your are using '.__CLASS__;
	 	return $this->_params;
	 }
}
