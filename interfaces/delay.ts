interface Delay {
    ActivityId: string,
    ActivityType: string,
    AdvertisedTimeAtLocation: string,
    EstimatedTimeAtLocation: string,
    AdvertisedTrainIdent: string,
    Canceled: boolean,
    FromLocation: [
        {
            LocationName: string,
            Priority: number,
            Order: number
        }
    ],
    ToLocation: [
        {
            LocationName: string,
            Priority: number,
            Order: number
        }
    ]
}

export default Delay;