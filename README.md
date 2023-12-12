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
- **Description:** Check the session period for auto login.

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
- **Endpoint:** /buyer/get_catalog?seller_id=_id
- **Description:** Get the catalog of items of a particular seller.

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
- **Description:** Retrieve the seller's received orders.

### Post Items
- **Method:** POST
- **Endpoint:** /seller/post_items
- **Description:** Add new items to the seller's catalog.
