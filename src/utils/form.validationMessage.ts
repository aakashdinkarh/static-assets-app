export const isInvalidField = (
  field: Element
): field is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement => {
  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLTextAreaElement ||
    field instanceof HTMLSelectElement
  ) {
    return !field.checkValidity();
  }

  return false;
};

export const getValidationMessage = (
  field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
): string => {
  const { validity } = field;
  const label = field.labels?.[0]?.textContent?.trim();
  if (label) {
    if (validity.valueMissing) return `${label} is required.`;
    if (validity.typeMismatch) return `Please enter ${label} in a valid format.`;
    if (validity.patternMismatch) return `${label} does not match the expected pattern.`;
    if (validity.tooShort && 'minLength' in field)
      return `${label} must be at least ${field.minLength} characters.`;
    if (validity.tooLong && 'maxLength' in field)
      return `${label} must be at most ${field.maxLength} characters.`;
    if (validity.rangeUnderflow && 'min' in field) return `${label} must be at least ${field.min}.`;
    if (validity.rangeOverflow && 'max' in field) return `${label} must be at most ${field.max}.`;
    if (validity.stepMismatch) return `${label} must be a valid step value.`;
    if (validity.badInput) return `${label} must be a number.`;
    if (validity.customError) return `${label} has a custom error.`;
  }

  if (validity.valueMissing) return 'This field is required.';
  if (validity.typeMismatch) return 'Please enter a valid format.';
  if (validity.patternMismatch) return 'Input does not match the expected pattern.';
  if (validity.tooShort && 'minLength' in field)
    return `Minimum length is ${field.minLength} characters.`;
  if (validity.tooLong && 'maxLength' in field)
    return `Maximum length is ${field.maxLength} characters.`;
  if (validity.rangeUnderflow && 'min' in field) return `Value should be at least ${field.min}.`;
  if (validity.rangeOverflow && 'max' in field) return `Value should be at most ${field.max}.`;
  if (validity.stepMismatch) return 'Please enter a valid step value.';
  if (validity.badInput) return 'Please enter a number.';
  if (validity.customError) return field.validationMessage;

  return '';
};
