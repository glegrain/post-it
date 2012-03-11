<?php
/**
*	Export SQL Database to a .sql file using system(mysqldump)
*/
require_once '../Connections/dbconn.php';

$backupFile = '../database.sql';
$command = "mysqldump --opt -h $hostname_dbconn -u $username_dbconn -p\"$password_dbconn\" postit > $backupFile"; //Make sure you can use the mysqldump command
system($command);