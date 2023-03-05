

import React, { useState, useEffect, useRef } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

function TrailMap(props) {
    const [map, setMap] = useState(null);
    const [google, setGoogle] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});

    useEffect(() => {
        if (!google) {
            setGoogle(window.google);
        }
    }, [google]);

    useEffect(() => {
        if (map && google) {
            const { trails, markerEventHandlers } = props;
            const trailIds = trails.map((trail) => trail.id);
            const existingIds = Object.keys(markers.current);

            existingIds.forEach((id) => {
                if (!trailIds.includes(parseInt(id))) {
                    markers.current[id].setMap(null);
                    delete markers.current[id];
                }
            });

            trails.forEach((trail) => {
                if (!markers.current[trail.id]) {
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
            });
        }
    }, [props.trails, props.markerEventHandlers, markers, map, google]);

    useEffect(() => {
        if (!map && google) {
            const options = {
                zoom: 12,
                // // SF latlong
                // center: { lat: 37.7749, lng: -122.4194 },
                // SMG latlong
                center: { lat: -6.966667, lng: 110.416664 },
                ...props.mapOptions,
            };
            setMap(new google.maps.Map(mapRef.current, options));
        }
    }, [map, props.mapOptions, google]);

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
        <>
            <Wrapper
                apiKey={process.env.REACT_APP_MAPS_API_KEY}
                language="en"
            >
                <TrailMap {...props} />
            </Wrapper>
        </>
    )
}

export default TrailMapWrapper;
