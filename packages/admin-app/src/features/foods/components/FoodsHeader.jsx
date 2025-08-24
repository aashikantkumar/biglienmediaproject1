// src/foods/components/FoodsHeader.jsx
import React from 'react';
import { Button } from '../../../components/UI/index.jsx';

const FoodsHeader = ({ onAddFoodClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Food Management</h1>
        <p className="text-gray-600">Manage your food items and assignments</p>
      </div>
      <Button onClick={onAddFoodClick}>
        + Add New Food
      </Button>
    </div>
  );
};

export default FoodsHeader;