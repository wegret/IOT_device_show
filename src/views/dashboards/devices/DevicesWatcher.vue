<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import mqtt from 'mqtt';
import BatteryIndicator from './components/BatteryIndicator.vue';

type Device = {
    name: string;
    battery: number;
    lastUpdated: Date
};

const devices = ref<Device[]>([]);

// 尝试从 localStorage 加载设备数据
const storedDevices = localStorage.getItem('devices');
if (storedDevices) {
    devices.value = JSON.parse(storedDevices).map((d: any) => ({
        ...d,
        lastUpdated: new Date(d.lastUpdated)  // 确保 lastUpdated 被转换回 Date 对象
    }));
}

const client = mqtt.connect('ws://113.45.173.169:8083/mqtt');

onMounted(() => {
    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe('battery/#');
    });

    client.on('message', (topic, message) => {
        const topicParts = topic.split('/');
        const deviceName = topicParts[1];
        const batteryLevel = Math.floor(parseFloat(message.toString()));
        const updateTime = new Date();

        const deviceIndex = devices.value.findIndex(d => d.name === deviceName);
        if (deviceIndex !== -1) {
            const updatedDevice = { ...devices.value[deviceIndex], battery: batteryLevel, lastUpdated: updateTime };
            devices.value.splice(deviceIndex, 1, updatedDevice);  // 用新对象替换，确保响应性
        } else {
            devices.value.push({ name: deviceName, battery: batteryLevel, lastUpdated: updateTime });
        }
    });
});

// 监听 devices 变化并更新 localStorage
watchEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices.value));
});

onUnmounted(() => {
    if (client.connected) {
        client.end();
    }
});
</script>

<template>
    <v-card elevation="0">
        <v-card variant="outlined">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="9">
                        <span class="text-subtitle-2 text-disabled font-weight-bold">设备电量总览</span>
                    </v-col>
                </v-row>
                <!-- Battery Indicators -->
                <v-row>
                    <v-col v-for="device in devices" :key="device.name" cols="12" sm="4" md="3">
                        <battery-indicator :name="device.name" :battery="device.battery"
                            :lastUpdated="device.lastUpdated"></battery-indicator>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-card>
</template>
