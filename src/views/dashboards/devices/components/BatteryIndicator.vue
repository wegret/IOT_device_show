<!--
 * @Author: wlaten
 * @Date: 2024-08-11 03:33:33
 * @LastEditTime: 2024-08-11 05:39:55
 * @Discription: file content
-->
<template>
    <div class="battery-indicator">
        <div class="text-h2 mb-2">{{ name }}</div>
        <div class="text-caption mb-1">更新时间: {{ lastUpdated.toLocaleTimeString() }}</div>
        <div :style="{ color: batteryColor }">
            <v-progress-circular :model-value="battery" :size="72" :width="10" rotate="-90">
                {{ battery }}%
            </v-progress-circular>
        </div>

    </div>
</template>

<script>
export default {
    name: 'BatteryIndicator',
    props: {
        name: {
            type: String,
            required: true
        },
        battery: {
            type: Number,
            required: true
        },
        lastUpdated: Date
    },
    computed: {
        batteryColor() {
            if (new Date() - this.lastUpdated > 30000) {
                return '#9E9E9E'; // 60秒以上未更新 - 使用十六进制颜色代码
            } 
            if (this.battery > 75) {
                return '#4CAF50'; // 电量高 - 使用十六进制颜色代码
            } else if (this.battery > 40) {
                return '#FFC107'; // 电量中等 - 使用十六进制颜色代码
            } else {
                return '#F44336'; // 电量低 - 使用十六进制颜色代码
            }
        }
    }
}
</script>

<style scoped>
.battery-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

