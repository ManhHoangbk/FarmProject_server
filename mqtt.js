var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
 
client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
        setInterval(function(){
            client.publish('presence', 'Hello mqtt ', new Date().getTime())
        }, 2000)
      
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  //client.end()
})

module.exports=client;