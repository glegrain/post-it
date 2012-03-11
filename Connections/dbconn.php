<?php
#Connection to the database_dbconn
$hostname_dbconn = "localhost";
$database_dbconn = "postit";
$username_dbconn = "dbuser";
$password_dbconn = "g}&9DN&2Ex3.6V:&1_00";
$dbconn = mysql_pconnect($hostname_dbconn, $username_dbconn, $password_dbconn) or trigger_error(mysql_error(),E_USER_ERROR); 
