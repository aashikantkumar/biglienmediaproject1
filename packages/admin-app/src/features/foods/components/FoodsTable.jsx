// src/foods/components/FoodsTable.jsx
import React from 'react';
import { Card, Button, Badge } from '../../../components/UI/index.jsx';

const FoodsTable = ({ foods, assignments, onAssignClick, onAddFoodClick }) => {
  
  const getFoodAssignmentStatus = (foodId) => {
    return assignments.filter(assignment => assignment.food?.id === foodId).length;
  };

  if (foods.length === 0) {
    return (
      <Card title="Food Items">
        <div className="text-center py-8">
          <p className="text-gray-500">No food items available. Add your first food item!</p>
          <Button onClick={onAddFoodClick} className="mt-4">
            Add Food Item
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Food Items">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {foods.map((food) => {
              const assignmentCount = getFoodAssignmentStatus(food.id);
              return (
                <tr key={food.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{food.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><Badge variant="info">{food.category}</Badge></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{food.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignmentCount > 0 ? (
                      <Badge variant="success">{assignmentCount} assigned</Badge>
                    ) : (
                      <Badge variant="warning">Not assigned</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="outline" size="sm" onClick={() => onAssignClick(food)}>
                      Assign to Partner
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default FoodsTable;