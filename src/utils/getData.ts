import type { NodeData,EdgeData } from '@/types/data.types';
import data from '../../public/data.json';


export const createNewNodes=()=>{
        const nodes:NodeData[]=[]
        for(let i=0;i<data.nodes.length;i++){
                nodes.push({nodePosition:new Array(Math.random() * 2  * 5,Math.random() * 2  * 5,Math.random() * 2 - 1 * 5),...data.nodes[i],color:''})
        }
        return nodes
}
export const createNewEdges=()=>{
        const nodes:NodeData[]=createNewNodes()
        const edges:EdgeData[]=[]
        for(let i=0;i<data.edges.length;i++){
                const arr=[]
                arr.push(nodes[data.edges[i].source-1].nodePosition)
                arr.push(nodes[data.edges[i].target-1].nodePosition)
                edges.push({
                        edgePosition: arr, textPosition: new Array((arr[0][0] + arr[1][0]) / 2, (arr[0][1] + arr[1][1]) / 2, (arr[0][2] + arr[1][2]) / 2), ...data.edges[i],
                       
                })
        }
        
        return edges;
}
