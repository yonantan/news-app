# How do I run this?

1. Add you API key from newsapi.org to the .env file (follow the example in .env-example)
2. Add your postgres DB connection to the .env file (you can spin up an instance in 1 min using railway.app)
3. Open a terminal and run:

```bash
npm i
npx prisma db push
npm run dev
```

# Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.
