This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Supabase setup

1. Crie um projeto no [Supabase](https://supabase.com/) e uma tabela `peptides` com, no mínimo, as colunas abaixo:
   - `id` (uuid, primary key, default value `uuid_generate_v4()`)
   - `name`, `sequence`, `mechanism`, `origin`, `status` (todas `text`)
2. Na raiz do projeto, crie um arquivo `.env.local` com as credenciais do projeto:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://<sua-instancia>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
```

3. Reinicie o servidor de desenvolvimento após alterar variáveis de ambiente:

```bash
npm run dev
```

O componente em `src/app/page.tsx` já consome diretamente a tabela `peptides`. Qualquer mudança na tabela aparecerá no painel ao recarregar a página.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
