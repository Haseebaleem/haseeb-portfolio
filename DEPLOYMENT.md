# Deployment status

## Published

- Portfolio: https://haseeb-aleem.netlify.app
  - Existing Netlify site: `de667a2e-4138-4051-b741-bb59823f8071`
  - Build: `npm run build`; publish directory: `dist`
  - GitHub repository: https://github.com/Haseebaleem/haseeb-portfolio
- TextKit: https://haseeb-textkit.netlify.app
  - Netlify site: `5dc44dbe-cc95-4f6f-8851-f520d2456e07`
  - GitHub repository: https://github.com/Haseebaleem/TextKit
  - Built from a fresh GitHub checkout; 101 tests passed.
  - `netlify.toml` includes the build command and SPA fallback.
  - Initial publication used Netlify CLI; automatic Git deploys have not been configured for TextKit.

## Remaining full-stack deployments

The following apps currently have local backends only. Their portfolio entries intentionally have no live URL until a working end-to-end deployment is verified.

| Project | Hosting prerequisites |
| --- | --- |
| Inventory-POS | Node API, PostgreSQL, durable image upload storage, owner seed credentials |
| Marketplace | Node API, PostgreSQL, durable image upload storage, Next.js frontend |
| Task-Manager | Persistent Node HTTP/Socket.io server and PostgreSQL |
| NewsHub | Laravel/PHP runtime, PostgreSQL and server-side news-provider key |
| Auth-Boilerplate | Node API and PostgreSQL; API starter rather than a standalone frontend |
| Inkwell | Node API and MongoDB; current source implements auth and workspace foundation |
| iPanel | Private company project; no public deployment source selected |

Use isolated demo databases and synthetic records for public demos. Configure production frontend origins, HTTPS API URLs and runtime secrets before publication. Do not bundle backend secrets into frontend environment variables.

## Verification performed

- Portfolio: TypeScript and production build.
- Browser layout: 320, 375, 768 and 1440 pixel widths, no horizontal overflow.
- Mobile navigation, dialog Escape handling and focus restoration.
- TextKit: 101 unit tests, production build, deployed deep link and uppercase text transformation.
