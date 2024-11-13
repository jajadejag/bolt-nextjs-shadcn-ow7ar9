import { io } from 'socket.io-client';
import { useToast } from '@/components/ui/use-toast';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
  transports: ['polling', 'websocket'],
  path: '/socket.io',
  withCredentials: true,
  forceNew: true
});

let reconnectTimer: NodeJS.Timeout;

socket.on('connect_error', (error) => {
  console.warn('Socket connection error:', error.message);
  if (!reconnectTimer) {
    reconnectTimer = setTimeout(() => {
      socket.connect();
      reconnectTimer = undefined;
    }, 5000);
  }
});

socket.on('reconnect', (attemptNumber) => {
  console.log('Socket reconnected on attempt:', attemptNumber);
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = undefined;
  }
});

socket.on('disconnect', (reason) => {
  console.warn('Socket disconnected:', reason);
  if (reason === 'io server disconnect') {
    if (!reconnectTimer) {
      reconnectTimer = setTimeout(() => {
        socket.connect();
        reconnectTimer = undefined;
      }, 5000);
    }
  }
});

// Real-time location updates
export const startLocationTracking = (orderId: string) => {
  if ('geolocation' in navigator) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        socket.emit('location_update', {
          orderId,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }
};

export const initializeSocket = () => {
  if (!socket.connected) {
    try {
      socket.connect();
    } catch (error) {
      console.warn('Failed to initialize socket connection:', error);
      if (!reconnectTimer) {
        reconnectTimer = setTimeout(() => {
          socket.connect();
          reconnectTimer = undefined;
        }, 5000);
      }
    }
  }

  return () => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = undefined;
    }
    if (socket.connected) {
      socket.disconnect();
    }
  };
};