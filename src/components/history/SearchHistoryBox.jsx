import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

import '../../css/History.css';

function SearchHistoryBox ({ searchHistory, date }) {

  return (
    <Card>
      <CardContent>
        <Typography className='date-text-history'>
          Hoy - {date}
        </Typography>
      <div className="search-history-list-history">
        
        {searchHistory.map(item => (
          <div
            key={item.id}
            className="search-history-item-history d-flex justify-content-between align-items-center"
          >
            <div className="item-left-history d-flex align-items-center">
              
              <input type="checkbox" className="checkbox-history me-2" />
              <small className="query-time-history me-2">{item.time}</small>
              <Link to={`/search?q=${item.query}`} className="query-text-history">
                {item.query}
              </Link>
            </div>
            <div className="menu-icon-history">⋮</div>
          </div>
        ))}
      </div>
      </CardContent>
    </Card>
  );
};

export default SearchHistoryBox;
