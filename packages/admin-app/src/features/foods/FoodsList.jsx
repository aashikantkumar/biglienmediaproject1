// src/foods/FoodsList.jsx
import { useState, useEffect } from 'react';
import { foodsApi } from "./foods.api";
import { partnersApi } from "../partners/partners.api";
import { useAuth } from "../auth/useAuth.jsx";
import { LoadingSpinner, Button } from "../../components/UI/index.jsx";

// Import the child components
import FoodsHeader from "./components/FoodsHeader.jsx";
import FoodStats from "./components/FoodStats.jsx";
import FoodsTable from "./components/FoodsTable.jsx";
import AddFoodModal from "./components/AddFoodModal.jsx";
import AssignFoodModal from "./components/AssignFoodModal.jsx";

const FoodsList = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [partners, setPartners] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const foodsData = await foodsApi.getAllFoods();
      setFoods(Array.isArray(foodsData) ? foodsData : []);
      
      const adminId = user?.claims?.id;
      if (adminId) {
        const partnersData = await partnersApi.getAllPartners(adminId);
        setPartners(Array.isArray(partnersData) ? partnersData : []);
      }
      
      const assignmentsData = await foodsApi.getAllAssignedFoods();
      setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);

    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openAssignModal = (food) => {
    setSelectedFood(food);
    setShowAssignModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setShowAssignModal(false);
    setSelectedFood(null);
  };
  
  if (loading) {
    return (
      <div className="p-6 text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading food data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <FoodsHeader onAddFoodClick={() => setShowAddModal(true)} />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
          <Button variant="outline" size="sm" onClick={() => setError('')} className="mt-2">Dismiss</Button>
        </div>
      )}

      <FoodStats 
        foodsCount={foods.length}
        partnersCount={partners.length}
        assignmentsCount={assignments.length}
      />

      <FoodsTable 
        foods={foods}
        assignments={assignments}
        onAssignClick={openAssignModal}
        onAddFoodClick={() => setShowAddModal(true)}
      />

      <AddFoodModal 
        isOpen={showAddModal}
        onClose={handleModalClose}
        onFoodAdded={loadData}
      />

      <AssignFoodModal 
        isOpen={showAssignModal}
        onClose={handleModalClose}
        food={selectedFood}
        partners={partners}
        onFoodAssigned={loadData}
      />
    </div>
  );
};

export default FoodsList;