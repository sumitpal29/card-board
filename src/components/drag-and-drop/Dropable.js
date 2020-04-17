import React from "react";

class Dropable extends React.Component {
  insertAfter(newElement, referenceNode) {
    referenceNode.parentNode.insertBefore(newElement, referenceNode.nextSibling);
  }
  insertBefore(newElement, referenceNode) {
    referenceNode.parentNode.insertBefore(newElement, referenceNode);
  }
  drop = (e) => {
    // e.preventDefault();
    const id = e.dataTransfer.getData("transfer");
    const parentType = e.dataTransfer.getData("parent-type");
    const childrenType = e.dataTransfer.getData("children-type");
    const elType = e.target.getAttribute("type");

    if (parentType === elType) {
      const el = document.getElementById(id);
      e.target.appendChild(el);
    } else if (elType === childrenType) {
      const el = document.getElementById(id);
      this.insertBefore(el, e.target);
    }

    console.log("drop over", e.target.id);
  };

  allowDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    return (
      <div
        id={this.props.id}
        className={`droppable-el ${this.props.classRef || ""}`}
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        type={this.props.type}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Dropable;
