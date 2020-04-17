import React from "react";

class Draggable extends React.Component {
  drag = (e) => {
    const el = e.target;

    e.dataTransfer.setData("transfer", e.target.id);
    e.dataTransfer.setData(
      "parent-type",
      e.target.parentNode.getAttribute("type")
    );
    e.dataTransfer.setData("children-type", e.target.getAttribute("type"));
    el.classList.add("hold");
    setTimeout(() => el.classList.add("invisible"), 0);
  };

  noAllowDrop = (e) => {
    console.log("noAllowDrop -", e.target.id);
    e.stopPropagation();
    e.preventDefault();
  };

  dragEnd = (e) => {
    const el = e.target;
    el.classList.remove("invisible");
    el.classList.remove("hold");
  };

  render() {
    return (
      <div
        className={`draggable-el ${this.props.classRef || ""}`}
        id={this.props.id}
        draggable="true"
        onDragStart={this.drag}
        onDragOver={this.noAllowDrop}
        onDragEnd={this.dragEnd}
        type={this.props.type}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Draggable;
