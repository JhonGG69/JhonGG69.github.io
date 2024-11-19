<?php

function save_data_supabase($email,$passwd){
    //supabase database configuration
    $SUPABASE_URL = 'https://ehaoerfgnldsexbbpmes.supabase.co';
    $SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYW9lcmZnbmxkc2V4YmJwbWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzODg2OTAsImV4cCI6MjA0NTk2NDY5MH0.nT5hQDxOJhr_dpK-sivQvHj5oxlcurAiK8830frV-wo';
    
    $url = "$SUPABASE_URL/rest/v1/users";
    $data= [
        "email" => $email,
        "password" => $passwd,
    ];

    $options = [
        'http' =>[
            'header' => [
                "Content-Type: application/json",
                "Authorization: Bearer $SUPABASE_KEY",
                "apiKey: $SUPABASE_KEY"
            ],
            'method' => 'POST',
            'content' => json_encode($data),
        ],

    ];
    $context = stream_context_create($options);
    $response = file_get_contents($url, true, $context);
    //$response_data = json_decode($response, true);

    if ($response === false) {
        echo "Error: Unable to save data to Supabase";
        exit;
    }
    echo "User has been created."; //. json_encode($response_data);
}
//nombre de html ['email'];
//Db connection
require('../../../db_connection.php');
//get data from register form


$email = $_POST['email'];
$pass = $_POST['passwd'];
//Encrypt password with md5 hashing algoritm
$enc_pass = md5($pass);

/*show password and email
echo "email:" . $email;
echo "<br>Password:" . $pass;
echo "<br>Enc. Password " . $enc_pass;
*/
//validate if email already exists
$query = "SELECT * FROM users WHERE email = '$email'";
$result = pg_query($conn, $query);
$row = pg_fetch_assoc($result);
if ($row) {
    echo "<script>alert('Email already exists!')</script>";
    header ('refresh:0; url=http://127.0.0.1/LaPlazaDigital/api/config/register_form.html');
    exit();
}
// Query to insert data into users table
$query = "INSERT INTO users (email,password)
VALUES ('$email', '$enc_pass');
";
//Execute the query
$result = pg_query($conn, $query);
if ($result) {
        save_data_supabase($email, $enc_pass);
        echo "<script>alert('Registration successful!')</script>";
        header ('refresh:0; url=http://127.0.0.1/LaPlazaDigital/api/config/src/perfilComprador.html');
    
} else {
    echo "Registration failed!";
}
pg_close($conn);
?>