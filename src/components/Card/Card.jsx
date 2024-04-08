import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ laptop }) => {
  const { brand, model, price, graphics, image } = laptop || {};

  return (
    <div>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <div>
          <img
            src={image}
            alt="Product"
            className="h-80 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {brand}
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              {model}
            </p>
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {graphics}
            </span>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ${price}
              </p>
              <div className="ml-auto">
                <Link to={`/details/${laptop?._id}`}>
                  <button className="btn btn-primary btn-sm">Details</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  laptop: PropTypes.object.isRequired,
};

export default Card;
