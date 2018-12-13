import React, { Component, createRef } from 'react';
import './App.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from "ol/proj.js";
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import { getGeoJson, styleFunction } from './map';

class App extends Component {
  constructor(props) {
    super(props);
    this.map = new Map();
    this.mapDomRef = createRef();
  }

  componentDidMount() {
    this.mapView = new View({
      center: [0,0],
      zoom: 2,
    });

    this.map.addLayer(new TileLayer({
        source: new OSM(),
      }),
    );

    this.map.setTarget(this.mapDomRef.current);
    this.map.setView(this.mapView);

    this.loadLayers();
  }

  loadLayers = () => {
    getGeoJson()
      .then(data => {
        this.vectorSource = new VectorSource({
          features: (new GeoJSON().readFeatures(data))
        });

        this.vectorLayer = new VectorLayer({
          source: this.vectorSource,
          style: styleFunction
        })
        this.map.addLayer(this.vectorLayer)
      })
  };

  render() {
    return (
      <div className="App">
        <div ref={this.mapDomRef}/>
      </div>
    );
  }
}

export default App;
