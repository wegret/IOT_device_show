<script setup lang="ts">

import { ref } from 'vue';

type Device = {
    name: string;
    lastUpdated: Date;
};

const storedDevices = localStorage.getItem('devices');
const devices = ref<Device[]>(storedDevices ? JSON.parse(storedDevices).map((device: any) => ({
    ...device,
    lastUpdated: new Date(device.lastUpdated)
})) : []);


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
