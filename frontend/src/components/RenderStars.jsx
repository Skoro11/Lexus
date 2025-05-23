// renderStarsLogic.js
import PropTypes from "prop-types"; // Import PropTypes for type-checking

const getStarElements = (stars) => {
  // Ensure stars doesn't exceed 5
  const cappedStars = Math.min(stars, 5); // Cap the number of stars to a max of 5

  const fullStars = Math.floor(cappedStars); // Full stars
  const halfStars = cappedStars % 1 >= 0.5 ? 1 : 0; // Half star if the decimal part is 0.5 or greater
  const emptyStars = 5 - fullStars - halfStars; // Remaining stars will be empty

  return { fullStars, halfStars, emptyStars };
};

// Function to render stars based on a numerical rating (e.g., 4.5, 3, etc.)
const RenderStars = ({ stars }) => {
  const { fullStars, halfStars, emptyStars } = getStarElements(stars); // Get the star count logic

  // Array to store the JSX of stars
  const starElements = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starElements.push(
      <img
        className="star"
        key={`full-${i}`}
        src="full-star.png"
        alt="Full Star"
      />
    );
  }

  // Add half star if necessary
  for (let i = 0; i < halfStars; i++) {
    starElements.push(
      <img
        className="star"
        key={`half-${i}`}
        src="half-star.png"
        alt="Half Star"
      />
    );
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starElements.push(
      <img
        className="star"
        key={`empty-${i}`}
        src="empty-star.png"
        alt="Empty Star"
      />
    );
  }

  return <div className="render-stars-container">{starElements}</div>;
};

// Prop types for the RenderStars component
RenderStars.propTypes = {
  stars: PropTypes.number.isRequired, // stars should be a number
};

export default RenderStars;
