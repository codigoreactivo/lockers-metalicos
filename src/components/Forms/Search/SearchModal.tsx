import { useState, useEffect, useRef, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { client } from '../../../utils/apollo';
import { SEARCH_PRODUCTS_QUERY } from '../../../graphql/queries';
import SearchResultSkeleton from '../../Skeletons/SearchResultSkeleton';

interface Product {
    id: string;
    name: string;
    price: string;
    salePrice: string;
    regularPrice: string;
    slug: string;
    featuredImage?: {
        node: {
            sourceUrl: string;
            altText: string;
        }
    };
    productCategories?: {
        nodes: Array<{
            name: string;
            slug: string;
        }>
    };
}

const SearchModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showNoResults, setShowNoResults] = useState(false);
    const [hasTyped, setHasTyped] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    // Debounce para la búsqueda (300ms)
    const debouncedSearch = useCallback((term: string) => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            if (term.length >= 3) {
                handleSearch(term);
            } else if (hasTyped) {
                // Si el usuario borró y quedaron menos de 3 caracteres
                setSearchResults([]);
                setShowNoResults(false);
            }
        }, 300);
    }, [hasTyped]);

    // Efecto para realizar búsqueda automática cuando cambia el término
    useEffect(() => {
        if (searchTerm.length >= 3) {
            debouncedSearch(searchTerm);
        }

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, [searchTerm, debouncedSearch]);

    // Efecto para cerrar el modal con Escape y hacer clic fuera del modal
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
            inputRef.current?.focus(); // Enfocar el input al abrir
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = ''; // Restablecer overflow
        };
    }, [isOpen]);

    // Función para abrir el modal
    const openModal = () => {
        setIsOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsOpen(false);
        setSearchTerm('');
        setSearchResults([]);
        setShowNoResults(false);
        setHasTyped(false);
    };

    // Función para realizar la búsqueda
    const handleSearch = async (term: string) => {
        setIsLoading(true);
        setShowNoResults(false);

        try {
            const { data } = await client.query({
                query: SEARCH_PRODUCTS_QUERY,
                variables: {
                    search: term
                }
            });

            const products = data?.products?.nodes || [];
            setSearchResults(products);
            setShowNoResults(products.length === 0);
        } catch (error) {
            console.error('Error al buscar productos:', error);
            setSearchResults([]);
            setShowNoResults(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Manejar cambio en el input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (!hasTyped && value.length > 0) {
            setHasTyped(true);
        }

        // Si borra todo el texto, reiniciar resultados
        if (value.length === 0) {
            setSearchResults([]);
            setShowNoResults(false);
        }
    };

    // Manejar tecla Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchTerm.length >= 3) {
            handleSearch(searchTerm);
        }
    };

    // Formatear precio
    const formatPrice = (price: string | null | undefined) => {
        if (!price) return 'Precio no disponible';
        return `S/ ${price}`;
    };

    // Obtener el mejor precio (sale o regular)
    const getBestPrice = (product: Product) => {
        return product.salePrice || product.price || product.regularPrice;
    };

    // Determinar qué mostrar en el área de resultados
    const renderResults = () => {
        if (isLoading) {
            return <SearchResultSkeleton />;
        }

        if (showNoResults) {
            return (
                <div className="text-center py-6 sm:py-8">
                    <p className="text-gray-600 text-base sm:text-lg">No se encontraron productos para "{searchTerm}"</p>
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">Intenta con otra palabra o revisa nuestro catálogo completo</p>
                    <a
                        href="/productos"
                        className="inline-block mt-4 bg-[#EBBC2A] text-white px-6 py-2 rounded-lg hover:bg-[#d4a826] transition-colors oswald uppercase text-sm sm:text-base font-medium"
                        onClick={closeModal}
                    >
                        Ver todos los productos
                    </a>
                </div>
            );
        }

        if (searchResults.length > 0) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {searchResults.map((product) => (
                        <a
                            key={product.id}
                            href={`/productos/${product.slug}`}
                            onClick={closeModal}
                            className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 flex-shrink-0">
                                {product.featuredImage ? (
                                    <img
                                        src={product.featuredImage.node.sourceUrl}
                                        alt={product.featuredImage.node.altText || product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <FiSearch className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 p-2 sm:p-3">
                                <h3 className="font-medium line-clamp-2 text-sm sm:text-base">{product.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                                    {product.productCategories?.nodes?.[0]?.name || 'Producto'}
                                </p>
                                <p className="text-[#EBBC2A] font-semibold mt-0.5 sm:mt-1 oswald text-sm sm:text-base">
                                    {formatPrice(getBestPrice(product))}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            );
        }

        if (searchTerm.length > 0 && searchTerm.length < 3) {
            return (
                <div className="text-center py-8">
                    <p className="text-gray-600">Escribe al menos 3 caracteres para buscar</p>
                </div>
            );
        }

        return (
            <div className="text-center py-8">
                <p className="text-gray-600">Empieza a escribir para buscar productos</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                    <button
                        onClick={() => {
                            setSearchTerm("caja fuerte");
                            handleSearch("caja fuerte");
                        }}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                        Lockers Metálicos
                    </button>
                    <button
                        onClick={() => {
                            setSearchTerm("digital");
                            handleSearch("digital");
                        }}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                        Lockers
                    </button>
                    <button
                        onClick={() => {
                            setSearchTerm("buzon");
                            handleSearch("buzon");
                        }}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                        Lockers Especiales
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Botón de búsqueda */}
            <button
                onClick={openModal}
                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none text-[#EBBC2A] lg:text-black"
                aria-label="Buscar productos"
            >
                <FiSearch className="text-xl lg:text-2xl text-black" />
            </button>

            {/* Modal de búsqueda (aparece cuando isOpen es true) */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-60 pt-16 sm:pt-20 px-2">
                    <div
                        ref={modalRef}
                        className="bg-white w-full max-w-3xl rounded-lg shadow-xl overflow-hidden max-h-[80vh] flex flex-col"
                    >
                        {/* Barra de búsqueda */}
                        <div className="p-2 sm:p-3 border-b flex items-center gap-2 sm:gap-3">
                            <FiSearch className="text-xl text-gray-500" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Buscar productos..."
                                className="flex-1 text-base sm:text-lg outline-none"
                                value={searchTerm}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />

                            <button
                                onClick={closeModal}
                                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Cerrar búsqueda"
                            >
                                <FiX className="text-lg sm:text-xl" />
                            </button>
                        </div>

                        {/* Área de resultados (scrolleable) */}
                        <div className="overflow-y-auto flex-1 p-3 sm:p-4">
                            {renderResults()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchModal; 