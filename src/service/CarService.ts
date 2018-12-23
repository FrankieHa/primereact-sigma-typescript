import axios from 'axios'

export interface Car {
    brand?: string
    year?: number
    color?: string
    vin?: string
}

export class CarService {
    
    getCarsSmall(): Promise<Array<Car>> {
        return axios.get('assets/demo/data/cars-small.json')
                .then(res => res.data.data)
    }

    getCarsMedium(): Promise<Array<Car>> {
        return axios.get('assets/demo/data/cars-medium.json')
                .then(res => res.data.data)
    }

    getCarsLarge(): Promise<Array<Car>> {
        return axios.get('assets/demo/data/cars-large.json')
                .then(res => res.data.data)
    }
}
