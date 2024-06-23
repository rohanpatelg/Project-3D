import { defineStore } from "pinia"
import {ref} from 'vue';
import { type EdgeData, type NodeData } from "@/types/data.types";
import data from '../../public/data.json'
export const useDataStore=defineStore('data',()=>{
 const nodeData=ref<NodeData[]>([])
 const edgeData=ref<EdgeData[]>([])

 function createNewNodes(){
        for(let i=0;i<data.nodes.length;i++){
                nodeData.value.push({nodePosition:new Array(Math.random() * 2  * 5,Math.random() * 2  * 5,Math.random() * 2 - 1 * 5),...data.nodes[i],color:'F7F9F2'})
        }
 }

 
 function createStableNewNodes(){
        
       nodeData.value.push({nodePosition:[0,0,0],...data.nodes[0],color:''})
       nodeData.value.push({nodePosition:[0,8,0],...data.nodes[1],color:'red'})
       nodeData.value.push({nodePosition:[-5,10,2],...data.nodes[2],color:'F7F9F2'})
       nodeData.value.push({nodePosition:[5,10,-2],...data.nodes[3],color:'F7F9F2'})
       nodeData.value.push({nodePosition:[8,0,0],...data.nodes[4],color:'865DFF'})
       nodeData.value.push({nodePosition:[16,8,2],...data.nodes[5],color:'865DFF'})
       nodeData.value.push({nodePosition:[16,-8,-2],...data.nodes[6],color:'865DFF'})
       nodeData.value.push({nodePosition:[0,-8,0],...data.nodes[7],color:'F7F9F2'})
       nodeData.value.push({nodePosition:[-8,-5,2],...data.nodes[8],color:'F7F9F2'})
       nodeData.value.push({nodePosition:[-8,5,-2],...data.nodes[9],color:'F7F9F2'})

}
 function createNewEdges(){
        for(let i=0;i<data.edges.length;i++){
                const arr=[]
                arr.push(nodeData.value[data.edges[i].source-1].nodePosition)
                arr.push(nodeData.value[data.edges[i].target-1].nodePosition)
                edgeData.value.push({
                        edgePosition: arr, textPosition: new Array((arr[0][0] + arr[1][0]) / 2, (arr[0][1] + arr[1][1]) / 2, (arr[0][2] + arr[1][2]) / 2), ...data.edges[i],
                       
                })
        }
 }
 function updateEdgeData(value:string,id:number){
        edgeData.value.map((edge,index)=>{
               if(edge.id===id){
                edge.value=value
                console.log(edgeData.value)
               }
        })
 }

 function getPdfPathforNode(id:number){
       const node=nodeData.value.filter((n,index)=>
             n.id===id
       )
       return node[0].path
 }
 createStableNewNodes();
 createNewEdges();
 return {nodeData,edgeData,updateEdgeData,getPdfPathforNode}
},

)