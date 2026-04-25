# Sequoia Design System

Sistema de diseño moderno con glassmorphism, inspirado en Apple y Stripe.

## 🎨 Design Tokens

### Colores

```css
/* Colores principales */
--lime: #c6ff00        /* Acento primario */
--blue: #0071e3        /* Acento secundario */
--orange: #ff9500      /* Acento terciario */

/* Glassmorphism */
--glass-bg: rgba(255, 255, 255, 0.7)
--glass-border: rgba(255, 255, 255, 0.3)
```

### Espaciado

```css
--spacing-xs: 0.25rem   /* 4px */
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
--spacing-2xl: 3rem     /* 48px */
--spacing-3xl: 4rem     /* 64px */
```

### Border Radius

```css
--radius-sm: 0.75rem    /* 12px */
--radius-md: 1rem       /* 16px */
--radius-lg: 1.5rem     /* 24px */
--radius-xl: 2rem       /* 32px */
--radius-2xl: 2.5rem    /* 40px */
--radius-full: 9999px   /* Círculo completo */
```

### Sombras

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
--shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.15)
```

### Blur

```css
--blur-sm: 4px
--blur-md: 8px
--blur-lg: 16px
--blur-xl: 24px
--blur-2xl: 40px
```

### Transiciones

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1)
```

## 🧱 Componentes

### Button

Botón con múltiples variantes y tamaños.

**Variantes:**
- `primary` - Fondo verde lima, hover con escala
- `secondary` - Fondo blanco con borde
- `glass` - Glassmorphism con backdrop blur
- `outline` - Transparente con borde
- `ghost` - Sin fondo, hover sutil
- `destructive` - Rojo para acciones destructivas
- `link` - Texto con subrayado

**Tamaños:** `sm`, `md`, `lg`, `xl`, `icon`

```tsx
import { Button } from "@/app/components/ui/button";

<Button variant="primary" size="md">Click me</Button>
<Button variant="glass" size="lg">Glass Button</Button>
```

### Card

Sistema de cards con glassmorphism.

**Variantes:**
- `glass` - Fondo translúcido con blur (default)
- `solid` - Fondo blanco sólido
- `gradient` - Con gradiente de fondo
- `outline` - Transparente con borde

**Tamaños:** `sm`, `md`, `lg`, `xl`

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";

<Card variant="glass" size="lg" interactive>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Card content here</CardContent>
</Card>
```

### GlassCard

Card especializado con efectos de glassmorphism avanzados.

**Props:**
- `variant`: `default`, `strong`, `light`, `colored`
- `glow`: `none`, `lime`, `blue`, `orange`
- `rounded`: `md`, `lg`, `xl`, `2xl`
- `blur`: Activa blur decorativo interno
- `blurColor`: Color del blur (gradiente CSS)

```tsx
import { GlassCard } from "@/app/components/design-system/GlassCard";

<GlassCard 
  variant="strong" 
  glow="lime" 
  rounded="xl" 
  blur
  blurColor="bg-gradient-to-br from-purple-500/20 to-pink-500/20"
>
  Content
</GlassCard>
```

### Badge

Etiquetas y badges con múltiples estilos.

**Variantes:**
- `default`, `secondary`, `lime`, `orange`, `blue`
- `glass`, `outline`, `destructive`

**Tamaños:** `sm`, `md`, `lg`

```tsx
import { Badge } from "@/app/components/ui/badge";

<Badge variant="lime" size="md">New</Badge>
<Badge variant="orange" size="sm">Hot</Badge>
```

### Input

Inputs con glassmorphism y variantes.

**Variantes:**
- `default` - Glass con blur
- `solid` - Fondo blanco sólido
- `glass` - Glass extra translúcido
- `outline` - Transparente con borde

**Tamaños:** `sm`, `md`, `lg`

```tsx
import { Input } from "@/app/components/ui/input";

<Input variant="default" inputSize="md" placeholder="Search..." />
```

### Avatar

Avatares con tamaños predefinidos y fallbacks.

**Tamaños:** `sm`, `md`, `lg`, `xl`

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar";

<Avatar size="lg">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### IconButton

Botones circulares/cuadrados para iconos con badges opcionales.

**Variantes:**
- `default`, `ghost`, `solid`
- `lime`, `blue`, `orange`

**Props adicionales:**
- `badge`: Número o string para mostrar badge
- `badgeColor`: Color del badge

```tsx
import { IconButton } from "@/app/components/design-system/IconButton";
import { ShoppingCart } from "lucide-react";

<IconButton variant="default" size="md" badge={3} badgeColor="var(--lime)">
  <ShoppingCart className="w-5 h-5" />
</IconButton>
```

### ColorSwatch

Selector de colores con vista previa.

```tsx
import { ColorSwatch } from "@/app/components/design-system/ColorSwatch";

<ColorSwatch 
  color="#c6ff00" 
  name="Lime" 
  size="md" 
  selected={false}
  onClick={() => {}}
/>
```

## 🎯 Patterns de Uso

### Glassmorphism

```tsx
<div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg">
  Glassmorphism content
</div>
```

### Hover Effects

```tsx
<div className="hover:scale-105 active:scale-95 transition-all duration-300">
  Interactive element
</div>
```

### Gradientes

```tsx
<div className="bg-gradient-to-br from-[var(--lime)] to-[var(--blue)]">
  Gradient background
</div>
```

### Blur Decorativo

```tsx
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-br from-[var(--lime)]/20 to-[var(--blue)]/20 rounded-full blur-3xl" />
  <div className="relative z-10">Content</div>
</div>
```

## 📱 Responsive

Todos los componentes son responsive por defecto. Usa las utilidades de Tailwind:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

## 🔧 Utilidades

### cn() - Class Name Merger

Combina clases de Tailwind evitando conflictos:

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-class", condition && "conditional-class", className)} />
```

## 🎨 Color System

### Colores de Acento

```tsx
// Verde Lima - Primario
className="bg-[var(--lime)] text-black"

// Azul - Links y secundario
className="bg-[var(--blue)] text-white"

// Naranja - Badges y alertas
className="bg-[var(--orange)] text-white"
```

### Glassmorphism Presets

```tsx
// Light glass
className="bg-white/50 backdrop-blur-xl border border-white/20"

// Medium glass (default)
className="bg-white/70 backdrop-blur-xl border border-white/30"

// Strong glass
className="bg-white/80 backdrop-blur-xl border border-white/40"
```

## 🚀 Best Practices

1. **Usa variantes**: Prefiere usar las variantes de componentes en lugar de clases custom
2. **Mantén consistencia**: Usa los design tokens definidos
3. **Microinteracciones**: Incluye hover y active states
4. **Espaciado**: Usa múltiplos de 4px (0.25rem)
5. **Border radius**: Mínimo 12px para mantener el estilo moderno
6. **Sombras**: Usa sombras suaves para depth sutil
7. **Transitions**: Todas las interacciones deben tener transiciones suaves
