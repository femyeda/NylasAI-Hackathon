<p align="center">
    <h3 align="center">AI Executive Assistant</h3>
</p>

<p align="center">
This is a simple but powerful executive assistant that will save you time reading emails for actionable items. The EA will read your incoming emails for todos and deadlines and create calendar events for them.

<br/>

## Getting Started

1. First, clone the repository.
2. Then, fill environment variables.

```
DATABASE_URL=

# Generate one here: https://generate-secret.vercel.app/32 (only required for localhost)
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Nylas
CALENDAR_ID=
CLIENT_ID=
CLIENT_SECRET=
ACCESS_TOKEN=

# OpenAI
OPENAI_API_KEY=
```

3. Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the tools used, take a look at the following resources:

-   [Langchain.com](https://www.langchain.com/) - learn about Next.js features and API.
-   [Learn Nylas.js](https://nylas.com/) - an interactive Next.js tutorial.


## Using the EA
You can deploy the EA to [Vercel](https://vercel.com) after adding your environment variables.