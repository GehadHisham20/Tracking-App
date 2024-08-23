import { useGoogleMap } from "@react-google-maps/api";
import React, { useEffect, useRef } from "react";

type MapControlProps = {
  position: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  classNameChild?: string;
};

function MapControl({ position, children, style, classNameChild }: MapControlProps) {
  const map = useGoogleMap();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (map && ref.current) {
      map.controls[
        window.google.maps.ControlPosition[position as unknown as number] as unknown as number
      ].push(ref.current);
    }
  }, [map, ref, position]);

  return (
    <div ref={ref} style={style} className={classNameChild}>
      {children}
    </div>
  );
}

export default MapControl;
