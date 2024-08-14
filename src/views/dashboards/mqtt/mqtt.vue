<script setup lang="ts">
import { ref, watchEffect, onUnmounted } from 'vue';
import mqtt from 'mqtt';

let client = null;
const isConnected = ref(false);
const otp = ref('');
const correctOTP = '654321';
const isOTPValid = ref(false);

const commands = ref([
    { topic: 'sport_cmd', message: 'start' },
    { topic: 'sport_cmd', message: 'stop' },
    { topic: 'sport_cmd', message: 'chin-up' },
]);

const receivedMessages = ref([]);


function verifyOTP() {
    if (otp.value === correctOTP) {
        isOTPValid.value = true;
    } else {
        isOTPValid.value = false;
        alert("Incorrect code. Please try again.");
    }
}

function publishCommand(cmd) {
    console.error(cmd);
    client.publish(cmd.topic, cmd.message);
}

let sport_active = false;

function sport_end() {
    client.publish("sport_cmd", "stop");
}

function connectMQTT() {
    client = mqtt.connect('ws://113.45.173.169:8083/mqtt');
    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe('sport_cmd');
        client.subscribe('openmv/voice');
    });

    client.on('message', (topic, message) => {
        const msgContent = message.toString();
        console.log(`Message received on ${topic}: ${msgContent}`);

        receivedMessages.value.push({ topic, message: msgContent });

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
    <v-card class="py-8 px-6 text-center mx-auto ma-4" elevation="12" max-width="400" width="100%"
        v-if="isOTPValid == false">
        <h3 class="text-h6 mb-4">Verify Your Account</h3>

        <div class="text-body-2">
            We sent a verification code to john..@gmail.com <br>
            Please check your email and paste the code below.
        </div>

        <v-sheet color="surface">
            <v-otp-input v-model="otp" type="password"></v-otp-input>
        </v-sheet>

        <v-btn class="my-4" color="purple" height="40" text="Verify" variant="flat" width="70%"
            @click="verifyOTP"></v-btn>

        <div class="text-caption">
            Didn't receive the code? <a href="#" @click.prevent="otp = ''">Resend</a>
        </div>
    </v-card>

    <v-card v-if="isOTPValid" elevation="0">
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
            </v-card-text>
            <div v-if="isConnected">
                <v-card-text v-for="cmd in commands" :key="cmd.message">
                    <v-row>
                        <v-btn variant="outlined" @click="publishCommand(cmd)">
                            {{ cmd.topic }} : {{ cmd.message }}
                        </v-btn>
                    </v-row>
                </v-card-text>
            </div>
            <div v-if="isConnected">
                <!-- 显示接收到的消息 -->
                <v-card-text>
                    <v-list>
                        <v-list-item v-for="(msg, index) in receivedMessages" :key="index">
                            <v-chip class="ma-2" color="success" variant="outlined">
                                {{ msg.topic }} :  {{ msg.message }}
                            </v-chip>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </div>
        </v-card>
    </v-card>
</template>
