import mqtt from "mqtt"
const topicToSubscribe = "rfid/uid"

export const clientAdmin = mqtt.connect("ws://broker.hivemq.com:8000/mqtt", {
  username: "hivemq.webclient.1702680632350",
  password: "3QnKD!?Za&i182.SkGbj",
})

clientAdmin.on("connect", () => {
  console.log("Connected to MQTT broker")
})

// export function stop() {
//   console.log("clientAdmin", clientAdmin)
//   if (!clientAdmin.connected) {
//     console.log("Not connected to MQTT broker")
//     return
//   }
//   clientAdmin.unsubscribe(topicToSubscribe, (err) => {
//     if (!err) {
//       console.log("Unsubscribed from topic: ", topicToSubscribe)
//     } else {
//       console.error("Unsubscription error:", err)
//     }
//   })
// }
