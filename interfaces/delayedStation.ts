interface Station {
    StationName: string,
    Geometry: {
        WGS84: string
    },
    AdvertisedTimeAtLocation: string
    Delay: number,
    Canceled: boolean
}

export default Station;