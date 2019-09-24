import MAP_STYLE from '../data/dark_map/style.json';
import SF_NEIGHBORHOODS from '../data/feature-example-sf'

const mapStyle = {
    ...MAP_STYLE,
    sources: { ...MAP_STYLE.sources },
};

mapStyle.sources['sf-neighborhoods'] = {
    type: 'geojson',
    data: SF_NEIGHBORHOODS
};
mapStyle.layers.push(
    {
        id: 'sf-neighborhoods-fill',
        source: 'sf-neighborhoods',
        type: 'fill',
        paint: {
            'fill-outline-color': '#0040c8',
            'fill-color': '#fff',
            'fill-opacity': 0
        }
    },
    {
        id: 'sf-neighborhoods-outline',
        source: 'sf-neighborhoods',
        type: 'line',
        paint: {
            'line-width': 2,
            'line-color': '#0080ef'
        }
    }
);
export default mapStyle;
