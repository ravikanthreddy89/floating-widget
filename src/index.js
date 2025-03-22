import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import FloatingWidget from './components/FloatingWidget';

// Main widget controller
const WidgetController = {
  widget: null,
  container: null,
  root: null,

  init(config = {}) {
    // Default configuration
    const defaultConfig = {
      position: 'top-right',
      apiUrl: 'https://jsonplaceholder.typicode.com/todos/1',
      containerElement: null
    };

    // Merge provided config with defaults
    const mergedConfig = { ...defaultConfig, ...config };

    // Create container if not provided
    if (!mergedConfig.containerElement) {
      this.container = document.createElement('div');
      this.container.id = 'floating-widget-container';
      document.body.appendChild(this.container);
    } else {
      this.container = mergedConfig.containerElement;
    }

    // Create React 18 root
    this.root = createRoot(this.container);

    // Create App wrapper component to manage widget state
    const WidgetApp = () => {
      const [isVisible, setIsVisible] = useState(true);
      const [position, setPosition] = useState(mergedConfig.position);

      const hideWidget = () => {
        setIsVisible(false);
      };

      return isVisible ? (
        <FloatingWidget
          position={position}
          onClose={hideWidget}
          apiUrl={mergedConfig.apiUrl}
        />
      ) : null;
    };

    // Render the widget using the new API
    this.root.render(<WidgetApp />);

    // Return API for controlling the widget
    return {
      updatePosition: (newPosition) => {
        if (['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(newPosition)) {
          const widgetElement = document.querySelector('.floating-widget');
          if (widgetElement) {
            widgetElement.classList.remove('top-left', 'top-right', 'bottom-left', 'bottom-right');
            widgetElement.classList.add(newPosition);
          }
        }
      },
      toggle: () => {
        const widgetElement = document.querySelector('.floating-widget');
        if (widgetElement) {
          if (widgetElement.style.display === 'none') {
            widgetElement.style.display = 'block';
          } else {
            widgetElement.style.display = 'none';
          }
        }
      },
      destroy: () => {
        if (this.root) {
          // Unmount using the root's unmount method
          this.root.unmount();
          this.root = null;

          if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
          }
          this.container = null;
        }
      }
    };
  }
};

// Export the controller for usage
export default WidgetController;

// For development and testing
if (process.env.NODE_ENV !== 'production') {
  window.FloatingWidget = WidgetController;
}