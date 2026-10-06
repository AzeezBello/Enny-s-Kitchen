'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  CATEGORIES,
  isCategory,
  products,
  type CategoryFilter,
} from '@/lib/menu';
import { DishCard } from './dish-card';

const FILTERS: CategoryFilter[] = ['All', ...CATEGORIES];

function categoryFromUrl(): CategoryFilter {
  const value = new URLSearchParams(window.location.search).get('category');
  return value && isCategory(value) ? value : 'All';
}

export function MenuExplorer() {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [query, setQuery] = useState('');

  // The full menu is server-rendered; a ?category= deep link narrows it after hydration.
  useEffect(() => {
    setCategory(categoryFromUrl());
  }, []);

  function selectCategory(next: CategoryFilter) {
    setCategory(next);
    const url = new URL(window.location.href);
    if (next === 'All') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', next);
    }
    window.history.replaceState(window.history.state, '', url);
  }

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      if (category !== 'All' && product.category !== category) return false;
      if (!needle) return true;
      return (
        product.name.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle) ||
        product.category.toLowerCase().includes(needle)
      );
    });
  }, [category, query]);

  return (
    <div className="menuExplorer">
      <div className="menuToolbar">
        <div className="filters" role="group" aria-label="Filter menu by category">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filterBtn${category === filter ? ' isActive' : ''}`}
              aria-pressed={category === filter}
              onClick={() => selectCategory(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <label className="searchField">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search dishes"
            aria-label="Search dishes"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </label>
      </div>

      <p className="resultCount" aria-live="polite">
        {visible.length === products.length
          ? `Showing all ${products.length} dishes`
          : `Showing ${visible.length} of ${products.length} dishes`}
      </p>

      {visible.length === 0 ? (
        <div className="emptyState">
          <h3>No dishes match that search</h3>
          <p>Try another word, or clear the filters to see the full menu.</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setQuery('');
              selectCategory('All');
            }}
          >
            Show everything
          </button>
        </div>
      ) : (
        <div className="dishGrid">
          {visible.map((product, index) => (
            <DishCard key={product.id} product={product} preload={index < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
