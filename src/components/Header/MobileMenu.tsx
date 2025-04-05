import { useState, useEffect } from 'react';
import LogoFbs from "../../assets/logofbsneo.png";
import { menuItems } from '../../config/menuItems';
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { FaBox, FaLock } from "react-icons/fa";
import { BsFillSafeFill } from "react-icons/bs";

interface Category {
  name: string;
  slug: string;
  icon: JSX.Element;
}

interface Product {
  name: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
}

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const categoryIcons: { [key: string]: JSX.Element } = {
    'cajas-fuertes': <BsFillSafeFill className="w-6 h-6" />,
    'cerraduras': <FaLock className="w-6 h-6" />,
    'cofres': <FaBox className="w-6 h-6" />
  };

  useEffect(() => {
    if (openSubmenu === 'Categorías') {
      fetchCategories();
    } else if (openSubmenu === 'Productos') {
      fetchProducts();
    }
  }, [openSubmenu]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      const formattedCategories = data.map((cat: any) => ({
        name: cat.name,
        slug: cat.slug,
        icon: categoryIcons[cat.slug] || <FaBox className="w-6 h-6" />
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleSubmenu = (label: string) => setOpenSubmenu(openSubmenu === label ? null : label);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="lg:hidden text-slate-700 p-2 hover:text-[#EBBC2A] transition-colors duration-300"
      >
        <HiMenu size={24} />
      </button>

      <div className={`fixed inset-0 bg-white z-50 overflow-y-auto lg:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <img
              src={LogoFbs.src}
              alt="Logo"
              className="h-auto w-48 cursor-pointer hover:opacity-80 transition-opacity duration-300"
              onClick={() => {
                window.location.href = '/';
                closeMenu();
              }}
            />
            <button
              onClick={closeMenu}
              className="text-slate-700 p-2 hover:text-[#EBBC2A] transition-colors duration-300 hover:scale-110 active:scale-95 transform"
            >
              <IoClose size={24} />
            </button>
          </div>

          <nav>
            <ul className="space-y-4 oswald text-xl">
              {menuItems.map((item) => (
                <li 
                  key={item.path}
                  className="border-b border-gray-100 pb-2 hover:translate-x-2 transition-transform duration-300"
                >
                  {item.children || item.label === 'Categorías' || item.label === 'Productos' ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className="flex items-center justify-between w-full text-left text-gray-800 hover:text-[#EBBC2A] transition-colors duration-300"
                      >
                        {item.label}
                        <div className={`transform transition-transform duration-300 ${openSubmenu === item.label ? 'rotate-180' : ''}`}>
                          <IoIosArrowDown size={20} />
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openSubmenu === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        {loading ? (
                          <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EBBC2A]"></div>
                          </div>
                        ) : (
                          <ul className="ml-4 mt-2 space-y-2">
                            {item.label === 'Categorías' && categories.map((category) => (
                              <li 
                                key={category.slug}
                                className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300"
                              >
                                {category.icon}
                                <a
                                  href={`/categorias/${category.slug}`}
                                  onClick={closeMenu}
                                  className="block text-gray-600 hover:text-[#EBBC2A] transition-colors duration-300"
                                >
                                  {category.name}
                                </a>
                              </li>
                            ))}
                            {item.label === 'Productos' && products.map((product) => (
                              <li 
                                key={product.slug}
                                className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300"
                              >
                                {product.featuredImage && (
                                  <img
                                    src={product.featuredImage.node.sourceUrl}
                                    alt={product.name}
                                    className="w-8 h-8 object-cover rounded"
                                  />
                                )}
                                <a
                                  href={`/productos/${product.slug}`}
                                  onClick={closeMenu}
                                  className="block text-gray-600 hover:text-[#EBBC2A] transition-colors duration-300"
                                >
                                  {product.name}
                                </a>
                              </li>
                            ))}
                            {item.children?.map((child) => (
                              <li 
                                key={child.path}
                                className="hover:translate-x-1 transition-transform duration-300"
                              >
                                <a
                                  href={child.path}
                                  onClick={closeMenu}
                                  className="block text-gray-600 hover:text-[#EBBC2A] transition-colors duration-300"
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.path}
                      onClick={closeMenu}
                      className="block text-gray-800 hover:text-[#EBBC2A] transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 transform transition-all duration-300 hover:scale-105">
            <a
              href="https://fabrinsaperu.com/wp-content/uploads/2024/09/CAT-CAJAS-FUERTES.pdf"
              target="_blank"
              className="block w-full text-center p-3 bg-black text-[#EBBC2A] hover:bg-[#EBBC2A] hover:text-black transition-colors duration-300 rounded-lg oswald"
              onClick={closeMenu}
            >
              Catálogo
            </a>
          </div>

          <div className="mt-8">
            <h2 className="text-xl mb-4 font-semibold">Contáctanos:</h2>
            <ul className="space-y-2">
              {[
                { tel: '+51978820017', label: 'Asesor FBS 1: +51 978 820 017' },
                { tel: '+51978820014', label: 'Asesor FBS 2: +51 978 820 014' },
                { tel: '+51993094770', label: 'Asesor FBS 3: +51 993 094 770' }
              ].map((asesor) => (
                <li 
                  key={asesor.tel}
                  className="hover:translate-x-1 transition-transform duration-300"
                >
                  <a 
                    href={`tel:${asesor.tel}`} 
                    className="text-gray-600 hover:text-[#EBBC2A] transition-colors duration-300"
                  >
                    {asesor.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}; 