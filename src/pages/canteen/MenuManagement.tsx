import { useState } from 'react';
import { CanteenLayout } from '@/components/canteen/CanteenLayout';
import { menuItems as initialMenuItems } from '@/data/menuItems';
import { MenuItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Pencil, Trash2, UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'daily' as 'daily' | 'special',
    type: '',
    preparationTime: '',
  });

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAvailabilityToggle = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
    toast.success('Availability updated');
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item deleted');
  };

  const handleOpenDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        type: item.type,
        preparationTime: item.preparationTime.toString(),
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'daily',
        type: '',
        preparationTime: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill in required fields');
      return;
    }

    const newItem: MenuItem = {
      id: editingItem?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      type: formData.type,
      preparationTime: parseInt(formData.preparationTime) || 10,
      available: editingItem?.available ?? true,
    };

    if (editingItem) {
      setMenuItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? newItem : item))
      );
      toast.success('Item updated');
    } else {
      setMenuItems((prev) => [...prev, newItem]);
      toast.success('Item added');
    }

    setIsDialogOpen(false);
  };

  return (
    <CanteenLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Menu Management</h1>
            <p className="text-muted-foreground">Add, edit, and manage your menu items</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Menu Item' : 'Add New Item'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Item name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price (₹) *</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Prep Time (mins)</Label>
                    <Input
                      type="number"
                      value={formData.preparationTime}
                      onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                      placeholder="10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: 'daily' | 'special') =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="special">Special</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Input
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="e.g., North Indian"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveItem} className="w-full">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Menu Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5" />
              Menu Items
              <Badge variant="secondary" className="ml-2">{filteredItems.length} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Prep Time</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.category === 'special' ? 'default' : 'secondary'}>
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className="font-medium">₹{item.price}</TableCell>
                    <TableCell>{item.preparationTime} mins</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.available}
                        onCheckedChange={() => handleAvailabilityToggle(item.id)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </CanteenLayout>
  );
};

export default MenuManagement;
