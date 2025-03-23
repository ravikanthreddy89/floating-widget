import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import FloatingWidget from './FloatingWidget';

const FloatingWidgetContainer = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const iframeHead = iframe.contentDocument.head;
    const iframeBody = iframe.contentDocument.body;

    // Add styles to iframe
    const style = document.createElement('style');
    style.textContent = `
      body { 
        margin: 0; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
    `;
    iframeHead.appendChild(style);

    // Copy parent styles if needed
    const parentStyles = Array.from(document.styleSheets)
      .filter(sheet => sheet.href === null) // Only inline styles
      .map(sheet => Array.from(sheet.cssRules)
        .map(rule => rule.cssText)
        .join('\n'))
      .join('\n');

    const parentStyleElement = document.createElement('style');
    parentStyleElement.textContent = parentStyles;
    iframeHead.appendChild(parentStyleElement);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      style={{
        position: 'fixed',
        right: '20px',
        top: '30vh',
        border: 'none',
        width: '300px',
        height: 'auto',
        minHeight: '100px',
        maxHeight: '400px',
        background: 'transparent',
        zIndex: 9999
      }}
      title="PayPal Widget"
    >
      {iframeRef.current && createPortal(
        <FloatingWidget />,
        iframeRef.current.contentDocument.body
      )}
    </iframe>
  );
};

export default FloatingWidgetContainer;