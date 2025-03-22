import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import FloatingWidget from './components/FloatingWidget';

// Main widget controller
const WidgetController = {
  widget: null,
  container: null,
  root: null,
  containerId: 'floating-widget-container',
  isContainerCreated: false,

  getOrCreateContainer(config) {
    // First check if container is provided in config
    if (config.containerElement) {
      return config.containerElement;
    }

    // Check if container already exists in DOM
    let container = document.getElementById(this.containerId);
    
    // If container doesn't exist and we haven't created one yet, create it
    if (!container && !this.isContainerCreated) {
      container = document.createElement('div');
      container.id = this.containerId;
      document.body.appendChild(container);
      this.isContainerCreated = true;
    }

    return container;
  },

  init(config = {}) {
    // Default configuration
    const defaultConfig = {
      position: 'top-right',
      apiUrl: 'https://jsonplaceholder.typicode.com/todos/1',
      containerElement: null
    };

    // Merge provided config with defaults
    const mergedConfig = { ...defaultConfig, ...config };

    // Get or create container
    this.container = this.getOrCreateContainer(mergedConfig);
    
    if (!this.container) {
      console.error('Failed to initialize widget: Container element not found');
      return null;
    }

    // Create React 18 root only if not already created
    if (!this.root) {
      this.root = createRoot(this.container);
    }

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

    // Render the widget
    this.root.render(<WidgetApp />);

    // Return control API
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
          this.root.unmount();
          this.root = null;
          
          if (this.container && this.container.parentNode && this.isContainerCreated) {
            this.container.parentNode.removeChild(this.container);
            this.isContainerCreated = false;
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