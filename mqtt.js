var mqtt = require('mqtt');
var DeviceAuthentication = require('./models/DeviceAuthentication');
var SenserData = require('./models/SenserData');
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
var client;
const TOPIC_LISTEN_AUTHENCATICAION = "nct_authentication";
const TOPIC_PUBLISH_AUTHENCATICAION = "nct_authentication_result_";
const TOPIC_BROKER = "nct_broker";

var MQTT = {
    
    initMQTT: function(){
        client = mqtt.connect('mqtt://iot.eclipse.org', options);
    },

    onSubcribeCollect: function(){
        if(!client){
            this.initMQTT();
        }
        client.on('connect', function() { // When connected
            console.log('onSubcribeCollect3 ');
            client.subscribe('/' + TOPIC_BROKER, function() {
                client.on('message', function(topic, message, packet) {
                    if(message){
                        // if(typeof message !== 'object'){
                        //     message = JSON.stringify(message);
                        // }
                        var key_device = message.key_device;
                        DeviceAuthentication.getDeviceAuthenticationByKey(key_device, function(err, row){
                            if(err){
                            } else{
                                console.log('DeviceAuthentication okiii')
                                // SenserData.saveMultiSenser(message, function(err, row){
                                // })
                            }
                        })
                    }
                });
            });
        });
    },

    onSubcribeAuthentication: function(){
        if(!client){
            this.initMQTT();
        }
        client.on('connect', function() { // When connected
            client.subscribe('/'+TOPIC_LISTEN_AUTHENCATICAION, function() {
                client.on('message', function(topic, message, packet) {
                    console.log("onSubcribeAuthentication message: ", message)
                    message = JSON.parse(message.toString());
                    DeviceAuthentication.getDeviceAuthentication(message, function(err, result){
                        if(err){
                            message.key_device = -1;
                        } else{
                            result = result[0];
                            message.key_device = result.key_device;
                        }
                        console.log('message ', message)
                        client.publish('/'+ TOPIC_PUBLISH_AUTHENCATICAION+message.id, JSON.stringify(message), function() {
                            console.log("Message is published ", TOPIC_PUBLISH_AUTHENCATICAION);
                        });
                    });
                });
            });
        });
    },

    onPublish: function(topic, message){
        if(!client){
            this.initMQTT();
        }
        //publish a message to a topic
        client.publish('/'+ topic, message, function() {
            console.log("Message is published");
        });
    },

    onCloseConnect: function(){
        if(client){
            client.end();
        }
    }
}

module.exports = MQTT;

