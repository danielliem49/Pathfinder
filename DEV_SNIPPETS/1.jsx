// // Splash page component with map of all trails
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import PostForm from './PostForm';
// // import PostIndexItem from './PostIndexItem';
// import { getTrails, fetchTrails } from '../../store/trails';
// import { getParks, fetchParks } from '../../store/parks';
// import { Link, useHistory } from 'react-router-dom';

// import stringify from 'query-string';
// import TrailMapWrapper from '../TrailMap';

// function Splash() {
//     const dispatch = useDispatch();
//     const trails = useSelector(getTrails);
//     const parks = useSelector(getParks);
//     const history = useHistory();

//     // const trails = useSelector(state => state.trails.list)
//     // const parks = useSelector(state => state.parks.list)


//     useEffect(() => {
//         dispatch(fetchTrails())
//         dispatch(fetchParks(parks))
//     }, [dispatch])

//     function handleMarkerClick(trail) {
//         history.push(`/trails/${trail.id}`);
//     }

//     function handleMapClick(event) {
//         const { latLng } = event;
//         const queryParams = stringify({
//             lat: latLng.toJSON().lat,
//             lng: latLng.toJSON().lng
//         });
//         history.push({
//             pathname: '/trails/new',
//             search: queryParams
//         });
//     }

//     return (
//         <>
//             <div>
//                 <TrailMapWrapper
//                     apiKey={process.env.REACT_APP_MAPS_API_KEY}
//                     trails={trails}
//                     markerEventHandlers={{ click: handleMarkerClick }}
//                     mapEventHandlers={{ click: handleMapClick }}
//                 />
//             </div>

//             <div>
//                 <h1>Welcome back, </h1>
//             </div>

//             <div>
//                 <h2>Trails</h2>
//                 <ul>
//                     {trails.map((trail) =>
//                         <li key={trail.id}>
//                             <Link to={`/trails/${trail.id}`}>{trail.trailName}</Link>
//                         </li>
//                     )}
//                 </ul>
//             </div>

//             <div>
//                 <h2>Parks</h2>
//                 <ul>
//                     {parks.map((park) =>
//                         <li key={park.id}>
//                             <Link to={`/parks/${park.id}`}>{park.parkName}</Link>
//                         </li>
//                     )}
//                 </ul>
//             </div>
//         </>
//     )
// }

// export default Splash;

// // TrailMap component with all trails
// import React, { useState, useEffect, useRef } from 'react';
// import { Wrapper } from '@googlemaps/react-wrapper';

// function TrailMap(props) {
//     const [map, setMap] = useState(null);
//     const [google, setGoogle] = useState(null);
//     const mapRef = useRef(null);
//     const markers = useRef({});

//     useEffect(() => {
//         if (!google) {
//             setGoogle(window.google);
//         }
//     }, [google]);

//     useEffect(() => {
//         if (map && google) {
//             const { trails, markerEventHandlers } = props;
//             const trailIds = trails.map((trail) => trail.id);
//             const existingIds = Object.keys(markers.current);

//             existingIds.forEach((id) => {
//                 if (!trailIds.includes(parseInt(id))) {
//                     markers.current[id].setMap(null);
//                     delete markers.current[id];
//                 }
//             });

//             trails.forEach((trail) => {
//                 if (!markers.current[trail.id]) {
//                     const latLng = new google.maps.LatLng(trail.latitude, trail.longitude);
//                     const marker = new google.maps.Marker({
//                         position: latLng,
//                         map: map,
//                     });
//                     marker.addListener('click', () => {
//                         markerEventHandlers.onClick(trail);
//                     });
//                     markers.current[trail.id] = marker;
//                 }
//             });
//         }
//     }, [props.trails, props.markerEventHandlers, markers, map, google]);

//     useEffect(() => {
//         if (!map && google) {
//             const options = {
//                 zoom: 12,
//                 // // SF latlong
//                 // center: { lat: 37.7749, lng: -122.4194 },
//                 // SMG latlong
//                 center: { lat: -6.966667, lng: 110.416664 },
//                 ...props.mapOptions,
//             };
//             setMap(new google.maps.Map(mapRef.current, options));
//         }
//     }, [map, props.mapOptions, google]);

//     useEffect(() => {
//         if (map && google) {
//             const { mapEventHandlers } = props;
//             Object.keys(mapEventHandlers).forEach((eventType) => {
//                 const handler = mapEventHandlers[eventType];
//                 google.maps.event.addListener(map, eventType, (event) => {
//                     handler(event, map);
//                 });
//             });
//         }
//     }, [props.mapEventHandlers, map, google]);

//     return (
//         <div
//             ref={mapRef}
//             style={{ width: '100%', height: '500px' }}
//         >
//             Map
//         </div>
//     );
// };

// function TrailMapWrapper({ trailId, ...props }) {
//     return (
//         <Wrapper
//             apiKey={process.env.REACT_APP_MAPS_API_KEY}
//             language="en"
//         >
//             <TrailMap {...props} />
//         </Wrapper>
//     );
// }

// export default TrailMapWrapper;
