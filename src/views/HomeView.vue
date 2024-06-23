<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { reactive, shallowRef } from 'vue'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { OrbitControls,Stars} from '@tresjs/cientos'
import { ref } from 'vue'
const state = reactive({
  clearColor: '#333',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
})
import PdfNode from '@/components/PdfNode.vue'
import TextComponent from '@/components/TextComponent.vue'
import LineComponent from '@/components/LineComponent.vue'
import { useDataStore } from '@/store/data.store'
import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
const {updateEdgeData,getPdfPathforNode}=useDataStore()

const boxRef = shallowRef(null)
const showInput = ref(false)
const idToUpdate=ref<number>(-1)
const update = (id: number) => {
  showInput.value = true

  idToUpdate.value=id
}
  const inputText = ref('')
  const triggerSendChat = (event: any) => {
    if (event.keyCode !== 13) return
    sendChat()
  }
  function sendChat() {
    console.log(idToUpdate.value)
    updateEdgeData(inputText.value,idToUpdate.value)
    inputText.value = ''
    showInput.value = false
  }

const pdfPath=ref('')
const visiblePdf=ref(false)
function showPDF(id:number){
pdfPath.value= getPdfPathforNode(id)
visiblePdf.value=true
}
const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.09 * delta
})
</script>

<template>
  <div v-if="visiblePdf" class="w-full h-screen flex flex-col z-70 ">
    <div class="h-[100px] w-full bg-white flex justify-center items-center  ">
      <button @click="visiblePdf=false" class="px-4 py-2 rounded-lg bg-green-200">Close PDF</button>
    </div>
      <div class=" h-full w-full">
        <vue-pdf-app :pdf="pdfPath" ></vue-pdf-app>
      </div>


  </div>
  <div
    v-if="showInput"
    class="absolute bg-transparent h-screen w-full flex justify-center items-center z-50"
   
  >
    <div class="w-[300px] shadow-xl rounded-lg">
      <div class="w-full h-[52px] flex items-center text-white bg-black border-green-600 border-solid border shadow-2xl rounded-full justify-between px-4">
        <input
          type="text"
          class=" w-[95%] text-white h-full rounded-full px-4 py-2 outline-none  bg-transparent"
          v-model="inputText"
          @keydown.enter="triggerSendChat"
        />
        <div class="hover:cursor-pointer" @click="sendChat">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L3 21L21 12L3 3L6 12ZM6 12H12"
              stroke="#CCCCCC"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <TresCanvas v-bind="state" v-if="!visiblePdf">
    <TresPerspectiveCamera :position="[0, 0, 25]" :look-at="[0,0,0]" />
    <Stars
    :rotation="[0, yRotation, 0]"
      :radius="50"
      :depth="50"
      :count="5000"
      :size="0.3"
      :size-attenuation="true"/>

    <PdfNode @trigger-pdf="showPDF" />
    <TextComponent @updates-text="update" />
    <LineComponent />
    <TresDirectionalLight />

    <OrbitControls />
  </TresCanvas>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: relative;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  color: white;
  position: absolute;
  z-index: 100;
  top: 10px;
  left: 100px;
}
.overlay-text {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 3px;
}
</style>
<!-- <script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import { Html, OrbitControls } from '@tresjs/cientos'
import { ref } from 'vue'

const gl = {
  clearColor:'green',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
 
};

const sphereRef = ref(null)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 8]" />
    <OrbitControls />
    <TresMesh :position="[1, 1, 1]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      
    </TresMesh>
     <TresMesh
      ref="sphereRef"
      :position="[3, 1, 1]"
    >
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
      <Html
        center
      
        :distance-factor="4"
      >
        <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
          Sphere
        </h1>
      </Html>
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" /> 
  </TresCanvas>
</template> -->
