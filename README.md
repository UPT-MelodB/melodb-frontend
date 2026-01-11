# MeloDB Frontend

MeloDB Frontend is a web application built with Angular for managing and browsing a music database. It includes e-commerce features such as a product catalog and administrative dashboards, along with user authentication.

## 🚀 Features

*   **User Authentication**: Secure login and registration for administrative users.
*   **Product Catalog**: Browse and search through a collection of music products.
*   **Product Management**: Add and edit product details using forms and dialogs.

## 🛠️ Tech Stack

*   **Framework**: [Angular](https://angular.io/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (Latest LTS recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   [Angular CLI](https://angular.io/cli)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd melodb-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Development Server

Run the development server:

```bash
yarn start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

To build the project for production:

```bash
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 📂 Project Structure

The application logic is located in `src/app/` and is organized as follows:

*   `components/`: UI components (Auth, Catalog, Cart, Dashboard, etc.)
*   `services/`: Application logic and API communication (AuthService, ProductService, etc.)
*   `models/`: TypeScript interfaces and classes for data models.
