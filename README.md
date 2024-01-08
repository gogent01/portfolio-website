# Georgy Mishurovsky's Personal Portfolio Website

Website link: [https://mishurovsky.com](https://mishurovsky.com)

![Portfolio Website Preview](https://mishurovsky.com/images/portfolio-website-preview.gif)

## How to deploy?

This is a Next 13 project. You'll first need to install NPM dependencies, and then run a local development server. Here are the relevant terminal commands:

```bash
# Install dependencies:
npm install

# Run a development server:
npm run dev
```

The app will launch on http://localhost:3000, and any changes in code will be reflected live. To deploy changes to a production environment, you can use specialized tools, such as Vercel, or create a production-optimized `build` folder using a command:

```bash
# Build a production version:
npm run build

# Test a production version locally:
npm run start
```

If the site works correctly, you can then deploy it using a preferred method using the contents of `build` folder.


## Troubleshooting

- Please make sure you're using Node.js version 16.14 or higher. This is the minimum Node version required by Next.js.

- When you run a dev server, you may notice a warning: _You have enabled experimental feature (outputFileTracingIncludes)_. This warning can safely be ignored. `outputFileTracingIncludes` is a configuration option required to make sure that MDX files are included when deploying the application to Vercel.

- If the dev server seems to be stuck on a stale error, and restarting the dev server doesn't help, you can clear Next's cache by deleting the `.next/cache` subdirectory. Also, clearing a browser's cache may help.
