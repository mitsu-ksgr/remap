import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { ReactNode } from 'react';
import KeyModel from '../../../models/KeyModel';
import { KeycapActionsType, KeycapStateType } from './Keycap.container';
import './Keycap.scss';

export const KEY_SIZE = 54;
const KEY_CAP_BORDER = 1;
const KEY_CAP_MARGIN_HEIGHT = 5;
const KEY_CAP_MARGIN_WIDTH = 6;

const keysizes = ['0.5u', '1u', '1.5u', '2u', '4u'] as const;
type KeySize = typeof keysizes[number];

type OnClickKeycap = (index: number) => void;

type KeycapOwnState = {
  onDragOver: boolean;
};

// TODO: refactoring properties, unify the model
type KeycapOwnProps = {
  index: number;
  labels: string[][];
  model: KeyModel;
  size?: KeySize;
  selected?: boolean;
  style?: React.CSSProperties;
  styleTransform?: React.CSSProperties;
  style2?: React.CSSProperties;
  styleTransform2?: React.CSSProperties;
  onClick?: OnClickKeycap; // DEPRECATED
};

type KeycapProps = KeycapOwnProps &
  Partial<KeycapStateType> &
  Partial<KeycapActionsType>;

export default class Keycap extends React.Component<
  KeycapProps,
  KeycapOwnState
> {
  constructor(props: KeycapProps | Readonly<KeycapProps>) {
    super(props);
    this.state = {
      onDragOver: false,
    };
  }

  get isOddly(): boolean {
    return this.props.style2 != undefined;
  }

  render(): ReactNode {
    const width = Number(this.props.style?.width) || KEY_SIZE;
    const height = Number(this.props.style?.height) || KEY_SIZE;
    const top = Number(this.props.style?.top) || 0;
    const left = Number(this.props.style?.left) || 0;

    const width2 = Number(this.props.style2?.width) || KEY_SIZE;
    const height2 = Number(this.props.style2?.height) || KEY_SIZE;
    const top2 = Number(this.props.style2?.top) || 0;
    const left2 = Number(this.props.style2?.left) || 0;

    const baseStyle2 = {
      ...this.props.style2,
      width: left2 < 0 ? width2 - KEY_CAP_MARGIN_WIDTH * 2 : width2,
    };
    const coverStyle = {
      ...this.props.style,
      width:
        left2 < 0 ? width - KEY_CAP_MARGIN_WIDTH : width - KEY_CAP_BORDER * 2,
      height: height - KEY_CAP_BORDER * 2,
      top: top + KEY_CAP_BORDER,
      left: left + KEY_CAP_BORDER,
    };
    const roofStyle = {
      ...this.props.style,
      width: width - (KEY_CAP_MARGIN_WIDTH + KEY_CAP_BORDER) * 2,
      height: height - (KEY_CAP_MARGIN_HEIGHT + KEY_CAP_BORDER) * 2,
      top: top + KEY_CAP_MARGIN_HEIGHT,
      left: left + KEY_CAP_BORDER + KEY_CAP_MARGIN_WIDTH,
    };

    const roofStyle2 = {
      ...this.props.style2,
      width: width2 - (KEY_CAP_BORDER + KEY_CAP_MARGIN_WIDTH) * 2,
      height: height2 - (KEY_CAP_BORDER + KEY_CAP_MARGIN_HEIGHT) * 2,
      top: top2 + KEY_CAP_MARGIN_HEIGHT,
      left: left2 + KEY_CAP_MARGIN_WIDTH + KEY_CAP_BORDER,
      background: '#F2F2F2',
    };

    const labelsStyle = {
      ...this.props.style,
      width: width - (KEY_CAP_MARGIN_WIDTH + KEY_CAP_BORDER * 2) * 2,
      KEY_CAP_BORDER,
      height: height - KEY_CAP_MARGIN_HEIGHT * 2 - KEY_CAP_BORDER * 4,
      top: top + KEY_CAP_MARGIN_HEIGHT + KEY_CAP_BORDER,
      left: left + KEY_CAP_BORDER + KEY_CAP_MARGIN_WIDTH + KEY_CAP_BORDER,
      background: '#F2F2F2',
    };
    return (
      <div
        className={['keycap-base', this.state.onDragOver && 'drag-over'].join(
          ' '
        )}
        style={this.props.styleTransform}
        onDragOver={(event) => {
          event.preventDefault();
          if (!this.state.onDragOver) {
            this.setState({ onDragOver: true });
          }
        }}
        onDragLeave={() => {
          this.setState({ onDragOver: false });
        }}
        onDrop={() => {
          this.setState({ onDragOver: false });
          this.props.onDropKeycode!(this.props.inner!, this.props.model);
        }}
      >
        {/* base1 */}
        <div
          className={['keycap', 'keycap-border'].join(' ')}
          style={this.props.style}
          onClick={this.props.onClickKeycap!.bind(
            this,
            this.props.inner!,
            this.props.model
          )}
        ></div>
        {this.isOddly && (
          <React.Fragment>
            {/* base2 */}
            <div
              className={[
                'keycap',
                'keycap-border',
                'keycap2',
                'pointer-pass-through',
              ].join(' ')}
              style={baseStyle2}
              onClick={this.props.onClickKeycap!.bind(
                this,
                this.props.inner!,
                this.props.model
              )}
            ></div>

            {/* cover1 */}
            <div
              className={['keycap', 'pointer-pass-through'].join(' ')}
              style={coverStyle}
              onClick={this.props.onClickKeycap!.bind(
                this,
                this.props.inner!,
                this.props.model
              )}
            ></div>
          </React.Fragment>
        )}
        {/* roof1 */}
        <div
          className={['keyroof-base'].join(' ')}
          style={roofStyle}
          onClick={this.props.onClickKeycap?.bind(
            this,
            this.props.inner!,
            this.props.model
          )}
        ></div>
        {this.isOddly && (
          <React.Fragment>
            {/* roof2 */}
            <div
              className={['keyroof-base'].join(' ')}
              style={roofStyle2}
              onClick={this.props.onClickKeycap!.bind(
                this,
                this.props.inner!,
                this.props.model
              )}
            ></div>
          </React.Fragment>
        )}
        {/* labels */}
        <div
          className="keyroof"
          style={labelsStyle}
          onClick={this.props.onClickKeycap?.bind(
            this,
            this.props.inner!,
            this.props.model
          )}
        >
          <div className="keylabel">
            <div className="label left top">{this.props.labels[0][0]}</div>
            <div className="label center">{this.props.labels[0][1]}</div>
            <div className="label right">{this.props.labels[0][2]}</div>
          </div>
          <div className="keylabel">
            <div className="label left">{this.props.labels[1][0]}</div>
            <div className="label center">{this.props.labels[1][1]}</div>
            <div className="label right">{this.props.labels[1][2]}</div>
          </div>
          <div className="keylabel">
            <div className="label left">{this.props.labels[2][0]}</div>
            <div className="label center">{this.props.labels[2][1]}</div>
            <div className="label right">{this.props.labels[2][2]}</div>
          </div>
        </div>
      </div>
    );
  }
}
