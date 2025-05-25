import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";

const useWebSocket = (userId) => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const brokerURL = import.meta.env.VITE_BROKER_URL;

  // Initialize connection
  useEffect(() => {
    if (!userId) return;

    setIsConnecting(true);

    const client = new Client({
      brokerURL: brokerURL,
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true);
        setIsConnecting(false);
      },
      onStompError: () => {
        setIsConnected(false);
        setIsConnecting(false);
        console.error("Connection error. Please try again later.");
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client && client.active) {
        client.deactivate();
      }
    };
  }, [userId]);

  // Subscribe to a topic
  const subscribe = useCallback(
    (topic, callback) => {
      if (!stompClient || !stompClient.active) return null;

      const subscription = stompClient.subscribe(topic, (message) => {
        try {
          const data = JSON.parse(message.body);
          callback(data);
        } catch (error) {
          console.error("Error processing message:", error);
        }
      });

      return subscription;
    },
    [stompClient]
  );

  // Reconnect manually
  const reconnect = useCallback(
    (onConnectCallback) => {
      // Prevent multiple reconnection attempts
      if (isConnecting) return;

      setIsConnecting(true);

      // Safely disconnect existing client
      if (stompClient) {
        try {
          if (stompClient.active) {
            stompClient.deactivate();
          }
        } catch (error) {
          console.error("Error deactivating STOMP client:", error);
        }
      }

      // Create new client
      const client = new Client({
        brokerURL: brokerURL,
        onConnect: () => {
          setIsConnected(true);
          setIsConnecting(false);
          if (onConnectCallback) onConnectCallback(client);
        },
        onStompError: () => {
          setIsConnected(false);
          setIsConnecting(false);
          console.error("Connection error. Please try again later.");
        },
        onDisconnect: () => {
          setIsConnected(false);
        },
      });

      try {
        client.activate();
        setStompClient(client);
      } catch (error) {
        setIsConnecting(false);
        console.error("Error activating STOMP client:", error);
      }
    },
    [stompClient, isConnecting]
  );

  // Send method to send messages to the server
  const send = useCallback(
    (destination, body = {}) => {
      if (stompClient && stompClient.active) {
        stompClient.publish({
          destination: destination,
          body: JSON.stringify(body),
        });
      } else {
        console.warn("WebSocket is not connected. Cannot send message.");
      }
    },
    [stompClient]
  );

  return {
    stompClient,
    isConnected,
    isConnecting,
    subscribe,
    reconnect,
    send,
  };
};

export default useWebSocket;
