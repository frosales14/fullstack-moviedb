<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Movie API

1. Clone the repository or download the last changes
2. run
```
npm install
```
3. make sure to have the latest .env file, you can check the .env.template as reference
4. run de project with docker
```
docker-compose up -d
```
5. Hit the endpoint /api/seed/delete-tables to reset the data base to empty state (GET method)
6. Hit the endpoint /api/seed/run to insert the date to the DB (GET method)
7. now you can use the frontend