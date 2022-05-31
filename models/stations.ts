import Station from './../interfaces/station';
import config from './../config/config.json';

const stations = {
    getStations: async function getOrders(): Promise<Station> {
        const response = await fetch(`${config.base_url}/stations`);
        const result = await response.json();
        return result.data;
    },
};

export default stations;