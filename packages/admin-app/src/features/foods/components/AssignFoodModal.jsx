// src/foods/components/AssignFoodModal.jsx
import React, { useState, useEffect } from 'react';
import { foodsApi } from '../foods.api';
import { Modal, Button, Select } from '../../../components/UI/index.jsx';

const AssignFoodModal = ({ isOpen, onClose, food, partners, onFoodAssigned }) => {
  const [foodPartnerId, setFoodPartnerId] = useState('');
  const [error, setError] = useState('');

  // Reset form when the selected food changes
  useEffect(() => {
    if (food) {
      setFoodPartnerId('');
      setError('');
    }
  }, [food]);

  const handleAssignFood = async (e) => {
    e.preventDefault();
    setError('');
    if (!food) return;

    try {
      await foodsApi.assignFood(food.id, foodPartnerId);
      setFoodPartnerId(''); // Reset form
      onFoodAssigned(); // Notify parent to refresh data
      onClose();
    } catch (err) {
      console.error('Error assigning food:', err);
      setError('Failed to assign food. Please try again.');
    }
  };

  const partnerOptions = [
    { value: '', label: 'Select Partner' },
    ...partners.map(p => ({ value: p.userId, label: p.name || 'Unnamed Partner' }))
  ];
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign ${food?.name} to Partner`}>
      <form onSubmit={handleAssignFood}>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Selected Food</label>
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="font-medium">{food?.name}</div>
            <div className="text-sm text-gray-500">{food?.category} - ₹{food?.price}</div>
          </div>
        </div>
        <Select label="Food Partner" options={partnerOptions} value={foodPartnerId} onChange={(e) => setFoodPartnerId(e.target.value)} required />
        <div className="flex justify-end space-x-3 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Assign Food</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AssignFoodModal;