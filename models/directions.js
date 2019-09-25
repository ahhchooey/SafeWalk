const mbxClient = require('@mapbox/mapbox-sdk');
const mbxMapMatching = require('@mapbox/mapbox-sdk/services/map-matching')
const baseClient = mbxClient({ accessToken: 'pk.eyJ1IjoidGhlby1icm93bmUiLCJhIjoiY2sweDNxNml3MDJrczNpcWk2Y2VkcTRscSJ9.spEwua1RKRltkkhpouI7-g' })
const mapMatchingClient = mbxMapMatching(baseClient);


mapMatchingClient.getMatch({
    points: [
        {
            coordinates: [-117.17283, 32.712041],
            approach: 'curb',
            waypointName: 'point-a'
        },
        {
            coordinates: [-117.17291, 32.712256],
            waypointName: 'point-b',
        },
        {
            coordinates: [-117.17292, 32.712444],
            waypointName: 'point-c',
        },
        {
            coordinates: [-117.172922, 32.71257],
            waypointName: 'point-d'
        },
        {
            coordinates: [-117.172985, 32.7126],
            waypointName: 'point-e'
        },
        {
            coordinates: [-117.173143, 32.712597],
            waypointName: 'point-f'
        },
        {
            coordinates: [-117.173345, 32.712546],
            waypointName: 'point-g'
        }
    ],

    tidy: false,
    steps: true,
    overview: "full",
    profile: 'walking'
})
    .send()
    .then(response => {
        console.log(response.body.matchings[0].legs[3].steps)
    }, (response) => {
        console.log(response)
    })