<script setup lang="ts">
import { ref, watchEffect, onUnmounted } from 'vue';
import mqtt from 'mqtt';

let client = null;
const isConnected = ref(false);

let sport_active = false;

function sport_end() {
    client.publish("sport_cmd", "stop");
}

function connectMQTT() {
    client = mqtt.connect('ws://113.45.173.169:8083/mqtt');
    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe('sport_cmd');
    });

    client.on('message', (topic, message) => {
        const msgContent = message.toString();
        console.log(`Message received on ${topic}: ${msgContent}`);

        if (msgContent === "waiting") {
            
        } else if (msgContent === "stop") {
            sport_active = false;
        } else {
            sport_active = true;
        }
    });

}

function disconnectMQTT() {
    if (client && client.connected) {
        client.end();
        console.log('Disconnected from MQTT broker');
    }
}

function handleClick() {
    if (isConnected.value) {
        disconnectMQTT();
    } else {
        connectMQTT();
    }
    isConnected.value = !isConnected.value;
}

onUnmounted(() => {
    disconnectMQTT();
});
</script>


<template>
    <v-card elevation="0">
        <v-card variant="outlined">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="9">
                        <span class="text-subtitle-2 text-disabled font-weight-bold">MQTT仪表盘</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-switch v-model="isConnected" @click="handleClick">
                        <template v-slot:label>
                            {{ isConnected ? 'Disconnect' : 'Connect' }} MQTT
                            <v-icon small class="ms-2">
                                {{ isConnected ? 'mdi-link-variant' : 'mdi-link-variant-off' }}
                            </v-icon>
                        </template>
                    </v-switch>
                </v-row>
                <v-row>
                    <v-btn variant="outlined" @click="handleClick">
                        {{ isConnected ? 'Disconnect' : 'Connect' }}
                    </v-btn>
                </v-row>
            </v-card-text>
            <v-car-text>
                <v-row v-if="isConnected">
                    <v-btn variant="outlined" @click="sport_end">
                        sport_cmd: stop
                    </v-btn>
                </v-row>
            </v-car-text>
        </v-card>
    </v-card>
    <v-card elevation="0">
        <v-card variant="outlined">
            <v-car-text>
                <v-row v-if="isConnected">
                    <v-btn @click="sport_end">
                        sport_cmd: stop
                    </v-btn>
                </v-row>
            </v-car-text>
        </v-card>
    </v-card>
</template>