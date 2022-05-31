interface Station {
    LocationSignature: string,
    AdvertisedLocationName: string,
    Geometry: {
        WGS84: string
    },
    PlatformLine: [string, string]
}

export default Station;