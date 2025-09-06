-- Table: region
CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    region_name TEXT NOT NULL
);

-- Table: address
CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    unit_number TEXT,
    street_number TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT,
    region TEXT,
    postal_code TEXT,
    region_id INTEGER REFERENCES region(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    fullname TEXT NOT NULL,
    email_address TEXT NOT NULL UNIQUE,
    phonenumber TEXT,
    userPassword TEXT
);

-- Table: user_address
CREATE TABLE user_address (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    address_id INTEGER REFERENCES address(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_default BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, address_id)
);

-- Table: payment_type
CREATE TABLE payment_type (
    id SERIAL PRIMARY KEY,
    value TEXT NOT NULL
);

-- Table: user_payment_method
CREATE TABLE user_payment_method (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    payment_type_id INTEGER REFERENCES payment_type(id) ON DELETE SET NULL ON UPDATE CASCADE,
    provider TEXT,
    account_number TEXT,
    expiry_date DATE,
    is_default BOOLEAN DEFAULT FALSE
);

-- Table: shopping_cart
CREATE TABLE shopping_cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: product_category
CREATE TABLE product_category (
    id SERIAL PRIMARY KEY,
    parent_category_id INTEGER REFERENCES product_category(id) ON DELETE SET NULL ON UPDATE CASCADE,
    category_name TEXT NOT NULL
);

-- Table: product
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES product_category(id) ON DELETE SET NULL ON UPDATE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    product_image TEXT
);

-- Table: variation
CREATE TABLE variation (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES product_category(id) ON DELETE CASCADE ON UPDATE CASCADE,
    name TEXT NOT NULL
);

-- Table: variation_option
CREATE TABLE variation_option (
    id SERIAL PRIMARY KEY,
    variation_id INTEGER REFERENCES variation(id) ON DELETE CASCADE ON UPDATE CASCADE,
    value TEXT NOT NULL
);

-- Table: product_item
CREATE TABLE product_item (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE,
    SKU TEXT UNIQUE,
    qty_in_stock INTEGER,
    product_image TEXT,
    price NUMERIC(10,2)
);

-- Table: product_configuration
CREATE TABLE product_configuration (
    product_item_id INTEGER REFERENCES product_item(id) ON DELETE CASCADE ON UPDATE CASCADE,
    variation_option_id INTEGER REFERENCES variation_option(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (product_item_id, variation_option_id)
);

-- Table: shopping_cart_item
CREATE TABLE shopping_cart_item (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES shopping_cart(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_item_id INTEGER REFERENCES product_item(id) ON DELETE CASCADE ON UPDATE CASCADE,
    qty INTEGER
);

-- Table: shipping_method
CREATE TABLE shipping_method (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10,2)
);

-- Table: order_status
CREATE TABLE order_status (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL
);

-- Table: shop_order
CREATE TABLE shop_order (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    order_date TIMESTAMP DEFAULT NOW(),
    payment_method_id INTEGER REFERENCES user_payment_method(id) ON DELETE SET NULL ON UPDATE CASCADE,
    shipping_method INTEGER REFERENCES shipping_method(id) ON DELETE SET NULL ON UPDATE CASCADE,
    shipping_address INTEGER REFERENCES address(id) ON DELETE SET NULL ON UPDATE CASCADE,
    order_total NUMERIC(10,2),
    order_status INTEGER REFERENCES order_status(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Table: order_line
CREATE TABLE order_line (
    id SERIAL PRIMARY KEY,
    product_item_id INTEGER REFERENCES product_item(id) ON DELETE CASCADE ON UPDATE CASCADE,
    order_id INTEGER REFERENCES shop_order(id) ON DELETE CASCADE ON UPDATE CASCADE,
    qty INTEGER,
    price NUMERIC(10,2)
);

-- Table: user_review
CREATE TABLE user_review (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ordered_product_id INTEGER REFERENCES order_line(id) ON DELETE CASCADE ON UPDATE CASCADE,
    rating_value INTEGER CHECK (rating_value BETWEEN 1 AND 5),
    comment TEXT
);

-- Table: promotion
CREATE TABLE promotion (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    discount_rate NUMERIC(5,2),
    start_date DATE,
    end_date DATE
);

-- Table: promotion_category
CREATE TABLE promotion_category (
    category_id INTEGER REFERENCES product_category(id) ON DELETE CASCADE ON UPDATE CASCADE,
    promotion_id INTEGER REFERENCES promotion(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (category_id, promotion_id)
);

-- Indexes for faster lookups
CREATE INDEX idx_address_country_id ON address(region_id);
CREATE INDEX idx_user_address_user_id ON user_address(user_id);
CREATE INDEX idx_user_payment_user_id ON user_payment_method(user_id);
CREATE INDEX idx_product_category_parent ON product_category(parent_category_id);
CREATE INDEX idx_product_category_id ON product(category_id);
CREATE INDEX idx_variation_category_id ON variation(category_id);
CREATE INDEX idx_variation_option_variation_id ON variation_option(variation_id);
CREATE INDEX idx_product_item_product_id ON product_item(product_id);
CREATE INDEX idx_cart_item_cart_id ON shopping_cart_item(cart_id);
CREATE INDEX idx_cart_item_product_item_id ON shopping_cart_item(product_item_id);
CREATE INDEX idx_order_user_id ON shop_order(user_id);
CREATE INDEX idx_order_status ON shop_order(order_status);
CREATE INDEX idx_order_line_order_id ON order_line(order_id);
CREATE INDEX idx_review_user_id ON user_review(user_id);
CREATE INDEX idx_promotion_category_id ON promotion_category(category_id);
