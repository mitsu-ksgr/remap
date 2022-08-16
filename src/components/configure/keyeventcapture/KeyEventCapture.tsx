import React from 'react';
import KeyModel from '../../../models/KeyModel';
import { IKeymap } from '../../../services/hid/Hid';
import { KeycodeList } from '../../../services/hid/KeycodeList';
import { keyInfoList } from '../../../services/hid/KeycodeInfoList';
import {
  KeyboardLabelLang,
  KeyLabelLangs,
} from '../../../services/labellang/KeyLabelLangs';
import { genKey, Key } from '../keycodekey/KeyGen';
import {
  MOD_ALT,
  MOD_CTL,
  MOD_GUI,
  MOD_SFT,
} from '../../../services/hid/Composition';

type OwnProps = {
  labelLang: KeyboardLabelLang;
  selectedLayer: number;
  selectedPos: string;
  onKeyDown: (
    // eslint-disable-next-line no-unused-vars
    newKey: Key,
    // eslint-disable-next-line no-unused-vars
    oldKeycode: number,
    // eslint-disable-next-line no-unused-vars
    selectedLayer: number,
    // eslint-disable-next-line no-unused-vars
    selectedPos: string
  ) => void;
  // eslint-disable-next-line no-unused-vars
  onKeyUp: (nextPos: string) => void;
  isTestMatrix: boolean;
  keyModels: KeyModel[];
  keymaps: { [pos: string]: IKeymap };
};
type KeyEventCaptureProps = OwnProps;

type OwnState = { holdingKeyCount: number };

export default class KeyEventCapture extends React.Component<
  KeyEventCaptureProps,
  OwnState
> {
  constructor(props: KeyEventCaptureProps | Readonly<KeyEventCaptureProps>) {
    super(props);
    this.state = { holdingKeyCount: 0 };
  }
  onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.repeat || (e.target as HTMLElement).tagName === 'INPUT') {
      return;
    }
    e.preventDefault();

    const newKey = this.keycodeFromKeyboardEvent(e);
    if (!newKey) {
      return;
    }

    this.props.onKeyDown!(
      newKey,
      this.props.keymaps[this.props.selectedPos].code,
      this.props.selectedLayer,
      this.props.selectedPos
    );

    this.setState({ holdingKeyCount: this.state.holdingKeyCount + 1 });
  }

  onKeyUp() {
    if (this.state.holdingKeyCount == 0) {
      return;
    }

    const holdingKeyCount = this.state.holdingKeyCount - 1;
    this.setState({ holdingKeyCount: holdingKeyCount });
    if (holdingKeyCount != 0) {
      return;
    }

    const currentIndex = this.props.keyModels.findIndex(
      (k) => k.pos === this.props.selectedPos
    );
    const nextIndex = (currentIndex + 1) % this.props.keyModels.length;
    const nextPos = this.props.keyModels[nextIndex].pos;
    this.props.onKeyUp(nextPos);
  }

  keycodeFromKeyboardEvent(e: React.KeyboardEvent<HTMLDivElement>): Key | null {
    // Modify e.key to find from KeyLabels
    let keyString =
      e.location == KeyboardEvent.DOM_KEY_LOCATION_LEFT
        ? `l${e.key}`
        : e.location == KeyboardEvent.DOM_KEY_LOCATION_RIGHT
        ? `r${e.key}`
        : e.location == KeyboardEvent.DOM_KEY_LOCATION_NUMPAD
        ? `kp_${e.key}`
        : e.key === 'Delete'
        ? `Del`
        : e.key === ' '
        ? `Space`
        : e.key;
    keyString = keyString.toLowerCase();
    const keyLabels = KeyLabelLangs.getKeyLabels(this.props.labelLang!);
    let code = keyLabels.find(
      (k) => k.label === keyString || k.keywords?.some((k) => k === keyString)
    )?.code;

    if (!code) {
      code = keyInfoList.find(
        (k) =>
          k.keycodeInfo.label
            .toLowerCase()
            .replaceAll(' ', '')
            .toLowerCase() === keyString ||
          k.keycodeInfo.keywords.some(
            (keyword) => keyword.toLowerCase() === keyString
          )
      )?.keycodeInfo.code;

      if (!code) {
        return null;
      }
    }

    if (e.key !== 'Control' && e.ctrlKey) code |= MOD_CTL << 8;
    if (e.key !== 'Shift' && e.shiftKey) code |= MOD_SFT << 8;
    if (e.key !== 'Alt' && e.altKey) code |= MOD_ALT << 8;
    if (e.key !== 'Meta' && e.metaKey) code |= MOD_GUI << 8;

    const keymap = KeycodeList.getKeymap(code, this.props.labelLang);
    if (!keymap) {
      return null;
    }

    return genKey(keymap, this.props.labelLang);
  }

  render() {
    return (
      <div
        tabIndex={-1}
        onKeyDown={(e) => {
          if (!this.props.isTestMatrix) {
            this.onKeyDown(e);
          }
        }}
        onKeyUp={() => {
          if (!this.props.isTestMatrix) {
            this.onKeyUp();
          }
        }}
        onBlur={() => {
          this.setState({ holdingKeyCount: 0 });
        }}
        style={{ outline: 'none' }}
      >
        {this.props.children}
      </div>
    );
  }
}
