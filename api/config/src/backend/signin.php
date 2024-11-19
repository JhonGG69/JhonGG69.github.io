<?php
    //DB connection
    require('../../config/db_connection.php');

    //Get data login from submission
    $email = $_POST['email'];
    $pass = $_POST['passwd'];

    //Encrypt password with md5 hashing algoritm
    $enc_pass = md5($pass);
    //Query
$query = 
   "SELECt * FROM users WHERE email = '$email' and password = '$enc_pass'";
$result = pg_query($conn, $query);
$row = pg_fetch_assoc($result);

if ($row) {
    header ('refresh:0; url=http://127.0.0.1/LaPlazaDigital/home.php');
}else{
    echo "<script>alert('Invalid Email or Password!')</script>";
    header ('refresh:0; url=http://127.0.0.1/beta/api/src/login_form.html');
}

pg_close($conn);


?>