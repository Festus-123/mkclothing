import React, { useState, useEffect } from "react";

const   ImagePreviewStrip = ({ images = [], alt = "" }) => {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [images]);

  if (!images.length) {
    return (
      <div className="w-full h-56 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
        No Image
      </div>
    );
  }

  const imageUrl = (image) =>
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images/${image}`;

  return (
    <div className="flex flex-col gap-3 max-w-100">

      {/* Main Image */}

      <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square">

        <img
          src={imageUrl(images[activeImage])}
          alt={alt}
          className="w-full h-full object-cover transition-all duration-300"
        />

      </div>

      {/* Thumbnail Strip */}

      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">

          {images.map((image, index) => (
            <button
              key={index}
              onMouseEnter={() => setActiveImage(index)}
              onClick={() => setActiveImage(index)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                activeImage === index
                  ? "border-amber-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={imageUrl(image)}
                alt={`${alt}-${index}`}
                className="w-16 h-16 object-cover"
              />
            </button>
          ))}

        </div>
      )}
    </div>
  );
};

export default ImagePreviewStrip;