# Proyecto DFS - API Node.js

## Estructura del Proyecto

```
src/
├── config/          # Configuraciones de BD
├── controllers/     # Controladores (v1, v2, etc)
├── middleware/      # Middlewares
├── model/          # Modelos y esquemas
├── repositories/   # Repositorios
├── routes/         # Rutas (v1, v2, etc)
├── services/       # Servicios
├── stores/         # Almacenes
└── validations/    # Validaciones
api/
└── index.js        # Entry point para Vercel
```

## Instalación

```bash
npm install
```

### Dependencias:
- bcrypt
- cors
- dotenv
- express
- joi
- jsonwebtoken
- mongoose
- mongodb
- morgan
- redis
- xss

## Desarrollo Local

```bash
npm start
# o
npm run dev
```

## Deploy en Vercel

1. **Configurar variables de entorno en Vercel:**
   - `REDIS_URI`: URL de conexión a Redis
   - `MONGO_ATLAS_URI`: URL de conexión a MongoDB Atlas
   - `JWT_SECRET`: Clave secreta para JWT
   - `MONGO_BD_IN_USE`: "atlas"
   - `BASE_IN_USE`: "mongo"

2. **Conectar tu repositorio a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Las variables de entorno se configuran automáticamente

3. **La API estará disponible en:**
   - `https://tu-proyecto.vercel.app/api/v1/` (rutas públicas)
   - `https://tu-proyecto.vercel.app/api/v1/usuario/` (rutas de usuario)

## Orden de Desarrollo

1. Definir los modelos
2. Crear los repositories
3. Implementar los controladores
4. Configurar las rutas
5. Integrar en app.mjs