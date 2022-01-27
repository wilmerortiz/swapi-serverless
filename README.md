# Serverless REST API with MySql and offline support

En este ejemplo podemos ejecutar localmente Serveless Framework, usando <a href="https://github.com/dherault/serverless-offline">serverless-offline plugin</a>. Implementando una REST API para realizar peticiones GET a la API pública de STAR WARS SWAPI traduciendo los atributos, para finalmente almacenarlo en MySql.

# Instalación de módulos
npm install

# Requerimientos
Crear dos archivos en la raiz del proyecto llamado secrets.json , otro db.config.js.
 - secrets.json
```json
{
  "DB_NAME": "",
  "DB_USER": "",
  "DB_PASSWORD": "",
  "DB_HOST": "127.0.0.1",
  "DB_PORT": 3306,
  "NODE_ENV": "api",
  "SWAPI_URL": "https://swapi.py4e.com/api/",
  "SECURITY_GROUP_ID": "",
  "SUBNET1_ID": "",
  "SUBNET2_ID": "",
  "SUBNET3_ID": "",
  "SUBNET4_ID": "",
  "SUBNET5_ID": "",
  "SUBNET6_ID": ""
}
```

 - db.config.js
```javascript
module.exports = {
  DB_NAME: "",
  DB_USER: "",
  DB_PASSWORD: "",
  DB_HOST: "127.0.0.1",
  DB_PORT: 3306,
  NODE_ENV: "api",
  SWAPI_URL: "https://swapi.py4e.com/api/",
  SECURITY_GROUP_ID: "",
  SUBNET1_ID: "",
  SUBNET2_ID: "",
  SUBNET3_ID: "",
  SUBNET4_ID: "",
  SUBNET5_ID: "",
  SUBNET6_ID: "",
  DIALECT: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```
- Importante, Crear una base
```sql
CREATE DATABASE swapi;
```

# Iniciar
- npm run dev

# endpoints
- films

| Resource / HTTP method | post | get |
| --- | --- | --- |
| api/films | crear un un registro | Lista todos los registros creados junto con algunos registros obtenidos de la api <a href="https://swapi.py4e.com/documentation">swapi</a> |
| api/films/id | --- | Se optiene un registro pasando por parametro un id. Segun el id se obtendra el registro de la base de datos o de la api swapi |
 
- Ejemplo para crear un registro por method post
```json
 {
    "title": "A New Hope", 
    "episode_id": 4, 
    "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....", 
    "director": "George Lucas", 
    "producer": "Gary Kurtz, Rick McCallum", 
    "release_date": "1977-05-25", 
    "characters": [
        "https://swapi.py4e.com/api/people/1/", 
        "https://swapi.py4e.com/api/people/2/", 
        "https://swapi.py4e.com/api/people/3/", 
        "https://swapi.py4e.com/api/people/4/", 
        "https://swapi.py4e.com/api/people/5/", 
        "https://swapi.py4e.com/api/people/6/", 
        "https://swapi.py4e.com/api/people/7/", 
        "https://swapi.py4e.com/api/people/8/", 
        "https://swapi.py4e.com/api/people/9/", 
        "https://swapi.py4e.com/api/people/10/", 
        "https://swapi.py4e.com/api/people/12/", 
        "https://swapi.py4e.com/api/people/13/", 
        "https://swapi.py4e.com/api/people/14/", 
        "https://swapi.py4e.com/api/people/15/", 
        "https://swapi.py4e.com/api/people/16/", 
        "https://swapi.py4e.com/api/people/18/", 
        "https://swapi.py4e.com/api/people/19/", 
        "https://swapi.py4e.com/api/people/81/"
    ], 
    "planets": [
        "https://swapi.py4e.com/api/planets/1/", 
        "https://swapi.py4e.com/api/planets/2/", 
        "https://swapi.py4e.com/api/planets/3/"
    ], 
    "starships": [
        "https://swapi.py4e.com/api/starships/2/", 
        "https://swapi.py4e.com/api/starships/3/", 
        "https://swapi.py4e.com/api/starships/5/", 
        "https://swapi.py4e.com/api/starships/9/", 
        "https://swapi.py4e.com/api/starships/10/", 
        "https://swapi.py4e.com/api/starships/11/", 
        "https://swapi.py4e.com/api/starships/12/", 
        "https://swapi.py4e.com/api/starships/13/"
    ], 
    "vehicles": [
        "https://swapi.py4e.com/api/vehicles/4/", 
        "https://swapi.py4e.com/api/vehicles/6/", 
        "https://swapi.py4e.com/api/vehicles/7/", 
        "https://swapi.py4e.com/api/vehicles/8/"
    ], 
    "species": [
        "https://swapi.py4e.com/api/species/1/", 
        "https://swapi.py4e.com/api/species/2/", 
        "https://swapi.py4e.com/api/species/3/", 
        "https://swapi.py4e.com/api/species/4/", 
        "https://swapi.py4e.com/api/species/5/"
    ], 
    "created": "2014-12-10T14:23:31.880000Z", 
    "edited": "2014-12-20T19:49:45.256000Z", 
    "url": "https://swapi.py4e.com/api/films/1/"
}
```

- peoples

| Resource / HTTP method | post | get |
| --- | --- | --- |
| api/peoples | crear un un registro | Lista todos los registros creados junto con algunos registros obtenidos de la api <a href="https://swapi.py4e.com/documentation">swapi</a> |
| api/peoples/id | --- | Se optiene un registro pasando por parametro un id. Segun el id se obtendra el registro de la base de datos o de la api swapi |

- Ejemplo para crear un registro por method post

```json
 {
    "name": "Luke Skywalker", 
    "height": "172", 
    "mass": "77", 
    "hair_color": "blond", 
    "skin_color": "fair", 
    "eye_color": "blue", 
    "birth_year": "19BBY", 
    "gender": "male", 
    "homeworld": "https://swapi.py4e.com/api/planets/1/", 
    "films": [
        "https://swapi.py4e.com/api/films/1/", 
        "https://swapi.py4e.com/api/films/2/", 
        "https://swapi.py4e.com/api/films/3/", 
        "https://swapi.py4e.com/api/films/6/", 
        "https://swapi.py4e.com/api/films/7/"
    ], 
    "species": [
        "https://swapi.py4e.com/api/species/1/"
    ], 
    "vehicles": [
        "https://swapi.py4e.com/api/vehicles/14/", 
        "https://swapi.py4e.com/api/vehicles/30/"
    ], 
    "starships": [
        "https://swapi.py4e.com/api/starships/12/", 
        "https://swapi.py4e.com/api/starships/22/"
    ], 
    "created": "2014-12-09T13:50:51.644000Z", 
    "edited": "2014-12-20T21:17:56.891000Z", 
    "url": "https://swapi.py4e.com/api/people/1/"
}
```
