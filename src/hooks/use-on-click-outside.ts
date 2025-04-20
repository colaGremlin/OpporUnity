// src/hooks/use-on-click-outside.ts
import { useEffect, useRef } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: Handler,
  ...events: string[]
) {
  useEffect(() => {
    const listener = (event: Event) => { // Use the base 'Event' type here
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event as MouseEvent | TouchEvent); // Cast 'event' to the expected types
    };

    const eventNames = events.length === 0 ? ['mousedown', 'touchstart'] : events;

    for (const eventName of eventNames) {
      document.addEventListener(eventName, listener);
    }

    return () => {
      for (const eventName of eventNames) {
        document.removeEventListener(eventName, listener);
      }
    };
  }, [ref, handler, events]);
}

export { useOnClickOutside };