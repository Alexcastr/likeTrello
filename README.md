#Next js liketrellopara
correr localmente, se necesita la base de datos

```
docker-compose up -d

```

*El -d, significa __detached__

* MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

## configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__


## llenar la bd con informacion de prueba 

llamar a:
```
mongodb://localhost:3000/api/seed
```