import * as THREE from "three";

// const isMobile = () => {
//   const ua = navigator.userAgent;
//   const width = window.innerWidth;

//   if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || width <= 800) {
//     return true;
//   }

//   return false;
// }

//NOTE - DEVICE CONSTANTS (Refresh is needed after resize since this is a contant :)
// export const IS_MOBILE = isMobile();

//NOTE - DEBUG MODE CONSTANTS
export const DEBUG_MODE = false;

//NOTE - SCREEN SIZE CONSTANTS
export const INNER_WIDTH = window.innerWidth;
export const INNER_HEIGHT = window.innerHeight;

//NOTE - POSITION CONSTANTS
export const ORIGIN = new THREE.Vector3(0, 0, 0);

//NOTE - MATHEMATICAL CONSTANTS
export const PI = Math.PI;

//NOTE - CAMERA CONSTANTS
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 200;
export const CAMERA_FOV = 45;
export const ASPECT_RATIO = INNER_WIDTH / INNER_HEIGHT;
export const CAMERA_INITIAL_POSITION = new THREE.Vector3(0, 20, 20);
export const CAMERA_INITIAL_LOOK_AT = ORIGIN;

//NOTE - CONTROLS CONSTANTS
export const ENABLE_DAMPING = true;
export const ENABLE_PAN = true;
export const DAMPING_FACTOR = 0.05;
export const SCREEN_SPACE_PANNING = false;
export const MIN_DISTANCE = 20;
export const MAX_DISTANCE = 100;
export const MIN_POLAR_ANGLE = PI / 9;
export const MAX_POLAR_ANGLE = PI / 3;

//NOTE - EXPOSURE AND TRANSPARENCY CONSTANTS
export const EXPOSURE_VALUE = 0.7;
export const IS_TRANSPARENT = false;

//NOTE - LOADER CONSTANTS
export const DRACO_CONFIG_TYPE = 'js';
// export const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

//NOTE - CLUSTER CONSTANTS
export const CLUSTER_MAX_ZOOM = 1.4;
export const CLUSTER_PROXIMITY_DISTANCE = 5;

//NOTE - LAYER CONSTANTS
export const LAYERS = {
  VISIBLE_LAYER: 1,
  INVISIBLE_LAYER: 2
}