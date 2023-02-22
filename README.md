# setup database

createdb lets-meet
docker-compose up -d

if you need to create user
psql \lets-meet
CREATE USER postgres SUPERUSER;
quit -> \q

# start project

yarn install
./start/start_local.sh
