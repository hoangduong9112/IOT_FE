import mqtt from "mqtt"

const topicToSubscribe = "rfid/uid"

let rfid = []
let client

export function scan() {
  console.log("Scanning RFID")
  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt", {
    username: "hivemq.webclient.1702680632350",
    password: "3QnKD!?Za&i182.SkGbj",
  })
  client.on("connect", () => {
    console.log("Connected to MQTT broker")

    // Subscribe to the specified topic
    client.subscribe(topicToSubscribe, (err) => {
      if (!err) {
        console.log(`Subscribed to topic: ${topicToSubscribe}`)
      } else {
        console.error("Subscription error:", err)
      }
    })
  })
  // Callback when a message is received
  client.on("message", (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`)
    rfid.push(message.toString())
    // Add your logic to handle the received message here
  })

  // Callback when an error occurs
  client.on("error", (err) => {
    console.error("MQTT client error:", err)
  })

  // Callback when the client is disconnected
  client.on("close", () => {
    console.log("MQTT client disconnected")
  })
}

export function stop() {
  client.unsubscribe(topicToSubscribe, (err) => {
    if (!err) {
      console.log("Unsubscribed from topic: ", topicToSubscribe)
    } else {
      console.error("Unsubscription error:", err)
    }
  })
  const result = rfid
  rfid = []
  return result
}
