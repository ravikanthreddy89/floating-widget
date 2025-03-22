import React, { useState, useEffect } from 'react';
import Button from './Button';
import './FloatingWidget.css';

const FloatingWidget = ({ position, onClose, apiUrl }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // Position classes based on props
  const positionClass = `floating-widget ${position}`;

  useEffect(() => {
    // XHR call to fetch data
    const fetchData = async () => {
      setLoading(true);
      try {
        // Using fetch API as a modern alternative to XHR
        const response = await fetch(apiUrl);

        // For demonstration, we can also show how to use XMLHttpRequest
        /*
        const xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl, true);
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            setData(JSON.parse(xhr.responseText));
          } else {
            setError('Failed to load data');
          }
          setLoading(false);
        };
        xhr.onerror = function() {
          setError('Network error');
          setLoading(false);
        };
        xhr.send();
        */

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load data: ' + err.message);
        // For demo, set some sample data
        setData({
          title: 'Sample Widget',
          message: 'This is demo content since API call failed or is unavailable.',
          items: ['Item 1', 'Item 2', 'Item 3']
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={positionClass}>
      <div className="widget-header">
        <h3>{data?.title || 'Widget'}</h3>
        <div className="widget-controls">
          <Button onClick={toggleExpand}>
            {expanded ? '−' : '+'}
          </Button>
          <Button onClick={onClose}>×</Button>
        </div>
      </div>

      {expanded && (
        <div className="widget-content">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <p>{data?.message}</p>
              {data?.items && (
                <ul>
                  {data.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingWidget;