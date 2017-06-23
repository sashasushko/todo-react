import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./Item.less";

import Gapped from "retail-ui/components/Gapped";
import Modal from "retail-ui/components/Modal";
import Checkbox from "retail-ui/components/Checkbox";
import Button from "retail-ui/components/Button";
import LinkUI from "retail-ui/components/Link";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removable: props.removable
    };
  }

  renderRemoveModal() {
    const { onRemove } = this.props;

    return (
      <Modal onClose={() => this.setState({ removable: false })}>
        <Modal.Body>
          <p>Удаленный пункт не&nbsp;восстановить. Вы&nbsp;уверены?</p>
        </Modal.Body>
        <Modal.Footer panel>
          <Gapped gap={30}>
            <Button
              use="danger"
              onClick={() => {
                onRemove();
                this.setState({ removable: false });
              }}
            >
              Да, удалите
            </Button>
            <Button
              use="link"
              onClick={() => this.setState({ removable: false })}
            >
              Нет, не удаляйте
            </Button>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const { id, checked, value, onChange } = this.props;
    const { removable } = this.state;

    return (
      <Gapped gap={20}>
        <div>
          <Checkbox checked={checked} onChange={event => onChange(event)} />
          <Link className={styles.link} to={"/edit/" + id}>{value}</Link>
        </div>
        <LinkUI
          use="danger"
          icon="remove"
          onClick={() => this.setState({ removable: true })}
        >
          Удалить
        </LinkUI>
        {removable && this.renderRemoveModal()}
      </Gapped>
    );
  }
}

Item.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  removable: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
};

Item.defaultProps = {
  removable: false,
  checked: false,
  onChange: () => {},
  onRemove: () => {}
};
