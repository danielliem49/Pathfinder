

import React, { useState, useEffect, useRef } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useSelector } from 'react-redux';
import { getTrail } from '../../store/trails';

function TrailMap(props) {
    const [map, setMap] = useState(null);
    const [google, setGoogle] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});
    const trail = useSelector(getTrail(props.trailId))

    useEffect(() => {
        if (!google) {
            setGoogle(window.google);
        }
    }, [google]);

    useEffect(() => {
        if (map && google) {
            const { markerEventHandlers } = props;
            const latLng = new google.maps.LatLng(trail.latitude, trail.longitude);
            const marker = new google.maps.Marker({
                position: latLng,
                map: map,
            });
            marker.addListener('click', () => {
                markerEventHandlers.onClick(trail);
            });
            markers.current[trail.id] = marker;
        }
    }, [props.markerEventHandlers, markers, map, google, trail]);

    useEffect(() => {
        if (!map && google) {
            const options = {
                zoom: 16,
                center: { lat: trail.latitude, lng: trail.longitude },
                ...props.mapOptions,
            };
            setMap(new google.maps.Map(mapRef.current, options));
        }
    }, [map, props.mapOptions, google, trail]);

    useEffect(() => {
        if (map && google) {
            const { mapEventHandlers } = props;
            Object.keys(mapEventHandlers).forEach((eventType) => {
                const handler = mapEventHandlers[eventType];
                google.maps.event.addListener(map, eventType, (event) => {
                    handler(event, map);
                });
            });
        }
    }, [props.mapEventHandlers, map, google]);

    return (
        <div
            ref={mapRef}
            style={{ width: '100%', height: '500px' }}
        >
            Map
        </div>
    );
};

function TrailMapWrapper(props) {
    return (
        <Wrapper
            apiKey={process.env.REACT_APP_MAPS_API_KEY}
            language="en"
        >
            <TrailMap {...props} />
        </Wrapper>
    );
}

export default TrailMapWrapper;
