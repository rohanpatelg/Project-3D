<template>
  <Line2
    v-for="edge in edgeData"
    :points="edge.edgePosition"
    :line-width="2"
    color="green"
  />
</template>

<script setup lang="ts">
import { useDataStore } from '@/store/data.store'
const { edgeData } = useDataStore()
import {Line2} from '@tresjs/cientos'


</script>
