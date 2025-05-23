import "../styles/Category.css";
import { useNavigate } from "react-router-dom";
function CategorySection() {
  const navigate = useNavigate();
  // Function to handle category click
  const handleCategoryClick = (category) => {
    navigate(`/${category}`); // Navigate to the route based on category
  };

  return (
    <div className="carousel-wrapper">
      <div className="heading-description">
        <span className="orange orange-span"></span>
        <div className="orange orange-text">Categories</div>
      </div>

      <div className="heading-section">
        <div className="heading-clock">
          <h1>Browse by Category</h1>
        </div>
      </div>

      <div className="container-category">
        <div
          className="item-category"
          onClick={() => handleCategoryClick("all")}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1069_1639)">
              <path
                className="svg-container"
                d="M38.9375 6.125H17.0625C15.5523 6.125 14.3281 7.34922 14.3281 8.85938V47.1406C14.3281 48.6508 15.5523 49.875 17.0625 49.875H38.9375C40.4477 49.875 41.6719 48.6508 41.6719 47.1406V8.85938C41.6719 7.34922 40.4477 6.125 38.9375 6.125Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="svg-container"
                d="M25.6665 7H31.1353"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="svg-container"
                d="M28 44.0052V44.0305"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                className="svg-container"
                x1="15.1665"
                y1="39.8334"
                x2="40.8332"
                y2="39.8334"
                stroke="black"
                strokeWidth="2"
              />
            </g>
            <defs>
              <clipPath id="clip0_1069_1639">
                <rect width="56" height="56" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Electronics
        </div>
        <div
          className="item-category"
          onClick={() => handleCategoryClick("all")}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1069_78)">
              <path
                className="svg-container"
                d="M46.6667 9.33337H9.33333C8.04467 9.33337 7 10.378 7 11.6667V35C7 36.2887 8.04467 37.3334 9.33333 37.3334H46.6667C47.9553 37.3334 49 36.2887 49 35V11.6667C49 10.378 47.9553 9.33337 46.6667 9.33337Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="svg-container"
                d="M16.3335 46.6666H39.6668"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="svg-container"
                d="M21 37.3334V46.6667"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="svg-container"
                d="M35 37.3334V46.6667"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="svg-container"
                d="M8 32H48"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1069_78">
                <rect width="56" height="56" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Furniture
        </div>
        <div
          className="item-category"
          onClick={() => handleCategoryClick("all")}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1069_1275)">
              <path
                d="M35 14H21C17.134 14 14 17.134 14 21V35C14 38.866 17.134 42 21 42H35C38.866 42 42 38.866 42 35V21C42 17.134 38.866 14 35 14Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
              <path
                d="M21 42V49H35V42"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
              <path
                d="M21 14V7H35V14"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
              <line
                x1="24"
                y1="23"
                x2="24"
                y2="34"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                className="svg-container"
              />
              <line
                x1="28"
                y1="28"
                x2="28"
                y2="34"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                className="svg-container"
              />
              <line
                x1="32"
                y1="26"
                x2="32"
                y2="34"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                className="svg-container"
              />
            </g>
            <defs>
              <clipPath id="clip0_1069_1275">
                <rect width="56" height="56" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Sport
        </div>
        <div
          className="item-category"
          onClick={() => handleCategoryClick("all")}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1069_1884)">
              <path
                d="M11.6667 16.3334H14C15.2377 16.3334 16.4247 15.8417 17.2998 14.9665C18.175 14.0914 18.6667 12.9044 18.6667 11.6667C18.6667 11.0479 18.9125 10.4544 19.3501 10.0168C19.7877 9.57921 20.3812 9.33337 21 9.33337H35C35.6188 9.33337 36.2123 9.57921 36.6499 10.0168C37.0875 10.4544 37.3333 11.0479 37.3333 11.6667C37.3333 12.9044 37.825 14.0914 38.7002 14.9665C39.5753 15.8417 40.7623 16.3334 42 16.3334H44.3333C45.571 16.3334 46.758 16.825 47.6332 17.7002C48.5083 18.5754 49 19.7624 49 21V42C49 43.2377 48.5083 44.4247 47.6332 45.2999C46.758 46.175 45.571 46.6667 44.3333 46.6667H11.6667C10.429 46.6667 9.242 46.175 8.36683 45.2999C7.49167 44.4247 7 43.2377 7 42V21C7 19.7624 7.49167 18.5754 8.36683 17.7002C9.242 16.825 10.429 16.3334 11.6667 16.3334"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
              <path
                d="M28 37.3334C31.866 37.3334 35 34.1994 35 30.3334C35 26.4674 31.866 23.3334 28 23.3334C24.134 23.3334 21 26.4674 21 30.3334C21 34.1994 24.134 37.3334 28 37.3334Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
            </g>
            <defs>
              <clipPath id="clip0_1069_1884">
                <rect width="56" height="56" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Accessories
        </div>
        <div
          className="item-category"
          onClick={() => handleCategoryClick("all")}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1069_2995)">
              <path
                d="M46.6665 14H9.33317C6.75584 14 4.6665 16.0893 4.6665 18.6667V37.3333C4.6665 39.9107 6.75584 42 9.33317 42H46.6665C49.2438 42 51.3332 39.9107 51.3332 37.3333V18.6667C51.3332 16.0893 49.2438 14 46.6665 14Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
              <path
                d="M14 28H23.3333M18.6667 23.3334V32.6667"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
              <path
                d="M35 25.6666V25.6908"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
              <path
                d="M42 30.3333V30.3574"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
            </g>
            <defs>
              <clipPath id="clip0_1069_2995">
                <rect width="56" height="56" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Toys
        </div>
        <div
          className="item-category"
          onClick={() => handleCategoryClick("all")}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1069_1203)">
              <path
                d="M16.3335 30.3334H14.0002C11.4228 30.3334 9.3335 32.4227 9.3335 35V42C9.3335 44.5774 11.4228 46.6667 14.0002 46.6667H16.3335C18.9108 46.6667 21.0002 44.5774 21.0002 42V35C21.0002 32.4227 18.9108 30.3334 16.3335 30.3334Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
              <path
                d="M42 30.3334H39.6667C37.0893 30.3334 35 32.4227 35 35V42C35 44.5774 37.0893 46.6667 39.6667 46.6667H42C44.5773 46.6667 46.6667 44.5774 46.6667 42V35C46.6667 32.4227 44.5773 30.3334 42 30.3334Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
              <path
                d="M9.3335 35V28C9.3335 23.0493 11.3002 18.3014 14.8008 14.8007C18.3015 11.3 23.0495 9.33337 28.0002 9.33337C32.9509 9.33337 37.6988 11.3 41.1995 14.8007C44.7002 18.3014 46.6668 23.0493 46.6668 28V35"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="svg-container"
              />
            </g>
            <defs>
              <clipPath id="clip0_1069_1203">
                <rect width="56" height="56" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Other
        </div>
      </div>
    </div>
  );
}
export default CategorySection;
