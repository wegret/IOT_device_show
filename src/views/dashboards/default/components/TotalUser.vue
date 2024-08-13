<script setup lang="ts">
import { shallowRef } from 'vue';
import { ArchiveIcon, CopyIcon, DownloadIcon, FileExportIcon } from 'vue-tabler-icons';
import iconCard from '@/assets/images/icons/icon-card.svg';
const items = shallowRef([
  { title: 'Import Card', icon: DownloadIcon },
  { title: 'Copy Data', icon: CopyIcon },
  { title: 'Export', icon: FileExportIcon },
  { title: 'Archive File', icon: ArchiveIcon }
]);

import { ref, onMounted } from 'vue';
import axios from 'axios';
const users = ref([]);


const fetchUsers = async () => {
    try {
        const response = await axios.get('http://113.45.173.169:5000/get_user_list');
        users.value = JSON.parse(response.data);
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};
</script>

<template>
  <v-card elevation="0" class="bg-secondary overflow-hidden bubble-shape bubble-secondary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darksecondary" variant="flat">
          <img :src="iconCard" width="25" />
        </v-btn>
        <div class="ml-auto z-1">
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-btn icon rounded="sm" color="secondary" variant="flat" size="small" v-bind="props">
                <DotsIcon stroke-width="1.5" width="20" />
              </v-btn>
            </template>
            <v-sheet rounded="md" width="150" class="elevation-10">
              <v-list density="compact">
                <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                  <template v-slot:prepend>
                    <component :is="item.icon" stroke-width="1.5" size="20" />
                  </template>
                  <v-list-item-title class="ml-2">{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-menu>
        </div>
      </div>
      <h2 class="text-h1 font-weight-medium">
        6 <a href="#"><CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" /> </a>
      </h2>
      <span class="text-subtitle-1 text-medium-emphasis text-white">总计用户量</span>
    </v-card-text>
  </v-card>
</template>
