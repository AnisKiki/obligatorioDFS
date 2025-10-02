import { createClient } from "redis";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

console.log("REDIS_URI desde .env:", process.env.REDIS_URI ? "✅ Configurado" : "❌ No encontrado");
console.log("Entorno:", process.env.NODE_ENV || "desarrollo");

export const redisClient = createClient({
    url: process.env.REDIS_URI || "redis://localhost:6379",
    socket: {
        connectTimeout: 10000,
        lazyConnect: true,
    },
    retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            console.log('❌ Redis server no disponible');
            return new Error('Redis server no disponible');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Timeout de retry alcanzado');
        }
        if (options.attempt > 3) {
            return new Error('Se alcanzó el máximo de intentos');
        }
        return Math.min(options.attempt * 100, 3000);
    }
});

redisClient.on("error", (err) => {
    console.log('❌ Error en Redis:', err.message);
});

redisClient.on("reconnecting", () => {
    console.log("♻️ Intentando reconectar a Redis...");
});

redisClient.on("connect", () => {
    console.log("✅ Conectado a Redis");
});

export const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
            console.log("✅ Redis conectado exitosamente");
        }
    } catch (err) {
        console.error("❌ Error conectando a Redis:", err.message);
        // En producción, no fallar si Redis no está disponible
        if (process.env.NODE_ENV === 'production') {
            console.log("⚠️ Continuando sin Redis en producción");
            return null;
        }
        throw err;
    }
}

// Helper para operaciones seguras con Redis
export const safeRedisOperation = async (operation) => {
    try {
        if (!redisClient.isOpen) {
            await connectRedis();
        }
        return await operation(redisClient);
    } catch (err) {
        console.error("Error en operación Redis:", err.message);
        return null;
    }
}






// connectRedis();