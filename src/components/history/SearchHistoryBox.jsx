import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/History.css'; 

const SearchHistoryBox = ({ searchHistory, date }) => {
  return (
    <div className="search-history-box-history d-flex flex-column rounded">
      <p className="date-text-history"> Hoy - {date}</p>

      <div className="search-history-list-history">
        {searchHistory.map(item => (
          <div
            key={item.id}
            className="search-history-item-history d-flex justify-content-between align-items-center"
          >
            <div className="item-left-history d-flex align-items-center">
              <input type="checkbox" className="checkbox-history me-2" />
              <small className="query-time-history me-2">{item.time}</small>
              <Link
                to={`/search?q=${item.query}`}
                className="query-text-history"
              >
                {item.query}
              </Link>
            </div>
            <div className="menu-icon-history">⋮</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistoryBox;
