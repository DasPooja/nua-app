# NUA Frontend Assignment

A mini e-commerce application built with React, TypeScript, Vite, SCSS Modules, React Router, Context API, and localStorage persistence.

## Features

* Product listing page using Fake Store API
* Responsive product grid layout
* Product detail page with image gallery
* Product variants (Color and Size selection)
* Stock states (In Stock, Low Stock, Sold Out)
* Deep-linkable variant selection using URL query parameters
* Shopping cart drawer
* Quantity management
* Cart badge with item count
* Cart persistence using localStorage
* Responsive mobile and desktop layouts

## Tech Stack

* React 19
* TypeScript
* Vite
* React Router
* Context API
* SCSS Modules
* Fake Store API

## Setup

Clone the repository:

git clone https://github.com/DasPooja/nua-app.git

Install dependencies:

npm install

Start the development server:

npm run dev

Create a production build:

npm run build

Preview production build:

npm run preview

## Folder Structure

src/
├── api/
├── components/
├── context/
├── data/
├── hooks/
├── pages/
├── router/
├── styles/
└── types/

## Design Decisions

* Context API was used for cart state and shared UI state because the application does not have a large enough state surface area to justify Redux or another external state management library.
* Product variants were implemented using a local data layer because Fake Store API does not provide color, size, or stock information.
* Variant selections are synchronized with URL query parameters to support deep linking and page refresh persistence.

## Known Trade-offs

* Fake Store API provides only a single product image, therefore the gallery thumbnails reuse the available product image.
* Product variant data is mocked locally and would ideally come from a dedicated variants API in a production application.
* Checkout flow is represented as UI only and is not connected to a backend service.

## Local Storage

The following state is persisted in localStorage:

* Cart items
* Cart quantities
* Selected product variants added to cart

## Live Demo

Vercel URL:

https://nua-app-delta.vercel.app/

## Lighthouse

Lighthouse report screenshot can be found in the docs folder.

File: docs/lighthouse-report.png

```
