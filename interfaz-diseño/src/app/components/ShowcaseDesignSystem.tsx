import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { GlassCard } from './design-system/GlassCard';
import { ColorSwatch } from './design-system/ColorSwatch';
import { IconButton } from './design-system/IconButton';
import { Heart, ShoppingCart, Search, Star, ArrowRight } from 'lucide-react';

export function ShowcaseDesignSystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f7] via-[#e8e8ea] to-[#f5f5f7] p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-semibold mb-2">Sequoia Design System</h1>
          <p className="text-gray-600">Sistema de componentes con glassmorphism</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Buttons</h2>
          <GlassCard variant="default" padding="lg" rounded="xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="glass">Glass</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                  <Button variant="primary" size="xl">Extra Large</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">With Icons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">
                    <Heart className="w-5 h-5" />
                    Like
                  </Button>
                  <Button variant="secondary">
                    Add to Cart
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button variant="glass">
                    <Search className="w-5 h-5" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="glass" size="md">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>Default variant with blur</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  This is a glass card with backdrop blur effect.
                </p>
              </CardContent>
            </Card>

            <Card variant="solid" size="md">
              <CardHeader>
                <CardTitle>Solid Card</CardTitle>
                <CardDescription>Solid white background</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  This is a solid card without blur.
                </p>
              </CardContent>
            </Card>

            <Card variant="outline" size="md">
              <CardHeader>
                <CardTitle>Outline Card</CardTitle>
                <CardDescription>Transparent with border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  This is an outline card.
                </p>
              </CardContent>
            </Card>

            <Card variant="glass" size="md" interactive>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to interact</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  This card scales on hover.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">GlassCard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard variant="default" glow="lime" rounded="xl" padding="lg">
              <h3 className="font-semibold mb-2">Lime Glow</h3>
              <p className="text-sm text-gray-600">Card with lime glow on hover</p>
            </GlassCard>

            <GlassCard variant="strong" glow="blue" rounded="xl" padding="lg">
              <h3 className="font-semibold mb-2">Blue Glow</h3>
              <p className="text-sm text-gray-600">Card with blue glow on hover</p>
            </GlassCard>

            <GlassCard
              variant="light"
              glow="orange"
              rounded="xl"
              padding="lg"
              blur
              blurColor="bg-gradient-to-br from-purple-500/20 to-pink-500/20"
            >
              <h3 className="font-semibold mb-2">With Blur Effect</h3>
              <p className="text-sm text-gray-600">Card with internal blur decoration</p>
            </GlassCard>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Badges</h2>
          <GlassCard variant="default" padding="lg" rounded="xl">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="lime">Lime</Badge>
                  <Badge variant="orange">Orange</Badge>
                  <Badge variant="blue">Blue</Badge>
                  <Badge variant="glass">Glass</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="lime" size="sm">Small</Badge>
                  <Badge variant="lime" size="md">Medium</Badge>
                  <Badge variant="lime" size="lg">Large</Badge>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Inputs</h2>
          <GlassCard variant="default" padding="lg" rounded="xl">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Default Input</label>
                  <Input variant="default" placeholder="Enter text..." />
                </div>
                <div>
                  <label className="block text-sm mb-2">Solid Input</label>
                  <Input variant="solid" placeholder="Enter text..." />
                </div>
                <div>
                  <label className="block text-sm mb-2">Glass Input</label>
                  <Input variant="glass" placeholder="Enter text..." />
                </div>
                <div>
                  <label className="block text-sm mb-2">Outline Input</label>
                  <Input variant="outline" placeholder="Enter text..." />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Sizes</h3>
                <div className="space-y-3">
                  <Input variant="default" inputSize="sm" placeholder="Small input" />
                  <Input variant="default" inputSize="md" placeholder="Medium input" />
                  <Input variant="default" inputSize="lg" placeholder="Large input" />
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Icon Buttons</h2>
          <GlassCard variant="default" padding="lg" rounded="xl">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <IconButton variant="default">
                    <Heart className="w-5 h-5" />
                  </IconButton>
                  <IconButton variant="ghost">
                    <Search className="w-5 h-5" />
                  </IconButton>
                  <IconButton variant="solid">
                    <ShoppingCart className="w-5 h-5" />
                  </IconButton>
                  <IconButton variant="lime">
                    <Star className="w-5 h-5" />
                  </IconButton>
                  <IconButton variant="blue">
                    <Heart className="w-5 h-5" />
                  </IconButton>
                  <IconButton variant="orange">
                    <ShoppingCart className="w-5 h-5" />
                  </IconButton>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">With Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <IconButton variant="default" badge={3}>
                    <Heart className="w-5 h-5" />
                  </IconButton>
                  <IconButton variant="default" badge={12} badgeColor="var(--orange)">
                    <ShoppingCart className="w-5 h-5" />
                  </IconButton>
                  <IconButton variant="lime" badge="NEW">
                    <Star className="w-5 h-5" />
                  </IconButton>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <IconButton variant="lime" size="sm">
                    <Heart className="w-4 h-4" />
                  </IconButton>
                  <IconButton variant="lime" size="md">
                    <Heart className="w-5 h-5" />
                  </IconButton>
                  <IconButton variant="lime" size="lg">
                    <Heart className="w-6 h-6" />
                  </IconButton>
                  <IconButton variant="lime" size="xl">
                    <Heart className="w-8 h-8" />
                  </IconButton>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Color Swatches</h2>
          <GlassCard variant="default" padding="lg" rounded="xl">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Default</h3>
                <div className="flex flex-wrap gap-4">
                  <ColorSwatch color="#c6ff00" name="Lime" size="md" />
                  <ColorSwatch color="#0071e3" name="Blue" size="md" />
                  <ColorSwatch color="#ff9500" name="Orange" size="md" />
                  <ColorSwatch color="#ff3b30" name="Red" size="md" />
                  <ColorSwatch color="#000000" name="Black" size="md" />
                  <ColorSwatch color="#ffffff" name="White" size="md" hasBorder />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Sizes</h3>
                <div className="flex flex-wrap items-end gap-4">
                  <ColorSwatch color="#c6ff00" name="Small" size="sm" />
                  <ColorSwatch color="#c6ff00" name="Medium" size="md" />
                  <ColorSwatch color="#c6ff00" name="Large" size="lg" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Selected State</h3>
                <div className="flex flex-wrap gap-4">
                  <ColorSwatch color="#c6ff00" name="Selected" size="md" selected />
                  <ColorSwatch color="#0071e3" name="Not Selected" size="md" />
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Avatars</h2>
          <GlassCard variant="default" padding="lg" rounded="xl">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar size="sm">
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <Avatar size="md">
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg">
                    <AvatarFallback>LG</AvatarFallback>
                  </Avatar>
                  <Avatar size="xl">
                    <AvatarFallback>XL</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
