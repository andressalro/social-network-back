# social-network-back

### Versión NodeJs 12
### Versión npm 6
### BASE DE DATOS NOSQL MONGODB 5.0

Se decidió usar una base de datos NoSQL debido a que para una red social no es necesario manejar relaciones tan estrictas entre las entidades. MongoDB permite manejar datos semiestructurados. 

![image](https://user-images.githubusercontent.com/40213377/155927288-48359a75-b082-4f12-a61e-dd48f72706f2.png)


### .env
Variables de entorno requeridas:

> PORT
> 
> MONGO_HOST 
> 
> MONGO_USER
> 
> MONGO_PASS
> 
> JWT_TOKEN_SECRET
> 
> JWT_TOKEN_ISSUER

### Instalar dependencias

> npm install

### Ejecutar servicio en local

> npm run dev 

## Endpoints

Se usó la herramienta Insomnia como cliente REST.

*Registrar usuario:* /auth/sign-up

![image](https://user-images.githubusercontent.com/40213377/155926559-491c37c7-5104-4910-b31b-0ee0b9dd6924.png)

*Iniciar sesión:* /auth/sign-up

![image](https://user-images.githubusercontent.com/40213377/155926624-db6bc542-7183-4fe8-b8a6-9400735551d1.png)

### Endpoints protegidos con JWT Passport

Requieren el envío del JWT generado al usuario (sirve para la identificación y contextualización del usuario, en cada Endpoint).

*Crear publicación:* /api/v1/posts

![image](https://user-images.githubusercontent.com/40213377/155926800-af1d400d-31d2-47c7-9d44-ba3e387bae11.png)

*Listar publicaciones:* /api/v1/posts

#### Se usó el patrón HATEOAS

![image](https://user-images.githubusercontent.com/40213377/155926838-e8b3495c-0ce4-44ed-a818-c184fb975f58.png)

*Eliminar publicación:* /api/v1/posts

![image](https://user-images.githubusercontent.com/40213377/155926907-7788a347-4ab3-424b-b4f7-f4c2b809a500.png)

*Listar publicaciones por usuario:* /api/v1/user/post

![image](https://user-images.githubusercontent.com/40213377/155927000-1e284ba7-8d63-4ba6-87a6-ca61a2c46430.png)

