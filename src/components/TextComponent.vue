<template>
 <Suspense >
      <Text3D
         v-for="edge in edgeData"
        :text="edge.value"
        font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
        :scale="[.8,.8,0.8]"
        :position="edge.textPosition"
        :size=".4"
        :need-updates="true"
        :key="edge.id"
        :curve-segments="1"
        @click="updateText(edge.id)"
       
      >
        <TresMeshBasicMaterial color="orange" />
        
      </Text3D>
      </Suspense>
</template>


<script setup lang="ts">
import { useDataStore } from '@/store/data.store';
const {edgeData}= useDataStore()
import { Suspense } from 'vue';
import { Text3D } from '@tresjs/cientos';
const emits=defineEmits(["updates-text"])
function updateText(id:number){
        emits('updates-text',id)
}

</script>