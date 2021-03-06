var styles = require('./index.css');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
import { Provider } from 'react-redux';
import store from './redux/store';
const Menu = require('./components/Menu');

var Page101 = require('./scenes/Page101');
var Page102 = require('./scenes/Page102');
var Page201 = require('./scenes/Page201');
var Page202 = require('./scenes/Page202');


var menus = [{
  id: 1,
  title: '模块一',
  sub: [{
    id: 101,
    title: '菜单1',
    to: '/'
  }, {
    id: 102,
    title: '菜单2',
    to: 'page102'
  }]
}, {
  id: 2,
  title: '模块一',
  sub: [{
    id: 201,
    title: '菜单1',
    to: 'page201'
  }, {
    id: 202,
    title: '菜单2',
    to: 'page202'
  }]
}]

const {Router, Route, IndexRoute, hashHistory, browserHistory} = ReactRouter;
const createComponent = (Component, props) => {
  return <Component {...props} />;
};
class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style = { innerStyles.container } class="clearfix">
                <Menu data={menus} />
                <div style={innerStyles.main}>
                    {this.props.children}
                </div>
            </div >
    );
  }
}
window.onload = function() {
  window.s = ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} createElement={createComponent}>
            <Route component={App} path="/">
                <IndexRoute component={Page101}>
                </IndexRoute>
                <Route component={Page102} path="page102">
                </Route>
                <Route component={Page201} path="page201">
                </Route>
                <Route component={Page202} path="page202">
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('example')
  )
}



var innerStyles = {
  container: {
    height: '100%'
  },
  main: {
    height: '100%',
    overflow: 'hidden'
  }
}