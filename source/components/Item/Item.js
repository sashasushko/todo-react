import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from "./Item.less";

import Modal from "retail-ui/components/Modal";
import Gapped from "retail-ui/components/Gapped";
import Button from "retail-ui/components/Button";
import Checkbox from "retail-ui/components/Checkbox";
import Input from "retail-ui/components/Input";
import Link from "retail-ui/components/Link";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editable: props.editable,
      removeable: false
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

  handleItemValueUpdate() {
    const { onChange } = this.props;
    const { value } = this.state;

    if (value.trim()) {
      onChange({ value: value.trim() });
      this.setState({ editable: false });
    } else {
      this.handleItemRemove();
    }
  }

  handleInputKeyDown(key) {
    const { value } = this.props;

    if (key === "Enter") this.handleItemValueUpdate();
    if (key === "Escape") this.setState({ editable: false, value });
  }

  handleItemRestore() {
    const { value } = this.props;

    this.setState({ removeable: false, editable: false, value });
  }

  handleItemRemove() {
    this.setState({ removeable: true });
  }

  renderInput() {
    const { value } = this.state;

    return (
      <Input
        type="text"
        autoFocus={true}
        value={value}
        onChange={event => this.setState({ value: event.target.value })}
        onBlur={() => this.handleItemValueUpdate()}
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

  renderModal() {
    const { onRemove } = this.props;

    return (
      <Modal onClose={() => this.handleItemRestore()}>
        <Modal.Body>
          <p>После удаления пункт не восстановить. Удалить?</p>
        </Modal.Body>
        <Modal.Footer panel={true}>
          <Gapped gap={30}>
            <Button use="danger" onClick={onRemove}>
              Да, удалите
            </Button>
            <Link onClick={() => this.handleItemRestore()}>
              Не удаляйте
            </Link>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const { checked, onChange } = this.props;
    const { editable, removeable } = this.state;

    return (
      <Gapped gap={20}>
        <div>
          <Checkbox
            checked={checked}
            onChange={event => onChange({ checked: event.target.checked })}
          />
          {editable ? this.renderInput() : this.renderText()}
        </div>
        <Link
          use="danger"
          icon="remove"
          onClick={() => this.handleItemRemove()}
        >
          Удалить
        </Link>
        {removeable && this.renderModal()}
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
