import { Key } from '../components/configure/keycodes/Keycodes.container';
import KeyModel from '../models/KeyModel';

export const KEYBOARDS_ACTIONS = '@Keyboards';
export const KEYBOARDS_CLEAR_SELECTED_POS = `${KEYBOARDS_ACTIONS}/ClearSelectedLayer`;
export const KEYBOARDS_UPDATE_SELECTED_LAYER = `${KEYBOARDS_ACTIONS}/UpdateSelectedLayer`;
export const KEYBOARDS_UPDATE_SELECTED_POS = `${KEYBOARDS_ACTIONS}/UpdateSelectedPos`;
export const KeyboardsActions = {
  clearSelectedPos: () => {
    return {
      type: KEYBOARDS_UPDATE_SELECTED_POS,
    };
  },
  updateSelectedLayer: (layer: number) => {
    return {
      type: KEYBOARDS_UPDATE_SELECTED_LAYER,
      value: layer,
    };
  },
  updateSelectedPos: (pos: string) => {
    return {
      type: KEYBOARDS_UPDATE_SELECTED_POS,
      value: pos,
    };
  },
};

export const KEYCODES_ACTIONS = '@Keycodes';
export const KEYCODES_UPDATE_CATEGORY = `${KEYCODES_ACTIONS}/UpdateCategory`;
export const KEYCODES_UPDATE_MACRO = `${KEYCODES_ACTIONS}/UpdateMacro`;
export const KEYCODES_LOAD_KEYCODE_INFO_FOR_ALL_CATEGORIES = `${KEYCODES_ACTIONS}/LoadKeycodeInfoForAllCategories`;
export const KeycodesActions = {
  updateCategory: (value: string) => {
    return {
      type: KEYCODES_UPDATE_CATEGORY,
      value: value,
    };
  },
  updateMacro: (code: number | undefined, text: string) => {
    return {
      type: KEYCODES_UPDATE_MACRO,
      value: { code: code, text: text },
    };
  },
  loadKeycodeInfoForAllCategories: () => {
    return {
      type: KEYCODES_LOAD_KEYCODE_INFO_FOR_ALL_CATEGORIES,
    };
  },
};

export const KEYCODEKEY_ACTIONS = '@KeycodeKey';
export const KEYCODEKEY_UPDATE_DRAGGING_KEY = `${KEYCODEKEY_ACTIONS}/UpdateDraggingKey`;
export const KEYCODEKEY_UPDATE_SELECTED_KEY = `${KEYCODEKEY_ACTIONS}/UpdateSelectedKey`;
export const KEYCODEKEY_UPDATE_HOVER_KEY = `${KEYCODEKEY_ACTIONS}/UpdateHoverKey`;
export const KeycodeKeyActions = {
  updateDraggingKey: (key: Key | null) => {
    return {
      type: KEYCODEKEY_UPDATE_DRAGGING_KEY,
      value: key,
    };
  },
  updateSelectedKey: (key: Key) => {
    return {
      type: KEYCODEKEY_UPDATE_SELECTED_KEY,
      value: key,
    };
  },
  updateHoverKey: (key: Key | null) => {
    return {
      type: KEYCODEKEY_UPDATE_HOVER_KEY,
      value: key,
    };
  },
};

export const KEYDIFF_ACTIONS = '@Keydiff';
export const KEYDIFF_CLEAR_KEYDIFF = `${KEYDIFF_ACTIONS}/UpdateKeydiff`;
export const KEYDIFF_UPDATE_KEYDIFF = `${KEYDIFF_ACTIONS}/ClearKeydiff`;
export const KeydiffActions = {
  updateKeydiff: (orig: KeyModel, dest: KeyModel) => {
    return {
      type: KEYDIFF_UPDATE_KEYDIFF,
      value: { origin: orig, destination: dest },
    };
  },
  clearKeydiff: () => {
    return {
      type: KEYDIFF_CLEAR_KEYDIFF,
    };
  },
};

export const NOTIFICATION_ACTIONS = '@Notification';
export const NOTIFICATION_ADD_ERROR = `${NOTIFICATION_ACTIONS}/AddError`;
export const NOTIFICATION_ADD_WARN = `${NOTIFICATION_ACTIONS}/AddWarn`;
export const NotificationActions = {
  addError: (message: string) => {
    return {
      type: NOTIFICATION_ADD_ERROR,
      value: message,
    };
  },
  addWarn: (message: string) => {
    return {
      type: NOTIFICATION_ADD_WARN,
      value: message,
    };
  },
};

export const HEADER_ACTIONS = '@Header';
export const HEADER_UPDATE_FLUSH_LOADING = `${HEADER_ACTIONS}/UpdateFlushLoading`;
export const HeaderActions = {
  updateFlush: (loading: boolean) => {
    return {
      type: HEADER_UPDATE_FLUSH_LOADING,
      value: loading,
    };
  },
};

export const REMAPS_ACTIONS = '_Remaps';
export const REMAPS_INIT = `${REMAPS_ACTIONS}/Init`;
export const REMAPS_SET_KEY = `${REMAPS_ACTIONS}/SetKey`;
export const REMAPS_REMOVE_KEY = `${REMAPS_ACTIONS}/RemoveKey`;
export const RemapsActions = {
  init: (layerCount: number) => {
    const remaps: { [pos: string]: KeyModel }[] = new Array(layerCount).fill(
      {}
    );
    return {
      type: REMAPS_INIT,
      value: remaps,
    };
  },
  setKey: (layer: number, keymodel: KeyModel) => {
    return {
      type: REMAPS_SET_KEY,
      value: {
        layer: layer,
        pos: keymodel.pos,
        keycode: keymodel.keycode,
      },
    };
  },
  removeKey: (layer: number, pos: string) => {
    return {
      type: REMAPS_REMOVE_KEY,
      value: {
        pos: pos,
        layer: layer,
      },
    };
  },
};
