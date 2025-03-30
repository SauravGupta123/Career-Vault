"use client";
import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateSkillRoadmap } from "@/actions/dashboard";

const Chatbot = ({ insights }) => {
  const [messages, setMessages] = useState([
    {
      text: "Which skill do you want to learn?",
      sender: "bot",
      skills: insights.recommendedSkills,
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSkillClick = async (skill) => {
    setMessages([...messages, { text: skill, sender: "user" }]);
    setLoading(true);
    console.log("Selected skill:", skill);
   console.log("Industry:", insights.industry);

    try {
      // Call the generateSkillRoadmap function
      const roadmap = await generateSkillRoadmap(skill, insights.industry);
        console.log("Generated roadmap:", roadmap);
      // Add the response to the messages
      setMessages((prev) => [
        ...prev,
        { text: roadmap.learningPath, sender: "bot" },
        { text: "Was this helpful?", sender: "bot", feedback: true },
      ]);
    } catch (error) {
        console.error("Error generating skill roadmap:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Sorry, I couldn't fetch the learning path. Please try again later.", sender: "bot" },
        ]);
      } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (feedback) => {
    setMessages([...messages, { text: feedback, sender: "user" }]);
    if (feedback === "No") {
      setMessages((prev) => [
        ...prev,
        { text: "What would you like to improve?", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 bg-gray-800 text-white rounded-full shadow-lg z-50"
        >
          <MessageSquare />
        </button>
      ) : (
        <Card className="w-80 bg-gray-900 text-white shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <div className="flex gap-6">
            <CardTitle>Skill Chatbot</CardTitle>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>
          </CardHeader>
          <CardContent className="h-60 overflow-y-auto p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  msg.sender === "bot"
                    ? "bg-gray-700 text-white self-start"
                    : "bg-blue-500 text-white self-end"
                }`}
              >
                {msg.text}
                {msg.skills && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.skills.map((skill) => (
                      <Button
                        key={skill}
                        size="sm"
                        onClick={() => handleSkillClick(skill)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                )}
                {msg.feedback && (
                  <div className="mt-2 flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleFeedback("Yes")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleFeedback("No")}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      No
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {loading && <p className="text-gray-400">Fetching learning path...</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Chatbot;