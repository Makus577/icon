import React, { Component } from 'react'
import ol from 'openlayers'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateFeature } from '_redux/actions/userFeature'
import Popup from './Popup'
import { getArea } from 'utils/tools'
import { geoserverUrl } from '../url'
import { getUserInfo } from 'utils/Api.js'
class UserFeature extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feature: undefined
    }
  }
  componentDidMount() {
    const map = this.props.map
    const vectorSource = new ol.source.Vector()
    this.vector = new ol.layer.Vector({
      source: vectorSource,
      style: function (feature) {
        const growth_status = feature.get('growth_status')
        let color = [117, 172, 71, 0.7]
        // ['优', '良', '差', '闲', '弃', '不选择']
        switch (growth_status) {
        case '0':
          color = [117, 172, 71, 0.7]
          break
        case '1':
          color = [254, 198, 28, 0.7]
          break
        case '2':
          color = [255,25,25, 0.7]
          break
        case '3':
          color = [122, 122, 122, 0.7]
          break
        case '4':
          color = [196, 196, 196, 0.7]
          break
        case '5':
          color = [17, 102, 0, 0.7]
          break
        default:
          break
        }
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color
          }),
          stroke: new ol.style.Stroke({
            lineCap: 'butt',
            lineJoin: 'miter',
            color: [255, 200, 0, 1.0],
            width: 4
          })
        })
      }
    })
    // console.log(getUserInfo().id)
    // then post the request and add the received features to a layer
    axios.get(geoserverUrl, {
      params: {
        service: 'WFS',
        version: '1.0.0',
        request: 'GetFeature',
        typeName: 'ican:tb_farmland',
        maxFeatures: 500,
        outputFormat: 'application/json',
        CQL_FILTER: `master_id=='${getUserInfo().id}'`,
      }
    }).then((response) => {
      return response.data
    }).then((data) => {
      this.props.update(data.features)
      if (data.totalFeatures === 0) {
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            map.getView().animate({
              center: ol.proj.transform([r.point.lng, r.point.lat], 'EPSG:4326', 'EPSG:3857'),
              duration: 2000,
              zoom: 14
            })
          }
          else {
            alert('failed' + this.getStatus())
          }
        }, { enableHighAccuracy: true })

        return
      }
      var features = new ol.format.GeoJSON().readFeatures(data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })


      vectorSource.addFeatures(features)
      map.getView().fit(vectorSource.getExtent())
    })
    map.addLayer(this.vector)

    map.on('pointermove', (evt) => {
      if (evt.dragging) {
        return
      }
      if (map.getView().getZoom() > 8) {
        this.displayFeatureInfo(map.getEventPixel(evt.originalEvent))
      }
    })
  }

  displayFeatureInfo = (pixel) => {
    const map = this.props.map
    var feature = map.forEachFeatureAtPixel(pixel, (feature, layer) => {
      if (layer === this.vector) {
        return feature
      }

    })
    if (feature && map.getView().getZoom() >= 7) {
      this.setState({
        feature
      })
      this.child.setPosition(ol.extent.getCenter(feature.getGeometry().getExtent()))
    } else {
      this.child && this.child.setPosition(undefined)
    }

  }
  render() {
    const { feature } = this.state
    return <div>
      {feature && <Popup {...feature.getProperties()} ref={child => this.child = child}
        {...this.props}
        growthStatus={feature.get('growth_status')}
        coord={ol.extent.getCenter(feature.getGeometry().getExtent())}
        area={getArea(feature).acre + '亩'}
        username={getUserInfo().username} />}
    </div>
  }
}
UserFeature.propTypes = {
  map: PropTypes.object,
  update: PropTypes.func
}

const mapDispatchToProps = function (dispath) {
  return {

    update: (features) => {
      dispath(updateFeature(features))
    }
  }
}
export default connect(null, mapDispatchToProps)(UserFeature)