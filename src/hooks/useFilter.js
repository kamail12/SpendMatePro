export const useFilter = (documents = [], condition = () => true, mapper = (item) => item) => {
    return documents.filter(condition).map(mapper);
};
