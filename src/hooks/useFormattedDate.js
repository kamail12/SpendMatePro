export const useFormattedDate = (date, options) => {
    options = options ?? { hour: '2-digit', minute: '2-digit', locale: 'pl-PL' };
    return date ? date.toDate().toLocaleDateString(options.locale, options) : null;
}
