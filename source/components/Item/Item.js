import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./Item.less";

import Gapped from "retail-ui/components/Gapped";
import Checkbox from "retail-ui/components/Checkbox";
import Input from "retail-ui/components/Input";
import Link from "retail-ui/components/Link";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editable: props.editable
    };
  }

  componentDidMount() {
    const { itemId, itemValue } = localStorage;
    const { id } = this.props;

    if (itemId == id && itemId) {
      this.setState({ value: itemValue || "", editable: true });
    }
  }

  componentDidUpdate() {
    const { id } = this.props;
    const { editable, value } = this.state;

    if (editable) {
      localStorage.setItem("itemValue", value);
      localStorage.setItem("itemId", id);
    } else {
      localStorage.removeItem("itemValue");
      localStorage.removeItem("itemId");
    }
  }

  updateItemValue() {
    const { onChange, onRemove } = this.props;
    const { value } = this.state;

    if (value.trim()) onChange({ value: value.trim() });
    else onRemove();
    this.setState({ editable: false });
  }

  handleInputKeyDown(key) {
    const { value } = this.props;

    if (key === "Enter") this.updateItemValue();
    if (key === "Escape") this.setState({ editable: false, value });
  }

  renderInput() {
    const { value } = this.state;

    return (
      <Input
        type="text"
        autoFocus={true}
        value={value}
        onChange={event => this.setState({ value: event.target.value })}
        onBlur={() => this.updateItemValue()}
        onKeyDown={event => this.handleInputKeyDown(event.key)}
      />
    );
  }

  renderText() {
    const { value, editable } = this.state;

    return (
      <span
        className={styles.label}
        width="auto"
        onClick={() => this.setState({ editable: true })}
      >
        {value}
      </span>
    );
  }

  render() {
    const { checked, onChange, onRemove } = this.props;
    const { editable } = this.state;

    return (
      <Gapped gap={20}>
        <div>
          <Checkbox
            checked={checked}
            onChange={event => onChange({ checked: event.target.checked })}
          />
          {editable ? this.renderInput() : this.renderText()}
        </div>
        <Link use="danger" icon="remove" onClick={onRemove}>Удалить</Link>
      </Gapped>
    );
  }
}

Item.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
};

Item.defaultProps = {
  checked: false,
  editable: false,
  onChange: () => {},
  onRemove: () => {}
};
