import React, { FunctionComponent, useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { CarService, Car } from '../service/CarService'
import { TreeTable } from 'primereact/treetable'
import { NodeService, Node, NodeKey } from '../service/NodeService'

export const DataHooksDemo: FunctionComponent = () => {
    const carService = new CarService()
    const nodeService = new NodeService()

    const [dataTableValue, setDataTableValue] = useState(Array<Car>())
    const [dataTableSelection, setDataTableSelection] = useState({} as Car)
    const [nodes, setNodes] = useState(Array<Node>())
    const [selectedNodes, setSelectedNodes] = useState(Array<NodeKey>())

    useEffect(() => {
        carService.getCarsMedium().then(data => setDataTableValue(data))
    }, [])
    useEffect(() => {
        nodeService.getTreeTableNodes().then(data => setNodes(data))
    }, [])

    return (
        <div className="p-grid">

            <div className="p-col-12">
                <div className="card card-w-title">
                    <h1>DataTable</h1>
                    <DataTable value={dataTableValue} paginatorPosition="both" selectionMode="single" header="List of Cars" paginator={true} rows={10}
                        responsive={true} selection={dataTableSelection} onSelectionChange={event => setDataTableSelection(event.value)}>
                        <Column field="vin" header="Vin" sortable={true} />
                        <Column field="year" header="Year" sortable={true} />
                        <Column field="brand" header="Brand" sortable={true} />
                        <Column field="color" header="Color" sortable={true} />
                    </DataTable>
                </div>
            </div>

            <div className="p-col-12">
                <div className="card card-w-title">
                    <h1>TreeTable</h1>
                    <TreeTable value={nodes} selectionMode="multiple" selectionKeys={selectedNodes} onSelectionChange={e => setSelectedNodes(e.value)} metaKeySelection={false}>
                        <Column field="name" header="Name" expander></Column>
                        <Column field="size" header="Size"></Column>
                        <Column field="type" header="Type"></Column>
                    </TreeTable>
                </div>
            </div>

        </div>
    )
}
