// src/services/WebSocketService.js
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import API_CONFIG_URL from './ipConfig';
const WEBSOCKET_URL = `${API_CONFIG_URL}chat`; // Atualize com o backend

class WebSocketService {
  constructor() {
    this.socket = new SockJS(WEBSOCKET_URL);
    this.stompClient = Stomp.over(this.socket);
    this.connected = false;
  }

  connect(onMessageReceived) {
    this.stompClient.connect({}, () => {
      this.connected = true;
      this.stompClient.subscribe('/topic/messages', (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    }, (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  sendMessage(destination, message) {
    if (this.connected) {
      this.stompClient.send(destination, {}, JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.connected) {
      this.stompClient.disconnect();
    }
  }
}

export default new WebSocketService();
