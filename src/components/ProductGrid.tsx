import { useState, useEffect } from 'react';
import { Product, ProductSpecs } from '../types/product';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import FilterSection from './FilterSection';
import { useLocation } from 'react-router-dom';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterOptions {
  diameter: FilterOption[];
  width: FilterOption[];
  pcd: FilterOption[];
  et: FilterOption[];
  dia: FilterOption[];
}

interface SelectedFilters {
  diameter: string[];
  width: string[];
  pcd: string[];
  et: string[];
  dia: string[];
}

export function ProductGrid() {
  const location = useLocation();
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    diameter: [],
    width: [],
    pcd: [],
    et: [],
    dia: []
  });

  useEffect(() => {
    if (location.state?.highlightedProduct) {
      setHighlightedProduct(location.state.highlightedProduct);
      // Очищаем state, чтобы при обновлении страницы подсветка сбрасывалась
      window.history.replaceState({}, document.title);
      
      // Находим элемент и прокручиваем к нему
      const element = document.getElementById(`product-${location.state.highlightedProduct}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [location.state]);

  const createFilterOptions = (key: keyof ProductSpecs, labelSuffix: string = ""): FilterOption[] => {
    let values: string[] = [];
    if (key === 'diameter' || key === 'et') {
      values = Array.from(new Set(products.flatMap(p => Array.isArray(p.specs[key]) ? p.specs[key] as string[] : [p.specs[key] as string])))
        .sort((a, b) => Number(a) - Number(b));
    } else if (key === 'pcd') {
      values = Array.from(new Set(products.map(p => p.specs.pcd)))
        .sort();
    } else {
      values = Array.from(new Set(products.flatMap(p => {
        const specValue = p.specs[key as keyof Omit<ProductSpecs, 'diameter' | 'et' | 'pcd'>];
        return Array.isArray(specValue) ? specValue : [specValue];
      })))
        .sort((a, b) => Number(a) - Number(b));
    }
    return values.map(value => ({ value, label: `${value}${labelSuffix}` }));
  };

  // Получаем доступные товары на основе выбранных фильтров
  const getAvailableProducts = (filters: Partial<SelectedFilters> = {}): Product[] => {
    return products.filter(product => {
      return Object.entries(filters).every(([key, values]) => {
        if (!values || values.length === 0) return true;
        const spec = product.specs[key as keyof typeof product.specs];
        if (Array.isArray(spec)) {
          return spec.some(s => values.includes(s));
        }
        return values.includes(spec);
      });
    });
  };

  // Получаем доступные опции для конкретного фильтра на основе уже выбранных фильтров
  const getAvailableFilterOptions = (
    filterKey: keyof SelectedFilters,
    labelSuffix: string = ""
  ): FilterOption[] => {
    // Создаем объект фильтров без текущего фильтра
    const otherFilters: Partial<SelectedFilters> = Object.entries(selectedFilters)
      .filter(([key]) => key !== filterKey && key !== 'dia')
      .reduce((acc, [key, value]) => {
        if (value.length > 0) {
          acc[key as keyof SelectedFilters] = value;
        }
        return acc;
      }, {} as Partial<SelectedFilters>);

    // Получаем товары, которые соответствуют всем другим выбранным фильтрам
    const availableProducts = getAvailableProducts(otherFilters);

    // Извлекаем все возможные значения для текущего фильтра из доступных товаров
    let availableValues: string[] = [];
    
    if (filterKey === 'diameter' || filterKey === 'et') {
      availableValues = Array.from(new Set(availableProducts.flatMap(p => {
        const specValue = p.specs[filterKey];
        return Array.isArray(specValue) ? specValue : [specValue];
      })));
    } else if (filterKey === 'pcd') {
      availableValues = Array.from(new Set(availableProducts.map(p => p.specs.pcd)));
    } else if (filterKey === 'width') {
      availableValues = Array.from(new Set(availableProducts.flatMap(p => {
        const specValue = p.specs.width;
        return Array.isArray(specValue) ? specValue : [specValue];
      })));
    }

    // Сортируем значения (числовые - по значению, строковые - лексикографически)
    availableValues.sort((a, b) => {
      if (!isNaN(Number(a)) && !isNaN(Number(b))) {
        return Number(a) - Number(b);
      }
      return a.localeCompare(b);
    });

    // Создаем объекты опций для компонента
    return availableValues.map(value => ({ 
      value, 
      label: `${value}${labelSuffix}` 
    }));
  };

  // Используем динамические списки опций вместо статических
  const dynamicFilterOptions: Omit<FilterOptions, 'dia'> = {
    diameter: getAvailableFilterOptions('diameter', '"'),
    width: getAvailableFilterOptions('width'),
    pcd: getAvailableFilterOptions('pcd'),
    et: getAvailableFilterOptions('et'),
  };

  const filteredProducts = products.filter(product => {
    return Object.entries(selectedFilters).every(([key, values]) => {
      if (values.length === 0 || key === 'dia') return true; // Игнорируем dia
      const spec = product.specs[key as keyof typeof product.specs];
      if (Array.isArray(spec)) {
        return spec.some(s => values.includes(s));
      }
      return values.includes(spec);
    });
  });

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 space-y-4">
          <FilterSection
            title="Диаметр (ø)"
            options={dynamicFilterOptions.diameter}
            selected={selectedFilters.diameter}
            onChange={(values) => setSelectedFilters(prev => ({ ...prev, diameter: values }))}
          />
          <FilterSection
            title="Сверловка (PCD)"
            options={dynamicFilterOptions.pcd}
            selected={selectedFilters.pcd}
            onChange={(values) => setSelectedFilters(prev => ({ ...prev, pcd: values }))}
          />
          <FilterSection
            title="Ширина (J)"
            options={dynamicFilterOptions.width}
            selected={selectedFilters.width}
            onChange={(values) => setSelectedFilters(prev => ({ ...prev, width: values }))}
          />
          <FilterSection
            title="Вылет (ET)"
            options={dynamicFilterOptions.et}
            selected={selectedFilters.et}
            onChange={(values) => setSelectedFilters(prev => ({ ...prev, et: values }))}
          />
        </div>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                id={`product-${product.id}`}
                className={`transition-all duration-300 ${
                  highlightedProduct === product.id 
                    ? 'ring-4 ring-blue-500 rounded-lg transform scale-105' 
                    : ''
                }`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
