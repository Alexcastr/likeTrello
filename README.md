#Next js liketrello




Proyecto drag and drop parecido a Trello
![Trello ui image]
(https://raw.githubusercontent.com/Alexcastr/likeTrello/main/public/liketrelloimage.png)



correr localmente, se necesita la base de datos

```
docker-compose up -d

```

*El -d, significa __detached__

* MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb

```

* Reconstruir los modulos de node y levantar Next
```
  yarn install
  yarn dev
```

## configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__


## llenar la bd con informacion de prueba 

llamar a:
```
mongodb://localhost:3000/api/seed
```