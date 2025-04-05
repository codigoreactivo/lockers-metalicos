import React from 'react';

const SearchResultSkeleton: React.FC = () => {
    // Crear un array de 4 elementos para mostrar 4 skeletons
    const skeletons = Array(4).fill(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {skeletons.map((_, index) => (
                <div
                    key={index}
                    className="flex border border-gray-200 rounded-lg overflow-hidden animate-pulse p-1 items-center"
                >
                    {/* Imagen skeleton */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>

                    {/* Contenido skeleton */}
                    <div className="flex-1 p-2 sm:p-3">
                        {/* Título skeleton */}
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

                        {/* Categoría skeleton */}
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>

                        {/* Precio skeleton */}
                        <div className="h-4 bg-gray-200 rounded w-1/3 mt-1"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchResultSkeleton; 