// Polyfills for Node.js globals in browser environment

// Process polyfill - more comprehensive
if (typeof window !== 'undefined') {
  if (!window.process) {
    window.process = { 
      env: {},
      browser: true,
      version: '',
      versions: {},
      platform: 'browser',
      nextTick: (fn) => setTimeout(fn, 0),
      cwd: () => '/',
      chdir: () => {},
      exit: () => {},
      kill: () => {},
      on: () => {},
      once: () => {},
      emit: () => {},
      addListener: () => {},
      removeListener: () => {},
      removeAllListeners: () => {},
      listeners: () => [],
      setMaxListeners: () => {},
      getMaxListeners: () => 0,
      eventNames: () => []
    };
  }
  if (typeof global !== 'undefined' && !global.process) {
    global.process = window.process;
  }
}

// Buffer polyfill (if needed)
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = {
    isBuffer: () => false,
    alloc: () => new Uint8Array(),
    from: () => new Uint8Array(),
    allocUnsafe: () => new Uint8Array(),
    allocUnsafeSlow: () => new Uint8Array()
  };
}

// Global polyfill
if (typeof window !== 'undefined' && typeof global === 'undefined') {
  window.global = window;
}

// Additional Node.js globals that might be needed
if (typeof window !== 'undefined') {
  if (!window.setImmediate) {
    window.setImmediate = (fn) => setTimeout(fn, 0);
  }
  if (!window.clearImmediate) {
    window.clearImmediate = (id) => clearTimeout(id);
  }
} 