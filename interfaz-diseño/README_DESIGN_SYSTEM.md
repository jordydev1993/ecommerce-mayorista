# Sistema de Diseño Sequoia

Sistema de diseño completo con glassmorphism, inspirado en Apple y Stripe, compatible con Tailwind CSS v4 y shadcn/ui.

## 📦 Instalación

Todas las dependencias ya están instaladas en el proyecto.

## 🎨 Uso Rápido

### Importar Componentes

```tsx
// Componentes UI base
import { Button, Card, Badge, Input, Avatar } from '@/app/components/ui';

// Componentes especializados
import { GlassCard, ColorSwatch, IconButton } from '@/app/components/design-system';
```

### Ejemplos Básicos

#### Button

```tsx
import { Button } from '@/app/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Button con variantes
<Button variant="primary" size="lg">
  Shop Now
  <ArrowRight className="w-5 h-5" />
</Button>

<Button variant="glass" size="md">Learn More</Button>
<Button variant="outline">Cancel</Button>
```

#### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';

<Card variant="glass" size="lg" interactive>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Your content here
  </CardContent>
</Card>
```

#### GlassCard

```tsx
import { GlassCard } from '@/app/components/design-system/GlassCard';

<GlassCard
  variant="strong"
  glow="lime"
  rounded="xl"
  padding="lg"
  blur
  blurColor="bg-gradient-to-br from-purple-500/20 to-pink-500/20"
>
  Content with glassmorphism
</GlassCard>
```

#### Badge

```tsx
import { Badge } from '@/app/components/ui/badge';

<Badge variant="lime" size="md">New</Badge>
<Badge variant="orange" size="sm">Hot</Badge>
<Badge variant="glass">Featured</Badge>
```

#### IconButton

```tsx
import { IconButton } from '@/app/components/design-system/IconButton';
import { ShoppingCart } from 'lucide-react';

<IconButton variant="lime" size="md" badge={3} badgeColor="var(--lime)">
  <ShoppingCart className="w-5 h-5" />
</IconButton>
```

#### ColorSwatch

```tsx
import { ColorSwatch } from '@/app/components/design-system/ColorSwatch';

<ColorSwatch
  color="#c6ff00"
  name="Lime"
  size="md"
  selected={false}
  onClick={() => console.log('Color selected')}
/>
```

## 🎯 Design Tokens

### Colores

```tsx
// En className
className="bg-[var(--lime)]"    // Verde lima (#c6ff00)
className="bg-[var(--blue)]"    // Azul (#0071e3)
className="bg-[var(--orange)]"  // Naranja (#ff9500)
```

### Glassmorphism

```tsx
// Preset ligero
className="bg-white/50 backdrop-blur-xl border border-white/20"

// Preset medio (recomendado)
className="bg-white/70 backdrop-blur-xl border border-white/30"

// Preset fuerte
className="bg-white/80 backdrop-blur-xl border border-white/40"
```

### Border Radius

```tsx
className="rounded-xl"      // 2rem (32px)
className="rounded-2xl"     // 2.5rem (40px)
className="rounded-3xl"     // Gran radio
className="rounded-[32px]"  // Exacto
```

### Sombras

```tsx
className="shadow-lg"   // Sombra grande
className="shadow-xl"   // Sombra extra grande
className="shadow-2xl"  // Sombra masiva
```

## 🧩 Variantes de Componentes

### Button Variants

- `primary` - Verde lima, hover con escala y glow
- `secondary` - Blanco con borde
- `glass` - Glassmorphism con backdrop blur
- `outline` - Transparente con borde
- `ghost` - Sin fondo, hover sutil
- `destructive` - Rojo para acciones destructivas
- `link` - Texto con subrayado

### Card Variants

- `glass` - Glassmorphism (default)
- `solid` - Fondo blanco sólido
- `gradient` - Con gradiente
- `outline` - Transparente con borde

### Badge Variants

- `default`, `secondary`, `lime`, `orange`, `blue`
- `glass`, `outline`, `destructive`

## 🎨 Patrones de Diseño

### Hover Effects

```tsx
<div className="hover:scale-105 active:scale-95 transition-all duration-300">
  Interactive Element
</div>
```

### Blur Decorativo

```tsx
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-br from-[var(--lime)]/20 to-[var(--blue)]/20 rounded-full blur-3xl" />
  <div className="relative z-10">Content</div>
</div>
```

### Grid Layouts

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

## 📱 Responsive

Todos los componentes son responsive por defecto. Usa breakpoints de Tailwind:

```tsx
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-5xl">
    Responsive Text
  </h1>
</div>
```

## 🔧 Utilidad cn()

Combina clases de manera inteligente:

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  isActive && "active-class",
  className
)} />
```

## 🎯 Best Practices

1. **Usa variantes**: Prefiere `variant="primary"` sobre clases custom
2. **Mantén consistencia**: Usa los design tokens definidos
3. **Espaciado**: Múltiplos de 4px (0.25rem)
4. **Border radius**: Mínimo 12px para el estilo moderno
5. **Sombras suaves**: No exageres con las sombras
6. **Transitions**: Todas las interacciones deben ser suaves (300ms)
7. **Glassmorphism**: Usa `backdrop-blur-xl` con `bg-white/70`

## 📖 Documentación Completa

Ver `DESIGN_SYSTEM.md` para documentación detallada de todos los componentes, tokens y patrones.

## 🎨 Showcase

Para ver todos los componentes en acción:

```tsx
import { ShowcaseDesignSystem } from '@/app/components/ShowcaseDesignSystem';

// Usa este componente para ver ejemplos de todos los componentes
<ShowcaseDesignSystem />
```

## 🚀 Ejemplo Completo

```tsx
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { GlassCard } from '@/app/components/design-system/GlassCard';
import { Star, ArrowRight } from 'lucide-react';

function ProductCard() {
  return (
    <GlassCard variant="strong" glow="lime" rounded="xl" padding="lg">
      <Badge variant="lime" className="mb-4">New</Badge>
      
      <h2 className="text-2xl font-semibold mb-2">Product Name</h2>
      <p className="text-gray-600 mb-4">Description here</p>
      
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-5 h-5 fill-[var(--orange)] text-[var(--orange)]" />
        <span>4.9</span>
      </div>
      
      <div className="flex gap-3">
        <Button variant="primary" size="lg">
          Buy Now
          <ArrowRight className="w-5 h-5" />
        </Button>
        <Button variant="glass" size="lg">
          Learn More
        </Button>
      </div>
    </GlassCard>
  );
}
```

## 📝 Notas

- Compatible con Tailwind CSS v4
- Usa `class-variance-authority` para variantes
- Componentes compatibles con shadcn/ui
- TypeScript completo con tipos exportados
- Todos los componentes usan `React.forwardRef`
