export const useFilter = (documents = [], condition = () => true, mapper = (item) => item) => {
    return documents.filter(condition).map(mapper);
};

// export const useSumReduce = (documents = [], reducer = (prev, curr) => prev + curr, initial = 0) => {
//     return documents.reduce(reducer, initial);
// }