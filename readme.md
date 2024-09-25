```
# E-Commerce Store

This project implements an e-commerce store with an admin dashboard and a storefront, deployed on Google Cloud Run.

## Technologies Used

- **Next.js:** Framework for building server-side rendered React applications.
- **Kinde Auth:** Authentication provider offering passwordless login, OAuth, and MFA.
- **Neon:** Serverless, Postgres-compatible database.
- **Prisma:** ORM for interacting with the database.
- **Stripe:** Payment processing platform.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Shadcn/UI:** Component library built with Radix UI and Tailwind CSS.
- **Google Cloud Run:** Platform for deploying and scaling containerized applications.
- **Upstash:** Serverless Redis database for managing cart functionality.
- **Recharts:** Charting library for data visualization.
- **Zod:** Schema validation library for type safety and data integrity.
- **Conform:** Validation library integrated with Zod for server-side validation.
- **Uploadthing:** File uploading service.

## Features

- Next.js App Router
- Kinde Authentication: Passwordless, OAuth (Google, GitHub), MFA.
- Stripe Payments and Webhooks
- Neon Database with Prisma ORM
- Upstash Redis for Cart Management
- Recharts for Chart Display
- Zod and Conform for Server-Side Validation
- File Uploads with Uploadthing
- Styling with Tailwind CSS and Shadcn/UI
- Deployment to Google Cloud Run

## Functionality

- **Admin Dashboard:** Manage products, orders, view sales data, etc. (see `app/dashboard/*`)
- **Storefront:** Browse products, add to cart, checkout, place orders (see `app/(storefront)/*`)

## Running Locally

1.  **Install Dependencies:** `pnpm install`
2.  **Set Up Environment Variables:** Create a `.env` file based on the example in `.github/workflows/google-cloudrun-source.yml`.
3.  **Start Development Server:** `pnpm dev`

## Deployment

This project is configured for deployment on Google Cloud Run.  The `.github/workflows/google-cloudrun-source.yml` file defines a GitHub Actions workflow to build and deploy the application.

You can follow these general steps for deploying to Google Cloud Run:

1.  **Containerize the application:** Build a Docker image of the application.
2.  **Push the image to a container registry:** Google Artifact Registry or Docker Hub are common choices.
3.  **Deploy to Cloud Run:** Use the `gcloud run deploy` command, specifying the container image and any required configurations or environment variables.

## Contributing

If you'd like to contribute to the project, feel free to fork the repository and submit pull requests.


```
