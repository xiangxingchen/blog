import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  static defaultProps = {
    text: '333334'
  }
  render() {
    return (<h1>22778823{this.props.text}</h1>)
  }
}
ReactDOM.render(
<App/>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
