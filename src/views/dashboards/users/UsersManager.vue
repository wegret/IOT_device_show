<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

import { computed } from 'vue';

const gradients = [
    ['#f00000', '#ff4500'],  // 低分数：红色渐变
    ['#ffd200', '#ffa500', '#ff8c00'],  // 中等分数：橙色渐变
    ['#33ff4f', '#008000', '#0000ff'],  // 高分数：从蓝色到绿色的渐变
];

const determineGradient = (scores) => {
    const maxScore = Math.max(...scores.map(score => score.score));
    if (maxScore < 4) {
        return gradients[0];  // 低分数渐变
    } else if (maxScore < 7) {
        return gradients[1];  // 中等分数渐变
    } else {
        return gradients[2];  // 高分数渐变
    }
};

const prepareScores = (scores) => {
    return scores.map(score => score.score);
};

const messageOverList = ref(false);



import { reactive } from 'vue';

const userDetails = reactive({});


const loadingDetails = ref({});

const users = ref([]);
const fetchUsers = async () => {
    try {
        const response = await axios.get('http://113.45.173.169:5000/get_user_list');
        users.value = JSON.parse(response.data);
        messageOverList.value = true;
        // 立即为所有用户抓取分数数据
        users.value.forEach(user => fetchUserScore(user));
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

const fetchUserScore = async (userId) => {
    if (!userDetails[userId]) {
        loadingDetails[userId] = true;
        try {
            const response = await axios.post('http://113.45.173.169:5000/get_user_score', { user_id: userId });
            userDetails[userId] = JSON.parse(response.data);
        } catch (error) {
            console.error(`Failed to fetch score for user ${userId}:`, error);
            userDetails[userId] = { error: "Failed to load data" }; // 处理错误状态
        } finally {
            loadingDetails[userId] = false;
        }
    }
};

onMounted(fetchUsers);

const scoreColor = (score) => {
    if (score > 80) {
        return { backgroundColor: '#4CAF50' }; // Green for high scores
    } else if (score > 50) {
        return { backgroundColor: '#FFC107' }; // Amber for medium scores
    } else {
        return { backgroundColor: '#F44336' }; // Red for low scores
    }
};

</script>

<template>
    <div>
        <v-expansion-panels>
            <v-expansion-panel v-for="user in users" :key="user">
                <v-expansion-panel-title>
                    用户ID： {{ user }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-row>
                        <v-col cols="5">
                            <!-- 时间轴 -->
                            <v-timeline align="start" side="end" dense>
                                <v-timeline-item v-for="(score, index) in userDetails[user]" :key="index"
                                    dot-color="pink" size="small">
                                    <div class="d-flex">
                                        <strong class="me-4">{{ new Date(score.start_time).toLocaleTimeString()
                                            }}</strong>
                                        <div>
                                            <strong>Score: {{ score.score }}</strong>
                                            <div class="text-caption">
                                                Recorded on: {{ new Date(score.start_time).toLocaleDateString() }}
                                            </div>
                                        </div>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </v-col>
                        <v-col cols="7">
                            <!-- 迷你图表：v-sparkline -->
                            <v-sparkline :auto-line-width="false" :fill="false"
                                :gradient="determineGradient(userDetails[user])" :gradient-direction="gradientDirection"
                                :line-width="2" :model-value="prepareScores(userDetails[user])" :padding="8"
                                :smooth="10" :stroke-linecap="lineCap" :type="trend" auto-draw></v-sparkline>
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
    ...
</template>
