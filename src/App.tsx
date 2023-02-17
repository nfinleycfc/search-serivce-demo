import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-hooks-web';
import { Autocomplete } from './Autocomplete';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';
import { INSTANT_SEARCH_INDEX_NAME } from './constants';
import './App.css';

const searchClient = algoliasearch(
  'YCTN0HPOIS',
  '74f610bd40967ead43fe90dd17d3f339'
);

export function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">Resource library - autocomplete</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/instantsearch">
            React InstantSearch Hooks
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName={INSTANT_SEARCH_INDEX_NAME}
        >
          <Configure hitsPerPage={8} />
          <div className="search-panel">
            <div className="search-panel__filters">
              <Panel header="Duration">
                <RefinementList attribute="duration" />
              </Panel>
              <Panel header="Practice Area">
                <RefinementList attribute="practiceArea" tabIndex={0} />
              </Panel>
            </div>

            <div className="search-panel__results">
              <Autocomplete
                searchClient={searchClient}
                placeholder="Search products"
                detachedMediaQuery="none"
                openOnFocus
              />
              <Hits hitComponent={Hit} tabIndex={0} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function Hit({ hit }: HitProps) {
  console.log('🚀 ~ file: App.js:67 ~ Hit ~ props', hit);
  return (
    <div className="main" tabIndex={0}>
      <img src={hit.img} alt={hit.img} />
      <div className="hit-name">
        <Highlight attribute="displayTitle" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={hit} />
      </div>
      <div className="hit-sub">
        <span>Practice Area: </span>
        <Highlight attribute="practiceArea" hit={hit} />
      </div>
      <div className="hit-sub">
        <span>Duration: </span>
        <Highlight attribute="duration" hit={hit} />
      </div>
    </div>
  );
}
