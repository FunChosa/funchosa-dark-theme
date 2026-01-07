import React, { useState, useEffect, useCallback } from "react";

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  onTagClick: (tag: string) => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  tags,
  onTagClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    document.title = `${title} | My App`;

    return () => {
      document.title = "My App";
    };
  }, [title]);

  const handleLike = useCallback(() => {
    setLikes((prev) => prev + 1);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className="card">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}

      <div className="card-content">
        <h3 className="card-title">{title}</h3>

        <p className={`card-description ${isExpanded ? "expanded" : ""}`}>
          {description}
        </p>

        <button onClick={toggleExpand}>
          {isExpanded ? "Show less" : "Read more"}
        </button>

        <div className="card-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag" onClick={() => onTagClick(tag)}>
              #{tag}
            </span>
          ))}
        </div>

        <div className="card-actions">
          <button onClick={handleLike}>❤️ {likes}</button>
        </div>
      </div>
    </article>
  );
};

export default Card;
