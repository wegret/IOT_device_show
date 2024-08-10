<script setup lang="ts">
import { ref, computed } from 'vue';
import BatteryIndicator from './BatteryIndicator.vue';

type Device = {
    name: string;
    battery: number;
};

const devices: Device[] = ref([
    { name: 'Camera', battery: 80 },
    { name: 'Watch', battery: 50 },
    { name: 'Sensor', battery: 21 },
    { name: 'Door', battery: 100 },
    { name: 'Camera', battery: 80 },
    { name: 'Watch', battery: 50 },
    { name: 'Sensor', battery: 21 }
]);
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
                        <battery-indicator :name="device.name" :battery="device.battery"></battery-indicator>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-card>
</template>
