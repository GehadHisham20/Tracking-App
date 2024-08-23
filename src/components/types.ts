export type Point = {
  lat: number;
  lng: number;
  distance: number;
  heading: number;
  velocity: number;
};
export interface IPoint {
  lat: number;
  lng: number;
}
export type Response = {
  data: Array<Point>;
};
