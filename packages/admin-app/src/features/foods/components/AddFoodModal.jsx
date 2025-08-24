// src/foods/components/AddFoodModal.jsx
import React, { useState } from 'react';
import { foodsApi } from '../foods.api';
import { Modal, Button, Input, Select } from '../../../components/UI/index.jsx';

const foodCategories = [
    { value: '', label: 'Select Category' },
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'main meal', label: 'Main Meal' },
    { value: 'sabji', label: 'Sabji' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'beverage', label: 'Beverage' },
    { value: 'snack', label: 'Snack' }
];

const AddFoodModal = ({ isOpen, onClose, onFoodAdded }) => {
  const [newFood, setNewFood] = useState({ name: '', category: '', price: '' });
  const [error, setError] = useState('');

  const handleAddFood = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await foodsApi.createFood({
        name: newFood.name,
        category: newFood.category,
        price: parseFloat(newFood.price)
      });
      setNewFood({ name: '', category: '', price: '' });
      onFoodAdded(); // Notify parent to refresh data
      onClose();
    } catch (err) {
      console.error('Error adding food:', err);
      setError('Failed to add food. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Food Item">
      <form onSubmit={handleAddFood}>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <Input label="Food Name" value={newFood.name} onChange={(e) => setNewFood({ ...newFood, name: e.target.value })} required />
        <Select label="Category" options={foodCategories} value={newFood.category} onChange={(e) => setNewFood({ ...newFood, category: e.target.value })} required />
        <Input label="Price (₹)" type="number" step="0.01" value={newFood.price} onChange={(e) => setNewFood({ ...newFood, price: e.target.value })} required />
        <div className="flex justify-end space-x-3 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Add Food</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFoodModal;