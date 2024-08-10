<script setup lang="ts">
// imported components
import TotalEarning from './components/TotalEarning.vue';
import TotalUser from './components/TotalUser.vue';
import TotalExercise from './components/TotalExercise.vue';
import TotalIncome from './components/TotalIncome.vue';
import TotalGrowth from './components/TotalGrowth.vue';
import PopularStocks from './components/PopularStocks.vue';
</script>

<template>
  <v-row>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Earning -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalUser />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Order -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalExercise />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Income -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <TotalIncome />
    </v-col>

    <!-- -------------------------------------------------------------------- -->
    <!-- Total Growth -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" lg="12">
      <TotalGrowth />
    </v-col>

  </v-row>
</template>
