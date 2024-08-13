<script setup lang="ts">

import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import mqtt from 'mqtt';

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

const onlineThreshold = 30000; 
const onlineDevicesCount = ref(devices.value.filter(device => 
    new Date().getTime() - new Date(device.lastUpdated).getTime() < onlineThreshold
).length);

const totalDevicesCount = ref(devices.value.length);
</script>

<template>
  <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape-sm bubble-primary mb-6">
    <v-card-text class="pa-5">
      <div class="d-flex align-center ga-4">
        <v-btn color="darkprimary" icon rounded="sm" variant="flat">
          <TableIcon stroke-width="1.5" width="25" />
        </v-btn>
        <div>
          <h4 class="text-h4 font-weight-medium">{{ onlineDevicesCount }}</h4>
          <span class="text-subtitle-2 text-medium-emphasis text-white">在线设备</span>
        </div>
      </div>
    </v-card-text>
  </v-card>

  <v-card elevation="0" class="bubble-shape-sm overflow-hidden bubble-warning">
    <v-card-text class="pa-5">
      <div class="d-flex align-center ga-4">
        <v-btn color="lightwarning" icon rounded="sm" variant="flat">
          <BuildingStoreIcon stroke-width="1.5" width="25" class="text-warning" />
        </v-btn>
        <div>
          <h4 class="text-h4 font-weight-medium">{{ totalDevicesCount }}</h4>
          <span class="text-subtitle-2 text-disabled font-weight-medium">总计设备</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
