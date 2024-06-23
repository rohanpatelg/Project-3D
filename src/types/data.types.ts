export type NodeData={
        id:number;
        name:string;
        path:string;
        nodePosition:number[],
        color:string
}

export type EdgeData={
        id:number;
        source:number;
        target:number;
        value:string;
        edgePosition:Array<any>;
        textPosition:Array<any>;

}