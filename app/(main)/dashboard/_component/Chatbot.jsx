"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Loader2, Send } from "lucide-react";
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
    const [showTooltip, setShowTooltip] = useState(false); // Initially hidden
    const chatEndRef = useRef(null);
    let tooltipTimeout = useRef(null);

    // Scroll to the bottom of the chat smoothly
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, typing]);

    // Show tooltip on hover and hide it after 3 seconds
    const handleTooltipHover = () => {
        setShowTooltip(true); // Show tooltip
        clearTimeout(tooltipTimeout.current); // Clear any existing timeout
        tooltipTimeout.current = setTimeout(() => {
            setShowTooltip(false); // Hide tooltip after 3 seconds
        }, 3000);
    };

    const handleTooltipLeave = () => {
        clearTimeout(tooltipTimeout.current); // Clear timeout if user leaves early
        setShowTooltip(false); // Hide tooltip immediately
    };

    const handleSkillClick = async (skill, addMessage = true) => {
        if (addMessage) {
            setMessages((prev) => [...prev, { text: skill, sender: "user" }]);
        }
        setLoading(true);
        setTyping(true);

        try {
            const roadmap = await generateSkillRoadmap(skill, insights.industry);

            // Format the response for display
            const formattedResponse = (
                <div className="container text-xs">
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
                                    className="text-blue-400 underline hover:text-blue-600"
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

    const handleSend = () => {
        if (!input.trim()) return; // Ignore empty or whitespace-only input

        const userMessage = input.trim(); // Get the user's input
        setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]); // Add the user's message to the chat
        setInput(""); // Clear the input field
        setTyping(true); // Show typing indicator

        // Add a small delay to simulate typing
        setTimeout(() => {
            // Check if any skill keyword exists in the user's message
            const matchedSkill = insights.recommendedSkills.find((skill) =>
                userMessage.toLowerCase().includes(skill.toLowerCase())
            );

            if (matchedSkill) {
                // If a skill is found in the sentence, fetch the roadmap without adding the skill as a new message
                handleSkillClick(matchedSkill, false); // Pass a flag to avoid adding the skill as a user message
            } else {
                // If no skill matches, show fallback message and skills card
                setMessages((prev) => [
                    ...prev,
                    { text: "I'm sorry, I can't help with that. Please click on the skill you want to learn next.", sender: "bot" },
                    { text: "Which skill do you want to learn next?", sender: "bot", skills: insights.recommendedSkills },
                ]);
                setTyping(false);
            }
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-4 right-4">
            {!isOpen ? (
                <div
                    className="relative"
                    onMouseEnter={handleTooltipHover} // Show tooltip on hover
                    onMouseLeave={handleTooltipLeave} // Hide tooltip on mouse leave
                >
                    {/* Tooltip */}
                    {showTooltip && (
                        <div className="absolute -top-16 -left-32 bg-primary text-primary-foreground p-2 rounded-lg text-sm w-40 shadow-lg">
                            <div className="relative">
                                Want to learn a skill?
                                <div className="absolute border-8 border-transparent border-t-primary top-full left-32 -translate-x-1/2"></div>
                            </div>
                        </div>
                    )}

                    {/* Chat button with pulse effect */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg z-50 relative"
                    >
                        <MessageSquare className="h-6 w-6 relative z-10" />
                        <span className="absolute inset-0 rounded-full bg-primary opacity-75 animate-ping"></span>
                    </button>
                </div>
            ) : (
                <Card className="w-80 bg-background text-foreground shadow-lg border border-border">
                    <CardHeader className="flex flex-row justify-between items-center p-3 border-b border-border">
                        <CardTitle className="text-lg font-semibold">Skill Chatbot</CardTitle>
                        <X
                            className="cursor-pointer text-muted-foreground hover:text-foreground"
                            onClick={() => setIsOpen(false)}
                        />
                    </CardHeader>
                    <CardContent className="h-60 overflow-y-auto p-3 space-y-3">
                        <div className="flex flex-col space-y-3">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`p-2 rounded-lg text-xs max-w-[85%] ${
                                            msg.sender === "bot"
                                                ? "bg-muted text-foreground rounded-tl-none"
                                                : "bg-primary text-primary-foreground rounded-tr-none"
                                        }`}
                                    >
                                        {msg.text}
                                        {msg.skills && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {msg.skills.map((skill) => (
                                                    <Button
                                                        key={skill}
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleSkillClick(skill)}
                                                        className="text-xs py-1 h-auto min-h-0 bg-secondary text-secondary-foreground hover:bg-secondary-hover"
                                                    >
                                                        {skill}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {typing && (
                            <div className="flex justify-start">
                                <div className="p-2 rounded-lg text-xs bg-muted text-foreground rounded-tl-none flex items-center space-x-1">
                                    <div className="flex space-x-1">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </CardContent>
                    <div className="p-3 border-t border-border flex items-center gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 bg-muted text-muted-foreground text-xs h-8"
                        />
                        <Button
                            onClick={handleSend}
                            size="sm"
                            className="h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary-hover"
                        >
                            <Send className="h-3 w-3" />
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Chatbot;