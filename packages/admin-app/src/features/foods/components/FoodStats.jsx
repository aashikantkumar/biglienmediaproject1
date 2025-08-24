// src/foods/components/FoodStats.jsx
import React from 'react';
import { Card } from '../../../components/UI/index.jsx';

const FoodStats = ({ foodsCount, partnersCount, assignmentsCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Foods">
        <div className="text-3xl font-bold text-blue-600">{foodsCount}</div>
        <p className="text-gray-500 text-sm">Available food items</p>
      </Card>
      <Card title="Active Partners">
        <div className="text-3xl font-bold text-green-600">{partnersCount}</div>
        <p className="text-gray-500 text-sm">Food partners available</p>
      </Card>
      <Card title="Total Assignments">
        <div className="text-3xl font-bold text-purple-600">{assignmentsCount}</div>
        <p className="text-gray-500 text-sm">Food-partner assignments</p>
      </Card>
    </div>
  );
};

export default FoodStats;