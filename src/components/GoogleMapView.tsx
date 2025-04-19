
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Define Google Maps types to fix TypeScript errors
declare global {
  interface Window {
    google: any;
  }
}

interface Location {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

interface GoogleMapViewProps {
  locations?: Location[];
  title?: string;
  description?: string;
}

export function GoogleMapView({ 
  locations = [
    { name: "LUMS", lat: 31.4695, lng: 74.4107, description: "Lahore University of Management Sciences" },
    { name: "IBA Karachi", lat: 24.9338, lng: 67.1361, description: "Institute of Business Administration" },
    { name: "NUST", lat: 33.6423, lng: 72.9919, description: "National University of Sciences and Technology" },
    { name: "GIKI", lat: 33.7479, lng: 72.3638, description: "Ghulam Ishaq Khan Institute" },
    { name: "UET Lahore", lat: 31.5731, lng: 74.3079, description: "University of Engineering and Technology" }
  ],
  title = "Top Universities in Pakistan",
  description = "View scholarship opportunities at these top institutions"
}: GoogleMapViewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  // Load Google Maps API
  useEffect(() => {
    // Check if script is already being loaded
    if (scriptLoaded.current) return;
    
    scriptLoaded.current = true;
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    
    googleMapsScript.onload = () => {
      setIsLoaded(true);
    };
    
    document.head.appendChild(googleMapsScript);
    
    return () => {
      // Only remove if the script exists in the document
      if (document.head.contains(googleMapsScript)) {
        document.head.removeChild(googleMapsScript);
      }
    };
  }, []);

  // Initialize map when script is loaded
  useEffect(() => {
    if (isLoaded && mapRef.current && window.google) {
      // Calculate center point from all locations
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach(location => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });
      
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: bounds.getCenter(),
        zoom: 6,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#2a4458" }]
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{ color: "#fbd784" }]
          }
        ]
      });
      
      // Add markers for each location
      locations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: newMap,
          title: location.name,
          animation: window.google.maps.Animation.DROP
        });
        
        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0; font-weight: 600;">${location.name}</h3>
              <p style="margin: 5px 0 0;">${location.description}</p>
            </div>
          `
        });
        
        marker.addListener('click', () => {
          infoWindow.open(newMap, marker);
        });
      });
      
      // Fit bounds but don't set map state in an effect that depends on map
      if (!map) {
        newMap.fitBounds(bounds);
        setMap(newMap);
      }
    }
  }, [isLoaded, locations, map]);

  return (
    <Card className="border border-scholarship-accent/20 bg-white/5">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-scholarship-foreground/70">{description}</p>
      </CardHeader>
      <CardContent>
        {!isLoaded ? (
          <div className="h-[300px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-scholarship-accent" />
          </div>
        ) : (
          <div ref={mapRef} style={{ height: '300px', width: '100%', borderRadius: '0.5rem' }} />
        )}
      </CardContent>
    </Card>
  );
}
