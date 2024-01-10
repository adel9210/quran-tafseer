import React, { useState, useEffect } from 'react';

const ImageLoader = ({ imageUrl }) => {
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const loadImage = async () => {
            setLoading(true)
            // Check if the image is already loaded in the cache
            if (window.loadedImages && window.loadedImages[imageUrl]) {
                setLoading(false);
                return;
            }

            const image = new Image();
            image.src = imageUrl;

            image.onload = () => {
                setLoading(false);

                // Add the loaded image to the cache
                if (!window.loadedImages) {
                    window.loadedImages = {};
                }
                window.loadedImages[imageUrl] = true;
            };

            image.onerror = () => {
                // Handle image loading error if needed
                setLoading(false);
                setImageError(true);
            };
        };

        loadImage();
    }, [imageUrl]);

    return (
        <div>
            {loading && <p>جاري تحميل الصفحه...</p>}
            {imageError && <p>Error loading image</p>}
            {!loading && !imageError && <img src={imageUrl} alt="Loaded Image" />}
        </div>
    );
};

export default ImageLoader;
