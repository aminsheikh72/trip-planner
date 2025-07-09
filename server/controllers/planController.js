const {GoogleGenAI, Type} = require("@google/genai")

const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});

async function generatePlanner(prompt) {
 
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          destination: { type: Type.STRING },
          duration: { type: Type.STRING },
          budgetBreakdown: {
            type: Type.OBJECT,
            properties: {
              travel: { type: Type.STRING },
              accommodation: { type: Type.STRING },
              food: { type: Type.STRING },
              activities: { type: Type.STRING },
              miscellaneous: { type: Type.STRING },
            },
          },
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                stay: { type: Type.STRING },
                activities: { type: Type.ARRAY, items: { type: Type.STRING } },
                food: { type: Type.STRING },
                estimatedCost: { type: Type.STRING },
              },
            },
          },
          totalEstimatedCost: { type: Type.STRING },
        },
        propertyOrdering: [
          "destination",
          "duration",
          "budgetBreakdown",
          "itinerary",
          "totalEstimatedCost",
        ],
      },
    },
  });
  return response.text

  
}


const generatePlan =async(req,res)=>{
    const {budget,fromDate,toDate}= req.body
    const prompt =  `
You are a smart AI travel planner. 
The user will provide:
- Budget (in INR or USD)
- Start date (fromDate) and End date (toDate) of travel

Your job is to:

1. Calculate trip duration in days.

2. Based on the budget and trip duration, suggest best possible travel destination(s) — domestic or international — that are realistically possible within that budget (including travel, stay, food, and activities).

3. Pick 1 location (or a short list) that fits the criteria and is good to visit in that month/date range.

4. Create a complete day-wise itinerary for that location, including:
   - Where to go
   - What to do (activities/attractions)
   - Where to stay (budget hotel/hostel estimate)
   - Food options (average cost)
   - Local transport info
   - Approximate cost per day

5. Give a clear budget breakdown across:
   - Travel (to and from destination)
   - Accommodation
   - Food
   - Sightseeing & Activities
   - Miscellaneous (~10%)

6. Keep total estimated cost within or slightly below budget.

7. Highlight total estimated cost vs. user budget at the end.

Input:
  budget (inr) : ${budget},
  fromDate: ${fromDate},
  toDate: ${toDate}

`
try {
const data = await generatePlanner(prompt)
    const parsingData = JSON.parse(data)    
    res.status(200).json(parsingData)
} catch (error) {
    res.status(500).json({
        message : "itinaray failed"
    })
}

   
}

module.exports ={generatePlan}