// var mqtt = require('mqtt')
// var client  = mqtt.connect('mqtt://test.mosquitto.org')
 
// client.on('connect', function () {
//   client.subscribe('presence', function (err) {
//     if (!err) {
//         setInterval(function(){
//             client.publish('presence', 'Hello mqtt ', new Date().getTime())
//         }, 2000)
      
//     }
//   })
// })
 
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
//   //client.end()
// })

// module.exports=client;

var mqtt = require('mqtt');
var options = {
    port: 1883,
    host: 'mqtt://iot.eclipse.org',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'DAHNThayHung',
    password: 'DAHNThayHung',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('mqtt://iot.eclipse.org', options);
client.on('connect', function() { // When connected
    console.log('connected');
    // subscribe to a topic
    client.subscribe('/test/qos0', function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
        });
    });

    // publish a message to a topic
    //   client.publish('test/qos0', 'Chào Kiệt', function() {
    //     console.log("Message is published");
       
    // });
   // client.end(); // Close the connection when published
   
});