import { useState } from 'react';
import { StudentHeader } from '@/components/student/StudentHeader';
import { MenuCard } from '@/components/student/MenuCard';
import { menuItems, categories, foodTypes } from '@/data/menuItems';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const StudentMenu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const availableItems = filteredItems.filter((item) => item.available);
  const unavailableItems = filteredItems.filter((item) => !item.available);

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="gradient-hero rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Fresh & Hot</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            What's cooking today?
          </h2>
          <p className="text-muted-foreground mb-4">
            Order your favorite meals from the college canteen
          </p>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize whitespace-nowrap"
              >
                {category === 'all' ? '🍴 All' : category === 'special' ? '⭐ Special' : '📅 Daily'}
              </Button>
            ))}
          </div>

          {/* Type Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {foodTypes.map((type) => (
              <Badge
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                className={cn(
                  "cursor-pointer whitespace-nowrap transition-colors",
                  selectedType === type && "bg-primary text-primary-foreground"
                )}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found matching your criteria</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Available Items */}
            {availableItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {availableItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* Unavailable Items */}
            {unavailableItems.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Currently Unavailable
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {unavailableItems.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentMenu;
