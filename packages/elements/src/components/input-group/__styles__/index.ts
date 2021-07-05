import { styled } from 'linaria/react'
import { ElIcon } from '../../icon/__styles__'
import { ElLabel } from '../../label/__styles__'
import { ElInput } from '../../input/__styles__'
import { ElInputAddOn } from '../../input-add-on/__styles__'

export const ElInputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${ElLabel} {
    background: var(--component-input-bg);
    order: 1;
    flex-basis: 100%;
    padding-left: 0.5rem;
  }

  ${ElIcon} {
    background: var(--component-input-bg);
    border-bottom: var(--component-input-border-bottom);
    padding-left: 0.5rem;
    align-items: center;
    order: 2;
  }

  ${ElInput} {
    order: 3;
  }

  ${ElInput}:not([type='checkbox']):not([type='radio']) {
    &:focus {
      ~ ${ElIcon}, ~ ${ElLabel}, ~ ${ElInputAddOn} {
        background: var(--component-input-focus-bg);
      }

      ~ ${ElIcon}, ~ ${ElInputAddOn} {
        border-bottom: var(--component-input-border-bottom-focus);
      }
    }
  }

  ${ElInputAddOn} {
    background: var(--component-input-bg);
    border-bottom: var(--component-input-border-bottom);
    padding-right: 0.5rem;
    align-items: center;
    display: flex;
    order: 5;
  }

  ${ElInput}[type='checkbox'], ${ElInput}[type='radio'] {
    ~ ${ElIcon} {
      box-shadow: none;
      padding-left: 0;
      padding-right: 0.5rem;
    }
    ~ ${ElInputAddOn} {
      box-shadow: none;
      padding-left: 0.5rem;
      flex-grow: 1;
    }

    &:checked {
      ~ ${ElIcon}, ~ ${ElLabel}, ~ ${ElInputAddOn} {
        background: var(--component-input-focus-bg);
      }
    }
  }

  ${ElInput}[type='checkbox'] {
    ~ ${ElLabel} {
      padding-left: 0;
      padding-bottom: 0.5rem;
    }
  }

  ${ElInput}[type='radio'] ~ ${ElLabel} {
    order: 4;
    flex-basis: auto;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
`