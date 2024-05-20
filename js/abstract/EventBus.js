class EventBus {
    constructor() {
      if (!EventBus.instance) {
        this.subscribers = {};
        EventBus.instance = this;
      }
  
      return EventBus.instance;
    }
  
    subscribe(event, callback) {
      if (!this.subscribers[event]) {
        this.subscribers[event] = [];
      }
      this.subscribers[event].push(callback);
    }
  
    publish(event, data) {
      if (this.subscribers[event]) {
        this.subscribers[event].forEach(callback => callback(data));
      }
    }
  }
  
export const eventBus = new EventBus();