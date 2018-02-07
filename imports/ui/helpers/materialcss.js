import { Materialize } from 'meteor/materialize:materialize';

const MaterialHelper = {
  updateTextFields() {
    return Materialize.updateTextFields();
  },

  selectState(item) {
    // console.log(item, item.value);
    // console.log($(item).prop('required'));
    if ($(item).prop('required')) {
      // get the input mask
      const inputMask = $(item).siblings('input.select-dropdown');

      $(item).addClass(item.value ? 'valid' : 'invalid');
      $(item).removeClass(item.value ? 'invalid' : 'valid');
      $(inputMask).addClass(item.value ? 'valid' : 'invalid');
      $(inputMask).removeClass(item.value ? 'invalid' : 'valid');
    }
  },

  // Return true if success, else return a string of fields property
  checkAll(fields) {
    let fieldToFocus = null;
    Object.keys(fields).map((field) => {
      const item = fields[field];
      if (item && typeof item.checkValidity === 'function') {
        if (!item.checkValidity()) {
          if (fieldToFocus === null) {
            fieldToFocus = field;
            if (typeof item.focus === 'function') {
              item.focus();
            }
          }

          return false;
        }
        return true;
      }

      if (item instanceof HTMLElement) {
        if (!$(item)[0] || !$(item)[0].checkValidity) {
          return true;
        }
        // call html5 check validate
        const checkResult = $(item)[0].checkValidity();
        if (!checkResult) {
          // process the select box
          if ($(item).is('select')) {
            this.selectState(item);
          } else {
            $(item).addClass('invalid');
            $(item).removeClass('valid');
          }

          if (!fieldToFocus) {
            fieldToFocus = field;
            $(item).focus();
          }
        }
      } else {
        // console.log(item, 'is not html element');
      }

      return true;
    });
    if (fieldToFocus) {
      return fieldToFocus;
    }

    return true;
  },
};

export default MaterialHelper;
