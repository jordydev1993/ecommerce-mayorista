import { Header } from './components/Header';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { GlassCard } from './components/design-system/GlassCard';
import { ColorSwatch } from './components/design-system/ColorSwatch';
import { Star, Users, ArrowRight } from 'lucide-react';

export default function App() {
  const popularColors = [
    { color: '#0071e3', name: 'Blue' },
    { color: '#c6ff00', name: 'Lime' },
    { color: '#ff9500', name: 'Orange' },
    { color: '#ff3b30', name: 'Red' },
    { color: '#000000', name: 'Black' },
    { color: '#ffffff', name: 'White', hasBorder: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f7] via-[#e8e8ea] to-[#f5f5f7]">
      <Header />

      <main className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <GlassCard
            variant="strong"
            rounded="xl"
            padding="xl"
            blur
            className="lg:col-span-8 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="lime" size="md" className="mb-4">
                  New Arrival
                </Badge>
                <h1 className="text-5xl font-semibold mb-4 leading-tight">
                  Sequoia Inspiring Musico
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                  Experience premium sound quality with advanced noise cancellation and 40-hour battery life.
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-[var(--orange)] text-[var(--orange)]" />
                    <span className="font-semibold">4.9</span>
                    <span className="text-gray-500">(2.3k reviews)</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="primary" size="lg">
                    Shop Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button variant="glass" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue)]/20 to-[var(--lime)]/20 rounded-full blur-3xl" />
                <div className="relative text-[200px] drop-shadow-2xl">
                  🎧
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-4 space-y-6">
            <Card variant="glass" size="md">
              <CardHeader>
                <CardTitle>Popular Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 pt-4">
                  {popularColors.map((item, index) => (
                    <ColorSwatch
                      key={index}
                      color={item.color}
                      name={item.name}
                      size="md"
                      hasBorder={item.hasBorder}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card variant="glass" size="md">
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Trending Now</h3>
                  <Badge variant="orange" size="sm">Hot</Badge>
                </div>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 mb-3 flex items-center justify-center text-8xl">
                  🎵
                </div>
                <h4 className="font-medium mb-1">Air Pods Pro Max</h4>
                <p className="text-gray-600 mb-2">$549.00</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[var(--orange)] text-[var(--orange)]" />
                  <span className="text-sm">4.8</span>
                </div>
              </CardContent>
            </Card>

            <GlassCard
              variant="default"
              rounded="xl"
              padding="md"
              className="overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue)]/10 to-purple-500/10" />
              <div className="relative">
                <div className="text-6xl mb-3">🥽</div>
                <h4 className="font-medium mb-1">VR Experience</h4>
                <p className="text-sm text-gray-600">Immersive Reality</p>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="glass" size="md">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">More Products</h3>
                <Button variant="link" className="text-sm h-auto p-0">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { emoji: '👕', name: 'T-Shirt' },
                  { emoji: '👖', name: 'Jeans' },
                  { emoji: '👟', name: 'Sneakers' },
                  { emoji: '🎒', name: 'Backpack' },
                  { emoji: '⌚', name: 'Watch' },
                  { emoji: '🕶️', name: 'Glasses' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-3xl hover:scale-105 transition-transform cursor-pointer"
                  >
                    {item.emoji}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" size="md">
            <CardHeader>
              <CardTitle>Social Proof</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    'bg-gradient-to-br from-blue-400 to-blue-600',
                    'bg-gradient-to-br from-purple-400 to-purple-600',
                    'bg-gradient-to-br from-pink-400 to-pink-600',
                    'bg-gradient-to-br from-orange-400 to-orange-600'
                  ].map((gradient, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 rounded-full border-2 border-white ${gradient} flex items-center justify-center text-white text-sm`}
                    >
                      <Users className="w-5 h-5" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold">5M+ Users</p>
                  <p className="text-sm text-gray-600">Worldwide</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-[var(--lime)]/10 to-[var(--blue)]/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[var(--orange)] text-[var(--orange)]" />
                  ))}
                </div>
                <p className="text-sm">
                  "Amazing quality and fast shipping!"
                </p>
                <p className="text-xs text-gray-600 mt-2">- Sarah M.</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" size="md">
            <CardHeader>
              <CardTitle>Featured Product</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 mb-4 flex items-center justify-center text-7xl">
                📱
              </div>
              <h4 className="font-medium mb-1">Smart Phone Pro</h4>
              <p className="text-gray-600 mb-2">$999.00</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[var(--orange)] text-[var(--orange)]" />
                  <span className="text-sm">4.9</span>
                </div>
                <Button variant="secondary" size="sm">
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}