-- ============================================================
-- ECOMMERCE MAYORISTA — Schema completo para Supabase
-- ============================================================

-- ------------------------------------------------------------
-- 1. Función auxiliar para updated_at automático
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


-- ------------------------------------------------------------
-- 2. Tabla: products
-- ------------------------------------------------------------
CREATE TABLE public.products (
  id            UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT            NOT NULL,
  slug          TEXT            NOT NULL UNIQUE,
  description   TEXT,
  category      TEXT,
  price_unit    NUMERIC(10,2)   NOT NULL,
  price_dozen   NUMERIC(10,2)   NOT NULL,
  stock         INTEGER         NOT NULL DEFAULT 0,
  image_url     TEXT,
  is_active     BOOLEAN         NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ     NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ     NOT NULL DEFAULT now(),

  CONSTRAINT products_price_unit_positive   CHECK (price_unit > 0),
  CONSTRAINT products_price_dozen_positive  CHECK (price_dozen > 0),
  CONSTRAINT products_stock_non_negative    CHECK (stock >= 0),
  CONSTRAINT products_price_dozen_lte_unit  CHECK (price_dozen <= price_unit * 12)
);

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ------------------------------------------------------------
-- 3. Tabla: orders
-- ------------------------------------------------------------
CREATE TABLE public.orders (
  id                UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name     TEXT            NOT NULL,
  customer_phone    TEXT            NOT NULL,
  customer_address  TEXT,
  notes             TEXT,
  subtotal          NUMERIC(12,2)   NOT NULL,
  total             NUMERIC(12,2)   NOT NULL,
  status            TEXT            NOT NULL DEFAULT 'pending',
  created_at        TIMESTAMPTZ     NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ     NOT NULL DEFAULT now(),

  CONSTRAINT orders_status_valid        CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  CONSTRAINT orders_subtotal_positive   CHECK (subtotal >= 0),
  CONSTRAINT orders_total_positive      CHECK (total >= 0)
);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ------------------------------------------------------------
-- 4. Tabla: order_items
-- ------------------------------------------------------------
CREATE TABLE public.order_items (
  id               UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id         UUID            NOT NULL REFERENCES public.orders(id)   ON DELETE CASCADE,
  product_id       UUID                        REFERENCES public.products(id) ON DELETE SET NULL,
  product_name     TEXT            NOT NULL,
  quantity         INTEGER         NOT NULL,
  unit_price       NUMERIC(10,2)   NOT NULL,
  dozen_price      NUMERIC(10,2)   NOT NULL,
  dozens_applied   INTEGER         NOT NULL DEFAULT 0,
  remaining_units  INTEGER         NOT NULL DEFAULT 0,
  line_total       NUMERIC(12,2)   NOT NULL,
  created_at       TIMESTAMPTZ     NOT NULL DEFAULT now(),

  CONSTRAINT order_items_quantity_positive        CHECK (quantity > 0),
  CONSTRAINT order_items_unit_price_positive      CHECK (unit_price > 0),
  CONSTRAINT order_items_dozen_price_positive     CHECK (dozen_price > 0),
  CONSTRAINT order_items_dozens_non_negative      CHECK (dozens_applied >= 0),
  CONSTRAINT order_items_remaining_non_negative   CHECK (remaining_units >= 0),
  CONSTRAINT order_items_line_total_non_negative  CHECK (line_total >= 0),
  CONSTRAINT order_items_decomposition            CHECK (dozens_applied * 12 + remaining_units = quantity)
);


-- ------------------------------------------------------------
-- 5. Tabla: admin_users
-- ------------------------------------------------------------
CREATE TABLE public.admin_users (
  id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ------------------------------------------------------------
-- 6. Índices
-- ------------------------------------------------------------
CREATE INDEX idx_products_slug       ON public.products (slug);
CREATE INDEX idx_products_is_active  ON public.products (is_active);
CREATE INDEX idx_products_category   ON public.products (category) WHERE category IS NOT NULL;

CREATE INDEX idx_orders_status      ON public.orders (status);
CREATE INDEX idx_orders_created_at  ON public.orders (created_at DESC);

CREATE INDEX idx_order_items_order_id   ON public.order_items (order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items (product_id) WHERE product_id IS NOT NULL;


-- ------------------------------------------------------------
-- 7. Row Level Security (RLS)
-- ------------------------------------------------------------
ALTER TABLE public.products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Helper: verifica si el usuario autenticado es admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
  );
$$;

-- products: lectura pública de productos activos
CREATE POLICY "products_public_read"
  ON public.products FOR SELECT
  USING (is_active = true);

-- products: admin puede ver todos (incluso inactivos)
CREATE POLICY "products_admin_read_all"
  ON public.products FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- products: solo admin puede escribir
CREATE POLICY "products_admin_insert"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "products_admin_update"
  ON public.products FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "products_admin_delete"
  ON public.products FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- orders: cualquier visitante puede crear un pedido
CREATE POLICY "orders_public_insert"
  ON public.orders FOR INSERT
  WITH CHECK (true);

-- orders: solo admin puede leer, actualizar y eliminar
CREATE POLICY "orders_admin_read"
  ON public.orders FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "orders_admin_update"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "orders_admin_delete"
  ON public.orders FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- order_items: cualquier visitante puede insertar (junto con el pedido)
CREATE POLICY "order_items_public_insert"
  ON public.order_items FOR INSERT
  WITH CHECK (true);

-- order_items: solo admin puede leer y eliminar
CREATE POLICY "order_items_admin_read"
  ON public.order_items FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "order_items_admin_delete"
  ON public.order_items FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- admin_users: solo el propio usuario puede ver su registro
CREATE POLICY "admin_users_self_read"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (id = auth.uid());
