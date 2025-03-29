require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json()); // Permitir JSON en peticiones
app.use(cors()); // Habilitar CORS para el frontend

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("✅ Conectado correctamente a MongoDB Atlas");
}).catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
});

// Definir un modelo de datos (Usuarios)
const User = mongoose.model("User", new mongoose.Schema({
    name: String,
    email: String,
    password: String, // Agregué el campo password si es necesario
}));

// Ruta para obtener todos los usuarios
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

// Ruta para registrar usuarios
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar usuario" });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
