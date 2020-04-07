import React from "react";

export default class AdblockDetect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usingAdblock: false,
    };
  }

  componentDidMount() {
    this.setState({ usingAdblock: this.fakeAdBanner.offsetHeight === 0 });
  }

  render() {
    if (this.state.usingAdblock === true) {
      return this.props.children;
    }
    return (
      <div
        ref={(r) => {
          this.fakeAdBanner = r;
        }}
        style={{
          height: "1px",
          width: "1px",
          visiblity: "none",
          pointerEvents: "none",
        }}
        className="adBanner"
      />
    );
  }
}
