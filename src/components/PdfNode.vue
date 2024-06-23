<template>
       
       <TresMesh v-for="node,index in nodeData" class="hover:cursor-pointer" @click="triggerPDF(node.id)"  ref="nodeRef"  :position="node.nodePosition" :key="node.id" :scale="node.id===1?[1.2,1.2,1.2]:[0.8,0.8,0.8]" color="#00000" >
        <TresSphereGeometry v-if="node.id===1" />
        <TresBoxGeometry v-else />
        <Html v-if="node.id===1"
        
              center
        >
              <div class="text-white font-normal border-none text-xs text-center ">Tektome World</div>

        </Html>
        <TresMeshBasicMaterial v-if="node.id===1"  wireframe color="hotpink" />
        <TresMeshNormalMaterial v-else :color="node.color" />
       
       
       </TresMesh>
       <Suspense >
      <Text3D
         v-for="node in nodeData"
        :text="node.id===1?'':node.name"
        font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
        :scale="[.4,.4,0.4]"
        :position="[node.nodePosition[0],node.nodePosition[1]-0.8,node.nodePosition[2]]"
        :size=".5"
        :need-updates="true"
        :key="node.id"
        :curve-segments="1"
       
       
      >
        <TresMeshBasicMaterial  color="white" />
        
      </Text3D>
      </Suspense>
   
     
      
</template>

<script setup lang="ts">
import { Html,Text3D } from '@tresjs/cientos';
import { useDataStore } from '@/store/data.store';
import { useLoop } from '@tresjs/core';
import {onMounted, ref} from 'vue'
const {nodeData} =useDataStore()
const {onBeforeRender}=useLoop()
const nodeRef=ref()

onBeforeRender(({delta})=>{
       nodeRef.value[0].rotation.y +=delta
       nodeRef.value[0].rotation.z +=delta
})
const emits=defineEmits(["trigger-pdf"])
function triggerPDF(id:number){
emits('trigger-pdf',id)
}



</script>