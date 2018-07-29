import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Bundle extends Component {
    state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null
    } 

    componentWillMount() {
      this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.load !== this.props.load) {
        this.load(nextProps)
      }
    }

    load(props) {
      this.setState({
        mod: null
      }) 
      props.load((mod) => {
        this.setState({
          // handle both es imports and cjs
          mod: mod.default ? mod.default : mod
        })
      })
    }

    render() {
      return this.props.children(this.state.mod)
    }
}
Bundle.propTypes = {
  children: PropTypes.func,
  load: PropTypes.func
}

const createComponent = (component) => class WarppedComponent extends Component {
  render() {
    return (
      <Bundle load={component}>
        {
          (Component) => Component ? <Component {...this.props} /> : null
        }
      </Bundle>
    )
  }
}
export default createComponent