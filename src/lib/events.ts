// Node.js events module polyfill for browser environment
// This provides the missing events functionality that @huggingface/transformers expects

export class EventEmitter {
  private events: { [key: string]: Function[] } = {};
  private maxListeners: number = 10;

  on(event: string, listener: Function): this {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    
    // Check max listeners
    if (this.events[event].length >= this.maxListeners) {
      console.warn(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${this.events[event].length} listeners added. Use emitter.setMaxListeners() to increase limit`);
    }
    
    this.events[event].push(listener);
    return this;
  }

  addListener(event: string, listener: Function): this {
    return this.on(event, listener);
  }

  once(event: string, listener: Function): this {
    const onceWrapper = (...args: any[]) => {
      listener.apply(this, args);
      this.off(event, onceWrapper);
    };
    return this.on(event, onceWrapper);
  }

  off(event: string, listener: Function): this {
    return this.removeListener(event, listener);
  }

  removeListener(event: string, listener: Function): this {
    if (!this.events[event]) return this;
    
    const index = this.events[event].indexOf(listener);
    if (index > -1) {
      this.events[event].splice(index, 1);
    }
    return this;
  }

  removeAllListeners(event?: string): this {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
    return this;
  }

  emit(event: string, ...args: any[]): boolean {
    if (!this.events[event]) return false;
    
    // Create a copy of the listeners array to avoid issues if listeners are removed during emission
    const listeners = [...this.events[event]];
    
    listeners.forEach(listener => {
      try {
        listener.apply(this, args);
      } catch (error) {
        console.error('EventEmitter error:', error);
      }
    });
    
    return true;
  }

  listenerCount(event: string): number {
    return this.events[event] ? this.events[event].length : 0;
  }

  eventNames(): string[] {
    return Object.keys(this.events);
  }

  setMaxListeners(n: number): this {
    this.maxListeners = n;
    return this;
  }

  getMaxListeners(): number {
    return this.maxListeners;
  }

  listeners(event: string): Function[] {
    return this.events[event] ? [...this.events[event]] : [];
  }

  rawListeners(event: string): Function[] {
    return this.listeners(event);
  }

  prependListener(event: string, listener: Function): this {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(listener);
    return this;
  }

  prependOnceListener(event: string, listener: Function): this {
    const onceWrapper = (...args: any[]) => {
      listener.apply(this, args);
      this.off(event, onceWrapper);
    };
    return this.prependListener(event, onceWrapper);
  }
}

// Create a default export for the events module
const events = {
  EventEmitter,
  once: (emitter: EventEmitter, event: string): Promise<any[]> => {
    return new Promise((resolve) => {
      emitter.once(event, (...args) => resolve(args));
    });
  },
  on: (emitter: EventEmitter, event: string): AsyncIterableIterator<any[]> => {
    const queue: any[][] = [];
        let resolve: ((value: IteratorResult<any[]>) => void) | null = null;
        let reject: ((reason: any) => void) | null = null;

        const listener = (...args: any[]) => {
          if (resolve) {
            resolve({ value: args, done: false });
            resolve = null;
          } else {
            queue.push(args);
          }
        };

        emitter.on(event, listener);

        const iterator: AsyncIterableIterator<any[]> = {
          [Symbol.asyncIterator]() {
            return iterator;
          },
          async next() {
            if (queue.length > 0) {
              return { value: queue.shift()!, done: false };
            }
            return new Promise((res, rej) => {
              resolve = res;
              reject = rej;
            });
          },
          async return() {
            emitter.off(event, listener);
            if (reject) reject(new Error('Iterator cancelled'));
            return { value: undefined, done: true };
          },
          async throw(error) {
            emitter.off(event, listener);
            if (reject) reject(error);
            throw error;
          }
        };

        return iterator;
  }
};

// Make events available globally for the transformers library
if (typeof window !== 'undefined') {
  (window as any).EventEmitter = EventEmitter;
  (window as any).events = events;
}

export default events;