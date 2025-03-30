"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Loader2, Send, MoreHorizontal } from "lucide-react";
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
    const [typing, setTyping] = useState(false);
    const chatEndRef = useRef(null);

    // Scroll to the bottom of the chat smoothly
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, typing]);

    const handleSkillClick = async (skill) => {
        setMessages((prev) => [...prev, { text: skill, sender: "user" }]);
        setLoading(true);
        setTyping(true);

        try {
            const roadmap = await generateSkillRoadmap(skill, insights.industry);

            // Format the response for display
            const formattedResponse = (
                <div className="container">
                    <div className="font-semibold">Pathways:</div>
                    <ul className="list-disc pl-4">
                        {roadmap.pathways.map((step, index) => (
                            <li key={`pathway-${index}`}>{step}</li>
                        ))}
                    </ul>

                    <div className="font-semibold mt-2">Resources:</div>
                    <ul className="list-disc pl-4">
                        {roadmap.resources.map((resource, index) => (
                            <li key={`resource-${index}`} className="w-full break-words">
                                <a
                                    href={resource.courseLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white underline hover:text-blue-800"
                                >
                                    {resource.courseName}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="font-semibold mt-2">Improvement Tips:</div>
                    <ul className="list-disc pl-4">
                        {roadmap.improvementTips.map((tip, index) => (
                            <li key={`tip-${index}`}>{tip}</li>
                        ))}
                    </ul>
                </div>
            );

            setMessages((prev) => [
                ...prev,
                { text: formattedResponse, sender: "bot", isFormatted: true },
                { text: "I hope this was helpful.", sender: "bot" },
                { text: "Which skill do you want to learn next?", sender: "bot", skills: insights.recommendedSkills },
            ]);
        } catch (error) {
            console.error("Error generating skill roadmap:", error);
            setMessages((prev) => [
                ...prev,
                { text: "Sorry, I couldn't fetch the learning path. Please try again later.", sender: "bot" },
            ]);
        } finally {
            setLoading(false);
            setTyping(false);
        }
    };

    const handleFeedback = (feedback) => {
        setMessages((prev) => [...prev, { text: feedback, sender: "user" }]);
        if (feedback === "No") {
            setMessages((prev) => [
                ...prev,
                { text: "What would you like to improve?", sender: "bot" },
            ]);
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input.trim().toLowerCase();
        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        setInput("");

        // Check if the input matches any recommended skill
        const matchedSkill = insights.recommendedSkills.find(
            (skill) => skill.toLowerCase() === userMessage
        );

        if (matchedSkill) {
            // If a skill matches, fetch the roadmap for that skill
            handleSkillClick(matchedSkill);
        } else {
            // If no skill matches, show fallback message and skills card
            setMessages((prev) => [
                ...prev,
                { text: "I'm sorry, I can't help with that. Please click on the skill you want to learn next.", sender: "bot" },
                { text: "Which skill do you want to learn next?", sender: "bot", skills: insights.recommendedSkills },
            ]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-4 right-4">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg z-50"
                >
                    <MessageSquare className="h-6 w-6" />
                </button>
            ) : (
                <Card className="w-80 bg-background text-foreground shadow-lg border border-border">
                    <CardHeader className="flex justify-between items-center p-4 border-b border-border">
                        <CardTitle className="text-lg font-semibold">Skill Chatbot</CardTitle>
                        <X
                            className="cursor-pointer text-muted-foreground hover:text-foreground"
                            onClick={() => setIsOpen(false)}
                        />
                    </CardHeader>
                    <CardContent className="h-60 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg text-sm ${msg.sender === "bot"
                                        ? "bg-muted text-muted-foreground self-start"
                                        : "bg-primary text-primary-foreground self-end"
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
                                                className="bg-secondary text-secondary-foreground hover:bg-secondary-hover"
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
                                            className="bg-green-600 text-white hover:bg-green-700"
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleFeedback("No")}
                                            className="bg-red-600 text-white hover:bg-red-700"
                                        >
                                            No
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    
                        {loading && (
                            <div className="p-3 rounded-lg text-sm bg-muted text-muted-foreground self-start flex items-center gap-2">
                                <Loader2 className="animate-spin" />
                                Fetching learning path...
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </CardContent>
                    <div className="p-4 border-t border-border flex items-center gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 bg-muted text-muted-foreground"
                        />
                        <Button
                            onClick={handleSend}
                            className="bg-primary text-primary-foreground hover:bg-primary-hover"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Chatbot;