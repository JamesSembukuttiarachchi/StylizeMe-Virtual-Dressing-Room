import React from 'react'
import { useState } from 'react';
import { GoBookmark } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Card = ({product}) => {

    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const handleHeartClick = () => {
      setIsHeartFilled(!isHeartFilled);
    };
  
  return (
    <div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div
                className={`rating gap-1 absolute right-2 top-2 p-4 heartStar ${
                  isHeartFilled ? "text-rose-500" : "text-black"
                }`}
                onClick={handleHeartClick}
              >
                <GoBookmark className="h-5 w-5 cursor" />
              </div>
              <Link to={`/product/${product.id}`} className="card-image">
                <figure>
                  <img
                    src={product.imageUrl}
                    alt="image"
                    className="card-image hover:scale-105 transition duration-200 md:h-72"
                  />
                </figure>
              </Link>
              <div className="card-body">
                <Link to={`/product/${product.id}`}>
                  <h2 className="card-title">{product.name}</h2>
                </Link>
                <div className="card-actions justify-between items-center mt-2">
                  <h5 className="font-extralight text-gray-400">Rs.{product.price}</h5>
                  
                </div>
              </div>
            </div>
          </div>
  )
}

export default Card