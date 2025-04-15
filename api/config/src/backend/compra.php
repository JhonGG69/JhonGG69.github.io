<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $direccion = $_POST['direccion'];
    $producto = $_POST['producto'];
    $cantidad = $_POST['cantidad'];
    $metodo_pago = $_POST['metodo_pago'];

    // Configuración de Supabase
    $SUPABASE_URL = 'https://hbqhqycpjpngoaocwwga.supabase.co';
    $SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicWhxeWNwanBuZ29hb2N3d2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NTI0MzEsImV4cCI6MjA0NzUyODQzMX0.0EB4R8we_DOPvgZqwFmJBTjzpq3pveOShkWxQ0flZcM';

    // Obtener ID del usuario basado en el email
    $usuario_id = obtenerIdUsuario($email);

    if (!$usuario_id) {
        echo "Error: Usuario no encontrado.";
        exit;
    }

    // Datos a enviar a Supabase
    $data = [
        'id_usuario' => $usuario_id,
        'id_producto' => $producto,
        'cantidad' => $cantidad
    ];

    // Inicializar cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$SUPABASE_URL/rest/v1/compra");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: $SUPABASE_KEY",
        "Content-Type: application/json",
        "Authorization: Bearer $SUPABASE_KEY"
    ]);

    $response = curl_exec($ch);
    $info = curl_getinfo($ch);

    if ($response === false) {
        echo "Error: Unable to save data to Supabase. Curl error: " . curl_error($ch);
        var_dump($info); // Imprime información detallada de la solicitud
    } else {
        echo "<h1>Compra realizada con éxito</h1>";
        echo "<p>Gracias, $nombre. Tu compra del producto ID $producto ha sido procesada.</p>";
        echo "<p>Recibirás un correo de confirmación en $email.</p>";
    }

    curl_close($ch);
} else {
    echo "<h1>Error en la compra</h1>";
    echo "<p>Ha ocurrido un error al procesar tu compra. Por favor, intenta de nuevo.</p>";
}

function obtenerIdUsuario($email) {
    $SUPABASE_URL = 'https://hbqhqycpjpngoaocwwga.supabase.co';
    $SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicWhxeWNwanBuZ29hb2N3d2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NTI0MzEsImV4cCI6MjA0NzUyODQzMX0.0EB4R8we_DOPvgZqwFmJBTjzpq3pveOShkWxQ0flZcM';
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$SUPABASE_URL/rest/v1/usuario?select=id&id_usuario=eq.$email");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: $SUPABASE_KEY",
        "Authorization: Bearer $SUPABASE_KEY"
    ]);

    $response = curl_exec($ch);
    if ($response === false) {
        die("Error: Unable to fetch user ID. Curl error: " . curl_error($ch));
    }

    $result = json_decode($response, true);
    curl_close($ch);

    return $result[0]['id'];
}
?>
