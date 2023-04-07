## Next.js project setup
#### Next.js
```bash
# create-next-app
# npx create-next-app --example with-tailwindcss nextjs-e2e --use-npm
npx create-next-app@13.2.5-canary.34 --tailwind nextjs-e2e --use-npm
npm i next@13.2.5-canary.34
```
```bash
# install package
npm i next-auth@4.18.6 @prisma/client@4.8.0 @next-auth/prisma-adapter@1.0.5 date-fns@2.29.3 zustand@4.1.5 zod@3.20.2 @heroicons/react@2.0.13
```
```bash
# install package
npm i -D prisma@4.8.0 @playwright/test@1.29.0
```
```bash
# install playwright
npx playwright install
```
#### Postgres DB
~~~bash
# start db
docker compose up -d
# remove db
docker compose rm -s -f -v
~~~
#### Prisma
~~~bash
# init
npx prisma init
# migrate
npx prisma migrate dev
# gen types
npx prisma generate
~~~
