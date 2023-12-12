# Start

```bash
npm run prebuild
```
```bash
npm run dev
```

# API Endpoints

## Auth Endpoints

### Register
- **Method:** POST
- **Endpoint:** /auth/register
- **Description:** Register a new user.

### Login
- **Method:** POST
- **Endpoint:** /auth/login
- **Description:** Authenticate and login a user.

### Session
- **Method:** GET
- **Endpoint:** /auth/session
- **Description:** Get information about the user's session.

### Log Out
- **Method:** GET
- **Endpoint:** /auth/log_out
- **Description:** Log out and end the user's session.

## Buyer Endpoints

### Get Sellers
- **Method:** GET
- **Endpoint:** /buyer/get_sellers
- **Description:** Retrieve a list of sellers.

### Get Catalog
- **Method:** GET
- **Endpoint:** /buyer/get_catalog
- **Description:** Get the catalog of items available for purchase.

### Get Orders
- **Method:** GET
- **Endpoint:** /buyer/get_orders
- **Description:** Retrieve the buyer's order history.

### Post Orders
- **Method:** POST
- **Endpoint:** /buyer/post_orders
- **Description:** Place a new order.

## Seller Endpoints

### Get Orders
- **Method:** GET
- **Endpoint:** /seller/get_orders
- **Description:** Retrieve the seller's order history.

### Post Items
- **Method:** POST
- **Endpoint:** /seller/post_items
- **Description:** Add new items to the seller's inventory.
