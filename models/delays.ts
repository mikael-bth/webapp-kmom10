import Delay from './../interfaces/delay';
import DelayedStation from './../interfaces/delayedStation'
import config from './../config/config.json';
import StationModel from './stations';

const delays = {
    getDelays: async function getDelays(): Promise<Delay> {
        const response = await fetch(`${config.base_url}/delayed`);
        const result = await response.json();
        return result.data;
    },

    getDelayedStation: async function getDelayedStation(): Promise<DelayedStation> {
        const delayList = await delays.getDelays()
        const stationList = await StationModel.getStations();

        const delayedStationList = delayList
            .filter(delay => typeof delay.FromLocation != 'undefined')
            .map((delay, index) => {
            const advertisedTime = new Date(delay.AdvertisedTimeAtLocation);;
            const estimatedTime = new Date(delay.EstimatedTimeAtLocation);

            const delayTime = estimatedTime.getTime() - advertisedTime.getTime();
            const delayInMinutes = delayTime / (1000 * 60) ;

            const advertisedTimeStr = advertisedTime.toTimeString().split(' ')[0].slice(0, 5);

            const station = stationList.filter((station) => {
                return station.LocationSignature == delay.FromLocation[0].LocationName;
            });

            return {
                StationName: station[0].AdvertisedLocationName,
                Geometry: station[0].Geometry,
                AdvertisedTimeAtLocation: advertisedTimeStr,
                Delay: delayInMinutes,
                Canceled: delay.Canceled
            };
        })

        return delayedStationList;
    },

    getInHoursAndMinutes: function getInHoursAndMinutes(totalMinutes: number): string {
        const hours = Math.floor(totalMinutes / 60);
        if (hours == 0) return " " + totalMinutes.toString() + "min";
        const minutes = totalMinutes % 60;
        return " " + hours.toString() + "h " + minutes.toString() + "min";
    }
};

export default delays;