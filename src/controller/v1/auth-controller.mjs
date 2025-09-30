import jwt from "jsonwebtoken";
import userRepository from "../../repositories/user-repository.mjs";
import bcrypt from "bcrypt";
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET;

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        //Verificar si ya existe el email
        const existing = await userRepository.getUserByEmail(email);
        if (existing) return res.status(400).json({ message: "Email ya registrado" });
        //Hashear contraseña
        const hashed = await bcrypt.hash(password, 10);
        //Crear usuario
        const user = await userRepository.create({ name, email, password: hashed });
        //Responder sin la contraseña
        res.status(201).json({ id: user._id, name: user.name, email: user.email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userRepository.findUserByEmail(email);
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}