<?php
function save_data_supabase($email, $passwd){
    // Supabase database configuration
    $SUPABASE_URL = 'https://hbqhqycpjpngoaocwwga.supabase.co';
    $SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicWhxeWNwanBuZ29hb2N3d2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NTI0MzEsImV4cCI6MjA0NzUyODQzMX0.0EB4R8we_DOPvgZqwFmJBTjzpq3pveOShkWxQ0flZcM';

    $url = "$SUPABASE_URL/rest/v1/users";
    $data = json_encode([
        "email" => $email,
        "password" => $passwd,
    ]);

    // Initialize cURL
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        "apikey: $SUPABASE_KEY",
        "Authorization: Bearer $SUPABASE_KEY"
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_VERBOSE, true); // Enable detailed logs

    $response = curl_exec($ch);
    $info = curl_getinfo($ch);
    if ($response === false) {
        echo "Error: Unable to save data to Supabase. Curl error: " . curl_error($ch);
        var_dump($info); // Print detailed information about the request
    } else {
        echo "Response: " . $response;
    }
    curl_close($ch);
}

// DB connection
require('../../../db_connection.php');

// Get data from register form
$email = $_POST['email'];
$pass = $_POST['passwd'];

// Encrypt password with md5 hashing algorithm
$enc_pass = md5($pass);

// Validate if email already exists
$query = "SELECT * FROM users WHERE email = '$email'";
$result = pg_query($conn, $query);
$row = pg_fetch_assoc($result);
if ($row) {
    echo "<script>alert('Email already exists!')</script>";
    header('refresh:0; url=https://jhongg69.github.io/api/config/login_form.html');
    exit();
}

// Query to insert data into users table
$query = "INSERT INTO users (email, password) VALUES ('$email', '$enc_pass')";

// Execute the query
$result = pg_query($conn, $query);
if ($result) {
    save_data_supabase($email, $enc_pass);
    echo "<script>alert('Registration successful!')</script>";
    header('refresh:0; url=https://jhongg69.github.io/api/config/src/perfilComprador.html');
} else {
    echo "Registration failed!";
}
pg_close($conn);
?>
