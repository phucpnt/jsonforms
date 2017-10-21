import * as _ from 'lodash';
import { JsonForms } from '../../core';
import { and, RankedTester, rankWith, schemaTypeIs, uiTypeIs } from '../../core/testers';
import { BaseControl, mapStateToControlProps } from './base.control';
import { connect } from 'inferno-redux';
import { ControlProps } from './Control';

/**
 * Default tester for integer controls.
 * @type {RankedTester}
 */
export const integerControlTester: RankedTester = rankWith(2, and(
    uiTypeIs('Control'),
    schemaTypeIs('integer')
  ));

export class IntegerControl extends BaseControl<ControlProps, void> {

  inputChangeProperty = 'onInput';
  valueProperty = 'value';

  /**
   * @inheritDoc
   */
  protected toModel(value: any): any {
    return _.toInteger(value);
  }

  /**
   * @inheritDoc
   */
  protected createInputElement() {
    return (
      <input
        type='number'
        {...this.createProps(
          [],
          {
            step: 1
          })
        }
      />
    );
  }
}

export default JsonForms.rendererService.registerRenderer(
  integerControlTester,
  connect(mapStateToControlProps)(IntegerControl)
);
