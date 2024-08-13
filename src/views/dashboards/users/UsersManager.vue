<!--
 * @Author: wlaten
 * @Date: 2024-08-13 01:28:04
 * @LastEditTime: 2024-08-13 14:33:02
 * @Discription: file content
-->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const userDetails = ref({});
const loadingDetails = ref({});

const fetchUsers = async () => {
    try {
        const response = await axios.get('http://113.45.173.169:5000/get_user_list');
        users.value = JSON.parse(response.data);
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

const fetchUserDetails = async (userId) => {
    if (!userDetails.value[userId]) { // 避免重复加载同一个用户的数据
        loadingDetails.value[userId] = true; // 显示加载指示器
        try {
            const response = await axios.get(`http://localhost:5000/get_user_details/${userId}`);
            userDetails.value[userId] = response.data;
            loadingDetails.value[userId] = false; // 隐藏加载指示器
        } catch (error) {
            console.error('Failed to fetch user details:', error);
            loadingDetails.value[userId] = false;
        }
    }
};

onMounted(fetchUsers);
</script>


<template>
    <div>
        <v-expansion-panels>
            <v-expansion-panel v-for="user in users">
                <v-expansion-panel-header>
                    {{ user }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-if="loadingDetails[user.id]">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>
                    <div v-else-if="userDetails[user.id]">
                        <p><strong>运动类型:</strong> {{ userDetails[user.id].type }}</p>
                        <p><strong>开始时间:</strong> {{ userDetails[user.id].start_time }}</p>
                        <p><strong>结束时间:</strong> {{ userDetails[user.id].end_time }}</p>
                        <p><strong>评分:</strong> {{ userDetails[user.id].score }}</p>
                        <p><strong>分析:</strong> {{ userDetails[user.id].analysis_text }}</p>
                    </div>
                    <div v-else>
                        <p>无详细信息</p>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-expansion-panels>
            <v-expansion-panel v-for="user in users">
                <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus">
                    {{ user.name }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title>
                    Item
                    <template v-slot:actions="{ expanded }">
                        <v-icon :color="!expanded ? 'teal' : ''" :icon="expanded ? 'mdi-pencil' : 'mdi-check'"></v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title disable-icon-rotate>
                    Item
                    <template v-slot:actions>
                        <v-icon color="error" icon="mdi-alert-circle">
                        </v-icon>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo
                    consequat.
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>