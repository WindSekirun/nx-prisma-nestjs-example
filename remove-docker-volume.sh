docker-compose down
docker volume rm nx-prisma-nestjs-example_postgres-data
docker volume rm nx-prisma-nestjs-example_meilisearch-data
docker-compose up -d
yarn deploy