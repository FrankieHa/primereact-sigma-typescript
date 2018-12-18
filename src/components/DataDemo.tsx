import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { CarService, Car } from '../service/CarService'

interface AppProps {
}

interface AppState {
    dataTableValue: Array<Car>
    dataTableSelection: Car
}

export class DataDemo extends React.Component<AppProps, AppState> {
    private carService: CarService;

    constructor(props: AppProps) {
        super(props)
        this.state = {
            dataTableValue: [],
            dataTableSelection: {}
        }

        this.carService = new CarService();
    }

    componentDidMount() {
        this.carService.getCarsMedium().then(data => this.setState({ dataTableValue: data }))
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

            </div>
        )
    }
}
