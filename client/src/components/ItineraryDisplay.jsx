import React from 'react';
import {
  MapPin, Calendar, DollarSign, Clock,
  Utensils, Bed, Activity,
  IndianRupee
} from 'lucide-react';

const ItineraryDisplay = ({ itineraryData }) => {
  if (!itineraryData) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-10 animate-fade-in text-center max-w-4xl mx-auto">
        <div className="w-20 h-20 bg-[#FBF5DE] border border-[#437057]/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <MapPin className="w-10 h-10 text-[#437057]" />
        </div>
        <h3 className="text-2xl font-bold text-[#437057] mb-2">Your Itinerary Awaits</h3>
        <p className="text-gray-600 mb-4">Fill the form above and hit generate to see your travel plan.</p>
        <div className="border-2 border-dashed border-[#437057]/20 rounded-xl p-6 bg-[#FBF5DE]/20">
          <p className="text-[#437057] text-sm">Let’s make your dream trip happen! ✈️</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 animate-fade-in">
      {/* Overview */}
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center space-y-4">
        <div className="w-20 h-20 bg-[#437057] rounded-full flex items-center justify-center mx-auto shadow-lg">
          <MapPin className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-[#437057]">{itineraryData.destination}</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-600">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-[#437057]" />
            {itineraryData.duration}
          </div>
          <div className="flex items-center">
            <IndianRupee className="w-5 h-5 mr-2 text-[#437057]" />
            {itineraryData.totalEstimatedCost}
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="bg-[#FBF5DE] border border-[#437057]/20 rounded-3xl p-8 shadow-lg animate-slide-up">
        <h3 className="text-center text-xl font-bold text-[#437057] mb-6">Budget Breakdown</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(itineraryData.budgetBreakdown).map(([category, amount]) => (
            <div key={category} className="bg-white rounded-xl p-5 shadow transition-transform hover:scale-[1.02] hover:shadow-md duration-300">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
              <div className="text-sm font-medium text-gray-800 leading-relaxed whitespace-pre-line">
                {amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Itinerary */}
      <div className="grid gap-8">
        {itineraryData.itinerary.map((day, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden animate-slide-up">
            <div className="bg-[#437057] text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{day.day}</h3>
                <p className="text-green-100 text-sm mt-1">{day.estimatedCost}</p>
              </div>
              <Calendar className="w-6 h-6" />
            </div>

            <div className="p-6 grid md:grid-cols-3 gap-6">
              {/* Activities */}
              <div className="col-span-1">
                <div className="flex items-center mb-2">
                  <Activity className="w-5 h-5 text-[#437057] mr-2" />
                  <h4 className="text-lg font-semibold text-gray-900">Activities</h4>
                </div>
                <ul className="space-y-2 pl-4 border-l-2 border-[#437057]/20">
                  {day.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="text-sm text-gray-700 relative before:content-[''] before:absolute before:w-2 before:h-2 before:bg-[#437057] before:rounded-full before:-left-2 before:top-1.5">
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Food */}
              <div>
                <div className="flex items-center mb-2">
                  <Utensils className="w-5 h-5 text-orange-600 mr-2" />
                  <h5 className="text-lg font-semibold text-gray-900">Food</h5>
                </div>
                <p className="text-sm text-gray-600 bg-orange-50 rounded-lg p-3 min-h-[80px]">
                  {day.food || "No food info"}
                </p>
              </div>

              {/* Stay */}
              <div>
                <div className="flex items-center mb-2">
                  <Bed className="w-5 h-5 text-green-600 mr-2" />
                  <h5 className="text-lg font-semibold text-gray-900">Accommodation</h5>
                </div>
                <p className="text-sm text-gray-600 bg-green-50 rounded-lg p-3 min-h-[80px]">
                  {day.stay !== 'N/A' ? day.stay : "No stay info"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white rounded-3xl shadow-xl p-6 text-center animate-fade-in">
        <p className="text-sm text-gray-700">
          Have a wonderful trip to <span className="font-semibold text-[#437057]">{itineraryData.destination}</span>!
        </p>
        <p className="text-xs mt-2 text-gray-500">Safe travels and enjoy your adventure ✨</p>
      </div>
    </div>
  );
};

export default ItineraryDisplay;