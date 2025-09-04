# Linkly 🔗

En enkel fullstack-applikation för att förkorta långa länkar.\
Byggd med **Next.js**, **Prisma**, **MongoDB**, **Tailwind CSS** och
**shadcn/ui**.\
Projektet inkluderar automatiserade **end-to-end tester** med Cypress
(både med mockad data och riktig databas).

------------------------------------------------------------------------


## Kom igång

### 1. Installera beroenden

``` bash
npm install
```

### 3. Miljövariabler

Skapa en `.env`-fil i projektets rot och lägg till din MongoDB URL:

``` env
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/linkly"
```

### 4. Databas-migrering

Kör Prisma för att synka databasen:

``` bash
npx prisma db push
```

### 5. Starta utvecklingsservern

``` bash
npm run dev
```

Appen är nu tillgänglig på <http://localhost:3000>.

------------------------------------------------------------------------

## Testning

Projektet använder **Cypress** för E2E-tester.\
Det finns två uppsättningar tester: 1. **Mockade API-anrop** → snabb
testning utan databas\
2. **Riktiga API-anrop** → full integration med MongoDB

### Kör Cypress tester

``` bash
# Öppna Cypress UI
npm test

# Eller kör i terminal
npm test:run
```