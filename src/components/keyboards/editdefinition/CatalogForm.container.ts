import {
  IConditionNotSelected,
  IKeyboardFeatures,
  RootState,
} from '../../../store/state';
import { connect } from 'react-redux';
import CatalogForm from './CatalogForm';
import { KeyboardsEditDefinitionActions } from '../../../actions/keyboards.actions';
import { storageActionsThunk } from '../../../actions/storage.action';

const mapStateToProps = (state: RootState) => {
  return {
    definitionDocument: state.entities.keyboardDefinitionDocument,
    features: state.keyboards.editdefinition.features,
    uploadedRate: state.keyboards.editdefinition.uploadedRate,
    uploading: state.keyboards.editdefinition.uploading,
    description: state.keyboards.editdefinition.description,
  };
};
export type CatalogFormStateType = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (_dispatch: any) => {
  return {
    updateFeature: (
      value: IKeyboardFeatures | IConditionNotSelected,
      targetFeatures: readonly IKeyboardFeatures[]
    ) => {
      _dispatch(
        KeyboardsEditDefinitionActions.updateFeature(value, targetFeatures)
      );
    },
    save: () => {
      _dispatch(storageActionsThunk.updateKeyboardDefinitionForCatalog());
    },
    uploadKeyboardCatalogImage: (definitionId: string, file: File) => {
      _dispatch(
        storageActionsThunk.uploadKeyboardCatalogImage(definitionId, file)
      );
    },
    updateDescription: (description: string) => {
      _dispatch(KeyboardsEditDefinitionActions.updateDescription(description));
    },
  };
};
export type CatalogFormActionsType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CatalogForm);
