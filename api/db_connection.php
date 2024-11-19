<?php

    /*$number1 = 20;
    $number2 = 30;
    $addition =  $number1 + $number2;
    echo $addition;
    */

    /*
    PostgresSQL Database connection 
    Developer: Jhon
    */
    $host = "localhost";  //127.0.0.1
    $username = "postgres"; 
    $password = "JhonkigG";
    $dbname = "beta";
    $port = "5432";
    
    $data_connection = "
    host=$host
    port=$port
    dbname=$dbname
    user=$username
    password=$password
    ";
    
    $conn = pg_connect($data_connection);

    if(!$conn){
        die("Connection failed: ". pg_last_error());
    }else{
        echo "Connected successfully";
    }

    //pg_close($conn);

?>