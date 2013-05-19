<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" /> 
	<title>Post-it</title>
	
	<!--Styles-->
	<link rel="stylesheet" type="text/css" href="css/main.css">
	
	<!--Google libraries, Uncomment when live-->
	<!--
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
	<script type="text/javascript" src="https://jquery-json.googlecode.com/files/jquery.json-2.3.min.js"></script>
-->

<!--Local libraries, for local testing-->
<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript" src="js/jquery.json-2.3.min.js"></script>
<!--UI events-->
<script type="text/javascript" src="js/events.js"></script> 

</head>
<body style="overflow: hidden;">
	<header>
		<ul>
			<li><a href="../index.php">Home</a></li>
			<li><a href="../instructions.html">Instructions</a></li>
			<li><a href="../about.html">About</a></li>
			<li><a href="#">Contact Us</a></li>
			<li style="float: right; padding-right: 50px"><a href="#" id="login-link">Login</a></li>
		</ul>
	</header>
	
	<div id="container">
			<!--SHOW POSTS-->
				<?php include('viewPosts.php'); ?>
			<!--END SHOWING POSTS-->
	</div>

	<div class="icon minus" style="right: 1%;
	top: 50px;width:27px; height: 27px;">&nbsp;</div>
	<div class="icon plus" style="right: 1%;
	top: 80px;width:27px; height: 27px;">&nbsp;</div>
	<div class="icon right" style="right: 1%;
	top: 50%;width:27px; height: 27px;">&nbsp;</div>
	<div class="icon left" style="left: 1%;
	top: 50%;width:27px; height: 27px;">&nbsp;</div>
	<div class="icon plus-round-big" style="right: 2%;
	bottom: 2%; width:40px; height: 40px;">&nbsp;</div>
</body> 
</html>