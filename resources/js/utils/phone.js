// Shared US phone-number input mask.
//
// Formats raw user input progressively into "(000) 000-0000" as they type:
//   ""            -> ""
//   "4"           -> "(4"
//   "415"         -> "(415"
//   "4155"        -> "(415) 5"
//   "415555"      -> "(415) 555"
//   "4155551234"  -> "(415) 555-1234"
//
// Non-digits are stripped and input is capped at 10 digits, so pasting a messy
// value like "+1 415.555.1234" or extra characters still yields a clean mask.
export function formatPhoneNumber(value) {
    if (!value) return '';

    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length < 4) return `(${digits}`;
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
