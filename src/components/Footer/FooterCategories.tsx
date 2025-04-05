import { useState, useEffect } from 'react';
import { client } from '../../utils/apollo';
import { PRODUCT_CATEGORIES_QUERY } from '../../graphql/queries';

export default function FooterCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Usar Apollo Client directamente con la consulta existente
                const { data } = await client.query({
                    query: PRODUCT_CATEGORIES_QUERY,
                });

                if (data && data.productCategories && data.productCategories.nodes) {
                    setCategories(data.productCategories.nodes);
                } else {
                    throw new Error('No se pudieron cargar las categorías');
                }
            } catch (err) {
                console.error('Error al cargar categorías:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold mb-4">Categorías</h3>
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3 mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded w-4/5 mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
                </div>
            </div>
        );
    }

    if (error || !categories.length) {
        return (
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold mb-4">Categorías</h3>
                <ul className="flex flex-col gap-3">
                    <li>
                        <a
                            href="/productos"
                            className="text-gray-400 hover:text-[#EBBC2A] transition-colors duration-300"
                        >
                            Ver todos los productos
                        </a>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold mb-4">Categorías</h3>
            <ul className="flex flex-col gap-3">
                {categories.map((category) => (
                    <li key={category.id} className='flex items-center gap-2'>
                        <img src={category.image.sourceUrl} alt={category.name} width={48} height={50} className=' rounded-sm' />
                        <a href={category.link} className="text-gray-400 hover:text-[#EBBC2A] transition-colors duration-300">{category.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
} 