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
const TOPIC_BROKER = "nct_collect_12";

var MQTT = {

    initMQTT: function(){
        client = mqtt.connect('mqtt://iot.eclipse.org', options);
        // client  = mqtt.connect('mqtt://test.mosquitto.org')
        client.on('message', (topic, message, packet)  => {
            console.log('topic ', topic)
            if(!topic){
                console.log('err')
            } else{
                message = JSON.parse(message.toString());    
                if(topic === TOPIC_LISTEN_AUTHENCATICAION){
                    this.onHanderAuthentication(message)
                } else if(topic === TOPIC_BROKER){
                    this.onHanderCollect(message)
                }
            }
            
        });
    },

    onSubcribeCollect: function(){
        if(!client){
            this.initMQTT();
        }
        client.on('connect', function() { // When connected
            client.subscribe(TOPIC_BROKER, function() {
            });
        });
    },

    onSubcribeAuthentication: function(){
        if(!client){
            this.initMQTT();
        }
        client.on('connect', function() { // When connected
            client.subscribe(TOPIC_LISTEN_AUTHENCATICAION, function() {
            });
        });
    },

    onHanderCollect: function(message){
        //var key_device = message.key_device;
        console.log('onSubcribeCollect ', message)
        SenserData.saveMultiSenser(message, function(err, row){
            if(err){
                console.log('err ', err )
            } else{
                console.log('onSubcribeCollect okiiii' )
            }
        })
        // DeviceAuthentication.getDeviceAuthenticationByKey(key_device, function(err, row){
        //    if(err){
        //     } else{
        //        console.log('DeviceAuthentication okiii ', row)
        //     }
        // })
    },

    onHanderAuthentication: function(message){
        DeviceAuthentication.getDeviceAuthentication(message, function(err, result){
            var objReturn ={ 
                result: 'PASS', 
                cycle: 0.5,
                key: 0
            } 
            if(err){
                objReturn.key = -2;
            } else{
                result = result[0];
                if(result){
                    objReturn.key = result.key_device;
                } else{
                    objReturn.key = -1;
                }
            }
            console.log('message ', objReturn)
            client.publish(TOPIC_PUBLISH_AUTHENCATICAION+message.id, JSON.stringify(objReturn), function() {
                console.log("Message is published ");
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

