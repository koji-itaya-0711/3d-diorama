<template>
  <!-- <div ref="container" class="viewer"></div> -->
  <div id="cesiumContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as Cesium from '../../node_modules/cesium'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import ThreeToCesium from 'three-to-cesium'
import '../../node_modules/cesium/Build/Cesium/Widgets/widgets.css'

let viewer
let tileset 
onMounted(() => {

  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODZkYTg3Ny02ZjYzLTQ4ZWYtOWQ5Ni1jMzk3ZDEzYzFjOWYiLCJpZCI6MjU4MzYyLCJpYXQiOjE3NTk0NzI1OTd9.otaZQzC4f1ubs9ELE49wowZ_NMjIKjsahRI1YD3ZOsk';

  viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: terrainProvider: Cesium.createWorldTerrain(); // 地形を立体化
    sceneModePicker: false,
    baseLayerPicker: false,
    timeline: false,
    animation: false,
    infoBox: false,
    selectionIndicator: false,
    navigationHelpButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    fullscreenButton: false,
    shouldAnimate: true
    });
//   // 3Dタイルの読み込み
// 　tileset = viewer.scene.primitives.add(
//     await Cesium.Cesium3DTileset.fromIonAssetId(2602291),
//   );
//   tileset = viewer.scene.primitives.add(
//     await Cesium.Cesium3DTileset.fromIonAssetId(2275207),
//   );
  const integrator = ThreeToCesium(viewer)
  const loader = new GLTFLoader()

const position = Cesium.Cartesian3.fromDegrees(139.44, 35.41, 0)

  loader.load('/model.glb', (gltf) => {
    const model = gltf.scene

    // ✅ X軸まわりに90度回転して立たせる
    model.rotation.x = Math.PI / 2
    // スケール調整
    model.scale.set(1, 1, 1)
    integrator.add(model, position)
  })
  
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(139.44, 35.41, 100.0),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-30),
      roll: 0
    }
  })
  
  // ✅ Three.jsオブジェクトの更新
  viewer.scene.postRender.addEventListener(() => {
    integrator.update()
  })
})

</script>

<style scoped>
.viewer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
