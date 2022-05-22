# Headphones Store

> Blog application to add articles, built with Next.js, TypeScript, Tailwind CSS and Sanity CMS.
>  Live demo [_here_](https://bre.is/KHWQAqQ9).

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

### Installation:

Clone the repo:

```sh
git clone https://github.com/el-sherbini/Mlog.git
```

Run terminal command:

```sh
npm install
```

```sh
cd sanityblog
npm install
```

### Enter your Environment Variables in `.env` file, you can get them from [_here_](https://www.sanity.io/).

```sh
NEXT_PUBLIC_SANITY_PROJECT_ID = 'ENTER YOUR SANITY PROJECT ID'
NEXT_PUBLIC_SANITY_DATASET_NAME = 'ENTER YOUR SANITY DATASET NAME'
```

### To Start Server:

```sh
npm run dev
```

### To Visit App:

```sh
localhost:3000
```

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Sanity CMS
- React-hook-form
- React-portable-text

## Features

- Responsive layout
- Add article from Sanity CMS
- Arricles listing
- Single article page
- Add/Read comments
- Accept/Reject comment from Sanity CMS
