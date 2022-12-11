# Sendiit-backend

## Prerequisitos
1. Instalar mongodb
2. Ejecutar ```mongod``` desde la consola. (Asegurate de añadir el path a las variables de  entorno del sistema)

3. Instala npm
4. Estando dentro de la carpeta del proyecto, ejecuta el comando ```node index.js```

## Pasos
1. Duplica el archivo *.env.template* y renombralo por *.env*
2. Establecer la variables de entorno necesarias
	```
	PORT=4000
	DB_CNN=mongodb://localhost:27017/sendiit
	DB_CNN2=mongodb+srv://mern_user:fhoafrQ3wjUZ8PH4@calendardb.0ltgw87.mongodb.net/sendiit
	SECRET_JWT_SEED= *Solicitar con el equipo*
	EMAIL_USER= *Solicitar con el equipo*
	EMAIL_PASSWORD= *Solicitar con el equipo*
	EMAIL_ORIGINAL_PASSWORD=  *Solicitar con el equipo*
	```
	Donde:
	* PORT: es el puerto en donde correrá el servidor backend, localmente
	* DB_CNN: es la dirección de la base de datos local
	* DB_CNN2: es la dirección de la base de datos remota
	* EMAIL_USER: es el correo que usa el equipo para enviar emails
	* EMAIL_PASSWORD: es el password del correo anterior