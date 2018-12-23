import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { CarService, Car } from '../service/CarService'
import { TreeTable } from 'primereact/treetable'
import { NodeService, Node, NodeKey } from '../service/NodeService'

interface AppProps {
}

interface AppState {
    dataTableValue: Array<Car>
    dataTableSelection: Car
    nodes: Array<Node>
    selectedNodes: Array<NodeKey>
}

export class DataDemo extends React.Component<AppProps, AppState> {
    private carService: CarService
    private nodeService: NodeService

    constructor(props: AppProps) {
        super(props)
        this.state = {
            dataTableValue: [],
            dataTableSelection: {},
            nodes: [],
            selectedNodes: []
        }

        this.carService = new CarService()
        this.nodeService = new NodeService()
    }

    componentDidMount() {
        this.carService.getCarsMedium().then(data => this.setState({ dataTableValue: data }))
        this.nodeService.getTreeTableNodes().then(data => this.setState({ nodes: data }))
    }

    render() {
        return (
            <div className="p-grid">

                <div className="p-col-12">
                    <div className="card card-w-title">
                        <h1>DataTable</h1>
                        <DataTable value={this.state.dataTableValue} paginatorPosition="both" selectionMode="single" header="List of Cars" paginator={true} rows={10}
                            responsive={true} selection={this.state.dataTableSelection} onSelectionChange={event => this.setState({ dataTableSelection: event.value })}>
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
                        <TreeTable value={this.state.nodes} selectionMode="multiple" selectionKeys={this.state.selectedNodes} onSelectionChange={e => this.setState({selectedNodes: e.value})} metaKeySelection={false}>
                            <Column field="name" header="Name" expander></Column>
                            <Column field="size" header="Size"></Column>
                            <Column field="type" header="Type"></Column>
                        </TreeTable>
                    </div>
                </div>

            </div>
        )
    }
}
