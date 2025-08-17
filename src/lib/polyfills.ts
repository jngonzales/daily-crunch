// Comprehensive polyfills for Node.js compatibility in browser environment
// This ensures @huggingface/transformers works properly in the browser

// Import the events polyfill
import './events';

// Polyfill global variables that Node.js expects
if (typeof window !== 'undefined') {
  // Ensure global is available
  if (!(window as any).global) {
    (window as any).global = window;
  }

  // Polyfill process if not available
  if (!(window as any).process) {
    (window as any).process = {
      env: {
        NODE_ENV: 'development', // Default to development
      },
      browser: true,
      version: '',
      versions: {},
      platform: 'browser',
      arch: 'x64',
      cwd: () => '/',
      nextTick: (callback: Function) => Promise.resolve().then(callback),
    };
  }

  // Polyfill Buffer if not available
  if (!(window as any).Buffer) {
    (window as any).Buffer = {
      from: (data: any, encoding?: string) => {
        if (typeof data === 'string') {
          return new TextEncoder().encode(data);
        }
        return data;
      },
      alloc: (size: number) => new Uint8Array(size),
      allocUnsafe: (size: number) => new Uint8Array(size),
      isBuffer: (obj: any) => obj instanceof Uint8Array,
    };
  }

  // Polyfill util if not available
  if (!(window as any).util) {
    (window as any).util = {
      inherits: (ctor: any, superCtor: any) => {
        ctor.super_ = superCtor;
        Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
      },
      format: (format: string, ...args: any[]) => {
        return format.replace(/%s/g, () => args.shift() || '');
      },
      inspect: (obj: any) => JSON.stringify(obj, null, 2),
    };
  }

  // Polyfill stream if not available
  if (!(window as any).stream) {
    (window as any).stream = {
      Readable: class Readable {
        constructor() {
          throw new Error('Stream.Readable not implemented in browser');
        }
      },
      Writable: class Writable {
        constructor() {
          throw new Error('Stream.Writable not implemented in browser');
        }
      },
      Transform: class Transform {
        constructor() {
          throw new Error('Stream.Transform not implemented in browser');
        }
      },
    };
  }

  // Polyfill fs if not available
  if (!(window as any).fs) {
    (window as any).fs = {
      readFileSync: () => {
        throw new Error('fs.readFileSync not available in browser');
      },
      writeFileSync: () => {
        throw new Error('fs.writeFileSync not available in browser');
      },
      existsSync: () => false,
      mkdirSync: () => {
        throw new Error('fs.mkdirSync not available in browser');
      },
    };
  }

  // Polyfill path if not available
  if (!(window as any).path) {
    (window as any).path = {
      join: (...parts: string[]) => parts.join('/'),
      resolve: (...parts: string[]) => parts.join('/'),
      dirname: (path: string) => path.split('/').slice(0, -1).join('/'),
      basename: (path: string) => path.split('/').pop() || '',
      extname: (path: string) => {
        const parts = path.split('.');
        return parts.length > 1 ? '.' + parts.pop() : '';
      },
    };
  }

  // Polyfill os if not available
  if (!(window as any).os) {
    (window as any).os = {
      platform: () => 'browser',
      arch: () => 'x64',
      cpus: () => [],
      freemem: () => 0,
      totalmem: () => 0,
      homedir: () => '/',
      tmpdir: () => '/tmp',
    };
  }

  // Polyfill crypto if not available (use Web Crypto API)
  if (!(window as any).crypto) {
    (window as any).crypto = window.crypto || {
      getRandomValues: (array: Uint8Array) => {
        for (let i = 0; i < array.length; i++) {
          array[i] = Math.floor(Math.random() * 256);
        }
        return array;
      },
    };
  }

  // Polyfill url if not available
  if (!(window as any).url) {
    (window as any).url = {
      URL: window.URL,
      URLSearchParams: window.URLSearchParams,
    };
  }

  // Polyfill querystring if not available
  if (!(window as any).querystring) {
    (window as any).querystring = {
      parse: (str: string) => {
        const params = new URLSearchParams(str);
        const result: any = {};
        for (const [key, value] of params) {
          result[key] = value;
        }
        return result;
      },
      stringify: (obj: any) => {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(obj)) {
          params.append(key, String(value));
        }
        return params.toString();
      },
    };
  }
}

// Export the polyfills for manual import if needed
export const polyfills = {
  events: true,
  process: true,
  buffer: true,
  util: true,
  stream: true,
  fs: true,
  path: true,
  os: true,
  crypto: true,
  url: true,
  querystring: true,
};