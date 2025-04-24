"use client";
import { useState } from "react";
import { XIcon } from "lucide-react";
import { Input } from "../ui/input";

// Reusable TagInput component
interface TagInputProps {
  placeholder: string;
  value: string[]; // Array of tags
  onChange: (tags: string[]) => void; // Handler to update the form value
}

const TagInput = ({ placeholder, value, onChange }: TagInputProps) => {
  const [input, setInput] = useState("");

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle "Enter" key press to add a tag
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault(); // Prevent form submission
      // Add the input value to the tags array
      onChange([...value, input.trim()]);
      setInput(""); // Clear input field
    }
  };

  // Remove a tag
  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <Input
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md p-2"
      />
      <div className="flex flex-wrap space-x-2 mt-2">
        {value.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm"
          >
            <span className="">{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="text-red-500 hover:text-red-700"
            >
              <XIcon size={20} /> {/* Cross icon */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
