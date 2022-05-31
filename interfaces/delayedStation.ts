interface Station {
    AdvertisedLocationName: string,
    Geometry: {
        WGS84: string
    },
    AdvertisedTimeAtLocation: string
    Delay: string,
    Canceled: boolean
}

export default Station;