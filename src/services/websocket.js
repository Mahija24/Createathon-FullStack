class WebSocketService {
  constructor() {
    this.socket = null
    this.callbacks = {}
  }

  connect(challengeId, token) {
    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    const wsUrl = `${wsProtocol}//${window.location.host}/ws/challenges/${challengeId}/?token=${token}`

    this.socket = new WebSocket(wsUrl)

    this.socket.onopen = () => {
      console.log("WebSocket connection established")
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const messageType = data.type

      if (this.callbacks[messageType]) {
        this.callbacks[messageType].forEach((callback) => callback(data))
      }
    }

    this.socket.onclose = () => {
      console.log("WebSocket connection closed")
    }

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data))
    } else {
      console.error("WebSocket is not connected")
    }
  }

  on(messageType, callback) {
    if (!this.callbacks[messageType]) {
      this.callbacks[messageType] = []
    }
    this.callbacks[messageType].push(callback)
  }

  off(messageType, callback) {
    if (this.callbacks[messageType]) {
      this.callbacks[messageType] = this.callbacks[messageType].filter((cb) => cb !== callback)
    }
  }
}

export default new WebSocketService()

