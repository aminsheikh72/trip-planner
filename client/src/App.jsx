import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, DollarSign, Sparkles } from 'lucide-react';
import ItineraryDisplay from './components/ItineraryDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { generateItinerary } from './features/agentSlice';
import { toast } from 'react-toastify';
import './App.css'; // 👈 For custom animation styles (defined below)

function App() {
  const { agentData, isLoading, isError, isSuccess, message } = useSelector(state => state.agent);
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    budget: ''
  });

  const { fromDate, toDate, budget } = formData;
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateItinerary(formData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message || "Itinerary failed", {
        position: "top-center"
      });
    }
    if (isSuccess) {
      toast.success("Itinerary generated successfully!");
      setFormData({
        fromDate: '',
        toDate: '',
        budget: ''
      });
    }
  }, [isError, isSuccess, message]);

  return (
    <div className="min-h-screen w-full bg-[#FBF5DE] md:py-12 md:px-4 lg:px-8 animate-fade-in">
      <div className="w-full flex items-center justify-center flex-col ">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center w-20 h-20 bg-[#437057] rounded-full mx-auto mb-5 shadow-lg">
            <MapPin className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-[#437057] mb-2 tracking-wide drop-shadow-md">
            Dream Destination Planner
          </h1>
          <p className="text-gray-700 text-lg">Plan your trip with style and ease ✨</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl md:w-[70%] w-[90%] p-10 mb-10 border border-[#437057]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* From Date */}
            <div>
              <label htmlFor="fromDate" className="flex items-center text-sm font-semibold text-[#437057] mb-2">
                <Calendar className="w-4 h-4 mr-2 text-[#437057]" />
                Start Date
              </label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                value={fromDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#437057] bg-gray-100 focus:bg-white transition-all duration-200"
                required
              />
            </div>

            {/* To Date */}
            <div>
              <label htmlFor="toDate" className="flex items-center text-sm font-semibold text-[#437057] mb-2">
                <Calendar className="w-4 h-4 mr-2 text-[#437057]" />
                End Date
              </label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                value={toDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#437057] bg-gray-100 focus:bg-white transition-all duration-200"
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="flex items-center text-sm font-semibold text-[#437057] mb-2">
                <DollarSign className="w-4 h-4 mr-2 text-[#437057]" />
                Budget in INR
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={budget}
                onChange={handleInputChange}
                placeholder="e.g., 20000"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#437057] bg-gray-100 focus:bg-white transition-all duration-200"
                min="0"
                step="100"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#437057] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#355b47] focus:outline-none focus:ring-2 focus:ring-[#437057] focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isLoading ? "Planning..." : "Generate Itinerary"}</span>
            </button>
          </form>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="bg-white md:w-[70%] w-[90%] rounded-2xl shadow-xl p-8 mb-8 text-center text-[#437057] font-medium">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 border-4 border-[#b5c4b7] border-t-[#437057] rounded-full animate-spin"></div>
              <span>Crafting your ideal travel plan...</span>
            </div>
          </div>
        )}

        {/* Itinerary */}
        {!isLoading && agentData && <ItineraryDisplay itineraryData={agentData} />}
      </div>
    </div>
  );
}

export default App;
